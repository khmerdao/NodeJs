// Controller pour les entities
// Le controller gère la logique métier HTTP : validation, réponses HTTP, gestion des erreurs
// Il appelle le service pour manipuler les données

const { sendJson, notFound, parseBody }  = require('../Services/HttpService');
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

    // Récupère un object par son ID
    getById(res, id) {
        const object = this.repository.getById(id);
        if (!object) return notFound(res);
        return sendJson(res, 200, object);
    }

    // Crée un nouvel object
    async createObject(req, res) {
        try {
            // Lecture et parsing du corps de la requête
            const body = await parseBody(req);
            // Validation des champs requis
            // if (!body.title || !body.author) {
            //     return sendJson(res, 400, { 
            //         error: 'Les champs title et author sont requis' 
            //     });
            // }
            
            // Appel du service pour créer l'object
            const newObject = this.repository.create(body);
            // Retour de l'object créé avec le statut 201
            return sendJson(res, 201, newObject);
        } catch (err) {
            // Gestion des erreurs (JSON invalide, erreur de sauvegarde, etc.)
            return sendJson(res, 400, { error: err.message });
        }
    }

    // Met à jour un object par son ID
    async updateObject(req, res, id) {
        try {
            // Lecture et parsing du corps de la requête
            const body = await parseBody(req);
            
            // Appel du service pour mettre à jour l'object
            const updatedObject = this.repository.update(id, body);
            
            // Si l'object n'existe pas, le service retourne null
            if (!updatedObject) return notFound(res);
            
            // Retour de l'object mis à jour
            return sendJson(res, 200, updatedObject);
        } catch (err) {
            // Gestion des erreurs (JSON invalide, erreur de sauvegarde, etc.)
            return sendJson(res, 400, { error: err.message });
        }
    }

    // Supprime un object par son ID
    deleteObject(res, id) {
    // Appel du service pour supprimer l'object
    const deleted = this.repository.remove(id);
    
    // Si l'object n'existe pas, le service retourne false
    if (!deleted) {
        return notFound(res);
    }
    
    // Retour d'un statut 204 (No Content) sans corps
    res.writeHead(204);

    return res.end();
    }
}
