export const validateLoginFormData = (email, password) => {
  const isEmailValid = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";
};
