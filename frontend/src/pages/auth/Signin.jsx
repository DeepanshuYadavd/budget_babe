import { FormInput } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import apiClient from "../../ApiClient/interceptor";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signin = async (formData) => {
    try {
      const response = await apiClient.post("auth/signin", formData);
      console.log(response, "test");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signin(formData);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <h1>Sign in </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">email :</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="">password :</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button>submit</button>
        </form>
      </div>
    </>
  );
};

export default Signin;
