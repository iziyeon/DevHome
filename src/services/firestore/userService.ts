import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserInfo } from "../../stores/useUserStore";

export async function getUserFromFirestore(
  uid: string
): Promise<UserInfo | null> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as UserInfo;
  } catch {
    return null;
  }
}

export async function saveUserToFirestore(user: UserInfo) {
  try {
    const ref = doc(db, "users", user.uid);
    const payload = {
      ...user,
      updatedAt: new Date(),
    };
    await setDoc(ref, payload, { merge: true });
  } catch (error) {
    console.error("❌ Firestore 유저 저장 실패:", error);
  }
}
