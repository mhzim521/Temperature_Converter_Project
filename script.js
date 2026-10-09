const valueInput = document.getElementById("value");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const inputUnit = document.getElementById("inputUnit");
const resultEl = document.getElementById("result");
const resultUnitEl = document.getElementById("resultUnit");
const errorEl = document.getElementById("error");

const symbols = {
  C: "°C",
  F: "°F",
  K: "K"
};

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return value * 9 / 5 + 32;
  return value + 273.15;
}

function convertTemperature() {
  const value = Number(valueInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  errorEl.textContent = "";

  if (valueInput.value === "" || !Number.isFinite(value)) {
    errorEl.textContent = "Please enter a valid temperature.";
    return;
  }

  if (from === "K" && value < 0) {
    errorEl.textContent = "Kelvin cannot be below 0 K.";
    return;
  }

  const celsius = toCelsius(value, from);
  const converted = fromCelsius(celsius, to);

  resultEl.textContent = converted.toFixed(2);
  resultUnitEl.textContent = symbols[to];
}

function updateInputUnit() {
  inputUnit.textContent = symbols[fromSelect.value];
}

function swapUnits() {
  const oldFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = oldFrom;

  updateInputUnit();

  if (valueInput.value !== "") {
    convertTemperature();
  }
}

function setQuick(value, from, to) {
  valueInput.value = value;
  fromSelect.value = from;
  toSelect.value = to;
  updateInputUnit();
  convertTemperature();
}

function resetConverter() {
  valueInput.value = "";
  fromSelect.value = "C";
  toSelect.value = "F";
  updateInputUnit();
  resultEl.textContent = "—";
  resultUnitEl.textContent = "";
  errorEl.textContent = "";
}

fromSelect.addEventListener("change", updateInputUnit);

valueInput.addEventListener("input", () => {
  if (valueInput.value !== "") {
    convertTemperature();
  }
});

valueInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    convertTemperature();
  }
});

updateInputUnit();
