import { Product } from './product'

export class Cart {
    id?: number;
    product_id?: number;
    name?:string;
    quantity?: number;
    price?: number;

    constructor (id: number, product: Product, quantity = 1){
        this.id = id;
        this.product_id= product.id;
        this.name = product.name;
        this.price = product.price;
    } 
}
