export function shortenText(text: string, limit: number) {
  return text.length > limit ? text.substring(0, limit - 1) + "..." : text;
}
