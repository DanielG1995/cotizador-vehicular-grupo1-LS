'use client';
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import { useFetchData } from "../api/useFetchData";
import { URL_SIGN_IN } from "../helpers/urls";
import { signInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { MESSAGES } from "../helpers/messages";

export default function Home() {
  const { fetchData } = useFetchData(URL_SIGN_IN);
  const methods = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const resp = await fetchData<SignInFormData>(data);
    if (resp instanceof Error) {
      toast.error(resp.message);
      return;
    }
    if (resp?.data?.token) {
      localStorage.setItem("session", JSON.stringify({ ...resp?.data?.user, token: resp?.data?.token }));
      redirect('/form');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">{MESSAGES.LOGIN}</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value=""
            />
            <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value=""
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-3 mt-4"
            >
              {MESSAGES.LOGIN}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            {MESSAGES.USER_NOT_REGISTERED}{" "}
            <a href="/login/sign-up" className="text-indigo-600 hover:underline">
              {MESSAGES.SIGN_UP}
            </a>
          </p>
        </FormProvider>
      </div>
    </main>
  );
}
