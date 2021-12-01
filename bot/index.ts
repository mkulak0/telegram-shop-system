import { Bot, session } from "grammy";
import * as dotenv from "dotenv"; dotenv.config();
import * as colors from "colors"; colors.enable();

import { MyContext, SessionData } from "./Context";

import { setPasswordQuestion, register } from "./composers/register";
import { loginQuestion, login } from "./composers/login";
import { shop, shopMenuMiddleware } from "./composers/shop";

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

// Stateless questions
bot.use(setPasswordQuestion.middleware());
bot.use(loginQuestion.middleware());

// Menus
bot.use(shopMenuMiddleware.middleware());

// Composers
bot.use(register);
bot.use(login);
bot.use(shop);

bot.command(["start", "help"], (ctx) => {
    ctx.reply(`Cześć!
Aby skorzystać z naszego sklepu musisz dokonać rejestracji.
Rejestrując się akcpetujesz naszą politykę prywatności - /policy
Możesz zarejestrować się komendą /register`);
});

console.log("Bot załadowany, startuję!".rainbow);

bot.start();