import React, { Component, useState, useEffect, useReducer } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
export const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
};
export const useFolder =(folderId = null, folder = null) => {
  var {currentUser} = useAuth();
    const ACTIONS = {
        SELECT_FOLDER: "selects folder",
        UPDATE_FOLDER:"update folder",
        SET_CHILD_FOLDERS:"set-child-folders",
        SET_CHILD_FILES: "set-child-files"
      }; 
      
      const Reducer = (state, { type, payload }) => {
          switch (type) {
            case ACTIONS.SELECT_FOLDER:
              return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: [],
              };
              case ACTIONS.UPDATE_FOLDER:
                return{
                  ...state,folder:payload.folder,
                }
                case ACTIONS.SET_CHILD_FOLDERS:
                  return{
                    ...state,childFolders:payload.childFolders,
                  }
                  case ACTIONS.SET_CHILD_FILES:
                    return {
                      ...state,
                      childFiles: payload.childFiles,
                    }

            default:
              return state;
          }
        };

  const [state, dispatch] = useReducer(Reducer,{
    folderId: folderId,
    folder: folder,
    childFolders: [],
    childFiles: [],
  });
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(()=>{
      if(folderId===null){
          return dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}})
      }
      database.folders.doc(folderId).get().then(doc=>{
         
        dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:database.formatDoc(doc)}});
        
        
      }).catch((err)=>{
        console.error(err);
          dispatch({type:ACTIONS.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}})
      });
    
  },[folderId])

  useEffect(() => {
    if(currentUser===undefined){
      return state;
    }
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        })
      })
  }, [folderId, currentUser])


  useEffect(() => {
    if(currentUser===undefined){
      return state;
    }
    return (
      database.files
        .where("folderId", "==", folderId)
        .where("userId", "==", currentUser.uid)
        // .orderBy("createdAt")
        .onSnapshot(snapshot => {
          dispatch({
            type: ACTIONS.SET_CHILD_FILES,
            payload: { childFiles: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [folderId, currentUser])
  
  return state;
};