import Config from "../util/Config";
import Logger, { VerboseLevel } from "../util/Logger";
import { Command } from "./Interface";
const c = new Logger("/debug", "blue");

export default async function handle(command: Command) {
    if (!command.args[0]) c.log(`VerboseLevel: ${Config.VERBOSE_LEVEL}`);
    else {
        let level = parseInt(command.args[0]);
        if (!level) level = 0;
        if (level > 2 || level < 0) {
            c.log("Invalid verbose level. Must be between 0 and 2.");
            return;
        }

        Config.VERBOSE_LEVEL = level as unknown as VerboseLevel;
        Logger.VERBOSE_LEVEL = level as unknown as VerboseLevel;
        c.log(`VerboseLevel set to ${Config.VERBOSE_LEVEL} (${VerboseLevel[level]})`);
    }
}