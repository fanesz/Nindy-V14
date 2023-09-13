module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction){
        if (!interaction.isCommand()) return;

        const commandSlash = interaction.client.commandsSlash.get(interaction.commandName);
    
        if (!commandSlash) return;
        try {
            await commandSlash.execute(interaction);
        } catch (err) {
            if (err) console.error(err);
    
            await interaction.reply({
                content: "An error occurred while executing that command.",
                emphemeral: true
            });
        }
    }
}