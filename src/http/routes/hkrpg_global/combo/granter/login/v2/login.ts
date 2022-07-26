import { Request, Response } from "express";

export default function handle(req: Request, res: Response) {
    res.send({
        retcode: 0,
        message: "OK",
        data: {
            combo_id: "0",
            open_id: "",
            combo_token: "",
            data: '{"guest":false}',
            heartbeat: false,
            account_type: 1,
            fatigue_remind: null
        }
    });
}