import * as repo from '../repositories/properties.repository.js';

// 🔹 Crear
export async function createProperty(data, user, files) {

  // Guardar thumbnail (primera imagen)
  const thumbnail = files?.length
    ? `uploads/${files[0].filename}`
    : null;

  // 1️⃣ Crear propiedad
  const propertyId = await repo.createProperty({
    ownerId: user.id,
    title: data.title,
    description: data.description,
    address: data.address,
    price: data.price,
    thumbnail
  });

  // 2️⃣ Guardar imágenes en property_images
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      await repo.createPropertyImage({
        property_id: propertyId,
        url: `uploads/${files[i].filename}`,
        ord: i + 1
      });
    }
  }

  return { id: propertyId };
}

// 🔹 Listar disponibles
export async function listAvailable() {
  return await repo.getAllAvailable();
}

// 🔹 Ver una propiedad
export async function getProperty(id) {
  const property = await repo.findByIdWithImages(id);

  if (!property) {
    throw { status: 404, message: 'Property not found' };
  }

  return property;
}

// 🔹 Mis propiedades
export async function listOwnerProperties(user) {

  if (user.role !== 'owner' && user.role !== 'admin') {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.findByOwner(user.id);
}

// 🔹 Actualizar
export async function updateProperty(id, data, user) {

  const property = await repo.findById(id);

  if (!property) {
    throw { status: 404, message: 'Property not found' };
  }

  if (user.role !== 'admin' && property.owner_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  await repo.updateProperty(id, {
    title: data.title || property.title,
    description: data.description || property.description,
    address: data.address || property.address,
    price: data.price || property.price,
    status: data.status || property.status
  });

  return { message: 'Property updated successfully' };
}

// 🔹 Eliminar
export async function deleteProperty(id, user) {

  const property = await repo.findById(id);

  if (!property) {
    throw { status: 404, message: 'Property not found' };
  }

  if (user.role !== 'admin' && property.owner_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  await repo.deleteProperty(id);

  return { message: 'Property deleted successfully' };
}