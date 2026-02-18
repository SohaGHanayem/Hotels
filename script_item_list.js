console.log("JS connected");

  const maxChars = 120;
  const desc = document.querySelector(".hotel-description");
  const fullText = desc.dataset.fullText.trim();

  if (fullText.length > maxChars) {
    desc.textContent = fullText.slice(0, maxChars) + "...";
  } else {
    desc.textContent = fullText;
  }


