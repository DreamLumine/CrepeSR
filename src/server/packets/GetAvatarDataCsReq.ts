import { GetAvatarDataCsReq, GetAvatarDataScRsp } from "../../data/proto/StarRail";
import AvatarExcelTable from "../../data/excel/AvatarExcelTable.json";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as GetAvatarDataCsReq;

    const dataObj = {
        retcode: 0,
        avatarList: [{
            baseAvatarId: 1001,
            equipmentUniqueId: 13501,
            equipRelicList: [],
            exp: 0,
            level: 1,
            promotion: 1,
            rank: 1,
            skilltreeList: [],
        }],
        isAll: body.isGetAll
    } as GetAvatarDataScRsp;

    Object.values(AvatarExcelTable).forEach(avatar => {
        // dataObj.avatarList.push()
    });

    session.send("GetAvatarDataScRsp", dataObj);
}