import React, { useState } from "react";
import {
  DialogTitle,
  Dialog,
  TextField,
  MenuItem,
  Button,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import { MOVE_ALL_TASKS } from "../services/constant";

const useStyles = makeStyles((thems) => ({
  root: {
    width: "100%",
  },
  DialogContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

const StatusComp = ({ toggle, closeStatusModal, cardId }) => {
  const classes = useStyles();
  const { cardArray, dispatch } = useContext(CardContext);
  const [selectStatus, setSelectStatus] = useState("");

  const handleChange = (e) => {
    setSelectStatus(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cardId, selectStatus);
    closeStatusModal();
    dispatch({
      type: MOVE_ALL_TASKS,
      payload: { currentCardId: cardId, targetCardId: selectStatus },
    });
  };

  return (
    <Dialog
      onClose={() => closeStatusModal()}
      aria-labelledby="simple-dialog-title"
      open={toggle}
    >
      <DialogTitle id="simple-dialog-title">Move All Items</DialogTitle>
      <DialogContent dividers className={classes.DialogContent}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth={true}
            margin="dense"
            name="status"
            select
            label="Select"
            variant="outlined"
            onChange={handleChange}
          >
            {cardArray.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.title}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            disabled={!selectStatus}
          >
            Move All Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusComp;
