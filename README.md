# SociFi Oasis

A real-time multiplayer poker platform that brings the excitement of poker to your browser. Play with friends or meet new players in this modern, secure, and feature-rich gaming environment.

## Features
#### - User Authentication: Secure login and registration for players.
#### - Multiplayer Functionality: Join and play at virtual tables with other players.
#### - Real-time Gameplay: Interactive gameplay with real-time updates using WebSockets.
#### - Multiple Game Modes: Play different styles of poker.
#### - Chat System: Communicate with other players during gameplay through a chat interface.
#### - Responsive Design: Optimized for both desktop and mobile devices for a cross-platform experience.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **Real-time Communication**: WebSocket
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- pnpm
- MongoDB

## Getting Started

### Clone the repository

```bash
git clone https://github.com/sarvex/socifi-oasis.git
cd socify-oasis
```

### Install server dependencies

```bash
pnpm install
```

### Install client dependencies

```bash
cd client
pnpm install
```

### Environment Setup

1. Create a `.env` file in the root directory
2. Create a `.env` file in the client directory

Example `.env` for server:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Example `.env` for client:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
```

### Run project

```bash
pnpm start
```

## Project Structure

```
socify-oasis/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
├── server/             # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── socket/             # WebSocket handling
```

## API Documentation

The API documentation is available at `/api-docs` when running the server locally.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@sarvex](https://twitter.com/sarvex)
Project Link: [https://github.com/sarvex/socify-oasis](https://github.com/sarvex/socifi-oasis)
