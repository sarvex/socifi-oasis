const path = require("path");
const express = require("express");
const config = require("./config");
// const connectDB = require('./config/db');
const configureMiddleware = require("./middleware");
const configureRoutes = require("./routes");
const http = require('http');
const socketio = require("socket.io");
const gameSocket = require("./socket/index");

// Connect and get reference to mongodb instance
// let db;

// (async function () {
//   db = await connectDB();
// })();

// Init express app
const app = express();

// Config Express-Middleware
configureMiddleware(app);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with more detailed configuration
const io = new socketio.Server(server, {
  path: '/socket.io',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  transports: ['polling', 'websocket']
});

// Debug socket connections
io.engine.on("connection_error", (err) => {
  console.log("Connection error:", err);
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Configure routes
configureRoutes(app);

// Initialize socket handlers
gameSocket(io);

// Start server
const PORT = config.PORT || 7777;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server is ready`);
});

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});
