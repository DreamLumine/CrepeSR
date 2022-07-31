import { GetCurLineupDataCsReq, GetCurLineupDataScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetCurLineupDataCsReq;

    session.send("GetCurLineupDataScRsp", {
        retcode: 0,
        lineup: {
            avatarList: [1001, 1002],
            index: 1,
            isVirtual: false,
            mp: 100,
            name: "lineuprspname",
            planeId: 10000,
            leaderSlot: 1,
        }
    } as unknown as GetCurLineupDataScRsp);
}