"use client";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {increment, decrement} from "../../store/features/counter/counterSlice";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const count = useSelector((state) => state.counter.value); 
  const dispatch = useDispatch();


  return (
    <section>
      <div>

      </div>
    </section>
    // <div>
    //   <h1>Counter: {count}</h1> {/* Display the counter state */}
    //   <button onClick={() => dispatch(increment())}>Increment</button>
    //   <button onClick={() => dispatch(decrement())}>Decrement</button>
    // </div>
  );
};

export default ShoppingCart;
