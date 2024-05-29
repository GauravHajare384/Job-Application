import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const token = Cookies.get("jwttoken");
  useEffect(() => {
    if (token !== undefined) navigation("/");
  }, []);

  const navigation = useNavigate();

  const subbmitdetails = async (event) => {
    event.preventDefault();
    const url = "https://apis.ccbp.in/login";

    const userdetails = {
      username: values.username,
      password: values.password,
      showerrormsg: false,
      errormsg: "",
    };

    const option = {
      method: "POST",
      body: JSON.stringify(userdetails),
    };

    const response = await fetch(url, option);
    const dataf = await response.json();

    if (response.ok === true) {
      setvalues({ ...values, showerrormsg: false, errormsg: "" });
      Cookies.set("jwttoken", dataf.jwt_token);
      navigation("/");
    } else {
      setvalues({ ...values, showerrormsg: true, errormsg: dataf.error_msg });
    }
  };
  function usernamechange(event) {
    setvalues({ ...values, username: event.target.value });
  }
  function passwordchange(event) {
    setvalues({ ...values, password: event.target.value });
  }

  return (
    <div className="login-cont">
      <form className="form-cont" onSubmit={subbmitdetails}>
        <div className="img-cont">
          <img
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            onChange={usernamechange}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={passwordchange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {values.showerrormsg ? <p>{values.errormsg}</p> : null}
      </form>
    </div>
  );
}

export default Login;
