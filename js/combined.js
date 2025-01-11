fetch("https://thaidcroleplay-parliament.pages.dev/data/combined.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(fetchedData => {
    data = fetchedData;  // เก็บข้อมูลจาก API ที่โหลดมา

    // เริ่มต้นด้วยการแสดงข้อมูลชุดที่ 1
    populateMembers(data.data.set1);
    populateParties(data.parties.set1);
    updateMemberCount(data.cmembers_data.set1);  // อัปเดตจำนวนสมาชิกฝ่ายรัฐบาลและฝ่ายค้าน

    // เมื่อเลือกชุดใหม่จาก dropdown
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populateMembers(data.data[selectedSet]);
      populateParties(data.parties[selectedSet]);
      updateMemberCount(data.cmembers_data[selectedSet]);  // อัปเดตจำนวนสมาชิกฝ่ายรัฐบาลและฝ่ายค้าน
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
  // govContainer.innerHTML = '<h4>ฝ่ายรัฐบาล</h4>';
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
  // oppContainer.innerHTML = '<h4>ฝ่ายค้าน</h4>';
  parties.oppParties.forEach(party => {
    const partyElement = document.createElement("div");
    partyElement.classList.add("party");
    partyElement.innerHTML = `
      <div class="circle ${party.party}"></div>
      <div class="name-party">${party.name}</div>
    `;
    oppContainer.appendChild(partyElement);
  });
  
    // ฟังก์ชันอัปเดตจำนวนสมาชิกในฝ่ายรัฐบาลและฝ่ายค้าน
  function updateMemberCount(countData) {
    // คำนวณจำนวนสมาชิกในฝ่ายรัฐบาลและฝ่ายค้านจาก cmembers-data
    const govCount = parseInt(countData["gov-data"]);  // แปลงเป็นตัวเลข
    const oppCount = parseInt(countData["oppParties"]);  // แปลงเป็นตัวเลข
  
    // อัปเดตข้อมูลใน <span class="gov-data"> และ <span class="opp-data">
    document.querySelector(".gov-data").textContent = `${govCount} คน`;
    document.querySelector(".opp-data").textContent = `${oppCount} คน`;
  }

}


//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.json(); // แปลงข้อมูลจาก JSON
//   })
//   .then(data => {
//     console.log(data); // แสดงข้อมูลทั้งหมด

//     // ใช้ข้อมูลจาก `data` เพื่อแสดงสมาชิก
//     populateMembers(data.data.set1);

//     // ใช้ข้อมูลจาก `parties` เพื่อแสดงข้อมูลพรรค
//     populateParties(data.parties.set1);

//     // หากเลือกชุดใหม่ เช่น `special_set`
//     document.getElementById("data_set").addEventListener("change", function () {
//       const selectedSet = this.value;
//       populateMembers(data.data[selectedSet]);
//       populateParties(data.parties[selectedSet]);
//     });
//   })
//   .catch(error => {
//     console.error("Error fetching the data:", error);
//   });

// // Function to populate members (from data.json)
// function populateMembers(members) {
//   const container = document.getElementById("members-list");
//   container.innerHTML = ''; // Clear previous data

//   members.forEach(member => {
//     const memberElement = document.createElement("div");
//     memberElement.classList.add("member");
//     memberElement.innerHTML = `
//       <div class="${member.circle_party} circle-party"></div> 
//       <p class="name">${member.name}</p>
//     `;
//     container.appendChild(memberElement);
//   });
// }

// // Function to populate parties (from party.json)
// function populateParties(parties) {
//   const bars = document.querySelector(".bars");
//   bars.innerHTML = `
//     <div class="dp" style="width: ${parties.dp}"></div>
//     <div class="ffp" style="width: ${parties.ffp}"></div>
//     <div class="ptp" style="width: ${parties.ptp}"></div>
//   `;

//   const govContainer = document.querySelector(".gov");
//   govContainer.innerHTML = '<h4>ฝ่ายรัฐบาล</h4>';
//   parties.govParties.forEach(party => {
//     const partyElement = document.createElement("div");
//     partyElement.classList.add("party");
//     partyElement.innerHTML = `
//       <div class="circle ${party.party}"></div>
//       <div class="name-party">${party.name}</div>
//     `;
//     govContainer.appendChild(partyElement);
//   });

//   const oppContainer = document.querySelector(".opp");
//   oppContainer.innerHTML = '<h4>ฝ่ายค้าน</h4>';
//   parties.oppParties.forEach(party => {
//     const partyElement = document.createElement("div");
//     partyElement.classList.add("party");
//     partyElement.innerHTML = `
//       <div class="circle ${party.party}"></div>
//       <div class="name-party">${party.name}</div>
//     `;
//     oppContainer.appendChild(partyElement);
//   });
// }
