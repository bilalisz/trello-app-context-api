export const sortByName = (tasks) => {
  return tasks.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
};
export const sortByRandom = (tasks) => {
  return tasks.sort(() => Math.random() - 0.5);
};
export const deleteTask = (cardArray, cardId, taskId) => {
  return [
    ...cardArray.map((card) =>
      card.id === cardId
        ? {
            ...card,
            tasks: [...card.tasks.filter((task) => task.id !== taskId)],
          }
        : card
    ),
  ];
};

export const moveAllTask = (cardArray, currentCardId, targetCardId) => {
  if (currentCardId !== targetCardId) {
    debugger;
    const currentCnt = cardArray.find((card) => card.id === currentCardId);
    const currentTasks = currentCnt.tasks;

    let updatedArray = cardArray.map((card) =>
      card.id === currentCardId ? { ...card, tasks: [] } : card
    );

    updatedArray = updatedArray.map((card) =>
      card.id === targetCardId
        ? { ...card, tasks: [...card.tasks, ...currentTasks] }
        : card
    );

    debugger;
    return updatedArray;
  } else {
    return cardArray;
  }
};

export const updateTask = (
  cardArray,
  currentCardId,
  targetCardId,
  taskId,
  taskData
) => {
  const currentCard = cardArray.find((card) => card.id === currentCardId);
  const item = currentCard.tasks.find((task) => task.id === taskId);
  if (currentCardId === targetCardId) {
    debugger;
    cardArray.map((card) => {
      if (card.id === currentCardId) {
        return {
          ...card,
          tasks: card.tasks.map((task) =>
            task.id === taskId ? { ...taskData } : task
          ),
        };
      } else {
        return card;
      }
    });
  }
};
