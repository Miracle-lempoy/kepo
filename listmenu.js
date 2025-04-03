const chalk = require('chalk')
const fs = require('fs')

global.menu = (prefix) => {
return`suskses
ownermenu fitur baru cooming soon
cpanelmenu fitur baru cooming soon
groupmenu fitur baru cooming soon
downloadmenu fitur baru cooming soon`};

global.ownermenu = (prefix) => {
return `ownermenu:
${prefix}adddel
${prefix}listowner
${prefix}listprem`};

global.cpanelmenu = (prefix) => {
return `cpanelmenu:
${prefix}1gb / unli / batas 10gb
${prefix}createadmin
${prefix}listsrv
${prefix}listusr
${prefix}delsrv
${prefix}delusr
${prefix}suspend
${prefix}unsuspend`}

global.groupmenu = (prefix) => {
return `groupmenu:
${prefix}promote / demote
${prefix}kick
${prefix}delete / del / d
${prefix}on / off
${prefix}open / close
${prefix}tagall
${prefix}linkgroup / linkgc / gclink / grouplink
${prefix}resetlinkgc`}

global.downloadmenu = (prefix) => {
return `downloadmenu:
${prefix}yt / play / ytplay
${prefix}ytmp3 / ytmp4
${prefix}pin / pinterest
${prefix}hd / remini
${prefix}tt / tiktok
${prefix}capcutdl / cc / capcut`}

global.databasemenu = (prefix) => {
return `databasemenu:
${prefix}adddb [Only Developer]
${prefix}deldb [Only Developer]
${prefix}listdb [Only Developer]
${prefix}upgradesc [restart server jika upgrade]`}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
