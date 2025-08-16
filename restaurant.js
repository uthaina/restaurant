// 
document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  let dishes = [];


  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      dishes = data;
      displayDishes(dishes); 
    })
    .catch(error => {
      menuContainer.innerHTML = `
        <p style="color: red; text-align: center; font-size: 1.2rem;">
           Error loading dishes: ${error.message}
        </p>`;
    });

  
  function displayDishes(dishList) {
    menuContainer.innerHTML = "";

    if (dishList.length === 0) {
      const noResults = document.createElement("p");
      noResults.className = "no-results";
      noResults.textContent = "No dishes match your search.";
      menuContainer.appendChild(noResults);
      return;
    }

    dishList.forEach(dish => {
      const card = document.createElement("div");
      card.className = "dish-card";
      card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
        <div class="info">
          <h3>${dish.name}</h3>
          <p class="price">$${dish.price}</p>
        </div>
      `;
      menuContainer.appendChild(card);
    });
  }

 
  function searchDishes() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === "") {
      displayDishes(dishes); 
      return;
    }

    const filtered = dishes.filter(dish =>
      dish.name.toLowerCase().includes(query)
    );

    displayDishes(filtered);
  }

  
  searchBtn.addEventListener("click", searchDishes);

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchDishes();
    }
  });
});