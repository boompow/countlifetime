// scroll disabling and enabling functions
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
export const scrollbarDisable = () => {
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const scrollbarEnable = () => {
  window.onscroll = () => {};
};
