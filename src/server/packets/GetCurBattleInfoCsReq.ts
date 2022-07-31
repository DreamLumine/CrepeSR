import { AvatarType, BattleEndStatus, GetCurBattleInfoCsReq, GetCurBattleInfoScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetCurBattleInfoCsReq;

    session.send("GetCurBattleInfoScRsp", {
        retcode: 0,
        avatarList: [{
            avatarType: AvatarType.AVATAR_FORMAL_TYPE,
            id: 1001,
            level: 1,
            rank: 1,
            index: 1,
            hp: 100,
            sp: 100,
            promotion: 1,
        }],
        stageId: 10000,
        logicRandomSeed: 2503,
        battleInfo: {},
        lastEndStatus: BattleEndStatus.BATTLE_END_WIN,
        lastEventId: 0
    } as GetCurBattleInfoScRsp);
}