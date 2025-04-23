// src/hooks/useMyPagePosts.ts
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

export interface MyPagePost {
  id: string;
  title: string;
  content: string;
  category: string;
  nickname: string;
  uid: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export function useMyPagePosts(uid: string, category?: string) {
  const [posts, setPosts] = useState<MyPagePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetch = async () => {
      try {
        const ref = collection(db, "mypagePosts");
        const trimmed = category?.trim();

        const q = trimmed
          ? query(
              ref,
              where("uid", "==", uid),
              where("category", "==", trimmed),
              orderBy("createdAt", "desc")
            )
          : query(ref, where("uid", "==", uid), orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);
        const result: MyPagePost[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MyPagePost[];

        console.log("🔥 [MyPage] uid:", uid);
        console.log("🔥 [MyPage] category:", category);
        console.log("🔥 [MyPage] 글 수:", result.length);

        setPosts(result);
      } catch (error) {
        console.error("❌ MyPage 글 불러오기 실패:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [uid, category]);

  return { posts, loading };
}
