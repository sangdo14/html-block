const api_key = 'AIzaSyAA1--4yowu_MLnUqDB7a200vEhqphM84Q';
const pid = 'PLXVj76JGLotR4xaw0HyL9VwOa5y6efr_j';
const num = 3;

const base_url = 'https://www.googleapis.com/youtube/v3/playlistItems';
const req_url = `${base_url}?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector('.frame');

//요청 url을 인자로 전달해서 서버에 데이터 요청후 가져오기
fetch(req_url)
  .then(data => {
    // 모든 데이터가 받아지면 data라는 매개변수로 전달됨
    // js로 가공가능한 json 형태로 변환시킴
    return data.json();
  })
  .then(json => {
    // jons데이터 변환이 완료되면 최종 데이터 콘솔로 확인
    const youtubeData = json.items;

    let tags = '';

    youtubeData.forEach((data, index) => {
      let tit = '';
      let desc = '';
      let date = '';

      data.snippet.title.length > 35
        ? (tit = data.snippet.title.substring(0, 35) + '...')
        : (tit = data.snippet.title);

      data.snippet.description.length > 120
        ? (desc = data.snippet.description.substring(0, 120) + '...')
        : (desc = data.snippet.description);

      tags += `
        <article>
          <h2>${tit}</h2>
          <figure>
            <img src=${data.snippet.thumbnails.high.url}>
          </figure>
          <p>${desc}</p>
          <span>${data.snippet.publishedAt
            .split('T')[0]
            .split('-')
            .join('.')}</span>
        </article>
      `;
    });

    frame.innerHTML = tags;
  });

// 축약 버전
// fetch(req_url).then(data=>data.json()).then(jsoin)=>{
//   console.log(json);
// }
