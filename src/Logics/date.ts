import moment from "moment";

export const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  export const Years = (() => {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 27; // Complete up to the year 2050
    const yearsArray:string[] = [];
  
    for (let year = currentYear; year <= maxYear; year++) {
      yearsArray.push(year.toString());
    }
  
    return yearsArray;
  })();
  
  export const getPassedYears = (): string[] => {
    const currentYear:number =Number(new Date().getFullYear());
    const yearsArray:string[] = [];
  
    for (let i:number = 0; i < 10; i++) {
      yearsArray.push((currentYear - i).toString());
    }
  
    return yearsArray;
  };
  
  export const getPassedMonths = (): string[] => {
    const currentMonthIndex = new Date().getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return months.slice(0, currentMonthIndex);
  };
  
  export const getRemainingMonths = (): string[] => {
    const currentMonthIndex = new Date().getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return months.slice(currentMonthIndex,months.length);
  };

  export const getCurrentMonthName = (): string => {
    const currentMonthIndex = new Date().getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return months[currentMonthIndex];
  };
  
  export const getCurrentMonthsToEndOfYear = (): string[] => {
    const currentMonthIndex = new Date().getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return months.slice(currentMonthIndex);
  };
  export const getMonthNumber = (monthName: string): number | null => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const monthIndex = months.findIndex((month) => month.toLowerCase() === monthName.toLowerCase());
  
    // Return null if the input month name is invalid
    if (monthIndex === -1) {
      return null;
    }
  
    // Return month number (1 to 12) based on the index + 1
    return monthIndex + 1;
  };
  


  export const generateUniqueString=(length:number)=>{ const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let uniqueString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uniqueString += characters.charAt(randomIndex);
  }

  return uniqueString;
  }
  let timeoutID:any=0;
export const fireAfterStop = (callBack:any,ms:number)=>{
if(timeoutID)clearTimeout(timeoutID);
timeoutID=setTimeout(()=>{
callBack()
},ms);

}

let timeoutIDClick: any = 0;
export const fireAfterStopClick = (callback: any, ms: number) => {
  clearTimeout(timeoutIDClick);

  const handleMouseDown = () => {
    timeoutIDClick = setTimeout(() => {
      callback();
    }, ms);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutIDClick);
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};

export function getMonthNameFromDate(dateString: string): string {
  //if(typeof dateString=="object")dateString=dateString[0];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();

  return months[monthIndex];
}

export function getYearFromDate(dateString: string): number {
  if(typeof dateString=="object")dateString=dateString[0];
  const date = new Date(dateString);
  console.log(date);
  return date.getFullYear();
}
export function calculateSMSCharges(message:string,charactersPerPage:number=70){
  return Math.ceil(message.length/charactersPerPage);
}

export function getTimeAgoString(dateString: string): string {
  const now = moment();
  const targetDate = moment(dateString);
  const diffInSeconds = now.diff(targetDate, 'seconds');

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}

export function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function formatToNaira(value: string | number, showSymbol: boolean = false): string {
  if (typeof value === 'string') {
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
      if (isNaN(numericValue)) {
          return '0';
      }
      return showSymbol ? numericValue.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', currencyDisplay: 'symbol' }) : numericValue.toLocaleString();
  } else if (typeof value === 'number') {
      return showSymbol ? value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', currencyDisplay: 'symbol' }) : value.toLocaleString();
  } else {
      return '0';
  }
}


export const shareReferralLink = async (referralLink:string) => {
  try {
    // Check if the Web Share API is supported
    if (navigator.share) {
      await navigator.share({
        title: 'Check out swiftkonet!',
        text: 'Join and buy airtime , data and electricity bills effortlessly!',
        url: referralLink,
      });
      console.log('Successfully shared referral link.');
    } else {
      console.log('Web Share API not supported.');
    }
  } catch (error) {
    console.error('Error sharing referral link:', error);
  }
};

// Example usage:
export const validateNigerianAccountNumber=(accountNumber:string | number)=> {
  // Remove any whitespace from the account number
  if(typeof accountNumber=="number")accountNumber=accountNumber.toString();
  const cleanAccountNumber = accountNumber.replace(/\s/g, '');

  // Check if the account number is numeric and has the correct length (10 digits)
  const isValidLength = /^\d{10}$/.test(cleanAccountNumber);

  if (!isValidLength) {
    return false;
  }

  // Perform additional checks if needed based on the specific bank's account number format

  // Add your specific bank validation logic here if necessary

  // If no additional checks are needed, consider the account number as valid
  return true;
}


export const redirectToWhatsApp=(phoneNumber:string |  number, message:string)=>{
  // Format the phone number by removing non-numeric characters
  const formattedPhoneNumber = phoneNumber.toString().replace(/\D/g, '');
  // Create the WhatsApp URL with the formatted phone number and optional message
  const whatsappURL = `https://wa.me/${formattedPhoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  // Redirect to the WhatsApp URL
  window.location.href = whatsappURL;
}


export const getCurrentDateString=()=>{
  const options:any = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());

  const dayWithSuffix = addDaySuffix(formattedDate);

  return `${dayWithSuffix}`;
}

const addDaySuffix=(dateString:string)=>{
  const dayWithoutSuffix = dateString.replace(/\d+(st|nd|rd|th)/, '');
  const day = parseInt(dayWithoutSuffix, 10);

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  return dateString.replace(/\d+(st|nd|rd|th)/, `${day}${suffix}`);
}

export const replaceProtocol=(link:string)=>{
  // Check if the link starts with // and replace it with https://
  if (link.startsWith('//')) {
    return `https:${link}`;
  }

  // If the link doesn't start with //, return it as is
  return link;
}


export const CopyText= async (textToCopy:string) => {
  try {
    // Use the Clipboard API to write text to the clipboard
    const a=await navigator.clipboard.writeText(textToCopy);
  return a;
  } catch (error) {
 return false;
  }
};


export const convertToCamelCase=(inputString:string)=>{
  // Split the input string into words
  const words = inputString.split(' ');
  // Capitalize the first letter of each word (except the first word)
  const camelCaseWords = words.map((word:string, index:number) => {
    if (index === 0) {
      return word.toLowerCase(); // Lowercase the first word
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  // Join the words to create the camelCase string
  const camelCaseString = camelCaseWords.join('');
  return camelCaseString;
}

export const removeChar = (inputString: string, charToRemove: string): string => {
  // Use regular expression to replace all occurrences of the specified character
  const regex = new RegExp(charToRemove, 'g');
  return inputString.replace(regex, '');
};


export function getCurrentDateTime() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDateTime = `${month} ${day} ${year}`;
  return formattedDateTime;
}