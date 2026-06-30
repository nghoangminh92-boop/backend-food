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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schemas/post.schema");
let PostService = class PostService {
    constructor(model) {
        this.model = model;
    }
    create(dto, user) {
        return this.model.create({
            ...dto,
            userId: user._id || user.userId,
            author: dto.author || user.fullName || user.username || user.email,
            avatar: dto.avatar || user.avatar || '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    findAll() {
        return this.model
            .find()
            .select('_id title content image author userId avatar createdAt updatedAt')
            .sort({ createdAt: -1 });
    }
    async findOne(id) {
        const post = await this.model
            .findById(id)
            .select('_id title content image author userId avatar createdAt updatedAt');
        if (post)
            return post;
        throw new common_1.BadRequestException(`Post với id = ${id} không tồn tại trên hệ thống.`);
    }
    async update(dto, user) {
        const post = await this.model.findById(dto._id);
        if (!post) {
            throw new common_1.BadRequestException(`Post với id = ${dto._id} không tồn tại trên hệ thống.`);
        }
        if (post.userId !== user.userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền sửa bài viết này');
        }
        return this.model.updateOne({ _id: dto._id }, { ...dto, updatedAt: new Date() });
    }
    async remove(id, user) {
        const post = await this.model.findById(id);
        if (!post) {
            throw new common_1.BadRequestException(`Post với id = ${id} không tồn tại trên hệ thống.`);
        }
        if (post.userId !== user.userId) {
            throw new common_1.ForbiddenException('Bạn không có quyền xóa bài viết này');
        }
        return this.model.deleteOne({ _id: id });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostService);
//# sourceMappingURL=post.service.js.map