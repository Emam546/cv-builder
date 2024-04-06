import mongoose from "mongoose";
export interface UserData {
    sections: Data;
    sectionState: SectionStateType;
}
export interface User {
    firstName: string;
    lastName: string;
    email?: string;
    data?: UserData;
    apiKey: string;
    provider_id?: string;
    provider_type?: "facebook" | "google" | "linkedin";
}
export interface UserTokenInfo extends Omit<User, "data"> {
    _id: string;
}
const schema = new mongoose.Schema<User>(
    {
        firstName: {
            type: String,
            min: 2,
            required: true,
        },
        lastName: {
            type: String,
            min: 2,
            required: true,
        },
        email: {
            type: String,
            min: 2,
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
    },
    { minimize: false }
);

schema.index({ apiKey: 1 });
schema.index({ provider_id: 1, provider_type: 1 });
type TSchema = typeof schema;

export default ((mongoose.models && mongoose.models.user) ||
    mongoose.model("user", schema)) as MongoModel<TSchema>;
