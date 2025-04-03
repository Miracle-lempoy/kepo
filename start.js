process.on("uncaughtException", console.error);
require('./settings');
const { default: 
	makeWASocket, 
	makeCacheableSignalKeyStore, 
	useMultiFileAuthState, 
	DisconnectReason, 
	fetchLatestBaileysVersion, 
	generateForwardMessageContent, 
	generateWAMessage, 
	prepareWAMessageMedia, 
	generateWAMessageFromContent, 
	generateMessageID, 
	downloadContentFromMessage, 
	makeInMemoryStore, 
	jidDecode, 
	proto, 
	delay 
} = require("@whiskeysockets/baileys");
const { color } = require('./lib/color');
const readline = require("readline");
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache();
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const { Low, JSONFile } = require('./lib/lowdb');
const yargs = require('yargs/yargs');
const fs = require('fs');
const chalk = require('chalk');
const FileType = require('file-type');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const util = require('util');
const os = require('os');
const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const canvafy = require("canvafy");

const { 
	imageToWebp, 
	videoToWebp, 
	writeExifImg, 
	writeExifVid 
} = require('./lib/exif');

const { 
	smsg, 
	await, 
	clockString, 
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
	getSizeMedia, 
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

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
});

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

global.db = new Low(new JSONFile(`database/${tempatDB}`));

global.DATABASE = global.db;

global.muatDatabase = async function muatDatabase() {
	if (global.db.READ) {
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				if (!global.db.READ) {
					clearInterval(interval);
					resolve(global.db.data == null ? global.muatDatabase() : global.db.data);
				}
			}, 1000);
		});
	}

	if (global.db.data !== null) return;

	global.db.READ = true;

	try {
		await global.db.read();
		global.db.data = {
			users: {},
			rpg: {},
			database: {},
			groups: {},
			game: {},
			settings: {},
			message: {},
			...(global.db.data || {})
		};
		global.db.chain = _.chain(global.db.data);
	} catch (err) {
		console.error('⚠️ Gagal membaca database:', err);
	} finally {
		global.db.READ = false;
	}
};

muatDatabase();

if (global.db) {
	setInterval(async () => {
		if (global.db.data && !global.db.READ) {
			try {
				await global.db.write();
			} catch (err) {
				console.error('⚠️ Gagal menyimpan database:', err);
			}
		}
	}, 30 * 1000);
}

const phoneNumber = ownernumber;
const owner = JSON.parse(fs.readFileSync('./database/owner.json'));
const contacts = JSON.parse(fs.readFileSync('./database/contacts.json'));
const usePairingCode = true;
const session = `./${sessionName}`;

const question = (text) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise((resolve) => {
		rl.question(text, resolve)
	});
};

