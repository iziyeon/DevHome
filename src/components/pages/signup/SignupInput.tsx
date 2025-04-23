import { ReactNode } from "react";

interface SignupInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: ReactNode;
  error?: string;
}

export default function SignupInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  error,
}: SignupInputProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <div className="flex items-center border border-white rounded-full px-4 py-2 flex-1 min-w-0">
        {icon}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent text-white w-full focus:outline-none placeholder:text-gray-400"
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
