export const validate = (userData) => {
  let isValid = true;
  const newErrors = {};

  if (!userData.Username) {
    isValid = false;
    newErrors.Username = "Username is required.";
  } else if (userData.Username.length < 3) {
    isValid = false;
    newErrors.Username = "Username must be at least 3 characters.";
  } else if (userData.Username.length > 20) {
    isValid = false;
    newErrors.Username = "Username must be at most 20 characters.";
  }

  if (!userData.Email) {
    isValid = false;
    newErrors.Email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(userData.Email)) {
    isValid = false;
    newErrors.Email = "Email Address is invalid.";
  }

  if (!userData.Password) {
    isValid = false;
    newErrors.Password = "Password is required.";
  } else if (userData.Password.length < 6) {
    isValid = false;
    newErrors.Password = "Password must be at least 6 characters.";
  }
  if (userData.NIC.length !== 12) {
    isValid = false;
    newErrors.NIC = "ID Card Number must be 12 characters.";
  }

  if (!userData.Mobile) {
    isValid = false;
    newErrors.Mobile = "Phone number is required.";
  } else if (!/^\d+$/.test(userData.Mobile)) {
    isValid = false;
    newErrors.Mobile = "Phone number is invalid.";
  } else if (userData.Mobile.length !== 10) {
    isValid = false;
    newErrors.Mobile = "Phone number must be 10 characters.";
  }
  if (!userData.Address) {
    newErrors.Address = "Address is required.";
    isValid = false;
  }

  return { isValid, newErrors };
};
