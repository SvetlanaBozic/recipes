/*import {} from './app.js'*/

const _api = axios.create({
  baseURL: `http://localhost:3000`
});

async function displayRecipies() {
  let response = await _api.get(`/recipies`);
  let recipiesData = await response.data;
  for (const recipe of recipiesData) {
    let desc = await getDescription(recipe.id);
    _render(recipe, desc);
  }
}

async function getDescription(id) {
  try {
    let response = await _api.get(`/recipies?id=${id}`);
    let descriptions = response.data;
    let dsc = descriptions[0].description;

    if (dsc.length > 60) {
      return dsc.substring(0, 60)
    }
    return dsc;
  } catch (e) {
    console.log(e)
  }
}

async function _render(rec, desc) {
  $(`.mainDiv`).append(`<div class="recipe1">
                          <div class="recipe">
                            <div class="box-img">
                              <img src="${rec.image}" alt="${rec.id}">
                            </div>
                            <div class="box-body">
                              <h2 onclick="location.href='recipe.html';" data-id=${rec.id} class='link-to-recipe'>${rec.name}</h2>
                              <p>${desc} ...</p>
                              <span id="novisib">${rec.id}</span>
                             </div>  
                          </div>                
                          <button type = 'submit' class = 'add-to-favor' id = '${rec.id}' data-id = '${rec.id}'>Omiljeni</button>   
                  
                        </div>`)
}
displayRecipies();

export { _render, _api, getDescription }