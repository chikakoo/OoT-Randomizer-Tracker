/**
 * All the master quest dungeons
 * Set IsInUse to true to use this on a load
 */
let MQDungeons = {
    "Deku Tree": {
        Abbreviation: "DEKU",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: [ "F3", "F2", "B1", "B2" ],
        StartingFloorIndex: 1,
        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lower Floors", imageName: "Recovery Heart" },
                Exits: {
                    upperFloor: {},
                    compassRoomAntechamber: {
                        NeedsAny: [Items.DEKU_STICK, Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    },
                    basement: {},
                    Exit: {
                        OwExit: OwExits["Deku Tree"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Heart in Lower Lobby": {
                        SpoilerLogName: "Deku Tree MQ Lower Lobby Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 245, y: 28, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Climb up the vines on the first floor. Jump to the small platform to your left. The item is on the end of that platform; you have to jump off for it.",
                    },
                    "Map Chest": {
                        SpoilerLogName: "Deku Tree MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 282, y: 82, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 1.1,
                        LongDescription: "Climb to the second floor of the dungeon. The chest is by the vines leading to the third floor."
                    },
                    "Crate by Map Chest": {
                        SpoilerLogName: "Deku Tree MQ Lobby Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 277, y: 87, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This crate is next to the map chest on the second floor.",
                    },
                    "Skulltula by Map Chest": {
                        SpoilerLogName: "Deku Tree MQ GS Lobby",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 277, y: 87, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "This skulltula is in the crate by the map chest on the second floor. Roll into it to set it free.",
                    }
                }
            },
            upperFloor: {
                DisplayGroup: { groupName: "Upper Floor", imageName: "Fairy Slingshot" },
                Exits: {},
                ItemLocations: {
                    "2 Crates on Third Floor": {
                        SpoilerLogName: [{
                            name: "Deku Tree MQ Slingshot Room Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 157, y: 149, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>The crates are in the lower area right in front of you."
                    },
                    "Slingshot Chest on Third Floor": {
                        SpoilerLogName: "Deku Tree MQ Slingshot Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 115, y: 199, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Defeat all the enemies in this room to spawn the chest. Press the switch to gain access to the chest.",
                        NeedsDamagingWeapon: true
                    },
                    "Recovery Heart on Third Floor": {
                        SpoilerLogName: "Deku Tree MQ Slingshot Room Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 107, y: 200, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Press the switch inside to gain access to the item.",
                    },
                    "Small Chest on Third Floor": {
                        SpoilerLogName: "Deku Tree MQ Slingshot Room Back Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 147, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Light the unlit torch in this room to spawn the chest. If using a bow, it's easier if you shoot it from the left side of the torch.",
                        NeedsAny: [Items.DEKU_STICK, Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            compassRoomAntechamber: {
                DisplayGroup: { groupName: "Lower Side Room", imageName: "Compass" },
                Exits: {
                    compassRoom: {
                        ChildNeeds: [Items.FAIRY_SLINGSHOT],
                        AdultNeeds: [Items.FAIRY_BOW]
                    }
                },
                ItemLocations: {
                    "Heart in Giant Baba Room": {
                        SpoilerLogName: "Deku Tree MQ Near Compass Room Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 191, y: 151, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so. The heart is on the left side of the room."
                    }
                }
            },
            compassRoom: {
                DisplayGroup: { groupName: "Lower Side Room", imageName: "Compass" },
                Exits: {
                    compassRoomSideArea: {
                        NeedsAny: [
                            Items.BOMBCHU,
                            [Songs.SONG_OF_TIME, 
                                [SetType.OR, Items.BOMB, Items.MEGATON_HAMMER]],
                            [Tricks.mqDekuHammerCompassRocks.canDo],
                            [Tricks.mqDekuAdultBombCompassRocks.canDo]
                        ]
                    },
                    compassRoomSkulltula: {
                        Age: Age.ADULT,
                        Needs: [Tricks.weirdShot.canDoWithLongshot]
                    }
                },
                ItemLocations: {
                    "Compass Chest in Old Slingshot Room": {
                        SpoilerLogName: "Deku Tree MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 111, y: 246, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Once in this next room, shoot the eye in the back to gain access to the next room. The chest is on the other side.",
                    }
                }
            },
            compassRoomSideArea: {
                DisplayGroup: { groupName: "Lower Side Room", imageName: "Compass" },
                Exits: {
                    compassRoomSkulltula: {}
                },
                ItemLocations: {
                    "Heart in Old Slingshot Room": {
                        SpoilerLogName: "Deku Tree MQ Compass Room Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 157, y: 273, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so. The heart is on the left side of the room.",
                        TricksToShow: [Tricks.mqDekuHammerCompassRocks, Tricks.mqDekuAdultBombCompassRocks]
                    }
                }
            },
            compassRoomSkulltula: {
                DisplayGroup: { groupName: "Lower Side Room", imageName: "Compass" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Old Slingshot Room": {
                        SpoilerLogName: "Deku Tree MQ GS Compass Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 161, y: 277, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Head to the other side of the room. The room up the vines to the left is blocked by rocks. Use a bombchu to gain access. The skulltula is up on the wall.",
                        TricksToShow: [Tricks.mqDekuHammerCompassRocks, Tricks.mqDekuAdultBombCompassRocks],
                        // The staircase hover requires one additional bomb drop to gain enough height
                        // Start the hover against the wall
                        NeedsAny: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS, Tricks.staircaseHover.canDo]
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
                Exits: {
                    waterRoom: {
                        Needs: [ItemSets.PROJECTILES],
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK, QPAItemSets.LEDGE_QPA]
                    },
                    upperBasement: {
                        ChildNeeds: [Tricks.dekuB1Skip.canDo]
                    }
                },
                ItemLocations: {
                    "Basement Web Switch Chest": {
                        SpoilerLogName: "Deku Tree MQ Basement Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 81, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Head to the basement. The goal is to hit the switch to the right of the vines to spawn the chest. If you have Din's Fire, use it on the webs. Otherwise, hit the switch to the left of the vines to light the torch, then use your sticks or shoot an arrow through it to gain access to the switch.",
                        NeedsAny: [Items.DEKU_STICK, Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            waterRoom: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
                Exits: {
                    graveRoom: {}
                },
                ItemLocations: {
                    "Chest by Water Room Door": {
                        SpoilerLogName: "Deku Tree MQ Before Spinning Log Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 266, y: 225, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12.1,
                        LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room. The chest will be to your left."
                    },
                    "Chest in Song of Time Block": {
                        SpoilerLogName: "Deku Tree MQ After Spinning Log Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 181, y: 225, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room.<br/><br/>Make your way to the other side of the water room. You'll need to roll or crouch with your shield under the spikey pole. Play the Song of Time by the block to reveal the chest.<br/><br/>The hookshot extention glitch can be used to get this from the left side of the block.",
                        NeedsAny: [Songs.SONG_OF_TIME, Tricks.hookshotExtensionSotBlocks.canDo],
                        TricksToShow: [Tricks.hookshotExtensionSotBlocks]
                    }
                }
            },
            graveRoom: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
                Exits: {
                    upperBasement: {}
                },
                ItemLocations: {
                    "Wonderitem on West Wall Left Grave": {
                        SpoilerLogName: "Deku Tree MQ Basement Graves Wonderitem 1",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 70, y: 140, floor: "B1" },
                        MapImageName: "Sword Wonderitem",
                        Age: Age.EITHER,
                        Order: 13.6,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, swing your sword or deku stick while standing on the left grave on the west wall to spawn the wonderitem.",
                        NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
                    },
                    "Wonderitem on East Grave Near Torches": {
                        SpoilerLogName: "Deku Tree MQ Basement Graves Wonderitem 3",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 113, y: 132, floor: "B1" },
                        MapImageName: "Sword Wonderitem",
                        Age: Age.EITHER,
                        Order: 13.7,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, swing your sword or deku stick while standing on the east grave near the torches to spawn the wonderitem.",
                        NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
                    },
                    "Wonderitem on Grave Near Side Room": {
                        SpoilerLogName: "Deku Tree MQ Basement Graves Wonderitem 2",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 67, y: 98, floor: "B1" },
                        MapImageName: "Sword Wonderitem",
                        Age: Age.EITHER,
                        Order: 13.8,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, swing your sword or deku stick while standing on the grave near the side room to spawn the wonderitem.",
                        NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
                    },
                    "Wonderitem on Grave Left of Exit": {
                        SpoilerLogName: "Deku Tree MQ Basement Graves Wonderitem 4",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 117, y: 98, floor: "B1" },
                        MapImageName: "Sword Wonderitem",
                        Age: Age.EITHER,
                        Order: 13.9,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, swing your sword or deku stick while standing on the grave to the left of the crawlspace exit to spawn the wonderitem.",
                        NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
                    },
                    "Skulltula in Grave Room": {
                        SpoilerLogName: "Deku Tree MQ GS Basement Graves Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 93, y: 113, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, either use your longshot or play the Song of Time near the torches to spawn a staircase of blocks. Climb these and use your boomerang or hookshot to get the skulltula on the ceiling.",
                        NeedsAny: [
                            [Songs.SONG_OF_TIME, ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                            UpgradedItems.LONGSHOT
                        ]
                    },
                    "Skulltula by Grave Room": {
                        SpoilerLogName: "Deku Tree MQ GS Basement Back Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 17, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Note that you can also use Din's Fire. Light the torches to open the next room. Defeat all the enemies in this room to continue on.<br/><br/>Step on the blue switch in the middle of the torches. Light a stick, use Din's or shoot an arrow to burn the web blocking the left door. The skulltula is in this room.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.FAIRY_BOW, Items.DEKU_STICK, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            upperBasement: {
                DisplayGroup: { 
                    groupName: "Basement", 
                    imageName: "Deku Stick",
                    description: "Go around the basement floors to get here.",
                    tricksToShow: [Tricks.dekuB1Skip]
                },
                Exits: {
                    graveRoom: {
                        Age: Age.CHILD
                    },
                    lowerBasement: {
                        NeedsAny: [
                            ItemSets.FIRE_ITEMS,
                            Items.DEKU_STICK,
                            ItemLocationSets.MQ_DEKU_WEB_BURNED,
                            QPAItemSets.LEDGE_QPA,
                            Tricks.weirdShot.canDo
                        ]
                    }
                },

                ItemLocations: {
                    "Scrub in Basement": {
                        SpoilerLogName: "Deku Tree MQ Deku Scrub",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 274, y: 143, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "The scrub is next to the burnable web leading to the boss antechamber.<br/><br>To get there the long way around: in the grave room, step on the blue switch in the middle of the torches. Light a stick, use Din's, or shoot and arrow to the web blocking the right path. Enter the crawlspace to find your way back to the upper level of the first basement room.",
                    },
                    "Burn Basement Web": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        MapInfo: { x: 263, y: 108, floor: "B1" },
                        MapImageName: "Din's Fire",
                        Age: Age.EITHER,
                        Order: 16.1,
                        LongDescription: "The web on the basement floor. Use sticks or a fire item to burn it.",
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            lowerBasement: {
                DisplayGroup: { groupName: "Boss Floor", imageName: "Kokiri's Emerald" },
                Exits: {
                    bossRoom: {
                        NeedsAny: [
                            Equipment.DEKU_SHIELD,
                            Equipment.HYLIAN_SHIELD,
                            ItemLocationSets.DEKU_OPENED_BOSS_DOOR
                        ]
                    }
                },
                ItemLocations: {
                    "3 Hearts in Lower Basement": {
                        SpoilerLogName: [{
                            name: "Deku Tree MQ Basement Recovery Heart {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 246, y: 105, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "These hearts are in the water of the lower basement, two on one side, one on the other."
                    },
                    "Open Boss Door": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { 
                            let haveBothShields = Equipment.DEKU_SHIELD.playerHas && Equipment.HYLIAN_SHIELD.playerHas;
                            return Settings.RandomizerSettings.shuffleDungeonEntrances && !haveBothShields;
                        },
                        MapInfo: { x: 180, y: 192, floor: "B2" },
                        MapImageName: "Deku Nut",
                        ChildNeeds: [Equipment.DEKU_SHIELD],
                        AdultNeeds: [Equipment.HYLIAN_SHIELD],
                        Age: Age.EITHER,
                        Order: 17.1,
                        LongDescription: "Mark this after stunning the scrubs in the 3, 1, 2 order.",
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Boss Floor", imageName: "Kokiri's Emerald" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Deku Tree"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Dodongo's Cavern": {
        Abbreviation: "DONG",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F2", "F1"],
        StartingFloorIndex: 1,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Main Room", imageName: "Goron's Bracelet" },
                Exits: {
                    mainRoom: {
                        NeedsAny: [
                            ItemLocationSets.DODONGO_OPENED_FIRST_WALL,
                            ItemSets.MUD_WALL_ITEMS,
                            Equipment.STRENGTH
                        ]
                    },
                    Exit: {
                        OwExit: OwExits["Dodongo's Cavern"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Opened First Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 134, y: 262, floor: "F1" },
                        MapImageName: "Bomb",
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Use an explosive or the hammer to break the first wall. This is used to determine whether Adult opened the door for Child.",
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH]
                    }
                }
            },
            mainRoom: {
                DisplayGroup: { groupName: "Main Room", imageName: "Goron's Bracelet" },
                Exits: {
                    upperMainRoom: {
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Equipment.STRENGTH]
                    },
                    eastRoom: { 
                        Needs: [ItemSets.MUD_WALL_ITEMS_OR_LEDGE_QPA]
                    },
                    mainRoomLedge: {
                        ChildNeeds: [Tricks.groundJump.canDoWithBomb]
                    }
                },
                ItemLocations: {
                    "Chest in Main Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 168, y: 180, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This chest is in the back right corner of the main room. Bomb, hammer, or blue fire the wall blocking it.",
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS_OR_LEDGE_QPA, Equipment.STRENGTH]
                    },
                    "Gossip Stone in Main Room": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 94, y: 198, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "This stone is behind the mud wall in the western area of the main room.",
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS_OR_LEDGE_QPA, Equipment.STRENGTH]
                    },
                    "2 Scrubs in Main Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Deku Scrub Lobby {#}",
                            tokens: ["Front", "Rear"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        DefaultEntranceGroupName: "2 Scrubs",
                        MapInfo: { x: 100, y: 222, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "These scrubs are on the ledge to the left when you first enter the main room."
                    }
                }
            },
            upperMainRoom: {
                DisplayGroup: { groupName: "Main Room", imageName: "Goron's Bracelet" },
                Exits: {
                    staircaseBottom: {},
                    mainRoomLedge: {
                        NeedsAny: [Tricks.mqDodongoRecoilSlashToPlatform.canDo]
                    },
                    topOfTorchPuzzleRoom: {
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Items.DINS_FIRE]
                    },
                    inDodongoHead: {
                        Needs: [ItemSets.EXPLOSIVES]
                    }
                },
                ItemLocations: {}
            },
            mainRoomLedge: {
                DisplayGroup: { groupName: "Main Room", imageName: "Goron's Bracelet" },
                Exits: {
                    poeRoom: {}
                },
                ItemLocations: {
                    "Chest on Ledge in Main Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Bomb Bag Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 182, y: 200, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "Navigate through the Poe room to get to this chest on the ledge on the right side of the main room. This may require you to go through most of the dungeon first.",
                        TricksToShow: [Tricks.mqDodongoRecoilSlashToPlatform]
                    }
                }
            },
            eastRoom: {
                DisplayGroup: { 
                    groupName: "Lower East Rooms", 
                    imageName: "Small Poe",
                    description: "The rooms reached by blowing up the wall in the lower east part of the dungeon (or going around form the Poe/Lizalfos rooms).",
                    tricksToShow: [Tricks.mqDodongoRecoilSlashToPlatform]
                },
                Exits: {
                    lowerLizalfosRoom: {
                        Needs: [ItemSets.PROJECTILES], // Adult can shoot the bomb flower line to reveal the switch
                        ChildNeedsAny: [ItemSets.EXPLOSIVES_OR_STRENGTH, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "2 Pots at East Room Entrance": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Right Side Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 193, y: 230, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Go to the room to the east of the main room. The pots are in front of you on the wall to the right."
                    },
                    "Scrub in East Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Deku Scrub Side Room Near Lower Lizalfos",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 242, y: 264, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Blow up the east room door somehow. You may need to run a bomb flower from the very top floor if you have no other way.<br/><br/>Once in the east room, blow up the fake wall on the right. The scrub is inside."
                    },
                    "2 Pots by East Room Exit": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Right Side Pot {#}",
                            count: { min: 3, max: 4 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 306, y: 212, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Go to the room to the east of the main room. The pots are on either side of the door next to the platform."
                    }
                }
            },
            lowerLizalfosRoom: {
                DisplayGroup: { groupName: "Lower East Rooms", imageName: "Small Poe" },
                Exits: {
                    eastRoom: {},
                    poeRoom: {}
                },
                ItemLocations: {
                    "Heart in Lavafall Cave": {
                        SpoilerLogName: "Dodongos Cavern Lower Lizalfos Hidden Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 335, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "In the lower lizalfos room, head to the platform closest to the lavafall. Jump through the lavafall on the side that's closer to the wall to get to ths item."
                    }
                }
            },
            poeRoom: {
                DisplayGroup: { groupName: "Lower East Rooms", imageName: "Small Poe" },
                Exits: {
                    lowerLizalfosRoom: {},
                    mainRoomLedge: {
                        NeedsAny: [ItemSets.EXPLOSIVES_OR_STRENGTH, Items.DINS_FIRE, Items.FAIRY_BOW, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "Skulltula Near Poe Room": {
                        SpoilerLogName: "Dodongos Cavern MQ GS Scrub Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 230, y: 79, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "In the Poe room, use an explosive/Din's fire/bow on one of the lines of bomb flowers to unbar the door to this room. The skulltula is high up in the back left corner.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        NeedsAny: [ItemSets.EXPLOSIVES_OR_STRENGTH, Items.DINS_FIRE, Items.FAIRY_BOW, QPAItemSets.LEDGE_QPA]
                    },
                    "Poe Room Pot by Entrance": {
                        SpoilerLogName: "Dodongos Cavern MQ Poes Room Pot 2",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 231, y: 143, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "This pot is to the left as you enter the main area.",
                    },
                    "Poe Room Pot by First Pillar": {
                        SpoilerLogName: "Dodongos Cavern MQ Poes Room Pot 1",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 214, y: 147, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "This pot is on the right side of the giant pillar by the entrance.",
                    },
                    "2 Crates by First Pillar": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Poes Room Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 230, y: 158, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "These crates are against the wall on the left side of the giant pillar by the entrance."
                    },
                    "Poe Room Pot in Middle": {
                        SpoilerLogName: "Dodongos Cavern MQ Poes Room Pot 3",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 232, y: 176, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This pot is in the middle of the room on the left side of the two smaller pillars.",
                    },
                    "2 Crates in Middle": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Poes Room Crate {#}",
                            count: { min: 5, max: 6 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 232, y: 181, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "These crates are in the middle of the room on the left side of the two smaller pillars."
                    },
                    "2 Crates on Left Wall by Exit": {
                        SpoilerLogName: [
                            "Dodongos Cavern MQ Poes Room Crate 7",
                            "Dodongos Cavern MQ Poes Room Crate Near Bomb Flower"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 209, y: 200, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "These crates in the middle of the room on the left side of the two smaller pillars."
                    },
                    "Poe Room Pot on Right Wall by Exit": {
                        SpoilerLogName: "Dodongos Cavern MQ Poes Room Pot 4",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 205, y: 177, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "This pot is to the right of the exit door in a very minor alcove."
                    },
                    "2 Crates on Right Wall by Exit": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Poes Room Crate {#}",
                            count: { min: 3, max: 4 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 205, y: 173, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "These crates are to the right of the exit door in a very minor alcove."
                    }
                }
            },
            staircaseBottom: {
                DisplayGroup: { 
                    groupName: "Staircase & Dodongo Room", 
                    imageName: "Bomb",
                    description: "The room with the staircase, reached after hitting the switch on the top across the bridge by the giant Dodongo head.",
                    tricksToShow: [Tricks.dodongoTriggerStairsWithBow]
                },
                Exits: {
                    staircaseTop: {
                        NeedsAny: [
                            ItemSets.EXPLOSIVES_OR_STRENGTH,
                            Items.DINS_FIRE,
                            QPAItemSets.LEDGE_QPA,
                            Tricks.dodongoTriggerStairsWithBow.canDo
                        ]
                    }
                },
                ItemLocations: {
                    "Skullula by Stair Room": {
                        SpoilerLogName: "Dodongos Cavern MQ GS Song of Time Block Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 46, y: 259, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Blow up the fake wall by the stairs. Play the song of time in the next room several times to navigate the maze to the skulltula.",
                        Needs: [Songs.SONG_OF_TIME]
                    },
                    "4 Pots in Stair Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Staircase Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 56, y: 193, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>The pots are in the four corners of the bottom part of the room."
                    },
                    "2 Crates in Lower Stair Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Staircase Crate Bottom {#}",
                            tokens: ["Left", "Right"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 53, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>The crates are in the two corners of the room by the back of the stairs."
                    },
                    "Silver Rupee Under Beamos in Stair Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Staircase Silver Rupee Beamos",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 31, y: 184, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 21.1,
                        LongDescription: "In the stair room, walk into the beamos on the left side of the stairs to get this rupee."
                    },
                    "Silver Rupee Under Lower Stair Room Crate": {
                        SpoilerLogName: "Dodongos Cavern MQ Staircase Silver Rupee Lower Crate",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 33, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 21.2,
                        LongDescription: "In the stair room, break the crate to the left of the stairs to get this rupee."
                    }
                }
            },
            staircaseTop: {
                DisplayGroup: { groupName: "Staircase & Dodongo Room", imageName: "Bomb" },
                Exits: {
                    staircaseBottom: {},
                    smallDodongoRoom: {
                        Needs: [SilverRupeeSets.MQ_DODONGOS_CAVERN_SILVER_RUPEES_STAIRCASE_ROOM]
                    }
                },
                ItemLocations: {
                    "Scrub in Stair Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Deku Scrub Staircase",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 32, y: 94, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Lower the stairs like normal. Climb the gray block to reach the scrub at the top."
                    },
                    "4 Crates in Upper Stair Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Staircase Crate {#}",
                            tokens: ["Mid Left", "Top Left", "Mid Right", "Top Right"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 52, y: 97, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "Lower the stairs in the stair room. The crates are up the stairs in the four corners of the walkways."
                    },
                    "Silver Rupee Under Upper Stair Room NW Crate": {
                        SpoilerLogName: "Dodongos Cavern MQ Staircase Silver Rupee Mid Left Crate",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 11, y: 97, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23.1,
                        LongDescription: "Break the northwest crate in the upper stair room to get this rupee."
                    },
                    "Silver Rupee Under Upper Stair Room SE Crate": {
                        SpoilerLogName: "Dodongos Cavern MQ Staircase Silver Rupee Top Right Crate",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 47, y: 133, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23.2,
                        LongDescription: "Break the southeast crate in the upper stair room to get this rupee."
                    },
                    "Silver Rupee Up Upper Stair Room Vines": {
                        SpoilerLogName: "Dodongos Cavern MQ Staircase Silver Rupee Vines",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 31, y: 132, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23.3,
                        LongDescription: "Climb the vines on the top of the stair room to get this rupee."
                    }
                }
            },
            smallDodongoRoom: {
                DisplayGroup: { groupName: "Staircase & Dodongo Room", imageName: "Bomb" },
                Exits: {
                    torchPuzzleRoom: {},
                    staircaseTop: {}
                },
                ItemLocations: {
                    "Chest in Small Dodongo Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 200, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "Collect all the silver rupees in the stair room to get here. Defeat all the enemies to spawn the chest."
                    }
                }
            },
            torchPuzzleRoom: {
                DisplayGroup: { groupName: "Torch Puzzle Room", imageName: "Din's Fire" },
                Exits: {
                    smallDodongoRoom: {},
                    roomByTorchPuzzle: {
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK, QPAItemSets.TALL_TORCH_QPA]
                    },
                    topOfTorchPuzzleRoom: {
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        AdultNeedsAny: [
                            Tricks.dodongoAdultJumpToBombChest.canDo,
                            Tricks.groundJump.canDoWithBomb,
                            Tricks.megaFlip.canDo
                        ]
                    },
                    upperLizalfosRoom: {
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "Heart in Torch Puzzle": {
                        SpoilerLogName: "Dodongos Cavern MQ Torch Puzzle Room Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 208, y: 175, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 25,
                        LongDescription: "In the torch puzzle room, there's an item on the bottom part of the ledge against the back wall."
                    }
                }
            },
            roomByTorchPuzzle: {
                DisplayGroup: { groupName: "Torch Puzzle Room", imageName: "Din's Fire" },
                Exits: {},
                ItemLocations: {
                    "Chest in Room by Torch Puzzle": {
                        SpoilerLogName: "Dodongos Cavern MQ Larvae Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 202, y: 109, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 26,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. Kill all the enemies to spawn the chest."
                    },
                    "6 Crates in Room by Torch Puzzle": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Larvae Room Crate {#}",
                            count: 6
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 202, y: 109, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 27,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. The crates are in this room."
                    },
                    "Skulltula in Room by Torch Puzzle": {
                        SpoilerLogName: "Dodongos Cavern MQ GS Larvae Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 210, y: 108, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 28,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. The skulltula is in one of the right boxes."
                    }
                }
            },
            upperLizalfosRoom: {
                DisplayGroup: { 
                    groupName: "Upper East Rooms", 
                    imageName: "Fairy Slingshot",
                    description: "The puzzle rooms after the torch puzzle room.",
                    tricksToShow: [Tricks.dodongoAdultJumpToBombChest]
                },
                Exits: {
                    topOfTorchPuzzleRoom: {},
                    lowerLizalfosRoom: {}
                },
                ItemLocations: {
                    "First Fire Puzzle Pot by Entrance": {
                        SpoilerLogName: "Dodongos Cavern MQ Before Upper Lizalfos Pot 2",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 251, y: 190, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 29,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the torch puzzle room or the upper lizalfos room. This pot is in the corner by the entrance."
                    },
                    "First Fire Puzzle Pot by Exit": {
                        SpoilerLogName: "Dodongos Cavern MQ Before Upper Lizalfos Pot 1",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 270, y: 205, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the torch puzzle room or the upper lizalfos room. This pot is in the corner by the exit."
                    },
                    "Skulltula in Top Lizalfos Room": {
                        SpoilerLogName: "Dodongos Cavern MQ GS Lizalfos Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 295, y: 122, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "After completing the torch puzzle, burn the web in the next room. Do the box pushing puzzle in the next room to get to the lizalfos room. Alternatively, you can blow up the rocks at the top of the main room and navigate around backwards to get here.<br/><br/>Bomb the rocks in the back of this room to get to the skulltula.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
                    },
                    "2 Pots by Top Lizalfos Room Wall": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Upper Lizalfos Pot {#}",
                            count: { min: 3, max: 4 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 341, y: 149, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 32,
                        LongDescription: "These pots are the ones against the wall without any doors in the top lizalfos room."
                    },
                    "2 Pots by Top Lizalfos Room Exit": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Upper Lizalfos Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 306, y: 162, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 33,
                        LongDescription: "These pots are the ones by the exit in the top lizalfos room."
                    },
                    "2 Pots in Second Fire Puzzle": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ After Upper Lizalfos Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 274, y: 168, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 34,
                        LongDescription: "These pots are in the fire puzzle room after the top lizalfos room in one of the corners."
                    },
                    "Crate by Second Fire Puzzle Entrance": {
                        SpoilerLogName: "Dodongos Cavern MQ After Upper Lizalfos Crate 2",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 276, y: 160, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 35,
                        LongDescription: "In the fire puzzle room after the top lizalfos room, this crate can be found on the ground by the ledge you normally enter from."
                    },
                    "Crate by Second Fire Puzzle Exit": {
                        SpoilerLogName: "Dodongos Cavern MQ After Upper Lizalfos Crate 1",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 252, y: 168, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 36,
                        LongDescription: "In the fire puzzle room after the top lizalfos room, this crate can be found on the ground by the ledge you normally exit from."
                    }
                }
            },
            topOfTorchPuzzleRoom: {
                DisplayGroup: { groupName: "Upper East Rooms", imageName: "Fairy Slingshot" },
                Exits: {
                    torchPuzzleRoom: {},
                    upperLizalfosRoom: {},
                    eastRoom: {
                        Needs: [Equipment.STRENGTH]
                    }
                },
                ItemLocations: {
                    "Chest on Top of Torch Puzzle Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Torch Puzzle Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 176, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 37,
                        LongDescription: "Either bomb the rocks at the top of the main room, or proceed through the upper lizalfos room to get to the top of the torch puzzle room. The chest is on one of the ledges you can get to by jumping there."
                    },
                    "Pot on Torch Puzzle Room Pillar": {
                        SpoilerLogName: "Dodongos Cavern MQ Torch Puzzle Room Pot Pillar",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 204, y: 174, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 38,
                        LongDescription: "This pot is the one on the pillar next to the chest."
                    },
                    "Pot by Old Bomb Bag Chest": {
                        SpoilerLogName: "Dodongos Cavern MQ Torch Puzzle Room Pot Corner",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 184, y: 146, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 39,
                        LongDescription: "This pot is in the torch puzzle room near where the old bomb bag chest was.."
                    }
                }
            },
            inDodongoHead: {
                DisplayGroup: { 
                    groupName: "Inside Dondongo Head", 
                    imageName: "Goron's Ruby",
                    description: "Bomb the eyes of the giant Dodongo to enter its head.",
                    tricksToShow: [Tricks.dodongoOpenHeadWithBombchus]
                },
                Exits: {
                    bossRoom: {
                        // You're guaranteed to have some kind of explosives, which is all you need to get here
                    }
                },
                ItemLocations: {
                    "2 Pots in Boss Door Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Room Before Boss Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 125, y: 118, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 40,
                        LongDescription: "Once in the Dodongo head, look in two of the corners of the next big room for these pots."
                    },
                    "2 Pots in Back Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Armos Army Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 194, y: 77, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 41,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise through the first hallway. Once in the next room, the pots will be in the corners to your left and right on the back wall."
                    },
                    "Chest in Back Poe Room": {
                        SpoilerLogName: "Dodongos Cavern MQ Under Grave Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 196, y: 19, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 42,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise around the rooms. Enter the door near all the Armos statues. In this room, the chest is under the gravestone."
                    },
                    "2 Pots in Back Poe Room": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Back Poe Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 199, y: 20, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 43,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise around the rooms. Enter the door near all the Armos statues. The pots are on the right wall's corners in this room."
                    },
                    "Skulltula in Back Room": {
                        SpoilerLogName: "Dodongos Cavern MQ GS Back Area",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 196, y: 59, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 44,
                        LongDescription: "After dealing with all the Armos statues in the Dodongo head, climb up the stairs. Jump to the ledge to get to the skulltula on top."
                    },
                    "2 Pots After Armos Army": {
                        SpoilerLogName: [{
                            name: "Dodongos Cavern MQ Armos Army Room Upper Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 176, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 45,
                        LongDescription: "After dealing with all the Armos statues in the Dodongo head, climb the stairs. These are the pots to your left before you enter the hallway."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Inside Dondongo Head", imageName: "Goron's Ruby" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Dodongo's Cavern"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Jabu Jabu's Belly": {
        Abbreviation: "JABU",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        UseChildAge: function() { 
            return !Settings.RandomizerSettings.shuffleDungeonEntrances &&
                !Tricks.enterJabuAsAdult.enabled; 
        },
        _canHitMainRoomCowSwitch: function(age) {
            return ItemData.canUse(age, Items.FAIRY_SLINGSHOT) ||
                ItemData.canUse(age, [ItemSets.BLAST_OR_SMASH_ITEMS, QPAItemSets.HIGH_SWITCH_QPA]);
        },
        _canGetToElevatorRoomPlatformEarly: function(age) {
            return ItemData.canUseAny(age, [
                Equipment.HOVER_BOOTS,
                [Items.FAIRY_SLINGSHOT, Items.HOOKSHOT],
                [ItemLocationSets.MQ_JABU_ELEVATOR_ROOM_CHEST, Items.HOOKSHOT],
                Tricks.megaFlip.canDo
            ]);
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby & Elevator Room", imageName: "Fairy Slingshot" },
                Exits: {
                    elevatorRoom: {
                        NeedsAny: [
                            ItemLocationSets.MQ_JABU_OPENED_FIRST_ROOR,
                            (age) => MapLocations["Jabu Jabu's Belly"]._canHitMainRoomCowSwitch(age)
                        ]
                    },
                    Exit: {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Wonderitem in First Room Right Cow": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Entryway Right Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 184, y: 236, floor: "F1" },
                        MapImageName: "Slingshot Wonderitem",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "In the first room, shoot the right cow to spawn this wonderitem.",
                        Needs: [(age) => MapLocations["Jabu Jabu's Belly"]._canHitMainRoomCowSwitch(age)]
                    },
                    "Wonderitem in First Room Left Cow": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Entryway Left Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 164, y: 236, floor: "F1" },
                        MapImageName: "Slingshot Wonderitem",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "In the first room, shoot the left cow to spawn this wonderitem.",
                        Needs: [(age) => MapLocations["Jabu Jabu's Belly"]._canHitMainRoomCowSwitch(age)]
                    },
                    "Opened First Door": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 173, y: 215, floor: "F1" },
                        MapImageName: "Fairy Slingshot",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.shuffleDungeonEntrances ||
                                Tricks.enterJabuAsAdult.enabled; 
                        },
                        Order: 2.1,
                        LongDescription: "In the first room, shoot the left cow to open the door.",
                        Needs: [(age) => MapLocations["Jabu Jabu's Belly"]._canHitMainRoomCowSwitch(age)]
                    },
                    "2 Pots in First Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ First Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 165, y: 246, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "These two pots are on the edge of the water in the first room, on opposite sides of each other."
                    },
                    "Map Chest": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 173, y: 269, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4.1,
                        LongDescription: "In the first room, destroy the yellow rock and hit the switch underneath to spawn the chest.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
                    },
                    "Chest in Main Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ First Room Side Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 181, y: 279, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 4.2,
                        LongDescription: "In the first room, shoot the right cow with your slingshot to spawn the chest.",
                        Needs: [(age) => MapLocations["Jabu Jabu's Belly"]._canHitMainRoomCowSwitch(age)]
                    }
                }
            },
            elevatorRoom: {
                DisplayGroup: { groupName: "Lobby & Elevator Room", imageName: "Fairy Slingshot" },
                Exits: {
                    elevatorRoomPlatform: {
                        NeedsAny: [ItemLocationSets.MQ_JABU_ELEVATOR_LOWERED,
                            (age) => MapLocations["Jabu Jabu's Belly"]._canGetToElevatorRoomPlatformEarly(age)]
                    },
                    lowerElevatorRoom: {},
                    basement: {},
                    northernRooms: {
                        Needs: [ItemSets.EXPLOSIVES, Items.FAIRY_SLINGSHOT],
                        NeedsAny: [Items.BOOMERANG, QPAItemSets.LEDGE_QPA]
                    },
                    afterRedTentaclesDefeated: {
                        Needs: [ItemLocationSets.MQ_JABU_RED_TENTACLES_DEFEATED]
                    },
                    afterGreenTentacleDefeated: {
                        Needs: [ItemLocationSets.MQ_JABU_GREEN_TENTACLE_DEFEATED]
                    }
                },
                ItemLocations: {
                    "2 Hearts in Elevator Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 162, y: 187, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "These items are between the jellos in the room after the first door. Use the elevator to get to them."
                    },
                    "Wonderitem in Elevator Room Cow": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Elevator Room Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 186, y: 179, floor: "F1" },
                        MapImageName: "Slingshot Wonderitem",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 5.1,
                        LongDescription: "Shoot the cow in the room after the first door to spawn the wonderitem. It will fall below, so you'll have to retrieve it there!",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "Spawn Chest in Upper Elevator Room": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 186, y: 179, floor: "F1" },
                        MapImageName: "Fairy Slingshot",
                        RequiredToAppear: function() {
                            let adultCanEnter = Settings.RandomizerSettings.shuffleDungeonEntrances ||
                                Tricks.enterJabuAsAdult.enabled;
                            let adultCanSpawnIt = ItemData.canUse(Age.ADULT, Items.FAIRY_SLINGSHOT);
                            return adultCanEnter && !adultCanSpawnIt;
                        },
                        Age: Age.CHILD,
                        Order: 5.2,
                        LongDescription: "Shoot the cow in the room after the first door to spawn the chest.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    }
                }
            },
            elevatorRoomPlatform: {
                DisplayGroup: { groupName: "Lobby & Elevator Room", imageName: "Fairy Slingshot" },
                Exits: {},
                ItemLocations: {
                    "Chest in Upper Elevator Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Second Room Upper Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 192, y: 188, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5.3,
                        LongDescription: "Bring Ruto to Big Octo by riding the water up with her, then jumping to the platform. After killing it, ride the elevator up, shoot the cow on the wall, and proceed through the door. In the next room, shoot the next cow on the wall to spawn some boxes. Take them across the jelly things to hold down the switch. Ride the platform down. Shoot the cow near where the platform landed to spawn the chest.",
                        NeedsAny: [Items.FAIRY_SLINGSHOT, ItemLocationSets.MQ_JABU_ELEVATOR_ROOM_CHEST]
                    }
                }
            },
            lowerElevatorRoom: {
                DisplayGroup: { groupName: "Lower Elevator Room", imageName: "Silver Scale" },
                Exits: {},
                ItemLocations: {
                    "Chest in Lower Elevator Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Second Room Lower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 209, y: 221, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "After going through the first door, drop down to the bottom. The chest is by the door."
                    },
                    "Chest in Hidden Water Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 116, y: 229, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. Shoot the cow in the water (with a projectile, chu, or hookshot) behind you after you climb up to spawn the chest.",
                        NeedsAny: [ItemSets.PROJECTILES, Items.BOMBCHU, Items.HOOKSHOT]
                    },
                    "2 Pots in Hidden Water Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Elevator Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 116, y: 224, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. The pots are on the platform."
                    },
                    "3 Rupees in Hidden Water Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Underwater Green Rupee {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Jabu Rupees",
                        MapInfo: { x: 132, y: 229, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. The rupees are in the water. You'll need iron boots, boomerang, or silver/gold scales for two of them."
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Lon Lon Milk" },
                Exits: {},
                ItemLocations: {
                    "3 Wonderitems in Left Big Room Cow": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Basement Left Cow Wonderitem {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 QPAable Slingshot Wonderitems",
                        MapInfo: { x: 148, y: 84, floor: "B1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 9.1,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole normally blocked by the tentacle (upper leftmost hole). Shoot the left cow three times to spawn three different wonderitems."
                    },
                    "3 Wonderitems in Right Big Room Cow": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Basement Right Cow Wonderitem {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Slingshot Wonderitems",
                        MapInfo: { x: 158, y: 37, floor: "B1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 9.2,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole normally blocked by the tentacle (upper leftmost hole). Shoot the right cow three times to spawn three different wonderitems."
                    },
                    "East Chest in Big Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Basement Near Switches Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 205, y: 54, floor: "B1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the right cow on the wall to spawn this chest.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "West Chest in Big Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Basement Near Vines Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 108, floor: "B1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the left cow on the wall to spawn this chest.",
                        NeedsAny: [Items.FAIRY_SLINGSHOT, QPAItemSets.LEDGE_QPA]
                    },
                    "Free Chest in Path to Elevator Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Boomerang Room Small Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 318, y: 134, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. There is an easily accessible chest in here."
                    },
                    "Enemy Chest in Path to Elevator Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Boomerang Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 258, y: 152, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. Defeat all the enemies in the water to spawn the chest."
                    },
                    "2 Pots in Path to Elevator Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Boomerang Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 258, y: 153, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. The pots are on the ledge up the vines."
                    },
                    "Skulltula Under Song of Time Block": {
                        SpoilerLogName: "Jabu Jabus Belly MQ GS Boomerang Chest Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 297, y: 147, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "In the path leading to the elevator room, there's a skulltula under the Song of Time block. Play the song to move the block.<br/><br/>If you have the boomerang, you can also aim it to the left and slightly downward to get the skulltula through the block.<br/><br/>The hookshot extension can be used for this from the left side of the block (pretty precise). First, kill the skulltula with your sword through the block.",
                        NeedsAny: [Songs.SONG_OF_TIME, Tricks.boomerangThroughWalls.canDo, Tricks.hookshotExtensionSotBlocks.canDo],
                        TricksToShow: [Tricks.hookshotExtensionSotBlocks]
                    }
                }
            },
            northernRooms: {
                DisplayGroup: { groupName: "Tentacle Rooms", imageName: "Boomerang" },
                UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                Exits: {
                    afterRedTentaclesDefeated: {
                        Needs: [Items.BOOMERANG],
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK, QPAItemSets.LEDGE_QPA]
                    },
                    afterGreenTentacleDefeated: {
                        Needs: [Items.BOOMERANG, ItemSets.BLAST_OR_SMASH_ITEMS]
                    }
                },
                ItemLocations: {
                    "2 Small Crates in Northern Hallways": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Hallway Small Crate {#}",
                            count: 2,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 156, y: 60, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 15.1,
                        LongDescription: "In the room beyond the room with holes, go left to find the crates."
                    },
                    "3 Wonderitems in Like Like Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Falling Like-Like Room Explosives Wonderitem {#}",
                            count: 3,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Explosive Wonderitems",
                        MapInfo: { x: 196, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 15.99,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. Use an explosive on the plant in the middle of the room to spawn these items.",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    "2 Pots in Like Like Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Falling Like Like Room Pot {#}",
                            count: 2,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 12, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. The pots are in the back of this room."
                    },
                    "3 Wonderitems in Left Like Like Room Cow": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Falling Like-Like Room Left Cow Wonderitem {#}",
                            count: 3,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Slingshot Wonderitems",
                        MapInfo: { x: 186, y: 16, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 16.1,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. Shoot the left cow three times to spawn three wonderitems.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "3 Wonderitems in Right Like Like Room Cow": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Falling Like-Like Room Right Cow Wonderitem {#}",
                            count: 3,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Slingshot Wonderitems",
                        MapInfo: { x: 205, y: 16, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 16.2,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. Shoot the right cow three times to spawn three wonderitems.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "Chest in Like Like Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Falling Like Like Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 195, y: 12, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. Shoot the cows, then kill the Like Likes that fall to spawn the chest.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    }
                }
            },
            afterRedTentaclesDefeated: {
                DisplayGroup: { groupName: "Tentacle Rooms", imageName: "Boomerang" },
                Exits: {
                    roomBeforeBoss: {
                        NeedsAny: [ItemLocationSets.MQ_JABU_ELEVATOR_LOWERED,
                            (age) => MapLocations["Jabu Jabu's Belly"]._canGetToElevatorRoomPlatformEarly(age)]
                    }
                },
                ItemLocations: {
                    "Skulltula on Ceiling": {
                        SpoilerLogName: "Jabu Jabus Belly MQ GS Tailpasaran Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 157, y: 14, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "Using a deku stick to bring a fire from the Like Like room, or a fire item, burn the web to get access to the far west room. After killing the tentacle, head to the far east room and kill that tentacle. Now leave and enter the room to your left. Use the switch and a bomb, or a bombchu to blow up the rock on the ceiling to reveal the skulltula.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Red Tentacles Defeated": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 107, y: 56, floor: "F1" },
                        MapImageName: "Boomerang",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "This is the task to defeat the two red tentacles (the east/west rooms). This is used to help see what Adult can do if he cannot use the boomerang."
                    },
                    "Skulltula Behind Web": {
                        SpoilerLogName: "Jabu Jabus Belly MQ GS Invisible Enemies Room",
                        DisplayGroup: { groupName: "Basement", imageName: "Lon Lon Milk" },
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 191, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "After destroying all the tentacles, drop down into the big room and enter the door by the vines. The skulltula is in the back of the room. Kill the enemies (some are invisible) or megaflip/hover boots to the other side. Walk around the web to get to the skulltula.",
                        Needs: [
                            // Cross water
                            [SetType.OR, 
                                Equipment.HOVER_BOOTS,
                                [Items.LENS_OF_TRUTH, 
                                    [SetType.OR, ItemSets.PROJECTILES, Items.HOOKSHOT]],
                                Tricks.megaFlip.canDo],
                            // Collect token
                            [SetType.OR, 
                                ItemSets.GRAB_SHORT_DISTANCE_ITEMS,
                                Tricks.staircaseHover.canDo]]
                    }
                }
            },
            afterGreenTentacleDefeated: {
                DisplayGroup: { groupName: "Tentacle Rooms", imageName: "Boomerang" },
                UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                Exits: {
                    afterBigOcto: {
                        Needs: [ItemSets.SWORDS]
                    }
                },
                ItemLocations: {
                    "Green Tentacle Defeated": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 175, y: 14, floor: "F1" },
                        MapImageName: "Boomerang",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "This is the task to defeat the green tentacle (the north rooms). This is used to help see what Adult can do if he cannot use the boomerang."
                    }
                }
            },
            afterBigOcto: {
                DisplayGroup: { groupName: "After Big Octo", imageName: "Ruto's Letter" },
                Exits: {
                    wigglerRoomAfterBigOcto: {
                        Needs: [Items.FAIRY_SLINGSHOT]
                    }
                },
                ItemLocations: {
                    "Wonderitem in Cow After Big Octo": {
                        SpoilerLogName: "Jabu Jabus Belly MQ After Big Octo Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 70, y: 53, floor: "F2" },
                        MapImageName: "Slingshot Wonderitem",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "Bring Ruto to Big Octo by riding the water up with her, then jumping to the platform. After killing it, ride the elevator up and shoot the cow on the wall to spawn the wonderitem.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    }
                }
            },
            wigglerRoomAfterBigOcto: {
                DisplayGroup: { groupName: "After Big Octo", imageName: "Ruto's Letter" },
                UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                Exits: {
                    elevatorRoomPlatform: {},
                    roomBeforeBoss: {}
                },
                ItemLocations: {
                    "2 Small Crates in Wiggler Room": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Small Crate Near Cow {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 102, y: 179, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20.1,
                        LongDescription: "Bring Ruto to Big Octo by riding the water up with her, then jumping to the platform. After killing it, ride the elevator up, shoot the cow on the wall, and proceed through the door. Shoot the cow in the wall in this room to spawn the crates by the door."
                    },
                    "Wonderitem in Wiggler Room Cow": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Wiggler Platforms Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 99, y: 276, floor: "F2" },
                        MapImageName: "Slingshot Wonderitem",
                        Age: Age.EITHER,
                        Order: 20.2,
                        LongDescription: "Bring Ruto to Big Octo by riding the water up with her, then jumping to the platform. After killing it, ride the elevator up, shoot the cow on the wall, and proceed through the door. Shoot the cow in the wall in this room to spawn the wonderitem."
                    },
                    "Cow in Wiggler Room": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Cow",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 108, y: 251, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "Bring Ruto to Big Octo by riding the water up with her, then jumping to the platform. After killing it, ride the elevator up, shoot the cow on the wall, and proceed through the door. Shoot the cow in the wall in this room to spawn the cow on the ground."
                    },
                    "Elevator Lowered": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 285, y: 235, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21.1,
                        LongDescription: "In the wiggler room after the Big Octo, shoot the cow on the wall to reveal some boxes. Use your boomerang to stun the wigglers and bring the box to the switch to open the door. Jump to the platform to lower it and create a path on the lower level."
                    }
                }
            },
            roomBeforeBoss: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Zora's Sapphire" },
                Exits: {
                    bossRoom: {}
                },
                ItemLocations: {
                    "2 Wonderitems in Room Before Boss Right Cow": {
                        SpoilerLogName: [{
                            name: "Jabu Jabus Belly MQ Before Boss Right Cow Wonderitem {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Slingshot Wonderitems",
                        MapInfo: { x: 243, y: 208, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 22.1,
                        LongDescription: "Shoot the right cow two times (it will rise up) to spawn two wonderitems."
                    },
                    "Wonderitem in Room Before Boss Left Cow": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Before Boss Left Cow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 263, y: 188, floor: "F1" },
                        MapImageName: "Slingshot Wonderitem",
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 22.2,
                        LongDescription: "Shoot the left cow in this room to spawn this wonderitem.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "Chest in Room Before Boss": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Near Boss Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 234, y: 175, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "Shoot the left cow in this room to spawn the chest.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "Pot in Room Before Boss": {
                        SpoilerLogName: "Jabu Jabus Belly MQ Near Boss Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 240, y: 160, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 23.1,
                        LongDescription: "This pot is next to the boss room door."
                    },
                    "Skulltula in Room Before Boss": {
                        SpoilerLogName: "Jabu Jabus Belly MQ GS Near Boss",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 244, y: 189, floor: "F1" },
                        Age: Age.EITHER,
                        NeedsAny: [Items.BOOMERANG, UpgradedItems.LONGSHOT],
                        Order: 24,
                        LongDescription: "Climb up the vines and use your boomerang to get this skulltula. Adult can snipe it from the corner by the entrance to the room with the longshot."
                    }
                }
            },
            bossRoom: {
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Forest Temple": {
        Abbreviation: "FRST",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canAccessAllPoeRooms: function(age) {
            // Requires an IsPostWalkCheck on each item using this!
            return ItemData.canUse(age, [
                MapAccessSets.MQ_FOREST_POE_ROOMS,
                MapAccessSets.MQ_FOREST_GREEN_POE_ROOM]);
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Starting Rooms", imageName: "Chest" },
                Exits: {
                    afterFirstHallway: {
                        LockedDoor: "Locked Door to Lobby",
                        Map: "Forest Temple",
                        NeedsAny: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
                    },
                    Exit: {
                        OwExit: OwExits["Forest Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Chest in Main Room": {
                        SpoilerLogName: "Forest Temple MQ First Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 188, y: 251, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Climb the vines (it's easier to climb from the left side of the tree) and navigate across the trees to hit the switch to spawn the chest.",
                        NeedsAny: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
                    },
                    "Skulltula in First Hallway": {
                        SpoilerLogName: "Forest Temple MQ GS First Hallway",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 163, y: 193, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        LongDescription: "The skulltula is above the door at the end of the first hallway."
                    },

                    // Locked doors
                    "Locked Door to Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 169, y: 189, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "This is the door at the end of the first hallway.",
                        StartingDoorRequirement: () => true,
                        NextDoors: { 
                            "Locked Door by Twisted Corridor": () => true,
                            "Locked Door in Falling Ceiling Room": () => 
                                Tricks.megaFlip.enabled || Tricks.forestGreenPoeEarly.enabled,
                        },
                        NeedsAny: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
                    },
                    "Locked Door by Twisted Corridor": {
                        DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Goron's Bracelet" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["topOfBlockRoom"],
                        MapInfo: { x: 42, y: 198, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "This is the door that's after the block puzzle by the bubbles.",
                        NextDoors: { "Locked Door After Twisted Hallway": () => true }
                    },
                    "Locked Door After Twisted Hallway": {
                        DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedHallway"],
                        MapInfo: { x: 80, y: 57, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 17.1,
                        LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
                        NextDoors: { "Locked Door in Blue Poe Room": () => true }
                    },
                    "Locked Door in Blue Poe Room": {
                        DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["poeRooms"],
                        MapInfo: { x: 282, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "This is the door that's in the blue poe room.",
                        NextDoors: { "Locked Door in Green Bubble Hallway": () => true }
                    },
                    "Locked Door in Green Bubble Hallway": {
                        DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedCooridor2"],
                        MapInfo: { x: 319, y: 154, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
                        NextDoors: { "Locked Door in Falling Ceiling Room": () => true }
                    },
                    "Locked Door in Falling Ceiling Room": {
                        DisplayGroup: { groupName: "Falling Ceiling Rooms", imageName: "Small Poe" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fallingCeilingRoom", "greenPoeRoom"],
                        MapInfo: { x: 318, y: 132, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "This is the door that's at the end of the falling ceiling room."
                    }
                }
            },
            afterFirstHallway: {
                DisplayGroup: { groupName: "Starting Rooms", imageName: "Chest" },
                Exits: {
                    roomNorthOfLobby: {
                        AdultNeedsAny: [Songs.SONG_OF_TIME, Tricks.forestSoTBlockLedgeClip.canDo]
                    }, 
                    outsideEast: {
                        Needs: [ItemSets.PROJECTILES]
                    },
                    outsideWest: {
                        Needs: [ItemSets.PROJECTILES]
                    },
                    blockRoom: {
                        Needs: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    },
                    greenPoeRoom: {
                        Age: Age.ADULT,
                        Needs: [Tricks.forestGreenPoeEarly.canDo]
                    },
                    // Note that all item locations here (and in the boss room) will have IsPostWalkCheck set to true, we need to make sure that we can get to both the
                    // fallingCeilingRoom and the firstPoeRoom in order to actually get here
                    basement: {
                        Age: Age.ADULT,
                        AdultNeeds: [Items.FAIRY_BOW]
                    },
                    bossRoom: {
                        Age: Age.ADULT,
                        Needs: [Tricks.forestBKSkip.canDo]
                    }
                },
                ItemLocations: {
                    "3 Pots Left in Lobby": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Center Room Left Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 142, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltulas. the pots are on the ledge to the left."
                    },
                    "3 Pots Right in Lobby": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Center Room Right Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 194, y: 164, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltulas. the pots are on the ledge to the right."
                    }
                }
            },
            roomNorthOfLobby: {
                DisplayGroup: { groupName: "Starting Rooms", imageName: "Chest" },
                Exits: {},
                ItemLocations: {
                    "Chest North of Main Room": {
                        SpoilerLogName: "Forest Temple MQ Wolfos Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 31, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "Proceed straight ahead in the main room. After the hallway, kill the two wolfos to spawn the chest.<br/><br/>If you don't have the song of time, it's possible to get here from the above room. This is the room after the red poe room - drop down before killing the first Stalfos.",
                        TricksToShow: [Tricks.forestSoTBlockLedgeClip],
                        Needs: [ItemSets.SWORDS]
                    },
                    "2 Pots North of Main Room": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Wolfos Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 171, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula and into the next door across the big room. The room with the pot is the one after the song of time block (not there as Child). The pots are in the back of the room.<br/><br/>If you don't have the song of time, it's possible to get here from the above room. This is the room after the red poe room - drop down before killing the first Stalfos.",
                        TricksToShow: [Tricks.forestSoTBlockLedgeClip],
                    }
                }
            },
            outsideWest: {
                DisplayGroup: { 
                    groupName: "Lower Courtyards & Well", 
                    imageName: "3 Hearts",
                    description: "The outside courtyard rooms, accessed by the eye switch from the lobby, or after the twisted cooridor.",
                    tricksToShow: [Tricks.forestHookshotToWellSwitch]
                },
                Exits: {
                    outsideEast: { // Via the well - eye switch doesn't matter because the other way in covers that
                        Age: Age.ADULT,
                        NeedsAny: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    outsideEastBalcony: { // Burn the web, to go through to the top platform
                        Age: Age.ADULT,
                        Needs: [Items.FIRE_ARROW]
                    },
                    outsideWestHearts: {
                        Needs: [Tricks.boomerangTrickThrows.canDo]
                    },
                    well: {}
                },
                ItemLocations: {
                    "Skulltula in Outside West Room": {
                        SpoilerLogName: "Forest Temple MQ GS Level Island Courtyard",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 81, y: 124, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Located on top of the platform near the well."
                    }
                }
            }, 
            outsideEast: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "3 Hearts" },
                Exits: {
                    // Excluding east to west because it would require you to have gone through west anyway
                    // OR to already have the means to get there from the lobby

                    outsideEastBalcony: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT],
                        NeedsAny: [
                            Songs.SONG_OF_TIME,
                            UpgradedItems.LONGSHOT,
                            Tricks.forestHookshotToWellSwitch.canDo
                        ]
                    },
                    outsideEastDoorFrame: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    },
                    outsideEastSkulltula: {
                        Age: Age.EITHER,
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    outsideEastPlatform: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    well: {}
                },
                ItemLocations: {}
            },
            outsideEastBalcony: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "3 Hearts" },
                Exits: {
                    outsideEast: {},
                    outsideEastDoorFrame: {
                        Age: Age.ADULT,
                        Needs: [Tricks.mqForestHoverBootsToDoorFrame.canDo]
                    },
                    outsideEastPlatform: {
                        Age: Age.ADULT,
                        Needs: [Tricks.forestLedgeWithHoverBoots.canDo]
                    },
                    fallingCeilingRoom: {
                        // Climb the close edge of the railing, take tiny steps forward, and face barely toward
                        // the ledge so that rolling doesn't make you fall off
                        // Only works with a chu
                        Needs: [Tricks.megaFlip.canDoWithChu]
                    }
                },
                ItemLocations: {
                    "Chest on Outside East Room Balcony": {
                        SpoilerLogName: "Forest Temple MQ Raised Island Courtyard Upper Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 224, y: 53, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "Hookshot up the doorframe leading to this room. Repeatedly play the Song of Time and jump to the end of the blocks it spawns until you can get to the balcony with the chest.<br/><br/>You can also use the longshot on the vines by the balcony to get up, OR go around from the west room with a fire arrow."
                    }
                }
            },
            outsideEastDoorFrame: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "3 Hearts" },
                Exits: {
                    outsideEastPlatform: {
                        Age: Age.ADULT,
                        Needs: [Tricks.hammerHoverBootsSuperslide.canDo]
                    },
                    outsideEastSkulltula: {
                        NeedsAny: [ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE]
                    },
                    outsideEast: {}
                },
                ItemLocations: {}
            },
            outsideEastSkulltula: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "3 Hearts" },
                Exits: {},
                ItemLocations: {
                    "Skulltula Above Outside East Door": {
                        SpoilerLogName: "Forest Temple MQ GS Raised Island Courtyard",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 226, y: 98, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7.1,
                        LongDescription: "The skulltula is above the doorframe leading to this room. Get it with your boomerang or hookshot.",
                        TricksToShow: [Tricks.mqForestHoverBootsToDoorFrame]
                    }
                }
            },
            well: { // Just used as its own location, but not to travel between east and west apparently
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "3 Hearts" },
                Exits: {},
                ItemLocations: {
                    "Chest in Well": {
                        SpoilerLogName: "Forest Temple MQ Well Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 242, y: 46, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "This chest is in the well. If you can't drain the water with the eye switch (in the well itself from the east room), you can hookshot the chest and spam the button to open it.",
                        NeedsAny: [
                            ItemSets.PROJECTILES,
                            [Items.HOOKSHOT, Equipment.IRON_BOOTS]
                        ]
                    },
                    "3 Hearts in Well": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Well Recovery Heart {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 181, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "This chest is in the well. Use iron boots if you can't drain the water with the eye switch (in the well itself from the east room).",
                        NeedsAny: [ItemSets.PROJECTILES, Equipment.IRON_BOOTS]
                    },
                    "Skulltula in Well": {
                        SpoilerLogName: "Forest Temple MQ GS Well",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 114, y: 34, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This skulltula is on one of the grates in the water of the well (in the well itself from the east room). If you can't shoot the eye switch to drain the water, you can still get the skulltula with iron boots and the hookshot.",
                        NeedsAny: [
                            ItemSets.PROJECTILES,
                            [Items.HOOKSHOT, Equipment.IRON_BOOTS]
                        ]
                    }
                }
            },
            blockRoom: {
                DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Goron's Bracelet" },
                Exits: {
                    topOfBlockRoom: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.STRENGTH,
                            [Items.HOOKSHOT, Items.BOMBCHU], // Line up with the center wall as you first enter, and drop the chu
                            Tricks.forestBlockSkipWithHoverBoots.canDo
                        ]
                    },
                    upperOutside: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.HOVER_BOOTS, // Jumpslash the switch above
                            [Tricks.weirdShot.canDo, Tricks.megaFlip.canDo] // Weird shot with your side to the switch
                        ] 
                    }
                },
                ItemLocations: {
                    "Skulltula in Block Room": {
                        SpoilerLogName: "Forest Temple MQ GS Block Push Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 66, y: 171, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Proceed through the main room's western hallway. The skulltula is to the left on the ground level."
                    }
                }
            },
            topOfBlockRoom: {
                DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Goron's Bracelet" },
                Exits: {
                    twistedHallway: {
                        LockedDoor: "Locked Door by Twisted Corridor",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {}
            },
            twistedHallway: {
                DisplayGroup: { 
                    groupName: "Untwisted Corridor & Upper Courtyard", 
                    imageName: "Boss Key",
                    description: "The area above the upper courtyard that you drop to it from, and the upper courtyard itself.",
                    tricksToShow: [Tricks.forestBlockSkipWithHoverBoots]
                },
                Exits: {
                    upperOutside: {},
                    poeRooms: {
                        LockedDoor: "Locked Door After Twisted Hallway",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {
                    "Boss Key": {
                        SpoilerLogName: "Forest Temple MQ Boss Key Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 66, y: 45, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "After the block puzzle room and the twisted hallway, jump down to get the boss key chest. Be wary of the Wallmaster!<br/><br/>Note that if you don't have strength, you can get here using chus and hookshot. From the entrance to the block room, go to the center of the wall to your left and drop the chu - it will hit the switch. Now hookshot up the targets and navigate to the door."
                    }
                }
            },
            upperOutside: {
                DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                Exits: {
                    outsideWestHearts: {},
                    outsideWest: {}
                },
                ItemLocations: {
                    "Chest in Redead Room": {
                        SpoilerLogName: "Forest Temple MQ Redead Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 100, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "Fall down the hole in the boss key room. Kill the Floormaster and proceed through the door. Take the first door in one of the small hallways to your right. Kill the redead to spawn the chest."
                    }
                }
            },
            outsideWestHearts: {
                DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                Exits: {},
                ItemLocations: {
                    "3 Hearts Above Left Room": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Courtyard Recovery Heart {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 81, y: 73, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.boomerangTrickThrows.enabled; },
                        Order: 16,
                        LongDescription: "Fall down the hole in the boss key room. Kill the Floormaster and proceed through the door. <br/><br/>The hearts are on the skinny platform that you have to jump to, near the skulltula on the wall. Be careful not to fall off."
                    }
                }
            },
            poeRooms: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    roomNorthOfLobby: {
                        // You can jump down the hole in this room to bypass the Song of Time block in the lobby
                        // This cannot be done if you've already cleared the room, though
                        Needs: [ItemLocationSets.MQ_FOREST_DID_NOT_CLEAR_UPPER_STALFOS_ROOM]
                    }, 
                    twistedCooridor2: {
                        LockedDoor: "Locked Door in Blue Poe Room",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {
                    "Red Poe Chest": {
                        SpoilerLogName: "Forest Temple MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 52, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 18,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Shoot the portraits as normal and kill the poe to spawn the chest."
                    },
                    "Chest in Stalfos Room": {
                        SpoilerLogName: "Forest Temple MQ Bow Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 191, y: 65, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Navigate through the Red Poe room and kill the three Stalfos to spawn the chest.<br/><br/>NOTE: If you can't play the song of time, consider dropping down before killing the first stalfos to get a chest that you'll lock yourself out of."
                    },
                    "4 Pots in Upper Stalfos Room": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Upper Stalfos Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 192, y: 48, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "These pots are against the walls in the room after the red poe room."
                    },
                    "3 Pots in Blue Poe Room": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Blue Poe Room Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 240, y: 43, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "These pots are in the room after the fairy bow chest, just to your left when you enter."
                    },
                    "Blue Poe Chest": {
                        SpoilerLogName: "Forest Temple MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 244, y: 52, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 22,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Head to the blue poe room, which is after the Stalfos room. Shoot the portraits as normal and kill the poe to spawn the chest."
                    }
                }
            },
            twistedCooridor2: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    carouselRoom: {
                        LockedDoor: "Locked Door in Green Bubble Hallway",
                        Map: "Forest Temple",
                    }
                },
                ItemLocations: {}
            },
            carouselRoom: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    fallingCeilingRoom: {
                        NeedsAny: [Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "2 Crates on Carousel Room Floor": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Frozen Eye Switch Room Small Wooden Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 331, y: 208, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. The crates are the small ones in the back left corner of the room."
                    },
                    "Crate on Carousel Room Platform": {
                        SpoilerLogName: "Forest Temple MQ Frozen Eye Switch Room Small Wooden Crate 3",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 298, y: 193, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. The crate is up on the platform to your right."
                    }
                }
            },
            outsideEastPlatform: {
                DisplayGroup: { 
                    groupName: "Falling Ceiling Rooms", 
                    imageName: "Small Poe",
                    description: "The room with the falling ceiling and the green poe room, reached after falling down after the red/green poe rooms.",
                    tricksToShow: [Tricks.forestGreenPoeEarly]
                },
                Exits: {
                    fallingCeilingRoom: {
                        Needs: [Songs.SONG_OF_TIME]
                    }
                },
                ItemLocations: {
                    "Chest on Outside Platform": {
                        SpoilerLogName: "Forest Temple MQ Raised Island Courtyard Lower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 268, y: 73, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "The quickest way to get here is to longshot the chest from the outside east room. Otherwise...<br/><br/>Hit the left switch deep in the checkerbaord room. Now backtrack and take the door to the right of where you entered the room (NOT the locked door). Drop down to get the chest. If you don't have the Song of Time, you'll have to navigate all the way around to get back. Otherwise, play it to make a platform back up.",
                        TricksToShow: [Tricks.forestLedgeWithHoverBoots]
                    }
                }
            },
            fallingCeilingRoom: {
                DisplayGroup: { groupName: "Falling Ceiling Rooms", imageName: "Small Poe" },
                Exits: {
                    outsideEastPlatform: {},
                    greenPoeRoom: {
                        LockedDoor: "Locked Door in Falling Ceiling Room",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {
                    "Chest in Checkerboard Room": {
                        SpoilerLogName: "Forest Temple MQ Falling Ceiling Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 323, y: 104, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "This room is found after twisting the cooridor with the Green Bubbles. Fall down the hole that's now accessible. Once in the room, hit one of the switches in this room to spawn the chest."
                    }
                }
            },
            greenPoeRoom: {
                DisplayGroup: { groupName: "Falling Ceiling Rooms", imageName: "Small Poe" },
                Exits: {
                    fallingCeilingRoom: {
                        LockedDoor: "Locked Door in Falling Ceiling Room",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {
                    "2 Pots in Green Poe Room": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Green Poe Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 303, y: 146, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Make your way to the falling ceiling room. Nagivate through it to the green poe room. The pots are by the exit door."
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Forest Medallion" },
                Exits: {
                    bossRoom: {
                        Needs: [KeySets.FOREST_BK]
                    }
                },
                ItemLocations: {
                    "4 Pots in Basement": {
                        SpoilerLogName: [{
                            name: "Forest Temple MQ Basement Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 137, y: 238, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        IsPostWalkCheck: true,
                        LongDescription: "After defeating all the Poes, take the elevator to the basement. Push the wall clockwise once. The pots are in the room guarded by two giant skulltulas.",
                        Needs: [(age) => MapLocations["Forest Temple"]._canAccessAllPoeRooms(age)]
                    },
                    "Chest in Basement": {
                        SpoilerLogName: "Forest Temple MQ Basement Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 143, y: 156, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        IsPostWalkCheck: true,
                        LongDescription: "After defeating all the Poes, take the elevator to the basement. Push the wall counter-clockwise once to get to the chest.",
                        Needs: [(age) => MapLocations["Forest Temple"]._canAccessAllPoeRooms(age)]
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Basement", imageName: "Forest Medallion" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Forest Temple"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Fire Temple": {
        Abbreviation: "FIRE",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F5", "F4", "F3", "F2", "F1"],
        StartingFloorIndex: 4,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        Regions: {
            main: {
                DisplayGroup: { 
                    groupName: "Lobby & Hammer Path", 
                    imageName: "Megaton Hammer",
                    description: "The first room of the temple.",
                    tricksToShow: [Tricks.fireWallSkip]
                },
                Exits: {
                    roomBeforeBoss: {
                        Needs: [GameStateSets.FIRE_TEMPLE_TUNIC_CHECK],
                        NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.TALL_TORCH_QPA],
                        ChildNeedsAny: [Tricks.fireWallSkip.canDo, Tricks.bombSuperslide.canDo]
                    },
                    lockedAreaByEntrance: {
                        LockedDoor: "Bottom Locked Door in Lobby",
                        Map: "Fire Temple"
                    },
                    cellByEntrance: {
                        Age: Age.ADULT,
                        Needs: [Tricks.weirdShot.canDo]
                    },
                    bigLavaRoom: {
                        Needs: [Items.MEGATON_HAMMER, GameStateSets.FIRE_TEMPLE_TUNIC_CHECK],
                        ChildNeedsAny: [Tricks.fireWallSkip.canDo, Tricks.bombSuperslide.canDo]
                    },
                    Exit: {
                        OwExit: OwExits["Fire Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    "2 Pots by Entrance": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ First Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 99, y: 250, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "The pots are to your left and right in the corners as you enter the temple."
                    },
                    "Like-Like Chest By Entrance": {
                        SpoilerLogName: "Fire Temple MQ Map Room Side Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 123, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        Needs: [ItemSets.DAMAGING_ITEMS],
                        LongDescription: "Enter the left door by the entrance. Kill the Like-Like to spawn the chest."
                    },

                    // Locked Doors
                    "Bottom Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 126, y: 214, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "This is the locked door on the right side of the lobby.",
                        StartingDoorRequirement: () => true
                    },
                    "Locked Door in Big Lava Room": {
                        DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["bigLavaRoom"],
                        MapInfo: { x: 256, y: 202, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Tricks.fireNoGoronTunic.enabled ||
                                (!Tricks.bombSuperslide.enabled && !Tricks.fireWallSkip.enabled) ||
                                !Tricks.equipSwap.enabled;
                        },
                        Order: 18,
                        LongDescription: "This is the locked door on the far side of the big lava room.",
                        StartingDoorRequirement: () => true,
                        NextDoors: { "Locked Door Above Boulder Maze": () => true }
                    },
                    "Locked Door Above Boulder Maze": {
                        DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["boulderMazeTop"],
                        MapInfo: { x: 277, y: 121, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "This is the locked door on the top of the boulder maze.",
                        NextDoors: { "Locked Door After Flare Dancer": () => true }
                    },
                    "Locked Door After Flare Dancer": {
                        DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Skulltula" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterFinalFlareDancer"],
                        MapInfo: { x: 39, y: 179, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "This is the locked door after riding the elevator up from the Flare Dancer fight.",
                        NextDoors: { "Locked Door Under Hammer Floor": () => true }
                    },
                    "Locked Door Under Hammer Floor": {
                        DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Skulltula" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomAfterTopOfTemple"],
                        MapInfo: { x: 71, y: 136, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "This is the locked door after pounding the floor down at the top of the temple."
                    }
                }
            },
            lockedAreaByEntrance: {
                DisplayGroup: { groupName: "Lobby & Hammer Path", imageName: "Megaton Hammer" },
                Exits: {
                    cellByEntrance: {
                        Needs: [Items.MEGATON_HAMMER]
                    }
                },
                ItemLocations: {
                    "8 Pots by Iron Knuckle": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Iron Knuckle Room Pot {#}",
                            count: 8
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "8 Pots",
                        MapInfo: { x: 107, y: 38, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Enter the locked door to the right when you first enter the temple. Defeat the stalfos and proceed. The pots scattered around the next room.",
                        Needs: [ItemSets.DAMAGING_ITEMS]
                    },
                    "Chest After First Flare Dancer": {
                        SpoilerLogName: "Fire Temple MQ Megaton Hammer Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 57, y: 60, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.groundJump.enabled; },
                        Order: 9,
                        LongDescription: "Enter the locked door to the right when you first enter the temple. Navigate around the rooms, defeating the enemies to progress (including an Iron Knuckle). Defeat the Flare Dancer to spawn the chest.",
                        ChildNeeds: [Tricks.groundJump.canDoWithBomb, ItemSets.SWORDS],
                        AdultNeedsAny: [Items.HOOKSHOT, Items.MEGATON_HAMMER, Items.BOMB, Items.BOMBCHU]
                    }
                }
            },
            cellByEntrance: {
                DisplayGroup: { groupName: "Lobby & Hammer Path", imageName: "Megaton Hammer" },
                Exits: {},
                ItemLocations: {
                    "Chest by Goron After Flare Dancer": {
                        SpoilerLogName: "Fire Temple MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 110, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
                        Order: 10,
                        LongDescription: "After the Flare Dancer, enter the next room. Hit the rusted switch with the hammer to gain access to this chest."
                    }
                }
            },
            roomBeforeBoss: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Fire Medallion" },
                UseAdultAge: function() { 
                    return !Tricks.fireNoGoronTunic.enabled ||
                        (!Tricks.bombSuperslide.enabled && !Tricks.fireWallSkip.enabled);
                },
                Exits: {
                    bossRoom: {
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        Needs: [KeySets.FIRE_BK]
                    }
                },
                ItemLocations: {
                    "2 Left Crates in Room Before Boss": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Near Boss Left Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 40, y: 253, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper left corner to the crates."
                    },
                    "4 Right Crates in Room Before Boss": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Near Boss Right {#}",
                            tokens: ["Lower Crate 1", "Lower Crate 2", "Mid Crate", "Upper Crate"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 37, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner to the crates.<br/><br/>If child, climb the block with the torch in it from the back right corner. Hold forward to jump up the ledge. Use the first ledge box to get to the second one before you break it.",
                        NeedsAny: [Items.HOOKSHOT, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    "2 Pots in Room Before Boss": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Near Boss Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 33, y: 161, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner to the pots.",
                        NeedsAny: [Items.HOOKSHOT, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    "Chest in Room Before Boss": {
                        SpoilerLogName: "Fire Temple MQ Near Boss Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 36, y: 263, floor: "F1" },
                        Region: "roomBeforeBoss",
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner. Roll into a box to break it to reveal a torch. Light all 3 torches in the room to open the gate to the chest.",
                        TricksToShow: [Tricks.mqBossRoomGoronBombClip],
                        NeedsAny: [
                            [
                                [SetType.OR, // Get to torches
                                    Items.HOOKSHOT, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo],
                                [SetType.OR, // Light torches
                                    ItemSets.FIRE_ITEMS, QPAItemSets.TALL_TORCH_QPA]
                            ],
                            Tricks.mqBossRoomGoronBombClip.canDo
                        ]
                    }
                }
            },
            bigLavaRoom: {
                DisplayGroup: { 
                    groupName: "Big Lava Room", 
                    imageName: "Goron Tunic",
                    description: "BOSS KEY ROOM: Light the two torches - one is on a platform you need to ride up to, and the other is by the door on the left side of the room. Now light the torch in the right side of the room with Din's or a fire arrow to spawn some hookshot pillars. Now, enter the door above the left goron room.",
                    tricksToShow: [Tricks.mqFireLavaRoomDoorWithDins, Tricks.fireSoTBlockJump]
                },
                UseAdultAge: function() { 
                    return !Tricks.fireNoGoronTunic.enabled ||
                        (!Tricks.bombSuperslide.enabled && !Tricks.fireWallSkip.enabled) ||
                        !Tricks.equipSwap.enabled;
                },
                Exits: {
                    bossKeyRoom: {
                        Age: Age.ADULT,
                        Needs: [
                            [SetType.OR, // Light torches
                                Items.FIRE_ARROW, 
                                QPAItemSets.TALL_TORCH_QPA,
                                Tricks.mqFireLavaRoomDoorWithDins.canDo],
                            [SetType.OR, // Get to door
                                Items.HOOKSHOT, Tricks.fireSoTBlockJump.canDo]
                        ]
                    },
                    potOnLavaRoomRightSide: {
                        Needs: [Tricks.boomerangTrickThrows.canDo]
                    },
                    lavaRoomRightSideLedge: {
                        ChildNeeds: [Tricks.groundJump.canDoWithBomb],
                        ChildNeedsAny: [
                            () => Equipment.HYLIAN_SHIELD.playerHas,
                            Tricks.megaFlip.canDo
                        ]
                    },
                    risingBlockRoom: {
                        LockedDoor: "Locked Door in Big Lava Room",
                        Map: "Fire Temple",
                    }
                },
                ItemLocations: {
                    "Left Pot in Big Lava Room": {
                        SpoilerLogName: "Fire Temple MQ Big Lava Room Left Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 204, y: 150, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "The pot is near the door on the left side of the big lava room."
                    },
                    "Skulltula by Left Goron in Lava Room": {
                        SpoilerLogName: "Fire Temple MQ GS Big Lava Room Open Door",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 280, y: 139, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Go to the left side of the big lava room. Hammer the switch to gain access to the skulltula."
                    },
                    "Pot on Big Lava Room Ledge": {
                        SpoilerLogName: "Fire Temple MQ Big Lava Room Alcove Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 227, y: 162, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Along the back left wall is a platform that will rise up to an alcove after you jump on it. The pot is there."
                    }
                }
            },
            bossKeyRoom: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                Exits: {},
                ItemLocations: {
                    "Boss Key Chest": {
                        SpoilerLogName: "Fire Temple MQ Boss Key Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 174, y: 85, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "The chest is beyond the wall of fire in the back of the room. Hookshot the torch or chest to get to it, or hold forward to jump up slightly and then jumpslash over the fire (easiest on the rightmost side)."
                    },
                    "2 Pots in Boss Key Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Boss Key Chest Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 162, y: 102, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "In the boss key room, hookshot the torch or chest to get to the pot, or hold forward to jump up slightly, THEN HOLD BACK and jumpslash over the fire (easiest on the rightmost side)."
                    },
                    "2 Wonderitems in Boss Key Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Boss Key {#} Wonderitem",
                            tokens: ["Hookshot", "Arrow"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "Hookshot and Bow Wonderitems",
                        MapInfo: { x: 164, y: 91, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 15.1,
                        LongDescription: "In the boss key room, hookshot the torch or chest to get to the pots, or hold forward to jump up slightly, THEN HOLD BACK and jumpslash over the fire (easiest on the rightmost side). Shoot the giant face on the wall with your bow and hookshot for two separate wonderitems.<br/><br/>Cutscene Item QPA works for this if you do the broken stick setup from behind the torch."
                    }
                }
            },
            potOnLavaRoomRightSide: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                Exits: {},
                ItemLocations: {
                    "Right Pot in Big Lava Room": {
                        SpoilerLogName: "Fire Temple MQ Big Lava Room Right Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 190, y: 263, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.groundJump.enabled && !Tricks.boomerangTrickThrows.enabled; },
                        Order: 16,
                        LongDescription: "Either hookshot to the torch on the right side of the lava room, or backflip from the moving platform to get over the fire wall. As Child, you'll need to equip Hylian shield so it isn't burned. The pot is by the blocked doorway (Child will have to ground jump).<br/><br/>You can also get it from the moving platform with a boomerang trick throw."
                    }
                }
            },
            lavaRoomRightSideLedge: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                Exits: {
                    potOnLavaRoomRightSide: {}
                },
                ItemLocations: {
                    "Chest by Right Goron in Lava Room": {
                        SpoilerLogName: "Fire Temple MQ Big Lava Room Blocked Door Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 202, y: 287, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.groundJump.enabled; },
                        Order: 17,
                        LongDescription: "Either hookshot to the torch on the right side of the lava room, or do an angled jump from the moving platform to get over the fire wall. Bomb the blocked doorway to enter. Use a fire item to light the torches outside the jail. The chest is by the goron.<br/><br/>If using cutscene item QPA, angle toward the torch at a 45 degree angle when you jumpslash with the deku stick to light it.",
                        Needs: [ItemSets.EXPLOSIVES],
                        NeedsAny: [
                            // Light torch normally, or with QPA obtained on this side
                            ItemSets.FIRE_ITEMS,
                            QPAItemSets.CUTSCENE_ITEM_QPA,
                            QPAItemSets.HOVER_BOOTS_QPA,

                            // QPA with ledge elsewhere, then hookshot or megaflip over the fire wall
                            [
                                QPAItemSets.TALL_TORCH_QPA,
                                [SetType.OR, Items.HOOKSHOT, Tricks.megaFlip.canDo]
                            ]
                        ]
                    }
                }
            },
            risingBlockRoom: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                UseAdultAge: function() { 
                    return !Tricks.fireNoGoronTunic.enabled ||
                        !Tricks.equipSwap.enabled ||
                        (!Tricks.bombSuperslide.enabled && !Tricks.fireWallSkip.enabled);
                },
                Exits: {
                    boulderMaze: {
                        Age: Age.ADULT,
                        NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.HIGH_SWITCH_QPA] // The torch is quite high
                    },
                    cellBelowBoulderMaze: {
                        Age: Age.ADULT,
                        Needs: [Tricks.weirdShot.canDo]
                    }
                },
                ItemLocations: {
                    "3 Hearts in Rising Block Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Elevator Room Recovery Heart {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 293, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "Open the locked door on the other side of the big lava room. The hearts are on either side at the very top and in the middle of the room where you jump to the block."
                    },
                    "3 Wonderitems After Rising Block Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Shortcut Room Hammer Wonderitem {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Hammer Wonderitems",
                        MapInfo: { x: 163, y: 157, floor: "F2" },
                        Needs: [Items.MEGATON_HAMMER],
                        Age: Age.EITHER,
                        Order: 19.1,
                        UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
                        LongDescription: "After the rising block room, hammer the floor with the face on it near the jail cell to get these three items."
                    }
                }
            },
            boulderMaze: {
                DisplayGroup: { groupName: "Lower Boulder Maze", imageName: "Bomb" },
                Exits: {
                    boulderMazeTop: {
                        Needs: [Items.HOOKSHOT, ItemSets.EXPLOSIVES]
                    }
                },
                ItemLocations: {
                    "Wonderitem in Bottom Maze": {
                        SpoilerLogName: "Fire Temple MQ Maze Face On Wall Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 340, y: 150, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 19.9,
                        LongDescription: "In the maze, hookshot the giant face you see when you first enter from the door.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "3 Crates Behind Bars in Bottom Maze": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Lower Lizalfos Maze Crate {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 318, y: 211, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "In the maze, there's a switch behind some metal bars. Use a jumpslash to hit it to open the cell to access the crates."
                    },
                    "Chest Behind Bars in Bottom Maze": {
                        SpoilerLogName: "Fire Temple MQ Lizalfos Maze Lower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 321, y: 212, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "In the maze, there's a switch behind some metal bars. Use a jumpslash to hit it. The chest is in one of the crates."
                    },
                    "Goron by Maze": {
                        SpoilerLogName: "Fire Temple MQ Lizalfos Maze Side Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 283, y: 52, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21.1,
                        Needs: [ItemSets.EXPLOSIVES],
                        LongDescription: "In the north section of the maze, there's a wall you can bomb. There's small crates on the top in the jail you can use to hold the switch down. It's also possible to quickly open the door before it bars again."
                    }
                }
            },
            boulderMazeTop: {
                DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
                Exits: {
                    boulderMaze: {},
                    aboveBoulderMaze: {
                        NeedsAny: [,
                            Songs.SONG_OF_TIME,
                            Tricks.fireLongshotToTopOfTower.canDo,
                        ]
                    },
                    roomWithLavaAndGrates: {
                        LockedDoor: "Locked Door Above Boulder Maze",
                        Map: "Fire Temple"
                    },
                    cellBelowBoulderMaze: {}
                },
                ItemLocations: {
                    "Chest on Maze Top": {
                        SpoilerLogName: "Fire Temple MQ Lizalfos Maze Upper Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 300, y: 221, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 24.1,
                        LongDescription: "In the northeast area of the maze, find the fake wall and bomb it. Hammer the switch inside. Hookshot up one of the targets that appear and make your way toward the crystal switch. Trigger it (jumpslash, spin attack, Din's, explosive, etc.). The chest is hidden in one of the crates."
                    },
                    "3 Crates on Maze Top": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Upper Lizalfos Maze Crate {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        MapInfo: { x: 297, y: 217, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "Navigate to the cell on the top of the maze. Bomb or jumpslash the switch (then come back up) to open it. The crates are inside. Don't break the small crates if you wish to use them (they have no items)!"
                    },
                    "5 Crates on Maze Top": {
                        SpoilerLogName: [
                            {
                                name: "Fire Temple MQ Upper Lizalfos Maze Crate {#}",
                                count: 3
                            },
                            {
                                name: "Fire Temple MQ Upper Lizalfos Maze Small Wooden Crate {#}",
                                count: 2
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "5 Crates",
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
                        MapInfo: { x: 297, y: 217, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "Navigate to the cell on the top of the maze. Bomb or jumpslash the switch (then come back up) to open it. The crates are inside."
                    }
                }
            },
            cellBelowBoulderMaze: {
                DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
                Exits: {
                    boulderMazeTop: {}
                },
                ItemLocations: {
                    "6 Crates in Hole Under Maze": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Shortcut Crate {#}",
                            count: 6,
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 135, y: 105, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "Bomb the crack in the floor on top of the maze. The crates are down the hole."
                    },
                    "Chest in Hole Under Maze": {
                        SpoilerLogName: "Fire Temple MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 164, y: 97, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "Bomb the crack in the floor on top of the boulder maze. Break some crates to reveal a rusted switch. Hammer it to gain access to the chest."
                    }
                }
            },
            aboveBoulderMaze: {
                DisplayGroup: { 
                    groupName: "Top Rooms Above Boulder Maze", 
                    imageName: "Hookshot",
                    description: "On top of the boulder maze, play the Song of Time by the bombable pit. Climb the spawned platforms, then hookshot to the ledge. Hookshot the next ledge and ride the platform upwards.",
                    tricksToShow: [Tricks.fireLongshotToTopOfTower]
                },
                Exits: {
                    narrowBridgeRoom: {}
                },
                ItemLocations: {
                    "2 Wonderitems on Wall Near Very Top": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Elevator Above Maze Hookshot Wonderitem {#}",
                            count: { min: 3, max: 4 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Hookshot Wonderitems",
                        MapInfo: { x: 312, y: 125, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 26.8,
                        LongDescription: "In the green room, hookshot the giant face on the wall twice to recieve two wonderitems."
                    },
                    "2 Wonderitems on Grate Near Very Top": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Elevator Above Maze Hookshot Wonderitem {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Hookshot Wonderitems",
                        MapInfo: { x: 311, y: 91, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 26.9,
                        LongDescription: "In the green room, hookshot the face on the first wall you can climb up twice to recieve two wonderitems."
                    },
                    "Skulltula on Very Top": {
                        SpoilerLogName: "Fire Temple MQ GS Skull On Fire",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 219, y: 147, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "After the green room, make your way around the room and hammer the rusted switch by the fire circle. Now jump down and hit the switch. Use the new hookshot target to quickly get up and pull the block away. The skulltula is underneath."
                    }
                }
            },
            narrowBridgeRoom: {
                DisplayGroup: { groupName: "Lava & Fire Wall Room", imageName: "Din's Fire" },
                Exits: {},
                ItemLocations: {
                    "3 Pots in Narrow Bridge Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Narrow Path Room Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 293, y: 155, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Make your way to the scary room with the giant pit either from the lava room with grates, or by falling from the room at the very top."
                    }
                }
            },
            roomWithLavaAndGrates: {
                DisplayGroup: { groupName: "Lava & Fire Wall Room", imageName: "Din's Fire" },
                Exits: {
                    narrowBridgeRoom: {},
                    fireWallMaze: {
                        Needs: [Items.FAIRY_BOW]
                    }
                },
                ItemLocations: {
                    "2 Crates in Right Lava Grate Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Shoot Torch On Wall Room Right Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 265, y: 110, floor: "F3" },
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "These crates are on the right side of the room with lava and grates."
                    },
                    "3 Crates in Right Lava Grate Room": {
                        SpoilerLogName: [
                            {
                                name: "Fire Temple MQ Shoot Torch On Wall Room Right Crate {#}",
                                count: 2
                            },
                            "Fire Temple MQ Shoot Torch On Wall Room Small Wooden Crate 4"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 265, y: 110, floor: "F3" },
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "These crates are on the right side of the room with lava and grates."
                    },
                    "Crate in Central Lava Grate Room": {
                        SpoilerLogName: "Fire Temple MQ Shoot Torch On Wall Room Center Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 248, y: 133, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "This crate is the big one on the little island in the center of the room with lava and grates."
                    },
                    "Small Crate in Central Lava Grate Room": {
                        SpoilerLogName: "Fire Temple MQ Shoot Torch On Wall Room Small Wooden Crate 3",
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 225, y: 168, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 31.1,
                        LongDescription: "This crate is on the little one on the little island in the center of the room with lava and grates."
                    },
                    "2 Pots in Left Lava Grate Room": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Shoot Torch On Wall Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 271, y: 179, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "These pots are on the left side of the room with lava and grates, by the door to the narrow bridge room."
                    },
                    "Crate in Left Lava Grate Room": {
                        SpoilerLogName: "Fire Temple MQ Shoot Torch On Wall Room Left Crate 2",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 265, y: 176, floor: "F3" },
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "This crate is on the left side of the room with lava and grates. Go to the door to the narrow bridge room and climb up the small ledge to get access to the crate."
                    },
                    "3 Crates in Left Lava Grate Room": {
                        SpoilerLogName: [
                            "Fire Temple MQ Shoot Torch On Wall Room Left Crate 2",
                            "Fire Temple MQ Shoot Torch On Wall Room Small Wooden Crate 3",
                            {
                                name: "Fire Temple MQ Shoot Torch On Wall Room Small Wooden Crate {#}",
                                count: 2
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 265, y: 176, floor: "F3" },
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "These crates are on the left side of the room with lava and grates. Go to the door to the narrow bridge room and climb up the small ledge to get access to the crates."
                    },
                    "Wonderitem in Lava Grate Room": {
                        SpoilerLogName: "Fire Temple MQ Shoot Torch on Wall Room Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 216, y: 172, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 32.1,
                        LongDescription: "In the room with lava and grates, hookshot the upper part of the face that's on the wall of the ledge that the exit door is on.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Crate by Lava Grate Room Exit": {
                        SpoilerLogName: "Fire Temple MQ Shoot Torch On Wall Room Left Crate 1",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 212, y: 176, floor: "F3" },
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "This crate is near the exit of the lava grate room (the one leading to the fire wall maze)."
                    },
                    "2 Crates by Lava Grate Room Exit": {
                        SpoilerLogName: [
                            "Fire Temple MQ Shoot Torch On Wall Room Left Crate 1",
                            "Fire Temple MQ Shoot Torch On Wall Room Small Wooden Crate 5"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 212, y: 176, floor: "F3" },
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "These crates are near the exit of the lava grate room (the one leading to the fire wall maze)."
                    }
                }
            },
            fireWallMaze: {
                DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
                Exits: {
                    bossRoom: {
                        Age: Age.ADULT,
                        Needs: [Tricks.fireBKSkipFromFireWallMaze.canDo]
                    },
                    fireWallMazeRight: {
                        NeedsAny: [Songs.SONG_OF_TIME, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    fireWallMazeEnd: {
                        Needs: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {
                    "2 Pots in Left Fire Wall Maze": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Flame Maze Left Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 87, y: 215, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Navigate around the lava room and grab a small box. Enter the encaged area and place the box on the blue switch to light some torches. Hookshot the box to get back up. Use your bow to shoot though one of the torches to light a high up torch on the wall. Go through the door to continue.<br/><br/>Navigate around the fire wall maze to the left until you find the pots."
                    },
                    "Skulltula in Center of Maze": {
                        SpoilerLogName: "Fire Temple MQ GS Flame Maze Center",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 124, y: 162, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "From the entrance of the fire wall room, navigate through the maze to the southernmost door. Once inside, bomb the fake wall by the scratching sounds to get to the skulltula."
                    }
                }
            },
            fireWallMazeRight: {
                DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
                Exits: {
                    fireWallMazeEnd: {
                        Needs: [Tricks.fireWallSkip.canDo]
                    }
                },
                ItemLocations: {
                    "2 Pots in Fire Wall Maze Right": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Flame Maze Right Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 102, y: 108, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "From the start of the fire wall maze, climb up to the door in front of you. Look to the right - either play Song of Time, or use hover boots to cross the fire wall. The pots are in this maze. You can use the Song of Time block by the door on the wall to get out of this section."
                    },
                    "Skulltula in Fire Wall Maze": {
                        SpoilerLogName: "Fire Temple MQ GS Flame Maze Side Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 194, y: 79, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "From the start of the fire wall maze, climb up to the door in front of you. Look to the right - either play Song of Time, or use hover boots to cross the fire wall. The skulltula is in the room in this section. You can use the Song of Time block by the door to get out."
                    }
                }
            },
            fireWallMazeEnd: {
                DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
                Exits: {
                    afterFinalFlareDancer: {}
                },
                ItemLocations: {
                    "2 Pots by Fire Maze Exit": {
                        SpoilerLogName: [{
                            name: "Fire Temple MQ Flame Maze Right Upper Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 76, y: 144, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "From the start of the maze, navigate to the door ahead by jumping on the SoT block. Enter and hookshot across the room. Hammer the switch to unbar the door. Now, navigate around the maze clockwise to get to the door.<br/><br/>By the exit to the fire maze (after you hit the switch to pass the giant fire wall), there are 2 pots to either side of the door."
                    },
                    "Wonderitem by Flare Dancer Room": {
                        SpoilerLogName: "Fire Temple MQ Flame Maze Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 73, y: 142, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 39.1,
                        LongDescription: "At the end of the fire wall maze, hookshot the face above the door leading to the flare dancer room to spawn this wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            },
            afterFinalFlareDancer: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Skulltula" },
                Exits: {
                    topOfTemple: {
                        LockedDoor: "Locked Door After Flare Dancer",
                        Map: "Fire Temple"
                    }
                },
                ItemLocations: {
                    "Freestanding Key in Flare Dancer Room": {
                        SpoilerLogName: "Fire Temple MQ Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 37, y: 178, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "Proceed from the center of the maze. Hit the switch to lower the fire wall. Enter the next room and kill the Flare Dancer. Jump on the center platform to make it rise, but immediately get off. The item should be where the platform used to be."
                    },
                    "Wonderitem After Flare Dancer Room": {
                        SpoilerLogName: "Fire Temple MQ After Upper Flare Dancer Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 337, y: 173, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 40.1,
                        LongDescription: "Ride the platform up after the Flare Dancer room. Hookshot the giant face on the wall in the green room to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            },
            topOfTemple: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Skulltula" },
                Exits: {
                    roomAfterTopOfTemple: {
                        LockedDoor: "Locked Door Under Hammer Floor",
                        Map: "Fire Temple"
                    }
                },
                ItemLocations: {
                    "Chest at Top of Temple": {
                        SpoilerLogName: "Fire Temple MQ Chest On Fire",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 43, y: 157, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "From the Flare Dancer room - make your way through the next room. Hit the switch on the ground somewhat near the chest with the fire wall to lower the wall. The Scarecrow's Song can help you get to it quicker, but it's not required."
                    }
                }
            },
            roomAfterTopOfTemple: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Skulltula" },
                Exits: {},
                ItemLocations: {
                    "Wonderitem After Top of Temple": {
                        SpoilerLogName: "Fire Temple MQ Hammer Steps Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 190, y: 136, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 43.9,
                        LongDescription: "From the top of the temple, hammer the face block to continue on. After unlocking the door, hammer the small face on the ground to lower the staircase. Hookshot the giant face that's revealed to spawn the wonderitem (it also unbars the door).",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Skulltula After Top of Temple": {
                        SpoilerLogName: "Fire Temple MQ GS Above Flame Maze",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 208, y: 227, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "From the top of the temple, hammer the face block to continue on. Kill the Stalfos and continue to the next room (you need to hookshot one of the faces to unbar the door). The skulltula is in this room."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Fire Medallion" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Fire Temple"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Water Temple": {
        Abbreviation: "WATR",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F3", "F2", "F1", "B1"],
        StartingFloorIndex: 0,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Hub/Boss Area (Top North)", imageName: "Water Medallion" },
                Exits: {
                    lowEastWingPots: {
                        Needs: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    midSouthRoom: {
                        Needs: [Equipment.IRON_BOOTS]
                    },
                    midEastRoom: {
                        Needs: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    behindGateInMidSouthRoom: {
                        Needs: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    lowEastRooms: {
                        Needs: [Equipment.IRON_BOOTS, GameStateSets.WATER_TEMPLE_TUNIC_CHECK]
                    },
                    centralRoom: {
                        Needs: [Equipment.IRON_BOOTS]
                    },
                    roomBeforeDarkLink: {
                        Needs: [() => ItemData.getKeyCount("Water Temple") >= 1],
                        NeedsAny: [UpgradedItems.LONGSHOT, Tricks.mqWaterWaterfallWithHoverBoots.canDo]
                    },
                    bossRoomAntechamber: {
                        NeedsAny: [
                            UpgradedItems.LONGSHOT,
                            Tricks.bombSuperslide.canDoWithHoverBoots,
                            Tricks.hammerHoverBootsSuperslide.canDo
                        ]
                    },
                    Exit: {
                        OwExit: OwExits["Water Temple"]["Exit"]
                    }
                },
                ItemLocations: {}
            },
            bossRoomAntechamber: {
                DisplayGroup: { groupName: "Hub/Boss Area (Top North)", imageName: "Water Medallion" },
                Exits: {
                    bossRoom: {
                        NeedsAny: [UpgradedItems.LONGSHOT, Items.NAYRUS_LOVE, Equipment.HOVER_BOOTS], // Can get up
                        Needs: [ // Open or clip through door
                            SetType.OR,
                                KeySets.WATER_BK,
                                Items.HOOKSHOT, Items.FAIRY_BOW, Items.BOMBCHU
                        ]
                    }
                },
                ItemLocations: {
                    "2 Hookshot Wonderitems in Boss Antechamber": {
                        SpoilerLogName: [{ 
                            name: "Water Temple MQ Boss Hallway Hookshot Wonderitem {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Hookshot Wonderitems",
                        MapInfo: { x: 226, y: 162, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 48,
                        LongDescription: "From the main room with the water raised, longshot to the upper north area and enter the door. Hookshot the two symbols on either side of the door you came through to spawn the wonderitems."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Hub/Boss Area (Top North)", imageName: "Water Medallion" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Water Temple"]["Boss"]
                    }
                },
                ItemLocations: {
                    //TODO: maybe clean this up so this item isn't necessary anymore
                    // Note that this item will never be visible - it is used to help determine whether you
                    // have the ability to raise/lower the water in Lake Hylia via the gossip stone as adult
                    // See the ItemLocationSet DEFEATED_MORPHA for where this is used
                    "Blue Warp": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Age: Age.ADULT,
                        Order: 99,
                        MapInfo: { x: 227, y: 145, floor: "F3" },
                        LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
                        RequiredToAppear: function() { return false; }
                    }
                }
            },
            centralRoom: {
                DisplayGroup: { groupName: "Central Rooms (Center Mid)", imageName: "Ocarina of Time" },
                Exits: {
                    underCentralRoom: {
                        Needs: [Equipment.IRON_BOOTS, GameStateSets.WATER_TEMPLE_TUNIC_CHECK],
                        NeedsAny: [
                            Items.FIRE_ARROW,
                            [Songs.SONG_OF_TIME, Items.DINS_FIRE]
                        ]
                    }
                },
                ItemLocations: {
                    "2 Crates in Upper Central Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Central Pillar Upper Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 170, y: 211, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 1,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top - the crates are on a platform."
                    }
                }
            },
            underCentralRoom: {
                DisplayGroup: { groupName: "Central Rooms (Center Mid)", imageName: "Ocarina of Time" },
                Exits: {},
                ItemLocations: {
                    "14 Crates Below Central Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Central Pillar Lower Crate {#}",
                            count: 14
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "14 Crates",
                        MapInfo: { x: 185, y: 165, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 2,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom. The crates are all around!"
                    },
                    "Wonderitem Below Central Room": {
                        SpoilerLogName: "Water Temple MQ Below Central Pillar Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 312, y: 215, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 2.1,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom.<br/><br/>Once here, navigate around the maze. Jump on some platforms at the very end to reveal a switch. Hit it, and then navigate to the grate that opens up and hookshot your way up there. Hookshot the symbol on the wall to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Chest Below Central Room": {
                        SpoilerLogName: "Water Temple MQ Central Pillar Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 291, y: 215, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 3,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom.<br/><br/>Once here, navigate around the maze. Jump on some platforms at the very end to reveal a switch. Hit it, and then navigate to the grate that opens up and hookshot your way up there. Hookshot the symbol on the wall to spawn the chest.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            },
            lowEastRooms: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {
                    lowWaterLevel: {
                        Needs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {
                    "Wonderitem Above Low East Room": {
                        SpoilerLogName: "Water Temple MQ Longshot Chest Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 347, y: 132, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 3.9,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Put them back on when you reach the very next floor. Navigate through the hole in the wall. Now, hookshot the symbol on the back wall to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Chest Above Low East Room": {
                        SpoilerLogName: "Water Temple MQ Longshot Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 131, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 4,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Put them back on when you reach the very next floor. Navigate through the hole in the wall. Now, hookshot the symbol on the back wall to spawn the chest. To open it, hookshot the front then spam A.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Wonderitem by Low Water Triforce": {
                        SpoilerLogName: "Water Temple MQ Map Chest Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 349, y: 224, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 4.1,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Take them off to rise to the top to get to the triforce room. Use a fire item to light the torches in the four corners of the room to unbar the door.<br/><br/>Enter the next room and optionally defeat all the Stalfos to unbar the door. The wonderitem is spawned by hookshotting the symbol on the back wall.",
                        Needs: [Items.HOOKSHOT, ItemSets.FIRE_ITEMS]
                    },
                    "Chest by Low Water Triforce": {
                        SpoilerLogName: "Water Temple MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 334, y: 224, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 5,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Take them off to rise to the top to get to the triforce room. Use a fire item to light the torches in the four corners of the room to unbar the door.<br/><br/>Enter the next room and optionally defeat all the Stalfos to unbar the door. The chest is spawned by hookshotting the symbol on the back wall.",
                        Needs: [Items.HOOKSHOT, ItemSets.FIRE_ITEMS]
                    }
                }
            },
            lowWaterLevel: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {
                    lowEastWingPots: {},
                    midSouthRoomPots: {},
                    midWestRoom: {
                        Needs: [Items.HOOKSHOT]
                    },
                    behindGateInMidSouthRoom: {
                        NeedsAny: [Items.HOOKSHOT, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    },
                    bottomGateSwitch: {
                        // Angle diagonally so the knockback doesn't make you fall
                        Needs: [Tricks.weirdShot.canDo]
                    }
                },
                ItemLocations: {
                    "Wonderitem in Lower East Room": {
                        SpoilerLogName: "Water Temple MQ Compass Chest Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 246, y: 212, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 6.9,
                        LongDescription: "Lower the water level. Navigate to the room below the water triforce. Light the torches using a fire item or your bow.<br/><br/>Hookshot the symbol on the back wall to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT],
                        NeedsAny: [Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    },
                    "Chest in Lower East Room": {
                        SpoilerLogName: "Water Temple MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 338, y: 212, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "Lower the water level. Navigate to the room below the water triforce. Light the torches using a fire item or your bow.<br/><br/>Defeat the enemies in the next room to spawn the chest.",
                        NeedsAny: [Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            lowEastWingPots: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {},
                ItemLocations: {
                    "2 Pots in Low East Wing": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ L1 Torch Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 287, y: 213, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "These pots are by the door in the lower eastern wing. Either use iron boots and the hookshot the break them, or drain the water."
                    }
                }
            },
            midSouthRoom: {
                DisplayGroup: { groupName: "Skulltula Jail Hallway (Mid South)", imageName: "Skulltula" },
                Exits: {
                    midSouthRoomPots: {
                        // Assumes the water isn't drained
                        // Another exit into here is from lowWaterLevel, which doesn't need hookshot
                        Needs: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {
                    "3 Crates in Mid South Hallway": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Lizalfos Hallway Hall Crate {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 245, y: 200, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "Make your way to the mid south wing - you'll need to press the switch to open the gate. Bonk into the crates to break them. Two of them are before the jail cell, and one is just to the left of it."
                    },
                    "5 Crates in Mid South Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Lizalfos Hallway Room Crate {#}",
                            count: 5
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "5 Crates",
                        MapInfo: { x: 245, y: 241, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "Make your way to the mid south wing - you'll need to press the switch to open the gate. Navigate to the room to the right of the jail cell and bonk into the crates to break them."
                    },
                    "Wonderitem in Mid South Room": {
                        SpoilerLogName: "Water Temple MQ Lizalfos Hallway Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 244, y: 256, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 10.1,
                        LongDescription: "Make your way to the mid south wing - you'll need to press the switch to open the gate. Navigate to the room to the right of the jail cell and hookshot the symbol on the wall to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            },
            midSouthRoomPots: {
                DisplayGroup: { groupName: "Skulltula Jail Hallway (Mid South)", imageName: "Skulltula" },
                Exits: {},
                ItemLocations: {
                    "Pot in Mid South Hallway": {
                        SpoilerLogName: "Water Temple MQ Lizalfos Hallway Pot 1",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 234, y: 205, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "Make your way to the mid south room - you'll need to press the switch to open the gate. If the water isn't drained, you'll need to use your hookshot the break this hallway pot."
                    },
                    "2 Pots in Mid South Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Lizalfos Hallway Pot {#}",
                            count: { min: 2, max: 3 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 250, y: 248, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "Make your way to the mid south room - you'll need to press the switch to open the gate. Make your way to the room to the left of the jail. If the water isn't drained, you'll need to use your hookshot the break the two pots in here."
                    }
                }
            },
            behindGateInMidSouthRoom: {
                DisplayGroup: { groupName: "Skulltula Jail Hallway (Mid South)", imageName: "Skulltula" },
                Exits: {},
                ItemLocations: {
                    "2 Pots in Mid South Jail": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Lizalfos Hallway Gate Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 259, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 12,
                        LongDescription: "At any water level (mid is easiest), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the pots behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in. To get out, target the jail and hookshot while holding Z and right while next to the torch."
                    },
                    "2 Crates in Mid South Jail": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Lizalfos Hallway Gate Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 270, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "With low or mid water, navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the crates behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in and bonk the crates - remember to have the water lowered, as it will slow you down too much to bonk them! To get out, target the jail and hookshot while holding Z and right while next to the torch.",
                        Needs: [Songs.ZELDAS_LULLABY]
                    },
                    "Skulltula in Mid South Room": {
                        SpoilerLogName: "Water Temple MQ GS Lizalfos Hallway",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 270, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "At any water level (mid is easiest), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the skulltula behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in. Hookshot the skulltula's legs poking out of the crate to kill it. To get out, target the jail and hookshot while holding Z and right while next to the torch."
                    }
                }
            },
            midEastRoom: {
                DisplayGroup: { groupName: "Pot and Crate Room (Mid East)", imageName: "7 Crates" },
                Exits: {},
                ItemLocations: {
                    "3 Pots in Mid East Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Storage Room Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 283, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "Go to the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there, then hookshot up. Once at the surface, look in the corner of the room for the pots."
                    },
                    "7 Crates in Mid East Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Storage Room Crate {#}",
                            count: 7
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "7 Crates",
                        MapInfo: { x: 315, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 16,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        LongDescription: "Go to the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there, then hookshot up. Once at the surface, the crates are the big ones all around the room."
                    },
                    "11 Crates in Mid East Room": {
                        SpoilerLogName: [
                            {
                                name: "Water Temple MQ Storage Room Crate {#}",
                                count: 7
                            },
                            {
                                name: "Water Temple MQ Storage Room Small Wooden Crate {#}",
                                count: 4
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "11 Crates",
                        MapInfo: { x: 315, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "Go to the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there, then hookshot up. Once at the surface, there are 7 big crates, and 4 small ones."
                    }
                }
            },
            midWestRoom: {
                DisplayGroup: { groupName: "Water Raising Rooms (Mid West)", imageName: "Zelda's Lullaby" },
                Exits: {},
                ItemLocations: {
                    "7 Crates in Mid West Room": {
                        SpoilerLogName: [
                            {
                                name: "Water Temple MQ Before Upper Water Switch Lower Crate {#}",
                                count: 6
                            },
                            "Water Temple MQ Before Upper Water Switch Lower Small Crate"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "7 Crates",
                        MapInfo: { x: 41, y: 116, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. The crates are in this room.",
                    },
                    "3 Pots in Mid West Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Before Upper Water Switch Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 41, y: 155, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 18,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. The pots are against the wall to the left."
                    },
                    "Wonderitem in Mid West Room": {
                        SpoilerLogName: "Water Temple MQ Upper Water Switch Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 42, y: 160, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 18.1,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. Hookshot the symbol on the wall to your left to spawn the wonderitem."
                    },
                    "3 Crates Above Mid West Room": {
                        SpoilerLogName: [
                            {
                                name: "Water Temple MQ Before Upper Water Switch Upper Crate {#}",
                                count: 2
                            },
                            "Water Temple MQ Before Upper Water Switch Upper Small Crate"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 165, y: 247, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your longshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. In this room, break the box to your left and hit the switch. Now, hookshot up to the next floor and break the crates.",
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    "Skulltula Above Mid West Room": {
                        SpoilerLogName: "Water Temple MQ GS Before Upper Water Switch",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 160, y: 247, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your longshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. In this room, break the box to your left and hit the switch. Now, hookshot up to the next floor. The skullula is in one of the boxes.",
                        Needs: [UpgradedItems.LONGSHOT]
                    }
                }
            },
            roomBeforeDarkLink: {
                DisplayGroup: { 
                    groupName: "Boss Key Loop (Top West)", 
                    imageName: "Boss Key",
                    description: "The top west route leading to Dark Link.",
                    tricksToShow: [Tricks.mqWaterWaterfallWithHoverBoots]
                },
                Exits: {
                    whirlpoolRoom: {}
                },
                ItemLocations: {
                    "3 Wonderitems on Left Waterfall Room Wall": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Hookshot Waterfall Left Hookshot Wonderitem {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Hookshot Wonderitems",
                        MapInfo: { x: 96, y: 228, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20.8,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot three times to spawn the wonderitems."
                    },
                    "3 Wonderitems on Right Waterfall Room Wall": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Hookshot Waterfall Right Hookshot Wonderitem {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Hookshot Wonderitems",
                        MapInfo: { x: 96, y: 213, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20.9,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the right wall and shoot it with your hookshot three times to spawn the wonderitems."
                    },
                    "3 Pots in Lower Rising Dragon Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Before Dark Link Lower Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 40, y: 193, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door.<br/><br/>Jump down and kill the three stalfos, then use your hookshot to navigate to the pots."
                    },
                    "2 Pots in Upper Dragon Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Before Dark Link Top Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 55, y: 161, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door.<br/><br/>Jump down and kill the three stalfos, then use your hookshot to navigate to the exit door - the pots are on either side of it."
                    },
                    "2 Pots in Room After Dark Link": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Room After Dark Link Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 58, y: 43, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "After the Dark Link fight, enter the next room. The pots are in the center."
                    },
                    "Wonderitem After Dark Link": {
                        SpoilerLogName: "Water Temple MQ After Dark Link Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 56, y: 30, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 23.1,
                        LongDescription: "After the Dark Link fight, enter the next room. Shoot the symbol on the back wall to spawn the wonderitem. Note that grate will open when you do so, so don't stand on it!"
                    }
                }
            },
            whirlpoolRoom: {
                DisplayGroup: { groupName: "Boss Key Loop (Top West)", imageName: "Boss Key" },
                Exits: {
                    dragonRoom: {}
                },
                ItemLocations: {
                    "Skulltula in Whirlpool Room": {
                        SpoilerLogName: "Water Temple MQ GS River",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 37, y: 146, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door. Jump down and kill the three stalfos, then use your hookshot to get through the next room, and then defeat Dark Link. Hookshot the wall in the next room to reach the whirlpool room.<br/><br/>As you swim, climb the hookshot target by one of the whirlpools. The skulltula will be somewhere above you.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                    },
                    "2 Pots in Whirlpool Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ River Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 49, y: 160, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "After the Dark Link fight, enter the next room. Hit the back wall with your hookshot to open the way. The pots are at the end of the river."
                    }
                }
            },
            dragonRoom: {
                DisplayGroup: { groupName: "Boss Key Loop (Top West)", imageName: "Boss Key" },
                Exits: {
                    whirlpoolRoom: {
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    singleWaterPillarRoom: {
                        Needs: [ItemSets.FIRE_ITEMS],
                        NeedsAny: [Equipment.IRON_BOOTS, Equipment.SCALE]
                    }
                },
                ItemLocations: {
                    "4 Underwater Crates in Dragon Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dragon Statue Submerged Crate {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 53, y: 62, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "In the whirlpool dragon room, use your iron boots or silver scale to sink to the little hallway behind the dragon where the crates reside. You can use chus to blow up the crates and dive for the items (drop on the 6th red flash for the close ones; the 4th red flash for the far ones).",
                        NeedsAny: [
                            Equipment.IRON_BOOTS,
                            [Equipment.SCALE, Items.BOMBCHU]
                        ]
                    },
                    "2 Crates Behind Dragon Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dragon Statue By Torches Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 33, y: 62, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        LongDescription: "In the whirlpool dragon room, use your iron boots or silver scale to go past the little hallway behind the dragon. The crates are the big ones on the surface in the next room.",
                        NeedsAny: [Equipment.IRON_BOOTS, Equipment.SCALE]
                    },
                    "5 Crates Behind Dragon Room": {
                        SpoilerLogName: [
                            {
                                name: "Water Temple MQ Dragon Statue By Torches Crate {#}",
                                count: 2
                            },
                            {
                                name: "Water Temple MQ Dragon Statue By Torches Small Wooden Crate {#}",
                                count: 3
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "5 Crates",
                        MapInfo: { x: 33, y: 62, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "In the whirlpool dragon room, use your iron boots or silver scale to go past the little hallway behind the dragon. The crates are on the surface in the next room.",
                        NeedsAny: [Equipment.IRON_BOOTS, Equipment.SCALE]
                    },
                    "Wonderitem Behind Dragon Room": {
                        SpoilerLogName: "Water Temple MQ Dragon Statue Crates Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 29, y: 61, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27.1,
                        LongDescription: "In the whirlpool dragon room, use your iron boots or silver scale to go past the little hallway behind the dragon. Hookshot the symbol on the wall behind the crates to spawn the wonderitem.",
                        NeedsAny: [Equipment.IRON_BOOTS, Equipment.SCALE],
                        Needs: [Items.HOOKSHOT]
                    },
                    "2 Wonderitems in Dragon's Eyes": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dragon Statue Eyes Hookshot Wonderitem {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Hookshot Wonderitems",
                        MapInfo: { x: 74, y: 68, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27.2,
                        LongDescription: "In the whirlpool dragon room, use your boots to sink down. Shoot both eyes with your hookshot to spawn two wonderitems. Note that there's a weird thing in the water that sometimes stops your shot - just keep trying!",
                        Needs: [Items.HOOKSHOT, Equipment.IRON_BOOTS]
                    },
                    "2 Crates by Dragon Room Door": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dragon Statue Near Door Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 95, y: 61, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "These crates are by the door leading out of the whirlpool dragon room. You get there by going through the rooms from the upper west path from the lobby."
                    }
                }
            },
            singleWaterPillarRoom: {
                DisplayGroup: { groupName: "Boss Key Loop (Top West)", imageName: "Boss Key" },
                Exits: {
                    dragonRoom: {},
                    afterSingleWaterPillarRoomGate: {
                        NeedsAny: [Items.DINS_FIRE, Tricks.weirdShot.canDoWithLongshot]
                    }
                },
                ItemLocations: {
                    "Pot in Upper Single Water Pillar Room": {
                        SpoilerLogName: "Water Temple MQ Boss Key Chest Room Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 102, y: 95, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The pot is to your left in the next room."
                    },
                    "Crate in Upper Single Water Pillar Room": {
                        SpoilerLogName: "Water Temple MQ Boss Key Chest Room Upper Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 89, y: 95, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The crate is to your right in the next room."
                    },
                    "4 Crates in Lower Single Water Pillar Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Boss Key Chest Room Lower Crate {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 95, y: 111, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The crates are in the pit."
                    }
                }
            },
            afterSingleWaterPillarRoomGate: {
                DisplayGroup: { groupName: "Boss Key Loop (Top West)", imageName: "Boss Key" },
                Exits: {
                    singleWaterPillarRoom: {},
                    bottomGateSwitch: {
                        Needs: [Equipment.IRON_BOOTS]
                    }
                },
                ItemLocations: {
                    "Chest Behind Single Water Pillar Gate": {
                        SpoilerLogName: "Water Temple MQ Boss Key Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 95, y: 126, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. In the next room, stand on the water pillar and hit the crystal switch to raise the pillar. Use Din's fire to lower the gate so you can get to the chest."
                    }
                }
            },
            bottomGateSwitch: {
                DisplayGroup: { groupName: "Skulltula Jail Room (Low South)", imageName: "Fire Arrow" },
                Exits: {
                    afterSingleWaterPillarRoomGate: {
                        // Either weird shot (which you'd use to get here), or you came from here
                    },
                    upperTripleTorchRoom: {
                        Needs: [
                            Equipment.IRON_BOOTS,
                            [SetType.OR, Items.FIRE_ARROW, Tricks.weirdShot.canDo]
                        ],
                        NeedsAny: [Equipment.HOVER_BOOTS, GameStateSets.CAN_HOOK_SCARECROW]
                    },
                    roomAfterSpikes: {
                        NeedsAny: [Equipment.HOVER_BOOTS, UpgradedItems.LONGSHOT],
                    }
                },
                ItemLocations: {
                    "6 Underwater Crates in Low South Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Triple Wall Torch Submerged Crate {#}",
                            count: 6
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 86, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, use your iron boots to get to the low south area. The crates are underwater in the corners of the next room."
                    }
                }
            },
            upperTripleTorchRoom: {
                DisplayGroup: { groupName: "Skulltula Jail Room (Low South)", imageName: "Fire Arrow" },
                Exits: {},
                ItemLocations: {
                    "4 Pots in Low South Room Jail": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Triple Wall Torch Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 24, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the pots."
                    },
                    "3 Crates in Low South Room Jail": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Triple Wall Torch Behind Gate Crate {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 27, y: 252, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the crates."
                    },
                    "Skulltula in Low South Room Jail": {
                        SpoilerLogName: "Water Temple MQ GS Triple Wall Torch",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 30, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the skulltula (it's on the ceiling).",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Wonderitem in Low South Room Jail": {
                        SpoilerLogName: "Water Temple MQ Triple Wall Torch Hookshot/Bow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Projectile Wonderitem",
                        MapInfo: { x: 18, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 36.1,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to open the cell. Shoot the wall with your hookshot or bow to spawn the wonderitem.",
                        NeedsAny: [Items.HOOKSHOT, Items.FAIRY_BOW]
                    }
                }
            },
            roomAfterSpikes: {
                DisplayGroup: { 
                    groupName: "Mini Waterfall Loop (Low North)", 
                    imageName: "Zora Tunic",
                    description: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom north room. Cross it with your longshot or hover boots (jumpslash, or backwalk/backflip). Enter the next room.",
                    tricksToShow: [Tricks.waterBKJumpToWaterfall]
                },
                Exits: {
                    dodongoRoom: {
                        Needs: [Items.HOOKSHOT]
                    },
                    northWaterfallArea: {
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            GameStateSets.CAN_HOOK_SCARECROW, 
                            Tricks.waterBKJumpToWaterfall.canDo
                        ]
                    }
                },
                ItemLocations: {
                    "2 Crates in Low North Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Freestanding Key Area Front Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 192, y: 104, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "The crates are by the entrance to the room."
                    },
                    "6 Underwater Crates in Low North Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Freestanding Key Area Submerged Crate {#}",
                            count: 6
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 192, y: 76, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "The crates are submerged in the water."
                    },
                    "4 Crates Behind Low North Room Gate": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Freestanding Key Area Behind Gate Crate {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 191, y: 50, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "Navigate to the farthest box in the back of the room and use your iron boots to sink down onto it. Hookshot the center of the ceiling, around the second brick texture to hookshot an unintended hookshot target to get over the gate where the crates reside.<br/><br/>The intended path involves going around the rooms to your left, through the waterfall entrance. You'd either spawn the scarecrow, or do the glich to get across."
                    },
                    "Skulltula Behind Low North Room Gate": {
                        SpoilerLogName: "Water Temple MQ GS Freestanding Key Area",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 185, y: 50, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "Navigate to the farthest box in the back of the room and use your iron boots to sink down onto it. Hookshot the center of the ceiling, around the second brick texture to hookshot an unintended hookshot target to get over the gate. The skulltula would be to your left.<br/><br/>The intended path involves going around the rooms to your left, through the waterfall entrance. You'd either spawn the scarecrow, or do the glich to get across."
                    }
                }
            },
            tripleWaterSpoutRoom: {
                DisplayGroup: { groupName: "Mini Waterfall Loop (Low North)", imageName: "Zora Tunic" },
                Exits: {
                    dodongoRoom: {},
                    northWaterfallArea: {}
                },
                ItemLocations: {
                    "2 Wonderitems in Triple Water Spout Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ 3 Water Spouts Proximity Wonderitem {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Wonderitems",
                        MapInfo: { x: 151, y: 44, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 40.9,
                        LongDescription: "In the water spout room (room in the close door in the low north room), hit the switch to spawn the water spouts. You will get these wonderitems when you jump on the first and last spout."
                    }
                }
            },
            dodongoRoom: {
                DisplayGroup: { groupName: "Mini Waterfall Loop (Low North)", imageName: "Zora Tunic" },
                Exits: {
                    tripleWaterSpoutRoom: {}
                },
                ItemLocations: {
                    "2 Pots in Low North Dodongo Room": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dodongo Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 298, y: 23, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find the pots along the back-right wall."
                    },
                    "3 Crates in Low North Dodongo Room Pit": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Dodongo Room Lower Crate {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 276, y: 41, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find the crates in the pit with the dodongos."
                    },
                    "Crate in Low North Dodongo Room": {
                        SpoilerLogName: "Water Temple MQ Dodongo Room Upper Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 255, y: 24, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find this crate on the left ledge in the corner of the room."
                    },
                    "Crate in Low North Dodongo Room Hallway": {
                        SpoilerLogName: "Water Temple MQ Dodongo Room Hall Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 301, y: 67, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find this crate in the little tunnel in one of the corners."
                    }
                }
            },
            northWaterfallArea: {
                DisplayGroup: { groupName: "Mini Waterfall Loop (Low North)", imageName: "Zora Tunic" },
                Exits: {
                    dodongoRoom: {
                        Needs: [ItemSets.FIRE_ITEMS]
                    }
                },
                ItemLocations: {
                    "2 Pots in Room by Low North Waterfall": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Freestanding Key Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 124, y: 53, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 45,
                        LongDescription: "Play the Scarecrow's song and hookshot it to get to the opening by the waterfall to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The pots are in the back corners of the room.",
                    },
                    "5 Crates in Room by Low North Waterfall": {
                        SpoilerLogName: [{
                            name: "Water Temple MQ Freestanding Key Room Crate {#}",
                            count: 5
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "5 Crates",
                        MapInfo: { x: 124, y: 60, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 46,
                        LongDescription: "Play the Scarecrow's song and hookshot it to get to the opening by the waterfall to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The crates are along the walls in the room.",
                    },
                    "Freestanding Item in Room by Low North Waterfall": {
                        SpoilerLogName: "Water Temple MQ Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 115, y: 64, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 47,
                        LongDescription: "Play the Scarecrow's song and hookshot it to get to the opening by the waterfall to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The item is in the box to your left."
                    },
                    "Wonderitem in Room by Low North Waterfall": {
                        SpoilerLogName: "Water Temple MQ Freestanding Key Hookshot Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 123, y: 49, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 47.1,
                        LongDescription: "Play the Scarecrow's song and hookshot it to get to the opening by the waterfall to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. In the room, hookshot the symbol on the wall to spawn the wonderitem.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            }
        }
    },

    "Shadow Temple": {
        Abbreviation: "SHDW",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F1", "B1", "B2"],
        StartingFloorIndex: 0,
        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                Exits: {
                    truthSpinnerRoom: {
                        Needs: [GameStateSets.SHADOW_LENS_CHECK],
                        NeedsAny: [Items.HOOKSHOT, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    Exit: {
                        OwExit: OwExits["Shadow Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Locked Door by Truth Spinner": {
                        DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["truthSpinnerRoom"],
                        MapInfo: { x: 125, y: 152, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This is the door behind the explodable wall in the truth spinner room.",
                        Needs: [ItemSets.EXPLOSIVES],
                        StartingDoorRequirement: () => true
                    },
                    "Locked Door by Beamos": {
                        DisplayGroup: { groupName: "Gibdos & Scythe Rooms", imageName: "Dungeon Map" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterTruthSpinner"],
                        MapInfo: { x: 330, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "This is the door near the beamos after the truth spinner room.",
                        Needs: [ItemSets.EXPLOSIVES],
                        StartingDoorRequirement: () => true,
                        NextDoors: { "Locked Door in Giant Room": () => true }
                    },
                    "Locked Door in Giant Room": {
                        DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["rightSideOfGiantRoom", "invisibleSpikeRoom"],
                        MapInfo: { x: 157, y: 93, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "This is the locked door on the right side of the giant room.",
                        // This logic works from both sides, as you can't do anything from the reverse side without passing this check
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo],
                        NextDoors: { "Locked Door in Invisible Spike Room": () => true }
                    },
                    "Locked Door in Invisible Spike Room": {
                        DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["invisibleSpikeRoom", "windHallway"],
                        MapInfo: { x: 156, y: 46, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "This is the locked door in the room with the invisible spikes.",
                        Needs: [Items.HOOKSHOT],
                        NextDoors: { 
                            "Locked Door in Giant Room": () => Tricks.shadowAdultGateClip.enabled,
                            "Locked Door After Fans": () => true 
                        }
                    },
                    "Locked Door After Fans": {
                        DisplayGroup: { groupName: "Wind Hallway & Gibdo Room", imageName: "Iron Boots" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["windHallway", "boatRoom"],
                        MapInfo: { x: 303, y: 131, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 33,
                        LongDescription: "This is the locked door in the Gibdos room after all the fans.",
                        StartingDoorRequirement: () => SettingSets.SHADOW_GATE_CLIP(),
                        NextDoors: { 
                            "Locked Door in Invisible Spike Room": () => Tricks.shadowAdultGateClip.enabled,
                            "Locked Door in Invisible Wall Room": () => true
                        }
                    },
                    "Locked Door in Invisible Wall Room": {
                        DisplayGroup: { groupName: "Invisible Wall Maze Rooms", imageName: "Boss Key" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["invisibleWallRoom"],
                        MapInfo: { x: 90, y: 79, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "This is the locked door in the invisible wall room.",
                        StartingDoorRequirement: () =>
                            Tricks.shadowAdultGateClip.enabled ||
                            (Tricks.shadowClipToBossAntechamber.enabled && Tricks.shadowBKSkip.enabled)
                    }
                }
            },
            truthSpinnerRoom: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                Exits: {
                    mazeByEntrance: {
                        LockedDoor: "Locked Door by Truth Spinner",
                        Map: "Shadow Temple",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    afterTruthSpinner: {
                        NeedsAny: [
                            Items.FIRE_ARROW,
                            Equipment.HOVER_BOOTS,
                            UpgradedItems.LONGSHOT,
                            Tricks.megaFlip.canDo
                        ]
                    }
                },
                ItemLocations: {
                    "4 Crates by Truth Spinner": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Truth Spinner Small Wooden Crate {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 139, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "These are the small crates by the truth spinner in the first main room of the temple, against the wall."
                    }
                }
            },
            mazeByEntrance: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                Exits: {
                    mazeBack: {
                        AdultNeeds: [Songs.SONG_OF_TIME]
                    }
                },
                ItemLocations: {
                    "2 Pots in Redead Maze Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Compass Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 107, y: 108, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "After entering the truth spinner room, navigate to the Eye of Truth symbol on the lower left wall. Bomb it to open up the path. Use a key to enter the maze. Head right through the invisible wall. The chests are in the back right corner of the next room."
                    },
                    "Redead Chest in Maze": {
                        SpoilerLogName: "Shadow Temple MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 100, y: 107, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "After entering the truth spinner room, navigate to the Eye of Truth symbol on the lower left wall. Bomb it to open up the path. Use a key to enter the maze. Head right through the invisible wall. Kill the enemies to spawn the chest."
                    },
                    "2 Flying Pots in Front Maze Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Whispering Walls Before Time Block Flying Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 102, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "In the left (south) part of the first maze loop from the entrance, these two pots will fly at you."
                    },
                    "2 Pots in Front Maze Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Whispering Walls Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 92, y: 153, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "These pots are marking the Song of Time block in the first maze loop - loop around to the other side from the door to find them."
                    }
                }
            },
            mazeBack: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                Exits: {
                    bossRoom: {
                        Age: Age.ADULT,
                        Needs: [Tricks.shadowClipToBossAntechamber.canDo]
                    }
                },
                ItemLocations: {
                    "2 Flying Pots in Back Maze Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Whispering Walls After Time Block Flying Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 65, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "If adult, play the Song of Time by the wall marked by the two pots to advance to the next maze section. On the left side with the eyes, these pots will fly at you."
                    },
                    "Dead Hand Chest": {
                        SpoilerLogName: "Shadow Temple MQ Hover Boots Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 15, y: 142, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "In the maze by the entrance, navigate around to the other side of the first room. Play the Song of Time to remove the block in the way (invisible without the lens). In the next room, shoot the middle eye. Now you can enter the northwest door. Kill Dead Hand to spawn the chest.",
                        Needs: [ItemSets.SWORDS],
                        NeedsAny: [ItemSets.PROJECTILES, QPAItemSets.TALL_TORCH_QPA]
                    }
                }
            },
            afterTruthSpinner: {
                DisplayGroup: { groupName: "Gibdos & Scythe Rooms", imageName: "Dungeon Map" },
                Exits: {
                    afterBeamos: {
                        LockedDoor: "Locked Door by Beamos",
                        Map: "Shadow Temple",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    boatRoom: {
                        ChildNeeds: [Tricks.shadowChildGateClip.canDo],
                        AdultNeeds: [Tricks.shadowAdultGateClip.canDo]
                    },
                    boatRoomLedge: {
                        Age: Age.ADULT,
                        Needs: [Tricks.shadowJumpToBoatRoomLedge.canDo]
                    }
                },
                ItemLocations: {
                    "Scythe Silver Rupee Right of Scythe": {
                        SpoilerLogName: "Shadow Temple MQ Scythe Shortcut Silver Rupee Center Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 304, y: 113, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.1,
                        LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip, hover boots, or use longshot (stand in the corner, hookshot the opposite torch, then jumpslash). Take the left door from the beamos.<br/><br/>This rupee is to the right of the spinning scythe."
                    },
                    "Scythe Silver Rupee Left of Scythe": {
                        SpoilerLogName: "Shadow Temple MQ Scythe Shortcut Silver Rupee Center Left",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 292, y: 99, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.2,
                        LongDescription: "This rupee is to the left of the spinning scythe."
                    },
                    "Scythe Silver Rupee in Left Alcove": {
                        SpoilerLogName: "Shadow Temple MQ Scythe Shortcut Silver Rupee Left Alcove",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 271, y: 113, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.3,
                        LongDescription: "This rupee is in the alcove on the left, garded by a giant skulltula."
                    },
                    "Scythe Silver Rupee in Midair": {
                        SpoilerLogName: "Shadow Temple MQ Scythe Shortcut Silver Rupee Ledge",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 273, y: 88, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 8.4,
                        LongDescription: "This rupee is in the northwest corner of the room. Use your hookshot or hover boots to get to it.",
                        TricksToShow: [Tricks.shadowScytheSilverRupeeWithNothing],
                        NeedsAny: [
                            Items.HOOKSHOT, 
                            Equipment.HOVER_BOOTS, 
                            Tricks.shadowScytheSilverRupeeWithNothing.canDo
                        ]
                    },
                    "Scythe Silver Rupee in Back Alcove": {
                        SpoilerLogName: "Shadow Temple MQ Scythe Shortcut Silver Rupee Back Alcove",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 316, y: 78, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.5,
                        LongDescription: "This rupee is in the alcove in the back part of the room, guarded by a giant skulltula."
                    },
                    "Scythe Room Silver Rupee Chest": {
                        SpoilerLogName: "Shadow Temple MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 121, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function(age) { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                        Order: 9,
                        LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Gather all the rupees to open the cell to the chest.",
                        NeedsAny: [SilverRupeeSets.MQ_SHADOW_SILVER_RUPEES_SCYTHE_ROOM, Tricks.weirdShot.canDo]
                    },
                    "Invisible Chest Under Scythe Room": {
                        SpoilerLogName: "Shadow Temple MQ Near Ship Invisible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 278, y: 122, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "Facing away from the door into the scythe room, go to the upper right room and fall down the invisible hole. There is an invisible chest to the right of the climbable wall."
                    },
                    "Chest in Early Gibdos Room": {
                        SpoilerLogName: "Shadow Temple MQ Early Gibdos Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 300, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.01,
                        LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Kill the enemies to spawn the chest."
                    }
                }
            },
            afterBeamos: {
                DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                Exits: {
                    invisibleScytheRoom: {},
                    rightSideOfGiantRoom: {
                        // Jump to the left side of the platform:
                        // https://youtu.be/vmr9uhILL9Q?si=0jDB7UhWQGhtRHAC
                    }
                },
                ItemLocations: {}
            },
            invisibleScytheRoom: {
                DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                Exits: {
                    gatedAreaInInvisibleScytheRoom: {
                        NeedsAny: [SilverRupeeSets.MQ_SHADOW_SILVER_RUPEES_INVISIBLE_SCYTHE_ROOM, Tricks.weirdShot.canDo]
                    }
                },
                ItemLocations: {
                    "9 Invisible Scythe Silver Rupees in Center": {
                        SpoilerLogName: [
                            {
                                name: "Shadow Temple MQ Invisible Blades Silver Rupee {#}",
                                count: 6
                            },
                            {
                                name: "Shadow Temple MQ Invisible Blades Silver Rupee {#}",
                                tokens: ["Back Right", "Back Left", "Like Like"]
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        DefaultEntranceGroupName: "9 Silver Rupees",
                        MapInfo: { x: 313, y: 141, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 12.1,
                        LongDescription: "To get to this room, first make it to the platform with the two beamos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to).<br/><br/>The rupees are spread out in the center of the room where the invisible scythe is. One is under the Like Like, so kill it or lure it out to get it."
                    },
                    "Invisible Scythe Silver Rupee in Corner": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Blades Silver Rupee Song of Time Block",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 331, y: 160, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 12.2,
                        LongDescription: "This rupee is in the back right corner of the invisible scythe room. You'll need to play the Song of Time to spawn a block to get it.",
                        Needs: [Songs.SONG_OF_TIME]
                    },
                    "2 Hearts in Invisible Scythe Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Invisible Blades Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 331, y: 123, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "To get to this room, first make it to the platform with the two beamos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). The hearts are in the back left corner. Adult can play the Song of Time to spawn a block to get them, child will need the boomerang.",
                        ChildNeeds: [Items.BOOMERANG],
                        AdultNeedsAny: [Items.BOOMERANG, Songs.SONG_OF_TIME, Tricks.staircaseHover.canDo]
                    }
                }
            },
            gatedAreaInInvisibleScytheRoom: {
                DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                Exits: {},
                ItemLocations: {
                    "Visible Chest in Invisible Scythe Room": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Blades Visible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 343, y: 138, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest."
                    },
                    "Invisible Chest in Invisible Scythe Room": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Blades Invisible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 343, y: 142, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest - it's next to the visible one."
                    }
                }
            },
            rightSideOfGiantRoom: {
                DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                Exits: {
                    afterBeamos: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    fallingSpikesRoom: {},
                    invisibleSpikeRoom: {
                        LockedDoor: "Locked Door in Giant Room",
                        Map: "Shadow Temple",
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    }
                },
                ItemLocations: {
                    "Pit Room Silver Rupee in Front of Beamos": {
                        SpoilerLogName: "Shadow Temple MQ Huge Pit Silver Rupee Center Front",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 142, y: 215, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15.6,
                        LLongDescription: "In the giant room, use a fire item to hit the frozen eye switch, or jump from the beamos platform to the LEFT part of the jutting out land. This will spawn some platforms in the direction the eye is facing. Use them to get to the right side of the room.<br/><br/>This rupee is in front of the beamos."
                    },
                    "Pit Room Silver Rupee in Behind Beamos": {
                        SpoilerLogName: "Shadow Temple MQ Huge Pit Silver Rupee Center Back",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 132, y: 215, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15.7,
                        LLongDescription: "This rupee is in behind of the lone pit room beamos."
                    },
                    "Pit Room Silver Rupee by Chasm": {
                        SpoilerLogName: "Shadow Temple MQ Huge Pit Silver Rupee Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 138, y: 195, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15.8,
                        LLongDescription: "This rupee is by the chasm near the lone pit room beamos."
                    },
                    "2 Pit Room Silver Rupees Above Beamos": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Huge Pit Silver Rupee Ceiling {#}",
                            tokens: ["Upper", "Lower"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        DefaultEntranceGroupName: "2 Silver Rupees",
                        MapInfo: { x: 137, y: 215, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 15.9,
                        LongDescription: "These rupees are above the lone pit room beamos. Use your longshot to get to them.",
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    "Chest in Giant Room": {
                        SpoilerLogName: "Shadow Temple MQ Beamos Silver Rupees Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 138, y: 241, floor: "B2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                        Order: 16,
                        LongDescription: "In the giant room, use a fire item to hit the frozen eye switch. This will spawn some platforms in the direction the eye is facing. Use them to get to the right side of the room. Once there, gather all the silver rupees to spawn the chest. Two of them are up high and requires the longshot.",
                        Needs: [SilverRupeeSets.MQ_SHADOW_SILVER_RUPEES_PIT_ROOM]
                    }
                }
            },
            fallingSpikesRoom: {
                DisplayGroup: { groupName: "Falling Spikes Room", imageName: "Goron's Bracelet" },
                Exits: {
                    topOfFallingSpikesRoom: {
                        ChildNeeds: [Tricks.shadowBackFlipOnSpikes.canDo],
                        AdultNeedsAny: [Equipment.STRENGTH, Tricks.shadowBackFlipOnSpikes.canDo]
                    }
                },
                ItemLocations: {
                    "2 Lower Pots in Falling Spikes Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Falling Spikes Lower Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 51, y: 211, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 16.1,
                        LongDescription: "Get to the right side of the giant room. Hit the switch behind the gate to open it to get to the falling spikes room. The pots are in the alcove to the right of the first set of spikes."
                    },
                    "Skulltula in Falling Spikes Room": { 
                        SpoilerLogName: "Shadow Temple MQ GS Falling Spikes Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 53, y: 237, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "Get to the right side of the giant room. Hit the switch behind the gate to open it to get to the falling spike room. In the first cell to the left is the skulltula.",
                        NeedsAny: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS, Tricks.staircaseHover.canDo]
                    },
                    "Bottom Chest in Falling Spikes Room": {
                        SpoilerLogName: "Shadow Temple MQ Falling Spikes Lower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 36, y: 213, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "This chest is in the first cell to the right in the falling spike room."
                    }
                }
            },
            topOfFallingSpikesRoom: {
                DisplayGroup: { groupName: "Falling Spikes Room", imageName: "Goron's Bracelet" },
                UseAdultAge: function() {  return !Tricks.shadowBackFlipOnSpikes.enabled; },
                Exits: {},
                ItemLocations: {
                    "Top Switchless Chest in Falling Spikes Room": {
                        SpoilerLogName: "Shadow Temple MQ Falling Spikes Upper Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 17, y: 239, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. The chest is in the southeast corner."
                    },
                    "Top Switch Chest in Falling Spikes Room": {
                        SpoilerLogName: "Shadow Temple MQ Falling Spikes Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 76, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. Press the switch to spawn the chest."
                    },
                    "2 Upper Pots in Falling Spikes Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Falling Spikes Upper Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 82, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. The pots are above the hidden block's alcove."
                    }
                }
            },
            invisibleSpikeRoom: {
                DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
                Exits: {
                    rightSideOfGiantRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Giant Room"
                    },
                    leftOfInvisibleSpikeRoom: {
                        Map: "Shadow Temple",
                        Needs: [SilverRupeeSets.MQ_SHADOW_SILVER_INVISIBLE_SPIKE_ROOM]
                    },
                    windHallWayTop: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Invisible Spike Room",
                        Needs: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
                    }
                },
                ItemLocations: {
                    "Chest in Invisible Spike Room": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 155, y: 63, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "From the right side of the giant room, make your way across the invisible platforms to the northwest door. If megaflipping, pull out a chu when the platform stops closest to the door. Use a key to open the door.<br/><br/>Kill all the enemies to spawn the chest."
                    },
                    "Invisible Spike Ground Center Silver Rupee": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Center Front",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 156, y: 72, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 23.1,
                        LongDescription: "This rupee is in front of you as you enter the room."
                    },
                    "Invisible Spike Right Ground Silver Rupee": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Center Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 173, y: 68, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 23.2,
                        LongDescription: "This rupee is in to the right as you enter the room."
                    },
                    "Invisible Spike Silver Rupee on Right Wall": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Right Hookshot Target",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 184, y: 65, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.3,
                        LongDescription: "This rupee is in to the right, just below the hookshot target.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Ceiling Silver Rupee by Entrance": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Ceiling Front",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 156, y: 84, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.4,
                        LongDescription: "This rupee is above you as you enter the room. It's the one closer to the entrance.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Ceiling Silver Rupee in Center": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Ceiling Middle",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 156, y: 70, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.5,
                        LongDescription: "This rupee is above you as you enter the room. It's the one farther from the entrance.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Ceiling Silver Rupee by Exit": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Ceiling Back",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 156, y: 50, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.6,
                        LongDescription: "This rupee is above the exit door. It marks an invisible hookshot target. If you need height, kill the redeads to spawn the chest. Backflip onto the chest and hookshot it from there.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Midair Silver Rupee on Back Right Wall": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Back Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 175, y: 52, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.7,
                        LongDescription: "First, get to the exit door (see the previous rupee). You can roll + jumpslash, or just use hover boots to get the rupee.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Silver Rupee on Left Wall": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Left Hookshot Target",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 136, y: 82, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.8,
                        LongDescription: "This rupee is in to the left, just below the hookshot target.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Silver Rupee on Invisible Ledge": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Ledge",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 132, y: 52, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.9,
                        LongDescription: "This rupee is on an invisible ledge in the back left corner of the room. There's an invisible hookshot target on the back wall you can use to get up to it.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Midair Silver Rupee by Invisible Ledge": {
                        SpoilerLogName: "Shadow Temple MQ Invisible Spikes Silver Rupee Near Ledge",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 140, y: 60, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23.91,
                        LongDescription: "Get to the invisible ledge (see the previous rupee). You can use your hover boots, or roll jump to get to this nearby silver rupee.",
                        Needs: [Items.HOOKSHOT]
                    }
                }
            },
            leftOfInvisibleSpikeRoom: {
                DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                Exits: {},
                ItemLocations: {
                    "Chest in Stalfos Room": {
                        SpoilerLogName: "Shadow Temple MQ Stalfos Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 68, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "Gather all the rupees in the invisible spike room. You'll need your hookshot. There are several invisible targets on the walls you need to use as well. Once done, enter the room that opens and kill all the Stalfos to spawn the chest."
                    }
                }
            },
            windHallWayTop: {
                DisplayGroup: { groupName: "Wind Hallway & Gibdo Room", imageName: "Iron Boots" },
                Exits: {
                    invisibleSpikeRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Invisible Spike Room",
                    },
                    windHallway: {
                        Needs: [GameStateSets.SHADOW_IRON_BOOTS_CHECK]
                    }
                },
                ItemLocations: {}
            },
            windHallway: {
                DisplayGroup: { groupName: "Wind Hallway & Gibdo Room", imageName: "Iron Boots" },
                Exits: {
                    windHallWayTop: {
                        Needs: [Items.HOOKSHOT, GameStateSets.SHADOW_IRON_BOOTS_CHECK]
                    },
                    boatRoom: {
                        LockedDoor: "Locked Door After Fans",
                        Map: "Shadow Temple"
                    }
                },
                ItemLocations: {
                    "Skulltula at End of Wind Hallway": {
                        SpoilerLogName: "Shadow Temple MQ GS Wind Hint Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 350, y: 193, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 26,
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        LongDescription: "Go through the door at the top of the invisible spike room. You may need hover boots if the clear platforms are there. Navigate through the wind hallway all the way to the door. The skulltula is in plain sight in this room."
                    },
                    "Invisible Chest at End of Wind Hallway": {
                        SpoilerLogName: "Shadow Temple MQ Wind Hint Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 199, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "In the room at the end of the wind hallway, there's an invisible chest in the upper right corner."
                    },
                    "2 Flying Pots in Gibdo Room by Wind Hallway": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ After Wind Flying Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 142, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 28,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. The pots will fly at you as you approach the back of the room."
                    },
                    "2 Pots in Gibdo Room by Wind Hallway": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ After Wind Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 152, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 29,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. The pots are next to the gibdos."
                    },
                    "Chest in Gibdo Room by Wind Hallway": {
                        SpoilerLogName: "Shadow Temple MQ After Wind Enemy Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 301, y: 148, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 30,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. Kill the Gibdos to spawn the chest."
                    },
                    "Hidden Chest in Gibdo Room by Wind Hallway": {
                        SpoilerLogName: "Shadow Temple MQ After Wind Hidden Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 309, y: 158, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 31,
                        Needs: [ItemSets.EXPLOSIVES],
                        LongDescription: "In the Gibdo room, bomb the rubble to your right to get to this chest."
                    },
                    "Skulltula in Gibdo Room by Wind Hallway": {
                        SpoilerLogName: "Shadow Temple MQ GS After Wind",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 294, y: 139, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: () => !Tricks.shadowChildGateClip.enabled,
                        Order: 32,
                        LongDescription: "In the Gibdo room, bomb the rubble at the back (a crouch-stab will work as well) to get to this skulltula."
                    }
                }
            },
            boatRoom: {
                DisplayGroup: { groupName: "Boat Room Start",  imageName: "Zelda's Lullaby" },
                Exits: {
                    windHallway: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door After Fans"
                    },
                    boatRoomLedge: {
                        Needs: [GameStateSets.CAN_LONGSHOT_SCARECROW]
                    },
                    endOfBoatRide: {
                        Needs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {}
            },
            boatRoomLedge: {
                DisplayGroup: { 
                    groupName: "Boat Room Start", 
                    imageName: "Zelda's Lullaby",
                    description: "The room with the giant boat that you get to after the fan/gibdos room.",
                    tricksToShow: [Tricks.shadowChildGateClip, Tricks.shadowAdultGateClip] 
                },
                Exits: {
                    boatRoom: {}
                },
                ItemLocations: {
                    "2 Hearts in Boat Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Before Boat Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 280, y: 114, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole.<br/><br/>Play scarecrow's song from the boat and longshot it to get to the platform with the hearts.",
                        TricksToShow: [Tricks.shadowJumpToBoatRoomLedge]
                    }
                }
            },
            endOfBoatRide: {
                DisplayGroup: { 
                    groupName: "Boat Room Chasm Areas", 
                    imageName: "Fairy Bow",
                    description: "The areas on either side of the chasm that you get to after riding the giant boat.",
                    tricksToShow: [Tricks.shadowChuBombFlowers]
                },
                Exits: {
                    acrossChasm: {
                        NeedsAny: [Items.FAIRY_BOW, Tricks.shadowChuBombFlowers.canDo]
                    }
                },
                ItemLocations: {
                    "2 Pots on Boat Side of Chasm": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ After Boat Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 135, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across.<br/><br/>The pots are near where the statue falls to form the bridge."
                    },
                    "Skulltula in Chasm": {
                        SpoilerLogName: "Shadow Temple MQ GS After Ship",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 140, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "Navigate to the boat room - this is the room after the Gibdo room by the wind hallway. Get to the boat by pushing the block, or hookshotting up the ladder. Play Zelda's Lullaby to move the boat to the other area. The skulltula is on the wall to the left of where you create the bridge - you can use a pot to kill it and drop down if you have no hookshot."
                    }
                }
            },
            acrossChasm: {
                DisplayGroup: { groupName: "Boat Room Chasm Areas", imageName: "Fairy Bow" },
                Exits: {
                    endOfBoatRide: {
                        NeedsAny: [
                            ItemSets.EXPLOSIVES_OR_STRENGTH, 
                            Items.FAIRY_BOW,
                            Items.DINS_FIRE,
                            Items.BLUE_FIRE,
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    chasmPlatform: {
                        Needs: [
                            // Hit the eye switch
                            [SetType.OR,
                                [Songs.SONG_OF_TIME, Items.FAIRY_BOW],
                                QPAItemSets.LEDGE_QPA,
                                Tricks.hookshotExtensionSotBlocks.canDoWithBow],
                            
                            // Cross the gap
                            [SetType.OR,
                                UpgradedItems.LONGSHOT,
                                Tricks.mqShadowChasmPlatformWithHookshot.canDo]
                        ]
                    },
                    bossRoomDoor: {
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    }
                },
                ItemLocations: {
                    "2 Pots by Boss Antechamber": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Near Boss Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 132, y: 128, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. These pots are by the boss antechamber entrance."
                    },
                    "Heart on Pillar Across Chasm": {
                        SpoilerLogName: "Shadow Temple MQ After Boat Lower Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 125, y: 124, floor: "B1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Climb up the Song of Time block to gain access to the heart."
                    }
                }
            },
            chasmPlatform: {
                DisplayGroup: { groupName: "Boat Room Chasm Areas", imageName: "Fairy Bow" },
                Exits: {
                    invisibleWallRoom: {},
                },
                ItemLocations: {
                    "2 Hearts on Chasm Longshot Platform": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ After Boat Upper Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 120, y: 116, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the hearts.",
                        TricksToShow: [Tricks.mqShadowChasmPlatformWithHookshot]
                    }
                }
            },
            invisibleWallRoom: {
                DisplayGroup: { 
                    groupName: "Invisible Wall Maze Rooms", 
                    imageName: "Boss Key",
                    description: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the switch to unbar the door.",
                    tricksToShow: [Tricks.mqShadowChasmPlatformWithHookshot]
                },
                Exits: {
                    spikeWallRoom: {
                        LockedDoor: "Locked Door in Invisible Wall Room",
                        Map: "Shadow Temple"
                    }
                },
                ItemLocations: {
                    "Wonderitem in Triple Skull Room": {
                        SpoilerLogName: "Shadow Temple MQ 3 Spinning Pots Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 66, y: 98, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 43.9,
                        LongDescription: "In the invisible maze, navigate to the west room. Go through and turn around. Shoot the upper part of the picture above the door to spawn the wonderitem.",
                        Needs: [Items.FAIRY_BOW]
                    },
                    "Freestanding Item in Triple Skull Room": {
                        SpoilerLogName: "Shadow Temple MQ Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 31, y: 99, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "In the invisible maze, navigate to the west room. The item is behind the triple skulls."
                    },
                    "9 Rupees in Triple Skull Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ 3 Spinning Pots Rupee {#}",
                            count: 9
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "9 Skull Rupees",
                        MapInfo: { x: 38, y: 99, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 45,
                        LongDescription: "From the room with invisible walls, enter the room that's straight ahead of you (the west room). Use the bomb flower or your own bombs to blow up all three skulls to spawn the 9 items.",
                        TricksToShow: [Tricks.shadowGiantSkullsWithChus],
                        NeedsAny: [
                            Items.BOMB,
                            Equipment.STRENGTH,
                            Tricks.shadowGiantSkullsWithChus.canDo
                        ]
                    },
                    "Bomb Flower Room Chest": {
                        SpoilerLogName: "Shadow Temple MQ Bomb Flower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 144, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 46,
                        LongDescription: "In the invisible maze, navigate to the south room. Use explosives to make Dead Hand spawn. Kill him to spawn the chest.",
                        Needs: [ItemSets.EXPLOSIVES_OR_STRENGTH]
                    },
                    "2 Pots in Bomb Flower Room": {
                        SpoilerLogName: [{
                            name: "Shadow Temple MQ Bomb Flower Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 89, y: 131, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 47,
                        LongDescription: "In the invisible maze, navigate to the south room. The pots are along the back walls, in the corners."
                    }
                }
            },
            spikeWallRoom: {
                DisplayGroup: { groupName: "Invisible Wall Maze Rooms", imageName: "Boss Key" },
                Exits: {
                    afterBurningSpikes: {
                        NeedsAny: [Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "Pot in Spike Wall Room": {
                        SpoilerLogName: "Shadow Temple MQ Spike Walls Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 89, y: 51, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "Navigate to the room to your right (the north one). The pot is in front of you."
                    }
                }
            },
            afterBurningSpikes: {
                DisplayGroup: { groupName: "Invisible Wall Maze Rooms", imageName: "Boss Key" },
                Exits: {},
                ItemLocations: {
                    "Left Chest in Wooden Spike Room": {
                        SpoilerLogName: "Shadow Temple MQ Spike Walls Left Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 70, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the left."
                    },
                    "Right Chest in Wooden Spike Room": {
                        SpoilerLogName: "Shadow Temple MQ Boss Key Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 108, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the right."
                    }
                }
            },
            bossRoomDoor: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Shadow Medallion" },
                Exits: {
                    acrossChasm: {
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    bossRoom: {
                        NeedsAny: [KeySets.SHADOW_BK, Tricks.shadowBKSkip.canDo]
                    }
                },
                ItemLocations: {
                    "Skullula Before Boss": {
                        SpoilerLogName: "Shadow Temple MQ GS Near Boss",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 106, y: 193, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 48,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Enter the door on the other side. The skulltula is on the back wall. You'll need to navigate around the room's invisible floors to get to it."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Shadow Medallion" },
                Exits: {
                    bossRoomDoor: {
                        Needs: [() => EntranceData.canExitFromBossEntrance("Shadow Temple")]
                    },
                    "Boss": {
                        OwExit: OwExits["Shadow Temple"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Spirit Temple": {
        Abbreviation: "SPRT",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F4", "F3", "F2", "F1"],
        StartingFloorIndex: 3,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby", imageName: "Requiem of Spirit" },
                Exits: {
                    bottomRightLobbyChest: {
                        // This check is always false for vanilla rupees - important because
                        // we need to get to the side room to actually get this item
                        Needs: [SilverRupeeSets.MQ_SPIRIT_SILVER_RUPEES_LOBBY]
                    },
                    childSide: {
                        Age: Age.CHILD,
                    },
                    silverBlockMaze: {
                        Age: Age.ADULT,
                        Needs: [Items.BOMBCHU, UpgradedItems.LONGSHOT],
                        NeedsAny: [UpgradedItems.SILVER_GAUNTLETS, Tricks.weirdShot.canDoWithProjectiles]
                    },
                    roomRightOfLobby: {
                        ChildNeeds: [Tricks.mqSpiritChildGeyserSkip.canDo],
                        AdultNeeds: [Tricks.mqSpiritAdultGeyserSkip.canDo]
                    },
                    Exit: {
                        OwExit: OwExits["Spirit Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    "4 Pots in Lobby": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Lobby Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 192, y: 264, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "These pots are to your left and right against the walls as you first enter the temple."
                    },
                    "Lobby Silver Rupee in Left Rock": {
                        SpoilerLogName: "Spirit Temple MQ Lobby and Lower Adult Silver Rupee Left Boulder",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 179, y: 240, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1.1,
                        LongDescription: "This rupee is under the left rock as you enter the temple.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
                    },
                    "Lobby Silver Rupee in Right Rock": {
                        SpoilerLogName: "Spirit Temple MQ Lobby and Lower Adult Silver Rupee Right Boulder",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 206, y: 240, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1.2,
                        LongDescription: "This rupee is under the right rock as you enter the temple.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
                    },
                    "Bottom Left Chest in Lobby": {
                        SpoilerLogName: "Spirit Temple MQ Entrance Front Left Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 215, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This chest is there when you first enter the temple."
                    },
                    "Top Left Chest in Lobby": {
                        SpoilerLogName: "Spirit Temple MQ Entrance Back Left Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "After you first enter the temple, go up the stairs. Destroy the yellow rock to your right and shoot the eye switch to spawn the chest.",
                        NeedsAny: [
                            [ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.PROJECTILES],
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    "Top Right Chest in Lobby": {
                        SpoilerLogName: "Spirit Temple MQ Entrance Back Right Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 203, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "After you first enter the temple, go up the stairs and turn around. There's a crystal switch at the top of one of the pillars that you need to activate to spawn the chest.<br/><br/>The easiest way to hit with the boomerang is to face the pillar directly, and take small steps backwards. Aim it all the way up and try until it works.",
                        NeedsAny: [
                            ItemSets.PROJECTILES,
                            Items.HOOKSHOT,
                            Items.BOOMERANG, 
                            Items.BOMBCHU
                        ]
                    },

                    // Locked Doors
                    "Locked Door After Second Crawl Space": {
                        DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterSecondCrawlSpace", "roomWithSunOnFloor"],
                        MapInfo: { x: 87, y: 100, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 53,
                        LongDescription: "This is the door after the second crawlspace on the child side.",
                        StartingDoorRequirement: (age) => age === Age.CHILD,
                        NextDoors: { "Locked Door in Sun on Floor Room": () => true }
                    },
                    "Locked Door in Sun on Floor Room": {
                        DisplayGroup: { groupName: "Sun on Floor Room", imageName: "Bombchu" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom", "roomWithSunOnFloor"],
                        MapInfo: { x: 67, y: 174, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 27.1,
                        LongDescription: "This is the door leading to/from the room with the sun on the floor room.",
                        StartingDoorRequirement: (age) => age === Age.ADULT || Tricks.mqSpiritChildGeyserSkip.enabled,
                        NextDoors: { 
                            "Locked Door After Second Crawl Space": () => true,
                            "Locked Door to Silver Gaunts Knuckle": () => true
                        }
                    },
                    "Locked Door to Silver Gaunts Knuckle": {
                        DisplayGroup: { groupName: "Fire Bubble & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fireBubbleRoom"],
                        MapInfo: { x: 32, y: 198, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 25,
                        LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
                        StartingDoorRequirement: (age) => age === Age.ADULT || Tricks.mqSpiritChildGeyserSkip.enabled,
                        NextDoors: { "Locked Door in Beamos Room": () => Tricks.spiritSuperslideToMirrorShield.enabled }
                    },
                    "Locked Door in Statue Room": {
                        DisplayGroup: { groupName: "Statue Room", imageName: "Compass" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["adultStatueRoomSide"],
                        MapInfo: { x: 256, y: 217, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                        Order: 38,
                        LongDescription: "This is the locked door on the upper east part of the statue room.",
                        StartingDoorRequirement: (age) => age === Age.ADULT,
                        NextDoors: {
                            "Locked Door in Beamos Room": () => true,
                            "Locked Door to Silver Gaunts Knuckle": () => true // Longshot from mirror shield - no tricks here
                        }
                    },
                    "Locked Door in Beamos Room": {
                        DisplayGroup: { groupName: "Beamos/Lizalfos/Mirror Shield Path", imageName: "Mirror Shield" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["beamosRoom"],
                        MapInfo: { x: 223, y: 105, floor: "F3" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                        Order: 43,
                        LongDescription: "This is the locked door in the southwest corner of the room with all the Beamos.",
                        NextDoors: { "Locked Door After Moving Wall": () => true }
                    },
                    "Locked Door Right of Lobby": {
                        DisplayGroup: { groupName: "Rooms Beyond Lobby Water", imageName: "Ocarina" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomRightOfLobby"],
                        MapInfo: { x: 295, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                        Order: 34,
                        LongDescription: "This is the locked door to the right of the lobby that you get to via the statue room.",
                        StartingDoorRequirement: (age) => age === Age.ADULT || Tricks.mqSpiritChildGeyserSkip.enabled
                    },
                    "Locked Door After Moving Wall": {
                        DisplayGroup: { groupName: "Moving Wall & Silver Knuckle Room", imageName: "Skulltula" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterMovingWallRoom"],
                        MapInfo: { x: 294, y: 144, floor: "F4" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                        Order: 46,
                        LongDescription: "This is the locked door by the triforce symbol located after the moving wall."
                    }
                }
            },
            bottomRightLobbyChest: { // This is here so we can get this from the right of lobby room AND the main room due to silver rupee shuffle
                DisplayGroup: { groupName: "Lobby", imageName: "Requiem of Spirit" },
                Exits: {},
                ItemLocations: {
                    "Bottom Right Chest in Lobby": {
                        SpoilerLogName: "Spirit Temple MQ Entrance Front Right Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 203, y: 215, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleSilverRupees && // Can't spawn as child by getting other items
                                (!Settings.RandomizerSettings.mqSpiritChildGeyserSkip || // Can't spawn as child by collecting the rupees
                                    !Settings.RandomizerSettings.equipSwap); 
                        },
                        Order: 37,
                        LongDescription: "This chest will just be here if you have the silver rupees with silver rupee shuffle on. Otherwise...<br/><br/>Go to the room to the right of the lobby. Collect all the silver rupees there as well to spawn the chest - a couple of them are in the lobby under some rocks. Use your hammer to hit the rusted switch to make the water go away. Be careful, though, as you can't come back!"
                    }
                }
            },
            childSide: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Tricks.weirdShot.enabled; },
                Exits: {
                    acrossChildGrateRoom: {
                        NeedsAny: [
                            [Items.BOMBCHU, ItemSets.PROJECTILES],
                            UpgradedItems.LONGSHOT, // Hookshot the gibdos
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo]
                    },
                    backOfChildBridgeRoom: {
                        NeedsAny: [
                            Items.HOOKSHOT, // Hookshot the torches
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo]
                    },
                    afterSecondCrawlSpace: {
                        Age: Age.CHILD,
                        Needs: [Items.BOMBCHU]
                    }
                },
                ItemLocations: {
                    "Pot in Child Main Room": {
                        SpoilerLogName: "Spirit Temple MQ Child Torch Slugs Room Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 122, y: 207, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "This is the pot in front of you when you go through the crawlspace."
                    },
                    "2 Hearts in Child Main Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Child Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 88, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "These are the hearts surrounded by fire in the room after you go through the crawlspace. You can either get them with the boomerang, shoot the eye switch, or run into the fire and then jumpslash into them.",
                        NeedsAny: [ItemSets.SWORDS, ItemSets.PROJECTILES, Items.BOOMERANG]
                    },
                    "Big Chest in Bridge Room": {
                        SpoilerLogName: "Spirit Temple MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 34, y: 139, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "In the child area, go through the left door to get to this chest. You can also do the loop from the right side.",
                        Needs: [ItemSets.SWORDS]
                    },
                    "Chest in Child Main Room": {
                        SpoilerLogName: "Spirit Temple MQ Child Hammer Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 199, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 52,
                        IsPostWalkCheck: true,
                        LongDescription: "As an adult, navigate through the sun on the floor room until you're in the room with the rusted switch (this is the room after the second crawl space). Hit the switch to spawn the chest. You must go back in time to claim it.<br/>You can also equip swap hammer as Child to get this.",
                        Needs: [Items.BOMBCHU],
                        NeedsAny: [
                            [ // Adult can spawn it
                                () => Items.MEGATON_HAMMER.playerHas,
                                () => MapAccessSets.MQ_SPIRIT_AFTER_SECOND_CRAWLSPACE(Age.ADULT),
                            ],
                            Items.MEGATON_HAMMER // current age can spawn it
                        ]
                    }
                }
            },
            acrossChildGrateRoom: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Tricks.weirdShot.enabled; },
                Exits: {
                    backOfChildBridgeRoom: {
                        Needs: [ItemSets.SWORDS]
                    }
                },
                ItemLocations: {
                    "2 Pots in Child Gibdos Area": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Child 3 Gibdo Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 151, y: 76, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. The pots are by the gibdos."
                    },
                    "4 Pots in Child Stalfos Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Child Stalfos Fight Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 86, y: 19, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. In the next room, kill the Stalfos - this will lower the fire so you can get the pots."
                    }
                }
            },
            backOfChildBridgeRoom: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Tricks.weirdShot.enabled; },
                Exits: {},
                ItemLocations: {
                    "Small Chest in Bridge Room": {
                        SpoilerLogName: "Spirit Temple MQ Map Room Enemy Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 34, y: 94, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. In the next room, kill the Stalfos and continue on. In this room, pull back the gravestone and hit the switch to lower the bridge. Now kill all the enemies to spawn the chest - you'll need a fire item (or bow a bow shot through a torch) to deal with the Anubis.",
                        NeedsAny: [ItemSets.FIRE_ITEMS, Items.FAIRY_BOW] // Shoot through a torch
                    }
                }
            },
            afterSecondCrawlSpace: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                Exits: {
                    roomWithSunOnFloor: {
                        Age: Age.CHILD,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    },
                    childSide: {
                        Age: Age.ADULT, // Child would already have access from the lobby
                        Needs: [Items.MEGATON_HAMMER, Tricks.weirdShot.canDoWithLongshot]
                    }
                },
                ItemLocations: {}
            },
            roomWithSunOnFloor: {
                DisplayGroup: { groupName: "Sun on Floor Room", imageName: "Bombchu" },
                Exits: {
                    afterSecondCrawlSpace: {
                        Age: Age.ADULT,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    },
                    statueRoom: {
                        Age: Age.CHILD,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Sun on Floor Room"
                    }
                },
                ItemLocations: {
                    "Pot in Room With Sun On Floor": {
                        SpoilerLogName: "Spirit Temple MQ Child Climb Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 88, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "In the room with the sun on the floor, the pot is located on the bottom. As adult, you must hit the switch on top first. As a child, it's at the start of the room (it's the locked door after the crawlspace)."
                    },
                    "Bottom Chest in Room With Sun On Floor": {
                        SpoilerLogName: "Spirit Temple MQ Child Climb North Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 142, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "In the room with the sun on the floor, kill all the enemies to spawn the chest. As child, this is the room after you go through the second crawlspace. As an adult, it's in the bottom southwest corner of the big statue room.",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    "Top Chest in Room With Sun On Floor": {
                        SpoilerLogName: "Spirit Temple MQ Child Climb South Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 53, y: 194, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "In the room with the sun on the floor, use an explosive to blow up the wall to light up the sun. This will spawn a chest that you will need to hookshot up to.",
                        Needs: [Items.HOOKSHOT, ItemSets.EXPLOSIVES]
                    }
                }
            },
            statueRoom: {
                DisplayGroup: { 
                    groupName: "Statue Room", 
                    imageName: "Compass",
                    description: "If navigating as Adult via the geyser room: the longshot can be used to clip past the grate if you aim just below it."
                },
                Exits: {
                    roomWithSunOnFloor: {
                        Age: Age.ADULT,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Sun on Floor Room"
                    },
                    silverBlockMaze: {
                        Age: Age.CHILD,
                        NeedsAny: [Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    },
                    fireBubbleRoom: {
                        ChildNeedsAny: [Songs.SONG_OF_TIME]
                    },
                    adultStatueRoomSide: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {
                    "Flying Pot on Statue Room Stairs": {
                        SpoilerLogName: "Spirit Temple MQ Central Chamber Flying Pot Stairs",
                        ItemGroup: ItemGroups.POT,
                        IsEmpty: true,
                        MapInfo: { x: 147, y: 189, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14.1,
                        LongDescription: "This pot is on the southwest staircase (the one either age can access)."
                    },
                    "Small Crate by Statue Room Stairs": {
                        SpoilerLogName: "Spirit Temple MQ Central Chamber Small Wooden Crate",
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 131, y: 158, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14.2,
                        LongDescription: "This small crate is next to the southwest staircase. Depending on your age, it may be on a Song of Time block."
                    },
                    "Left Pot in Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Central Chamber Floor Pot 2",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 116, y: 135, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "WALL MASTER WARNING:<br/>This pot is by the left side of the statue."
                    },
                    "Chest in Center of Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 148, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "WALL MASTER WARNING:<br/>Shoot the eye switch on the left side of the statue to spawn this chest.",
                        NeedsAny: [ItemSets.PROJECTILES, QPAItemSets.TALL_TORCH_QPA]
                    },
                    "2 Crates in Statue Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Central Chamber Crate {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 223, y: 117, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "WALL MASTER WARNING:<br/>These crates are on the right side of the statue against the back wall.",
                    },
                    "2 Right Pots in Statue Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Central Chamber Floor Pot {#}",
                            tokens: [1, 3]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        MapInfo: { x: 239, y: 135, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "WALL MASTER WARNING:<br/>These pots are on the right side of the statue by the flying pot that gives nothing.",
                    },
                    "3 Right Pots in Statue Room": {
                        SpoilerLogName: [
                            "Spirit Temple MQ Central Chamber Flying Pot Floor",
                            {
                                name: "Spirit Temple MQ Central Chamber Floor Pot {#}",
                                tokens: [1, 3]
                            }
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 239, y: 135, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "WALL MASTER WARNING:<br/>These pots are on the right side of the statue. One of them is a flying pot.",
                    },
                    "Upper Northeast Left Pot in Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Central Chamber Top Left Pot (Left)",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 101, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way up the western side. The pots are on the northeast platform, so either play the song of time to spawn the block, use hover boots, or megaflip to it.",
                        TricksToShow: [Tricks.spiritStatueRoomJumps],
                        NeedsAny: [
                            Songs.SONG_OF_TIME,
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            Tricks.spiritStatueRoomJumps.canDo
                        ]
                    },
                    "2 Upper Northeast Left Pots in Statue Room": {
                        SpoilerLogName: [
                            "Spirit Temple MQ Central Chamber Top Left Pot (Left)",
                            "Spirit Temple MQ Central Chamber Flying Pot Top Left"
                        ],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 101, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way up the western side. The pots are on the northeast platform, so either play the song of time to spawn the block, use hover boots, or megaflip to it. One of the pots will fly at you.",
                        TricksToShow: [Tricks.spiritStatueRoomJumps],
                        NeedsAny: [
                            Songs.SONG_OF_TIME,
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            Tricks.spiritStatueRoomJumps.canDo
                        ]
                    },
                    "Upper Northeast Right Pot in Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Central Chamber Top Left Pot (Right)",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 109, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way up the western side. The pots are on the northeast platform, so either play the song of time to spawn the block, use hover boots, megaflip, or use boomerang as described.<br/><br/>To use boomerang, first, jump to the statue hand (child requires a jumpslash). Now walk along the arm so you're somewhat near the wall. You should now be able to aim a bit to the left of the pot to get it.",
                        TricksToShow: [Tricks.spiritStatueRoomJumps],
                        NeedsAny: [
                            Songs.SONG_OF_TIME,
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            Tricks.boomerangTrickThrows.canDo,
                            Tricks.spiritStatueRoomJumps.canDo
                        ]
                    }
                }
            },
            silverBlockMaze: {
                DisplayGroup: { groupName: "Statue Room", imageName: "Compass" },
                Exits: {
                    statueRoom: {}
                },
                ItemLocations: {
                    "Chest in Silver Block Maze": {
                        SpoilerLogName: "Spirit Temple MQ Silver Block Hallway Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 174, y: 227, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Tricks.weirdShot.enabled; },
                        Order: 19,
                        LongDescription: "From the statue room, use a fire item on the southern eye switch to get to the maze room. Navigate to the first hole and shoot the eye switch on the lower left wall to spawn the chest.",
                        ChildNeeds: [Items.FAIRY_SLINGSHOT],
                        AdultNeeds: [Items.FAIRY_BOW, Tricks.weirdShot.canDo]
                    }
                }
            },
            fireBubbleRoom: {
                DisplayGroup: { groupName: "Fire Bubble & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                Exits: {
                    silverGauntsIronKnuckle: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door to Silver Gaunts Knuckle"
                    }
                },
                ItemLocations: {
                    "Left Pot in Fire Bubble Room": {
                        SpoilerLogName: "Spirit Temple MQ Sun Block Room Pot 1",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 60, y: 112, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand (Adult can just jump to it with box in hand). Go through the room and the hallway that unlocks.<br/><br/>The pot is on a ledge in the left part of the room."
                    },
                    "Right Pot in Fire Bubble Room": {
                        SpoilerLogName: "Spirit Temple MQ Sun Block Room Pot 2",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 31, y: 60, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand (Adult can just jump to it with box in hand). Go through the room and the hallway that unlocks.<br/><br/>The pot is on a ledge in the right part of the room."
                    },
                    "Chest in Fire Bubble Room": {
                        SpoilerLogName: "Spirit Temple MQ Sun Block Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 80, y: 63, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand (Adult can just jump to it with box in hand). Go through the room and the hallway that unlocks.<br/><br/>Navigate around the room and push the two sun blocks that are next to each other into the light. This will spawn the chest."
                    },
                    "Skulltula in Fire Bubble Room": {
                        SpoilerLogName: "Spirit Temple MQ GS Sun Block Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 68, y: 113, floor: "F3" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.boomerangTrickThrows.enabled; },
                        Order: 24.1,
                        LongDescription: "In the fire bubble room, you must push the first sun block you see onto the light. You'll need to hit the crystal switches to make the fire disappear. This spawns a white platform that you can hookshot up to so that you can reach the skulltula.",
                        NeedsAny: [Items.HOOKSHOT, Tricks.boomerangTrickThrows.canDo]
                    }
                }
            },
            silverGauntsIronKnuckle: {
                DisplayGroup: { groupName: "Fire Bubble & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                Exits: {
                    silverGauntsStatueHand: {}
                },
                ItemLocations: {
                    "Silver Gauntlets Chest": {
                        SpoilerLogName: "Spirit Temple Silver Gauntlets Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 103, y: 228, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 26,
                        LongDescription: "Simply navigate to the door from the fire bubble room. Kill the Iron Knuckle in the room after the hallway, and proceed outside to get the chest."
                    }
                }
            },
            silverGauntsStatueHand: {
                DisplayGroup: { groupName: "Fire Bubble & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                Exits: {
                    mirrorShieldKnuckle: {
                        Age: Age.ADULT,
                        Needs: [Tricks.spiritSuperslideToMirrorShield.canDo]
                    },
                    statueHands: {},
                    silverGauntsIronKnuckle: {}
                },
                ItemLocations: {}
            },
            adultStatueRoomSide: {
                DisplayGroup: { groupName: "Statue Room", imageName: "Compass" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    roomRightOfLobby: {
                        Age: Age.ADULT,
                        Needs: [Equipment.MIRROR_SHIELD], // To spawn all floormasters
                        NeedsAny: [ // To unbar the door from the statue room
                            Items.FIRE_ARROW, 
                            QPAItemSets.LEDGE_QPA, // Get ISG, hookshot the right side of each torch
                            Tricks.mqSpiritStatueTorchesWithDins.canDo
                        ]
                    },
                    beamosRoom: {
                        LockedDoor: "Locked Door in Statue Room",
                        Map: "Spirit Temple"
                    },
                    statueRoom: {}
                },
                ItemLocations: {
                    "Invisible Chest in Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Statue Room Invisible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 251, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        Order: 28,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way to the southeast corner using the hookshot. In the northeast part of the room, there's an invisible chest. Hookshot or hover boots to it.",
                        TricksToShow: [Tricks.spiritStatueRoomJumps],
                        NeedsAny: [
                            Items.HOOKSHOT,
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            Tricks.spiritStatueRoomJumps.canDo
                        ]
                    },
                    "Chest in Boxes in Statue Room": {
                        SpoilerLogName: "Spirit Temple MQ Statue Room Lullaby Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 225, y: 115, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 29,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way to the southeast corner using the hookshot. Now get to the hand with the triforce and play Zelda's Lullaby. This will spawn the chest to the right of the statue, under a box.",
                        Needs: [Songs.ZELDAS_LULLABY],
                        ChildNeedsAny: [ItemSets.SWORDS, Tricks.megaFlip.canDo]
                    },
                    "Open Grate to Room Right of Lobby": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 310, y: 135, floor: "F2" },
                        MapImageName: "Mirror Shield",
                        Age: Age.ADULT,
                        RequiredToAppear: function() { return Tricks.mqSpiritChildGeyserSkip.enabled; },
                        Needs: [Equipment.MIRROR_SHIELD],
                        Order: 29.1,
                        LongDescription: "WALL MASTER WARNING:<br/>Go through the lower door to the southeast in the statue room. Kill all enemies in the room, including the floormasters that spawn when shining the light on the suns. This will open the grate.",
                    }
                }
            },
            roomRightOfLobby: {
                DisplayGroup: { 
                    groupName: "Rooms Beyond Lobby Water", 
                    imageName: "Ocarina",
                    description: "At the statue room, light all 3 torches with fire arrows. Use your hookshot to get to the door that unlocks. In the next room, use your mirror shield on all 3 suns and kill the enemies (including the wall masters). Navigate through the hallway to get to this area.",
                    tricksToShow: [
                        Tricks.mqSpiritChildGeyserSkip,
                        Tricks.mqSpiritAdultGeyserSkip,
                        Tricks.mqSpiritStatueTorchesWithDins
                    ]
                },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    adultStatueRoomSide: {
                        ChildNeeds: [ItemLocationSets.MQ_SPIRIT_OPENED_GRATE_TO_RIGHT_OF_LOBBY],
                        AdultNeedsAny: [
                            ItemLocationSets.MQ_SPIRIT_OPENED_GRATE_TO_RIGHT_OF_LOBBY,
                            UpgradedItems.LONGSHOT // Longshot JUST below the grate to clip through
                        ]
                    },
                    boulderRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door Right of Lobby"
                    },
                    bottomRightLobbyChest: {
                        Age: Age.EITHER,
                        // Silver rupees NOT being shuffled gets the lobby chest from this side
                        // by grabbing the last rupee by clearing the water with the hammer switch
                        Needs: [Items.MEGATON_HAMMER, SettingSets.VANILLA_SILVER_RUPEES]
                    }
                },
                ItemLocations: {
                    "2 Pots Below Quad Wallmaster Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Below 4 Wallmasters Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 278, y: 129, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "WALL MASTER WARNING:<br/>At the statue room, light all 3 torches with fire arrows. Use your hookshot to get to the door that unlocks. In the next room, use your mirror shield on all 3 suns and kill the enemies (including the wall masters). The pots are down the path that opens up."
                    },
                    "Right of Lobby Silver Rupee by Doors": {
                        SpoilerLogName: "Spirit Temple MQ Lobby and Lower Adult Silver Rupee Near Door",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 266, y: 175, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 31.1,
                        LongDescription: "This rupee is in the room to the right of the lobby, in the corner by the doors (see Bottom Right Chest in Lobby for details)."
                    },
                    "Skulltula in Sandy Room": {
                        SpoilerLogName: "Spirit Temple MQ GS Leever Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 235, y: 127, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 32,
                        LongDescription: "From the room to the right of the lobby, go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. The skulltula is on the ceiling.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Chest in Sandy Room": {
                        SpoilerLogName: "Spirit Temple MQ Leever Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 226, y: 99, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "From the room to the right of the lobby, go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. Jump down and kill all the leevers to spawn the chest. Longshot to it from the top to get it.",
                        NeedsAny: [UpgradedItems.LONGSHOT, Tricks.hammerHoverBootsSuperslide.canDo]
                    },
                    "Right of Lobby Silver Rupee by Stairs": {
                        SpoilerLogName: "Spirit Temple MQ Lobby and Lower Adult Silver Rupee Behind Water Jet",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 266, y: 207, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 36.1,
                        LongDescription: "This rupee is in the room to the right of the lobby, at the base of the stairs."
                    },
                    "Lobby Silver Rupee in Water": {
                        SpoilerLogName: "Spirit Temple MQ Lobby and Lower Adult Silver Rupee Water Jet",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 246, y: 211, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { !Tricks.equipSwap.enabled; },
                        Order: 36.2,
                        LongDescription: "This rupee is in the water diving the lobby and the room next to it. First, get to the room to the right of the lobby (see Bottom Right Chest in Lobby for info). Now, use your hammer and smash the rock and hit the switch underneath. This will lower the water and allow you to get the rupee.<br/><br/>Alternatively, if you have Longshot and have spawns the bottom right chest in lobby, you can line the rupee up between you and the chest and longshot to it to claim the rupee.<br/><br/>WARNING: If you stay at in the lobby side, you will be trapped there when the water comes back!",
                        NeedsAny: [
                            Items.MEGATON_HAMMER,
                            [UpgradedItems.LONGSHOT, SilverRupeeSets.MQ_SPIRIT_SILVER_RUPEES_LOBBY]
                        ]
                    }
                }
            },
            boulderRoom: {
                DisplayGroup: { groupName: "Rooms Beyond Lobby Water", imageName: "Ocarina" },
                UseAdultAge: function() { 
                    return !Tricks.mqSpiritChildGeyserSkip.enabled ||
                        !Tricks.equipSwap.enabled; 
                },
                Exits: {},
                ItemLocations: {
                    "Skulltula After Boulder Room": {
                        SpoilerLogName: "Spirit Temple MQ GS Symphony Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 328, y: 77, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 35,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the skulltula is inside on a wall.",
                        Needs: [Items.MEGATON_HAMMER, Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
                    },
                    "Chest After Boulder Room": {
                        SpoilerLogName: "Spirit Temple MQ Symphony Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 319, y: 61, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 36,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the chest is in this room.",
                        Needs: [Items.MEGATON_HAMMER, Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
                    }
                }
            },
            statueHands: {
                DisplayGroup: { groupName: "Fire Bubble & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                Exits: {
                    "Desert Colossus": {
                        OwExit: OwExits["Spirit Temple"]["Desert Colossus"]
                    },
                    "Desert Colossus Archway": {
                        OwExit: OwExits["Spirit Temple"]["Desert Colossus Archway"]
                    }
                },
                ItemLocations: {}
            },
            beamosRoom: {
                DisplayGroup: { 
                    groupName: "Beamos/Lizalfos/Mirror Shield Path", 
                    imageName: "Mirror Shield",
                    description: "BEAMOS ROOM: is the upper locked door in the Adult side of the statue room.\x0A\x0ALIZALFOS ROOM: In the beamos room, the puzzle is to play the Song of Time to move the blocks so that the little box falls down onto one of the blocks. Play it by the left side of the room, then by the hole twice. You then use that box to hold the switch down.",
                    tricksToShow: [Tricks.spiritSuperslideToMirrorShield]
                },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    lizalfosAndSunRoom: {
                        Needs: [Songs.SONG_OF_TIME]
                    },
                    movingWallRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Beamos Room"
                    }
                },
                ItemLocations: {
                    "Small Crate in Beamos Room": {
                        SpoilerLogName: "Spirit Temple MQ Beamos Room Small Wooden Crate",
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 255, y: 105, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 38.1,
                        LongDescription: "From the statue room, hookshot to the torch to get to the southeast side. Use a key to go in the top door.<br/><br/>Play the Song of Time by the block in the left side of the room. Now play it twice by the other blocks. You can now get to the small crate.",
                        Needs: [Songs.SONG_OF_TIME]
                    },
                    "Chest in Beamos Room": {
                        SpoilerLogName: "Spirit Temple MQ Beamos Room Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 284, y: 77, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 39,
                        LongDescription: "From the statue room, hookshot to the torch to get to the southeast side. Use a key to go in the top door. Kill the beamos to spawn the chest.",
                        Needs: [ItemSets.EXPLOSIVES]
                    }
                }
            },
            lizalfosAndSunRoom: {
                DisplayGroup: { groupName: "Beamos/Lizalfos/Mirror Shield Path", imageName: "Mirror Shield" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    mirrorShieldKnuckle: {
                        NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
                    },
                    beamosRoom: {}
                },
                ItemLocations: {
                    "Chest in Room With Lizalfos and Sun": {
                        SpoilerLogName: "Spirit Temple MQ Chest Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 328, y: 105, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 40,
                        LongDescription: "The chest is in plain sight in the room."
                    },
                    "2 Wonderitems in Room With Lizalfos and Sun": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Chest Switch {#} Wonderitem",
                            tokens: ["Sword", "Hammer"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "Sword and Hammer Wonderitem",
                        MapInfo: { x: 329, y: 106, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 40.1,
                        LongDescription: "Swing your sword and hammer while next to the chest to spawn two wonderitems (one for each item swung)."
                    },
                    "Boss Key Chest": {
                        SpoilerLogName: "Spirit Temple MQ Boss Key Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 321, y: 40, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "In the room with the lizalfos and sun, you can climb the Song of Time block and shine the light on the sun. The chest is in the room that opens.",
                        Needs: [Equipment.MIRROR_SHIELD]
                    }
                }
            },
            mirrorShieldKnuckle: {
                DisplayGroup: { groupName: "Beamos/Lizalfos/Mirror Shield Path", imageName: "Mirror Shield" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    lizalfosAndSunRoom: {},
                    silverGauntsStatueHand: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    statueHands: {}
                },
                ItemLocations: {
                    "Mirror Shield Chest": {
                        SpoilerLogName: "Spirit Temple Mirror Shield Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 247, y: 226, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 42,
                        LongDescription: "From the room with the lizalfos and the sun, slash the chest that Navi is going crazy over to open the door. Kill the Floormaster in the next room, and the Iron Knuckle in the room after. The chest will spawn on the hand as you walk in."
                    }
                }
            },
            movingWallRoom: {
                DisplayGroup: { groupName: "Moving Wall & Silver Knuckle Room", imageName: "Skulltula" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    afterMovingWallRoom: {
                        Needs: [SilverRupeeSets.MQ_SPIRIT_SILVER_RUPEES_MOVING_WALL_ROOM]
                    }
                },
                ItemLocations: {
                    "2 Pots in Moving Wall Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Shifting Wall Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 168, y: 161, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 44,
                        LongDescription: "These pots are at the bottom of the moving wall room - which is through the locked door after the hallway via the upper southeast statue room."
                    },
                    "5 Moving Wall Room Silver Rupees": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Adult Climb Silver Rupee {#}",
                            count: 5
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        DefaultEntranceGroupName: "5 Silver Rupees",
                        MapInfo: { x: 167, y: 139, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 44.1,
                        LongDescription: "These rupees are obtained by climbing the moving wall. You may also find it easier to climb up the wall and drop down onto them."
                    }
                }
            },
            afterMovingWallRoom: {
                DisplayGroup: { groupName: "Moving Wall & Silver Knuckle Room", imageName: "Skulltula" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    skulltulaAndKnuckleRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Moving Wall"
                    },
                    giantMirrorRoom: {
                        Needs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {
                    "2 Pots After Moving Wall Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ After Shifting Wall Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 293, y: 153, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 45,
                        LongDescription: "These pots by the floor triforce after the moving wall room."
                    }
                }
            },
            skulltulaAndKnuckleRoom: {
                DisplayGroup: { groupName: "Moving Wall & Silver Knuckle Room", imageName: "Skulltula" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {},
                ItemLocations: {
                    "West Skulltula in Iron Knuckle Room": {
                        SpoilerLogName: "Spirit Temple MQ GS Nine Thrones Room West",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 265, y: 80, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 47,
                        LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
                    },
                    "North Skulltula in Iron Knuckle Room": {
                        SpoilerLogName: "Spirit Temple MQ GS Nine Thrones Room North",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 293, y: 26, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 48,
                        LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
                    }
                }
            },
            giantMirrorRoom: {
                DisplayGroup: { groupName: "Mirror Room & Boss Area", imageName: "Spirit Medallion" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    mirrorMaze: {
                        Needs: [Items.MEGATON_HAMMER]
                    }
                },
                ItemLocations: {
                    "4 Pots in Giant Mirror Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Big Mirror Pot {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 174, y: 156, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 49,
                        LongDescription: "After the moving wall room, play Zelda's Lullaby to unlock the door. the pots are in the corners on the top part of the room."
                    },
                    "4 Crates in Giant Mirror Room": {
                        SpoilerLogName: [{
                            name: "Spirit Temple MQ Big Mirror Crate {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 174, y: 119, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 50,
                        LongDescription: "After the moving wall room, play Zelda's Lullaby to unlock the door. the crates are in the corners on the bottom part of the room."
                    }
                }
            },
            mirrorMaze: {
                DisplayGroup: { groupName: "Mirror Room & Boss Area", imageName: "Spirit Medallion" },
                UseAdultAge: function() { return !Tricks.mqSpiritChildGeyserSkip.enabled; },
                Exits: {
                    bossRoom: {
                        Needs: [Items.HOOKSHOT, Equipment.MIRROR_SHIELD, KeySets.SPIRIT_BK]
                    }
                },
                ItemLocations: {
                    "Invisible Chest in Mirror Maze": {
                        SpoilerLogName: "Spirit Temple MQ Mirror Puzzle Invisible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 216, floor: "F4" },
                        Age: Age.EITHER,
                        Order: 51,
                        LongDescription: "From the beamos room, take the southeast door to get to the wall room. Grab all the silver rupees to unlock the door at the top. Play Zelda's Lullaby at the trifoce to unlock the next room. Hammer the rusted switch in the northwest corner of the next room to get to the mirror maze.<br/><br/>Navigate to the very end of the maze. There's an invisible chest by the bars."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Mirror Room & Boss Area", imageName: "Spirit Medallion" },
                Exits: {
                    "Boss": {
                        OwExit: OwExits["Spirit Temple"]["Boss"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Ice Cavern": {
        Abbreviation: "ICE",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Up to Center Room", imageName: "Blue Fire" },
                Exits: {
                    afterFirstRoom: {},
                    Exit: {
                        OwExit: OwExits["Ice Cavern"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Pot by Entrance": {
                        SpoilerLogName: "Ice Cavern MQ First Hall Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 192, y: 257 },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "This pot is on the left wall close to the entrance. Note that you may want to use it to hit the switch in the next room if you have no other way to do so!"
                    }
                }
            },
            afterFirstRoom: {
                DisplayGroup: { groupName: "Up to Center Room", imageName: "Blue Fire" },
                Exits: {
                    blueFireRoom: {
                        Needs: [ItemSets.FREEZARD_KILL_ITEMS],
                        NeedsAny: [ItemSets.SWORDS, ItemSets.EXPLOSIVES] // Break stalagmites
                    },
                    northRoom: {
                        ChildNeeds: [Tricks.iceChildNorthRoom.canDo],
                        NeedsAny: [GameStateSets.HAS_BOTTLE, ItemSets.BLUE_FIRE_ITEMS]
                    },
                    bigRoom: {
                        NeedsAny: [GameStateSets.HAS_BOTTLE, ItemSets.BLUE_FIRE_ITEMS]
                    }
                },
                ItemLocations: {
                    "2 Pots After Switch": {
                        SpoilerLogName: [{
                            name: "Ice Cavern MQ Tektite Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 182, y: 179 },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "These pots are in the transition doorway after you hit the switch in the first room."
                    },
                    "2 Right Pots in Center Room": {
                        SpoilerLogName: [{
                            name: "Ice Cavern MQ Center Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 204, y: 121 },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "In the room after the room with the switch, the pots will be on your right."
                    },
                    "2 Back Pots in Center Room": {
                        SpoilerLogName: [{
                            name: "Ice Cavern MQ Center Room Pot {#}",
                            count: { min: 3, max: 4 }
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 184, y: 95 },
                        Age: Age.EITHER,
                        Order: 3.1,
                        LongDescription: "In the room after the room with the switch, the pots will be along the back wall."
                    }
                }
            },
            blueFireRoom: {
                DisplayGroup: { groupName: "Red Ice Chest Room", imageName: "Wolfos Grotto" },
                Exits: {},
                ItemLocations: {
                    "Chest in Red Ice": {
                        SpoilerLogName: "Ice Cavern MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 248, y: 147 },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "In the room with the tektites, hit the crystal switch to the right of the door. You can take a pot to the left of the entrance there to do so if you don't have a projectile. You may need to wait on the right hand wall for the boulder to pass.<br/><br/>Navigate through the cavern until you get to the first room with blue fire. Hit the switch to spawn the chest under the red ice. Melt it with blue fire to gain access to it.",
                        NeedsAny: [GameStateSets.HAS_BOTTLE, ItemSets.BLUE_FIRE_ITEMS]
                    }
                }
            },
            northRoom: {
                DisplayGroup: { 
                    groupName: "Platforming Room", 
                    imageName: "Compass",
                    description: "The room up the ledges, and beyond the red ice in the circular room.",
                    tricksToShow: [Tricks.iceChildNorthRoom]
                },
                UseAdultAge: function() { return !Tricks.iceChildNorthRoom.enabled; },
                Exits: {},
                ItemLocations: {
                    "2 Pots in North Room": {
                        SpoilerLogName: [{
                            name: "Ice Cavern MQ Compass Room Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 213, y: 13 },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>In the next room, the pots are along the wall, somewhat separated.",
                    },
                    "Heart Piece in North Room": {
                        SpoilerLogName: "Ice Cavern MQ Freestanding PoH",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 228, y: 22 },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>On the floor, there's a switch embedded in the ice. Use an explosive to hit it. This will make the block around the heart piece item disappear.",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    "Skulltula in North Room": {
                        SpoilerLogName: "Ice Cavern MQ GS Red Ice",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 192, y: 45 },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>Play the song of time on the top near the pillar with the skulltula to spawn a block. Climb it, and play the song again. Use blue fire to melt the ice to gain access to the skulltula.",
                        TricksToShow: [Tricks.mqIceNorthSkullWithoutSoT],
                        NeedsAny: [
                            Items.ICE_ARROW,
                            Tricks.mqIceNorthSkullWithoutSoT.canDo,
                            [
                                GameStateSets.HAS_BOTTLE,
                                Songs.SONG_OF_TIME,
                                [
                                    SetType.OR,
                                        Items.OCARINA, // No need to use OI
                                        (age) => Data.canOIAndBlueFireWithoutRefilling(age) // Has a second bottle for the fire AND the OI item (or ice arrows)
                                ]
                            ]
                        ]
                    },
                    "Chest in North Room": {
                        SpoilerLogName: "Ice Cavern MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 188, y: 20 },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. In the room at the end of the hallway, you'll find the chest on one of the ledges after some parkour."
                    }
                }
            },
            bigRoom: {
                DisplayGroup: { groupName: "Big Blue Room", imageName: "Ice Arrow" },
                Exits: {
                    afterBigRoom: {}
                },
                ItemLocations: {
                    "Skulltula Under Stairs in Big Room": {
                        SpoilerLogName: "Ice Cavern MQ GS Ice Block",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 115, y: 122 },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Across the room from the first room with blue fire, melt the ice wall. Navigate through the hallway to gain access to this room. Turn around once inside, and hit the switch posing as a stalagtite. This will make some stairs vanish near the exit of the room so you can grab the token. Be sure to hit the switch again so you can leave.",
                        Needs: [ItemSets.DISTANT_SWITCH_ITEMS]
                    },
                    "Skulltula on Ledge in Big Room": {
                        SpoilerLogName: "Ice Cavern MQ GS Scarecrow",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 127, y: 66 },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "This skulltula is on the ledge to your right in the big room. Play the scarecrow's song and hook it, a ground jump to get up there, or use hover boots to get to the taller pillar and longshot it.",
                        TricksToShow: [Tricks.mqIceJumpToSkull],
                        NeedsAny: [
                            [Equipment.HOVER_BOOTS, UpgradedItems.LONGSHOT],
                            Tricks.mqIceJumpToSkull.canDo,
                            Tricks.groundJump.canDoWithBomb,
                            [
                                GameStateSets.CAN_HOOK_SCARECROW,
                                [
                                    SetType.OR,
                                        Items.OCARINA, // No need to use OI
                                        (age) => Data.canOIAndBlueFireWithoutRefilling(age) // Has a second bottle for the fire AND the OI item (or ice arrows)
                                ]
                            ]
                        ]
                    }
                }
            },
            afterBigRoom: {
                DisplayGroup: { groupName: "Final Hallway & Boss", imageName: "Iron Boots" },
                Exits: {},
                ItemLocations: {
                    "2 Pots Before Boss Room": {
                        SpoilerLogName: [{
                            name: "Ice Cavern MQ Near End Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 116, y: 162 },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "These pots are next to the boss door.",
                    },
                    "Chest at End": {
                        SpoilerLogName: "Ice Cavern MQ Iron Boots Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 127, y: 182 },
                        Age: Age.ADULT,
                        Order: 12,
                        LongDescription: "Defeat the stalfos in this room to spawn the chest."
                    },
                    "Serenade of Water": {
                        SpoilerLogName: "Sheik in Ice Cavern",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 122, y: 177 },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "Obtained after opening the chest in this room."
                    }
                }
            }
        }
    },

    "Bottom of the Well": {
        Abbreviation: "WELL",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F1", "B1"],
        StartingFloorIndex: 0,
        UseChildAge: function() {
            // Can't get past crawlspace - it becomes child only
            if (!Tricks.weirdShot.enabled) {
                return true;
            }

            // Can always get here if dungeons are shuffled - so NOT child only
            if (Settings.RandomizerSettings.shuffleDungeonEntrances) {
                return false;
            }

            // These tricks are the ways into the well entrance if dungeons are not shuffled
            return !Tricks.botwAsAdultWithCucco.enabled &&
                !Tricks.botwAsAdultWihChus.enabled;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Main Area Loop", imageName: "Slingshot Wonderitem" },
                Exits: {
                    afterFirstCrawlSpace: {
                        AdultNeeds: [Tricks.weirdShot.canDoWithLongshot]
                    },
                    Exit: {
                        OwExit: OwExits["Bottom of the Well"]["Exit"]
                    }
                },
                ItemLocations: {
                    // Locked Doors
                    "Locked Door in West Main Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterFirstCrawlSpace"],
                        MapInfo: { x: 73, y: 137, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This is the door on the west side of the main room.",
                        StartingDoorRequirement: () => true
                    },
                    "Locked Door in Floor Master Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterFirstCrawlSpace"],
                        MapInfo: { x: 288, y: 123, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 6,
                        LongDescription: "WALL MASTER WARNING:<br/>This is the locked door you find after the room with the floormasters.",
                        Needs: [ItemSets.DISTANT_SWITCH_ITEMS],
                        StartingDoorRequirement: () => true
                    }
                }
            },
            afterFirstCrawlSpace: {
                DisplayGroup: { groupName: "Main Area Loop", imageName: "Slingshot Wonderitem" },
                Exits: {
                    centerRoom: {
                        NeedsAny: [
                            ItemSets.BLAST_OR_SMASH_ITEMS, // Bomb the rock, then do an angled right sidehop
                            Songs.ZELDAS_LULLABY // Open the barred walls
                        ]
                    },
                    drainedWater: {
                        // Adult can weridshot into the deadhand area (so the crawlspace doesn't matter), which is all drainedWater is
                        NeedsAny: [
                            ItemSets.DISTANT_SWITCH_ITEMS, // Hit the switch
                            ItemSets.SWORDS, // Any sword item can hit it with a well-timed jumpslash
                            Songs.ZELDAS_LULLABY, // Open the barred walls, then throw a pot at the switch
                        ]
                    },
                    coffinRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door in West Main Room"
                    }
                },
                ItemLocations: {
                    "2 Hearts in Front Bombable Hole": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ Bombable Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 183, y: 194, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "In the main area, bomb the rubble to the left to get to these hearts.",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    "Pot Behind Gate": {
                        SpoilerLogName: "Bottom of the Well MQ Perimeter Behind Gate Pot",
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 231, y: 195, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1.1,
                        LongDescription: "In the left alcove at the front of the main room, bomb the rock in the wall. Shoot it with your slingshot or bow to open a gate in the southeast corner of the giant room where the pot is.",
                        NeedsAny: [
                            [ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.PROJECTILES], 
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    "4 Wonderitems in Northwest Picture": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ Main Area Left Slingshot Wonderitem {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 High QPAable Slingshot Wonderitems",
                        MapInfo: { x: 129, y: 45, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
                        Age: Age.EITHER,
                        Order: 5.1,
                        LongDescription: "Shoot the lens of truth picture in the northwest corner of the main room to spawn wonderitems (do it 4 times to get all 4)."
                    },
                    "4 Wonderitems in Northeast Picture": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ Main Area Right Slingshot Wonderitem {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Slingshot Wonderitems",
                        MapInfo: { x: 261, y: 45, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 5.2,
                        LongDescription: "Shoot the lens of truth picture in the northeast corner of the main room to spawn wonderitems (do it 4 times to get all 4)."
                    }
                }
            },
            coffinRoom: {
                DisplayGroup: { groupName: "Coffin Room", imageName: "2 Hearts" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Coffin Room": {
                        SpoilerLogName: "Bottom of the Well MQ GS Coffin Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 18, y: 128, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then navigate to the back right section of the room. The skulltula is hiding in the corner behind a pillar."
                    },
                    "Heart in Front Right Coffin": {
                        SpoilerLogName: "Bottom of the Well MQ Coffin Recovery Heart 1",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 56, y: 131, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then light the torch of the front right coffin (or use the boomerang). The heart is inside.",
                        NeedsAny: [
                            ItemSets.FIRE_ITEMS, 
                            Items.DEKU_STICK, 
                            Items.FAIRY_BOW,
                            Tricks.boomerangThroughWalls.canDo,
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    "Heart in Middle Left Coffin": {
                        SpoilerLogName: "Bottom of the Well MQ Coffin Recovery Heart 2",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 43, y: 142, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then light the torch of the middle left coffin (or use the boomerang). The heart is inside.",
                        NeedsAny: [
                            ItemSets.FIRE_ITEMS, 
                            Items.DEKU_STICK, 
                            Items.FAIRY_BOW,
                            Tricks.boomerangThroughWalls.canDo,
                            QPAItemSets.LEDGE_QPA
                        ]
                    }
                }
            },
            centerRoom: {
                DisplayGroup: { groupName: "Central Area", imageName: "Dungeon Map" },
                Exits: {
                    eastCenterRoom: {}, // Can always use a pot to open this
                    westCenterRoom: {},
                    basement: {},
                    // Technically this door isn't here, but it's useless to open it if you can't get here so we require it
                    basementCenter: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door in Floor Master Room",
                        Age: Age.CHILD
                    }
                },
                ItemLocations: {
                    "Center Chest": {
                        SpoilerLogName: "Bottom of the Well MQ Map Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 194, y: 127, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "WALL MASTER WARNING:<br/>Navigate to the back of the main room and play Zelda's Lullaby at the triforce. This will open a bunch of gates. Proceed behind you to the center room with the chest.<br/><br/>Alternatively, you can bomb the rocks near the middle-west of the main room. Sidehop then jumpslash over the hole in the ground to get to the center area."
                    },
                    "3 Pots in Center Room Cell": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ Center Room Right Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 221, y: 172, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "WALL MASTER WARNING:<br/>Navigate to the back of the main room and play Zelda's Lullaby at the triforce. This will open a bunch of gates. Proceed behind you to the center room - the pots are on the right side of the room surrounded by cell walls.<br/><br/>Alternatively, you can bomb the rocks near the middle-west of the main room. Sidehop then jumpslash over the hole in the ground to get to the center area."
                    }
                }
            },
            eastCenterRoom: {
                DisplayGroup: { groupName: "Central East Locked Room", imageName: "3 Pots" },
                Exits: {},
                ItemLocations: {
                    "3 Pots in East Center Room": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ East Inner Room Pot {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 231, y: 83, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "WALL MASTER WARNING:<br/>From the center room, activate the switch in the southeast section to unbar a door (use a pot if needed). Enter it - the pots are marking the invisible path around the room."
                    },
                    "Freestanding Item in East Center Room": {
                        SpoilerLogName: "Bottom of the Well MQ East Inner Room Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 216, y: 80, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "WALL MASTER WARNING:<br/>From the center room, activate the switch in the southeast section to unbar a door (use a pot if needed). Enter it, and navigate counter-clockwise around the room to get to the item."
                    },
                    "4 Wonderitems in East Center Room": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ East Inner Room Slingshot Wonderitem {#}",
                            count: 4
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Child Cutscene QPAable Slingshot Wonderitems",
                        MapInfo: { x: 218, y: 74, floor: "F1" },
                        UseChildAge: function() { return !Tricks.equipSwap.enabled; },
                        Age: Age.EITHER,
                        Order: 11.1,
                        LongDescription: "Shoot the lens of truth picture in the east center room to spawn wonderitems (do it 4 times to get all 4). Cutscene QPA works as Child if you break the stick from the corner to the left of the picture."
                    }
                }
            },
            westCenterRoom: {
                DisplayGroup: { groupName: "Central West Locked Room", imageName: "Skulltula" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in West Center Room": {
                        SpoilerLogName: "Bottom of the Well MQ GS West Inner Room",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 159, y: 99, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "WALL MASTER WARNING:<br/>Bomb some rocks near the southwest corner of the main room and press the switch to unbar a door. Make your way to the center either by sidehopping and jumpslashing, or by going around through the already opened gates (opened via the crystal switch in the north part of the main area).<br/><br/>Enter the door that was just unbarred. The skulltula is under the gravestone. Be careful of invisible enemies."
                    }
                }
            },
            drainedWater: {
                DisplayGroup: { groupName: "Dead Hand Room", imageName: "Compass" },
                Exits: {},
                ItemLocations: {
                    "Dead Hand Chest": {
                        SpoilerLogName: "Bottom of the Well MQ Compass Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 317, y: 238, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Drain the water by hitting the switch in the back of the main room (use a projectile, a pot from the center, or jumpslash it with a sword/stick/hammer). Navigate back to the entrance and enter the crawl space leading to the Dead Hand room like normal. Kill him to spawn the chest.",
                        Needs: [ItemSets.SWORDS]
                    },
                    "Freestanding Item in Dead Hand Room": {
                        SpoilerLogName: "Bottom of the Well MQ Dead Hand Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 333, y: 229, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        NeedsAny: [ItemSets.EXPLOSIVES, Items.BOOMERANG],
                        LongDescription: "In the Dead Hand room, bomb the back left rubble to reveal the item. You can also stand on in the corner of the rubble and boomerang straight down to get it."
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Lens of Truth" },
                Exits: {},
                ItemLocations: {
                    "3 Hearts in Basement": {
                        SpoilerLogName: [{
                            name: "Bottom of the Well MQ Basement Recovery Heart {#}",
                            count: 3
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 295, y: 147, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "WALL MASTER WARNING:<br/>To get to the basement, you can fall down a hole in the center room (not the very center). Navigate to the northeastern path (the second from the right) to get to the hearts."
                    },
                    "Skulltula in Basement": {
                        SpoilerLogName: "Bottom of the Well MQ GS Basement",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 51, y: 43, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "WALL MASTER WARNING:<br/>To get to the basement, you can fall down a hole in the center room (not the very center). Navigate to the northwestern part of the basement to get to the skulltula. Watch out for invisible giant skulltulas on the way."
                    }
                }
            },
            basementCenter: {
                DisplayGroup: { groupName: "Basement", imageName: "Lens of Truth" },
                Exits: {},
                ItemLocations: {
                    "Chest in Basement": {
                        SpoilerLogName: "Bottom of the Well MQ Lens of Truth Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 295, y: 235, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 14,
                        LongDescription: "WALL MASTER WARNING:<br/>Crawl through the crawlspace in the back right corner of the main room. Hit the switch in the eye of the picture on the wall to open the door. Ignore the enemies and open the locked door. Bomb the rubble in the next room to reveal a switch. Navigate to the center and fall in the grate that opened.<br/><br/>Press the switch to spawn the chest. Navigate to the southeast part of the basement to get to the chest."
                    }
                }
            }
        }
    },

    "Training Grounds": {
        Abbreviation: "GTG",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        UseAdultAge: function() { 
            return !Settings.RandomizerSettings.shuffleDungeonEntrances && !Tricks.gfUnloadLowerAreaWithAntigrav.enabled;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby", imageName: "Gerudo Membership Card" },
                Exits: {
                    armosRoom: {
                        Needs: [ItemSets.PROJECTILES]
                    },
                    leftArea: {
                        NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    },
                    mazeStart: {},
                    iceArrowsRoom: {
                        Age: Age.CHILD,
                        Needs: [Tricks.gtgChildVineClips.canDo]
                    },
                    Exit: {
                        OwExit: OwExits["Training Grounds"]["Exit"]
                    }
                },
                ItemLocations: {
                    "2 Left Pots by Entrance": {
                        SpoilerLogName: [{
                            name: "Gerudo Training Ground MQ Lobby Left Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 146, y: 252 },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "The pots are to the left when you first enter."
                    },
                    "Left Chest by Entrance": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lobby Left Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 233 },
                        Age: Age.EITHER,
                        Order: 1.1,
                        LongDescription: "This chest is to the left when you first enter."
                    },
                    "Right Chest by Entrance": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lobby Right Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 233 },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This chest is to the right when you first enter."
                    },
                    "2 Right Pots by Entrance": {
                        SpoilerLogName: [{
                            name: "Gerudo Training Ground MQ Lobby Right Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 183, y: 252 },
                        Age: Age.EITHER,
                        Order: 2.1,
                        LongDescription: "The pots are to the right when you first enter."
                    }
                }
            },
            mazeStart: {
                DisplayGroup: { 
                    groupName: "Maze", 
                    imageName: "Ice Arrow",
                    description: "The door maze accessible by going straight ahead from the dungeon's entrance.",
                    tricksToShow: [Tricks.gtgChildVineClips]
                },
                Exits: {
                    backOfMaze: {
                        NeedsAny: [Tricks.gtgChildVineClips.canDo, Tricks.weirdShot.canDo]
                    },
                    mazeCenter: {
                        NeedsAny: [
                            () => ItemData.getKeyCount("Training Grounds") >= 3,
                            Tricks.gtgChildVineClips.canDo,
                            Tricks.weirdShot.canDo
                        ]
                    }
                },
                ItemLocations: {
                    "Left Maze Path After Door 1": {
                        SpoilerLogName: "Gerudo Training Ground MQ Hidden Ceiling Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 192 },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "From the main maze entrance, take the first left door. Climb the grate to your left up to the chest."
                    },
                    "Left Maze Path After Door 2": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Path First Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 130, y: 163 },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "This chest is after the second door in the left maze path."
                    },
                    "Left Maze Path After Door 4": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Path Second Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 136 },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "This chest is after the fourth door in the left maze path."
                    },
                    "Left Maze Path After Door 5": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Path Third Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 148, y: 137 },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "This chest is after the fifth door in the left maze path.",
                        NeedsAny: [
                            () => ItemData.getKeyCount("Training Grounds") >= 1,
                            Tricks.gtgChildVineClips.canDo,
                            Tricks.weirdShot.canDo
                        ]
                    }
                }
            },
            mazeCenter: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                UseAdultAge: function() { return !Tricks.gtgChildVineClips.enabled; },
                Exits: {},
                ItemLocations: {
                    "Crate in Maze Center": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Crate",
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 164, y: 160 },
                        Age: Age.EITHER,
                        Order: 6.1,
                        LongDescription: "This is the crate at the center of the maze."
                    },
                    "Spawn Ice Arrow Chest": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 164, y: 160 },
                        MapImageName: "Megaton Hammer",
                        Age: Age.EITHER,
                        Order: 6.2,
                        UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
                        Needs: [Items.MEGATON_HAMMER],
                        LongDescription: "At the center of the maze, break the crate and hit the switch with the Megaton Hammer to spawn the ice arrow chest."
                    }
                }
            },
            armosRoom: {
                DisplayGroup: { groupName: "Armos Room", imageName: "Bomb" },
                Exits: {
                    bigLavaRoomFront: {
                        ChildNeedsAny: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
                    }
                },
                ItemLocations: {
                    "Chest in Armos Room": {
                        SpoilerLogName: "Gerudo Training Ground MQ Dinolfos Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 257, y: 244 },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "Either get here after shooting the eye in the starting room, or going around form the big lava room. Kill all the enemies to spawn the chest.",
                        ChildNeedsAny: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
                    },
                    "Wonderitem in Armos Room": {
                        SpoilerLogName: "Gerudo Training Ground MQ Dinolfos Arrow Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 257, y: 221 },
                        Age: Age.ADULT,
                        Order: 17.1,
                        LongDescription: "Either get here after shooting the eye in the starting room, or going around form the big lava room. Shoot the symbol above the door leading to the big lava room to spawn this wonderitem.",
                        Needs: [Items.FAIRY_BOW]
                    }
                }
            },
            leftArea: {
                DisplayGroup: { groupName: "Sandy & Icicle Rooms", imageName: "Silver Rupee" },
                Exits: {
                    roomWithSilverBlock: {
                        Map: "Training Grounds",
                        Needs: [SilverRupeeSets.MQ_GTG_SILVER_RUPEES_SLOPES_ROOM] // Checks for hookshot/wall master glitch
                    }
                },
                ItemLocations: {
                    "Sandy Iron Knuckle Chest": {
                        SpoilerLogName: "Gerudo Training Ground MQ First Iron Knuckle Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 65, y: 225 },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "From the main entrance, light the torches and go through the door that unlocks. Kill the Iron Knuckle to spawn the chest."
                    },
                    "Icicle Silver Rupee on Ceiling": {
                        SpoilerLogName: "Gerudo Training Ground MQ Icicle Room Silver Rupee Ceiling",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 80, y: 194 },
                        Age: Age.ADULT,
                        Order: 7.1,
                        LongDescription: "After the sand room, look for the rupee to your right on the ceiling. You can get it with a well-angled hookshot to the ceiling target; get the rest of the distance with a jumpslash.",
                        TricksToShow: [Tricks.gtgSlopesRoomWallmasterToRupee],
                        NeedsAny: [Items.HOOKSHOT, Tricks.gtgSlopesRoomWallmasterToRupee.canDo]
                    },
                    "Icicle Silver Rupee in Back Left Area": {
                        SpoilerLogName: "Gerudo Training Ground MQ Icicle Room Silver Rupee Freezard",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 53, y: 198 },
                        Age: Age.EITHER,
                        Order: 7.2,
                        LongDescription: "This rupee is in the left area, guarded by a freezard. If you can't kill, run into it from behind to get the item."
                    },
                    "Icicle Silver Rupee by Ledge in Midair": {
                        SpoilerLogName: "Gerudo Training Ground MQ Icicle Room Silver Rupee Center",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 75, y: 148 },
                        Age: Age.EITHER,
                        Order: 7.3,
                        LongDescription: "WALL MASTER WARNING: This rupee is the one floating in mid-air from the entrance. Naivigate around the maze, and drop down to get it. If you don't have a hookshot, there's a route from the entrance if you take the second right."
                    },
                    "Icicle Silver Rupee Over Right Area Void": {
                        SpoilerLogName: "Gerudo Training Ground MQ Icicle Room Silver Rupee Above Void",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 94, y: 203 },
                        Age: Age.EITHER,
                        Order: 7.4,
                        LongDescription: "This rupee is over the void in the right side of the room. There's a fire-free path if you take the second right from the entrance. You can backwalk off the ledge to avoid voiding out."
                    },
                    "Icicle Silver Rupee Behind Icicles": {
                        SpoilerLogName: "Gerudo Training Ground MQ Icicle Room Silver Rupee Icicles",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 94, y: 128 },
                        Age: Age.EITHER,
                        Order: 7.5,
                        LongDescription: "This rupee is on the right side of the room behind the icicles. There's a fire-free path if you take the second right from the entrance."
                    }
                }
            },
            roomWithSilverBlock: {
                DisplayGroup: { 
                    groupName: "Silver Block Rooms", 
                    imageName: "Silver Gauntlets",
                    description: "Collect the silver rupees in the slopes room and navigate to the unlocked door to get to this area.",
                    tricksToShow: [
                        Tricks.gtgSilverBlockRoomExitWithHoverBoots,
                        Tricks.gtgSilverBlockSkipWithHammerSuperslide
                    ]
                },
                UseAdultAge: function() { 
                    return !Tricks.gtgChildVineClips.enabled && !Settings.RandomizerSettings.shuffleSilverRupees; 
                },
                Exits: {
                    leftArea: {
                        Age: Age.CHILD // Only possible via vine clipping and going backwards
                    },
                    upperSilverBlockRoom: {
                        Age: Age.ADULT,
                        NeedsAny: [Songs.SONG_OF_TIME, Tricks.gtgSilverBlockRoomExitWithHoverBoots.canDo]
                    },
                    roomBehindSilverBlock: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.SILVER_GAUNTLETS]
                    }
                },
                ItemLocations: {
                    "Chest in Room With Silver Block": {
                        SpoilerLogName: "Gerudo Training Ground MQ Before Heavy Block Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 84 },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Enter the room after the iron knuckle room. Collect the rupees within the time limit and move on to the next room. Defeat the enemies within the time limit to spawn the chest."
                    }
                }
            },
            upperSilverBlockRoom: {
                Exits: {
                    eyeStatueRoom: {
                        NeedsAny: [GameStateSets.HAS_BOTTLE, ItemSets.BLUE_FIRE_ITEMS]
                    },
                    roomWithSilverBlock: {},
                    roomBehindSilverBlock: {
                        NeedsAny: [Tricks.gtgSilverBlockSkipWithHammerSuperslide.canDo]
                    }
                },
                ItemLocations: {}
            },
            roomBehindSilverBlock: {
                DisplayGroup: { groupName: "Silver Block Rooms", imageName: "Silver Gauntlets" },
                Exits: {},
                ItemLocations: {
                    "Chest in Room Behind Silver Block": {
                        SpoilerLogName: "Gerudo Training Ground MQ Heavy Block Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 17 },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "Get to the room with the silver block. Push it into the hole, then enter the next room. Kill the enemies to spawn the chest."
                    }
                }
            },
            eyeStatueRoom: {
                DisplayGroup: { groupName: "Eye Statue Room", imageName: "Fairy Bow" },
                UseAdultAge: function() { return !Tricks.gtgChildVineClips.enabled; },
                Exits: {
                    upperSilverBlockRoom: {},
                    armosRoom: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    bigLavaRoomUpperBack: {},
                    iceArrowsRoom: {
                        NeedsAny: [ItemSets.DISTANT_SWITCH_ITEMS, Tricks.mqGtgEyeStatueJumpslash.canDo]
                    }
                },
                ItemLocations: {
                    "Wonderitem on Eye Statue": {
                        SpoilerLogName: "Gerudo Training Ground MQ Eye Statue Proximity Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 163, y: 91 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        Order: 10,
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down.<br/><br/>Use hover boots or the longshot to navigate to the top of the center statue to get this wonderitem.",
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        AdultNeedsAny: [
                            Equipment.HOVER_BOOTS,
                            UpgradedItems.LONGSHOT,
                            Tricks.megaFlip.canDo,
                            Tricks.gtgEyeStatueWonderItemJumpslash.canDo
                        ]
                    },
                    "Chest in Eye Statue Room": {
                        SpoilerLogName: "Gerudo Training Ground MQ Eye Statue Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 163, y: 60 },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Jump to the spinning ring and shoot the eyes of the statues to spawn the chest.",
                        Needs: [Items.FAIRY_BOW]
                    },
                    "Side Fire Iron Knuckle Chest": {
                        SpoilerLogName: "Gerudo Training Ground MQ Second Iron Knuckle Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 256, y: 76 },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Kill the enemies within the time limit to spawn the chest."
                    },
                    "Center Fire Iron Knuckle Chest": {
                        SpoilerLogName: "Gerudo Training Ground MQ Flame Circle Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 254, y: 90 },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Activate the switch above the door to spawn the chest. Step on the switch on one of the walls to remove the fire.",
                        Needs: [ItemSets.DISTANT_SWITCH_ITEMS]
                    }
                }
            },
            iceArrowsRoom: {
                DisplayGroup: { groupName: "Eye Statue Room", imageName: "Fairy Bow" },
                UseAdultAge: function() { return !Tricks.gtgChildVineClips.enabled; },
                Exits: {
                    eyeStatueRoom: {
                        Age: Age.CHILD // Only useful for Child
                    }
                },
                ItemLocations: {
                    "Chest Spawned from Maze Center": {
                        SpoilerLogName: "Gerudo Training Ground MQ Ice Arrows Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 166, y: 132 },
                        Age: Age.EITHER,
                        Order: 9.9,
                        LongDescription: "First, spawn the chest by making your way to the center of the maze. Break the box, then hammer the rusted switch to spawn the chest.<br/><br/>In the eye statue room, hit the lower crystal switch with your hookshot, bow, or explosives. The room with the chest will become unbarred.",
                        TricksToShow: [Tricks.mqGtgEyeStatueJumpslash],
                        NeedsAny: [
                            ItemLocationSets.MQ_GTG_SPAWNED_ICE_ARROW_CHEST, // Already spawned
                            [ // CAN spawn it
                                Items.MEGATON_HAMMER,
                                [
                                    SetType.OR,
                                        () => ItemData.getKeyCount("Training Grounds") >= 3,
                                        Tricks.gtgChildVineClips.canDo,
                                        Tricks.weirdShot.canDo
                                ]
                            ]
                        ]
                    }
                }
            },
            bigLavaRoomFront: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    bigLavaRoomFrontLeftRupee: {
                        Age: Age.ADULT
                    },
                    bigLavaRoomWaterDoorPlatform: {
                        Age: Age.ADULT,
                        NeedsAny: [UpgradedItems.LONGSHOT, Items.FAIRY_BOW]
                    },
                    bigLavaRoomBack: {
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW], // Light torch from here specifically so you can travel directly there (no intermediary)
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            SilverRupeeSets.MQ_GTG_SILVER_RUPEES_LAVA_ROOM // Getting all silver rupees spawns hookshot targets that you can use to traverse
                        ]
                    },
                    armosRoom: {}
                },
                ItemLocations: {
                    "Lava Silver Rupee in Front Center": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Front Center",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 247, y: 180 },
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled },
                        Age: Age.EITHER,
                        Order: 15.1,
                        LongDescription: "This rupee is the one on the platform in front of you, when entering from the aromos room.<br/><br/>To clear the fire around the rupees, use a fire arrow on the unlit torch on the side of the room, or longshot to the torch and use Din's Fire.<br/><br/>If entering from the top, either clear the fire and use hover boots to navigate around, or use your longshot to navigate via the torches (might be good to hit the megaton hammer switch too).",
                        ChildNeeds: [Tricks.megaFlip.canDo]
                    },
                    "Lava Silver Rupee in Front Right": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Front Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 261, y: 171 },
                        Age: Age.ADULT,
                        Order: 15.3,
                        LongDescription: "This rupee is the one on the platform to your right when entering from the aromos room."
                    }
                }
            },
            bigLavaRoomFrontLeftRupee: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                UseAdultAge: function() { return !Tricks.gtgChildVineClips.enabled; },
                Exits: {},
                ItemLocations: {
                    "Lava Silver Rupee in Front Left": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Front Left",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 234, y: 173 },
                        Age: Age.EITHER,
                        Order: 15.2,
                        LongDescription: "This rupee is the one on the platform to your left when entering from the aromos room.<br/><br/>You can get this without clearing the fire by dropping down from the maze room entrance, lining up with the rupee, getting hit and then jumpslashing into the fire."
                    }
                }
            },
            bigLavaRoomUpperBack: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    bigLavaRoomBack: {
                        Age: Age.ADULT,
                        Needs: [Items.FIRE_ARROW]
                    },
                    bigLavaRoomBackLeft: {
                        Age: Age.ADULT,
                        Needs: [Items.FIRE_ARROW],
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    bigLavaRoomWaterDoorPlatform: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    backOfMaze: {
                        Age: Age.ADULT,
                        // Hitting the switch unbars the door from the maze; just need to savewarp after
                        Needs: [Items.MEGATON_HAMMER] 
                    }
                },
                ItemLocations: {}
            },
            bigLavaRoomBack: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    bigLavaRoomBackLeft: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            Tricks.megaFlip.canDo,
                            SilverRupeeSets.MQ_GTG_SILVER_RUPEES_LAVA_ROOM
                        ]
                    },
                    bigLavaRoomFront: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            Items.HOOKSHOT, // Will let you get to the big water platform first, then navigate before the fires go out
                            Tricks.megaFlip.canDo,
                            SilverRupeeSets.MQ_GTG_SILVER_RUPEES_LAVA_ROOM
                        ]
                    },
                    bigLavaRoomWaterDoorPlatform: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            Items.HOOKSHOT,
                            SilverRupeeSets.MQ_GTG_SILVER_RUPEES_LAVA_ROOM
                        ]
                    }
                },
                ItemLocations: {
                    "Lava Silver Rupee in Back Center": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Back Center",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 252, y: 155 },
                        Age: Age.ADULT,
                        Order: 15.4,
                        LongDescription: "This rupee is on the back center platform. Clear the fire as normal, and use your hover boots to get to it. Hover boots not required if coming from either of the top areas."
                    },
                    "Lava Silver Rupee in Back Right": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Back Right",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 262, y: 144 },
                        Age: Age.ADULT,
                        Order: 15.5,
                        LongDescription: "This rupee is on the back right platform. Clear the fire as normal, and use your hover boots to get to it. Hover boots not required if coming from either of the top areas."
                    }
                }
            },
            bigLavaRoomBackLeft: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {},
                ItemLocations: {
                    "Lava Silver Rupee in Back Left": {
                        SpoilerLogName: "Gerudo Training Ground MQ Lava Room Silver Rupee Back Left",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 236, y: 145 },
                        Age: Age.ADULT,
                        Order: 15.6,
                        LongDescription: "This rupee is on the back left platform. Clear the fire as normal, and use your hover boots to get to it. Hover boots not required if coming from the maze top area, which you can get to by hammering the rusted switch in the upper area, and then longshotting to the target."
                    }
                }
            },
            bigLavaRoomWaterDoorPlatform: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    bigLavaRoomFront: {
                        NeedsAny: [UpgradedItems.LONGSHOT, ItemSets.FIRE_ITEMS]
                    },
                    bigLavaRoomBack: {
                        NeedsAny: [
                            ItemSets.FIRE_ITEMS, 
                            Equipment.HOVER_BOOTS, 
                            Tricks.megaFlip.canDo, 
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    waterRoom: {
                        Needs: [SilverRupeeSets.GTG_SILVER_RUPEES_LAVA_ROOM]
                    }
                },
                ItemLocations: {}
            },
            waterRoom: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {},
                ItemLocations: {
                    "Chest in Water Room": { 
                        SpoilerLogName: "Gerudo Training Ground MQ Underwater Silver Rupee Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 297, y: 160 },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "From the big lava room, longshot to the torch by the side door. Light it with a fire item or with your bow from the lit torch, then use your hover boots to collect the rupees. You may need to collect half of them then come back and light the torch again.<br/><br/>Once inside the water room, burn the web, then use your iron boots and hookshot (if you have one) to collect all the rupees in the water. The chest will spawn at the top.",
                        Needs: [SilverRupeeSets.MQ_GTG_SILVER_RUPEES_WATER_ROOM]
                    },
                    "3 Silver Rupees in Water Room": {
                        SpoilerLogName: [{
                            name: "Gerudo Training Ground MQ Underwater Silver Rupee {#}",
                            tokens: ["Middle", "Front Right", "Back Left"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        DefaultEntranceGroupName: "3 Silver Rupees",
                        MapInfo: { x: 306, y: 169 },
                        Age: Age.ADULT,
                        Order: 16.1,
                        LongDescription: "From the big lava room, longshot to the torch by the side door. Light it with a fire item or with your bow from the lit torch, then use your hover boots to collect the rupees. You may need to collect half of them then come back and light the torch again.<br/><br/>Once inside the water room, burn the web, then use your iron boots and hookshot (if you have one) to collect the items.",
                        Needs: [Equipment.IRON_BOOTS, GameStateSets.GTG_TUNIC_CHECK],
                        NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            backOfMaze: {
                DisplayGroup: { groupName: "Maze Dead End", imageName: "Chest" },
                UseAdultAge: function() { return !Tricks.gtgChildVineClips.enabled; },
                Exits: {
                    bigLavaRoomFront: {
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        AdultNeedsAny: [
                            Items.FIRE_ARROW,
                            UpgradedItems.LONGSHOT,
                            Tricks.megaFlip.canDo,
                            Tricks.bombSuperslide.canDoWithHoverBoots,
                            Tricks.hammerHoverBootsSuperslide.canDo
                        ]
                    },
                    bigLavaRoomBack: {
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.MAGIC]
                    },
                    bigLavaRoomBackLeft: {
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.MAGIC]
                    },
                    bigLavaRoomFrontLeftRupee: {
                        ChildNeeds: [ItemSets.SWORDS]
                    }
                },
                ItemLocations: {
                    "Close Chest in Back of Maze": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Right Central Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 177, y: 165 },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "After defeating the enemies in the room with the fire circle and Iron Knuckle, proceed through the door. Hammer the rusted switch, then longshot to the pillar that appears (or savewarp and go through the now-unbarred right door from the maze entrance). Go through the hall - the chest is straight ahead."
                    },
                    "Far Chest in Back of Maze": {
                        SpoilerLogName: "Gerudo Training Ground MQ Maze Right Side Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 154 },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "After getting the close chest from the back of the maze, continue along counter-clockwise to get the next chest (there are no doors to go through)."					
                    }
                }
            }
        }
    },

    "Ganon's Castle": {
        Abbreviation: "GANC",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["MN", "FST", "WTR", "SHW", "FIR", "LIT", "SPT"],
        MqMapFloors: ["SHW", "FIR"],
        StartingFloorIndex: 0,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canGetToWaterTrialDoor: function(age) {
            return ItemData.canUse(age, [ItemSets.BLUE_FIRE_ITEMS]) || // Already has blue fire
                ItemData.canUse(age, [ // Can get the blue fire in this room
                    GameStateSets.HAS_BOTTLE,
                    [SetType.OR,
                        ItemSets.SWORDS, ItemSets.EXPLOSIVES, ItemSets.PROJECTILES]
                ]);
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby/Hub", imageName: "5 Scrubs" },
                Exits: {
                    forestTrialStart: {},
                    waterRoom: {},
                    shadowSmallPlatform: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            [Items.FAIRY_BOW, Items.HOOKSHOT]
                        ]
                    },
                    fireRoomEarly: {},
                    lightRoom1: {
                        ChildNeeds: [Tricks.ganonLightTrialSuperslideSkip.canDo],
                        AdultNeedsAny: [
                            UpgradedItems.GOLDEN_GAUNTLETS, 
                            Tricks.ganonLightTrailEssSkip.canDo, 
                            Tricks.ganonLightTrialSuperslideSkip.canDo
                        ]
                    },
                    spiritRoom2: {
                        Needs: [Items.MEGATON_HAMMER]
                    },
                    center: {
                        NeedsAny: [Tricks.staircaseHover.canDo, ItemLocationSets.ALL_TRIALS_COMPLETED]
                    }
                },
                ItemLocations: {
                    "5 Scrubs in Secret Room": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Deku Scrub {#}",
                            tokens: ["Left", "Center-Left", "Center", "Center-Right", "Right"]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        DefaultEntranceGroupName: "5 Scrubs",
                        MapInfo: { x: 249, y: 235, floor: "MN" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },

                    // Locked Doors
                    "Locked Door in Water Trial": {
                        DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["waterRoom"],
                        MapInfo: { x: 193, y: 168, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "This is the locked door in the water trial, blocked by the red ice.",
                        Needs: [(age) => MapLocations["Ganon's Castle"]._canGetToWaterTrialDoor(age)],
                        StartingDoorRequirement: () => true
                    },
                    "Locked Door 1 in Light Trial": {
                        DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["lightRoom1"],
                        MapInfo: { x: 180, y: 174, floor: "LIT" },
                        UseAdultAge: () => !Tricks.ganonLightTrialSuperslideSkip.enabled,
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "This is the locked door in the Zelda's Lullaby room of the light trial.",
                        StartingDoorRequirement: () => true,
                        NextDoors: { "Locked Door 2 in Light Trial": () => true }
                    },
                    "Locked Door 2 in Light Trial": {
                        DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["lightRoom2Back"],
                        MapInfo: { x: 180, y: 84, floor: "LIT" },
                        UseAdultAge: () => !Tricks.ganonLightTrialSuperslideSkip.enabled ||
                            !Tricks.megaFlip.enabled,
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "This is the locked door in the boulder/fire wall froom of the light trial."
                    }
                }
            },
            forestTrialStart: {
                DisplayGroup: { groupName: "Forest Trial", imageName: "Forest Medallion" },
                Exits: {
                    forestTrialEnd: {
                        Needs: [Songs.SONG_OF_TIME]
                    }
                },
                ItemLocations: {
                    "Forest Freestanding Item": {
                        SpoilerLogName: "Ganons Castle MQ Forest Trial Freestanding Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 165, y: 204, floor: "FST" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "After dealing with the enemies, wait for the fan to stop spinning, then hookshot up to the ledge. The item is up there.",
                        ChildNeeds: [Items.BOOMERANG],
                        AdultNeedsAny: [Items.HOOKSHOT, Items.BOOMERANG]
                    },
                    "Forest Close Chest": {
                        SpoilerLogName: "Ganons Castle MQ Forest Trial Eye Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 168, y: 170, floor: "FST" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "In the second room, stand on the upper left side of the first platform. Shoot the eye switch on the back right corner of the room to spawn the chest.",
                        ChildNeeds: [Items.FAIRY_SLINGSHOT],
                        AdultNeeds: [Items.FAIRY_BOW]
                    },
                    "Forest Far Chest": {
                        SpoilerLogName: "Ganons Castle MQ Forest Trial Frozen Eye Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 153, y: 147, floor: "FST" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "In the second room, shoot the eye switch at the back left side of the room with a fire arrow to spawn the chest. Alternatively, you can also use Din's fire to hit it once at the back of the room. To get across, you can jump and use the wind from the fan if you have no hover boots.",
                        Needs: [ItemSets.FIRE_ITEMS]
                    }
                }
            },
            forestTrialEnd: {
                DisplayGroup: { groupName: "Forest Trial", imageName: "Forest Medallion" },
                Exits: {},
                ItemLocations: {
                    "2 Pots at Forest Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Forest Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 65, floor: "FST" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Enter the forest trial - defeat the stalfos to get to the next room. Now, use the fans to cross. Play the song of time on the corner closest to the floating block - keep playing it until the armos status hits the switch to unbar the door. The pots are inside."
                    },
                    "Forest Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Forest Medallion",
                        MapInfo: { x: 20, y: 20, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 9.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            waterRoom: {
                DisplayGroup: { 
                    groupName: "Water Trial", 
                    imageName: "Water Medallion",
                    description: "To get to the end as Child from the block room:\x0A- Push the left block to the red ice\x0A- Backflip on the blue rock and jump to the other block\x0A- Jump to the block you pushed\x0A- Drop blue fire by the red ice (slightly away from the wall so it doesn't go out of bounds)" 
                },
                Exits: {
                    waterTrialBlockPuzzle: {
                        Map: "Ganon's Castle",
                        LockedDoor: "Locked Door in Water Trial",
                        Needs: [(age) => MapLocations["Ganon's Castle"]._canGetToWaterTrialDoor(age)]
                    }
                },
                ItemLocations: {
                    "Chest in Left Water Trial": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 163, y: 233, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "The chest is in the red ice on the left side of the room. You can roll into it and spam A to open the chest through the ice.<br/><br/>If you want to melt it, attack the weird hand thing on the right side of the room to lower the water around the blue fire."
                    },
                    "Heart in Right Water Trial": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Recovery Heart",
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 226, y: 233, floor: "WTR" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "In the water trial - this heart is in the blue ice in the right side of the room (or use a boomerang trick shot).<br/><br/>To gain access to the blue fire, attack the weird hand thing on the right side of the room to lower the water around the blue fire.",
                        NeedsAny: [ItemSets.BLUE_FIRE_ITEMS, Tricks.boomerangThroughWalls.canDo]
                    }
                }
            },
            waterTrialBlockPuzzle: {
                DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
                Exits: {
                    waterTrialEnd: {
                        Map: "Ganon's Castle",
                        Needs: [SilverRupeeSets.MQ_GANON_WATER_SILVER_RUPEES]
                    }
                },
                ItemLocations: {
                    "Water Silver Rupee in Block Hole": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Silver Rupee Hole",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 197, y: 119, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 12.1,
                        LongDescription: "Enter the water trial - use a sword weapon behind the random dead hand to hit a switch in the wall to gain access to the blue fire. Melt the red ice wall and proceed through the locked door (make sure you still have blue fire).<br/><br/>The rupee is in front of you in the hole. Note that Child cannot get out of the hole!"
                    },
                    "Water Silver Rupee Above Water Trial Chasm": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Silver Rupee Above Void",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 214, y: 56, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 12.2,
                        LongDescription: "In the back right part of the room, you can do an angled jump from one side of the void to another and grab this rupee on the way."
                    },
                    "Water Silver Rupee Floating by Push Blocks": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Silver Rupee Near Blocks",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 177, y: 94, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 12.3,
                        LongDescription: "This is the floating rupee by the two push blocks. As adult, you can get this by jumping from the top of one of the blocks.<br/><br/>As child - first, push the back block so it's against the blue rock. Backflip onto the rock. Now, you can climb onto the block and do a roll-jump toward the rupee to get it."
                    },
                    "Water Silver Rupee in Alcove": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Silver Rupee Center Left",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 150, y: 94, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 12.4,
                        LongDescription: "This is the rupee in the alcove on the left side of the room."
                    },
                    "Water Silver Rupee on Alcove Platform": {
                        SpoilerLogName: "Ganons Castle MQ Water Trial Silver Rupee Red Ice",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 125, y: 94, floor: "WTR" },
                        Age: Age.ADULT,
                        Order: 12.5,
                        LongDescription: "As Adult, push the blocks to solve the puzzle (see the map for a diagram). That is - push the back block east, then south into the hole. The, push the other block east, north, then west into the alcove. The rupee is encased in ice - melt it, or use a well-angled jump-slash to get it."
                    }
                }
            },
            waterTrialEnd: {
                DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                Exits: {},
                ItemLocations: {
                    "2 Pots at Water Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Water Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 10, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Enter the water trial - use a sword weapon behind the random dead hand to hit a switch in the wall to gain access to the blue fire. Melt the red ice wall and proceed through the locked door (make sure you still have blue fire). In the next room, gather the silver rupees, melt the back red ice, and proceed to the room with the pots."
                    },
                    "Water Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Water Medallion",
                        MapInfo: { x: 20, y: 20, floor: "WTR" },
                        Age: Age.ADULT,
                        Order: 13.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            shadowSmallPlatform: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
                Exits: {
                    shadowMovingPlatform: {
                        Needs: [Equipment.MAGIC, Items.LENS_OF_TRUTH] // Without lens is really hard, so not including that trick for now
                    }
                },
                ItemLocations: {
                    "Shadow Chest on Small Platform": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Bomb Flower Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 147, y: 227, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "First, shoot the bomb flower on the right side of the room. Now, use hover boots or your hookshot to reach the chest. Otherwise, navigate to the bomb flower using hover boots/lens and blow it up with a fire item, strength, or your own explosives.",
                        NeedsAny: [
                            Items.FAIRY_BOW, // Spawn chest
                            [ // Travel to the bomb flower and blow it up
                                Items.LENS_OF_TRUTH,
                                [SetType.OR,
                                    ItemSets.EXPLOSIVES_OR_STRENGTH, ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                            ]
                        ]
                    }
                }
            },
            shadowMovingPlatform: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
                Exits: {
                    shadowBackSection: {
                        NeedsAny: [Equipment.HOVER_BOOTS, ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    }
                },
                ItemLocations: {
                    "Shadow Silver Rupee on Invisible Moving Platform": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Silver Rupee Moving Platform",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 178, y: 190, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14.1,
                        LongDescription: "Navigate to the moving platform using either hover boots, or by shooting the bomb flower and hookshoting to the chest to get this rupee."
                    },
                    "Shadow Silver Rupee on Bomb Flower Island": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Silver Rupee Bomb Flower",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 220, y: 209, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14.2,
                        LongDescription: "Navigate to the moving platform using either hover boots, or by shooting the bombflower and hookshoting to the chest. Carefully navigate to the little island with the bomb flower and the rupee."
                    },
                    "Wonderitem on Bomb Flower Island": {
                        // TODO: enable this when the OOTR PR is merged
                        RequiredToAppear: () => false,
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Explosives Wonderitem",
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Explosive Wonderitem",
                        MapInfo: { x: 222, y: 211, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14.3,
                        LongDescription: "Navigate to the moving platform using either hover boots, or by shooting the bombflower and hookshoting to the chest. Carefully navigate to the little island with the bomb flower and the rupee.<br/><br/>Set off an explosion on the island to spawn this wonderitem (bow, din's fire, or strength can blow up the bomb flower).",
                        NeedsAny: [
                            ItemSets.EXPLOSIVES_OR_STRENGTH,
                            Items.FAIRY_BOW,
                            Items.DINS_FIRE,
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    "Shadow Silver Rupee Under Front Beamos": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Silver Rupee First Beamos",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 182, y: 155, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14.4,
                        LongDescription: "Navigate to the moving platform using either hover boots, or by shooting the bomb flower and hookshoting to the chest. The rupee is under the beamos on the next platform - no need to blow it up to grab it."
                    }
                }
            },
            shadowBackSection: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
                Exits: {
                    shadowTrialEnd: {
                        Needs: [SilverRupeeSets.MQ_GANON_SHADOW_SILVER_RUPEES]
                    }
                },
                ItemLocations: {
                    "Shadow Chest in Back": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Eye Switch Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 186, y: 103, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "At the shadow trial, use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. To cross the other gap, use hover boots or light the sunken torch to create a platform. After the beamos platform, turn around and shoot the eye switch to spawn the chest.<br/><br/>Using QPA, get ISG and stand in the middle of the transparent platform, with your back to the eye switch. Put away your weapon. Backflip - you should void out and trigger the switch.",
                        NeedsAny: [Items.FAIRY_BOW, QPAItemSets.LEDGE_QPA]
                    },
                    "Shadow Silver Rupee Under Back Beamos": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Silver Rupee Last Beamos",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 150, y: 73, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 15.1,
                        LongDescription: "At the shadow trial, use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. To cross the other gap, use hover boots or light the sunken torch to create a platform.</br></br>The rupee is under the beamos to the island on the left. The Lens of Truth will reveal a path."
                    },
                    "Shadow Silver Rupee by Back Guillotine": {
                        SpoilerLogName: "Ganons Castle MQ Shadow Trial Silver Rupee Guillotine",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 175, y: 61, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 15.2,
                        LongDescription: "At the shadow trial, use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. To cross the other gap, use hover boots or light the sunken torch to create a platform.</br></br>The rupee is guarded by the guillotine over the void. The Lens of Truth will reveal a path to it."
                    }
                }
            },
            shadowTrialEnd: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
                Exits: {},
                ItemLocations: {
                    "2 Pots at Shadow Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Shadow Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 5, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "At the shadow trial, use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. To cross the other gap, use hover boots or light the sunken torch to create a platform. Gather all the rupees to open the door to the pots."
                    },
                    "Shadow Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Shadow Medallion",
                        MapInfo: { x: 20, y: 20, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 16.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            fireRoomEarly: {
                DisplayGroup: { groupName: "Fire Trial", imageName: "Fire Medallion" },
                Exits: {
                    fireRoomLate: {
                        Needs: [GameStateSets.GANON_FIRE_TUNIC_CHECK]
                    }
                },
                ItemLocations: {
                    "Fire Silver Rupee Above Rising Platform": {
                        SpoilerLogName: "Ganons Castle MQ Fire Trial Silver Rupee Rising Platform",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 219, y: 199, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 16.1,
                        LongDescription: "At the fire trial, there's a 2x2 section of stationary platforms near the start. Get to the back right one and ride it up - the rupee is there. You may have to backflip to get it."
                    }
                }
            },
            fireRoomLate: {
                DisplayGroup: { groupName: "Fire Trial", imageName: "Fire Medallion" },
                UseAdultAge: function() {
                    return !Tricks.ganonFireTrialNoTunic.enabled;
                },
                Exits: {
                    fireTrialEnd: {
                        Age: Age.ADULT,
                        Needs: [SilverRupeeSets.MQ_GANON_FIRE_SILVER_RUPEES], // Unbar door
                        NeedsAny: [ // Get to door
                            UpgradedItems.LONGSHOT,
                            [Equipment.HOVER_BOOTS, UpgradedItems.GOLDEN_GAUNTLETS]
                        ]
                    }
                },
                ItemLocations: {
                    "Fire Silver Rupee Under Silver Pillar": {
                        SpoilerLogName: "Ganons Castle MQ Fire Trial Silver Rupee Beamos",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 233, y: 143, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 16.2,
                        LongDescription: "Navigate to the back island with the beamos and giant silver pillar. Lift it with your golden gauntlets to get to the rupee.",
                        Needs: [UpgradedItems.GOLDEN_GAUNTLETS]
                    },
                    "Fire Silver on Back Left Platform": {
                        SpoilerLogName: "Ganons Castle MQ Fire Trial Silver Rupee Left Center",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 132, y: 166, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 16.3,
                        LongDescription: "Navigate around to the long platform in the back left part of the room. The rupee is in the middle of the circular section."
                    },
                    "Fire Silver Rupee by Left Moving Platform": {
                        SpoilerLogName: "Ganons Castle MQ Fire Trial Silver Rupee Left Front",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 132, y: 210, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 16.4,
                        LongDescription: "Navigate around to the long platform in the back left part of the room. Jump on the moving platform to the south to get to the rupee."
                    },
                    "Fire Silver Rupee in Back Left Corner": {
                        SpoilerLogName: "Ganons Castle MQ Fire Trial Silver Rupee Left Back",
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 141, y: 129, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 16.5,
                        LongDescription: "The intended way to get this rupee is to throw the silver pillar on the island south of the longer island. You can then ride the middle stationary platform to get to the rupee. You can also just ride that platform and jump to the rupee without throwing the pillar (roll jump at a 45 degree angle at the corner and hold forward), but you'll also void out in the lava!"
                    }
                }
            },
            fireTrialEnd: {
                DisplayGroup: { groupName: "Fire Trial", imageName: "Fire Medallion" },
                Exits: {},
                ItemLocations: {
                    "2 Pots at Fire Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Fire Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 77, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "Enter the fire trial - you must grab all the silver rupees to enter the room with the pots. You can get to the door by either longshotting the hookshot target, or by using hover boots from the thrown silver pillar near the door."
                    },
                    "Fire Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Fire Medallion",
                        MapInfo: { x: 20, y: 20, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 17.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            lightRoom1: {
                DisplayGroup: { 
                    groupName: "Light Trial", 
                    imageName: "Light Medallion",
                    description: "The light trial.",
                    tricksToShow: [Tricks.ganonLightTrialSuperslideSkip, Tricks.ganonLightTrailEssSkip] 
                },
                UseAdultAge: () => !Tricks.ganonLightTrialSuperslideSkip.enabled,
                Exits: {
                    lightRoom2: {
                        Map: "Ganon's Castle",
                        LockedDoor: "Locked Door 1 in Light Trial"
                    }
                },
                ItemLocations: {
                    "Light Zelda's Lullaby Chest": {
                        SpoilerLogName: "Ganons Castle MQ Light Trial Lullaby Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 194, y: 197, floor: "LIT" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "Use your gauntlets to gain access to this area. In the first room, kill all the enemies. In the next room, play Zelda's Lullaby to spawn the chest.",
                        Needs: [Songs.ZELDAS_LULLABY]
                    }
                }
            },
            lightRoom2 : {
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                Exits: {
                    lightRoom2Back: {
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        AdultNeedsAny: [
                            Items.HOOKSHOT,
                            Tricks.groundJump.canDoWithBomb,
                            Tricks.megaFlip.canDo
                        ]
                    }
                }, 
                ItemLocations: {}
            },
            lightRoom2Back:{
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                UseAdultAge: () => !Tricks.ganonLightTrialSuperslideSkip.enabled ||
                    !Tricks.megaFlip.enabled,
                Exits: {
                    lightTrialEnd: {
                        Map: "Ganon's Castle",
                        LockedDoor: "Locked Door 2 in Light Trial"
                    }
                },
                ItemLocations: {
                    "2 Hearts at Light Trial": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Light Trial Recovery Heart {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 213, y: 130, floor: "LIT" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "After the Zelda's Lullaby room, use your hookshot, a ground jump, or a megaflip to get around the fire walls. The hearts are in the two holes in the wall."
                    }
                }
            },
            lightTrialEnd: {
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                UseAdultAge: () => !Tricks.ganonLightTrialSuperslideSkip.enabled ||
                    !Tricks.megaFlip.enabled,
                Exits: {},
                ItemLocations: {
                    "2 Pots at Light Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Light Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 180, y: 10, floor: "LIT" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "After the Zelda's Lullaby room, use your hookshot or perform a ground jump to get around the fire walls and go in the locked door. Slash the right torch to proceed through the fake wall and into the room where the pots reside."
                    },
                    "Light Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Light Medallion",
                        MapInfo: { x: 20, y: 20, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 22.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            spiritRoom2: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {
                    spiritRoom3: {
                        Needs: [Items.BOMBCHU]
                    }
                },
                ItemLocations: {
                    "Spirit Chest After Iron Knuckle": {
                        SpoilerLogName: "Ganons Castle MQ Spirit Trial First Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 241, y: 184, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "Hammer jumpslash one of the corners of the central platform to simply hit the switch in the middle. Enter the next room - the chest is straight ahead."
                    }
                }
            },
            spiritRoom3: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {
                    spiritRoom4: {
                        Age: Age.ADULT,
                        Needs: [Equipment.MIRROR_SHIELD, Items.FIRE_ARROW]
                    }
                },
                ItemLocations: {
                    "Spirit Invisible Chest": {
                        SpoilerLogName: "Ganons Castle MQ Spirit Trial Invisible Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 239, y: 120, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. This chest is invisible in the corner of the room in front of the door."
                    }
                }
            },
            spiritRoom4: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {
                    spiritTrialEnd: {}
                },
                ItemLocations: {
                    "4 Spirit Sun Chests": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Spirit Trial {#}",
                            tokens: [
                                "Sun Front Left Chest", 
                                "Sun Back Left Chest", 
                                "Sun Back Right Chest", 
                                "Golden Gauntlets Chest"
                            ]
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CHEST,
                        DefaultEntranceGroupName: "4 Chests",
                        MapInfo: { x: 157, y: 119, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
                    }
                }
            },
            spiritTrialEnd: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {},
                ItemLocations: {
                    "2 Pots at Spirit Trial End": {
                        SpoilerLogName: [{
                            name: "Ganons Castle MQ Spirit Trial Pot {#}",
                            count: 2
                        }],
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 157, y: 71, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "In the room with all the suns, shine the light on the spirit medallion symbol to open the door."
                    },
                    "Spirit Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Spirit Medallion",
                        MapInfo: { x: 20, y: 20, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 29.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        Needs: [Items.LIGHT_ARROW]
                    }
                }
            },
            center: {
                DisplayGroup: { groupName: "Lobby/Hub", imageName: "5 Scrubs" },
                Exits: {
                    "Central Tower": {
                        OwExit: OwExits["Ganon's Castle"]["Central Tower"]
                    }
                },
                ItemLocations: {}
            }
        }
    }
};
