
require('./lib/listmenu');
const {
	downloadContentFromMessage,
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	InteractiveMessage,
	getContentType
} = require('@whiskeysockets/baileys');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const { color } = require('./lib/color');
const cron = require('node-cron');
const didyoumean = require('didyoumean');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const fsx = require('fs-extra');
const gis = require('g-i-s');
const gtts = require('node-gtts');
const moment = require('moment-timezone');
const ms = require('parse-ms');
const nou = require('node-os-utils');
const os = require('os');
const path = require('path');
const PhoneNumber = require('awesome-phonenumber');
const { performance } = require('perf_hooks');
const { randomBytes } = require('crypto');
const speed = require('performance-now');
const similarity = require('similarity');
const toMS = require('ms');
const translate = require('translate-google-api');
const util = require('util');
const yts = require('yt-search');
const readmore = String.fromCharCode(8206).repeat(4001);

const { 
	igdl, 
	ttdl, 
	fbdown, 
	twitter, 
	youtube 
} = require('btch-downloader');

const { 
	addAfkUser, 
	checkAfkUser, 
	getAfkId, 
	getAfkPosition, 
	getAfkReason, 
	getAfkTime 
} = require('./lib/afk');

const { 
	addFilter, 
	addSpam, 
	isFiltered, 
	isSpam, 
	ResetSpam 
} = require('./lib/antispam');

const { 
	addPremiumUser, 
	checkPremiumUser, 
	expiredCheck, 
	getAllPremiumUser, 
	getPremiumExpired, 
	getPremiumPosition 
} = require('./lib/premium');

const {
	addSewaGroup,
	getSewaExpired,
	getSewaPosition,
	checkSewaExpired,
	checkSewaGroup,
	getAllSewaGroups
} = require('./lib/sewa');

const { 
	exec, 
	execSync, 
	spawn 
} = require("child_process");

const { 
	toAudio, 
	toPTT, 
	toVideo 
} = require('./lib/converter');

const { 
	smsg, 
	await, 
	clockString, 
	delay, 
	enumGetKey, 
	fetchBuffer, 
	fetchJson, 
	format, 
	formatDate, 
	formatp, 
	generateProfilePicture, 
	getBuffer, 
	getGroupAdmins, 
	getRandom, 
	isUrl, 
	json, 
	logic, 
	msToDate, 
	parseMention, 
	sizeLimit, 
	runtime, 
	sleep, 
	sort, 
	toNumber 
} = require('./lib/myfunc');

const { 
	CatBox, 
	fileIO, 
	pomfCDN, 
	uploadFile
} = require('./lib/uploader');

const { 
	gameSlot, 
	gameCasinoSolo, 
	gameMerampok, 
	daily, 
	transferLimit, 
	transferUang, 
	buy, 
	setUang, 
	setLimit 
} = require('./lib/game');

const { 
	createUser,
	createServer,
	getEggStartupCommand,
	manageServer,
	deleteServer,
	deleteUser
} = require('./lib/cpanel');

const {
	getDnsRecords,
	createDnsRecord,
	deleteDnsRecord
} = require('./lib/csubdo');

const {
	jadibot,
	stopjadibot,
	listjadibot
} = require('./jadibot');

const threshold = 0.72

const alightScrape = require('./lib/scrapers/alightmotion');
const BlueArchive = require('./lib/scrapers/bluearchive');
const BukaLapak = require('./lib/scrapers/bukalapak');
const chatSimi = require('./lib/scrapers/simsimi');
const fdown = require('./lib/scrapers/fdown');
const gempa = require('./lib/scrapers/bmkg');
const GDriveDl = require('./lib/scrapers/drive');
const halodoc = require('./lib/scrapers/halodoc');
const hentai = require('./lib/scrapers/hentai');
const Instagram = require('./lib/scrapers/instagram');
const jktNews = require('./lib/scrapers/jktNews');
const Kusonime = require('./lib/scrapers/kusonime');
const lyrics = require('./lib/scrapers/lyrics');
const otakuDesu = require('./lib/scrapers/otakudesu');
const PlayStore = require('./lib/scrapers/playstore');
const quotesAnime = require('./lib/scrapers/quotesAnime');
const savePin = require('./lib/scrapers/savepin');
const scrapeSoundCloud = require('./lib/scrapers/soundcloud');
const upscale = require('./lib/scrapers/upscale');

const anon = require('./lib/menfess');
const { remini } = require('./lib/remini');

const { 
	ffCh, 
	ffChSkill, 
	ffNews, 
	ffPet, 
	ffPetSkill 
} = require('./lib/scrapers/freefire');

const {
	komiku,
	detail
} = require('./lib/scrapers/komiku');

const { 
	tiktokSearchVideo, 
	tiktokDownloaderVideo 
} = require('./lib/scrapers/tiktok');

const { 
	wallpaper, 
	wikimedia, 
	happymod, 
	ringtone, 
	umma, 
	githubstalk, 
	npmstalk, 
	mlstalk 
} = require('./lib/scrapers/scraper');

let contacts = JSON.parse(fs.readFileSync('./database/contacts.json'));
let userActivity = JSON.parse(fs.readFileSync('./database/user.json'));
let owner = JSON.parse(fs.readFileSync('./database/owner.json'));
let prem = JSON.parse(fs.readFileSync('./database/premium.json'));


let asahotak = {};
let caklontong = {};
let enhance = {};
let lengkapikalimat = {};
let mathgame = {};
let siapaaku = {};
let susunkata = {};
let tekateki = {};
let tebakaplikasi = {};
let tebakbendera = {};
let tebakchara = {};
let tebakff = {};
let tebakgame = {};
let tebakgambar = {};
let tebakhewan = {};
let tebakhero = {};
let tebakjkt48 = {};
let tebakkimia = {};
let tebakkabupaten = {};
let tebakkalimat = {};
let tebakkata = {};
let tebaklirik = {};
let tebaklogo = {};
let tebakml = {};
let tebaktebakan = {};
let verifyNumber = {};

try {
	let rawData = fs.readFileSync(`./database/${tempatDB}`);
	global.db.data = JSON.parse(rawData) || {};
} catch (err) {
	console.error(`⚠️ Gagal memuat ${tempatDB}, menggunakan struktur default.`);
	global.db.data = {};
}

global.db.data = {
	sticker: global.db.data.sticker || {},
	database: global.db.data.database || {},
	game: global.db.data.game || {},
	others: global.db.data.others || {},
	users: global.db.data.users || {},
	rpg: global.db.data.rpg || {},
	groups: global.db.data.groups || {},
	settings: global.db.data.settings || {},
};

const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
const time2 = moment.tz('Asia/Jakarta').format('HH:mm:ss');

let ucapanWaktu = "Selamat Malam 🌌";

if (time2 < "05:00:00") {
	ucapanWaktu = "Selamat Pagi 🌄";
} else if (time2 < "11:00:00") {
	ucapanWaktu = "Selamat Pagi 🌄";
} else if (time2 < "15:00:00") {
	ucapanWaktu = "Selamat Siang 🌅";
} else if (time2 < "18:00:00") {
	ucapanWaktu = "Selamat Sore 🌇";
} else if (time2 < "19:00:00") {
	ucapanWaktu = "Selamat Petang 🌆";
}

async function checkBandwidth() {
	let ind = 0;
	let out = 0;
	for (let i of await require("node-os-utils").netstat.stats()) {
		ind += parseInt(i.inputBytes);
		out += parseInt(i.outputBytes);
	}
	return {
		download: formatp(ind),
		upload: formatp(out),
	};
};

module.exports = LuxeBot = async (LuxeBot, m, msg, chatUpdate, store) => {
	try {
		const {
			type,
			quotedMsg,
			mentioned,
			now,
			fromMe
		} = m
		const body = m.body
		const budy = m.text
		const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : prefa
		const isCmd = body.startsWith(prefix)
		const isCommand = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ""
		const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
		const args = body.trim().split(/ +/).slice(1);
		const botNumber = await LuxeBot.decodeJid(LuxeBot.user.id);
		const pushname = m.pushName || "No Name"
		const text = q = args.join(" ");
		const getQuoted = (m.quoted || m);
		const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || '';
		const qmsg = (quoted.msg || quoted);

		const isMedia = /image|video|sticker|audio/.test(mime);
		const isImage = (type == 'imageMessage');
		const isVideo = (type == 'videoMessage');
		const isAudio = (type == 'audioMessage');
		const isDocument = (type == 'documentMessage');
		const isLocation = (type == 'locationMessage');
		const isContact = (type == 'contactMessage');
		const isSticker = (type == 'stickerMessage');
		const isText = (type == 'textMessage');
		const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage');
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
		const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
		const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
		const isGroup = m.key.remoteJid.endsWith('@g.us');
		const groupMetadata = m.isGroup ? await LuxeBot.groupMetadata(m.chat).catch(e => {}) : ''
		const groupName = m.isGroup ? groupMetadata.subject : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
		const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const groupOwner = m.isGroup ? groupMetadata.owner : ''
		const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false

		if (m.isGroup) {
			m.metadata = await LuxeBot.groupMetadata(m.chat)
			m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, []))
			m.isAdmin = m.admins.some((b) => b.id === m.sender)
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
		}		
		const clientId = LuxeBot.user.id.split(':')[0];
		const senderbot = m.key.fromMe ? LuxeBot.user.id.split(':')[0] + "@s.whatsapp.net" || LuxeBot.user.id : m.key.participant || m.key.remoteJid;
		const senderId = senderbot.split('@')[0];
		const isBot = clientId.includes(senderId);
		const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isPremium = [botNumber, ...prem].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		
		let timestamp = speed();
		let latensi = speed() - timestamp;
				
//~~~~~~~~~ Console Message ~~~~~~~~//
if (isCmd && !m.isNewsletter) {
console.log(chalk.black.bgWhite('[ MESSAGE ]:'),chalk.black.bgGreen(new Date), chalk.black.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.black(chalk.bgCyanBright('[ FROM ] :'),chalk.bgYellow(m.pushName),chalk.bgHex('#FF449F')(m.sender),chalk.bgBlue('(' + (m.isGroup ? m.pushName : 'Private Chat', m.chat) + ')')));
};

