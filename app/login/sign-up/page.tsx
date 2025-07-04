'use client';
import TextInput from "../../components/TextInput";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Login</h1>
        <FormProvider {...methods}>
          <form className="space-y-4">
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
             <TextInput
              label="Password"
              name="password-2"
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
