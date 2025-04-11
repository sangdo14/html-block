// 필요한 전역변수 수정
const mapContainer = document.querySelector('#map');
const mapOption = {
  center: new kakao.maps.LatLng(37.51225761171397, 126.90843333710652)
};

// 문서 로딩 이벤트 바인딩
renderMap();
// 리사이즈 이벤트 바인딩
window.addEventListener('resize', renderMap);

// 맵 인스턴스를 renderMap함수 외부에서도 할용해야 되기 때문에 전역변수
function renderMap() {
  mapContainer.innerHTML = '';
  const map = new kakao.maps.Map(mapContainer, mapOption);
  const marker = new kakao.maps.Marker({ position: mapOption.center });
  marker.setMap(map);
  //지도에 위성사진 컨트롤러 추가
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  //줌 컨트롤러 연결
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  map.setZoomable(false);
}

const viewContainer = document.querySelector('#view');
const view = new kakao.maps.Roadview(viewContainer);
const viewMapper = new kakao.maps.RoadviewClient();

viewMapper.getNearestPanoId(mapOption.center, 60, panoId => {
  view.setPanoId(panoId, mapOption.center);
});

const [btnMap, btnView] = document.querySelectorAll('.btns li');

btnMap.addEventListener('click', e => {
  mapContainer.classList.add('on');
  viewContainer.classList.remove('on');
  btnMap.classList.add('on');
  btnView.classList.remove('on');
});

btnView.addEventListener('click', e => {
  mapContainer.classList.remove('on');
  viewContainer.classList.add('on');
  btnMap.classList.remove('on');
  btnView.classList.add('on');
});
