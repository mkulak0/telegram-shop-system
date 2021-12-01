import { Database } from "../../database/Database";


class NewProduct {
    name: string;
    description: string;
}

export class ProductController {
    static async create(newProduct: any){
        if(newProduct.hasOwnProperty("name") && newProduct.hasOwnProperty("description")){
            let runResult = Database.getInstance().prepare("INSERT INTO products (name, description) VALUES(?, ?)").run(newProduct.name, newProduct.description);
            return runResult;
        } else {
            return false;
        }
    }

    static all(){
        return Database.getInstance().prepare("SELECT * FROM products").all();
    }
}