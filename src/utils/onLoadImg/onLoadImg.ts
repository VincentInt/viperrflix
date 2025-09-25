export const onLoadImg = (func: (...args: any) => any, src: string) => {
  const img = new Image();

  if (src === undefined) {
    func(false);
  }
  
  img.onload = () => func(true);
  img.onerror = () => func(false);

  img.src = src;
};
