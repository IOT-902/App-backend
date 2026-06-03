import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import { ISensorHistoryInfo } from 'src/models/app-info.model';


export type AppHistoryInfoDocument = HydratedDocument<AppHistoryInfo>;

@Schema()
export class AppHistoryInfo {
    @Prop({default: []})
    data!: ISensorHistoryInfo[]
}

export const AppHistoryInfoSchema = SchemaFactory.createForClass(AppHistoryInfo);


