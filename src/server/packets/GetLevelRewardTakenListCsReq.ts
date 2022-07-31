import { GetLevelRewardTakenListCsReq, GetLevelRewardTakenListScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetLevelRewardTakenListCsReq;

    session.send("GetLevelRewardTakenListScRsp", {
        retcode: 0,
        takenLevelList: []
    } as GetLevelRewardTakenListScRsp);
}