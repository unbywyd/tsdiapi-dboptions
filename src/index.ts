import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import path from "path";
import { Request } from "express";
import { ClassInstance, DboptionConfigService } from "./feature/dboption.service";
import Container from "typedi";

export type PluginOptions = {
    autoRegisterControllers?: boolean;
    adminGuard?: (req: Request) => boolean;
    configDTO?: ClassInstance<any>;
};

export class DbOptionsPlugin implements AppPlugin {
    name = "dboptions";
    context!: AppContext;
    config: PluginOptions;
    globControllersPath: string | null = null;

    constructor(config?: PluginOptions) {
        this.config = { ...config };
        const dboptionConfig = Container.get(DboptionConfigService);
        if (this.config.configDTO) {
            dboptionConfig.setDTO(this.config.configDTO);
        }
        if (this.config.adminGuard) {
            dboptionConfig.setRequestGuard(this.config.adminGuard);
        }
    }

    async onInit(ctx: AppContext) {
        this.context = ctx;
        const appConfig = this.context.config.appConfig || {};
        this.config.autoRegisterControllers = appConfig?.autoRegisterControllers || appConfig['DBOPTIONS_AUTO_REGISTER_CONTROLLERS'] || this.config.autoRegisterControllers;
        if (this.config.autoRegisterControllers) {
            this.globControllersPath = path.join(__dirname, '../') + path.normalize("output/feature/**/*.controller{.ts,.js}");
        }

        ctx.logger.info("✅ tsdiapi-dboptions Plugin initialized.");
    }
}

export default function createPlugin(config?: PluginOptions): DbOptionsPlugin {
    return new DbOptionsPlugin(config);
}
