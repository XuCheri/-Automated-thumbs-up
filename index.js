const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/\Program Files/\Google/\Chrome/\Application/\chrome.exe',
    headless: false, // 关闭无头模式
    ignoreHTTPSErrors: false, // 在导航期间忽略 HTTPS 错误
    defaultViewport: { // 为每个页面设置一个默认视口大小
      width: 1080,
      height: 1080
    }
  })
  const page = await browser.newPage();
  await page.goto('http://aiportal.unicom.local/portal/v1/page/modules/index/index.html?_=20240913&v=1726217317776');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await page.click('#accountLoginNoteBtn')
  await page.click('#loginPhoneNum')

  let phoneNum = readlineSync.question('请输入OA手机号：');
  await page.type('#loginPhoneNum', phoneNum)


  await page.click('.login_phone_code')
  await page.click('#loginAuthCode')

  let code = readlineSync.question('请输入验证码：');
  await page.type('#loginAuthCode', code)
  
  await page.click('.login_botton')
  await page.waitForNavigation()

  // await browser.close();
})();