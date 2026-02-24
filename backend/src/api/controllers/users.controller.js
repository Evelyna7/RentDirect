import * as userService from '../../services/users.service.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export async function getMe(req, res, next) {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const result = await userService.updateUser(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export function uploadDocumentHandler(req, res, next) {
  upload.single('document')(req, res, async function (err) {
    if (err) return next(err);

    try {
      const result = await userService.uploadUserDocument(
        req.user.id,
        req.file,
        req.body.type
      );

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });
}