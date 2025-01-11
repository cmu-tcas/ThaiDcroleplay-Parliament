fetch("https://thaidcroleplay-parliament.pages.dev/data/data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text(); // เปลี่ยนเป็น text() เพื่อตรวจสอบเนื้อหา
  })
  .then(text => {
    console.log("Fetched data:", text);
    return JSON.parse(text); // แปลงเป็น JSON หากข้อความถูกต้อง
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
