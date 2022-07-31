import { AvatarSlotType, AvatarType, GetCurLineupDataCsReq, GetCurLineupDataScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetCurLineupDataCsReq;

    session.send("GetCurLineupDataScRsp", {
        retcode: 0,
        lineup: {
            avatarList: [{
                slot: 1,
                avatarType: AvatarType.AVATAR_FORMAL_TYPE,
                id: 1001,
                hp: 100,
                sp: 100,
                satiety: 100
            }],
            index: 1,
            isVirtual: false,
            mp: 100,
            name: "lineuprspname",
            planeId: 10000,
            leaderSlot: 1
        }
    } as GetCurLineupDataScRsp);
}