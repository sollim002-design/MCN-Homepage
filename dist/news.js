// 최신 소식부터 추가하면 메인과 뉴스 페이지에 함께 반영됩니다.
const kiyoliveNews = [
  { date: '2026-11-25', category: '데뷔 안내', title: '하나사키 시온, 2027년 1월 4일 데뷔 예정', href: 'hanasaki-sion.html#debut', image: 'assets/sion-profile.png' },
  { date: '2026-11-25', category: '아티스트', title: '하나사키 시온 프로필 공개', href: 'hanasaki-sion.html', image: 'assets/sion-profile.png' },
  { date: '2025-06-26', category: '음악', title: '시온의 첫 투고곡을 만나보세요', href: 'https://youtu.be/zPgUwSPUg5c', image: 'assets/first-song-hd.jpg' }
];
document.querySelectorAll('[data-news-list]').forEach(list => {
  const cards = kiyoliveNews.map(news => {
    const link = document.createElement('a');
    link.href = news.href;
    const image = document.createElement('img');
    image.src = news.image; image.alt = ''; image.loading = 'lazy';
    const info = document.createElement('div');
    const meta = document.createElement('small');
    meta.textContent = news.category + ' · ';
    const date = document.createElement('time');
    date.dateTime = news.date; date.textContent = news.date.replaceAll('-', '.');
    meta.append(date);
    const title = document.createElement('h3');
    title.textContent = news.title;
    info.append(meta, title); link.append(image, info);
    return link;
  });
  list.replaceChildren(...cards);
});
