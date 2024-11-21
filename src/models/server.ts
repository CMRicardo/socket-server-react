import { createServer, type Server as ServerType } from "node:http";
import path from "node:path";

import express from "express";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

import { Sockets } from "@/models/sockets";

export class Server {
  app: express.Application;
  port: number;
  server: ServerType;
  io: SocketIOServer;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) ?? 3000;
    // HTTP Server
    this.server = createServer(this.app);
    // Sockets config
    this.io = new SocketIOServer(this.server);
  }
  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../../public")));
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configSockets();
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
