/**
 * Contains all the data for the standard dungeons
 */
let StandardDungeons = {
    "Deku Tree": {
        Abbreviation: "DEKU",
        MapGroup: MapGroups.DUNGEONS,
        Floors: [ "F3", "F2", "B1", "B2" ],
        StartingFloorIndex: 1,
        _canBurnBasementWeb: function(age) {
            let canShootWebThroughTorch = age === Age.ADULT && Items.FAIRY_BOW.playerHas;
            return canShootWebThroughTorch || Data.canUseFireItem(age) || Data.canUseDekuStick(age);
        },
        Regions: {
            main: {
                Exits: {
                    slingshotRoom: {
                        CustomRequirement: function(age) {
                            if (Data.canUseHammer(age)) { return true; }
                            if (age === Age.ADULT) {
                                return Equipment.HYLIAN_SHIELD.playerHas;
                            }
                            return Equipment.DEKU_SHIELD.playerHas; 
                        }
                    },

                    basementBottom: {
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
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
                        Order: 1,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Climb up the vines on the first floor. Jump to the small platform to your left. The item is on the end of that platform; you have to jump off for it.",
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 282, y: 82, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This chest is located by the vines with the skullwalltulas on the second floor."
                    },
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 147, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the opposite side of the room for this chest.",
                    },
                    "Compass Side Room Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 115, y: 199, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 6,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this chest. You do not need to kill the giant skulltula if you jump far enough to the left.",
                    },
                    "Skulltula in Compass Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 115, y: 207, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this skulltula. You do not need to kill the giant skulltula if you jump far enough to the left."
                    },
                    "Heart in Upper Lobby": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 291, y: 152, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This item can be seen on the top floor, floating close to the path left of the vines you club up. Lined up with the wall, jump from the middle of the ledge, holding neutral to get this item.",
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    }
                }
            },

            slingshotRoom: {
                Exits: {},
                ItemLocations: {
                    "Slingshot Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 111, y: 246, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 3,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Enter the second floor door. Use your shield to reflect the scrub's nut back at him. The chest is on the other side in the next room."
                    },
                    "Slingshot Room Side Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 157, y: 273, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This chest is located up the vines on the platform the slingshot chest is on."
                    }
                }
            },

            basementBottom: {
                Exits: {
                    basementBack: {
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    basementTop: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Settings.GlitchesToAllow.dekuB1Skip;
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 343, y: 81, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 9,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "From the top floor, either kill or stun one one of the giant skulltulas. Jump toward the center of the room and immediately let go of the joystick. You should fall to the basement. If you can use Din's Fire, you can use that instead. The chest is on the platform to the left of the vines."
                    },
                    "Skulltula on Basement Gate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 297, y: 51, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 10,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This skulltula is in the in the basement you enter when you go in the first pit. If you face the vines, it's the one on the wall to the left."
                    },
                    "Skulltula on Basement Vines": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 348, y: 104, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 11,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This skulltula is the one on the vines in the first basement floor. A well-angled jumpslash from a deku stick can hit it. You can also use the slingshot, boomerang, or a well-timed bomb.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Items.DEKU_STICK.playerHas || Items.FAIRY_SLINGSHOT.playerHas ||
                                Items.BOOMERANG.playerHas || Items.BOMB.playerHas;
                        }
                    }
                }
            },

            basementBack: {
                Exits: { 
                    basementTop: {
                        Age: Age.CHILD
                    } 
                },
                ItemLocations: {
                    "Skulltula in Back Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 17, y: 77, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12,
                        IsAtShortDistance: true,
                        BlockedByMudWall: true,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "If you make your way around the basement, you'll eventually find a circular room where gohma babies drop from the ceiling. One of the side rooms has a bombable wall. Bomb it, then enter the next room. The skulltula is high up on the wall to your left."
                    }
                }
            },

            basementTop: {
                Exits: {
                    basementBack: {
                        Age: Age.CHILD
                    },
                    lowerBasement: {
                        CustomRequirement: function(age) {
                            let webAlreadyBurned = Data.itemLocationObtained("Deku Tree", "basementTop", "Burn Basement Web");
                            return webAlreadyBurned ||
                                MapLocations["Deku Tree"]._canBurnBasementWeb(age) || 
                                Data.canWeirdShot(age);
                        }
                    }
                },
                ItemLocations: {
                    "Burn Basement Web": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        MapInfo: { x: 263, y: 108, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12.1,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "The web on the basement floor. Use sticks, a fire item, or a bow shot from atop the chest through the torch by the vines in the lower area.",
                        CustomRequirement: function(age) {
                            return MapLocations["Deku Tree"]._canBurnBasementWeb(age);
                        }
                    }
                }
            },

            lowerBasement: {
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            return (age === Age.CHILD && Equipment.DEKU_SHIELD.playerHas) ||
                                (age === Age.ADULT && Equipment.HYLIAN_SHIELD.playerHas) ||
                                Data.itemLocationObtained("Deku Tree", "lowerBasement", "Open Boss Door");
                        }
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
                        Order: 13,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "These hearts are in the water of the lower basement, two on one side, one on the other."
                    },
                    "Open Boss Door": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { 
                            let haveBothShields = Equipment.DEKU_SHIELD.playerHas && Equipment.HYLIAN_SHIELD.playerHas;
                            return Settings.RandomizerSettings.shuffleDungeonEntrances && !haveBothShields;
                        },
                        MapInfo: { x: 180, y: 192, floor: "B2" },
                        RequiredChildItems: [Equipment.DEKU_SHIELD],
                        RequiredAdultItems: [Equipment.HYLIAN_SHIELD],
                        Age: Age.EITHER,
                        Order: 13.1,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "Mark this after stunning the scrubs in the 2, 3, 1 order.",
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
                        LongDescription: "Use an explosive, hammer, or blue fire to break the first wall. This is used to determine whether Child can get in without anything.",
                        CustomRequirement: function(age) {
                            if (Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas) { return true; }
                        }
                    }
                }
            },

            mainRoom: {
                Exits: {
                    firstFloorSwitch: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; } // Adult can just climb to the switch
                            return Data.canGroundJumpWithBomb(age, true) || 
                                (Settings.GlitchesToAllow.dodongoSwitchEarly && Items.BOMBCHU.playerHas && Equipment.DEKU_SHIELD.playerHas);
                        }
                    },

                    blueRoom: {
                        CustomRequirement: function(age) {
                            return Data.hasSwordWeapon(age) || Data.canBreakMudWalls(age);
                        }
                    }
                },

                ItemLocations: {
                    "Gossip Stone in Main Room": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 173, y: 179, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "This stone is behind the breakable wall in the northeast corner of the main room.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "2 Pots at East Room Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 206, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "Go to the room to the east of the main room. The pots are in front of you in the first alcove to the left."
                    },
                    "Skulltula in East Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 242, y: 274, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Go to the room to the east of the main room. If you hug the right wall, you'll find a bombable wall. You can either blow it up with your own explosive, or kill a baby Dodongo near the wall.<br/><br/>Once inside, head to the back of the room to find the skulltula.",
                        CustomRequirement: function(age) {
                            // First check covers bombs/hammer/stunning the baby dodongo
                            return Data.canKillStunnableEnemy(age) || Data.canUseBlueFire(age);
                        }
                    },
                    "2 Pots by East Room Ledge": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 228, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Go to the room to the east of the main room. The pots are on the left wall near the small ledge."
                    },
                    "Skulltula on East Room Ledge": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 220, y: 215, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.dodongoScarecrowSkullEarly; },
                        LongDescription: "Go to the room to the east of the main room. As adult, play scarecrow's song near the wall with the ledge on the left hand side. Hookshot up to it to get to the skulltula. Alternatively, you can push the armos status all the way over to the ledge and backflip onto it to get to the ledge.",
                        CustomRequirement: function(age) {
                            let scarecrowless = Settings.GlitchesToAllow.dodongoScarecrowSkullEarly;
                            if (!scarecrowless && age === Age.CHILD) { return false; }
                            return scarecrowless || Data.canHookScarecrow(age);
                        }
                    },
                    "2 Pots in Lizalfos Antechamber": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 310, y: 195, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "Go to the room to the east of the main room and push the armos on the switch to unbar the door. The pots are in the next room."
                    },
                    "Heart in Lavafall Cave": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 335, y: 166, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "In the lower lizalfos room, head to the platform closest to the lavafall. Jump through the lavafall on the side that's closer to the wall to get to ths item."
                    },
                    "2 Pots Left of Lizalfos Room Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 280, y: 148, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "In the lower lizalfos room, these pots are on the platform to the left of the exit door."
                    },
                    "2 Pots Right of Lizalfos Room Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 311, y: 128, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "In the lower lizalfos room, these pots are on the platform to the right of the exit door."
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 97, y: 198, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Go to the left side of the big main room. Destroy the wall with an explosive, hammer, or blue fire to find this chest.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "Scrub in Main Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 97, y: 222, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "Make your way to the left side of the main room. The scrub is in the wall closest to the entrance to the dungeon."
                    }
                }
            },

            blueRoom: {
                Exits: {
                    firstFloorSwitch: {
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    }
                },

                ItemLocations: {
                    "Scrub by Blue Dodongo Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 245, y: 85, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "From the entrance, go around the right side of the dungeon until you get to the blue room with dodongos in it. You can also jump up to the switch platform as adult and enter the door to get here. Near the usual entrance to this room, there's a mud wall with a scrub inside. You should be able to run a bomb flower to it if you don't have your own explosives.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "3 Pots by Blue Room Start": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 221, y: 146, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "From the entrance, go around the right side of the dungeon until you get to the blue room with dodongos in it. You can also jump up to the switch platform as adult and enter the door to get here.<br/><br/>Near the first pillar, there are three pots. Two on one side, and one on the other."
                    },
                    "Pot by Blue Room End": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 217, y: 190, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "From the entrance, go around the right side of the dungeon until you get to the blue room with dodongos in it. You can also jump up to the switch platform as adult and enter the door to get here.<br/><br/>This pot is between the last two pillars in the room."
                    }
                }
            },

            firstFloorSwitch: {
                Exits: {
                    blueRoom: {},
                    staircaseTop: {
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            return Data.hasExplosivesOrStrength() || 
                                canUseDins ||
                                (Settings.GlitchesToAllow.dodongoTriggerStairsWithBow && age === Age.ADULT && Items.FAIRY_BOW.playerHas);
                        }
                    }
                },

                ItemLocations: {
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 41, y: 259, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "Make your way to the room with the Bomb Flowers by the staircase. Destroy the wall near the front of the stairs and enter the room. The chest is here - if you can't kill the armos, you'll have to savewarp after you get the chest.",
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    }
                }
            },

            staircaseTop: {
                Exits: {
                    skulltulaAlcoveAboveStairs: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [{ item: Items.HOOKSHOT, upgradeString: "2" }]
                    },
                    bombChestFloor: {
                        CustomRequirement: function(age) {
                            let adultBombChestEarly = age === Age.ADULT && Settings.GlitchesToAllow.dodongoAdultJumpToBombChest;
                            let canGroundJumpThere = age === Age.ADULT && Data.canGroundJumpWithBomb(age);
                            let canMegaflipThere = Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
                            return adultBombChestEarly || canGroundJumpThere || canMegaflipThere;
                        }
                    },
                    firstEyeSwitchRoom: {
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas;
                        }
                    },
                    potsInBladeRoom: {
                        RequiredItems: [Items.BOOMERANG],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.difficultBoomerangTrickThrows;
                        }
                    }
                },

                ItemLocations: {
                    "2 Pots Left of Staircase": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 12, y: 96, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "Lower the giant staircase. Climb it - the pots are to the left."
                    },
                    "2 Pots Right of Staircase": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 51, y: 96, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "Lower the giant staircase. Climb it - the pots are to the Right."
                    },
                    "Skulltula on Vines by Stairs": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 29, y: 136, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "Head to the top of the room with the giant staircase and the Bomb Flowers. The skulltula is on the vines near the exit. If you have nothing to kill it, you can throw one of the pots at it.",
                        OverrideItemGroupCondition: true
                    },
                    "Chest by Bomb Flower": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 201, y: 201, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "In the room with the blades, this is the chest on the ledge near the Bomb Flower and bombable wall."
                    },
                    "2 Scrubs by Blade Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Scrubs",
                        MapInfo: { x: 202, y: 106, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "In the room with the blades, there's a wall you can destroy that's located near the cliffs with the bomb chest. There are a couple scrubs inside.",
                        BlockedByMudWall: true
                    },
                    "Heart Behind Block in Blade Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 211, y: 196, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "In the room with the blades, push the block all the way out. There's an item inside its alcove."
                    }
                }
            },

            potsInBladeRoom: {
                Exits: {},
                ItemLocations: {
                    "2 Pots in Blade Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 202, y: 172, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 27,
                        LongDescription: "These pots are in the blade room on the pillars. Either make your way to the bomb chest area, or do a couple trick shots with the boomerang to get them."
                    }
                }
            },

            firstEyeSwitchRoom: {
                Exits: {
                    bombChestFloor: {
                        RequiredChildItems: [Items.FAIRY_SLINGSHOT],
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                },
                ItemLocations: {
                    "First Eye Switch Pot by Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 251, y: 190, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the blade room or the upper lizalfos room. This pot is in the corner by the entrance."
                    },
                    "First Eye Switch Pot by Exit": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 270, y: 205, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "Make your way to the first eye switch puzzle room, either through the blade room or the upper lizalfos room. This pot is in the corner by the exit."
                    }
                }
            },

            upperLizalfosRoom: {
                Exits: {
                    bombChestFloor: {
                        CustomRequirement: function(age) {
                            return Data.hasSwordWeapon(age) || Data.hasExplosives();
                        }
                    },
                    firstEyeSwitchRoom: {
                        CustomRequirement: function(age) {
                            return Data.hasSwordWeapon(age) || Data.hasExplosives();
                        }
                    }
                },
                ItemLocations: {
                    "2 Hearts in Upper Lizalfos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 296, y: 123, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "In the upper lizalfos room, this item is way in the back on the platform above the lower lizalfos room."
                    }
                }
            },

            bombChestFloor: {
                Exits: {
                    inDodongoHead: {
                        NeedsExplosives: true
                    },
                    potsInBladeRoom: {},
                    upperLizalfosRoom: {},
                    skulltulaAlcoveAboveStairs: {}
                },

                ItemLocations: {
                    "Second Eye Switch Pot by Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 275, y: 166, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 25,
                        LongDescription: "Make your way to the second eye switch puzzle room, either through upper lizalfos room or by going backwards form the bomb chest. This pot is in the corner by the entrance."
                    },
                    "Second Eye Switch Pot by Exit": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 252, y: 153, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 26,
                        LongDescription: "Make your way to the second eye switch puzzle room, either through upper lizalfos room or by going backwards form the bomb chest. This pot is in the corner by the exit."
                    },
                    "Bomb Bag Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 184, y: 145, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 28,
                        LongDescription: "This is the chest elevated on the platform in the room with the blades. You normally get here after the second Lizalfos fight. There are tricks to megaflip as a child to get here earlier. You can also simply jump to a nearby platform as adult to skip that fight."
                    },
                    "Chest at End of Bridge": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 84, y: 149, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 29,
                        LongDescription: "At the end of the bridge above the giant dodongo head, destroy the wall. The chest is just inside.",
                        BlockedByMudWall: true
                    }
                }
            },

            skulltulaAlcoveAboveStairs: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Alcove Above Stairs": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 31, y: 94, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "This skulltula is in an alcove above the giant staircase with the Bomb Flowers.<br/><br/>As child, you must first navigate to the switch that raises the platform to the second floor. Now, leave the dungeon and come back in. Take the platform to the second floor and proceed backwards to the staircase room - the staircase is now raised. You can climb the vines on the staircase to get to the skulltula.<br/><br/>As adult, you can do the same thing. If you have the longshot, though, you can get it without needing the staircase up if you stand on a step close to the top.",
                        IsAtShortDistance: true
                    }
                }
            },

            inDodongoHead: {
                Exits: {
                    bossRoom: {}
                },

                ItemLocations: {
                    "Skulltula in Back Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 193, y: 11, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "This is in the series of rooms after you enter the giant dodongo head. After you climb the ledge with the pushable blocks, there's a wall you can destroy. The skulltula is inside."
                    },
                    "Pot After Block Push in Back Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 176, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 32,
                        LongDescription: "After the block push puzzle in the giant dodongo head, this is one of the pots to your left before you enter the hallway. The other one will always contain a fairy."
                    },
                    "2 Pots in Hall Before Final Block": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 143, y: 53, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 33,
                        LongDescription: "At the end of the path in the giant dodongo head, these pots are in the hallway before the block you push down."
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
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        Regions: {
            main: {
                Exits: {
                    afterFirstRoom: {
                        CustomRequirement: function(age) {
                            if (Data.hasExplosives() || Data.canUseBoomerang(age)) { return true; }
                            if (age === Age.ADULT) { return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas; }
                            return Items.FAIRY_SLINGSHOT.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
                    }
                },
                ItemLocations: {}
            },

            afterFirstRoom: {
                Exits: {
                    afterBigOcto: {
                        RequiredItems: [Items.BOOMERANG],
                        NeedsSwordWeapon: true
                    },
                    roomBeforeBoss: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.jabuBlueSwitchSkip && 
                                (Data.canMegaFlip(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas));
                        }
                    }
                },

                ItemLocations: {
                    "Crate in Elevator Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 164, y: 177, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "After the first room, break the small crate on the right for this item. The left one drops nothing.",
                    },
                    "Scrub Behind Octorok Water": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: {x: 117, y: 229, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the rising platform (the second room of the dungeon), fall down into the water. Dive down and swim into the adjacent room - it's straight ahead from the door. There's a scrub on the other side."
                    },
                    "4 Pots in Room by Vines": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 32, y: 188, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 3,
                        LongDescription: "Fall down one of the holes to get to the main room on the bottom. Enter the door by the vines back up. Either stun the jello with your boomerang to cross, or use hover boots. The pots are on the other side - one is always a fairy.",
                        RequiredChildItems: [Items.BOOMERANG],
                        RequiredChoiceOfAdultItems: [Items.BOOMERANG, Equipment.HOVER_BOOTS]
                    },
                    "Left Skulltula on Lower Room Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 156, y: 44, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
                        IsAtShortDistance: true
                    },
                    "Right Skulltula on Lower Room Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 176, y: 35, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
                        IsAtShortDistance: true
                    },
                    "Skulltula on Vines": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 284, y: 153, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 6,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the water and the switch (the first one you usually take Ruto into), there's a skulltula hanging out on the vines. Take it out, then raise the water to collect its token. Note that you can reach it with a jumpslash if you jump off the cliff then jumpslash when you're a bit closer.",
                    },
                    "2 Pots Above Vines": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 258, y: 152, floor: "B1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 7,
                        LongDescription: "These pots are above the vines in the room with the water and the switch (the first one you usually take Ruto into). One of the pots there will always contain a fairy."
                    },
                    "Boomerang Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 237, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Now, hug the right wall all the way to a switch - jump on it with Ruto in your hands. Enter the room. Kill all the stingers to spawn the chest. They can be hurt with explosions, boomerang, slingshot, or jump slashes from a stick or sword.",
                        CustomRequirement: function(age) {
                            return Data.canUseBoomerang(age) || Items.FAIRY_SLINGSHOT.playerHas || Data.hasSwordWeapon(age) || Data.hasExplosives();
                        }
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 99, y: 57, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 9,
                        LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Hug the left wall until you find a switch. Leave Ruto on it and enter. Kill the Parasitic Tentacle with your boomerang to spawn the chest.",
                        RequiredItems: [Items.BOOMERANG]
                    },
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 147, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 10,
                        LongDescription: "After killing the Parasitic Tentacle to spawn the Map Chest (see that section), exit the room. Now hug the left wall to the next nearby door. Kill the shaboms within the time limit to spawn this chest. Note that Deku Nuts are a really fast way to take care of this room.",
                        RequiredItems: [Items.BOOMERANG]
                    }
                }
            },

            afterBigOcto: {
                Exits: {
                    roomBeforeBoss: {}
                },
                ItemLocations: {
                    "2 Pots After Big Octo": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 101, y: 32, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 11,
                        LongDescription: "After defeating all the tentacles, go defeat Big Octo. Ride up the elevator - the pots are in this room on the back wall. One of them always contains a fairy."
                    }
                }
            },

            roomBeforeBoss: {
                Exits: {
                    bossRoom: {
                        RequiredItems: [Items.BOOMERANG]
                    }
                },

                ItemLocations: {
                    "Skulltula Near Boss": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 255, y: 194, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room before the boss room (the one that's slightly green and has a bunch of biris), there's a skulltula on the vines leading up the wall to the door switch.<br/><br/>Note that adult can get here immediately by using the hover boots."
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
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        Regions: {
            main: {
                Exits: {
                    lobby: {
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Forest Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Skulltula in First Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 193, y: 271, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "The skulltula is high up on the vines in the first room. You can kill it with a ranged item, din's fire, a bomb from the top (requires a trick), or a bombchu from the ground.",
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.forestFirstSkullWithBomb && Items.BOMB.playerHas) { return true; }
                            if (Data.canUseFireItem(age) || Data.canUseBoomerang(age) || Items.BOMBCHU.playerHas) { return true; }
                            if (age === Age.CHILD) {
                                return Items.FAIRY_SLINGSHOT.playerHas;
                            }
                            return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Chest on Starting Room Tree": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 254, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "In the first room, climb up the vines to the right. Navigate over to the tree, and then jump or hookshot across to the chest on the other tree."
                    },

                    // Locked Doors
                    "Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 122, y: 150, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This is the western door in the lobby.",
                        KeyRequirement: function(age) {
                            if (Data.forestCanJumpToTop(age)) {
                                return { min: 1, max: Keys.FOREST_TEMPLE.totalKeys() };
                            }
                            return { min: 1, max: 1 };
                        }
                    },

                    "Locked Door by Twisted Corridor": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["topOfBlockRoom"],
                        MapInfo: { x: 42, y: 198, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "This is the door that's after the block puzzle by the bubbles.",
                        KeyRequirement: function(age) {
                            if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 1, max: 2 };
                            }
                            return { min: 2, max: 2 };
                        }
                    },

                    "Locked Door in Boss Key Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedCorridor1"],
                        MapInfo: { x: 80, y: 57, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
                        KeyRequirement: function(age) {
                            if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 2, max: 3 };
                            }
                            return { min: 3, max: 3 };
                        }
                    },

                    "Locked Door in Blue Poe Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["firstPoeRoom"],
                        MapInfo: { x: 282, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "This is the door that's in the blue poe room.",
                        KeyRequirement: function(age) {
                            if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 3, max: 4 };
                            }
                            return { min: 4, max: 4 };
                        }
                    },

                    "Locked Door in Green Bubble Hallway": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterPoeRooms"],
                        MapInfo: { x: 319, y: 154, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
                        KeyRequirement: function(age) {
                            if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 4, max: 5 };
                            }
                            return { min: 5, max: 5 };
                        }
                    }
                }
            },
            lobby: {
                Exits: {
                    outsideLeft: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; } // The SoT block is gone as child!
                            return Settings.GlitchesToAllow.forestLedgeClip || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },

                    outsideRight: {
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age);
                        }
                    },

                    blockRoom: {
                        LockedDoor: "Locked Door in Lobby",
                        Map: "Forest Temple"
                    },

                    fallingCeilingRoom: {
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
                        Order: 3,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. the pots are on the ledge to the left."
                    },
                    "3 Pots Right in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 194, y: 164, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 4,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. the pots are on the ledge to the right."
                    },
                    "Skulltula in Main Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 191, y: 110, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        IsAtShortDistance: true,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go through the main room until you get to the door on the other side. Turn right to find this skulltula on the wall. You can get it with your hookshot or boomerang."
                    },
                    "Chest Behind Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 16, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go straight again through the room with the blue bubble. In the next room, kill the two stalfos to spawn the chest."
                    },
                    "Pot Behind Main Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 168, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go straight again through the room with the blue bubble. The pot is the left one in the back of the room. The right pot always contains a fairy."
                    }
                }
            },
            outsideLeft: {
                Exits: {
                    topOfOutsideRight: {
                        MustKillStunnableEnemy: true
                    },
                    topOfOutsideLeft: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.forestCanJumpToTop(age);
                        }
                    },
                    outsideLeftHearts: {
                        RequiredItems: [Items.BOOMERANG],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.difficultBoomerangTrickThrows;
                        }
                    },
                    outsideRight: {
                        IsGoldenScaleWater: true // This is to swim through the well
                    }
                },
                ItemLocations: {
                    "Skulltula in Left Room on Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 83, y: 52, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 18,
                        IsAtShortDistance: true,
                        LongDescription: "There's a skulltula high up on the wall over the moat in the outside left room. You can get it from the ground with the longshot. Otherwise, you must make your way to the upper platform to grab it. This is the path that you take if you fall in the hole by the boss key chest.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            if (Data.canAccessMap(age, "Forest Temple", "topOfOutsideLeft")) { 
                                return true;
                            }
                            return Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    }
                }
            },
            topOfOutsideLeft: {
                Exits: {
                    outsideLeft: {},
                    outsideLeftHearts: {},
                    blockRoom: {}
                },

                ItemLocations: {
                    "Floormaster Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 27, y: 101, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Navigate to the twisted corridor. Shoot the eye switch to untwist the corridor. Now go across the corridor to the room with the boss key chest. Fall down the hole in this room and kill the bubbles to get out. Follow the right wall in this next area until you reach the first door in the side room to the right (careful of the giant deku baba). Kill the floormaster to spawn the chest.",
                        MustKillStunnableEnemy: true
                    }
                }
            },
            outsideLeftHearts: {
                Exits: {},
                ItemLocations: {
                    "2 Hearts Above Left Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 81, y: 73, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.difficultBoomerangTrickThrows; },
                        Order: 17,
                        LongDescription: "Navigate to the twisted corridor. Shoot the eye switch to untwist the corridor. Now go across the corridor to the room with the boss key chest. Fall down the hole in this room and kill the bubbles to get out.<br/><br/>The hearts are on the skinny platform that you have to jump to, near the skulltula on the wall. Be careful not to fall off."
                    }
                }
            },
            outsideRight: {
                Exits: {
                    topOfOutsideRight: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    outsideRightLedge: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.HOOKSHOT]
                    },
                    outsideLeft: {
                        IsGoldenScaleWater: true // This is to swim through the well
                    }
                },
                ItemLocations: {}
            },
            outsideRightLedge: {
                Exits: {
                    outsideRight: {},
                    skulltulaOnOutsideRightLedge: {
                        IsAtShortDistance: true
                    }
                },

                ItemLocations: {
                    "Chest on Outside Right Island": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 269, y: 77, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "There is a chest on the landmass on the other wide of the water in the right outside room. You can hookshot to it with the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.<br/><br/>Alternatively, you can get there using hover boots from the platform with the water-draining well switch."
                    }
                }
            },
            skulltulaOnOutsideRightLedge: {
                Exits: {},
                ItemLocations: {
                    "Skulltula on Outside Right Island": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 269, y: 70, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "There is a skulltula on the landmass on the other wide of the water in the right outside room. You can hookshot to the island via the chest at the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.<br/><br/>If you have no hookshot and are coming from the falling ceiling room, make sure you kill it and drop down on the item from above so you don't miss your chance!"
                    }
                }
            },
            topOfOutsideRight: {
                Exits: {
                    drainedWell: {},
                    outsideRight: {},
                    outsideRightLedge: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestLedgeWithHovers;
                        }
                    },
                    outsideLeft: {
                        MustKillStunnableEnemy: true
                    }
                },

                ItemLocations: {
                    "Dungeon Map": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 184, y: 111, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "You can get here from the left outside room. Proceed up the vines and into the room. Kill the blue bubble to spawn the chest. Alternatively, you can get here by longshotting up the vines in the right outside room.",
                        MustKillStunnableEnemy: true
                    }
                }
            },
            drainedWell: {
                Exits: {},
                ItemLocations: {
                    "2 Hearts in Well": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 181, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        Order: 11,
                        LongDescription: "In the outside rooms, there are two hearts in the well. One way to get there is from the left room. Proceed up the vines, kill the blue bubble, and go into the next room. Now, hookshot or jump to the vines to your left and navigate to the switch on the other platform. This will drain the water. Alternatively, you can start in the right room and longshot up these vines to get to the switch."
                    },
                    "Chest in Well": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 126, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "In the outside rooms, there is a chest at the bottom of the well. One way to get there is from the left room. Proceed up the vines, kill the blue bubble, and go into the next room. Now, hookshot or jump to the vines to your left and navigate to the switch on the other platform. This will drain the water. Alternatively, you can start in the right room and longshot up these vines to get to the switch.",
                        MustKillStunnableEnemy: true
                    }
                }
            },
            blockRoom: {
                Exits: {
                    topOfOutsideLeft: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    topOfBlockRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            if (Equipment.STRENGTH.playerHas) {
                                return true;
                            }
                            
                            // If you can't push blocks, you MUST do the block skip, which is adult only
                            if (!Settings.GlitchesToAllow.forestBlockSkip || age === Age.CHILD) { return false; } 
                            return Data.canGroundJumpWithBomb(age) && Equipment.HOVER_BOOTS.playerHas;
                        }
                    }
                },

                ItemLocations: {
                    "Eye Switch in Block Puzzle Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 56, y: 226, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 14,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "Navigate to the room with the block puzzle. After pushing the first block, climb up the ladder that it was blocking. Now go straight to the wall in front of you. Follow that wall to the right. Turn right, and you should see an eye switch a bit up the wall in front of you. Shoot it to spawn the chest.",
                        CustomRequirement: function(age) {
                            let canBlockSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBlockSkip && Data.canGroundJumpWithBomb(age);
                            let canHoverToMiddleFloor = age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas;
                            let canGetToEyeSwitch = canBlockSkip || canHoverToMiddleFloor || Equipment.STRENGTH.playerHas;
                            return Data.canShootEyeSwitch(age) && canGetToEyeSwitch;
                        }
                    }
                }
            },
            topOfBlockRoom: {
                Exits: {
                    twistedCorridor1: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door by Twisted Corridor",
                        Age: Age.ADULT
                    },
                    untwistedCorridor1: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door by Twisted Corridor",
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            untwistedCorridor1: {
                Exits: {
                    topOfOutsideLeft: {
                        MustKillStunnableEnemy: true
                    }
                },

                ItemLocations: {
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 66, y: 45, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "WALL MASTER WARNING:<br/>Navigate to the end of the block puzzle room. The door at the end leads to the twisted corridor. Shoot the eye above the door to untwist it. Go down the hallway and into the next room to find the boss key chest."
                    }
                }
            },
            twistedCorridor1: {
                Exits: {
                    firstPoeRoom: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Boss Key Room"
                    }
                },
                ItemLocations: {}
            },
            firstPoeRoom: {
                Exits: {
                    afterPoeRooms: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Blue Poe Room",
                        NeedsSwordWeapon: true
                    }
                },

                ItemLocations: {
                    "Red Poe Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 151, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "Navigate to the twisted corridor. Make sure it's still twisted when you go down it. If you jump to the platform at the end, then turn right, you'll see a door. Go through it. Spawn the red poe by shooting the paintings on the wall. Kill it to spawn the chest. Note that Deku Nuts can be used to immediately make the poe visible again.",
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    "Fairy Bow Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 190, y: 61, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "Go to the room after the red poe room. Kill the stalfos that spawns. After that, kill the two others to spawn the chest.",
                    },
                    "4 Pots in Upper Stalfos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 192, y: 48, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "These pots are against the walls in the room after the red poe room."
                    },
                    "3 Pots in Blue Poe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 240, y: 43, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "These pots are in the room after the fairy bow chest, just to your left when you enter."
                    },
                    "Blue Poe Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 224, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "This chest is in the room after the fairy bow chest. Shoot the paintings on the wall to spawn the poe. Kill it to spawn the chest. As was the case with the red poe, you can use Deku Nuts to make it immediately visible when it vanishes.",
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                }
            },
            afterPoeRooms: {
                Exits: {
                    carouselRoom: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Green Bubble Hallway"
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
                    "2 Pots in Carousel Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 331, y: 208, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. The pots are in the back left corner of the room."
                    }
                }
            },
            fallingCeilingRoom: {
                Exits: {
                    skulltulaOnOutsideRightLedge: {},
                    outsideRightLedge: {}
                },

                ItemLocations: {
                    "Chest in Falling Ceiling Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 318, y: 116, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. Either shoot the frozen eye switch so that the arrow goes through the torch, or cast Din's Fire while standing just below the switch. Now, head back to the room with the ladder and fall down the hole. The chest is in the middle of this room. Alternatively, you can spawn a scarecrow in the right outside room that you can longshot to."
                    },
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
                    "Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 138, y: 237, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the chest.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return Data.forestTempleCanAccessAllPoeRooms(age);
                        }
                    },
                    "Skulltula in Basement": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 132, y: 228, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        IsAtShortDistance: true,
                        LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the skulltula",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return Data.forestTempleCanAccessAllPoeRooms(age);
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
        Floors: ["F5", "F4", "F3", "F2", "F1"],
        StartingFloorIndex: 4,
        Regions: {
            main: {
                Exits: {
                    bossKeyRoom: {
                        Map: "Fire Temple",
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    },
                    bossKeyPath: {
                        Map: "Fire Temple",
                        LockedDoor: "Bottom Locked Door in Lobby",
                        CustomRequirement: function(age) {
                            return Data.fireCanAccessBossKeyPath(age);
                        }
                    },
                    bigLavaRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Top Locked Door in Lobby",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
                        }
                    },
                    bossRoom: {
                        CustomRequirement: function(age) {
                            let canGetToDoor = age === Age.ADULT || Data.canMegaFlip(age);
                            let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
                            return canGetToDoor && tunicCheck && hasBossKey("Fire Temple");
                        }
                    },

                    Exit: {
                        OwExit: OwExits["Fire Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Goron Near Boss Door": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 34, y: 263, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the left door into the small room with lava. Navigate to the upper left corner of the room and step on the switch. The chest is inside the Goron cage.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Settings.GlitchesToAllow.fireNoGoronTunic;
                            }
                            return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                        }
                    },
                    "2 Pots Near Boss Door": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 45, y: 158, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 2,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the left door into the small room with lava. Navigate to the upper right corner of the room using your hookshot, hover boots, or by megaflipping. Climb up to get to the pots (2/4 are fairies).",
                        CustomRequirement: function(age) {
                            let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                            let canGetThere = Data.canMegaFlip(age) || Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.playerHas;
                            return tunicCheck && canGetThere;
                        }
                    },

                    // Locked Doors
                    "Bottom Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 126, y: 214, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "This is the door behind the pillar on the bottom of the lobby.",
                        RequiredToAppear: function() { return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.SMALL_KEY_SANITY; },
                        KeyRequirement: function(age) {
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: 0, max: 0 };
                            }
                            return { min: 1, max: Keys.FIRE_TEMPLE.totalKeys()};
                        },
                        CustomRequirement: function(age) {
                            return Data.fireCanAccessBossKeyPath(age);
                        }
                    },
                    "Top Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 136, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This is the top right door in the lobby.",
                        KeyRequirement: function(age) {
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: 1, max: 1 };
                            }

                            let minValue = 1;
                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 2 };
                        }
                    },
                    "Locked Door in Big Lava Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["bigLavaRoom"],
                        MapInfo: { x: 257, y: 202, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
                        LongDescription: "This is the door on the east side of the big lava room.",
                        KeyRequirement: function(age) {
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: 2, max: 2 };
                            }

                            let minValue = 2;
                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 3 };
                        }
                    },
                    "Locked Door After Rising Block": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["bigLavaRoom"],
                        MapInfo: { x: 247, y: 92, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "This is the door you reach after riding the block up the fire pillar.",
                        KeyRequirement: function(age) {
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: 3, max: 3 };
                            }

                            let minValue = 3;
                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 4 };
                        }
                    },
                    "Locked Door in Boulder Maze": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["boulderMazeLower"],
                        MapInfo: { x: 289, y: 135, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 18,
                        LongDescription: "This is the locked door in the boulder maze.",
                        KeyRequirement: function(age) {
                            let minValue = 4;
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: minValue, max: 4 };
                            }

                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 5 };
                        }
                    },
                    "Locked Door in Crater Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["narrowBridgeRoom", "fireWallRoom"],
                        MapInfo: { x: 283, y: 170, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 21,
                        LongDescription: "This is the locked door in the crater room with narrow ledges.",
                        KeyRequirement: function(age) {
                            let minValue = 5;
                            if (Settings.GlitchesToAllow.fireJailClip) {
                                minValue = 4;
                            }

                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: minValue, max: 5 };
                            }

                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 6 };
                        }
                    },
                    "Locked Door in Fire Wall Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fireWallRoom"],
                        MapInfo: { x: 207, y: 170, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "This is the locked door you reach after going through the room with the big fire wall.",
                        KeyRequirement: function(age) {
                            let minValue = 6;
                            if (Settings.GlitchesToAllow.fireJailClip) {
                                // Skip both doors in the crater room
                                minValue-= 2;
                            }

                            else if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) {
                                minValue--;
                            }

                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: minValue, max: 6 };
                            }

                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 7 };
                        }
                    },
                    "Locked Door in Fire Maze Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["fireMazeRoomStart"],
                        MapInfo: { x: 119, y: 192, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "This is the locked door you reach after going through the fire wall maze.",
                        KeyRequirement: function(age) {
                            let minValue = 7;
                            if (Settings.GlitchesToAllow.fireJailClip) {
                                // Skip both doors in the crater room
                                minValue-= 2;
                            }

                            else if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) {
                                minValue--;
                            }

                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: minValue, max: 7 };
                            }

                            if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
                                minValue++;
                            }
                            return { min: minValue, max: 8 };
                        }
                    }
                }
            },
            bossKeyPath: {
                Exits: {
                    bossKeyRoom: {
                        Map: "Fire Temple",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                },
                ItemLocations: {
                    "Skulltula in Like-Like Room by Start": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 122, y: 13, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 4,
                        LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and enter the next room. The skulltula is on the back wall by the like-like."
                    },
                    "Flare Dancer Near Entrance": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 57, y: 60, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 5,
                        LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and continue until you get to the Flare Dancer room. To kill it - either use your hammer or hookshot to stun it. It will take three Master Sword jumpslashes to kill it. For some reason, the Biggoron's Sword will do less damage. Also, there's no need to try to jumpslash it more than once per cycle, as it won't do damage.",
                        RequiredChoiceOfAdultItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER, Items.HOOKSHOT],
                        RequiredChoiceOfChildItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER],
                    }
                }
            },
            bossKeyRoom: {
                Exits: {},
                ItemLocations: {
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 63, y: 111, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
                        Order: 6,
                        LongDescription: "After the flare dancer room (see the other task), continue to the next room. Hammer the rusted switch to gain access to the boss key chest."
                    }
                }
            },
            bigLavaRoom: {
                Exits: {
                    bigLavaRoomGoronRight: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Data.canGroundJumpWithBomb(age);
                            }
                            
                            return Data.hasExplosives();
                        }
                    },
                    bigLavaRoomSoTLedge: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD && !Data.canGroundJumpWithBomb(age)) { return false; }

                            return Data.canPlaySong(Songs.SONG_OF_TIME) ||
                                (age === Age.ADULT && Settings.GlitchesToAllow.fireSoTBlockJump);
                        }
                    },
                    risingBlockRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door in Big Lava Room",
                    }
                },

                ItemLocations: {
                    "3 Pots on Big Lava Room Ledge": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 227, y: 162, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Along the back left wall is a platform that will rise up to an alcove after you jump on it (child must megaflip). The pots are there.",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Data.canMegaFlip(age);
                        }
                    },
                    "Big Lava Room Left Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 277, y: 141, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the left door to find a Goron and a chest."
                    }
                }
            },
            bigLavaRoomGoronRight: {
                Exits: {},
                ItemLocations: {
                    "Big Lava Room Right Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 198, y: 280, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances ||
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.groundJump;
                        },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the right side of the room. Bomb the suspicious wall and follow the path to a Goron and a chest."
                    }
                }
            },
            bigLavaRoomSoTLedge: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Upper Left Big Lava Room": {
                        MapInfo: {x: 164, y: 90, floor: "F1" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.EITHER,
                        Order: 10,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances ||
                                !Settings.GlitchesToAllow.fireNoGoronTunic ||
                                !Settings.GlitchesToAllow.groundJump;
                        },
                        LongDescription: "Head to the left of the big lava room (the one in the right door from the entrance of the temple). Play the Song of Time to get a platform to the above room. The skulltula is on the back wall by the like-like."
                    }
                }
            },
            risingBlockRoom: {
                Exits: {
                    firstTorchSlugRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door After Rising Block"
                    }
                },
                ItemLocations: {
                    "3 Hearts on Left Ledge": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 324, y: 176, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic;
                        },
                        LongDescription: "Open the locked door on the other side of the big lava room. Climb up the grate and navigate to the left of the room (opposite to where you go for the giant block). The hearts are up there guarded by some keese."
                    }
                }
            },
            firstTorchSlugRoom: {
                Exits: {
                    boulderMazeLower: {
                        Age: Age.ADULT,
                        Map: "Fire Temple",
                        CustomRequirement: function(age) {
                            let canGetByBlock = (Settings.GlitchesToAllow.groundJump && Data.canGroundJumpWithBomb(age)) || Equipment.STRENGTH.playerHas;
                            let canHitSwitchFromAbove = Data.hasExplosives() || Items.HOOKSHOT.playerHas || Data.canShootEyeSwitch(age);
                            return canGetByBlock || canHitSwitchFromAbove;
                        }
                    },
                    goronInPit: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.BOMB],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireJailClip;
                        }
                    },
                    goronInPitCell: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            boulderMazeLower: {
                Exits: {
                    narrowBridgeRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door in Boulder Maze"
                    }
                },

                ItemLocations: {
                    "Lower Boulder Maze Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 320, y: 201, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "When you first enter the boulder maze, turn to the right. Walk in that general direction and you'll eventually find a Goron and a chest in a cage. Step on the switch to get in."
                    },
                    "Skulltula in Weak Wall in Boulder Maze": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 322, y: 103, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "From the lower entrance of the boulder maze, turn left. Walk in that general direction until you reach the end. You should hear the skulltula through the wall - bomb it to gain access.",
                        NeedsExplosives: true
                    },
                    "Lower Boulder Maze Side Room Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 283, y: 51, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "From the lower boulder maze Goron, make your way to the complete opposite side of the maze. This is equivalent to turning left from the entrance of the maze, and going in that direction. You'll run into a door - if you don't see it, try heading to the left. It should be the unlocked door. Inside, there's a hallway with another Goron and chest."
                    }
                }
            },
            narrowBridgeRoom: {
                Exits: {
                    mapEnclosure: {
                        CustomRequirement: function(age) {
                            return Data.canShootEyeSwitch(age);
                        }
                    },

                    fireWallRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door in Crater Room"
                    }
                },
                ItemLocations: {
                    "3 Hearts in Narrow Bridge Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 293, y: 155, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Make your way to the scary room with the giant pit that you get to from the boulder maze. You must make a sketchy jump to get to the hearts."
                    }
                }
            },
            fireWallRoom: {
                Exits: {
                    mapEnclosure: {},
                    boulderMazeUpper: {},
                    fireMazeRoomStart: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door in Fire Wall Room"
                    }
                },
                ItemLocations: {
                    "2 Hearts on Fire Wall Room Pillars": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 231, y: 147, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "Make your way to the scary room with the giant pit that you get to from the boulder maze. Go through the locked door from there. Climb up two of the pillars in the middle of the room to get these items."
                    },
                    "Heart in Fire Wall Room Back": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 265, y: 104, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "Make your way to the scary room with the giant pit that you get to from the boulder maze. Go through the locked door from there. The hearts are on a platform on the other side of the room."
                    }
                }
            },
            mapEnclosure: {
                Exits: {
                    narrowBridgeRoom: {},
                    fireWallRoom: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.MEGATON_HAMMER, Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireCraterRoomKeySkip;
                        }
                    }
                },

                ItemLocations: {
                    "Map Chest in Fire Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 258, y: 150, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "First, make your way to the scary room with the giant pit that you get to from the boulder maze. There are two paths to get this chest. First, you can shoot the eye switch in this room with a bow and enter the room that opens up to get to the chest. If you don't have a bow, you must enter the other door instead. Make your way to the other side of the room. You can climb onto the cage and drop down onto the chest from this side."
                    }
                }
            },
            boulderMazeUpper: {
                Exits: {
                    // These first two are used for the jail clip trick
                    boulderMazeLower: {},
                    fireWallRoom: {},
                    goronInPit: {
                        NeedsExplosives: true
                    },
                    scarecrowRoom: {
                        CustomRequirement: function(age) {
                            return Data.canHookScarecrow(age);
                        }
                    }
                },

                ItemLocations: {
                    "Upper Boulder Maze Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 302, y: 222, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Jump on the platforms across the room to get to the Goron and chest in the cage on the other side. Be sure to step on the switch on the way there to open the cage."
                    }
                }
            },
            goronInPit: {
                Exits: {
                    goronInPitCell: {},
                    boulderMazeUpper: {}
                },
                ItemLocations: {}
            },
            goronInPitCell: {
                Exits: {},
                ItemLocations: {
                    "Goron in Bombable Pit": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 164, y: 90, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. On one of the platforms, there's a very obvious crack in the floor. Bomb it to break it open. Follow the path it unlocks to another Goron and chest in a cage."
                    }
                }
            },
            scarecrowRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula on Climbable Wall After Scarecrow": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 335, y: 84, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. As you go through the next room, you should run into the skulltula."
                    },
                    "Skulltula on Top After Scarecrow": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 241, y: 156, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. Navigate through the next room's switch puzzle into the outside room. The skulltula should be on the wall to your left."
                    },
                    "Chest in Scarecrow Song Area": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 220, y: 148, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. Navigate through the next room's switch puzzle into the outside room. There's a switch you can press in this room - after you press it, you must quicky make your way around the room to get the chest before the fire is ignited once more. It is possible with the hookshot, just make sure you're close enough to the pillar - it's important to hook it quickly to get enough time."
                    }
                }
            },
            fireMazeRoomStart: {
                Exits: {
                    fireMazeRoomEnd: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireWallSkip;
                        }
                    },
                    centerRoomBottom: {
                        Map: "Fire Temple",
                        LockedDoor: "Locked Door in Fire Maze Room"

                    },
                    centerRoomTopSwitch: {
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                },

                ItemLocations: {
                    "Compass Chest in Fire Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 191, y: 81, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. To get to the Compass chest, you must enter the door to the right of the entrance. Make your way through the maze to that door, being careful of the spawning fires."
                    },
                    "4 Pots by Left Fire Maze Totem": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 84, y: 215, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. Navigate the maze to the left to get to the pots."
                    }
                }
            },
            fireMazeRoomEnd: {
                Exits: {
                    centerRoomBottom: {},
                    hammerChestRoom: {
                        NeedsExplosives: true,
                        NeedsSwordWeapon: true
                    }
                },
                ItemLocations: {
                    "4 Pots by Right Fire Maze Exit": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 76, y: 144, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "By the exit to the fire maze (after you hit the switch to pass the giant fire wall), there are 2 pots to either side of the door (4 total)."
                    }
                }
            },
            hammerChestRoom: {
                Exits: {
                    centerRoomTopSwitch: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireJumpDownToSoTBlock && Data.canUseHammer(age);
                        }
                    },
                    centerRoomBottom: {}
                },

                ItemLocations: {
                    "Hammer Chest at Very Top": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 43, y: 157, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. Make your way around the entire maze. First, you must navigate to the left side of the middle pillar. After you go through that, you must navigate to a switch that lowers the bigger fire wall. Bomb the fake door and defeat the Flare Dancer (see the other Flare Dancer task for advice on this). Ride his platform up to the next room. Make your way though the fire switch puzzle room into the next room. In this room, you must hit the switch and then quickly navigate over to the hammer chest. Alternatively, you can let a fire keese hit you near the chest, then spam A to open it before you're damaged by the chest fire."
                    }
                }
            },
            centerRoomBottom: {
                Exits: {
                    fireMazeRoomEnd: {},
                    centerRoomTopSwitch: {
                        RequiredItems: [Items.MEGATON_HAMMER],
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    centerRoomCell: {
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            centerRoomTopSwitch: {
                Exits: {
                    centerRoomBottom: {},
                    centerRoomCell: {}
                },
                ItemLocations: {}
            },
            centerRoomCell: {
                Exits: {},
                ItemLocations: {
                    "Goron in Center of Fire Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 124, y: 162, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "There are a couple ways to get here - either one requires the Megaton Hammer. One way starts at the hammer chest. See that task for how to get there. At the hammer chest, simply jump into the giant crater - you'll end up in this room. Once there, play the Song of Time to spawn the block and climb it up (you can also land up there with a precise enough angle). Now hammer the rusted switch to free the Goron and get to the chest. The alternative way is from the start of the fire wall maze. You can use your hover boots from the start to navigate to the barred door near the entrance. Hammer the rusted switch once you're there. Enter and jump across to the other side. If you don't have the Song of Time to move the block, simply jumpslash it with the hammer to hit the switch underneath."
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
        Floors: ["F3", "F2", "F1", "B1"],
        StartingFloorIndex: 0,
        Regions: {
            main: {
                Exits: {
                    midEastWingPots: {
                        CustomRequirement: function(age) {
                            if (Data.canUseBoomerang(age)) { return true; }
                            let canBreakPot = (age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas)) ||
                                (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas);
                            return canBreakPot && Data.canSinkGoldenScaleDepth(age);
                        }
                    },
                    lowEastWingPots: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    compassRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
                    },
                    lowWaterLevel: {
                        RequiredChoiceOfItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    highWaterLevel: {
                        CustomRequirement: function(age) {
                            return !Data.waterIsPlayerLockedOutOfHighWater();
                        }
                    },
                    roomWithManyTektitesAntechamber: {
                        Map: "Water Temple",
                        Age: Age.ADULT,
                        RequiredAdultItems: [Equipment.IRON_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Water Temple"]["Exit"]
                    }
                },

                ItemLocations: {
                    // Locked Doors
                    "Locked Door on Top Floor": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["highWaterLevel"],
                        MapInfo: { x: 185, y: 220, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 1,
                        LongDescription: "This is the door on the top west floor of the temple. You need the water raised to open it.",
                        KeyRequirement: function(age) {
                            let keysReq = 4;
                            let canDrainWater = Equipment.IRON_BOOTS.playerHas && Data.canPlaySong(Songs.ZELDAS_LULLABY);
                            if (!canDrainWater) {
                                keysReq--; // Can't open the central door
                            }
                            if (!Equipment.IRON_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade !== 2) {
                                keysReq -= 2; // Can't open the tektite room doors
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door in Waterfall Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["waterfallRoom"],
                        MapInfo: { x: 86, y: 220, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 3,
                        LongDescription: "This is the door in the waterfall room with the platforms. You get here from the locked door on the top floor.",
                        RequiredItems: [Items.HOOKSHOT],
                        KeyRequirement: function(age) {
                            let keysReq = 5;
                            let canDrainWater = Equipment.IRON_BOOTS.playerHas && Data.canPlaySong(Songs.ZELDAS_LULLABY);
                            if (!canDrainWater) {
                                keysReq--; // Can't open the central door
                            }
                            if (!Equipment.IRON_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade !== 2) {
                                keysReq -= 2; // Can't open the tektite room doors
                            }

                            return { min: 2, max: keysReq };
                        }
                    },
                    "Locked Door to Central Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["lowWaterLevel"],
                        MapInfo: { x: 169, y: 220, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "OPTIONAL DOOR: This is the door on the bottom floor leading into the central room. The water needs to be drained to open it.<br/><br/>Note that this door is entirely optional if you have a bow or fire item, as you can light a torch on the central middle platform to get here.",
                        KeyRequirement: function(age) {
                            let keysReq = 5;
                            if (Items.HOOKSHOT.currentUpgrade !== 2) {
                                keysReq -= 2; // Can't open the tektite room doors
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door in Bottom North Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomWithManyTektitesAntechamber"],
                        MapInfo: { x: 191, y: 113, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "This is the door on the bottom north path. You can use iron boots or drain the water to get here. Longshot or backwalk/hover boots/backflip across to get to the door.",
                        RequiredChoiceOfAdultItems: [Equipment.HOVER_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
                        KeyRequirement: function(age) {
                            let keysReq = 4;
                            if (!Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
                                keysReq--; // Can't open the central door
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door after Boulder Waterfall": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["boulderWaterfall"],
                        MapInfo: { x: 123, y: 70, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "This is the door you reach after passing the boulder waterfall in the room behind the locked door in the bottom north room.",
                        KeyRequirement: function(age) {
                            let keysReq = 5;
                            if (!Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
                                keysReq--; // Can't open the central door
                            }

                            return { min: 2, max: keysReq };
                        }
                    }
                }
            },
            compassRoom: {
                Exits: {},
                ItemLocations: {
                    "Compass on Mid East Wing": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 302, y: 95, floor: "F2" },
                        LongDescription: "The compass chest is in the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there. Once at the surface, either hit the switch to lower the water around the chest, or just roll into the chest and spam A to open it.",
                        Age: Age.ADULT,
                        Order: 25
                    },
                    "3 Pots in Mid East Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 283, y: 58, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "The compass room is in the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there. Once at the surface, look in the corner of the room for the pots.",
                    }
                }
            },
            midEastWingPots: {
                Exits: {},
                ItemLocations: {
                    "2 Pots by Mid East Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 216, y: 131, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 24,
                        LongDescription: "The pots are by the entrance to the mid eastern wing. If you can't break them normally, you can either get them with the boomerang, or break them with a hookshot/bow/slingshot and dive for the item."
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
                        Order: 16,
                        LongDescription: "These pots are by the door in the lower eastern wing. Either use iron boots and the hookshot the break them, or drain the water."
                    }
                }
            },
            lowWaterLevel: {
                Exits: {
                    lowEastWingPots: {},
                    midEastWingPots: {},
                    compassRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    bottomSouthWing: {
                        Age: Age.ADULT,
                        NeedsExplosives: true,
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
                        RequiredChoiceOfItems: [Equipment.SCALE, Equipment.IRON_BOOTS]
                    },
                    midWaterTriforceFloor: {
                        CustomRequirement(age) {
                            return (age === Age.ADULT && Items.FAIRY_BOW.playerHas) || Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    centralRoomBottom: {
                        Map: "Water Temple",
                        LockedDoor: "Locked Door to Central Room"
                    },
                    dragonRoom: {
                        RequiredItems: [Equipment.STRENGTH],
                        RequiredChildItems: [Equipment.SCALE],
                        RequiredChoiceOfAdultItems: [Equipment.SCALE, Equipment.IRON_BOOTS]
                    },
                    behindBlockArea: {
                        CustomRequirement: function(age) {
                            let canGetToArea = Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
                            return canGetToArea && Data.canWeirdShot(age);
                        }
                    },
                    roomWithManyTektitesAntechamber: {},
                    crackedWallArea: {
                        CustomRequirement(age) {
                            return Settings.GlitchesToAllow.waterBombableWallEarly;
                        }
                    }
                },

                ItemLocations: {
                    "Lower Water Level": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        Age: Age.ADULT,
                        Order: 15,
                        MapInfo: { x: 291, y: 234, floor: "F3" },
                        LongDescription: "To get here, go to the bottom east wing and float up to the top. If you don't have iron boots, you can longshot the torches to get down there!"
                    },
                    "Chest After Torches in Bottom East Wing": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 17,
                        MapInfo: { x: 326, y: 212, floor: "F1" },
                        LongDescription: "From the entrance of the temple, jump off and sink down to the bottom. Head down the hallway of the east room. Take off your iron boots and float up to the surface. Play Zelda's lullaby at the Triforce to lower the water. Now head back down.<br/><br>In this room, light the torches wih your bow or with Din's fire.<br/><br/>Child can use sticks to light the torches as well, and can kill the enemies in the next room with spin attacks if he has magic",
                        RequiredChildItems: [Equipment.MAGIC, Equipment.KOKIRI_SWORD],
                        CustomRequirement: function(age) {
                            let canUseBow = age === Age.ADULT && Items.FAIRY_BOW.playerHas;
                            return canUseBow || Data.canUseDekuStick(age) || Data.canUseFireItem(age);
                        }
                    }
                }
            },
            bottomSouthWing: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Low South Wing": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.ADULT,
                        Order: 18,
                        MapInfo: { x: 19, y: 261, floor: "F1" },
                        LongDescription: "First, drain the water in the temple. Now head the bottom southern wing. Bomb the cracked floor. Make your way down the corridor into the next room. Cross the water using your hookshot or hover boots. In the back of this room, hit the switch in the cage with a jumpslash or charged spin attack to get to the skulltula."
                    },
                    "4 Pots in Low South Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 24, y: 268, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "First, drain the water in the temple. Now head the bottom southern wing. Bomb the cracked floor. Make your way down the corridor into the next room. Cross the water using your hookshot or hover boots. In the back of this room, hit the switch in the cage with a jumpslash or charged spin attack to get to the pots."
                    }
                }
            },
            midWaterTriforceFloor: {
                Exits: {
                    midWaterLevel: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    centralRoomBottom: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.IRON_BOOTS]
                    }
                },

                ItemLocations: {
                    "Skulltula by Mid Water Triforce": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 21,
                        MapInfo: { x: 157, y: 217, floor: "F1" },
                        LongDescription: "In the room with the middle water level Triforce, there is a skulltula high up on the wall. There are three ways to get it; the bottom two enable the hookshot to be used:<br/>- Use the longshot<br/>- Cast Farore's Wind in the room, raise the water to max, then warp back in<br/>- Open the door on the bottom leading here, then raise the water to max and re-enter this door",
                        IsAtShortDistance: true,
                        CustomRequirement: function(age) {
                            // You can just longshot it
                            if (age === Age.ADULT && Items.HOOKSHOT.currentUpgrade === 2) { 
                                return true; 
                            }

                            // Cast FW in the room, then raise the water and recast FW
                            let canCastFaroresWind = Equipment.MAGIC.playerHas && Items.FARORES_WIND.playerHas;
                            let canReRaiseWater = !Data.waterIsPlayerLockedOutOfHighWater();
                            if (canCastFaroresWind && canReRaiseWater) {
                                return true;
                            }

                            return false;
                        }
                    }
                }
            },
            centralRoomBottom: {
                Exits: {
                    midWaterTriforceFloor: {
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {}
            },
            midWaterLevel: {
                Exits: {
                    highWaterLevel: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Data.hasExplosives() || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    midWaterTriforceFloor: {},
                    behindBlockArea: {
                        CustomRequirement: function(age) {
                            if (Data.canWeirdShot(age)) { return true; } //TODO: test whether this is enough - do you need strength?
                            if (!Equipment.STRENGTH.playerHas || !Data.canShootEyeSwitch(age)) { return false; }

                            if (Settings.GlitchesToAllow.waterEyeSwitchGateFromTop) { return true; }
                            return age === Age.ADULT && (Items.HOOKSHOT.currentUpgrade > 1 || Equipment.HOVER_BOOTS.playerHas);
                        }
                    },
                    crackedWallArea: {}
                },

                ItemLocations: {
                    "Chest Under Rising Platform in Middle Room": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 22,
                        MapInfo: { x: 293, y: 214, floor: "B1" },
                        RequiredItems: [Items.HOOKSHOT, Equipment.IRON_BOOTS],
                        LongDescription: "After draining the water, head into the middle room on the bottom. This will initially be a locked door. Once inside, hookshot the target to get up to the mid water level triforce. Play Zelda's Lullaby to raise the water. Now, use your Iron boots to sink down in this room and enter the secret room under the floating block that was just raised up. Hit the crystal switch and defeat the enemies. When they're defeated, take off your boots and rise up to the top right corner of this room for the chest."
                    }
                }
            },
            behindBlockArea: {
                Exits: {},
                ItemLocations: {
                    "Chest Behind Block at Mid Level": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.waterEyeSwitchGateFromTop; },
                        Order: 27,
                        MapInfo: { x: 243, y: 243, floor: "F2" },
                        LongDescription: "First, make your way to the top east wing. Push back the block and then go to the southern mid-level.<br/><br/>Shoot the eye switch then quickly longshot the target or use your hover boots to pass the gate. Go down the room and push the red block backward. Now you must make your way back around, this time pushing the block forward out of your way. Head to the right to the chest.<br/><br/>Note that alternatively, you can shoot the eye switch twice to get the block in position."
                    },
                    "2 Pots Behind Block at Mid Level": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 245, y: 251, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.waterEyeSwitchGateFromTop; },
                        Order: 28,
                        LongDescription: "First, make your way to the top east wing. Push back the block and then go to the southern mid-level.<br/><br/>Shoot the eye switch then quickly longshot the target or use your hover boots to pass the gate. Go down the room and push the red block backward. Now you must make your way back around, this time pushing the block forward out of your way. Head to the right to the pots.<br/><br/>Note that alternatively, you can shoot the eye switch twice to get the block in position."
                    }
                }
            },
            crackedWallArea: {
                Exits: {},
                ItemLocations: {
                    "Bombable Wall Chest Below Water Lowering Triforce": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 23,
                        MapInfo: {x: 333, y: 131, floor: "F2" },
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        LongDescription: "After raising the water to mid level, make your way back toward the low level room. This time, you won't float up all the way to the top. In this room, you will see a cracked wall. Bomb it to get to a chest.",
                        NeedsExplosives: true
                    }
                }
            },
            highWaterLevel: {
                Exits: {
                    bossRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            if (!hasBossKey("Water Temple")) { return false; }

                            let hasLongshot = Items.HOOKSHOT.currentUpgrade === 2;
                            let canSkipLongshot = Data.canHammerHoverBootsSuperslide(age);
                            return hasLongshot || canSkipLongshot;
                        }
                    },
                    waterfallRoom: {
                        Map: "Water Temple",
                        Age: Age.ADULT,
                        LockedDoor: "Locked Door on Top Floor"
                    },
                },

                ItemLocations: {
                    "Chest by Water Lowering Triforce": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 332, y: 223, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "From the entrance of the temple, jump off and sink down to the bottom (or longshot a torch on the bottom of the east side). Head down the hallway of the east room. Take off your iron boots and float up to the surface. Enter the door and kill the enemies to spawn the chest.",
                        RequiredChoiceOfAdultItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    }
                }
            },
            waterfallRoom: {
                Exits: {
                    darkLinkRoom: {
                        Map: "Water Temple",
                        RequiredItems: [Items.HOOKSHOT],
                        LockedDoor: "Locked Door in Waterfall Room"
                    }
                },

                ItemLocations: {
                    "Skulltula in Waterfall Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.ADULT,
                        Order: 2,
                        MapInfo: {x: 130, y: 208, floor: "F3" },
                        LongDescription: "With the water raised to the highest level, enter the door at the left side on the upper floor. On the right wall, there is a skulltula. You can easily get it with the longshot. You can also get it with the hookshot if you stand on the very very top right corner of the highest red block. Note that it really does just barely reach - so much so that you won't even see the red indicator dot.",
                        RequiredItems: [Items.HOOKSHOT]
                    }
                }
            },
            darkLinkRoom: {
                Exits: {
                    whirlpoolRoom: {
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    }
                },

                ItemLocations: {
                    "2 Pots in Room Before Dark Link": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 55, y: 161, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 4,
                        LongDescription: "With the water level to the top, enter the door at the left on the upper floor. The pots are by the exit door of this room."
                    },
                    "Longshot Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 5,
                        MapInfo: { x: 55, y: 44, floor: "F3" },
                        LongDescription: "With the water level to the top, enter the door at the left on the upper floor. Proceed through the next two rooms and into the Dark Link fight. After defeating him, enter the next room for the chest."
                    }
                }
            },
            whirlpoolRoom: {
                Exits: {
                    dragonRoom: {
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                },

                ItemLocations: {
                    "Heart 1 in Whirlpool Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 22, y: 158, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "In the whirlpool river, this is one of the items you'll run into while swimming (before the first vortex)."
                    },
                    "Heart 2 in Whirlpool Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 32, y: 159, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "In the whirlpool river, this is one of the items you'll run into while swimming (after the first vortex)."
                    },
                    "Heart 3 in Whirlpool Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 45, y: 127, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "In the whirlpool river, this is one of the items you'll run into while swimming (before the second vortex, by the skulltula)."
                    },
                    "Skulltula in Whirlpool Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.ADULT,
                        Order: 9,
                        MapInfo: { x: 51, y: 121, floor: "F1" },
                        LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the blocks from the floor. Drop down. Now, make your way through the whirlpool room, avoiding them as much as possible. The skulltula is somewhere on the left wall when going down this path - equip the iron boots then hookshot it.",
                        RequiredItems: [Equipment.IRON_BOOTS],
                        IsAtShortDistance: true,
                    },
                    "Heart 4 in Whirlpool Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 55, y: 148, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "In the whirlpool river, this is one of the items you'll run into while swimming (before the third vortex)."
                    },
                    "Pot at End of Whirlpool Room": {
                        ItemGroup: ItemGroups.POT,
                        Age: Age.ADULT,
                        Order: 11,
                        MapInfo: { x: 49, y: 160, floor: "F1" },
                        LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the block from the floor. Drop down. Swim to the end of the room - the pots is the right one on a ledge (the other is a fairy)."
                    },
                    "Chest at End of Whirlpool Room": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 12,
                        MapInfo: { x: 73, y: 150, floor: "F1" },
                        LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the block from the floor. Drop down. Now, make your way through the whirlpool room, avoiding them as much as possible. When you get to the end, shoot the eye switch to open the cage. Now quickly hookshot the chest at the other side to get to it.",
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                }
            },
            dragonRoom: {
                Exits: {},
                ItemLocations: {
                    "Chest in Dragon Room at Bottom West Wing": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 13,
                        MapInfo: { x: 33, y: 61, floor: "F1" },
                        LongDescription: "There are two ways to get to this room. One way: after draining the water, make your way to the bottom west wing. Push the red block out of the way then follow the path. Get to the other side of the switch and water puzzle to get the dragon and whirlpool room.<br/><br/>The alternate path to this room is to drop down after the vortex room chest (post-Dark Link).<br/><br/>When here, use your Iron Boots to sink down in the upper right corner of the vortex room, on the lower dragon. From there, hookshot the crystal switch in the dragon's mouth. Now hookshot the target in the room that opens up. Unequip your Iron Boots then float up to the chest.<br/><br/>You can also line up a bombchu with the switch from the platform by the door. Now, either use your iron boots to navigate to the door, or dive using the silver scale to get there (you'll have to dive early enough - when you're near the right wall).",
                        CustomRequirement: function(age) {
                            let canUseIronBoots = age === Age.ADULT && Equipment.IRON_BOOTS.playerHas;
                            if (Items.BOMBCHU.playerHas) {
                                let canDiveDownNormally = Equipment.SCALE.playerHas || canUseIronBoots;
                                return Settings.GlitchesToAllow.waterDragonChestWithChu || canDiveDownNormally;
                            }

                            return canUseIronBoots && Items.HOOKSHOT.playerHas;
                        }
                    }
                }
            },
            roomWithManyTektitesAntechamber: {
                Exits: {
                    roomWithManyTektites: {
                        Map: "Water Temple",
                        Age: Age.ADULT,
                        RequiredChoiceOfAdultItems: [Equipment.HOVER_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
                        LockedDoor: "Locked Door in Bottom North Room"
                    },
                },
                ItemLocations: {}
            },
            roomWithManyTektites: {
                Exits: {
                    blockPuzzleRoom: {},
                    boulderWaterfall: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterBKShortcut;
                        }
                    }
                },
                ItemLocations: {}
            },
            blockPuzzleRoom: {
                Exits: {
                    boulderWaterfall: {
                        CustomRequirement: function(age) {
                            return Equipment.HOVER_BOOTS.playerHas || 
                                (Equipment.STRENGTH.playerHas && Data.hasExplosives()) ||
                                Data.canMegaFlip(age);
                        }
                    },
                    bossKeyRoom: {
                        Map: "Water Temple",
                        LockedDoor: "Locked Door after Boulder Waterfall"
                    }
                },
                ItemLocations: {
                    "2 Pots in Low North Block Puzzle Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 298, y: 23, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Head to the bottom of the main room - no need to lower the water if you don't want to. Enter the north wing. After you reach the dead end, equip your boots and surface. Longshot to the other side and enter the locked door. Navigate across the room to the other side - the pots are on the bottom in the corner."
                    }
                }
            },
            boulderWaterfall: {
                Exits: {
                    bossKeyRoom: {
                        Map: "Water Temple",
                        LockedDoor: "Locked Door after Boulder Waterfall",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterBKShortcut;
                        }
                    }
                },

                ItemLocations: {
                    "Skulltula Near Boss Key Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.ADULT,
                        Order: 31,
                        MapInfo: { x: 122, y: 91, floor: "F1" },
                        LongDescription: "Head to the bottom of the main room - no need to lower the water if you don't want to. Enter the north wing. After you reach the dead end, equip your boots and surface. Longshot to the other side and enter the locked door. Navigate across the room to the other side - might help to kill the tektites. Complete the puzzle in this room (or cross it with hover boots or a megaflip!) which requires you to explode a destroyable wall and push a block onto a switch. After the next room (water switch jumping puzzle), you should see the skulltula on the waterfall to the right.",
                        IsAtShortDistance: true
                    }
                }
            },
            bossKeyRoom: {
                Exits: {},
                ItemLocations: {
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 33,
                        MapInfo: { x: 123, y: 57, floor: "F1" },
                        LongDescription: "From the waterfall, use iron boots to navigate under the water to the locked door to the chest. If you don't have iron boots, you can jump from the platform with the door to the water to sink low enough to advance."
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
        Floors: ["F1", "B1", "B2"],
        StartingFloorIndex: 0,
        Regions: {
            main: {
                Exits: {
                    truthSpinnerRoom: {
                        CustomRequirement: function(age) {
                            let lensCheck = Settings.GlitchesToAllow.shadowLensless || (Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas);
                            if (!lensCheck) { return false; }
                            
                            let canCrossFirstGap = Data.canMegaFlip(age) ||
                                (age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas));
                                
                            return canCrossFirstGap;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Shadow Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    // Locked Doors
                    "Locked Door by Beamos": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterTruthSpinner"],
                        MapInfo: { x: 330, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip; },
                        LongDescription: "This is the door after the truth spinner room with the beamos. It's located behind the bombable wall.",
                        NeedsExplosives: true,
                        KeyRequirement: function(age) {
                            let max = 1;
                            if (Settings.GlitchesToAllow.shadowGateClip){
                                max++; // Gibdo room

                                let canGetToInvisibleSpikeRoom = Items.HOOKSHOT.playerHas && 
                                    (Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots);
                                if (canGetToInvisibleSpikeRoom) {
                                    max += 2; // Into and out of invisible spike room
                                }

                                let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                                let canCrossGap = Items.FAIRY_BOW.playerHas || canHitWithChu;
                                let canGetToBossRoom = Data.canPlaySong(Songs.ZELDAS_LULLABY) && (canHitWithChu || canCrossGap);
                                if (canGetToBossRoom) {
                                    max++; // Boss room door
                                }
                            }

                            return { min: 1, max: max };
                        }
                    },

                    "Locked Door in Giant Pit Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterBombableWall", "invisibleSpikeRoom"],
                        MapInfo: { x: 156, y: 92, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 21,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip; },
                        LongDescription: "This is the door after the invisible moving platform in the giant pit room.",
                        KeyRequirement: function(age) {
                            let max = 2;
                            if (Settings.GlitchesToAllow.shadowGateClip) {
                                max++; // Gibdo room

                                let canGetToInvisibleSpikeRoom = Items.HOOKSHOT.playerHas && 
                                    (Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots);
                                if (canGetToInvisibleSpikeRoom) {
                                    max++; // Into invisible spike room
                                }

                                let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                                let canCrossGap = Items.FAIRY_BOW.playerHas || canHitWithChu;
                                let canGetToBossRoom = Data.canPlaySong(Songs.ZELDAS_LULLABY) && (canHitWithChu || canCrossGap);
                                if (canGetToBossRoom) {
                                    max++; // Boss room door
                                }
                            }

                            return { min: 2, max: max };
                        }
                    },

                    "Locked Door in Invisible Spike Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["invisibleSpikeRoom", "windHallway"],
                        MapInfo: { x: 156, y: 45, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "This is the door in the room with redeads and invisible floor spikes that you have to hookshot up to",
                        KeyRequirement: function(age) {
                            let max = 3;
                            let min = 3;
                            if (Settings.GlitchesToAllow.shadowGateClip) {
                                max++; // Gibdo room

                                let canGetToInvisibleSpikeRoom = Items.HOOKSHOT.playerHas && 
                                    (Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots);
                                if (canGetToInvisibleSpikeRoom) {
                                    min = 2; // Into invisible spike room - no max, as it IS this door
                                }

                                let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                                let canCrossGap = Items.FAIRY_BOW.playerHas || canHitWithChu;
                                let canGetToBossRoom = Data.canPlaySong(Songs.ZELDAS_LULLABY) && (canHitWithChu || canCrossGap);
                                if (canGetToBossRoom) {
                                    max++; // Boss room door
                                }
                            }

                            return { min: min, max: max };
                        }
                    },

                    "Locked Door in Gibdo Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["windHallway", "boatRoomStart"],
                        MapInfo: { x: 303, y: 127, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 30.1,
                        LongDescription: "This is the room with the gibdos after the hallway of fans.",
                        KeyRequirement: function(age) {
                            let max = 2;
                            let min = 4;
                            if (Settings.GlitchesToAllow.shadowGateClip) {
                                max++; // Gibdo room
                                min = 1;

                                let canGetToInvisibleSpikeRoom = Items.HOOKSHOT.playerHas && 
                                    (Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots);
                                if (canGetToInvisibleSpikeRoom) {
                                    max++; // Into invisible spike room
                                }

                                let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                                let canCrossGap = Items.FAIRY_BOW.playerHas || canHitWithChu;
                                let canGetToBossRoom = Data.canPlaySong(Songs.ZELDAS_LULLABY) && (canHitWithChu || canCrossGap);
                                if (canGetToBossRoom) {
                                    max++; // Boss room door
                                }
                            }

                            return { min: min, max: max };
                        }
                    },

                    "Locked Door After Boat Ride": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["acrossChasmToBossRoom"],
                        MapInfo: { x: 132, y: 136, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "This is the room with the gibdos after the hallway of fans.",
                        KeyRequirement: function(age) {
                            let min = 5;
                            if (Settings.GlitchesToAllow.shadowGateClip) {
                                min = 1;
                            }

                            return { min: min, max: 5 };
                        }
                    },
                }
            },
            truthSpinnerRoom: {
                Exits: {
                    afterTruthSpinner: {
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas) || Data.canMegaFlip(age);
                        }
                    }
                },

                ItemLocations: {
                    "2 Pots in Map Chest Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 101, y: 121, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        Order: 1,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. The room is somewhere on your right. The pots are in the back corners of the room."
                    },
                    "Dungeon Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 100, y: 107, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. The dungeon map chest room is somewhere on the wall to your right. You must kill all the enemies inside to get it.",
                        NeedsDamagingItem: true
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
                        Order: 3,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar until you find the pots."
                    },
                    "Flying Pot in Back Maze Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 71, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. Go to your left and the pot should fly into you."
                    },
                    "3 Pots in Back Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 62, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        Order: 5,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. The pots are in the next room on the left."
                    },
                    "Pot by Dead Hand Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 55, y: 148, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. The pot is on the other side of the room by the fake wall to Dead Hand."
                    },
                    "Hover Boots Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 15, y: 142, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Navigate all the way through the fake wall maze and defeat Deadhand for the chest.",
                        NeedsSwordWeapon: true
                    }
                }
            },
            afterTruthSpinner: {
                Exits: {
                    afterBombableWall: {
                        Map: "Shadow Temple",
                        NeedsExplosives: true,
                        LockedDoor: "Locked Door by Beamos"
                    },
                    boatRoomStart: {
                        Map: "Shadow Temple",
                        Age: Age.ADULT,
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowGateClip;
                        }
                    }
                },

                ItemLocations: {
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 300, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the right path (it's a fake wall) and enter the room. Defeat the gibdos for a chest.",
                        NeedsSwordWeapon: true
                    },
                    "Scythe Room Silver Rupee Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 121, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the left path (it's a fake wall) and enter the room. Collect all the silver rupees to open the path to a chest.<br/><br/>If you have no hookshot, you can use hover boots to get to the wooden box from one of the wooden platforms.",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || 
                                Equipment.HOVER_BOOTS.playerHas || 
                                Settings.GlitchesToAllow.shadowSilverRupeeWithNothing;
                        }
                    }
                }
            },
            afterBombableWall: {
                Exits: {
                    invisibleSpikeRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Giant Pit Room"
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
                        Order: 11,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). The hearts are in the back left corner. Play the Song of Time to spawn a block to get them.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "Visible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 138, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is behind the gate that opened.",
                        NeedsSwordWeapon: true
                    },
                    "Invisible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 143, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is next to the visible chest.",
                        NeedsSwordWeapon: true
                    },
                    "Skulltula in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 348, y: 140, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 14,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The skulltula is behind the open gate.<br/><br/>If you are an adult and have no hookshot, you can kill the skulltula with a jumpslash. Line yourself up so that you, the chest, and the token are in a line. Face the other way and do two backflips (Down + Z + spam A). If you were the right distance away, you should grab the token after backflipping off the chest.",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Data.canGrabShortDistances(age);
                        }
                    },
                    "2 Lower Pots in Falling Spikes Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 51, y: 221, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The pots are to the right of the falling spikes, guarded by the spike trap."
                    },
                    "Skulltula in Falling Spikes Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 52, y: 238, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 16,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The skulltula is in the first cage to the left near the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade.",
                        CustomRequirement: function(age) {
                            return Data.canGrabShortDistances(age) || Data.canStaircaseHover(age);
                        }
                    },
                    "Bottom Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 37, y: 212, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The chest is on the second cage to the right passed the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade."
                    },
                    "Top Switchless Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 239, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 18,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. The chest is in a cage in the corner of the room.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Equipment.STRENGTH.playerHas) || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    },
                    "Top Switch Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 76, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 19,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. Hit the switch on top and then get the chest that spawns.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Equipment.STRENGTH.playerHas) || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    },
                    "2 Upper Pots in Falling Spikes Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 82, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 20,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. The pots are on the top of the area you pulled the block out of.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Equipment.STRENGTH.playerHas) || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    }
                }
            },
            invisibleSpikeRoom: {
                Exits: {
                    afterBombableWall: {
                        Map: "Shadow Temple",
                        Age: Age.ADULT,
                        LockedDoor: "Locked Door in Giant Pit Room"
                    },

                    giantSkullRoom: {
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.HOOKSHOT]
                    },

                    windHallway: {
                        Map: "Shadow Temple",
                        Age: Age.ADULT,
                        RequiredAdultItems: [Items.HOOKSHOT],
                        LockedDoor: "Locked Door in Invisible Spike Room",
                        CustomRequirement: function(age) {
                            return Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots;
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Invisible Spike Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 156, y: 64, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 22,
                        UseAdultAge: function() { 
                            return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
                        },
                        LongDescription: "To get here, first head to the area with the beamos and spike traps. Face the door leading to the ceiling spike room. Now turn right. Follow the edge of the pit in front of you all the way to the guillotine. Use your Lens of Truth to navigate the platforms and make it to the door. Once inside, kill all the redeads to spawn the chest. Be careful of the invisible spikes in here - you can equip the Goron Tunic to avoid some damage since they act like lava.",
                        NeedsSwordWeapon: true
                    }
                }
            },
            giantSkullRoom: {
                Exits: {},
                ItemLocations: {
                    "Key in Giant Skull": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 92, y: 70, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "To get here, start at the invisible spike room. Collect all the silver rupees using your hookshot. Note that there are a few invisible targets. Enter the room on the bottom that unlocks. Throw a Bomb or Bomb Flower into the giant skull to spawn the key.",
                        CustomRequirement: function(age) {
                            let canUseChu = Settings.GlitchesToAllow.shadowGiantSkullsWithChus && Items.BOMBCHU.playerHas;
                            return canUseChu || Items.BOMB.playerHas || Equipment.STRENGTH.playerHas;
                        }
                    },

                    "Skulltula in Giant Skull Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 77, y: 68, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "To get here, start at the invisible spike room. Collect all the silver rupees using your hookshot. Note that there are a few invisible targets. Enter the room on the bottom that unlocks. The skulltula is behind the giant skull."
                    }
                }
            },
            windHallway: {
                Exits: {
                    invisibleSpikeRoom: {
                        Map: "Shadow Temple",
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT],
                        LockedDoor: "Locked Door in Invisible Spike Room",
                        CustomRequirement: function(age) {
                             return Equipment.IRON_BOOTS.playerHas || Settings.GlitchesToAllow.shadowNoIronBoots;
                        }
                    },
                    boatRoomStart: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Gibdo Room"
                    }
                },

                ItemLocations: {
                    "Invisible Chest at Wind Hallway": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 198, floor: "B1"  },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "Start at the invisible spikes room. Navigate to the door on the upper platform. If you don't have the longshot, you'll need to first backflip on the chest to get enough height to hit the invisible target. Navigate through the fans using your Iron Boots. Use your hookshot on the horizontal wooden pillar to pass the gap. Make your way to the end of the hallway and enter the door. There is an invisible chest in the back right corner of this room."
                    },
                    "2 Flying Pots in Gibdo Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 142, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. The pots will fly at you as you approach the back of the room."
                    },
                    "2 Pots in Gibdo Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 302, y: 152, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. The pots are on either side of the gibdos."
                    },
                    "Chest in Gibdo Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 302, y: 146, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. Kill the gibdos to spawn the chest."
                    },
                    "Chest in Rubble in Gibdo Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 309, y: 156, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. Bomb the rubble to your right to uncover an invisible chest.",
                        NeedsExplosives: true
                    }
                }
            },
            boatRoomStart: {
                Exits: {
                    windHallway: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Gibdo Room"
                    },
                    boatRoomEnd: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                },

                ItemLocations: {
                    "Skulltula in Boat Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 274, y: 116, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. If you face the front of the boat, you can see the skulltula slightly to your left. You can get it with your longshot - Scarecrow's Song can help, but isn't needed.",
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    "2 Hearts in Boat Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 280, y: 114, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole.<br/><br/>Play scarecrow's song from the boat and longshot it to get to the platform with the hearts.",
                        RequiredSongs: [Songs.SCARECROWS_SONG],
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    }
                }
            },
            boatRoomEnd: {
                Exits: {
                    chasmScarecrowPlatform: {
                        RequiredSongs: [Songs.SCARECROWS_SONG],
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    acrossChasmToBossRoom: {
                        CustomRequirement: function(age) {
                            let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
                            return Items.FAIRY_BOW.playerHas || canHitWithChu;
                        }
                    }
                },

                ItemLocations: {
                    "Pot on Boat Side of Chasm": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 135, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across.<br/><br/>The pot is the one on the right near where the bridge falls (the other pot is empty)."
                    },
                    "Pot in Spike Wall Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 89, y: 51, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. The pot is in front of you."
                    },
                    "Chest in Spike Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 70, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the chest.",
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            return canUseDins || Data.canWeirdShot(age);
                        }
                    },
                    "Boss Key Chest in Spike Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 108, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the boss key chest.<br/><br/>If you don't have it, run up against the right side of the wall in the back of the room and have the redead freeze you. You should phase through the wall."
                    },
                    "Skulltula in Triple Skull Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 28, y: 98, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room straight across from you to get to the skulltula."
                    },
                    "9 Rupees in Triple Skull Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "9 Skull Rupees",
                        MapInfo: { x: 38, y: 99, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 38,
                        LongDescription: "From the room with invisible walls, enter the room that's straight ahead of you (the west room). Use the bomb flower or your own bombs to blow up all three skulls to spawn the 9 items.",
                        CustomRequirement: function(age) {
                            let canUseChu = Settings.GlitchesToAllow.shadowGiantSkullsWithChus && Items.BOMBCHU.playerHas;
                            return canUseChu || Items.BOMB.playerHas || Equipment.STRENGTH.playerHas;
                        }
                    },
                    "2 Pots in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 89, y: 131, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 39,
                        LongDescription: "From the invisible wall room, enter the room to the left (the south room). The pots are on the back wall in the corners."
                    },
                    "Chest in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 89, y: 148, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your left. Kill the invisible floor master to spawn the chest."
                    }
                }
            },
            chasmScarecrowPlatform: {
                Exits: {
                    acrossChasmToBossRoom: {}
                },
                ItemLocations: {
                    "2 Hearts on Chasm Scarecrow Platform": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 120, y: 116, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 42,
                        LongDescription: "After riding the boat across, you can get to this platform in two ways.<br/><br/>1: Lower the bridge, play Song of Time by the ruins to make a block appear. Now, play scarecrow's song from the block and hookshot to the platform.<br/><br/>Go to the end of the broken bridge and play scarecrow's song. You can longshot the scarecrow from there to get to the platform. Be careful not to strand yourself on that side!"
                    }
                }
            },
            acrossChasmToBossRoom: {
                Exits: {
                    chasmScarecrowPlatform: {
                        RequiredSongs: [Songs.SONG_OF_TIME, Songs.SCARECROWS_SONG],
                        RequiredItems: [Items.HOOKSHOT],
                    },
                    bossRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door After Boat Ride",
                        CustomRequirement: function(age) {
                            if (!hasBossKey("Shadow Temple")) { return false; }

                            let canGetToDoor = Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
                            return canGetToDoor;
                        }
                    }
                },
                ItemLocations: {
                    "Heart on Pillar Across Chasm": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 125, y: 124, floor: "B1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.ADULT,
                        Order: 41,
                        LongDescription: "After departing the boat, either shoot the bombflower to lower the bridge, or use longshot/scarecrow's song from the broken bridge to cross. Play the Song of Time near the broken pillar with the heart to summon a block to use to get it.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "2 Pots by Boss Antechamber Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 132, y: 128, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "These pots are by the boss antechamber entrance across the chasm."
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
        Floors: ["F4", "F3", "F2", "F1"],
        StartingFloorIndex: 3,
        UseAltOrder: function() {
            return Equipment.STRENGTH.currentUpgrade > 1 && Keys.SPIRIT_TEMPLE.keyCount > 0;
        },
        Regions: {
            main: {
                Exits: {
                    childOnlyArea: {
                        Age: Age.CHILD
                    },
                    beyondSilverBlock: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.spiritCanAccessAdultSide();
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Spirit Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    "2 Flying Pots in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 250, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        AltOrder: 1,
                        LongDescription: "These are the pots that fly at you at the entrance to the temple."
                    },
                    "2 Pots in Lobby": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 236, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        AltOrder: 2,
                        LongDescription: "These pots are on either side of the first staircase in the lobby."
                    },

                    // Locked Doors
                    "Locked Door After Second Crawl Space": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterSecondCrawlSpace", "roomWithSunOnFloor"],
                        MapInfo: { x: 87, y: 100, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        AltOrder: 20,
                        LongDescription: "This is the door after the second crawlspace on the child side. It's also the door to the room with the sun on the floor.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: Keys.SPIRIT_TEMPLE.totalKeys()};
                        }
                    },
                    "Locked Door to Silver Gaunts Knuckle": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom"],
                        MapInfo: { x: 32, y: 198, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 20,
                        AltOrder: 25,
                        LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
                        KeyRequirement: function(age) {
                            // There's only one path for child, and it uses only 2 keys
                            if (!Data.spiritCanAccessAdultSide()) {
                                return { min: 2, max: 2 };
                            }

                            let minValue = 1;
                            if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
                                minValue++;
                            }
                            return { min: minValue, max: 5 };
                        }
                    },
                    "Locked Door After Silver Block": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["beyondSilverBlock"],
                        MapInfo: { x: 272, y: 167, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 25,
                        AltOrder: 6,
                        LongDescription: "This is the locked door after the silver block on the adult side.",
                        KeyRequirement: function(age) {
                            let minValue = 1;
                            if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
                                minValue++;
                            }
                            return { min: minValue, max: 3 };
                        }
                    },
                    "Locked Door in Statue Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom"],
                        MapInfo: { x: 256, y: 217, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 32,
                        AltOrder: 27,
                        LongDescription: "This is the locked door on the upper east part of the statue room.",
                        KeyRequirement: function(age) {
                            let minValue = 2;
                            if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
                                minValue++;
                            }
                            return { min: minValue, max: 4 };
                        }
                    },
                    "Locked Door in Anubis Room": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["adultAnubisRoom"],
                        MapInfo: { x: 223, y: 105, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 38,
                        AltOrder: 33,
                        LongDescription: "This is the locked door in the southwest corner of the room with Anubises and pits.",
                        KeyRequirement: function(age) {
                            let minValue = 3;
                            if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
                                minValue++;
                            }

                            return { min: minValue, max: 5 };
                        }
                    }
                }
            },
            childOnlyArea: {
                Exits: {
                    childAfterStalfos: {
                        CustomRequirement: function(age) {
                            if (Items.BOMBCHU.playerHas || Data.canMegaFlip(age)) { return true; }
                            if (age === Age.ADULT) {
                                return Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.currentUpgrade === 2;
                            }
                            let canClearFirstRoom = Data.hasExplosives() || Data.hasSwordWeapon();
                            let canHitSwitch = Items.FAIRY_SLINGSHOT.playerHas || Items.BOOMERANG.playerHas;
                            return canClearFirstRoom && canHitSwitch;
                        }
                    },
                    childSkulltulaInGrateRoom: {
                        RequiredChildItems: [Items.BOOMERANG],
                        RequiredAdultItems: [Items.HOOKSHOT]
                    },
                    afterSecondCrawlSpace: {}
                },
                ItemLocations: {}
            },
            childAfterStalfos: {
                Exits: {
                    childGrateRoom: {}
                },
                ItemLocations: {
                    "Flying Pot After Stalfos": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 39, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 3,
                        AltOrder: 39,
                        LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room. The goal in this room is to hit the switch to lower the bridge to get the chest on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos.<br/><br/>To use a bombchu, line up with the back wall and face the switch. Take out the chu then drop it after the first flash (like 1/2 a second).<br/><br/>Note that the flying pot you want to hit you is the one on the right; the left one contains nothing."
                    },
                    "Chest After Stalfos": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 31, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 4,
                        AltOrder: 40,
                        LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room. The goal in this room is to hit the switch to lower the bridge to get the chest on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos."
                    },
                    "Pot in Child Anubis Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 74, y: 47, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 5,
                        AltOrder: 41,
                        LongDescription: "Enter the room after the Stalfos with the bridge. The pot is the one right in front of you - the others are empty."
                    }
                }
            },
            childGrateRoom: {
                Exits: {
                    childSkulltulaInGrateRoom: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; } // You will have hookshot, since you need to weirdshot to get here
                            return Items.FAIRY_SLINGSHOT.playerHas || 
                                Items.DEKU_STICK.playerHas ||
                                Data.canUseFireItem(age) ||
                                Data.hasExplosives();
                        }
                    }
                },
                ItemLocations: {
                    "Chest After Anubis Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 75, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 6,
                        AltOrder: 42,
                        LongDescription: "WALL MASTER WARNING:<br/>Make your way around counter-clockwise around the child-only areas of the temple. In the room with the Anubis, either Din's fire him, or hit the switch then quickly navigate to the side directly opposite the fire so that it dies on it. In the room after that - collect the silver rupees to lower the bridge. Now you can use a Deku Stick (or Din's fire) to light the torches on the other side to spawn the chest. Note that you also could have used Din's fire on them earlier to avoid collecting the silver rupees.",
                        CustomRequirement: function(age) {
                            return Data.canUseDekuStick(age) || Data.canUseFireItem(age);
                        }
                    }
                }
            },
            childSkulltulaInGrateRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Grate Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 151, y: 90, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                        Order: 7,
                        AltOrder: 43,
                        LongDescription: "WALL MASTER WARNING:<br/>After killing all the enemies in the first child-only room, enter the right room. There's a skulltula on the grate - kill it and collect it with your Boomerang. If you don't have one, navigate around the rooms counter-clockwise. Collect the silver rupees to lower the bridge. Kill it with bombs, a bombchu (it can slide along the pit at the bottom), Din's Fire, a stick jumpslash from the other side, or a slingshot. You can actually climb the side of the grate that the token is on with a well-angled jump to collect it without a Boomerang."
                    }
                }
            },
            afterSecondCrawlSpace: {
                Exits: {
                    childOnlyArea: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canWeirdShot(age);
                        }
                    },
                    roomWithSunOnFloor: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    }
                },
                ItemLocations: {
                    "2 Crates After Second Crawlspace": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 88, y: 113, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        AltOrder: 21,
                        LongDescription: "These small crates are after the second crawlspace in the child area. Adult can get to them as well if he unlocks the door from the room with the sun on the floor."
                    }
                }
            },
            roomWithSunOnFloor: {
                Exits: {
                    afterSecondCrawlSpace: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    },
                    statueRoom: {
                        NeedsExplosives: true
                    }
                },
                ItemLocations: {
                    "Pot in Sun on Floor Room Bottom": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 84, y: 78, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        AltOrder: 19,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door. As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door). The pot is on the bottom section by the climbable wall."
                    },
                    "Skulltula in Sun on Floor Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 35, y: 133, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 11,
                        AltOrder: 18,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door. As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door). The skulltula is on the wall leading down the climbable wall. You can hit it with a jumpslash, an explosive, Din's Fire, or a ranged weapon."
                    },
                    "Left Chest in Sun on Floor Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 63, y: 141, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 12,
                        AltOrder: 16,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
                        RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
                        RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
                    },
                    "Right Chest in Sun on Floor Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 51, y: 131, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 13,
                        AltOrder: 17,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
                        RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
                        RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
                    }
                }
            },
            beyondSilverBlock: {
                Exits: {
                    openDoorsBySilverBlock: {
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Items.FAIRY_BOW, Items.BOMBCHU]
                    },
                    invisibleFloormasterRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Silver Block"
                    }
                },
                ItemLocations: {}
            },
            openDoorsBySilverBlock: {
                Exits: {},
                ItemLocations: {
                    "Compass Chest in Left Silver Block Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 226, y: 99, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22,
                        AltOrder: 3,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the left. Kill the wolfos inside, then play Zelda's Lullaby. You can longshot from the platform, or hookshot from the sandy floor.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Skulltula in Right Silver Block Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 296, y: 122, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 23,
                        AltOrder: 4,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right. On the left wall, there's a Song of Time block blocking this skulltula. Play the song to move it out of the way.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    },
                    "Chest After Right Silver Block Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 319, y: 65, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 24,
                        AltOrder: 5,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right. Collect all the silver rupees in the boulder room. The floating one by the start is a bit tricky without hover boots. You can reach it if you roll off the edge, then do a delayed jumpslash to gain enough distance. Once you get all the rupees, enter the next room for the chest. Watch out for the like-like!"
                    }
                }
            },
            invisibleFloormasterRoom: {
                Exits: {
                    statueRoom: {}
                },
                ItemLocations: {
                    "2 Flying Pots in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 278, y: 129, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 26,
                        AltOrder: 7,
                        LongDescription: "Enter the middle door after the silver block room. The pots from the right will fly at you, but watch out for the like like!"
                    },
                    "Left Chest in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 168, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        AltOrder: 8,
                        LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the first sun."
                    },
                    "Right Chest in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 184, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 28,
                        AltOrder: 9,
                        LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the second sun."
                    }
                }
            },
            statueRoom: {
                Exits: {
                    roomWithSunOnFloor: {},
                    silverGauntsIronKnuckle: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door to Silver Gaunts Knuckle"
                    },
                    adultAnubisRoom: {
                        Age: Age.ADULT,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Statue Room"
                    }
                },
                ItemLocations: {
                    "Left Flying Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 131, y: 118, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14,
                        AltOrder: 12,
                        LongDescription: "Head to the statue room. The pot will fly at you if you go to the left of the statue."
                    },
                    "Right Flying Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 224, y: 118, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 15,
                        AltOrder: 11,
                        LongDescription: "Head to the statue room. The pot will fly at you if you go to the right of the statue."
                    },
                    "Map Chest in Statue Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 176, y: 147, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 16,
                        AltOrder: 13,
                        LongDescription: "Head to the statue room. On the floor in front of the statue, light the torches with Din's Fire or Fire Arrows to spawn the chest. You can also run a lit deku stick down via the torch in the southwest corner of the room.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Data.canUseDekuStick(age);
                        }
                    },
                    "Chest in Sun Block Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 60, y: 117, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 17,
                        AltOrder: 22,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. As child, you can collect the silver rupees to light the golden torch. After that, use a Deku Stick to light the other torches. You can also just use Din's Fire to light them - make sure to light two at once, then get close to the third one before casting it a second time. As adult, your only options are Din's Fire or Fire Arrows.",
                        CustomRequirement: function(age) {
                            let canUseFireItem = Data.canUseFireItem(age);
                            if (age === Age.CHILD) {
                                let canLightTorches = Items.DEKU_STICK.playerHas || canUseFireItem;
                                return canLightTorches && Data.hasExplosives();
                            }
                            return canUseFireItem;
                        }
                    },
                    "2 Pots in Hall Before Silver Knuckle": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 32, y: 157, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 18,
                        AltOrder: 23,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. The pots are on the walls in the next room."
                    },
                    "Skulltula in Hall Before Silver Knuckle": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 32, y: 131, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 19,
                        AltOrder: 24,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Once inside the next room, turn around; the skulltula is above the door.",
                        IsAtShortDistance: true
                    },
                    "Chest in Statue Room on Northeast Platform": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 254, y: 107, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 29,
                        AltOrder: 10,
                        LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. Now, head back up to the southeast corner. The platform to the right of the hand now has a chest on it. Use your hookshot or hover boots to get to it.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
                    },
                    "Chest on Statue's Hand": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 133, y: 130, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 30,
                        AltOrder: 14,
                        LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. If you have the longshot, you can hook the chest that spawns from the other hand from here. If not, head to the upper southwest corner of the room - that's the one closer to the other hand. You can jump to it from there.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    "Skulltula in Statue Room on Northwest Platform": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 93, y: 101, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        Order: 31,
                        AltOrder: 15,
                        LongDescription: "Head to the statue room. Get to the upper southwest corner of the room. Facing the statue, that would be behind you and to the left. The skulltula is on a platform to the left of the statue. You can Scarecrow's Song or hover boots to get to it.",
                        CustomRequirement: function(age) {
                            return Data.canHookScarecrow(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas) || Data.canMegaFlip(age);
                        }
                    }
                }
            },
            silverGauntsIronKnuckle: {
                Exits: {
                    silverGauntsStatueHand: {}
                },
                ItemLocations: {}
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

                ItemLocations: {
                    "Silver Gauntlets Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 103, y: 228, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 21,
                        AltOrder: 26,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Continue on and you'll run into an Iron Knuckle. After defeating him, continue passed the door and onto the status outside the Spirit Temple. The chest is in front of you.<br/><br/>You can also get here as adult if you longshot from the mirror shield side."
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
            adultAnubisRoom: {
                Exits: {
                    fourArmosRoom: {
                        NeedsExplosives: true
                    },
                    movingWallRoom: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Anubis Room"
                    }
                },
                ItemLocations: {
                    "Pot in Beamos Hall": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 190, y: 54, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 33,
                        AltOrder: 28,
                        LongDescription: "Head to the door at the very top of the southeast corner of the statue room. That's the room behind you and to the right if you face the statue. The pot is on the pillar across from the beamos."
                    }
                }
            },
            fourArmosRoom: {
                Exits: {
                    adultAnubisRoom: {},
                    mirrorShieldKnuckle: {}
                },
                ItemLocations: {
                    "Sun Room Chest After 4 Armos": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 320, y: 41, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 34,
                        AltOrder: 29,
                        LongDescription: "Head to the door at the very top of the southeast corner of the statue room. That's the room behind you and to the right if you face the statue. When you get to the relevant room, kill the Anubises and the beamos to proceed. If you don't have fire items, play the Song of Time by the barred door. Now, hit the switch and run around the room to lead the Anubises into the fire. Enter the now unbarred door into the room with the 4 armos statues. Enter the room to your left by reflecting the light into the sun with your Mirror Shield. The chest is inside.",
                        RequiredItems: [Equipment.MIRROR_SHIELD]
                    }
                }
            },
            mirrorShieldKnuckle: {
                Exits: {
                    fourArmosRoom: {},
                    silverGauntsStatueHand: {
                        RequiredAdultItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
                    },
                    statueHands: {}
                },

                ItemLocations: {
                    "Left Chest Before Mirror Knuckle": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 329, y: 165, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 35,
                        AltOrder: 30,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
                    },
                    "Right Chest Before Mirror Knuckle": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 317, y: 165, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 36,
                        AltOrder: 31,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
                    },
                    "Mirror Shield Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 247, y: 226, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 37,
                        AltOrder: 32,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. After this next room, kill the Iron Knuckle. Proceeding further, you'll reach the outside of the Spirit Temple. Walk a bit onto the hand to spawn the Mirror Shield chest."
                    }
                }
            },
            movingWallRoom: {
                Exits: {
                    bossRoom: {
                        RequiredItems: [Items.HOOKSHOT, Equipment.MIRROR_SHIELD],
                        NeedsExplosives: true,
                        CustomRequirement: function(age) {
                            return hasBossKey("Spirit Temple");
                        }
                    }
                },

                ItemLocations: {
                    "2 Hearts in Moving Wall Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 167, y: 169, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 39,
                        AltOrder: 34,
                        LongDescription: "Head to the moving wall room. This is the room to your right if you enter the topmost southeast area of the statue room. It's also the room straight ahead if leaving the 4 armos room.<br/><br/>Head up the wall - longshot up there if you have it. Now turn around and use your hookshot/longshot to get to the platform in the back of the room with the room. You can also boomerang them.",
                        RequiredChoiceOfItems: [Items.HOOKSHOT, Items.BOOMERANG]
                    },
                    "Boss Key Chest After Moving Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 294, y: 40, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 40,
                        AltOrder: 35,
                        LongDescription: "Head to the moving wall room. This is the room to your right if you enter the topmost southeast area of the statue room. It's also the room straight ahead if leaving the 4 armos room.<br/><br/>Head up the wall - longshot up there if you have it. In the next room, play Zelda's Lullaby to open the door in front of you. Bomb or hammer the fake door just to the left of the boss key chest. Shoot the eye switch to spawn some platforms. Now, hookshot up there and hit the switch to put the fire out.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.spiritBKTrick) { return true; }
                            
                            let canDestroyDoors = Data.hasExplosives() || Data.canUseHammer(age);
                            let hasRequiredItems = Items.FAIRY_BOW.playerHas && Items.HOOKSHOT.playerHas;
                            return canDestroyDoors && hasRequiredItems;
                        }
                    },
                    "2 Flying Pots in Upper Giant Mirror Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 171, y: 164, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 41,
                        AltOrder: 36,
                        LongDescription: "Enter the door to the left of the triforce symbol. One of the two pots will fly into you - the other is just in front of that one."
                    },
                    "4 Flying Pots in Lower Giant Mirror Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 175, y: 109, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 42,
                        AltOrder: 37,
                        LongDescription: "Enter the door to the left of the triforce symbol. The pots are on the bottom in the corners by the giant mirror - they will fly at you."
                    },
                    "Chest in Snake Mirror Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 51, y: 150, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 43,
                        AltOrder: 38,
                        LongDescription: "Enter to the door to the left of the triforce symbol. Jumpslash the switch blocked by the bars and enter the next room.<br/><br/>At the start of the snake mirror maze, shine a light on the sun up on the archway into the next room.",
                        RequiredItems: [Equipment.MIRROR_SHIELD]
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
        Regions: {
            main: {
                Exits: {
                    afterFreezards: {
                        CustomRequirement: function(age) {
                            return Data.canKillFreezard(age);
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Ice Cavern"]["Exit"]
                    }
                },
                ItemLocations: {
                    "Frozen Rupee in First Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 175, y: 184 },
                        MapImageName: "Blue Rupee",
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "This rupee is frozen in the ice to the left of the exit of the first big room. You can either melt the ice, jumpslash into it, or use a boomerang to get the item.",
                        CustomRequirement: function(age) {
                            return Data.hasSwordWeapon(age) || 
                                (Settings.GlitchesToAllow.boomerangThroughWalls && Data.canUseBoomerang(age)) || 
                                Data.canUseBlueFire(age);
                        }
                    }
                }
            },
            afterFreezards: {
                Exits: {
                    blueFireSideRoom: {
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.iceLedgeClip && age === Age.ADULT) {
                                return true;
                            }
                            let isWallMelted = Data.itemLocationObtained("Ice Cavern", "afterFreezards", "Melt East Ice Wall");
                            return isWallMelted || (age === Age.ADULT && Data.hasBottle()) || Data.canUseBlueFire(age);
                        }
                    },
                    northRoom: {
                        Age: Age.ADULT
                    },
                    blockPushRoom: {
                        CustomRequirement: function(age) {
                            let isWallMelted = Data.itemLocationObtained("Ice Cavern", "afterFreezards", "Melt West Ice Wall");
                            return isWallMelted || (age === Age.ADULT && Data.hasBottle()) || Data.canUseBlueFire(age);
                        }
                    }
                },

                ItemLocations: {
                    "2 Pots After Freezards": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 166, y: 164 },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "These pots are in the transition hallway after you defeat the enemies in the first room."
                    },
                    "Skulltula in Scythe Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 161, y: 127 },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the spinning scythe, there's a skulltula up on one of the walls. It's the one to your left when you first enter.",
                        IsAtShortDistance: true
                    },
                    "2 Pots in East Scythe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 204, y: 121 },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the spinning scythe, these pots are to your right (east)."
                    },
                    "Pot in North Scythe Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 194, y: 96 },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the spinning scythe, this pot is on the north part of the room (straight ahead when you come in - it's the pot on the right)."
                    },
                    "Flying Pot in North Scythe Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 176, y: 96 },
                        Age: Age.EITHER,
                        Order: 6,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "In the room with the spinning scythe, this pot will fly at you from the north part of the room (straight ahead when you come in - it's the pot on the left)."
                    },
                    "Melt East Ice Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return !Data.canUseBlueFire(Age.CHILD); },
                        MapInfo: { x: 211, y: 114 },
                        Age: Age.EITHER,
                        Order: 6.1,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "The east wall in the scythe room. Used to track whether child can get to this area if only adult can melt the wall with blue fire arrows.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Data.hasBottle()) || Data.canUseBlueFire(age);
                        }
                    },
                    "Melt West Ice Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return !Data.canUseBlueFire(Age.CHILD); },
                        MapInfo: { x: 157, y: 114 },
                        Age: Age.EITHER,
                        Order: 6.2,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "The west wall in the scythe room. Used to track whether child can get to this area if only adult can melt the wall with blue fire arrows.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Data.hasBottle()) || Data.canUseBlueFire(age);
                        }
                    }
                }
            },
            northRoom: {
                Exits: {},
                ItemLocations: {
                    "3 Hearts in Platforming Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 228, y: 22 },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "This is the room you gain access to after you collect all the silver rupees in the spinning scythe room. Navigate to the upper area by the first freezard - the hearts are on a platform to the right."
                    },
                    "Map Chest in Platforming Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 192, y: 18 },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "This is the room you gain access to after you collect all the silver rupees in the spinning scythe room. Navigate to the top and use blue fire on the chest to gain access to it.",
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    },
                    "Frozen Pot in Platforming Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 193, y: 47 },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "This pot is frozen in ice on the upper part of the room with the map chest. The easiest ways to get it are to either use blue fire, or crouchstab the pot in the ice. Otherwise, you can get on the edge of the platform, facing away from the pot, and do a spin attack to hit the pot."
                    }
                }
            },
            blueFireSideRoom: {
                Exits: {},
                ItemLocations: {
                    "Compass Chest in Right Red Ice Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 246, y: 147 },
                        Age: Age.EITHER,
                        Order: 10,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. Melt the ice containing the chest.",
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    },
                    "Heart Piece in Right Red Ice Room": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 244, y: 115 },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. Melt the ice containing the heart piece.",
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    },
                    "Skulltula in Right Red Ice Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 253, y: 117 },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. There's a skulltula up on one of the walls to your left.",
                        IsAtShortDistance: true
                    }
                }
            },
            blockPushRoom: {
                Exits: {
                    bossRoom: {}
                },
                ItemLocations: {
                    "Skulltula in Block Push Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 143, y: 111 },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "When you first enter the spinning scythe room, look to your left. Burn the red ice with your blue fire and enter the room. When you get to the big room, the skulltula will be on the wall to your left.",
                        IsAtShortDistance: true
                    },
                    "3 Red Rupees in Block Push Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Red Rupees",
                        MapInfo: { x: 97, y: 103 },
                        Age: Age.EITHER,
                        Order: 14,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "When you first enter the spinning scythe room, look to your left. Burn the red ice with your blue fire and enter the room. The rupees are above the area with the blue fire. You can either use the boomerang to get them, or play the Song of Time on the platform with the blue fire to spawn some blocks.",
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || Data.canUseBoomerang(age);
                        }
                    },
                    "2 Pots Before Boss Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 111, y: 161 },
                        Age: Age.EITHER,
                        Order: 15,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "After completing the block puzzle, these pots are frozen in the red ice before the boss room."
                    }
                }
            },
            bossRoom: {
                Exits: {},
                ItemLocations: {
                    "Iron Boots Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 127, y: 182 },
                        Age: Age.EITHER,
                        Order: 16,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "This is in the room after the block pushing puzzle - the one with the wolfos. Defeat it to spawn the chest. Note that after you get the chest, you will also get the Serenade of Water item."
                    },
                    "Serenade of Water": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 122, y: 177 },
                        Age: Age.EITHER,
                        Order: 17,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        LongDescription: "You'll get this automatically after you open the Iron Boots chest."
                    }
                }
            }
        }
    },

    "Bottom of the Well": {
        Abbreviation: "WELL",
        MapGroup: MapGroups.DUNGEONS,
        Floors: ["F1", "B1"],
        StartingFloorIndex: 0,
        Regions: {
            main: {
                Exits: {
                    mainArea: {
                        Age: Age.CHILD,
                        CustomRequirement: function(age) {
                            return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Bottom of the Well"]["Exit"]
                    }
                },

                ItemLocations: {
                    // Locked Doors
                    "Locked Door After Crawlspace": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 300, y: 71, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 22,
                        LongDescription: "This is the door after the crawlspace in the northeast corner of the main room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    },
                    "Left Locked Door in Center": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 160, y: 121, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 17,
                        LongDescription: "This is left locked door in the center of the main room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    },
                    "Right Locked Door in Center": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 225, y: 121, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 20,
                        LongDescription: "This is right locked door in the center of the main room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    }
                }
            },
            mainArea: {
                Exits: {
                    pitRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door After Crawlspace"
                    },
                    leftLockedRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Left Locked Door in Center"
                    },
                    rightLockedRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Right Locked Door in Center"
                    },
                    deadhandRoom: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    bombableHoleRoom: {
                        NeedsExplosives: true
                    }
                },

                ItemLocations: {
                    "2 Pots by Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 194, y: 248, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 1,
                        LongDescription: "These pots are by the first fake wall of the dungeon."
                    },
                    "Chest in Front Right Wall": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 231, y: 195, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 2,
                        LongDescription: "Get to the main room. Follow the wall in front of you around to the right. There's a fake wall to your left when you first turn the left corner.",
                    },
                    "Chest in Front Left Wall": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 158, y: 194, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 4,
                        LongDescription: "This chest is in a fake wall to the left when you first enter the main room."
                    },
                    "3 Pots Left of Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 100, y: 223, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 5,
                        LongDescription: "These pots are past an invisible wall in the southwest corner of the main room."
                    },
                    "Compass Chest in Center": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 167, y: 172, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 6,
                        LongDescription: "From the main room's entrance, follow the path to the left. When you enter the tunnel, hug the right wall until you pass through the fake wall. The chest is in there, but don't go too far in front of it because there's a pit."
                    },
                    "Chest by Giant Skulltula in Center": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 221, y: 172, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 7,
                        LongDescription: "Get to the center room, past the fake wall straight ahead from the entrance. This is the chest that's guarded by the giant skulltula in the righthand side cage. DO NOT accidently go to the map chest, as you might accidently fall into the pit."
                    },
                    "Northwest Chest Under Rubble": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 93, y: 49, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 8,
                        LongDescription: "From the main room's entrance, follow the path to the left. Continue straight until you run into either the wall, or the giant skulltula. To the left you can see that there's some rubble in the back. DO NOT simply walk to it - there are pits. Hug the left side of the little alcove to get there safely. Bomb the rubble to get the chest.",
                        NeedsExplosives: true
                    },
                    "Underwater Pot by Triforce": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 195, y: 41, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 9,
                        LongDescription: "In the north part of the main room, there is a pot underwater by the triforce symbol. If you can't play Zelda's Lullaby to drain the water, you can break the pot using a bombchu/boomerang/slingshot then dive in to get the item.",
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY) ||
                                Items.FAIRY_SLINGSHOT.playerHas ||
                                Items.BOOMERANG.playerHas ||
                                Items.BOMBCHU.playerHas;
                        }
                    },
                    "Underwater Chest by Coffin Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 93, y: 137, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 10,
                        LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. This chest is near the entrance to the coffin room, which is in a room on the left side of the main room.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    "Heart in Open Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 42, y: 130, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.CHILD,
                        Order: 11,
                        LongDescription: "Head to the room to the left of the main room. The heart is in the open coffin by the gibdo.",
                    },
                    "Heart in Closed Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 57, y: 130, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.CHILD,
                        Order: 12,
                        LongDescription: "Head to the room to the left of the main room. The heart is in the bottom left coffin - light the torch to open it.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (Data.canUseBoomerang(age) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    },
                    "Key in Closed Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 29, y: 142, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 13,
                        LongDescription: "Head to the room to the left of the main room. The heart is in the top left coffin - light the torch to open it.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || 
                                Data.canUseDekuStick(age) ||
                                (Data.canUseBoomerang(age) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    },
                    "Underwater Chest in Front": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 185, y: 238, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 14,
                        LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. This chest is in the pit by the entrance, near the crawlspace to Dead Hand.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    "5 Blue Rupees in Basement Center": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "5 Blue Rupees",
                        MapInfo: { x: 204, y: 155, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 27,
                        LongDescription: "Fall down the central hole (by the wooden X in the center of the dungeon) to get to these rupees."
                    },
                    "10 Pots in Second North Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "10 Pots",
                        MapInfo: { x: 248, y: 103, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 28,
                        LongDescription: "These pots are down the second wing from the left in the basement."
                    },
                    "2 Pots by Second North Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 198, y: 174, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 29,
                        LongDescription: "These pots are by the entrance to the second wing from the left in the basement."
                    },
                    "Map Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 302, y: 238, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 30,
                        LongDescription: "Fall down one of the many pits to get to the basement. This chest is located behind the rocks that are farthest from the ladder. That is, if you face away from the ladder, it's the rightmost set of rocks.",
                        NeedsExplosives: true
                    }
                }
            },
            bombableHoleRoom: {
                Exits: {},
                ItemLocations: {
                    "Chest in Front Bombable Hole": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 182, y: 192, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 3,
                        LongDescription: "Get to the main room. Bomb the rubble that's in front of you and slightly to the left to gain access to this chest."
                    }
                }
            },
            pitRoom: {
                Exits: {
                    deadhandRoom: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.botwActorGlitch;
                        }
                    }
                },

                ItemLocations: {
                    "Pot in Room With Pits": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 284, y: 85, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 23,
                        LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. To get to this pot safely, hug the right wall from the entrance until you get to it."
                    },
                    "Chest in Room With Pits": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 302, y: 114, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 24,
                        LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. To get to this chest safely, hug the left wall REALLY close."
                    },
                    "Chest in Like-Like Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 299, y: 137, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 25,
                        LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. If you don't have the lens - here's one way to get around (it's still difficult). Get to the corner of the room with the chest. Face the left wall (the one the door is NOT on). Do two left sidehops and move a tiny bit more left. Go straight to where the beamos is (or was). Now angle yourself diagonal left toward the door and pray you make it. The chest is guarded by a like-like that you don't have to kill."
                    },
                    "Skulltula in Like-Like Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 307, y: 137, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 26,
                        LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. If you don't have the lens - here's one way to get around (it's still difficult). Get to the corner of the room with the chest. Face the left wall (the one the door is NOT on). Do two left sidehops and move a tiny bit more left. Go straight to where the beamos is (or was). Now angle yourself diagonal left toward the door and pray you make it. The skulltula is guarded by a like-like that you don't have to kill.",
                        IsAtShortDistance: true
                    }
                }
            },
            leftLockedRoom: {
                Exits: {},
                ItemLocations: {
                    "3 Flying Pots in Left Locked Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 160, y: 95, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 18,
                        LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the left side - the pots are in the back and will fly at you."
                    },
                    "Skulltula in Left Locked Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 160, y: 87, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 19,
                        LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the left side to get to the skulltula.",
                        IsAtShortDistance: true
                    }
                }
            },
            rightLockedRoom: {
                Exits: {},
                ItemLocations: {
                    "Skulltula in Right Locked Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 213, y: 80, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 21,
                        LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the right side. Hug the right wall, moving counter-clockwise, over the invisible floor to get to the skulltula.",
                        IsAtShortDistance: true
                    }
                }
            },
            deadhandRoom: {
                Exits: {
                    bombableHoleRoom: {
                        RequiredItems: [Equipment.KOKIRI_SWORD],
                        CustomRequirement: function(age) {
                            // TODO potentially: add an item location for draining the water, as you can't vine clip after that
                            return Settings.GlitchesToAllow.botwVineClip;
                        }
                    }
                },

                ItemLocations: {
                    "Hidden Chest in Dead Hand Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 332, y: 243, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 15,
                        LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. Go back to the pit by the entrance of the main room. Climb through the crawlspace, then through the door to Dead Hand's room. The hidden chest is straight ahead of you."
                    },
                    "Dead Hand Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 318, y: 243, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 16,
                        LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. Go back to the pit by the entrance of the main room. Climb through the crawlspace, then through the door to Dead Hand's room. Defeat Dead Hand to spawn the chest. To do so, let the hands grab you, then mash A and B to escape. Hit Dead Hand as he approaches you to damage him. If using sticks, it's recommended to jumpslash him to halve the number of sticks you need, just make sure his head is hittable first.",
                        CustomRequirement: function(age) {
                            let swordRequired = Settings.RandomizerSettings.deadHandNeedsSword;
                            if (swordRequired) { return Equipment.KOKIRI_SWORD.playerHas; }
                            return Data.hasSwordWeapon(age);
                        }
                    }
                }
            }
        }
    },

    "Training Grounds": {
        Abbreviation: "GTG",
        MapGroup: MapGroups.DUNGEONS,
        Regions: {
            main: {
                Exits: {
                    hookshotNeeded: {
                        Age: Age.EITHER,
                        RequiredAdultItems: [Items.HOOKSHOT],
                        RequiredChildItems: [Items.BOMBCHU, Equipment.DEKU_SHIELD],
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Settings.GlitchesToAllow.gtgChildVineClips;
                        }
                    },
                    lavaRoom: {
                        NeedsExplosives: true
                    },
                    mazeAfterOptionalDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 1",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    },
                    mazeAfterDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 1 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Training Grounds"]["Exit"]
                    }
                },

                ItemLocations: {
                    "Entrance Room Left Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 153, y: 233 },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
                        CustomRequirement: function(age) { return Data.canShootEyeSwitch(age); }
                    },
                    "Entrance Room Right Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 233 },
                        Age: Age.EITHER,
                        Order: 2,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
                        CustomRequirement: function(age) { return Data.canShootEyeSwitch(age); }
                    },
                    "Stalfos Chest in Sandy Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 64, y: 225 },
                        Age: Age.EITHER,
                        Order: 3,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        LongDescription: "This is the room to the left of the entrance. I recommend going this way, first, as it only requires the hookshot to make it most of the way around the dungeon. Anyway, kill the stalfos in here within the time limit to get this chest.",
                        NeedsSwordWeapon: true
                     },
                     "Chest in Dinalfos/Beamos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 257, y: 244 },
                        Age: Age.EITHER,
                        Order: 17,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Bomb the beamos and kill the lizalfos to spawn this chest.",
                        NeedsExplosives: true
                    },
                    "2 Hearts in Dinalfos/Beamos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 273, y: 262 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 17.1,
                        LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Climb the platform from one of the skinny sides to gain access to these hearts.",
                    },
                     
                     // Locked Doors
                     "Locked Door 1 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 154, y: 174 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 18,
                        LongDescription: "This is door 1 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    },
                    "Locked Door 2 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor1"],
                        MapInfo: { x: 135, y: 184 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 20,
                        LongDescription: "This is door 2 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 2 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 4 };
                        }
                    },
                    "Locked Door 3 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor2"],
                        MapInfo: { x: 150, y: 160 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 22,
                        LongDescription: "This is door 3 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 3 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 5 };
                        }
                    },
                    "Locked Door 4 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor3"],
                        MapInfo: { x: 130, y: 139 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 23,
                        LongDescription: "This is door 4 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 4 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 6 };
                        }
                    },
                    "Locked Door 5 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor4"],
                        MapInfo: { x: 163, y: 145 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 25,
                        LongDescription: "This is door 5 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 5 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 7 };
                        }
                    },
                    "Locked Door 6 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor5"],
                        MapInfo: { x: 178, y: 140 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 27,
                        LongDescription: "This is door 6 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 6 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 8 };
                        }
                    },
                    "Locked Door 7 On Main Path": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor6"],
                        MapInfo: { x: 173, y: 156 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 28,
                        LongDescription: "This is door 7 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 7 + Data.gtgGetNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 9 };
                        }
                    },
                    "Optional Locked Door 1": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 173, y: 174 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 30,
                        LongDescription: "This is the first door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 9 };
                        }
                    },
                    "Optional Locked Door 2": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterOptionalDoor1", "mazeDeadEnd"],
                        MapInfo: { x: 197, y: 180 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon;
                        },
                        Order: 31,
                        LongDescription: "This is the second door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 9 };
                        }
                    }
                }
            },
            mazeAfterOptionalDoor1: {
                Exits: {
                    mazeDeadEnd: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 2",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },
                ItemLocations: {}
            },
            hookshotNeeded: {
                Exits: {
                    silverBlockRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            if (Equipment.STRENGTH.currentUpgrade > 1) {
                                return true;
                            }

                            if (!Settings.GlitchesToAllow.gtgSilverBlockSkip || !Equipment.HOVER_BOOTS.playerHas) {
                                return false;
                            }

                            return Data.canMegaFlip(age) || Data.canHammerHoverBootsSuperslide(age);

                        }
                    },
                    lavaRoom: {}
                },

                ItemLocations: {
                    "Wolfos Chest in Room by Silver Block": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 90, y: 83 },
                        Age: Age.EITHER,
                        Order: 4,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "This is the room either after the stalfos sandy room, or after the silver rupee room with the fire walls. Kill all the wolfos to spawn a chest."
                    },
                    "Eye Statue Room Bottom Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 91 },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "This is the room either after the wolfos room, or after the room with the hammerable pillars. If coming from the former, you need to use your hookshot to hook a target beyond a fake wall above the fake door. If coming from the latter, bash the pillars with your hammer, then shoot the eye switch. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to spawn the chest.",
                        RequiredItems: [Items.FAIRY_BOW]
                    },
                    "Eye Statue Room Top Room Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 165, y: 133 },
                        Age: Age.EITHER,
                        Order: 10,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "This is the room either after the wolfos room, or after the room with the hammerable pillars. If coming from the former, you need to use your hookshot to hook a target beyond a fake wall above the fake door. If coming from the latter, bash the pillars with your hammer, then shoot the eye switch. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to unlock a door on top. If you came from the wolfos room, jump in the lava to respawn on top to get to it. Otherwise, you must use scarecrow's song (the scarecrow is near the door) to get up.",
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    },
                    "Chest in Room with Pillars": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 256, y: 75 },
                        Age: Age.EITHER,
                        Order: 11,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "This is either after the eye statue room, or after the big lava room. This is the chest that spawns after you kill all the enemies."
                    },
                    "Flaming Chest in Room with Pillars": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 254, y: 90 },
                        Age: Age.EITHER,
                        Order: 12,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !(canEnterDungeon && Settings.GlitchesToAllow.gtgChildVineClips); 
                        },
                        LongDescription: "This is either after the eye statue room, or after the big lava room. Use your hammer on the pillars until you find a floor switch. Step on it to remove the flames from the chest. Be sure to get it before they come back!<br/><br/>If you have no hammer, line up with the front of the chest and walk into the fire and keep holding up. Open the chest when you reach it before the fire wears off."
                    }
                }
            },
            lavaRoom: {
                Exits: {
                    mazeDeadEnd: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    }
                },

                ItemLocations: {
                    "Chest in Water Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 297, y: 160 },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "Navigate to the water room. See the Lava Room Key on Platform for an explanation on how to get there. First, collect all the silver rupees in the room. Most are straightfoward - you'll need your hover boots to get across some of the platforms. To get the one engulfed in flames, you must first hit the switch next to the raised platform. You can play the Song of Time there to spawn some helpful blocks as well. After you collect all the rupees, enter the door that opens up.<br/><br/>Once inside, play the Song of Time to remove the blocks. Use your iron boots to sink down and collect all the rupees. The hookshot helps a lot here, but technically isn't required. Once you're done, rise back up and collect the chest.",
                        RequiredItems: [Equipment.IRON_BOOTS],
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        CustomRequirement: function(age) {
                            let canGetToWaterRoom = Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2;
                            let canCompleteTask = Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                            return canGetToWaterRoom && canCompleteTask;
                        }
                    }
                }
            },
            silverBlockRoom: {
                Exits: {},
                ItemLocations: {
                    "Silver Block Room Left Spawned Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 28 },
                        Age: Age.ADULT,
                        Order: 5,
                        LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest spawns after you kill the like-likes."
                    },
                    "Silver Block Room Right Spawned Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 78, y: 37 },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest spawns after you kill the like-likes."
                    },
                    "Silver Block Room Back Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 68, y: 17 },
                        Age: Age.ADULT,
                        Order: 7,
                        LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest is in the back of the room."
                    },
                    "Silver Block Room Hidden Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 81, y: 22 },
                        Age: Age.ADULT,
                        Order: 8,
                        LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest is in the only hole without a visible chest in it."
                    }
                }
            },
            mazeDeadEnd: {
                Exits: {
                    mazeAfterOptionalDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 2"
                    },
                    lavaRoom: {}
                },

                ItemLocations: {
                    "Lava Room Key on Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 230, y: 164 },
                        Age: Age.EITHER,
                        Order: 13,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right, then take a right to get to the platform with the key. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform with the freestanding key.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the hookshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up."
                    },
                    "Maze Chest Close to Lava Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 179, y: 165 },
                        Age: Age.EITHER,
                        Order: 14,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the first chest you see. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you go straight from here, you'll reach the chest.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. The chest is straight ahead."
                    },
                    "Maze Chest at Dead End by Lava Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 154 },
                        Age: Age.EITHER,
                        Order: 15,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the second chest you see, at the maze's dead end. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you take the righthand path through the maze, you'll hit the chest at the dead end.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. If you take the righthand path through the maze, you'll hit the chest at the dead end."
                    }
                }
            },
            mazeAfterDoor1: {
                Exits: {
                    mazeAfterDoor2: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 2 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },

                ItemLocations: {
                    "Left Maze Path After Door 1": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 192 },
                        Age: Age.EITHER,
                        Order: 19,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go through the first door to the left. Climb the wall to the right of the door you came in to get to the chest after the fake ceiling."
                    }
                }
            },
            mazeAfterDoor2: {
                Exits: {
                    mazeAfterDoor3: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 3 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },

                ItemLocations: {
                    "Left Maze Path After Door 2": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 130, y: 163 },
                        Age: Age.EITHER,
                        Order: 21,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 2 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor3: {
                Exits: {
                    mazeAfterDoor4: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 4 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },
                ItemLocations: {}
            },
            mazeAfterDoor4: {
                Exits: {
                    mazeAfterDoor5: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 5 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },

                ItemLocations: {
                    "Left Maze Path After Door 4": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 136 },
                        Age: Age.EITHER,
                        Order: 24,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 4 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor5: {
                Exits: {
                    mazeAfterDoor6: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 6 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },

                ItemLocations: {
                    "Left Maze Path After Door 5": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 148, y: 137 },
                        Age: Age.EITHER,
                        Order: 26,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 5 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor6: {
                Exits: {
                    mazeAfterDoor7: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 7 On Main Path",
                        SkipLockedDoor: function(age) {
                            return Data.canWeirdShot(age) || 
                                (Settings.GlitchesToAllow.gtgChildVineClips && age === Age.CHILD && Data.hasShield(age));
                        }
                    }
                },
                ItemLocations: {}
            },
            mazeAfterDoor7: {
                Exits: {},
                ItemLocations: {
                    "Center Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 164, y: 159 },
                        Age: Age.EITHER,
                        Order: 29,
                        UseAdultAge: function() { 
                            let canEnterDungeon = Settings.RandomizerSettings.shuffleDungeonEntrances || 
                                ((Settings.RandomizerSettings.shuffleOverworldEntrances || Settings.GlitchesToAllow.cuccoJump) && Settings.GlitchesToAllow.gtgChildAllowed);
                            return !canEnterDungeon; 
                        },
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 7 doors. The chest is in this room."
                    }
                }
            }
        }
    },

    "Ganon's Castle": {
        Abbreviation: "GANC",
        MapGroup: MapGroups.DUNGEONS,
        Floors: ["MN", "FST", "WTR", "SHW", "FIR", "LIT", "SPT"],
        StartingFloorIndex: 0,
        _canCompleteTrials: function(age) {
            // Requires IsPostWalkCheck to be true on any item location that uses this!!!
            let canUseLightArrows = age === Age.ADULT && Items.LIGHT_ARROW.playerHas && Equipment.MAGIC.playerHas;
            if (!canUseLightArrows) { return false; }

            return Data.canAccessMap(age, "Ganon's Castle", "forestTrialEnd") &&
                Data.canAccessMap(age, "Ganon's Castle", "waterTrialEnd") &&
                Data.canAccessMap(age, "Ganon's Castle", "shadowTrialEnd") &&
                Data.canAccessMap(age, "Ganon's Castle", "fireTrialEnd") &&
                Data.canAccessMap(age, "Ganon's Castle", "lightTrialEnd") &&
                Data.canAccessMap(age, "Ganon's Castle", "spiritTrialEnd");
        },
        Regions: {
            main: {
                Exits: {
                    forestTrialEnd: {
                        Age: Age.ADULT,
                        NeedsFire: true,
                        RequiredChoiceOfItems: [Items.FAIRY_BOW, Items.HOOKSHOT]
                    },
                    fireTrialRoom1: {
                        CustomRequirement: function(age) {
                            let canWearTunic = age === Age.ADULT && Equipment.GORON_TUNIC.playerHas;
                            return Settings.GlitchesToAllow.ganonFireNoTunic || canWearTunic;
                        }
                    },
                    waterTrialEnd: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.MEGATON_HAMMER],
                        CustomRequirement: function(age) {
                            return Data.canUseBlueFire(age);
                        }
                    },
                    shadowTrialMiddle: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let canGetThereNormally = Items.FIRE_ARROW.playerHas && Items.FAIRY_BOW.playerHas && Equipment.MAGIC.playerHas;
                            let canAvoidFireArrows = Items.HOOKSHOT.currentUpgrade === 2 && Equipment.HOVER_BOOTS.playerHas;
                            return canGetThereNormally || canAvoidFireArrows;
                        }
                    },
                    spiritTrialRoom2: {
                        CustomRequirement: function(age) {
                            let canAvoidHookshot = Settings.GlitchesToAllow.ganonSpiritHookshotless && Data.hasShield(age);
                            return Items.HOOKSHOT.playerHas || canAvoidHookshot;
                        }
                    },
                    lightTrialRoom1: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let canSuperslideIn = Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip && 
                                Items.BOMB.playerHas && 
                                Data.hasShield(age);
                            let canEssClipIn = Settings.GlitchesToAllow.ganonLightTrailEssSkip && Data.hasExplosives();
                            return canSuperslideIn || canEssClipIn || Equipment.STRENGTH.currentUpgrade === 3;
                        }
                    },
                    center: {
                        // The main checks to get here are actually in PostWalk checks on the individual item locations
                        // To clean this up, we need non-items for each of the trial completions
                    }
                },

                ItemLocations: {
                    "4 Scrubs in Secret Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Scrubs",
                        MapInfo: { x: 249, y: 235, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 1,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    },
                    "Forest Trial Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 233, floor: "FST" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 5,
                        LongDescription: "Enter the forest trial. Kill the wolfos to spawn the chest."
                    },
                    "Water Trial Left Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 215, floor: "WTR" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 7,
                        LongDescription: "Enter the water trial. Look for the chest in the back left section of the room."
                    },
                    "Water Trial Right Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 213, y: 215, floor: "WTR" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 8,
                        LongDescription: "Enter the water trial. Look for the chest in the back right section of the room."
                    },
                    "Shadow Trial Close Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 146, y: 226, floor: "SHW" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 10,
                        LongDescription: "Enter the shadow trial. The chest is in front of you and a bit to the left on a little island. You can hookshot to it, hover boots to it (you'll need to roll mid-air to get the distance), shoot a fire arrow at a torch to spawn platforms, or play the Song of Time to get a platform you can jump to (Child has this by default).",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }

                            let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
                            return canUseFireArrows || Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.playerHas || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    "Heart in Spirit Trial": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 128, y: 242, floor: "SPT" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 27,
                        LongDescription: "Enter the spirit trial. The heart is on the left wall."
                    }
                }
            },
            forestTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Forest Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 65, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "Enter the forest trial - you must first light all the torches in the room. If you have no bow, you can use Din's Fire if you light the top torch by first hooshotting to it.</br></br>The next room is difficult to do without hover boots, but it can be done if you use the fans to push you across the room (grab the one to your left first and let the fan push you to the platform). The floating rupee can be retrieved after you jump on the switch in the back of the room.<br/><br/>The pots are in the final room that unlocks."
                    }
                }
            },
            waterTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Water Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 192, y: 10, floor: "WTR" },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "Enter the water trial - kill the freezards to unbar the door, then use blue fire to melt the ice to gain access. Complete the block puzzle to get to the ledge. Melt that ice and hammer the switch to make your way to the room with the pots."
                    }
                }
            },
            shadowTrialMiddle: {
                Exits: {
                    shadowTrialEnd: {
                        CustomRequirement: function(age) {
                            let canUseLens = Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas;
                            return canUseLens || Settings.GlitchesToAllow.gannonShadowTrialLens;
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots on Shadow Trial Like Like Platform": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 185, y: 135, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 11,
                        LongDescription: "Enter the Shadow trial. Get to the platform where the like-like resides by either shooting a fire arrow at the right torch, or longshotting to the torch and then the like-like. The pots are in the corners of the platform."
                    },
                    "Shadow Trial Far Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 103, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 12,
                        LongDescription: "Enter the shadow trial. First, get to the platform passed the like-like platform. One way to do this is to shoot a fire arrow at the torch to the right. If you can't, then use your longshot to hook the torch. Now get on the very edge of the platform closest to the like-like. Longshot the like-like to get over there. Either use the torch, or use Hover Boots to get to the next platform. Down and to the right is a switch. Navigate to it. Once you press it, either hookshot to it or void out and come back for it.",
                    },
                    "3 Hearts on Invisible Shadow Trial Bridge": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 176, y: 61, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "Enter the shadow trial. First, get to the platform passed the like-like platform. One way to do this is to shoot a fire arrow at the torch to the right. If you can't, then use your longshot to hook the torch. Now get on the very edge of the platform closest to the like-like. Longshot the like-like to get over there. Either use the torch, or use Hover Boots to get to the next platform. The hearts are in front of you on an invislbe bridge (the start of the bridge is lined up with the chest spawn platform).",
                        CustomRequirement: function(age) {
                            let canUseLens = Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas;
                            return canUseLens || Settings.GlitchesToAllow.gannonShadowTrialLens;
                        }
                    }
                }
            },
            shadowTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Shadow Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 5, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "After the like-like platform - navigate to the rusted switch after the invisible bridge. Hit it to unbar the door.",
                        CustomRequirement: function(age) {
                            let canUseLens = Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas;
                            return canUseLens || Settings.GlitchesToAllow.gannonShadowTrialLens;
                        }
                    }
                }
            },
            fireTrialRoom1: {
                Exits: {
                    fireTrialEnd: {
                        Age: Age.ADULT,
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "3"}, {item: Items.HOOKSHOT, upgradeString: "2"}]
                    }
                },
                ItemLocations: {
                    "Heart in Fire Trial": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 155, y: 156, floor: "FIR" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
                        Order: 15,
                        LongDescription: "Enter the fire trial. The heart is on a sinking platform near where the golden gauntlets pillar starts."
                    }
                }
            },
            fireTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Fire Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 178, y: 77, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "Enter the fire trial - you must grab all the silver rupees to enter the room with the pots. Equipping hover boots will prevent the platform from sinking, but isn't required."
                    }
                }
            },
            lightTrialRoom1: {
                Exits: {
                    lightTrialRoom2: {
                        CustomRequirement: function(age) {
                            return getKeyCount("Ganon's Castle") >= 1;
                        }
                    }
                },

                ItemLocations: {
                    "Light Trial Chests": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.GIFT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "7 Chests",
                        MapInfo: { x: 181, y: 249, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "These are the chests in the light trial - kill all the enemies to spawn the center one."
                    }
                }
            },
            lightTrialRoom2: {
                Exits: {
                    lightTrialRoom3: {
                        CustomRequirement: function(age) {
                            return getKeyCount("Ganon's Castle") >= 2;
                        }
                    }
                },

                ItemLocations: {
                    "Light Trial Zelda's Lullaby Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 195, y: 196, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "Enter the light trial and advance to the next room. Play Zelda's Lullaby on the Triforce picture to spawn this chest.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                }
            },
            lightTrialRoom3: {
                Exits: {
                    lightTrialEnd: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || Data.canGroundJumpWithBomb(age);
                        }
                    }
                },
                ItemLocations: {
                    "Pot at Light Trial": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 180, y: 138, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25,
                        LongDescription: "The pot is in front of you after the Zelda's Lullaby room."
                    }
                }
            },
            lightTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Light Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 180, y: 10, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "After the Zelda's Lullaby room, gather all the silver rupees. The room after that is fake - just run through the wall. The pots are in the next one."
                    }
                }
            },
            spiritTrialRoom2: {
                Exits: {
                    spiritTrialRoom3: {
                        CustomRequirement: function(age) {
                            let hasWeirdShotItem = Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas;
                            let canWeirdShot = Settings.GlitchesToAllow.weirdShot &&
                                age === Age.ADULT && 
                                Data.hasShield(age) && 
                                hasWeirdShotItem && 
                                Items.BOMB.playerHas;
                            return Items.BOMBCHU.playerHas || canWeirdShot;
                        }
                    },
                },
                ItemLocations: {
                    "Spirit Trial Chest After Hitting Switch": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 242, y: 184, floor: "SPT" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.ganonSpiritHookshotless; },
                        Order: 28,
                        LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. Hit the switch closest to the barred door with a jumpslash or charged spin attack to spawn the chest."
                    }
                }
            },
            spiritTrialRoom3: {
                Exits: {
                    spiritTrialEnd: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.FAIRY_BOW, Equipment.MIRROR_SHIELD]
                    }
                },
                ItemLocations: {
                    "Hidden Spirit Trial Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 239, y: 120, floor: "SPT" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.ganonSpiritHookshotless; },
                        Order: 29,
                        LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. To your left, there is a switch. Line up with the switch and drop a Bombchu. It should navigate itself over to the switch and activate it. This will open the door - enter it. The hidden chest is now in front of you and a little bit to the right. Face the right wall when trying to open it."
                    }
                }
            },
            spiritTrialEnd: {
                Exits: {},
                ItemLocations: {
                    "2 Pots at Spirit Trial End": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 157, y: 71, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "After going through the bombchu switch door - either fire arrow the web in the next room, or fire an arrow through the lit torch at it. After that, shine the light on the sun to the right of the entrance to the room to gain access to the pots.",
                        CustomRequirement: function(age) {
                            let canUseLens = Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas;
                            return canUseLens || Settings.GlitchesToAllow.gannonShadowTrialLens;
                        }
                    }
                }
            },
            center: {
                Exits: {
                    potRoom: {
                        CustomRequirement: function(age) {
                            return Settings.RandomizerSettings.potSetting !== ShuffleLocationSettings.OFF || 
                                hasBossKey("Ganon's Castle");
                        }
                    }
                },
                ItemLocations: {
                    "Boss Key Chest in Center": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 155, y: 95, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.staircaseHover; },
                        Order: 31,
                        IsPostWalkCheck: true,
                        LongDescription: "Complete all the trials. Now go up the center of the castle - the boss key will spawn after you clear the stalfos room.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Settings.GlitchesToAllow.ganonTrialSkip) || 
                                Data.canStaircaseHover(age) ||
                                MapLocations["Ganon's Castle"]._canCompleteTrials(age);
                        }
                    }
                }
            },
            potRoom: {
                Exits: {},
                ItemLocations: {
                    "14 Pots in Pot Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "14 Pots",
                        MapInfo: { x: 175, y: 95, floor: "MN" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.staircaseHover; },
                        Order: 32,
                        IsPostWalkCheck: true,
                        LongDescription: "Complete all the trials. Now, go up the center of the castle. This is room after you open the first giant door.",
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Settings.GlitchesToAllow.ganonTrialSkip) || 
                                Data.canStaircaseHover(age) ||
                                MapLocations["Ganon's Castle"]._canCompleteTrials(age);
                        }
                    }
                }
            }
        }
    }
};