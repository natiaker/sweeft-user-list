import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = ({ type, color }) => (
  <ReactLoading
    type={type}
    color={color}
    height={"100px"}
    width={"100px"}
  />
);

export default Loading;
