// src/contexts/AuthObserver.tsx

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useUserStore } from "../stores/useUserStore";

export default function AuthObserver() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser({
            uid: user.uid,
            name: userData.name,
            nickname: userData.nickname,
            email: userData.email,
          });
        } else {
          clearUser();
        }
      } else {
        clearUser();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading]);

  return null;
}
