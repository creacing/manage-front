//func为要执行的函数（要防抖的），delay为防抖的毫秒数，在该毫秒数内的函数会被合并掉
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) { 
      clearTimeout(timer) 
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
};
