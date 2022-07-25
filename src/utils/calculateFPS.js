// const fpsStore = {
//   fps: 0
// }

// const fpsPrototype = {
//   myFrame:0,
//   myPreFameTime:Date.now()
// }
// Object.setPrototypeOf(fpsStore,fpsPrototype)
// const loop = () =>{
//   const now = Date.now();
//   fpsStore.__proto__.myFrame++;

//   if (now > 1000 + fpsStore.__proto__.myPreFameTime) {
//     const res = Math.round((fpsStore.__proto__.myFrame * 1000) / (now - fpsStore.__proto__.myPreFameTime));
//     fpsStore.fps = res
//     fpsStore.__proto__.myFrame = 0;
//     fpsStore.__proto__.myPreFameTime = now;
//   };

//   isSupport(loop);
// }

// const isSupport = (() =>{
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60);
//     }
//   );
// })()

// loop()
class Fps {
  constructor(){}
  static myFrame = 0
  static myPreFameTime = Date.now()
  static fps = 0
  static isSupport = this.getSupport()

  static loop() {
      const now = Date.now();
      Fps.myFrame++;
    
      if (now > 1000 + Fps.myPreFameTime) {
        Fps.fps = Math.round((Fps.myFrame * 1000) / (now - Fps.myPreFameTime));
        Fps.myFrame = 0;
        Fps.myPreFameTime = now;
      };
      Fps.isSupport(Fps.loop);
    }

   static getSupport(){
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    }

}

Fps.loop()