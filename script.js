
    // Danh sách Hiragana
  const hiraganaList = [
    // Cơ bản (seion)
    {char: 'あ', reading: 'a'}, {char: 'い', reading: 'i'}, {char: 'う', reading: 'u'}, {char: 'え', reading: 'e'}, {char: 'お', reading: 'o'},
    {char: 'か', reading: 'ka'}, {char: 'き', reading: 'ki'}, {char: 'く', reading: 'ku'}, {char: 'け', reading: 'ke'}, {char: 'こ', reading: 'ko'},
    {char: 'さ', reading: 'sa'}, {char: 'し', reading: 'shi'}, {char: 'す', reading: 'su'}, {char: 'せ', reading: 'se'}, {char: 'そ', reading: 'so'},
    {char: 'た', reading: 'ta'}, {char: 'ち', reading: 'chi'}, {char: 'つ', reading: 'tsu'}, {char: 'て', reading: 'te'}, {char: 'と', reading: 'to'},
    {char: 'な', reading: 'na'}, {char: 'に', reading: 'ni'}, {char: 'ぬ', reading: 'nu'}, {char: 'ね', reading: 'ne'}, {char: 'の', reading: 'no'},
    {char: 'は', reading: 'ha'}, {char: 'ひ', reading: 'hi'}, {char: 'ふ', reading: 'fu'}, {char: 'へ', reading: 'he'}, {char: 'ほ', reading: 'ho'},
    {char: 'ま', reading: 'ma'}, {char: 'み', reading: 'mi'}, {char: 'む', reading: 'mu'}, {char: 'め', reading: 'me'}, {char: 'も', reading: 'mo'},
    {char: 'や', reading: 'ya'}, {char: 'ゆ', reading: 'yu'}, {char: 'よ', reading: 'yo'},
    {char: 'ら', reading: 'ra'}, {char: 'り', reading: 'ri'}, {char: 'る', reading: 'ru'}, {char: 'れ', reading: 're'}, {char: 'ろ', reading: 'ro'},
    {char: 'わ', reading: 'wa'}, {char: 'を', reading: 'wo'}, {char: 'ん', reading: 'n'},
    // Dakuon
    {char: 'が', reading: 'ga'}, {char: 'ぎ', reading: 'gi'}, {char: 'ぐ', reading: 'gu'}, {char: 'げ', reading: 'ge'}, {char: 'ご', reading: 'go'},
    {char: 'ざ', reading: 'za'}, {char: 'じ', reading: 'ji'}, {char: 'ず', reading: 'zu'}, {char: 'ぜ', reading: 'ze'}, {char: 'ぞ', reading: 'zo'},
    {char: 'だ', reading: 'da'}, {char: 'ぢ', reading: 'ji'}, {char: 'づ', reading: 'zu'}, {char: 'で', reading: 'de'}, {char: 'ど', reading: 'do'},
    {char: 'ば', reading: 'ba'}, {char: 'び', reading: 'bi'}, {char: 'ぶ', reading: 'bu'}, {char: 'べ', reading: 'be'}, {char: 'ぼ', reading: 'bo'},
    // Handakuon
    {char: 'ぱ', reading: 'pa'}, {char: 'ぴ', reading: 'pi'}, {char: 'ぷ', reading: 'pu'}, {char: 'ぺ', reading: 'pe'}, {char: 'ぽ', reading: 'po'},

    // Yōon (âm ghép)
    {char: 'きゃ', reading: 'kya'}, {char: 'きゅ', reading: 'kyu'}, {char: 'きょ', reading: 'kyo'},
    {char: 'しゃ', reading: 'sha'}, {char: 'しゅ', reading: 'shu'}, {char: 'しょ', reading: 'sho'},
    {char: 'ちゃ', reading: 'cha'}, {char: 'ちゅ', reading: 'chu'}, {char: 'ちょ', reading: 'cho'},
    {char: 'にゃ', reading: 'nya'}, {char: 'にゅ', reading: 'nyu'}, {char: 'にょ', reading: 'nyo'},
    {char: 'ひゃ', reading: 'hya'}, {char: 'ひゅ', reading: 'hyu'}, {char: 'ひょ', reading: 'hyo'},
    {char: 'みゃ', reading: 'mya'}, {char: 'みゅ', reading: 'myu'}, {char: 'みょ', reading: 'myo'},
    {char: 'りゃ', reading: 'rya'}, {char: 'りゅ', reading: 'ryu'}, {char: 'りょ', reading: 'ryo'},
    {char: 'ぎゃ', reading: 'gya'}, {char: 'ぎゅ', reading: 'gyu'}, {char: 'ぎょ', reading: 'gyo'},
    {char: 'じゃ', reading: 'ja'},  {char: 'じゅ', reading: 'ju'},  {char: 'じょ', reading: 'jo'},
    {char: 'びゃ', reading: 'bya'}, {char: 'びゅ', reading: 'byu'}, {char: 'びょ', reading: 'byo'},
    {char: 'ぴゃ', reading: 'pya'}, {char: 'ぴゅ', reading: 'pyu'}, {char: 'ぴょ', reading: 'pyo'}
  ];
