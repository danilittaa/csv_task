const isValidHasChildren = (hasChildren: string) => {
  return (
    hasChildren.toLowerCase() === "true" ||
    hasChildren.toLowerCase() === "false"
  );
};

export { isValidHasChildren };
