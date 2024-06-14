export const validate = (userData) => {
  let isValid = true;
  const newErrors = {};

  if (!userData.username) {
    isValid = false;
    newErrors.username = "Username is required.";
  } else if (userData.username.length < 3) {
    isValid = false;
    newErrors.username = "Username must be at least 3 characters.";
  } else if (userData.username.length > 20) {
    isValid = false;
    newErrors.username = "Username must be at most 20 characters.";
  }

  if (!userData.email) {
    isValid = false;
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    isValid = false;
    newErrors.email = "Email address is invalid.";
  }

  if (!userData.password) {
    isValid = false;
    newErrors.password = "Password is required.";
  } else if (userData.password.length < 6) {
    isValid = false;
    newErrors.password = "Password must be at least 6 characters.";
  }

  if (userData.idCardNumber.length !== 13) {
    isValid = false;
    newErrors.idCardNumber = "ID Card Number must be 13 characters.";
  }

  if (!userData.phoneNumber) {
    isValid = false;
    newErrors.phoneNumber = "Phone number is required.";
  } else if (!/^\d+$/.test(userData.phoneNumber)) {
    isValid = false;
    newErrors.phoneNumber = "Phone number is invalid.";
  } else if (userData.phoneNumber.length !== 10) {
    isValid = false;
    newErrors.phoneNumber = "Phone number must be 10 characters.";
  }

  return { isValid, newErrors };
};
