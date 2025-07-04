'use client';

import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import SelectConditionalInput from "../components/SelectConditionalInput";
import {
  MIN_YEARS_BIRTH,
  SELECT_CITY_OPTIONS,
  SELECT_CIVIL_STATUS_OPTIONS,
  SELECT_GENDER_OPTIONS,
  SELECT_MARCA_OPTIONS,
  SELECT_MODELO_OPTIONS,
  SELECT_PROVINCE_OPTIONS,
  SELECT_TIPO_IDENTIFICACION_OPTIONS,
  SELECT_YEAR_OPTIONS,
} from "../helpers/constants";
import { MESSAGES } from "../helpers/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/form-schema";
import DateInput from "../components/DateInput";
import { redirect } from "next/navigation";
import { useFetchData } from "../api/useFetchData";
import { URL_SAVE_FORM } from "../helpers/urls";
import { toast } from "sonner";
import { PLANS_ROUTE } from "../helpers/routes";

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const { fetchDataPrivate } = useFetchData(URL_SAVE_FORM);

  const onSubmit = (data: any) => {
    try {
      const resp = toast.promise(
        fetchDataPrivate<SignUpFormData>(data).then((response) => {
          if (response instanceof Error) {
            throw response;
          }

        }),
        {
          loading: "Loading...",
          success: MESSAGES.SAVE_FORM,
          error: (err) => {
            if (err instanceof Error) {
              return err.message;
            }
            return MESSAGES.SAVE_FORM_FAILED;
          },
        }
      );
      resp.unwrap().then(() => { redirect(PLANS_ROUTE); });
    } catch (error) {
      toast.error(MESSAGES.SAVE_FORM_FAILED);
    }


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

                <DateInput
                  name="birthDate"
                  label={MESSAGES.BIRTH_DATE}
                  required
                  maxDate={new Date().setFullYear(new Date().getFullYear() - MIN_YEARS_BIRTH)}
                />

                <SelectInput
                  label={MESSAGES.CIVIL_STATUS}
                  name="civilStatus"
                  placeholder=""
                  type="text"
                  options={SELECT_CIVIL_STATUS_OPTIONS}
                  value=""
                />

                <SelectInput
                  label={MESSAGES.PROVINCE}
                  name="province"
                  placeholder=""
                  options={SELECT_PROVINCE_OPTIONS}
                  value=""
                />

                <SelectConditionalInput
                  label={MESSAGES.CITY}
                  name="city"
                  placeholder=""
                  nameListener="province"
                  defaultOptions={[]}
                  baseOptions={SELECT_CITY_OPTIONS}
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
