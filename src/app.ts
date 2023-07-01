import * as http from 'http';
import 'dotenv/config';
import { Controller } from './controller';
import { getReqData } from './utils';
import { resolve } from './types';

const PORT = process.env.STATUS === 'prod' ? process.env.PROD_PORT : process.env.DEV_PORT;
const CONTROLLER = new Controller();

const server = http.createServer(async (req, res) => {
    try {
        // GET /api/users
        if (req.url === '/api/users' && req.method === 'GET') {
            const response = await CONTROLLER.getUsers() as resolve;
            res.writeHead(response.status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.data));
        }
        // GET /api/users/:id
        else if (req.url?.startsWith('/api/users') && req.method === 'GET') {
            try {
                const id = req.url.split('/')[3];
                const response = await CONTROLLER.getUserById(id) as resolve;
                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response.data));
            } catch (e: any) {
                res.writeHead(e.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(e.message));
            }
        }
        // POST /api/users
        else if (req.url?.startsWith('/api/users') && req.method === 'POST') {
            try {
                const reqData = await getReqData(req) as string;
                const response = await CONTROLLER.createUser(JSON.parse(reqData)) as resolve;
                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response.data));
            } catch (e: any) {
                res.writeHead(e.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(e.message));
            }
        }
        // PUT /api/users/:id
        else if (req.url?.startsWith('/api/users') && req.method === 'PUT') {
            try {
                const id = req.url.split('/')[3];
                const reqData = await getReqData(req) as string;
                const response = await CONTROLLER.updateUserById(id, JSON.parse(reqData)) as resolve;
                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response.data));
            } catch (e: any) {
                res.writeHead(e.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(e.message));
            }
        }
        // DELETE /api/users/:id
        else if (req.url?.startsWith('/api/users') && req.method === 'DELETE') {
            try {
                const id = req.url.split('/')[3];
                const response = await CONTROLLER.deleteUserById(id) as resolve;
                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response.data));
            } catch (e: any) {
                res.writeHead(e.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(e.message));
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('Route not found');
        }
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('The server is bad, please try again or try again later');
    }
});

server.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});