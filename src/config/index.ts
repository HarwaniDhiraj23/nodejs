// import dotenv from 'dotenv';
// import { Client } from 'pg';

// dotenv.config();

// type Environments = 'development' | 'staging' | 'production';

// const NODE_ENV = (process.env.NODE_ENV ?? 'development') as Environments;

// const config = {
//     development: {
//         env: 'development',
//         port: parseInt(process.env.DEV_PORT ?? '3001', 10),
//         dbUrl: process.env.DEV_DB_URL ?? '',
//     },
//     staging: {
//         env: 'staging',
//         port: parseInt(process.env.STAGE_PORT ?? '3002', 10),
//         dbUrl: process.env.STAGE_DB_URL ?? '',
//     },
//     production: {
//         env: 'production',
//         port: parseInt(process.env.PROD_PORT ?? '3000', 10),
//         dbUrl: process.env.PROD_DB_URL ?? '',
//     },
// }[NODE_ENV];

// export default config;

// export const dbClient = new Client({
//     connectionString: config.dbUrl,
// });

// (async () => {
//     try {
//         await dbClient.connect();
//         console.log('✅ PostgreSQL connected');
//     } catch (err) {
//         console.error('❌ PostgreSQL connection error:', err);
//     }
// })();

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

type Environments = 'development' | 'staging' | 'production';

const NODE_ENV = (process.env.NODE_ENV ?? 'production') as Environments;

const config = {
    development: {
        env: 'development',
        port: parseInt(process.env.DEV_PORT ?? '3001', 10),
        dbUrl: process.env.DEV_DB_URL ?? '',
    },
    staging: {
        env: 'staging',
        port: parseInt(process.env.STAGE_PORT ?? '3002', 10),
        dbUrl: process.env.STAGE_DB_URL ?? '',
    },
    production: {
        env: 'production',
        port: parseInt(process.env.PROD_PORT ?? '3000', 10),
        dbUrl: process.env.PROD_DB_URL ?? '',
    },
    test: {
        env: 'test',
        port: parseInt(process.env.DEV_PORT ?? '3001', 10),
        dbUrl: process.env.DEV_DB_URL ?? '',
    },
}[NODE_ENV];

export default config;

export const sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Use false if your certificate is self-signed
        }
    },
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL (Sequelize) connected');

        await sequelize.sync({ alter: true });
        console.log('✅ Tables synced');
    } catch (err) {
        console.error('❌ Sequelize connection error:', err);
        throw err; // Optional: rethrow to handle in caller
    }
};
