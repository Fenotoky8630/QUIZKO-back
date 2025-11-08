const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const io = new Server(4000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST']
}));

let users = [];
let interviewActive = false;
let isExpiredInterview = false;

io.on('connection', (socket) => {
    io.emit('updateUsers', users);
    console.log('A user connected');

    socket.on('activateInterview', () => {
        interviewActive = true;
        io.emit('interviewActive');
    });

    socket.on('startInterview', (userData) => {
        users.push(userData);
        io.emit('updateUsers', users);
    });

    socket.on('interviewExpired', () => {
        isExpiredInterview = true;
        io.emit('interviewExpired');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

console.log('Server is running on port 4000');