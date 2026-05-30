const slider = document.getElementById("slider");

noUiSlider.create(slider, {
    start: [0, 5000],
    connect: true,
    range: {
        min: 0,
        max: 5000
    }
});

slider.noUiSlider.on("update", function(values, handle) {
  console.log(values); // 

  const min = values[0];
  const max = values[1];

  document.getElementById("min-price").textContent = Math.floor(min) + "$";
  document.getElementById("max-price").textContent = Math.floor(max)+ "$";
});