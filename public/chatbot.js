(function () {
  const chatbotId = document.currentScript.getAttribute("data-chatbot-id");

  // Create the floating button
  const button = document.createElement("div");
  button.innerText = "💬";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.backgroundColor = "#1e40af";
  button.style.color = "white";
  button.style.borderRadius = "50%";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "pointer";
  button.style.zIndex = "9999";
  button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(button);

  // Create iframe container (hidden initially)
  const iframeContainer = document.createElement("div");
  iframeContainer.style.position = "fixed";
  iframeContainer.style.bottom = "80px";
  iframeContainer.style.right = "20px";
  iframeContainer.style.width = "350px";
  iframeContainer.style.height = "500px";
  iframeContainer.style.border = "1px solid #ccc";
  iframeContainer.style.borderRadius = "10px";
  iframeContainer.style.overflow = "hidden";
  iframeContainer.style.display = "none";
  iframeContainer.style.zIndex = "9999";
  document.body.appendChild(iframeContainer);

  // Add the iframe to show chatbox
  const iframe = document.createElement("iframe");
  iframe.src = `https://yourdomain.com/embed/chatbot?chatbotId=${chatbotId}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "none";
  iframeContainer.appendChild(iframe);

  // Toggle iframe visibility on button click
  button.addEventListener("click", () => {
    iframeContainer.style.display =
      iframeContainer.style.display === "none" ? "block" : "none";
  });
})();
