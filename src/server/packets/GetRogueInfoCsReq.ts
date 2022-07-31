import { GetRogueInfoScRsp, RogueStatus } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetRogueInfoScRsp", {
        retcode: 0,
        rogueInfo: {
            status: RogueStatus.ROGUE_STATUS_DOING,
            rogueCoin: 1,
            baseAvatarIdList: [1001],
            rogueStamina: 100,
            reviveCount: 1,
            recoverStaminaCount: 1,
            isRecordSaved: true,
            beginTime: Math.round(Date.now() / 1000),
            endTime: Math.round(Date.now() / 1000) + 3600,
            isWin: true,
        }
    } as GetRogueInfoScRsp);
}