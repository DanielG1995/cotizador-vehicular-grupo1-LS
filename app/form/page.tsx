'use client';

import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import SelectConditionalInput from "../components/SelectConditionalInput";
import DateInput from "../components/DateInput";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SELECT_CIVIL_STATUS_OPTIONS,
  SELECT_GENDER_OPTIONS,
  SELECT_MARCA_OPTIONS,
  SELECT_MODELO_OPTIONS,
  SELECT_PROVINCE_OPTIONS,
  SELECT_CITY_OPTIONS,
  SELECT_TIPO_IDENTIFICACION_OPTIONS,
  SELECT_YEAR_OPTIONS,
  MIN_YEARS_BIRTH,
} from "../helpers/constants";
import { MESSAGES } from "../helpers/messages";
import { formSchema } from "../schemas/form-schema";

// 🧠 Utilidad para calcular la fecha máxima de nacimiento
const getMaxBirthDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - MIN_YEARS_BIRTH);
  return date.toISOString().split("T")[0];
};

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <FormProvider {...methods}>
        <div className="w-full max-w-6xl">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="bg-white rounded-3xl shadow-2xl px-10 py-12 w-full animate-fade-in"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {MESSAGES.SUBMIT_FORM_BUTTON}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 🧍 Información Personal */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-indigo-700 border-b pb-2">
                  {MESSAGES.PERSONAL_INFORMATION}
                </h3>

                <SelectInput
                  label={MESSAGES.TYPE_IDENTIFICATION}
                  name="typeIdentification"
                  placeholder="Selecciona un tipo"
                  type="text"
                  options={SELECT_TIPO_IDENTIFICACION_OPTIONS}
                  value=""
                />

                <TextInput
                  label={MESSAGES.IDENTIFICATION_NUMBER}
                  name="identificationNumber"
                  type="text"
                  value=""
                />

                <SelectInput
                  label={MESSAGES.GENDER}
                  name="gender"
                  type="text"
                  options={SELECT_GENDER_OPTIONS}
                  value=""
                />

                <DateInput
                  name="birthDate"
                  label={MESSAGES.BIRTH_DATE}
                  required
                  max={getMaxBirthDate()}
                />

                <SelectInput
                  label={MESSAGES.CIVIL_STATUS}
                  name="civilStatus"
                  type="text"
                  options={SELECT_CIVIL_STATUS_OPTIONS}
                  value=""
                />

                <SelectInput
                  label={MESSAGES.PROVINCE}
                  name="province"
                  options={SELECT_PROVINCE_OPTIONS}
                  value=""
                />

                <SelectConditionalInput
                  label={MESSAGES.CITY}
                  name="city"
                  nameListener="province"
                  defaultOptions={[]}
                  baseOptions={SELECT_CITY_OPTIONS}
                  value=""
                />
              </section>

              {/* 🚗 Información del Vehículo */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-indigo-700 border-b pb-2">
                  {MESSAGES.VEHICLE_INFORMATION}
                </h3>

                <SelectInput
                  label={MESSAGES.BRAND}
                  name="brand"
                  options={SELECT_MARCA_OPTIONS}
                  value=""
                />

                <SelectConditionalInput
                  label={MESSAGES.MODEL}
                  name="model"
                  type="text"
                  value=""
                  defaultOptions={[]}
                  baseOptions={SELECT_MODELO_OPTIONS}
                  nameListener="brand"
                />

                <SelectInput
                  label={MESSAGES.YEAR}
                  name="year"
                  type="text"
                  options={SELECT_YEAR_OPTIONS}
                  value=""
                />

                <TextInput
                  label={MESSAGES.PRICE}
                  name="price"
                  type="number"
                  value={0}
                />
              </section>
            </div>

            <div className="mt-12 w-full flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 ease-in-out"
              >
                {MESSAGES.SUBMIT_FORM_BUTTON}
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
    </main>
  );
}
