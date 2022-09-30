// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials, channelLink } = require('discord.js');
const { token } = require('./config.json');

var votes = [];
var voteCounts = {};

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

    if (commandName === '2sday') {
        await interaction.reply('```When the /2sday_poll command is used, I\'ll post a message with a list of games as reactions. Pick any and all that you want to play. Any game that at least two people vote for is counted in the list, to make sure there are at least 2 players to actually join.\n\nWhen the /2sday_pick command is used, I\'ll tally the votes and pick a random game! The choice is weighted by the number of votes per game, so a higher vote count means a better chance at being picked.```');
    }
	else if (commandName === '2sday_poll') {
        votes = [];
        voteCounts = {};
        
		const message = await interaction.reply({content: 'Pick some games!', fetchReply: true});
        // Crombie Sprocket reaction IDs
        // message.react('1024849271104753714') // BBCF
        //     .then(message.react('1024849272253976686')) // BBTag
        //     .then(message.react('1024849273302568991')) // BFTG
        //     .then(message.react('1024849274179178576')) // DBFZ
        //     .then(message.react('1024849275471003740')) // DNFDuel
        //     .then(message.react('1024849276901265478')) // GGPlusR
        //     .then(message.react('1024849278616735764')) // GGStrive
        //     .then(message.react('1024849279656923246')) // GGXrd
        //     .then(message.react('1024849280709697616')) // KOFXV
        //     .then(message.react('1024849281783447594')) // MBAACC
        //     .then(message.react('1024849283276603432')) // MBTL
        //     .then(message.react('1024849284350345287')) // MultiVersus
        //     .then(message.react('1024849285491204146')) // MVC3
        //     .then(message.react('1024849286749507584')) // Skullgirls
        //     .then(message.react('1024849287869370398')) // Smash U
        //     .then(message.react('1024849288813096960')); // TFH

        // Dojo reaction IDs
        message.react('1025197107801505843') // BBCF
            .then(message.react('1025197109210783857')) // BBTag
            .then(message.react('1025197110615875654')) // BFTG
            .then(message.react('1025197111559589898')) // DBFZ
            .then(message.react('1025197112528486400')) // DNFDuel
            .then(message.react('1025197113627381790')) // GGPlusR
            .then(message.react('1025197114826952806')) // GGStrive
            .then(message.react('1025197115770683442')) // GGXrd
            .then(message.react('1025197116697616464')) // KOFXV
            .then(message.react('1025197118006247484')) // MBAACC
            .then(message.react('1025197119222595604')) // MBTL
            .then(message.react('1025197120745119775')) // MultiVersus
            .then(message.react('1025197121915330580')) // MVC3
            .then(message.react('1025199945411723264')) // SamSho
            .then(message.react('1025199946183475291')) // SC6
            .then(message.react('1025439601168494592')) // SF3rdStrike
            .then(message.react('1025197122905190440')) // Skullgirls
            .then(message.react('1025197123689529395')) // Smash U
            .then(message.react('1025197124629037107')); // TFH
        
            const filter = (reaction, user) => {
                return user.id != message.author.id;
            };
            
            const collector = message.createReactionCollector( {filter,  dispose: true } );
            collector.on('collect', (reaction, user) => 
            {
                voteCounts[reaction.emoji.name] = reaction.count - 1;
            });

            collector.on('remove', (reaction, user) => {
                var count = voteCounts[reaction.emoji.name] - 1;
                if(count === 1) 
                {
                    delete voteCounts[reaction.emoji.name];
                } else {
                    voteCounts[reaction.emoji.name] = count;
                }
            });

	} else if (commandName === '2sday_pick') {
        if(voteCounts.length === 0) {
            await interaction.reply('I can\'t find the most recent poll results');
	    } else {
            // Check the voteCounts and pick one
            var response = '\n';
            for(var game in voteCounts) {
                if(voteCounts[game] > 0) {
                    response += `I got ${voteCounts[game]} vote(s) for ${game}\n`;
                    if(voteCounts[game] > 1) {
                        for(var i=0; i<voteCounts[game]; i++) {
                            votes.push(game);
                        }
                    }
                }
            }

            response += '\n';

            if(votes.length > 0) {
                const randomGame = votes[Math.floor(Math.random() * votes.length)];
                response += `The random game for today is... ${randomGame.toUpperCase()}!`;
            } else {
                response += `No game got at least 2 votes for today... sorry!`;
            }

            await interaction.reply(response);
        }
    }
});

// Login to Discord with your client's token
client.login(token);