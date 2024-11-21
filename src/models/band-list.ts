import { Band } from "@/models/band";

export class BandList {
	private bands: Band[];
	constructor() {
		this.bands = [
			new Band("Queen"),
			new Band("The Beatles"),
			new Band("The Rolling Stones"),
		];
	}

	addBand(name: string): Band[] {
		const newBand = new Band(name);
		this.bands.push(newBand);
		return this.bands;
	}

	removeBand(id: string): void {
		this.bands = this.bands.filter((band) => band.id !== id);
	}

	getBands(): Band[] {
		return this.bands;
	}

	increaseVotes(id: string): void {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.votes += 1;
			}
			return band;
		});
	}
	changeBandName(id: string, newName: string): void {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.name = newName;
			}
			return band;
		});
	}
}
