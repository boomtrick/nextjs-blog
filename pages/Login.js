import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
function Login() {
    const { data: session, status } = useSession()

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn("ID4")}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}

export default Login;