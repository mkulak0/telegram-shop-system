import { MyContext } from "./Context";
import { axiosInstance } from "./axios";

export async function checkAuth(ctx: MyContext): Promise<Boolean>{
    if(ctx.session.token !== ""){
        let response = await axiosInstance.post("/authtest", {token: ctx.session.token, telegramId: ctx.me.id})
        if(response.data.code === "login_success"){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}