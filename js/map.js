// 필요한 전역변수 술정
const mapContainer = document.querySelector('#map');
const mapOption = {
  center: new kakao.maps.LatLng(37.51234769667704, 126.90841343311608)
};

// 문서 로딩 이벤트 바인딩
renderMap();

// 리사이즈 이벤트 바인딩
window.addEventListener('resize', renderMap);

function renderMap() {
  mapContainer.innerHTML = '';
  const map = new kakao.maps.Map(mapContainer, mapOption);
  // 마커의 위치 값을 우선 세팅
  const marker = new kakao.maps.Marker({ position: mapOption.center });
  marker.setMap(map);
}

// 구글맵에서 찍은 위도, 경도는 실제 카카오 지도와의 오차 범위가 큼 (오차범위를 줄여야 함)
// 구글맵에서 위도, 경도 확인 > Kakap Maps API Sample > 클릭한 위치에 마커 표시하기
