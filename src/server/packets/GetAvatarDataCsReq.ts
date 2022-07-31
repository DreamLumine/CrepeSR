import { ActivateFarmElementCsReq, GetAvatarDataCsReq, GetAvatarDataScRsp } from "../../data/proto/StarRail";
import AvatarExcelTable from "../../data/excel/AvatarExcelTable.json";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetAvatarDataCsReq;

    const dataObj = {
        retcode: 0,
        avatarList: [{
            
        }],
        isAll: false
    } as GetAvatarDataScRsp;

    Object.values(AvatarExcelTable).forEach(avatar => {
        dataObj.avatarList.push({
            baseAvatarId: avatar.AvatarID,
            equipmentUniqueId: 13501,
            equipRelicList: [],
            exp: 0,
            level: 1,
            promotion: 1,
            rank: 100101,
            skilltreeList: avatar.SkillList.map(skill => ({level: 1, pointId: skill})),
        })
    });

    session.send("GetAvatarDataScRsp", dataObj);
}