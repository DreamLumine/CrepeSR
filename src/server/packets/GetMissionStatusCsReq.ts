import { GetMissionStatusCsReq, GetMissionStatusScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetMissionStatusCsReq;

    session.send("GetMissionStatusScRsp", {
        retcode: 0,
        finishedMainMissionIdList: [],
        missionEventStatusList: [],
        subMissionStatusList: [],
        unfinishedMainMissionIdList: []
    } as GetMissionStatusScRsp);
}