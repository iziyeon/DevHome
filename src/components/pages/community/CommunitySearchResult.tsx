import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const postsPerPage = 6;

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  createdAt?: Timestamp;
}

const categoryList = [
  "기능구현팁",
  "라이브러리추천",
  "프로젝트공유",
  "포트폴리오공유",
  "면접후기",
  "커리어토크",
  "공지사항",
];

export default function CommunitySearchResult() {
  const location = useLocation();
  const keyword =
    new URLSearchParams(location.search).get("keyword")?.toLowerCase() || "";

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const ref = collection(db, "communityPosts");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            content: data.content,
            category: data.category || "",
            date: data.createdAt?.toDate().toLocaleDateString("ko-KR") || "",
            createdAt: data.createdAt,
          } as CommunityPost;
        });
        setPosts(docs);
      } catch (error) {
        console.error("❌ 게시글 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, sortOption, selectedCategory]);

  const filteredPosts = useMemo(() => {
    let list = posts;

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (keyword) {
      list = list.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword)
      );
    }

    list = [...list].sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return sortOption === "latest" ? timeB - timeA : timeA - timeB;
    });

    return list;
  }, [posts, keyword, selectedCategory, sortOption]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const highlightKeyword = (text: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword ? (
        <mark key={i} className="text-indigo-300 bg-transparent font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
        <Search size={20} />
        <span>
          &quot;{keyword}&quot; 검색 결과{" "}
          <span className="text-indigo-300">{filteredPosts.length}건</span>
        </span>
      </h2>

      <div className="flex flex-wrap gap-4 items-center text-sm">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as "latest" | "oldest")}
          className="select select-sm bg-[#1f2937] text-white border-white/10"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-sm bg-[#1f2937] text-white border-white/10"
        >
          <option value="">전체 카테고리</option>
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {!loading && currentPosts.length > 0 ? (
        <>
          <ul className="space-y-2 text-sm text-gray-300">
            {currentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/community/post/${post.id}`}
                  className="hover:text-indigo-300 transition"
                >
                  {highlightKeyword(post.title)}
                  <span className="ml-2 text-xs text-white/40">
                    - {post.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-2 pt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline text-white border-white/20 disabled:opacity-40"
            >
              이전
            </button>
            <span className="text-sm text-gray-300 pt-[7px]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline text-white border-white/20 disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </>
      ) : (
        !loading && (
          <p className="text-center text-gray-400 py-20">
            검색 결과가 없습니다.
          </p>
        )
      )}
    </div>
  );
}
