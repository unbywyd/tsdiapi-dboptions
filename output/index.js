"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbOptionsPlugin = void 0;
exports.default = createPlugin;
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
class DbOptionsPlugin {
    name = "dboptions";
    context;
    config;
    globControllersPath = null;
    constructor(config) {
        this.config = { ...config };
    }
    async onInit(ctx) {
        this.context = ctx;
        const appConfig = this.context.config.appConfig || {};
        this.config.autoRegisterControllers = appConfig?.autoRegisterControllers || appConfig['DBOPTIONS_AUTO_REGISTER_CONTROLLERS'] || this.config.autoRegisterControllers;
        if (this.config.autoRegisterControllers) {
            this.globControllersPath = path_1.default.join(__dirname, '../') + path_1.default.normalize("output/controllers/**/*.controller{.ts,.js}");
        }
        this.config.entityName = appConfig?.entityName || appConfig['DBOPTIONS_ENTITY_NAME'] || this.config.entityName;
        ctx.logger.info("✅ tsdiapi-dboptions Plugin initialized.");
    }
}
exports.DbOptionsPlugin = DbOptionsPlugin;
function createPlugin(config) {
    return new DbOptionsPlugin(config);
}
//# sourceMappingURL=index.js.map