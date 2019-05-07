import { _api } from './main.js'
import { searchValues } from './search.js';

let recipeFavor = (function () {

    function init() {
        mainDiv.on('click', addFavorite);
        mainDiv2.on('click', saveToLocalStorage);
        mainRecDesc.on('click', addFavorite);
        favoriteCart.on('click', removeRecipe);
        clearRecipeBtn.on('click', clearCart);
        btnsearch.on('click', filterAll);
        $(document).on('DOMContentLoaded', displaFav);
    }

    const mainDiv = $('.mainDiv'),
        favoriteCart = $('#content-cart tbody'),
        clearRecipeBtn = $('#clear-cart'),
        mainDiv2 = $('#mainDiv2'),
        mainRecDesc = $('#recipeDesc'),
        btnsearch = $('.btnsearch');

    let numFavor = 0;
    function addFavorite(e) {
        e.preventDefault();
        let ids = JSON.parse(localStorage.getItem('favoriteId')) || [];
        if (e.target.classList.contains('add-to-favor')) {
            let id = e.target.dataset.id;
            if (!ids.includes(id)) {
                const recipe = e.target.parentElement;
                recipeInfo(recipe);
                ids.push(id);
                localStorage.setItem('favoriteId', JSON.stringify(ids));
            }
        }
    }

    function recipeInfo(recipe) {

        const recipeInfo = {
            image: recipe.querySelector('img').src,
            title: recipe.querySelector('h2').textContent,
            id: recipe.querySelector('span').textContent,
            numFavor_id: numFavor
        }
        addIntoFavor(recipeInfo);
    }

    function addIntoFavor(recipe) {
        addIntoFavorRecipe(recipe);
        saveIntoStorage(recipe);
        numberFav();
    }

    function addIntoFavorRecipe(recipe) {
        const { image, title, id } = recipe;
        const row = $(`<tr data-id="${id}" id="${id}"></tr>`);
        $(` <td>
                <img src="${image}" width=90px>
            </td>
            <td>${title}</td>
            <td>
                <a href="#" class="remove" id="${numFavor++}">X</a>
            </td>
        `).appendTo(row);

        row.appendTo(favoriteCart);
    }

    function numberFav() {
        let number = getRecipeFromStorage().length;
        $('#numberArticle').text(number);
        if (number > 0) {
            $('#numberArticle').show();
        } else {
            $('#numberArticle').hide();
        }
    }

    function saveIntoStorage(recipe) {
        let recipies = getRecipeFromStorage();
        recipies.push(recipe);
        localStorage.setItem('recipies', JSON.stringify(recipies));
    }

    function getRecipeFromStorage() {
        let recipies = JSON.parse(localStorage.getItem('recipies')) || [];
        return recipies;
    }

    function removeRecipe(e) {
        let recipe, recipeId;
        let ids = JSON.parse(localStorage.getItem('favoriteId')) || [];

        if (e.target.classList.contains('remove')) {
            recipe = e.target.parentElement.parentElement;
            let rowId = recipe.getAttribute('id');
            let index = ids.indexOf(rowId);
            if (index > -1) {
                ids.splice(index, 1);
                removeRecipeFromLocalStorage(rowId);
            }
            localStorage.setItem('favoriteId', JSON.stringify(ids));

            numberFav();
            recipe.remove();
            recipeId = recipe.querySelector('a').getAttribute('id');
        }
    }

    function removeRecipeFromLocalStorage(id) {
        let recipiesLS = getRecipeFromStorage();
        recipiesLS.forEach(function (recipeLS, index) {
            if (recipeLS.id == id) {
                recipiesLS.splice(index, 1);
            }
        })
        localStorage.setItem('recipies', JSON.stringify(recipiesLS));
    }

    function clearCart() {
        clearLocalStorage();
        favoriteCart.html('');
        numberFav();
    }

    function clearLocalStorage() {
        localStorage.clear();
        numFavor = 1;
    }

    function saveToLocalStorage(e) {
        e.preventDefault;
        if (e.target.classList.contains('link-to-recipe')) {
            const id = e.target.dataset.id;
            localStorage.setItem(`id recepta`, JSON.stringify(id));
        }
    }

    function displaFav() {
        let ids = JSON.parse(localStorage.getItem('favoriteId')) || [];
        let recipiesLS = getRecipeFromStorage();
        numberFav();
        for (const recipe of recipiesLS) {
             addIntoFavorRecipe(recipe);
        }
    }

    function searchDishes() {
        let dishesVal = $('#filterDishes').val();
        let dishes = '';
        if (dishesVal != '') {
            dishes = `category=${dishesVal}`;
        }
        return dishes;
    }

    function filterAll() {
        let nameVal = $('#filterIngred').val();
        let nameV = '';
        if (nameVal != '') {
            nameV = `name_like=${nameVal}`;
        }
        let values = [];
        if (searchDishes() === 'category=noFilter') {
            values = [nameV].filter(w => w);
        } else {
            values = [searchDishes(), nameV].filter(w => w);
        }
        searchValues(values);
    }

    init();
})();
export default recipeFavor;