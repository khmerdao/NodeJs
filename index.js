require('dotenv').config();

const http = require('http');
const { parse } = require('url');
const { sendJson, notFound }  = require('./Services/HttpService');

const Router = require('./Routes/Router');

// Création du serveur
const server = http.createServer(async (request, response) => {
    // Extraction du pathname depuis l'URL
    const { pathname } = parse(request.url);
    // Récupération de la méthode HTTP (GET, POST, etc.)
    const method = request.method.toUpperCase();
    // Route GET /hello-world
    if (pathname === '/hello-world' && method === 'GET') {
        return sendJson(response, 200, { message: 'Hello World!' });
    }

    const articleRouter = new Router("article");
    // Insertion de tous les routers
    if (pathname?.startsWith('/articles')) {
        const handled = await articleRouter.router(request, response, pathname, method);
        
        // Si la route est gérée, on retourne
        if (handled) return;
    }

    const recipeRouter = new Router("recipe");
    // Insertion de tous les routers
    if (pathname?.startsWith('/recipes')) {
        const handled = await recipeRouter.router(request, response, pathname, method);
        
        // Si la route est gérée, on retourne
        if (handled) return;
    }

    const userRouter = new Router("user");
    // Insertion de tous les routers
    if (pathname?.startsWith('/users')) {
        const handled = await userRouter.router(request, response, pathname, method);
        
        // Si la route est gérée, on retourne
        if (handled) return;
    }

    // Toutes les autres routes retournent une 404
    notFound(response);
})

const PORT = process.env.PORT;
// #TODO : Gestion d'erreur du PORT nom renseigné.
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
