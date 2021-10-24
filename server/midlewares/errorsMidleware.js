const createError = require('http-errors')

// 404 not found handler
function notFoundHandler(req, res, next) {
    next(createError(404, "Your requested content was not found!"))
}

function defaultErrorHandler(error, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === "development" ? error : { message: error.message };

    res.status(error.status || 500);

    if (res.headersSent) {
        // if headers already sent
        next("Headers already sent")
    } else {
        if (error.status) {
            return res.json(res.locals.error)
        } else {
            return res.json({
                message: "Server error"
            })
        }
    }
}

module.exports = {
    defaultErrorHandler,
    notFoundHandler
}