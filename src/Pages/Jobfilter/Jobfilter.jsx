import React, { useEffect, useState } from "react";
import "./jobfilter.css";
import Cookies from "js-cookie";

const employmenttype = [
  {
    label: "Full Time",
    employmenttypeid: "FULLTIME",
  },
  {
    label: "Part time",
    employmenttypeid: "PARTTIME",
  },
  {
    label: "Freelance",
    employmenttypeid: "FREELANCE",
  },
  {
    label: "Internship",
    employmenttypeid: "INTERNSHIP",
  },
];
const salaryrange = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

function Jobfilter(props) {

  const {changeempt} = props
  const {changesalary} = props
  
  const Token = Cookies.get("jwttoken");
  const [value, setvalue] = useState({
    profiledata: {},
  });

  useEffect(() => {
    async function profile() {
      const url = "https://apis.ccbp.in/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };

      const response = await fetch(url, options);
      const Fprofiledata = await response.json();

      if (response.ok === true) {
        setvalue({ ...value, profiledata: Fprofiledata.profile_details });
      }
    }
    profile();
  }, []);
  
  function oncheckedbox(event){
    changeempt(event.target.value,event.target.checked)
  }
  
  const showemploylist = () => {
    return employmenttype.map((each) => {
      // console.log(each.label)
      return (
        <li className="emplist" key={each.employmenttypeid}>
          <input
            onChange={oncheckedbox}
            type="checkbox"
            className="empinput"
            value={each.employmenttypeid}
            id={each.employmenttypeid}
          />
          <label htmlFor={each.employmenttypeid} className="emplabel">
            {each.label}
          </label>
        </li>
      );
    });
  };

  function setsalary(event){
    changesalary(event.target.value)
  }
  
  const Showsalaryrange = () => {
    return salaryrange.map((eachsalary) => {
      return (
        <li className="emplist"  key={eachsalary.salaryRangeId}>
          <input
            onChange={setsalary}
            style={{marginLeft:"7px"}}
            type="radio"
            name="salary"
            id={eachsalary.salaryRangeId}
            value={eachsalary.salaryRangeId}
            />
          <label className="emplabel" htmlFor={eachsalary.salaryRangeId}>{eachsalary.label}</label>
        </li>
      );
    });
  };

  
  return (
    <>
      <div className="mainFilter">
        <div className="profilesection">
          <img
            src={value.profiledata.profile_image_url}
            alt="profile"
            className="Profilelogo"
          />
          <h6 className="profilename">{value.profiledata.name}</h6>
          <p className="prodesc">{value.profiledata.short_bio}</p>
        </div>
        <hr style={{ border: "1px solid white" }} />
        <div className="emolist">
          <h3>Type of Employment</h3>
          <ul>{showemploylist()}</ul>
        </div>
        <hr style={{ border: "1px solid white" }} />
        <div className="emolist">
          <h3>Salary Range</h3>
          <ul>{Showsalaryrange()}</ul>
        </div>
      </div>
    </>
  );
}

export default Jobfilter;
