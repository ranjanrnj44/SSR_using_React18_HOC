import React from "react";
import axios from "axios";

// const fetchApiColor = async () => {
//   const response = await axios.get(
//     "https://random-data-api.com/api/color/random_color"
//   );
//   const data = response.data;
//   return data;
// };

const fetchUser = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    return console.log(err);
  }
};

//this function is not required to re-written again and again, once done we can re-use it for fetching data
const wrapPromise = (promise) => {
  //initially our result and status are null & pending
  let result;
  let status = "pending";
  //suspender is our promise, if it resolved it will have a result
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    //return a function called read(), it keeps tracks of our promise status
    read() {
      console.log("test");
      if (status === "pending") throw suspender; //throw if error
      else if (status === "error") throw result; //throw if error
      else if (status === "success") return result; // return the result if success
    },
  };
};

//call the wrapPromise over our fetchApiColor
export const fetchColorAndUser = () => {
  //this function return an object with the fetchApiColor which we will be sent as args to wrapPromise
  return {
    // color: wrapPromise(fetchApiColor()),
    user: wrapPromise(fetchUser()),
  };
};

//always keep this outside our component
// const colorResource = fetchColorAndUser();
const userResource = fetchColorAndUser();

//HelperHOC
export const HelperHOC = (OriginalComponent) => {
  //enhanced compoent
  let EnhancedComponent = () => {
    return (
      <OriginalComponent
        name="SSR 18"
        // colorData={colorResource.color.read()}
        fetchedData={userResource.user.read()}
      />
    );
  };
  return EnhancedComponent;
};
