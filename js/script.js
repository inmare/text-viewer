async function getText() {
  const res = await fetch("./lorem-short.txt");
  const text = await res.text();
  return text;
}

const root = document.querySelector(":root");
const textView = document.querySelector("#text-view");
const textTable = document.querySelector("#text-table");
const currentPos = document.querySelector("#current-pos");
// const lineGuide = document.querySelector("#line-guide");
// const textSize = getTextSize();
// initTextView();
const defaultFrom = [];
const defaultTo = [];
initCharListTable();
initTextViewTable();

function initCharListTable() {
  const fromTr = document.querySelector("#from-char");
  const toTr = document.querySelector("#to-char");
  const delTr = document.querySelector("#del-char");

  for (let i = 0; i < charList.from.length; i++) {
    const fromChar = charList.from[i];
    const toChar = charList.to[i];
    const fromTd = document.createElement("td");
    fromTd.innerText = fromChar;
    fromTr.append(fromTd);

    const toTd = document.createElement("td");
    toTd.innerText = toChar;
    toTr.append(toTd);

    const delTd = document.createElement("td");
    delTd.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    delTr.append(delTd);
  }
}

async function initTextViewTable() {
  const text = await getText();
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-trIdx", i + 1);
    textTable.append(tr);
    for (let j = 0; j < 10; j++) {
      const td = document.createElement("td");
      td.setAttribute("data-tdIdx", j + 1);
      td.innerText = text[i * 10 + j];
      td.addEventListener("click", addTdClass);
      tr.append(td);
    }
  }
  window.addEventListener("click", removeTdClass);
  window.addEventListener("keydown", moveSelPos);
}

function removeTdClass(e) {
  if (!e.target.closest("#text-table")) {
    const selectedTd = document.querySelector(".select");
    if (selectedTd) {
      selectedTd.classList.remove("select");
      currentPos.innerText = "";
    }
  }
}

function addTdClass(e) {
  const selectedTd = document.querySelector(".select");
  if (selectedTd) {
    selectedTd.classList.remove("select");
    if (selectedTd != e.target) {
      e.target.classList.add("select");
    }
  } else {
    e.target.classList.add("select");
  }
  const tr = e.target.parentElement;
  const lineIdx = tr.getAttribute("data-trIdx");
  const charIdx = e.target.getAttribute("data-tdIdx");
  currentPos.innerText = `1, ${lineIdx}, ${charIdx}`;
}

function moveSelPos(e) {
  const selectedTd = document.querySelector(".select");
  if (selectedTd) {
    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const target = selectedTd.nextElementSibling;
        if (target) {
          const event = new Event("click");
          target.dispatchEvent(event);
        }
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const target = selectedTd.previousElementSibling;
        if (target) {
          const event = new Event("click");
          target.dispatchEvent(event);
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const parentTr = selectedTd.parentElement;
        const previousTr = parentTr.previousElementSibling;
        if (previousTr) {
          const siblingTd = parentTr.querySelectorAll("td");
          const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
          const previousTd = previousTr.querySelectorAll("td");
          const target = previousTd[tdIdx];
          const event = new Event("click");
          target.dispatchEvent(event);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const parentTr = selectedTd.parentElement;
        const nextTr = parentTr.nextElementSibling;
        if (nextTr) {
          const siblingTd = parentTr.querySelectorAll("td");
          const tdIdx = Array.from(siblingTd).indexOf(selectedTd);
          const nextTd = nextTr.querySelectorAll("td");
          const target = nextTd[tdIdx];
          const event = new Event("click");
          target.dispatchEvent(event);
        }
        break;
      }
    }
    const asciiRegex = /^[\u0020-\u007f]$/u;
    if (e.key.match(asciiRegex)) {
      e.preventDefault();
      selectedTd.innerText = e.key;
    }
  }
}
