fetch("https://thaidcroleplay-parliament.pages.dev/data/combined.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // เริ่มต้นด้วยการแสดงข้อมูลชุดที่ 1
    populateMembers(data.data.set1);  // เริ่มต้นแสดงสมาชิก
    populateParties(data.parties.set1);  // เริ่มต้นแสดงข้อมูลพรรค
    updateMemberCount('set1');  // เริ่มต้นแสดงจำนวนสมาชิก
    updateStatus('set1');  // เริ่มต้นแสดงสถานะ

    // เมื่อเลือกชุดใหม่จาก dropdown
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populateMembers(data.data[selectedSet]);
      populateParties(data.parties[selectedSet]);
      updateMemberCount(selectedSet);  // อัปเดตจำนวนสมาชิก
      updateStatus(selectedSet);  // อัปเดตสถานะ
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });

// ฟังก์ชันแสดงข้อมูลสมาชิก
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

// ฟังก์ชันแสดงข้อมูลพรรค
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

// ฟังก์ชันอัปเดตสถานะและช่วงวันที่
function updateStatus(set) {
  const statusSpan = document.querySelector(".status");
  const statusDateSpan = document.querySelector(".status-date");

  if (set === "set1") {
    statusSpan.textContent = "อยู่ในวาระ";
    statusSpan.classList.remove("red");
    statusSpan.classList.add("green"); // เปลี่ยนสีเขียว

    statusDateSpan.textContent = "1 มกราคม - 1 กุมภาพันธ์";
  } else if (set === "special_set") {
    statusSpan.textContent = "หมดวาระ";
    statusSpan.classList.remove("green");
    statusSpan.classList.add("red"); // เปลี่ยนสีแดง

    statusDateSpan.textContent = "8 ธันวาคม - 28 ธันวาคม";
  }
}
