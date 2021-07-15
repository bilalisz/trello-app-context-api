import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { useState } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import sweetAlert from "sweetalert";
import { ADD_CARD } from "../services/constant";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  TextField: {
    width: "300px",
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CardCom = () => {
  const classes = useStyles();
  const { cardArray, dispatch } = useContext(CardContext);
  const [title, setTitle] = useState("");

  const handleSubmitCard = (e) => {
    e.preventDefault();
    const cardObj = {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: title,
      timeStamp: Date.now(),
      tasks: [],
    };
    if (!title) {
      sweetAlert("Here's no title!", "Places Fill the title input form");
    }
    if (cardArray.length === 3) {
      sweetAlert(
        "No more card can added",
        "We are sorry ! not Allowed to add more then Three."
      );
    } else {
      dispatch({ type: ADD_CARD, payload: cardObj });
    }
    setTitle("");
  };
  return (
    <form className={classes.root} onSubmit={handleSubmitCard}>
      <TextField
        className={classes.TextField}
        variant="outlined"
        label="T I T L E"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        add card
      </Button>
    </form>
  );
};

export default CardCom;
