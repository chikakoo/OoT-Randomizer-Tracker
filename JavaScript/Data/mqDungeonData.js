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
        Regions: {
            main: {
                Exits: {
                    compassRoomAntechamber: {
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
                        }
                    },
                    waterRoom: {
                        CustomRequirement: function(age) {
                            if (!Data.canShootEyeSwitch(age)) { return false; }
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    upperBasement: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Settings.GlitchesToAllow.dekuB1Skip;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Deku Tree"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Heart in Lower Lobby": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 245, y: 28, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 1,
                        LongDescription: "Climb up the vines on the first floor. Jump to the small platform to your left. The item is on the end of that platform; you have to jump off for it.",
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 282, y: 82, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 1,
                        LongDescription: "Climb to the second floor of the dungeon. The chest is by the vines leading to the third floor."
                    },
                    "Crate by Map Chest": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 277, y: 87, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 2,
                        LongDescription: "This crate is next to the map chest on the second floor.",
                    },
                    "Skulltula by Map Chest": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 277, y: 87, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 3,
                        LongDescription: "This skulltula is in the crate by the map chest on the second floor. Roll into it to set it free.",
                    },
                    "2 Crates on Third Floor": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 157, y: 149, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>The crates are in the lower area right in front of you."
                    },
                    "Slingshot Chest on Third Floor": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 115, y: 199, floor: "F3" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 9,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Defeat all the enemies in this room to spawn the chest. Press the switch to gain access to the chest.",
                        NeedsDamagingWeapon: true
                    },
                    "Recovery Heart on Third Floor": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 107, y: 200, floor: "F3" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 10,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Press the switch inside to gain access to the item.",
                    },
                    "Small Chest on Third Floor": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 147, floor: "F3" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 11,
                        LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Light the unlit torch in this room to spawn the chest. If using a bow, it's easier if you shoot it from the left side of the torch.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
                        }
                    },
                    "Basement Web Switch Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 81, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 12,
                        LongDescription: "Head to the basement. The goal is to hit the switch to the right of the vines to spawn the chest. If you have Din's Fire, use it on the webs. Otherwise, hit the switch to the left of the vines to light the torch, then use your sticks to gain access to the switch.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
                        }
                    }
                }
            },

            compassRoomAntechamber: {
                Exits: {
                    compassRoom: {
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                },
                ItemLocations: {
                    "Heart in Giant Baba Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 191, y: 151, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 4,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so. The heart is on the left side of the room."
                    }
                }
            },

            compassRoom: {
                Exits: {
                    compassRoomSideArea: {
                        CustomRequirement: function(age) {
                            let canUseHammer = Data.canUseHammer(age);
                            let canBreakWithChu = Items.BOMBCHU.playerHas;
                            let canBreakFromSoTBlock = (Data.canPlaySong(Songs.SONG_OF_TIME) && (
                                Items.BOMB.playerHas ||
                                canUseHammer
                            ));
                            let canBreakWithHammer = Settings.GlitchesToAllow.mqDekuSideRoomRocksHammerOnly && canUseHammer;
                            let canBreakWithBomb = Settings.GlitchesToAllow.mqDekuSideRoomRocksBombsOnly && age === Age.ADULT && Items.BOMB.playerHas;
                            return canBreakWithChu || canBreakFromSoTBlock || canBreakWithHammer || canBreakWithBomb;
                        }
                    },
                    compassRoomSkulltula: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    }
                },
                ItemLocations: {
                    "Compass Chest in Old Slingshot Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 111, y: 246, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 5,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Once in this next room, shoot the eye in the back to gain access to the next room. The chest is on the other side.",
                    }
                }
            },

            compassRoomSideArea: {
                Exits: {
                    compassRoomSkulltula: {}
                },
                ItemLocations: {
                    "Heart in Old Slingshot Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 157, y: 273, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 6,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so. The heart is on the left side of the room."
                    }
                }
            },

            compassRoomSkulltula: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Old Slingshot Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 161, y: 277, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 7,
                        LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Head to the other side of the room. The room up the vines to the left is blocked by rocks. Use a bombchu to gain access. The skulltula is up on the wall.",
                        CustomRequirement: function(age) {
                            return Data.canGrabShortDistances(age) || 
                                (age === Age.ADULT && Data.canStaircaseHover(age));
                        }
                    }
                }
            },

            waterRoom: {
                Exits: {
                    upperBasement: {}
                },

                ItemLocations: {
                    "Chest by Water Room Door": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 266, y: 225, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 12,
                        LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room. The chest will be to your left."
                    },
                    "Chest via Song of Time Block": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 181, y: 225, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 13,
                        LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room.<br/><br/>Make your way to the other side of the water room. You'll need to roll or crouch with your shield under the spikey pole. Play the Song of Time by the block to reveal the chest.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    }
                }
            },

            upperBasement: {
                Exits: {
                    lowerBasement: {
                        CustomRequirement: function(age) {
                            let canBurnWeb = Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                            return canBurnWeb || Data.canWeirdShot(age);
                        }
                    }
                },

                ItemLocations: {
                    "Skulltula in Grave Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 93, y: 113, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 14,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, play the Song of Time near the torches to spawn a staircase of blocks. Climb these and use your boomerang or hookshot to get the skulltula on the ceiling.",
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        IsAtShortDistance: true
                    },
                    "Skulltula by Grave Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 17, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 15,
                        LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Defeat all the enemies in this room to continue on.<br/><br/>Step on the blue switch in the middle of the torches. Quickly light a stick, then burn the web blocking the left door. You can also use Din's Fire. The skulltula is in this room.",
                        IsAtShortDistance: true,
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    "Scrub in Basement": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 274, y: 143, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 16,
                        LongDescription: "In the grave room, Step on the blue switch in the middle of the torches. Quickly light a stick, then burn the web blocking the right path. You can also use Din's Fire. Enter the crawlspace to find your way back to the upper level of the first basement room.<br/><br/>Once here, look near the spider web blocking the way to the lowest level for the business scrub.",
                    }
                }
            },

            lowerBasement: {
                Exits: {
                    bossRoom: {
                        RequiredChildItems: [Equipment.DEKU_SHIELD],
                        RequiredAdultItems: [Equipment.HYLIAN_SHIELD]
                    }
                },
                ItemLocations: {
                    "3 Hearts in Lower Basement": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 246, y: 105, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "These hearts are in the water of the lower basement, two on one side, one on the other."
                    }
                }
            },

            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Deku Tree"]["Boss Entrance"]
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
                Exits: {
                    mainRoom: {
                        CustomRequirement: function(age) {
                            if (Data.itemLocationObtained("Dodongo's Cavern", "main", "Opened First Wall")) { return true; }
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Dodongo's Cavern"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Opened First Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 134, y: 262, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Use an explosive or the hammer to break the first wall. This is used to determine whether Adult opened the door for Child.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    }
                }
            },

            mainRoom: {
                Exits: {
                    staircaseTop: {
                        CustomRequirement: function(age) {
                            if (Data.hasExplosives()) { return true; } // Going around the top
                
                            let canLowerWithBow = Settings.GlitchesToAllow.dodongoTriggerStairsWithBow && age === Age.ADULT && Items.FAIRY_BOW.playerHas;
                            return canLowerWithBow || Data.hasExplosivesOrStrength();
                        }
                    },
                    torchPuzzleRoom: {
                        NeedsExplosives: true // Going around the top
                    },
                    topOfTorchPuzzleRoom: {
                        NeedsExplosives: true // Going around the top
                    },
                    eastRoom: { 
                        CustomRequirement: function(age) { // Bring a bomb flower is handled by the upperLizalfosRoom
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    mainRoomLedge: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                
                            let canRecoil = Settings.GlitchesToAllow.dodongoSwitchEarly && 
                                (Data.hasExplosivesOrStrength() || Data.canUseHammer(age)) && 
                                Data.hasSwordWeapon(age);
                            return Data.canGroundJumpWithBomb(age) || canRecoil;
                        }
                    },
                    inDodongoHead: {
                        NeedsExplosives: true
                    }
                },

                ItemLocations: {
                    "Chest in Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 168, y: 180, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This chest is in the back right corner of the main room. Bomb, hammer, or blue fire the wall blocking it.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "Gossip Stone in Main Room": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 94, y: 198, floor: "F1" },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "This stone is behind the mud wall in the western area of the main room.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "2 Scrubs in Main Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Scrubs",
                        MapInfo: { x: 100, y: 222, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "These scrubs are on the ledge to the left when you first enter the main room."
                    },
                    "Skullula by Stair Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 46, y: 259, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Blow up the fake wall by the stairs. Play the song of time in the next room several times to navigate the maze to the skulltula.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "4 Pots in Stair Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 56, y: 193, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>The pots are in the four corners of the bottom part of the room."
                    },
                    "2 Crates in Lower Stair Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 53, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>The crates are in the two corners of the room by the back of the stairs."
                    }
                }
            },

            mainRoomLedge: {
                Exits: {
                    poeRoom: {}
                },

                ItemLocations: {
                    "Chest on Ledge in Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 182, y: 200, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "Navigate through the Poe room to get to this chest on the ledge on the right side of the main room. This may require you to go through most of the dungeon first."
                    }
                }
            },

            staircaseTop: {
                Exits: {
                    torchPuzzleRoom: {}
                },

                ItemLocations: {
                    "Scrub in Stair Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 32, y: 94, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Lower the stairs like normal. Climb the gray block to reach the scrub at the top."
                    },
                    "4 Crates in Upper Stair Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 52, y: 97, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "Lower the stairs in the stair room. The crates are up the stairs in the four corners of the walkways."
                    },
                    "Chest in Small Dodongo Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 200, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "Collect all the silver rupees in the stair room to get here. Defeat all the enemies to spawn the chest."
                    }
                }
            },

            torchPuzzleRoom: {
                Exits: {
                    topOfTorchPuzzleRoom: {
                        CustomRequirement: function(age) {
                            let adultBombChestEarly = age === Age.ADULT && Settings.GlitchesToAllow.dodongoAdultJumpToBombChest;
                            let canMegaflipThere = Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
                            return adultBombChestEarly || canMegaflipThere;
                        }
                    },
                    upperLizalfosRoom: {
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    }
                },

                ItemLocations: {
                    "Invisible Heart in Torch Puzzle": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 208, y: 175, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 25,
                        LongDescription: "In the torch puzzle room, there's an invisible item on the bottom part of the ledge against the back wall."
                    },
                    "Chest in Room by Torch Puzzle": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 202, y: 109, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 26,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. Kill all the enemies to spawn the chest.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    "6 Crates in Room by Torch Puzzle": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 202, y: 109, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 27,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. The crates are in this room.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    "Skulltula in Room by Torch Puzzle": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 210, y: 108, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 28,
                        LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. The skulltula is in one of the right boxes.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    }
                }
            },

            upperLizalfosRoom: {
                Exits: {
                    topOfTorchPuzzleRoom: {},
                    lowerLizalfosRoom: {}
                },

                ItemLocations: {
                    "First Fire Puzzle Pot by Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 251, y: 190, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 29,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the torch puzzle room or the upper lizalfos room. This pot is in the corner by the entrance."
                    },
                    "First Fire Puzzle Pot by Exit": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 270, y: 205, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the torch puzzle room or the upper lizalfos room. This pot is in the corner by the exit."
                    },
                    "Skulltula in Top Lizalfos Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 295, y: 122, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "After completing the torch puzzle, burn the web in the next room. Do the box pushing puzzle in the next room to get to the lizalfos room. Alternatively, you can blow up the rocks at the top of the main room and navigate around backwards to get here.<br/><br/>Bomb the rocks in the back of this room to get to the skulltula.",
                        NeedToBlastOrSmash: true
                    },
                    "2 Pots by Top Lizalfos Room Wall": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 341, y: 149, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 32,
                        LongDescription: "These pots are the ones against the wall without any doors in the top lizalfos room."
                    },
                    "2 Pots by Top Lizalfos Room Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 306, y: 162, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 33,
                        LongDescription: "These pots are the ones by the exit in the top lizalfos room."
                    },
                    "2 Pots in Second Fire Puzzle": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 274, y: 168, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 34,
                        LongDescription: "These pots are in the fire puzzle room after the top lizalfos room in one of the corners."
                    },
                    "Crate by Second Fire Puzzle Entrance": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 276, y: 160, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 35,
                        LongDescription: "In the fire puzzle room after the top lizalfos room, this crate can be found on the ground by the ledge you normally enter from."
                    },
                    "Crate by Second Fire Puzzle Exit": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 252, y: 168, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 36,
                        LongDescription: "In the fire puzzle room after the top lizalfos room, this crate can be found on the ground by the ledge you normally exit from."
                    }
                }
            },

            topOfTorchPuzzleRoom: {
                Exits: {
                    upperLizalfosRoom: {}
                },

                ItemLocations: {
                    "Chest on Top of Torch Puzzle Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 176, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 37,
                        LongDescription: "Either bomb the rocks at the top of the main room, or proceed through the upper lizalfos room to get to the top of the torch puzzle room. The chest is on one of the ledges you can get to by jumping there."
                    },
                    "Pot on Torch Puzzle Room Pillar": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 204, y: 174, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 38,
                        LongDescription: "This pot is the one on the pillar next to the chest."
                    },
                    "Pot by Old Bomb Bag Chest": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 184, y: 146, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 39,
                        LongDescription: "This pot is in the torch puzzle room near where the old bomb bag chest was.."
                    }
                }
            },

            eastRoom: {
                Exits: {
                    lowerLizalfosRoom: {
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                },

                ItemLocations: {
                    "2 Pots at East Room Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 193, y: 230, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Go to the room to the east of the main room. The pots are in front of you on the wall to the right."
                    },
                    "Scrub in East Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 242, y: 264, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Blow up the east room door somehow. You may need to run a bomb flower from the very top floor if you have no other way.<br/><br/>Once in the east room, blow up the fake wall on the right. The scrub is inside."
                    },
                    "2 Pots by East Room Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 306, y: 212, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Go to the room to the east of the main room. The pots are on either side of the door next to the platform."
                    }
                }
            },

            lowerLizalfosRoom: {
                Exits: {
                    eastRoom: {},
                    poeRoom: {}
                },
                ItemLocations: {
                    "Heart in Lavafall Cave": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 335, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "In the lower lizalfos room, head to the platform closest to the lavafall. Jump through the lavafall on the side that's closer to the wall to get to ths item. It may be invisible."
                    }
                }
            },

            poeRoom: {
                Exits: {
                    lowerLizalfosRoom: {},
                    mainRoomLedge: {
                        NeedsExplosivesOrBombFlower: true
                    }
                },

                ItemLocations: {
                    "Skulltula Near Poe Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 230, y: 79, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "In the Poe room, use an explosive on one of the lines of bomb flowers to unbar the door to this room. The skulltula is high up in the back left corner.",
                        IsAtShortDistance: true,
                        NeedsExplosivesOrBombFlower: true
                    },
                    "Poe Room Pot by Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 231, y: 143, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "This pot is to the left as you enter the main area.",
                    },
                    "Poe Room Pot by First Pillar": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 214, y: 147, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "This pot is on the right side of the giant pillar by the entrance.",
                    },
                    "2 Crates by First Pillar": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 230, y: 158, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "These crates are against the wall on the left side of the giant pillar by the entrance."
                    },
                    "Poe Room Pot in Middle": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 232, y: 176, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This pot is in the middle of the room on the left side of the two smaller pillars.",
                    },
                    "2 Crates in Middle": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 232, y: 181, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "These crates are in the middle of the room on the left side of the two smaller pillars."
                    },
                    "2 Crates on Left Wall by Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 209, y: 200, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "These crates in the middle of the room on the left side of the two smaller pillars."
                    },
                    "Poe Room Pot on Right Wall by Exit": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 205, y: 177, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "This pot is to the right of the exit door in a very minor alcove."
                    },
                    "2 Crates on Right Wall by Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 205, y: 173, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "These crates are to the right of the exit door in a very minor alcove."
                    }
                }
            },

            inDodongoHead: {
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            // Adult can just jump up; Child needs to blow up a bombflower wall
                            return age === Age.ADULT || Data.hasExplosives();
                        }
                    }
                },

                ItemLocations: {
                    "2 Pots in Boss Door Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 125, y: 118, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 40,
                        LongDescription: "Once in the Dodongo head, look in two of the corners of the next big room for these pots."
                    },
                    "2 Pots in Back Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 194, y: 77, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 41,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise through the first hallway. Once in the next room, the pots will be in the corners to your left and right on the back wall."
                    },
                    "Chest in Back Poe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 196, y: 19, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 42,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise around the rooms. Enter the door near all the Armos statues. In this room, the chest is under the gravestone."
                    },
                    "2 Pots in Back Poe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 199, y: 20, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 43,
                        LongDescription: "Once in the Dodongo head, navigate counter-clockwise around the rooms. Enter the door near all the Armos statues. The pots are on the right wall's corners in this room."
                    },
                    "Skulltula in Back Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 196, y: 59, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 44,
                        LongDescription: "After dealing with all the Armos statues in the Dodongo head, climb up the stairs. Jump to the ledge to get to the skulltula on top."
                    },
                    "Pot After Armos Army": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 176, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 45,
                        LongDescription: "After dealing with all the Armos statues in the Dodongo head, climb the stairs. This is one of the pots to your left before you enter the hallway. The other one will always contain a fairy."
                    }
                }
            },

            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Dodongo's Cavern"]["Boss Entrance"]
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
        Regions: {
            main: {
                Exits: {
                    afterFirstRoom: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Items.FAIRY_SLINGSHOT.playerHas;
                            }
                            return Data.itemLocationObtained("Jabu Jabu's Belly", "main", "Opened First Door");
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Opened First Door": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 173, y: 215, floor: "F1" },
                        Age: Age.CHILD,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 1,
                        LongDescription: "In the first room, shoot the left cow to open the door.",
                        RequiredItems: [Items.FAIRY_SLINGSHOT]
                    },
                    "2 Pots in First Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 165, y: 246, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 2,
                        LongDescription: "These two pots are on the edge of the water in the first room, on opposite sides of each other."
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 173, y: 269, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 3,
                        LongDescription: "In the first room, destroy the yellow rock and hit the switch underneath to spawn the chest.",
                        NeedToBlastOrSmash: true
                    },
                    "Chest in Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 181, y: 279, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 4,
                        LongDescription: "In the first room, shoot the right cow with your slingshot to spawn the chest.",
                        RequiredItems: [Items.FAIRY_SLINGSHOT]
                    }
                }
            },

            afterFirstRoom: {
                Exits: {
                    northernRooms: {
                        RequiredItems: [Items.BOOMERANG],
                        NeedsExplosives: true
                    },

                    afterTentaclesDefeated: {
                        Age: Age.ADULT, // This is if adult cannot equip swap
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Jabu Jabu's Belly", "afterWebBurned", "Tentacles Defeated");
                        }
                    }
                },

                ItemLocations: {
                    "2 Hearts in Elevator Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 162, y: 187, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 5,
                        LongDescription: "These items are between the jellos in the room after the first door. Use the elevator to get to them."
                    },
                    "Chest in Elevator Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 209, y: 221, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 6,
                        LongDescription: "After going through the first door, drop down to the bottom. The chest is by the door."
                    },
                    "Chest in Hidden Water Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 116, y: 229, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 7,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. Shoot the cow in the water behind you after you climb up to spawn the chest."
                    },
                    "2 Pots in Hidden Water Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 116, y: 224, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 8,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. The pots are on the platform."
                    },
                    "3 Rupees in Hidden Water Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Jabu Rupees",
                        MapInfo: { x: 132, y: 229, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 9,
                        LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. The rupees are in the water. You'll need iron boots or silver/gold scales for two of them."
                    },
                    "East Chest in Big Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 205, y: 54, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 10,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the right cow on the wall to spawn this chest."
                    },
                    "West Chest in Big Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 108, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 11,
                        LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the left cow on the wall to spawn this chest."
                    },
                    "Free Chest in Path to Elevator Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 318, y: 134, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 12,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. There is an easily accessible chest in here."
                    },
                    "Enemy Chest in Path to Elevator Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 258, y: 152, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 13,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. Defeat all the enemies in the water to spawn the chest."
                    },
                    "2 Pots in Path to Elevator Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 258, y: 153, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 14,
                        LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. The pots are on the ledge up the vines."
                    },
                    "Skulltula Under Song of Time Block": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 297, y: 147, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 15,
                        LongDescription: "In the path leading to the elevator room, there's a skulltula under the Song of Time block. Play the song to move the block.<br/><br/>If you have the boomerang, you can also aim it to the left and slightly downward to get the skulltula through the block.",
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || 
                                (Settings.GlitchesToAllow.boomerangThroughWalls && Data.canUseBoomerang(age));
                        }
                    }
                }
            },

            northernRooms: {
                Exits: {
                    afterWebBurned: {
                        CustomRequirement: function(age) {
                            return Data.canUseDekuStick(age) || Data.canUseFireItem(age);
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots in Like Like Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 12, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 16,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. The pots are in the back of this room."
                    },
                    "Chest in Like Like Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 195, y: 12, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 17,
                        LongDescription: "In the room beyond the room with holes, enter the next room and go to the right door not blocked by webs. Shoot the cows, then kill the Like Likes that fall to spawn the chest."
                    }
                }
            },

            afterWebBurned: {
                Exits: {
                    afterTentaclesDefeated: {
                        NeedToBlastOrSmash: true
                    }
                },

                ItemLocations: {
                    "Skulltula on Ceiling": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 157, y: 14, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 18,
                        LongDescription: "Using a deku stick to bring a fire from the Like Like room, or a fire item, burn the web to get access to the far west room. After killing the tentacle, head to the far east room and kill that tentacle. Now leave and enter the room to your left. Use the switch and a bomb, or a bombchu to blow up the rock on the ceiling to reveal the skulltula.",
                        CustomRequirement: function(age) {
                            return Data.canUseDekuStick(age) || Data.canUseFireItem(age);
                        }
                    },
                    "Tentacles Defeated": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 172, y: 10, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "This is the task to defeat the three tentacles. This is used to help see what Adult can do if he cannot use the boomerang."
                    }
                }
            },

            afterTentaclesDefeated: {
                Exits: {
                    afterBigOcto: {
                        NeedsSwordWeapon: true,
                        NeedToBlastOrSmash: true
                    }
                },

                ItemLocations: {
                    "Skulltula Behind Web": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 191, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 20,
                        LongDescription: "After destroying all the tentacles, drop down into the big room and enter the door by the vines. The skulltula is in the back of the room. Kill the enemies (some are invisible) or megaflip to cross to the other wide. Burn the web with a fire item.",
                        CustomRequirement: function(age) {
                            let canUseLens = Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas;
                            let canKillEnemies = canUseLens && (age === Age.CHILD || Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas);
                            let canCrossWater = canKillEnemies || Data.canMegaFlip(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas);
                            let canCollectToken = Data.canGrabShortDistances(age) || Data.canStaircaseHover(age);
                            return canCrossWater && canCollectToken;
                        }
                    }
                }
            },

            afterBigOcto: {
                Exits: {
                    bossRoom: {}
                },

                ItemLocations: {
                    "Cow After Big Octo": {
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 108, y: 251, floor: "F2" },
                        Age: Age.CHILD,
                        Order: 21,
                        LongDescription: "After killing Big Octo, ride the elevator up, shoot the cow on the wall, and proceed through the door. The cow is on the ground in the room with the two electric sponges."
                    },
                    "Chest After Big Octo": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 192, y: 188, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 22,
                        LongDescription: "After killing the Big Octo and riding the platform down, you gain access to this chest. Shoot the cow near where the platform landed if you don't see it."
                    },
                    "Chest in Room Before Boss": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 234, y: 175, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 23,
                        LongDescription: "Shoot the left cow in this room to spawn the chest."
                    },
                    "Skulltula in Room Before Boss": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 244, y: 189, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        RequiredItems: [Items.BOOMERANG],
                        Order: 24,
                        LongDescription: "Climb up the vines and use your boomerang to get this skulltula."
                    }
                }
            },

            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Boss Entrance"]
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
        Regions: {
            main: {
                Exits: {
                    afterFirstHallway: {
                        LockedDoor: "Locked Door to Lobby",
                        Map: "Forest Temple",
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Forest Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Chest in Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 188, y: 251, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Climb the vines (it's easier to climb from the left side of the tree) and navigate across the trees to hit the switch to spawn the chest.",
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    },
                    "Skulltula in First Hallway": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 163, y: 193, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        IsAtShortDistance: true,
                        LongDescription: "The skulltula is above the door at the end of the first hallway."
                    },

                    // Locked doors
                    "Locked Door to Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 169, y: 189, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This is the door at the end of the first hallway.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 1 };
                        },
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    },

                    "Locked Door by Twisted Corridor": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterFirstHallway"],
                        MapInfo: { x: 42, y: 198, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "This is the door that's after the block puzzle by the bubbles.",
                        KeyRequirement: function(age) {
                            return { min: 2, max: 2 };
                        }
                    },

                    "Locked Door After Twisted Hallway": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedHallway"],
                        MapInfo: { x: 80, y: 57, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 17.1,
                        LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
                        KeyRequirement: function(age) {
                            return { min: 3, max: 3 };
                        }
                    },

                    "Locked Door in Blue Poe Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["poeRooms"],
                        MapInfo: { x: 282, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "This is the door that's in the blue poe room.",
                        KeyRequirement: function(age) {
                            return { min: 4, max: 4 };
                        }
                    },

                    "Locked Door in Green Bubble Hallway": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedCooridor2"],
                        MapInfo: { x: 319, y: 154, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
                        KeyRequirement: function(age) {
                            return { min: 5, max: 5 };
                        }
                    },

                    "Locked Door in Falling Ceiling Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fallingCeilingRoom", "greenPoeRoom"],
                        MapInfo: { x: 318, y: 132, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "This is the door that's at the end of the falling ceiling room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 6 };
                        }
                    }
                }
            },
            afterFirstHallway: {
                Exits: {
                    roomNorthOfLobby: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    }, 

                    twistedHallway: {
                        Age: Age.ADULT,
                        LockedDoor: "Locked Door by Twisted Corridor",
                        Map: "Forest Temple",
                        CustomRequirement: function(age) {
                            // If you can't push blocks, you MUST do the block skip
                            let hasStrength = Equipment.STRENGTH.playerHas;
                            if (!hasStrength && !Settings.GlitchesToAllow.forestBlockSkip) { return false; } 
                            
                            // Need to either push or skip the blocks
                            let canBlockSkip = Data.hasShield(age) && Items.BOMB.playerHas && Equipment.HOVER_BOOTS.playerHas;
                            return hasStrength || canBlockSkip;
                        }
                    },

                    upperOutside: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.BOMB, Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestJumpToTop;
                        }
                    },

                    outsideEast: {
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age);
                        }
                    },

                    //TOOD: verify this one
                    outsideWest: {
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age);
                        }
                    },

                    greenPoeRoom: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.BOMB, Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestGreenPoeEarly && Data.hasShield(age);
                        }
                    },

                    // Note that all item locations here (and in the boss room) will have IsPostWalkCheck set to true, we need to make sure that we can get to both the
                    // fallingCeilingRoom and the firstPoeRoom in order to actually get here
                    basement: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },

                    bossRoom: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestBKSkip;
                        }
                    }
                },

                ItemLocations: {
                    "3 Pots Left in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 142, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 4,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltulas. the pots are on the ledge to the left."
                    },
                    "3 Pots Right in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 194, y: 164, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 5,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltulas. the pots are on the ledge to the right."
                    },
                    "Skulltula in Block Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 66, y: 171, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Proceed through the main room's western hallway. The skulltula is to the left on the ground level."
                    }
                }
            },
            roomNorthOfLobby: {
                Exits: {},
                ItemLocations: {
                    "Chest North of Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 19, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Proceed straight ahead in the main room. After the hallway, kill the two wolfos to spawn the chest.<br/><br/>If you don't have the song of time, it's possible to get here from the above room. This is the room after the red poe room - drop down before killing the first Stalfos.",
                        NeedsSwordWeapon: true
                    },
                    "Pot North of Main Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 168, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula and into the next door across the big room. The room with the pot is the one after the song of time block (not there as Child). The one on the right is the one you want - the other contains a fairy.<br/><br/>If you don't have the song of time, it's possible to get here from the above room. This is the room after the red poe room - drop down before killing the first Stalfos."
                    }
                }
            },
            twistedHallway: {
                Exits: {
                    upperOutside: {},
                    poeRooms: {
                        LockedDoor: "Locked Door After Twisted Hallway",
                        Map: "Forest Temple"
                    }
                },

                ItemLocations: {
                    "Boss Key": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 66, y: 45, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "After the block puzzle room and the untwisted hallway, jump down to get the boss key chest. Be wary of the Wallmaster!"
                    }
                }
            },
            upperOutside: {
                Exits: {
                    outsideWestHearts: {},
                    outsideWest: {}
                },

                ItemLocations: {
                    "Chest in Redead Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 29, y: 100, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "Fall down the hole in the boss key room. Kill the Floormaster and proceed through the door. Take the first door in one of the small hallways to your right. Kill the redead to spawn the chest."
                    }
                }
            },
            outsideWest: {
                Exits: {
                    outsideEast: { // Via the well - eye switch doesn't matter because the other way in covers that
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    outsideEastPlatform: { // Burn the web, to go through to the top platform
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.MAGIC, Items.FAIRY_BOW, Items.FIRE_ARROW]
                    },
                    outsideWestHearts: {
                        RequiredItems: [Items.BOOMERANG],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.difficultBoomerangTrickThrows;
                        }
                    },
                    well: {}
                },

                ItemLocations: {
                    "Skulltula in Outside West Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 81, y: 124, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Located on top of the platform near the well."
                    }
                }
            }, 
            outsideWestHearts: {
                Exits: {},
                ItemLocations: {
                    "3 Hearts Above Left Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 81, y: 73, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.difficultBoomerangTrickThrows; },
                        Order: 16,
                        LongDescription: "Fall down the hole in the boss key room. Kill the Floormaster and proceed through the door. <br/><br/>The hearts are on the skinny platform that you have to jump to, near the skulltula on the wall. Be careful not to fall off."
                    }
                }
            },
            outsideEast: {
                Exits: {
                    // Excluding east to west because it would require you to have gone through west anyway
                    // OR to already have the means to get there from the lobby

                    outsideEastBalcony: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return Songs.SONG_OF_TIME.playerHas || Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    },
                    well: {}
                },

                ItemLocations: {
                    "Skulltula Above Outside East Door": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 226, y: 98, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        IsAtShortDistance: true,
                        LongDescription: "The skulltula is above the doorframe leading to this room. Get it with your boomerang or hookshot."
                    }
                }
            },
            outsideEastBalcony: {
                Exits: {
                    outsideEast: {},
                    outsideEastPlatform: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestLedgeWithHovers;
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Outside East Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 224, y: 53, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "Hookshot up the doorframe leading to this room. Repeatedly play the Song of Time and jump to the end of the blocks it spawns until you can get to the balcony with the chest.<br/><br/>You can also use the longshot on the vines by the balcony to get up, OR go around from the west room with a fire arrow."
                    }
                }
            },
            outsideEastPlatform: {
                Exits: {
                    fallingCeilingRoom: {
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    }
                },

                ItemLocations: {
                    "Chest on Outside Platform": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 268, y: 73, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "Hit the left switch deep in the checkerbaord room. Now backtrack and take the door to the right of where you entered the room (NOT the locked door). Drop down to get the chest. If you don't have the Song of Time, you'll have to navigate all the way around to get back. Otherwise, play it to make a platform back up."
                    }
                }
            },
            well: { // Just used as its own location, but not to travel between east and west apparently
                Exits: {},
                ItemLocations: {
                    "Chest in Well": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 242, y: 46, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 9,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This chest is in the well. If you can't drain the water with the eye switch (in the well itself from the east room), you can hookshot the chest and spam the button to open it.",
                        CustomRequirement: function(age) {
                            if (Data.canShootEyeSwitch(age)) { return true; }
                            return age === Age.ADULT && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas
                        }
                    },
                    "3 Hearts in Well": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 181, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 10,
                        LongDescription: "This chest is in the well. Use iron boots if you can't drain the water with the eye switch (in the well itself from the east room).",
                        CustomRequirement: function(age) {
                            if (Data.canShootEyeSwitch(age)) { return true; }
                            return age === Age.ADULT && Equipment.IRON_BOOTS.playerHas
                        }
                    },
                    "Skulltula in Well": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 114, y: 34, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This skulltula is on one of the grates in the water of the well (in the well itself from the east room). If you can't shoot the eye switch to drain the water, you can still get the skulltula with iron boots and the hookshot.",
                        CustomRequirement: function(age) {
                            if (Data.canShootEyeSwitch(age)) { return true; }
                            return age === Age.ADULT && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas
                        }
                    }
                }
            },
            poeRooms: {
                Exits: {
                    roomNorthOfLobby: {
                        CustomRequirement: function(age) {
                            // You can jump down the hole in this room to get this chest
                            // This cannot be done if you've already cleared the room, though
                            return !Data.itemLocationObtained("Forest Temple", "poeRooms", "Chest in Stalfos Room");
                        }
                    }, 

                    twistedCooridor2: {
                        LockedDoor: "Locked Door in Blue Poe Room",
                        Map: "Forest Temple"
                    }
                },

                ItemLocations: {
                    "Red Poe Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 52, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 18,
                        RequiredItems: [Items.FAIRY_BOW],
                        LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Shoot the portraits as normal and kill the poe to spawn the chest."
                    },
                    "Chest in Stalfos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 191, y: 65, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Navigate through the Red Poe room and kill the three Stalfos to spawn the chest.<br/><br/>NOTE: If you can't play the song of time, consider dropping down before killing the first stalfos to get a chest that you'll lock yourself out of."
                    },
                    "4 Pots in Upper Stalfos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 192, y: 48, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "These pots are against the walls in the room after the red poe room."
                    },
                    "3 Pots in Blue Poe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 240, y: 43, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "These pots are in the room after the fairy bow chest, just to your left when you enter."
                    },
                    "Blue Poe Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 244, y: 52, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 22,
                        RequiredItems: [Items.FAIRY_BOW],
                        LongDescription: "Head to the blue poe room, which is after the Stalfos room. Shoot the portraits as normal and kill the poe to spawn the chest."
                    },
                }
            },
            twistedCooridor2: {
                Exits: {
                    carouselRoom: {
                        LockedDoor: "Locked Door in Green Bubble Hallway",
                        Map: "Forest Temple",
                    }
                },
                ItemLocations: {}
            },
            carouselRoom: {
                Exits: {
                    fallingCeilingRoom: {
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
                        }
                    }
                },
                ItemLocations: {
                    "2 Crates on Carousel Room Floor": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 331, y: 208, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. The crates are the small ones in the back left corner of the room."
                    },
                    "Crate on Carousel Room Platform": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 298, y: 193, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. The crate is up on the platform to your right."
                    }
                }
            },
            fallingCeilingRoom: {
                Exits: {
                    outsideEastPlatform: {},
                    greenPoeRoom: {
                        LockedDoor: "Locked Door in Falling Ceiling Room",
                        Map: "Forest Temple"
                    }
                },

                ItemLocations: {
                    "Chest in Checkerboard Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 323, y: 104, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "This room is found after twisting the cooridor with the Green Bubbles. Fall down the hole that's now accessible. Once in the room, hit one of the switches in this room to spawn the chest."
                    }
                }
            },
            greenPoeRoom: {
                Exits: {
                    fallingCeilingRoom: {
                        LockedDoor: "Locked Door in Falling Ceiling Room",
                        Map: "Forest Temple"
                    }
                },
                ItemLocations: {
                    "2 Pots in Green Poe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 303, y: 146, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Make your way to the falling ceiling room. Nagivate through it to the green poe room. The pots are by the exit door."
                    }
                }
            },
            basement: {
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            return hasBossKey("Forest Temple");
                        }
                    }
                },

                ItemLocations: {
                    "4 Pots in Basement": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 137, y: 238, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        IsPostWalkCheck: true,
                        LongDescription: "After defeating all the Poes, take the elevator to the basement. Push the wall clockwise once. The pots are in the room guarded by two giant skulltulas.",
                        CustomRequirement: function(age) {
                            return Data.mqForestTempleCanAccessAllPoeRooms(age);
                        }
                    },
                    "Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 143, y: 156, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        IsPostWalkCheck: true,
                        LongDescription: "After defeating all the Poes, take the elevator to the basement. Push the wall counter-clockwise once to get to the chest.",
                        CustomRequirement: function(age) {
                            return Data.mqForestTempleCanAccessAllPoeRooms(age);
                        }
                    }
                }
            },
            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Forest Temple"]["Boss Entrance"]
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
        Regions: {
            main: {
                Exits: {
                    roomBeforeBoss: {
                        Age: Age.EITHER,
                        NeedsFire: true,
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD && !Data.canBombSuperslide(age)) { return false; }
                            return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                        }
                    },

                    lockedAreaByEntrance: {
                        LockedDoor: "Bottom Locked Door in Lobby",
                        Map: "Fire Temple"
                    },

                    cellByEntrance: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    },

                    bigLavaRoom: {
                        Age: Age.EITHER,
                        RequiredItems: [Items.MEGATON_HAMMER],
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD && !Data.canBombSuperslide(age)) { return false; }
                            return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                        }
                    },

                    Exit: {
                        OwExit: OwExits["Fire Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "2 Pots by Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 99, y: 250, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "The pots are to your left and right in the corners as you enter the temple."
                    },
                    "Like-Like Chest By Entrance": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 123, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        NeedsDamagingItem: true,
                        LongDescription: "Enter the left door by the entrance. Kill the Like-Like to spawn the chest."
                    },

                    // Locked Doors
                    "Bottom Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 126, y: 214, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "This is the locked door on the right side of the lobby.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: Keys.FIRE_TEMPLE.mqTotalKeys() };
                        },
                    },

                    "Locked Door in Big Lava Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["bigLavaRoom"],
                        MapInfo: { x: 256, y: 202, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap;
                        },
                        Order: 18,
                        LongDescription: "This is the locked door on the far side of the big lava room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 2 };
                        },
                    },

                    "Locked Door Above Boulder Maze": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["boulderMazeTop"],
                        MapInfo: { x: 277, y: 121, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "This is the locked door on the top of the boulder maze.",
                        KeyRequirement: function(age) {
                            return { min: 2, max: 3 };
                        },
                    },

                    "Locked Door After Flare Dancer": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fireWallMaze"],
                        MapInfo: { x: 39, y: 179, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "This is the locked door after riding the elevator up from the Flare Dancer fight.",
                        KeyRequirement: function(age) {
                            return { min: 3, max: 4 };
                        },
                    },

                    "Locked Door Under Hammer Floor": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomAfterTopOfTemple"],
                        MapInfo: { x: 71, y: 136, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "This is the locked door after pounding the floor down at the top of the temple.",
                        KeyRequirement: function(age) {
                            return { min: 4, max: 5 };
                        }
                    }
                }
            },

            roomBeforeBoss: {
                Exits: {
                    bossRoom: {
                        Age: Age.EITHER,
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT || Data.canMegaFlip(age)) && hasBossKey("Fire Temple");
                        }
                    }
                },

                ItemLocations: {
                    "2 Left Crates in Room Before Boss": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 40, y: 253, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper left corner to the crates."
                    },
                    "4 Right Crates in Room Before Boss": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 37, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner to the crates.<br/><br/>If child, climb the block with the torch in it from the back right corner. Hold forward to jump up the ledge. Use the first ledge box to get to the second one before you break it.",
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    "2 Pots in Room Before Boss": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 33, y: 161, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner to the pots.",
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    "Chest in Room Before Boss": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 36, y: 263, floor: "F1" },
                        Region: "roomBeforeBoss",
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room, navigate to the upper right corner. Roll into a box to break it to reveal a torch. Light all 3 torches in the room to open the gate to the chest.",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas;
                        }
                    }
                }
            },

            lockedAreaByEntrance: {
                Exits: {
                    cellByEntrance: {
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                },
                ItemLocations: {
                    "4 Pots by Iron Knuckle": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 107, y: 38, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "Enter the locked door to the right when you first enter the temple. Defeat the stalfos and proceed. The pots are in the next room - the four you want are the two in the very back, and the two by the door. The rest contain fairies.",
                        NeedsDamagingItem: true
                    },
                    "Chest After First Flare Dancer": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 57, y: 60, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.groundJump;
                        },
                        Order: 9,
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Items.MEGATON_HAMMER, Items.BOMB, Items.BOMBCHU],
                        RequiredChoiceOfChildItems: [Items.MEGATON_HAMMER, Items.BOMB, Items.BOMBCHU],
                        LongDescription: "Enter the locked door to the right when you first enter the temple. Navigate around the rooms, defeating the enemies to progress (including an Iron Knuckle). Defeat the Flare Dancer to spawn the chest.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Data.canGroundJumpWithBomb(age);
                        }
                    }
                }
            },

            cellByEntrance: {
                Exits: {},
                ItemLocations: {
                    "Chest by Goron After Flare Dancer": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 110, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap;
                        },
                        Order: 10,
                        LongDescription: "After the Flare Dancer, enter the next room. Hit the rusted switch with the hammer to gain access to this chest."
                    }
                }
            },

            bigLavaRoom: {
                Exits: {
                    cellBelowBoulderMaze: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    },
                    risingBlockRoom: {
                        LockedDoor: "Locked Door in Big Lava Room",
                        Map: "Fire Temple",
                        Age: Age.ADULT
                    },
                },

                ItemLocations: {
                    "Left Pot in Big Lava Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 204, y: 150, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap;
                        },
                        Order: 11,
                        LongDescription: "The pot is near the door on the left side of the big lava room."
                    },
                    "Skulltula by Left Goron in Lava Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 280, y: 139, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap;
                        },
                        Order: 12,
                        LongDescription: "Go to the left side of the big lava room. Hammer the switch to gain access to the skulltula."
                    },
                    "Pot on Big Lava Room Ledge": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 227, y: 162, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap;
                        },
                        Order: 13,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Along the back left wall is a platform that will rise up to an alcove after you jump on it. The pot is there."
                    },
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 174, y: 85, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 14,
                        NeedsFire: true,
                        LongDescription: "Light the two torches - one is on a platform you need to ride up to, and the other is by the door on the left side of the room. Now you can enter the door above the left goron room to get to the room with the chest. Hookshot the torch or chest to get to it, or hold forward to jump up slightly and then jumpslash over the fire (easiest on the rightmost side).",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || Settings.GlitchesToAllow.fireSoTBlockJump;
                        }
                    },
                    "2 Pots in Boss Key Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 162, y: 102, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 15,
                        NeedsFire: true,
                        LongDescription: "Light the two torches - one is on a platform you need to ride up to, and the other is by the door on the left side of the room. Now you can enter the door above the left goron room to get to the room with the chest. Hookshot the torch or chest to get to the pots, or hold forward to jump up slightly and then jumpslash over the fire (easiest on the rightmost side).",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || Settings.GlitchesToAllow.fireSoTBlockJump;
                        }
                    },
                    "Right Pot in Big Lava Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 190, y: 263, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap ||
                                !Settings.GlitchesToAllow.groundJump;
                        },
                        Order: 16,
                        LongDescription: "Either hookshot to the torch on the right side of the lava room, or do an angled jump from the moving platform to get over the fire wall. The pot is by the blocked doorway."
                    },
                    "Chest by Right Goron in Lava Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 202, y: 287, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.bombSuperslide ||
                                !Settings.GlitchesToAllow.equipSwap ||
                                !Settings.GlitchesToAllow.groundJump;
                        },
                        Order: 17,
                        NeedsExplosives: true,
                        NeedsFire: true,
                        LongDescription: "Either hookshot to the torch on the right side of the lava room, or do an angled jump from the moving platform to get over the fire wall. Bomb the blocked doorway to enter. Use a fire item to light the torches outside the jail. The chest is by the goron."
                    }
                }
            },

            risingBlockRoom: {
                Exits: {
                    boulderMaze: {
                        NeedsFire: true
                    }
                },
                ItemLocations: {
                    "3 Hearts in Rising Block Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 293, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.equipSwap ||
                                !Settings.GlitchesToAllow.bombSuperslide;
                        },
                        LongDescription: "Open the locked door on the other side of the big lava room. The hearts are on either side at the very top and in the middle of the room where you jump to the block."
                    }
                }
            },

            boulderMaze: {
                Exits: {
                    boulderMazeTop: {
                        NeedsExplosives: true,
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },

                ItemLocations: {
                    "3 Crates Behind Bars in Bottom Maze": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 318, y: 211, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "In the maze, there's a switch behind some metal bars. Use a jumpslash to hit it to open the cell to access the crates."
                    },
                    "Chest Behind Bars in Bottom Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 321, y: 212, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "In the maze, there's a switch behind some metal bars. Use a jumpslash to hit it. The chest is in one of the crates."
                    }
                }
            },

            boulderMazeTop: {
                Exits: {
                    aboveBoulderMaze: {
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    roomWithLavaAndGrates: {
                        LockedDoor: "Locked Door Above Boulder Maze",
                        Map: "Fire Temple"
                    },
                    cellBelowBoulderMaze: {}
                },

                ItemLocations: {
                    "Chest on Maze Top": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 300, y: 221, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "In the northeast area of the maze, find the fake wall and bomb it. Hammer the switch inside. Hookshot up one of the targets that appear and make your way toward the crystal switch. Trigger it (jumpslash, spin attack, Din's, explosive, etc.). The chest is hidden in one of the crates."
                    },
                    "3 Crates on Maze Top": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 297, y: 217, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "Navigate to the cell on the top of the maze. Bomb or jumpslash the switch (then come back up) to open it. The crates are inside. Don't break the small crates if you wish to use them (they have no items)!"
                    },
                    "Goron by Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 283, y: 52, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "In the north section of the maze, there's a wall you can bomb. Grab one of the crates from the room at the top of the maze and put it on the switch. The chest is through the door, by the goron as usual."
                    }
                }
            },

            cellBelowBoulderMaze: {
                Exits: {},
                ItemLocations: {
                    "6 Crates in Hole Under Maze": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 135, y: 105, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "Bomb the crack in the floor on top of the maze. The crates are down the hole."
                    },
                    "Chest in Hole Under Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 164, y: 97, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "Bomb the crack in the floor on top of the boulder maze. Break some crates to reveal a rusted switch. Hammer it to gain access to the chest."
                    }
                }
            },

            aboveBoulderMaze: {
                Exits: {
                    narrowBridgeRoom: {}
                },
                ItemLocations: {
                    "Skulltula on Very Top": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 219, y: 147, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "On top of the boulder maze, play the Song of Time by the bombable pit. Navigate upwards via climbing and the hookshot). After the green room, make your way around the room and hammer the rusted switch by the fire circle. Now jump down and hit the switch. Use the new hookshot target to quickly get up and pull the block away. The skulltula is underneath."
                    }
                }
            },

            narrowBridgeRoom: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in Narrow Bridge Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 293, y: 155, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Make your way to the scary room with the giant pit either from the lava room with grates, or by falling from the room at the very top."
                    }
                }
            },

            roomWithLavaAndGrates: {
                Exits: {
                    narrowBridgeRoom: {},
                    fireWallMaze: {
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                },
                ItemLocations: {
                    "2 Crates in Right Lava Grate Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 265, y: 110, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "These crates are on the right side of the room with lava and grates."
                    },
                    "Crate in Central Lava Grate Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 248, y: 133, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "This crate is on the little island in the center of the room with lava and grates."
                    },
                    "2 Pots in Left Lava Grate Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 271, y: 179, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "These pots are on the left side of the room with lava and grates, by the door to the narrow bridge room."
                    },
                    "Crate in Left Lava Grate Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 265, y: 176, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "This crate is on the left side of the room with lava and grates. Go to the door to the narrow bridge room and climb up the small ledge to get access to the crate."
                    },
                    "Crate by Lava Grate Room Exit": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 212, y: 176, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "This crate is near the exit of the lava grate room (the one leading to the fire wall maze)."
                    }
                }
            },

            fireWallMaze: {
                Exits: {
                    fireWallMazeRight: {
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) ||
                                Equipment.HOVER_BOOTS.playerHas ||
                                Data.canMegaFlip(age);
                        }
                    },
                    fireWallMazeEnd: {
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },

                ItemLocations: {
                    "Pot in Left Fire Wall Maze": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 87, y: 215, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Navigate around the lava room and grab a small box. Enter the encaged area and place the box on the blue switch to light some torches. Hookshot the box to get back up. Use your bow to shoot though one of the torches to light a high up torch on the wall. Go through the door to continue.<br/><br/>Navigate around the fire wall maze to the left until you find the pot (the second one contains a fairy)."
                    },
                    "Skulltula in Center of Maze": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 124, y: 162, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "From the entrance of the fire wall room - make your way to the door in front of you and enter it. In this room, get to the next door by jumping on the Song of Time Block. Hookshot across the room and hit the switch with your hammer to unbar the doors.<br/><br/>Now navigate through the maze to the southernmost door. Once inside, bomb the fake wall by the scratching sounds to get to the skulltula."
                    }
                }
            },
            
            fireWallMazeRight: {
                Exits: {
                    fireWallMazeEnd: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireWallSkip;
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots in Fire Wall Maze Right": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 102, y: 108, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "From the start of the fire wall maze, climb up to the door in front of you. Look to the left - either play Song of Time, or use hover boots to cross the fire wall. The pots are in this maze. You can use the Song of Time block by the door on the wall to get out of this section."
                    },
                    "Skulltula in Fire Wall Maze": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 194, y: 79, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "From the start of the fire wall maze, climb up to the door in front of you. Look to the left - either play Song of Time, or use hover boots to cross the fire wall. The skulltula is in the room in this section. You can use the Song of Time block by the door to get out."
                    }
                }
            },

            fireWallMazeEnd: {
                Exits: {
                    topOfTemple: {
                        LockedDoor: "Locked Door After Flare Dancer",
                        Map: "Fire Temple"
                    }
                },
                ItemLocations: {
                    "2 Pots by Fire Maze Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 76, y: 144, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "By the exit to the fire maze (after you hit the switch to pass the giant fire wall), there are 2 pots to either side of the door."
                    },
                    "Freestanding Key in Flare Dancer Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 37, y: 178, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "Proceed from the center of the maze. Hit the switch to lower the fire wall. Enter the next room and kill the Flare Dancer. Jump on the center platform to make it rise, but immediately get off. The item should be where the platform used to be."
                    }
                }
            },

            topOfTemple: {
                Exits: {
                    roomAfterTopOfTemple: {
                        LockedDoor: "Locked Door Under Hammer Floor",
                        Map: "Fire Temple"
                    }
                },
                ItemLocations: {
                    "Chest at Top of Temple": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 43, y: 157, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "From the Flare Dancer room - make your way through the next room. Hit the switch on the ground somewhat near the chest with the fire wall to lower the wall. The Scarecrow's Song can help you get to it quicker, but it's not required."
                    }
                }
            },

            roomAfterTopOfTemple: {
                Exits: {},
                ItemLocations: {
                    "Skulltula after Top of Temple": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 208, y: 227, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "From the top of the temple, hammer the face block to continue on. Kill the Stalfos and continue to the next room (you need to hookshot one of the faces to unbar the door). The skulltula is in this room."
                    }
                }
            },

            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Fire Temple"]["Boss Entrance"]
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
                Exits: {
                    lowEastWingPots: {
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    midSouthRoomPots: {
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    behindGateInMidSouthRoom: {
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    lowWaterLevel: {
                        RequiredItems: [Equipment.IRON_BOOTS],
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    centralRoom: {
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    roomBeforeDarkLink: {
                        RequiredItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return getKeyCount("Water Temple") >= 1;
                        }
                    },
                    bossRoom: {
                        CustomRequirement: function(age) {
                            if (!hasBossKey("Water Temple")) { return false; }
                
                            let hasLongshot = Items.HOOKSHOT.currentUpgrade === 2;
                            let canSkipLongshot = Data.canHammerHoverBootsSuperslide(age);
                            let canGetToBossArea = hasLongshot || canSkipLongshot;
                            if (!canGetToBossArea) { return false; }
                            
                            return Items.HOOKSHOT.playerHas;
                        }
                    },

                    Exit: {
                        OwExit: OwExits["Water Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Chest Above Low East Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 131, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 4,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Put them back on when you reach the very next floor. Navigate through the hole in the wall. Now, hookshot the back wall to spawn the chest. To open it, hookshot the front then spam A.",
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    "Chest by Low Water Triforce": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 334, y: 222, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 5,
                        LongDescription: "Use your iron boots and navigate through the lower eastern room. Take them off to rise to the top to get to the triforce room. Use a fire item to light the torches in the four corners of the room to unbar the door.<br/><br/>Enter the next room and optionally defeat all the Stalfos to unbar the door. The chest is spawned by hitting the back wall with the hookshot.",
                        NeedsFire: true,
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    "3 Crates in Mid South Hallway": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 237, y: 195, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "Make your way to the mid south wing - you'll need to press the switch to open the gate. Bonk into the crates to break them. Two of them are before the jail cell, and one is just to the left of it.",
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    "5 Crates in Mid South Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "5 Crates",
                        MapInfo: { x: 245, y: 241, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "Make your way to the mid south wing - you'll need to press the switch to open the gate. Navigate to the room to the right of the jail cell and bonk into the crates to break them.",
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    "4 Pots in Mid East Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 283, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "Go to the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there, then hookshot up. Once at the surface, look in the corner of the room for the pots.",
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    "7 Crates in Mid East Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "7 Crates",
                        MapInfo: { x: 315, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "Go to the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there, then hookshot up. Once at the surface, the crates are the big ones all around the room.",
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    }
                }
            },
            lowWaterLevel: {
                Exits: {
                    lowEastWingPots: {},
                    midSouthRoomPots: {},
                    midWaterLevel: {},
                    behindGateInMidSouthRoom: {
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            return Items.HOOKSHOT.playerHas || canUseDins;
                        }
                    }
                },
                ItemLocations: {
                    "Chest in Lower East Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 338, y: 212, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "Lower the water level. Navigate to the room below the water triforce. Light the torches using a fire item or your bow.<br/><br/>Defeat the enemies in the next room to spawn the chest",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Items.FAIRY_BOW.playerHas;
                        }
                    }
                }
            },
            lowEastWingPots: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in Low East Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 287, y: 213, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "These pots are by the door in the lower eastern wing. Either use iron boots and the hookshot the break them, or drain the water."
                    }
                }
            },
            midSouthRoomPots: {
                Exits: {},
                ItemLocations: {
                    "Pot in Mid South Hallway": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 234, y: 205, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "Make your way to the mid south room - you'll need to press the switch to open the gate. If the water isn't drained, you'll need to use your hookshot the break this hallway pot."
                    },
                    "2 Pots in Mid South Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 250, y: 248, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "Make your way to the mid south room - you'll need to press the switch to open the gate. Make your way to the room to the left of the jail. If the water isn't drained, you'll need to use your hookshot the break the two pots in here."
                    }
                }
            },
            behindGateInMidSouthRoom: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in Mid South Jail": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 259, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 12,
                        LongDescription: "At any water level (mid is easiest), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the pots behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in. To get out, target the jail and hookshot while holding Z and right while next to the torch."
                    },
                    "2 Crates in Mid South Jail": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 270, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "At any water level (mid is easiest), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the crates behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in. To get out, target the jail and hookshot while holding Z and right while next to the torch."
                    },
                    "Skulltula in Mid South Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 270, y: 203, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "At any water level (mid is easiest), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the skulltula behind the cell.<br/><br/>Without a fire item, stand in front of the torch and hookshot it. You can now just walk in. To get out, target the jail and hookshot while holding Z and right while next to the torch."
                    }
                }
            },
            midWaterLevel: {
                Exits: {},
                ItemLocations: {
                    "6 Crates in Mid West Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 41, y: 116, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. The crates are in this room.",
                    },
                    "3 Pots in Mid West Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 41, y: 155, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 18,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. The pots are against the wall to the left."
                    },
                    "2 Crates Above Mid West Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 165, y: 247, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. In this room, break the box to your left and hit the switch. Now, hookshot up to the next floor and break the crates.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Skulltula Above Mid West Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 160, y: 247, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. In this room, break the box to your left and hit the switch. Now, hookshot up to the next floor. The skullula is in one of the boxes.",
                        RequiredItems: [Items.HOOKSHOT]
                    }
                }
            },
            centralRoom: {
                Exits: {
                    underCentralRoom: {
                        RequiredItems: [Equipment.IRON_BOOTS],
                        CustomRequirement: function(age) {
                            let tunicCheck = Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                            let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
                            let canUseDinsFire = Items.DINS_FIRE.playerHas && Equipment.MAGIC.playerHas;
                            let canLightTorches = canUseFireArrows || (Data.canPlaySong(Songs.SONG_OF_TIME) && canUseDinsFire);
                            return tunicCheck && canLightTorches;
                        }
                    }
                },
                ItemLocations: {
                    "2 Crates in Upper Central Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 170, y: 211, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 1,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top - the crates are on a platform."
                    }
                }
            },
            underCentralRoom: {
                Exits: {},
                ItemLocations: {
                    "14 Crates Below Central Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "14 Crates",
                        MapInfo: { x: 185, y: 165, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 2,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom. The crates are all around!"
                    },
                    "Chest Below Central Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 291, y: 214, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 3,
                        LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom.<br/><br/>Once here, navigate around the maze. Jump on some platforms at the very end to reveal a switch. Hit it, and then navigate to the grate that opens up and hookshot your way up there. Hookshot the wall to spawn the chest.",
                        RequiredItems: [Items.HOOKSHOT]
                    }
                }
            },
            roomBeforeDarkLink: {
                Exits: {
                    whirlpoolRoom: {}
                },
                ItemLocations: {
                    "Pot in Lower Rising Dragon Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 40, y: 193, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door.<br/><br/>Jump down and kill the three stalfos, then use your hookshot to navigate to the pots. Only the middle one will have an item."
                    },
                    "2 Pots in Upper Dragon Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 55, y: 161, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door.<br/><br/>Jump down and kill the three stalfos, then use your hookshot to navigate to the exit door - the pots are on either side of it."
                    },
                    "Pot in Room After Dark Link": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 58, y: 43, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "After the Dark Link fight, enter the next room. The pot is the one on the right - the left one will contain a fairy."
                    }
                }
            },
            whirlpoolRoom: {
                Exits: {
                    dragonRoom: {}
                },

                ItemLocations: {
                    "Skulltula in Whirlpool Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 37, y: 146, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "With the water at its highest, navigate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door. Jump down and kill the three stalfos, then use your hookshot to get through the next room, and then defeat Dark Link. Hookshot the wall in the next room to reach the whirlpool room.<br/><br/>Use your iron boots or longshot across the river until you hear the skulltula. Get it with your hookshot or longshot.",
                        RequiredChoiceOfItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    "Pot in Whirlpool Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 49, y: 160, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "After the Dark Link fight, enter the next room. Hit the back wall with your hookshot to open the way. The pot is the left one at the end of the river - the right one contains a fairy."
                    }
                }
            },
            dragonRoom: {
                Exits: {
                    singleWaterPillarRoom: {
                        NeedsFire: true,
                        RequiredChoiceOfItems: [Equipment.IRON_BOOTS, Equipment.SCALE]
                    }
                },
                ItemLocations: {
                    "4 Underwater Crates in Dragon Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 53, y: 62, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "In the whirlpool dragon room, use your iron boots to sink to the little hallway behind the dragon where the crates reside.",
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    "2 Crates Behind Dragon Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 33, y: 62, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "In the whirlpool dragon room, use your iron boots or silver scale to go past the little hallway behind the dragon. The crates the big ones on the surface in the next room.",
                        RequiredChoiceOfItems: [Equipment.IRON_BOOTS, Equipment.SCALE]
                    },
                    "2 Crates by Dragon Room Door": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 95, y: 61, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "These crates are by the door leading out of the whirlpool dragon room. You get there by going through the rooms from the upper west path from the lobby."
                    }
                }
            },
            singleWaterPillarRoom: {
                Exits: {
                    afterSingleWaterPillarRoomGate: {
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            let canWeirdShot = Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2;
                            return canUseDins || canWeirdShot;
                        }
                    }
                },
                ItemLocations: {
                    "Pot in Upper Single Water Pillar Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 102, y: 95, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The pot is to your left in the next room."
                    },
                    "Crate in Upper Single Water Pillar Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 89, y: 95, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The crate is to your right in the next room."
                    },
                    "4 Crates in Lower Single Water Pillar Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 95, y: 111, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. The crates are in the pit."
                    }
                }
            },
            afterSingleWaterPillarRoomGate: {
                Exits: {
                    bottomGateSwitch: {
                        RequiredItems: [Equipment.IRON_BOOTS]
                    }
                },
                ItemLocations: {
                    "Chest Behind Single Water Pillar Gate": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 95, y: 126, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "Navigate around the whirlpool room. In the room with the dragon, use your iron boots or silver scale to navigate to the back. Light the torches on the walls to unbar the door. In the next room, stand on the water pillar and hit the crystal switch to raise the pillar. Use Din's fire to lower the gate so you can get to the chest."
                    }
                }
            },
            bottomGateSwitch: {
                Exits: {
                    upperTripleTorchRoom: {
                        RequiredItems: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.IRON_BOOTS, Equipment.MAGIC],
                        CustomRequirement: function(age) {
                            return Data.canHookScarecrow(age) || Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    roomAfterSpikes: {
                        RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
                    }
                },
                ItemLocations: {
                    "6 Underwater Crates in Low South Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 86, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, use your iron boots to get to the low south area. The crates are underwater in the corners of the next room."
                    }
                }
            },
            upperTripleTorchRoom: {
                Exits: {},
                ItemLocations: {
                    "4 Pots in Low South Room Jail": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 24, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the pots."
                    },
                    "3 Crates in Low South Room Jail": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 27, y: 252, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the crates."
                    },
                    "Skulltula in Low South Room Jail": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 30, y: 261, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the skulltula (it's on the ceiling).",
                        IsAtShortDistance: true
                    }
                }
            },
            roomAfterSpikes: {
                Exits: {
                    dodongoRoom: {
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    northWaterfallArea: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterBKShortcut || Data.canHookScarecrow(age);
                        }
                    }
                },
                ItemLocations: {
                    "2 Crates in Low North Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 192, y: 104, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom north room. Cross it with your longshot or hover boots (jumpslash, or backwalk/backflip). The crates are in the next room."
                    },
                    "6 Underwater Crates in Low North Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 192, y: 76, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom north room. Cross it with your longshot or hover boots (jumpslash, or backwalk/backflip). The crates are under the water in the next room."
                    },
                    "4 Crates Behind Low North Room Gate": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 191, y: 50, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes.<br/><br/>Once in this room, navigate to the farthest box in the back of the room and use your iron boots to sink down onto it. Hookshot the center of the ceiling, around the second brick texture to hookshot an unintended hookshot target to get over the gate where the crates reside.<br/><br/>The intended path involves going around the rooms to your left, through the waterfall entrance. You'd either spawn the scarecrow, or do the glich to get across."
                    },
                    "Skulltula Behind Low North Room Gate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 185, y: 50, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes.<br/><br/>Once in this room, navigate to the farthest box in the back of the room and use your iron boots to sink down onto it. Hookshot the center of the ceiling, around the second brick texture to hookshot an unintended hookshot target to get over the gate. The skulltula would be to your left.<br/><br/>The intended path involves going around the rooms to your left, through the waterfall entrance. You'd either spawn the scarecrow, or do the glich to get across."
                    }
                }
            },
            dodongoRoom: {
                Exits: {
                    northWaterfallArea: {}
                },
                ItemLocations: {
                    "2 Pots in Low North Dodongo Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 298, y: 23, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find the pots along the back-right wall."
                    },
                    "3 Crates in Low North Dodongo Room Pit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 276, y: 41, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find the crates in the pit with the dodongos."
                    },
                    "Crate in Low North Dodongo Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 255, y: 24, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find this crate on the left ledge in the corner of the room."
                    },
                    "Crate in Low North Dodongo Room Hallway": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 301, y: 67, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "In the dodongo room (room beyond the gate in the low north room), you'll find this crate in the little tunnel in one of the corners."
                    }
                }
            },
            northWaterfallArea: {
                Exits: {
                    dodongoRoom: {
                        NeedsFire: true
                    }
                },
                ItemLocations: {
                    "Pot in Room by Low North Waterfall": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 129, y: 53, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 45,
                        LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes. Play the Scarecrow's song and hookshot it to get to the opening to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The pot is in the back right corner of the room (the other one is a fairy).",
                    },
                    "5 Crates in Room by Low North Waterfall": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "5 Crates",
                        MapInfo: { x: 124, y: 60, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 46,
                        LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes. Play the Scarecrow's song and hookshot it to get to the opening to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The crates are along the walls in the room.",
                    },
                    "Freestanding Item in Room by Low North Waterfall": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 115, y: 64, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 47,
                        LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes. Play the Scarecrow's song and hookshot it to get to the opening to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The item is in the box to your left."
                    }
                }
            },
            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Water Temple"]["Boss Entrance"]
                    }
                },
                ItemLocations: {
                    "Blue Warp": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Age: Age.ADULT,
                        IsBoss: true,
                        Order: 99,
                        MapInfo: { x: 227, y: 145, floor: "F3" },
                        LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
                        RequiredToAppear: function() { return false; } //TODO: maybe clean this up so this item isn't necessary anymore
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
        Regions: {
            main: {
                Exits: {
                    truthSpinnerRoom: {
                        CustomRequirement: function(age) {
                            let lensCheck = Settings.GlitchesToAllow.shadowLensless || (Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas);
                            if (!lensCheck) { return false; }
                            
                            let canCrossFirstGap = 
                                (age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas)) ||
                                Data.canMegaFlip(age);
                            return canCrossFirstGap;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Shadow Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    // Locked Doors - note that we're assuming that you won't use keys on doors that will break sequence if the gate clip is on
                    "Locked Door by Truth Spinner": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["truthSpinnerRoom"],
                        MapInfo: { x: 125, y: 152, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip },
                        LongDescription: "This is the door behind the explodable wall in the truth spinner room.",
                        NeedsExplosives: true,
                        KeyRequirement: function(age) {
                            return { min: 1, max: 6 };
                        }
                    },
                    "Locked Door by Beamos": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterTruthSpinner"],
                        MapInfo: { x: 330, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip},
                        LongDescription: "This is the door near the beamos after the truth spinner room.",
                        KeyRequirement: function(age) {
                            let max = Settings.GlitchesToAllow.shadowGateClip ? 6 : 2;
                            return { min: 1, max: max };
                        }
                    },
                    "Locked Door in Giant Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["rightSideOfGiantRoom"],
                        MapInfo: { x: 157, y: 93, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "This is the locked door on the right side of the giant room.",
                        KeyRequirement: function(age) {
                            let max = Settings.GlitchesToAllow.shadowGateClip ? 6 : 3;
                            return { min: 2, max: max };
                        }
                    },
                    "Locked Door in Invisible Spike Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["invisibleSpikeRoom", "windHallway"],
                        MapInfo: { x: 156, y: 46, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "This is the locked door in the room with the invisible spikes.",
                        KeyRequirement: function(age) {
                            let max = Settings.GlitchesToAllow.shadowGateClip ? 6 : 4;
                            let min = Settings.GlitchesToAllow.shadowGateClip ? 2 : 3;
                            return { min: min, max: max };
                        }
                    },
                    "Locked Door After Fans": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["windHallway", "boatRoom"],
                        MapInfo: { x: 303, y: 131, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "This is the locked door in the Gibdos room after all the fans.",
                        KeyRequirement: function(age) {
                            let max = Settings.GlitchesToAllow.shadowGateClip ? 6 : 5;
                            let min = Settings.GlitchesToAllow.shadowGateClip ? 1 : 4;
                            return { min: min, max: max };
                        }
                    },
                    "Locked Door in Invisible Wall Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["invisibleWallRoom"],
                        MapInfo: { x: 90, y: 79, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "This is the locked door in the invisible wall room.",
                        KeyRequirement: function(age) {
                            let min = Settings.GlitchesToAllow.shadowGateClip ? 1 : 5;
                            return { min: min, max: 6 };
                        }
                    }
                }
            },
            truthSpinnerRoom: {
                Exits: {
                    mazeByEntrance: {
                        LockedDoor: "Locked Door by Truth Spinner",
                        Map: "Shadow Temple",
                        NeedsExplosives: true
                    },
                    afterTruthSpinner: {
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) { return true; }
                
                            let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
                            return canUseFireArrows || Equipment.HOVER_BOOTS.playerHas;
                        }
                    }
                },
                ItemLocations: {
                    "4 Crates by Truth Spinner": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 139, y: 169, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "These are the small crates by the truth spinner in the first main room of the temple, against the wall."
                    }
                }
            },
            mazeByEntrance: {
                Exits: {
                    mazeBack: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots in Redead Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 107, y: 108, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "After entering the truth spinner room, navigate to the Eye of Truth symbol on the lower left wall. Bomb it to open up the path. Use a key to enter the maze. Head right through the invisible wall. The chests are in the back right corner of the next room."
                    },
                    "Redead Chest in Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 101, y: 108, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "After entering the truth spinner room, navigate to the Eye of Truth symbol on the lower left wall. Bomb it to open up the path. Use a key to enter the maze. Head right through the invisible wall. Kill the enemies to spawn the chest."
                    },
                    "2 Flying Pots in Front Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 102, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "In the left (south) part of the first maze loop from the entrance, these two pots will fly at you."
                    },
                    "2 Pots in Front Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 92, y: 153, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        Order: 6,
                        LongDescription: "These pots are marking the Song of Time block in the first maze loop - loop around to the other side from the door to find them."
                    }
                }
            },
            mazeBack: {
                Exits: {},
                ItemLocations: {
                    "2 Flying Pots in Back Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 65, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "If adult, play the Song of Time by the wall marked by the two pots to advance to the next maze section. On the left side with the eyes, these pots will fly at you."
                    },
                    "Dead Hand Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 14, y: 143, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "In the maze by the entrance, navigate around to the other side of the first room. Play the Song of Time to remove the block in the way (invisible without the lens). In the next room, shoot the middle eye. Now you can enter the northwest door. Kill Dead Hand to spawn the chest.",
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                }
            },
            afterTruthSpinner: {
                Exits: {
                    afterBeamos: {
                        LockedDoor: "Locked Door by Beamos",
                        Map: "Shadow Temple",
                        NeedsExplosives: true
                    },

                    boatRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowGateClip;
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 345, y: 122, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Gather all the rupees to open the cell to the chest.",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || 
                                Equipment.HOVER_BOOTS.playerHas || 
                                Settings.GlitchesToAllow.shadowSilverRupeeWithNothing;
                        }
                    },
                    "Invisible Chest Under Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 278, y: 122, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 10,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "Facing away from the door into the scythe room, go to the upper right room and fall down the invisible hole. There is an invisible chest to the right of the climbable wall."
                    },
                    "Chest in Early Gibdos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 301, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Kill the enemies to spawn the chest."
                    }
                }
            },
            afterBeamos: {
                Exits: {
                    rightSideOfGiantRoom: {
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canMegaFlip(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas)
                        }
                    }
                },

                ItemLocations: {
                    "2 Hearts in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 331, y: 123, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). The hearts are in the back left corner. Play the Song of Time to spawn a block to get them.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "Visible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 343, y: 138, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "Invisible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 343, y: 142, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest - it's next to the visible one.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    }
                }
            },
            rightSideOfGiantRoom: {
                Exits: {
                    invisibleSpikeRoom: {
                        LockedDoor: "Locked Door in Giant Room",
                        Map: "Shadow Temple",
                        RequiredItems: [Equipment.HOVER_BOOTS]
                    }
                },

                ItemLocations: {
                    "Chest in Giant Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 138, y: 241, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "In the giant room, use a fire item to hit the frozen eye switch. This will spawn some platforms in the direction the eye is facing. Use them to get to the right side of the room. Once there, gather all the silver rupees to spawn the chest. Two of them are up high and requires the longshot.",
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}],
                    },
                    "Skulltula in Falling Spikes Room": { 
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 53, y: 237, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "Get to the right side of the giant room. Hit the switch behind the gate to open it to get to the falling spike room. In the first cell to the left is the skulltula.",
                        CustomRequirement: function(age) {
                            return Data.canGrabShortDistances(age) || Data.canStaircaseHover(age);
                        }
                    },
                    "Bottom Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 36, y: 213, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 18,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "This chest is in the first cell to the right in the falling spike room."
                    },
                    "Top Switchless Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 17, y: 239, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. The chest is in the southeast corner.",
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.playerHas || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    },
                    "Top Switch Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 76, y: 209, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. Press the switch to spawn the chest.",
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.playerHas || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    },
                    "2 Upper Pots in Falling Spikes Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 82, y: 209, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. The pots are above the hidden block's alcove.",
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.playerHas || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    }
                }
            },
            invisibleSpikeRoom: {
                Exits: {
                    rightSideOfGiantRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Giant Room"
                    },
                    leftOfInvisibleSpikeRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    windHallWayTop: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Invisible Spike Room",
                        RequiredItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
                    }
                },

                ItemLocations: {
                    "Chest in Invisible Spike Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 155, y: 63, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 23,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "From the right side of the giant room, make your way across the invisible platforms to the northwest door. Use a key to open the door. Kill all the enemies to spawn the chest."
                    }
                }
            },
            leftOfInvisibleSpikeRoom: {
                Exits: {},
                ItemLocations: {
                    "Chest in Stalfos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 68, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "Gather all the rupees in the invisible spike room. You'll need your hookshot. There are several invislbe targets on the walls you need to use as well. Once done, enter the room that opens and kill all the Stalfos to spawn the chest."
                    }
                }
            },
            windHallWayTop: {
                Exits: {
                    invisibleSpikeRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Invisible Spike Room",
                    },
                    windHallway: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowNoIronBoots || Equipment.IRON_BOOTS.playerHas;
                        }
                    }
                },
                ItemLocations: {}
            },
            windHallway: {
                Exits: {
                    windHallWayTop: {
                        RequiredItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowNoIronBoots || Equipment.IRON_BOOTS.playerHas;
                        }
                    },
                    boatRoom: {
                        LockedDoor: "Locked Door After Fans",
                        Map: "Shadow Temple"
                    }
                },

                ItemLocations: {
                    "Skulltula at End of Wind Hallway": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 350, y: 193, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "Go through the door at the top of the invisible spike room. You may need hover boots if the clear platforms are there. Navigate through the wind hallway all the way to the door. The skulltula is in plain sight in this room."
                    },
                    "Invisible Chest at End of Wind Hallway": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 199, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "In the room at the end of the wind hallway, there's an invisible chest in the upper right corner."
                    },
                    "2 Flying Pots in Gibdo Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 142, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. The pots will fly at you as you approach the back of the room."
                    },
                    "2 Pots in Gibdo Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 152, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. The pots are next to the gibdos."
                    },
                    "Chest in Gibdo Room by Wind Hallway": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 301, y: 148, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. Kill the Gibdos to spawn the chest."
                    },
                    "Hidden Chest in Gibdo Room by Wind Hallway": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 309, y: 158, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "In the Gibdo room, bomb the rubble to your right to get to this chest."
                    },
                    "Skulltula in Gibdo Room by Wind Hallway": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 294, y: 139, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "In the Gibdo room, bomb the rubble at the back to get to this skulltula."
                    }
                }
            },
            boatRoom: {
                Exits: {
                    windHallway: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door After Fans"
                    },
                    endOfBoatRide: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {
                    "2 Hearts in Boat Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 280, y: 114, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole.<br/><br/>Play scarecrow's song from the boat and longshot it to get to the platform with the hearts.",
                        RequiredSongs: [Songs.SCARECROWS_SONG],
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    }
                }
            },
            endOfBoatRide: {
                Exits: {
                    acrossChasm: {
                        CustomRequirement: function(age) {
                            let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                            return Items.FAIRY_BOW.playerHas || canHitWithChu;
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots on Boat Side of Chasm": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 135, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across.<br/><br/>The pots are near where the statue falls to form the bridge."
                    },
                    "Skulltula in Chasm": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 140, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "Navigate to the boat room - this is the room after the Gibdo room by the wind hallway. Get to the boat by pushing the block, or hookshotting up the ladder. Play Zelda's Lullaby to move the boat to the other area. The skulltula is on the wall to the left of where you create the bridge.",
                        IsAtShortDistance: true 
                    }
                }
            },
            acrossChasm: {
                Exits: {
                    invisibleWallRoom: {
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        RequiredItems: [Items.FAIRY_BOW, {item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    bossRoom: {
                        CustomRequirement: function(age) {
                            if (!hasBossKey("Shadow Temple")) { return false; }
                            return Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots by Boss Antechamber Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 132, y: 128, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. These pots are by the boss antechamber entrance."
                    },
                    "Heart on Pillar Across Chasm": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 125, y: 124, floor: "B1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Climb up the Song of Time block to gain access to the heart."
                    },
                    "Skullula Before Boss": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 106, y: 193, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 48,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Enter the door on the other side. The skulltula is on the back wall. You'll need to navigate around the room's invisible floors to get to it."
                    }
                }
            },
            invisibleWallRoom: {
                Exits: {
                    afterBurningSpikes: {
                        LockedDoor: "Locked Door in Invisible Wall Room",
                        Map: "Shadow Temple",
                        RequiredItems: [Equipment.MAGIC, Items.DINS_FIRE]
                    }
                },
                ItemLocations: {
                    "2 Hearts on Chasm Longshot Platform": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 120, y: 116, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the hearts."
                    },
                    "Pot in Spike Wall Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 89, y: 51, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the switch to unbar the door.<br/><br/>Navigate to the room to your right (the north one). The pot is in front of you."
                    },
                    "Freestanding Item in Triple Skull Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 31, y: 99, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the switch to unbar the door.<br/><br/>In the invisible maze, navigate to the west room. The item is behind the triple skulls."
                    },
                    "9 Rupees in Triple Skull Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "9 Skull Rupees",
                        MapInfo: { x: 38, y: 99, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 45,
                        LongDescription: "From the room with invisible walls, enter the room that's straight ahead of you (the west room). Use the bomb flower or your own bombs to blow up all three skulls to spawn the 9 items.",
                        RequiredItems: [Equipment.STRENGTH, Items.BOMB]
                    },
                    "Bomb Flower Room Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 144, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 46,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the switch to unbar the door.<br/><br/>In the invisible maze, navigate to the south room. Use explosives to make Dead Hand spawn. Kill him to spawn the chest.",
                        NeedsExplosivesOrBombFlower: true
                    },
                    "2 Pots in Bomb Flower Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 89, y: 131, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 47,
                        LongDescription: "Navigate across the chasm you arrive at after taking the boat. Play the Song of Time to remove the block, then shoot the eye switch. Longshot up to the target to get to the switch to unbar the door.<br/><br/>In the invisible maze, navigate to the south room. The pots are along the back walls, in the corners."
                    }
                }
            },
            afterBurningSpikes: {
                Exits: {},
                ItemLocations: {
                    "Left Chest in Wooden Spike Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 70, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the left."
                    },
                    "Right Chest in Wooden Spike Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 108, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the right."
                    }
                }
            },
            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Shadow Temple"]["Boss Entrance"]
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
        UseAltOrder: function() {
            return Equipment.STRENGTH.currentUpgrade > 1 && Items.BOMBCHU.playerHas && Items.HOOKSHOT.currentUpgrade > 1;
        },
        Regions: {
            main: {
                Exits: {
                    childSide: {
                        Age: Age.CHILD,
                    },

                    silverBlockMaze: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.BOMBCHU, { item: Items.HOOKSHOT, upgradeString: "2" }],
                        CustomRequirement: function(age) {
                            if (Equipment.STRENGTH.currentUpgrade === 2) { return true; }
                            return Data.canWeirdShot(age) && Items.FAIRY_BOW.playerHas;
                        }
                    },

                    Exit: {
                        OwExit: OwExits["Spirit Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "4 Pots in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 192, y: 264, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        AltOrder: 1,
                        LongDescription: "These pots are to your left and right against the walls as you first enter the temple."
                    },
                    "Bottom Left Chest in Lobby": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 215, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        AltOrder: 2,
                        LongDescription: "This chest is there when you first enter the temple."
                    },
                    "Top Left Chest in Lobby": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        AltOrder: 3,
                        LongDescription: "After you first enter the temple, go up the stairs. Destroy the yellow rock to your right and shoot the eye switch to spawn the chest.",
                        NeedToBlastOrSmash: true,
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    "Top Right Chest in Lobby": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 203, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        AltOrder: 4,
                        LongDescription: "After you first enter the temple, go up the stairs and turn around. There's a crystal switch at the top of one of the pillars that you need to activate to spawn the chest.",
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age) || Data.canUseBoomerang(age) || Items.BOMBCHU.playerHas;
                        }
                    },

                    // Locked Doors
                    "Locked Door After Second Crawl Space": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterSecondCrawlSpace", "roomWithSunOnFloor"],
                        MapInfo: { x: 87, y: 100, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        AltOrder: 50,
                        LongDescription: "This is the door after the second crawlspace on the child side.",
                        KeyRequirement: function(age) {
                            let min = 1;
                            if (age === Age.ADULT) {
                                min = 2; // Adult needs to go through the sun on floor room
                            }

                            return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
                        }
                    },
                    "Locked Door in Sun on Floor Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom", "roomWithSunOnFloor"],
                        MapInfo: { x: 67, y: 174, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14,
                        AltOrder: 13,
                        LongDescription: "This is the door leading to/from the room with the sun on the floor room.",
                        KeyRequirement: function(age) {
                            // There's only one path for child, and it uses only 2 keys
                            if (!Data.mqSpiritCanAccessAdultSide()) {
                                return { min: 2, max: 2 };
                            }

                            let min = 2;
                            if (age === Age.ADULT) {
                                min = 1; // Adult doesn't need to go through any doors for this
                            }
                            return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
                        }
                    },
                    "Locked Door to Silver Gaunts Knuckle": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fireBubbleRoom"],
                        MapInfo: { x: 32, y: 198, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 25,
                        AltOrder: 21,
                        LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
                        KeyRequirement: function(age) {
                            // There's only one path for child, and it uses only 3 keys
                            if (!Data.mqSpiritCanAccessAdultSide()) {
                                return { min: 3, max: 3 };
                            }

                            let min = 3;
                            if (age === Age.ADULT) {
                                min = 1; // Adult doesn't need to go through any doors for this
                            }
                            return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
                        }
                    },
                    "Locked Door in Statue Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom"],
                        MapInfo: { x: 256, y: 217, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 38,
                        AltOrder: 30,
                        LongDescription: "This is the locked door on the upper east part of the statue room.",
                        KeyRequirement: function(age) {
                            let max = 5;
                            if (Settings.spiritSuperslideToMirrorShield) {
                                max = Keys.SPIRIT_TEMPLE.mqTotalKeys();
                            }
                            return { min: 1, max: max };
                        }
                    },
                    "Locked Door in Beamos Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["beamosRoom"],
                        MapInfo: { x: 223, y: 105, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 43,
                        AltOrder: 35,
                        LongDescription: "This is the locked door in the southwest corner of the room with all the Beamos.",
                        KeyRequirement: function(age) {
                            let min = 2;
                            if (Settings.spiritSuperslideToMirrorShield) {
                                min--;
                            }
                            return { min: min, max: 6 };
                        }
                    },
                    "Locked Door Right of Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomRightOfLobby"],
                        MapInfo: { x: 295, y: 169, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 34,
                        AltOrder: 26,
                        LongDescription: "This is the locked door to the right of the lobby that you get to via the statue room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
                        }
                    },
                    "Locked Door After Moving Wall": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["movingWallRoom"],
                        MapInfo: { x: 294, y: 144, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 46,
                        AltOrder: 38,
                        LongDescription: "This is the locked door by the triforce symbol located after the moving wall.",
                        KeyRequirement: function(age) {
                            let min = 3;
                            if (Settings.spiritSuperslideToMirrorShield) {
                                min--;
                            }
                            return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
                        }
                    }
                }
            },
            childSide: {
                Exits: {
                    backOfChildBridgeRoom: {
                        Age: Age.EITHER,
                        NeedsSwordWeapon: true,
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; } // Hookshot the torches
                            return Data.canMegaFlip(age) || (Items.BOMBCHU.playerHas && Items.FAIRY_SLINGSHOT.playerHas);
                        }
                    },
                    afterSecondCrawlSpace: {
                        Age: Age.CHILD,
                        RequiredItems: [Items.BOMBCHU]
                    }
                },
                ItemLocations: {
                    "Pot in Child Main Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 122, y: 207, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 5,
                        AltOrder: 44,
                        LongDescription: "This is the pot in front of you when you go through the crawlspace."
                    },
                    "2 Hearts in Child Main Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 88, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 6,
                        AltOrder: 45,
                        LongDescription: "These are the hearts surrounded by fire in the room after you go through the crawlspace. You can either get them with the boomerang, or shoot the eye switch.",
                        RequiredChoiceOfChildItems: [Items.BOOMERANG, Items.FAIRY_SLINGSHOT],
                        RequiredChoiceOfAdultItems: [Items.BOOMERANG, Items.FAIRY_BOW]
                    },
                    "Big Chest in Bridge Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 34, y: 139, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 10,
                        AltOrder: 46,
                        LongDescription: "In the child area, go through the left door to get to this chest. You can also do the loop from the right side.",
                        NeedsSwordWeapon: true
                    },
                    "Chest in Child Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 199, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 52,
                        AltOrder: 51,
                        IsPostWalkCheck: true,
                        LongDescription: "As an adult, navigate through the sun on the floor room until you're in the room with the rusted switch (this is the room after the second crawl space). Hit the switch to spawn the chest. You must go back in time to claim it.<br/>You can also equip swap hammer as Child to get this.",
                        RequiredItems: [Items.BOMBCHU],
                        CustomRequirement: function(age) {
                            if (!Items.MEGATON_HAMMER.playerHas) { return false; }
                            return Data.canUseHammer(age) || Data.canAccessMap(Age.ADULT, "Spirit Temple", "afterSecondCrawlSpace");
                        }
                    }
                }
            },
            backOfChildBridgeRoom: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in Child Gibdos Area": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 151, y: 76, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 7,
                        AltOrder: 47,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. The pots are by the gibdos."
                    },
                    "3 Pots in Child Stalfos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 86, y: 19, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 8,
                        AltOrder: 48,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. In the next room, kill the Stalfos - this will lower the fire so you can get the pots (one contains a fairy)."
                     },
                    "Small Chest in Bridge Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 34, y: 94, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 9,
                        AltOrder: 49,
                        LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. In the next room, kill the Stalfos and continue on. In this room, pull back the gravestone and hit the switch to lower the bridge. Now kill all the enemies to spawn the chest - you'll need Din's Fire to deal with the Anubis.",
                        NeedsFire: true
                    }
                }
            },
            afterSecondCrawlSpace: {
                Exits: {
                    roomWithSunOnFloor: {
                        Age: Age.CHILD,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    },
                    childSide: {
                        Age: Age.ADULT, // Child would already have access from the lobby
                        RequiredItems: [Items.MEGATON_HAMMER],
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            roomWithSunOnFloor: {
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
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 88, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        AltOrder: 16,
                        LongDescription: "In the room with the sun on the floor, the pot is located on the bottom. As adult, you must hit the switch on top first. As a child, it's at the start of the room (it's the locked door after the crawlspace)."
                    },
                    "Bottom Chest in Room With Sun On Floor": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 61, y: 142, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 13,
                        AltOrder: 14,
                        LongDescription: "In the room with the sun on the floor, kill all the enemies to spawn the chest. As child, this is the room after you go through the second crawlspace. As an adult, it's in the bottom southwest corner of the big statue room.",
                        NeedsExplosives: true
                    },
                    "Top Chest in Room With Sun On Floor": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 53, y: 194, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        AltOrder: 15,
                        LongDescription: "In the room with the sun on the floor, use an explosive to blow up the wall to light up the sun. This will spawn a chest that you will need to hookshot up to.",
                        RequiredItems: [Items.HOOKSHOT],
                        NeedsExplosives: true
                    }
                }
            },
            statueRoom: {
                Exits: {
                    roomWithSunOnFloor: {
                        Age: Age.ADULT,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Sun on Floor Room"
                    },
                    silverBlockMaze: {
                        Age: Age.CHILD,
                        NeedsFire: true
                    },
                    fireBubbleRoom: {
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || (age == Age.ADULT && Equipment.HOVER_BOOTS.playerHas);
                        }
                    },
                    beamosRoom: {
                        LockedDoor: "Locked Door in Statue Room",
                        Map: "Spirit Temple",
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    roomRightOfLobby: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.MAGIC, Equipment.MIRROR_SHIELD]
                    }
                },

                ItemLocations: {
                    "Left Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 116, y: 135, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 15,
                        AltOrder: 5,
                        LongDescription: "WALL MASTER WARNING:<br/>This pot is by the left side of the statue."
                    },
                    "Chest in Center of Statue Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 148, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 16,
                        AltOrder: 6,
                        LongDescription: "WALL MASTER WARNING:<br/>Shoot the eye switch on the left side of the statue to spawn this chest.",
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    "2 Crates in Statue Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 223, y: 117, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 17,
                        AltOrder: 7,
                        LongDescription: "WALL MASTER WARNING:<br/>These crates are on the right side of the statue against the back wall.",
                    },
                    "2 Right Pots in Statue Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 239, y: 135, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 18,
                        AltOrder: 8,
                        LongDescription: "WALL MASTER WARNING:<br/>These pots are on the right side of the statue by the flying pot that gives nothing.",
                    },
                    "Invisible Chest in Statue Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 251, y: 100, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 28,
                        AltOrder: 9,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way to the southeast corner using the hookshot. In the northeast part of the room, there's an invisible chest. Hookshot or hover boots to it."
                    },
                    "Chest in Boxes in Statue Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 225, y: 115, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 29,
                        AltOrder: 10,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way to the southeast corner using the hookshot. Now get to the hand with the triforce and play Zelda's Lullaby. This will spawn the chest to the right of the statue, under a box.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    "Upper Northeast Left Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 101, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20,
                        AltOrder: 11,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way up the western side. The pots are on the northeast platform, so either play the song of time to spawn the block, use hover boots, or megaflip to it.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas) {
                                return true;
                            }
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || Data.canMegaFlip(age);
                        }
                    },
                    "Upper Northeast Right Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 109, y: 100, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21,
                        AltOrder: 12,
                        LongDescription: "WALL MASTER WARNING:<br/>In the statue room, make your way up the western side. The pots are on the northeast platform, so either play the song of time to spawn the block, use hover boots, megaflip, or use boomerang as described.<br/><br/>To use boomerang, first, jump to the statue hand (child requires a jumpslash). Now walk along the arm so you're somewhat near the wall. You should now be able to aim a bit to the left of the pot to get it.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas) {
                                return true;
                            }
                            return Data.canUseBoomerang(age) || Data.canPlaySong(Songs.SONG_OF_TIME) || Data.canMegaFlip(age);
                        }
                    }
                }
            },
            silverBlockMaze: {
                Exits: {
                    statueRoom: {}
                },
                ItemLocations: {
                    "Chest in Silver Block Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 174, y: 227, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 19,
                        AltOrder: 52,
                        LongDescription: "From the statue room, use a fire item on the southern eye switch to get to the maze room. Navigate to the first hole and shoot the eye switch on the lower left wall to spawn the chest.",
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.canWeirdShot(age);
                        }
                    }
                }
            },
            fireBubbleRoom: {
                Exits: {
                    silverGauntsIronKnuckle: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door to Silver Gaunts Knuckle"
                    }
                },

                ItemLocations: {
                    "Left Pot in Fire Bubble Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 60, y: 112, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 22,
                        AltOrder: 17,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand. Go through the room and the hallway that unlocks.<br/><br/>The pot is on a ledge in the left part of the room."
                    },
                    "Right Pot in Fire Bubble Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 31, y: 60, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 23,
                        AltOrder: 18,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand. Go through the room and the hallway that unlocks.<br/><br/>The pot is on a ledge in the right part of the room."
                    },
                    "Chest in Fire Bubble Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 80, y: 63, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 24,
                        AltOrder: 19,
                        LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand. Go through the room and the hallway that unlocks.<br/><br/>Navigate around the room and push the two sun blocks that are next to each other into the light. This will spawn the chest."
                    },
                    "Skulltula in Fire Bubble Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 68, y: 113, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 30,
                        AltOrder: 20,
                        LongDescription: "In the fire bubble room, you must push the first sun block you see onto the light. You'll need to hit the crystal switches to make the fire disappear. This spawns a white platform that you can hookshot up to so that you can reach the skulltula.",
                        IsAtShortDistance: true
                    }
                }
            },
            silverGauntsIronKnuckle: {
                Exits: {
                    silverGauntsStatueHand: {}
                },

                ItemLocations: {
                    "Silver Gauntlets Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 103, y: 228, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 26,
                        AltOrder: 22,
                        LongDescription: "Simply navigate to the door from the fire bubble room. Kill the Iron Knuckle in the room after the hallway, and proceed outside to get the chest."
                    }
                }
            },
            silverGauntsStatueHand: {
                Exits: {
                    mirrorShieldKnuckle: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.spiritSuperslideToMirrorShield &&
                                Data.hasShield(age) &&
                                Items.BOMB.playerHas &&
                                Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    statueHands: {}
                },
                ItemLocations: {}
            },
            mirrorShieldKnuckle: {
                Exits: {
                    lizalfosAndSunRoom: {},
                    silverGauntsStatueHand: {
                        RequiredAdultItems: [{item: Items.HOOKSHOT, upgrardeString: "2"}]
                    },
                    statueHands: {}
                },

                ItemLocations: {
                    "Mirror Shield Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 247, y: 226, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 42,
                        AltOrder: 34,
                        LongDescription: "From the room with the lizalfos and the sun, slash the chest that Navi is going crazy over to open the door. Kill the Floormaster in the next room, and the Iron Knuckle in the room after. The chest will spawn on the hand as you walk in."
                    }
                }
            },
            statueHands: {
                Exits: {
                    "Desert Colossus": {
                        OwExit: OwExits["Spirit Temple"]["Desert Colossus"]
                    }
                },
                ItemLocations: {}
            },
            lizalfosAndSunRoom: {
                Exits: {
                    mirrorShieldKnuckle: {},
                    beamosRoom: {}
                },

                ItemLocations: {
                    "Chest in Room With Lizalfos and Sun": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 328, y: 105, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 40,
                        AltOrder: 32,
                        LongDescription: "In the beamos room, the puzzle is to play the Song of Time to move the blocks so that the little box falls down onto one of the blocks. You then use that box to hold the switch down.<br/><br/>The chest is in plain sight in the room."
                    },
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 321, y: 40, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 41,
                        AltOrder: 33,
                        LongDescription: "In the room with the lizalfos and sun, you can climb the Song of Time block and shine the light on the sun. The chest is in the room that opens.",
                        RequiredItems: [Equipment.MIRROR_SHIELD]
                    }
                }
            },
            beamosRoom: {
                Exits: {
                    lizalfosAndSunRoom: {
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    movingWallRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Beamos Room"
                    }
                },

                ItemLocations: {
                    "Chest in Beamos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 284, y: 77, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 39,
                        AltOrder: 31,
                        LongDescription: "From the statue room, hookshot to the torch to get to the southeast side. Use a key to go in the top door. Kill the beamos to spawn the chest.",
                        NeedsExplosives: true
                    }
                }
            },
            roomRightOfLobby: {
                Exits: {
                    boulderRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door Right of Lobby"
                    }
                },

                ItemLocations: {
                    "2 Pots Below Quad Wallmaster Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 278, y: 129, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 31,
                        AltOrder: 23,
                        LongDescription: "WALL MASTER WARNING:<br/>At the statue room, light all 3 torches with fire arrows. Use your hookshot to get to the door that unlocks. In the next room, use your mirror shield on all 3 suns and kill the enemies (including the wall masters). The pots are down the path that opens up."
                    },
                    "Skulltula in Sandy Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 235, y: 127, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 32,
                        AltOrder: 24,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. The skulltula is on the ceiling."
                    },
                    "Chest in Sandy Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 226, y: 99, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 33,
                        AltOrder: 25,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. Jump down and kill all the leevers to spawn the chest. Hookshot to it from the top to get it."
                    },
                    "Bottom Right Chest in Lobby": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 203, y: 215, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 37,
                        AltOrder: 29,
                        LongDescription: "WALL MASTER WARNING:<br/>At the statue room, light all 3 torches with fire arrows. Use your hookshot to get to the door that unlocks. In the next room, use your mirror shield on all 3 suns and kill the enemies (including the wall masters). Navigate through the hallway. Collect all the silver rupees to spawn the chest - a couple of them are in the lobby under some rocks. Use your hammer to hit the rusted switch to make the water go away. Be careful, though, as you can't come back!",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                }
            },
            boulderRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula After Boulder Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 328, y: 77, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 35,
                        AltOrder: 27,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the skulltula is inside on a wall.",
                        Region: "boulderRoom",
                        RequiredItems: [Items.MEGATON_HAMMER],
                        RequiredSongs: [Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
                    },
                    "Chest After Boulder Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 319, y: 61, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 36,
                        AltOrder: 28,
                        LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the chest is in this room.",
                        Region: "boulderRoom",
                        RequiredItems: [Items.MEGATON_HAMMER],
                        RequiredSongs: [Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
                    }
                }
            },
            movingWallRoom: {
                Exits: {
                    skulltulaAndKnuckleRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Moving Wall"
                    },
                    giantMirrorRoom: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {
                    "2 Pots in Moving Wall Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 168, y: 161, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 44,
                        AltOrder: 36,
                        LongDescription: "These pots are at the bottom of the moving wall room - which is through the locked door after the hallway via the upper southeast statue room."
                    },
                    "2 Pots After Moving Wall Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 293, y: 153, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 45,
                        AltOrder: 37,
                        LongDescription: "These pots by the floor triforce after the moving wall room."
                    }
                }
            },
            skulltulaAndKnuckleRoom: {
                Exits: {},
                ItemLocations: {
                    "West Skulltula in Iron Knuckle Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 265, y: 80, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 47,
                        AltOrder: 39,
                        LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
                    },
                    "North Skulltula in Iron Knuckle Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 293, y: 26, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 48,
                        AltOrder: 40,
                        LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
                    }
                }
            },
            giantMirrorRoom: {
                Exits: {
                    mirrorMaze: {
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                },
                ItemLocations: {
                    "4 Pots in Giant Mirror Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 174, y: 156, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 49,
                        AltOrder: 41,
                        LongDescription: "After the moving wall room, play Zelda's Lullaby to unlock the door. the pots are in the corners on the top part of the room."
                    },
                    "4 Crates in Giant Mirror Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 174, y: 119, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 50,
                        AltOrder: 42,
                        LongDescription: "After the moving wall room, play Zelda's Lullaby to unlock the door. the crates are in the corners on the bottom part of the room."
                    }
                }
            },
            mirrorMaze: {
                Exits: {
                    bossRoom: {
                        RequiredItems: [Equipment.MIRROR_SHIELD],
                        CustomRequirement: function(age) {
                            return hasBossKey("Spirit Temple");
                        }
                    }
                },
                ItemLocations: {
                    "Invisible Chest in Mirror Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 216, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 51,
                        AltOrder: 43,
                        LongDescription: "From the beamos room, take the southeast door to get to the wall room. Grab all the silver rupees to unlock the door at the top. Play Zelda's Lullaby at the trifoce to unlock the next room. Hammer the rusted switch in the northwest corner of the next room to get to the mirror maze.<br/><br/>Navigate to the very end of the maze. There's an invisible chest by the bars."
                    }
                }
            },
            bossRoom: {
                Exits: {
                    "Boss Entrance": {
                        OwExit: OwExits["Spirit Temple"]["Boss Entrance"]
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
        Regions: {
            main: {
                Exits: {
                    afterFirstRoom: {},
                    Exit: {
                        OwExit: OwExits["Ice Cavern"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Pot by Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 192, y: 257 },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "This pot is on the left wall close to the entrance. Note that you may want to use it to hit the switch in the next room if you have no other way to do so!"
                    }
                }
            },
            afterFirstRoom: {
                Exits: {
                    blueFireRoom: {
                        CustomRequirement: function(age) {
                            let canBreakStalagmites = Data.hasSwordWeapon(age) || Data.hasExplosives();
                            return Data.canKillFreezard(age) && canBreakStalagmites;
                        }
                    },
                    northRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    },
                    bigRoom: {
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots After Switch": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 182, y: 179 },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "These pots are in the transition doorway after you hit the switch in the first room."
                    },
                    "2 Pots in Center Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 204, y: 121 },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room after the room with the switch, the pots will be on your right. The other pots in the room contain fairies."
                    }
                }
            },
            blueFireRoom: {
                Exits: {},
                ItemLocations: {
                    "Chest in Red Ice": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 248, y: 147 },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "In the room with the tektites, hit the crystal switch to the right of the door. You can take a pot to the left of the entrance there to do so if you don't have a projectile. You may need to wait on the right hand wall for the boulder to pass.<br/><br/>Navigate through the cavern until you get to the first room with blue fire. Hit the switch to spawn the chest under the red ice. Melt it with blue fire to gain access to it.",
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    }
                }
            },
            northRoom: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in North Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 213, y: 13 },
                        Age: Age.ADULT,
                        Order: 5,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>In the next room, the pots are along the wall, somewhat separated.",
                    },
                    "Heart Piece in North Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 228, y: 22 },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>On the floor, there's a switch embedded in the ice. Use an explosive to hit it. This will make the block around the heart piece item disappear.",
                        NeedsExplosives: true
                    },
                    "Skulltula in North Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 192, y: 45 },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>Play the song of time on the top near the pillar with the skulltula to spawn a block. Climb it, and play the song again. Use blue fire to melt the ice to gain access to the skulltula.",
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        CustomRequirement: function(age) {
                            let canPlayOcarinaNormally = Items.OCARINA.playerHas && Data.hasBottleOrBlueFire(age);;
                            let canUseOI = Data.canOIAndBlueFireWithoutRefilling(age);
                            return canPlayOcarinaNormally || canUseOI;
                        }
                    },
                    "Chest in North Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 188, y: 20 },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. In the room at the end of the hallway, you'll find the chest on one of the ledges after some parkour."
                    }
                }
            },
            bigRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula Under Stairs in Big Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 115, y: 122 },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Across the room from the first room with blue fire, melt the ice wall. Navigate through the hallway to gain access to this room. Turn around once inside, and hit the switch posing as a stalagtite. This will make some stairs vanish near the exit of the room so you can grab the token. Be sure to hit the switch again so you can leave.",
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age);
                        }
                    },
                    "Skulltula on Ledge in Big Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 127, y: 66 },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "This skulltula is on the ledge to your right in the big room. Play the scarecrow's song and hook it, a ground jump to get up there, or use hover boots to get to the taller pillar and longshot it.",
                        CustomRequirement: function(age) {
                            let canGetWithLongshot = Equipment.HOVER_BOOTS.playerHas && Items.HOOKSHOT.currentUpgrade === 2;
                            if (canGetWithLongshot || Settings.GlitchesToAllow.mqIceJumpToSkull) {
                                return true;
                            }

                            let canPlayOcarinaNormally = Items.OCARINA.playerHas && Data.hasBottleOrBlueFire(age);
                            let canUseOI = Data.canOIAndBlueFireWithoutRefilling(age);
                            let canPlayScarecrowsSong = canPlayOcarinaNormally || canUseOI;
                            let canUseScarecrow = Data.canHookScarecrow(age) && canPlayScarecrowsSong;
                            return canUseScarecrow ||  Data.canGroundJumpWithBomb(age);
                        }
                    },
                    "Pot Before Boss Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 116, y: 162 },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "This pot is the left one next to the boss door. The right pot contains a fairy.",
                    },
                    "Chest at End": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 127, y: 182 },
                        Age: Age.ADULT,
                        Order: 12,
                        LongDescription: "Defeat the stalfos in this room to spawn the chest."
                    },
                    "Serenade of Water": {
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
        Regions: {
            main: {
                Exits: {
                    afterFirstCrawlSpace: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || (Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2);
                        }
                    }
                },
                ItemLocations: {
                    // Locked Doors
                    "Locked Door in West Main Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 73, y: 137, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 2,
                        LongDescription: "This is the door on the west side of the main room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 2 };
                        }
                    },

                    "Locked Door in Floor Master Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 288, y: 123, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 6,
                        LongDescription: "WALL MASTER WARNING:<br/>This is the locked door you find after the room with the floormasters.",
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age);
                        },
                        KeyRequirement: function(age) {
                            return { min: 1, max: 2 };
                        }
                    }
                }
            },
            afterFirstCrawlSpace: {
                Exits: {
                    centerRoom: {
                        CustomRequirement: function(age) {
                            let canGetToFromSideRoom = Data.hasExplosives() && Data.hasSwordWeapon(age); // Jumpslash in
                            return canGetToFromSideRoom || Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    drainedWater: {
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age); // Adult can weridshot into the deadhand area, which is all drainedWater is
                        }
                    },
                    coffinRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door in West Main Room",
                        NeedsExplosives: true
                    },
                    Exit: {
                        OwExit: OwExits["Bottom of the Well"]["Exit"]
                    }
                },

                ItemLocations: {
                    "2 Hearts in Front Bombable Hole": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 183, y: 194, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 1,
                        LongDescription: "In the main area, bomb the rubble to the left to get to these hearts.",
                        NeedsExplosives: true
                    }
                }
            },
            centerRoom: {
                Exits: {
                    // Technically this door isn't here, but it's useless to open it if you can't get here so we require it
                    basementCenter: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door in Floor Master Room",
                        NeedsExplosives: true
                    }
                },

                ItemLocations: {
                    "Center Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 194, y: 127, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 7,
                        LongDescription: "WALL MASTER WARNING:<br/>Navigate to the back of the main room and play Zelda's Lullaby at the triforce. This will open a bunch of gates. Proceed behind you to the center room with the chest.<br/><br/>Alternatively, you can bomb the rocks near the middle-west of the main room. Sidehop then jumpslash over the hole in the ground to get to the center area."
                    },
                    "Skulltula in West Center Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 159, y: 99, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 8,
                        LongDescription: "WALL MASTER WARNING:<br/>Bomb some rocks near the southeast corner of the main room and press the switch to unbar a door. Alternatively, you can make your way to the center room and sidehop and jumpslash to get into this area.<br/><br/>Enter the door that was just unbarred. The skulltula is under the gravestone. Be careful of invisible enemies."
                    },
                    "3 Pots in Center Room Cell": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 221, y: 172, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 9,
                        LongDescription: "WALL MASTER WARNING:<br/>Navigate to the back of the main room and play Zelda's Lullaby at the triforce. This will open a bunch of gates. Proceed behind you to the center room - the pots are on the right side of the room surrounded by cell walls.<br/><br/>Alternatively, you can bomb the rocks near the middle-west of the main room. Sidehop then jumpslash over the hole in the ground to get to the center area."
                    },
                    "3 Pots in East Center Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 231, y: 83, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 10,
                        LongDescription: "WALL MASTER WARNING:<br/>From the center room, activate the switch in the southeast section to unbar a door. Enter it - the pots are marking the invisible path around the room.",
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age);
                        }
                    },
                    "Freestanding Item in East Center Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 216, y: 80, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 11,
                        LongDescription: "WALL MASTER WARNING:<br/>From the center room, activate the switch in the southeast section to unbar a door. Enter it, and navigate counter-clockwise around the room to get to the item.",
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age);
                        }
                    },
                    "3 Hearts in Basement": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 295, y: 147, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 15,
                        LongDescription: "WALL MASTER WARNING:<br/>To get to the basement, you can fall down a hole in the center room (not the very center). Navigate to the northeastern path (the second from the right) to get to the hearts."
                    },
                    "Skulltula in Basement": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 51, y: 43, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 16,
                        LongDescription: "WALL MASTER WARNING:<br/>To get to the basement, you can fall down a hole in the center room (not the very center). Navigate to the northwestern part of the basement to get to the skulltula. Watch out for invisible giant skulltulas on the way."
                    }
                }
            },
            drainedWater: {
                Exits: {},
                ItemLocations: {
                    "Dead Hand Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 317, y: 238, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 12,
                        LongDescription: "Drain the water by hitting the switch in the back of the main room. Navigate back to the entrance and enter the crawl space leading to the Dead Hand room like normal. Kill him to spawn the chest.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }

                            let swordRequired = Settings.RandomizerSettings.deadHandNeedsSword;
                            if (swordRequired) { return Equipment.KOKIRI_SWORD.playerHas; }
                            return Data.hasSwordWeapon(age);
                        }
                    },
                    "Freestanding Item in Dead Hand Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 333, y: 229, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 13,
                        LongDescription: "In the Dead Hand room, bomb the back left rubble to reveal the item."
                    }
                }
            },
            basementCenter: {
                Exits: {},
                ItemLocations: {
                    "Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 295, y: 235, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 14,
                        LongDescription: "WALL MASTER WARNING:<br/>Crawl through the crawlspace in the back right corner of the main room. Hit the switch in the eye of the picture on the wall to open the door. Ignore the enemies and open the locked door. Bomb the rubble in the next room to reveal a switch. Navigate to the center and fall in the grate that opened.<br/><br/>Press the switch to spawn the chest. Navigate to the southeast part of the basement to get to the chest."
                    }
                }
            },
            coffinRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Coffin Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 18, y: 128, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 3,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then navigate to the back right section of the room. The skulltula is hiding in the corner behind a pillar."
                    },
                    "Heart in Front Right Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 56, y: 131, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 4,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then light the torch of the front right coffin (or use the boomerang). The heart is inside (it's invisible).",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (Data.canUseBoomerang(age) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    },
                    "Heart in Middle Left Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 43, y: 142, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        UseChildAge: function() {
                            return !Settings.GlitchesToAllow.weirdShot && !(Settings.RandomizerSettings.shuffleDungeonEntrances && Settings.GlitchesToAllow.botwAsAdultWithCucco);
                        },
                        Order: 5,
                        LongDescription: "Navigate to the left room in the main area. Unlock the door, then light the torch of the middle left coffin (or use the boomerang). The heart is inside (it's invisible).",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (Data.canUseBoomerang(age) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    }
                }
            }
        }
    },

    "Training Grounds": {
        Abbreviation: "GTG",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Regions: {
            main: {
                Exits: {
                    armosRoom: {
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    leftArea: {
                        NeedsFire: true
                    },
                    backOfMaze: {
                        RequiredChildItems: [Items.BOMBCHU, Equipment.DEKU_SHIELD],
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Settings.GlitchesToAllow.gtgChildVineClips;
                            }

                            return Data.canWeirdShot(age);
                        }
                    },
                    mazeCenter: {
                        RequiredChildItems: [Items.BOMBCHU, Equipment.DEKU_SHIELD],
                        CustomRequirement: function(age) {
                            if (getKeyCount("Training Grounds") >= 3) {
                                return true;
                            }

                            if (age === Age.CHILD) {
                                return Settings.GlitchesToAllow.gtgChildVineClips;
                            }

                            return Data.canWeirdShot(age);
                        }
                    },
                    iceArrowsRoom: {
                        Age: Age.CHILD,
                        RequiredItems: [Items.BOMBCHU, Equipment.DEKU_SHIELD],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.gtgChildVineClips;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Training Grounds"]["Exit"]
                    }
                },

                ItemLocations: {
                    "2 Left Pots by Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 146, y: 252 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        Order: 1,
                        LongDescription: "The pots are to the left when you first enter."
                    },
                    "Left Chest by Entrance": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 233 },
                        Age: Age.EITHER,
                        Order: 1.1,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "This chest is to the left when you first enter."
                    },
                    "Right Chest by Entrance": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 233 },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "This chest is to the right when you first enter."
                    },
                    "2 Right Pots by Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 183, y: 252 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        Order: 2.1,
                        LongDescription: "The pots are to the right when you first enter."
                    },
                    "Left Maze Path After Door 1": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 192 },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "From the main maze entrance, take the first left door. Climb the grate to your left up to the chest."
                    },
                    "Left Maze Path After Door 2": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 130, y: 163 },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "This chest is after the second door in the left maze path."
                    },
                    "Left Maze Path After Door 4": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 136 },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "This chest is after the fourth door in the left maze path."
                    },
                    "Left Maze Path After Door 5": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 148, y: 137 },
                        Age: Age.EITHER,
                        Order: 6,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "This chest is after the fifth door in the left maze path.",
                        CustomRequirement: function(age) {
                            let canVineClip = Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age);
                            return canVineClip || Data.canWeirdShot(age) || getKeyCount("Training Grounds") >= 1;
                        }
                    }
                }
            },
            armosRoom: {
                Exits: {
                    bigLavaRoom: {
                        RequiredChoiceOfChildItems: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
                    }
                },

                ItemLocations: {
                    "Chest in Armos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 257, y: 244 },
                        Age: Age.EITHER,
                        Order: 17,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "Either get here after shooting the eye in the starting room, or going around form the big lava room. Kill all the enemies to spawn the chest.",
                        RequiredChoiceOfChildItems: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
                    }
                }
            },
            leftArea: {
                Exits: {
                    afterRupeeRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },

                ItemLocations: {
                    "Sandy Iron Knuckle Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 65, y: 225 },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "From the main entrance, light the torches and go through the door that unlocks. Kill the Iron Knuckle to spawn the chest."
                    }
                }
            },
            afterRupeeRoom: {
                Exits: {
                    leftArea: {
                        Age: Age.CHILD // Only possible via vine clipping and going backwards
                    },
                    roomBehindSilverBlock: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            if (Equipment.STRENGTH.currentUpgrade > 1) {
                                return true;
                            }

                            if (!Data.canPlaySong(Songs.SONG_OF_TIME) || !Settings.GlitchesToAllow.gtgSilverBlockSkip || !Equipment.HOVER_BOOTS.playerHas) {
                                return false;
                            }

                            return (Data.hasBottleOrBlueFire(age) && Data.canMegaFlip(age)) || Data.canHammerHoverBootsSuperslide(age);
                        }
                    },
                    spinningRoom: {
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Room With Silver Block": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 84 },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "Enter the room after the iron knuckle room. Collect the rupees within the time limit and move on to the next room. Defeat the enemies within the time limit to spawn the chest."
                    }
                }
            },
            roomBehindSilverBlock: {
                Exits: {},
                ItemLocations: {
                    "Chest in Room Behind Silver Block": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 17 },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "Get to the room with the silver block. Push it into the hole, then enter the next room. Kill the enemies to spawn the chest."
                    }
                }
            },
            spinningRoom: {
                Exits: {
                    afterRupeeRoom: {
                        Age: Age.CHILD // This won't be useful as adult
                    },
                    armosRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    bigLavaRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.currentUpgrade >= 2 || 
                                (Data.canUseFireArrows(age) && Equipment.HOVER_BOOTS.playerHas);
                        }
                    },
                    backOfMaze: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.MEGATON_HAMMER, {item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    iceArrowsRoom: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.HOOKSHOT]
                    }
                },

                ItemLocations: {
                    "Chest in Spinning Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 163, y: 60 },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Jump to the spinning ring and shoot the eyes of the statues to spawn the chest.",
                        Region: "spinningRoom",
                        RequiredItems: [Items.FAIRY_BOW]
                    },
                    "Side Fire Iron Knuckle Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 256, y: 76 },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Kill the enemies within the time limit to spawn the chest."
                    },
                    "Center Fire Iron Knuckle Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 225, y: 90 },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Activate the switch above the door to spawn the chest. Step on the swith on one of the walls to remove the fire.",
                        CustomRequirement: function(age) {
                            return Data.canHitSwitchAtShortDistance(age);
                        }
                    }
                }
            },
            bigLavaRoom: {
                Exits: {
                    waterRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Items.FAIRY_BOW.playerHas || Data.canUseFireItem(age);
                        }
                    },
                    armosRoom: {
                    }
                },
                ItemLocations: {}
            },
            backOfMaze: {
                Exits: {
                    bigLavaRoom: {
                        Age: Age.EITHER,
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) { return true; }
                            if (age === Age.CHILD) { return false; }

                            let canUseFireArrows = Equipment.MAGIC.playerHas && Items.FAIRY_BOW.playerHas;
                            return canUseFireArrows ||
                                Items.HOOKSHOT.currentUpgrade === 2 ||
                                Data.canBombSuperslideWithHovers(age) ||
                                Data.canHammerHoverBootsSuperslide(age);
                        }
                    }
                },
                ItemLocations: {
                    "Close Chest in Back of Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 177, y: 165 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        Order: 14,
                        LongDescription: "After defeating the enemies in the room with the fire circle and Iron Knuckle, proceed through the door. Hammer the rusted switch, then longshot to the pillar that appears. Go through the hall - the chest is straight ahead."
                    },
                    "Far Chest in Back of Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 154 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        Order: 15,
                        LongDescription: "After getting the close chest from the back of the maze, continue along counter-clockwise to get the next chest (there are no doors to go through)."					}
                }
            },
            mazeCenter: {
                Exits: {},
                ItemLocations: {
                    "Crate in Maze Center": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 164, y: 160 },
                        Age: Age.EITHER,
                        Order: 6.1,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips && Settings.GlitchesToAllow.equipSwap); 
                        },
                        LongDescription: "This is the crate at the center of the maze."
                    },
                    "Spawn Ice Arrow Chest": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 164, y: 160 },
                        Age: Age.EITHER,
                        Order: 6.2,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips && Settings.GlitchesToAllow.equipSwap); 
                        },
                        RequiredItems: [Items.MEGATON_HAMMER],
                        LongDescription: "At the center of the maze, break the crate and hit the switch with the Megaton Hammer to spawn the ice arrow chest."
                    }
                }
            },
            waterRoom: {
                Exits: {},
                ItemLocations: {
                    "Chest in Water Room": { 
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 297, y: 160 },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "From the big lava room, longshot to the torch by the side door. Light it with a fire item or with your bow from the lit torch, then use your hover boots to collect the rupees. You may need to collect half of them then come back and light the torch again.<br/><br/>Once inside the water room, use your iron boots and longshot to collect all the rupees in the water. The chest will spawn at the top.",
                        RequiredItems: [Equipment.IRON_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    }
                }
            },
            iceArrowsRoom: {
                Exits: {
                    spinningRoom: {
                        Age: Age.CHILD // Only useful for Child
                    }
                },

                ItemLocations: {
                    "Chest Spawned from Maze Center": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 166, y: 132 },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "First, spawn the chest by making your way to the center of the maze. Break the box, then hammer the rusted switch to spawn the chest.<br/><br/>In the spinning room, hookshot to the target in the center of the eye statues. From there, hookshot the crystal switch to unbar the door. Go in and claim the chest.",
                        CustomRequirement: function(age) {
                            // If the chest is already spawned, we're good
                            if (Data.itemLocationObtained("Training Grounds", "mazeCenter", "Spawn Ice Arrow Chest")) {
                                return true;
                            }
                            
                            // Otherwise check that we CAN spawn the chest
                            if (!Data.canUseHammer(age)) {
                                return false;
                            }

                            let canVineClip = Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age);
                            return canVineClip || Data.canWeirdShot(age) || getKeyCount("Training Grounds") >= 3;
                        }
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
        StartingFloorIndex: 0,
        Regions: {
            main: {
                Exits: {
                    spiritRoom2: {
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                    forestRoom3: {
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    waterRoom: {
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    },
                    shadowBackSection: {
                        Age: Age.ADULT,
                        RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, Items.HOOKSHOT],
                        RequiredItems: [Equipment.MAGIC, Items.LENS_OF_TRUTH] // Without lens is really hard, so not including that trick for now
                    },
                    fireRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}],
                        RequiredChoiceOfItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                        }
                    },
                    lightRoom1: {
                        CustomRequirement: function(age) {
                            let canSuperslideIn = Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip && 
                                Items.BOMB.playerHas && 
                                Data.hasShield(age);

                            //TODO: can child do this?
                            let canEssClipIn = age === Age.ADULT && Settings.GlitchesToAllow.ganonLightTrailEssSkip && Data.hasExplosives();

                            return canSuperslideIn || canEssClipIn || Equipment.STRENGTH.currentUpgrade === 3;
                        }
                    }
                },

                ItemLocations: {
                    "Left Scrub in Secret Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 234, y: 233, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 1,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Middle Left Scrub in Secret Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 242, y: 241, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 2,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Middle Scrub in Secret Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 248, y: 248, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 3,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Middle Right Scrub in Secret Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 254, y: 241, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 4,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Right Scrub in Secret Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 262, y: 233, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 5,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Forest Freestanding Item": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 165, y: 204, floor: "FST" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 12,
                        LongDescription: "After dealing with the enemies, wait for the fan to stop spinning, then hookshot up to the ledge. The item is up there.",
                        RequiredChildItems: [Items.BOOMERANG],
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Items.BOOMERANG]
                    },
                    "Forest Close Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 168, y: 170, floor: "FST" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 13,
                        LongDescription: "In the second room, stand on the upper left side of the first platform. Shoot the eye switch on the back right corner of the room to spawn the chest.",
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    "Forest Far Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 153, y: 147, floor: "FST" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 14,
                        LongDescription: "In the second room, shoot the eye switch at the back left side of the room with a fire arrow to spawn the chest. Alternatively, you can also use Din's fire to hit it once at the back of the room. To get across, you can jump and use the wind from the fan if you have no hover boots.",
                        NeedsFire: true
                    },
                    "Water Chest in First Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 163, y: 233, floor: "WTR" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 15,
                        LongDescription: "The chest is in the red ice on the left side of the room. You can roll into it and spam A to open the chest through the ice.<br/><br/>If you want to melt it, attack the weird hand thing on the right side of the room to lower the water around the blue fire."
                    },
                    "Shadow Chest on Small Platform": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 147, y: 227, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "First, shoot the bomb flower on the right side of the room. Now, use hover boots or your hookshot to reach the chest.",
                        RequiredItems: [Items.FAIRY_BOW],
                        RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, Items.HOOKSHOT]
                    },
                    "Boss Key Chest in Center": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 165, y: 95, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.staircaseHover; },
                        Order: 19,
                        IsPostWalkCheck: true,
                        LongDescription: "Complete all the trials. Now go up the center of the castle - the boss key will spawn after you clear the stalfos room.",
                        CustomRequirement: function(age) {
                            if (Data.canStaircaseHover(age)) { return true; }

                            let canUseLightArrows = Items.FAIRY_BOW.playerHas && Items.LIGHT_ARROW.playerHas && Equipment.MAGIC.playerHas;
                            if (!canUseLightArrows || getKeyCount("Ganon's Castle") < 3) { return false; }
                            
                            let canDoForest = Data.canAccessMap(age, "Ganon's Castle", "forestRoom3");
                            let canDoFire = Data.canAccessMap(age, "Ganon's Castle", "fireRoom");
                            let canDoWater = Data.canAccessMap(age, "Ganon's Castle", "waterRoom");
                            let canDoShadow = Data.canAccessMap(age, "Ganon's Castle", "shadowBackSection");
                            let canDoSpirit = Data.canAccessMap(age, "Ganon's Castle", "spiritRoom4");
                            
                            let lightReqs = Data.hasExplosives() && Items.HOOKSHOT.playerHas;
                            let canDoLight = lightReqs && Data.canAccessMap(age, "Ganon's Castle", "lightRoom1");
                            
                            return canDoForest && canDoFire && canDoWater && canDoShadow && canDoSpirit && canDoLight;
                        }
                    }
                }
            },

            spiritRoom2: {
                Exits: {
                    spiritRoom3: {
                        RequiredItems: [Items.BOMBCHU]
                    }
                },

                ItemLocations: {
                    "Spirit Chest After Armos": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 241, y: 184, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "Hammer jumpslash one of the corners of the central platform to simply hit the switch in the middle. Enter the next room - the chest is straight ahead."
                    }
                }
            },

            spiritRoom3: {
                Exits: {
                    spiritRoom4: {
                        RequiredItems: [Equipment.MIRROR_SHIELD],
                        CustomRequirement: function(age) {
                            return Data.canUseFireArrows(age);
                        }
                    }
                },

                ItemLocations: {
                    "Spirit Invisible Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 239, y: 120, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. This chest is invisible in the corner of the room in front of the door."
                    }
                }
            },

            spiritRoom4: {
                Exits: {},
                ItemLocations: {
                    "Spirit Sun Chest 1": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 169, y: 105, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
                    },
                    "Spirit Sun Chest 2": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 169, y: 132, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
                    },
                    "Spirit Sun Chest 3": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 143, y: 132, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
                    },
                    "Spirit Sun Chest 4": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 143, y: 105, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
                    }
                }
            },

            forestRoom3: {
                Exits: {},
                ItemLocations: {}
            },

            waterRoom: {
                Exits: {},
                ItemLocations: {}
            },

            shadowBackSection: {
                Exits: {},
                ItemLocations: {
                    "Shadow Chest in Back": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 186, y: 103, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "Use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. After the beamos platform, turn around and shoot the eye switch to spawn the chest.",
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                }
            },

            fireRoom: {
                Exits: {},
                ItemLocations: {}
            },

            lightRoom1: {
                Exits: {},
                ItemLocations: {
                    "Light Zelda's Lullaby Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 194, y: 197, floor: "LIT" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip; },
                        Order: 18,
                        LongDescription: "Use your gauntlets to gain access to this area. In the first room, kill all the enemies. In the next room, play Zelda's Lullaby to spawn the chest.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                }
            }
        }
    }
};
