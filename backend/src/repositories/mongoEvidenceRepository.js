const { Evidence } = require('../models/evidence');

function createMongoEvidenceRepository() {
  return {
    async list() {
      const items = await Evidence.find().sort({ createdAt: -1 }).lean();
      return items.map((item) => ({
        id: String(item._id),
        title: item.title,
        link: item.link,
      }));
    },
    async create({ title, link }) {
      const item = await Evidence.create({ title, link });
      return {
        id: String(item._id),
        title: item.title,
        link: item.link,
      };
    },
  };
}

module.exports = {
  createMongoEvidenceRepository,
};
