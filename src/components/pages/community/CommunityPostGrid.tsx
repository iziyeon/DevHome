import PostCard from "./PostCard";
import { communityDummyPosts } from "../../../data/CommunityDummyPosts";

export default function CommunityPostGrid() {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {communityDummyPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
