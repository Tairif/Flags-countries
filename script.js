const searchInput = document.getElementById("searchInput");
const rangeInput = document.getElementById("rangeInput");
const displayRange = document.getElementById("displayRange");
const alphabetique = document.getElementById("alphabetique");
const croissant = document.getElementById("croissant");
const decroissant = document.getElementById("decroissant");
const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btn-sort");

let countriesList = []; //contient un tableau de tous les pays (250 objets)
let sortMethod = "";

//Fonction pour récupérer tous les pays et les stocker dans countriesList
const fetchCountries = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countriesList = data;
      displayCountries();
    });
};

//Fonction pour afficher les pays
const displayCountries = () => {
  countriesContainer.innerHTML = "";
  countriesList
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    )
    .sort((c1, c2) => {
      if (sortMethod === "croissant") {
        return c1.population - c2.population;
      } else if (sortMethod === "decroissant") {
        return c2.population - c1.population;
      } else if (sortMethod === "alphabetique") {
        return c1.translations.fra.common.localeCompare(
          c2.translations.fra.common
        );
      }
    })
    .slice(0, rangeInput.value)
    .map((country) => {
      // console.log(country);
      //   if (country.capital === undefined) {
      //     countriesContainer.innerHTML += `
      //  <div class="country-card">
      //     <img src="${country.flags.svg}" alt="${country.flags.alt}" />
      //     <div class="country-info">
      //       <h3>${country.translations.fra.common}</h3>
      //       <p>Population: ${country.population.toLocaleString()}</p>
      //     </div>
      //   </div>`;
      //   } else {
      countriesContainer.innerHTML += `
     <div class="country-card">
        <img src="${country.flags.svg}" alt="${country.flags.alt}" />
        <div class="country-info">
          <h3>${country.translations.fra.common}</h3>
          ${
            country.capital !== undefined
              ? "<p>Capital: " + country.capital + "</p>"
              : ""
          }
          <p>Population: ${country.population.toLocaleString("en-EN")}</p>
        </div>
      </div>
    `;
      // }
    });
};

const btnActive = (id) => {
  btnSort.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};
rangeInput.addEventListener("input", () => {
  displayRange.textContent = rangeInput.value;
  displayCountries();
});

searchInput.addEventListener("input", () => {
  displayCountries();
});

//Méthode 1
// alphabetique.addEventListener("click", () => {
//   sortMethod = "alphabetique";
//   displayCountries();
// });

// croissant.addEventListener("click", () => {
//   sortMethod = "croissant";
//   displayCountries();
// });

// decroissant.addEventListener("click", () => {
//   sortMethod = "decroissant";
//   displayCountries();
// });
//Méthode 2
btnSort.forEach((btn) => {
  btn.addEventListener("click", () => {
    sortMethod = btn.id;
    btnActive(btn.id);
    displayCountries();
  });
});

fetchCountries();
