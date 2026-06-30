import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
export declare class PostService {
    private model;
    constructor(model: Model<Post>);
    create(dto: CreatePostDto, user: any): Promise<import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Post, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(dto: UpdatePostDto, user: any): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string, user: any): Promise<import("mongodb").DeleteResult>;
}
//# sourceMappingURL=post.service.d.ts.map