if (prefix && command) {
    let caseNames = getCaseNames();
    function getCaseNames() {
        const fs = require('fs');
        try {
            const data = fs.readFileSync('hostoria.js', 'utf8');
            const casePattern = /case\s+'([^']+)'/g;
            const matches = data.match(casePattern);
            if (matches) {
                const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
                return caseNames;
            } else {
                return [];
            }
        } catch (err) {
            console.log('Terjadi kesalahan:', err);
            return [];
        }
    }

    let noPrefix = command;
    let mean = didyoumean(noPrefix, caseNames);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
        let response = `Maaf, command yang kamu berikan salah. Mungkin ini yang kamu maksud:\n\n•> ${prefix + mean}\n•> Kemiripan: ${similarityPercentage}%`;
        
        m.reply({
            text: response,
            footer: footer,
            buttons: [
                {
                    buttonId: prefix + mean,
                    buttonText: {
                        displayText: prefix + mean
                    }
                },
                {
                    buttonId: `${prefix}menu`,
                    buttonText: {
                        displayText: "📜 Kembali ke Menu"
                    }
                },
                {
                    buttonId: `${prefix}owner`,
                    buttonText: {
                        displayText: "👑 Owner"
                    }
                }
            ]
        });
    }
}
//~~~~~~~~~~~ Fake Quoted ~~~~~~~~~~//

const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}

const qtext2 = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${ownername}`}}}

const qlocJpm = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `WhatsApp Bot ${ownername}`,jpegThumbnail: ""}}}

const qlocPush = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `WhatsApp Bot ${ownername}`,jpegThumbnail: ""}}}

const qpayment = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Simple Botz"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}

const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `${ownername} - Marketplace`, "description": null, "currencyCode": "IDR", "priceAmount1000": "999999999999999", "retailerId": `Powered By ${ownername}`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `${botname} By ${ownername}`,jpegThumbnail: ""}}}



if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antilink === true) {
    let detectedLinks = /(https?:\/\/[^\s]+|\.my\.id|\.web\.id|\.com)/gi;

    if (budy.match(detectedLinks) && !m.isAdmin) {
        if (!m.isBotAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } });
        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena mengirim link yang dilarang.`, mentions: [m.sender] });

        // Kirim ke private chat
        await LuxeBot.sendMessage(m.sender, { 
            text: `Maaf kak, kamu di-kick karena mengirim link yang dilarang.\n\n` +
                  `*Link:* ${budy}\n` +
                  `*Grup:* ${m.chat}`
        });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antilink2 === true) {
    let detectedLinks = /(https?:\/\/[^\s]+|\.my\.id|\.web\.id|\.com)/gi;

    if (budy.match(detectedLinks) && !m.isAdmin) {
        if (!m.isBotAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } });
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, link tidak diperbolehkan di grup ini. Pesanmu telah dihapus.`, mentions: [m.sender] 
        });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antilokasi === true) {
    if (m.message?.liveLocationMessage || m.message?.locationMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } });
        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena mengirim lokasi.`, mentions: [m.sender] });

        // Kirim ke private chat
        await LuxeBot.sendMessage(m.sender, { 
            text: `Maaf kak, kamu di-kick karena mengirim lokasi di grup ini.\n\n*Grup:* ${m.chat}`
        });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antilokasi2 === true) {
    if (m.message?.liveLocationMessage || m.message?.locationMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } });
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, berbagi lokasi tidak diperbolehkan di grup ini. Pesanmu telah dihapus.`, mentions: [m.sender]
        });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antisebutstatus === true) {
    if (m.message?.groupStatusMentionMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena menyebut status di grup.`, mentions: [m.sender] });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antisebutstatus2 === true) {
    if (m.message?.groupStatusMentionMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, menyebut status tidak diperbolehkan. Pesanmu telah dihapus.`, mentions: [m.sender] });
    }
}

// Fitur Anti Sticker WhatsApp (Kick dan Hapus)
if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antisticker === true) {
    if (m.message?.stickerMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena mengirim stiker di grup.`, mentions: [m.sender] });
    }
}

// Fitur Anti Sticker WhatsApp (Hapus Saja)
if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antisticker2 === true) {
    if (m.message?.stickerMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, mengirim stiker tidak diperbolehkan. Pesanmu telah dihapus.`, mentions: [m.sender] });
    }
}

// Fitur Anti Audio WhatsApp (Kick dan Hapus)
if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antiaudio === true) {
    if (m.message?.audioMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena mengirim audio di grup.`, mentions: [m.sender] });
    }
}

// Fitur Anti Audio WhatsApp (Hapus Saja)
if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antiaudio2 === true) {
    if (m.message?.audioMessage) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, mengirim audio tidak diperbolehkan. Pesanmu telah dihapus.`, mentions: [m.sender] });
    }
}

if (m.isGroup && db.data.groups[m.chat] && db.data.groups[m.chat].antispam === true) {
    db.data.users[m.sender] = db.data.users[m.sender] || { spamCount: 0 };
    db.data.users[m.sender].spamCount += 1;
    
    if (db.data.users[m.sender].spamCount >= 5) {
        if (!m.isBotAdmin || m.isAdmin) return;

        await LuxeBot.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await LuxeBot.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}, kamu di-kick karena spam di grup.`, mentions: [m.sender] });
        db.data.users[m.sender].spamCount = 0;
    }
}


//~~~~~~~~~ Function Main ~~~~~~~~~~//

const capital = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const example = (teks) => {
    return `*Contoh :* ${prefix + command} ${teks}`;
}

function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
    const length = 5;
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LuxeReply = async (teks) => {
    LuxeBot.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            "externalAdReply": {
                "showAdAttribution": true,
                "containsAutoReply": true,
                "title": `${global.botname}`,
                "body": `${pushname} 👋🏻`,
                "previewType": "VIDEO",
                "thumbnailUrl": 'https://cdn.itzky.us.kg/file/mnlZyS7jAX.png',
                "sourceUrl": 'https://instagram.com/jr_danzz'
            }
        }
    }, { quoted: qtext });
}


try {
	const botNumber = await LuxeBot.decodeJid(LuxeBot.user.id);
	const isNumber = x => typeof x === 'number' && !isNaN(x)
     const isBoolean = x => typeof x === 'boolean' && Boolean(x)

    // User initialization
    let user = global.db.data.users[m.sender];
    if (user) {
        if (!('rpg' in user)) user.rpg = false;
        if (!('daftar' in user)) user.daftar = false;
        if (!('vip' in user)) user.vip = false;
        if (!('badword' in user)) user.badword = 0;
        if (!('title' in user)) user.title = '';
        if (!('serialNumber' in user)) user.serialNumber = randomBytes(16).toString('hex');
        if (!('nick' in user)) user.nick = LuxeBot.getName(m.sender);
        if (!('nama' in user)) user.nama = 'Guest';
        if (!('pacar' in user)) user.pacar = '';
        if (!('askot' in user)) user.askot = '';
        if (!isNumber(user.umur)) user.umur = 0;
        if (!isPremium) user.premium = false;
        if (!('lastclaim' in user)) user.lastclaim = new Date().getTime();
        if (!('lastrampok' in user)) user.lastrampok = new Date().getTime();
        if (!('pctime' in user)) user.pctime = '';
        if (!isNumber(user.coins)) user.coins = 0;
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.rank)) user.rank = 700;
        if (!isNumber(user.level)) user.level = 0;
    } else {
        global.db.data.users[m.sender] = {
            rpg: false,
            daftar: false,
            vip: false,
            badword: 0,
            title: '',
            serialNumber: randomBytes(16).toString('hex'),
            nick: LuxeBot.getName(m.sender),
            nama: 'Guest',
            pacar: '',
            askot: '',
            umur: 0,
            premium: !isPremium,
            lastclaim: new Date().getTime(),
            lastrampok: new Date().getTime(),
            pctime: '',
            coins: 0,
            exp: 0,
            rank: 700,
            level: 0
        };
    }

    // RPG initialization
    let rpg = global.db.data.rpg[m.sender];
    if (rpg) {
        if (!('kapal' in rpg)) rpg.kapal = false;
        if (!('darahkapal' in rpg)) rpg.darahkapal = 100;
        if (!('pickaxe' in rpg)) rpg.pickaxe = false;
        if (!('darahpickaxe' in rpg)) rpg.darahpickaxe = 100;
        if (!('kapak' in rpg)) rpg.kapak = false;
        if (!('darahkapak' in rpg)) rpg.darahkapak = 100;
        if (!('bzirah' in rpg)) rpg.bzirah = false;
        if (!('darahbzirah' in rpg)) rpg.darahbzirah = 100;
        if (!('pedang' in rpg)) rpg.pedang = false;
        if (!('darahpedang' in rpg)) rpg.darahpedang = 100;
        if (!('darahuser' in rpg)) rpg.darahuser = 100;
        if (!('rumah' in rpg)) rpg.rumah = 0;
        if (!('besi' in rpg)) rpg.besi = 4;
        if (!('kayu' in rpg)) rpg.kayu = 2;
        if (!('emas' in rpg)) rpg.emas = 0;
        if (!('perak' in rpg)) rpg.perak = 0;
        if (!('batubara' in rpg)) rpg.batubara = 0;
        if (!('bulu' in rpg)) rpg.bulu = 0;
        if (!('kain' in rpg)) rpg.kain = 0;
        if (!('wilayah' in rpg)) rpg.wilayah = "Indonesia";
        if (!('wilayahrumah' in rpg)) rpg.wilayahrumah = "Indonesia";
        if (!('musuh' in rpg)) rpg.musuh = 0;
        if (!('ikan' in rpg)) rpg.ikan = 0;
        if (!('domba' in rpg)) rpg.domba = 0;
        if (!('sapi' in rpg)) rpg.sapi = 0;
        if (!('ayam' in rpg)) rpg.ayam = 0;
        if (!('bank' in rpg)) rpg.bank = 0;
        if (!('burutime' in rpg)) rpg.burutime = 0;
        if (!('lastclaim' in rpg)) rpg.lastclaim = 0;
        if (!('lastdagang' in rpg)) rpg.lastdagang = 0;
        if (!('lastbansos' in rpg)) rpg.lastbansos = 0;
        if (!('lastkerja' in rpg)) rpg.lastkerja = 0;
        if (!('lastrampok' in rpg)) rpg.lastrampok = 0;
    } else {
        global.db.data.rpg[m.sender] = {
            kapal: false,
            darahkapal: 100,
            pickaxe: false,
            darahpickaxe: 100,
            kapak: false,
            darahkapak: 100,
            bzirah: false,
            darahbzirah: 100,
            pedang: false,
            darahpedang: 100,
            darahuser: 100,
            rumah: 0,
            besi: 4,
            kayu: 2,
            emas: 0,
            perak: 0,
            batubara: 0,
            bulu: 0,
            kain: 0,
            wilayah: "Indonesia",
            wilayahrumah: "Indonesia",
            musuh: 0,
            ikan: 0,
            domba: 0,
            sapi: 0,
            ayam: 0,
            bank: 0,
            burutime: 0,
            lastclaim: 0,
            lastdagang: 0,
            lastbansos: 0,
            lastkerja: 0,
            lastrampok: 0
        };
    }