async function StartLuxe() {
	const { state, saveCreds } = await useMultiFileAuthState(session);
	const LuxeBot = makeWASocket({
		printQRInTerminal: !usePairingCode,
		syncFullHistory: true,
		markOnlineOnConnect: true,
		connectTimeoutMs: 60000, 
		defaultQueryTimeoutMs: 0,
		keepAliveIntervalMs: 10000,
		generateHighQualityLinkPreview: true, 
		patchMessageBeforeSending: (message) => {
			const requiresPatch = !!(
				message.buttonsMessage 
				|| message.templateMessage
				|| message.listMessage
			);
			if (requiresPatch) {
				message = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadataVersion: 2,
								deviceListMetadata: {},
							},
							...message,
						},
					},
				};
			}

			return message;
		},
		version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
		browser: ["Windows", "Chrome", "20.0.04"],
		logger: pino({ level: 'fatal' }),
		auth: { 
			creds: state.creds, 
			keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
				level: 'silent', 
				stream: 'store' 
			})), 
		}
	});

	if (!LuxeBot.authState.creds.registered) {
		// Menampilkan pesan di terminal dengan warna merah tebal sebelum meminta input
		console.log(chalk.red.bold('Masukkan Nomor Kamu Yang di Access = '));
		const phoneNumber = await question('');

		// Mengambil nomor yang diizinkan dari URL
		const response = await fetch('https://raw.githubusercontent.com/Miracle-lempoy/kepo/refs/heads/main/nomor.txt');
		const allowedNumbers = await response.text();

		// Memeriksa apakah nomor telepon yang dimasukkan ada dalam daftar yang diizinkan
		if (!allowedNumbers.includes(phoneNumber.trim())) {
			console.log(chalk.red.bold('Maaf kak kamu tidak bisa Terverifikasi'));
			return;
		}

		console.log(chalk.green.bold('Selamat berhasil terverifikasi nomor.'));

		// Menampilkan pesan di terminal dengan warna merah tebal sebelum meminta input
		console.log(chalk.red.bold('Masukkan Key kamu yang di Access = '));
		const accessKey = await question('');

		// Mengambil kunci yang diizinkan dari URL yang sama
		const responseKey = await fetch('https://raw.githubusercontent.com/Miracle-lempoy/kepo/refs/heads/main/nomor.txt');
		const allowedKeys = await responseKey.text();

		// Memeriksa apakah kunci yang dimasukkan ada dalam daftar yang diizinkan
		if (!allowedKeys.includes(accessKey.trim())) {
			console.log(chalk.red.bold('Maaf kak kamu tidak terverifikasi'));
			return;
		}

		console.log(chalk.green.bold('Selamat berhasil terverifikasi key.'));

		const code = await LuxeBot.requestPairingCode(phoneNumber.trim());
		console.log(chalk.white.bold('Kode Pairing Bot Whatsapp kamu:'), chalk.red.bold(`${code}`));
	}

	await store.bind(LuxeBot.ev);	

	LuxeBot.ev.on('connection.update', async (update) => {
		try {
			const { connection, lastDisconnect, receivedPendingNotifications } = update;

			if (connection === 'close') {
				let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

				if (reason === DisconnectReason.badSession) {
					console.log(`Bad Session File, Please Delete Session and Scan Again`);
					StartLuxe();
				} else if (reason === DisconnectReason.connectionClosed) {
					console.log("Connection closed, reconnecting....");
					StartLuxe();
				} else if (reason === DisconnectReason.connectionLost) {
					console.log("Connection Lost from Server, reconnecting...");
					StartLuxe();
				} else if (reason === DisconnectReason.connectionReplaced) {
					console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
					StartLuxe();
				} else if (reason === DisconnectReason.loggedOut) {
					console.log(`Device Logged Out, Please Scan Again And Run.`);
					StartLuxe();
				} else if (reason === DisconnectReason.restartRequired) {
					console.log("Restart Required, Restarting...");
					StartLuxe();
				} else if (reason === DisconnectReason.timedOut) {
					console.log("Connection TimedOut, Reconnecting...");
					StartLuxe();
				} else {
					console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
					StartLuxe();
				}
			}

			if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
				console.log(chalk.yellow.bold("\n👀 Menghubungkan..."));
			}

			if (update.connection == "open" || update.receivedPendingNotifications == "true") {
				await delay(1999);
				let pesan = "Halo kak, aku udah terhubung!";
				LuxeBot.sendMessage("6283133675770@s.whatsapp.net", { text: pesan });
			}
		} catch (err) {
			console.log(chalk.yellow.bold('Error in Connection.update ' + err));
			StartLuxe();
		}
	});

	await delay(5555);
	console.log(chalk.red.bold('\n\nMenunggu Pesan Baru..'));

	LuxeBot.ev.on('creds.update', saveCreds);
	LuxeBot.ev.on("messages.upsert", () => {});

	// Fungsi untuk memeriksa pembaruan pada start.js dan hostoria.js
	const startJsUrl = 'https://raw.githubusercontent.com/Miracle-lempoy/kepo/refs/heads/main/start.js';
	const hostoriaJsUrl = 'https://raw.githubusercontent.com/Miracle-lempoy/kepo/refs/heads/main/hostoria.js';

	let currentStartJsContent = ''; // Simpan konten start.js saat ini
	let currentHostoriaJsContent = ''; // Simpan konten hostoria.js saat ini

	async function checkForUpdates() {
		// Cek pembaruan untuk start.js
		const startResponse = await fetch(startJsUrl);
		const newStartContent = await startResponse.text();

		// Cek pembaruan untuk hostoria.js
		const hostoriaResponse = await fetch(hostoriaJsUrl);
		const newHostoriaContent = await hostoriaResponse.text();

		let updateNeeded = false;

		if (newStartContent !== currentStartJsContent) {
			console.log(chalk.yellow.bold('File start.js telah diperbarui. Mengupdate file lokal...'));
			fs.writeFileSync(path.join(__dirname, 'start.js'), newStartContent);
			currentStartJsContent = newStartContent;
			updateNeeded = true;
		}

		if (newHostoriaContent !== currentHostoriaJsContent) {
			console.log(chalk.yellow.bold('File hostoria.js telah diperbarui. Mengupdate file lokal...'));
			fs.writeFileSync(path.join(__dirname, 'hostoria.js'), newHostoriaContent);
			currentHostoriaJsContent = newHostoriaContent;
			updateNeeded = true;
		}

		if (updateNeeded) {
			console.log(chalk.green.bold('File lokal telah diperbarui.'));
		}
	}

	// Menjadwalkan pengecekan pembaruan setiap 60 detik
	setInterval(checkForUpdates, 60000); // Cek setiap 60 detik
	
