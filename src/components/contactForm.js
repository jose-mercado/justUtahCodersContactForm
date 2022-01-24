import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment'
import axios from "axios";

const Card = styled.form
  `
  position: relative;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  `;

export default function ContactForm(callback, validate) {
  const [agree, setAgree] = useState(false);
  const [contactFormValues, setContactFormValues] = useState({
    name: "", 
    email: "", 
    checkbox: false
  });

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  }

  
  const inputChange = (e) => {
    const { name, value } = e.target;
      // console.log(`name: ${name}, value: ${value}`);
    const inputValue = value;
      // console.log("inputValue: ", inputValue
      setContactFormValues({ ...contactFormValues, [name]: inputValue});
    } 

  const onFormSubmit  = (e) => {

    console.log('Submitted and Displayed on Next Line');
    e.preventDefault();
    const submit = [{
        email: contactFormValues.email,
        name: contactFormValues.name,
        checkbox: contactFormValues.checkbox,
    }]
    console.log(submit);

    axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', {
      contactFormValues
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });;
}

const resetForm = () => {
  setContactFormValues({
    name: "", 
    email: "", 
    birthDate:  moment().format('DD MMM, YYYY'), 
    checkbox: false
  })
}

const isEnabled = contactFormValues.email.length > 0 && contactFormValues.name.length > 0 ; 

  return (
    <Card onSubmit={onFormSubmit}>
        <div className="main-content">
          <h1> Contact Us </h1>
          <label htmlFor="name">
            Name
            <input
              placeholder='Name'
              type="text"
              id="name"
              name="name"
              value={contactFormValues.name}
              onChange={inputChange}
            />
          </label>
        
          <label htmlFor="email">
            Email
            <input
              placeholder='Email'
              type="email"
              id="email"
              name="email"
              value={contactFormValues.email}
              onChange={inputChange}
            />
          </label>
        
          <label htmlFor="name">
            Birth Date
            <input
              required pattern="\d{1,2}/\d{1,2}/\d{4}"
              placeholder='dd/mm/yyyy'
              type="text"
              name="Birth Date"
              selected={contactFormValues.birthDate}
              onChange={inputChange}
            />
          </label>

          <label htmlFor="checkBox">
            I agree to be contacted via Email
            <input
              type="checkbox"
              id="agree"
              name="checkbox"
              value={contactFormValues.checkbox}
              onChange={checkboxHandler}
            />
          </label>
        </div>
    <button onClick={resetForm} className="button" type="reset">Clear</button>
    <button disabled={!isEnabled} className="button" type="submit">Submit</button>
    </Card>
  );
}
