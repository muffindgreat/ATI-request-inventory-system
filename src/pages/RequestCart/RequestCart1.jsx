import { useState, useEffect } from "react";
import { Card, Box, Collapse } from "@mui/material";
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import CartItemList from "./CartItemList";
import CartOrderSummary from "./CartOrderSummary";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";

export default function ReqCart1() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState({});
  const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const unsubscribers = [];

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const userRef = doc(db, "User", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            if (Array.isArray(userData.cart) && userData.cart.length > 0) {
              const itemIds = userData.cart
                .map((item) => item.itemId)
                .filter(Boolean);

              const unsubscribeItemSnapshots = itemIds.map((itemId) => {
                const itemRef = doc(db, "Inventory", itemId);

                const unsubscribe = onSnapshot(itemRef, (itemSnap) => {
                  if (itemSnap.exists()) {
                    const itemData = itemSnap.data();
                    const matchingCartItem = userData.cart.find(
                      (cartItem) => cartItem.itemId === itemSnap.id
                    );

                    setCartItems((prevItems) => {
                      const existingIndex = prevItems.findIndex(
                        (item) => item.id === itemSnap.id
                      );

                      const newItem = {
                        id: itemSnap.id,
                        name: itemData.title || "Unknown",
                        image:
                          itemData.imageUrl ||
                          "https://via.placeholder.com/150",
                        quantity: matchingCartItem
                          ? matchingCartItem.quantity
                          : 1,
                        localQuantity: matchingCartItem
                          ? matchingCartItem.quantity
                          : 1, // Initialize localQuantity
                        status: itemData.status,
                        stocks: itemData.quantity || 0,
                        isDisplay:
                          itemData.isDisplay !== undefined
                            ? itemData.isDisplay
                            : undefined,
                        type: itemData.type || "Unknown",
                      };

                      if (existingIndex !== -1) {
                        // Replace the existing item
                        const updatedItems = [...prevItems];
                        updatedItems[existingIndex] = newItem;
                        return updatedItems;
                      } else {
                        // Add new item
                        return [...prevItems, newItem];
                      }
                    });
                  }
                });

                return unsubscribe;
              });

              unsubscribers.push(...unsubscribeItemSnapshots);
            } else {
              setCartItems([]);
            }
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    unsubscribers.push(unsubscribeAuth);

    return () => {
      unsubscribers.forEach((unsub) => unsub && unsub());
    };
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              localQuantity: Math.max(1, newQuantity), // Update local quantity immediately
            }
          : item
      )
    );
    setPendingUpdates((prev) => ({ ...prev, [id]: true })); // Mark as pending update
  };

  const handleConfirmQuantityChange = async (id, newQuantity) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user.");
        return;
      }

      const userRef = doc(db, "User", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        let userData = userSnap.data();
        const updatedCart = userData.cart.map((cartItem) =>
          cartItem.itemId === id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );

        await updateDoc(userRef, { cart: updatedCart });

        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: newQuantity, // Update database quantity
                  localQuantity: newQuantity, // Sync local quantity with database
                }
              : item
          )
        );

        setPendingUpdates((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[id];
          return newUpdates;
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDelete = async (ids) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user.");
        return;
      }

      const userRef = doc(db, "User", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        let userData = userSnap.data();
        const updatedCart = userData.cart.filter(
          (cartItem) => !ids.includes(cartItem.itemId)
        );

        await updateDoc(userRef, { cart: updatedCart });

        // Update local state: Remove items from cartItems (without affecting selectedItems)
        setCartItems((prev) => prev.filter((item) => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error("Error removing items:", error);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Deselect item
          : [...prev, id] // Select item
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 3 }}>
      <Helmet>
        <title>Request Cart | ATI CALABARZON e-Library</title>
      </Helmet>
      <BackgroundImage />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          pt: { xs: 12, sm: 14, md: 16 },
          mb: 10,
          mx: { xs: 0, sm: 0, md: 10, lg: 20 },
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            flex: selectedItems.length === 0 ? 1 : 2,
            transition: "flex 0.3s ease-in-out",
          }}
        >
          <CustomCardHeader
            title="Request Cart"
            showBackButton
            sx={{
              height: "40px",
              backgroundColor: "#1E874A",
              color: "#fff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              userSelect: "none",
            }}
          />
          <CartItemList
            cartItems={cartItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            toggleSelectItem={toggleSelectItem}
            handleQuantityChange={handleQuantityChange} // Pass handleQuantityChange
            handleConfirmQuantityChange={handleConfirmQuantityChange}
            pendingUpdates={pendingUpdates}
            handleDelete={handleDelete}
            loading={loading}
          />
        </Card>
        <Collapse
          in={selectedItems.length > 0}
          timeout={300}
          sx={{
            flex: selectedItems.length > 0 ? 1.2 : 0,
            transition: "flex 0.3s ease-in-out",
          }}
        >
          {selectedItems.length > 0 && (
            <CartOrderSummary
              cartItems={cartItems} // Pass updated cartItems
              selectedItems={selectedItems}
              pendingUpdates={pendingUpdates} // Pass pendingUpdates
            />
          )}
        </Collapse>
      </Box>
    </Box>
  );
}
