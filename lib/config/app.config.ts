export interface IAppConfig {
    DB_URI: string;
    NODE_ENV: string;
}
export class AppConfig {
    DB_URI: string;
    NODE_ENV: string;

    /**
     * @param cfg @type IAppConfig
     *
     */
    constructor(cfg: IAppConfig) {
        this.DB_URI = cfg.DB_URI;
        this.NODE_ENV = cfg.NODE_ENV;

        let missingKeys: string[] = [];
        Object.keys(cfg).forEach(key => {
            if (cfg[key as keyof IAppConfig] === undefined || cfg[key as keyof IAppConfig] === "") {
                missingKeys.push(key);
            }
        });
    }
}
