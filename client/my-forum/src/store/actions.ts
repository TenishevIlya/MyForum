export const logInUser = (data: any) => ({
  type: "LOG_IN_USER",
  payload: data,
});

export const logOffUser = () => ({
  type: "LOG_OFF_USER",
});
