import { Link, useParams } from "react-router-dom";
import { Post } from "../../../../src/data/MyPageDummyPosts";
interface MyPostListProps {
  posts: Post[];
}

export default function MyPostList({ posts }: MyPostListProps) {
  const { username } = useParams<{ username: string }>();

  return (
    <section className="space-y-4">
      <h3 className="text-md font-semibold text-white border-b border-white/10 pb-1">
        최신 글
      </h3>
      <ul className="space-y-2 text-sm text-gray-300">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/mypage/${username}/post/${post.id}`}
              className="hover:text-indigo-300 transition"
            >
              {post.title}
              <span className="ml-2 text-xs text-white/40">- {post.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
