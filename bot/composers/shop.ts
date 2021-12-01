import { Composer } from "grammy";
import { MenuMiddleware, MenuTemplate } from "grammy-inline-menu"
import { MyContext } from "../Context";

const shopTemplate = new MenuTemplate<MyContext>((ctx) =>  {
    console.log(ctx.session);
    return "Lorem Ipsum";
});

shopTemplate.interact("Guziczek", "buttontest", {
    do: async (ctx) => {
        await ctx.answerCallbackQuery({
            text: "Nacisnąłeś guziczek!",
            show_alert: true
        })
        return false;
    }
})


export const shopMenuMiddleware = new MenuMiddleware("shop/", shopTemplate);


export const shop = new Composer<MyContext>();

shop.command("shop", (ctx: MyContext) => {
    return shopMenuMiddleware.replyToContext(ctx);
});