export function normalizeLineBreaks(text: string): string {
  const normalizedText = text
    .replace(/\r\n?/g, "\n")
    .split("\\n")
    .map((part) => part.replace(/\n+/g, "\n"))
    .join("\n\n");

  const lines = normalizedText.split("\n");
  const formattedLines: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const inlineBullet = line.match(/^([ \t]*)[•●▪◦][ \t]+(.+)$/);
    if (inlineBullet) {
      formattedLines.push(`${inlineBullet[1]}- ${inlineBullet[2]}`);
      continue;
    }

    const standaloneBullet = line.match(/^([ \t]*)[•●▪◦][ \t]*$/);
    if (standaloneBullet) {
      let contentIndex = index + 1;
      while (contentIndex < lines.length && !lines[contentIndex].trim()) {
        contentIndex += 1;
      }

      if (contentIndex < lines.length) {
        formattedLines.push(
          `${standaloneBullet[1]}- ${lines[contentIndex].trimStart()}`,
        );
        index = contentIndex;
        continue;
      }
    }

    formattedLines.push(line);
  }

  return formattedLines
    .filter((line, index, allLines) => {
      if (line.trim()) {
        return true;
      }

      let previousIndex = index - 1;
      while (previousIndex >= 0 && !allLines[previousIndex].trim()) {
        previousIndex -= 1;
      }

      let nextIndex = index + 1;
      while (nextIndex < allLines.length && !allLines[nextIndex].trim()) {
        nextIndex += 1;
      }

      return !(
        /^\s*-\s/.test(allLines[previousIndex] ?? "")
        && /^\s*-\s/.test(allLines[nextIndex] ?? "")
      );
    })
    .join("\n")
    .trim();
}
