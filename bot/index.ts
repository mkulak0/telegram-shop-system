import { Bot, session } from "grammy";
import * as dotenv from "dotenv"; dotenv.config();
import * as colors from "colors"; colors.enable();

import { MyContext as Context, MyContext, SessionData } from "./Context";
import { axiosInstance } from "./axios";
import { setPasswordQuestion, register } from "./composers/register";
import { loginQuestion, login } from "./composers/login";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string
        }
    }
}

const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Middlewares
bot.use(
    session({
        initial(): SessionData {
            return { token: "" };
        },
    }),
);

bot.use(setPasswordQuestion.middleware());
bot.use(loginQuestion.middleware());

// Composers
bot.use(register);
bot.use(login);

bot.command(["start", "help"], (ctx) => {
    ctx.reply(`Cześć!
Aby skorzystać z naszego sklepu musisz dokonać rejestracji.
Rejestrując się akcpetujesz naszą politykę prywatności - /policy
Możesz zarejestrować się komendą /register`);
});

/* bot.command("debugShopName", async (ctx) => {
    axiosInstance.get("/shop/name").then(res => {
        ctx.reply(res.data);
    });
});
 */

console.log("Bot załadowany, startuję!".rainbow);

bot.start();