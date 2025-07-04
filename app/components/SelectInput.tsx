import { useFormContext } from "react-hook-form";

interface Option<T> {
    value: string;
    label: string;
    [key: string]: T | string;
}

interface Props<T> {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    value?: string;
    options: Option<T>[];
    disabled?: boolean;
}

export default function SelectInput<T>({ label, name, options }: Props<T>) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const disabled = options.length === 0;
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <select
                disabled={disabled}
                id={name}
                {...register(name, { required: true })}
                className={`rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 transition-all duration-200 shadow-sm ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <span className="text-sm text-red-500 mt-1">{errors[name]?.message as string}</span>
            )}
        </div>
    );
}