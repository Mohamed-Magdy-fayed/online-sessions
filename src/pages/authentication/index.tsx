import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Typography from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import Copyright from "@/components/Copyright";
import { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

const AuthenticationPage = () => {
  const [variant, setVariant] = useState<"login" | "register">("login");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);

    if (session.status === "authenticated") router.push("/");
  }, [session.status]);

  return (
    <main className="min-h-screen bg-slate-50 p-4">
      {variant === "register" ? (
        <RegisterForm></RegisterForm>
      ) : (
        <LoginForm></LoginForm>
      )}
      <div>
        <div>
          <Link href="/passwordReset">Forgot password?</Link>
        </div>
        <div className="flex items-center gap-2">
          <Typography>
            {variant === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Typography>
          <Button
            variant="link"
            className="bg-transparent normal-case underline decoration-primary/30 hover:bg-transparent hover:underline hover:decoration-primary/70"
            onClick={() =>
              setVariant(variant === "login" ? "register" : "login")
            }
          >
            <Typography>
              {variant === "login" ? "Sign Up" : "Sign In"}
            </Typography>
          </Button>
        </div>
      </div>
      <Copyright />
      <div className="div mt-8 place-content-center border-t border-t-slate-700 pt-8">
        <Button
          className="flex items-center gap-4 bg-slate-200 normal-case text-slate-700 hover:bg-slate-300"
          onClick={() => signIn("google")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#DB4437]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Google
        </Button>
      </div>
    </main>
  );
};

export default AuthenticationPage;
