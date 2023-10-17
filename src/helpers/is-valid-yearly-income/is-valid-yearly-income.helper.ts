const isValidYearlyIncome = (income: string) => {
  return parseFloat(income) <= 1000000;
};

export { isValidYearlyIncome };
