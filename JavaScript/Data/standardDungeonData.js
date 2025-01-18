/**
 * Contains all the data for the standard dungeons
 */
let StandardDungeons = {
    "Deku Tree": {
        Abbreviation: "DEKU",
        MapGroup: MapGroups.DUNGEONS,
        Floors: [ "F3", "F2", "B1", "B2" ],
        StartingFloorIndex: 1,
        UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canBurnBasementWeb: function(age) {
            // Adult can shoot through the torch using the bow
            return ItemData.canUseAny(age, [Items.DEKU_STICK, Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]);
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lower Floors", imageName: "Fairy Slingshot" },
                Exits: {
                    upperFloor: {},
                    slingshotRoom: {
                        RequiredChoiceOfItems: [Equipment.DEKU_SHIELD, Equipment.HYLIAN_SHIELD, Items.MEGATON_HAMMER]
                    },
                    basementBottom: {
                        RequiredChoiceOfItems: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
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
                        LongDescription: "Climb up the vines on the first floor. Jump to the small platform to your left. The item is on the end of that platform; you have to jump off for it.",
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 282, y: 82, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "This chest is located by the vines with the skullwalltulas on the second floor."
                    }
                }
            },
            slingshotRoom: {
                DisplayGroup: { groupName: "Lower Floors", imageName: "Fairy Slingshot" },
                Exits: {},
                ItemLocations: {
                    "Slingshot Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 111, y: 246, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Enter the second floor door. Use your shield to reflect the scrub's nut back at him. The chest is on the other side in the next room."
                    },
                    "Slingshot Room Side Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 157, y: 273, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "This chest is located up the vines on the platform the slingshot chest is on."
                    }
                }
            },
            upperFloor: {
                DisplayGroup: { groupName: "Upper Floor", imageName: "Compass" },
                Exits: {},
                ItemLocations: {
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 147, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the opposite side of the room for this chest.",
                    },
                    "Compass Side Room Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 115, y: 199, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this chest. You do not need to kill the giant skulltula if you jump far enough to the left.",
                    },
                    "Skulltula in Compass Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 115, y: 207, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this skulltula. You do not need to kill the giant skulltula if you jump far enough to the left."
                    },
                    "Heart in Upper Lobby": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 291, y: 152, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "This item can be seen on the top floor, floating close to the path left of the vines you club up. Lined up with the wall, jump from the middle of the ledge, holding neutral to get this item.",
                        RequiredChoiceOfItems: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
                    }
                }
            },
            basementBottom: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
                Exits: {
                    basementBack: {
                        CustomRequirement: function(age) {
                            if (ItemData.canUse(age, QPAItemSets.HIGH_SWITCH_QPA)) {
                                return true;
                            }
                            
                            return ItemData.canUseAny(age, [Items.DEKU_STICK, ItemSets.FIRE_ITEMS])  &&
                                ItemData.canUseAny(age, [ItemSets.PROJECTILES]);
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
                        LongDescription: "From the top floor, either kill or stun one one of the giant skulltulas. Jump toward the center of the room and immediately let go of the joystick. You should fall to the basement. If you can use Din's Fire, you can use that instead. The chest is on the platform to the left of the vines."
                    },
                    "Skulltula on Basement Gate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 297, y: 51, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "This skulltula is in the in the basement you enter when you go in the first pit. If you face the vines, it's the one on the wall to the left."
                    },
                    "Skulltula on Basement Vines": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 348, y: 104, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This skulltula is the one on the vines in the first basement floor. A well-angled jumpslash from a deku stick can hit it. You can also use the slingshot, boomerang, or a well-timed bomb.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return ItemData.canUseAny(age, [Items.DEKU_STICK, Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMB]);
                        }
                    }
                }
            },
            basementBack: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
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
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_ITEMS, QPAItemSets.MUD_WALLS_QPA],
                        LongDescription: "If you make your way around the basement, you'll eventually find a circular room where gohma babies drop from the ceiling. One of the side rooms has a bombable wall. Bomb it, then enter the next room. The skulltula is high up on the wall to your left."
                    }
                }
            },
            basementTop: {
                DisplayGroup: { groupName: "Basement", imageName: "Deku Stick" },
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
                        MapImageName: "Din's Fire",
                        Age: Age.EITHER,
                        Order: 12.1,
                        LongDescription: "The web on the basement floor. Use sticks, a fire item, or a bow shot from atop the chest through the torch by the vines in the lower area.",
                        CustomRequirement: function(age) {
                            return MapLocations["Deku Tree"]._canBurnBasementWeb(age);
                        }
                    }
                }
            },
            lowerBasement: {
                DisplayGroup: { groupName: "Boss Floor", imageName: "Kokiri's Emerald" },
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [Equipment.DEKU_SHIELD, Equipment.HYLIAN_SHIELD]) ||
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
                        RequiredChildItems: [Equipment.DEKU_SHIELD],
                        RequiredAdultItems: [Equipment.HYLIAN_SHIELD],
                        Age: Age.EITHER,
                        Order: 13.1,
                        LongDescription: "Mark this after stunning the scrubs in the 2, 3, 1 order.",
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
        Floors: ["F2", "F1"],
        StartingFloorIndex: 1,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Main Room", imageName: "Strength Goron's Bracelet" },
                Exits: {
                    mainRoom: {
                        CustomRequirement: function(age) {
                            if (Data.itemLocationObtained("Dodongo's Cavern", "main", "Opened First Wall")) { return true; }
                            return ItemData.canUseAny(age, [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH]);
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
                        MapImageName: "Bomb",
                        Age: Age.EITHER,
                        Order: 1,
                        LongDescription: "Use an explosive, hammer, or blue fire to break the first wall. This is used to determine whether Child can get in without anything.",
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH]
                    }
                }
            },
            mainRoom: {
                DisplayGroup: { groupName: "Main Room", imageName: "Strength Goron's Bracelet" },
                Exits: {
                    // We're assuming that this was opened if the first mud wall was opened
                    lowerEastRooms: {},
                    blueRoom: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || 
                                Data.canGroundJumpWithBomb(age, true);
                        }
                    },
                    staircaseBottom: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; } // Adult can just climb to the switch
                            return Data.canGroundJumpWithBomb(age, true) || 
                                (Settings.GlitchesToAllow.dodongoSwitchEarly && Items.BOMBCHU.playerHas && Equipment.DEKU_SHIELD.playerHas);
                        }
                    },
                    inDodongoHead: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.dodongoOpenHeadWithBombchus &&
                                ItemData.canUseAll(age, [ItemSets.SHIELDS, Items.BOMBCHU]);
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
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS, Equipment.STRENGTH]
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 97, y: 198, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "Go to the left side of the big main room. Destroy the wall with an explosive, hammer, or blue fire to find this chest.",
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS, Equipment.STRENGTH]
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
            lowerEastRooms: {
                DisplayGroup: { groupName: "Lower East Rooms", imageName: "Deku Stick" },
                Exits: {
                    blueRoom: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    }
                },
                ItemLocations: {
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
                        RequiredChoiceOfItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS, ItemSets.MUD_WALL_OR_QPA_ITEMS]
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
                            return Settings.GlitchesToAllow.dodongoScarecrowSkullEarly || Data.canHookScarecrow(age);
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
                    }
                }
            },
            blueRoom: {
                DisplayGroup: { groupName: "Lower East Rooms", imageName: "Deku Stick" },
                Exits: {
                    staircaseBottom: {
                        RequiredChoiceOfItems: [ItemSets.FIRE_ITEMS, Items.DEKU_STICK]
                    }
                },
                ItemLocations: {
                    "Scrub by Blue Dodongo Room": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 245, y: 85, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "From the entrance, go around the right side of the dungeon until you get to the blue room with dodongos in it. You can also jump up to the switch platform as adult and enter the door to get here. Near the usual entrance to this room, there's a mud wall with a scrub inside. You should be able to run a bomb flower to it if you don't have your own explosives.",
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS, Equipment.STRENGTH]
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
            staircaseBottom: {
                DisplayGroup: { groupName: "Staircase Room", imageName: "Bomb" },
                Exits: {
                    blueRoom: {},
                    skulltulaOnVines: {
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    staircaseTop: {
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [ItemSets.EXPLOSIVES_OR_STRENGTH, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]) ||
                                (Settings.GlitchesToAllow.dodongoTriggerStairsWithBow && ItemData.canUse(age, Items.FAIRY_BOW));
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
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS, Equipment.STRENGTH]
                    }
                }
            },
            staircaseTop: {
                DisplayGroup: { groupName: "Staircase Room", imageName: "Bomb" },
                Exits: {
                    skulltulaOnVines: {},
                    skulltulaAlcoveAboveStairs: {
                        Age: Age.ADULT,
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    lowerBladeRoom: {}
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
                    }
                }
            },
            skulltulaOnVines: {
                DisplayGroup: { groupName: "Staircase Room", imageName: "Bomb" },
                Exits: {},
                ItemLocations: {
                    "Skulltula on Vines by Stairs": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 29, y: 136, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "Head to the top of the room with the giant staircase and the Bomb Flowers. The skulltula is on the vines near the exit.<br/><br/>If you have nothing to kill it, you can throw one of the pots at it. Also, if you can't get to the top, you can longshot it from below.",
                        OverrideItemGroupCondition: true
                    }
                }
            },
            lowerBladeRoom: {
                DisplayGroup: { groupName: "Lower Spiketrap Room", imageName: "2 Scrubs No Beehive" },
                Exits: {
                    firstEyeSwitchRoom: {
                        RequiredChoiceOfItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS, Equipment.STRENGTH]
                    },
                    bombChestFloor: {
                        CustomRequirement: function(age) {
                            let adultBombChestEarly = age === Age.ADULT && Settings.GlitchesToAllow.dodongoAdultJumpToBombChest;
                            let canGroundJumpThere = age === Age.ADULT && Data.canGroundJumpWithBomb(age);
                            return adultBombChestEarly || canGroundJumpThere || Data.canMegaFlip(age);
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
                    "Heart Behind Block in Blade Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 211, y: 196, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "In the room with the blades, push the block all the way out. There's an item inside its alcove."
                    },
                    "Chest by Bomb Flower": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 201, y: 201, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "In the room with the blades, this is the chest on the ledge near the Bomb Flower and bombable wall."
                    },
                    "2 Scrubs by Blade Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SCRUB,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Scrubs",
                        MapInfo: { x: 202, y: 106, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "In the room with the blades, there's a wall you can destroy that's located near the cliffs with the bomb chest. There are a couple scrubs inside.",
                        CustomRequirement: function(age) {
                            let hasMudWallItem = ItemData.canUse(age, ItemSets.MUD_WALL_OR_QPA_ITEMS);
                            return age === Age.CHILD
                                ? hasMudWallItem
                                : hasMudWallItem || (Settings.RandomizerSettings.dodongoAdultBladeMudWallWithStrength && Equipment.STRENGTH.playerHas);
                        }
                    }
                }
            },
            potsInBladeRoom: {
                DisplayGroup: { groupName: "Upper East Rooms", imageName: "Bomb Bag" },
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
                DisplayGroup: { groupName: "Upper East Rooms", imageName: "Bomb Bag" },
                Exits: {
                    upperLizalfosRoom: {
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
                DisplayGroup: { groupName: "Upper East Rooms", imageName: "Bomb Bag" },
                Exits: {
                    bombChestFloor: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    },
                    firstEyeSwitchRoom: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
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
                DisplayGroup: { groupName: "Upper East Rooms", imageName: "Bomb Bag" },
                Exits: {
                    inDodongoHead: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
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
                        RequiredItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS]
                    }
                }
            },
            skulltulaAlcoveAboveStairs: {
                DisplayGroup: { groupName: "Staircase Room", imageName: "Bomb" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Alcove Above Stairs": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 31, y: 94, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "This skulltula is in an alcove above the giant staircase with the Bomb Flowers.<br/><br/>As child, you must first navigate to the switch that raises the platform to the second floor. Now, leave the dungeon and come back in. Take the platform to the second floor and proceed backwards to the staircase room - the staircase is now raised. You can climb the vines on the staircase to get to the skulltula.<br/><br/>As adult, you can do the same thing. If you have the longshot, though, you can get it without needing the staircase up if you stand on a step close to the top.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            inDodongoHead: {
                DisplayGroup: { groupName: "Inside Dondongo Head", imageName: "Goron's Ruby" },
                Exits: {
                    bossRoom: {}
                },
                ItemLocations: {
                    "Skulltula in Back Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 193, y: 11, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "This is in the series of rooms after you enter the giant dodongo head. After you climb the ledge with the pushable blocks, there's a wall you can destroy. The skulltula is inside.",
                        RequiredItems: [ItemSets.MUD_WALL_OR_QPA_ITEMS]
                    },
                    "2 Pots After Block Push in Back Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 176, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 32,
                        LongDescription: "After the block push puzzle in the giant dodongo head, these are the pots to your left before you enter the hallway."
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
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        UseChildAge: function() { 
            return !Settings.RandomizerSettings.shuffleDungeonEntrances &&
                !Settings.GlitchesToAllow.enterJabuAsAdult; 
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Elevator Room", imageName: "Crate" },
                Exits: {
                    elevatorRoom: {
                        RequiredChoiceOfItems: [ItemSets.EXPLOSIVES, ItemSets.PROJECTILES, Items.BOOMERANG, Items.HOOKSHOT]
                    },
                    Exit: {
                        OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
                    }
                },
                ItemLocations: {}
            },
            elevatorRoom: {
                DisplayGroup: { groupName: "Elevator Room", imageName: "Crate" },
                Exits: {
                    basement: {},
                    tentacleRooms: {},
                    afterBigOcto: {
                        RequiredItems: [Items.BOOMERANG, ItemSets.SWORDS]
                    },
                    roomBeforeBoss: {
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, Equipment.HOVER_BOOTS) ||
                                (Settings.GlitchesToAllow.jabuBlueSwitchSkip && Data.canMegaFlip(age));
                        }
                    }
                },
                ItemLocations: {
                    "Small Crate in Elevator Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 164, y: 177, floor: "F1" },
                        Age: Age.EITHER,
                        RequiredToAppear: function()  { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        Order: 1,
                        LongDescription: "After the first room, break the small crate on the right for this item. The left one drops nothing."
                    },
                    "2 Small Crates in Elevator Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 164, y: 177, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1.1,
                        LongDescription: "After the first room, use the elevator to cross to get to these small crates"
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Skulltula Tokens" },
                Exits: {},
                ItemLocations: {
                    "5 Pots in Room by Vines": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "5 Pots",
                        MapInfo: { x: 32, y: 188, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "Fall down one of the holes to get to the main room on the bottom. Enter the door by the vines back up. Either stun the jello with your boomerang to cross, or use hover boots. The pots are on the other side.",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || 
                                ItemData.canUseAny(age, [Items.BOOMERANG, Equipment.HOVER_BOOTS, QPAItemSets.LEDGE_QPA]);
                        }
                    },
                    "Left Skulltula on Lower Room Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 156, y: 44, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Right Skulltula on Lower Room Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 176, y: 35, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Skulltula on Vines": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 284, y: 153, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "In the room with the water and the switch (the first one you usually take Ruto into), there's a skulltula hanging out on the vines. Take it out, then raise the water to collect its token. Note that you can reach it with a jumpslash if you jump off the cliff then jumpslash when you're a bit closer.",
                    },
                    "3 Pots Above Vines": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 258, y: 152, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "These pots are above the vines in the room with the water and the switch (the first one you usually take Ruto into)."
                    },
                    "Scrub Behind Octorok Water": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: {x: 117, y: 229, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "In the room with the rising platform (the second room of the dungeon), fall down into the water. Dive down and swim into the adjacent room - it's straight ahead from the door. There's a scrub on the other side."
                    },
                }
            },
            tentacleRooms: {
                DisplayGroup: { groupName: "Tentacle Rooms", imageName: "Boomerang" },
                Exits: {},
                ItemLocations: {
                    "Boomerang Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 237, y: 58, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Now, hug the right wall all the way to a switch - jump on it with Ruto in your hands. Enter the room. Kill all the stingers to spawn the chest. They can be hurt with explosions, boomerang, slingshot, or jump slashes from a stick or sword.",
                        RequiredChoiceOfItems: [Items.BOOMERANG, Items.FAIRY_SLINGSHOT, ItemSets.SWORDS, ItemSets.EXPLOSIVES]
                    },
                    "Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 99, y: 57, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        Order: 9,
                        LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Hug the left wall until you find a switch. Leave Ruto on it and enter. Kill the Parasitic Tentacle with your boomerang to spawn the chest.",
                        RequiredItems: [Items.BOOMERANG]
                    },
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 147, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        Order: 10,
                        LongDescription: "After killing the Parasitic Tentacle to spawn the Map Chest (see that section), exit the room. Now hug the left wall to the next nearby door. Kill the shaboms within the time limit to spawn this chest. Note that Deku Nuts are a really fast way to take care of this room.",
                        RequiredItems: [Items.BOOMERANG]
                    }
                }
            },
            afterBigOcto: {
                DisplayGroup: { groupName: "Upper Rooms", imageName: "Ruto's Letter" },
                Exits: {
                    roomBeforeBoss: {}
                },
                ItemLocations: {
                    "3 Pots After Big Octo": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 101, y: 32, floor: "F2" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        Order: 11,
                        LongDescription: "After defeating all the tentacles, go defeat Big Octo. Ride up the elevator - the pots are in this room on the back wall."
                    }
                }
            },
            roomBeforeBoss: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Zora's Sapphire" },
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            if (ItemData.canUseAny(age, [Items.BOOMERANG, Items.FAIRY_SLINGSHOT, Items.FAIRY_BOW, UpgradedItems.LONGSHOT])) {
                                return true;
                            }

                            return Settings.GlitchesToAllow.jabuBossSwitchWithExplosives &&
                            (
                                (age === Age.CHILD && Items.BOMBCHU.playerHas) ||
                                (age == Age.ADULT && ItemData.canUseAll(age, [Items.BOMB, Equipment.HOVER_BOOTS]))
                            );
                        }
                    }
                },
                ItemLocations: {
                    "Skulltula Near Boss": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 255, y: 194, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "In the room before the boss room (the one that's slightly green and has a bunch of biris), there's a skulltula on the vines leading up the wall to the door switch.<br/><br/>Note that adult can get here immediately by using the hover boots (grab a box and backwalk off the elevator with hover boots equipped)."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Zora's Sapphire" },
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
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canJumpToTop: function(age) {
            let canDoTrick = Settings.GlitchesToAllow.forestJumpToTop && 
                ItemData.canUseAll(age, [Equipment.HOVER_BOOTS, Items.BOMB]);
    
            // This part ensures that we're not allowing you to do the trick if you can get to the
            // room using the hover boots from the block room, which defeats the whole point because
            // you wouldn't be skipping that key
            let canGetToFromRightRoom = Items.FAIRY_BOW.playerHas && (
                ItemData.canUseAny(age, [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]) || 
                ItemData.canUse(age, UpgradedItems.LONGSHOT)
            );
            let canGetToOutsideLeftBeforeBlockRoom = Settings.GlitchesToAllow.forestLedgeClip || Data.canPlaySong(Songs.SONG_OF_TIME) || canGetToFromRightRoom;
            return canDoTrick && canGetToOutsideLeftBeforeBlockRoom;
        },
        _canAccessAllPoeRooms: function(age) {
            // Requires an IsPostWalkCheck on each item using this!
            let canAccessFirstPoes = Data.canAccessMap(age, "Forest Temple", "firstPoeRoom");
            let canAccessGreenPoeRoom = Data.canAccessMap(age, "Forest Temple", "fallingCeilingRoom");
            return canAccessFirstPoes && canAccessGreenPoeRoom;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Starting Rooms", imageName: "Chest" },
                Exits: {
                    lobby: {
                        RequiredChoiceOfItems: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
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
                        LongDescription: "The skulltula is high up on the vines in the first room. You can kill it with a ranged item, din's fire, a bomb from the top (requires a trick), or a bombchu from the ground.",
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.forestFirstSkullWithBomb && Items.BOMB.playerHas) { return true; }
                            return ItemData.canUseAny(age, 
                                [ItemSets.PROJECTILES, Items.BOMBCHU, Items.BOOMERANG, Items.HOOKSHOT, Items.DINS_FIRE]);
                        }
                    },
                    "Chest on Starting Room Tree": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 254, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "In the first room, climb up the vines to the right. Navigate over to the tree, and then jump or hookshot across to the chest on the other tree."
                    },

                    // Locked Doors
                    "Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 122, y: 150, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "This is the western door in the lobby.",
                        KeyRequirement: function(age) {
                            if (MapLocations["Forest Temple"]._canJumpToTop(age)) {
                                return { min: 1, max: Keys.FOREST_TEMPLE.totalKeys() };
                            }
                            return { min: 1, max: 1 };
                        }
                    },
                    "Locked Door by Twisted Corridor": {
                        DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Strength Goron's Bracelet" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["topOfBlockRoom"],
                        MapInfo: { x: 42, y: 198, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "This is the door that's after the block puzzle by the bubbles.",
                        KeyRequirement: function(age) {
                            if (MapLocations["Forest Temple"]._canJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 1, max: 2 };
                            }
                            return { min: 2, max: 2 };
                        }
                    },
                    "Locked Door in Boss Key Room": {
                        DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["twistedCorridor1"],
                        MapInfo: { x: 80, y: 57, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
                        KeyRequirement: function(age) {
                            if (MapLocations["Forest Temple"]._canJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 2, max: 3 };
                            }
                            return { min: 3, max: 3 };
                        }
                    },
                    "Locked Door in Blue Poe Room": {
                        DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["firstPoeRoom"],
                        MapInfo: { x: 282, y: 54, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 26,
                        LongDescription: "This is the door that's in the blue poe room.",
                        KeyRequirement: function(age) {
                            if (MapLocations["Forest Temple"]._canJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 3, max: 4 };
                            }
                            return { min: 4, max: 4 };
                        }
                    },
                    "Locked Door in Green Bubble Hallway": {
                        DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterPoeRooms"],
                        MapInfo: { x: 319, y: 154, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
                        KeyRequirement: function(age) {
                            if (MapLocations["Forest Temple"]._canJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
                                return { min: 4, max: 5 };
                            }
                            return { min: 5, max: 5 };
                        }
                    }
                }
            },
            lobby: {
                DisplayGroup: { groupName: "Starting Rooms", imageName: "Chest" },
                Exits: {
                    outsideLeft: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; } // The SoT block is gone as child!
                            return Settings.GlitchesToAllow.forestLedgeClip || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    outsideRight: {
                        RequiredItems: [ItemSets.PROJECTILES]
                    },
                    blockRoom: {
                        LockedDoor: "Locked Door in Lobby",
                        Map: "Forest Temple"
                    },
                    fallingCeilingRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.BOMB, Equipment.HOVER_BOOTS, ItemSets.SHIELDS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestGreenPoeEarly;
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
                        Order: 4,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. the pots are on the ledge to the right."
                    },
                    "Skulltula in Main Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 191, y: 110, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go through the main room until you get to the door on the other side. Turn right to find this skulltula on the wall. You can get it with your hookshot or boomerang."
                    },
                    "Chest Behind Main Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 31, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS],
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go straight again through the room with the blue bubble. In the next room, kill the two stalfos to spawn the chest."
                    },
                    "2 Pots Behind Main Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 171, y: 17, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go straight again through the room with the blue bubble. The pots are in the back of the room."
                    }
                }
            },
            outsideLeft: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {
                    topOfOutsideRight: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    },
                    topOfOutsideLeft: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return MapLocations["Forest Temple"]._canJumpToTop(age);
                        }
                    },
                    outsideLeftHearts: {
                        RequiredItems: [Items.BOOMERANG],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.difficultBoomerangTrickThrows;
                        }
                    },
                    outsideRight: {
                        // This is to swim through the well
                        RequiredChoiceOfItems: [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]
                    }
                },
                ItemLocations: {
                    "Skulltula in Left Room on Wall": {
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.EITHER,
                        MapInfo: {x: 83, y: 52, floor: "F1" },
                        Order: 18,
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        LongDescription: "There's a skulltula high up on the wall over the moat in the outside left room. You can get it from the ground with the longshot. Otherwise, you must make your way to the upper platform to grab it. This is the path that you take if you fall in the hole by the boss key chest.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return Data.canAccessMap(age, "Forest Temple", "topOfOutsideLeft") ||
                                ItemData.canUse(age, UpgradedItems.LONGSHOT);
                        }
                    }
                }
            },
            outsideRight: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {
                    topOfOutsideRight: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestHookshotToWellSwitch
                                ? ItemData.canUse(age, Items.HOOKSHOT)
                                : ItemData.canUse(age, UpgradedItems.LONGSHOT);
                        }
                    },
                    outsideRightLedge: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    skulltulaOnOutsideRightLedge: {
                        Age: Age.EITHER,
                        RequiredItems: [Items.BOOMERANG],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestBoomerangSkullOnLedge;
                        }
                    },
                    outsideLeft: {
                        // This is to swim through the well
                        RequiredChoiceOfItems: [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]
                    }
                },
                ItemLocations: {}
            },
            outsideRightLedge: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {
                    outsideRight: {},
                    skulltulaOnOutsideRightLedge: {
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                },
                ItemLocations: {
                    "Chest on Outside Right Island": {
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 269, y: 77, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "There is a chest on the landmass on the other wide of the water in the right outside room. You can hookshot to it with the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.<br/><br/>Alternatively, you can get there using hover boots or a chu megaflip from the platform with the water-draining well switch."
                    }
                }
            },
            skulltulaOnOutsideRightLedge: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {},
                ItemLocations: {
                    "Skulltula on Outside Right Island": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 269, y: 70, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.GlitchesToAllow.forestBoomerangSkullOnLedge &&
                                !Settings.GlitchesToAllow.canMegaflip;
                        },
                        Order: 10,
                        LongDescription: "There is a skulltula on the landmass on the other side of the water in the right outside room. You can hookshot to the island via the chest at the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.<br/><br/>If you have no hookshot and are coming from the falling ceiling room, make sure you kill it and drop down on the item from above so you don't miss your chance!"
                    }
                }
            },
            topOfOutsideRight: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {
                    drainedWell: {},
                    outsideRight: {},
                    outsideRightLedge: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.HOVER_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.forestLedgeWithHovers;
                        }
                    },
                    outsideLeft: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    },
                    fallingCeilingRoom: {
                        RequiredItems: [Items.BOMBCHU],
                        CustomRequirement: function(age) {
                            // Get far on the ledge and aim just for the platform before turning around for the flip
                            // Will only work with chus
                            return Data.canMegaFlip(age);
                        }
                    }
                },
                ItemLocations: {
                    "Dungeon Map": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 184, y: 111, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "You can get here from the left outside room. Proceed up the vines and into the room. Kill the blue bubble to spawn the chest. Alternatively, you can get here by longshotting up the vines in the right outside room.",
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    }
                }
            },
            drainedWell: {
                DisplayGroup: { groupName: "Lower Courtyards & Well", imageName: "2 Hearts" },
                Exits: {},
                ItemLocations: {
                    "2 Hearts in Well": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 181, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "In the outside rooms, there are two hearts in the well. One way to get there is from the left room. Proceed up the vines, kill the blue bubble, and go into the next room. Now, hookshot or jump to the vines to your left and navigate to the switch on the other platform. This will drain the water. Alternatively, you can start in the right room and longshot up these vines to get to the switch."
                    },
                    "Chest in Well": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 126, y: 48, floor: "B1" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "In the outside rooms, there is a chest at the bottom of the well. One way to get there is from the left room. Proceed up the vines, kill the blue bubble, and go into the next room. Now, hookshot or jump to the vines to your left and navigate to the switch on the other platform. This will drain the water. Alternatively, you can start in the right room and longshot up these vines to get to the switch.",
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    }
                }
            },
            blockRoom: {
                DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Strength Goron's Bracelet" },
                Exits: {
                    topOfOutsideLeft: {
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || ItemData.canUse(age, Equipment.HOVER_BOOTS);
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
                        LongDescription: "Navigate to the room with the block puzzle. After pushing the first block, climb up the ladder that it was blocking. Now go straight to the wall in front of you. Follow that wall to the right. Turn right, and you should see an eye switch a bit up the wall in front of you. Shoot it to spawn the chest.",
                        CustomRequirement: function(age) {
                            let canBlockSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBlockSkip && Data.canGroundJumpWithBomb(age);
                            let canGetToEyeSwitch = canBlockSkip || Equipment.STRENGTH.playerHas;
                            return ItemData.canUse(age, ItemSets.PROJECTILES) && canGetToEyeSwitch;
                        }
                    }
                }
            },
            topOfBlockRoom: {
                DisplayGroup: { groupName: "Block Puzzle Room", imageName: "Strength Goron's Bracelet" },
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
                        RequiredItems: [ItemSets.PROJECTILES]
                    }
                },
                ItemLocations: {}
            },
            untwistedCorridor1: {
                DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                Exits: {
                    topOfOutsideLeft: {
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
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
            topOfOutsideLeft: {
                DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                Exits: {
                    outsideLeft: {},
                    outsideLeftHearts: {},
                    blockRoom: {}
                },
                ItemLocations: {
                    "Floormaster Chest": {
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 27, y: 101, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "Navigate to the twisted corridor. Shoot the eye switch to untwist the corridor. Now go across the corridor to the room with the boss key chest. Fall down the hole in this room and kill the bubbles to get out. Follow the right wall in this next area until you reach the first door in the side room to the right (careful of the giant deku baba). Kill the floormaster to spawn the chest.",
                        RequiredItems: [ItemSets.STUNNABLE_ENEMY_KILL_ITEMS]
                    }
                }
            },
            outsideLeftHearts: {
                DisplayGroup: { groupName: "Untwisted Corridor & Upper Courtyard", imageName: "Boss Key" },
                Exits: {},
                ItemLocations: {
                    "2 Hearts Above Left Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 81, y: 73, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            return !Settings.GlitchesToAllow.difficultBoomerangTrickThrows &&
                                !Settings.GlitchesToAllow.megaFlip; 
                        },
                        Order: 17,
                        LongDescription: "Navigate to the twisted corridor. Shoot the eye switch to untwist the corridor. Now go across the corridor to the room with the boss key chest. Fall down the hole in this room and kill the bubbles to get out.<br/><br/>The hearts are on the skinny platform that you have to jump to, near the skulltula on the wall. Be careful not to fall off."
                    }
                }
            },
            twistedCorridor1: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    firstPoeRoom: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Boss Key Room"
                    }
                },
                ItemLocations: {}
            },
            firstPoeRoom: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    afterPoeRooms: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Blue Poe Room",
                        RequiredItems: [ItemSets.SWORDS]
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
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    carouselRoom: {
                        Map: "Forest Temple",
                        LockedDoor: "Locked Door in Green Bubble Hallway"
                    }
                },
                ItemLocations: {}
            },
            carouselRoom: {
                DisplayGroup: { groupName: "Twisted Corridor Rooms", imageName: "Fairy Bow" },
                Exits: {
                    fallingCeilingRoom: {
                        RequiredChoiceOfItems: [Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
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
                DisplayGroup: { groupName: "Falling Ceiling Rooms", imageName: "Small Poe" },
                Exits: {
                    skulltulaOnOutsideRightLedge: {},
                    outsideRightLedge: {}
                },
                ItemLocations: {
                    "Chest in Falling Ceiling Room": {
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 318, y: 116, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 29,
                        LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. Either shoot the frozen eye switch so that the arrow goes through the torch, or cast Din's Fire while standing just below the switch. Now, head back to the room with the ladder and fall down the hole. The chest is in the middle of this room. Alternatively, you can spawn a scarecrow in the right outside room that you can longshot to."
                    },
                    "2 Pots in Green Poe Room": {
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 303, y: 146, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "Make your way to the falling ceiling room. Nagivate through it to the green poe room. The pots are by the exit door."
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Forest Medallion" },
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            return ItemData.hasBossKey("Forest Temple");
                        }
                    }
                },
                ItemLocations: {
                    "Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 138, y: 237, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the chest.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return MapLocations["Forest Temple"]._canAccessAllPoeRooms(age);
                        }
                    },
                    "Skulltula in Basement": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 132, y: 228, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the skulltula",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return MapLocations["Forest Temple"]._canAccessAllPoeRooms(age);
                        }
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
        Floors: ["F5", "F4", "F3", "F2", "F1"],
        StartingFloorIndex: 4,
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canAccessBossKeyPath: function(age) {
            let canSkipPillar = age === Age.ADULT && Settings.GlitchesToAllow.fireFirstRoomPillarSkip;
            return ItemData.canUse(age, Items.MEGATON_HAMMER) || canSkipPillar;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby & Boss Key Path", imageName: "Boss Key" },
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
                            return MapLocations["Fire Temple"]._canAccessBossKeyPath(age);
                        }
                    },
                    bigLavaRoom: {
                        Map: "Fire Temple",
                        LockedDoor: "Top Locked Door in Lobby",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC);
                        }
                    },
                    bossArea: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC);
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Fire Temple"]["Exit"]
                    }
                },
                ItemLocations: {
                    // Locked Doors
                    "Bottom Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 126, y: 214, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 1,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "This is the door behind the pillar on the bottom of the lobby.",
                        RequiredToAppear: function() { return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.SMALL_KEY_SANITY; },
                        KeyRequirement: function(age) {
                            if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
                                return { min: 0, max: 0 };
                            }
                            return { min: 1, max: Keys.FIRE_TEMPLE.totalKeys()};
                        },
                        CustomRequirement: function(age) {
                            return MapLocations["Fire Temple"]._canAccessBossKeyPath(age);
                        }
                    },
                    "Top Locked Door in Lobby": {
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 136, y: 203, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
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
                        DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["bigLavaRoom"],
                        MapInfo: { x: 257, y: 202, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 12,
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
                        DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
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
                        DisplayGroup: { groupName: "Lower Boulder Maze", imageName: "Bomb" },
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
                        DisplayGroup: { groupName: "Lower Boulder Maze", imageName: "Bomb" },
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
                        DisplayGroup: { groupName: "Lava & Fire Wall Room", imageName: "Din's Fire" },
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
                        DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
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
                DisplayGroup: { groupName: "Lobby & Boss Key Path", imageName: "Boss Key" },
                UseAdultAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
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
                        Order: 2,
                        LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and enter the next room. The skulltula is on the back wall by the like-like."
                    },
                    "Flare Dancer Near Entrance": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 57, y: 60, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and continue until you get to the Flare Dancer room. To kill it - either use your hammer or hookshot to stun it. It will take three Master Sword jumpslashes to kill it. For some reason, the Biggoron's Sword will do less damage. Also, there's no need to try to jumpslash it more than once per cycle, as it won't do damage.",
                        RequiredChoiceOfAdultItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER, Items.HOOKSHOT],
                        RequiredChoiceOfChildItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER],
                    }
                }
            },
            bossKeyRoom: {
                DisplayGroup: { groupName: "Lobby & Boss Key Path", imageName: "Boss Key" },
                Exits: {},
                ItemLocations: {
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 63, y: 111, floor: "F1" },
                        Age: Age.EITHER,
                        UseChildAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        Order: 4,
                        LongDescription: "After the flare dancer room (see the other task), continue to the next room. Hammer the rusted switch to gain access to the boss key chest."
                    }
                }
            },
            bossArea: {
                DisplayGroup: { groupName: "Boss Area", imageName: "Fire Medallion" },
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            let canGetToDoor = age === Age.ADULT || Data.canMegaFlip(age);
                            return canGetToDoor && ItemData.hasBossKey("Fire Temple");
                        }
                    }
                },
                ItemLocations: {
                    "Goron Near Boss Door": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 34, y: 263, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.fireNoGoronTunic; },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the left door into the small room with lava. Navigate to the upper left corner of the room and step on the switch. The chest is inside the Goron cage.",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC);
                        }
                    },
                    "4 Pots Near Boss Door": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 45, y: 158, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 6,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the left door into the small room with lava. Navigate to the upper right corner of the room using your hookshot, hover boots, or by megaflipping. Climb up to get to the pots.",
                        CustomRequirement: function(age) {
                            let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
                            let canGetThere = Data.canMegaFlip(age) || Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.playerHas;
                            return tunicCheck && canGetThere;
                        }
                    }
                }
            },
            bigLavaRoom: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                UseAdultAge: function() { return !Settings.GlitchesToAllow.fireNoGoronTunic; },
                Exits: {
                    bigLavaRoomGoronRight: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Data.canGroundJumpWithBomb(age);
                            }
                            return ItemData.canUse(age, ItemSets.EXPLOSIVES);
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
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Along the back left wall is a platform that will rise up to an alcove after you jump on it (child can jump there from the moving platform). The pots are there."
                    },
                    "Big Lava Room Left Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 277, y: 141, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the left door to find a Goron and a chest."
                    }
                }
            },
            bigLavaRoomGoronRight: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                UseAdultAge: function() { 
                    return !Settings.GlitchesToAllow.fireNoGoronTunic ||
                        !Settings.GlitchesToAllow.groundJump;
                },
                Exits: {},
                ItemLocations: {
                    "Big Lava Room Right Goron": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 198, y: 280, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the right side of the room. Bomb the suspicious wall and follow the path to a Goron and a chest."
                    }
                }
            },
            bigLavaRoomSoTLedge: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                UseAdultAge: function() { 
                    return !Settings.GlitchesToAllow.fireNoGoronTunic ||
                        !Settings.GlitchesToAllow.groundJump;
                },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Upper Left Big Lava Room": {
                        MapInfo: {x: 164, y: 90, floor: "F1" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "Head to the left of the big lava room (the one in the right door from the entrance of the temple). Play the Song of Time to get a platform to the above room. The skulltula is on the back wall by the like-like."
                    }
                }
            },
            risingBlockRoom: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                UseAdultAge: function() { return !Settings.GlitchesToAllow.fireNoGoronTunic; },
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
                        LongDescription: "Open the locked door on the other side of the big lava room. Climb up the grate and navigate to the left of the room (opposite to where you go for the giant block). The hearts are up there guarded by some keese."
                    }
                }
            },
            firstTorchSlugRoom: {
                DisplayGroup: { groupName: "Big Lava Room", imageName: "Goron Tunic" },
                Exits: {
                    boulderMazeLower: {
                        Age: Age.ADULT,
                        Map: "Fire Temple",
                        CustomRequirement: function(age) {
                            let canGetByBlock = Data.canGroundJumpWithBomb(age) || Equipment.STRENGTH.playerHas;
                            let canHitSwitchFromAbove = ItemData.canUseAny(age, [ItemSets.EXPLOSIVES, ItemSets.PROJECTILES, Items.HOOKSHOT]);
                            return canGetByBlock && canHitSwitchFromAbove;
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
                DisplayGroup: { groupName: "Lower Boulder Maze", imageName: "Bomb" },
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
                        RequiredItems: [ItemSets.EXPLOSIVES]
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
                DisplayGroup: { groupName: "Lower Boulder Maze", imageName: "Bomb" },
                Exits: {
                    mapEnclosure: {
                        RequiredItems: [ItemSets.PROJECTILES]
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
                DisplayGroup: { groupName: "Lava & Fire Wall Room", imageName: "Din's Fire" },
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
                DisplayGroup: { groupName: "Lava & Fire Wall Room", imageName: "Din's Fire" },
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
                DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
                Exits: {
                    // These first two are used for the jail clip trick
                    boulderMazeLower: {},
                    fireWallRoom: {},
                    goronInPit: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
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
                DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
                Exits: {
                    goronInPitCell: {},
                    boulderMazeUpper: {}
                },
                ItemLocations: {}
            },
            goronInPitCell: {
                DisplayGroup: { groupName: "Upper Boulder Maze", imageName: "Goron Mask" },
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
                DisplayGroup: { groupName: "Upper Scarecrow Rooms", imageName: "Hookshot Hookshot" },
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
                DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
                Exits: {
                    bossRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireBKSkipFromFireWallMaze;
                        }
                    },
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
                DisplayGroup: { groupName: "Fire Wall Maze", imageName: "Fire Arrow" },
                Exits: {
                    centerRoomBottom: {},
                    hammerChestRoom: {
                        RequiredItems: [ItemSets.SWORDS, ItemSets.EXPLOSIVES]
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
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Megaton Hammer" },
                Exits: {
                    stairCaseRoomAfterHammer: {
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                    centerRoomTopSwitch: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.fireJumpDownToSoTBlock && ItemData.canUse(age, Items.MEGATON_HAMMER);
                        }
                    },
                    centerRoomBottom: {}
                },
                ItemLocations: {
                    "Hammer Chest at Very Top": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 43, y: 157, floor: "F5" },
                        Age: Age.ADULT,
                        Order: 34,
                        LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. Make your way around the entire maze. First, you must navigate to the left side of the middle pillar. After you go through that, you must navigate to a switch that lowers the bigger fire wall. Bomb the fake door and defeat the Flare Dancer (see the other Flare Dancer task for advice on this). Ride his platform up to the next room. Make your way though the fire switch puzzle room into the next room. In this room, you must hit the switch and then quickly navigate over to the hammer chest. Alternatively, you can let a fire keese hit you near the chest, then spam A to open it before you're damaged by the chest fire."
                    }
                }
            },
            stairCaseRoomAfterHammer: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Megaton Hammer" },
                Exits: {},
                ItemLocations: {
                    "2 Small Crates in Hammer Staircase Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 141, y: 63, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 34.1,
                        LongDescription: "Use your hammer to make the block fall in the spiral staircase room with the hammer. The crates are in the corner in the next room."
                    }
                }
            },
            centerRoomBottom: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Megaton Hammer" },
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
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Megaton Hammer" },
                Exits: {
                    centerRoomBottom: {},
                    centerRoomCell: {}
                },
                ItemLocations: {}
            },
            centerRoomCell: {
                DisplayGroup: { groupName: "After Final Flare Dancer", imageName: "Megaton Hammer" },
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
        Floors: ["F3", "F2", "F1", "B1"],
        StartingFloorIndex: 0,
        UseAdultAge: function() { 
            return !Settings.RandomizerSettings.shuffleDungeonEntrances &&
                !Settings.GlitchesToAllow.childLakesideLabClip;
        },
        _isPlayerLockedOutOfHighWater: function() {
            // If the player didn't lower the water, then they aren't locked out of it!
            if (!Data.itemLocationObtained("Water Temple", "lowWaterLevel", "Lower Water Level")) {
                return false;
            }
    
            // This check allows the player to get to the high water switch directly while the water is drained
            let canGetToTopFloorWithWaterLowered = Items.HOOKSHOT.playerHas && Settings.GlitchesToAllow.waterHookshotToFloor1;
            if (canGetToTopFloorWithWaterLowered || Equipment.HOVER_BOOTS.playerHas) { 
                if (Equipment.HOVER_BOOTS.playerHas || Settings.GlitchesToAllow.waterHighWaterJump) {
                    return false; 
                }
            }
                
            // This checks whether the player can get to high water switch the normal way
            let canLightMiddleTorch = ItemData.canUseAny(Age.ADULT, [Items.FAIRY_BOW, ItemSets.FIRE_ITEMS]);
            let canGetToCentralMidFromBottom = Data.itemLocationObtained("Water Temple", "main", "Locked Door to Central Room") && Items.HOOKSHOT.playerHas;
            let canRaiseWaterToMid = canLightMiddleTorch || canGetToCentralMidFromBottom;
            let canHitCrystalSwitch = ItemData.canUseAny(Age.ADULT, [ItemSets.EXPLOSIVES, Items.HOOKSHOT, Items.FAIRY_BOW]);
            let canLowerWater = canRaiseWaterToMid && canHitCrystalSwitch;
    
            return !canLowerWater;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Hub/Boss Area (Top North)", imageName: "Water Medallion" },
                Exits: {
                    midEastWingPots: {
                        CustomRequirement: function(age) {
                            if (ItemData.canUse(age, Items.BOOMERANG)) { return true; }
                            let canBreakPot = ItemData.canUseAny(age, [Items.HOOKSHOT, Items.FAIRY_BOW, Items.FAIRY_SLINGSHOT]);
                            return canBreakPot && ItemData.canUseAny(age, [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]);
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
                        RequiredChoiceOfAdultItems: [Equipment.IRON_BOOTS, UpgradedItems.LONGSHOT],
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Data.itemLocationObtained("Water Temple", "lowWaterLevel", "Lower Water Level");
                            }
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    highWaterLevel: {
                        CustomRequirement: function(age) {
                            return !MapLocations["Water Temple"]._isPlayerLockedOutOfHighWater();
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
                        KeepLockedDoorOrder: true,
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
                            if (!Equipment.IRON_BOOTS.playerHas || !ItemData.canUse(Age.ADULT, UpgradedItems.LONGSHOT)) {
                                keysReq -= 2; // Can't open the tektite room doors
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door in Waterfall Room": {
                        DisplayGroup: { groupName: "Waterfall Path (Top West)", imageName: "Hookshot Longshot" },
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
                            if (!Equipment.IRON_BOOTS.playerHas || !ItemData.canUse(Age.ADULT, UpgradedItems.LONGSHOT)) {
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
                            if (!ItemData.canUse(Age.ADULT, UpgradedItems.LONGSHOT)) {
                                keysReq -= 2; // Can't open the tektite room doors
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door in Bottom North Room": {
                        DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["roomWithManyTektitesAntechamber"],
                        MapInfo: { x: 191, y: 113, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "This is the door on the bottom north path. You can use iron boots or drain the water to get here. Longshot or backwalk/hover boots/backflip across to get to the door.",
                        RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, UpgradedItems.LONGSHOT],
                        KeyRequirement: function(age) {
                            let keysReq = 4;
                            if (!Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
                                keysReq--; // Can't open the central door
                            }

                            return { min: 1, max: keysReq };
                        }
                    },
                    "Locked Door after Boulder Waterfall": {
                        DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
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
            bossAntechamber: {
                DisplayGroup: { groupName: "Hub/Boss Area (Top North)", imageName: "Water Medallion" },
                Exits: {
                    bossRoom: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return ItemData.hasBossKey("Water Temple");
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots by Boss Antechamber": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 227, y: 175, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 0.1,
                        LongDescription: "With the water level raised, longshot to the back area of the top floor. The pots are by the door leading to the boss room antechamber."
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
            },
            waterfallRoom: {
                DisplayGroup: { groupName: "Waterfall Path (Top West)", imageName: "Hookshot Longshot" },
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
                DisplayGroup: { groupName: "Waterfall Path (Top West)", imageName: "Hookshot Longshot" },
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
                DisplayGroup: { groupName: "Waterfall Path (Top West)", imageName: "Hookshot Longshot" },
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
                        RequiredItems: [Equipment.IRON_BOOTS, ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Heart 4 in Whirlpool Room": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Recovery Heart",
                        MapInfo: { x: 55, y: 148, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 10,
                        LongDescription: "In the whirlpool river, this is one of the items you'll run into while swimming (before the third vortex)."
                    },
                    "2 Pots at End of Whirlpool Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        Age: Age.ADULT,
                        Order: 11,
                        MapInfo: { x: 49, y: 160, floor: "F1" },
                        LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the block from the floor. Drop down. Swim to the end of the room - the pots are on a ledge."
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
                DisplayGroup: { groupName: "Dragon Whirlpool Room (Top/Low West)", imageName: "Scale Silver Scale" },
                Exits: {},
                ItemLocations: {
                    "Chest in Dragon Room at Bottom West Wing": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
                        Order: 13,
                        MapInfo: { x: 33, y: 61, floor: "F1" },
                        LongDescription: "There are two ways to get to this room. One way: after draining the water, make your way to the bottom west wing. Push the red block out of the way then follow the path. Get to the other side of the switch and water puzzle to get the dragon and whirlpool room.<br/><br/>The alternate path to this room is to drop down after the vortex room chest (post-Dark Link).<br/><br/>When here, use your Iron Boots to sink down in the upper right corner of the vortex room, on the lower dragon. From there, hookshot the crystal switch in the dragon's mouth. Now hookshot the target in the room that opens up. Unequip your Iron Boots then float up to the chest.<br/><br/>You can also line up a bombchu with the switch from the platform by the door. Now, either use your iron boots to navigate to the door, or dive using the silver scale to get there (you'll have to dive early enough - when you're near the right wall).",
                        CustomRequirement: function(age) {
                            let canUseIronBoots = ItemData.canUse(age, Equipment.IRON_BOOTS);
                            if (Items.BOMBCHU.playerHas) {
                                let canDiveDownNormally = Equipment.SCALE.playerHas || canUseIronBoots;
                                return Settings.GlitchesToAllow.waterDragonChestWithChu || canDiveDownNormally;
                            }

                            return canUseIronBoots && Items.HOOKSHOT.playerHas;
                        }
                    }
                }
            },
            highWaterLevel: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {
                    bossAntechamber: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let canSkipLongshot = Data.canHammerHoverBootsSuperslide(age);
                            return ItemData.canUse(age, UpgradedItems.LONGSHOT) || canSkipLongshot;
                        }
                    },
                    waterfallRoom: {
                        Map: "Water Temple",
                        Age: Age.ADULT,
                        LockedDoor: "Locked Door on Top Floor"
                    }
                },
                ItemLocations: {
                    "Chest by Water Lowering Triforce": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 332, y: 223, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "From the entrance of the temple, jump off and sink down to the bottom (or longshot a torch on the bottom of the east side). Head down the hallway of the east room. Take off your iron boots and float up to the surface. Enter the door and kill the enemies to spawn the chest.",
                        RequiredChoiceOfItems: [Equipment.IRON_BOOTS, UpgradedItems.LONGSHOT],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    }
                }
            },
            lowWaterLevel: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {
                    lowEastWingPots: {},
                    midEastWingPots: {},
                    compassRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    bottomSouthWing: {
                        Age: Age.ADULT,
                        RequiredItems: [ItemSets.EXPLOSIVES],
                        RequiredChoiceOfAdultItems: [UpgradedItems.LONGSHOT, Equipment.HOVER_BOOTS],
                        RequiredChoiceOfItems: [Equipment.SCALE, Equipment.IRON_BOOTS]
                    },
                    midWaterTriforceFloor: {
                        RequiredChoiceOfItems: [Items.FAIRY_BOW, Items.DEKU_STICK, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
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
                        CustomRequirement: function(age) {
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
                        MapImageName: "Zelda's Lullaby",
                        LongDescription: "To get here, go to the bottom east wing and float up to the top. If you don't have iron boots, you can longshot the torches to get down there!"
                    },
                    "Chest After Torches in Bottom East Wing": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
                        Order: 17,
                        MapInfo: { x: 326, y: 212, floor: "F1" },
                        LongDescription: "From the entrance of the temple, jump off and sink down to the bottom. Head down the hallway of the east room. Take off your iron boots and float up to the surface. Play Zelda's lullaby at the Triforce to lower the water. Now head back down.<br/><br>In this room, light the torches wih your bow or with Din's fire.<br/><br/>Child can use sticks to light the torches as well, and can kill the enemies in the next room with spin attacks if he has magic.",
                        RequiredChildItems: [Equipment.MAGIC, Equipment.KOKIRI_SWORD],
                        RequiredChoiceOfItems: [Items.FAIRY_BOW, Items.DEKU_STICK, ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            lowEastWingPots: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {},
                ItemLocations: {
                    "2 Pots in Low East Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 287, y: 213, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "These pots are by the door in the lower eastern wing. Either use iron boots and the hookshot the break them, or drain the water."
                    }
                }
            },
            crackedWallArea: {
                DisplayGroup: { groupName: "Water Lowering Rooms (Low East)", imageName: "Ocarina" },
                Exits: {},
                ItemLocations: {
                    "Bombable Wall Chest Below Water Lowering Triforce": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 23,
                        MapInfo: {x: 333, y: 131, floor: "F2" },
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        LongDescription: "After raising the water to mid level, make your way back toward the low level room. This time, you won't float up all the way to the top. In this room, you will see a cracked wall. Bomb it to get to a chest.",
                        RequiredItems: [ItemSets.EXPLOSIVES],
                    }
                }
            },
            bottomSouthWing: {
                DisplayGroup: { groupName: "Caged Skulltula Room (Low South)", imageName: "Bomb" },
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
                DisplayGroup: { groupName: "Central Rooms (Mid/Low)", imageName: "Ocarina of Time" },
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
                        Age: Age.ADULT,
                        Order: 21,
                        MapInfo: { x: 157, y: 217, floor: "F1" },
                        LongDescription: "In the room with the middle water level Triforce, there is a skulltula high up on the wall. There are three ways to get it; the bottom two enable the hookshot to be used:<br/>- Use the longshot<br/>- Cast Farore's Wind in the room, raise the water to max, then warp back in<br/>- Enter the room from the middle, then exit from the bottom - the middle area door will not be barred. Come back via the iron boots to get the skulltula with the hookshot after raising the water to max.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
                        CustomRequirement: function(age) {
                            // You can just longshot it
                            if (ItemData.canUse(age, UpgradedItems.LONGSHOT)) { 
                                return true; 
                            }

                            if (MapLocations["Water Temple"]._isPlayerLockedOutOfHighWater()) {
                                return false;
                            }

                            // Cast FW in the room, then raise the water and recast FW
                            if (ItemData.canUse(age, Items.FARORES_WIND)) {
                                return true;
                            }

                            // Enter the room via the fire door, then exit out the bottom via the locked door
                            // Now raise the water and return through the fire door with iron boots (the bars will be gone still)
                            let bottomDoorCheck = Data.itemLocationObtained("Water Temple", "main", "Locked Door to Central Room") ||
                                ItemData.getKeyCount("Water Temple") === Keys.WATER_TEMPLE.totalKeys();
                            if (ItemData.canUseAll(age, [Equipment.IRON_BOOTS, ItemSets.FIRE_ITEMS]) && bottomDoorCheck) {
                                return true;
                            }
                        }
                    }
                }
            },
            centralRoomBottom: {
                DisplayGroup: { groupName: "Central Rooms (Mid/Low)", imageName: "Ocarina of Time" },
                Exits: {
                    midWaterTriforceFloor: {
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {}
            },
            midWaterLevel: {
                DisplayGroup: { groupName: "Central Rooms (Mid/Low)", imageName: "Ocarina of Time" },
                Exits: {
                    highWaterLevel: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        RequiredChoiceOfItems: [ItemSets.EXPLOSIVES, Items.HOOKSHOT, Items.FAIRY_BOW]
                    },
                    midWaterTriforceFloor: {},
                    behindBlockArea: {
                        CustomRequirement: function(age) {
                            // Weirdshot by the right wall in the corner after the hookshot target by the gate (down the hall)
                            if (Data.canWeirdShot(age)) { return true; }

                            // If not weirdshotting, need to shoot eye AND move the block
                            if (!ItemData.canUseAll(age, [ItemSets.PROJECTILES, Equipment.STRENGTH])) { 
                                return false; 
                            }

                            return Settings.GlitchesToAllow.waterEyeSwitchGateFromTop || // Shoot from the top and run in
                                ItemData.canUseAny(age, [UpgradedItems.LONGSHOT, Equipment.HOVER_BOOTS]); // Normal way, either hit target, or run with hovers

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
            midEastWingPots: {
                DisplayGroup: { groupName: "Compass Room (Mid East)", imageName: "Compass" },
                Exits: {},
                ItemLocations: {
                    "2 Pots by Mid East Wing": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 216, y: 131, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "The pots are by the entrance to the mid eastern wing. If you can't break them normally, you can either get them with the boomerang, or break them with a hookshot/bow/slingshot and dive for the item."
                    }
                }
            },
            compassRoom: {
                DisplayGroup: { groupName: "Compass Room (Mid East)", imageName: "Compass" },
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
            behindBlockArea: {
                DisplayGroup: { groupName: "Block Hallways (Top East/Mid South)", imageName: "Strength Silver Gauntlets" },
                UseAdultAge: function() { return !Settings.GlitchesToAllow.waterEyeSwitchGateFromTop; },
                Exits: {},
                ItemLocations: {
                    "Chest Behind Block at Mid Level": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.EITHER,
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
                        Order: 28,
                        LongDescription: "First, make your way to the top east wing. Push back the block and then go to the southern mid-level.<br/><br/>Shoot the eye switch then quickly longshot the target or use your hover boots to pass the gate. Go down the room and push the red block backward. Now you must make your way back around, this time pushing the block forward out of your way. Head to the right to the pots.<br/><br/>Note that alternatively, you can shoot the eye switch twice to get the block in position."
                    }
                }
            },
            roomWithManyTektitesAntechamber: {
                DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
                Exits: {
                    roomWithManyTektites: {
                        Map: "Water Temple",
                        Age: Age.ADULT,
                        RequiredChoiceOfAdultItems: [Equipment.HOVER_BOOTS, UpgradedItems.LONGSHOT],
                        LockedDoor: "Locked Door in Bottom North Room"
                    },
                },
                ItemLocations: {}
            },
            roomWithManyTektites: {
                DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
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
                DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
                Exits: {
                    boulderWaterfall: {
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [Equipment.HOVER_BOOTS, Equipment.STRENGTH, ItemSets.EXPLOSIVES]) ||
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
                DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
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
                        LongDescription: "Head to the bottom of the main room - no need to lower the water if you don't want to. Enter the north wing. After you reach the dead end, equip your boots and surface. Longshot to the other side and enter the locked door. Navigate across the room to the other side - might help to kill the tektites. Complete the puzzle in this room (or cross it with hover boots or a megaflip!) which requires you to explode a destroyable wall and push a block onto a switch. After the next room (water switch jumping puzzle), you should see the skulltula on the waterfall to the right.<br/><br/>If you have no hookshot, you can backwalk into it with hover boots starting from the ledge with the door to get the token (you can kill it with your sword by going at it head-on with the hover boots, then jump-slashing).",
                        RequiredChoiceOfItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS, Equipment.HOVER_BOOTS]
                    }
                }
            },
            bossKeyRoom: {
                DisplayGroup: { groupName: "Boss Key Loop (Low North)", imageName: "Boss Key" },
                Exits: {},
                ItemLocations: {
                    "2 Pots in Boss Key Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 124, y: 53, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 32.1,
                        LongDescription: "From the waterfall, use iron boots to navigate under the water to the locked door to the chest. If you don't have iron boots, you can jump from the platform with the door to the water to sink low enough to advance. The pots are in the back corners of the room."
                    },
                    "Boss Key Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        Age: Age.ADULT,
                        Order: 33,
                        MapInfo: { x: 123, y: 57, floor: "F1" },
                        LongDescription: "From the waterfall, use iron boots to navigate under the water to the locked door to the chest. If you don't have iron boots, you can jump from the platform with the door to the water to sink low enough to advance."
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
        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
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
                        DisplayGroup: { groupName: "Gibdos & Scythe Rooms", imageName: "Compass" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterTruthSpinner"],
                        MapInfo: { x: 330, y: 170, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "This is the door after the truth spinner room with the beamos. It's located behind the bombable wall.",
                        RequiredItems: [ItemSets.EXPLOSIVES],
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
                        DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Strength Goron's Bracelet" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterBombableWall", "invisibleSpikeRoom"],
                        MapInfo: { x: 156, y: 92, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 21,
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
                        DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
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
                        DisplayGroup: { groupName: "Wind Hallway & Gibdo Room", imageName: "Iron Boots" },
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
                        DisplayGroup: { groupName: "Boat Room Across Chasm", imageName: "Fairy Bow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["acrossChasmToBossRoom"],
                        MapInfo: { x: 132, y: 136, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 44,
                        LongDescription: "This is the door across the chasm after creating the statue bridge.",
                        KeyRequirement: function(age) {
                            let min = 5;
                            if (Settings.GlitchesToAllow.shadowGateClip) {
                                min = 1;
                            }

                            return { min: min, max: 5 };
                        }
                    }
                }
            },
            truthSpinnerRoom: {
                DisplayGroup: { groupName: "Entrance & Maze Rooms", imageName: "Hover Boots" },
                Exits: {
                    afterTruthSpinner: {
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, Equipment.HOVER_BOOTS) || Data.canMegaFlip(age);
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
                        Order: 1,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. The room is somewhere on your right. The pots are in the back corners of the room."
                    },
                    "Dungeon Map Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 100, y: 107, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. The dungeon map chest room is somewhere on the wall to your right. You must kill all the enemies inside to get it.",
                        RequiredItems: [ItemSets.DAMAGING_ITEMS]
                    },
                    "2 Pots in Front Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 92, y: 153, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar until you find the pots."
                    },
                    "Flying Pot in Back Maze Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 71, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. Go to your left and the pot should fly into you."
                    },
                    "3 Pots in Back Maze Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 62, y: 163, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. The pots are in the next room on the left."
                    },
                    "Pot by Dead Hand Entrance": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 55, y: 148, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Circle around the central pillar and go through the fake wall. The pot is on the other side of the room by the fake wall to Dead Hand."
                    },
                    "Hover Boots Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 15, y: 142, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Navigate all the way through the fake wall maze and defeat Deadhand for the chest.",
                        RequiredItems: [ItemSets.SWORDS]
                    }
                }
            },
            afterTruthSpinner: {
                DisplayGroup: { groupName: "Gibdos & Scythe Rooms", imageName: "Compass" },
                Exits: {
                    afterBombableWall: {
                        Map: "Shadow Temple",
                        RequiredItems: [ItemSets.EXPLOSIVES],
                        LockedDoor: "Locked Door by Beamos"
                    },
                    boatRoomStart: {
                        Age: Age.ADULT,
                        RequiredChoiceOfItems: [Equipment.HYLIAN_SHIELD, Equipment.MIRROR_SHIELD],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowGateClip;
                        }
                    },
                    boatRoomLedge: {
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.HOVER_BOOTS],
                        RequiredChoiceOfItems: [Equipment.HYLIAN_SHIELD, Equipment.MIRROR_SHIELD],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.shadowUpperBoatRoomJump;
                        }
                    }
                },

                ItemLocations: {
                    "Compass Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 300, y: 220, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the right path (it's a fake wall) and enter the room. Defeat the gibdos for a chest.",
                        RequiredItems: [ItemSets.SWORDS]
                    },
                    "Scythe Silver Rupee Right of Scythe": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 304, y: 113, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.1,
                        LongDescription: "Take the left door from the beamos to get to the scythe room. This rupee is to the right of the spinning scythe."
                    },
                    "Scythe Silver Rupee Left of Scythe": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 292, y: 99, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.2,
                        LongDescription: "This rupee is to the left of the spinning scythe."
                    },
                    "Scythe Silver Rupee in Left Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 271, y: 113, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.3,
                        LongDescription: "This rupee is in the alcove on the left."
                    },
                    "Scythe Silver Rupee in Midair": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 273, y: 88, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 8.4,
                        LongDescription: "This rupee is in the northwest corner of the room. Use your hookshot or hoer boots to get to it.",
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]) ||
                                Settings.GlitchesToAllow.shadowSilverRupeeWithNothing;
                        }
                    },
                    "Scythe Silver Rupee in Back Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 316, y: 78, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 8.5,
                        LongDescription: "This rupee is in the alcove in the back part of the room."
                    },
                    "Scythe Room Silver Rupee Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 121, floor: "F1" },
                        Age: Age.EITHER,
                        UseAdultAge: function(age) { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                        Order: 9,
                        LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the left path (it's a fake wall) and enter the room. Collect all the silver rupees to open the path to a chest.<br/><br/>If you have no hookshot, you can use hover boots to get to the wooden box from one of the wooden platforms.",
                        CustomRequirement: function(age) {
                            // We can't check the index via the property here since we don't NEED the rupees to advance in this case
                            if (Settings.RandomizerSettings.shuffleSilverRupees) { 
                                return Data.canWeirdShot(age) || ItemData.checkSilverRupeeRequirement("Shadow Temple", 0);
                            }
                            if (age === Age.CHILD) { return false; }

                            return ItemData.canUseAny(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]) ||
                                Settings.GlitchesToAllow.shadowSilverRupeeWithNothing;
                        }
                    }
                }
            },
            afterBombableWall: {
                DisplayGroup: { groupName: "Invisible Scythe & Pit Rooms", imageName: "Lens of Truth" },
                Exits: {
                    fallingSpikesRoom: {
                        Map: "Shadow Temple",
                        CustomRequirement: function(age) {
                            return ItemData.checkSilverRupeeRequirement("Shadow Temple", 1) ||
                                (Settings.GlitchesToAllow.shadowPitRoomSilverRupeeSkip && ItemData.canUse(age, ItemSets.SWORDS));
                        }
                    },
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
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). The hearts are in the back left corner. Play the Song of Time to spawn a block to get them.",
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || ItemData.canUse(age, Items.BOOMERANG);
                        }
                    },
                    "Visible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 138, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is behind the gate that opened.",
                        RequiredItems: [ItemSets.SWORDS]
                    },
                    "Invisible Chest in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 344, y: 143, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is next to the visible chest.",
                        RequiredItems: [ItemSets.SWORDS]
                    },
                    "Skulltula in Invisible Scythe Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 348, y: 140, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The skulltula is behind the open gate.<br/><br/>If you are an adult and have no hookshot, you can kill the skulltula with a jumpslash. Line yourself up so that you, the chest, and the token are in a line. Face the other way and do two backflips (Down + Z + spam A). If you were the right distance away, you should grab the token after backflipping off the chest.",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS);
                        }
                    },
                    "5 Pit Room Silver Rupees": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "5 Silver Rupees",
                        MapInfo: { x: 137, y: 215, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 14.1,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. The rupees are scattered near the beamos. One under him (just touch him to get it), two near him, one by the chasm, and one by the wall."
                    }
                }
            },
            fallingSpikesRoom: {
                DisplayGroup: { groupName: "Falling Spikes Room", imageName: "Strength Goron's Bracelet" },
                Exits: {
                    topOfFallingSpikesRoom: {
                        CustomRequirement: function(age) {
                            return (age === Age.ADULT && Equipment.STRENGTH.playerHas) || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
                        }
                    }
                },
                ItemLocations: {
                    "2 Lower Pots in Falling Spikes Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 51, y: 211, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The pots are to the right of the falling spikes, guarded by the spike trap."
                    },
                    "Skulltula in Falling Spikes Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 52, y: 238, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The skulltula is in the first cage to the left near the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade.",
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS) || Data.canStaircaseHover(age);
                        }
                    },
                    "Bottom Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 37, y: 212, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The chest is on the second cage to the right passed the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade."
                    }
                }
            },
            topOfFallingSpikesRoom: {
                DisplayGroup: { groupName: "Falling Spikes Room", imageName: "Strength Goron's Bracelet" },
                UseAdultAge: function() {  return !Settings.GlitchesToAllow.shadowBackFlipOnSpikes; },
                Exits: {},
                ItemLocations: {
                    "Top Switchless Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 16, y: 239, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. The chest is in a cage in the corner of the room."
                    },
                    "Top Switch Chest in Falling Spikes Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 76, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. Hit the switch on top and then get the chest that spawns."
                    },
                    "2 Upper Pots in Falling Spikes Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 82, y: 209, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. The pots are on the top of the area you pulled the block out of."
                    }
                }
            },
            invisibleSpikeRoom: {
                DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
                Exits: {
                    afterBombableWall: {
                        Map: "Shadow Temple",
                        Age: Age.ADULT,
                        LockedDoor: "Locked Door in Giant Pit Room"
                    },
                    giantSkullRoom: {
                        Map: "Shadow Temple",
                        SilverRupeeIndex: 2,
                        CustomRequirement: function(age) {
                            return Settings.RandomizerSettings.shuffleSilverRupees || ItemData.canUse(age, Items.HOOKSHOT);
                        }
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
                        LongDescription: "To get here, first head to the area with the beamos and spike traps. Face the door leading to the ceiling spike room. Now turn right. Follow the edge of the pit in front of you all the way to the guillotine. Use your Lens of Truth to navigate the platforms and make it to the door. Once inside, kill all the redeads to spawn the chest. Be careful of the invisible spikes in here - you can equip the Goron Tunic to avoid some damage since they act like lava.",
                        RequiredItems: [ItemSets.SWORDS]
                    },
                    "Invisible Spike Ground Center Silver Rupee": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 156, y: 72, floor: "B2" },
                        Age: Age.EITHER,
                        Order: 22.1,
                        LongDescription: "This rupee is in front of you as you enter the room."
                    },
                    "Invisible Spike Silver Rupee on Right Wall": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 184, y: 65, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 22.2,
                        LongDescription: "This rupee is in to the right, just below the hookshot target.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Silver Rupee on Left Wall": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 136, y: 82, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 22.3,
                        LongDescription: "This rupee is in to the left, just below the hookshot target.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Silver Rupee on Invisible Ledge": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 132, y: 52, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 22.4,
                        LongDescription: "This rupee is on an invisible ledge in the back left corner of the room. There's an invisible hookshot target on the back wall you can use to get up to it.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Invisible Spike Midair Silver Rupee by Invisible Ledge": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 140, y: 60, floor: "B2" },
                        Age: Age.ADULT,
                        Order: 22.5,
                        LongDescription: "Get to the invisible ledge (see the previous rupee). You can use your hover boots, or roll jump to get to this nearby silver rupee.",
                        RequiredItems: [Items.HOOKSHOT]
                    }
                }
            },
            giantSkullRoom: {
                DisplayGroup: { groupName: "Invisible Spike Room", imageName: "Spooky Mask" },
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                Exits: {},
                ItemLocations: {
                    "Key in Giant Skull": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 92, y: 70, floor: "B2" },
                        Age: Age.EITHER,
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
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "To get here, start at the invisible spike room. Collect all the silver rupees using your hookshot. Note that there are a few invisible targets. Enter the room on the bottom that unlocks. The skulltula is behind the giant skull."
                    }
                }
            },
            windHallway: {
                DisplayGroup: { groupName: "Wind Hallway & Gibdo Room", imageName: "Iron Boots" },
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
                        RequiredItems: [ItemSets.EXPLOSIVES]
                    }
                }
            },
            boatRoomStart: {
                DisplayGroup: { groupName: "Boat Room Start", imageName: "Zelda's Lullaby" },
                Exits: {
                    windHallway: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door in Gibdo Room"
                    },
                    boatRoomSkulltula: {
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    boatRoomLedge: {
                        RequiredSongs: [Songs.SCARECROWS_SONG],
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    boatRoomEnd: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                },
                ItemLocations: {}
            },
            boatRoomSkulltula: {
                DisplayGroup: { groupName: "Boat Room Start", imageName: "Zelda's Lullaby" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Boat Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 274, y: 116, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 31,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. If you face the front of the boat, you can see the skulltula slightly to your left. You can get it with your longshot - Scarecrow's Song can help, but isn't needed.",
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS) || Data.canStaircaseHover(age);
                        }
                    }
                }
            },
            boatRoomLedge: {
                DisplayGroup: { groupName: "Boat Room Start", imageName: "Zelda's Lullaby" },
                Exits: {
                    boatRoomSkulltula: {},
                    boatRoomStart: {}
                },
                ItemLocations: {
                    "2 Hearts in Boat Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 280, y: 114, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 32,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole.<br/><br/>Play scarecrow's song from the boat and longshot it to get to the platform with the hearts."
                    }
                }
            },
            boatRoomEnd: {
                DisplayGroup: { groupName: "Boat Room Start of Chasm", imageName: "Boss Key" },
                Exits: {
                    chasmScarecrowPlatform: {
                        RequiredSongs: [Songs.SCARECROWS_SONG],
                        RequiredItems: [UpgradedItems.LONGSHOT]
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
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        Order: 33,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across.<br/><br/>The pot is the one on the right near where the bridge falls (the other pot is empty)."
                    },
                    "2 Pots on Boat Side of Chasm": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 138, y: 104, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 33,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. The parts are near where the bridge falls."
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
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the chest.<br/><br/>If you don't have it, run up against the left side of the wall in the back of the room and have the redead freeze you. You should phase through the wall."
                    },
                    "Boss Key Chest in Spike Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 108, y: 52, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the boss key chest.<br/><br/>If you don't have it, run up against the right side of the wall in the back of the room and have the redead freeze you. You should phase through the wall."
                    },
                    "Wonderitem in Triple Skull Room": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 66, y: 98, floor: "B1" },
                        Age: Age.ADULT,
                        Order: 36.1,
                        LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room straight across from you.<br/><br/>Once inside, turn around and shoot the picture on the wall with your bow to spawn the wonderitem.",
                        RequiredItems: [Items.FAIRY_BOW]
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
                DisplayGroup: { groupName: "Boat Room Across Chasm", imageName: "Fairy Bow" },
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
                DisplayGroup: { groupName: "Boat Room Across Chasm", imageName: "Fairy Bow" },
                Exits: {
                    chasmScarecrowPlatform: {
                        RequiredSongs: [Songs.SONG_OF_TIME, Songs.SCARECROWS_SONG],
                        RequiredItems: [Items.HOOKSHOT],
                    },
                    bossRoom: {
                        Map: "Shadow Temple",
                        LockedDoor: "Locked Door After Boat Ride",
                        CustomRequirement: function(age) {
                            if (!ItemData.hasBossKey("Shadow Temple")) { return false; }

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
                        RequiredChoiceOfItems: [Songs.SONG_OF_TIME, Items.BOOMERANG]
                    },
                    "2 Pots by Boss Antechamber": {
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
                DisplayGroup: { groupName: "Boss Area", imageName: "Shadow Medallion" },
                Exits: {
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
        Floors: ["F4", "F3", "F2", "F1"],
        StartingFloorIndex: 3,
        _canAccessAdultSide: function() {
            if (ItemData.canUse(Age.ADULT, UpgradedItems.SILVER_GAUNTLETS)) { return true; }

            return (Settings.GlitchesToAllow.spiritBlockSkipWithHovers && Equipment.HOVER_BOOTS.playerHas) || (
                Settings.GlitchesToAllow.spiritBlockSkipWithBombPush && 
                ItemData.canUseAll(Age.ADULT, [ItemSets.SHIELDS, Items.BOMB]));
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby", imageName: "Requiem of Spirit" },
                Exits: {
                    childOnlyArea: {
                        Age: Age.CHILD
                    },
                    beyondSilverBlock: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return MapLocations["Spirit Temple"]._canAccessAdultSide();
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
                        LongDescription: "These pots are on either side of the first staircase in the lobby."
                    },

                    // Locked Doors
                    "Locked Door After Second Crawl Space": {
                        DisplayGroup: { groupName: "Sun on Floor Room", imageName: "Bombchu" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["afterSecondCrawlSpace", "roomWithSunOnFloor"],
                        MapInfo: { x: 87, y: 100, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 9,
                        LongDescription: "This is the door after the second crawlspace on the child side. It's also the door to the room with the sun on the floor.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: Keys.SPIRIT_TEMPLE.totalKeys()};
                        }
                    },
                    "Locked Door to Silver Gaunts Knuckle": {
                        DisplayGroup: { groupName: "Sun Block & Silver Gauntlets Path", imageName: "Silver Gauntlets" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["sunBlockRoom"],
                        MapInfo: { x: 32, y: 198, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
                        KeyRequirement: function(age) {
                            // There's only one path for child, and it uses only 2 keys
                            if (!MapLocations["Spirit Temple"]._canAccessAdultSide()) {
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
                        DisplayGroup: { groupName: "Rooms After Silver Block", imageName: "Adult Icon" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["beyondSilverBlock"],
                        MapInfo: { x: 272, y: 167, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 25,
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
                        DisplayGroup: { groupName: "Statue Room", imageName: "Dungeon Map" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["statueRoom"],
                        MapInfo: { x: 256, y: 217, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 32,
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
                        DisplayGroup: { groupName: "Anubis/Armos/Mirror Shield Path", imageName: "Mirror Shield" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["adultAnubisRoom"],
                        MapInfo: { x: 223, y: 105, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 38,
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
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                Exits: {
                    childAfterStalfos: {
                        RequiredChoiceOfChildItems: [ItemSets.SWORDS, ItemSets.EXPLOSIVES], // To clear the first room
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) ||
                                ItemData.canUseAny(age, [
                                    ItemSets.PROJECTILES, Items.BOOMERANG, // Hit the switch directly
                                    Items.BOMBCHU, // Backflip x3 from the opposite wall and drop it
                                    Equipment.HOVER_BOOTS, // Cross directly
                                    UpgradedItems.LONGSHOT // Hook the chest across the chasm
                                ]);
                        }
                    },
                    childSkulltulaInGrateRoom: {
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    afterSecondCrawlSpace: {}
                },
                ItemLocations: {}
            },
            childAfterStalfos: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                Exits: {
                    childGrateRoom: {}
                },
                ItemLocations: {
                    "Flying Pot After Stalfos": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 39, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room. The goal in this room is to hit the switch to lower the bridge to get the pot on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos.<br/><br/>To use a bombchu, line up with the back wall and face the switch. Take out the chu then drop it after the first flash (like 1/2 a second).<br/><br/>Note that the flying pot you want to hit you is the one on the right; the left one contains nothing."
                    },
                    "2 Flying Pots After Stalfos": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 39, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room. The goal in this room is to hit the switch to lower the bridge to get the pots on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos.<br/><br/>To use a bombchu, line up with the back wall and face the switch. Take out the chu then drop it after the first flash (like 1/2 a second)."
                    },
                    "Chest After Stalfos": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 31, y: 81, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room.</br></br>The goal in this room is to hit the switch to lower the bridge to get the chest on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos.<br/><br/>If using a bombchu, get against the wall opposite the switch, backflip x3 and drop it."
                    },
                    "Pot in Child Anubis Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 74, y: 47, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        LongDescription: "Enter the room after the Stalfos with the bridge. The pot is the one right in front of you - the others are empty."
                    },
                    "4 Pots in Child Anubis Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 84, y: 37, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Enter the room after the Stalfos with the bridge. The potsare in a line in front of you."
                    }
                }
            },
            childGrateRoom: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                Exits: {
                    childSkulltulaInGrateRoom: {
                        Map: "Spirit Temple",
                        RequiredChoiceOfItems: [Items.FAIRY_SLINGSHOT, Items.DEKU_STICK, ItemSets.FIRE_ITEMS, ItemSets.EXPLOSIVES]
                    }
                },
                ItemLocations: {
                    "4 Grate Room Silver Rupees on Grate": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Silver Rupees",
                        MapInfo: { x: 140, y: 90, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6.1,
                        LongDescription: "WALL MASTER WARNING:<br/>Make your way counter-clockwise around the child-only areas of the temple. In the room with the Anubis, either Din's fire him, or hit the switch then quickly navigate to the side directly opposite the fire so that it dies on it.<br/><br/>These rupees are on the grate itself, so climb up to get them."
                    },
                    "Grate Room Silver Rupee Near Torch": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 152, y: 67, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6.2,
                        LongDescription: "WALL MASTER WARNING:<br/>This rupee is in the corner of the child grate room, near the torch. See the previous location for how to get here.",
                    },
                    "Chest After Anubis Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 151, y: 75, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "WALL MASTER WARNING:<br/>Make your way counter-clockwise around the child-only areas of the temple. In the room with the Anubis, either Din's fire him, or hit the switch then quickly navigate to the side directly opposite the fire so that it dies on it. In the room after that - collect the silver rupees to lower the bridge. Now you can use a Deku Stick (or Din's fire) to light the torches on the other side to spawn the chest.<br/><br/>It's important to note that you can use Din's fire on them earlier, or take a flame from the earlier main room to light the torches. This avoids the need for the silver rupees (for this chest) completely.",
                        RequiredChoiceOfItems: [Items.DEKU_STICK, ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    }
                }
            },
            childSkulltulaInGrateRoom: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
                UseChildAge: function() { return !Settings.GlitchesToAllow.weirdShot; },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Grate Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 151, y: 90, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "WALL MASTER WARNING:<br/>After killing all the enemies in the first child-only room, enter the right room. There's a skulltula on the grate - kill it and collect it with your Boomerang. If you don't have one, navigate around the rooms counter-clockwise. Collect the silver rupees to lower the bridge. Kill it with bombs, a bombchu (it can slide along the pit at the bottom), Din's Fire, a stick jumpslash from the other side, or a slingshot. You can collect it from the opposite side if you climb just above it, press down + A to drop, then hold up."
                    }
                }
            },
            afterSecondCrawlSpace: {
                DisplayGroup: { groupName: "Child Rooms", imageName: "Kokiri Sword" },
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
                        LongDescription: "These small crates are after the second crawlspace in the child area. Adult can get to them as well if he unlocks the door from the room with the sun on the floor."
                    }
                }
            },
            roomWithSunOnFloor: {
                DisplayGroup: { groupName: "Sun on Floor Room", imageName: "Bombchu" },
                Exits: {
                    afterSecondCrawlSpace: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door After Second Crawl Space"
                    },
                    statueRoom: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
                    }
                },
                ItemLocations: {
                    "Pot in Sun on Floor Room Bottom": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 84, y: 78, floor: "F1" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door. As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door). The pot is on the bottom section by the climbable wall."
                    },
                    "Skulltula in Sun on Floor Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 35, y: 133, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door. As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door). The skulltula is on the wall leading down the climbable wall. You can hit it with a jumpslash, an explosive, Din's Fire, or a ranged weapon."
                    },
                    "Left Chest in Sun on Floor Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 63, y: 141, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
                        RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
                        RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
                    },
                    "Right Chest in Sun on Floor Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 51, y: 131, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
                        RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
                        RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
                    }
                }
            },
            beyondSilverBlock: {
                DisplayGroup: { groupName: "Rooms After Silver Block", imageName: "Adult Icon" },
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
                DisplayGroup: { groupName: "Rooms After Silver Block", imageName: "Adult Icon" },
                Exits: {
                    afterBoulderRoom: {
                        Map: "Spirit Temple",
                        SilverRupeeIndex: 2
                    }
                },
                ItemLocations: {
                    "Compass Chest in Sandy Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 226, y: 99, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the left. Kill the wolfos inside, then play Zelda's Lullaby. You can longshot from the platform, or hookshot from the sandy floor.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Boulder Silver Rupee in Midair": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 318, y: 135, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22.1,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right.<br/><br>This is the floating rupee at the start of the room. Use hover boots, or roll off the edge and do a delayed jumpslash to get it."
                    },
                    "Boulder Silver Rupee Front Left": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 299, y: 138, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22.2,
                        LongDescription: "This rupee is in the front left alcove of the boulder room."
                    },
                    "Boulder Silver Rupee Front Right": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 337, y: 128, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22.3,
                        LongDescription: "This rupee is in the front right alcove of the boulder room."
                    },
                    "Boulder Silver Rupee Back Right": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 337, y: 109, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22.4,
                        LongDescription: "This rupee is in the back right alcove of the boulder room."
                    },
                    "Boulder Silver Rupee Back Left": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 299, y: 106, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 22.5,
                        LongDescription: "This rupee is in the back left alcove of the boulder room."
                    },
                    "Skulltula in Boulder Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 296, y: 122, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 23,
                        LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right. On the left wall, there's a Song of Time block blocking this skulltula. Play the song to move it out of the way.",
                        RequiredSongs: [Songs.SONG_OF_TIME]
                    }
                }
            },
            afterBoulderRoom: {
                DisplayGroup: { groupName: "Rooms After Silver Block", imageName: "Adult Icon" },
                Exits: {},
                ItemLocations: {
                    "Chest After Boulder Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 319, y: 65, floor: "F1" },
                        Age: Age.ADULT,
                        Order: 24,
                        LongDescription: "Collect all the silver rupees in the boulder room. The floating one by the start is a bit tricky without hover boots. You can reach it if you roll off the edge, then do a delayed jumpslash to gain enough distance. Once you get all the rupees, enter the next room for the chest. Watch out for the like-like!"
                    }
                }
            },
            invisibleFloormasterRoom: {
                DisplayGroup: { groupName: "Rooms After Silver Block", imageName: "Adult Icon" },
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
                        LongDescription: "Enter the middle door after the silver block room. The pots from the right will fly at you, but watch out for the like like!"
                    },
                    "Left Chest in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 168, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 27,
                        LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the first sun."
                    },
                    "Right Chest in Invisible Floormaster Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 330, y: 184, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 28,
                        LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the second sun."
                    }
                }
            },
            statueRoom: {
                DisplayGroup: { groupName: "Statue Room", imageName: "Dungeon Map" },
                Exits: {
                    roomWithSunOnFloor: {},
                    sunBlockRoom: {},
                    adultAnubisRoom: {
                        Age: Age.ADULT,
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door in Statue Room"
                    }
                },
                ItemLocations: {
                    "3 Left Pots in Statue Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 112, y: 134, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 13.1,
                        LongDescription: "Head to the statue room. These pots are in a corner to the left of the statue, near the climbable wall."
                    },
                    "Left Flying Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 131, y: 118, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "Head to the statue room. The pot will fly at you if you go to the left of the statue."
                    },
                    "3 Right Pots in Statue Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 240, y: 134, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 14.1,
                        LongDescription: "Head to the statue room. These pots are in a corner to the right of the statue."
                    },
                    "Right Flying Pot in Statue Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 224, y: 118, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "Head to the statue room. The pot will fly at you if you go to the right of the statue."
                    },
                    "Map Chest in Statue Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 147, floor: "F2" },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "Head to the statue room. On the floor in front of the statue, light the torches with Din's Fire or Fire Arrows to spawn the chest. You can also run a lit deku stick down via the torch in the southwest corner of the room. Finally, you can push the armos statue to the lit torch on the top, backflip on it, and shoot an arrow through it to light the first torch (then go down and light the other).",
                        RequiredChoiceOfItems: [Items.DEKU_STICK, Items.FAIRY_BOW, ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    },
                    "Chest in Statue Room on Northeast Platform": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 254, y: 107, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 29,
                        LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. Now, head back up to the southeast corner. The platform to the right of the hand now has a chest on it. Use your hookshot or hover boots to get to it.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.spiritStatueRoomJumps ||
                                Data.canMegaFlip(age) ||
                                ItemData.canUseAny(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]);
                        }
                    },
                    "Chest on Statue's Hand": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 133, y: 130, floor: "F2" },
                        Age: Age.ADULT,
                        Order: 30,
                        LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. If you have the longshot, you can hook the chest that spawns from the other hand from here. If not, head to the upper southwest corner of the room - that's the one closer to the other hand. You can jump to it from there.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    "Skulltula in Statue Room on Northwest Platform": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 93, y: 101, floor: "F2" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        Order: 31,
                        LongDescription: "Head to the statue room. Get to the upper southwest corner of the room. Facing the statue, that would be behind you and to the left. The skulltula is on a platform to the left of the statue. You can Scarecrow's Song or hover boots to get to it.",
                        CustomRequirement: function(age) {
                            let canMegaFlip = Data.canMegaFlip(age);
                            if (age === Age.CHILD) {
                                return canMegaFlip;
                            }

                            return Settings.GlitchesToAllow.spiritStatueRoomJumps ||
                                canMegaFlip ||
                                ItemData.canUseAny(age, [Equipment.HOVER_BOOTS, UpgradedItems.LONGSHOT]) ||
                                Data.canHookScarecrow(age);
                        }
                    }
                }
            },
            sunBlockRoom: {
                DisplayGroup: { groupName: "Sun Block & Silver Gauntlets Path", imageName: "Strength Silver Gauntlets" },
                Exits: {
                    silverGauntsIronKnuckle: {
                        Map: "Spirit Temple",
                        LockedDoor: "Locked Door to Silver Gaunts Knuckle"
                    }
                },
                ItemLocations: {
                    "Sun Block Silver Rupee on Wall by Blocks": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 65, y: 79, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 16.1,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor.<br/><br/>This rupee is on the wall by the pushable blocks."
                    },
                    "Sun Block Silver Rupee Midair by Blocks": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 50, y: 74, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 16.2,
                        LongDescription: "This rupee is in midair by the pushable blocks."
                    },
                    "Sun Block Silver Rupee Midair by Sunlight": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 20, y: 65, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 16.3,
                        LongDescription: "This rupee is in the back right corner by the sunlight. Climb up the nearby platform, or use the blocks to get to it."
                    },
                    "Sun Block Silver Rupee by Entrance": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 80, y: 65, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 16.4,
                        LongDescription: "This rupee is just to the left of the entrance door. Use the pushable blocks or the platform by the sunlight to get up on the wall to grab it."
                    },
                    "Sun Block Silver Rupee by Beamos": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 71, y: 117, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 16.5,
                        LongDescription: "This rupee is in the left corner by one of the beamos. If you can't kill the beamos (and you're Child), you'll have to push a block over to get it. In this case, it's worth noting that deku nuts stun beamos!"
                    },
                    "Chest in Sun Block Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 60, y: 117, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. As child, you can collect the silver rupees to light the golden torch. After that, use a Deku Stick to light the other torches. You can also just use Din's Fire to light them - make sure to light two at once, then get close to the third one before casting it a second time. As adult, your only options are Din's Fire or Fire Arrows.",
                        CustomRequirement: function(age) {
                            let canUseFireItem = ItemData.canUse(age, ItemSets.FIRE_ITEMS);
                            let canUseStick = ItemData.canUse(age, Items.DEKU_STICK);
                            let canDoFlameStorage = Settings.GlitchesToAllow.flameStorage && canUseStick;
                            let canUseQPA = ItemData.canUse(age, QPAItemSets.LEDGE_QPA);
                            let canLightTorchesWithoutRupees = canDoFlameStorage || canUseFireItem || canUseQPA;
                            if (canLightTorchesWithoutRupees) {
                                return true;
                            }

                            let canTurnOnGoldenTorch = !Settings.RandomizerSettings.shuffleSilverRupees || ItemData.checkSilverRupeeRequirement("Spirit Temple", 1);
                            return canTurnOnGoldenTorch && canUseStick;
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
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. The pots are on the walls in the next room."
                    },
                    "Skulltula in Hall Before Silver Knuckle": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 32, y: 131, floor: "F3" },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Once inside the next room, turn around; the skulltula is above the door.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                } 
            },
            silverGauntsIronKnuckle: {
                DisplayGroup: { groupName: "Sun Block & Silver Gauntlets Path", imageName: "Strength Silver Gauntlets" },
                Exits: {
                    silverGauntsStatueHand: {}
                },
                ItemLocations: {}
            },
            silverGauntsStatueHand: {
                DisplayGroup: { groupName: "Sun Block & Silver Gauntlets Path", imageName: "Strength Silver Gauntlets" },
                Exits: {
                    mirrorShieldKnuckle: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.BOMB, Equipment.HOVER_BOOTS, ItemSets.SHIELDS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.spiritSuperslideToMirrorShield;
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
                        LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Continue on and you'll run into an Iron Knuckle. After defeating him, continue passed the door and onto the status outside the Spirit Temple. The chest is in front of you.<br/><br/>You can also get here as adult if you longshot from the mirror shield side."
                    }
                }
            },
            statueHands: {
                DisplayGroup: { groupName: "Sun Block & Silver Gauntlets Path", imageName: "Strength Silver Gauntlets" },
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
            adultAnubisRoom: {
                DisplayGroup: { groupName: "Anubis/Armos/Mirror Shield Path", imageName: "Mirror Shield" },
                Exits: {
                    fourArmosRoom: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
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
                        LongDescription: "Head to the door at the very top of the southeast corner of the statue room. That's the room behind you and to the right if you face the statue. The pot is on the pillar across from the beamos."
                    }
                }
            },
            fourArmosRoom: {
                DisplayGroup: { groupName: "Anubis/Armos/Mirror Shield Path", imageName: "Mirror Shield" },
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
                        LongDescription: "Head to the door at the very top of the southeast corner of the statue room. That's the room behind you and to the right if you face the statue. When you get to the relevant room, kill the Anubises and the beamos to proceed. If you don't have fire items, play the Song of Time by the barred door. Now, hit the switch and run around the room to lead the Anubises into the fire. Enter the now unbarred door into the room with the 4 armos statues. Enter the room to your left by reflecting the light into the sun with your Mirror Shield. The chest is inside.",
                        RequiredItems: [Equipment.MIRROR_SHIELD]
                    }
                }
            },
            mirrorShieldKnuckle: {
                DisplayGroup: { groupName: "Anubis/Armos/Mirror Shield Path", imageName: "Mirror Shield" },
                Exits: {
                    fourArmosRoom: {},
                    silverGauntsStatueHand: {
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    statueHands: {}
                },
                ItemLocations: {
                    "Left Chest Before Mirror Knuckle": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 329, y: 165, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 35,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
                    },
                    "Right Chest Before Mirror Knuckle": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 317, y: 165, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 36,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
                    },
                    "Mirror Shield Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 247, y: 226, floor: "F3" },
                        Age: Age.ADULT,
                        Order: 37,
                        LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. After this next room, kill the Iron Knuckle. Proceeding further, you'll reach the outside of the Spirit Temple. Walk a bit onto the hand to spawn the Mirror Shield chest."
                    }
                }
            },
            movingWallRoom: {
                DisplayGroup: { groupName: "Moving Wall & Boss Key Room", imageName: "Boss Key" },
                Exits: {
                    mirrorRoom: {}
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
                        LongDescription: "Head to the moving wall room. This is the room to your right if you enter the topmost southeast area of the statue room. It's also the room straight ahead if leaving the 4 armos room.<br/><br/>Head up the wall - longshot up there if you have it. Now turn around and use your hookshot/longshot to get to the platform in the back of the room with the room. You can also boomerang them.",
                        RequiredChoiceOfItems: [Items.HOOKSHOT, Items.BOOMERANG]
                    },
                    "Boss Key Chest After Moving Wall Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 294, y: 40, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 40,
                        LongDescription: "Head to the moving wall room. This is the room to your right if you enter the topmost southeast area of the statue room. It's also the room straight ahead if leaving the 4 armos room.<br/><br/>Head up the wall - longshot up there if you have it. In the next room, play Zelda's Lullaby to open the door in front of you. Bomb, hammer, or the fake door just to the left of the boss key chest. Shoot the eye switch to spawn some platforms (with good timing if yu didn't break it). Now, hookshot up there and hit the switch to put the fire out.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.spiritBKTrick ||
                                ItemData.canUseAll(age, [Items.FAIRY_BOW, Items.HOOKSHOT]);
                        }
                    }
                }
            },
            mirrorRoom: {
                DisplayGroup: { groupName: "Mirror Room & Boss Area", imageName: "Spirit Medallion" },
                Exits: {
                    bossRoom: {
                        RequiredItems: [Items.HOOKSHOT, ItemSets.EXPLOSIVES, Equipment.MIRROR_SHIELD],
                        CustomRequirement: function(age) {
                            return ItemData.hasBossKey("Spirit Temple");
                        }
                    }
                },
                ItemLocations: {
                    "2 Flying Pots in Upper Giant Mirror Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 171, y: 164, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 41,
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
                        LongDescription: "Enter the door to the left of the triforce symbol. The pots are on the bottom in the corners by the giant mirror - they will fly at you."
                    },
                    "Chest in Snake Mirror Maze": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 51, y: 150, floor: "F4" },
                        Age: Age.ADULT,
                        Order: 43,
                        LongDescription: "Enter to the door to the left of the triforce symbol. Jumpslash the switch blocked by the bars and enter the next room.<br/><br/>At the start of the snake mirror maze, shine a light on the sun up on the archway into the next room.",
                        RequiredItems: [Equipment.MIRROR_SHIELD]
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
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        _canDoTripleSlashClip: function(age) {
            return Settings.GlitchesToAllow.iceTripleSlashClips &&
                ItemData.canUseAny(age, [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD]) &&
                ItemData.canUse(age, ItemSets.FIRST_PERSON_ITEMS);
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Up to Scythe Room", imageName: "Blue Fire" },
                Exits: {
                    afterFreezards: {
                        RequiredItems: [ItemSets.FREEZARD_KILL_ITEMS]
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
                        LongDescription: "This rupee is frozen in the ice to the left of the exit of the first big room. You can either melt the ice, or target the wall to right of it and sidehop left to get it."
                    }
                }
            },
            afterFreezards: {
                DisplayGroup: { groupName: "Up to Scythe Room", imageName: "Blue Fire" },
                Exits: {
                    blueFireSideRoom: {
                        CustomRequirement: function(age) {
                            if (MapLocations["Ice Cavern"]._canDoTripleSlashClip(age)) {
                                return true;
                            }

                            if (Settings.GlitchesToAllow.iceLedgeClip && age === Age.ADULT) {
                                return true;
                            }

                            let isWallMelted = Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt East Ice Wall");
                            return isWallMelted || ItemData.canUse(age, ItemSets.BLUE_FIRE_ITEMS);
                        }
                    },
                    blueFire: {
                        RequiredItems: [ItemSets.BLUE_FIRE_ITEMS]
                    },
                    northRoom: {
                        CustomRequirement: function(age) {
                            return ItemData.checkSilverRupeeRequirement("Ice Cavern", 0) || 
                                MapLocations["Ice Cavern"]._canDoTripleSlashClip(age);
                        },
                        Age: Age.ADULT
                    },
                    blockPushRoom: {
                        CustomRequirement: function(age) {
                            let isWallMelted = Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt West Ice Wall");
                            return isWallMelted || 
                                ItemData.canUse(age, ItemSets.BLUE_FIRE_ITEMS) ||
                                MapLocations["Ice Cavern"]._canDoTripleSlashClip(age);
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
                        LongDescription: "These pots are in the transition hallway after you defeat the enemies in the first room."
                    },
                    "Skulltula in Scythe Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 161, y: 127 },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "In the room with the spinning scythe, there's a skulltula up on one of the walls. It's the one to your left when you first enter.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Scythe Silver Rupee by Icicles": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 167, y: 133 },
                        Age: Age.EITHER,
                        Order: 3.1,
                        LongDescription: "In the room with the spinning scythe, this rupee is behind the icicles on the wall with the skulltula.",
                        RequiredChoiceOfItems: [ItemSets.SWORDS, ItemSets.EXPLOSIVES]
                    },
                    "2 Pots in East Scythe Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 204, y: 121 },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "In the room with the spinning scythe, these pots are to your right (east)."
                    },
                    "Scythe Silver Rupee in Center Right": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 192, y: 116 },
                        Age: Age.EITHER,
                        Order: 4.1,
                        LongDescription: "This rupee is in the middle of the room, to the right of the center scythe."
                    },
                    "Scythe Silver Rupee in Center Left": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 174, y: 116 },
                        Age: Age.EITHER,
                        Order: 4.2,
                        LongDescription: "This rupee is in the middle of the room, to the left of the center scythe."
                    },
                    "Pot in North Scythe Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 194, y: 96 },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "In the room with the spinning scythe, this pot is on the north part of the room (straight ahead when you come in - it's the pot on the right)."
                    },
                    "Scythe Silver Rupee in Back": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 185, y: 100 },
                        Age: Age.EITHER,
                        Order: 5.1,
                        LongDescription: "This rupee is in the back of the spinning scythe room, between the pots."
                    },
                    "Flying Pot in North Scythe Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 176, y: 96 },
                        Age: Age.EITHER,
                        Order: 6,
                        LongDescription: "In the room with the spinning scythe, this pot will fly at you from the north part of the room (straight ahead when you come in - it's the pot on the left)."
                    },
                    "Scythe Silver Rupee in Midair": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 193, y: 102 },
                        Age: Age.ADULT,
                        Order: 6.1,
                        LongDescription: "This rupee is the one in midair in the back right part of the spinning scythe room. As adult, climb up the ledge and jump off to get it."
                    }
                }
            },
            blueFire: {
                DisplayGroup: { groupName: "Up to Scythe Room", imageName: "Blue Fire" },
                Exits: {
                    blueFireSideRoom: {},
                    blockPushRoom: {}
                },
                ItemLocations: {
                    "Melt East Ice Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return !ItemData.canUse(Age.CHILD, ItemSets.BLUE_FIRE_ITEMS); },
                        MapInfo: { x: 211, y: 114 },
                        MapImageName: "Blue Fire",
                        Age: Age.ADULT,
                        Order: 6.2,
                        LongDescription: "The east wall in the scythe room. Used to track whether child can get to this area if only adult can melt the wall with blue fire arrows."
                    },
                    "Melt West Ice Wall": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() { return !ItemData.canUse(Age.CHILD, ItemSets.BLUE_FIRE_ITEMS); },
                        MapInfo: { x: 157, y: 114 },
                        MapImageName: "Blue Fire",
                        Age: Age.ADULT,
                        Order: 6.3,
                        LongDescription: "The west wall in the scythe room. Used to track whether child can get to this area if only adult can melt the wall with blue fire arrows."
                    }
                }
            },
            blueFireSideRoom: {
                DisplayGroup: { groupName: "Red Ice Room", imageName: "Compass" },
                Exits: {
                    blueFire: {
                        CustomRequirement: function(age) {
                            return Data.hasBottle();
                        }
                    }
                },
                ItemLocations: {
                    "Compass Chest in Right Red Ice Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 246, y: 147 },
                        Age: Age.EITHER,
                        Order: 10,
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
                        LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. There's a skulltula up on one of the walls to your left.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            northRoom: {
                DisplayGroup: { groupName: "Platforming Room", imageName: "Dungeon Map" },
                Exits: {
                    blueFire: {
                        CustomRequirement: function(age) {
                            return Data.hasBottle();
                        }
                    },
                },
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
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "This pot is frozen in ice on the upper part of the room with the map chest. The easiest ways to get it are to either use blue fire, or crouchstab the pot in the ice. Otherwise, you can get on the edge of the platform, facing away from the pot, and do a spin attack to hit the pot."
                    }
                }
            },
            blockPushRoom: {
                DisplayGroup: { groupName: "Block Room", imageName: "Ice Arrow" },
                Exits: {
                    hallWayBeforeBoss: {
                        Map: "Ice Cavern",
                        SilverRupeeIndex: 1
                    }
                },
                ItemLocations: {
                    "Skulltula in Block Push Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 143, y: 111 },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "When you first enter the spinning scythe room, look to your left. Burn the red ice with your blue fire and enter the room. When you get to the big room, the skulltula will be on the wall to your left.",
                        CustomRequirement: function(age) {
                            if (ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS)) {
                                return true;
                            }

                            return Settings.GlitchesToAllow.iceBlockSkullWithHovers &&
                                ItemData.canUse(age, Equipment.HOVER_BOOTS) &&
                                ItemData.canUseAny(age, [ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE]);
                        }
                    },
                    "Block Silver Rupee in Center": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 116, y: 86 },
                        Age: Age.EITHER,
                        Order: 13.1,
                        LongDescription: "In the block room, this rupee is the one in front of you. Push the block forward and climb up to get it."
                    },
                    "Block Silver Rupee on Ledge": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 127, y: 67 },
                        Age: Age.EITHER,
                        Order: 13.2,
                        LongDescription: "Push the block forward, then right to the ledge. The rupee is in red ice - you can jumpslash at a specific angle to get it (or just melt the ice)."
                    },
                    "Block Silver Rupee by Skulltula": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 130, y: 110 },
                        Age: Age.EITHER,
                        Order: 13.3,
                        LongDescription: "This rupee is near the skulltula on the wall left of the entrance. Push the block left and up climb to this rupee."
                    },
                    "Block Silver Rupee Left of Blue Fire": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 103, y: 112 },
                        Age: Age.EITHER,
                        Order: 13.4,
                        LongDescription: "This rupee is the one to the left of the blue fire. Push the block left, and then forward. Now you can climb up to get this rupee."
                    },
                    "Block Silver Rupee Right of Blue Fire": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 98, y: 100 },
                        Age: Age.EITHER,
                        Order: 13.5,
                        LongDescription: "This rupee is the one to the right of the blue fire. No need to push the block for this one; you can simply climb up and get it."
                    },                    
                    "3 Red Rupees in Block Push Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Red Rupees",
                        MapInfo: { x: 97, y: 103 },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "When you first enter the spinning scythe room, look to your left. Burn the red ice with your blue fire and enter the room. The rupees are above the area with the blue fire. You can either use the boomerang to get them, or play the Song of Time on the platform with the blue fire to spawn some blocks.",
                        CustomRequirement: function(age) {
                            return Data.canPlaySong(Songs.SONG_OF_TIME) || ItemData.canUse(age, Items.BOOMERANG);
                        }
                    }
                }
            },
            hallWayBeforeBoss: {
                DisplayGroup: { groupName: "Final Hallway & Boss", imageName: "Iron Boots" },
                Exits: {
                    bossRoom: {
                        CustomRequirement: function(age) {
                            return Data.hasBottleOrBlueFire(age);
                        }
                    }
                },
                ItemLocations: {
                    "2 Pots Before Boss Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 111, y: 161 },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "After completing the block puzzle, these pots are frozen in the red ice before the boss room. You can spinslash to get them and hope RNG places the item by you."
                    }
                }
            },
            bossRoom: {
                DisplayGroup: { groupName: "Final Hallway & Boss", imageName: "Iron Boots" },
                Exits: {},
                ItemLocations: {
                    "Iron Boots Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 127, y: 182 },
                        Age: Age.EITHER,
                        Order: 16,
                        LongDescription: "This is in the room after the block pushing puzzle - the one with the wolfos. Defeat it to spawn the chest. Note that after you get the chest, you will also get the Serenade of Water item."
                    },
                    "Serenade of Water": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 122, y: 177 },
                        Age: Age.EITHER,
                        Order: 17,
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
                DisplayGroup: { groupName: "Main Area Loop", imageName: "Deku Nut" },
                Exits: {
                    mainArea: {
                        Age: Age.CHILD,
                        RequiredChoiceOfItems: [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT]
                    },
                    Exit: {
                        OwExit: OwExits["Bottom of the Well"]["Exit"]
                    }
                },
                ItemLocations: {
                    // Locked Doors
                    "Locked Door After Crawlspace": {
                        DisplayGroup: { groupName: "Main Area Loop", imageName: "Deku Nut" },
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
                        DisplayGroup: { groupName: "Central Area", imageName: "Compass" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["centralArea"],
                        MapInfo: { x: 160, y: 121, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 17,
                        LongDescription: "This is left locked door in the center of the main room.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    },
                    "Right Locked Door in Center": {
                        DisplayGroup: { groupName: "Central Area", imageName: "Compass" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["centralArea"],
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
                DisplayGroup: { groupName: "Main Area Loop", imageName: "Deku Nut" },
                Exits: {
                    centralArea: {},
                    bombableHoleRoom: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
                    },
                    coffinRoom: {},
                    pitRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Locked Door After Crawlspace"
                    },
                    deadhandRoom: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    basement: {}
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
                        Order: 3,
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
                    "Northwest Chest Under Rubble": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 93, y: 49, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 8,
                        LongDescription: "From the main room's entrance, follow the path to the left. Continue straight until you run into either the wall, or the giant skulltula. To the left you can see that there's some rubble in the back. DO NOT simply walk to it - there are pits. Hug the left side of the little alcove to get there safely. Bomb the rubble to get the chest.",
                        RequiredItems: [ItemSets.EXPLOSIVES]
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
                    "Underwater Chest in Front": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 185, y: 238, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 14,
                        LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. This chest is in the pit by the entrance, near the crawlspace to Dead Hand.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    }
                }
            },
            bombableHoleRoom: {
                DisplayGroup: { groupName: "Main Area Loop", imageName: "Deku Nut" },
                Exits: {},
                ItemLocations: {
                    "Chest in Front Bombable Hole": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 182, y: 192, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 2,
                        LongDescription: "Get to the main room. Bomb the rubble that's in front of you and slightly to the left to gain access to this chest."
                    }
                }
            },
            centralArea: {
                DisplayGroup: { groupName: "Central Area", imageName: "Compass" },
                Exits: {
                    leftLockedRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Left Locked Door in Center"
                    },
                    rightLockedRoom: {
                        Map: "Bottom of the Well",
                        LockedDoor: "Right Locked Door in Center"
                    }
                },
                ItemLocations: {
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
                    }
                }
            },
            leftLockedRoom: {
                DisplayGroup: { groupName: "Central Left Locked Room", imageName: "3 Pots" },
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
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            rightLockedRoom: {
                DisplayGroup: { groupName: "Central Right Locked Room", imageName: "Skulltula" },
                Exits: {},
                ItemLocations: {
                    "Skulltula in Right Locked Room": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 213, y: 80, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 21,
                        LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the right side. Hug the right wall, moving counter-clockwise, over the invisible floor to get to the skulltula.",
                        RequiredItems: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            coffinRoom: {
                DisplayGroup: { groupName: "Coffin Room", imageName: "2 Hearts" },
                Exits: {},
                ItemLocations: {
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
                        MapInfo: { x: 57, y: 144, floor: "F1" },
                        MapImageName: "Recovery Heart",
                        Age: Age.CHILD,
                        Order: 12,
                        LongDescription: "Head to the room to the left of the main room. The heart is in the bottom left coffin - light the torch to open it.",
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [Items.DEKU_STICK, ItemSets.FIRE_ITEMS]) ||
                                (ItemData.canUse(age, Items.BOOMERANG) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    },
                    "Key in Closed Coffin": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 29, y: 144, floor: "F1" },
                        Age: Age.CHILD,
                        Order: 13,
                        LongDescription: "Head to the room to the left of the main room. The heart is in the top left coffin - light the torch to open it.",
                        CustomRequirement: function(age) {
                            return ItemData.canUseAny(age, [Items.DEKU_STICK, ItemSets.FIRE_ITEMS]) ||
                                (ItemData.canUse(age, Items.BOOMERANG) && Settings.GlitchesToAllow.boomerangThroughWalls);
                        }
                    }
                }
            },
            pitRoom: {
                DisplayGroup: { groupName: "Pit & Like-Like Rooms", imageName: "Bomb" },
                Exits: {
                    deadhandRoom: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.botwActorGlitch;
                        }
                    },
                    mapChestArea: {
                        RequiredItems: [Equipment.STRENGTH]
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
                        CustomRequirement(age) {
                            // The staircase hover requires two additional bomb drops to gain enough height
                            // Start the hover against the wall
                            return ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS) || Data.canStaircaseHover(age);
                        }
                    }
                }
            },
            deadhandRoom: {
                DisplayGroup: { groupName: "Dead Hand Room", imageName: "Lens of Truth" },
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
                            return ItemData.canUse(age, ItemSets.SWORDS);
                        }
                    }
                }
            },
            basement: {
                DisplayGroup: { groupName: "Basement", imageName: "Dungeon Map" },
                Exits: {
                    mapChestArea: {
                        CustomRequirement: function(age) {
                            return ItemData.canUseAll(age, [Items.DEKU_STICK, Equipment.STRENGTH]) ||
                                ItemData.canUse(age, ItemSets.BLAST_OR_SMASH_ITEMS);
                        }
                    }
                },
                ItemLocations: {
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
                    "Silver Rupee on South Basement Wood Beam": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 176, y: 232, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 31,
                        LongDescription: "Fall down one of the many pits to get to the basement. This is the silver rupee on the wood beam more to the south, in the central area."
                    },
                    "Silver Rupee on North Basement Wood Beam": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 150, y: 201, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 32,
                        LongDescription: "Fall down one of the many pits to get to the basement. This is the silver rupee on the wood beam more to the north, in the central area."
                    },
                    "Silver Rupee by Baesment Ladder": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 114, y: 235, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 33,
                        LongDescription: "Fall down one of the many pits to get to the basement. This is the silver rupee by the bottom ladder."
                    },
                    "Silver Rupee up Basement Ladder": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 93, y: 235, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 34,
                        LongDescription: "Fall down one of the many pits to get to the basement. This is the silver rupee you get by climbing the bottom ladder."
                    },
                    "Silver Rupee up Both Basement Ladders": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 55, y: 247, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 35,
                        LongDescription: "Fall down one of the many pits to get to the basement. Climb both basement ladders; the rupee is to your left."
                    }
                }
            },
            mapChestArea: {
                DisplayGroup: { groupName: "Basement", imageName: "Dungeon Map" },
                Exits: {},
                ItemLocations: {
                    "Map Chest in Basement": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 302, y: 238, floor: "B1" },
                        Age: Age.CHILD,
                        Order: 30,
                        LongDescription: "Fall down one of the many pits to get to the basement. This chest is located behind the rocks that are farthest from the ladder. That is, if you face away from the ladder, it's the rightmost set of rocks.<br/><br/>You can use the bombchus from the rocks in the corridor to the left to get in. You drop down from the pit room with the beamos. If you can't get there, you can light a deku stick on fire and jumpslash between the rocks to light the bomb flower."
                    }
                }
            }
        }
    },

    "Training Grounds": {
        Abbreviation: "GTG",
        MapGroup: MapGroups.DUNGEONS,
        UseAdultAge: function() { 
            return !Settings.RandomizerSettings.shuffleDungeonEntrances && !Settings.GlitchesToAllow.gtgChildAllowed;
        },
        _canSkipMazeDoors: function(age) {
            return Data.canWeirdShot(age) ||  (
                Settings.GlitchesToAllow.gtgChildVineClips && 
                ItemData.canUseAll(age, [Equipment.DEKU_SHIELD, Items.BOMBCHU])
            );
        },
        _getNumberOfOptionalKeysUsed: function() {
            // Gets the number of optional keys used in GTG (these are the ones on the right maze path)
            let numberOfKeysUsed = 0;

            if (Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 1")) {
                numberOfKeysUsed++;
            }

            if (Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 2")) {
                numberOfKeysUsed++;
            }

            return numberOfKeysUsed;
        },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby", imageName: "Gerudo Membership Card" },
                Exits: {
                    sandyRoom: {},
                    dinalfosBeamosRoom: {},
                    mazeAfterOptionalDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 1",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    },
                    mazeAfterDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 1 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
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
                        LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
                        RequiredItems: [ItemSets.PROJECTILES]
                    },
                    "Entrance Room Right Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 233 },
                        Age: Age.EITHER,
                        Order: 2,
                        LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
                        RequiredItems: [ItemSets.PROJECTILES]
                    },
                     
                    // Locked Doors
                    "Locked Door 1 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 154, y: 174 },
                        Age: Age.EITHER,
                        Order: 18,
                        LongDescription: "This is door 1 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 3 };
                        }
                    },
                    "Locked Door 2 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor1"],
                        MapInfo: { x: 135, y: 184 },
                        Age: Age.EITHER,
                        Order: 20,
                        LongDescription: "This is door 2 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 2 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 4 };
                        }
                    },
                    "Locked Door 3 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor2"],
                        MapInfo: { x: 150, y: 160 },
                        Age: Age.EITHER,
                        Order: 22,
                        LongDescription: "This is door 3 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 3 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 5 };
                        }
                    },
                    "Locked Door 4 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor3"],
                        MapInfo: { x: 130, y: 139 },
                        Age: Age.EITHER,
                        Order: 23,
                        LongDescription: "This is door 4 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 4 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 6 };
                        }
                    },
                    "Locked Door 5 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor4"],
                        MapInfo: { x: 163, y: 145 },
                        Age: Age.EITHER,
                        Order: 25,
                        LongDescription: "This is door 5 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 5 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 7 };
                        }
                    },
                    "Locked Door 6 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor5"],
                        MapInfo: { x: 178, y: 140 },
                        Age: Age.EITHER,
                        Order: 27,
                        LongDescription: "This is door 6 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 6 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 8 };
                        }
                    },
                    "Locked Door 7 On Main Path": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterDoor6"],
                        MapInfo: { x: 173, y: 156 },
                        Age: Age.EITHER,
                        Order: 28,
                        LongDescription: "This is door 7 on the left path of the maze from the main entrance.",
                        KeyRequirement: function(age) {
                            let minValue = 7 + MapLocations["Training Grounds"]._getNumberOfOptionalKeysUsed();
                            return { min: minValue, max: 9 };
                        }
                    },
                    "Optional Locked Door 1": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["main"],
                        MapInfo: { x: 173, y: 174 },
                        Age: Age.EITHER,
                        Order: 30,
                        LongDescription: "This is the first door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 9 };
                        }
                    },
                    "Optional Locked Door 2": {
                        DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                        ItemGroup: ItemGroups.LOCKED_DOOR,
                        Regions: ["mazeAfterOptionalDoor1", "mazeDeadEnd"],
                        MapInfo: { x: 197, y: 180 },
                        Age: Age.EITHER,
                        Order: 31,
                        LongDescription: "This is the second door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
                        KeyRequirement: function(age) {
                            return { min: 1, max: 9 };
                        }
                    }
                }
            },
            dinalfosBeamosRoom: {
                DisplayGroup: { groupName: "Dinalfos/Beamos Room", imageName: "Bomb" },
                Exits: {
                    bigLavaRoomFront: {
                        RequiredItems: [ItemSets.EXPLOSIVES]
                    }
                },
                ItemLocations: {
                    "Chest in Dinalfos/Beamos Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 257, y: 244 },
                        Age: Age.EITHER,
                        Order: 17,
                        LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Bomb the beamos and kill the lizalfos to spawn this chest.",
                        RequiredItems: [ItemSets.EXPLOSIVES]
                    },
                    "2 Hearts in Dinalfos/Beamos Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Hearts",
                        MapInfo: { x: 273, y: 262 },
                        Age: Age.EITHER,
                        Order: 17.1,
                        LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Climb the platform from one of the skinny sides to gain access to these hearts.",
                    },
                    "Wonderitem in Dinalfos/Beamos Room": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 257, y: 221 },
                        Age: Age.ADULT,
                        Order: 17.2,
                        LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Shoot the symbol above the room leading to the big lava room with your bow to spawn this wonderitem.",
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                }
            },
            sandyRoom: {
                DisplayGroup: { groupName: "Sandy & Boulder Rooms", imageName: "Silver Rupees" },
                Exits: {
                    boulderRoom: {
                        RequiredItems: [ItemSets.SWORDS]
                    }
                },
                ItemLocations: {
                    "Stalfos Chest in Sandy Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 64, y: 225 },
                        Age: Age.EITHER,
                        Order: 3,
                        LongDescription: "This is the room to the left of the entrance. I recommend going this way, first, as it only requires the hookshot to make it most of the way around the dungeon. Anyway, kill the stalfos in here within the time limit to get this chest.",
                        RequiredItems: [ItemSets.SWORDS]
                    }
                }
            },
            boulderRoom: {
                DisplayGroup: { groupName: "Sandy & Boulder Rooms", imageName: "Silver Rupees" },
                Exits: {
                    silverBlockRoom: {
                        Map: "Training Grounds",
                        SilverRupeeIndex: 0,
                        CustomRequirement(age) {
                            return Settings.GlitchesToAllow.gtgSlopesRoomFireWallSkip || ItemData.canUse(age, Items.HOOKSHOT);
                        }
                    }
                },
                ItemLocations: {
                    "Boulder Silver Rupee on Ceiling": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 74, y: 196 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.gtgSlopesRoomWallmasterToRupee; },
                        Order: 3.1,
                        LongDescription: "After the sandy stalfos room, you'll find this room. The rupee is on the ceiling a little ahead of the entrance. Use your hookshot to reach it.<br/><br/>If you have no hookshot, you can trigger the wallmaster then have it take you upward into it.",
                        CustomRequirement: function(age) {
                            let canUseWallmaster = Settings.GlitchesToAllow.gtgSlopesRoomWallmasterToRupee &&
                                !ItemData.checkSilverRupeeRequirement("Training Grounds", 0);
                            return canUseWallmaster || ItemData.canUse(age, Items.HOOKSHOT);
                        }
                    },
                    "Boulder Silver Rupee in Left Area by Void": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 53, y: 198 },
                        Age: Age.EITHER,
                        Order: 3.2,
                        LongDescription: "This rupee is to the left of the entrance, by the void the boulders move toward.",
                    },
                    "Boulder Silver Rupee in Back Left Area": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 56, y: 128 },
                        Age: Age.EITHER,
                        Order: 3.3,
                        LongDescription: "This rupee is in the very back of the left hallway, by where the boulders spawn.",
                    },
                    "Boulder Silver Rupee in Midair": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 72, y: 157 },
                        Age: Age.EITHER,
                        Order: 3.4,
                        LongDescription: "This rupee is the one in front of the entrance, in midair. If you have no hookshot, go around via the second right turn from the entrance, then make two lefts. You can now jump off the cliff to claim the rupee.",
                    },
                    "Boulder Silver Rupee in Right Area": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 87, y: 194 },
                        Age: Age.EITHER,
                        Order: 3.5,
                        LongDescription: "This rupee is to the right of the entrance, behind a fire wall. If you have no hookshot, you can go around via the second right turn from the entrance.",
                    }
                }
            },
            silverBlockRoom: {
                DisplayGroup: { groupName: "Silver Block Rooms", imageName: "Strength Silver Gauntlets" },
                UseAdultAge: function() { 
                    return !Settings.GlitchesToAllow.gtgChildVineClips && !Settings.GlitchesToAllow.gtgSlopesRoomFireWallSkip; 
                },
                Exits: {
                    boulderRoom: {},
                    roomBehindSilverBlock: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, UpgradedItems.SILVER_GAUNTLETS) || (
                                Settings.GlitchesToAllow.gtgSilverBlockSkipWithHammerSuperslide &&
                                Data.canHammerHoverBootsSuperslide(age)
                            );
                        }
                    },
                    eyeStatueRoomTop: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return ItemData.canUse(age, Items.HOOKSHOT) ||
                                (Settings.GlitchesToAllow.gtgSilverBlockRoomExitWithHovers && ItemData.canUse(age, Equipment.HOVER_BOOTS));
                        }
                    }
                },
                ItemLocations: {
                    "Wolfos Chest in Room by Silver Block": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 90, y: 83 },
                        Age: Age.EITHER,
                        Order: 4,
                        LongDescription: "This is the room either after the stalfos sandy room, or after the silver rupee room with the fire walls. Kill all the wolfos to spawn a chest."
                    }
                }
            },
            roomBehindSilverBlock: {
                DisplayGroup: { groupName: "Silver Block Rooms", imageName: "Strength Silver Gauntlets" },
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
            eyeStatueRoomTop: {
                DisplayGroup: { groupName: "Eye Statue Room", imageName: "Fairy Bow" },
                UseAdultAge: function() { return !Settings.GlitchesToAllow.gtgChildVineClips; },
                Exits: {
                    silverBlockRoom: {},
                    eyeStatueRoomBottom: {}
                },
                ItemLocations: {
                    "Wonderitem on Eye Statue": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapInfo: { x: 163, y: 91 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        Order: 8.9,
                        LongDescription: "This is the room after the wolfos room. Use hover boots to navigate to the top of the center statue to get this wonderitem.",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || (age === Age.ADULT && 
                                (
                                    Settings.GlitchesToAllow.gtgEyeStatueWonderItemJumpslash || 
                                    ItemData.canUse(age, Equipment.HOVER_BOOTS)
                                )
                            );
                        }
                    },
                    "Eye Statue Room Top Room Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 165, y: 133 },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "From the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to unlock a door on top. Jump in the lava to respawn on top to get to it (or spawn the scarecrow by the other door <strong>before you fall</strong> and use it to get back up).",
                        RequiredAdultItems: [Items.FAIRY_BOW]
                    }
                }
            },
            eyeStatueRoomBottom: {
                DisplayGroup: { groupName: "Eye Statue Room", imageName: "Fairy Bow" },
                Exits: {
                    // eyeStatueRoomTop cannot be accessed with scarecrow - it won't spawn from below!
                    bigLavaRoomUpperBack: {}
                },
                ItemLocations: {
                    "Eye Statue Room Bottom Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 170, y: 91 },
                        Age: Age.ADULT,
                        Order: 9,
                        LongDescription: "From the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to spawn the chest.",
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                }
            },
            hammerPillarRoom: {
                DisplayGroup: { groupName: "Hammer Pillar Room", imageName: "Megaton Hammer" },
                Exits: {
                    eyeStatueRoomBottom: {
                        RequiredItems: [Items.MEGATON_HAMMER, ItemSets.PROJECTILES]
                    },
                    bigLavaRoomUpperBack: {}
                },
                ItemLocations: {
                    "Chest in Room with Pillars": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 256, y: 75 },
                        Age: Age.EITHER,
                        Order: 11,
                        LongDescription: "This is either after the eye statue room, or after the big lava room. This is the chest that spawns after you kill all the enemies."
                    },
                    "Flaming Chest in Room with Pillars": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 254, y: 90 },
                        Age: Age.EITHER,
                        Order: 12,
                        LongDescription: "This is either after the eye statue room, or after the big lava room. Use your hammer on the pillars until you find a floor switch. Step on it to remove the flames from the chest. Be sure to get it before they come back!<br/><br/>If you have no hammer, line up with the front of the chest and walk into the fire and keep holding up. Open the chest when you reach it before the fire wears off."
                    },
                    "Wonderitem in Room with Pillars": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 255, y: 109 },
                        Age: Age.ADULT,
                        Order: 12.1,
                        LongDescription: "In the room with the hammerable pillars, shoot the symbol above the door leading to the big lava room with your bow to spawn this wonderitem.",
                        RequiredItems: [Items.FAIRY_BOW]
                    }
                }
            },
            bigLavaRoomFront: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    mazeDeadEnd: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    bigLavaRoomBack: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Data.canPlaySong(Songs.SONG_OF_TIME) ||
                                Equipment.HOVER_BOOTS.playerHas || 
                                Data.canMegaFlip(age);
                        }
                    },
                    bigLavaRoomUpperBack: {
                        Age: Age.ADULT,
                        RequiredItems: [UpgradedItems.LONGSHOT]
                    },
                    waterRoom: {
                        Map: "Training Grounds",
                        SilverRupeeIndex: 1,
                        CustomRequirement: function(age) {
                            // This is specifically for this setting, the normal exit is from bigLavaRoomUpperBack
                            return Settings.RandomizerSettings.shuffleSilverRupees;
                        }
                    }
                },
                ItemLocations: {
                    "Lava Silver Rupee in Front Center": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 247, y: 180 },
                        Age: Age.EITHER,
                        Order: 15.1,
                        LongDescription: "This rupee is the one on the platform in front of you, when entering from the aromos room."
                    },
                    "Lava Silver Rupee in Front Right": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 261, y: 171 },
                        Age: Age.EITHER,
                        Order: 15.2,
                        LongDescription: "This rupee is the one on the platform to your right when entering from the aromos room."
                    },
                    "Lava Silver Rupee in Fire Circle": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 236, y: 145 },
                        Age: Age.EITHER,
                        Order: 15.4,
                        LongDescription: "This is the rupee in the fire circle. The switch is in the front part of the room. You can play the Song of Time (or just be Child) near it to spawn some blocks to make this easier to get. Otherwise, quickly navigate using your hover boots to get to this before the fire comes back. Note that a megaflip can get the rupee without hitting the switch!",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Data.canPlaySong(Songs.SONG_OF_TIME) ||
                                Equipment.HOVER_BOOTS.playerHas || 
                                Data.canMegaFlip(age);
                        }
                    }
                }
            },
            bigLavaRoomBack: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    bigLavaRoomFront: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Data.canPlaySong(Songs.SONG_OF_TIME) ||
                                Equipment.HOVER_BOOTS.playerHas || 
                                Data.canMegaFlip(age);
                        }
                    },
                    bigLavaRoomUpperBack: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT]
                    }
                },
                ItemLocations: {
                    "Lava Silver Rupee in Back Right": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 262, y: 144 },
                        Age: Age.EITHER,
                        Order: 15.3,
                        LongDescription: "This rupee is on the back right platform. Use your hover boots, longhsot the upper torch, or go around the dungeon and enter from the upper door to get this rupee."
                    }
                }
            },  
            bigLavaRoomUpperBack: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {
                    hammerPillarRoom: {},
                    bigLavaRoomBack: {},
                    waterRoom: {
                        Map: "Training Grounds",
                        SilverRupeeIndex: 1,
                        CustomRequirement: function(age) {
                            if (Settings.RandomizerSettings.shuffleSilverRupees) { return true; }

                            let canGetFireRupee = Data.canPlaySong(Songs.SONG_OF_TIME) || Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
                            return Items.HOOKSHOT.playerHas && canGetFireRupee; // Hookshot is get the rupee on top, then to hook the torch to get to the front part
                        }
                    }
                },
                ItemLocations: {
                    "Lava Silver Rupee on Upper Ledge": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 255, y: 124 },
                        Age: Age.ADULT,
                        Order: 15.5,
                        LongDescription: "This rupee is on the back back platform. Either hookshot here, go get here from going around the dungeon. Use your hookshot to drop down onto the rupee.",
                        RequiredItems: [Items.HOOKSHOT]
                    }
                }
            },
            waterRoom: {
                DisplayGroup: { groupName: "Lava & Water Rooms", imageName: "Din's Fire" },
                Exits: {},
                ItemLocations: {
                    "Topmost Water Room Silver Rupee": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 306, y: 165 },
                        Age: Age.EITHER,
                        Order: 15.6,
                        LongDescription: "Navigate to the water room. See the Lava Room Key on Platform for an explanation on how to get there. First, collect all the silver rupees in the room. Most are straightfoward - you'll need your hover boots to get across some of the platforms. To get the one engulfed in flames, you must first hit the switch next to the raised platform. You can play the Song of Time there to spawn some helpful blocks as well. After you collect all the rupees, enter the door that opens up.<br/><br/>Once inside, play the Song of Time to remove the blocks. Use your iron boots to sink down and collect the rupees. The golden scale can be used to collect this top one - just dive down and let yourself get pushed along the walls.",
                        RequiredChoiceOfItems: [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS],
                        RequiredSongs: [Songs.SONG_OF_TIME], // Seems these blocks ARE there as child
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    "4 Silver Rupees in Water Room": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.SILVER_RUPEE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Silver Rupees",
                        MapInfo: { x: 306, y: 169 },
                        Age: Age.ADULT,
                        Order: 15.7,
                        LongDescription: "Navigate to the water room. See the Lava Room Key on Platform for an explanation on how to get there. First, collect all the silver rupees in the room. Most are straightfoward - you'll need your hover boots to get across some of the platforms. To get the one engulfed in flames, you must first hit the switch next to the raised platform. You can play the Song of Time there to spawn some helpful blocks as well. After you collect all the rupees, enter the door that opens up.<br/><br/>Once inside, play the Song of Time to remove the blocks. Use your iron boots to sink down and collect the rupees.",
                        RequiredSongs: [Songs.SONG_OF_TIME],
                        RequiredItems: [Equipment.IRON_BOOTS],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                        }
                    },
                    "Chest in Water Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 297, y: 160 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees; },
                        Order: 16,
                        LongDescription: "Navigate to the water room. See the Lava Room Key on Platform for an explanation on how to get there. First, collect all the silver rupees in the room. Most are straightfoward - you'll need your hover boots to get across some of the platforms. To get the one engulfed in flames, you must first hit the switch next to the raised platform. You can play the Song of Time there to spawn some helpful blocks as well. After you collect all the rupees, enter the door that opens up.<br/><br/>Once inside, play the Song of Time to remove the blocks. Use your iron boots to sink down and collect all the rupees. The hookshot helps a lot here, but technically isn't required. Once you're done, rise back up and collect the chest.",
                        SilverRupeeIndex: 2,
                        CustomRequirement: function(age) {
                            if (Settings.RandomizerSettings.shuffleSilverRupees) { return true; }

                            let canSinkIntoWater = Equipment.IRON_BOOTS.playerHas && Data.canPlaySong(Songs.SONG_OF_TIME);
                            let tunicCheck = Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
                            return canSinkIntoWater && tunicCheck;
                        }
                    }
                }
            },
            mazeDeadEnd: {
                DisplayGroup: { groupName: "Maze Dead End", imageName: "Song of Time" },
                Exits: {
                    mazeAfterOptionalDoor1: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 2"
                    },
                    bigLavaRoomFront: {}
                },
                ItemLocations: {
                    "Lava Room Key on Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 230, y: 164 },
                        Age: Age.EITHER,
                        Order: 13,
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right, then take a right to get to the platform with the key. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform with the freestanding key.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the hookshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up."
                    },
                    "Maze Chest Close to Lava Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 179, y: 165 },
                        Age: Age.EITHER,
                        Order: 14,
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the first chest you see. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you go straight from here, you'll reach the chest.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. The chest is straight ahead."
                    },
                    "Maze Chest at Dead End by Lava Room": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 187, y: 154 },
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the second chest you see, at the maze's dead end. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you take the righthand path through the maze, you'll hit the chest at the dead end.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. If you take the righthand path through the maze, you'll hit the chest at the dead end."
                    }
                }
            },
            mazeAfterOptionalDoor1: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeDeadEnd: {
                        Map: "Training Grounds",
                        LockedDoor: "Optional Locked Door 2",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            mazeAfterDoor1: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    eyeStatueRoomTop: {
                        Age: Age.CHILD,
                        RequiredItems: [Items.BOMBCHU, Equipment.DEKU_SHIELD],
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.gtgChildVineClips;
                        }
                    },
                    mazeAfterDoor2: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 2 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {
                    "Left Maze Path After Door 1": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 152, y: 192 },
                        Age: Age.EITHER,
                        Order: 19,
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go through the first door to the left. Climb the wall to the right of the door you came in to get to the chest after the fake ceiling."
                    }
                }
            },
            mazeAfterDoor2: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeAfterDoor3: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 3 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {
                    "Left Maze Path After Door 2": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 130, y: 163 },
                        Age: Age.EITHER,
                        Order: 21,
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 2 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor3: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeAfterDoor4: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 4 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            mazeAfterDoor4: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeAfterDoor5: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 5 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {
                    "Left Maze Path After Door 4": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 136 },
                        Age: Age.EITHER,
                        Order: 24,
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 4 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor5: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeAfterDoor6: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 6 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {
                    "Left Maze Path After Door 5": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 148, y: 137 },
                        Age: Age.EITHER,
                        Order: 26,
                        LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 5 doors. The chest is in this room."
                    }
                }
            },
            mazeAfterDoor6: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {
                    mazeAfterDoor7: {
                        Map: "Training Grounds",
                        LockedDoor: "Locked Door 7 On Main Path",
                        SkipLockedDoor: function(age) {
                            return MapLocations["Training Grounds"]._canSkipMazeDoors(age);
                        }
                    }
                },
                ItemLocations: {}
            },
            mazeAfterDoor7: {
                DisplayGroup: { groupName: "Maze", imageName: "Ice Arrow" },
                Exits: {},
                ItemLocations: {
                    "Center Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 164, y: 159 },
                        Age: Age.EITHER,
                        Order: 29,
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
        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
        Regions: {
            main: {
                DisplayGroup: { groupName: "Lobby/Hub", imageName: "4 Scrubs" },
                Exits: {
                    forestTrialRoom1: {},
                    fireTrialRoom1: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.ganonFireNoTunic || 
                                ItemData.canUse(age, Equipment.GORON_TUNIC);
                        }
                    },
                    waterTrialRoom1: {},
                    shadowTrialStart: {},
                    spiritTrialRoom1: {},
                    lightTrialRoom1: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let canSuperslideIn = Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip && 
                                ItemData.canUseAll(age, [Items.BOMB, ItemSets.SHIELDS]);
                            let canEssClipIn = Settings.GlitchesToAllow.ganonLightTrailEssSkip && 
                                ItemData.canUse(age, ItemSets.EXPLOSIVES);
                            return canSuperslideIn || canEssClipIn || ItemData.canUse(age, UpgradedItems.GOLDEN_GAUNTLETS);
                        }
                    },
                    center: {
                        CustomRequirement: function(age) {
                            if ((age === Age.ADULT && Settings.GlitchesToAllow.ganonTrialSkip) || Data.canStaircaseHover(age)) {
                                return true;
                            }

                            return Data.itemLocationObtained("Ganon's Castle", "forestTrialEnd", "Forest Trial Complete") &&
                                Data.itemLocationObtained("Ganon's Castle", "waterTrialEnd", "Water Trial Complete") &&
                                Data.itemLocationObtained("Ganon's Castle", "shadowTrialEnd", "Shadow Trial Complete") &&
                                Data.itemLocationObtained("Ganon's Castle", "fireTrialEnd", "Fire Trial Complete") &&
                                Data.itemLocationObtained("Ganon's Castle", "lightTrialEnd", "Light Trial Complete") &&
                                Data.itemLocationObtained("Ganon's Castle", "spiritTrialEnd", "Spirit Trial Complete");
                        }
                    },
                    Exit: {
                        OwExit: OwExits["Ganon's Castle"]["Exit"]
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
                        Order: 1,
                        LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
                    }
                }
            },
            forestTrialRoom1: {
                DisplayGroup: { groupName: "Forest Trial", imageName: "Forest Medallion" },
                Exits: {
                    forestTrailWindRoom: {
                        Age: Age.ADULT,
                        RequiredItems: [ItemSets.FIRE_ITEMS],
                        RequiredChoiceOfItems: [Items.FAIRY_BOW, Items.HOOKSHOT]
                    }
                },
                ItemLocations: {
                    "Forest Trial Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 233, floor: "FST" },
                        Age: Age.EITHER,
                        Order: 5,
                        LongDescription: "Enter the forest trial. Kill the wolfos to spawn the chest.",
                        RequiredItems: [ItemSets.DAMAGING_ITEMS]
                    }
                }
            },
            forestTrailWindRoom: {
                DisplayGroup: { groupName: "Forest Trial", imageName: "Forest Medallion" },
                Exits: {
                    forestTrialEnd: {
                        Map: "Ganon's Castle",
                        SilverRupeeIndex: 3
                    }
                },
                ItemLocations: {
                    "Forest Silver Rupee Left of Entrance": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 159, y: 170, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 5.1,
                        LongDescription: "Enter the forest trial - you must first light all the torches in the room. If you have no bow, you can use Din's Fire if you light the top torch by first hooshotting to it.</br></br>This rupee is to your left as you enter. If you jump when the fans are going you'll be pushed to the next platform and can continue on."
                    },
                    "Forest Silver Rupee on Right Platform": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 198, y: 147, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 5.2,
                        LongDescription: "In the wind room, wait for the fans to blow then jump to your left. You can now make your way across the beamos platform to get to this rupee."
                    },
                    "Forest Silver Rupee in Front of Exit": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 176, y: 113, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 5.3,
                        LongDescription: "In the wind room, wait for the fans to blow then jump to your left. You can now make your way across the beamos platform to get to this rupee."
                    },
                    "Forest Silver Rupee Right of Exit": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 196, y: 101, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 5.4,
                        LongDescription: "In the wind room, wait for the fans to blow then jump to your left. Make your way across the beamos platform to the door. The rupee is to the right, but watch out for the fan."
                    },
                    "Forest Silver Rupee on Hookshot Target": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 146, y: 151, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 5.5,
                        LongDescription: "In the wind room, wait for the fans to blow then jump to your left. Make your way across the beamos platform to the door. To the left of a door, there's a switch. Time yourself when the fan is off to hit the switch. This will spawn a hookshot target that you can climb onto to get the rupee."
                    }
                }
            },
            forestTrialEnd: {
                DisplayGroup: { groupName: "Forest Trial", imageName: "Forest Medallion" },
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
                    },
                    "Forest Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Forest Medallion",
                        MapInfo: { x: 20, y: 20, floor: "FST" },
                        Age: Age.ADULT,
                        Order: 6.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
                    }
                }
            },
            waterTrialRoom1: {
                DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
                Exits: {
                    waterTrialRoom2: {
                        RequiredItems: [ItemSets.BLUE_FIRE_ITEMS, ItemSets.FREEZARD_KILL_ITEMS]
                    }
                },
                ItemLocations: {
                    "Water Trial Left Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 175, y: 215, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 7,
                        LongDescription: "Enter the water trial. Look for the chest in the back left section of the room."
                    },
                    "Water Trial Right Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 213, y: 215, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 8,
                        LongDescription: "Enter the water trial. Look for the chest in the back right section of the room."
                    }
                }
            },
            waterTrialRoom2: {
                DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
                Exits: {
                    waterTrialEnd: {
                        Age: Age.ADULT,
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                },
                ItemLocations: {
                    "Water Trial Pot in Ice Push Room": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 223, y: 117, floor: "WTR" },
                        Age: Age.EITHER,
                        Order: 8.1,
                        LongDescription: "Enter the water trial - kill the freezards to unbar the door, then use blue fire to melt the ice to gain access. The pot is on the right side of the room, behind a rock."
                    }
                }
            },
            waterTrialEnd: {
                DisplayGroup: { groupName: "Water Trial", imageName: "Water Medallion" },
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
                    },
                    "Water Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Water Medallion",
                        MapInfo: { x: 20, y: 20, floor: "WTR" },
                        Age: Age.ADULT,
                        Order: 9.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
                    }
                }
            },
            shadowTrialStart: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
                Exits: {
                    shadowTrialMiddle: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let canGetThereNormally = ItemData.canUse(age, Items.FIRE_ARROW);
                            let canAvoidFireArrows = ItemData.canUseAll(age, [UpgradedItems.LONGSHOT, Equipment.HOVER_BOOTS]);
                            return canGetThereNormally || canAvoidFireArrows;
                        }
                    }
                },
                ItemLocations: {
                    "Shadow Trial Close Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 146, y: 226, floor: "SHW" },
                        Age: Age.EITHER,
                        Order: 10,
                        LongDescription: "Enter the shadow trial. The chest is in front of you and a bit to the left on a little island. You can hookshot to it, hover boots to it (you'll need to roll mid-air to get the distance), shoot a fire arrow at a torch to spawn platforms, or play the Song of Time to get a platform you can jump to (Child has this by default).",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return ItemData.canUseAny(age, [Items.FIRE_ARROW, Equipment.HOVER_BOOTS, Items.HOOKSHOT]) ||
                                Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    }
                }
            },
            shadowTrialMiddle: {
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
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
                DisplayGroup: { groupName: "Shadow Trial", imageName: "Shadow Medallion" },
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
                        LongDescription: "After the like-like platform - navigate to the rusted switch after the invisible bridge. Hit it to unbar the door."
                    },
                    "Shadow Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Shadow Medallion",
                        MapInfo: { x: 20, y: 20, floor: "SHW" },
                        Age: Age.ADULT,
                        Order: 14.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
                    }
                }
            },
            fireTrialRoom1: {
                DisplayGroup: { groupName: "Fire Trial", imageName: "Fire Medallion" },
                UseAdultAge: function() {
                    return !Settings.GlitchesToAllow.ganonFireNoTunic;
                },
                Exits: {
                    fireTrialEnd: {
                        Map: "Ganon's Castle",
                        Age: Age.ADULT,
                        SilverRupeeIndex: 2,
                        RequiredItems: [UpgradedItems.LONGSHOT],
                        CustomRequirement: function(age) {
                            return Settings.RandomizerSettings.shuffleSilverRupees || 
                                ItemData.canUse(age, UpgradedItems.GOLDEN_GAUNTLETS);
                        }
                    }
                },
                ItemLocations: {
                    "Fire Silver Rupee on Block by Entrance": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 206, y: 218, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 14.1,
                        LongDescription: "Enter the fire trial. The rupee is to the right on the block in the lava."
                    },
                    "Fire Silver Rupee by Flamethrower": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 128, y: 203, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 14.2,
                        LongDescription: "This rupee is on the left side of the platform with the spinning fire."
                    },
                    "Heart in Fire Trial": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 155, y: 156, floor: "FIR" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        Order: 15,
                        LongDescription: "Enter the fire trial. The heart is on a sinking platform near where the golden gauntlets pillar starts."
                    },
                    "Fire Silver Rupee Under Silver Pillar": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 118, y: 173, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 15.1,
                        LongDescription: "Navigate to the back part of the fire trial. Lift the giant siler pillar to find the rupee underneath.",
                        RequiredItems: [UpgradedItems.GOLDEN_GAUNTLETS]
                    },
                    "Fire Silver Rupee on Torch Slug Island": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 224, y: 156, floor: "FIR" },
                        Age: Age.EITHER,
                        Order: 15.2,
                        LongDescription: "This rupee is on the island with the torch slug in the back right part of the room. If you have no hover boots, you'll have to jump across the lava while navigating the giant sinking platform or it will sink in!"
                    },
                    "Fire Silver Rupee on Block by Thrown Pillar": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 218, y: 192, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 15.3,
                        LongDescription: "After throwing the giant silver pillar, make your way to the island with the torch slug. Use the thrown pillar (now in the lava) to get to the rupee on the sinking platform.",
                        RequiredItems: [UpgradedItems.GOLDEN_GAUNTLETS]
                    }
                }
            },
            fireTrialEnd: {
                DisplayGroup: { groupName: "Fire Trial", imageName: "Fire Medallion" },
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
                    },
                    "Fire Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Fire Medallion",
                        MapInfo: { x: 20, y: 20, floor: "FIR" },
                        Age: Age.ADULT,
                        Order: 16.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
                    }
                }
            },
            lightTrialRoom1: {
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                Exits: {
                    lightTrialRoom2: {
                        CustomRequirement: function(age) {
                            return ItemData.getKeyCount("Ganon's Castle") >= 1;
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
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                Exits: {
                    lightTrialRoom3: {
                        CustomRequirement: function(age) {
                            return ItemData.getKeyCount("Ganon's Castle") >= 2;
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
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
                Exits: {
                    lightTrialEnd: {
                        Map: "Ganon's Castle",
                        SilverRupeeIndex: 1,
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.RandomizerSettings.shuffleSilverRupees ||
                                (Items.HOOKSHOT.playerHas || Data.canGroundJumpWithBomb(age));
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
                    },
                    "Light Silver Rupee on Ledge": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 180, y: 127, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25.1,
                        LongDescription: "This rupee is up on the ledge in the center of the room. Use your hooshot, or perform a ground jump to get it.",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.playerHas || Data.canGroundJumpWithBomb(age);
                        }
                    },
                    "Light Silver Rupee in Left Outer Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 147, y: 131, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25.2,
                        LongDescription: "This rupee is on the left side of the room, in an alcove along the outer wall."
                    },
                    "Light Silver Rupee in Left Inner Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 173, y: 126, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25.3,
                        LongDescription: "This rupee is on the left side of the room, in an alcove along the center wall."
                    },
                    "Light Silver Rupee in Right Inner Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 187, y: 126, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25.4,
                        LongDescription: "This rupee is on the right side of the room, in an alcover along the center wall."
                    },
                    "Light Silver Rupee in Right Outer Alcove": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 212, y: 131, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 25.5,
                        LongDescription: "This rupee is on the right side of th eroom, in an alcove along the outer wall."
                    }
                }
            },
            lightTrialEnd: {
                DisplayGroup: { groupName: "Light Trial", imageName: "Light Medallion" },
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
                    },
                    "Light Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Light Medallion",
                        MapInfo: { x: 20, y: 20, floor: "LIT" },
                        Age: Age.ADULT,
                        Order: 26.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
                    }
                }
            },
            spiritTrialRoom1: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {
                    spiritTrialRoom2: {
                        Map: "Ganon's Castle",
                        SilverRupeeIndex: 0,
                        CustomRequirement: function(age) {
                            if (Settings.RandomizerSettings.shuffleSilverRupees) {
                                return true;
                            }

                            let canAvoidHookshot = Settings.GlitchesToAllow.ganonSpiritHookshotless && 
                                ItemData.canUseAll(age, [ItemSets.SWORDS, ItemSets.SHIELDS]);
                            return ItemData.canUse(age, Items.HOOKSHOT) || canAvoidHookshot;
                        }
                    }
                },
                ItemLocations: {
                    "Heart in Spirit Trial": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapInfo: { x: 128, y: 242, floor: "SPT" },
                        MapImageName: "Recovery Heart",
                        Age: Age.EITHER,
                        Order: 27,
                        LongDescription: "Enter the spirit trial. The heart is on the left wall."
                    },
                    "Spirit Silver Rupee in Back Left Corner": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 128, y: 190, floor: "SPT" },
                        Age: Age.EITHER,
                        Order: 27.1,
                        LongDescription: "This rupee is in the back left corner of the room."
                    },
                    "Spirit Silver Rupee Near Beamos": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 164, y: 215, floor: "SPT" },
                        Age: Age.EITHER,
                        Order: 27.2,
                        LongDescription: "This rupee is on the ground next to the beamos."
                    },
                    "Spirit Silver Rupee in Back Right Corner": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 188, y: 206, floor: "SPT" },
                        Age: Age.EITHER,
                        Order: 27.3,
                        LongDescription: "This rupee is in the back right corner of the room."
                    },
                    "Spirit Silver Rupee in Front Right Corner": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 189, y: 253, floor: "SPT" },
                        Age: Age.EITHER,
                        Order: 27.4,
                        LongDescription: "This rupee is in the front right corner of the room."
                    },
                    "Spirit Silver Rupee Above Beamos": {
                        ItemGroup: ItemGroups.SILVER_RUPEE,
                        MapInfo: { x: 159, y: 221, floor: "SPT" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.ganonSpiritHookshotless; },
                        Order: 27.5,
                        LongDescription: "This rupee is above the beamos. Use your hookshot, or perform the ISG hover to get the rupee (remember not to cancel ISG with shield!)",
                        CustomRequirement: function(age) {
                            let canAvoidHookshot = Settings.GlitchesToAllow.ganonSpiritHookshotless && 
                                ItemData.canUseAll(age, [ItemSets.SWORDS, ItemSets.SHIELDS]);
                            return ItemData.canUse(age, Items.HOOKSHOT) || canAvoidHookshot;
                        }
                    }
                }
            },
            spiritTrialRoom2: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
                Exits: {
                    spiritTrialRoom3: {
                        CustomRequirement: function(age) {
                            let weirdShotItem = Items.HOOKSHOT.playerHas ? Items.HOOKSHOT : Items.FAIRY_BOW;
                            return Items.BOMBCHU.playerHas || Data.canWeirdShot(age, weirdShotItem);
                        }
                    }
                },
                ItemLocations: {
                    "Spirit Trial Chest After Hitting Switch": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 242, y: 184, floor: "SPT" },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees && !Settings.GlitchesToAllow.ganonSpiritHookshotless; },
                        Order: 28,
                        LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. Hit the switch closest to the barred door with a jumpslash or charged spin attack to spawn the chest."
                    }
                }
            },
            spiritTrialRoom3: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
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
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleSilverRupees && !Settings.GlitchesToAllow.ganonSpiritHookshotless; },
                        Order: 29,
                        LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. To your left, there is a switch. Line up with the switch and drop a Bombchu. It should navigate itself over to the switch and activate it. This will open the door - enter it. The hidden chest is now in front of you and a little bit to the right. Face the right wall when trying to open it."
                    }
                }
            },
            spiritTrialEnd: {
                DisplayGroup: { groupName: "Spirit Trial", imageName: "Spirit Medallion" },
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
                        LongDescription: "After going through the bombchu switch door - either fire arrow the web in the next room, or fire an arrow through the lit torch at it. After that, shine the light on the sun to the right of the entrance to the room to gain access to the pots."
                    },
                    "Spirit Trial Complete": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Spirit Medallion",
                        MapInfo: { x: 20, y: 20, floor: "SPT" },
                        Age: Age.ADULT,
                        Order: 30.1,
                        LongDescription: "Shoot the weird thing at the end of the trial with a light arrow to complete it.",
                        RequiredItems: [Items.LIGHT_ARROW]
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