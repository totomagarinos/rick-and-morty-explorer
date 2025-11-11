export const extractUrlIds = (urls: string[]): number[] => {
  return urls.map((url) => {
    const parts = url.split("/");
    return Number(parts[parts.length - 1]);
  });
};
