import Logger from "../../util/Logger";
import Account from "../../db/Account";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";
import Player from "../../db/Player";
import { PlayerGetTokenScRsp } from "../../data/proto/StarRail";
const c = new Logger("Dispatch");

interface PlayerGetTokenCsReq {
    channel_id?: number;
    account_uid?: string;
    token?: string;
    uid?: number;
    device?: string;
}

const retWarn = (msg: string) => c.warn(msg);

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as PlayerGetTokenCsReq;

    let dataObj = {
        retcode: 0,
        secretKeySeed: 0
    } as PlayerGetTokenScRsp;

    const account = await Account.fromToken(body.token || "");
    if (!account) retWarn(`Account not found with token ${body.token}`);

    const player = await Player.fromToken(account?.token || "");
    if (!player) retWarn(`Player not found with accountToken ${account?.token}`);
    if (!player || !account) {
        dataObj.retcode = 6;
        return;
    }
    session.account = account;
    session.player = player;

    const isTokenValid = player.db.token === body.token;
    const isBanned = player.db.banned;
    if (isBanned) dataObj.retcode = 1013;
    if (!isTokenValid) {
        retWarn(`Token invalid (${session.ctx.address}:${session.ctx.port})`);
        dataObj.retcode = 1005;
        return;
    }

    dataObj.uid = player.db._id;
    session.send("PlayerGetTokenScRsp", dataObj);
}