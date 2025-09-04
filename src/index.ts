import app from './app';

const server = app.listen(3000, () => {
  console.log('app listening on port 3000')
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandled rejection: ${err}`);
}).on('uncaughtException', (err) => {
  console.error(`uncaught exception: ${err}`);
}).on('SIGTERM', () => {
  server.closeAllConnections();
  server.close();
  process.exit(0);
}).on('SIGINT', () => {
  server.closeAllConnections();
  server.close();
  process.exit(0);
});
