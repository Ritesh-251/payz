const validateResource = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: err.errors,
    });
  }
};

export default validateResource;
