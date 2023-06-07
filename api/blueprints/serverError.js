/* eslint-disable linebreak-style */
module.exports = serverError = (data) => {
  return {
    status: 500,
    error: 'Lỗi máy chủ',
    message: data || '',
  };
};
