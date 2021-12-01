import express from "express";
import bodyParser from "body-parser";

import { ShopController } from "./Controllers/ShopController";
import { UserController } from "./Controllers/UserController";
import { ProductController } from "./Controllers/ProductController";

export function Router(): express.Router {
    var router = express.Router();

    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    /* Shop */

    router.get("/shop/name", (req, res) => {
        res.json(new ShopController().shopName);
    });

    router.get("/shop/description", (req, res) => {
        res.json(new ShopController().shopDescription)
    });

    /* User */

    router.post("/user/create", urlencodedParser, async (req, res) => {
        console.log("/user/create".blue);
        // console.log(req.body)
        let result = await UserController.register(req.body);
        if(result){
            res.json("Konto zostało pomyślnie utworzone")
        } else {
            res.json("Nie udało się utworzyć konta. Możliwe że na to konto Telegram zostało już założone konto w naszym systemie. Najlepiej skontaktuj się z administratorem.");
        }
    });

    /* Product */

    router.post("/product/create", async (req, res) => {
        let result = await ProductController.create(req.body);
        if(result){
            res.json("ID dodanego produktu to: "+result.lastInsertRowid);
        } else {
            res.json("Error! Niepoprawny format!");
        }
    });

    router.get("/product", async (req, res) => {
        res.json(ProductController.all());
    });

    return router;
}

