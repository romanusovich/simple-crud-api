import * as http from 'http';
import 'dotenv/config';

const PORT = process.env.STATUS === 'prod' ? process.env.PROD_PORT : process.env.DEV_PORT;

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write('Hello World!');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});