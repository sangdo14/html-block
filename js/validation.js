const form = document.querySelector('form');

form.addEventListener('submit', e => {
  const formData = new FormData(form);

  let check = false;

  // 사용자 이름 인증시 메인이동, 그렇지 않으면 오류 콘솔 출력
  if (formData.get('username').length < 2) {
    // e.preventDefault();
    check = true;
    console.error('이름은 최소 2글자 이상 입력하세요.');
    // e.preventDefault();
  }

  //성별이 선택되어 있지 않으면 전송기능 막고 콘솔 에러 출력
  if (!formData.get('gender')) {
    // e.preventDefault();
    check = true;
    console.error('성별을 선택하세요.');
  }

  //학력이 선택되어 있지 않으면 이하 동일
  if (!formData.get('edu')) {
    // e.preventDefault();
    check = true;
    console.error('최종 학력을 선택하세요.');
  }

  //좋아하는 색상선택이 하나도 없으면 이하동일
  if (formData.getAll('myColor').length === 0) {
    // e.preventDefault();
    check = true;
    console.error('좋아하는 색상을 최소 하나 이상 선택하세요.');
  }

  //남기는 말은 최소글자 5글자 이상 최대글자수 10글자 이하일때 이하동일
  if (
    formData.get('comments').length < 5 ||
    formData.get('comments').length >= 10
  ) {
    // e.preventDefault();
    check = true;
    console.error('나기는 말을 5글자 이상 10글자 미만으로 입력하세요.');
  }

  if (check) {
    e.preventDefault();
  }
});
