/**
 * Populated when the spoiler log is being parsed
 */
let SpoilerLogItemMap = {};
let SpoilerLogInteriorMap = {};
let SpoilerLogGrottoMap = {};
let SpoilerLogBossMap = {};
let SpoilerLogOwMap = {};

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
 * We will key this as "region|from" so we can find it easily
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
    "Graveyard Dampes House": {},

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
    "GV Carpenter Tent": {},
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
    // Kokiri Forest
    "KF Storms Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "KF Storms Grotto Chest",
            { name: "KF Storms Grotto Beehive {#}", count: 2 }
        ]
    },

    // Lost Woods
    "LW Near Shortcuts Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "LW Near Shortcuts Grotto Chest",
            { name: "LW Near Shortcuts Grotto Beehive {#}", count: 2 }
        ]
    },
    "Deku Theater": { entranceGroup: "Forest Stage" },
    "LW Scrubs Grotto": { 
        // Note: if scrubsanity is off, this is wrong... should be
        // 2 Scrubs (Front on Left) instead
        entranceGroup: "2 Scrubs",
        items: [
            "LW Deku Scrub Grotto Front",
            "LW Deku Scrub Grotto Rear",
            "LW Scrubs Grotto Beehive"
        ]
    },

    // Sacred Forest Meadow
    "SFM Wolfos Grotto": { entranceGroup: "Wolfos Grotto" },
    "SFM Fairy Grotto": {},
    "SFM Storms Grotto": {
        entranceGroup: "2 Scrubs",
        items: [
            "SFM Deku Scrub Grotto Front",
            "SFM Deku Scrub Grotto Rear",
            "SFM Storms Grotto Beehive"
        ]
    },

    // Hyrule Field
    "HF Near Kak Grotto": { entranceGroup: "Skulltula at Distance" },
    "HF Near Market Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "HF Near Market Grotto Chest",
            { name: "HF Near Market Grotto Beehive {#}", count: 2 }
        ]
    },
    "HF Fairy Grotto": {},
    "HF Tektite Grotto": { entranceGroup: "Water Heart Piece Grotto" },
    "HF Cow Grotto": { entranceGroup: "Cow and Web Grotto" },
    "HF Southeast Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "HF Southeast Grotto Chest",
            { name: "HF Southeast Grotto Beehive {#}", count: 2 }
        ]
    },
    "HF Open Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "HF Open Grotto Chest",
            { name: "HF Open Grotto Beehive {#}", count: 2 }
        ]
    },
    "HF Inside Fence Grotto": { entranceGroup: "1 Scrub" },

    // Lon Lon Ranch
    "LLR Grotto": {
        entranceGroup: "3 Scrubs",
        items: [
            {
                name: "LLR Deku Scrub Grotto {#}",
                tokens: ["Left", "Center", "Right"]
            },
            "LLR Grotto Beehive"
        ]
    },

    // Castle
    "HC Storms Grotto": { entranceGroup: "Bombable Wall Grotto" },

    // Kakariko Village and Graveyard
    "Kak Redead Grotto": { entranceGroup: "Two Redead Grotto" },
    "Kak Open Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "Kak Open Grotto Chest",
            { name: "Kak Open Grotto Beehive {#}", count: 2 }
        ]
    },
    "Graveyard Shield Grave": { items: ["Graveyard Shield Grave Chest"] },
    "Graveyard Dampes Grave": { entranceGroup: "Dampe's Grave" },
    "Graveyard Heart Piece Grave": { entranceGroup: "Redead Sun's Song Grave" },
    "Graveyard Royal Familys Tomb": { entranceGroup: "Royal Family's Tomb" },

    // Death Mountain / Goron City
    "DMT Storms Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "DMT Storms Grotto Chest",
            { name: "DMT Storms Grotto Beehive {#}", count: 2 }
        ]
    },
    "DMT Cow Grotto": { entranceGroup: "Cow Grotto" },
    "GC Grotto": {
        entranceGroup: "3 Scrubs",
        items: [
            {
                name: "GC Deku Scrub Grotto {#}",
                tokens: ["Left", "Center", "Right"]
            }, 
            "GC Grotto Beehive"
        ]
    },
    "DMC Upper Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "DMC Upper Grotto Chest",
            { name: "DMC Upper Grotto Beehive {#}", count: 2 }
        ]
    },
    "DMC Hammer Grotto": {
        entranceGroup: "3 Scrubs",
        items: [
            {
                name: "DMC Deku Scrub Grotto {#}",
                tokens: ["Left", "Center", "Right"]
            }, 
            "DMC Hammer Grotto Beehive"
        ]
    },

    // Zora and Lake
    "ZR Storms Grotto": {
        entranceGroup: "2 Scrubs",
        items: [
            "ZR Deku Scrub Grotto Front",
            "ZR Deku Scrub Grotto Rear",
            "ZR Storms Grotto Beehive"
        ]
    },
    "ZR Open Grotto": {
        entranceGroup: "Generic Grotto",
        items: [ // TODO Mapping: check the order of beehives
            "ZR Open Grotto Chest",
            { name: "ZR Open Grotto Beehive {#}", count: 2 }
        ]
    },
    "ZR Fairy Grotto": {},
    "ZD Storms Grotto": {},
    "LH Grotto": {
        entranceGroup: "3 Scrubs",
        items: [
            {
                name: "LH Deku Scrub Grotto {#}",
                tokens: ["Left", "Center", "Right"]
            }, 
            "LH Grotto Beehive"
        ]
    },

    // Gerudo and Desert
    "GV Octorok Grotto": {
        items: [
            "GV Octorok Grotto Red Rupee",
            { name: "GV Octorok Grotto Blue Rupee {#}", count: 3 },
            { name: "GV Octorok Grotto Green Rupee {#}", count: 4 }
        ]
    },
    "GV Storms Grotto": {
        entranceGroup: "2 Scrubs",
        items: [
            "GV Deku Scrub Grotto Front",
            "GV Deku Scrub Grotto Rear",
            "GV Storms Grotto Beehive"
        ]
    },
    "GF Storms Grotto": {},
    "Colossus Grotto": {
        entranceGroup: "2 Scrubs",
        items: [
            "Colossus Deku Scrub Grotto Front",
            "Colossus Deku Scrub Grotto Rear",
            "Colossus Grotto Beehive"
        ]
    }
};

