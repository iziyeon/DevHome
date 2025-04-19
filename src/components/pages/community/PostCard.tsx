import { Link } from "react-router-dom";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  imageUrl: string;
}

export default function PostCard({
  id,
  title,
  author,
  date,
  readTime,
  content,
  imageUrl,
}: PostCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/src/assets/layout/default.jpg";
  };

  return (
    <Link
      to={`/posts/${id}`}
      className="
        block w-full max-w-sm mx-auto h-[320px]
        bg-[#1f2937] rounded-xl shadow-md
        ring-1 ring-indigo-500/20
        hover:scale-[1.02] hover:shadow-xl
        transition duration-200
      "
      aria-label={`게시글: ${title}`}
    >
      <img
        src={imageUrl}
        alt="게시글 썸네일"
        loading="lazy"
        className="w-full h-40 object-cover rounded-t-xl"
        onError={handleImageError}
      />

      <div className="p-4 space-y-2">
        <p className="text-xs text-indigo-200">{readTime}</p>
        <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{content}</p>
        <p className="text-xs text-gray-400">
          By {author}, {date}
        </p>
      </div>
    </Link>
  );
}
