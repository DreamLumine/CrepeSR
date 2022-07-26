import { Request, Response } from "express";
import Account from "../../../../../../db/Account";
import Logger from "../../../../../../util/Logger";

// Example request:
// {
//     account: "test",
//     (RSA)password: "BKWPZjqKfKr6ZKuO40ONwV5JxOi4dg71aeBcxPVK/U+8FM8d5kc5EjLdEXyn6McBvUOL67CmT89eo9jrdwp9xpFexA/C1d9BCxen0NQ+zCrQUkSc6AFD9PYkAmdTNnila5L15SrveQQRtbsDwZeZ9owVH7kyoXuDGUOOA6dc4qE=",
//     is_crypto: true
// }

export default async function handle(req: Request, res: Response) {
    const c = new Logger(req.ip);
    const acc = await Account.getAccountByUsername(req.body.account);
    const dataObj: any = {
        retcode: 0,
        message: "OK",
        data: {
            account: {}
        }
    }
    if (!acc) {
        dataObj.retcode = -202;
        dataObj.message = "Account not found";
        c.warn(`[DISPATCH] Player ${req.body.account} not found`);
        res.send(dataObj);
    } else {
        dataObj.data.account = acc;
        c.log(`[DISPATCH] Player ${req.body.account} logged in`);
        res.send(dataObj);
    }
}