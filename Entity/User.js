class User {
    constructor(data = {}) {
        this.id = data['id'] ?? null;
        this.nom = data['nom'] ?? null;
        this.prenom = data['prenom'] ?? null;
        /** @var boolean */
        this.favoriteRecipe = data['favoriteRecipe'] ?? false;
    }

    toObject() {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            favoriteRecipe: this.favoriteRecipe
        };
    }

    toJSON() {
        return { ...this }
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getNom() {
        return this.nom;
    }
    setNom(nom) {
        this.nom = nom;
        return this;
    }

    getPrenom() {
        return this.prenom;
    }
    setPrenom(prenom) {
        this.prenom = prenom;
        return this;
    }

    getFavoriteRecipe() {
        return this.favoriteRecipe;
    }
    setFavoriteRecipe(favoriteRecipe) {
        this.favoriteRecipe = favoriteRecipe;
        return this;
    }
}

module.exports = User;