import mongoose from 'mongoose';
import config from '../utils/config';
import { logError, logInfo } from '../utils/winston';
import Guilds from './schemas/GuildSchema';
import Infractions from './schemas/InfractionSchema';
import Tags from './schemas/TagSchema';
import Intros from './schemas/IntroSchema';

mongoose.connect(config.mongoString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', err => logError(err));

db.once('open', () => logInfo(`Connected to MongoDB Atlas at ${db.name}!`));

export default {
    Guilds,
    Infractions,
    Tags,
    Intros
};

export const getGuild = async (guildId: string) => {
    return (await Guilds.findOne({ guild: guildId })) || (await Guilds.create({ guild: guildId }));
};

export const resetGuild = async (guildId: string) => {
    return await Guilds.findOneAndDelete({ guild: guildId });
};

export const getInfractions = async (guildId: string) => {
    return (await Infractions.findOne({ guild: guildId })) || (await Infractions.create({ guild: guildId }));
};

export const getTags = async (guildId: string) => {
    return (await Tags.findOne({ guild: guildId })) || (await Tags.create({ guild: guildId }));
};

export const getIntros = async (userId: string) => {
    return (await Intros.findOne({ user: userId })) || (await Intros.create({ user: userId }));
};
