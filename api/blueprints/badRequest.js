/* eslint-disable linebreak-style */
module.exports = badRequest = (data) => {
  return {
    status: 400,
    error: 'Tài nguyên không hợp lệ',
    message: data || '',
  };
};
