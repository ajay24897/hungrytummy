export function toINRString(number, showRupeeSymbol = true) {
  if (showRupeeSymbol) {
    return '₹' + number.toLocaleString();
  }
  return number.toLocaleString();
}
