const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-btn");
const answerBtn = document.getElementById('answerBtn');

const context = canvas.getContext("2d");
let display = document.getElementById("show");
let painting = false;
let drawStart = false;
let undoStack = [];
let redoStack = []; // Thêm mảng này để lưu lịch sử làm lại
const maxUndoSteps = 20;

// DOM elements
const startInput = document.getElementById('startChar');
const endInput = document.getElementById('endChar');
const startBtn = document.getElementById('startBtn');
const infoBox = document.getElementById('infoBox');
const kanaInfo = document.getElementById('kanaInfo');
const audioBtn = document.getElementById('audioBtn');
const nextBtn = document.getElementById('nextBtn');
const countdown = document.getElementById('remainCount');
const ctrl_z = document.getElementById('ctrl_z');
const skipBtn = document.getElementById('skip'); // Khai báo nút Skip

const strokeWidthSelect = document.getElementById('strokeWidth');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerInput = document.getElementById('colorPicker');

function startPosition(e) {
  painting = true;
  drawStart = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  context.beginPath();
  saveState();
}



function saveState() {
  const dataURL = canvas.toDataURL();
  localStorage.setItem("canvas", dataURL);

  if (undoStack.length >= maxUndoSteps) {
    undoStack.shift(); 
  }
  undoStack.push(dataURL);
  
  // Rất quan trọng: Xoá lịch sử redo khi có nét vẽ mới
  redoStack = []; 
}

// Thêm hàm phụ này để vẽ lại ảnh giúp code gọn hơn
function renderCanvas(dataURL) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
    localStorage.setItem("canvas", dataURL);
  };
}

// Cập nhật lại hàm này để lưu trạng thái NGAY KHI kết thúc nét vẽ
function finishedPosition() {
  if (painting) {
    painting = false;
    context.beginPath();
    saveState(); // Gọi lưu trạng thái ở đây
  }
}
function undo() {
  if (undoStack.length > 1) {
    // Rút trạng thái hiện tại ra khỏi undoStack và bỏ vào redoStack
    const currentState = undoStack.pop(); 
    redoStack.push(currentState); 

    // Vẽ lại trạng thái trước đó
    const lastState = undoStack[undoStack.length - 1]; 
    renderCanvas(lastState);
  } else if (undoStack.length === 1) {
    // Nếu về tới nét đầu tiên, lưu lại rồi xoá trắng canvas
    const currentState = undoStack.pop();
    redoStack.push(currentState);
    
    // Xoá trắng và vẽ lại nền thay vì gọi clearCanvasAndState() để không làm loạn Stack
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackgroundImage();
    localStorage.setItem("canvas", canvas.toDataURL());
  }
}

// Hàm mới: Redo (Làm lại)
function redo() {
  if (redoStack.length > 0) {
    // Lấy trạng thái gần nhất từ redoStack đẩy lại vào undoStack
    const nextState = redoStack.pop();
    undoStack.push(nextState);
    renderCanvas(nextState);
  }
}

function loadState() {
  const savedData = localStorage.getItem("canvas");
  if (savedData) {
    const img = new Image();
    img.src = savedData;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  }
}

canvas.addEventListener("mousedown", (e) => {
  painting = true;
  drawStart = true;
  startPosition(e);
});

canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", (e) => {
  painting = true;
  drawStart = true;
  startPosition(e);
});

canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchmove", draw);

function clearCanvasAndState() {
  painting = false;  // Ngừng vẽ và reset path
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);  // Xoá toàn bộ nét vẽ
  setBackgroundImage();  // Vẽ lại nền
  drawStart = false;  // Reset cờ
  display.innerHTML = "";  // Xoá hiển thị phụ (nếu có)
  saveState();  // Lưu lại state mới lên localStorage
}
clearBtn.addEventListener("click", () => {
  clearCanvasAndState();
});

