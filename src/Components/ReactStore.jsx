import React from "react";
import { useSelector, useDispatch } from "react-redux";

const MyComponent = () => {
  const count = useSelector((state) => state.count); // Assuming 'count' is a property in your Redux store state
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: "INCREMENT" }); // Assuming you have an 'INCREMENT' action type in your reducer
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" }); // Assuming you have a 'DECREMENT' action type in your reducer
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default MyComponent;
