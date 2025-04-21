// src/components/pages/signup/InputWithCheck.tsx

import { ReactNode } from "react";

interface InputWithCheckProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: ReactNode;
  onCheck: () => void;
  checkLabel: string;
  error?: string;
}

export default function InputWithCheck({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  onCheck,
  checkLabel,
  error,
}: InputWithCheckProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-white rounded-full px-4 py-2 flex-grow">
          {icon}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent text-white flex-grow focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          type="button"
          onClick={onCheck}
          className="h-full px-4 btn btn-outline rounded-full text-white border-white/20 hover:text-indigo-300 hover:border-indigo-300 transition whitespace-nowrap"
        >
          {checkLabel}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
