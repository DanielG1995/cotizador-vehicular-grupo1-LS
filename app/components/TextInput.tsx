import { useFormContext } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
}

export default function TextInput({ label, name, placeholder, type = "text" }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true })}
        className="rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 transition-all duration-200 shadow-sm"
      />
      {errors[name] && (
        <span className="text-sm text-red-500 mt-1">This field is required</span>
      )}
    </div>
  );
}