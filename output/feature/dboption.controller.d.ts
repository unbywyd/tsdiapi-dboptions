import DboptionService, { Dboptions } from "./dboption.service";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto";
export declare class DboptionController {
    private dboptionService;
    constructor(dboptionService: DboptionService);
    createDboption(config: InputDboptionDTO): Promise<Dboptions>;
    getDboption(): Promise<Dboptions>;
    getSourceDboptionByName(name: string): Promise<OutputDboptionDTO>;
    getDboptionByName(name: string): Promise<Dboptions>;
}
//# sourceMappingURL=dboption.controller.d.ts.map