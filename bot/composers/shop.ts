import { Composer } from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu"
import { MenuMiddleware, MenuTemplate } from "grammy-inline-menu"
import { axiosInstance } from "../axios";
import { MyContext } from "../Context";
import { checkAuth } from "../functions";

interface Product {
    id: number,
    name: string,
    description: string
}

export const menu = new Menu("products", {autoAnswer: false}).dynamic(async (ctx) => {
    const range = new MenuRange();
    let products = await axiosInstance.get("/product");
    products.data.forEach((element: Product) => {
        range.text(element.name, (ctx) => {
            ctx.answerCallbackQuery({text: `Elo, kliknąłeś w ${element.name}`, show_alert: true})
            }
        ).row()
    });
    return range;

})



export const shop = new Composer<MyContext>();
shop.command("shop", async (ctx: MyContext) => {
    if (await checkAuth(ctx)) {
        await ctx.reply("Nasze produkty", { reply_markup: menu })
    }
});