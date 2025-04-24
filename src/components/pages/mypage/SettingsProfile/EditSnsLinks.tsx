import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../stores/useUserStore";

const snsFields = ["github", "notion", "blog", "instagram", "x"];

export default function EditSnsLinks() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [snsLinks, setSnsLinks] = useState<{ [key: string]: string }>({});
  const [snsLinksVisible, setSnsLinksVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.snsLinks) setSnsLinks(user.snsLinks);

    const initialVisible = user?.snsLinksVisible
      ? Object.fromEntries(
          Object.entries(user.snsLinksVisible).map(([key, val]) => [
            key,
            val ?? true,
          ])
        )
      : Object.fromEntries(snsFields.map((key) => [key, true]));

    setSnsLinksVisible(initialVisible);
  }, [user?.snsLinks, user?.snsLinksVisible]);

  const handleChange = (key: string, value: string) => {
    setSnsLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleVisible = (key: string) => {
    setSnsLinksVisible((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? true),
    }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);
    const newData = {
      ...user,
      snsLinks,
      snsLinksVisible,
      updatedAt: new Date(),
    };

    await setDoc(userRef, newData);
    setUser(newData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {snsFields.map((field) => {
        const value = snsLinksVisible[field] ?? true;
        return (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-white capitalize">
              {field}
            </label>
            <input
              type="url"
              value={snsLinks[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className="input input-bordered w-full bg-[#1f2937] text-white placeholder-white/40"
              placeholder={`https://${field}.com/yourname`}
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-white">메인화면에 표시</span>
              <button
                type="button"
                onClick={() => handleToggleVisible(field)}
                className={`btn btn-xs px-4 transition ${
                  value
                    ? "border-indigo-300 text-indigo-300"
                    : "border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300"
                }`}
              >
                {value ? "표시됨" : "숨김"}
              </button>
            </div>
          </div>
        );
      })}

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="btn btn-outline btn-sm border-white/20 text-white hover:border-indigo-300 hover:text-indigo-300 transition"
        >
          저장
        </button>
      </div>

      {saved && (
        <p className="text-green-400 mt-2 text-right">저장되었습니다 ✅</p>
      )}
    </div>
  );
}
