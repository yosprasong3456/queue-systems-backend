import { boolean } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IQueue {
    time: string;
    queue_no: string;
    status: Number ,
    menu_id: String,
    count: Number
}

export interface IQueueModel extends IQueue, Document {}

const QueueSchema: Schema = new Schema(
    {
        time: { type: String, required: true },
        queue_no: { type: String, required: true },
        status: { type: Number, default: 0},
        menu_id: { type: Schema.Types.ObjectId, ref: 'Menu' },
        count: { type: Number, default : 0 }
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
        versionKey: false,
        collection: 'queues'
    }
);

QueueSchema.virtual('menus', {
    ref: 'Menu',
    localField: 'menu_id',
    foreignField: '_id',
  });

export default mongoose.model<IQueueModel>('Queue', QueueSchema);