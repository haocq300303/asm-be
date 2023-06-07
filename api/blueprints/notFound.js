/* eslint-disable linebreak-style */
module.exports = notFound = (data) => {
  return {
    status: 404,
    error: 'Không tìm thấy tài nguyên',
    message: data || '',
  };
};
