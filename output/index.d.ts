import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { FastifyRequest } from "fastify/fastify.js";
import { TObject } from "@sinclair/typebox";
export type PluginOptions = {
    autoRegisterControllers?: boolean;
    adminGuard?: (req: FastifyRequest) => Promise<boolean>;
    tSchema?: TObject;
};
export declare class DbOptionsPlugin implements AppPlugin {
    name: string;
    context: AppContext;
    config: PluginOptions;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export default function createPlugin(config?: PluginOptions): DbOptionsPlugin;
//# sourceMappingURL=index.d.ts.map