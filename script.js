
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


      function getCharIndex(input) {
    // Cho phép nhập cả Hiragana hoặc Romaji (Latin)
    return hiraganaList.findIndex(item => 
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
      let cardsToShow = hiraganaList.slice(startIdx, endIdx + 1);
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

        // Mặt trước
        const front = document.createElement('div');
        front.className = 'face front';
        front.textContent = item.char;

        // Mặt sau
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
    const tongnen_girl = 14;
    const tongnen_nhatban = 5;
    const tongnen_lap_girl = 11;
    const tongnen_lap_nhatban = 5;

  let styleMode = false; // false = bộ 1, true = bộ 2

  function getBackgroundList() {
    const backgrounds = [];
    const chedo = getPadding();
    if(chedo < 50){
        if (styleMode) {
        for (let i = 1; i <= tongnen_lap_girl; i++) {
            backgrounds.push(`a${i}.png`);
        }
        } else {
            for (let i = 1; i <= tongnen_lap_nhatban; i++) {
        backgrounds.push(`b${i}.png`);
        }
        }
    }
    else {
        if (styleMode) {
            for (let i = 1; i <= tongnen_girl; i++) {
                backgrounds.push(`${i}.png`);
            }
            } else {
                for (let i = 1; i <= tongnen_nhatban; i++) {
            backgrounds.push(`x${i}.png`);
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
  });

let isMobile = window.innerWidth <= 1000; // lưu chế độ ban đầu

window.addEventListener('resize', () => {
  const nowMobile = window.innerWidth <= 1000;

  // Chỉ chạy khi chuyển chế độ (mobile <-> desktop)
  if (nowMobile !== isMobile) {
    isMobile = nowMobile; // cập nhật trạng thái
    backgrounds = getBackgroundList(); 
    changeBackground();
  }
});


  // Gọi load flashcards lần đầu khi trang tải
  createFlashcards('あ', 'ん');
