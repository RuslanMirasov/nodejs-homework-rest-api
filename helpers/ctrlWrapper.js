const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  };
  return func;
};

module.exports = ctrlWrapper;
