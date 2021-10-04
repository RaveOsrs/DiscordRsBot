bot.on('messageCreate', message =>{
    if(message.channel.name == "name-changes") {
        if (message.author.bot) return; //so it doesnt reply to itself

        var OldName = message.member.displayName;
        var NickName = message.content;
        var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        var SpecialChars = (format.test(NickName));
        var NameChangeChannel = bot.channels.cache.find(channel => channel.name === "name-changes");

        if(NickName.length > 12 || SpecialChars == true) {
            message.channel.send("This RSN is invalid, please type your RSN exactly how it appears in game.");
        }
        else{
            message.member.setNickname(NickName);
            NameChangeChannel.send('Name changed from "' + OldName + '" to "' + NickName + '"');
        }
    }
});