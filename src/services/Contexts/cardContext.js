import React, { createContext, useReducer } from "react";
import { cardReducer } from "../Reducers/CardReducers";
import { initialState } from "./initialState";

export const CardContext = createContext(null);

export const CardProvider = (props) => {
  const [cardArray, dispatch] = useReducer(cardReducer, initialState.cardArray);

  return (
    <CardContext.Provider value={{ cardArray, dispatch }}>
      {props.children}
    </CardContext.Provider>
  );
};
