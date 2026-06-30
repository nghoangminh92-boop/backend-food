import { Request as ExpressRequest } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto, req: ExpressRequest): Promise<import("mongoose").Document<unknown, {}, import("./schemas/post.schema").Post> & import("./schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/post.schema").Post> & import("./schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, import("./schemas/post.schema").Post> & import("./schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/post.schema").Post, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/post.schema").Post> & import("./schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(dto: UpdatePostDto, req: ExpressRequest): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string, req: ExpressRequest): Promise<import("mongodb").DeleteResult>;
}
//# sourceMappingURL=post.controller.d.ts.map