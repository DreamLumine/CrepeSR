import { PlayerKeepAliveNotify } from "../../data/proto/StarRail";
import Packet from "../kcp/Packet";
import Session from "../kcp/Session";

export default async function handle(session: Session, packet: Packet) {
    const body = packet.body as PlayerKeepAliveNotify;

    // We actually don't need to handle this
}