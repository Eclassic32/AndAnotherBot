// Функции для использования другими кодами
module.exports = {
    command: async function (inter, opt){
        // Конвертирует ввод пользователя на милисекунды
        const endTime = (opt[0] * 3600 + opt[1]*60 + opt[2]) * 1000;
        // Равняется на введенный текс пользователем
        const cmdText = opt[3];

        remind(endTime, cmdText, inter);

        // Сразу после запуска коммады пишет в чат информацию
        return (`Remider will ping in ${opt[0]}h, ${opt[1]}m, ${opt[2]}s with text: \n${opt[3]}`);
    }
};

function remind(time, msg, inter) {
    // Упоминает пользователья который написал в чат
    const user = inter.user;
    console.log(inter);

    // Запускает комманду внутри через "time" милисекунд
    setTimeout(() => {
        // Пишет в тот же чат где было запущена комманда
        inter.channel.send(`Reminding ${user} of: \n${msg}`);
    }, time, 'msg');
}

