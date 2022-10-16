import React, { Component, useState } from "react";
import { storage, database } from "../firebase";
import { ProgressBar, Toast } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import file from "./file.png";
import ReactDOM from "react-dom";
import folder from "./folder.png";
import { v4 as uuidV4 } from "uuid";
import { useFolder, ROOT_FOLDER } from "../Hooks/useFolder";
const AddFolder = (props) => {
const { currentFolder } = props;
  const [modal, setModal] = useState({ display: "none" });
  const [name, setName] = useState("");
var { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  if (currentUser === undefined) {
    currentUser = JSON.parse(localStorage.getItem("localKey"));
  }
  // filling localstorage
  localStorage.setItem("localKey", JSON.stringify(currentUser));



  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFolder === null) {
      return;
    }
    let fname = name;
    fname = fname.trim();
    if(name==="" || !fname){
      setName("");
      setModal({...modal, display:"none"})
      return;
    }
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
      console.log("other than root");
    }
    else{
      console.log("root found")
    }
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });
    console.log("done bro chill bro");
    setName("");
    setModal({ display: "none" });
  };





  const HandleChange = (e) => {
    const file = e.target.files[0];
    let ffName = file.name;
    ffName = ffName.trim();
    if(!ffName){return;}
    if (currentFolder === null || file == null) {
      return;
    }

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes
          setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.map(uploadFile => {
              if (uploadFile.id === id) {
                return { ...uploadFile, progress: progress }
              }
  
              return uploadFile
            })
          })
        },
        () => {
          setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.map(uploadFile => {
              if (uploadFile.id === id) {
                return { ...uploadFile, error: true }
              }
              return uploadFile
            })
          })
        },
        () => {
          setUploadingFiles(prevUploadingFiles => {
            return prevUploadingFiles.filter(uploadFile => {
              return uploadFile.id !== id
            })
          })
  
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            database.files
              .where("name", "==", file.name)
              .where("userId", "==", currentUser.uid)
              .where("folderId", "==", currentFolder.id)
              .get()
              .then(existingFiles => {
                const existingFile = existingFiles.docs[0]
                if (existingFile) {
                  existingFile.ref.update({ url: url })
                } else {
                  database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                  })
                }
              })
          })
        }
      )
  };



  return (
    <>
      <div className="flex flex-row justify-evenly flex-wrap">
        <div
          className="sm:text-2xl text-xl text-green-400 border-green-200 border-2 rounded-lg p-1 m-1 cursor-pointer"
          onClick={() => {
            setModal({ ...modal, display: "flex" });
          }}
        >
           <div className="flex flex-wrap justify-center"><img src={folder}  className="w-20 h-20" alt="" /></div>
          New Folder
      </div>


  <label htmlFor="file" className="sm:text-2xl text-xl text-green-400 border-green-200 border-2 rounded-lg p-1 m-1 cursor-pointer">
    <div className="flex flex-wrap justify-center"><img src={file}  className="w-20 h-20" alt="" /></div>
    <input type="file" name="" onChange={e=>HandleChange(e)} style={{opacity:"0",left:"-9999px",position:"absolute"}} id="file" />
    New File
  </label>  
      </div>

      <div
        className="flex flex-row flex-wrap justify-center p-2 m-2"
        style={modal}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col flex-wrap text-center m-2 p-2 border-gray-700 border-4"
        >
          <label className="sm:text-3xl text-2xl text-green-100 m-1">
            Folder Name
          </label>
          <div className="m-2">
            <input
              type="text"
              className="sm:text-2xl text-1xl outline-none p-1 border-2 border-green-200"
              name=""
              id="folderName"
              placeholder="Name of new folder"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-around">
            <div
              className="text-xl  text-green-400 border-green-200  p-1 m-1 cursor-pointer"
            >
              <button type="submit" className="outline-none">
                Add
              </button>
            </div>
            <div
              className="text-xl text-red-400 border-red-200  p-1 m-1 cursor-pointer"
              onClick={() => {
                setModal({ ...modal, display: "none" });
              }}
            >
              <button className="outline-none">Cancel</button>
            </div>
          </div>
        </form>
      </div>

      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map(file => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                      return uploadFile.id !== file.id
                    })
                  })
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFolder;