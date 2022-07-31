import { SceneEntityMoveCsReq, SceneEntityMoveScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as SceneEntityMoveCsReq;

    session.send("SceneEntityMoveScRsp", {
        retcode: 0,
        downloadData: undefined,
    } as SceneEntityMoveScRsp);
}