module.exports = {
  testEnvironment: 'node',
  // Had to increase timeout, as sometimes when disconnecting from mongoose,
  // I'd get an error saying "Exceeded timeout of 5000 ms for a hook."
  testTimeout: 30000,
}
