let itemData = {};  // items.js already contains the item values

function addItem(side) {
  const container = document.getElementById(side + "Items");
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = `
    <select class="item-select">
      ${Object.keys(itemData)
        .map((item) => `<option value="${item}">${item}</option>`)
        .join("")}
    </select>
    <label><input type="checkbox" class="mod-fly" /> Fly</label>
    <label><input type="checkbox" class="mod-ride" /> Ride</label>
    <label><input type="checkbox" class="mod-neon" /> Neon</label>
    <label><input type="checkbox" class="mod-mega" /> Mega</label>
  `;
  container.appendChild(row);
}

function getTotalValue(containerId) {
  const container = document.getElementById(containerId);
  let total = 0;
  const rows = container.querySelectorAll(".item-row");
  rows.forEach((row) => {
    const item = row.querySelector(".item-select").value;
    const fly = row.querySelector(".mod-fly").checked;
    const ride = row.querySelector(".mod-ride").checked;
    const neon = row.querySelector(".mod-neon").checked;
    const mega = row.querySelector(".mod-mega").checked;

    let value = itemData[item] || 0;
    if (fly) value += 5;
    if (ride) value += 5;
    if (neon) value *= 2;
    if (mega) value *= 4;
    total += value;
  });
  return total;
}

function calculateTrade() {
  const yourValue = getTotalValue("yourItems");
  const theirValue = getTotalValue("theirItems");
  const result = document.getElementById("result");
  if (yourValue > theirValue + 10) {
    result.textContent = "LOSE 😢";
  } else if (yourValue < theirValue - 10) {
    result.textContent = "WIN 🎉";
  } else {
    result.textContent = "FAIR 🤝";
  }
}
