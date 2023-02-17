import mongoose, { Document, Schema } from 'mongoose';

export interface IMenu {
    name: string;
    active: string;
    color: string;
    room: string
}

export interface IMenuModel extends IMenu, Document {}

const MenuSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        active: { type: String, required: true },
        color: { type: String, required: true },
        room: { type: String}
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
        versionKey: false ,
        collection: 'menus'
    }
);

MenuSchema.virtual('queues', {
    ref: 'Queue',
    localField: '_id',
    foreignField: 'menu_id',
  });

export default mongoose.model<IMenuModel>('Menu', MenuSchema);