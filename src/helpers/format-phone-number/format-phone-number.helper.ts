const formatPhoneNumber = (phoneNumber: string): string => {
  const clearedPhone =
    phoneNumber.length > 10
      ? phoneNumber.substring(phoneNumber.length - 10)
      : phoneNumber;

  return `+1${clearedPhone}`;
};
export { formatPhoneNumber };
