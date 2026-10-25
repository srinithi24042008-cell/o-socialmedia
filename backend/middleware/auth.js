const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return next(new AppError('Missing auth token', 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
}

/**
 * Middleware to restrict access to specific roles.
 * Expects req.userRole to be set by a previous middleware (e.g. team context).
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.userRole) {
      return next(new AppError('Role not determined for this context', 403));
    }
    if (!roles.includes(req.userRole)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
