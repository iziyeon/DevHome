import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export interface CommunityPost {
  id: string;
  title: string;
  category: string;
  content: string;
  nickname: string;
  uid: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  readTime?: string;
  date?: string;
}

export function useCommunityPosts(category?: string) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const ref = collection(db, "communityPosts");
        const trimmed = category?.trim();
        const q = trimmed
          ? query(
              ref,
              where("category", "==", trimmed),
              orderBy("createdAt", "desc")
            )
          : query(ref, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);
        const result: CommunityPost[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CommunityPost[];

        console.log("🔥 현재 category 파라미터:", category);
        console.log("🔥 Firestore에서 받아온 글 수:", result.length);
        console.log(
          "🔥 글들의 카테고리:",
          result.map((r) => r.category)
        );

        setPosts(result);
      } catch (error) {
        console.error("❌ Firestore 불러오기 실패:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  return { posts, loading };
}
