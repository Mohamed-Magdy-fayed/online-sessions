import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") router.push("/authentication");
  }, [session.status]);

  return (
    <>
      <main className="">
        <button onClick={() => signOut()}>signout</button>
      </main>
    </>
  );
}
