import BetterSqlite3 from "better-sqlite3";


export class Database {
    private static instance: Database;

    private DB: BetterSqlite3.Database;

    private constructor(){
        this.DB = BetterSqlite3("mydatabase.db");
    }

    public static getInstance(): BetterSqlite3.Database {
        console.log("Pobrano instancję Database".blue);
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance.DB;
    }
}