let SpoilerLogBossEntranceMap = {
    "Queen Gohma Boss Room|Deku Tree Before Boss": { entranceGroup: "Gohma" },
    "King Dodongo Boss Room|Dodongos Cavern Before Boss": { entranceGroup: "King Dodongo" },
    "Barinade Boss Room|Jabu Jabus Belly Before Boss": { entranceGroup: "Barinade" },

    "Phantom Ganon Boss Room|Forest Temple Before Boss": { entranceGroup: "Phantom Ganon" },
    "Volvagia Boss Room|Fire Temple Before Boss": { entranceGroup: "Volvagia" },
    "Morpha Boss Room|Water Temple Before Boss": { entranceGroup: "Morpha" },
    "Bongo Bongo Boss Room|Shadow Temple Before Boss": { entranceGroup: "Bongo Bongo" },
    "Twinrova Boss Room|Spirit Temple Before Boss": { entranceGroup: "Twinrova" },

    "Ganons Castle Tower|Ganons Castle Main": { entranceGroup: "Ganon's Tower" }
};

let SpoilerLogOwEntranceMap = {
    // Kokiri Forest
    "Kokiri Forest|LW Bridge": {
        map: "Kokiri Forest", exit: "Lost Woods Bottom"
    },
    "Kokiri Forest|LW Forest Exit": {
        map: "Kokiri Forest", exit: "Lost Woods Top"
    },

    // Lost Woods and Sacred Forest Meadow
    "Lost Woods|Kokiri Forest": {
        map: "Lost Woods", exit: "To Kokiri Forest"
    },
    "Lost Woods|GC Woods Warp": {
        map: "Lost Woods", exit: "Goron City"
    },
    "LW Underwater Entrance|Zora River": {
        map: "Lost Woods", exit: "Zora's River"
    },
    "LW Beyond Mido|SFM Entryway": {
        map: "Lost Woods", exit: "Sacred Forest Meadow"
    },
    "LW Bridge From Forest|Kokiri Forest": {
        map: "Lost Woods Bridge", exit: "Kokiri Forest Bridge"
    },
    "LW Bridge|Hyrule Field": {
        map: "Lost Woods Bridge", exit: "Hyrule Field Bridge"
    },
    "SFM Entryway|LW Beyond Mido": {
        map: "Sacred Forest Meadow", exit: "Lost Woods"
    },

    // Kakariko Village
    "Kak Impas Rooftop|DMT Owl Flight": {
        // One-way exit, so just list as the main entrance
        map: "Kakariko Village", exit: "Hyrule Field"
    },

    // Death Mountain
    "Death Mountain|Kak Behind Gate": {
        map: "Death Mountain Trail", exit: "Kakariko Village"
    },

    // Desert
    "Desert Colossus|Twinrova Boss Room": {
        // One-way exit, so just list as the main entrance
        map: "Desert Colossus", exit: "Haunted Wasteland"
    },


    // Dungeons
    "Deku Tree Lobby|KF Outside Deku Tree": { 
        map: "Deku Tree", exit: "Exit" 
    },
    "Dodongos Cavern Beginning|Death Mountain": { 
        map: "Dodongo's Cavern", exit: "Exit" 
    },
    "Jabu Jabus Belly Beginning|Zoras Fountain": { 
        map: "Jabu Jabu's Belly", exit: "Exit" 
    },

    "Forest Temple Lobby|SFM Forest Temple Entrance Ledge": { 
        map: "Forest Temple", exit: "Exit" 
    },
    "Fire Temple Lower|DMC Fire Temple Entrance": { 
        map: "Fire Temple", exit: "Exit" 
    },
    "Water Temple Lobby|Lake Hylia": { 
        map: "Water Temple", exit: "Exit" 
    },
    "Shadow Temple Entryway|Graveyard Warp Pad Region": { 
        map: "Shadow Temple", exit: "Exit" 
    },
    "Spirit Temple Lobby|Desert Colossus": { 
        map: "Spirit Temple", exit: "Exit" 
    },

    "Ice Cavern Beginning|ZF Ice Ledge": { 
        map: "Ice Cavern", exit: "Exit" 
    },
    "Bottom of the Well|Kakariko Village": { 
        map: "Bottom of the Well", exit: "Exit" 
    },
    "Gerudo Training Ground Lobby|Gerudo Fortress": { 
        map: "Training Grounds", exit: "Exit" 
    },

    "Ganons Castle Lobby|Ganons Castle Grounds": { 
        map: "Ganon's Castle", exit: "Exit" 
    }
};