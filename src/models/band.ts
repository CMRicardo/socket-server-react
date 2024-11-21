export class Band {
  id: string;
  public name: string;
  public votes: number;
  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.votes = 0;
  }
}
