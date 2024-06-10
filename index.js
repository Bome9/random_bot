const TelegramBot = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require('./options')
const token = "6878243896:AAGdLHv5TMm2Fr8mB-51L5HQRd4lJA-CpKc";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const chats = {};



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'I am thinking of a number from 1 to 10. Try to guess it');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess a number', gameOptions);
}

const start = () => {

    bot.setMyCommands([
        { command: '/hello', description: 'Say hello' },
        { command: '/stop', description: 'Stop bot' },
        { command: '/game', description: 'Start game' },
    ])

    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Hello, I am a bot');
        }

        if (text === '/hello') {
            return bot.sendMessage(chatId, 'CAACAgIAAxkBAAEBRCRgfjNrSi0MmU-Tc4iRmPQW1cZOxgACIAADrWW8FLJjYOpeHcHZLwQ');
        }

        if (text === '/stop') {
            return bot.sendMessage(chatId, 'Bye');
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'I don\'t understand');

    });

    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id;
        const data = msg.data;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data == chats[chatId]) {
            return await bot.sendMessage(chatId, `You guessed right, the number was ${chats[chatId]}`, againOptions);
        } else {
            return await bot.sendMessage(chatId, `You guessed wrong, the number was ${chats[chatId]}`, againOptions);
        }

    });
}

start()
