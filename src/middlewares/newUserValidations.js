const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    next();
  } else {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};
