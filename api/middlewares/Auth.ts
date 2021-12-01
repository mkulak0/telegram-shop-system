import jwt from "jsonwebtoken";

export function auth(req: any, res: any, next: Function) {
    console.log("Starting auth".blue)
    const token = req.body.token;
    console.log(`token: ${token}`.blue)
    if(!token){
        res.status(403).json({code: "missing_token"});
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch(err) {
            res.json({code: "token_invalid"});
        } finally {
            next();
        }
    }
}