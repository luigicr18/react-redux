import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const foodPreferences = [
  {
    id: "gluten-free",
    title: "Gluten Free",
    description: "La dieta sin gluten (DSG) consiste en eliminar de forma estricta de la alimentación todos los productos que contengan o se cocinen con trigo, centeno, cebada y avena, o cualquiera de sus variedades e híbridos (espelta, escanda, kamut, triticale...), y productos derivados, evitando contaminaciones inadvertidas y todo tipo de transgresiones dietéticas.8 9 10 Es una dieta segura, que no provoca ningún efecto secundario negativo, y normalmente es equilibrada.",
    enable: true
  },
  {
    id: "vegan",
    title: "Vegan",
    description: "El veganismo (del inglés veganism)a es la práctica que rechaza la utilización y consumo de todos los productos y servicios de origen animal. A quien practica el veganismo se le llama vegano o vegana.",
    enable: true
  },
  {
    id: "intolerancia-lactosa",
    title: "Intolerancia a la lactosa",
    description: "La intolerancia a la lactosa es un trastorno que aparece después de la ingestión de la lactosa (el azúcar de la leche) si existe una deficiencia de lactasa (la enzima que digiere la lactosa).",
    enable: true
  },
  {
    id: "sustituto-azucar",
    title: "Sustitutos de Azucar",
    description: "Se le llama edulcorante a cualquier sustancia, natural o artificial, que edulcora,1 es decir, que sirve para dotar de sabor dulce a un alimento o producto que de otra forma tiene sabor amargo o desagradable.",
    enable: true
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class FoodPreferenceApi {
  static getAllFoodPreferences() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], foodPreferences));
      },delay);
    });
  }

  static saveFoodPreference(foodPreference){
    foodPreference = Object.assign({}, foodPreference);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foodPreference.id) {
          const existingFoodPreference = foodPreferences.findIndex(f => f.id == foodPreference.id);
          foodPreferences.splice(existingFoodPreference, 1, foodPreference);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new authors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          foodPreference.id = generateId(foodPreference);
          foodPreferences.push(foodPreference);
        }
        resolve(foodPreference);

      },delay);
    });
  }
}

export default FoodPreferenceApi;
