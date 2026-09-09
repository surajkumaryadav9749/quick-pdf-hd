const WIN_ANSI_REPLACEMENTS = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u2013": "-",
  "\u2014": "-",
  "\u2026": "...",
  "\u00a0": " ",
  "\u2022": "-",
  "\u00b7": "-",
};

const toPdfText = (value) =>
  String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .split("")
    .map((character) => {
      if (WIN_ANSI_REPLACEMENTS[character]) return WIN_ANSI_REPLACEMENTS[character];
      const code = character.charCodeAt(0);
      if (code < 32 && character !== "\n" && character !== "\t") return "";
      if (code > 255) return "?";
      return character;
    })
    .join("");

const wrapText = (text, font, size, maxWidth) => {
  const safe = toPdfText(text).replace(/\t/g, "  ");
  const paragraphs = safe.split("\n");
  const lines = [];

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      return;
    }

    let line = "";
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
        return;
      }

      if (line) lines.push(line);

      if (font.widthOfTextAtSize(word, size) <= maxWidth) {
        line = word;
        return;
      }

      let chunk = "";
      Array.from(word).forEach((character) => {
        const next = `${chunk}${character}`;
        if (font.widthOfTextAtSize(next, size) <= maxWidth) {
          chunk = next;
        } else {
          if (chunk) lines.push(chunk);
          chunk = character;
        }
      });
      line = chunk;
    });

    if (line) lines.push(line);
  });

  return lines;
};

module.exports = { toPdfText, wrapText };
