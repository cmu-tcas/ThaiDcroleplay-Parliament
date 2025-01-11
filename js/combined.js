fetch("https://thaidcroleplay-parliament.pages.dev/data/combined.json")
    .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // ใช้ข้อมูลจาก `data.data` เพื่อแสดงสมาชิก
    populateMembers(data.data.set1); // เริ่มต้นด้วยการแสดงข้อมูลชุดที่ 1

    // ใช้ข้อมูลจาก `data.parties` เพื่อแสดงข้อมูลพรรค
    populateParties(data.parties.set1); // เริ่มต้นด้วยการแสดงข้อมูลชุดที่ 1

    // เมื่อเลือกชุดใหม่จาก dropdown
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populateMembers(data.data[selectedSet]);
      populateParties(data.parties[selectedSet]);
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });

// Function to populate members (จาก data.json)
function populateMembers(members) {
  const container = document.getElementById("members-list");
  container.innerHTML = ''; // Clear previous data

  members.forEach(member => {
    const memberElement = document.createElement("div");
    memberElement.classList.add("member");
    memberElement.innerHTML = `
      <div class="${member.circle_party} circle-party"></div>
      <p class="name">${member.name}</p>
    `;
    container.appendChild(memberElement);
  });
}

// Function to populate parties (จาก party.json)
function populateParties(parties) {
  const bars = document.querySelector(".bars");
  bars.innerHTML = `
    <div class="dp" style="width: ${parties.dp}"></div>
    <div class="ffp" style="width: ${parties.ffp}"></div>
    <div class="ptp" style="width: ${parties.ptp}"></div>
    <div class="pdp" style="width: ${parties.pdp || 0}"></div>
    <div class="no" style="width: ${parties.no || 0}"></div>
  `;

  const govContainer = document.querySelector(".gov .party-list-container");
  govContainer.innerHTML = '<h4>ฝ่ายรัฐบาล <span class="gov-data"></span></h4>';
  parties.govParties.forEach(party => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party");
    partyElement.innerHTML = `
      <div class="circle ${party.party}"></div>
      <div class="name-party">${party.name}</div>
    `;
    govContainer.appendChild(partyElement);
  });

  const oppContainer = document.querySelector(".opp .party-list-container");
  oppContainer.innerHTML = '<h4>ฝ่ายค้าน <span class="opp-data"></span></h4>';
  parties.oppParties.forEach(party => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party");
    partyElement.innerHTML = `
      <div class="circle ${party.party}"></div>
      <div class="name-party">${party.name}</div>
    `;
    oppContainer.appendChild(partyElement);
  });
}

function setMemberCount(set) {
  let govData = '';
  let oppData = '';

  // ดึงข้อมูลจำนวนสมาชิกจากชุดที่เลือก
  if (set === 'set1') {
    govData = '9 คน';
    oppData = '3 คน';
  } else if (set === 'special_set') {
    govData = '16 คน';
    oppData = '0 คน';
  }

  // กำหนดข้อมูลจำนวนสมาชิกใน HTML
  document.querySelector(".gov-data").innerHTML = `(${govData})`;  // กำหนดจำนวนสมาชิกฝ่ายรัฐบาล
  document.querySelector(".opp-data").innerHTML = `(${oppData})`;  // กำหนดจำนวนสมาชิกฝ่ายค้าน
}
