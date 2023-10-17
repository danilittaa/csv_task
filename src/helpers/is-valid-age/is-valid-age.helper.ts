const isValidAge = (age: string) => {
  return parseInt(age, 10) >= 21;
};

export { isValidAge };
