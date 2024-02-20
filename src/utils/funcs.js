export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export function generateUID(){
return "id".Date.now();
  }
  export function fileToDataURL(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }