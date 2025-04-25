import { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../stores/useUserStore";

const snsFields = ["github", "notion", "blog", "instagram", "x"];

export default function EditSnsLinks() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [snsLinks, setSnsLinks] = useState<{
    [key: string]: string | undefined;
  }>(user?.snsLinks || {});
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSnsLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    const userRef = doc(db, "users", user.uid);
    const newData = {
      ...user,
      snsLinks,
      updatedAt: Timestamp.fromDate(new Date()),
    };
    await setDoc(userRef, newData);
    setUser(newData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      {snsFields.map((field) => (
        <div key={field}>
          <label className="block text-sm mb-1 capitalize">{field}</label>
          <input
            type="url"
            value={snsLinks[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className="input input-bordered w-full bg-[#1f2937] text-white placeholder-white/40"
            placeholder={`https://${field}.com/yourname`}
          />
        </div>
      ))}
      <div className="pt-2 flex justify-end">
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
