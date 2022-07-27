/* eslint-disable require-await -- eslint conflicting errors */
/**
 * Writes text to the clipboard
 *
 * @param text The text to copy to the clipboard
 * @returns Promise to then on the condition it succeeds and catch if fails
 */
export const copyTextToClipboard = async (text: string): Promise<void> =>
    navigator.clipboard.writeText(text);
