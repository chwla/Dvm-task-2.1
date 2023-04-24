
let statesData;
fetch("Data/states.json")
  .then((response) => response.json())
  .then((json) => (statesData = json));

function findCountry(stateStr) {

  stateStr = stateStr.toUpperCase();

  for (let i = 0; i < statesData.length; i++) {
    let statesLst = statesData[i]["states"];

    for (let j = 0; j < statesLst.length; j++) {
      let state = statesLst[j]["name"].toUpperCase();
      if (state == stateStr) {
        return statesData[i]["name"].toUpperCase();
      }
    }
  }

  for (let i = 0; i < statesData.length; i++) {
    let statesLst = statesData[i]["states"];

    for (let j = 0; j < statesLst.length; j++) {
      let state = statesLst[j]["name"].toUpperCase();
      if (state.indexOf(stateStr) >= 0) {
        return statesData[i]["name"].toUpperCase();
      }
    }
  }
}

function addCards(cardJSON, index) {
  div = document.querySelector("#StartOfListing");
  let template = `
  <div class="card" onclick="applyBtnClicked(${index})">
        <div class="position">${cardJSON["position"]}</div>


        <div class="applyBtn">
          <a href="" class="applyBtnText">Apply</a>
        </div>

        <div class="jobInfo">
          <div class="info">

            ${cardJSON["company"]}
          </div>

          <div class="info">

            ${cardJSON["location"]}
          </div>

          <div class="info">

            ${cardJSON["nature"]}
          </div>
        </div>

        <div class="jobDescription">
          <div style = "font-size : 30px">Job Description</div>
          ${cardJSON["description"]}

      
  `;
  let reqTemplate = ` <div style = "font-size : 30px">Job Requirements</div>
  <ul class = "jobReq">`
  for (let i = 0; i<cardJSON["requirements"].length; i++){
    reqTemplate += `<li> ${cardJSON["requirements"][i]} </li>`
  };
  reqTemplate += '</ul>'

  template+= reqTemplate + '</div> </div>'

  console.log(reqTemplate)

  div.insertAdjacentHTML("beforeend", template);
}

fetch("Data/database.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (array) {
    for (let i = 0; i < array.length; i++) {
      addCards(array[i], i);
    }
  })
  .catch(function (error) {
    console.error("Something went wrong");
  });

function searchFunction() {
  let filter = document.getElementById("searchText").value.toUpperCase();

  let allCards = document.getElementsByClassName("card");

  let fCountry = findCountry(filter);
  console.log(fCountry);

  for (let i = 0; i < allCards.length; i++) {

    let card = allCards[i];

    let position = card
      .getElementsByTagName("div")[0]
      .textContent.toUpperCase()
      .trim();
    let company = card
      .getElementsByTagName("div")[3]
      .textContent.toUpperCase()
      .trim();
    let location = card
      .getElementsByTagName("div")[4]
      .textContent.toUpperCase()
      .trim();
    let time = card
      .getElementsByTagName("div")[5]
      .textContent.toUpperCase()
      .trim();


    let toBeDisplayed;

    //Position
    if (position.indexOf(filter) >= 0) {
 
      toBeDisplayed = true;
    }
    // Company
    else if (company.indexOf(filter) >= 0) {
 
      toBeDisplayed = true;
    }
    //Location
    else if (location.indexOf(filter) >= 0 || location.indexOf(fCountry) >= 0) {

      toBeDisplayed = true;
    }
 
    else if (time.indexOf(filter) >= 0) {
 
      toBeDisplayed = true;
    } else {
      toBeDisplayed = false;
    }

    if (toBeDisplayed && screen.width > 680) {
      card.style.display = "grid";
    } else if (toBeDisplayed && screen.width < 680) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  }
}

function applyBtnClicked(index) {
  let allDesc = document.getElementsByClassName("jobDescription");
  if (allDesc[index].style.display == "flex") {
    allDesc[index].style.display = "none";
  } else {
    allDesc[index].style.display = "flex";
  }
  for (let i = 0; i < allDesc.length; i++) {
    if (i != index) {
      allDesc[i].style.display = "none";
    }
  }
  document.getElementById("StartOfListing").style.display = "flex";
  document.getElementById("StartOfListing").style.flexDirection = "column";
  document.getElementsByClassName("card").style.marginTop = "25px";
}
