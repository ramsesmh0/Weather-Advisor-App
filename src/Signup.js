import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import axios from 'axios';
import { useFetcher, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const SignUp = () => {

  const Navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Registered, setRegistered] = useState("");
  const [Error_registered, setError_registered] = useState("");


 

  
  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/Signup", { Email, Password });
      console.log("User registered:", response.data);
      setRegistered("Registered Successfully");
      setError_registered("");
      Navigate('/home');
      setTimeout(() => {
        setRegistered("");
      }, 2000);
    } catch (error) {
      setRegistered("");
      setError_registered("Error registering user");
      console.error("Error registering user:", error);
    }

  };
  return (
    <div>
      <h1>Sign Up</h1>
      {Registered && <Alert variant="success">{Registered} </Alert>}
      {Error_registered && <Alert variant="danger">{Error_registered}</Alert>}
      <Form onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> What's your email?</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label> Create a Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="enter a password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit"> Sign Up</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignUp;
