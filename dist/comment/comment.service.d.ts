import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comment.schema';
export declare class CommentService {
    private model;
    constructor(model: Model<Comment>);
    create(dto: CreateCommentDto, user: any): Promise<import("mongoose").Document<unknown, {}, Comment> & Comment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByPost(postId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Comment> & Comment & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Comment> & Comment & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Comment, "find", {}>;
    update(dto: UpdateCommentDto, user: any): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string, user: any): Promise<import("mongodb").DeleteResult>;
}
//# sourceMappingURL=comment.service.d.ts.map