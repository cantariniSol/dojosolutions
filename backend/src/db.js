const mongoose = require('mongoose');
const { createMemoryEvidenceRepository } = require('./repositories/memoryEvidenceRepository');
const { createMongoEvidenceRepository } = require('./repositories/mongoEvidenceRepository');

let mongoConnected = false;

async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    mongoConnected = true;
    return true;
  } catch (error) {
    console.warn('MongoDB connection unavailable, falling back to in-memory evidence storage.');
    mongoConnected = false;
    return false;
  }
}

function isDatabaseReady() {
  return mongoConnected && mongoose.connection.readyState === 1;
}

function createEvidenceRepository({ useMongo }) {
  return useMongo ? createMongoEvidenceRepository() : createMemoryEvidenceRepository();
}

module.exports = {
  connectToDatabase,
  createEvidenceRepository,
  isDatabaseReady,
};
