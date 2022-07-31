import { GetAllLineupDataScRsp } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    session.send("GetAllLineupDataScRsp", {
        retcode: 0,
        lineupList: []
    } as unknown as GetAllLineupDataScRsp);
}