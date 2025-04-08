import { useState, useEffect } from "react";
import { Card, Box, Collapse } from "@mui/material";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true); // Set loading to true before starting the fetch
        try {
          const userRef = doc(db, "User", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            if (Array.isArray(userData.cart) && userData.cart.length > 0) {
              const itemIds = userData.cart
                .map((item) => item.itemId)
                .filter(Boolean);

              let fetchedItems = [];

              for (const itemId of itemIds) {
                const itemRef = doc(db, "Inventory", itemId);
                const itemSnap = await getDoc(itemRef);

                if (itemSnap.exists()) {
                  const itemData = itemSnap.data();
                  const matchingCartItem = userData.cart.find(
                    (cartItem) => cartItem.itemId === itemSnap.id
                  );

                  fetchedItems.push({
                    id: itemSnap.id,
                    name: itemData.title || "Unknown",
                    image:
                      itemData.imageUrl || "https://via.placeholder.com/150",
                    quantity: matchingCartItem ? matchingCartItem.quantity : 1,
                    type: itemData.type || "Unknown",
                  });
                }
              }

              console.log("Fetched Inventory Items:", fetchedItems);
              setCartItems(fetchedItems);
            } else {
              console.log("Cart is empty.");
              setCartItems([]);
            }
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
    setPendingUpdates((prev) => ({ ...prev, [id]: true }));
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
        console.log("Quantity updated in Firestore");

        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
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
        console.log("Items removed from Firestore");

        // Update local state: Remove items from cartItems (without affecting selectedItems)
        setCartItems((prev) => prev.filter((item) => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error("Error removing items:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 3 }}>
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
            }}
          />
          <CartItemList
            cartItems={cartItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            toggleSelectItem={(id) =>
              setSelectedItems((prev) =>
                prev.includes(id)
                  ? prev.filter((item) => item !== id)
                  : [...prev, id]
              )
            }
            handleQuantityChange={handleQuantityChange}
            handleConfirmQuantityChange={handleConfirmQuantityChange}
            pendingUpdates={pendingUpdates}
            handleDelete={handleDelete}
            loading={loading} // Pass loading state to CartItemList
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
              cartItems={cartItems}
              selectedItems={selectedItems}
            />
          )}
        </Collapse>
      </Box>
    </Box>
  );
}
