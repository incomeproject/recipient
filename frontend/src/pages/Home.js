import "./Home.css";
import React from "react";

import Auth from "../components/Auth";

const Home = (props) => {
  return (
    <section>
      <Auth />
      <h1>Welcome</h1>
      <h2></h2>
    </section>
  );
};

export default Home;
