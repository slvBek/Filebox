import React, { Component } from "react";
import Heading from "./Heading";
import Main from "./Main";
import "../App.css";
import { faFileExport, faFileUpload, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import WhyItem from "./whyItem";
const Home = () => {
  const {folderId} = useParams();
  console.log("drilling",folderId);
  

  return (
    <>
      <Heading />
      <Main />
      <WhyItem/>
    </>
  );
};

export default Home;