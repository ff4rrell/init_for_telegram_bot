const { Telegraf } = require('telegraf');

const fetch = require('node-fetch')

const bot = new Telegraf("1013128644:AAGjSC_w8Kagg1uMNo9j82JtqhV7td7XAwY");
const weatheApiKey = "bf2a7e346bb52bc5343ef08914d47a05";

const weatherUrl = (cityName) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${weatheApiKey}&units=metric&lang=ru`
}

bot.start(ctx => {
    return ctx.reply('Привет! Я бот, меня создал Саякбай, который подскажет погоду')
})

bot.hears('Погоду можно мне',(ctx) => {
    ctx.reply('Введите название города на английском, первая заглавная')

})

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
  })



bot.on('message', (ctx) => {
    const cityName = ctx.message.text;
    console.log(ctx.message)
   fetch(weatherUrl(cityName))
    .then((response) => response.json())
    .then((temp) => {

        
        const message = ` 
        Температура в ${cityName}: ${temp.main.temp}°, ${temp.weather[0].description}`
        ctx.reply(message);
        // ctx.reply(`Погода: ${temp.weather[0].description}`)
        
    })
    .catch(ctx.reply)

})




bot.launch();