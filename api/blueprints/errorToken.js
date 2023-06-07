/* eslint-disable linebreak-style */
module.exports = tokenError = (data) => {
  return {
    status: 401,
    message: data || '',
  };
};