if (m.isGroup) {
    let groups = global.db.data.groups[m.chat];
    if (groups) {
        if (!('antilink' in groups)) groups.antilink = false;
        if (!('antilink2' in groups)) groups.antilink2 = false;
        if (!('antilokasi' in groups)) groups.antilokasi = false;
        if (!('antilokasi2' in groups)) groups.antilokasi2 = false;
        if (!('antisebutstatus' in groups)) groups.antisebutstatus = false;
        if (!('antisebutstatus2' in groups)) groups.antisebutstatus2 = false;          
        if (!('antisticker' in groups)) groups.antisticker = false;          
        if (!('antisticker2' in groups)) groups.antisticker2 = false;
        if (!('antiaudio' in groups)) groups.antiaudio = false;
        if (!('antiaudio2' in groups)) groups.antiaudio2 = false;             
        if (!('antispam' in groups)) groups.antispam = false;        
    } else {
        global.db.data.groups[m.chat] = {
            antilink: false,
            antilink2: false,
            antilokasi: false,
            antilokasi2: false,
            antisebutstatus: false,
            antisebutstatus2: false,
            antisticker: false,
            antisticker2: false,
            antiaudio: false,
            antiaudio2: false,
            antispam: false
        };
    }
}

    // Settings initialization
    let setting = global.db.data.settings[botNumber];
    if (setting) {
        if (!('totalhit' in setting)) setting.totalhit = 0;
        if (!('totalError' in setting)) setting.totalError = 0;
        if (!('online' in setting)) setting.online = false;
        if (!('safesearch' in setting)) setting.safesearch = false;
        if (!('autosticker' in setting)) setting.autosticker = false;
        if (!('autodownload' in setting)) setting.autodownload = false;
        if (!('autobio' in setting)) setting.autobio = false;
        if (!('autoread' in setting)) setting.autoread = false;
        if (!('autorecordtype' in setting)) setting.autorecordtype = false;
        if (!('autorecord' in setting)) setting.autorecord = false;
        if (!('autotype' in setting)) setting.autotype = false;
        if (!('autoblocknum' in setting)) setting.autoblocknum = false;
        if (!('onlygc' in setting)) setting.onlygc = false;
        if (!('onlypc' in setting)) setting.onlypc = false;
        if (!('watermark' in setting)) setting.watermark = { packname: global.packname, author: global.author };
        if (!('about' in setting)) setting.about = {
            bot: { nick: LuxeBot.getName(botNumber), alias: botname },
            owner: { nick: LuxeBot.getName(ownernumber + '@s.whatsapp.net'), alias: ownernumber }
        };
    } else {
        global.db.data.settings[botNumber] = {
            totalhit: 0,
            totalError: 0,
            online: false,
            safesearch: false,
            autosticker: false,
            autodownload: false,
            autobio: false,
            autoread: false,
            autorecordtype: false,
            autorecord: false,
            autotype: false,
            autoblocknum: false,
            onlygc: false,
            onlypc: false,
            watermark: { packname: global.packname, author: global.author },
            about: {
                bot: { nick: LuxeBot.getName(botNumber), alias: botname },
                owner: { nick: LuxeBot.getName(ownernumber + '@s.whatsapp.net'), alias: ownernumber }
            }
        };
    }

} catch (err) {
    console.error('⚠️ Terjadi kesalahan:', err);
}
   

const react = async () => {
    const emojis = ["🌷", "🤙", "😂", "🤣", "😭", "🫂", "💔", "😡"];
    for (const emoji of emojis) {
        await sleep(80);
        await LuxeBot.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
    }
    await sleep(50);
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await LuxeBot.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
};


async function getCookies() {
    try {
        const response = await axios.get('https://www.pinterest.com/csrf_error/');
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
            const cookies = setCookieHeaders.map(cookieString => {
                const cookieParts = cookieString.split(';');
                const cookieKeyValue = cookieParts[0].trim();
                return cookieKeyValue;
            });
            return cookies.join('; ');
        } else {
            console.warn('No set-cookie headers found in the response.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching cookies:', error);
        return null;
    }
}

 async function pinterest(query) {
    try {
        const cookies = await getCookies();
        if (!cookies) {
            console.log('Failed to retrieve cookies. Exiting.');
            return;
        }

        const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';

        const params = {
            source_url: `/search/pins/?q=${query}`,
            data: JSON.stringify({
                "options": {
                    "isPrefetch": false,
                    "query": query,
                    "scope": "pins",
                    "no_fetch_context_on_resource": false
                },
                "context": {}
            }),
            _: Date.now()
        };

        const headers = {
            'accept': 'application/json, text/javascript, */*, q=0.01',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en-US,en;q=0.9',            
            'cookie': cookies,            
            'dnt': '1',
            'referer': 'https://www.pinterest.com/',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
            'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"10.0.0"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'x-app-version': 'c056fb7',
            'x-pinterest-appstate': 'active',
            'x-pinterest-pws-handler': 'www/[username]/[slug].js',
            'x-pinterest-source-url': '/hargr003/cat-pictures/',
            'x-requested-with': 'XMLHttpRequest'
        };

        const { data } = await axios.get(url, {
            headers: headers,
            params: params
        })

        const container = [];
        const results = data.resource_response.data.results.filter((v) => v.images?.orig);
        results.forEach((result) => {
            container.push({
                upload_by: result.pinner.username,
                fullname: result.pinner.full_name,
                followers: result.pinner.follower_count,
                caption: result.grid_title,
                image: result.images.orig.url,
                source: "https://id.pinterest.com/pin/" + result.id,
            });
        });

        return container;
    } catch (error) {
        console.log(error);
        return [];
    }
}
//~~~~~~~~~~~ Command ~~~~~~~~~~~//

