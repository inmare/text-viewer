document.addEventListener("DOMContentLoaded", () => {
  window.$ = $;
  Database.initialize();
  CharTable.initialize();
  TextView.initialize();
  ImageView.initialize();
  Header.initialize();
  DataView.initialize();

  Shortcut.initialize();
});
