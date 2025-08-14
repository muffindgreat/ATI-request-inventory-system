import {
  Container,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  collection,
  query,
  limit,
  startAfter,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import useToast from "../../components/Toastify/useToast";

const ItemInfo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { currentUser } = useAuth(); // ✅ Use currentUser from AuthContext
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false); // State for download button loading
  const hasUpdated = useRef(false); // Prevents duplicate updates

  // "You may also like" state
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [suggestedLoading, setSuggestedLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const showToast = useToast();

  useEffect(() => {
    const fetchAndUpdateViews = async () => {
      if (hasUpdated.current) return;
      hasUpdated.current = true;

      try {
        const docRef = doc(db, "Inventory", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = docSnap.data();

          // Optimistically update state to show new views count
          setItem({
            ...itemData,
            views: (itemData.views || 0) + 1,
          });

          // Update Firestore views count
          await updateDoc(docRef, { views: increment(1) });

          // Fetch updated data
          const updatedSnap = await getDoc(docRef);
          if (updatedSnap.exists()) {
            setItem(updatedSnap.data());
          }
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching/updating item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateViews();
  }, [id, currentUser]);

  // Ref for scrollable CardContent
  const suggestedScrollRef = useRef(null);

  // Fetch suggested items
  const fetchSuggestedItems = async (isInitial = false) => {
    // Save scroll position before updating items
    let prevScroll = 0;
    if (!isInitial && suggestedScrollRef.current) {
      prevScroll = suggestedScrollRef.current.scrollTop;
    }

    setSuggestedLoading(true);
    try {
      const batchSize = 30;
      const q = query(collection(db, "Inventory"), limit(batchSize));
      const snap = await getDocs(q);
      // Exclude current item
      const allItems = snap.docs
        .filter((doc) => doc.id !== id)
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      // Shuffle array
      const shuffled = allItems.sort(() => Math.random() - 0.5);

      // Pick 6 items
      const selected = shuffled.slice(
        isInitial ? 0 : suggestedItems.length,
        isInitial ? 6 : suggestedItems.length + 6
      );

      if (isInitial) {
        setSuggestedItems(selected);
      } else {
        setSuggestedItems((prev) => [...prev, ...selected]);
      }

      setHasMore(allItems.length > suggestedItems.length + 6);

      // Restore scroll position after DOM update
      setTimeout(() => {
        if (!isInitial && suggestedScrollRef.current) {
          suggestedScrollRef.current.scrollTop = prevScroll;
        }
      }, 0);
    } catch (e) {
      setHasMore(false);
    }
    setSuggestedLoading(false);
  };

  useEffect(() => {
    fetchSuggestedItems(true);
    // eslint-disable-next-line
  }, [id]);

  const addToCart = async () => {
    if (!currentUser) {
      showToast("Please log in to add items to your cart.", "error");
      return;
    }

    try {
      const userDocRef = doc(db, "User", currentUser.uid); // ✅ Use correct user UID
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userCart = userDocSnap.data().cart || [];

        // Check if the item is already in the cart
        const isItemInCart = userCart.some(
          (cartItem) => cartItem.itemId === id
        );

        if (isItemInCart) {
          showToast("Item is already in the cart.", "error");
          return; // Don't add if the item is already in the cart
        }

        // Add the item to the cart if not already present
        await updateDoc(userDocRef, {
          cart: arrayUnion({ itemId: id, quantity: 1 }),
        });

        showToast("Item added to request cart!", "success");
      } else {
        showToast("Network Error", "error");
      }
    } catch (error) {
      console.error("Error adding item to cart:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        userUID: currentUser?.uid,
        itemId: id,
      });
      showToast("Network Error", "error");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Item not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Helmet>
        <title>Item Info | ATI CALABARZON e-Library</title>
      </Helmet>
      <BackgroundImage />
      <Container
        maxWidth="lg"
        sx={{ alignContent: "center", pt: { xs: 12, sm: 14, md: 16 }, mb: 10 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: 2,
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {/* Item Info Card */}
          <Paper
            elevation={3}
            sx={{
              width: isSmallScreen ? "100%" : "70%",
              maxWidth: 800,
              overflow: "hidden",
              boxShadow: "-8px 8px 14px rgba(0, 0, 0, 0.2)",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomCardHeader title="Item Info" showBackButton />

            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                p: 3,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: isSmallScreen ? "100%" : "30%",
                  height: isSmallScreen ? 240 : 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  bgcolor: "grey.300",
                }}
              >
                <img
                  src={item.imageUrl || "/default-image.jpg"}
                  alt={item.itemName}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Box sx={{ flex: 1, p: isSmallScreen ? 2 : 5 }}>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.title}
                </Typography>
                <>
                  {item.bannerProgram?.length > 0 && (
                    <Stack
                      direction="row"
                      sx={{ my: 1, flexWrap: "wrap", gap: 1 }}
                    >
                      {item.bannerProgram.map((program, i) => (
                        <Chip
                          key={i}
                          label={program}
                          color="primary"
                          size="small"
                        />
                      ))}
                    </Stack>
                  )}
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mb: !item.publisher && !item.year ? 2 : 0 }}
                  >
                    {item.type}
                  </Typography>

                  {(item.publisher || item.year) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {item.publisher && `by ${item.publisher}`}
                      {item.publisher && item.year && ` · ${item.year}`}
                      {!item.publisher && item.year && item.year}
                    </Typography>
                  )}
                </>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 0.5 }}
                >
                  Views: {item.views || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 0.5 }}
                >
                  Downloads: {item.downloads || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock: {item.quantity || 0}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexDirection: isSmallScreen ? "column" : "row",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1A854B",
                      color: "white",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "130px", // You can adjust this value to match the original button size
                      height: "36px", // Adjust according to the original button height
                    }}
                    onClick={async () => {
                      if (!item.pdfUrl) {
                        console.error("Error: No PDF link available.");
                        showToast(
                          "PDF is not available for download.",
                          "error"
                        );
                        return;
                      }

                      setIsDownloading(true); // Start loading when download begins

                      try {
                        // 1. Fetch the PDF as blob
                        const response = await fetch(item.pdfUrl);
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);

                        // 2. Extract filename from URL
                        const urlParts = item.pdfUrl.split("/");
                        const filename = `${item.title}.pdf`;

                        // 3. Trigger download
                        const link = document.createElement("a");
                        link.href = blobUrl;
                        link.setAttribute("download", filename);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // 4. Clean up memory
                        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

                        // 5. Increment downloads in Firestore
                        const docRef = doc(db, "Inventory", id);
                        await updateDoc(docRef, { downloads: increment(1) });

                        // 6. Optional: update local state so UI reflects new download count immediately
                        setItem((prev) => ({
                          ...prev,
                          downloads: (prev.downloads || 0) + 1,
                        }));
                      } catch (error) {
                        console.error("Error downloading the PDF:", error);
                        showToast(
                          "PDF is not available for download.",
                          "error"
                        );
                      } finally {
                        setIsDownloading(false); // End loading when download is complete
                      }
                    }}
                    disabled={
                      !item.pdfUrl ||
                      isDownloading ||
                      (item.isDisplay !== undefined && item.isDisplay === false)
                    } // Disable button while downloading
                  >
                    {isDownloading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Download PDF"
                    )}
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1A854B",
                      color: "white",
                      textTransform: "none",
                    }}
                    disabled={
                      item.status === "Unavailable" ||
                      (item.isDisplay !== undefined && item.isDisplay === false)
                    }
                    onClick={addToCart}
                  >
                    Add to Request Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* You may also like Card */}
          <Paper
            elevation={3}
            sx={{
              width: isSmallScreen ? "100%" : "30%",
              minWidth: 280,
              maxWidth: 400,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              height: isSmallScreen ? "auto" : "100%",
              maxHeight: isSmallScreen ? "none" : 520,
              boxShadow: "-8px 8px 14px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CustomCardHeader
              title={
                <Typography
                  variant="subtitle1"
                  sx={{
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    fontSize: "1rem",
                  }}
                >
                  You May Also Like
                </Typography>
              }
              sx={{
                height: "40px",
                color: "#fff",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                userSelect: "none",
              }}
            />
            <CardContent
              ref={suggestedScrollRef}
              sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: isSmallScreen ? "none" : 420,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {suggestedLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                  <CircularProgress />
                </Box>
              ) : suggestedItems.length === 0 ? (
                <Typography sx={{ textAlign: "center", color: "gray", py: 5 }}>
                  No suggestions found.
                </Typography>
              ) : (
                suggestedItems.map((sItem) => (
                  <Card
                    key={sItem.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      boxShadow: 1,
                      border: "1px solid #eee",
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: 3, textDecoration: "none" },
                      minHeight: 70,
                      p: 1.5,
                      textDecoration: "none",
                      "&:visited": { textDecoration: "none" },
                      "&:active": { textDecoration: "none" },
                      "& *": { textDecoration: "none" },
                    }}
                    component="a"
                    href={`/item-info/${sItem.id}`}
                  >
                    <CardMedia
                      component="img"
                      image={sItem.imageUrl || "/default-image.jpg"}
                      alt={sItem.title}
                      sx={{
                        width: 60,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 1,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          color: "#1A854B",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textDecoration: "none", // Remove underline
                          fontSize: "0.95rem",
                        }}
                      >
                        {sItem.title && sItem.title.length > 22
                          ? `${sItem.title.slice(0, 22)}...`
                          : sItem.title}
                      </Typography>
                    </Box>
                  </Card>
                ))
              )}
            </CardContent>
            <Box sx={{ px: 2, pb: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                disabled={!hasMore || suggestedLoading}
                onClick={() => fetchSuggestedItems(false)}
              >
                View More
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ItemInfo;
