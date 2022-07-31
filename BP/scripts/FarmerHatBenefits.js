import { world, BlockLocation, Player, EffectType, MinecraftEffectTypes, ItemStack, ItemType } from 'mojang-minecraft'

world.events.tick.subscribe(tick => {
    
    const players = world.getPlayers()

    for (let player of players) {


        const dimension = world.getDimension(player.dimension.id)
        const playerPos = player.location
        const block = dimension.getBlock(new BlockLocation(playerPos.x, playerPos.y, playerPos.z))

        

        if (player.getTags().includes('farmerHat')) {

            if (block.hasTag('exdrill:fully_grown_crop')) {
                player.addEffect(MinecraftEffectTypes.regeneration, 5, 0, true)
            }
        }
    }
})