window.addEventListener('keydown', function(event) {
    // Xoá: esc, delete, x
    if (
        event.key === "Delete" ||
        event.keyCode === 46 ||
        event.key === "Escape" ||
        event.keyCode === 27 ||
        event.key.toLowerCase() === "x"
    ) {
        clearCanvasAndState();
    }
    // Tiếp: n, v
    if (
        event.key.toLowerCase() === "n" ||
        event.key.toLowerCase() === "v"
    ) {
        if (typeof nextBtn !== "undefined" && infoBox.style.display !== 'none') {
            nextBtn.click();
        }
    }
    // Xem đáp án: c
    if (
        event.key.toLowerCase() === "c"
    ) {
        if (typeof answerBtn !== "undefined" && infoBox.style.display !== 'none') {
            answerBtn.click();
        }
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" || event.key.toLowerCase() === "z") {
        event.preventDefault(); // Ngăn trình duyệt thực hiện hành động mặc định
        undo();
    }
    if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" )|| event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
    }
    if (event.key.toLowerCase() === "s") {
        if (typeof skipBtn !== "undefined" && skipBtn && infoBox.style.display !== 'none') {
            skipBtn.click();
        }
    }
});




loadState();
window.onload = (event) => {
  drawStart = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
  
  // KIỂM TRA MÀN HÌNH ĐỂ ẨN/HIỆN NÚT UNDO KHI VỪA VÀO TRANG
  if (ctrl_z) {
      if (window.innerWidth > 900) {
          ctrl_z.style.display = 'none'; // Ẩn trên Laptop
      } else {
          ctrl_z.style.display = 'inline-block'; // Hiện trên Mobile
      }
  }
};

function setBackgroundImage() {
    const img = new Image();
    img.src = "124.png";
    //      img.src = "123.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function resizeCanvas() {
    if (window.innerWidth > 1008) {
        canvas.width = 600; canvas.height = 600;
    } else {
        canvas.width = 300; canvas.height = 300;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackgroundImage();
}

// Thêm một sự kiện lắng nghe khi xoay màn hình hoặc resize trình duyệt
window.addEventListener('resize', () => {
    // Chỉ tự động đổi nếu bạn muốn nó luôn bám sát theo độ rộng màn hình
    // Nếu không muốn làm phiền người dùng sau khi họ đã tự chọn tay, có thể bỏ qua bước này
    currentStrokeWidth = (window.innerWidth <= 900) ? 5 : 10;
    
    if (strokeWidthSelect) {
        strokeWidthSelect.value = currentStrokeWidth;
    }

    // KIỂM TRA MÀN HÌNH ĐỂ ẨN/HIỆN NÚT UNDO KHI KÉO GIÃN TRÌNH DUYỆT
    if (ctrl_z) {
        if (window.innerWidth > 900) {
            ctrl_z.style.display = 'none'; // Ẩn trên Laptop
        } else {
            ctrl_z.style.display = 'inline-block'; // Hiện trên Mobile
        }
    }
});
window.addEventListener('load', resizeCanvas);








    // Danh sách Hiragana
  const hiraganaList = [
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
// Chế độ hiện tại: 'hira' | 'kata'
let mode = 'hira'; // mặc định Hiragana
let kanaList = hiraganaList; // danh sách đang dùng theo mode

let activeList = [];
let currentIdx = 0;

// Tính năng luyện chữ cái
startBtn.addEventListener('click', () => {

    setBackgroundImage();
    let startVal = startInput.value.trim().toLowerCase();
    let endVal = endInput.value.trim().toLowerCase();
    let startIndex = kanaList.findIndex(k => k.reading === startVal);
    let endIndex = kanaList.findIndex(k => k.reading === endVal);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        alert('Vui lòng nhập đúng chữ bắt đầu và kết thúc (phải nằm trong bảng Hiragana và theo thứ tự).');
        infoBox.style.display = 'none';
        return;
    }
    activeList = kanaList.slice(startIndex, endIndex + 1);
    shuffleArray(activeList);
    currentIdx = 0;
    infoBox.style.display = 'flex';
    showCurrentKana();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showCurrentKana() {
  const curr = activeList[currentIdx];
  const glyph = curr.char; // vì activeList lấy từ kanaList theo mode, trường là 'char'

  kanaInfo.innerHTML = `
    <div class="phien_am_truoc_bam" >
      Phiên âm: ${curr.reading}
    </div>
  `;

  countdown.textContent = activeList.length - currentIdx - 1;

  // Xoá ảnh đáp án nếu có (chỉ giữ phần chữ & phiên âm)
  const imgs = infoBox.querySelectorAll('img');
  imgs.forEach(el => el.remove());
}

audioBtn.addEventListener('click', () => {
  const curr = activeList[currentIdx];
  const folder = mode === 'hira' ? 'hiragana' : 'katakana';
  const audioFile = `audio/${folder}/${curr.reading}.mp3`;

  const audio = new Audio(audioFile);
  audio.onerror = () => alert('Chữ này chưa hỗ trợ!');
  audio.play();
});


// Thêm biến để kiểm tra trạng thái khóa nút
let isNextDisabled = false;

nextBtn.addEventListener('click', () => {
    // 1. Kiểm tra khóa ngay đầu hàm - Luôn luôn check
    if (isNextDisabled) return;

    // 2. KHÓA NÚT LUÔN (Bất kể danh sách còn hay hết)
    isNextDisabled = true;
    nextBtn.classList.add('disabled-btn'); 
    const originalText = nextBtn.textContent;
    let secondsLeft = 2;
    nextBtn.textContent = `Chờ (${secondsLeft}s)`;

    // 3. Thực hiện đếm ngược để mở khóa (Chạy độc lập)
    const timer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
            nextBtn.textContent = `Next (${secondsLeft}s)`;
        } else {
            clearInterval(timer);
            isNextDisabled = false;
            nextBtn.textContent = originalText;
            nextBtn.classList.remove('disabled-btn');
        }
    }, 1000);

    // 4. Giờ mới xử lý logic chuyển chữ hoặc thông báo hết chữ
    if (currentIdx + 1 < activeList.length) {
        currentIdx++;
        showCurrentKana();
        clearCanvasAndState();
    } else {
        alert('Đã hoàn thành tất cả các chữ cái!');
        infoBox.style.display = 'none';
        // Khi hết chữ, nút bị ẩn theo infoBox nên cũng chẳng ai bấm được nữa
    }
});

