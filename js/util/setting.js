// 설정들 앞에는 접두사 MSM(만사마)가 붙음
const CHAR_SETTING_NAME = "MSM_CHAR_TABLE";
const DATABASE_NAME = "MSM_DATABASE";
const OBJECT_STORE_NAME = "MSM_OBJECT_STORE";
const ID_HASH_LENGTH = 4;

const charList = {
  from: [" ", "0", "8", "5", "$", "`", "~", "Q", "D"],
  to: ["Γ", "Δ", "δ", "Σ", "§", "Я", "Ξ", "¶", "Ю"],
};

const TEXT_TABLE_SHORTCUT = {
  moveRight: {
    key: "ArrowRight",
    altKey: false,
    ctrlkey: false,
    shiftKey: false,
  },
  moveLeft: {
    key: "ArrowLeft",
    altKey: false,
    ctrlkey: false,
    shiftKey: false,
  },
  moveUp: {
    key: "ArrowUp",
    altKey: false,
    ctrlkey: false,
    shiftKey: false,
  },
  moveDown: {
    key: "ArrowDown",
    altKey: false,
    ctrlkey: false,
    shiftKey: false,
  },
  putText: {
    key: /^([\u0020-\u007e]|Enter|Tab)$/,
    altKey: false,
    ctrlkey: false,
    shiftKey: false,
  },
};

const SHORTCUT = {
  save: {
    key: "s",
    altKey: false,
    ctrlkey: true,
    shiftKey: false,
  },
  changeView: {
    key: "v",
    altKey: true,
    ctrlkey: false,
    shiftKey: false,
  },
};
