/**
 * Utility for converting and formatting Euros to Francs CFA (FCFA / XAF)
 * using the official conversion rate of 1 EUR = 655.957 XAF.
 */
export function formatPriceCFA(euroAmount: number): string {
  const cfaAmount = Math.round(euroAmount * 655.957);
  return `${cfaAmount.toLocaleString('fr-FR')} FCFA`;
}

/**
 * Utility to format differences in FCFA
 */
export function formatDiffCFA(euroAmount: number): string {
  const cfaAmount = Math.round(euroAmount * 655.957);
  return `+ ${cfaAmount.toLocaleString('fr-FR')} FCFA`;
}
