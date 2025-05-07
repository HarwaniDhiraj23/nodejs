// ************** use if user use row query ************************

// import { up as createUsers } from '../migrations/001_create_users_table';
// import { up as alterUsers } from '../migrations/002_add_password_users_table'
// import { dbClient } from '../config';

// (async () => {
//     try {
//         await createUsers();
//         await alterUsers();
//         console.log('✅ Migration completed');
//     } catch (err) {
//         console.error('❌ Migration failed', err);
//     } finally {
//         await dbClient.end();
//     }
// })();
//******************************************************/

import { sequelize } from '../config/index';  // Your Sequelize instance
import { readdirSync } from 'fs';
import { join } from 'path';

(async () => {
    try {

        await sequelize.authenticate();
        console.log('✅ DB Connected');
        const migrationFiles = readdirSync(join(__dirname, '../migrations'))
            .filter(file => file.endsWith('.ts'))
            .sort();
        for (const file of migrationFiles) {
            const migration = require(join(__dirname, '../migrations', file));
            if (typeof migration.up === 'function') {
                console.log(`📦 Running migration: ${file}`);
                await migration.up(sequelize.getQueryInterface());
                console.log(`✅ Migration ${file} completed`);
            }
        }
        console.log('✅ All migrations completed successfully');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await sequelize.close();
    }
})();