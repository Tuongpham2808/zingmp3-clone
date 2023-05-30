const sliderEl = document.querySelector(".customProgressBar");

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;

  const progress = (tempSliderValue / sliderEl.max) * 100;

  sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
});
