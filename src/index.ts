import app from './app';
import { keepServerAlive, stopKeepingServerAlive } from './keepalive';

const port = process.env.PORT ?? 3000;

const server = app.listen(port, () => {
  console.log('app listening on port', port);
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandled rejection: ${err}`);
}).on('uncaughtException', (err) => {
  console.error(`uncaught exception: ${err}`);
}).on('SIGTERM', () => {
  server.closeAllConnections();
  server.close();
  stopKeepingServerAlive();
  process.exit(0);
}).on('SIGINT', () => {
  server.closeAllConnections();
  server.close();
  stopKeepingServerAlive();
  process.exit(0);
});

keepServerAlive();
