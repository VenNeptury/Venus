import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import { eightball } from '../../utils/nekos';
import { newEmbed } from '../../utils/Util';

const callback = async (message: Message, _args: string[]) => {
    const fortune = await eightball();
    message.channel.send(message.author, {
        embed: fortune.url ? newEmbed(true).setImage(fortune.url) : newEmbed(true).setDescription('*' + fortune.response + '*')
    });
};

export const command: Command = {
    name: '8ball',
    category: 'FUN',
    aliases: ['8b', 'fortune', 'eightball'],
    developerOnly: false,
    nsfw: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};
