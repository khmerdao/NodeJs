class User {
    constructor(id = null, nom, prenom, favoriteRecipe = null) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        /** @var boolean */
        this.favoriteRecipe = favoriteRecipe;
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