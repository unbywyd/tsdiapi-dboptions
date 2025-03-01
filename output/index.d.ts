import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
export type PluginOptions = {
    autoRegisterControllers?: boolean;
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