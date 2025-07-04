'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { signUpSchema } from "@/app/schemas/sign-up-schema";
import { useFetchData } from "@/app/api/useFetchData";
import { URL_SIGN_UP } from "@/app/helpers/urls";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/app/helpers/routes";
import { MESSAGES } from "@/app/helpers/messages";


export default function Home() {
  const { fetchData } = useFetchData(URL_SIGN_UP);
  const methods = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const resp = await fetchData<SignUpFormData>(data);
    if (resp instanceof Error) {
      toast.error(resp.message);
      return;
    }
    toast.success(MESSAGES.SIGN_UP_SUCCESS);
    methods.reset();
    redirect(LOGIN_ROUTE);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Sign Up</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              type="text"
              value=""
            />
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="text"
              value=""
            />
            <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value=""
            />
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter your password"
              type="password"
              value=""
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-3 mt-4"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
