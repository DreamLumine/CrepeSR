import { Request, Response } from "express";
import Account from "../../../../../../db/Account";
import Logger from "../../../../../../util/Logger";

// Example request:
// {"uid":"63884253","token":"ZQmgMdXA1StL9A3aPBUedr8yoiuoLrmV"}

export default async function handle(req: Request, res: Response) {
    const c = new Logger(req.ip);
    const acc = await Account.getAccountByUID(req.body.uid);
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
        res.send(dataObj);
        c.warn(`[DISPATCH] Player ${req.body.uid} not found`);
    } else {
        if (acc.token === req.body.token) {
            dataObj.data.account = acc;
            c.log(`[DISPATCH] Player ${req.body.uid} logged in`);
            res.send(dataObj);
        } else {
            dataObj.retcode = -202;
            dataObj.message = "Invalid token";
            res.send(dataObj);
        }
    }

}