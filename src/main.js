"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
//define  Button onclick
const getRecipeBtn = document.getElementById("getRecipeBtn");
getRecipeBtn.onclick = onRandomRecipe;
// Declaration with type assertions
const container = document.querySelector(".recipe-container");
const ingredientText = document.querySelector(".ingredienttext");
// Assuming 'country' is declared somewhere
const country = document.querySelector(".country");
// API URL
const url = "https://www.themealdb.com/api/json/v1/1/random.php";
// Function for onclick button to get recipe
function onRandomRecipe() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(url);
      const data = yield response.json();
      // Loop function for ingredients
      const meal = data.meals[0];
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        } else {
          break;
        }
      }
      // HTML styling
      document.body.style.backgroundColor = "grey";
      if (container) {
        container.style.width = "350px";
        container.style.padding = "10px";
        container.style.minHeight = "500px";
      }
      // Display random recipe
      if (container) {
        container.innerHTML = ` 
        <h2 style="border: 2px blue solid">${meal.strMeal}</h2>
        <h3>CATEGORY: ${meal.strCategory}</h3>
        <h3>ORIGIN COUNTRY: ${meal.strArea}</h3>
        <h3 style="color: red">INSTRUCTION:</h3>
        <p>${meal.strInstructions}</p>
        <img style="width: 200px" src="${meal.strMealThumb}">
      `;
      }
      if (ingredientText) {
        ingredientText.innerHTML = `INGREDIENTS:<ol>${ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}</ol>`;
      }
      if (country) {
        country.textContent = `country: ${meal.strArea}`;
      }
      console.log(ingredients);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  });
}
