import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <Header></Header>
      <div className="bg">
        <div className="in">
          <h1>
            Find The Job That Fits <br /> Your Life
          </h1>
          <br /> <br />
          <h5>
            Millions of people are searching for jobs, salary <br />{" "}
            information, company reviews. Find the job that fits <br /> your
            abilities and potential.
          </h5>
          <br />
          <Link to={"/jobs"}>
            <button className="btn btn-primary">job search</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
