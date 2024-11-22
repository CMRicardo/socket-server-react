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
			console.log("Client connected");
			// Emitting the bands to the client
			socket.emit("current-bands", this.bandList.getBands());
			// Listening to vote-band event
			socket.on("vote-band", ({ id }: { id: string }) => {
				this.bandList.increaseVotes(id);
				// Emitting the bands to the client
				this.io.emit("current-bands", this.bandList.getBands());
			});
			// Listening to delete-band event
			socket.on("delete-band", ({ id }: { id: string }) => {
				this.bandList.removeBand(id);
				// Emitting the bands to the client
				this.io.emit("current-bands", this.bandList.getBands());
			});
			// Listening to change-band-name event
			socket.on(
				"change-band-name",
				({ id, newName }: { id: string; newName: string }) => {
					this.bandList.changeBandName(id, newName);
					// Emitting the bands to the client
					this.io.emit("current-bands", this.bandList.getBands());
				},
			);
			// Listening to create-band event
			socket.on("create-band", ({ name }: { name: string }) => {
				this.bandList.addBand(name);
				// Emitting the bands to the client
				this.io.emit("current-bands", this.bandList.getBands());
			});
		});
	}
}
