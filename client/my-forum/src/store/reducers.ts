// Тип генератора действий
export type TAction = {
  type: string;
  payload: any;
};

/**
 * Редьюсер - функция, которая вычисляет следующее состояние дерева на основании его предыдущего состояния и применяемого действия
 * т.е. при вызове генератора(экшена), будет выдаваться измененная информация
 */
export const personReducer = (state = [], action: TAction) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return action.payload;
    case "LOG_OFF_USER":
      return [];
    default:
      return state;
  }
};
