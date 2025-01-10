document.querySelectorAll('.flex > ul > li > a').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault(); 
    const parentLi = this.parentElement;

    // ปิด ul ของ li อื่น (ถ้าต้องการให้เปิดได้ทีละอัน)
    document.querySelectorAll('.flex ul > li').forEach(li => {
      if (li !== parentLi) {
        li.classList.remove('open');
      }
    });

    // สลับคลาส 'open' เพื่อเปิด/ปิด ul
    parentLi.classList.toggle('open');
  });
});
