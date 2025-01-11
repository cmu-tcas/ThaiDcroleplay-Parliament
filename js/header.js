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

