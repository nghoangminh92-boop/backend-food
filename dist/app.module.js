"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const core_module_1 = require("./core/core.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const post_module_1 = require("./post/post.module");
const comment_module_1 = require("./comment/comment.module");
const file_module_1 = require("./file/file.module");
require("dotenv/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB_URL || 'mongodb://localhost/test'),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            file_module_1.FileModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map