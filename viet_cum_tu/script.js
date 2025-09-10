const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-btn");
const strokeWidthSelect = document.getElementById('strokeWidth');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerInput = document.getElementById('colorPicker');

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

    function saveState() {
        localStorage.setItem("canvas", canvas.toDataURL());
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
    saveState();
}

// Thêm listener bắt phím Delete và ESC
window.addEventListener('keydown', function(event) {
    // Kiểm tra phím Delete (key=Delete hoặc keyCode=46) và ESC (key=Escape hoặc keyCode=27)
    if (event.key === "Delete" || event.key === "Escape" || event.keyCode === 46 || event.keyCode === 27) {
        clearCanvasAndState();
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
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('load', resizeCanvas);
}
