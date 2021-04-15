const byRateRecipes = state => 
    state.recipes.length <= 10 
    ? [...state.recipes].sort((r1, r2) => r1 > r2 ? 1 : -1) 
    : [...state.recipes].sort((r1, r2) => r1 > r2 ? 1 : -1).slice(0, 10);

const byNameRecipes = state => [...state.recipes].sort((r1, r2) => r1.name < r2.name ? -1 : 1);

const byNumberOfCommentsRecipes = state => [...state.recipes].sort((r1, r2) => r1.comments.length > r2.comments.length ? -1 : 1);

const last10Recipes = state => state.recipes.length <= 10 ? [...state.recipes].reverse() : [...state.recipes].reverse().slice(0, 10);

const top10Recipes = state => {
    const sorted = [...state.recipes].sort((r1, r2) => r1.rate > r2.rate ? -1 : 1);
    return sorted.length <= 10 ? sorted : sorted.slice(10);
};

const userRecipes = state => state.recipes.filter(r => r.author === state.auth.user.id);

export {
    last10Recipes,
    top10Recipes,
    userRecipes,
    byRateRecipes,
    byNameRecipes,
    byNumberOfCommentsRecipes
};