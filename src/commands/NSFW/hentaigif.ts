import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import { sendHentai } from '../../utils/nekos';

const callback = (message: Message, _args: string[]) => {
    return sendHentai(message, 'randomHentaiGif');
};

export const command: Command = {
    name: 'hentaigif',
    category: 'NSFW',
    aliases: ['hentaigif'],
    description: '',
    extended: '',
    usage: '',
    developerOnly: false,
    nsfw: true,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};