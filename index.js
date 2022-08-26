const { Telegraf, Markup } = require('telegraf')
// const { Markup } = require('telegraf/typings/markup')
require('dotenv').config()
const text = require('./const')





const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'человек'} ${ctx.message.from.last_name ? ctx.message.from.last_name : 'человек'}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('what', async (ctx) => {
   try {
      await ctx.replyWithHTML('<b>прикол</b>', Markup.inlineKeyboard(
         [
            [Markup.button.callback('что-то', 'btn_1'), Markup.button.callback('еще', 'btn_2')],
            [Markup.button.callback('прикольное', 'btn_3')],
         ]
      ))
   } catch (e) {
      console.error(e);
   }


})
function addActionBot(name, src, text) {
   bot.action(name, async (ctx) => {
      try {
         await ctx.answerCbQuery()
         if(src !== false) {
            await ctx.replyWithPhoto({
               sourse: src
            })
         }
         await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
         })
      } catch (e) {
         console.error(e);
      }
   })
}
addActionBot('btn_1', false, text.text1)
addActionBot('btn_2', './img/1.jpg', text.text2)
addActionBot('btn_3', './img/2.jpg', text.text3)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

