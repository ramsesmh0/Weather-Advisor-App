import { Button } from "@mui/material";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Signin = () => {
  const Navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Success, setSuccess] = useState("");
  const [Fail_Login, setFail_login] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/Login", { Email, Password });
      console.log("User logged in:", response.data);
      setFail_login("");
      Navigate("/home"); // Redirect to the "home" page on successful login
      setSuccess("Login Successful");


      //clear message after 2 seconds

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setFail_login("Invalid Credentials, try again");  
      setSuccess("");
      console.error("Error logging in:", error);
    }
  };


  const handleSignUpRedirect = () => {
    Navigate("/Signup");
  };
  return (
<>
    <div>
      <h1>Sign in</h1>
      {Success && <Alert variant="success">{Success}</Alert>}
      {Fail_Login && <Alert variant="danger">{Fail_Login}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Email: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label> Username: </Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type = "submit"> Log in</Button>
        </Form.Group>
      </Form>
    </div>
    <br></br>
    <Button  onClick={handleSignUpRedirect} type = "submit"> Or Sign Up </Button>
</>
  );
};

export default Signin;
