import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Dashboard from "supertokens-node/recipe/dashboard";

import { env } from "./constants";

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: env.SUPERTOKENS_URI,
    apiKey: env.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Income Project",
    apiDomain: `http://localhost:${env.BACKEND_PORT}`,
    websiteDomain: `http://localhost:${env.FRONTEND_PORT}`,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    Dashboard.init(),
    Session.init(), // initializes session features
  ],
});

export default supertokens;
