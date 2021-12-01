import { Bot, session } from "grammy";
import dotenv from "dotenv"; dotenv.config();
import colors from "colors"; colors.enable();

import { MyContext as Context, SessionData } from "./Context";
import { axiosInstance } from "./axios";
import { setPasswordQuestion, register } from "./composers/register";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string
        }
    }
}

const bot = new Bot<Context>(process.env.BOT_TOKEN);

// Middlewares
bot.use(
    session({
        initial(): SessionData {
            return { elo: "no elo" };
        },
    }),
);

bot.use(setPasswordQuestion.middleware());

// Composers
bot.use(register);

bot.command(["start", "help"], (ctx) => {
    ctx.reply(`Cześć!
Aby skorzystać z naszego sklepu musisz dokonać rejestracji.
Rejestrując się akcpetujesz naszą politykę prywatności - /policy
Możesz zarejestrować się komendą /register`);
});

bot.command("login", (ctx) => {

});

bot.command("debugShopName", async (ctx) => {
    axiosInstance.get("/shop/name").then(res => {
        ctx.reply(res.data);
    });
});

console.log("Bot załadowany, startuję!".rainbow);

bot.start();