import { _api } from './main.js'

  (async function getId() {
    const id = JSON.parse(localStorage.getItem(`id recepta`));
    if(id){
    displayRecipies(id);
    }
})();

  async function displayRecipies(id) {
    let response = await _api.get(`/recipies?id=${id}`);
    let recipeData = await response.data;
    let ingredients = getIngredients(recipeData[0]);
 _renderRecipe(recipeData[0],ingredients);
  }

 function getIngredients(rec){
     let ing=rec.ingredient;
     let ingred ='<table id="ingDetail"><tbody>';
     let i=0;
     for(let ingr in ing){
        ingred+= `<tr>
                    <td class='tablefav quan${i}'>${ing[ingr].quantity}</td>
                    <td class='tablefav1'>${ing[ingr].unit}</td>
                    <td class='tablefav1'>${ing[ingr].item}</td>
                 </tr>`
                 i++;
 }
    ingred+='</tbody></table>';
    return ingred;
 }
  
  async function _renderRecipe(rec,ingredients) {
    $(`#recipeDesc`).append(`<div class="rec">
                              <div class="big-img">
                                <img src="${rec.image}" alt="${rec.name}">
                                <h2 data-id=${rec.id}>${rec.name}</h2>
                              </div>
                              <div class="box-desc">
                                <h3>Sastojci:</h3>
                                <div>${ingredients}</div>
                                <h3>Priprema:</h3>
                                <div class="instr">${rec.instructions}</div>
                                <span id="novisib">${rec.id}</span>
                              </div>
                              <button type = 'submit' class = 'add-to-favor' id = '${rec.id}' data-id = '${rec.id}'>Omiljeni</button>                         
                            </div>
                            <img src="../images/return-icon.png" onclick="location.href='../public/recipies.html';" id="returnicon" alt="return">
                            `)
  }


  export {_renderRecipe}