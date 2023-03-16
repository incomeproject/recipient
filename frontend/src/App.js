import "./App.css";

// React & Router
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

// SuperTokens
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";

// Constants
import {
  appName,
  apiDomain,
  websiteDomain,
  apiBasePath,
  websiteBasePath,
} from "./common/constants";

// Pages
import Home from "./pages/Home.js";

SuperTokens.init({
  appInfo: {
    appName: appName,
    apiDomain: apiDomain,
    websiteDomain: websiteDomain,
    apiBasePath: apiBasePath,
    websiteBasePath: websiteBasePath,
  },
  recipeList: [
    EmailPassword.init({
      style: `
              [data-supertokens~=container] {
                  --palette-background: 51, 51, 51;
                  --palette-inputBackground: 41, 41, 41;
                  --palette-inputBorder: 41, 41, 41;
                  --palette-textTitle: 255, 255, 255;
                  --palette-textLabel: 255, 255, 255;
                  --palette-textPrimary: 255, 255, 255;
                  --palette-error: 173, 46, 46;
                  --palette-textInput: 169, 169, 169;
                  --palette-textLink: 169, 169, 169;
              }
              [data-supertokens~=superTokensBranding] {
                display: none;
              }
            `,
    }),
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    Session.init(),
  ],
});

const App = () => {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/*This renders the login/signup UI at route /apiBasePath */}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
};

export default App;
