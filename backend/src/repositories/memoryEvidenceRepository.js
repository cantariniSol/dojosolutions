const defaultItems = [
  {
    id: 'report-md',
    title: 'Checklist report',
    link: 'docs/reports/checklist-report.md',
  },
  {
    id: 'report-pdf',
    title: 'Checklist PDF',
    link: 'docs/reports/checklist-report.pdf',
  },
  {
    id: 'drive-link',
    title: 'Google Drive folder',
    link: 'docs/evidences/google-drive-link.md',
  },
];

function createMemoryEvidenceRepository(seed = defaultItems) {
  let items = [...seed];

  return {
    async list() {
      return items;
    },
    async create({ title, link }) {
      const record = {
        id: `evidence-${items.length + 1}`,
        title,
        link,
      };
      items = [record, ...items];
      return record;
    },
  };
}

module.exports = {
  createMemoryEvidenceRepository,
};
