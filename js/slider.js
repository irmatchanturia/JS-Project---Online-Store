const slider = document.getElementById("slider");
let min = 0;
let max = 7200;

//შემოტანილი სლაიდერი

noUiSlider.create(slider, {
  start: [min, max],
  connect: true,
  range: {
    min: min,
    max: max,
  },
});

slider.noUiSlider.on("update", function (values, handle) {
  min = values[0];
  max = values[1];
  document.getElementById("min-price").textContent = Math.floor(min) + "$";
  document.getElementById("max-price").textContent = Math.floor(max) + "$";
});
