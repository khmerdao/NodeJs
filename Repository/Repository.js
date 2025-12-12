// Service pour les objects
// Le service contient TOUTE la logique de manipulation des données
// Il ne connaît rien au HTTP, il manipule juste les données

const fs = require('fs');
const path = require('path');

module.exports = class Controller {
    constructor(entityName) {
        this.entityName = entityName;
        this.entityNamePlural = entityName + "s";
        // Chemin de la "base de données"
        this.DB_PATH = path.join(__dirname, '..', 'data', `${this.entityNamePlural}.json`);
        // Lance la vérification au chargement du module
        this.ensureDb();
        // Initialisation : chargement des objects et calcul du prochain ID
        this.objects = this.loadObjects();
        this.nextId = this.objects.reduce((max, { id }) => Math.max(max, id || 0), 0) + 1;
    }

    // Vérifie si le fichier de la base de données existe, sinon le crée
    ensureDb() {
        if (!fs.existsSync(this.DB_PATH)) {
            // Crée le dossier data s'il n'existe pas
            fs.mkdirSync(path.dirname(this.DB_PATH), { recursive: true });
            // Crée le fichier JSON avec un tableau vide
            fs.writeFileSync(this.DB_PATH, '[]');
        }
    }

    // Charge les données de la base de données dans un tableau
    loadObjects() {
        try {
            const raw = fs.readFileSync(this.DB_PATH, 'utf-8');
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.error(`Impossible de lire ${this.DB_PATH}, tableau vide`, err.message);
            return [];
        }
    }

    // Enregistre les données dans la base de données
    saveObjects(data) {
        try {
            fs.writeFileSync(this.DB_PATH, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(`Impossible d'écrire dans ${this.DB_PATH}`, err.message);
            throw err;
        }
    }

    // -------------------- Fonctions CRUD --------------------

    // Récupère tous les objects
    getAll() {
        return this.objects;
    }

    // Récupère un object par son ID
    getById(id) {
        const object = this.objects.find((a) => a.id === id);
        return object || null;
    }

    // Crée un nouvel object
    create(payload) {
        const ObjectClass = require(`../Entity/${this.entityName}`);
        const newObject = new ObjectClass();
        newObject.id = this.nextId++;
        for (const field of Object.keys(newObject)) {
          if (!(field in payload)) continue;

          // if (field in payload) {
          //   newObject[field] = payload[field];
          // }

          if (Array.isArray(newObject[field])) {
            newObject[field] = Array.isArray(payload[field])
              ? payload[field]
              : [];
          } else {
            newObject[field] = payload[field];
          }
        }

        this.objects.push(newObject);
        this.saveObjects(this.objects);
        return newObject;
    }

    // Met à jour un object par son ID
    update(id, payload) {
      const index = this.objects.findIndex((a) => a.id === id);
      if (index === -1) {
        return null;
      }
      const updatedObject = {
        ...this.objects[index],
        ...payload,
        id // L'ID reste inchangé
      };
      this.objects[index] = updatedObject;
      this.saveObjects(this.objects);

      return updatedObject;
    }

    // Supprime un object par son ID
    remove(id) {
      const index = this.objects.findIndex((a) => a.id === id);
      if (index === -1) {
        return false;
      }
      this.objects.splice(index, 1);
      this.saveObjects(this.objects);

      return true;
    }
}
// Export des fonctions du service
// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
// };

