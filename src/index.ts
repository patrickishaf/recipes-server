import app from './app';
import { keepServerAlive, stopKeepingServerAlive } from './keepalive';

const server = app.listen(3000, () => {
  console.log('app listening on port 3000')
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandled rejection: ${err}`);
}).on('uncaughtException', (err) => {
  console.error(`uncaught exception: ${err}`);
}).on('SIGTERM', () => {
  console.log('refusing to shut down server');
}).on('SIGINT', () => {
  console.log('refusing to shut down server');
});

keepServerAlive();
