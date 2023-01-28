const nameIsPresent = (req, res, next) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.status(400).json({
      message: '"name" is required',
    });
  }

  next();
};

module.exports = {
  nameIsPresent,
};
