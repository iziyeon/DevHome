import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

interface PostData {
  id?: string;
  title: string;
  category: string;
  content: string;
  uid: string;
  nickname: string;
  isMyPagePost: boolean;
}

export async function savePostToFirestore(data: PostData): Promise<string> {
  const { id, title, category, content, uid, nickname, isMyPagePost } = data;
  const collectionName = isMyPagePost ? "mypagePosts" : "communityPosts";

  try {
    // 게시물 내용에 따른 추정 읽기 시간 계산
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200) + "분 소요";

    // 신규 게시물 작성
    if (!id) {
      const docRef = await addDoc(collection(db, collectionName), {
        title,
        category,
        content,
        uid,
        nickname,
        readTime,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    }
    // 기존 게시물 수정
    else {
      const postRef = doc(db, collectionName, id);
      await updateDoc(postRef, {
        title,
        category,
        content,
        readTime,
        updatedAt: serverTimestamp(),
      });
      return id;
    }
  } catch (err) {
    console.error("❌ 게시글 저장 실패:", err);
    throw err;
  }
}
