import { Request as ExpressRequest } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    create(dto: CreateCommentDto, req: ExpressRequest): Promise<import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByPost(postId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/comment.schema").Comment, "find", {}>;
    update(dto: UpdateCommentDto, req: ExpressRequest): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string, req: ExpressRequest): Promise<import("mongodb").DeleteResult>;
}
//# sourceMappingURL=comment.controller.d.ts.map