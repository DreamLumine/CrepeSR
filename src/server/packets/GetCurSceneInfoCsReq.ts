import { GetCurSceneInfoScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetCurSceneInfoScRsp", {
        retcode: 0,
        scene: {
            planeId: 10000,
            floorId: 10000000,
            entityList: [],
            entityBuffList: [],
            entryId: 10001,
            envBuffList: [],
            gameModeType: 1,
            lightenSectionList: []
        },
    } as unknown as GetCurSceneInfoScRsp);
}