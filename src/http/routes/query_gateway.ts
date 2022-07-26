import { Request, Response } from "express";
import protobuf from 'protobufjs';
import { resolve } from 'path';
import Config from "../../util/Config";

const proto = protobuf.loadSync(resolve(__dirname, '../../proto/QueryCurrRegionHttpRsp.proto')).lookup('QueryCurrRegionHttpRsp') as any;

export default function handle(req: Request, res: Response) {
    const dataObj = {
        retcode: 0,
        msg: "OK",
        regionName: "CrepeSR",
        gateserverIp: Config.GAMESERVER.SERVER_IP,
        gateserverPort: Config.GAMESERVER.SERVER_PORT,
    } as any;

    if (Config.GAMESERVER.MAINTENANCE) {
        dataObj.retcode = 2;
        dataObj.msg = Config.GAMESERVER.MAINTENANCE_MSG;
        dataObj.stopBeginTime = Date.now();
        dataObj.stopEndTime = Date.now() * 2;
    }

    let rsp;
    try {
        rsp = proto!.encode(dataObj).finish();
    } catch {
        rsp = proto!.encode({
            retcode: 2,
            msg: "Internal server error",
            stopBeginTime: Date.now(),
            stopEndTime: Date.now() * 2,
        }).finish();
    }
    res.send(Buffer.from(rsp).toString('base64'));
}