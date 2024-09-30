export const RandomColor = () => {
  let colorArray = [
    "rgba(246, 188, 238, 0.5)", //pink
    "rgba(63, 178, 227, 0.5)", //blue
    "rgba(221, 35, 85, 0.5)", //purple
    "rgba(242, 126, 10, 0.5)", //orange
    "rgba(34, 225, 34, 0.5)", //green
    "rgba(123, 17, 199, 0.5)", //indigo
    "rgba(218, 241, 10, 0.5)", //yellow,
    "rgba(241, 56, 10, 0.5)", //red
  ];
  const range = colorArray.length;
  const random = Math.floor(Math.random() * range);
  const color = colorArray[random];
  return color;
};
