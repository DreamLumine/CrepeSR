import { Gender, GetHeroBasicTypeInfoCsReq, GetHeroBasicTypeInfoScRsp, HeroBasicType } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetHeroBasicTypeInfoCsReq;

    session.send("GetHeroBasicTypeInfoScRsp", {
        retcode: 0,
        gender: Gender.GenderMan,
        basicTypeInfoList: [{
            basicType: HeroBasicType.BoyMage,
            rank: 1,
            skillTreeList: [{
                level: 1,
                pointId: 1
            }]
        }],
        curBasicType: HeroBasicType.BoyMage,
        heroPathList: [{
            exp: 0,
            level: 1,
            heroPathType: 1
        }],
        isPlayerInfoModified: false,
        isGenderModified: false
    } as GetHeroBasicTypeInfoScRsp);
}