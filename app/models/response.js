/**
* (default status 200)
* Success response
*/
successResponse = (res, statusCode, message, data) => {
    res.status(statusCode || 200).json({
    message: message || "success",
    data: data || {},
  });
 };
successResponseRedis = (res, statusCode, message, data) => {
  res.status(statusCode || 200).json({
  message: message || "success",
  data: JSON.parse(data) || {},
  source: "Redis"
});
};

/**
* (default status 500)
* Error response
*/
errorResponse = (res, statusCode, message) => {
  res.status(statusCode || 400).json({
  message: message || "Internal Server Error"
});
};

/**
* (default status 404)
* Data Not Found Response
*/
notFoundResponse = (res, statusCode, message) => {
  res.status(statusCode || 404).json({
  message: message || "Bad Request"
});
};

const responseCustom = {
    successResponse,successResponseRedis,errorResponse,notFoundResponse
  };

module.exports = responseCustom;