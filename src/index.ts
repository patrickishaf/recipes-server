import app from './app';

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log('app listening on port', port);
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandled rejection: ${err}`);
}).on('uncaughtException', (err) => {
  console.error(`uncaught exception: ${err}`);
}).on('SIGTERM', () => {
  console.log('handling SIGTERM. refusing to shut down server');
}).on('SIGINT', () => {
  console.log('handling SIGINT. refusing to shut down server');
});
