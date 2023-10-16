import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

// server-side
io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    

    socket.on("join", (room) => {

        // load data chat
        socket.rooms.forEach((room) => { 
            socket.leave(room)
         })
        socket.join(room)
    });x

    socket.on("send-data", (txtSend) => {
        // lưu tin nhắn trong database
        io.to("room-1").emit("send-data", txtSend);
    });

    socket.on("disconnect", (reason) => {
        console.log(socket.io, reason);
    });
});

const port = 8080;
httpServer.listen(port, () => {
    console.log(`Lắng nghe cổng http://localhost:${port} ...`);
});
