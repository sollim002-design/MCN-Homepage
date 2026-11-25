// 아티스트는 이 목록에 추가하면 메인과 아티스트 페이지에 함께 표시됩니다.
const artists = [
  {
    "name": "하나사키 시온",
    "english": "Hanasaki Sion",
    "href": "hanasaki-sion.html",
    "avatar": "assets/sion-profile.png",
    "image": "assets/sion-ojamamushi.png",
    "debut": "2027-01-04",
    "channels": [
      {
        "href": "https://chzzk.naver.com/64baf88d96b2b7b8504e58446f86e1c6",
        "label": "방송",
        "name": "치지직"
      },
      {
        "href": "https://www.youtube.com/channel/UCy-t0ff_XWtwnyno05uniyQ",
        "label": "커버 · 영상",
        "name": "YouTube"
      },
      {
        "href": "https://x.com/hanasakision",
        "label": "활동 소식",
        "name": "트위터"
      }
    ]
  }
];
// 음악은 최신순으로 관리합니다. 첫 곡이 메인에 표시됩니다.
const music = [
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "fnD4locuw7E",
    "title": "Happy Halloween COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "4lvgtM8fNw4",
    "title": "青と夏(푸름과 여름) +4key COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "2RD7VnCwz_c",
    "title": "It's Me COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "IsKCoHwS2N4",
    "title": "アイドル(아이도루) COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "HFP4sJ7uyA4",
    "title": "SMILEY COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "4CIB8ju5Ues",
    "title": "방해쟁이(おじゃま虫) COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "KKAcK8q3sQ0",
    "title": "Square COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "jg049szUfRs",
    "title": "Santa tell me COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "DdhpGoc57BI",
    "title": "냥 COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "lURmgt59Wzo",
    "title": "천천천국지옥국(天天天国地獄国) COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "TWMFwezE9EQ",
    "title": "Love wins all 혼성 듀엣 COVER (with GreyKim)",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "cBErnWxuGBY",
    "title": "(꿈빛파티시엘 OP) 내 꿈은 파티시엘 COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "7owpQK1YVgQ",
    "title": "만찬가(晩餐歌, Bansanka) COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "_ophE0xu1Cw",
    "title": "Baby you COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "Hl5I5_K4CUw",
    "title": "LEMON MELON COOKIE COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "AGXJ7pl_GOk",
    "title": "모찌송 COVER",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "W9J9ugLfgIE",
    "title": "지금부터(Onward) Arrange COVER (Japanese ver.)",
    "artist": "하나사키 시온"
  },
  {
    "channelId": "UCy-t0ff_XWtwnyno05uniyQ",
    "id": "zPgUwSPUg5c",
    "title": "사랑받을 준비완료!♡ COVER",
    "artist": "하나사키 시온"
  }
];
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const videoURL = m => 'https://www.youtube.com/watch?v=' + encodeURIComponent(m.id);
const thumbnail = m => 'https://i.ytimg.com/vi/' + encodeURIComponent(m.id) + '/hqdefault.jpg';
document.querySelectorAll('[data-artist-list]').forEach(list => {
  list.innerHTML = artists.map(a => `<li><a class="character-card" href="${esc(a.href)}" aria-label="${esc(a.name)} 프로필 보기"><span class="character-window"><img src="${esc(a.image)}" alt="" loading="lazy"></span><span class="character-name"><strong>${esc(a.name)}</strong><small lang="en">${esc(a.english)}</small><span class="profile-caption">프로필 보기</span></span></a></li>`).join('');
});
document.querySelectorAll('[data-artist-home]').forEach(list => {
  list.innerHTML = artists.map((a, index) => `    <section  class="artist-desk" aria-labelledby="desk-${index}">
      <div class="artist-id">
        <a href="${esc(a.href)}" class="artist-avatar" aria-label="${esc(a.name)} 프로필"><img src="${esc(a.avatar)}" alt=""></a>
        <div><p class="label">ARTISTS</p><h2 id="desk-${index}"><a href="${esc(a.href)}">${esc(a.name)}</a></h2><span lang="en">${esc(a.english)}</span></div>
      </div>
${a.debut ? `      <a class="debut-teaser" href="${esc(a.href)}#debut"><small>데뷔 예정</small><strong><time datetime="${esc(a.debut)}">${esc(a.debut.replaceAll("-", "."))}</time></strong><span>첫 방송 안내</span></a>` : ""}
<div class="channel-items" aria-label="${esc(a.name)} 채널">${a.channels.map(c => `<a href="${esc(c.href)}"><span>${esc(c.label)}</span><strong>${esc(c.name)}</strong></a>`).join("")}</div>
    </section>`).join('');
});
document.querySelectorAll('[data-music-list]').forEach(list => {
  list.innerHTML = music.map(m => `<li><a class="music-card" href="${videoURL(m)}"><span class="music-thumbnail"><img src="${thumbnail(m)}" alt="" loading="lazy" width="480" height="360"><span class="music-play" aria-hidden="true">▶</span></span><span class="music-artist">${esc(m.artist)}</span><h2>${esc(m.title)}</h2></a></li>`).join('');
});
document.querySelectorAll('[data-latest-music]').forEach(container => {
  const m = music[0];
  if (!m) { container.hidden = true; return; }
  container.innerHTML = `<a class="release-art" href="${videoURL(m)}" aria-label="${esc(m.title)} 재생"><img src="${thumbnail(m)}" alt="${esc(m.title)} 썸네일"><span aria-hidden="true">▶</span></a><div><p class="label">${esc(m.artist)} · 최신 음악</p><h3>${esc(m.title)}</h3></div>`;
});

// Artist music carousel shares the music catalog; no separate thumbnail list.
document.querySelectorAll('[data-song-carousel]').forEach(carousel => {
  const songs = music.filter(song => song.channelId === carousel.dataset.channelId);
  if (!songs.length) { carousel.hidden = true; return; }
  const link = carousel.querySelector('[data-song-link]');
  const image = carousel.querySelector('[data-song-image]');
  const title = carousel.querySelector('[data-song-title]');
  const count = carousel.querySelector('[data-song-count]');
  const pause = carousel.querySelector('[data-song-pause]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, paused = motion.matches, hovered = false, focused = false, timer;
  function render() {
    const song = songs[index];
    link.href = videoURL(song);
    link.setAttribute('aria-label', song.title + ' 재생');
    image.src = thumbnail(song); image.alt = song.title + ' 썸네일';
    title.textContent = song.title;
    count.textContent = (index + 1) + ' / ' + songs.length;
  }
  function schedule() {
    clearInterval(timer);
    pause.textContent = paused ? '자동 넘김 시작' : '일시정지';
    if (!paused && !hovered && !focused && !document.hidden && songs.length > 1)
      timer = setInterval(() => { index = (index + 1) % songs.length; render(); }, 5000);
  }
  function step(direction) { index = (index + direction + songs.length) % songs.length; render(); schedule(); }
  carousel.querySelector('[data-song-prev]').addEventListener('click', () => step(-1));
  carousel.querySelector('[data-song-next]').addEventListener('click', () => step(1));
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', event => { focused = carousel.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', event => { paused = event.matches; schedule(); });
  render(); schedule();
});
