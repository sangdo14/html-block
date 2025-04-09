//메뉴 버튼 토글
const btnToggle = document.querySelector('.btnToggle');
const mobileMenu = document.querySelector('.mobileMenu');

btnToggle.addEventListener('click', () => {
  btnToggle.classList.toggle('on');
  mobileMenu.classList.toggle('on');
});
