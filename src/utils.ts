export function isValidNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}

export function parseInteger(value: string): number {
  return parseInt(value.trim(), 10);
}

export function extractInteger(timeString: string, re: RegExp): number | null {
  const result = re.exec(timeString);
  if (!result) return null;

  const quantity = parseInteger(result[1]);
  if (isNaN(quantity)) {
    throw new Error(`invalid number parsed number from: ${timeString}`);
  }

  return quantity;
}
