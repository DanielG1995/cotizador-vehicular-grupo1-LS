import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";

export default function Home() {
  const methods = useForm()

  const onSubmit=(data:any)=>{

  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
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
            Sign In
          </button>
        </form>
        
      </FormProvider>
    </main>
  );
}
