const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (err) {
            
            const statusCode = err.statusCode || 500; 
            res.status(statusCode).json({
                success: false,
                message: err.message || "Internal Server Error",
            });
        }
    };
};

export { asyncHandler };