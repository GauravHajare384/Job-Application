import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import "./jobs.css";
import Alljobs from "../alljob/Alljobs";
import { FaSearch } from "react-icons/fa";
import Jobfilter from "../Jobfilter/Jobfilter";

const Job = () => {
  
  const Token = Cookies.get("jwttoken");
  const [value, setvalue] = useState({
    jobitem: [],
    search:"",
    empType:[],
    package:""
  });

  useEffect(() => {
    async function getjobdata() {
      const url = `https://apis.ccbp.in/jobs?employment_type=${value.empType}&minimum_package=${value.package}&search=${value.search}`;
      
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      };
      
      const response = await fetch(url, options);
      const jobdata = await response.json();
      // console.log(jobdata)
      if (response.ok === true) { 
        setvalue({ ...value, jobitem: jobdata.jobs });
      }
    }
    
    getjobdata();
  }, [value.search, value.empType, value.package]);
  
  function searchinput(event){
    if(event.key==="Enter"){
    setvalue({...value,search:event.target.value})
    }
  }

  function changeemploymenttype(Jvalue,ischecked){
    if(ischecked===true){
    setvalue({...value,empType:[...value.empType,Jvalue]})
  }else{
    setvalue({...value,empType:value.empType.filter(each=>each!==Jvalue)})
  }
  }

  function filtersalary(svalue){
    setvalue({...value,package:svalue})
  }
  
  return (
    <>
      <Header></Header>
      <div className="main">
          <div className="Jobsearchinput">
            <input onKeyDown={searchinput}  type="search" placeholder=" Search " />
            <button  className="Searchbtn">
              {" "}
              <FaSearch />
            </button>
          </div>
          <div className="LR">
        <div className="left">
          <Jobfilter changesalary={filtersalary} changeempt = {changeemploymenttype} />
        </div>
        <div className="right">
          <ul>
            {value.jobitem.map((each) => (
              <Alljobs jobitem={each} key={each.id}></Alljobs>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default Job;
