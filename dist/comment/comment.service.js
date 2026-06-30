"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
let CommentService = class CommentService {
    constructor(model) {
        this.model = model;
    }
    create(dto, user) {
        return this.model.create({
            ...dto,
            userId: user.userId,
            user: user.username,
            createdAt: new Date(),
        });
    }
    findByPost(postId) {
        return this.model
            .find({ postId })
            .select('postId content user userId avatar createdAt')
            .sort({ createdAt: -1 });
    }
    async update(dto, user) {
        const comment = await this.model.findById(dto._id);
        if (!comment) {
            throw new common_1.BadRequestException(`Comment với id = ${dto._id} không tồn tại trên hệ thống.`);
        }
        if (comment.userId !== user.userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền sửa bình luận này');
        }
        return this.model.updateOne({ _id: dto._id }, { ...dto });
    }
    async remove(id, user) {
        const comment = await this.model.findById(id);
        if (!comment) {
            throw new common_1.BadRequestException(`Comment với id = ${id} không tồn tại trên hệ thống.`);
        }
        if (comment.userId !== user.userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền xóa bình luận này');
        }
        return this.model.deleteOne({ _id: id });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentService);
//# sourceMappingURL=comment.service.js.map