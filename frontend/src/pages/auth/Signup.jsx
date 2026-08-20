import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import bear from "../../lottie/DancingBear.json";
import apiClient from "../../ApiClient/interceptor";
const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(true);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (formData) => {
    try {
      const response = await apiClient.post("auth/signup", formData);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    setFormData({
      userName: "",
      email: "",
      password: "",
    });
  };

  const LottieComponent = Lottie.default || Lottie;

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">userName: </label>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              value={formData.userName}
            />
          </div>
          <div>
            <label htmlFor="">Email: </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="">password: </label>
            <input
              type={visible ? "password" : "text"}
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            <div>
              {visible ? (
                <Eye
                  onClick={() => {
                    setVisible(!visible);
                  }}
                />
              ) : (
                <EyeOff
                  onClick={() => {
                    setVisible(!visible);
                  }}
                />
              )}
            </div>
          </div>
          <button type="submit"> submit</button>
        </form>
        <div>
          {/*  lottie */}
          <LottieComponent animationData={bear} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Signup;
