import { useFormContext } from "react-hook-form";

type Props = {
    label: string;
    name: string;
    required?: boolean;
    maxDate?: number;
};

export default function DateInput({ label, name, required = false, maxDate }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message as string;

    

    return (
        <div className="flex flex-col space-y-1">
             <label htmlFor={name} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                max={maxDate ? new Date(maxDate).toISOString().split("T")[0] : undefined}
                type="date"
                {...register(name, {
                    required: required ? "Este campo es obligatorio" : false,
                })}
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