switch (command) {
case "allmenu": {
    LuxeBot.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    let teksmenu = `${menu(prefix)}`;

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}proses`, buttonText: { displayText: 'Proses 🔄' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu",
                sections: [{
                    title: "🔹 Opsi Menu",
                    rows: [
                        { header: "List Owner", "title": "Lihat Menu Owner", id: `${prefix}ownermenu` },
                        { header: "List Cpanel", "title": "Lihat Menu Cpanel", id: `${prefix}cpanelmenu` },
                        { header: "List Group", "title": "Lihat Menu Group", id: `${prefix}groupmenu` },
                        { header: "List Download", "title": "Lihat Menu Download", id: `${prefix}downloadmenu` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: teksmenu,
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: m });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "ownermenuuu": {
    LuxeBot.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    let teksmenu = `${ownermenu(prefix)}`;

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}menu`, buttonText: { displayText: 'Kembali 🔙' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu",
                sections: [{
                    title: "🔹 Opsi Menu",
                    rows: [
                        { header: "List Menu", "title": "Lihat Semua Menu", id: `${prefix}menu` },
                        { header: "List Cpanel", "title": "Lihat Menu Cpanel", id: `${prefix}cpanelmenu` },
                        { header: "List Group", "title": "Lihat Menu Group", id: `${prefix}groupmenu` },
                        { header: "List Download", "title": "Lihat Menu Download", id: `${prefix}downloadmenu` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: teksmenu,
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: m });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "cpanelmenu": {
    LuxeBot.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    let teksmenu = `${cpanelmenu(prefix)}`;

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}menu`, buttonText: { displayText: 'Kembali 🔙' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu",
                sections: [{
                    title: "🔹 Opsi Menu",
                    rows: [
                        { header: "List Menu", "title": "Lihat Semua Menu", id: `${prefix}menu` },
                        { header: "List Owner", "title": "Lihat Menu Owner", id: `${prefix}ownermenu` },
                        { header: "List Group", "title": "Lihat Menu Group", id: `${prefix}groupmenu` },
                        { header: "List Download", "title": "Lihat Menu Download", id: `${prefix}downloadmenu` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: teksmenu,
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: m });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "groupmenu": {
    LuxeBot.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    let teksmenu = `${groupmenu(prefix)}`;

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}menu`, buttonText: { displayText: 'Kembali 🔙' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu",
                sections: [{
                    title: "🔹 Opsi Menu",
                    rows: [
                        { header: "List Menu", "title": "Lihat Semua Menu", id: `${prefix}menu` },
                        { header: "List Owner", "title": "Lihat Menu Owner", id: `${prefix}ownermenu` },
                        { header: "List Cpanel", "title": "Lihat Menu Cpanel", id: `${prefix}cpanelmenu` },
                        { header: "List Download", "title": "Lihat Menu Download", id: `${prefix}downloadmenu` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: teksmenu,
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: m });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "downloadmenu": {
    LuxeBot.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    let teksmenu = `${downloadmenu(prefix)}`;

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}menu`, buttonText: { displayText: 'Kembali 🔙' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu",
                sections: [{
                    title: "🔹 Opsi Menu",
                    rows: [
                        { header: "List Menu", "title": "Lihat Semua Menu", id: `${prefix}menu` },
                        { header: "List Owner", "title": "Lihat Menu Owner", id: `${prefix}ownermenu` },
                        { header: "List Cpanel", "title": "Lihat Menu Cpanel", id: `${prefix}cpanelmenu` },
                        { header: "List Group", "title": "Lihat Menu Group", id: `${prefix}groupmenu` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: teksmenu,
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: m });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
//=====================================BUTTONS ADD=======================================\\
case "adddel": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: ${prefix}add <nomor>\nContoh: ${prefix}add 6285892928715`);
    }

    let nomor = args[0].replace(/[^0-9]/g, '');
    let cekNomor = await LuxeBot.onWhatsApp(nomor);
    if (cekNomor.length == 0) return LuxeReply(`❌ Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);

    const buttons = [
        { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
        { buttonId: `${prefix}ping`, buttonText: { displayText: 'Server 🌟' } }
    ];

    const flowActions = [{
        buttonId: `${prefix}owner`,
        buttonText: { displayText: '👑 Kenalan Sama Owner' },
        type: 4,
        nativeFlowInfo: {
            "name": "single_select",
            paramsJson: JSON.stringify({
                title: "📂 Pilih Menu Add",
                sections: [{
                    title: "🔹 Opsi Menu Add",
                    rows: [
                        { header: "addowner", "title": "Jadikan Owner", id: `${prefix}addowner ${nomor}` },
                        { header: "addprem", "title": "Jadikan Premium", id: `${prefix}addprem ${nomor}` },
                        { header: "delowner", "title": "Hapus Owner", id: `${prefix}delowner ${nomor}` },
                        { header: "delprem", "title": "Hapus Owner", id: `${prefix}delprem ${nomor}` }
                    ]
                }]
            })
        },
        viewOnce: true
    }];

    const buttonMessage = {
        headerType: 6,
        video: fs.readFileSync('./data/video/video.mp4'),
        gifPlayback: true,
        caption: "📋 Pilihan Add Nomor",
        footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
        buttons: [...buttons, ...flowActions],
        viewOnce: true,
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: global.linkidchannel,
                newsletterName: global.linkSaluran
            },
            externalAdReply: {
                title: `${botname} - ${version}`,
                body: "Anime",
                thumbnailUrl: `${global.images.images}`,
                sourceUrl: `${global.website}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                mentionedJid: [m.sender]
            }
        }
    };

    const muskk = {
        audio: fs.readFileSync('data/audio/audio.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    };

    await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: qtext });
    await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "addowner": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`addowner <nomor>\`\nContoh: \`addowner 6285892928715\``);
    }

    let bnnd = args[0].replace(/[^0-9]/g, '');
    let ceknye = await LuxeBot.onWhatsApp(bnnd);
    if (ceknye.length == 0) return LuxeReply(`❌ Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);

    owner.push(bnnd);
    fs.writeFileSync('./database/owner.json', JSON.stringify(owner));
    LuxeReply(`✅ Nomor ${bnnd} telah menjadi Owner!!!`);
}
break
case "addprem": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`addprem <nomor>\`\nContoh: \`addprem 6285892928715\``);
    }

    let premNum = args[0].replace(/[^0-9]/g, '');
    if (prem.includes(premNum)) return LuxeReply(`❌ Nomor sudah ada dalam daftar premium!`);

    prem.push(premNum);
    fs.writeFileSync('./database/premium.json', JSON.stringify(prem));
    LuxeReply(`✅ Nomor ${premNum} telah ditambahkan ke daftar premium!!!`);
}
break
case "delowner": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`delowner <nomor>\`\nContoh: \`delowner 6285892928715\``);
    }

    let ya = args[0].replace(/[^0-9]/g, '');
    let unp = owner.indexOf(ya);
    if (unp === -1) return LuxeReply(`❌ Nomor tidak ditemukan dalam daftar owner!`);

    owner.splice(unp, 1);
    fs.writeFileSync('./database/owner.json', JSON.stringify(owner));
    LuxeReply(`✅ Nomor ${ya} telah dihapus dari daftar owner!!!`);
}
break
case "delprem": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`delprem <nomor>\`\nContoh: \`delprem 6285892928715\``);
    }

    let premNum = args[0].replace(/[^0-9]/g, '');
    let unp = prem.indexOf(premNum);
    if (unp === -1) return LuxeReply(`❌ Nomor tidak ditemukan dalam daftar premium!`);

    prem.splice(unp, 1);
    fs.writeFileSync('./database/premium.json', JSON.stringify(prem));
    LuxeReply(`✅ Nomor ${premNum} telah dihapus dari daftar premium!!!`);
}
break
case "listowner": {
    let teks = '*Owner List*\n\n';
    for (let LuxeBot of owner) {
        teks += `- ${LuxeBot}\n`;
    }
    LuxeReply(teks);
}
break
case "listprem": {
    let teks = '*Premium List*\n\n';
    for (let LuxeBot of prem) {
        teks += `- ${LuxeBot}\n`;
    }
    LuxeReply(teks);
}
//===========================BATASAN BUTTONS ADD=========================================\\

