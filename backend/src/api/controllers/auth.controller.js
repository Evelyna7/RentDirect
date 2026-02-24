import * as service from '../../services/auth.service.js';

// 🔹 REGISTER
export async function register(req, res, next) {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// 🔹 VERIFY EMAIL
export async function verifyEmail(req, res, next) {
  try {
    const result = await service.verifyEmail(
      req.body.email,
      req.body.code
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// 🔹 LOGIN
export async function login(req, res, next) {
  try {
    const result = await service.login(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// 🔹 FORGOT PASSWORD
export async function forgotPassword(req, res, next) {
  try {
    const result = await service.forgotPassword(req.body.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// 🔹 RESET PASSWORD
export async function resetPassword(req, res, next) {
  try {
    const result = await service.resetPassword(
      req.body.email,
      req.body.code,
      req.body.newPassword
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

