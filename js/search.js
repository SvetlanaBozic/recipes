import { _render, _api, getDescription } from "./main.js"

async function searchValues(values) {

    const rec = values.length > 0 ? `?${values.join(`&`)}` : ``;
    let response = await _api.get(`/recipies${rec}`);
    let recipiesData = await response.data;
    $(`.mainDiv`).empty();
    if (recipiesData.length === 0) {
        $(`.mainDiv`).append('<h2 class="searchno">Nema rezultata koji ispunjavaju Vase zahteve!</h2>');
    } else {
        for (const recipe of recipiesData) {
            let desc = await getDescription(recipe.id);
            _render(recipe, desc);
        }
    }
}

export { searchValues }