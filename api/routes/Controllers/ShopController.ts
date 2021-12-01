import { Database } from "../../database/Database";

export class ShopController {

    private table = "shop";

    private selectStmt = Database.getInstance().prepare(`SELECT option_value FROM ${this.table} WHERE option_name = ?`);

    public get shopName(){
        return this.selectStmt.get("shop_name").option_value
    }

    public get shopDescription(){
        return this.selectStmt.get("shop_description").option_value
    }
}