// Danh sách Katakana
const katakanaList = [
    {char: 'ア', reading: 'a'}, {char: 'イ', reading: 'i'}, {char: 'ウ', reading: 'u'}, {char: 'エ', reading: 'e'}, {char: 'オ', reading: 'o'},
    {char: 'カ', reading: 'ka'}, {char: 'キ', reading: 'ki'}, {char: 'ク', reading: 'ku'}, {char: 'ケ', reading: 'ke'}, {char: 'コ', reading: 'ko'},
    {char: 'サ', reading: 'sa'}, {char: 'シ', reading: 'shi'}, {char: 'ス', reading: 'su'}, {char: 'セ', reading: 'se'}, {char: 'ソ', reading: 'so'},
    {char: 'タ', reading: 'ta'}, {char: 'チ', reading: 'chi'}, {char: 'ツ', reading: 'tsu'}, {char: 'テ', reading: 'te'}, {char: 'ト', reading: 'to'},
    {char: 'ナ', reading: 'na'}, {char: 'ニ', reading: 'ni'}, {char: 'ヌ', reading: 'nu'}, {char: 'ネ', reading: 'ne'}, {char: 'ノ', reading: 'no'},
    {char: 'ハ', reading: 'ha'}, {char: 'ヒ', reading: 'hi'}, {char: 'フ', reading: 'fu'}, {char: 'ヘ', reading: 'he'}, {char: 'ホ', reading: 'ho'},
    {char: 'マ', reading: 'ma'}, {char: 'ミ', reading: 'mi'}, {char: 'ム', reading: 'mu'}, {char: 'メ', reading: 'me'}, {char: 'モ', reading: 'mo'},
    {char: 'ヤ', reading: 'ya'}, {char: 'ユ', reading: 'yu'}, {char: 'ヨ', reading: 'yo'},
    {char: 'ラ', reading: 'ra'}, {char: 'リ', reading: 'ri'}, {char: 'ル', reading: 'ru'}, {char: 'レ', reading: 're'}, {char: 'ロ', reading: 'ro'},
    {char: 'ワ', reading: 'wa'}, {char: 'ヲ', reading: 'wo'}, {char: 'ン', reading: 'n'},
    // Dakuon
    {char: 'ガ', reading: 'ga'}, {char: 'ギ', reading: 'gi'}, {char: 'グ', reading: 'gu'}, {char: 'ゲ', reading: 'ge'}, {char: 'ゴ', reading: 'go'},
    {char: 'ザ', reading: 'za'}, {char: 'ジ', reading: 'ji'}, {char: 'ズ', reading: 'zu'}, {char: 'ゼ', reading: 'ze'}, {char: 'ゾ', reading: 'zo'},
    {char: 'ダ', reading: 'da'}, {char: 'ヂ', reading: 'ji'}, {char: 'ヅ', reading: 'zu'}, {char: 'デ', reading: 'de'}, {char: 'ド', reading: 'do'},
    {char: 'バ', reading: 'ba'}, {char: 'ビ', reading: 'bi'}, {char: 'ブ', reading: 'bu'}, {char: 'ベ', reading: 'be'}, {char: 'ボ', reading: 'bo'},
    // Handakuon
    {char: 'パ', reading: 'pa'}, {char: 'ピ', reading: 'pi'}, {char: 'プ', reading: 'pu'}, {char: 'ペ', reading: 'pe'}, {char: 'ポ', reading: 'po'},
    // Yōon
    {char: 'キャ', reading: 'kya'}, {char: 'キュ', reading: 'kyu'}, {char: 'キョ', reading: 'kyo'},
    {char: 'シャ', reading: 'sha'}, {char: 'シュ', reading: 'shu'}, {char: 'ショ', reading: 'sho'},
    {char: 'チャ', reading: 'cha'}, {char: 'チュ', reading: 'chu'}, {char: 'チョ', reading: 'cho'},
    {char: 'ニャ', reading: 'nya'}, {char: 'ニュ', reading: 'nyu'}, {char: 'ニョ', reading: 'nyo'},
    {char: 'ヒャ', reading: 'hya'}, {char: 'ヒュ', reading: 'hyu'}, {char: 'ヒョ', reading: 'hyo'},
    {char: 'ミャ', reading: 'mya'}, {char: 'ミュ', reading: 'myu'}, {char: 'ミョ', reading: 'myo'},
    {char: 'リャ', reading: 'rya'}, {char: 'リュ', reading: 'ryu'}, {char: 'リョ', reading: 'ryo'},
    {char: 'ギャ', reading: 'gya'}, {char: 'ギュ', reading: 'gyu'}, {char: 'ギョ', reading: 'gyo'},
    {char: 'ジャ', reading: 'ja'}, {char: 'ジュ', reading: 'ju'}, {char: 'ジョ', reading: 'jo'},
    {char: 'ビャ', reading: 'bya'}, {char: 'ビュ', reading: 'byu'}, {char: 'ビョ', reading: 'byo'},
    {char: 'ピャ', reading: 'pya'}, {char: 'ピュ', reading: 'pyu'}, {char: 'ピョ', reading: 'pyo'}
];
let currentList = hiraganaList; 
let isKatakana = false;


      function getCharIndex(input) {
    // Cho phép nhập cả Hiragana hoặc Romaji (Latin)
    return currentList.findIndex(item => 
      item.char === input || item.reading.toLowerCase() === input.toLowerCase()
    );
  }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    function getPadding() {
    return window.innerWidth <= 1000 ? 100 : 30;
  }

    function createFlashcards(startChar, endChar) {
      const flashcardsDiv = document.getElementById('flashcards');
      flashcardsDiv.innerHTML = '';

      const startIdx = getCharIndex(startChar);
      const endIdx = getCharIndex(endChar);
      if (startIdx === -1 || endIdx === -1 || startIdx > endIdx) {
        alert("Chữ bắt đầu hoặc chữ kết thúc không hợp lệ hoặc thứ tự sai.");
        return;
      }

      // Lấy danh sách cần hiển thị và trộn
      let cardsToShow = currentList.slice(startIdx, endIdx + 1);
      shuffleArray(cardsToShow);

  const flashRect = flashcardsDiv.getBoundingClientRect();
  const padding = getPadding();

  cardsToShow.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      flashcardsDiv.appendChild(card); // Thêm trước để đo kích thước thật

      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;

      // Giới hạn vùng đặt card
      const allowedWidth = flashRect.width - cardWidth - padding * 2;
      const allowedHeight = flashRect.height - cardHeight - padding * 2;

      const x = (allowedWidth > 0 ? Math.random() * allowedWidth : 0) + (padding/2);
      const y = (allowedHeight > 0 ? Math.random() * allowedHeight : 0) + (padding/2);

      card.style.left = `${x}px`;
      card.style.top = `${y}px`;

        // Inner card
  const inner = document.createElement('div');
  inner.className = 'inner-card';

  const front = document.createElement('div');
  front.className = 'face front';
  front.textContent = item.char;


  // Tính index ảnh nền theo vòng lặp
  const nextBgIndex = Math.floor(Math.random() * backgrounds.length);
  // Lấy url ảnh nền kế tiếp
  const nextBgUrl = backgrounds[nextBgIndex];
  // Gán ảnh nền cho mặt trước
  front.style.backgroundImage = `linear-gradient(rgba(24, 7, 155, 0.8), rgba(32, 1, 135, 0.72), rgba(111, 4, 4, 0.72)), url('${nextBgUrl}')`;

  const back = document.createElement('div');
  back.className = 'face back';
  back.textContent = item.reading;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

        // Logic đếm click + ẩn sau 3 giây
        let clickCount = 0;
        let hideTimer = null;

  card.addEventListener('click', () => {
    clickCount++;
    card.classList.toggle('flipped');

    // Nếu đang ở mặt sau (số lần click lẻ)
    if (clickCount % 2 === 1) {
      // Nếu đã có timer thì xóa
      if (hideTimer) clearTimeout(hideTimer);

      // Tạo hoặc hiện đồng hồ đếm ngược ở góc phải
      let timerLabel = card.querySelector('.timer-label');
      if (!timerLabel) {
        timerLabel = document.createElement('div');
        timerLabel.className = 'timer-label';
        timerLabel.style.position = 'absolute';
        timerLabel.style.top = '5px';
        timerLabel.style.right = '5px';
        timerLabel.style.background = 'rgba(0,0,0,0.7)';
        timerLabel.style.color = '#fff';
        timerLabel.style.padding = '2px 6px';
        timerLabel.style.borderRadius = '4px';
        timerLabel.style.fontSize = '14px';
        timerLabel.style.zIndex = '2';
        card.appendChild(timerLabel);
      }

      let countdown = 2;
      timerLabel.textContent = countdown;

      // Cập nhật mỗi giây
      const updateCountdown = () => {
        countdown--;
        if (countdown >= 0) {
          timerLabel.textContent = countdown;
        }
      };

      const countdownInterval = setInterval(updateCountdown, 1000);

      // Sau 3 giây sẽ ẩn thẻ nếu vẫn ở mặt sau
      hideTimer = setTimeout(() => {
        clearInterval(countdownInterval); // Ngừng đếm
        if (clickCount % 2 === 1) {
          card.style.opacity = "0";
          setTimeout(() => {
            card.remove();
            checkCardsAndChangeBackground(); // gọi hàm kiểm tra và đổi nền
          }, 500);

        } else {
          // Nếu đã lật lại trước khi hết thời gian => ẩn label
          if (timerLabel) timerLabel.remove();
        }
      }, 2000);

    } else {
      // Nếu lật lại mặt trước -> hủy timer + xóa đồng hồ
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      const existingLabel = card.querySelector('.timer-label');
      if (existingLabel) existingLabel.remove();
    }
  });


        flashcardsDiv.appendChild(card);
      });
    }

    // Nút tạo Flashcards
    document.getElementById('generateBtn').addEventListener('click', () => {
      const startChar = document.getElementById('startChar').value.trim();
      const endChar = document.getElementById('endChar').value.trim();
      createFlashcards(startChar, endChar);
    });
    // Danh sách các file nền
            // const backgrounds = ['2.png', '3.png', '4.png', '5.png', '6.png']; 
  // Giả sử bạn biết số ảnh tối đa sẽ là 200
    const tongnen_girl = 15;
    const tongnen_nhatban = 33;
    const tongnen_lap_girl = 14;
    const tongnen_lap_nhatban = 30;

  let styleMode = false; // false = bộ 1, true = bộ 2

  function getBackgroundList() {
    const backgrounds = [];
    const chedo = getPadding();
    
  if (chedo < 50) {
    if (styleMode) {
        for (let i = 1; i <= tongnen_lap_girl; i++) {
            backgrounds.push(`lap_girl/${i}.png`);
        }
    } else {
        for (let i = 1; i <= tongnen_lap_nhatban; i++) {
            backgrounds.push(`lap_nhatban/${i}.png`);
        }
    }
} else {
    if (styleMode) {
        for (let i = 1; i <= tongnen_girl; i++) {
            backgrounds.push(`girl/${i}.png`);
        }
    } else {
        for (let i = 1; i <= tongnen_nhatban; i++) {
            backgrounds.push(`nhatban/${i}.png`);
        }
    }
}
    return backgrounds;
  }

  let backgrounds = getBackgroundList();
  let currentBgIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;

  function changeBackground() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * backgrounds.length);
    } while (newIndex === currentBgIndex);
    currentBgIndex = newIndex;
    document.body.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
  }

