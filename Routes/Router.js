// const { getAll, getById, createObject, updateObject, deleteObject } = require('../Controllers/articlesController');
const Controller = require('../Controllers/Controller');

'user strict';

module.exports = class Router {
  constructor(entityName) {
    this.entityName = entityName;
    this.entityNamePlural = entityName + "s";
    this.controller = new Controller(entityName);
  }

  async router(req, res, pathname, method) {
    // Route GET /articles - liste tous les articles
    if (pathname === `/${this.entityNamePlural}` && method === 'GET') {
      this.controller.getAll(res);
      return true;
    }
  
    // Route POST /articles - crée un nouvel article
    if (pathname === `/${this.entityNamePlural}` && method === 'POST') {
      await this.controller.createObject(req, res);
      return true;
    }
  
    // Gestion des routes avec ID (/articles/:id)
    if (pathname.startsWith(`/${this.entityNamePlural}/`)) {
      // Extraction de l'ID depuis l'URL
      const id = Number(pathname.split('/')[2]);
      
      // Si l'ID n'est pas un nombre valide, on ne gère pas cette route
      if (Number.isNaN(id)) {
        return false;
      }
  
      // Route GET /articles/:id - récupère un article par son ID
      if (method === 'GET') {
        this.controller.getById(res, id);
        return true;
      }
  
      // Route PUT /articles/:id - met à jour un article
      if (method === 'PUT') {
        await this.controller.updateObject(req, res, id);
        return true;
      }
  
      // Route DELETE /articles/:id - supprime un article
      if (method === 'DELETE') {
          this.controller.deleteObject(res, id);
          return true;
      }
    }
  
    // Si aucune route n'a été gérée, on retourne false
    return false;
  };
}

// module.exports = { router };