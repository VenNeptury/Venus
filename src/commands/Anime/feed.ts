import { sendImage } from '../../utils/nekos';
import { VenusCommand, VenusCommandStrings, VenusMessage } from '../../interfaces/Client';
const callback = async (message: VenusMessage, args: string[], strings: VenusCommandStrings) => {
    return sendImage(message, args, 'feed', strings.MESSAGE);
};

export const command: VenusCommand = {
    name: 'feed',
    category: 'ANIME',
    aliases: [],
    developerOnly: false,
    nsfw: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};
