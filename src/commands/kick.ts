import { BlackLimitLevel, PlayerKickOutScNotify, PlayerKickOutScNotify_KickType } from "../data/proto/StarRail";
import SRServer from "../server/kcp/SRServer";
import Logger from "../util/Logger";
import Interface, { Command } from "./Interface";
const c = new Logger("/kick", "blue");

export default async function handle(command: Command) {
    if (!Interface.target) {
        c.log("No target specified");
        return;
    }

    Interface.target.send("PlayerKickOutScNotify", {
        kickType: PlayerKickOutScNotify_KickType.KICK_BLACK,
        blackInfo: {
            limitLevel: BlackLimitLevel.BLACK_LIMIT_LEVEL_ALL,
            beginTime: Math.round(Date.now() / 1000),
            endTime: Math.round(Date.now() / 1000),
            banType: 2
        }
    } as PlayerKickOutScNotify);

    // SRServer.getInstance().sessions.delete(`${Interface.target.ctx.address}:${Interface.target.ctx.port}`);

    c.log(`Kicked ${Interface.target.account.name}`);
}