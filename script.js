
 // Select all elements with the class 'card-items'
const cardItems = document.querySelectorAll('.card-items');


//function to fetch 

const fetchRecipes = async (query) => {
    const info = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
    const response = await info.json();
    if(response.meals){
       //console.log(response.meals);
       response.meals.forEach(displayRecipes);
    }
    else{ 
        console.log('No meals found for the selected letter.');
    }   
}
function displayRecipes(meal){
    const name = meal.strMeal;
    const thumb = meal.strMealThumb;
    const tag = meal.strTags ? meal.strTags : 'No tags available'; // Handle null case; //tag can be null as well handle the case when it is null
    const instructions = meal.strInstructions;
    const videoLink = meal.strYoutube;

    const div = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const snack = document.createElement("h3");
    const instruction = document.createElement("p");
    const url = document.createElement("a");

    image.src = thumb;
    image.alt = name;
    title.textContent = name;
    snack.textContent = `Tags: ${tag}`;

    // Display only the first 2-3 lines of the instructions (e.g., 200 characters)
    const shortInstruction = instructions.length > 200 ? instructions.substring(0, 200) + '...' : instructions;
    instruction.textContent = shortInstruction;
    
    url.href = videoLink;
    url.target = "_blank";
    
    //append to div
    div.appendChild(image);
    div.appendChild(title);
    div.appendChild(snack);
    div.appendChild(instruction);
    div.appendChild(url);
    
    div.classList.add("div-cards");
    // Apply inline styles directly to the image
    image.classList.add("image");
    title.classList.add("title");
    instruction.classList.add("instruction");
    snack.classList.add("tag");


    ///append to ui
    const card_container = document.getElementById("card-container");
    card_container.appendChild(div);


}

// Loop through each element and add a click event listener

cardItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const letter = item.textContent;
        //get the dish from this
        fetchRecipes(letter);
    });
});
 