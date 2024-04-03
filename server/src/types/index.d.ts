/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import mongoose from "mongoose";
declare global {
    interface MongoModel<TSchema>
        extends mongoose.Model<
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
        > {}
   
}
