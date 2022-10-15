import React, { Component } from "react";
import Heading from "./Heading";
import Person from "./Person";
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
  const person = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      position: "Software Engineer @iBox",
      feedback:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident vitae officia fuga accusamus odio nesciunt architecto ipsum nobis eos accusantium?",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      position: "Software Engineer @iBox",
      feedback:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident vitae officia fuga accusamus odio nesciunt architecto ipsum nobis eos accusantium?",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      position: "Software Engineer @iBox",
      feedback:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident vitae officia fuga accusamus odio nesciunt architecto ipsum nobis eos accusantium?",
    }
  ];
  return (
    <>
      <Heading />
      <Main />
      <WhyItem/>
      <div className="flex flex-row flex-wrap justify-around text-center text-red-300 border-4 border-gray-800 p-2">
        {person.map((item) => (
          <Person
            key={item.id}
            img={item.img}
            position={item.position}
            feedback={item.feedback}
          />
        ))}
      </div>
   {/* using bootstrap ...  */}

 

    </>
  );
};

export default Home;