// Not currently used
// Using express-async-errors package instead
export default ((fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
});