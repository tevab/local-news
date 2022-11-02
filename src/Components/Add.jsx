import React from "react";
import firebase from "firebase";

const Add = () => {
  const [email, setEmail] = React.useState("");
  const db = firebase.firestore();
  const getValue = (event) => {
    setEmail(event.target.value);
  };

  const addValue = () => {
    db.collection("users")
      .doc(email)
      .set({
        email: email,
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };

  return (
    <div>
      <input onBlur={getValue} type='text' />
      <button type='button' onClick={addValue}>
        Add
      </button>
    </div>
  );
};

export default Add;