document.addEventListener("DOMContentLoaded", () => {
  window.$ = $;
  Database.initialize();
  CharTable.initialize();
  FileLoad.initialize();
  TextView.initialize();
  ImageView.initialize();
  Header.initialize();
  DataView.initialize();

  Shortcut.initialize();
});
