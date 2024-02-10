export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export function generateUID(){
return "id".Date.now();
  }