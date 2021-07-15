export const initialState = {
  cardArray: [
    {
      id: `cardArray${Math.floor(Math.random() * 10000)}`,
      title: "todo",
      timeStamp: Date.now(),
      tasks: [
        {
          id: `itemArray${Math.floor(Math.random() * 20000)}`,
          title: "Title 1",
          description: "description",
          assign: "Aassign",
          timeStam: Date.now(),
        },
      ],
    },
  ],
};
