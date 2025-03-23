import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { ClassInstance, DboptionConfigService } from "./feature/dboption.service.js";
import { Container } from "typedi";
import { FastifyRequest } from "fastify/fastify.js";
import { TObject } from "@sinclair/typebox";
import controllers from "./feature/dboption.controller.js";
export type PluginOptions = {
    autoRegisterControllers?: boolean;
    adminGuard?: (req: FastifyRequest) => Promise<boolean>;
    tSchema?: TObject;
};

export class DbOptionsPlugin implements AppPlugin {
    name = "dboptions";
    context!: AppContext;
    config: PluginOptions;

    constructor(config?: PluginOptions) {
        this.config = { ...config };
        const dboptionConfig = Container.get(DboptionConfigService);
        if (this.config.tSchema) {
            dboptionConfig.setDTO(this.config.tSchema);
        }
        if (this.config.adminGuard) {
            dboptionConfig.setRequestGuard(this.config.adminGuard);
        }
    }

    async onInit(ctx: AppContext) {
        this.context = ctx;
        const config = ctx.projectConfig;
        this.config.autoRegisterControllers = config.get('DBOPTIONS_AUTO_REGISTER_CONTROLLERS', this.config.autoRegisterControllers) as boolean;

        controllers(ctx);
    }
}

export default function createPlugin(config?: PluginOptions): DbOptionsPlugin {
    return new DbOptionsPlugin(config);
}