//===========================BUTTONS CPANEL=========================================\\
break
case '1gb':
case '2gb':
case '3gb':
case '4gb':
case '5gb':
case '6gb':
case '7gb':
case '8gb':
case '9gb':
case '10gb':
case 'unli': {
    if (!isCreator && isPremium) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('Mohon Maaf Kamu Belum Bisa 😮‍💨');
    }
    let t = text.split(',');
    if (t.length < 2) {
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        return LuxeReply(`*Format salah!*\nPenggunaan:\n${prefix + command} username,nomor`);
    }
    
    let username = t[0].trim();
    let userContact = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    if (!userContact) return LuxeReply('Nomor pengguna tidak valid.');

    let originalUserContact = userContact.replace('@s.whatsapp.net', '');
    let waLink = `wa.me/${originalUserContact}`;

    const resources = {
        '1gb': { memory: 1000, disk: 150, cpu: 0 },
        '2gb': { memory: 2000, disk: 250, cpu: 0 },
        '3gb': { memory: 3000, disk: 350, cpu: 0 },
        '4gb': { memory: 4000, disk: 450, cpu: 0 },
        '5gb': { memory: 5000, disk: 550, cpu: 0 },
        '6gb': { memory: 6000, disk: 650, cpu: 0 },
        '7gb': { memory: 7000, disk: 750, cpu: 0 },
        '8gb': { memory: 8000, disk: 850, cpu: 0 },
        '9gb': { memory: 9000, disk: 950, cpu: 0 },
        '10gb': { memory: 10000, disk: 1050, cpu: 0 },
        'unli': { memory: 0, disk: 0, cpu: 0 },
    };
    let resource = resources[command];
    if (!resource) return LuxeReply('Pilihan tidak valid.');
    let { memory, disk, cpu } = resource;

    let password = generateRandomPassword();
    let email = `${username}@rmaxx.com`;
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    try {
        let createUserResponse = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
                email,
                username,
                first_name: username,
                last_name: "User",
                language: "en",
                password
            })
        });

        let userData = await createUserResponse.json();
        if (userData.errors) return LuxeReply(`Error: ${userData.errors[0].detail}`);
        let userId = userData.attributes.id;

        // Fetching nests and eggs
        let f2 = await fetch(`${domain}/api/application/nests/${whatsapp}/eggs/${global.eggsnya}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + apikey
            }
        });

        let eggData = await f2.json();
        if (eggData.errors) return LuxeReply(`Error fetching eggs: ${eggData.errors[0].detail}`);

        let createServerResponse = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey,
            },
            body: JSON.stringify({
                name: username,
                description: `Halo Jangan Rusuh dan Jangan Intip\nIni Nomor Kamu: ${originalUserContact}\nNomor Pengirim: ${m.sender.replace(/[^0-9]/g, '')}`,
                user: userId,
                egg: parseInt(global.eggsnya),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm install && npm start",
                environment: {
                    INST: "npm",
                    USER_UPLOAD: "0",
                    AUTO_UPDATE: "0",
                    CMD_RUN: "npm start"
                },
                limits: {
                    memory,
                    swap: 0,
                    disk,
                    io: 500,
                    cpu
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.location3)],
                    dedicated_ip: false,
                    port_range: [],
                },
            })
        });

        let serverData = await createServerResponse.json();
        if (serverData.errors) return LuxeReply(`Error: ${serverData.errors[0].detail}`);
        let serverId = serverData.attributes.id;

let detailMessage = `
*✅ Server dan Akun Berhasil Dibuat!*

📡 *Detail Server:*
> *🆔 ID Server:* ${serverId}
> *🔖 Username:* ${username}
> *🔒 Password:* ${password}
> *📧 Email:* ${email}

⚙️ *Spesifikasi:*
> *💾 Memory:* ${memory === 0 ? 'Unlimited' : `${memory} MB`}
> *📂 Disk:* ${disk === 0 ? 'Unlimited' : `${disk} MB`}
> *🖥️ CPU:* ${cpu === 0 ? 'Unlimited' : `${cpu}%`}

📅 *Tanggal Dibuat:* ${formattedDate}

🌐 *Login Pterodactyl:*
> *URL:* ${domain}/auth/login

📲 *Nomor Kamu:* ${waLink}
📩 *Nomor Pengirim:* wa.me/${m.sender.replace(/[^0-9]/g, '')}

*Simpan data ini dengan baik!*
        `;

        await LuxeBot.sendMessage(userContact, { text: detailMessage });

        LuxeReply(`✅ *Berhasil membuat server dan pengguna.*\nDetail telah dikirim ke nomor: ${t[1]}`);
    } catch (err) {
        console.error(err);
        LuxeReply('Yah gagal om...\n_silakan cek API Pterodactyl Anda_');
    }
}
break
case "createadmin": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('🚫 Mohon Maaf Kamu Belum Bisa 😮‍💨');
    }

    let t = text.split(',');
    if (t.length < 2) {
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        return LuxeReply(`⚠️ Format salah!\nPenggunaan:\n${prefix + command} nama,nomor`);
    }

    let name = t[0].trim();
    let nomor = t[1].replace(/[^0-9]/g, '');
    let userContact = nomor + '@s.whatsapp.net';
    let email = `${name}admin@rmaxx.com`;
    let password = generateRandomPassword();

    // Mendapatkan tanggal pembuatan akurat
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    try {
        // Membuat Admin User di Pterodactyl
        let createUserResponse = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
                email,
                username: name,
                first_name: name,
                last_name: "Admin",
                language: "en",
                password,
                root_admin: true // Memberikan akses admin
            })
        });

        let userData = await createUserResponse.json();
        if (userData.errors) return LuxeReply(`Error: ${userData.errors[0].detail}`);

        // Pesan detail login admin
        let detailMessage = `
*🎉 Akun Admin Berhasil Dibuat!*

📡 *Detail Admin:*
> *🔖 Username:* ${name}
> *🔒 Password:* ${password}
> *📧 Email:* ${email}

📅 *Tanggal Dibuat:* ${formattedDate}

🌐 *Login Pterodactyl:*
> *URL:* ${domain}/auth/login

*_Simpan Data Ini Dengan Baik! Jangan Sampai Hilang!_*
        `;

        // Kirim Detail ke Nomor Tujuan
        await LuxeBot.sendMessage(userContact, { text: detailMessage });

        // Pesan Sukses
        LuxeReply(`✅ *Admin berhasil dibuat!*\nDetail telah dikirim ke nomor: ${nomor}`);
    } catch (err) {
        console.error(err);
        LuxeReply('Yah gagal om...\n_silakan cek API Pterodactyl Anda_');
    }
}
break
case "listsrv": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('🚫 Mohon maaf, kamu belum memiliki izin untuk menggunakan perintah ini. 😮‍💨');
    }
    let page = args[0] ? args[0] : '1';
    try {
        // Fetch daftar server dari API
        let f = await fetch(domain + "/api/application/servers?page=" + page, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + apikey
            }
        });

        let res = await f.json();
        let servers = res.data;

        if (!servers || servers.length === 0) return LuxeReply("❌ Tidak ada data server yang ditemukan.");

        // Header pesan
        let messageText = `*📡 Daftar Server*\n\n`;
        messageText += `*Halaman:* ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `*Total Server:* ${res.meta.pagination.total}\n\n`;
        messageText += `=====================\n\n`;

        // Iterasi untuk setiap server
        for (let server of servers) {
            let s = server.attributes;

            try {
                // Fetch status server dari API client/server resources
                let f3 = await fetch(`${domain}/api/client/servers/${s.identifier}/resources`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + capikey
                    }
                });

                let data = await f3.json();
                let status = data.attributes?.current_state; // Status server dari Pterodactyl

                // Format tanggal pembuatan server
                let createdAt = new Date(s.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });

                // Tambahkan detail server ke pesan
                messageText += `*🆔 ID Server:* ${s.id}\n`;
                messageText += `*🔖 Nama Server:* ${s.name}\n`;
                messageText += `*⚙️ Status:* ${
                    status === "running"
                        ? "Running ✅"
                        : status === "starting"
                        ? "Starting 🔄"
                        : status === "stopping"
                        ? "Stopping 🛑"
                        : status === "offline"
                        ? "Offline ❌"
                        : "Unknown"
                }\n`;
                messageText += `*📄 Deskripsi:* ${s.description || "Tidak ada deskripsi"}\n`;
                messageText += `*📅 Tanggal Buat:* ${createdAt}\n`;
                messageText += `=====================\n\n`;
            } catch (err) {
                console.error(`Gagal mendapatkan status server ID: ${s.id}`, err);
                messageText += `*🆔 ID Server:* ${s.id}\n`;
                messageText += `*🔖 Nama Server:* ${s.name}\n`;
                messageText += `*⚠️ Status:* Gagal mengambil status server\n`;
                messageText += `=====================\n\n`;
            }
        }

        // Kirim pesan ke pengguna
        await LuxeBot.sendMessage(m.chat, { text: messageText }, { quoted: qtext });

        // Info jika ada halaman selanjutnya
        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            LuxeReply(`Gunakan perintah *${prefix}listsrv ${parseInt(res.meta.pagination.current_page) + 1}* untuk melihat halaman selanjutnya.`);
        }
    } catch (err) {
        console.error(err);
        LuxeReply("❌ Terjadi kesalahan saat mengambil data server. Silakan coba lagi nanti.");
    }
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "listusr": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('🚫 Mohon maaf, kamu belum memiliki izin untuk menggunakan perintah ini. 😮‍💨');
    }

    let page = args[0] ? args[0] : '1';
    let f = await fetch(domain + "/api/application/users?page=" + page, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
        }
    });

    let res = await f.json();
    let users = res.data;

    if (!users || users.length === 0) return LuxeReply("❌ Tidak ada data user yang ditemukan.");

    let messageText = `*📋 Daftar Pengguna*\n\n`;
    messageText += `*Halaman:* ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
    messageText += `*Total Pengguna:* ${res.meta.pagination.total}\n\n`;
    messageText += `=====================\n\n`;

    for (let user of users) {
        let u = user.attributes;
        messageText += `*🆔 ID Pengguna:* ${u.id}\n`;
        messageText += `*👤 Nama Pengguna:* ${u.username}\n`;
        messageText += `*📊 Status:* ${u.user?.server_limit === null ? 'Inactive ❌' : 'Active ✅'}\n`;
        messageText += `=====================\n\n`;
    }

    await LuxeBot.sendMessage(m.chat, { text: messageText }, { quoted: qtext });

    if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
        LuxeReply(`Gunakan perintah *${prefix}listusr ${res.meta.pagination.current_page + 1}* untuk melihat halaman selanjutnya.`);
    }
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "delsrv": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    try {
        let response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let data = await response.json();
        if (!data || !data.data || data.data.length === 0) {
            return LuxeReply("❌ Tidak ada server yang tersedia untuk dihapus.");
        }

        let buttons = [
            { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
            { buttonId: `${prefix}ping`, buttonText: { displayText: 'Server 🌟' } }
        ];

        let flowActions = [{
            buttonId: `${prefix}confirmdelsrv`,
            buttonText: { displayText: '🗑️ Pilih Server untuk Dihapus' },
            type: 4,
            nativeFlowInfo: {
                "name": "single_select",
                paramsJson: JSON.stringify({
                    title: "📂 Pilih Server",
                    sections: [{
                        title: "🔹 Daftar Server",
                        rows: data.data.map(server => ({
                            header: `🖥️ ${server.attributes.name} (${server.attributes.id})`,
                            title: `Status: ${server.attributes.status ? '🟢 Online' : '🔴 Offline'}`,
                            id: `${prefix}confirmdelsrv ${server.attributes.id}`
                        }))
                    }]
                })
            },
            viewOnce: true
        }];

        const buttonMessage = {
            headerType: 6,
            video: fs.readFileSync('./data/video/video.mp4'),
            gifPlayback: true,
            caption: "🗑️ Pilih server yang ingin dihapus:",
            footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
            buttons: [...buttons, ...flowActions],
            viewOnce: true,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.linkidchannel,
                    newsletterName: global.linkSaluran
                },
                externalAdReply: {
                    title: `${botname} - ${version}`,
                    body: "Anime",
                    thumbnailUrl: `${global.images.images}`,
                    sourceUrl: `${global.website}`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mentionedJid: [m.sender]
                }
            }
        };

        const muskk = {
            audio: fs.readFileSync('data/audio/audio.mp3'),
            mimetype: 'audio/mp4',
            ptt: true
        };

        await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: qtext });
        await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mengambil daftar server.");
    }
}
break
case "confirmdelsrv": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    let serverId = text.trim();
    if (!serverId) {
        return LuxeReply("⚠️ Format salah! Gunakan tombol untuk memilih server yang ingin dihapus.");
    }

    try {
        let response = await fetch(`${domain}/api/application/servers/${serverId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.status === 204) {
            return LuxeReply(`✅ *Server dengan ID ${serverId} berhasil dihapus dari Pterodactyl.*`);
        } else {
            let error = await response.json();
            return LuxeReply(`❌ Gagal menghapus server: ${JSON.stringify(error.errors[0], null, 2)}`);
        }
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mencoba menghapus server.");
    }
}
break
case "delusr": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    try {
        let response = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let data = await response.json();
        if (!data || !data.data || data.data.length === 0) {
            return LuxeReply("❌ Tidak ada user yang tersedia untuk dihapus.");
        }

        let buttons = [
            { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
            { buttonId: `${prefix}ping`, buttonText: { displayText: 'Server 🌟' } }
        ];

        let flowActions = [{
            buttonId: `${prefix}confirmdelusr`,
            buttonText: { displayText: '🗑️ Pilih User untuk Dihapus' },
            type: 4,
            nativeFlowInfo: {
                "name": "single_select",
                paramsJson: JSON.stringify({
                    title: "📂 Pilih User",
                    sections: [{
                        title: "🔹 Daftar User",
                        rows: data.data.map(user => ({
                            header: `👤 ${user.attributes.username} (${user.attributes.id})`,
                            title: `Email: ${user.attributes.email}`,
                            id: `${prefix}confirmdelusr ${user.attributes.id}`
                        }))
                    }]
                })
            },
            viewOnce: true
        }];

        const buttonMessage = {
            headerType: 6,
            video: fs.readFileSync('./data/video/video.mp4'),
            gifPlayback: true,
            caption: "🗑️ Pilih user yang ingin dihapus:",
            footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
            buttons: [...buttons, ...flowActions],
            viewOnce: true,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.linkidchannel,
                    newsletterName: global.linkSaluran
                },
                externalAdReply: {
                    title: `${botname} - ${version}`,
                    body: "Anime",
                    thumbnailUrl: `${global.images.images}`,
                    sourceUrl: `${global.website}`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mentionedJid: [m.sender]
                }
            }
        };

        const muskk = {
            audio: fs.readFileSync('data/audio/audio.mp3'),
            mimetype: 'audio/mp4',
            ptt: true
        };

        await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: qtext });
        await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mengambil daftar user.");
    }
}
break
case "confirmdelusr": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    let userId = text.trim();
    if (!userId) {
        return LuxeReply("⚠️ Format salah! Gunakan tombol untuk memilih user yang ingin dihapus.");
    }

    try {
        let response = await fetch(`${domain}/api/application/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.status === 204) {
            return LuxeReply(`✅ *User  dengan ID ${userId} berhasil dihapus dari Pterodactyl.*`);
        } else {
            let error = await response.json();
            return LuxeReply(`❌ Gagal menghapus user: ${JSON.stringify(error.errors[0], null, 2)}`);
        }
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mencoba menghapus user.");
    }
}
break
case "suspend": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    try {
        let response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let serverList = await response.json();
        if (!serverList || !serverList.data.length) {
            return LuxeReply("❌ Tidak ada server yang tersedia.");
        }

        const buttons = [
            { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
            { buttonId: `${prefix}ping`, buttonText: { displayText: 'Server 🌟' } }
        ];

        const flowActions = [{
            buttonId: `${prefix}confirmsuspend`,
            buttonText: { displayText: '🔹 Pilih Server untuk Suspend' },
            type: 4,
            nativeFlowInfo: {
                "name": "single_select",
                paramsJson: JSON.stringify({
                    title: "📂 Pilih Server",
                    sections: [{
                        title: "🔹 Daftar Server",
                        rows: serverList.data.map(server => ({
                            header: server.attributes.name,
                            title: `ID: ${server.attributes.id}`,
                            id: `${prefix}confirmsuspend ${server.attributes.id}` // Use server ID directly
                        }))
                    }]
                })
            },
            viewOnce: true
        }];

        const buttonMessage = {
            headerType: 6,
            video: fs.readFileSync('./data/video/video.mp4'),
            gifPlayback: true,
            caption: "🗑️ Pilih server yang ingin di-suspend:",
            footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
            buttons: [...buttons, ...flowActions],
            viewOnce: true,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.linkidchannel,
                    newsletterName: global.linkSaluran
                },
                externalAdReply: {
                    title: `${botname} - ${version}`,
                    body: "Anime",
                    thumbnailUrl: `${global.images.images}`,
                    sourceUrl: `${global.website}`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mentionedJid: [m.sender]
                }
            }
        };

        const muskk = {
            audio: fs.readFileSync('data/audio/audio.mp3'),
            mimetype: 'audio/mp4',
            ptt: true
        };

        await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: qtext });
        await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mengambil daftar server.");
    }
}
break
case "confirmsuspend": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    let serverId = text.trim();
    if (!serverId) {
        return LuxeReply("⚠️ Format salah! Gunakan tombol untuk memilih server yang ingin di-suspend.");
    }

    try {
        let response = await fetch(`${domain}/api/application/servers/${serverId}/suspend`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.status === 204) {
            return LuxeReply(`✅ *Server dengan ID ${serverId} berhasil di-suspend.*`);
        } else {
            let error = await response.json();
            return LuxeReply(`❌ Gagal suspend server: ${JSON.stringify(error.errors[0], null, 2)}`);
        }
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mencoba suspend server.");
    }
}
break
case "unsuspend": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    try {
        let response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let serverList = await response.json();
        if (!serverList || !serverList.data.length) {
            return LuxeReply("❌ Tidak ada server yang tersedia.");
        }

        const buttons = [
            { buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner 👤' } },
            { buttonId: `${prefix}ping`, buttonText: { displayText: 'Server 🌟' } }
        ];

        const flowActions = [{
            buttonId: `${prefix}confirmunsuspend`,
            buttonText: { displayText: '🔹 Pilih Server untuk Unsuspend' },
            type: 4,
            nativeFlowInfo: {
                "name": "single_select",
                paramsJson: JSON.stringify({
                    title: "📂 Pilih Server",
                    sections: [{
                        title: "🔹 Daftar Server",
                        rows: serverList.data.map(server => ({
                            header: server.attributes.name,
                            title: `ID: ${server.attributes.id}`,
                            id: `${prefix}confirmunsuspend ${server.attributes.id}`
                        }))
                    }]
                })
            },
            viewOnce: true
        }];

        const buttonMessage = {
            headerType: 6,
            video: fs.readFileSync('./data/video/video.mp4'),
            gifPlayback: true,
            caption: "🗑️ Pilih server yang ingin di-unsuspend:",
            footer: "✨ Luxe Bot - Your Friendly Assistant ✨",
            buttons: [...buttons, ...flowActions],
            viewOnce: true,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: global.linkidchannel,
                    newsletterName: global.linkSaluran
                },
                externalAdReply: {
                    title: `${botname} - ${version}`,
                    body: "Anime",
                    thumbnailUrl: `${global.images.images}`,
                    sourceUrl: `${global.website}`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mentionedJid: [m.sender]
                }
            }
        };

        const muskk = {
            audio: fs.readFileSync('data/audio/audio.mp3'),
            mimetype: 'audio/mp4',
            ptt: true
        };

        await LuxeBot.sendMessage(m.chat, buttonMessage, { quoted: qtext });
        await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mengambil daftar server.");
    }
}
break
case "confirmunsuspend": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    let serverId = text.trim();
    if (!serverId) {
        return LuxeReply("⚠️ Format salah! Gunakan tombol untuk memilih server yang ingin di-unsuspend.");
    }

    try {
        let response = await fetch(`${domain}/api/application/servers/${serverId}/unsuspend`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.status === 204) {
            return LuxeReply(`✅ *Server dengan ID ${serverId} berhasil di-unsuspend.*`);
        } else {
            let error = await response.json();
            return LuxeReply(`❌ Gagal unsuspend server: ${JSON.stringify(error.errors[0], null, 2)}`);
        }
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mencoba unsuspend server.");
    }
}
//===========================BATASAN BUTTONS CPANEL=========================================\\

//===========================NO BUTTONS OWNER=========================================\\
break
case 'promote': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);
    if (!text && !m.quoted) return LuxeReply(`⚠️ Contoh: ${prefix + command} 62xxx`);

    const target = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender;
    const groupMetadata = await LuxeBot.groupMetadata(m.chat);
    const isAdmin = groupMetadata.participants.find(p => p.id === target)?.admin;

    if (isAdmin) {
        LuxeReply('❌ Maaf, nomor tersebut sudah menjadi admin.');
    } else {
        await LuxeBot.groupParticipantsUpdate(m.chat, [target], 'promote')
            .then(() => {
                const username = target.split('@')[0];
                LuxeReply(`✅ Selamat! @${username} sekarang menjadi admin grup.`, null, { mentions: [target] });
                LuxeBot.sendMessage(target, { text: `🎉 Selamat! Kamu telah menjadi admin di grup *${groupMetadata.subject}*` });
                LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
            })
            .catch(() => LuxeReply('❌ Gagal Promote!'));
    }
}
break
case 'demote': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);
    if (!text && !m.quoted) return LuxeReply(`⚠️ Contoh: ${prefix + command} 62xxx`);

    const target = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender;
    const groupMetadata = await LuxeBot.groupMetadata(m.chat);
    const isAdmin = groupMetadata.participants.find(p => p.id === target)?.admin;

    if (!isAdmin) {
        LuxeReply('❌ Maaf, nomor tersebut bukan admin.');
    } else {
        await LuxeBot.groupParticipantsUpdate(m.chat, [target], 'demote')
            .then(() => {
                const username = target.split('@')[0];
                LuxeReply(`✅ @${username} telah dicabut hak adminnya.`, null, { mentions: [target] });
                LuxeBot.sendMessage(target, { text: `🚫 Hak admin kamu di grup *${groupMetadata.subject}* telah dicabut.` });
                LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
            })
            .catch(() => LuxeReply('❌ Gagal Demote!'));
    }
}
break
case 'kick': {
    LuxeBot.sendMessage(m.chat, { react: { text: `⌛`, key: m.key } });
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);
    if (!text && !m.quoted) return LuxeReply(`⚠️ Contoh: ${prefix + command} 62xxx`);

    const target = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender;
    const participants = await LuxeBot.groupMetadata(m.chat).then(res => res.participants.map(p => p.id));

    if (!participants.includes(target)) return LuxeReply('❌ Maaf kak, nomor tersebut sudah di kick');

    await LuxeBot.groupParticipantsUpdate(m.chat, [target], 'remove').then(() => {
        LuxeReply(`👋 Maaf kamu di kick yaa @${target.split('@')[0]}`, null, { mentions: [target] });
        LuxeBot.sendMessage(target, { text: '🚫 Maaf kamu di kick oleh admin' });
        LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    }).catch(() => LuxeReply('❌ Gagal Kick User!'));
}
break
case 'delete': case 'del': case 'd': {
    if (!m.quoted) return LuxeReply('⚠️ LuxeReply pesan yang mau di delete');
    await LuxeBot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: m.isBotAdmin ? false : true, id: m.quoted.id, participant: m.quoted.sender } });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case "on":
case "off": {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);

    let gc = Object.keys(db.data.groups[m.chat]);
    if (!text || isNaN(text)) {
        let teks = `╭──❍ *Pengaturan Grup* ❍───╮\n\n`;
        teks += `📌 Berikut adalah daftar opsi pengaturan grup:\n\n`;

        gc.forEach((i, e) => {
            teks += `  *${e + 1}.* ${capital(i)} : ${db.data.groups[m.chat][i] ? "✅ _Aktif_" : "❌ _Tidak Aktif_"}\n`;
        });

        teks += `\n📝 *Cara Menggunakan:*\n`;
        teks += `➜ Ketik: *.${command}* <nomor opsi>\n`;
        teks += `➜ Contoh: *.${command} 1*\n`;
        teks += `╰────────────────────╯`;

        return LuxeReply(teks);
    }

    const num = Number(text);
    let total = gc.length;
    if (num > total) return LuxeReply(`⚠️ Nomor yang dimasukkan tidak valid!`);

    const event = gc[num - 1];
    global.db.data.groups[m.chat][event] = command === "on";

    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    return LuxeReply(`✅ *Berhasil!*  
    🔹 *${event}* telah *${command === "on" ? "diaktifkan" : "dinonaktifkan"}* di grup ini.`);
}
break
case 'open': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);

    await LuxeBot.groupSettingUpdate(m.chat, 'not_announcement')
        .then(() => {
            LuxeReply(`✅ Sukses membuka grup`);
            LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        })
        .catch(() => LuxeReply('❌ Gagal membuka grup!'));
}
break
case 'close': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!m.isAdmin) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya admin yang dapat menggunakan perintah ini.`);
    }
    if (!m.isBotAdmin) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);

    await LuxeBot.groupSettingUpdate(m.chat, 'announcement')
        .then(() => {
            LuxeReply(`✅ Sukses menutup grup`);
            LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        })
        .catch(() => LuxeReply('❌ Gagal menutup grup!'));
}
break
case 'tagall': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!isAdmins && !isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('🚫 Khusus Admin!!');
    }
    if (!isBotAdmins) return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);

    const me = m.sender;
    const args = text.split('|'); // Split the input into title and message
    const title = args[0]?.trim(); // Get the title
    const message = args[1]?.trim() || 'tidak ada pesan'; // Get the message or default to 'tidak ada pesan'

    if (!title) return LuxeReply(`⚠️ Format yang benar: ${prefix}tagall Judul|Pesan Pengumuman Atau Teks`);

    // Create an attractive message format
    let teks = `╔═══════════════════════╗\n`;
    teks += `🌟 *Tag All Announcement* 🌟\n`;
    teks += `╚═══════════════════════╝\n\n`;
    teks += `👤 *Created by*: @${me.split('@')[0]}\n`;
    teks += `📢 *Title*: ${title}\n`;
    teks += `📝 *Message*: ${message}\n\n`;
    teks += `🌿 *Participants*: \n`;

    for (let mem of participants) {
        teks += `🌟 @${mem.id.split('@')[0]}\n`;
    }

    // Add total participants count
    const totalParticipants = participants.length;
    teks += `\n📊 *Total Tag All*: ${totalParticipants} participants\n`;
    
    teks += `\n╔═══════════════════════╗\n`;
    teks += `🌈 *Thank you for your attention!* 🌈\n`;
    teks += `╚═══════════════════════╝`;

    LuxeBot.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } }); // Reaction for success
}
break
case 'linkgroup': case 'linkgc': case 'gclink': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!isBotAdmins) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);
    }

    // Get the group invite code
    let response = await LuxeBot.groupInviteCode(m.chat);
    const groupMetadata = await LuxeBot.groupMetadata(m.chat); // Fetch group metadata

    // Create a structured message format
    let teks = `🌐 *Link Group* = https://chat.whatsapp.com/${response}\n`;
    teks += `🆔 *ID Group* = ${m.chat}\n`;
    teks += `👤 *Pemilik Group* = @${groupMetadata.owner.split('@')[0]}\n`;

    // Send the message
    LuxeBot.sendText(m.chat, teks, m, { mentions: [groupMetadata.owner] });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
