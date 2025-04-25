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
  date?: string;
  readTime?: string;
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
        const result: CommunityPost[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            category: data.category,
            content: data.content,
            nickname: data.nickname,
            uid: data.uid,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            date: data.createdAt?.toDate().toLocaleDateString("ko-KR") || "",
            readTime: data.readTime,
          };
        });

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
