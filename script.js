const unitOptions = {
  length: ["Meters", "Kilometers", "Miles", "Feet"],
  weight: ["Grams", "Kilograms", "Pounds", "Ounces"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

window.onload = () => {
  updateUnits();
};

function updateUnits() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  unitOptions[category].forEach(unit => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = unit;
    option1.text = option2.text = unit;
    fromUnit.add(option1);
    toUnit.add(option2);
  });

  toUnit.selectedIndex = 1;
}

function convert() {
  const category = document.getElementById("category").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const result = document.getElementById("result");

  if (isNaN(inputValue)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  let output;

  if (category === "length") {
    output = convertLength(inputValue, from, to);
  } else if (category === "weight") {
    output = convertWeight(inputValue, from, to);
  } else if (category === "temperature") {
    output = convertTemperature(inputValue, from, to);
  }

  result.textContent = `Result: ${output}`;
}

function convertLength(value, from, to) {
  const meters = {
    "Meters": 1,
    "Kilometers": 1000,
    "Miles": 1609.34,
    "Feet": 0.3048
  };
  return (value * meters[from] / meters[to]).toFixed(4);
}

function convertWeight(value, from, to) {
  const grams = {
    "Grams": 1,
    "Kilograms": 1000,
    "Pounds": 453.592,
    "Ounces": 28.3495
  };
  return (value * grams[from] / grams[to]).toFixed(4);
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = (value - 32) * 5/9;
  else if (from === "Kelvin") celsius = value - 273.15;

  let result;
  if (to === "Celsius") result = celsius;
  else if (to === "Fahrenheit") result = (celsius * 9/5) + 32;
  else if (to === "Kelvin") result = celsius + 273.15;

  return result.toFixed(2);
}

function resetFields() {
  document.getElementById("inputValue").value = "";
  document.getElementById("result").textContent = "Result: ";
  document.getElementById("category").selectedIndex = 0;
  updateUnits();
}
