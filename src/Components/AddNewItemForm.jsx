import React from "react";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import validationsForm from "./../yupValidation";
import { useContext } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import { ADD_TASK } from "../services/constant";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    slectBtnWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    selectField: {
      width: "327%",
      margin: "10px",
    },
  })
);

const AddNewItemForm = ({ assignName, cardId, closeModal }) => {
  const classes = useStyles();
  const { cardArray, dispatch } = useContext(CardContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assign: "",
    },
    validationSchema: validationsForm,
    onSubmit: (values) => {
      console.log(values);
      const taskObj = {
        id: `taskArray${Math.floor(Math.random() * 20000)}`,
        title: values.title,
        description: values.description,
        assign: values.assign,
        timeStamp: Date.now(),
      };
      dispatch({ type: ADD_TASK, payload: { taskObj, cardId } });
      closeModal();
    },
  });

  return (
    <div className={classes.root}>
      <Box mt={5} px={2}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <form className={classes.container} onSubmit={formik.handleSubmit}>
            <TextField
              name="title"
              label="Enter title"
              className={classes.textField}
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
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              value={formik.values.description}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              onChange={formik.handleChange}
            />

            <div className={classes.slectBtnWrapper}>
              <TextField
                className={classes.selectField}
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
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Add new item
              </Button>
            </div>
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default AddNewItemForm;
