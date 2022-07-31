import { GetNpcStatusCsReq, GetNpcStatusScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetNpcStatusCsReq;

    session.send("GetNpcStatusScRsp", {
        retcode: 0,
        messageStatusList: []
    } as GetNpcStatusScRsp);
}