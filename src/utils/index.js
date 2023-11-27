import jwtDecode from 'jwt-decode';

const readUserInfoFromJwtToken = (jwtToken) => {
  const jwtDecoded = jwtDecode(jwtToken);
  const userInfo = {
    email: jwtDecoded.jti,
    role: jwtDecoded.role,
    firstName: jwtDecoded.firstName,
    lastName: jwtDecoded.lastName,
    authenticated: jwtDecoded.authenticated,
  };
  return userInfo;
};

export default readUserInfoFromJwtToken;
