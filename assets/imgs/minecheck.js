const fetch = require('node-fetch');

f();


async function f() {
    try{
        const response = await fetch('https://minecraft-api.com/api/ping/ec32.aternos.me/47219/json');
        const jsonres = await response.json();
        console.log(response);
        console.log(jsonres.description.text);
    } catch (e){
        console.log(e);
    }
}


// 'https://minecraft-api.com/api/ping/ec32.aternos.me/47219/json'
