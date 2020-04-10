import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import { getMember } from '../../utils/getters';
import { isMemberHigher } from '../../utils/checks';
import { wrongSyntax, newEmbed, trimString, replace } from '../../utils/Util';
import CommandStrings from '../../interfaces/CommandStrings';

const callback = async (message: Message, args: string[], strings: CommandStrings) => {
    if (!message.guild || !message.member) return;
    const member = await getMember(message, args, 0);
    if (!member) return;
    if (!isMemberHigher(message.member, member)) return wrongSyntax(message, strings.NOT_HIGHER);
    if (!member.kickable) return wrongSyntax(message, strings.CANT_KICK);

    const m = await message.channel.send(
        replace(strings.CONFIRM, {
            MEMBER: member.user.tag,
            YES: strings.YES,
            NO: strings.NO
        })
    );
    let confirmed = false;
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 1000 * 30 });

    collector.on('collect', async (msg: Message) => {
        if (strings.YES.toLowerCase().includes(msg.content.toLowerCase())) {
            const reason = args.slice(1).join(' ') || strings.NO_REASON;
            const output = newEmbed(true)
                .setTitle(strings.KICK)
                .setDescription(
                    replace(strings.KICK_DM, {
                        GUILD: message.guild!.name
                    })
                )
                .addFields([
                    { name: strings.MEMBER, value: member.user.tag },
                    { name: strings.MOD, value: message.author.tag },
                    { name: strings.REASON, value: trimString(reason, 1024) }
                ]);

            await member.send(output).catch(() => null);
            member.kick(`Kicked by ${message.author.tag}: ${reason}`);

            m.edit(output.setDescription(strings.USER_KICKED));
            msg.delete({ timeout: 10 * 1000 });

            confirmed = true;
            return collector.stop();
        }

        if (strings.NO.toLowerCase().includes(msg.content.toLowerCase())) {
            msg.delete({ timeout: 10 * 1000 });
            m.delete({ timeout: 10 * 1000 });

            confirmed = true;
            collector.stop();

            return wrongSyntax(message, strings.KICK_CANCEL);
        }

        return wrongSyntax(
            msg,
            replace(strings.INVALID_RESPONSE, {
                YES: strings.YES,
                NO: strings.NO
            }),
            false
        );
    });

    collector.on('end', () => {
        if (!confirmed) wrongSyntax(message, strings.TOO_SLOW);
        return;
    });
};

export const command: Command = {
    name: 'kick',
    category: 'MODERATION',
    aliases: ['boot', 'k'],
    description: 'kick a user',
    extended: '',
    usage: '<User (Mention, ID or name)> [reason]',
    developerOnly: false,
    nsfw: false,
    guildOnly: true,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: 'KICK_MEMBERS',
    botPermissions: 'KICK_MEMBERS',
    callback: callback
};
