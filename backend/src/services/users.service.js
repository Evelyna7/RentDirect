import * as userRepository from '../repositories/users.repository.js';
import { uploadFile } from './files.service.js';

export async function getUserById(userId) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function updateUser(userId, data) {
  const { name, phone } = data;

  // Aquí podrían ir reglas futuras
  await userRepository.update(userId, name, phone);

  return { message: 'updated' };
}

export async function uploadUserDocument(userId, file, type) {
  if (!file) {
    throw new Error('No file');
  }

  const url = await uploadFile(file);

  await userRepository.insertDocument(
    userId,
    type || 'other',
    url
  );

  return { url };
}
