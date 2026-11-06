/** Next adds the base path to its own files, but not to plain `/art/...` strings, so those go through here. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBase = (path: string) => `${BASE_PATH}${path}`;
