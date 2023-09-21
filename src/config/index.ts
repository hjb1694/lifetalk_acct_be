import 'dotenv/config';

interface DatabaseConfigObject {
    type: any;
    host: string;
    port: string | number;
    username: string;
    password: string;
    database_name: string;
}

interface DatabaseEnvConfig {
    development: DatabaseConfigObject;
    production: DatabaseConfigObject;
}

interface Config {
    app_env: 'development' | 'production';
    api_key: string;
    port: string;
    db: DatabaseEnvConfig;
}

export default <Config> {
    app_env: process.env.APP_ENV || 'development', 
    api_key: process.env.API_KEY || 'someapikey',
    port: process.env.PORT || 3000, 
    db: {
        development: {
            type: process.env.DEV_DB_TYPE || 'postgres', 
            host: process.env.DEV_DB_HOST || 'localhost', 
            port: process.env.DEV_DB_PORT || 5432,
            username: process.env.DEV_DB_USER || 'postgres', 
            password: process.env.DEV_DB_PASSWORD || '', 
            database_name: process.env.DEV_DB_NAME || 'lifetalk_acct_dev'
        }, 
        production: {
            type: process.env.DEV_DB_TYPE || 'postgres', 
            host: process.env.DEV_DB_HOST || 'localhost', 
            port: process.env.DEV_DB_PORT || 5432,
            username: process.env.DEV_DB_USER || 'postgres', 
            password: process.env.DEV_DB_PASSWORD || '', 
            database_name: process.env.DEV_DB_NAME || 'lifetalk_acct_prod'
        }
    }
}