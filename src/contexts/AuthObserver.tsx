import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useUserStore } from "../stores/useUserStore";
import { getUserFromFirestore } from "../services/firestore/userService";

export default function AuthObserver() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoading(true);
        const user = await getUserFromFirestore(firebaseUser.uid);
        if (user) {
          setUser(user);
        }
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser, setIsLoading]);

  return null;
}
