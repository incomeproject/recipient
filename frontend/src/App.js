import "./App.css";
import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appName: "Income Project",
    apiDomain: "http://localhost:8080",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
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
    Session.init(),
  ],
});

function App() {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          {/*Your app routes*/}
          <Route exact path="/" element={<h1>Home Page</h1>} />
          {/* <Route exact path="page1" element={<Page1 />} /> */}
          {/* <Route exact path="page2" element={<Page2 />} /> */}
          {/* <Route exact path="page3" element={<Page3 />} /> */}
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}

export default App;
