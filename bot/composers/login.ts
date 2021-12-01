import { StatelessQuestion } from "@grammyjs/stateless-question";
import { ReplyToMessageContext } from "@grammyjs/stateless-question/dist/source/identifier";
import { Composer, Middleware } from "grammy";

import { axiosInstance } from "../axios";
import { MyContext } from "../Context";

export const loginQuestion = new StatelessQuestion("loginQuestion", async (ctx: MyContext) => {
    let password = "";
    password += ctx.message!.text;
    ctx.api.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
    let obj = {
        telegramId: ctx.from!.id,
        password: password
    }
    let response = await axiosInstance.post("/user/login", obj);
    if(typeof response.data.token !== "undefined"){
        ctx.session.token = response.data.token;
        console.log("New token in session".blue);
        ctx.reply("Zalogowano!");
    } else {
        ctx.reply(`Error code: ${response.data.code}`);
    }
});

export const login = new Composer();

login.command("login", (ctx) => {
    return loginQuestion.replyWithMarkdown(ctx, "Wpisz swoje hasło aby się zalogować!")
})