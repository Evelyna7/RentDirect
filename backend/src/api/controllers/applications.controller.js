import * as service from '../../services/applications.service.js';

// APPLY
export async function applyToProperty(req, res, next) {
  try {
    const result = await service.applyToProperty(
      req.params.id,
      req.user.id,
      req.body.message
    );

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }
}

// LIST MINE
export async function listMyApplications(req, res, next) {
  try {
    const result = await service.listMyApplications(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// OWNER → ver aplicaciones de una propiedad
export async function listApplicationsForProperty(req, res, next) {
  try {
    const result = await service.listApplicationsForProperty(
      req.params.id,
      req.user
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}


// UPDATE
export async function updateApplicationStatus(req, res, next) {
  try {
    const result = await service.updateApplicationStatus(
      req.params.id,
      req.body.status,
      req.user
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// WITHDRAW
export async function withdrawApplication(req, res, next) {
  try {
    const result = await service.withdrawApplication(
      req.params.id,
      req.user
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}