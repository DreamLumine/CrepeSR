/**
 * @package CrepeSR
 * @author Crepe-Inc
 * @license AGPL-3.0
 */
import Interface from "./commands/Interface";
import HttpServer from "./http/HttpServer";
import SRServer from "./server/kcp/SRServer";
import Logger from "./util/Logger";
import ProtoFactory from "./ProtoFactory"

const c = new Logger("CrepeSR");
ProtoFactory.init();
c.log(`Starting CrepeSR...`);
Interface.start();
HttpServer.getInstance().start();
SRServer.getInstance().start();