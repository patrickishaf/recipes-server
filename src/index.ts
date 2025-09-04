import app from './app';

app.listen(process.env.PORT || 3000, () => {
  console.log('app listening on port 3000')
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
