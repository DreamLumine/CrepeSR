import { GetChallengeRaidInfoCsReq, GetChallengeRaidInfoScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetChallengeRaidInfoCsReq;

    session.send("GetChallengeRaidInfoScRsp", {
        retcode: 0,
        challengeRaidList: [],
        takenRewardIdList: []
    } as GetChallengeRaidInfoScRsp);
}