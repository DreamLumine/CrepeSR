import { GetMissionDataScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetMissionDataScRsp", {
        retcode: 0,
        missionList: []
    } as unknown as GetMissionDataScRsp);
}