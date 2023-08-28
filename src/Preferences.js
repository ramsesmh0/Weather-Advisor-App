import React from "react";
import Navigation_bar from "./Navigation_bar";
import Form from 'react-bootstrap/Form';
import { Button } from "@mui/material";
const Preferences = () => {
    return (
        <div>
            <Navigation_bar/>
            <h1>Preferences</h1>
            <Form>
                <Form.Group>
                    <Form.Label> Save Current City </Form.Label>
                    <Form.Control type = 'password' placeholder="enter Current city" />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Save Destination City </Form.Label>
                    <Form.Control type = 'password' placeholder = "enter a Destination city" />
                </Form.Group>
            </Form>
        </div>
    );
};


export default Preferences;