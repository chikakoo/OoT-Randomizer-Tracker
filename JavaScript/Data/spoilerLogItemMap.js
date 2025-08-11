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
let SpoilerLogGrottoMap = {};
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
    // Kokiri Forest
    "KF Midos House": { 
        items: [
            "KF Midos Top Left Chest",
            "KF Midos Top Right Chest",
            "KF Midos Bottom Left Chest",
            "KF Midos Bottom Right Chest"
        ]
     },
    "KF Links House": { entranceGroup: "Link's House" },
    "KF Sarias House": {
        items: [{ 
            name: "KF Sarias House Recovery Heart {#}", 
            count: 4 
        }]
    },
    "KF House of Twins": {
        items: [{ 
            name: "KF House of Twins Pot {#}", 
            count: 2 
        }]
    },
    "KF Kokiri Shop": {
        entranceGroup: "Kokiri Shop",
        items: [
            "KF Shop Wonderitem",
            { name: "KF Shop Item {#}", count: 8 }
        ]
    },
    "KF Know It All House": {
        items: [{ 
            name: "KF Know it All House Pot {#}", 
            count: 2 
        }]
    },

    // Lon Lon Ranch
    "LLR Talons House": { entranceGroup: "Super Cucco Minigame" },
    "LLR Stables": { entranceGroup: "Stable" },
    "LLR Tower": { entranceGroup: "Cow Shed" },

    // Market Entrance and Market
    "Market Guard House": { entranceGroup: "Market Guard House"},
    "Market Shooting Gallery": { entranceGroup: "Child Archery" },
    "Market Mask Shop": { entranceGroup: "Happy Mask Shop" },
    "Market Potion Shop": { 
        entranceGroup: "Shop",
        items: [{ name: "Market Potion Shop Item {#}", count: 8 }]
    },
    "Market Bazaar": { 
        entranceGroup: "Shop",
        items: [{ name: "Market Bazaar Item {#}", count: 8 }]
    },
    "Market Treasure Chest Game": { entranceGroup: "Treasure Chest Minigame" },
    "Market Bombchu Bowling": { entranceGroup: "Bombchu Bowling" },
    "Market Bombchu Shop": {
        entranceGroup: "Shop",
        items: [{ name: "Market Bombchu Shop Item {#}", count: 8 }]
    },
    "Market Man in Green House": {
        items: [{ name: "Market Man in Green House Pot {#}", count: 3}]
    },

    // Temple of Time and Castle
    "Temple of Time": { entranceGroup: "Temple of Time" },
    "HC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["HC Great Fairy Reward"]
    },
    "OGC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["OGC Great Fairy Reward"]
    },

    // Kakariko Village and Graveyard
    "Kak Carpenter Boss House": { entranceGroup: "Talon's House Kakariko" },
    "Kak House of Skulltula": { entranceGroup: "House of Skulltula" },
    "Kak Impas House": { entranceGroup: "Front of Impa's House" },
    "Kak Impas House Back": { entranceGroup: "Back of Impa's House" },
    "Kak Shooting Gallery": { entranceGroup: "Adult Archery" },
    "Kak Windmill": { entranceGroup: "Windmill" },
    "Kak Bazaar": {
        entranceGroup: "Shop",
        items: [{ name: "Kak Bazaar Item {#}", count: 8 }]
    },
    "Kak Potion Shop Front": { entranceGroup: "Potion Shop Front" },
    "Kak Potion Shop Back": { entranceGroup: "Potion Shop Back" },
    "Kak Odd Medicine Building": { entranceGroup: "Granny's Potion Shop" },
    "Graveyard Dampes House": { items: [] },

    // Death Mountain and Goron City
    "DMT Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["DMT Great Fairy Reward"]
    },
    "GC Shop": {
        entranceGroup: "Shop",
        items: [{ name: "GC Shop Item {#}", count: 8 }]
    },
    "DMC Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["DMC Great Fairy Reward"]
    },

    // Zora and Lake
    "ZD Shop": {
        entranceGroup: "Shop",
        items: [{ name: "ZD Shop Item {#}", count: 8 }]
    },
    "ZF Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["ZF Great Fairy Reward"]
    },
    "LH Lab": { entranceGroup: "Lakeside Lab" },
    "LH Fishing Hole": { entranceGroup: "Fishing Pond" },

    // Gerudo Valley / Fortress
    "GV Carpenter Tent": { items: [] },
    "Hideout 1 Torch Jail|Gerudo Fortress": { 
        entranceGroup: "Jail 1 Left" // Bottom Left Door
    }, 
    "Hideout 1 Torch Jail|GF Entrances Behind Crates": {
        entranceGroup: "Jail 1 Right" // Enclave Left Door
    },
    "Hideout Kitchen Hallway|GF Entrances Behind Crates": {
        entranceGroup: "Kitchen Far Bottom" // Enclave Right Door
    },
    "Hideout 4 Torches Jail|Gerudo Fortress": {
        entranceGroup: "Jail 2 Right" // Bottom Right Door
    },
    "Hideout 2 Torches Jail|Gerudo Fortress": {
        entranceGroup: "Jail 3 Right" // Right Door Above GTG
    },
    "Hideout Kitchen Hallway|Gerudo Fortress": {
        entranceGroup: "Kitchen Middle Bottom" // Left Door Above GTG
    },
    "Hideout 4 Torches Jail|GF Roof Entrance Cluster": {
        entranceGroup: "Jail 2 Left" // Middle Left Door
    },
    "Hideout Kitchen Front|GF Roof Entrance Cluster": {
        entranceGroup: "Kitchen Top Left" // Vines Left Door
    },
    "Hideout 2 Torches Jail|GF Roof Entrance Cluster": {
        entranceGroup: "Jail 3 Left" // Vines Forward Door
    },
    "Hideout Kitchen Rear|GF Kitchen Roof Access": {
        entranceGroup: "Kitchen Top Right" // Upper Kitchen Door
    },
    "Hideout 3 Torches Jail|GF 3 Torches Jail Exterior": {
        entranceGroup: "Jail 4 Entrance" // Upper Jail Door
    },
    "Hideout Break Room|GF Break Room Entrance": {
        entranceGroup: "Top Room Lower" // Door Above Jail 1
    },
    "Hideout Hall to Balcony|GF Balcony": {
        entranceGroup: "Top Room Upper" // Door Above Link's Jail
    },

    // Desert
    "Colossus Great Fairy Fountain": { 
        entranceGroup: "Fairy Fountain",
        items: ["Colossus Great Fairy Reward"]
    }
};

let SpoilerLogGrottoEntranceMap = {
    "DMT Cow Grotto": { entranceGroup: "Cow Grotto" }
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