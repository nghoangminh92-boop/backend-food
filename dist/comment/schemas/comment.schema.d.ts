import mongoose from 'mongoose';
export declare class Comment {
    postId: string;
    content: string;
    user: string;
    userId: string;
    avatar: string;
    createdAt: Date;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}>;
//# sourceMappingURL=comment.schema.d.ts.map