function checkCardsAndChangeBackground() {
  const flashcardsDiv = document.getElementById('flashcards');
  if (flashcardsDiv.children.length === 0) {
    changeBackground();
    // Lấy giá trị hiện tại của start và end char
    const startChar = document.getElementById('startChar').value.trim();
    const endChar = document.getElementById('endChar').value.trim();
    // Tạo lại flashcards full
    createFlashcards(startChar, endChar);
  }
}


  document.getElementById('styleToggle').addEventListener('change', function () {
    styleMode = this.checked;
    backgrounds = getBackgroundList();
    changeBackground();
      const startChar = document.getElementById('startChar').value.trim();
  const endChar = document.getElementById('endChar').value.trim();

  // Tạo lại flashcards với bộ ảnh mới
  createFlashcards(startChar, endChar);
  });

  document.getElementById('kataToggle').addEventListener('change', function () {
    isKatakana = this.checked;
    currentList = isKatakana ? katakanaList : hiraganaList;
    const startChar = document.getElementById('startChar').value.trim() || (isKatakana ? 'ア' : 'あ');
    const endChar = document.getElementById('endChar').value.trim() || (isKatakana ? 'ン' : 'ん');
    createFlashcards(startChar, endChar);
});


let isMobile = window.innerWidth <= 1000; // lưu chế độ ban đầu

window.addEventListener('resize', () => {
  const nowMobile = window.innerWidth <= 1000;

  // Chỉ chạy khi chuyển chế độ (mobile <-> desktop)
  if (nowMobile !== isMobile) {
    isMobile = nowMobile; // cập nhật trạng thái
    backgrounds = getBackgroundList(); 
    changeBackground();
    createFlashcards(startChar, endChar);
  }
});


  // Gọi load flashcards lần đầu khi trang tải
  // createFlashcards('あ', 'ん');
    // {char: 'ぴゃ', reading: 'pya'}, {char: 'ぴゅ', reading: 'pyu'}, {char: 'ぴょ', reading: 'pyo'}

    createFlashcards(isKatakana ? 'ア' : 'あ', isKatakana ? 'ン' : 'ん');