// SỰ KIỆN CHO NÚT UNDO TRÊN ĐIỆN THOẠI
if (ctrl_z) {
    ctrl_z.addEventListener('click', () => {
        undo();
    });
}
// FIX LỖI LỒNG SỰ KIỆN CỦA NÚT SKIP
if (skipBtn) {
    skipBtn.addEventListener('click', () => {
        if (activeList && activeList.length > 0) {
            const skippedKana = activeList.splice(currentIdx, 1)[0]; 
            activeList.push(skippedKana);
            showCurrentKana();
            clearCanvasAndState();
        }
    });
}

answerBtn.addEventListener('click', () => {
  const curr = activeList[currentIdx];
  const glyph = curr.char;
  const folder = mode === 'hira' ? 'hiragana' : 'katakana'; // đúng yêu cầu bạn

  kanaInfo.innerHTML = `
    <div class="phien_am_sau_bam">
      Phiên âm: ${curr.reading}
    </div>

    <div class="chudanhmay" style="display: flex; justify-content: center; align-items: center;">
      <div class="textt">chữ đánh máy: </div>
      <div class="ky_tu">${glyph}</div>
    </div>
    
    <!-- <div class="chu_chuan" style="display: flex; justify-content: center; align-items: center;">
         <div class="textt2">chữ viết tay: </div>
         <div class="chuan_viettay">
         <img src="${folder}/${curr.reading}.png"/>
         </div>
     </div> -->

    <div class="huong_dan_anh" style="display: flex; justify-content: center;  align-items: center; gap: 2px;">
        <div style="text-align: center;">
          <img src="hiragana/${curr.reading}.png" class="img-huong-dan" />
        </div>
        
        <div style="text-align: center;">
          <img src="katakana/${curr.reading}.png" class="img-huong-dan" />
        </div>
    </div>
  `;
});



// Lưu màu và kích thước hiện tại
let currentStrokeColor = '#ffffff'; // mặc định ban đầu màu vẽ
// let currentStrokeColor = '#000000'; // mặc định ban đầu màu vẽ
// Thay thế đoạn khai báo cũ bằng đoạn này
let currentStrokeWidth = (window.innerWidth <= 900) ? 5 : 10;

// Cập nhật giá trị hiển thị trên thẻ Select (nếu có) để người dùng không bị nhầm
if (strokeWidthSelect) {
    strokeWidthSelect.value = currentStrokeWidth;
}

// Thêm một sự kiện lắng nghe khi xoay màn hình hoặc resize trình duyệt
window.addEventListener('resize', () => {
    // Chỉ tự động đổi nếu bạn muốn nó luôn bám sát theo độ rộng màn hình
    // Nếu không muốn làm phiền người dùng sau khi họ đã tự chọn tay, có thể bỏ qua bước này
    currentStrokeWidth = (window.innerWidth <= 900) ? 5 : 10;
    
    if (strokeWidthSelect) {
        strokeWidthSelect.value = currentStrokeWidth;
    }
});

