import dotenv from 'dotenv';
dotenv.config();

export const azureConnection = process.env.AZURE_BLOB_CONN || '';
export const azureContainer = process.env.AZURE_CONTAINER || 'rentdirect';
