import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useContext } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import { DELETE_CARD, SORT_BY_NAME, SORT_RANDOM } from "../services/constant";
import sweetAlert from "sweetalert";

const CardMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { card, onStatusModal } = props;
  const { cardArray, dispatch } = useContext(CardContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    sweetAlert({
      title: "Are you sure?",
      text: "Do you want to delete" + " " + card.title + " " + "tasks",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) dispatch({ type: DELETE_CARD, payload: card.id });
    });
  };
  const handleModalOpen = () => {
    const currentCard = cardArray.find((cd) => cd.id === card.id);
    console.log(currentCard);
    if (!currentCard.tasks.length) {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    } else {
      onStatusModal();
    }
    handleClose();
  };

  const handleSortByName = () => {
    const currentCard = cardArray.find((cd) => cd.id === card.id);
    console.log(currentCard);
    if (!currentCard.tasks.length) {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    } else {
      dispatch({ type: SORT_BY_NAME, payload: card.id });
    }
    handleClose();
  };

  const handleSortRandom = () => {
    const currentCard = cardArray.find((cd) => cd.id === card.id);
    console.log(currentCard);
    if (!currentCard.tasks.length) {
      sweetAlert({
        icon: "error",
        title: "Error",
        text: "Task Box is Empty",
      });
    } else {
      dispatch({ type: SORT_RANDOM, payload: card.id });
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "#fff", fontSize: "30px" }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </MenuItem>
        <MenuItem onClick={handleModalOpen}>Move All</MenuItem>
        <MenuItem onClick={handleSortByName}>Sort by Name</MenuItem>
        <MenuItem onClick={handleSortRandom}>Sort Random</MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;
