import React from "react";
import { Link } from "react-router-dom";
import "./alljobs.css";

function Alljobs(props) {
  const { jobitem } = props;

  return (
    <>
      <Link style={{textDecoration:"none"}} to={`/jobs/${jobitem.id}`}>
        <li className="joblist">
        <div className="bgjobsearch">
          <div className="uperjobsection d-flex">
            <img
              src={jobitem.company_logo_url}
              style={{ width: "70px" }}
              alt=""
            />
            <div style={{ marginLeft: "10px" }}>
              <h4>{jobitem.title}</h4>
              <p className="fa fa-star checked rating"></p>{" "}
              <p className="rname">{jobitem.rating}</p>
            </div>
          </div>
          <div className="outerdetails">
            <div className="jobderailline">
              <p className="fa fa-map-marker marker"> </p>
              <p>{jobitem.location}</p>
              <p className="fa fa-briefcase"></p>
              <p>{jobitem.employment_type}</p>
            </div>
            <p className="Apackage">{jobitem.package_per_annum}</p>
          </div>
          <hr className="linkhr" />
          <h6>Description</h6> 
          <p>{jobitem.job_description}</p>
        </div>
      </li></Link>
    </>
  );
}

export default Alljobs;