break
case 'resetlinkgc': {
    if (!m.isGroup) return LuxeReply(mess.group);
    if (!isBotAdmins) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Bot harus menjadi admin terlebih dahulu.`);
    }
    if (!isAdmins && !isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply('🚫 Khusus Admin!!');
    }

    // Revoke the current group invite link
    await LuxeBot.groupRevokeInvite(m.chat);

    // Get the new invite code and group metadata
    let response = await LuxeBot.groupInviteCode(m.chat);
    const groupMetadata = await LuxeBot.groupMetadata(m.chat); // Fetch group metadata

    // Create a structured message format
    let teks = `🔄 *Link Group Berhasil Di Reset*\n`;
    teks += `🌐 *Link Group Terbaru* = https://chat.whatsapp.com/${response}\n`;
    teks += `🆔 *ID Group Terbaru* = ${m.chat}\n`;
    teks += `👤 *Pemilik Group* = @${groupMetadata.owner.split('@')[0]}\n`;

    // Send the message
    LuxeBot.sendText(m.chat, teks, m, { mentions: [groupMetadata.owner] });
    LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
}
//===========================BATASAN NO BUTTONS OWNER=========================================\\

//=====================================BUTTONS DOWNLOAD=======================================\\
break
case 'yt':
case 'play':
case 'ytplay': {
    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });
    if (!text) return LuxeReply(`⚠️ Kirim perintah: ${prefix + command} Lagu favorit`);
    try {
        // Menambahkan reaksi saat proses pencarian dimulai
        const search = await yts(`${text}`);
        if (!search || search.all.length === 0) {
            return LuxeReply(`❌ Lagu tidak ditemukan! ☹️`);
        }

        const { 
            videoId, 
            image, 
            title, 
            views, 
            duration, 
            author, 
            ago, 
            url, 
            description,
            fileSizeInMB            
        } = search.all[0];

        const button = [{
            "name": "single_select",
            "buttonParamsJson": `{
                "title": "Click Here ⎙",
                "sections": [
                    {
                        "title": "Unduh Audio 🎧",
                        "rows": [
                            {
                                "header": "Audio Otomatis 🎵",
                                "title": "Download Audio - Automatic Quality",
                                "id": ".ytmp3 ${url}"
                            }
                        ]
                    },
                    {
                        "title": "Unduh Video 🎥",
                        "rows": [
                            {
                                "header": "Video Otomatis 🎥",
                                "title": "Download Video - Automatic Quality",
                                "id": ".ytmp4 ${url}"
                            }
                        ]
                    }
                ]
            }`
        }];

        let caption = `*${title}*\n\n`;
        caption += `*🎶 Jenis*: Play\n`;
        caption += `*📌 ID*: ${videoId}\n`;
        caption += `*⏱️ Durasi*: ${duration}\n`;
        caption += `*🕒 Diunggah*: ${ago}\n`;
        caption += `*🔗 Link*: ${url}\n\n`;
        caption += `*📦 Ukuran File*: ${fileSizeInMB} MB\n\n`;        
        caption += `_*Pilih jenis download yang Kamu butuhin... pilih yang paling pas buat Kamu ya!*_`;

        await LuxeBot.sendButtonImage(m.chat, { url: image }, button, caption, "✨ Luxe Bot - Your Friendly Assistant ✨", m);
        // Menambahkan reaksi ✅ jika pencarian berhasil
        await LuxeBot.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    } catch (error) {
        console.log(error);
        // Menambahkan reaksi ❌ jika terjadi kesalahan
        await LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        LuxeReply('❌ Gagal saat melakukan tindakan, jika anda pemilik silahkan cek console.');
    }
}
break
case 'ytmp3': {
    if (!text) return LuxeReply('⚠️ Masukkan judul lagu yang ingin dicari!');

    try {
        LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });

        LuxeReply('✨ Tunggu sebentar...'); // Added waiting message

        let url = `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(text)}`;
        let response = await fetch(url);
        let json = await response.json();

        if (!json || json.status !== 200 || !json.result.status) {
            return LuxeReply('❌ Lagu tidak ditemukan atau gagal diunduh!');
        }

        let result = {
            title: json.result.metadata.title,
            author: json.result.metadata.author.name,
            duration: json.result.metadata.timestamp,
            views: json.result.metadata.views,
            link: json.result.metadata.url,
            thumb: json.result.metadata.thumbnail,
            audio: json.result.download.url
        };

        let caption = `*ʏᴏᴜᴛᴜʙᴇ ᴍᴘ𝟹 ᴘʟᴀʏ*\n\n`;
        caption += `*ᴊᴜᴅᴜʟ:* ${result.title}\n`;
        caption += `*ᴀʀᴛɪs:* ${result.author}\n`;
        caption += `*ᴅᴜʀᴀsɪ:* ${result.duration}\n`;
        caption += `*ᴠɪᴇᴡs:* ${result.views}\n`;
        caption += `*ʟɪɴᴋ:* [YouTube](${result.link})\n\n`;
        caption += `> TUNGGU SEBENTAR LAGI NGIRIM MUSIK`;

        await LuxeBot.sendMessage(m.chat, {
            image: { url: result.thumb },
            caption
        }, { quoted: m });

        await LuxeBot.sendMessage(m.chat, {
            audio: { url: result.audio },
            mimetype: "audio/mp4",
        }, { quoted: qtext });

    } catch (error) {
        console.error('❌ Error:', error);
        return LuxeReply('❌ Terjadi kesalahan saat mengambil data lagu.');
    }
}
break
case 'ytmp4': {
    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });
    if (!text) return LuxeReply(`⚠️ Silakan masukkan link YouTube-nya, Contoh: ${prefix + command} https://youtube.com/watch?v=Xs0Lxif1u9E`);

    const url = text.trim();
    // Format video 360 480 720 1080 4k
    const format = '360';

    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!regex.test(url)) {
        return LuxeReply('❌ Link yang anda berikan tidak valid, silahkan masukkan link yang benar.');
    }
    
   LuxeReply('✨ Tunggu sebentar...'); // Added waiting message
    
    try {
        const response = await fetch(`https://api.vreden.my.id/api/ytplaymp4?query=${encodeURIComponent(url)}`);
        const json = await response.json();

        if (!json || json.status !== 200 || !json.result.status) {
            return LuxeReply('❌ Video tidak ditemukan atau gagal diunduh!');
        }

        let result = {
            title: json.result.metadata.title,
            downloadUrl: json.result.download.url,
            duration: json.result.metadata.timestamp,
            thumb: json.result.metadata.thumbnail
        };

        let caption = `*YOUTUBE VIDEO*\n\n`;
        caption += `*Judul:* ${result.title}\n`;
        caption += `*Durasi:* ${result.duration}\n`;
        caption += `*Link:* [Download Video](${result.downloadUrl})\n\n`;
        caption += `> TUNGGU SEBENTAR LAGI NGIRIM VIDEO`;

        await LuxeBot.sendMessage(m.chat, {
            image: { url: result.thumb },
            caption
        }, { quoted: m });

        await LuxeBot.sendMessage(m.chat, {
            video: { url: result.downloadUrl },
            mimetype: 'video/mp4'
        }, { quoted: qtext });

    } catch (error) {
        console.error('Error:', error);
        LuxeReply('Terjadi kesalahan saat mengunduh video, silahkan coba lagi.');
    }
}
break
case 'pin':
case 'pinterest': {
    if (!text) return LuxeReply(`⚠️ Format salah, contoh: \n${prefix + command} Anime`);

    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });

    LuxeReply('✨ Tunggu sebentar...'); // Added waiting message

    try {
        let anutrest = await pinterest(text); // Use the new pinterest function
        if (!anutrest || anutrest.length === 0) return LuxeReply("❌ Error, Foto Tidak Ditemukan");

        // Ambil maksimal 10 gambar biar nggak terlalu panjang
        let selectedImages = anutrest.slice(0, 10);
        let anu = [];

        for (let i = 0; i < selectedImages.length; i++) {
            let imgsc = await prepareWAMessageMedia(
                { image: { url: selectedImages[i].image } }, 
                { upload: LuxeBot.waUploadToServer }
            );

            let result = {
                upload_by: selectedImages[i].upload_by,
                fullname: selectedImages[i].fullname,
                followers: selectedImages[i].followers,
                caption: selectedImages[i].caption,
                image: selectedImages[i].image,
                source: selectedImages[i].source
            };

            let caption = `*PINTEREST IMAGE*\n\n`;
            caption += `*Diunggah oleh:* ${result.fullname} (@${result.upload_by})\n\n`;
            caption += `*Followers:* ${result.followers}\n\n`;
            caption += `*Judul:* ${result.caption}\n\n`;
            caption += `*Gambar:* (${result.image})\n\n`;
            caption += `*Sumber:* (${result.source})\n\n`;

            anu.push({
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `Gambar ke *${i + 1}*`, 
                    hasMediaAttachment: true,
                    ...imgsc
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "Lihat di Pinterest",
                                url: result.source
                            })
                        },
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "Lihat Link Foto",
                                url: result.image
                            })
                        }
                    ]
                }), 
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: caption
                })
            });
        }

        // Buat format `carouselMessage`
        const msg = await generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `🔎 Berikut hasil pencarian gambar untuk *${text}*`
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: anu
                        })
                    })
                }
            }
        }, {
            userJid: m.sender,
            quoted: qtext
        });

        LuxeBot.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

        const muskk = {  
            audio: fs.readFileSync('data/audio/audio.mp3'),  
            mimetype: 'audio/mp4',  
            ptt: true  
        };  

        await LuxeBot.sendMessage(m.chat, muskk, { quoted: qtext });

    } catch (error) {
        console.error('❌ Error:', error);
        return LuxeReply('❌ Terjadi kesalahan saat mengambil data gambar.');
    }
}
break
case 'hd': 
case 'remini': {
    if (!quoted) return LuxeReply(`⚠️ Dimana gambarnya?`);
    if (!/image/.test(mime)) return LuxeReply(`⚠️ Kirim/Balas Foto Dengan caption ${prefix + command}`);
    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });
    try {
        let media = await quoted.download();
        for (let i = 0; i < 1; i++) {
            media = await remini(media, "enhance");
        }
        LuxeBot.sendMessage(m.chat, { image: media, caption: `_✅ Sukses Membuat ${command}_` }, { quoted: qtext });
    } catch (error) {
        console.error(error);
        LuxeReply('❌ Yah Error kak, laporkan ke owner agar diperbaiki.');
    }
}
break
case 'tiktok':
case 'tt': {
    if (!text) return LuxeReply(`⚠️ Contoh: ${prefix + command} link`);
    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });
    try {
        const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`);
        const vidnya = data?.video?.noWatermark;
        if (vidnya) {
            const caption = `*[ TIKTOK DOWNLOADER ]*
*Video dari*: _${data.author?.name ?? 'Tidak diketahui'} (@${data.author?.unique_id ?? 'Tidak diketahui'})_
*Likes*: _${data.stats?.likeCount ?? 'Tidak diketahui'}_
*Comments*: _${data.stats?.commentCount ?? 'Tidak diketahui'}_
*Shares*: _${data.stats?.shareCount ?? 'Tidak diketahui'}_
*Plays*: _${data.stats?.playCount ?? 'Tidak diketahui'}_
*Saves*: _${data.stats?.saveCount ?? 'Tidak diketahui'}_
*Title*: _${data.title ?? 'Tidak diketahui'}_

\`⏤͟͟͞͞ Downloader By ${botname}\``;
            await LuxeBot.sendMessage(
                m.chat, 
                { caption, video: { url: vidnya } }, 
                { quoted: qtext }
            );
        } else {
            const nyut = await NanoTTDL(text);
            await LuxeBot.sendMessage(
                m.chat, 
                {
                    caption: `Judul: ${nyut.title ?? 'Tidak diketahui'}\nDeskripsi: ${nyut.description ?? 'Tidak diketahui'}`,
                    video: { url: nyut.downloadLink || nyut.hdDownloadLink },
                },
                { quoted: qtext }
            );
        }
    } catch (error) {
        console.error(error);
        LuxeReply('❌ Maaf, terjadi kesalahan saat memproses permintaan Anda.');
    }
}  
break
case 'capcutdl': case 'cc': case 'capcut': {
    const axios = require('axios');
    function download(url) {
        return new Promise(async (resolve, reject) => {
            try {
                let cc = await axios.get(url, {
                    headers: {
                        'User -Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
                    }
                }).then(x => x.data);
                
                let dataMatch = /<script nonce="argus-csp-token">window\._ROUTER_DATA = (.*?)<\/script>/;
                if (cc.match(dataMatch)) {
                    let getJson = JSON.parse(cc.match(dataMatch)[1]).loaderData['template-detail_$'].templateDetail;
                    if (getJson.templateId) {
                        resolve({ status: true, mess: `Berhasil mengambil data`, data: getJson });
                    } else {
                        resolve({ status: false, mess: `Tidak ada metadata tersedia` });
                    }
                }
            } catch (e) {
                reject({ status: false, mess: `Gagal mengambil metadata` });
            }
        });
    }
    if (!text.includes('www.capcut.com')) return LuxeReply('❌ Masukkan link capcut yang valid.');
    LuxeBot.sendMessage(m.chat, { react: { text: `🇲🇨`, key: m.key } });
    let hasil = await download(text);
    try {
        let deku = `⏤͟͟͞͞╳── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴄᴄ ]* ── .々─ᯤ\n`;
        deku += `│    =〆 ᴛɪᴛʟᴇ: ${hasil.data.title}\n`;
        deku += `│    =〆 ᴅᴇsᴄ: ${hasil.data.desc}\n`;
        deku += `│    =〆 ɪᴅ: ${hasil.data.templateId}\n`;
        deku += `│    =〆 ᴜʀʟ: ${hasil.data.structuredData.url}\n`;
        deku += `⏤͟͟͞͞╳────────── .✦`;
        await LuxeBot.sendMessage(m.chat, { video: { url: hasil.data.videoUrl }, caption: deku }, { quoted: qtext });
    } catch (e) {
        LuxeReply('❌ Error kak...');
    }
}
break
case "adddb": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    if (!args[0] || !args[1]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`adddb AccessNumber,AccessKey\`\nContoh: \`adddb 6285892928715 ABC123\``);
    }

    let AccessNumber = args[0].replace(/[^0-9]/g, '');
    let AccessKey = args[1];
    let ceknye = await LuxeBot.onWhatsApp(AccessNumber);
    if (ceknye.length == 0) return LuxeReply(`❌ Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);

    const axios = require('axios');
    const repoOwner = "Miracle-lempoy";
    const repoName = "kepo";
    const filePath = "nomor.txt";
    const githubToken = "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"; // Ganti dengan token akses GitHub
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    try {
        // Ambil isi file dari GitHub
        let response = await axios.get(apiUrl, {
            headers: { Authorization: `token ${githubToken}` }
        });

        let fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8').trim();
        let newEntry = `"${AccessNumber}" = "${AccessKey}"`;
        fileContent += `\n${newEntry}`;
        let encodedContent = Buffer.from(fileContent).toString('base64');
        
        // Kirim perubahan ke GitHub
        await axios.put(apiUrl, {
            message: "Menambahkan data baru",
            content: encodedContent,
            sha: response.data.sha
        }, {
            headers: { Authorization: `token ${githubToken}` }
        });

        LuxeReply(`✅ Data berhasil ditambahkan!\n${newEntry}`);
    } catch (error) {
        LuxeReply(`❌ Gagal menyimpan data ke GitHub! Pastikan token akses valid.`);
    }
}
break
case "deldb": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }

    // Memastikan format input benar
    if (!args[0]) {
        return LuxeReply(`⚠️ Format salah! Gunakan format: \`deldb AccessNumber\`\nContoh: \`deldb "6283133675770"\``);
    }

    let accessNumber = args[0].replace(/"/g, '').trim(); // Menghapus tanda kutip jika ada

    // Ambil daftar nomor dari GitHub
    const axios = require('axios');
    const repoOwner = "Miracle-lempoy";
    const repoName = "kepo";
    const filePath = "nomor.txt";
    const githubToken = "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"; // Ganti dengan token akses GitHub
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    try {
        let response = await axios.get(apiUrl, {
            headers: { Authorization: `token ${githubToken}` }
        });

        let fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8').trim();
        let entries = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Mencari entri yang sesuai dengan AccessNumber
        let entryToDelete = entries.find(line => line.startsWith(`"${accessNumber}"`));

        if (!entryToDelete) {
            return LuxeReply(`❌ Entri dengan AccessNumber "${accessNumber}" tidak ditemukan dalam database.`);
        }

        // Menghapus entri yang sesuai dengan AccessNumber
        let updatedContent = entries.filter(line => !line.startsWith(`"${accessNumber}"`)).join('\n');

        let encodedContent = Buffer.from(updatedContent).toString('base64');

        // Kirim perubahan ke GitHub
        await axios.put(apiUrl, {
            message: "Menghapus data",
            content: encodedContent,
            sha: response.data.sha
        }, {
            headers: { Authorization: `token ${githubToken}` }
        });

        return LuxeReply(`✅ Entri dengan AccessNumber "${accessNumber}" dan kunci terkait berhasil dihapus dari database.`);
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mencoba menghapus entri.");
    }
}
break

