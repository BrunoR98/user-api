module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/src/tests/**/*.test.ts'], // Asegúrate de que esta ruta apunte a tus archivos de prueba
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
