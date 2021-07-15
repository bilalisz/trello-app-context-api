import "./App.css";
import React, { useEffect, useContext } from "react";
import { CardContext } from "./services/Contexts/cardContext";
import NavBar from "./Components/NavBar";
import { AppBar } from "@material-ui/core";
import CardForm from "./Components/CardForm";
import CardWrapper from "./Components/CardWrapper";

const App = () => {
  const { cardArray, dispatch } = useContext(CardContext);

  return (
    <React.Fragment>
      <AppBar position="relative">
        <NavBar />
      </AppBar>
      <CardForm />
      <CardWrapper />
    </React.Fragment>
  );
};

export default App;
