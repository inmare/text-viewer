document.addEventListener("DOMContentLoaded", () => {
  window.$ = $;
  Database.initialize();
  CharTable.initialize();
  TextView.initialize();
  ImageView.initialize();
  Header.initialize();
  Shortcut.initialize();
  DataView.initialize();
});
