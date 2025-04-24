import { useState } from "react";
import { useUserStore } from "../../../../stores/useUserStore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Trash2, Plus } from "lucide-react";

interface CategoryItem {
  key: string;
  label: string;
}

export default function EditCategoryLabels() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const initialItems: CategoryItem[] = user?.categoryLabels
    ? Object.entries(user.categoryLabels).map(([key, label]) => ({
        key,
        label,
      }))
    : [];

  const [categories, setCategories] = useState<CategoryItem[]>(initialItems);

  const handleChange = (
    index: number,
    field: "key" | "label",
    value: string
  ) => {
    setCategories((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    setCategories((prev) => [...prev, { key: "", label: "" }]);
  };

  const handleRemove = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    const newCategoryLabels: { [key: string]: string } = {};
    for (const item of categories) {
      if (item.key && item.label) {
        newCategoryLabels[item.key] = item.label;
      }
    }

    const updatedUser = {
      ...user,
      categoryLabels: newCategoryLabels,
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), updatedUser);
    setUser(updatedUser);
    alert("카테고리 목록이 저장되었습니다.");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">카테고리 관리</h3>

      <div className="space-y-4">
        {categories.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="key (예: tech)"
              value={item.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="input input-bordered w-1/3 bg-white/10 text-white border-white/10 placeholder-gray-400 focus:border-indigo-300 text-sm"
            />
            <input
              type="text"
              placeholder="이름 (예: 기술 노트)"
              value={item.label}
              onChange={(e) => handleChange(index, "label", e.target.value)}
              className="input input-bordered flex-1 bg-white/10 text-white border-white/10 placeholder-gray-400 focus:border-indigo-300 text-sm"
            />
            <button
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-red-400 transition p-1"
              aria-label="삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={handleAdd}
          className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition flex items-center gap-1"
        >
          <Plus size={14} />새 카테고리 추가
        </button>
      </div>

      <div className="text-right pt-2">
        <button
          onClick={handleSave}
          className="btn btn-sm btn-outline text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300"
        >
          저장
        </button>
      </div>
    </div>
  );
}
