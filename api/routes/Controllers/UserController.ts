import { NewUser } from "../../interfaces/NewUser";
import { Database } from "../../database/Database";

export class UserController {
    private static async checkIfUserIsRegistered(userId: Number): Promise<Boolean> {
        console.log(userId)
        let column = Database.getInstance().prepare(`SELECT * from users WHERE telegram_id = ${userId}`).get();
        return typeof column === "undefined" ? false : true
    }

    private static registerUser(newUser: NewUser) {
        return Database.getInstance().prepare(`INSERT INTO users (telegram_id, password) VALUES (?, ?)`).run(newUser.telegramId, newUser.password);
    }


    static async register(newUser: any): Promise<Boolean> {
        console.log("UserController".blue);
        if (await this.checkIfUserIsRegistered(newUser.telegramId)) {
            return false;
        } else {
            if (this.registerUser(newUser).changes === 1) {
                return true;
            }
        }
    }
}