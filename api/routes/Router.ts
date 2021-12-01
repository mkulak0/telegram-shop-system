import express from "express";
import bodyParser from "body-parser";

import { ShopController } from "./Controllers/ShopController";
import { UserController } from "./Controllers/UserController";
import { ProductController } from "./Controllers/ProductController";
import { auth } from "../middlewares/Auth";

interface Message {
    message: string
    code: string
}

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

    router.post("/user/create", async (req, res) => {
        let msg: Message = {
            message: "",
            code: ""
        };
        console.log("/user/create".blue);
        // console.log(req.body)
        let result = await UserController.register(req.body);
        if(result){
            msg.code = "account_created";
        } else {
            msg.code = "account_creation_error";
        }
        res.json(msg);
    });

    router.post("/user/login", async (req, res) => {
        let temp = await UserController.login(req.body);
        if(temp !== false){
            res.json({ token: temp });
        } else {
            res.json({"code": "login_failed"});
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

    router.post("/authtest", auth, (req, res) => {
        res.json({"code": "login_success"});
    });

    return router;
}

