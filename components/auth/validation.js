/**
 *
 * @param password
 * @return boolean
 */
export function isPasswordOk(password) {
  if (!password) {
    return false;
  }

  if (password.length < 6) {
    return false;
  }

  // TODO: better password validation
  return true;
}

export function isEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}
