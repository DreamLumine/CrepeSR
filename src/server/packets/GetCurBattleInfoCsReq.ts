import { AvatarType, GetCurBattleInfoCsReq, GetCurBattleInfoScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetCurBattleInfoCsReq;

    session.send("GetCurBattleInfoScRsp", {
        retcode: 0,
        avatarList: [{
            avatarType: AvatarType.AVATAR_TRIAL_TYPE,
            hp: 1000,
            id: 1001,
            index: 1,
            sp: 100,
            level: 1,
            promotion: 1,
            rank: 100101,
            equipmentList: [],
            relicList: [],
            skilltreeList: [100101]
        }],
        stageId: 10000,
        logicRandomSeed: 2503
    } as unknown as GetCurBattleInfoScRsp);
}