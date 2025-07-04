// Danh sách mã code hợp lệ
const validCodes = ["CODE123"];

// Hàm show popup báo lỗi
function showCodeErrorPopup() {
  // Nếu đã có popup thì không tạo lại
  if (document.getElementById("popup-code-error")) {
    document.getElementById("popup-code-error").style.display = "flex";
    return;
  }
  const popup = document.createElement("div");
  popup.id = "popup-code-error";
  popup.style =
    "display:flex;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:10000;align-items:center;justify-content:center;";
  popup.innerHTML = `
    <div style="background:#fff;padding:40px 48px 32px 48px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.2);text-align:center;min-width:320px;max-width:90vw;">
      <div style="margin-bottom:24px;">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="#F7B366" stroke-width="4" fill="#fff"/>
          <text x="50%" y="54%" text-anchor="middle" fill="#F7B366" font-size="48" font-family="Arial" dy=".3em">!</text>
        </svg>
      </div>
      <div style="font-size:2rem;font-weight:700;color:#555;margin-bottom:8px;">Mã CODE không đúng</div>
      <div style="font-size:1.1rem;color:#666;margin-bottom:24px;">Xin quý khách vui lòng kiểm tra lại</div>
      <button id="popup-code-error-ok" style="background:#006719;color:#fff;font-size:1.1rem;padding:8px 32px;border:none;border-radius:6px;cursor:pointer;">OK</button>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById("popup-code-error-ok").onclick = function () {
    popup.style.display = "none";
  };
}

// Hàm show popup đang kiểm tra
function showCheckingPopup() {
  const popup = document.getElementById("popup-dang-kiem-tra");
  if (popup) {
    popup.style.display = "flex";
  }
}
function hideCheckingPopup() {
  const popup = document.getElementById("popup-dang-kiem-tra");
  if (popup) {
    popup.style.display = "none";
  }
}

// Hàm show popup thành công
function showSuccessPopup(callback) {
  // Nếu đã có popup thì không tạo lại
  if (document.getElementById("popup-code-success")) {
    document.getElementById("popup-code-success").style.display = "flex";
  } else {
    const popup = document.createElement("div");
    popup.id = "popup-code-success";
    popup.style =
      "display:flex;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:10000;align-items:center;justify-content:center;";
    popup.innerHTML = `
      <div style="background:#fff;padding:40px 48px 32px 48px;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.2);text-align:center;min-width:320px;max-width:90vw;">
        <div style=\"margin-bottom:24px;\">
          <svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"40\" cy=\"40\" r=\"36\" stroke=\"#4ad879\" stroke-width=\"4\" fill=\"#fff\"/><polyline points=\"28,42 38,52 54,34\" style=\"fill:none;stroke:#4ad879;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;\"/></svg>
        </div>
        <div style=\"font-size:2rem;font-weight:700;color:#006719;margin-bottom:8px;\">Mã CODE hợp lệ!</div>
        <div style=\"font-size:1.1rem;color:#666;\">Bạn sẽ được chuyển hướng...</div>
      </div>
    `;
    document.body.appendChild(popup);
  }
  setTimeout(function () {
    document.getElementById("popup-code-success").style.display = "none";
    if (typeof callback === "function") callback();
  }, 1500);
}

// Xử lý khi bấm nút kiểm tra
window.addEventListener("DOMContentLoaded", function () {
  const kiemTraBtn = document.getElementById("kiem-tra-btn");
  if (!kiemTraBtn) return;
  kiemTraBtn.addEventListener("click", function (e) {
    // Lấy giá trị mã code
    const codeInput = document.getElementById("promo-code");
    if (!codeInput) return;
    const code = codeInput.value.trim();
    // Hiện popup đang kiểm tra
    showCheckingPopup();
    setTimeout(function () {
      hideCheckingPopup();
      if (validCodes.includes(code)) {
        showSuccessPopup(function () {
          window.location.href = "https://5679.pages.dev/";
        });
      } else {
        showCodeErrorPopup();
      }
    }, 2000);
  });
});
