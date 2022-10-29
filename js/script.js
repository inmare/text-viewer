document.addEventListener("DOMContentLoaded", () => {
  window.$ = $;
  Database.initialize();
  CharTable.initialize();
  TextView.initialize();
  Header.initialize();
  Shortcut.initialize();
  DataView.initialize();
});
