const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const clearSearchButton = document.getElementById("clear-search");

let users = [];


userCardContainer.querySelectorAll(".card").forEach(card => {
  card.classList.add("hide");
});

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  users.forEach(user => {
    const isVisible =
      user.position.toLowerCase().includes(value) 
      user.company.toLowerCase().includes(value) ||
      
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      header.textContent = user.position;
      const body = card.querySelector("[data-body]");
      body.querySelector("[data-position]").textContent = user.position;
      body.querySelector("[data-company]").textContent = user.company;
      body.querySelector("[data-location]").textContent = user.location;
      body.querySelector("[data-nature]").textContent = user.nature;
      body.querySelector("[data-description]").textContent = user.description;
      body.querySelector("[data-requirements]").textContent = user.requirements;
      userCardContainer.append(card);
      return { position: user.position.toLowerCase(), company: user.company.toLowerCase(), element: card };
    });
  });




clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
});
