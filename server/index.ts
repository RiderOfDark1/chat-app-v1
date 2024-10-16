import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const PORT = process.env.PORT || 5000;

// Serve static files from the client
app.use(express.static('client'));

// Socket.io connection handling
io.on('connection', (socket) => {
	console.log('A user connected');
	
	// Handle receiving a chat message
	socket.on('chat message', (msg) => {
		console.log('Message received:' + msg);
		io.emit('chat message', msg);
	});

	// Handle user disconnection
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

// Start the server
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});