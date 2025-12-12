class Recipe {
    constructor(id = null, name, difficulty, ingredients = [], isVegetarien = false) {
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        /** @var [] */
        this.ingredients = ingredients;
        /** @var boolean */
        this.isVegetarien = isVegetarien;
    }

    toObject() {
        return {
            id : this.id,
            name : this.name,
            difficulty : this.difficulty,
            ingredients : this.ingredients,
            isVegetarien : this.isVegetarien,
        };
    }

    toJSON() {
        return { ...this }
    }
}

module.exports = Recipe;