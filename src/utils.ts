import * as http from 'http';
export function getReqData(req: http.IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (e) {
            reject(e);
        }
    });
}