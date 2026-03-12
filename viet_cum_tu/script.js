const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-btn");
const strokeWidthSelect = document.getElementById('strokeWidth');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerInput = document.getElementById('colorPicker');

let undoStack = [];
let redoStack = [];
const maxUndoSteps = 20;

if (canvas && clearBtn) {
    const context = canvas.getContext("2d");
    let painting = false;

    function getPosition(e) {
        if (e.touches) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.touches.clientX - rect.left,
                y: e.touches.clientY - rect.top
            };
        } else {
            return {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    }

function startPosition(e) {
  painting = true;
  const pos = getPosition(e);
  context.beginPath();
  context.moveTo(pos.x, pos.y);
  
  // Vẽ điểm ngay lập tức (dấu chấm)
  context.lineWidth = currentStrokeWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = currentStrokeColor;

  context.lineTo(pos.x + 0.1, pos.y + 0.1); // nét rất ngắn tạo dấu chấm
  context.stroke();
  context.beginPath();
  context.moveTo(pos.x, pos.y);
}


    function finishedPosition() {
        painting = false;
        context.beginPath();
        saveState();
    }



// Lưu màu và kích thước hiện tại
let currentStrokeColor = '#ffffffff'; // mặc định ban đầu màu vẽ
let currentStrokeWidth = 10;

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

// Sửa hàm saveState cũ thành bản mới có lưu Stack
function saveState() {
    const dataURL = canvas.toDataURL();
    localStorage.setItem("canvas", dataURL);

    // Lưu vào lịch sử để Undo
    undoStack.push(dataURL);
    if (undoStack.length > maxUndoSteps) {
        undoStack.shift(); // Xóa bớt nếu quá giới hạn
    }
    // QUAN TRỌNG: Xóa sạch redoStack khi có hành động vẽ mới
    redoStack = [];
}

// Hàm Hoàn tác (Quay lại)
function undo() {
    if (undoStack.length > 1) {
        // Lấy trạng thái hiện tại ra khỏi undo và bỏ vào redo
        const currentState = undoStack.pop();
        redoStack.push(currentState);

        // Lấy trạng thái trước đó để vẽ lên canvas
        const lastState = undoStack[undoStack.length - 1];
        renderCanvas(lastState);
    } else if (undoStack.length === 1) {
        // Nếu chỉ còn 1 bước, đưa nó vào redo và xóa sạch canvas
        const lastState = undoStack.pop();
        redoStack.push(lastState);
        context.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem("canvas");
    }
}

// Hàm Làm lại (Tiến lên)
function redo() {
    if (redoStack.length > 0) {
        // Lấy trạng thái từ redo và bỏ ngược lại vào undo
        const nextState = redoStack.pop();
        undoStack.push(nextState);
        renderCanvas(nextState);
    }
}

// Hàm phụ để vẽ dữ liệu lên Canvas
function renderCanvas(dataURL) {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        localStorage.setItem("canvas", dataURL);
    };
}

    function loadState() {
        const savedData = localStorage.getItem("canvas");
        if (savedData) {
            const img = new Image();
            img.src = savedData;
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    }

// Giữ nguyên hàm xóa canvas đã có
function clearCanvasAndState() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = []; // Reset lịch sử
    saveState(); // Lưu trạng thái trắng làm điểm đầu
}

// Thêm listener bắt phím Delete và ESC
window.addEventListener('keydown', function(event) {
    // Kiểm tra phím Delete (key=Delete hoặc keyCode=46) và ESC (key=Escape hoặc keyCode=27)
    if (event.key === "Delete" || event.key === "Escape" || event.keyCode === 46 || event.keyCode === 27) {
        clearCanvasAndState();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" || event.key.toLowerCase() === "z") {
        event.preventDefault(); // Ngăn trình duyệt thực hiện hành động mặc định (như hoàn tác text)
        undo();
    }
    // Redo: Ctrl + Y HOẶC Ctrl + Shift + Z
    if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))|| event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
    }
});


    clearBtn.addEventListener("click", clearCanvasAndState);

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mouseleave", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", finishedPosition);
    canvas.addEventListener("touchcancel", finishedPosition);
    canvas.addEventListener("touchmove", draw);

    loadState();

    window.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        saveState();
    };

    // Responsive canvas size (nếu muốn)
    function resizeCanvas() {
        if (window.innerWidth > 1008) {
            canvas.width = 1800;
            canvas.height = 850;
        } else {
            canvas.width = 1800;
            canvas.height = 800;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        loadState();
        undoStack = []; 
        saveState();
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('load', resizeCanvas);
}

