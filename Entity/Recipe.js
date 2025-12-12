class Recipe {
    constructor(data = {}) {
        this.id = data['id'] ?? null;
        this.name = data['name'] ?? '';
        this.difficulty = data['difficulty'] ?? null;
        /** @var [] */
        this.ingredients = data['ingredients'] ?? [];
        /** @var boolean */
        this.isVegetarien = data['isVegetarien'] ?? false;
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