const isValidLicenseNumber = (licenseNumber: string) => {
  const licenseNumberRegex = /^[0-9a-zA-Z]{6}$/;
  return licenseNumberRegex.test(licenseNumber);
};

export { isValidLicenseNumber };
