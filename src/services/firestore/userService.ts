import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import type { User } from "../../stores/useUserStore";

export async function getUserFromFirestore(uid: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        uid,
        name: userData.name || "",
        nickname: userData.nickname || "",
        email: userData.email || "",
        bio: userData.bio,
        profileImage: userData.profileImage,
        position: userData.position,
        intro: userData.intro,
        snsLinks: userData.snsLinks,
        snsLinksVisible: userData.snsLinksVisible,
        categoryLabels: userData.categoryLabels,
        techStack: userData.techStack,
        projects: userData.projects,
        experience: userData.experience,
        education: userData.education,
        links: userData.links,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
