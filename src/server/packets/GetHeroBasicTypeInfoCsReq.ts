import { Gender, GetHeroBasicTypeInfoScRsp, HeroBasicType } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetHeroBasicTypeInfoScRsp", {
        retcode: 0,
        gender: Gender.GenderMan,
        basicTypeInfoList: [{
            basicType: HeroBasicType.BoyMage,
            rank: 1,
            skillTreeList: []
        }],
        curBasicType: HeroBasicType.BoyMage,
        heroPathList: [],
        isPlayerInfoModified: false,
        isGenderModified: false
    } as GetHeroBasicTypeInfoScRsp);
}