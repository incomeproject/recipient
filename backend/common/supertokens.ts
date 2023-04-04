import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Dashboard from "supertokens-node/recipe/dashboard";

import {
  backendPort,
  frontendPort,
  supertokensURI,
  supertokensAPIKey,
} from "./constants";

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: supertokensURI,
    apiKey: supertokensAPIKey,
  },
  appInfo: {
    appName: "Income Project",
    apiDomain: `http://localhost:${backendPort}`,
    websiteDomain: `http://localhost:${frontendPort}`,
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
