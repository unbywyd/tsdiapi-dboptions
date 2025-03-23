import { InputDboptionDTOType, OutputDboptionDTOType } from "./dboption.dto.js";
import { FastifyRequest } from "fastify";
import { TObject } from "@sinclair/typebox";
export type ClassInstance<T> = new (...args: any[]) => T;
export type GuardType = (req: FastifyRequest) => Promise<boolean> | boolean;
export declare class DboptionConfigService {
    config: Record<string, any>;
    tSchema: TObject;
    setDTO(tSchema: TObject): void;
    getTSchema(): TObject<import("@sinclair/typebox").TProperties>;
    requestGuard: GuardType;
    setRequestGuard(guard: GuardType): void;
    validateAccess(req: FastifyRequest): Promise<boolean>;
}
export interface Dboptions {
    [key: string]: never;
}
export default class DboptionService {
    getValue<K extends keyof Dboptions>(name: K): Promise<Dboptions[K] | null>;
    getConfig(name: string): Promise<Dboptions>;
    getSourceConfig(name: string): Promise<OutputDboptionDTOType>;
    getConfigs(): Promise<Dboptions>;
    createConfig(data: InputDboptionDTOType): Promise<Dboptions>;
}
//# sourceMappingURL=dboption.service.d.ts.map