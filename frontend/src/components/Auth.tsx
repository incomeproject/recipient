import React, { useState } from "react";
import {
  useSessionContext,
  getUserId,
  signOut,
} from "supertokens-auth-react/recipe/session";

const Auth = () => {
  let session = useSessionContext();

  if (session.loading) {
    <p>it's loading and doesn't refresh</p>;
    return null;
  }

  if (session.doesSessionExist) {
    return (
      <div>
        <p>Hi {session.userId}</p>
        <p onClick={async () => await signOut()}>logout</p>
      </div>
    );
  }
  return (
    <section>
      <h1>Welcome</h1>
      <h2></h2>
    </section>
  );
};

export default Auth;
