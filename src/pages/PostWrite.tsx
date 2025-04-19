import { Link } from "react-router-dom";
import { FilePlus } from "lucide-react";
import PostWriteForm from "../components/pages/communityWrite/PostWriteForm";

export default function PostWrite() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <FilePlus size={20} />
          글쓰기
        </h1>

        <Link
          to="/community"
          className="btn btn-sm btn-outline text-white border-gray-500 hover:border-white"
        >
          목록
        </Link>
      </div>

      <PostWriteForm />
    </div>
  );
}
