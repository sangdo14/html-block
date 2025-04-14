const htmlEL = document.documentElement;
const btnColors = document.querySelectorAll('.btnColors li');

btnColors.forEach((data, index) => {
  data.addEventListener('click', e => {
    // e.target: 실질적인 이벤트가 발생한 대상을 지칭
    // 사용자가 클릭한 li요소의 backgroundColor를 가져와서
    // html 등록된 --point-lch 변수값으로 변경처리
    const targetColor = e.target.style.backgroundColor;
    htmlEL.style.setProperty('--point-lch', targetColor);
  });
});
