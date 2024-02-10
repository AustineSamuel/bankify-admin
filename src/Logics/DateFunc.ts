export function formatDate_Name(date=new Date()) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month}, ${year}`;
  }
  export function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  export function convertCamelCaseToSpaced(inputString:string) {
    // Use a regular expression to insert a space before each uppercase letter
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }
  
  // Example usage:
  const camelCaseString = "NeverMarried";
  const spacedString = convertCamelCaseToSpaced(camelCaseString);
  console.log(spacedString);  // Output: "never married"
  