function sendJson(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function notFound(res) {
    sendJson(res, 404, { 'error': 'Not found'});
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
      let data = '';
  
      req.on('data', (chunk) => {
        data += chunk.toString();
      });

      req.on('end', () => {
        // Si il y a pas de Data on retourn un JSON par défault
        if (!data) return resolve({});

        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', reject);
    });
}

module.exports={
    sendJson, 
    notFound, 
    parseBody
};
