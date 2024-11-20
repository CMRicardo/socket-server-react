import { Server as SocketIOServer } from "socket.io";

export class Sockets {
  io: SocketIOServer;
  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Listening to chat-message event
      socket.on("chat-message", (data) => {
        console.log(data);
        this.io.emit("message-from-server", data);
      });
    });
  }
}
