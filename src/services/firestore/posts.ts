import { db } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

interface PostData {
  id?: string;
  title: string;
  category: string;
  content: string;
  uid: string;
  nickname: string;
  isMyPagePost?: boolean;
}

export async function savePostToFirestore(post: PostData) {
  const baseCollection = post.isMyPagePost ? "mypagePosts" : "communityPosts";
  const postRef = post.id
    ? doc(db, baseCollection, post.id)
    : doc(collection(db, baseCollection));

  const isEdit = Boolean(post.id);

  const payload = {
    title: post.title,
    category: post.category,
    content: post.content,
    uid: post.uid,
    nickname: post.nickname,
    updatedAt: serverTimestamp(),
    ...(isEdit ? {} : { createdAt: serverTimestamp() }),
  };

  if (isEdit) {
    await updateDoc(postRef, payload);
  } else {
    await setDoc(postRef, payload);
  }

  return postRef.id;
}
