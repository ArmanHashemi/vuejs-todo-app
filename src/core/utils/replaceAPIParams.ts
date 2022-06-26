export default function(url: string, params: { [key: string]: any }) {
  let result = url;
  const matches = url.match(/:(\w*)/gm);
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      result = result.replace(matches[i], params[matches[i].slice(1)]);
    }
  }
  return result;
}
