const isValidExpirationDate = (date: string) => {
  const dateRegex = /^(?:\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  const currentDate = new Date();
  const inputDate = date.includes("-")
    ? new Date(date)
    : new Date(date.split("/").reverse().join("-"));

  return inputDate >= currentDate;
};

export { isValidExpirationDate };
