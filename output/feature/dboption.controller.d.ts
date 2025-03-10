import DboptionService, { Dboptions } from "./dboption.service.js";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto.js";
export declare class OptionsResponseDTO {
    options: Record<string, never>;
}
export declare class OptionResponseDTO {
    option: Record<string, never>;
}
export declare class DboptionController {
    private dboptionService;
    constructor(dboptionService: DboptionService);
    createDboption(config: InputDboptionDTO): Promise<{
        options: Dboptions;
    }>;
    getDboption(): Promise<{
        options: Dboptions;
    }>;
    getSourceDboptionByName(name: string): Promise<OutputDboptionDTO>;
    getDboptionByName(name: string): Promise<{
        option: Promise<Dboptions>;
    }>;
}
//# sourceMappingURL=dboption.controller.d.ts.map