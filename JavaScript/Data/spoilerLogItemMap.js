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
let SpoilerLogInteriorMap = {};
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
};

// let SpoilerLogGenericInteriorEntranceMap = {
//     "HC Great Fairy Fountain": [],
//     "DMC Great Fairy Fountain": ["DMC Great Fairy Reward"],
//     "Colossus Great Fairy Fountain": ["Colossus Great Fairy Reward"]
// };

/**
 * The spoiler log lists these in a form of:
 * region: <what the boss room is>
 * from: <the normal way to get there>
 * 
 * We will key this b "region|from" so we can find it easily
 * 
 * Ones that aren't like that will be mapped as their string version
 */

let SpoilerLogInteriorEntranceMap = {
    "KF Links House": { entranceGroup: "Link's House" },

    "Kak Carpenter Boss House": { entranceGroup:"Talon's House Kakariko" },

    "LLR Talons House": { entranceGroup: "Super Cucco Minigame" },

    // Generic interiors
    "HC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["HC Great Fairy Reward"]
    },
    "DMT Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["DMT Great Fairy Reward"]
    },
    "DMC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["DMC Great Fairy Reward"]
    },
    "ZF Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["ZF Great Fairy Reward"]
    },
    "Colossus Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["Colossus Great Fairy Reward"]
    },
    "OGC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["OGC Great Fairy Reward"]
    },

    // Unselectable interiors
    "KF Midos House": { 
        items: [
            "KF Midos Top Left Chest",
            "KF Midos Top Right Chest",
            "KF Midos Bottom Left Chest",
            "KF Midos Bottom Right Chest"
        ]
     },
};

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
};