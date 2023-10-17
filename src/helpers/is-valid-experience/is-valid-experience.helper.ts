const isValidExperience = (experience: string, age: string) => {
  return (
    parseInt(experience, 10) >= 0 &&
    parseInt(experience, 10) <= parseInt(age, 10) - 21
  );
};

export { isValidExperience };
