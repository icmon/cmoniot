export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong,
}
const moment = require('moment');
const tz = require('moment-timezone');
const passwordConfig = Object.freeze({
  minLength: 8,
  atleaseOneLowercaseChar: true,
  atleaseOneUppercaseChar: true,
  atleaseOneDigit: true,
  atleaseOneSpecialChar: true,
});
export function getRandomString(length: any) {
  var randomChars: any =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  // var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function diffMinutesFromNow(timeString:any) {
  // แปลงสตริงเวลาที่รับมาเป็น Date object
  // ปรับรูปแบบเวลาให้รองรับ ISO 8601 ได้ง่าย เช่น เปลี่ยนช่องว่างกลางเป็น "T"
  const inputTime:any = new Date(timeString.replace(' ', 'T'));
  // เวลาปัจจุบัน
  const now:any = new Date();
  // หาค่าความต่างของเวลาระหว่าง now กับ timeString (หน่วยเป็นมิลลิวินาที)
  const diffMs = now - inputTime;
  // แปลงเป็นนาที (1 นาที = 60,000 มิลลิวินาที)
  const diffMins = diffMs / (1000 * 60);
  return diffMins;
    /*
      // ตัวอย่างใช้งาน
        const timeStr = "2025-07-04 14:54:28.066507";
        const minutesPassed = diffMinutesFromNow(timeStr);
        console.log(`ผ่านไปแล้ว ${minutesPassed.toFixed(2)} นาที`);
    */
}
export function getTodayName1(): string {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayIndex = new Date().getDay(); // 0=Sunday, 1=Monday...
        return days[todayIndex];
}
export function getCurrentDayname(): string {
   const today_name = getTodayName();    
   return today_name;
}
export function getTodayName(): string {
    const today = new Date();
    const today_name = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    if (today_name === 'sunday') {
        return 'sunday';
    } else if (today_name === 'monday') {
        return 'monday';
    } else if (today_name === 'tuesday') {
        return 'tuesday';
    } else if (today_name === 'wednesday') {
        return 'wednesday';
    } else if (today_name === 'thursday') {
        return 'thursday';
    } else if (today_name === 'friday') {
        return 'friday';
    } else if (today_name === 'saturday') {
        return 'saturday';
    }
}
export function diffMinutes(currentTime: string | Date, logTime: string | Date): number {
  // แปลงเป็น Date object หากเป็น string
  const current = (typeof currentTime === 'string') ? new Date(currentTime) : currentTime;
  const log = (typeof logTime === 'string') ? new Date(logTime) : logTime;

  // หาค่าความต่างเวลาระหว่าง current และ log (หน่วยเป็น milliseconds)
  const diffMs = current.getTime() - log.getTime();

  // แปลงเป็นนาที (1 นาที = 60,000 milliseconds)
  const diffMins1 = diffMs / 60000;
  // ปัดเศษลงเป็นจำนวนเต็มนาที
  const diffMins = Math.floor(diffMs / 60000);
  return diffMins;
}
export function getCurrentFullDatenow(): string {
  const now = new Date();
  const date = new Date(now);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0'); 
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0'); 
  let numOfDay = date.getDate();
  let hour = date.getHours().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minutes}:${second}`;
}
export function getCurrentDatenow(): string {
  const now = new Date();
  const date = new Date(now);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0'); 
  return `${year}-${month}-${day}`;
}
export function getCurrentTimenow(): string {
    const now = new Date();
    const date = new Date(now);  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
  return `${hours}:${minutes}`;
}
export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // เติม 0 หน้าหากชั่วโมงหรือ นาที น้อยกว่า 10
  const hh = hours < 10 ? '0' + hours : hours.toString();
  const mm = minutes < 10 ? '0' + minutes : minutes.toString();
  return `${hh}:${mm}`;
  console.log(getCurrentTime()); // เช่น "12:00"
}
/*******************************************************************************************************/
export function getCurrentTimeStatus(scheduleTime: string,schedule_event_start: string){
      const toMinutes = (t: string): number => {
        const [hh, mm] = t.split(':').map(Number);
        return hh * 60 + mm;
      };
      var consVae: number = 30;        // กำหนดช่วงกี่นาที
      var MINUTES_IN_DAY = 1440;
      var now = new Date();
      var nowMin = now.getHours() * 60 + now.getMinutes();    // เวลาปัจจุบันเป็นนาที
      var scheduleMin = toMinutes(scheduleTime);              // เวลาเป้าหมายเป็นนาที
      var schedule_event_start_set1 = toMinutes(scheduleTime);   
      var schedule_event_start_set2 = toMinutes(schedule_event_start);   
      if(schedule_event_start_set1==schedule_event_start_set2){
          var windowStart :any =  schedule_event_start_set2;
      }else{
          var windowStart :any =  nowMin;
      }
      const windowEnd = (nowMin + consVae) % MINUTES_IN_DAY;
      var cons1:any = 1;
      var cons2:any = 0;
      var cons11:any = `1- ${scheduleMin} - In the period `+windowStart+`:00 ± `+consVae+` minute`;
      var cons22:any = `2- ${scheduleMin} - Out of range `+windowStart+`:00 ± `+consVae+` minute`;
      var count_time:any = schedule_event_start_set1-schedule_event_start_set2;
      if(scheduleMin >= windowStart){
        var rt='scheduleMin>=windowStart';
      }else if(scheduleMin <= windowEnd){
          var rt='scheduleMin>=windowEnd';
      }
      if(windowEnd>=windowStart){
        if (count_time >= 0) {
              if((count_time==0 || count_time<=consVae) && (count_time>=0)){
                  var status:any = 1;
              }else{
                  var status:any = 0;
              }
          } else {
              var status:any = 0;
          } 

      }else{
          var status:any = 0;
      }
    return status;
}
export function getCurrentTimeStatusMsg(scheduleTime: string,schedule_event_start: string){
  const toMinutes = (t: string): number => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
  };
  var consVae: number = 30;        // กำหนดช่วงกี่นาที
  var MINUTES_IN_DAY = 1440;
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();    // เวลาปัจจุบันเป็นนาที
  var scheduleMin = toMinutes(scheduleTime);              // เวลาเป้าหมายเป็นนาที
  var schedule_event_start_set1 = toMinutes(scheduleTime);   
  var schedule_event_start_set2 = toMinutes(schedule_event_start);   
  if(schedule_event_start_set1==schedule_event_start_set2){
      var windowStart :any =  schedule_event_start_set2;
  }else{
      var windowStart :any =  nowMin;
  }
  const windowEnd = (nowMin + consVae) % MINUTES_IN_DAY;
  var cons1:any = 1;
  var cons2:any = 0;
  var cons11:any = `1- ${scheduleMin} - In the period `+windowStart+`:00 ± `+consVae+` minute`;
  var cons22:any = `2- ${scheduleMin} - Out of range `+windowStart+`:00 ± `+consVae+` minute`;
  var count_time:any = schedule_event_start_set1-schedule_event_start_set2;
   if(scheduleMin >= windowStart){

    var rt='scheduleMin>=windowStart';
    
   }else if(scheduleMin <= windowEnd){

      var rt='scheduleMin>=windowEnd';
   }
   if(windowEnd>=windowStart){
     if (count_time >= 0) {
          if((count_time==0 || count_time<=consVae) && (count_time>=0)){
              var status:any = 1;
          }else{
              var status:any = 0;
          }
      } else {
          var status:any = 0;
      } 

   }else{
      var status:any = 0;
   }
  var dataset1:any={   
                    TimeStart:windowStart,  
                    nowMin:nowMin,
                    TimeEnd:windowEnd, 
                    scheduleTime:scheduleTime,
                    balance:scheduleTime+' = '+schedule_event_start,
                    balance1:windowEnd+' = '+windowStart,
                    balance2:schedule_event_start_set1+' = '+schedule_event_start_set2, 
                    count_time:count_time,
                    status:status,
                    now:now,
                    consVae:consVae,
                    cons1:cons1,
                    cons11:cons11,
                    scheduleMin:scheduleMin,
                    schedule_event_start:schedule_event_start,
                    schedule_event_start_set1:schedule_event_start_set1,
                    schedule_event_start_set2:schedule_event_start_set2,
                    };
  return dataset1;
  /*
  var dataset2:any={  
                    balance:scheduleTime+' = '+schedule_event_start,
                    balance2:schedule_event_start_set1+' = '+schedule_event_start_set2,
                    count_time:count_time,
                    status:status,
                    now:now,
                    consVae:consVae,
                    cons2:cons2,
                    cons22:cons22,
                    nowMin:nowMin, 
                    windowEnd:windowEnd,
                    scheduleMin:scheduleMin,
                    schedule_event_start:schedule_event_start,
                    scheduleTime:scheduleTime,
                    windowStart:windowStart,
                    schedule_event_start_set1:schedule_event_start_set1,
                    schedule_event_start_set2:schedule_event_start_set2,
                    };
  */  
  // ปกติ (เวลาไม่ข้ามวัน)
  /*
  if (windowStart <= windowEnd) {
    //return (scheduleMin >= windowStart && scheduleMin <= windowEnd) ? '1' : '0';
    if (scheduleMin >= windowStart ) {
      console.log('cons1=>'+cons1); 
      return dataset1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return dataset2;
    } 
  } else {
    // ช่วงข้ามวัน เช่น 23:50 ถึง 00:20
    //return (scheduleMin >= windowStart || scheduleMin <= windowEnd) ? '1' : '0';
    if (scheduleMin >= windowStart ) {
      console.log('cons1=>'+cons1); 
      return dataset1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return dataset2;
    } 
  }
  */
  /*
    ตัวอย่าง
      สมมติ ตอนนี้เวลา 16:00 (nowMin = 960)
      scheduleTime = '16:10' → '1'
      scheduleTime = '16:31' → '0'
      scheduleTime = '15:59' → '0'
      สมมติ ตอนนี้เวลา 23:50 (nowMin = 1430, windowEnd = 20)
      scheduleTime = '23:55' → '1'
      scheduleTime = '00:10' → '1'
      scheduleTime = '00:21' → '0'

      สรุป:
      ไม่ต้องแยก if (scheduleMin >= windowStart) หรือ (scheduleMin <= windowEnd) เดี่ยว ๆ
      ให้ใช้เงื่อนไขแบบ "&&" และ "||" ตามตัวอย่างด้านบนเท่านั้น
      โค้ดนี้ใช้ได้ทุกกรณี ครอบคลุมทั้งปกติและข้ามวัน
      Return '1' ถ้าอยู่ในช่วงเวลา, '0' ถ้าไม่อยู่ในช่วง
      🟢 คัดลอกโค้ดนี้ไปใช้ได้เลย ถูกต้องแน่นอน!
      หากต้องการขยาย logic หรือข้อความเพิ่มเติม แจ้งได้ครับ!
  */
}
/*******************************************************************************************************/
/*******************************************************************************************************/
export function timeConverter(UNIX_timestamp: any) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
export function toThaiDate(date: any) {
  let monthNames = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();
  let hour = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');
  return `${numOfDay} ${month} ${year} ` + `${hour}:${minutes}:${second} น.`;
}
export function toEnDate(date: any) {
  let monthNames = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  let monthNameslong = [
    'January',
    'February',
    'March.',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let year = date.getFullYear() + 0;
  let month = monthNameslong[date.getMonth()];
  let numOfDay = date.getDate();
  let hour = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');
  return `${numOfDay} ${month} ${year} ` + `${hour}:${minutes}:${second}`;
}
export function getRandomint(length: any) {
  var randomChars: any = '0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function convertToTwoDecimals(num: any) {
  return parseFloat(num.toFixed(2)); // Convert the string back to a number
}
export function getRandomsrtsmall(length: any) {
  var randomChars: any = 'abcdefghijklmnopqrstuvwxyz';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function getRandomsrtsmallandint(length: any) {
  var randomChars: any = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function getRandomsrtbig(length: any) {
  var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function getRandomsrtbigandsmall(length: any) {
  var randomChars: any =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!#@';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function convertDatetime(utcString: any) {
  const date = new Date(utcString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
  /*
    // Example usage:
      const utcDatetime = "2025-04-08T13:05:25.000Z";
      const convertedDatetime = convertDatetime(utcDatetime);
      consol
    */
}
export function convertTZ(date: any, tzString: any) {
  var time: any = new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    }),
  );
  return time;
  /*
          function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }

        // usage: Asia/Jakarta is GMT+7
        convertTZ("2012/04/20 10:10:30 +0000", "Asia/Jakarta") // Tue Apr 20 2012 17:10:30 GMT+0700 (Western Indonesia Time)

        // Resulting value is regular Date() object
        const convertedDate = convertTZ("2012/04/20 10:10:30 +0000", "Asia/Jakarta") 
        convertedDate.getHours(); // 17

        // Bonus: You can also put Date object to first arg
        const date = new Date()
        convertTZ(date, "Asia/Jakarta") // current date-time in jakarta.
    */
}
export function timeConvertermas(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  //var time: any = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  var time: any =
    year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  //console.log('timeConvertermas a: ' + a)
  //console.log('timeConvertermas time: ' + time)
  return time;
}
export function timeConvertermas2(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  var time: any =
    date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
export function checkEmails(email: any) {
  //console.log('email: ' + email)
  const filter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('email_filter: ' + filter);
  if (!filter.test(email)) {
    return false;
  } else {
    return true;
  }
}
export function CurrentDateTimeForSQL() {
  const now = new Date();
  return now.toISOString();
}
export function getCurrentDateTimeForSQL() {
  const now = new Date();
  return now.toISOString();
}
export function toSnakeCaseUpper(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
}
export function convertSortInput(
  str: string,
): { sortField: string; sortOrder: string } | false {
  // Split the string by '-'
  const parts = str.split('-');

  // Check if the split parts meet the required conditions
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return false;
  }

  // Convert the first part to snake case upper
  const sortField = parts[0]
    .replace(/[A-Z]/g, (letter) => `_${letter}`)
    .toUpperCase();

  // Convert the second part to upper case
  const sortOrder = parts[1].toUpperCase();

  // Check if the second part is 'ASC' or 'DESC'
  if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
    return false;
  }

  return { sortField, sortOrder };
}
export function getRandomStrings(length: any) {
  var randomChars: any =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function checkEmail(email: any) {
  //console.log('email: ' + email)
  const filter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('email_filter: ' + filter);
  if (!filter.test(email)) {
    return false;
  } else {
    return true;
  }
}
export function MinimumLength(): number {
  return 8;
}
export function isPasswordCommon(password: string): boolean {
  return this.commonPasswordPatterns.test(password);
}
export function checkPasswordStrength1(password) {
  if (passwordConfig.minLength && password.length < passwordConfig.minLength) {
    throw new Error(
      `Your password must be at least ${passwordConfig.minLength} characters`,
    );
  }

  if (passwordConfig.atleaseOneLowercaseChar && password.search(/[a-z]/i) < 0) {
    throw new Error(
      'Your password must contain at least one lowercase character.',
    );
  }

  if (passwordConfig.atleaseOneUppercaseChar && password.search(/[A-Z]/) < 0) {
    throw new Error(
      'Your password must contain at least one uppercase character.',
    );
  }

  if (passwordConfig.atleaseOneDigit && password.search(/[0-9]/) < 0) {
    throw new Error('Your password must contain at least one digit.');
  }

  if (passwordConfig.atleaseOneSpecialChar && password.search(/\W/) < 0) {
    throw new Error(
      'Your password must contain at least one special character.',
    );
  }
}
export function checkPasswordStrength(password: any): PasswordCheckStrength {
  // Build up the strenth of our password
  let numberOfElements = 0;
  numberOfElements = /.*[a-z].*/.test(password)
    ? ++numberOfElements
    : numberOfElements; // Lowercase letters
  numberOfElements = /.*[A-Z].*/.test(password)
    ? ++numberOfElements
    : numberOfElements; // Uppercase letters
  numberOfElements = /.*[0-9].*/.test(password)
    ? ++numberOfElements
    : numberOfElements; // Numbers
  numberOfElements = /[^a-zA-Z0-9]/.test(password)
    ? ++numberOfElements
    : numberOfElements; // Special characters (inc. space)

  // Assume we have a poor password already
  let currentPasswordStrength = PasswordCheckStrength.Short;

  // Check then strenth of this password using some simple rules
  if (password === null || password.length) {
    currentPasswordStrength = PasswordCheckStrength.Short;
  } else if (this.isPasswordCommon(password) === true) {
    currentPasswordStrength = PasswordCheckStrength.Common;
  } else if (
    numberOfElements === 0 ||
    numberOfElements === 1 ||
    numberOfElements === 2
  ) {
    currentPasswordStrength = PasswordCheckStrength.Weak;
  } else if (numberOfElements === 3) {
    currentPasswordStrength = PasswordCheckStrength.Ok;
  } else {
    currentPasswordStrength = PasswordCheckStrength.Strong;
  }

  // Return the strength of this password
  return currentPasswordStrength;
}
export function generatePassword(passwordLength: number) {
  var numberChars = '0123456789';
  var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  var vaChars = '!@#$%^&*';
  var allChars = numberChars + upperChars + lowerChars + vaChars;
  var randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    }),
  ).join('');
}
export function passwordValidator(inputtxt: string) {
  var paswd: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';
  if (inputtxt.match(paswd)) {
    //console.log('Your validate password  Correct:'+inputtxt);
    return true;
  } else {
    //console.log('You validate password Wrong :'+inputtxt);
    return false;
  }
}
export function shuffleArray(array: any) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export function shuffleArrayIfId(array: any, id: number) {
  return array.includes(id);
}
export function getFormattedDate(date : any) {
  var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  var dayOfMonth = date.getDate()
  var dayOfWeekIndex = date.getDay()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return dayNames[dayOfWeekIndex] + ' ' + monthNames[monthIndex] + ' ' +  dayOfMonth + ' ' + year;
}
export function getDayname() {
      var date = new Date();
      var dayall = date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
      var today = date.toLocaleString('en-US', {
            weekday: 'long',
            // year: 'numeric',
            // month: 'long',
            // day: 'numeric'
          })
      console.log('dayall=>'); console.log(dayall);
      console.log('today=>'); console.log(today);
  return today;
}
export function getDaynameall() {
      var date = new Date();
      var dayall = date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) 
      console.log('dayall=>'); console.log(dayall);
  return dayall;
}
export function mapMqttDataToDeviceV2(dataDevices, mqttData) {
  return dataDevices.map(device => ({
    value_data: device.mqtt_device_name && Object.prototype.hasOwnProperty.call(mqttData, device.mqtt_device_name)
      ? mqttData[device.mqtt_device_name]
      : "",
    value_alarm: device.mqtt_status_over_name && Object.prototype.hasOwnProperty.call(mqttData, device.mqtt_status_over_name)
      ? mqttData[device.mqtt_status_over_name]
      : "",
    value_relay: device.mqtt_act_relay_name && Object.prototype.hasOwnProperty.call(mqttData, device.mqtt_act_relay_name)
      ? mqttData[device.mqtt_act_relay_name]
      : "",
    value_control_relay: device.mqtt_control_relay_name && Object.prototype.hasOwnProperty.call(mqttData, device.mqtt_control_relay_name)
      ? mqttData[device.mqtt_control_relay_name]
      : ""
  }));
}
export function mapMqttDataToDevices(dataDevices, mqttData) {
  console.log('dataDevices=>'); console.info(dataDevices);
  console.log('mqttData=>'); console.info(mqttData);
  return dataDevices.map(device => {
    const mappedDevice = { ...device };
    // Map mqtt_device_name
    if (device.mqtt_device_name && mqttData.hasOwnProperty(device.mqtt_device_name)) {
      mappedDevice[device.mqtt_device_name] = mqttData[device.mqtt_device_name];
    }
    // Map mqtt_status_over_name
    if (device.mqtt_status_over_name && mqttData.hasOwnProperty(device.mqtt_status_over_name)) {
      mappedDevice[device.mqtt_status_over_name] = mqttData[device.mqtt_status_over_name];
    }
    // Map mqtt_act_relay_name
    if (device.mqtt_act_relay_name && mqttData.hasOwnProperty(device.mqtt_act_relay_name)) {
      mappedDevice[device.mqtt_act_relay_name] = mqttData[device.mqtt_act_relay_name];
    }
    // Map mqtt_control_relay_name
    if (device.mqtt_control_relay_name && mqttData.hasOwnProperty(device.mqtt_control_relay_name)) {
      mappedDevice[device.mqtt_control_relay_name] = mqttData[device.mqtt_control_relay_name];
    }
    console.log('mapMqttDataToDevice=>'); console.info(mappedDevice);
    return mappedDevice;
  });
}
export function mapMqttDataToDevice(dataDevices, mqttData) {
  return dataDevices.map(device => ({
    value_data: device.value_data && mqttData.hasOwnProperty(device.value_data)
      ? mqttData[device.value_data]
      : "",
    value_alarm: device.value_alarm && mqttData.hasOwnProperty(device.value_alarm)
      ? mqttData[device.value_alarm]
      : "",
    value_relay: device.value_relay && mqttData.hasOwnProperty(device.value_relay)
      ? mqttData[device.value_relay]
      : "",
    value_control_relay: device.value_control_relay && mqttData.hasOwnProperty(device.value_control_relay)
      ? mqttData[device.value_control_relay]
      : ""
  }));
}
export function mapMqttToDevice(devices:any, mqttData:any) {
  return devices.map(device => {
    // ตรวจสอบว่าคีย์มีอยู่ใน mqttData ก่อนใส่ค่า
    if (device.value_data && mqttData.hasOwnProperty(device.value_data)) {
      device[device.value_data] = mqttData[device.value_data];
    }
    if (device.value_alarm && mqttData.hasOwnProperty(device.value_alarm)) {
      device[device.value_alarm] = mqttData[device.value_alarm];
    }
    if (device.value_relay && mqttData.hasOwnProperty(device.value_relay)) {
      device[device.value_relay] = mqttData[device.value_relay];
    }
    if (device.value_control_relay && mqttData.hasOwnProperty(device.value_control_relay)) {
      device[device.value_control_relay] = mqttData[device.value_control_relay];
    }
    return device;
  });
}
export function mapMqttToDevice1(devices, mqttData) {
  return devices.map(device => {
    device[device.value_data] = mqttData[device.value_data];
    device[device.value_alarm] = mqttData[device.value_alarm];
    device[device.value_relay] = mqttData[device.value_relay];
    device[device.value_control_relay] = mqttData[device.value_control_relay];
    return device;
  });
}
export function mergeDeviceDataWithMqtt(data1, data2) {
  return data1.map((device) => {
    const merged = { ...device };
    Object.keys(data2).forEach((key) => {
      if (key === "bucket") return;
      // เช็ค key ที่ตรงกับ device_name (ไม่สนใจตัวพิมพ์ใหญ่-เล็ก)
      if (
        key.toLowerCase().includes(device.device_name.toLowerCase()) ||
        (device.type_name &&
          key.toLowerCase().includes(device.type_name.toLowerCase()))
      ) {
        merged[key] = data2[key];
      }
    });
    return merged;
  });
}
/*
export function getCurrentTimeStatus_1(timeStr: string): string {
  // ฟังก์ชันช่วยแปลงเวลา "HH:mm" เป็นนาทีรวมในวัน
  const toTotalMinutes = (time: string): number => {
    const [hh, mm] = time.split(':').map(Number);
    return hh * 60 + mm;
  };

  // เวลาปัจจุบัน
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  // เวลา input ที่ต้องตรวจสอบ
  const inputTotalMinutes = toTotalMinutes(timeStr);

  // กำหนดช่วง offset (เดินหน้า 10-30 นาที)
  const minOffset = 10;
  const maxOffset = 30;
  const minutesInDay = 1440;

  // ฟังก์ชัน mod เพื่อรองรับช่วงข้ามวัน (เช่น 23:55 + 20 นาที = 00:15)
  const mod = (n: number) => (n + minutesInDay) % minutesInDay;

  // คำนวณช่วงเวลาที่สนใจ (start และ end)
  const windowStart = mod(currentTotalMinutes + minOffset);
  const windowEnd = mod(currentTotalMinutes + maxOffset);

  // เช็คว่าช่วงเวลาเดินหน้า 10-30 นาทีข้ามวันหรือไม่
  const isInRange = windowStart <= windowEnd
    ? (inputTotalMinutes >= windowStart && inputTotalMinutes <= windowEnd) // ช่วงไม่ข้ามวัน
    : (inputTotalMinutes >= windowStart || inputTotalMinutes <= windowEnd); // ช่วงข้ามวัน

  return isInRange ? '1' : '0';
}
export function getCurrentTimeStatusMsg_1(timeStr: string): string {
  // ฟังก์ชันช่วยแปลงเวลา "HH:mm" เป็นนาทีรวมในวัน
  const toTotalMinutes = (time: string): number => {
    const [hh, mm] = time.split(':').map(Number);
    return hh * 60 + mm;
  };

  // เวลาปัจจุบัน
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  // เวลา input ที่ต้องตรวจสอบ
  const inputTotalMinutes = toTotalMinutes(timeStr);

  // กำหนดช่วง offset (เดินหน้า 10-30 นาที)
  const minOffset = 10;
  const maxOffset = 30;
  const minutesInDay = 1440;

  // ฟังก์ชัน mod เพื่อรองรับช่วงข้ามวัน (เช่น 23:55 + 20 นาที = 00:15)
  const mod = (n: number) => (n + minutesInDay) % minutesInDay;

  // คำนวณช่วงเวลาที่สนใจ (start และ end)
  const windowStart = mod(currentTotalMinutes + minOffset);
  const windowEnd = mod(currentTotalMinutes + maxOffset);

  // เช็คว่าช่วงเวลาเดินหน้า 10-30 นาทีข้ามวันหรือไม่
  const isInRange = windowStart <= windowEnd
    ? (inputTotalMinutes >= windowStart && inputTotalMinutes <= windowEnd) // ช่วงไม่ข้ามวัน
    : (inputTotalMinutes >= windowStart || inputTotalMinutes <= windowEnd); // ช่วงข้ามวัน

  return isInRange ? `1- ${timeStr} - อยู่ในช่วง `+windowStart+`:00 ± 20 นาที` : `0- ${timeStr} - อยู่นอกช่วง `+windowStart+`:00 ± 20 นาที` ;
  
}
export function getCurrentTimeStatusV1111(scheduleTime: string): '1' | '0' {
  const toMinutes = (t: string): number => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
  };
  var consVae: number = 30;
  const MINUTES_IN_DAY = 1440;
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const scheduleMin = toMinutes(scheduleTime);
  // กรณี schedule ข้ามวัน (เช่น ตอนนี้ 23:50, schedule 00:10) รองรับ automodulo ด้วย
  // ช่วง = ตอนนี้ ถึง +consVae นาที
  const windowStart = nowMin;
  const windowEnd = (nowMin + consVae) % MINUTES_IN_DAY;
  var cons1:any = 1;
  var cons2:any = 0;
  if (windowStart <= windowEnd) {
    // ปกติ (ไม่ข้ามวัน)
     console.log('cons1=>'+cons1); 
    // return (scheduleMin >= windowStart && scheduleMin <= windowEnd) ?  cons1 :cons2;
    if (scheduleMin >= windowStart) {
      console.log('cons1=>'+cons1); 
      return cons1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return cons2;
    } 
  } else {
    // ข้ามวัน เช่น 23:45 ถึง 00:15
     console.log('cons2=>'+cons2); 
    // return (scheduleMin >= windowStart || scheduleMin <= windowEnd) ?  cons1 :cons2;
    if (scheduleMin >= windowStart) {
      console.log('cons1=>'+cons1); 
      return cons1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return cons2;
    } 
  } 
}
export function getCurrentTimeStatusMsgV2222(scheduleTime: string): '1' | '0' {
  const toMinutes = (t: string): number => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
  };
  var consVae: number = 30;
  const MINUTES_IN_DAY = 1440;
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const scheduleMin = toMinutes(scheduleTime);
  // กรณี schedule ข้ามวัน (เช่น ตอนนี้ 23:50, schedule 00:10) รองรับ automodulo ด้วย
  // ช่วง = ตอนนี้ ถึง +consVae นาที
  const windowStart = nowMin;
  const windowEnd = (nowMin + consVae) % MINUTES_IN_DAY;
  var cons1:any = `1- ${scheduleTime} - In the period `+windowStart+`:00 ± `+consVae+` minute`;
  var cons2:any = `2- ${scheduleTime} - Out of range `+windowStart+`:00 ± `+consVae+` minute`;
  if (windowStart <= windowEnd) {
    // ปกติ (ไม่ข้ามวัน) 
    if (scheduleMin >= windowStart) {
      console.log('cons1=>'+cons1); 
      return cons1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return cons2;
    } 
  } else {
    // ข้ามวัน เช่น 23:45 ถึง 00:15
    console.log('cons2=>'+cons2); 
    //return (scheduleMin >= windowStart || scheduleMin <= windowEnd) ?  cons1 :cons2;
    if (scheduleMin >= windowStart) {
      console.log('cons1=>'+cons1); 
      return cons1;
    }else if (scheduleMin <= windowEnd) {
      console.log('cons2=>'+cons2); 
       return cons2;
    } 
  } 
}
export function _getCurrentTimeStatusAAAAAAAAA(timeStr: string): string {
  // Parse input time string (HH:mm)
  var now = new Date();
  var date:any  = new Date(now);
  var year:any  = date.getFullYear();
  var month:any  = (date.getMonth() + 1).toString().padStart(2, '0');
  var day:any  = date.getDate().toString().padStart(2, '0');
  var hours:any  = date.getHours().toString().padStart(2, '0');
  var minutes:any = date.getMinutes().toString().padStart(2, '0');
  var seconds:any  = date.getSeconds().toString().padStart(2, '0');
  const [hh, mm] = timeStr.split(':').map(Number);
  var varminutes:number =20;
  const inputTotalMinutes = hh * varminutes + mm;
  // Define center time as 12:00 (noon)
  const centerHour = hours;
  const centerTotalMinutes = centerHour * varminutes;  
  // Define bounds with ±1 hour offset
  const lowerBound = centerTotalMinutes - 0;  
  const upperBound = centerTotalMinutes + varminutes;  
  // Debug logs (optional)
  console.log(`-------function getCurrentTimeStatus---------`);
  console.log(`timeStr=>`+timeStr); 
  console.log(`hours=>`+hours);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`minutes=>`+minutes); 
  console.log(`lowerBound=>`+lowerBound);
  console.log(`upperBound=>`+upperBound);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`timeStr: ${timeStr}`);
  console.log(`Input in total minutes: ${inputTotalMinutes}`);
  console.log(`Lower bound (minutes): ${lowerBound}`);
  console.log(`Upper bound (minutes): ${upperBound}`);
  // Check if input time is within bounds (inclusive)
  if (inputTotalMinutes >= lowerBound && inputTotalMinutes <= upperBound) {
    return '1';
  } else {
    return '0';
  }
}
export function _getCurrentTimeStatusBB(timeStr: string): string {
  // Parse input time string (HH:mm)
  var now = new Date();
  var date:any  = new Date(now);
  var year:any  = date.getFullYear();
  var month:any  = (date.getMonth() + 1).toString().padStart(2, '0');
  var day:any  = date.getDate().toString().padStart(2, '0');
  var hours:any  = date.getHours().toString().padStart(2, '0');
  var minutes:any = date.getMinutes().toString().padStart(2, '0');
  var seconds:any  = date.getSeconds().toString().padStart(2, '0');
  const [hh, mm] = timeStr.split(':').map(Number);
  var varminutes:number =20;
  const inputTotalMinutes = hh * varminutes + mm;
  // Define center time as 12:00 (noon)
  const centerHour = hours;
  const centerTotalMinutes = centerHour * varminutes;  
  // Define bounds with ±1 hour offset
  const lowerBound = centerTotalMinutes - 0;  
  const upperBound = centerTotalMinutes + varminutes;  
  // Debug logs (optional)
  console.log(`-------function getCurrentTimeStatus---------`);
  console.log(`timeStr=>`+timeStr); 
  console.log(`hours=>`+hours);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`minutes=>`+minutes); 
  console.log(`lowerBound=>`+lowerBound);
  console.log(`upperBound=>`+upperBound);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`timeStr: ${timeStr}`);
  console.log(`Input in total minutes: ${inputTotalMinutes}`);
  console.log(`Lower bound (minutes): ${lowerBound}`);
  console.log(`Upper bound (minutes): ${upperBound}`);
  // Check if input time is within bounds (inclusive)
  if (inputTotalMinutes >= lowerBound && inputTotalMinutes <= upperBound) {
    return '1';
  } else {
    return '0';
  }
}
export function _getCurrentTimeStatusMsgCCCCCCC(timeStr: string): string {
  // Parse input time string (HH:mm)
  var now = new Date();
  var date:any  = new Date(now);
  var year:any  = date.getFullYear();
  var month:any  = (date.getMonth() + 1).toString().padStart(2, '0');
  var day:any  = date.getDate().toString().padStart(2, '0');
  var hours:any  = date.getHours().toString().padStart(2, '0');
  var minutes:any = date.getMinutes().toString().padStart(2, '0');
  var seconds:any  = date.getSeconds().toString().padStart(2, '0');
  const [hh, mm] = timeStr.split(':').map(Number);
  var varminutes:number =20;
  const inputTotalMinutes = hh * varminutes + mm;
  const centerHour = hours;
  const centerTotalMinutes = centerHour * varminutes;  
  // Define bounds with ±1 hour offset
  const lowerBound = centerTotalMinutes - 0;  
  const upperBound = centerTotalMinutes + varminutes;  
  // Debug logs (optional)
  console.log(`-------function getCurrentTimeStatus---------`);
  console.log(`timeStr=>`+timeStr); 
  console.log(`hours=>`+hours);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`minutes=>`+minutes); 
  console.log(`lowerBound=>`+lowerBound);
  console.log(`upperBound=>`+upperBound);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`timeStr: ${timeStr}`);
  console.log(`Input in total minutes: ${inputTotalMinutes}`);
  console.log(`Lower bound (minutes): ${lowerBound}`);
  console.log(`Upper bound (minutes): ${upperBound}`);

  // Check if input time is within bounds (inclusive)
  if (inputTotalMinutes >= lowerBound && inputTotalMinutes <= upperBound) {  
      console.log(`return=>1`);
    return `1- ${timeStr} - อยู่ในช่วง `+centerTotalMinutes+`:00 ± 20 นาที`;
  } else {
      console.log(`return=>1`);
    return `0-${timeStr} - นอกช่วง `+centerTotalMinutes+`:00 ± 20 นาที`;
  }
}
export function _getCurrentTimeStatus2025(timeStr: string): string {
  // Parse input time string (HH:mm)
  var now = new Date();
  var date:any  = new Date(now);
  var year:any  = date.getFullYear();
  var month:any  = (date.getMonth() + 1).toString().padStart(2, '0');
  var day:any  = date.getDate().toString().padStart(2, '0');
  var hours:any  = date.getHours().toString().padStart(2, '0');
  var minutes:any = date.getMinutes().toString().padStart(2, '0');
  var seconds:any  = date.getSeconds().toString().padStart(2, '0');
  const [hh, mm] = timeStr.split(':').map(Number);
  var varminutes:number =20;
  const inputTotalMinutes = hh * varminutes + mm;
  // Define center time as 12:00 (noon)
  const centerHour = hours;
  const centerTotalMinutes = centerHour * varminutes;  
  // Define bounds with ±1 hour offset
  const lowerBound = centerTotalMinutes - 0;  
  const upperBound = centerTotalMinutes + varminutes;  

  // Debug logs (optional)
  console.log(`-------function getCurrentTimeStatus---------`);
  console.log(`timeStr=>`+timeStr); 
  console.log(`hours=>`+hours);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`minutes=>`+minutes); 
  console.log(`lowerBound=>`+lowerBound);
  console.log(`upperBound=>`+upperBound);
  console.log(`hh=>`+hh);
  console.log(`mm=>`+mm);
  console.log(`timeStr: ${timeStr}`);
  console.log(`Input in total minutes: ${inputTotalMinutes}`);
  console.log(`Lower bound (minutes): ${lowerBound}`);
  console.log(`Upper bound (minutes): ${upperBound}`);

  // Check if input time is within bounds (inclusive)
  if (inputTotalMinutes >= lowerBound && inputTotalMinutes <= upperBound) {
    return '1';
  } else {
    return '0';
  }
}
export function _getCurrentTimeStatusV1(timeStr: string): string {
  const now = new Date();
  const currentMinutes:number =  now.getHours() * 60 + now.getMinutes();
  const [hh, mm] = timeStr.split(':').map(Number);
  const inputTotalMinutes = hh * 60 + mm;
  const range:number =  20; // ±20 minutes
  const lowerBound = currentMinutes - range;
  const upperBound = currentMinutes + range;
  if (inputTotalMinutes >= lowerBound && inputTotalMinutes <= upperBound) {
    return '1';
  } else {
    return '0';
  }
}
export function _getCurrentTimeStatus_b1(timeStart: string): string {
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  // 20 minutes range end
  const rangeEnd = (currentTotalMinutes + 20) % 1440;

  // Convert input time string to total minutes
  const [hh, mm] = timeStart.split(':').map(Number);
  const inputTotalMinutes = hh * 60 + mm;

  // Helper function to normalize minutes within 0-1439
  const mod = (n: number) => (n + 1440) % 1440;

  // Determine lower boundary (low)
  let low: number;
  if (inputTotalMinutes >= currentTotalMinutes) {
    low = mod(currentTotalMinutes);
  } else {
    low = mod(inputTotalMinutes);
  }
  const high = mod(rangeEnd);

  // Check if input time is within the 20-minute window
  if (low <= high) {
    // Time interval does not cross midnight
    if (inputTotalMinutes >= low && inputTotalMinutes <= high) {
      return '1'; // within range
      // return `1- ${timeStart} - อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
    }
  } else {
    // Time interval crosses midnight
    if (inputTotalMinutes >= low || inputTotalMinutes <= high) {
      return '1'; // within range
      // return `1- ${timeStart} - อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
    }
  }
  return '0'; // outside range
  // return `0- ${timeStart} - ไม่อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
}
export function _getCurrentTimeStatusMsg_b1(timeStart: string): string {
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  // 20 minutes range end
  const rangeEnd = (currentTotalMinutes + 20) % 1440;

  // Convert input time string to total minutes
  const [hh, mm] = timeStart.split(':').map(Number);
  const inputTotalMinutes = hh * 60 + mm;

  // Helper function to normalize minutes within 0-1439
  const mod = (n: number) => (n + 1440) % 1440;

  // Determine lower boundary (low)
  let low: number;
  if (inputTotalMinutes >= currentTotalMinutes) {
    low = mod(currentTotalMinutes);
  } else {
    low = mod(inputTotalMinutes);
  }
  const high = mod(rangeEnd);

  // Check if input time is within the 20-minute window
  if (low <= high) {
    // Time interval does not cross midnight
    if (inputTotalMinutes >= low && inputTotalMinutes <= high) {
      return `1- ${timeStart} - อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
    }
  } else {
    // Time interval crosses midnight
    if (inputTotalMinutes >= low || inputTotalMinutes <= high) {
       return `1- ${timeStart} - อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
    }
  } 
  return `0- ${timeStart} - ไม่อยู่ในช่วง `+inputTotalMinutes+`:00 ± `+rangeEnd+` นาที lowerBound: `+low+` upperBound: `+high;
}
*/