case "listdb": {
    if (!isCreator) {
        LuxeBot.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
        return LuxeReply(`🚫 Maaf, hanya pemilik yang dapat menggunakan perintah ini.`);
    }
    const axios = require('axios');
    const repoOwner = "Miracle-lempoy";
    const repoName = "kepo";
    const filePath = "nomor.txt";
    const githubToken = "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"; // Ganti dengan token akses GitHub
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    try {
        let response = await axios.get(apiUrl, {
            headers: { Authorization: `token ${githubToken}` }
        });

        let fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8').trim();
        let entries = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        if (entries.length === 0) {
            return LuxeReply("❌ Tidak ada entri yang tersedia dalam database.");
        }

        // Menampilkan entri dalam format yang sesuai
        let formattedEntries = entries.join('\n');
        return LuxeReply(`📋 Daftar Entri:\n${formattedEntries}`);
    } catch (err) {
        console.error(err);
        return LuxeReply("❌ Terjadi kesalahan saat mengambil daftar entri.");
    }
}
//=====================================BATASAN BUTTONS DOWNLOAD=======================================\\
break
default:
if (budy.startsWith('<')) {
if (!isCreator) return
try {
return LuxeReply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
LuxeReply(e)
}
}

if (budy.startsWith('$')) {
                    if (!isCreator) return LuxeReply(mess.only.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return LuxeReply(err)
                        if (stdout) return LuxeReply(stdout)
                    })
                }


if (budy.startsWith('vv')) {
if (!isCreator) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await LuxeReply(evaled)
} catch (err) {
LuxeReply(String(err))
}
}

if (budy.startsWith('uu')){
if (!DanzTheCreator) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return LuxeReply(`${err}`)
if (stdout) {
LuxeReply(stdout)
}
})
}

if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
LuxeBot.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}

} catch (err) {
console.log(util.format(err))
let e = String(err)
}
}

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
