import { Link } from "react-router-dom";

interface PostCardProps {
  id: string;
  title: string;
}

export default function PostCard({ id, title }: PostCardProps) {
  return (
    <Link to={`/posts/${id}`}>
      <h3>{title}</h3>
    </Link>
  );
}
