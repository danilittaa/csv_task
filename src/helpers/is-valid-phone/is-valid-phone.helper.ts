const isValidPhone = (phone: string) => {
  const phoneRegex = /^(?:\+1\d{10}|1\d{10}|\d{10})$/;
  return phoneRegex.test(phone);
};

export { isValidPhone };
