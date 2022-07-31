import { GetFirstTalkNpcCsReq, GetFirstTalkNpcScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetFirstTalkNpcCsReq;

    session.send("GetFirstTalkNpcScRsp", {
        retcode: 0,
    } as GetFirstTalkNpcScRsp);
}