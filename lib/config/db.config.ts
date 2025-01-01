import mongoose from "mongoose";
import { cfg } from "../init";

declare global  {
    var mongoose: any
}
let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export class DB {

    static async connect() {
        if(cached.conn) {
            return cached.conn
        }

        if(!cached.promise) {
            const opts = {};
            cached.promise = mongoose.connect(cfg.DB_URI, opts).then(mongoose => mongoose);


            try {
                cached.conn = await cached.promise
            } catch(err) {
                cached.promise = null;
                throw err;
            }
            return cached.conn;
        }
    }
}
