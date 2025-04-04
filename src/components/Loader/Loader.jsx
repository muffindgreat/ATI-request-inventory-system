import React from "react";
import "./loader.css";

const Loader = ({ transparent }) => {
  return (
    <div
      style={{
        position: transparent ? "absolute" : "static",
        inset: transparent ? "0" : "auto",
        backgroundColor: transparent
          ? "rgba(200, 200, 200, 0.25)"
          : "transparent",
        display: "grid",
        placeItems: "center",
        height: transparent ? "100%" : "100vh",
        width: "100%",
        zIndex: transparent ? 10 : "auto",
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
