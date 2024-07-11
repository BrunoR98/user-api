import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const localEnv = `${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`;
  console.log(`[server]: Server is running on: ${localEnv}`);
  console.log(
    `[server]: Api documentation is running on: ${localEnv}/${process.env.SWAGGER_URL}`,
  );
});
