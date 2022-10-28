async function getText() {
  const res = await fetch("./lorem-short.txt");
  const text = await res.text();
  return text;
}
