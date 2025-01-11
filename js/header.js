document.querySelectorAll('.flex > ul > li > a').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault(); 
    const parentLi = this.parentElement;

    // สลับคลาส 'open' เพื่อเปิด/ปิด ul
    const isOpen = parentLi.classList.toggle('open');

    // ปิด ul ของ li อื่น
    document.querySelectorAll('.flex ul > li').forEach(li => {
      if (li !== parentLi) {
        li.classList.remove('open');
      }
    });

    // ถ้าเปิด ul ให้หยุดการ propagation เพื่อไม่ให้ document ปิด ul ทันที
    if (isOpen) {
      event.stopPropagation();
    }
  });
});

// ซ่อน ul เมื่อคลิกที่อื่นในหน้า
document.addEventListener('click', () => {
  document.querySelectorAll('.flex ul > li').forEach(li => {
    li.classList.remove('open');
  });
});

// ดึงข้อมูลจาก data

// ฟังก์ชันสำหรับสร้าง HTML
function populateMembers(data, set) {
  const membersBox = document.querySelector(".members-box");
  membersBox.innerHTML = ""; // ล้างข้อมูลเดิมในกล่อง

  // กรองข้อมูลตามชุดที่เลือก
  const filteredData = data.filter(member => member.set === set);

  filteredData.forEach(member => {
    // สร้างโครงสร้าง HTML สำหรับสมาชิกแต่ละคน
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    const circleDiv = document.createElement("div");
    circleDiv.className = `circle-party ${member.circle_party}`;

    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = member.name;

    // ใส่องค์ประกอบเข้าด้วยกัน
    memberDiv.appendChild(circleDiv);
    memberDiv.appendChild(nameDiv);
    membersBox.appendChild(memberDiv);
  });
}

// โหลดข้อมูลจากไฟล์ data.json
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // แสดงชุดที่ 1 เป็นค่าเริ่มต้น
    populateMembers(data, "set1");

    // อัปเดตข้อมูลเมื่อเปลี่ยน dropdown
    document.getElementById("data_set").addEventListener("change", function () {
      const selectedSet = this.value;
      populateMembers(data, selectedSet);
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });


// ฟังก์ชันสำหรับสร้าง HTML
function populateMembers(data, set) {
  const membersBox = document.querySelector(".members-box");
  membersBox.innerHTML = ""; // ล้างข้อมูลเดิมในกล่อง

  // กรองข้อมูลตามชุดที่เลือก
  const filteredData = data.filter(member => member.set === set);

  filteredData.forEach(member => {
    // สร้างโครงสร้าง HTML สำหรับสมาชิกแต่ละคน
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    const circleDiv = document.createElement("div");
    circleDiv.className = `circle-party ${member.circle_party}`;

    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = member.name;

    // ใส่องค์ประกอบเข้าด้วยกัน
    memberDiv.appendChild(circleDiv);
    memberDiv.appendChild(nameDiv);
    membersBox.appendChild(memberDiv);
  });
}

// เริ่มต้นแสดงชุดที่ 1
populateMembers(data, "set1");

// อัปเดตข้อมูลเมื่อเปลี่ยน dropdown
document.getElementById("data_set").addEventListener("change", function () {
  const selectedSet = this.value;
  populateMembers(data, selectedSet);
});
