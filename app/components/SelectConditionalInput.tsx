import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SELECT_MODELO_OPTIONS } from "../helpers/constants";
import SelectInput from "./SelectInput";

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
    defaultOptions: Option<T>[];
    nameListener: string;
    baseOptions: Option<T>[];
}

export default function SelectConditionalInput<T>({ label, name, placeholder, defaultOptions, nameListener, baseOptions }: Props<T>) {
    const {
        watch
    } = useFormContext();

    const selectedValue = watch(nameListener);
    const [options, setOptions] = useState<Option<T>[]>(defaultOptions);

    useEffect(() => {
        console.log("Selected value changed:", selectedValue, baseOptions);
        if (selectedValue) {
            setOptions(baseOptions.filter(option => option.code === selectedValue));
        }
    }, [selectedValue, nameListener])

    return (
        <SelectInput
            label={label}
            name={name}
            placeholder={placeholder}
            options={options}
        />
    );
}