import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CardMenu from "./CardMenu";

import AddItemModal from "./AddItemModal";
import axios from "axios";
import { useContext } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import { DELETE_TASK } from "../services/constant";
import sweetAlert from "sweetalert";
import StatusComp from "./StatusComp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#9b999c",
    margin: "10px",
    height: "450px",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3f51b5",
    textAlign: "left",
    textTransform: "capitalize",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    marginBottom: "3px",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  btnWrapper: {
    backgroundColor: "#3f51b5",
  },
  btnAddItem: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
  },
  itemContainer: {
    maxHeight: "330px",
    height: "330px",
    width: "100%",
    overflow: "auto",
    padding: "5px 0px",
    backgroundColor: "#9b999c",
  },
  itemRoot: {
    margin: "5px",
    backgroundColor: "#dfdfe0",
    position: "relative",
    padding: theme.spacing(0),
  },
  itemIconsWrapper: {
    position: "absolute",
    top: "1%",
    right: "1%",
    opacity: 0,
    cursor: "pointer",
    width: "50px",

    "&:hover": {
      opacity: 1,
    },
  },
  itemTitle: {
    color: "#3f51b5",
  },
}));

const CardContainer = (props) => {
  const { card } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [statusModalToggle, setStatusModalToggle] = useState(false);
  const [assignName, setAssignName] = useState([]);
  const { dispatch } = useContext(CardContext);

  const handleTaskDelete = (taskId) => {
    sweetAlert({
      title: "Delete Item",
      text: "Do you want to delete this item ?  ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch({
          type: DELETE_TASK,
          payload: { cardId: card.id, taskId: taskId },
        });
      }
    });
  };
  const openStatusModal = () => {
    setStatusModalToggle(true);
  };

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/0b876615-7741-46b7-bf9b-80b00a07272b")
      .then((data) => setAssignName(data.data));
  }, []);

  return (
    <Box
      boxShadow={2}
      width={400}
      position="relative"
      className={classes.root}
      id={card.id}
    >
      <Paper className={classes.title}>
        <Typography variant="h5">{card.title}</Typography>
        <CardMenu card={card} onStatusModal={openStatusModal} />
      </Paper>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btnAddItem}
          size="small"
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          Add Item
        </Button>
      </div>
      <Box className={classes.itemContainer} id={card.id + "-itemContainer"}>
        {card.tasks?.map((task) => (
          <Card key={task.id} className={classes.itemRoot}>
            <CardContent>
              <Typography className={classes.itemTitle} variant="h5">
                {task.title}
              </Typography>
              <Typography color="textSecondary" component="h2">
                {task.description}
              </Typography>
              <h4>{task.assign}</h4>
            </CardContent>
            <span className={classes.itemIconsWrapper}>
              <DeleteIcon
                color="secondary"
                onClick={() => handleTaskDelete(task.id)}
              />
              <EditIcon color="primary" />
            </span>
          </Card>
        ))}
      </Box>
      {open && (
        <AddItemModal
          cardId={card.id}
          assignName={assignName}
          openModal={open}
          closeModal={() => setOpen(false)}
        />
      )}

      {statusModalToggle && (
        <StatusComp
          toggle={statusModalToggle}
          closeStatusModal={() => setStatusModalToggle(false)}
          cardId={card.id}
        />
      )}
    </Box>
  );
};

export default CardContainer;
