export type TAction = {
  type: string;
  payload: any;
};

export const personReducer = (state = [], action: TAction) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return action.payload;
    default:
      return state;
  }
};
