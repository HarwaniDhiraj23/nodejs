import app from './app';
import config, { connectDB } from './config';
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';


// const keyPath = path.resolve(__dirname, '../key.pem');
// const certPath = path.resolve(__dirname, '../cert.pem');

// const credentials = {
//     key: fs.readFileSync(keyPath, 'utf-8'),
//     cert: fs.readFileSync(certPath, 'utf-8'),
// };

//for normal server
// app.listen(config.port, () => {
//     console.log(`🚀 Server running in ${config.env} mode on http://localhost:${config.port}`);
//     console.log(`url is :${config.dbUrl}`)
// });

// (async () => {
//     await connectDB();
// })();

connectDB()

http.createServer(app).listen(config.port, () => {
    console.log(`🚀 HTTP server running in ${config.env} mode on http://localhost:${config.port}`);
});

// Start HTTPS Server
// https.createServer(credentials, app).listen(8080, () => {
//     console.log(`🔐 HTTPS server running on https://localhost:8080`);
// });
