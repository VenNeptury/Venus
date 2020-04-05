import { Message } from 'discord.js';
import Command from '../../interfaces/Command';

const callback = async (message: Message, _args: string[]) => {
    const msg = await message.channel.send('Pinging...');
    return msg.edit(`🏓 Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
};

export const command: Command = {
    name: 'ping',
    category: 'UTILITY',
    aliases: [],
    description: `Check Venus' ping`,
    usage: '',
    developerOnly: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};