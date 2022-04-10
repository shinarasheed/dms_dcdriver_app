import React from "react";
import { useSelector } from "react-redux";
import Nigeria from "../../components/Customers/Nigeria";
import Uganda from "../../components/Customers/Uganda";

const index = () => {
  const userState = useSelector((state) => state.user);

  const {
    user: { country },
  } = userState;

  return <>{country === "UG" ? <Uganda /> : <Nigeria />}</>;
};

export default index;
