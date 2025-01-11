fetch("https://thaidcroleplay-parliament.pages.dev/data/party.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Initialize by displaying data for set1
    const selectedSet = "set1"; // Default set
    populatePartyData(data[selectedSet]);
    
    // Listen for changes in the dropdown and update the content accordingly
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populatePartyData(data[selectedSet]);
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });

// Function to populate party data dynamically
function populatePartyData(setData) {
  // Update the bars' widths
  document.querySelector(".dp").style.width = setData.dp;
  document.querySelector(".ffp").style.width = setData.ffp;
  document.querySelector(".ptp").style.width = setData.ptp;

  // Update the government party list
  const govParties = setData.govParties || [];
  const govDataContainer = document.querySelector(".gov .gov-data");
  govDataContainer.textContent = govParties.length;  // Display count of government parties

  const govPartyList = document.querySelector(".gov");
  govPartyList.innerHTML = ''; // Clear previous data

  govParties.forEach(party => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party");

    const circleElement = document.createElement("div");
    circleElement.classList.add("circle", party.party);

    const nameElement = document.createElement("div");
    nameElement.classList.add("name-party");
    nameElement.textContent = party.name;

    partyElement.appendChild(circleElement);
    partyElement.appendChild(nameElement);
    govPartyList.appendChild(partyElement);
  });

  // Update the opposition party list
  const oppParties = setData.oppParties || [];
  const oppDataContainer = document.querySelector(".opp .opp-data");
  oppDataContainer.textContent = oppParties.length;  // Display count of opposition parties

  const oppPartyList = document.querySelector(".opp");
  oppPartyList.innerHTML = ''; // Clear previous data

  oppParties.forEach(party => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party");

    const circleElement = document.createElement("div");
    circleElement.classList.add("circle", party.party);

    const nameElement = document.createElement("div");
    nameElement.classList.add("name-party");
    nameElement.textContent = party.name;

    partyElement.appendChild(circleElement);
    partyElement.appendChild(nameElement);
    oppPartyList.appendChild(partyElement);
  });
}
