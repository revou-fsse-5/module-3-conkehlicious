// button onclick declared
getRecipeBtn.onclick = onRandomRecipe;

//  declaration
const container = document.querySelector(".recipe-container");
const ingredientText = document.querySelector(".ingredienttext");

// api url
const url = "https://www.themealdb.com/api/json/v1/1/random.php";

// function for onclick button to get recipe
async function onRandomRecipe() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    // loop function for ingredients
    const meal = data.meals[0];
    // console.log(meal);
    const ingredientss = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredientss.push(`${meal[`strIngredient${i}`]}`);
      } else {
        break;
      }
    }
    // console.log(ingredientss);

    // html styling
    document.body.style.backgroundColor = "lightgrey";
    container.style.width = "350px";
    container.style.padding = "10px";
    container.style.minHeight = "500px";

    // display random recipe
    container.innerHTML = ` 
    <h2 style =  "border : 2px blue solid">${data.meals[0].strMeal}</h2>
    <h3>CATEGORY : ${data.meals[0].strCategory}</h3>
    <h3>ORIGIN COUNTRY : ${data.meals[0].strArea}</h3>
    <h3 style = "color : red">INSTRUCTION :</h3>
    <p> ${data.meals[0].strInstructions} </p>
    <img style = "width : 200px " src = ${data.meals[0].strMealThumb}>
    `;
    ingredientText.innerHTML = `INGREDIENTS :<ol>${ingredientss
      .map((ingredientss) => `<li>${ingredientss}</li>`)
      .join("")}</ol>`;
    country.textContent = `country :${data.meals[0].strArea}`;
    console.log(ingredientss);
  } catch (error) {}
}
