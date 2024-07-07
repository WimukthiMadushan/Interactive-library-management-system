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

  if (!userData.password) {
    isValid = false;
    newErrors.password = "Password is required.";
  } else if (userData.password.length < 6) {
    isValid = false;
    newErrors.password = "Password must be at least 6 characters.";
  }

  return { isValid, newErrors };
};
