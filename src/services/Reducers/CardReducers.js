import {
  deleteTask,
  moveAllTask,
  sortByName,
  sortByRandom,
  updateTask,
} from "../../utility";
import {
  ADD_CARD,
  ADD_TASK,
  DELETE_CARD,
  DELETE_TASK,
  MOVE_ALL_TASKS,
  SORT_BY_NAME,
  SORT_RANDOM,
  UPDATE_TASK,
} from "../constant";

export const cardReducer = (cardArray, { type, payload }) => {
  console.log(cardArray);
  switch (type) {
    // Add card
    case ADD_CARD:
      return [...cardArray, payload];
    //Add task
    case ADD_TASK:
      return [
        ...cardArray.map((card) =>
          card.id === payload.cardId
            ? { ...card, tasks: [...card.tasks, payload.taskObj] }
            : card
        ),
      ];
    //Delete card
    case DELETE_CARD:
      return [...cardArray.filter((card) => card.id !== payload)];

    // Task sort by name
    case SORT_BY_NAME:
      return [
        ...cardArray.filter((card) =>
          card.id === payload
            ? { ...card, tasks: sortByName(card.tasks) }
            : card
        ),
      ];

    // Task sort by Random
    case SORT_RANDOM:
      return [
        ...cardArray.filter((card) =>
          card.id === payload
            ? { ...card, tasks: sortByRandom(card.tasks) }
            : card
        ),
      ];

    // Delete task from card array
    case DELETE_TASK:
      return deleteTask(cardArray, payload.cardId, payload.taskId);

    // Move ALL task from  array
    case MOVE_ALL_TASKS:
      return moveAllTask(
        cardArray,
        payload.currentCardId,
        payload.targetCardId
      );
    case UPDATE_TASK:
      return updateTask(
        cardArray,
        payload.currentCardId,
        payload.targetCardId,
        payload.taskId,
        payload.taskData
      );

    default:
      return cardArray;
  }
};

