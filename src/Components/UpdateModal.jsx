import React, { useContext } from "react";
import {
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useFormik } from "formik";

import validationsForm from "../yupValidation";
import { CardContext } from "../services/Contexts/cardContext";
import { UPDATE_TASK } from "../services/constant";

const UpdateModal = (props) => {
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const { cardArray, dispatch } = useContext(CardContext);
  const { onCloseUpdateModal, openUpdateModal, taskId, assignName, cardId } =
    props;

  const currentCard = cardArray.find((card) => card.id === cardId);
  const task = currentCard.tasks.find((task) => task.id === taskId);

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      assign: task.assign,
    },

    onSubmit: (values) => {
      onCloseUpdateModal();
      const taskObj = {
        ...task,
        title: values.title,
        description: values.description,
        assign: values.assign,
      };
      dispatch({
        type: UPDATE_TASK,
        payload: {
          currentCardId: cardId,
          targetCardId: selectedStatus,
          taskId: taskId,
          taskData: taskObj,
        },
      });
    },
    validationSchema: validationsForm,
  });
  return (
    <Dialog
      open={openUpdateModal}
      onClose={onCloseUpdateModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
      <DialogContent>
        <DialogContentText>Update your Tasks</DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="title"
            label="Enter title"
            margin="normal"
            variant="outlined"
            fullWidth
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onChange={formik.handleChange}
          />
          <TextField
            name="description"
            label="Enter description"
            margin="normal"
            variant="outlined"
            fullWidth
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            onChange={formik.handleChange}
          />

          <div>
            <TextField
              style={{ width: "100%", margin: "10px 0px" }}
              name="assign"
              select
              label="Select"
              variant="outlined"
              value={formik.values.assign}
              onChange={formik.handleChange}
              error={formik.touched.assign && Boolean(formik.errors.assign)}
              helperText={formik.touched.assign && formik.errors.assign}
            >
              {assignName?.map((assign) => (
                <MenuItem key={assign.id} value={assign.name}>
                  {assign.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              style={{ width: "100%", margin: "10px 0px" }}
              name="status"
              select
              label="Status"
              variant="outlined"
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              {cardArray.map((card) => (
                <MenuItem key={card.id} value={card.id}>
                  {card.title}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <Button color="primary" variant="contained" type="submit">
              update Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
