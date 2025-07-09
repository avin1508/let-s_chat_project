require('dotenv').config();
const app = require('./Src/app');
const connectToDB = require('./Src/config/dataBase');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./Src/sockets/index');

const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development';

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
});

(async () => {
    try {
        await connectToDB();

        const server = http.createServer(app);

        // ✅ PRODUCTION + DEVELOPMENT CORS CONFIG
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Log for debugging
      // if(origin) console.log("Socket origin:-======", origin);

      // Allow requests with no origin (mobile apps, Postman, etc)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:3000',
        'http://192.168.128.99:3000', 
        'https://yourweb.com',
        'https://admin.yourweb.com',
        'http://192.168.128.99:8080', 
        'http://localhost:5173'
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`❌ CORS Rejected: ${origin}`));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  }
});


    // ✅ Initialize socket events
    socketHandler(io);

    // ✅ Start the server
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });

    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err);
        server.close(() => {
            process.exit(1);
        });
    });

} catch (error) {
    console.log(error);
    process.exit(1);
}
})();
