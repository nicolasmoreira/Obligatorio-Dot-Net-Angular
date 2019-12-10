export class Product {
    id: number;
    image: string;
    name: string;
    price: number;
    constructor(id: number, image: string, name: string,price: number) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
    }
}