document.addEventListener("DOMContentLoaded", async () => {
  window.$ = $;
  Database.initialize();
  CharTable.initialize();
  FileLoad.initialize();
  TextView.initialize();
  ImageView.initialize();
  Header.initialize();
  DataView.initialize();

  Shortcut.initialize();

  await makePlaceholder();
});
