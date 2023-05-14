import mongoose from "mongoose";
export interface UserData {
    sections: Data;
    sectionState: SectionStateType;
}
export interface User {
    _id: string;
    name: string;
    data?: UserData;
    apiKey: string;
}
export interface UserProvider extends User {
    provider_id?: string;
    provider_type?: "facebook" | "google" | "linkedin";
}
const schema = new mongoose.Schema<User | UserProvider>({
    name: {
        type: String,
        min: 2,
        required: true,
    },
    provider_id: {
        type: String,
        min: 2,
    },
    provider_type: {
        type: String,
        min: 2,
    },
    data: {
        type: Object,
        min: 2,
    },
    apiKey: {
        required: true,
        min: 2,
        type: String,
    },
});
schema.index({ apiKey: 1 });
schema.index({ provider_id: 1, provider_type: 1 });
type TSchema = typeof schema;
type model = mongoose.Model<
    mongoose.InferSchemaType<TSchema>,
    mongoose.ObtainSchemaGeneric<TSchema, "TQueryHelpers">,
    mongoose.ObtainSchemaGeneric<TSchema, "TInstanceMethods">,
    mongoose.ObtainSchemaGeneric<TSchema, "TVirtuals">,
    mongoose.HydratedDocument<
        mongoose.InferSchemaType<TSchema>,
        mongoose.ObtainSchemaGeneric<TSchema, "TVirtuals"> &
            mongoose.ObtainSchemaGeneric<TSchema, "TInstanceMethods">,
        mongoose.ObtainSchemaGeneric<TSchema, "TQueryHelpers">
    >,
    TSchema
> &
    mongoose.ObtainSchemaGeneric<TSchema, "TStaticMethods">;
export default (mongoose.models && (mongoose.models.user as model)) ||
    mongoose.model("user", schema);
