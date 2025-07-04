'use client';

import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import SelectConditionalInput from "../components/SelectConditionalInput";
import {
  SELECT_CIVIL_STATUS_OPTIONS,
  SELECT_GENDER_OPTIONS,
  SELECT_MARCA_OPTIONS,
  SELECT_MODELO_OPTIONS,
  SELECT_TIPO_IDENTIFICACION_OPTIONS,
  SELECT_YEAR_OPTIONS,
} from "../helpers/constants";
import { MESSAGES } from "../helpers/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/form-schema";

export default function Home() {
   const methods = useForm({
      resolver: zodResolver(formSchema),
    });

  const onSubmit = (data: any) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
      <FormProvider {...methods}>
        <div className="w-full max-w-5xl">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full animate-fade-in flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {MESSAGES.SUBMIT_FORM_BUTTON}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* 🧍 Información Personal */}
              <div className="space-y-4">
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
                  placeholder=""
                  type="text"
                  options={SELECT_GENDER_OPTIONS}
                  value=""
                />

                <SelectInput
                  label={MESSAGES.CIVIL_STATUS}
                  name="civilStatus"
                  placeholder=""
                  type="text"
                  options={SELECT_CIVIL_STATUS_OPTIONS}
                  value=""
                />
              </div>

              {/* 🚗 Información del Vehículo */}
              <div className="space-y-4">
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
                  nameListener={"brand"}
                />
                <SelectInput
                  label={MESSAGES.YEAR}
                  name="year"
                  placeholder=""
                  type="text"
                  options={SELECT_YEAR_OPTIONS}
                  value=""
                />
                 <TextInput
                  label={MESSAGES.PRICE}
                  name="price"
                  placeholder=""
                  type="number"
                  value={0}
                />

              </div>
            </div>

            {/* Botón de envío */}
            <div className="mt-8 w-full flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out"
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
