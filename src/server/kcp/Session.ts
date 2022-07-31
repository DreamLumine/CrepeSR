import _KCP from 'node-kcp-token';
import { RemoteInfo } from 'dgram';
import { resolve } from 'path';
import fs from 'fs';
import KCP from 'node-kcp-token';
import Packet, { PacketName } from './Packet';
import Logger, { VerboseLevel } from '../../util/Logger';
import defaultHandler from '../packets/PacketHandler';
import Account from '../../db/Account';
import Player from '../../db/Player';

function r(...args: string[]) {
    return fs.readFileSync(resolve(__dirname, ...args));
}

export default class Session {
    public key: Buffer = r('./initial.key');
    public c: Logger;
    public account!: Account;
    public player!: Player;
    public constructor(private readonly kcpobj: KCP.KCP, public readonly ctx: RemoteInfo) {
        this.kcpobj = kcpobj;
        this.ctx = ctx;
        this.c = new Logger(`${this.ctx.address}:${this.ctx.port}`, 'yellow');
        this.update();
    }

    public inputRaw(data: Buffer) {
        this.kcpobj.input(data);
    }

    public async update() {
        if (!this.kcpobj) {
            console.error("wtf kcpobj is undefined");
            console.debug(this)
            return;
        }
        const hr = process.hrtime();

        const timestamp = hr[0] * 1000000 + hr[1] / 1000;
        this.kcpobj.update(timestamp);

        let recv;
        do {
            recv = this.kcpobj.recv();
            if (!recv) break;

            this.c.debug(`recv ${recv.toString("hex")}`);

            if (Packet.isValid(recv)) {
                this.handlePacket(new Packet(recv));
            }

        } while (recv)

        setTimeout(() => this.update(), 1);
    }

    public async handlePacket(packet: Packet) {
        if (Logger.VERBOSE_LEVEL >= VerboseLevel.WARNS) this.c.log(packet.protoName)

        import(`../packets/${packet.protoName}`).then(mod => {
            mod.default(this, packet);
        }).catch(e => {
            if (e.code === 'MODULE_NOT_FOUND') this.c.warn(`Unhandled packet: ${packet.protoName}`);
            else this.c.error(e);

            defaultHandler(this, packet);
        });
    }

    public send(name: PacketName, body: {}) {
        const packet = Packet.encode(name, body);
        if (!packet) return;
        if (Logger.VERBOSE_LEVEL >= VerboseLevel.WARNS) this.c.log(packet.protoName);
        this.c.debug(`send ${packet.rawData.toString('hex')}`);
        this.kcpobj.send(packet.rawData);
    }

    public sendRaw(data: Buffer) {
        this.kcpobj.send(data);
    }
}