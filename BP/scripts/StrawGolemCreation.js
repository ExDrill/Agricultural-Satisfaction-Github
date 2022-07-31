
import { world, MinecraftBlockTypes, Location, BlockLocation } from 'mojang-minecraft'


const possibleDirections = [
    [0, 1, 0], [0, -1, 0],
    [1, 0, 0], [-1, 0, 0],
    [0, 0, 1], [0, 0, -1]
]

world.events.blockPlace.subscribe(blockPlace => {
    const placedBlock = blockPlace.block
    const dimension = blockPlace.dimension


    if (placedBlock.hasTag('pumpkin')) {


        let cardinalDirection = -1

        for (let cardinalCheck = 0; cardinalCheck < 6; cardinalCheck++) {

            const blockAtLoc = dimension.getBlock(new BlockLocation(placedBlock.x + possibleDirections[cardinalCheck][0], placedBlock.y + possibleDirections[cardinalCheck][1], placedBlock.z + possibleDirections[cardinalCheck][2]))

            if (blockAtLoc.id == 'minecraft:hay_block') {
                cardinalDirection = cardinalCheck
            }
        }

        if (cardinalDirection > -1) {

            for (let i = 0; i < 2; i++) {
                const blockToDelete = dimension.getBlock(new BlockLocation(placedBlock.x + i * possibleDirections[cardinalDirection][0], placedBlock.y + i * possibleDirections[cardinalDirection][1], placedBlock.z + i * possibleDirections[cardinalDirection][2]))
                blockToDelete.setType(MinecraftBlockTypes.air)
            }

            const blockLoc = new BlockLocation(placedBlock.x, placedBlock.y, placedBlock.z)
            dimension.spawnEntity('exdrill:straw_golem', blockLoc)
        }
    }
})