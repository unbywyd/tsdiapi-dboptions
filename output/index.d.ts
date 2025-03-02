import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { Request } from "express";
import { ClassInstance } from "./feature/dboption.service";
export type PluginOptions = {
    autoRegisterControllers?: boolean;
    adminGuard?: (req: Request) => boolean;
    configDTO?: ClassInstance<any>;
};
export declare class DbOptionsPlugin implements AppPlugin {
    name: string;
    context: AppContext;
    config: PluginOptions;
    globControllersPath: string | null;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export default function createPlugin(config?: PluginOptions): DbOptionsPlugin;
//# sourceMappingURL=index.d.ts.map