import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import { sendHentai } from '../../utils/nekos';

const callback = (message: Message, _args: string[]) => {
    return sendHentai(message, 'nekoGif');
};

export const command: Command = {
    name: 'lewdnekogif',
    category: 'NSFW',
    aliases: ['lewdnekog'],
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
    callback: callback
};
