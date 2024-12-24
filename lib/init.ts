import { AppConfig } from "./config/app.config";

export const cfg = new AppConfig({
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.MONGO_URI
});