strokeWidthSelect.addEventListener('change', function () {
  currentStrokeWidth = parseInt(this.value);
});

// Gán vào context mỗi lần vẽ
function draw(e) {
  if (!painting) return;
  let clientX, clientY;
  if (e.type.startsWith("touch")) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  // context.strokeStyle = '#af05f1ff';
  // context.lineWidth = 30;
  context.lineWidth = currentStrokeWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = currentStrokeColor;

  const x = clientX - canvas.offsetLeft;
  const y = clientY - canvas.offsetTop;

  if (painting) {
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.moveTo(x, y);
  }
}


// Tương tác nút màu
colorPickerBtn.onclick = function() {
  colorPickerInput.click();
}
colorPickerInput.oninput = function() {
  currentStrokeColor = this.value;
  colorPickerBtn.style.background = this.value;
}


// Map giữa Hira và Kata để đổi ký tự đang hiển thị ngay lập tức
const hiraToKata = new Map(hiraganaList.map((h, i) => [h.char, katakanaList[i].char]));
const kataToHira = new Map(katakanaList.map((k, i) => [k.char, hiraganaList[i].char]));

// Nếu trong HTML đã có input#modeToggle thì thêm sự kiện:
const modeToggle = document.getElementById('modeToggle');

// Khởi tạo label theo mode mặc định
updateModeLabel(); // gọi sau khi biến mode='hira' được set

// Lắng nghe gạt switch
modeToggle.addEventListener('change', () => {
  // Cập nhật mode và danh sách đang dùng
  mode = modeToggle.checked ? 'kata' : 'hira';
  kanaList = mode === 'kata' ? katakanaList : hiraganaList;
  updateModeLabel();

  // Nếu đang có activeList (đã Tạo trước đó), ta giữ nguyên khoảng luyện hiện tại
  // nhưng đổi toàn bộ phần tử sang bảng tương ứng để next/prev一致
  if (activeList && activeList.length > 0) {
    activeList = activeList.map(item => {
      // item hiện có dạng {char, reading}
      const reading = item.reading;
      const idx = (mode === 'kata'
        ? hiraganaList.findIndex(k => k.reading === reading)
        : katakanaList.findIndex(k => k.reading === reading));
      const sourceList = (mode === 'kata') ? katakanaList : hiraganaList;
      return sourceList[idx]; // trả về object đúng bảng, cùng reading
    });
  }

  // Cập nhật ngay ký tự đang hiển thị (nếu đang hiển thị)
  // showCurrentKana() hiện đang render từ activeList[currentIdx] nếu có
  // Cần bảo toàn chỉ số và đổi glyph tức thời
  if (typeof showCurrentKana === 'function') {
    // Trường hợp đang hiển thị random từ activeList
    if (activeList && activeList.length > 0) {
      // Chỉ cần gọi lại render
      showCurrentKana();
    } else {
      // Nếu chưa bấm Tạo, có thể đang hiển thị một glyph đơn lẻ từ kanaInfo (nếu có)
      // Ta cố gắng đổi ngay cái đang hiện bằng map
      const glyphEl = document.querySelector('#kanaInfo .ky_tu');
      if (glyphEl && glyphEl.textContent) {
        const cur = glyphEl.textContent.trim();
        let nextChar = cur;
        if (mode === 'kata' && hiraToKata.has(cur)) nextChar = hiraToKata.get(cur);
        if (mode === 'hira' && kataToHira.has(cur)) nextChar = kataToHira.get(cur);
        if (nextChar !== cur) {
          glyphEl.textContent = nextChar;
        }
      }
    }
  }

  // Đổi hình nền/hint nếu cần
  setBackgroundImage();
});

// Cập nhật nội dung label theo mode
function updateModeLabel() {
  const modeLabel = document.getElementById('modeLabel');
  if (modeLabel) {
    modeLabel.textContent = (mode === 'kata') ? 'Katakana' : 'Hiragana';
  }
  // Đồng bộ trạng thái switch theo mode hiện tại
  if (modeToggle) {
    modeToggle.checked = (mode === 'kata');
  }
}
