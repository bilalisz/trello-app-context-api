import { Container } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { CardContext } from "../services/Contexts/cardContext";
import CardContainer from "./CardContainer";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardWrapper: {
    margin: "10px",
    backgroundColor: "#DFDFE0",
    boxShadow: "0px 0px 1px 1px #fff",
    padding: "4px",
  },
});

const CardWrapper = () => {
  const classes = useStyle();
  const { cardArray } = useContext(CardContext);

  return (
    <div className={classes.cardWrapper}>
      <Container className={classes.root} maxWidth={false}>
        {cardArray?.map((card) => (
          <CardContainer card={card} />
        ))}
      </Container>
    </div>
  );
};

export default CardWrapper;
