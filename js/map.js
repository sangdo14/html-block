// 필요한 전역변수 술정
const mapContainer = document.querySelector('#map');
const mapOption = {
  center: new kakao.maps.LatLng(37.51225761171397, 126.90843333710652)
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

const viewContainer = document.querySelector('#view'); // 로드뷰 담길 프레임
const view = new kakao.maps.Roadview(viewContainer); // 로드뷰 인스턴스 (비어있음)
const viewMapper = new kakao.maps.RoadviewClient(); // 위치에 따른 로드뷰 사진을 로드뷰 인스턴스 연결자

// 해당 지도 인스턴스 위치 값에 제일 가까운 파노라마 id값을 찾아서, 비어있는 인스턴스에 실시간 연결
// 전달되는 인자값중 60은 현재 위도, 경도를 기점으로 제일 가까운 파노라마 id를 찾는 탐색 범위
viewMapper.getNearestPanoId(mapOption.center, 60, panoId => {
  view.setPanoId(panoId, mapOption.center);
});

//탭메뉴 기능
const [btnMap, btnView] = document.querySelectorAll('.btns li');

btnMap.addEventListener('click', e => {
  // console.log('btnMap');
  mapContainer.classList.add('on');
  viewContainer.classList.remove('on');
});

btnView.addEventListener('click', e => {
  // console.log('btnView');
  mapContainer.classList.remove('on');
  viewContainer.classList.add('on');
});
