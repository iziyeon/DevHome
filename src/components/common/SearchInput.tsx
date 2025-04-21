// src/components/common/SearchInput.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchInputProps {
  placeholder?: string;
  queryKey?: string;
  navigateTo: string;
}

export default function SearchInput({
  placeholder = "검색어 입력",
  queryKey = "keyword",
  navigateTo,
}: SearchInputProps) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    navigate(`${navigateTo}?${queryKey}=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setKeyword("");
  }, [location.pathname]);

  return (
    <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input input-sm w-full text-white bg-[#1f2937] border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="btn btn-outline btn-sm w-full sm:w-auto border-white/20 text-white hover:text-indigo-300 hover:border-indigo-300 transition-colors duration-200"
      >
        검색
      </button>
    </div>
  );
}
