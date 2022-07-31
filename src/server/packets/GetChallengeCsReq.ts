import { GetChallengeCsReq, GetChallengeScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetChallengeCsReq;

    session.send("GetChallengeScRsp", {
        retcode: 0,
        challengeList: []
    } as GetChallengeScRsp);
}