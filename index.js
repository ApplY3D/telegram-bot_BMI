const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const WizardScene = require('telegraf/scenes/wizard')
const bmiValuePrint = require('./bmiValuePrint')
const languagePack = require("./languagePack")

const keys = require('./keys/')

const TELEGRAM_BOT_TOKEN = keys.TELEGRAM_BOT_TOKEN

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

const createScene = new WizardScene('create',
    (ctx) => {
        ctx.reply(languagePack.RU.steps[0])
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.wizard.state.weight = +ctx.message.text
        ctx.reply(languagePack.RU.steps[1])
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.wizard.state.height = +ctx.message.text / 100
        const bmi = ctx.wizard.state.weight / ctx.wizard.state.height / ctx.wizard.state.height
        ctx.reply(bmiValuePrint(bmi))
        return ctx.scene.leave()
    },

)

const stage = new Stage()
stage.register(createScene)

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => ctx.scene.enter('create'))

bot.launch().then(() => {
    console.log('Bot started')
})