const validateUser = (joiSchema) => async (req, res, next) => {
  console.log(req.body);
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validateUser;
