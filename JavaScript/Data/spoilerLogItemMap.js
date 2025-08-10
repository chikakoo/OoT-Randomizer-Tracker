// let SpoilerLogItemType = {
//     OVERWORLD: 0,
//     STANDARD_DUNGEON: 1,
//     MQ_DUNGEON: 2,
//     OW_ENTRANCE: 3,
//     INTERIOR: 4,
//     GROTTO: 5
// }

/**
 * Populated when the spoiler log is being parsed
 */
let SpoilerLogItemMap = {};
let SpoilerLogBossMap = {};

/**
 * A map of the spoiler log dungeon names to the ones we use
 */
let SpoilerLogDungeonNameMap = {
    "Deku Tree": "Deku Tree",
    "Dodongos Cavern": "Dodongo's Cavern",
    "Jabu Jabus Belly": "Jabu Jabu's Belly",

    "Forest Temple": "Forest Temple",
    "Fire Temple": "Fire Temple",
    "Water Temple": "Water Temple",
    "Shadow Temple": "Shadow Temple",
    "Spirit Temple": "Spirit Temple",

    "Ice Cavern": "Ice Cavern",
    "Bottom of the Well": "Bottom of the Well",
    "Gerudo Training Ground": "Training Grounds",

    "Ganons Castle": "Ganon's Castle"
}

/**
 * The spoiler log lists these in a form of:
 * region: <what the boss room is>
 * from: <the normal way to get there>
 * 
 * We will key this b "region|from" so we can find it easily
 */
let SpoilerLogBossEntranceMap = {
    "Queen Gohma Boss Room|Deku Tree Before Boss": "Gohma",
    "King Dodongo Boss Room|Dodongos Cavern Before Boss": "King Dodongo",
    "Barinade Boss Room|Jabu Jabus Belly Before Boss": "Barinade",

    "Phantom Ganon Boss Room|Forest Temple Before Boss": "Phantom Ganon",
    "Volvagia Boss Room|Fire Temple Before Boss": "Volvagia",
    "Morpha Boss Room|Water Temple Before Boss": "Morpha",
    "Bongo Bongo Boss Room|Shadow Temple Before Boss": "Bongo Bongo",
    "Twinrova Boss Room|Spirit Temple Before Boss": "Twinrova",

    "Ganons Castle Tower|Ganons Castle Main": "Ganon's Tower"
}