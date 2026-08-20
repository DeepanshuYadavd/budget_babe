import React, { useEffect, useState } from "react";

const Dahsboard = () => {
  useEffect(() => {
    console.log("running");
    return () => {
      console.log("running after demount");
    };
  }, []);

  return (
    <>
      <div>
        <h1>useEffect </h1>
      </div>
    </>
  );
};

export default Dahsboard;
