/*

  !- Credits By Skyzopedia
  https://wa.me/6285624297894
  
*/

const fs = require('fs');
const chalk = require('chalk');
const { version } = require("./package.json")

//~~~~~~~~~~~~< Settings Bot >~~~~~~~~~~~~\\

global.ownernumber = '6283133675770'
global.ownername = 'Hostoria Luxe'
global.botNumber = '62882022896749'
global.botname = 'Luxe Bot'
global.version = '0.0.0'
global.footer = 'Luxe Bot © 2025'
global.author = 'LuxeBot'
global.packname = 'Luxe Bot WhatsApp'
global.lokasi = 'Indonesia'
global.prefa = '/'; // Prefix
global.tempatDB = 'database.json'; // Tempat Database
global.sessionName = 'session'; // Nama Folder Sesi Bot Kamu

//~~~~~~~~~ Settings Orderkuota ~~~~~~~~//
global.pinH2H = "-"
global.passwordH2H = "-"
global.merchantIdOrderKuota = "-"
global.apiOrderKuota = "-"
global.qrisOrderKuota = "-"

//~~~~~~~~~< Settings Api Pterodactyl >~~~~~~~~~\\
global.domain = 'https://mirakel.hiracans.my.id';
global.apikey = 'ptla_hg4gSI2vgxlq2Ubm01jxGrYQvYLlzulQ1Z7Vjzamhhw';
global.capikey = 'ptlc_dIvcSTj6XG2qhOuPAV6lZ54Dnc5UdT5narsAszsJJQt';
global.whatsapp = '5';
global.eggsnya = '15',
global.location3 = '1';

//~~~~~~~~~< Settings Informasi >~~~~~~~~~\\
global.linkgroup = ''
global.linkSaluran = ""
global.linkidchannel = ''
global.linkdiscord = ''
global.linkyt = ''
global.linkig = ''
global.linktelegram = ''
global.linkwebsite = ''

//~~~~~~~~~~~~< Settings Images >~~~~~~~~~~~~\\
global.images = {
    menu: "",
    reply: "",
    proses: "",
    done: "",
    send: "",
    defoutpp: ""
}

//~~~~~~~ Settings Api Subdomain ~~~~~~~//
global.subdomain = {
"serverku.biz.id": {
"zone": "4e4feaba70b41ed78295d2dcc090dd3a", 
"apitoken": "d6kmqwlvi0qwCyMxoGuc3EBAYRYvbulhjhR9T0I7"
}, 
"privatserver.my.id": {
"zone": "699bb9eb65046a886399c91daacb1968", 
"apitoken": "fnl7ixlJ-Y-7zxJ7EUGEXitfmfLiPGW985iXobdu"
}, 
"panelwebsite.biz.id": {
"zone": "2d6aab40136299392d66eed44a7b1122", 
"apitoken": "ImdyjF7XVU7ObDbdCr7LwSUZ4eDQJ-QozAbUIWoF"
}, 
"mypanelstore.web.id": {
"zone": "c61c442d70392500611499c5af816532", 
"apitoken": "ImdyjF7XVU7ObDbdCr7LwSUZ4eDQJ-QozAbUIWoF"
}, 
"pteroserver.us.kg": {
"zone": "f693559a94aebc553a68c27a3ffe3b55", 
"apitoken": "ImdyjF7XVU7ObDbdCr7LwSUZ4eDQJ-QozAbUIWoF"
}, 
"digitalserver.us.kg": {
"zone": "df13e6e4faa4de9edaeb8e1f05cf1a36", 
"apitoken": "ImdyjF7XVU7ObDbdCr7LwSUZ4eDQJ-QozAbUIWoF"
}, 
"shopserver.us.kg": {
"zone": "54ca38e266bfdf2dcdb7f51fd79c2db5", 
"apitoken": "ImdyjF7XVU7ObDbdCr7LwSUZ4eDQJ-QozAbUIWoF"
}
}

//~~~~~~~~~~ Settings Message ~~~~~~~~//
global.mess = {
	owner: "*[ Akses Ditolak ]*\nFitur ini hanya untuk owner bot!",
	admin: "*[ Akses Ditolak ]*\nFitur ini hanya untuk admin grup!",
	botAdmin: "*[ Akses Ditolak ]*\nFitur ini hanya untuk ketika bot menjadi admin!",
	group: "*[ Akses Ditolak ]*\nFitur ini hanya untuk dalam grup!",
	private: "*[ Akses Ditolak ]*\nFitur ini hanya untuk dalam private chat!",
	prem: "*[ Akses Ditolak ]*\nFitur ini hanya untuk user premium!",
	wait: 'Loading...',
	error: 'Error!',
	done: 'Done'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})