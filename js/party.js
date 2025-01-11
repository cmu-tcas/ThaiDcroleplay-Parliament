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
  // Update the government party list
  const govParties = setData.govParties || [];
  const govDataContainer = document.querySelector(".gov .gov-data");
  govDataContainer.textContent = govParties.length;  // Display count of government parties

  const govPartyListContainer = document.querySelector(".gov .party-list-container");
  govPartyListContainer.innerHTML = ''; // Clear previous data

  govParties.forEach(party => {
    const partyElement = `
      <div class="party">
        <div class="circle ${party.party}"></div>
        <div class="name-party">${party.name}</div>
      </div>
    `;
    govPartyListContainer.innerHTML += partyElement;  // Add new party element to the list
  });

  // Update the opposition party list
  const oppParties = setData.oppParties || [];
  const oppDataContainer = document.querySelector(".opp .opp-data");
  oppDataContainer.textContent = oppParties.length;  // Display count of opposition parties

  const oppPartyListContainer = document.querySelector(".opp .party-list-container");
  oppPartyListContainer.innerHTML = ''; // Clear previous data

  oppParties.forEach(party => {
    const partyElement = `
      <div class="party">
        <div class="circle ${party.party}"></div>
        <div class="name-party">${party.name}</div>
      </div>
    `;
    oppPartyListContainer.innerHTML += partyElement;  // Add new party element to the list
  });
}
