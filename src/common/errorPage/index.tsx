import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = (props: any) => {
  return (
    <div style={styles}>
      <p>Coin Not Found</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

const styles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "150px",
  fontSize: "30px",
};

export default ErrorPage;
