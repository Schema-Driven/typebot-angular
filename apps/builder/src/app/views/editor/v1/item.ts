export class Item {
  name: string;
  uId: string;
  children: Item[];

  constructor(options: { name: string; children?: Item[] }) {
    this.name = options.name;
    this.uId = (Math.random() * 10000000).toString();
    this.children = options.children || [];
  }
}
