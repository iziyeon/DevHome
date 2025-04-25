import { Link, useParams } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  nickname: string;
  uid: string;
}

interface MyPostListProps {
  posts: Post[];
  title?: string;
  categoryLabels?: { [key: string]: string };
}

export default function MyPostList({
  posts,
  title = "최신 글",
  categoryLabels = {},
}: MyPostListProps) {
  const { username } = useParams<{ username: string }>();

  return (
    <section className="space-y-4">
      {title && (
        <h3 className="text-md font-semibold text-white border-b border-white/10 pb-1">
          {title}
        </h3>
      )}

      <ul className="space-y-2 text-sm text-gray-300">
        {posts.map((post) => {
          const label = categoryLabels[post.category] || post.category;
          return (
            <li key={post.id}>
              <Link
                to={`/mypage/${username}/post/${post.id}`}
                className="hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors duration-200"
              >
                <span>{post.title}</span>
                <span className="ml-2 text-xs text-gray-400">
                  - {post.date} / #{label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
