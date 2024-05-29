import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./jobdetails.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const Jobdetails = () => {
  const { id } = useParams();
  const Token = Cookies.get("jwttoken");
  const [value, setvalue] = useState({
    jobdata: "",
    jskills: [],
    Clife: "",
    sjobs: [],
  });
  useEffect(() => {
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    async function fetchdetails() {
      const response = await fetch(url, options);
      const jdata = await response.json();
      if (response.ok === true) {
        setvalue({
          ...value,
          jobdata: jdata.job_details,
          jskills: jdata.job_details.skills,
          Clife: jdata.job_details.life_at_company,
          sjobs: jdata.similar_jobs,
        });
      }
    }
    fetchdetails();
  }, []);
  const setskill = () => {
    return value.jskills.map((each) => {
      return (
        <li className="skilllist" key={each.name}>
          <img
            src={each.image_url}
            style={{ width: "25px", margin: "0 5px 0 0" }}
 className="skillimg"
            alt="skills"
          />{" "}
          {each.name}
        </li>
      );
    });
  };
  const Setsimilarjobs = () => {
   return value.sjobs.map((seach)=>{
    return(
        <div key={seach.id} className="similarjobsbox">
        <div className="uperjobsection d-flex mb-3" >
            <img
              src={seach.company_logo_url}
              style={{ width: "60px" }}
              alt=""
            />
            <div style={{ marginLeft: "10px" }}>
              <h5>{seach.title}</h5>
              <p className="fa fa-star checked rating"></p>{" "}
              <p className="rname">{seach.rating}</p>
            </div>
          </div>
              <h6>Description</h6> 
          <p style={{fontSize:"15px"}}>{seach.job_description}</p>
          <div className="jobderailline mb-0 lastdiv">
              <p className="fa fa-map-marker marker "> </p>
              <p>{seach.location}</p>
              <p className="fa fa-briefcase"></p>
              <p>{seach.employment_type}</p>
            </div>

  
</div>
    )
   })
  };
  
  return (
    <>
      <Header></Header>
      <div className="jdbg">
        <div className="jdmain">
          <div className="mainjob">
            <div className="uperjobsection d-flex">
              <img
                src={value.jobdata.company_logo_url}
                style={{ width: "70px" }}
                alt=""
              />
              <div style={{ marginLeft: "10px" }}>
                <h4>{value.jobdata.title}</h4>
                <p className="fa fa-star checked rating"></p>{" "}
                <p className="rname">{value.jobdata.rating}</p>
              </div>
            </div>
            <div className="outerdetails">
              <div className="jobderailline">
                <p className="fa fa-map-marker marker"> </p>
                <p>{value.jobdata.location}</p>
                <p className="fa fa-briefcase"></p>
                <p>{value.jobdata.employment_type}</p>
              </div>
              <p className="Apackage">{value.jobdata.package_per_annum}</p>
            </div>
            <hr className="linkhr" />
            <div
              className="d-flex justify-content-between"
              style={{ margin: "5px 0px" }}
            >
              <h6>Description</h6>
              <a
                href={value.jobdata.company_website_url}
                target="blank"
                style={{ textDecoration: "none" }}
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p>{value.jobdata.job_description}</p>
            <br />
            <h5>Skills</h5>
            <div className="jdskill">
              <ul className="skillul">{setskill()}</ul>
            </div>
            <h5>Life at Company</h5>
            <div className="lifeblock">
              <p>{value.Clife.description}</p>
              <img src={value.Clife.image_url} alt="" />
            </div>
          </div>
          <div >
          <h4>Similar Jobs</h4>
          
          <div className="similarjobsmain">{Setsimilarjobs()}</div>
          </div>

        </div>
        </div>
    </>
  );
};

export default Jobdetails;
