import Logger from "../../util/Logger";
import Account from "../../db/Account";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";
const c = new Logger("Dispatch");

interface PlayerGetTokenCsReq {
    accountToken?: string;
    accountUid?: string;
    accountType?: number;
}

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as PlayerGetTokenCsReq;
    const account = await Account.getAccountByUID(body.accountUid || 0);
    if (!account) {
        c.error(`Account not found: ${body.accountUid}`);
        return;
    }

    const isTokenValid = account.token === body.accountToken;
    if (!isTokenValid) {
        c.error(`Token invalid (${session.ctx.address}:${session.ctx.port})`);
        return;
    }

    session.send("PlayerGetTokenScRsp", {
        uid: account.uid,
        token: body.accountToken,
        secretKey: BigInt(0).toString(),
        accountUid: account.uid.toString(),
        accountType: body.accountType,
    });
}