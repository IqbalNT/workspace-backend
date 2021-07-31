exports.successResponse = function (res, msg) {
  return res.status(200).json(bodyContent(true, {}, msg));
};

exports.successResponseWithData = function (res, msg, data) {
  return res.status(200).json(bodyContent(true, data, msg));
};

exports.ErrorResponse = function (res, msg) {
  return res.status(400).json(bodyContent(false, {}, msg));
};

exports.ErrorResponseWithData = function (res, msg, data) {
  return res.status(400).json(bodyContent(false, data, msg));
};
exports.ErrorResponseUnauthorizedWithData = function (res, msg, data) {
  return res.status(401).json(bodyContent(false, msg, data));
};

exports.notFoundResponse = function (res, msg) {
  return res.status(404).json(bodyContent(false, {}, msg));
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};

function bodyContent(isExecuted, data, message) {
  return {
    isExecuted,
    data,
    message,
  };
}
