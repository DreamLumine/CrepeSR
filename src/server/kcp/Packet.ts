import Logger, { VerboseLevel } from "../../util/Logger";
import protobuf from 'protobufjs';
import { resolve } from 'path';
import _packetIds from '../../data/packetIds.json';


export type PacketType = keyof typeof _packetIds;
const switchedPacketIds = _packetIds as { [key in PacketType]: string };
const packetIds: { [key: string]: PacketType } = (function () {
    const obj: { [key: string]: PacketType } = {};

    Object.keys(switchedPacketIds).forEach((key) => {
        obj[switchedPacketIds[key as PacketType]] = key as PacketType;
    });

    return obj;
})();


const c = new Logger("Packet")

export default class Packet {
    public readonly cmdid: number;
    public readonly data: Buffer;
    public body: {} = {};

    public constructor(public readonly rawData: Buffer, public readonly protoName: string = "") {
        // Remove the header and metadata
        const metadataLength = rawData.readUInt16BE(6);
        this.data = rawData.subarray(12 + metadataLength, 12 + metadataLength + rawData.readUInt32BE(8));
        this.cmdid = this.rawData.readUInt16BE(4);

        this.protoName = this.protoName || packetIds[this.cmdid.toString()];
        if (this.protoName) {
            try {
                const root = protobuf.loadSync(resolve(__dirname, `../../data/proto/${this.protoName}.proto`));
                const Message = root.lookupTypeOrEnum(this.protoName);
                this.body = Message.decode(this.data);
            } catch (e) {
                c.warn(`Failed to decode ${this.protoName}`);
                if (Logger.VERBOSE_LEVEL >= VerboseLevel.ALL) {
                    c.error(e as Error, false);
                }
                c.debug(`Data: ${this.data.toString("hex")}`);
            }
        } else {
            c.error(`Unknown packet id ${this.cmdid}`);
        }
    }

    public static isValid(data: Buffer): boolean {
        // Buffer acting fucky so i'll just use good ol' string manipulation
        const str = data.toString('hex');
        return str.startsWith("01234567") && str.endsWith("89abcdef");
    }

    public static encode(name: PacketType, body: {}, customCmdId?: number): Packet | null {
        try {
            const cmdid = Number(switchedPacketIds[name]);
            const root = protobuf.loadSync(resolve(__dirname, `../../data/proto/${name}.proto`));
            const Message = root.lookupTypeOrEnum(name);

            const data = Buffer.from(Message.encode(body).finish());
            const packet = Buffer.allocUnsafe(16 + data.length);
            packet.writeUInt32BE(0x1234567);
            packet.writeUint16BE(customCmdId || cmdid, 4);
            packet.writeUint16BE(0, 6);
            packet.writeUint32BE(data.length, 8);
            data.copy(packet, 12);
            packet.writeUint32BE(0x89abcdef, 12 + data.length);

            return new Packet(packet, name);
        } catch (e) {
            c.error(e as Error);
            return null;
        }
    }
}