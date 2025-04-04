import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true); // Tracks Firestore check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "User", user.uid));

        if (userDoc.exists()) {
          setCurrentUser(user);
        } else {
          await signOut(auth);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }

      setIsVerifying(false); // Mark verification as complete
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isVerifying }}>
      {!isVerifying && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
