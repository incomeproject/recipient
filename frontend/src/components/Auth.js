import React, { useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  let session = useSessionContext();
  if (session.loading) {
    return null;
  }
  let { doesSessionExist, userId, accessTokenPayload } = session;

  if (doesSessionExist) {
    return (
      <div>
        <p>Hi {email}</p>
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
