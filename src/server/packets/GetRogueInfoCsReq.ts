import { GetRogueInfoCsReq, GetRogueInfoScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetRogueInfoCsReq;

    session.send("GetRogueInfoScRsp", {
        retcode: 0,
        
    } as GetRogueInfoScRsp);
}