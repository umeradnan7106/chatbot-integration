// public/chat-widget.js

(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://yourdomain.com/embed"; // ← update with your deployed domain
  iframe.style.position = "fixed";
  iframe.style.bottom = "80px";
  iframe.style.right = "20px";
  iframe.style.width = "350px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
  iframe.style.zIndex = "999999";
  iframe.style.display = "none"; // Hidden by default
  iframe.setAttribute("id", "my-chatbot-frame");

  const button = document.createElement("div");
  button.innerHTML = "💬";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.borderRadius = "50%";
  button.style.background = "#2563EB";
  button.style.color = "#fff";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.style.zIndex = "999999";

  button.addEventListener("click", () => {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
  });

  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();
