// Controller pour les entities
// Le controller gère la logique métier HTTP : validation, réponses HTTP, gestion des erreurs
// Il appelle le service pour manipuler les données

const { sendJson, notFound, parseBody }  = require('../Services/HttpService');
// const {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
// } = require('../Repository/articleRepository');

const Repository = require('../Repository/Repository');

module.exports = class Controller {
    constructor(entityName) {
        this.entityName = entityName;
        this.entityNamePlural = entityName + "s";
        this.repository = new Repository(entityName);
    }

    // Liste tous les entities
    getAll(res) {
        const entities = this.repository.getAll();
        return sendJson(res, 200, entities);
    }

    // Récupère un article par son ID
    getById(res, id) {
        const article = this.repository.getById(id);
        if (!article) return notFound(res);
        return sendJson(res, 200, article);
    }

    // Crée un nouvel article
    async createObject(req, res) {
        try {
            // Lecture et parsing du corps de la requête
            const body = await parseBody(req);
            console.log(body);
            // Validation des champs requis
            // if (!body.title || !body.author) {
            //     return sendJson(res, 400, { 
            //         error: 'Les champs title et author sont requis' 
            //     });
            // }
            
            // Appel du service pour créer l'article
            const newArticle = this.repository.create(body);
            // Retour de l'article créé avec le statut 201
            return sendJson(res, 201, newArticle);
        } catch (err) {
            // Gestion des erreurs (JSON invalide, erreur de sauvegarde, etc.)
            return sendJson(res, 400, { error: err.message });
        }
    }

    // Met à jour un article par son ID
    async updateObject(req, res, id) {
        try {
            // Lecture et parsing du corps de la requête
            const body = await parseBody(req);
            
            // Appel du service pour mettre à jour l'article
            const updatedArticle = this.repository.update(id, body);
            
            // Si l'article n'existe pas, le service retourne null
            if (!updatedArticle) return notFound(res);
            
            // Retour de l'article mis à jour
            return sendJson(res, 200, updatedArticle);
        } catch (err) {
            // Gestion des erreurs (JSON invalide, erreur de sauvegarde, etc.)
            return sendJson(res, 400, { error: err.message });
        }
    }

    // Supprime un article par son ID
    deleteObject(res, id) {
    // Appel du service pour supprimer l'article
    const deleted = this.repository.remove(id);
    
    // Si l'article n'existe pas, le service retourne false
    if (!deleted) {
        return notFound(res);
    }
    
    // Retour d'un statut 204 (No Content) sans corps
    res.writeHead(204);

    return res.end();
    }
}

// module.exports = {
//   getAll,
//   getById,
//   createObject,
//   updateObject,
//   deleteObject,
// };
