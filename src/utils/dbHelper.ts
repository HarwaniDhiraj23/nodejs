// import { dbClient } from '../config'

// class DBHelper {
//     async select(table: string, selectParams = '*', condition?: string): Promise<any[]> {
//         let query = `SELECT ${selectParams} FROM ${table}`;
//         if (condition) {
//             query += ` WHERE ${condition}`;
//         }
//         console.log('\nSelect query ->> ', query);
//         try {
//             const result = await dbClient.query(query);
//             return result.rows;
//         } catch (error) {
//             console.error('Select Error:', error);
//             throw new Error('DB_ERROR');
//         }
//     }

//     async insert(table: string, data: Record<string, any>): Promise<any> {
//         const keys = Object.keys(data);
//         const values = Object.values(data);
//         const placeholders = keys.map((_, idx) => `$${idx + 1}`);
//         const query = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders.join(',')}) RETURNING *`;
//         try {
//             const result = await dbClient.query(query, values);
//             return result.rows[0];
//         } catch (error) {
//             console.error('Insert Error:', error);
//             throw new Error('DB_ERROR');
//         }
//     }

//     async update(table: string, condition: string, data: Record<string, any>): Promise<any> {
//         const entries = Object.entries(data);
//         const setClause = entries
//             .map(([key, value], idx) => `${key} = $${idx + 1}`)
//             .join(', ');
//         const values = entries.map(([_, value]) => value);
//         const query = `UPDATE ${table} SET ${setClause} WHERE ${condition} RETURNING *`;
//         try {
//             const result = await dbClient.query(query, values);
//             return result.rows[0];
//         } catch (error) {
//             console.error('Update Error:', error);
//             throw new Error('DB_ERROR');
//         }
//     }

//     async delete(table: string, condition: string): Promise<any> {
//         const query = `DELETE FROM ${table} WHERE ${condition}`;
//         try {
//             const result = await dbClient.query(query);
//             return result;
//         } catch (error) {
//             console.error('Delete Error:', error);
//             throw new Error('DB_ERROR');
//         }
//     }
// }

// export default new DBHelper();