import { SessionFlavor, Context } from "grammy";

export interface SessionData {
    token: string
}

export type MyContext = Context & SessionFlavor<SessionData> & {session};
