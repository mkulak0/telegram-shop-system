import { StatelessQuestion } from "@grammyjs/stateless-question";
import { Composer } from "grammy";
import bcrypt from "bcrypt";

import { axiosInstance } from "../axios";

export const setPasswordQuestion = new StatelessQuestion("setPassword", async (ctx) => {
    let password = "";
    password += ctx.message!.text;
    // ctx.editMessageText("Elo elo");
    ctx.api.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
    let obj = {
        telegramId: ctx.from!.id,
        password: await bcrypt.hash(password, 10)
    }
    await ctx.reply(`Twój zaszyfrowany hash do hasła to ${obj.password} \nPoczekaj na informację z serwera potwierdzającą założenie konta!`);
    axiosInstance.post("user/create", obj).then((res) => {
        ctx.reply(`Serwer: ${res.data}`);
    });
});

export const register = new Composer();

register.command("register", (ctx) => {
    return setPasswordQuestion.replyWithMarkdown(ctx, "Wpisz hasło którym będziesz mógł się zalogować. Nie martw się, twoje hasło jest bezpieczne! Automatycznie usunięmy też wiadomość z twoim hasłem, więc lepiej je zapamiętaj!");
});
