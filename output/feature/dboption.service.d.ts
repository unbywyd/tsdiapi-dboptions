import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto";
import type { Request } from "express";
export type ClassInstance<T> = new (...args: any[]) => T;
export type GuardType = (req: Request) => Promise<boolean> | boolean;
export declare class DboptionConfigService {
    config: Record<string, any>;
    dto: ClassInstance<any> | null;
    setDTO(dto: ClassInstance<any>): void;
    getDTO(): ClassInstance<any>;
    requestGuard: GuardType;
    setRequestGuard(guard: GuardType): void;
    validateAccess(req: Request): Promise<boolean>;
}
export interface Dboptions {
    [key: string]: any;
}
export default class DboptionService {
    getValue<K extends keyof Dboptions>(name: K): Promise<Dboptions[K] | null>;
    getConfig(name: string): Promise<Dboptions>;
    getSourceConfig(name: string): Promise<OutputDboptionDTO>;
    getConfigs(): Promise<Dboptions>;
    createConfig(data: InputDboptionDTO): Promise<Dboptions>;
}
//# sourceMappingURL=dboption.service.d.ts.map