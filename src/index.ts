import app from './app';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  const localEnv = `${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`;
  console.log(`[server]: Server is running on: ${localEnv}`);
  if (NODE_ENV === 'development')
    console.log(
      `[server]: Api documentation is running on: ${localEnv}/api-docs`,
    );
});
