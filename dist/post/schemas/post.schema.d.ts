export declare class Post {
    title: string;
    content: string;
    image: string;
    author: string;
    userId: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, import("mongoose").Document<unknown, any, Post> & Post & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=post.schema.d.ts.map