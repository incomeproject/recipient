import React, { useState } from "react";
import {
  useSessionContext,
  SessionAuth,
} from "supertokens-auth-react/recipe/session";

import Auth from "../components/Auth";

const Home = () => {
  return (
    <section>
      <h1>Home Page</h1>
      <SessionAuth requireAuth={false}>
        <Auth />
      </SessionAuth>
    </section>
  );
};

export default Home;
