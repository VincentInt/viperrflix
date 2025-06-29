export const onLoadImg = (func: (...args: any) => any, src: string) => {
  const img = new Image();
  img.onload = () => func();
  img.src = src;
};
