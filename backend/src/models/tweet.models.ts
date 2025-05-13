import mongoose, { Model, Schema } from "mongoose";

interface ITweet extends Document{
    content:string;
    author:mongoose.Types.ObjectId;
    media?:string[]
}

const tweetSchema = new Schema<ITweet>(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        media: [String],
    },
    { timestamps: true }
)

export const Tweet: Model<ITweet> = mongoose.model<ITweet>("Tweet", tweetSchema)