LuxeBot.ev.on('group-participants.update', async (anu) => {
    try {
        const metadata = await LuxeBot.groupMetadata(anu.id);
        const participants = anu.participants;
        const groupName = metadata.subject;
        
        for (let num of participants) {
            let pp_user;
            try {
                pp_user = await LuxeBot.profilePictureUrl(num, 'image');
            } catch {
                pp_user = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg';
            }

            try {
                ppgroup = await LuxeBot.profilePictureUrl(anu.id, 'image');
            } catch {
                ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg';
            }

            ImageEvent = await getBuffer(pp_user);

            if (anu.action == 'add') {
                const canWel = await new canvafy.WelcomeLeave()
                    .setAvatar(ImageEvent)
                    .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
                    .setTitle("Welcome")
                    .setDescription(`Selamat datang kak`)
                    .setBorder("#2a2e35")
                    .setAvatarBorder("#2a2e35")
                    .setOverlayOpacity(0.5)
                    .build();
                
                LuxeBot.sendMessage(anu.id, {
                    image: canWel,
                    caption: `Hallo Kak @${num.split("@")[0]} Selamat Datang Di *${groupName}*`,
                    footer: `LuxeBot`,
                    buttons: [
                        { buttonId: '.menu', buttonText: { displayText: 'CLICK THIS TO SEE MENU' }, type: 1 },
                        { buttonId: '.owner', buttonText: { displayText: 'CONTACT OWNER' }, type: 1 }
                    ],
                    headerType: 1,
                    viewOnce: true
                });
            }

            if (anu.action == 'remove') {
                const canLeave = await new canvafy.WelcomeLeave()
                    .setAvatar(ImageEvent)
                    .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
                    .setTitle("Goodbye")
                    .setDescription(`Bye Member Ke-${metadata.participants.length}`)
                    .setBorder("#2a2e35")
                    .setAvatarBorder("#2a2e35")
                    .setOverlayOpacity(0.5)
                    .build();
                
                LuxeBot.sendMessage(anu.id, {
                    image: canLeave,
                    caption: `@${num.split("@")[0]} Telah Keluar Dari Grup Ini`,
                    footer: `LuxeBot`,
                    buttons: [
                        { buttonId: '.menu', buttonText: { displayText: 'CLICK THIS TO SEE MENU' }, type: 1 },
                        { buttonId: '.owner', buttonText: { displayText: 'CONTACT OWNER' }, type: 1 }
                    ],
                    headerType: 1,
                    viewOnce: true
                });
            }

            if (anu.action == "promote") {
                const canPromote = await new canvafy.WelcomeLeave()
                    .setAvatar(ImageEvent)
                    .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
                    .setTitle("Promotion")
                    .setDescription(`@${num.split("@")[0]} Sekarang Admin`)
                    .setBorder("#2a2e35")
                    .setAvatarBorder("#2a2e35")
                    .setOverlayOpacity(0.5)
                    .build();
                
                LuxeBot.sendMessage(anu.id, {
                    image: canPromote,
                    caption: `@${anu.author.split("@")[0]} Telah Menjadikan @${num.split("@")[0]} Sebagai Admin Grup Ini`,
                    footer: `LuxeBot`,
                    buttons: [
                        { buttonId: '.menu', buttonText: { displayText: 'CLICK THIS TO SEE MENU' }, type: 1 },
                        { buttonId: '.owner', buttonText: { displayText: 'CONTACT OWNER' }, type: 1 }
                    ],
                    headerType: 1,
                    viewOnce: true
                });
            }

            if (anu.action == "demote") {
                const canDemote = await new canvafy.WelcomeLeave()
                    .setAvatar(ImageEvent)
                    .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
                    .setTitle("Demotion")
                    .setDescription(`@${num.split("@")[0]} Tidak Lagi Admin`)
                    .setBorder("#2a2e35")
                    .setAvatarBorder("#2a2e35")
                    .setOverlayOpacity(0.5)
                    .build();
                
                LuxeBot.sendMessage(anu.id, {
                    image: canDemote,
                    caption: `@${anu.author.split("@")[0]} Telah Memberhentikan @${num.split("@")[0]} Sebagai Admin Grup Ini`,
                    footer: `LuxeBot`,
                    buttons: [
                        { buttonId: '.menu', buttonText: { displayText: 'CLICK THIS TO SEE MENU' }, type: 1 },
                        { buttonId: '.owner', buttonText: { displayText: 'CONTACT OWNER' }, type: 1 }
                    ],
                    headerType: 1,
                    viewOnce: true
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

LuxeBot.ev.on("groups.update", async (json) => {
    try {
        const res = json[0];

        if (res.announce === true) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🔒 *Oops, Gerbang Grup Ditutup!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Jangan sedih ya, tunggu admin buka lagi! 🥺✨` }, { quoted: null });
        } else if (res.announce === false) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🔓 *Yay, Gerbang Grup Terbuka!* 🔓\n\nSekarang semua anggota bebas ngobrol seru lagi di sini. Ayo ramein! 🎉😄` }, { quoted: null });
        }

        if (res.restrict === true) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🔐 *Info Grup Dikunci!* 🔐\n\nHanya *admin* yang bisa edit info grup sekarang. Tetap tertib ya! 😇📚` }, { quoted: null });
        } else if (res.restrict === false) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🔓 *Info Grup Dibuka!* 🔓\n\nSemua anggota bisa ikut edit info grup. Jangan lupa sopan dan bijak ya! 😊📢` }, { quoted: null });
        }

        if (res.subject !== undefined && res.subject !== null) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🖊️ *Nama Grup Baru!* 🖊️\n\nSekarang grup kita punya nama baru:\n\n*${res.subject}*\n\nGimana, kece kan? 😎🔥` }, { quoted: null });
        }

        if (res.memberAddMode === true) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🛡️ *Tambah Anggota? Tertutup Dulu!* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Yuk, patuhi aturan ya! 👀✨` }, { quoted: null });
        } else if (res.memberAddMode === false) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `✅ *Tambah Anggota Bebas!* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Ayo tambah rame! 🥳🎈` }, { quoted: null });
        }

        if (res.joinApprovalMode === true) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `🛡️ *Pintu Masuk Dijaga Ketat!* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🤝🔒` }, { quoted: null });
        } else if (res.joinApprovalMode === false) {
            await sleep(2000);
            LuxeBot.sendMessage(res.id, { text: `✅ *Pintu Masuk Terbuka Lebar!* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah rame di sini! 🎊😊` }, { quoted: null });
        }

    } catch (error) {
        console.error('❌ Oops, ada yang error waktu proses pembaruan grup:', error);
    }
});

	LuxeBot.ev.on('messages.upsert', async chatUpdate => {
		try {
			mek = chatUpdate.messages[0]
			if (!mek.message) return
			mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			m = smsg(LuxeBot, mek, store)
			require("./hostoria")(LuxeBot, m, chatUpdate, mek, store)
		} catch (err) {
			console.log(chalk.yellow.bold("[ ERROR ] hostoria.js :\n") + chalk.redBright(util.format(err)))
		}
	})

	LuxeBot.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	LuxeBot.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = LuxeBot.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	LuxeBot.getName = (jid, withoutContact = false) => {
		id = LuxeBot.decodeJid(jid)
		withoutContact = LuxeBot.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = LuxeBot.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp'
		} : id === LuxeBot.decodeJid(LuxeBot.user.id) ? LuxeBot.user : (store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	LuxeBot.getName = (jid, withoutContact = false) => {
		id = LuxeBot.decodeJid(jid)
		withoutContact = LuxeBot.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = LuxeBot.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp'
		} : id === LuxeBot.decodeJid(LuxeBot.user.id) ? LuxeBot.user : (store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	LuxeBot.sendContact = async (jid, kontak, quoted = '', opts = {}) => {
		let list = []
		for (let i of kontak) {
			list.push({
				displayName: await LuxeBot.getName(i),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await LuxeBot.getName(i)}\nFN:${await LuxeBot.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
			})
		}
		LuxeBot.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
	}

	LuxeBot.public = true

	LuxeBot.serializeM = (m) => smsg(LuxeBot, m, store)

	const uploadFile = {
		upload: LuxeBot.waUploadToServer
	};

	LuxeBot.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {
		contextInfo: {
			mentionedJid: parseMention(text),
		}
	}) => {
		let button = []
		for (let i = 0; i < buttons.length; i++) {
			button.push({
				"name": buttons[i].name,
				"buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
			})
		}
		let msg = generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					'messageContextInfo': {
						'deviceListMetadata': {},
						'deviceListMetadataVersion': 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						...options,
						mentionedJid: parseMention(text),
						body: proto.Message.InteractiveMessage.Body.create({
							text: text
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: footer
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: "",
							hasMediaAttachment: false
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: button,
						})
					})
				}
			}
		}, {
			quoted: quoted
		})

		LuxeBot.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id
		})
		return msg
	}
	
	LuxeBot.sendButtonImage = async (jid, image, buttons = [], text, footer, quoted = '', options = {
		contextInfo: {
			mentionedJid: parseMention(text),
		}
	}) => {
		let button = []
		for (let i = 0; i < buttons.length; i++) {
			button.push({
				"name": buttons[i].name,
				"buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
			})
		}
		var imageMessage = await prepareWAMessageMedia({
				image: image,
			},
			uploadFile,
		);
		let msg = generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					'messageContextInfo': {
						'deviceListMetadata': {},
						'deviceListMetadataVersion': 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						...options,
						body: proto.Message.InteractiveMessage.Body.create({
							text: ""
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: footer
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: text,
							subtitle: text,
							hasMediaAttachment: true,
							imageMessage: imageMessage.imageMessage
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: button,
						})
					})
				}
			}
		}, {
			quoted: quoted
		})

		LuxeBot.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id
		})
		return msg
	}

	LuxeBot.sendButtonVideo = async (jid, video, buttons = [], text, footer, quoted = '', options = {
		contextInfo: {
			mentionedJid: parseMention(text),
		}
	}) => {
		let button = []
		for (let i = 0; i < buttons.length; i++) {
			button.push({
				"name": buttons[i].name,
				"buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
			})
		}
		var videoMessage = await prepareWAMessageMedia({
				video: video,
			},
			uploadFile,
		);
		let msg = generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					'messageContextInfo': {
						'deviceListMetadata': {},
						'deviceListMetadataVersion': 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						...options,
						body: proto.Message.InteractiveMessage.Body.create({
							text: ""
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: footer
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: text,
							subtitle: text,
							videoMessage: videoMessage.videoMessage,
							hasMediaAttachment: true
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: button,
						})
					})
				}
			}
		}, {
			quoted: quoted
		})

		LuxeBot.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id
		})
		return msg
	}

	LuxeBot.sendButtonDocument = async (jid, document = {}, buttons = [], text, footer, quoted = '', options = {
		contextInfo: {
			mentionedJid: parseMention(text),
		}
	}) => {
		let button = []
		for (let i = 0; i < buttons.length; i++) {
			button.push({
				"name": buttons[i].name,
				"buttonParamsJson": JSON.parse(JSON.stringify(buttons[i].buttonParamsJson))
			})
		}
		let msg = generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					'messageContextInfo': {
						'deviceListMetadata': {},
						'deviceListMetadataVersion': 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						...options,
						body: proto.Message.InteractiveMessage.Body.create({
							text: text
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: footer
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: "",
							hasMediaAttachment: true,
							...(await prepareWAMessageMedia(document, {
								upload: LuxeBot.waUploadToServer
							}))
						}),
						gifPlayback: true,
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: button,
						})
					})
				}
			}
		}, {
			quoted: quoted
		})

		await LuxeBot.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id
		})
		return msg
	}

	LuxeBot.sendText = (jid, text, quoted = '', options) => LuxeBot.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted,
		...options
	})

	LuxeBot.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await LuxeBot.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	LuxeBot.sendTextWithMentions = async (jid, text, quoted, options = {}) => LuxeBot.sendMessage(jid, {
		text: text,
		mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
		...options
	}, {
		quoted
	})

	LuxeBot.sendFromOwner = async (jid, text, quoted, options = {}) => {
		for (const a of jid) {
			await LuxeBot.sendMessage(a + '@s.whatsapp.net', { text, ...options }, { quoted });
		}
	}

	LuxeBot.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}
		await LuxeBot.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
		.then( response => {
			fs.unlinkSync(buffer)
			return response
		})
	}

	LuxeBot.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await LuxeBot.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
	}

	LuxeBot.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await LuxeBot.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
	}

	LuxeBot.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}
		await LuxeBot.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
		return buffer
	}

	LuxeBot.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		let mime = '';
		let res = await axios.head(url)
		mime = res.headers['content-type']
		if (mime.split("/")[1] === "gif") {
			 return LuxeBot.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
		}
		let type = mime.split("/")[0]+"Message"
		if (mime === "application/pdf"){
			return LuxeBot.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "image"){
			return LuxeBot.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
		}
		if (mime.split("/")[0] === "video"){
			return LuxeBot.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "audio"){
			return LuxeBot.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
		}
	}

	LuxeBot.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../temp/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}

	LuxeBot.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
		let type = await LuxeBot.getFile(path, true);
		let { res, data: file, filename: pathFile } = type;
		if (res && res.status !== 200 || file.length <= 65536) {
		try {
			throw {
				json: JSON.parse(file.toString())
			};
		} catch (e) {
			if (e.json) throw e.json;
		}
	}
	let opt = {
		filename
	};
	if (quoted) opt.quoted = quoted;
	if (!type) options.asDocument = true;
	let mtype = '',
	mimetype = type.mime,
	convert;
	if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
	else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
	else if (/video/.test(type.mime)) mtype = 'video';
	else if (/audio/.test(type.mime)) {
		convert = await (ptt ? toPTT : toAudio)(file, type.ext);
		file = convert.data;
		pathFile = convert.filename;
		mtype = 'audio';
		mimetype = 'audio/ogg; codecs=opus';
	} else mtype = 'document';
		if (options.asDocument) mtype = 'document';
		delete options.asSticker;
		delete options.asLocation;
		delete options.asVideo;
		delete options.asDocument;
		delete options.asImage;
		let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
		let m;
		try {
			m = await LuxeBot.sendMessage(jid, message, { ...opt, ...options });
		} catch (e) {
			console.error(e)
			m = null;
		} finally {
			if (!m) m = await LuxeBot.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
			file = null;
			return m;
		}
	}

	LuxeBot.sendPoll = (jid, name = '', values = [], selectableCount = global.select) => {
		return LuxeBot.sendMessage(jid, {
			poll: {
				name,
				values,
				selectableCount
			}
		})
	};

	LuxeBot.cMod = (jid, copy, text = '', sender = LuxeBot.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === LuxeBot.user.id
		return proto.WebMessageInfo.fromObject(copy)
	}

	LuxeBot.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await LuxeBot.getFile(path, true)
		let { mime, ext, res, data, filename } = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try { throw { json: JSON.parse(file.toString()) } }
			catch (e) { if (e.json) throw e.json }
		}
		let type = '', mimetype = mime, pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let { writeExif } = require('./lib/exif')
			let media = { mimetype: mime, data }
			pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		}
		else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await LuxeBot.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
		return fs.promises.unlink(pathFile)
	}

	LuxeBot.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await LuxeBot.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
		return waMessage
	}

	LuxeBot.parseMention = (text = '') => {
		return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	};

	LuxeBot.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		let trueFileName = attachExtension ? ('./temp/' + filename + '.' + type.ext) : './temp/' + filename
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	LuxeBot.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}
	
return LuxeBot

}


StartLuxe()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});