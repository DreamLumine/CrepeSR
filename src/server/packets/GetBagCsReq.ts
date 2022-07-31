import { GetBagScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetBagScRsp", {
        equipmentList: [],
        materialList: [],
        relicList: [],
        retcode: 0,
        rogueItemList: [],
        waitDelResourceList: []
    } as GetBagScRsp);
}