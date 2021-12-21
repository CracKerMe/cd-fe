export const cookieDomain = '.shipin520.com'
export const cookies = {
  setCookie: function (name: string, value: any, days: number, isZero: boolean) {
    var date = new Date(),
      expires = "",
      days = Number(days);
    if (isZero) {
      var curTemp = date.getTime();
      var curWeekHours = new Date(date.toLocaleDateString()).getTime() - 1;
      var passedTimeStamp = curTemp - curWeekHours;
      var leftTimeStamp = 24 * 60 * 60 * 1000 - passedTimeStamp;
      var leftTime = new Date();
      if (days < 1) {
        leftTime.setTime(leftTimeStamp + curTemp + days * 24 * 60 * 60 * 1000);
      } else {
        leftTime.setTime(leftTimeStamp + curTemp + (days - 1) * 24 * 60 * 60 * 1000);
      }
      expires = "; expires=" + leftTime.toUTCString();
    } else {
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/; domain="${cookieDomain}`;
  },
  getCookie: function (name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  deleteCookie: function (name: string, domain: string) {
    // document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    var date = new Date();
    date.setTime(date.getTime() - 10000); //删除一个cookie，就是将其过期时间设定为一个过去的时间
    document.cookie = `${name}= ' '; expires="${date.toUTCString()}"; path=/; domain=${(domain || cookieDomain)}`;
  }
}
