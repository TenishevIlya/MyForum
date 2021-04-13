// Генератор действия для изменения стора
export const logInUser = (data: any) => ({
  type: "LOG_IN_USER",
  payload: data,
});

// Генератор действия для изменения стора
export const logOffUser = () => ({
  type: "LOG_OFF_USER",
});
