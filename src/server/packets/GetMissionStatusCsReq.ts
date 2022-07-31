import { GetMissionStatusCsReq, GetMissionStatusScRsp, MissionStatus } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetMissionStatusCsReq;

    const dataObj = {
        retcode: 0,
        finishedMainMissionIdList: [],
        missionEventStatusList: [],
        subMissionStatusList: [],
        unfinishedMainMissionIdList: []
    } as GetMissionStatusScRsp;

    body.mainMissionIdList.forEach(id => { dataObj.unfinishedMainMissionIdList.push(id); });

    body.missionEventIdList.forEach(id => {
        dataObj.missionEventStatusList.push({
            id: id,
            progress: 0,
            status: MissionStatus.MISSION_DOING
        });
    });

    body.subMissionIdList.forEach(id => {
        dataObj.subMissionStatusList.push({
            id: id,
            progress: 0,
            status: MissionStatus.MISSION_DOING
        });
    });

    session.send("GetMissionStatusScRsp", dataObj);
}