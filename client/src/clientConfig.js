const config = {
  isProduction: process.env.NODE_ENV === 'production',
  socketURI: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_SERVER_URI
    : 'http://localhost:7777',
  socketOptions: {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  }
};

console.log('Environment:', process.env.NODE_ENV);
console.log('Socket URI:', config.socketURI);

export default config;
