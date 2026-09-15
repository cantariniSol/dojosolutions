const { createApp } = require('./src/app');
const { connectToDatabase, createEvidenceRepository, isDatabaseReady } = require('./src/db');

async function start() {
  const mongoConnected = await connectToDatabase();
  const app = createApp({
    evidenceRepository: createEvidenceRepository({ useMongo: mongoConnected }),
    mongoReady: isDatabaseReady,
  });

  const port = Number(process.env.PORT || 3000);

  app.listen(port, () => {
    console.log(`DojoSolutions listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Unable to start the server.', error);
  process.exit(1);
});
