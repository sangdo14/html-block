const api_key = 'AIzaSyAA1--4yowu_MLnUqDB7a200vEhqphM84Q';
const pid = 'PLXVj76JGLotR4xaw0HyL9VwOa5y6efr_j';
const num = 3;

const base_url = 'https://www.googleapis.com/youtube/v3/playlistItems';
const req_url = `${base_url}?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector('.frame');

// 유튜브 데이터 호출 및 동적 UI 생성
fetch(req_url)
  .then(data => {
    return data.json();
  })
  .then(json => {
    const youtubeData = json.items;

    let tags = '';

    youtubeData.forEach((data, index) => {
      console.log(data);

      let tit = '';
      let desc = '';

      if (data.snippet.title.length > 35) {
        tit = data.snippet.title.substring(0, 35) + '...';
      } else {
        tit = data.snippet.title;
      }

      data.snippet.description.length > 120
        ? (desc = data.snippet.description.substring(0, 120) + '...')
        : (desc = data.snippet.description);

      // 동적으로 생성될 유튜브 제목, 썸네일, 본문 정보
      tags += `
        <article>
          <h2>${tit}</h2>
          <!-- 추후 figure클릭시 영상 출력을 위해서 videoId값 data-vid란 커스텀 속성에 미리 담아둠 -->
          <figure class='pic' data-vid=${data.snippet.resourceId.videoId}>
            <img src=${data.snippet.thumbnails.high.url} />
          </figure>
          <p>${desc}</p>
          <span>${data.snippet.publishedAt
            .split('T')[0]
            .split('-')
            .join('.')}</span>
        </article>      
      `;
    });

    //해당 시점이 빈문서에 동적으로 썸네일이 생성되는 시점 (동적 요소 생성 시점)
    frame.innerHTML = tags;

    //모달 열고 닫기 이벤트 연결 (동적돔이 생성된 이후에 이벤트 연결 가능)
    const popup = document.querySelector('.popup');
    const popupCon = popup.querySelector('.con');
    const pics = document.querySelectorAll('.pic');
    const closePop = document.querySelector('.closePop');

    //복수개 썸네일 요소에 일괄적으로 이벤트 연결
    pics.forEach((data, index) => {
      data.addEventListener('click', e => {
        e.preventDefault();

        console.dir(data);

        // 썸네일 클릭시 미리 준비한 data-vid의 속성에 있는 videoId값 가져옴
        const vidId = data.getAttribute('data-vid');
        console.log(vidId);

        //console.log(`${index}번째 썸네일 클릭`);
        popup.style.display = 'block';
        // 해당 vidId값을 ifrrame의 src 부분에 연결해서 유튜브 영상 프레임 동적 생성
        popupCon.innerHTML = `<iframe src="http://www.youtube.com/embed/${vidId}"></iframe>`;
      });
    });

    // 팝업 닫기 버튼 이벤트 연결
    closePop.addEventListener('click', e => {
      e.preventDefault();
      popup.style.display = 'none';
    });
  });
