import { SessionFlavor, Context } from "grammy";

export interface SessionData {
    elo: string
}

export type MyContext = Context & SessionFlavor<SessionData>;
