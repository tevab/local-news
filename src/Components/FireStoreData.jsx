import React from "react";
import { useGetData } from "../Hooks/useGetData";
import Update from "./Update";

const FireStoreData = () => {
  const [documents] = useGetData();

  return (
    <div>
      <span>Values</span>
      {documents.map((documents) => (
        <div key={documents.id}>
          <div>
            Document: {documents.id} Value: {documents.value.value}
          </div>
          <Update doc={documents.id} />
        </div>
      ))}
    </div>
  );
};

export default FireStoreData;