import type { Server as SocketIOServer } from "socket.io";

import { BandList } from "@/models/band-list";

export class Sockets {
	io: SocketIOServer;
	bandList: BandList;

	constructor(io: SocketIOServer) {
		this.io = io;
		this.bandList = new BandList();
		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on("connection", (socket) => {
			// Listening to chat-message event
			console.log("Client connected");
			// Emitting the bands to the client
			socket.emit("current-bands", this.bandList.getBands());
		});
	}
}
