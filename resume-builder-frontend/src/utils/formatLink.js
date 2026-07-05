// Turns "github.com/you/project" into a real clickable href, while the
// template still displays whatever the user actually typed.
export const toHref = (url) => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
