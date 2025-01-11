fetch("https://thaidcroleplay-parliament.pages.dev/data/data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text(); // Change to text() for debugging
  })
  .then(text => {
    console.log("Fetched data:", text);
    return JSON.parse(text); // Parse to JSON if content is valid
  })
  .then(data => {
    // Initialize by displaying set1
    populateMembers(data, "set1");
    updateStatus("set1"); // Set initial status for set1

    // Update data and status when the dropdown changes
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populateMembers(data, selectedSet);
      updateStatus(selectedSet);
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });

// Function to populate members
function populateMembers(data, set) {
  // Filter data for the selected set
  const filteredData = data.filter(item => item.set === set);

  // Get the container element where you want to show the members
  const container = document.getElementById("members-list");
  container.innerHTML = ''; // Clear previous data

  // Create elements for each member and append to the container
  filteredData.forEach(member => {
    const memberElement = document.createElement("div");
    memberElement.classList.add("member");
    memberElement.innerHTML = `
      <div class="${member.circle_party} circle-party">
      </div> <p class="name">${member.name}</p>
    `;
    container.appendChild(memberElement);
  });
}

// Function to update status message and class
function updateStatus(set) {
  const statusSpan = document.querySelector(".status");
  
  if (set === "set1") {
    statusSpan.textContent = "อยูในวาระ"; // Message for set1
    statusSpan.classList.remove("red");
    statusSpan.classList.add("green"); // Add green class
  } else if (set === "special_set") {
    statusSpan.textContent = "หมดวาระ"; // Message for special_set
    statusSpan.classList.remove("green");
    statusSpan.classList.add("red"); // Add red class
  }
}
