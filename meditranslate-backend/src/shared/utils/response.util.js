// src/shared/utils/response.util.js
export const successResponse = (data, message = 'Success', meta = {}) => {
  return {
    success: true,
    message,
    data,
    meta,
    timestamp: new Date().toISOString()
  };
};

export const errorResponse = (message, errors = null, statusCode = 500) => {
  return {
    success: false,
    message,
    errors,
    statusCode,
    timestamp: new Date().toISOString()
  };
};

export const paginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};
