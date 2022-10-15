import React, { Component, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useFolder } from "../Hooks/useFolder";
import AddFolder from "./AddFolder";
import Folder from "./Folder";
import File from "./File";
import { useParams } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";
const Task = (props) => {
  const { folderId } = useParams();
  console.log("chilling", folderId);

  const { folder, childFolders, childFiles } = useFolder(folderId);

  return (
    <>
      <BreadCrumbs currentFolder={folder} />
      <AddFolder currentFolder={folder} />
      {folder && <Folder folder={folder} />}
      <div className="flex flex-wrap justify-center">
        {childFolders.length > 0 &&
          childFolders.map((x) => <Folder key={x.id} folder={x} />)}
      </div>



{childFolders.length>0 && childFiles.length>0 && <hr/>}
      <div className="flex flex-wrap justify-evenly p-2 m-2">
        {childFiles.length > 0 &&
          childFiles.map((x) => <File key={x.id} file={x} />)}
      </div>
    </>
  );
};
export default Task;