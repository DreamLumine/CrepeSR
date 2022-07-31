import { GetLoginActivityCsReq, GetLoginActivityScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetLoginActivityCsReq;

    session.send("GetLoginActivityScRsp", {
        retcode: 0,
        loginActivityList: []
    } as GetLoginActivityScRsp);
}