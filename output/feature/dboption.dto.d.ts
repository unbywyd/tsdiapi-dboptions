import { Static } from "@sinclair/typebox";
export interface OutputDboption {
    [key: string]: any;
}
export declare const InputDboptionDTO: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
export type InputDboptionDTOType = Static<typeof InputDboptionDTO>;
export declare const OutputDboptionDTO: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    createdAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    updatedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
export declare const OptionsResponseDTO: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>;
export type OptionsResponseDTOType = Static<typeof OptionsResponseDTO>;
export type OutputDboptionDTOType = Static<typeof OutputDboptionDTO>;
//# sourceMappingURL=dboption.dto.d.ts.map