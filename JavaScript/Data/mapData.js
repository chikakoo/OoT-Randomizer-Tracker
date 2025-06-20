let MapLocations = {
    "Kokiri Forest": {
        Abbreviation: "KOKI",
        MapGroup: MapGroups.FOREST,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Main Area", imageName: "Deku Shield" },
                Exits: {
                    afterMido: {
                        ChildNeedsAny: [
                            SettingSets.OPEN_DEKU,
                            [Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD],
                            ItemLocationSets.MOVE_MIDO]
                    },

                    // Main Area
                    "Lost Woods Bottom": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Bottom"]
                    },
                    "Mido's House": {
                        OwExit: OwExits["Kokiri Forest"]["Mido's House"]
                    },
                    "Link's House": {
                        OwExit: OwExits["Kokiri Forest"]["Link's House"]
                    },
                    "Saria's House": {
                        OwExit: OwExits["Kokiri Forest"]["Saria's House"]
                    },
                    "House of Twins": {
                        OwExit: OwExits["Kokiri Forest"]["House of Twins"]
                    },
                    "Shop": {
                        OwExit: OwExits["Kokiri Forest"]["Shop"]
                    },

                    // Upper Ledges
                    "Lost Woods Top": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Top"]
                    },
                    "Song of Storms Grotto by Lost Woods": {
                        OwExit: OwExits["Kokiri Forest"]["Song of Storms Grotto by Lost Woods"]
                    },

                    // Training Area & Maze
                    "Know-It-All House": {
                        OwExit: OwExits["Kokiri Forest"]["Know-It-All House"]
                    }
                },
                ItemLocations: {
                    "Blue Rupee Behind Mido's": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 135, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "This item is behind Mido's House."
                    },
                    "2 Green Rupees in Grass by Mido's": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 163, y: 110 },
                        Age: Age.CHILD,
                        LongDescription: "Search the grass near the Mido's house to find these items."
                    },
                    "2 Green Rupees in Grass by Know-it-All": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 139, y: 169 },
                        Age: Age.CHILD,
                        LongDescription: "Search the grass near the Know-it-All Brothers house to find these items."
                    },
                    "3 Hearts on Saria's House": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 206, y: 213 },
                        Age: Age.CHILD,
                        LongDescription: "Climb up the spiral to Saria's House to get to these items."
                    },
                    "Blue Rupee Across Bridges": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 177, y: 138 },
                        Age: Age.CHILD,
                        LongDescription: "Go up to Saria's House and cross the two small bridges to get to this item.",
                    },
                    "Wonderitem via Stepping Stones": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Blue Rupee Wonderitem",
                        MapInfo: { x: 198, y: 132 },
                        Age: Age.CHILD,
                        LongDescription: "Jump across the platforms to the left of the shop. If you haven't yet touched the water, you'll get this item.",
                    },
                    "Wonderitem via House of Twins Platforms": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Blue Rupee Wonderitem",
                        MapInfo: { x: 265, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "Start at the house of twins and jump on the big, then small platforms on the way to the shop. If you haven't yet touched the water, you'll get this item.",
                    },
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 284, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch near the Kokiri Shop. Used to get to the rupees above."
                    },
                    "Skulltula on the House of Twins": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 261, y: 233 },
                        Age: Age.ADULT,
                        LongDescription: "Look in the middle of the House of Twins at night.",
                        NeedsAny: [
                            ItemSets.GRAB_SHORT_DISTANCE_ITEMS, 
                            Tricks.houseOfTwinsSkullWithoutHookshot.canDo
                        ],
                        TricksToShow: [Tricks.houseOfTwinsSkullWithoutHookshot]
                    },
                    "Move Mido": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function()  { return Settings.RandomizerSettings.closedDeku; },
                        MapInfo: { x: 300, y: 175 },
                        Age: Age.CHILD,
                        LongDescription: "Move Mido by talking to him while you have a Deku Shield and the Kokiri Sword. Necessary to access the Deku Tree if closed Deku is on.",
                        Needs: [Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD]
                    },

                    // Upper Ledges
                    "Gossip Stone by Lost Woods": {
                        DisplayGroup: { groupName: "Upper Ledges", imageName: "Song of Storms" },
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 37 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the lost woods entrance at the top area of the forest.",
                    },
                    "Rupee Circle Above Shop": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "Rupee Circle",
                        MapInfo: { x: 291, y: 106 },
                        Age: Age.ADULT,
                        LongDescription: "Ride the bean platform or use hover boots to reach these items.",
                        NeedsAny: [Items.BOOMERANG, Equipment.HOVER_BOOTS, BeanSets.KOKIRI_FOREST]
                    },

                    // Training area and maze
                    "Skulltula on Know-it-all House": {
                        DisplayGroup: { groupName: "Training Area & Maze", imageName: "Kokiri Sword" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 70, y: 180 },
                        Age: Age.CHILD,
                        LongDescription: "Look on the side of the Know-it-all Brothers' house at night. You can get the token with a backflip if you don't have a Boomerang."
                    },
                    "Wonderitem via Training Sign": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Sword Wonderitem",
                        NeedsAny: [Equipment.KOKIRI_SWORD, Items.DEKU_STICK],
                        MapInfo: { x: 132, y: 211 },
                        Age: Age.CHILD,
                        LongDescription: "Slash the close sign in the fenced-off training area with your sword or deku sticks to get this item.",
                    },
                    "3 Wonderitems in Training Area": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Green Rupee Wonderitems",
                        MapInfo: { x: 106, y: 226 },
                        Age: Age.CHILD,
                        LongDescription: "To get these wonderitems, target the wall just to the left of the crawlspace. Backflip three times to claim these items."
                    },
                    "Close Maze Blue Rupee": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 72, y: 278 },
                        Age: Age.CHILD,
                        LongDescription: "This item is to your right when you go in the maze.",
                    },
                    "2 Wonderitems in Maze Grass": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Green Rupee Wonderitems",
                        MapInfo: { x: 100, y: 292 },
                        Age: Age.CHILD,
                        LongDescription: "These are wonderitems in the maze grass en route to the Kokiri Sword chest."
                    },
                    "Far Maze Blue Rupee": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 78, y: 292 },
                        Age: Age.CHILD,
                        LongDescription: "Go in the maze and follow the right wall to this item.",
                    },
                    "Kokiri Sword": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 290 },
                        Age: Age.CHILD,
                        LongDescription: "This is the prize at the end of the boulder maze, though the Hole of Z."
                    }
                }
            },
            afterMido: {
                DisplayGroup: { groupName: "Deku Tree", imageName: "Kokiri's Emerald" },
                Exits: {
                    main: {},
                    "Deku Tree": {
                        OwExit: OwExits["Kokiri Forest"]["Deku Tree"]
                    }
                }, 
                ItemLocations: {
                    "Gossip Stone Left of Deku Tree": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 252, y: 13 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the left side of the deku tree.",
                        Region: "afterMido"
                    },
                    "Gossip Stone Right of Deku Tree": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 303, y: 94 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the right side of the deku tree. You can get back here by climbing on one of the roots on the left side and navigating around to the other side.",
                        Region: "afterMido"
                    }
                }
            }
        }
    },

    "Lost Woods": {
		Abbreviation: "LOST",
        MapGroup: MapGroups.FOREST,
        Regions: {
            skullKidAndBridge: {
                DisplayGroup: { groupName: "Skull Kid & Bridge", imageName: "Skull Mask" },
                ExcludeFromSpawnList: true,
                Exits: {
                    nearGoronCity: {},
                    "To Lost Woods Bridge": {
                        OwExit: OwExits["Lost Woods"]["To Lost Woods Bridge"]
                    },
                    "Bridge To Lost Woods": {
                        Needs: [() => false] // This one is the one-way
                    }
                },
                ItemLocations: {
                    "Skull Kid's Gift": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 96, y: 172 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left one screen. Stand on the lower stump and play Saria's Song to get this gift",
                        Needs: [Songs.SARIAS_SONG, GameStateSets.CAN_PLAY_SONGS_INCLUDING_DIFFICULT_OI]
                    },
                    "Sell Skull Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 88, y: 172 },
                        MapImageName: "Skull Mask",
                        Age: Age.CHILD,
                        Needs: [ChildTradeItems.SKULL_MASK, Songs.SARIAS_SONG],
                        LongDescription: "First, play Saria's song to the Skull kid. Next, Talk to him while wearing the Skull Mask to sell it to him - this unlocks the Spooky Mask. Recommended to do this AFTER you get the forest stage item.",
                    },
                    "Show Cojiro to Grog": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 105, y: 168 },
                        MapImageName: "Cojiro",
                        Age: Age.ADULT,
                        LongDescription: "Grog is the weird guy by the stump where the skull kid is as Child. Show him Cojiro to get an item.",
                        Needs: [AdultTradeItems.COJIRO]
                    },
                    "Show Odd Potion to Fado": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 105, y: 177 },
                        MapImageName: "Odd Potion",
                        Age: Age.ADULT,
                        LongDescription: "Fado is the girl by the strump where the skill kid is as Child. Show her the Odd Potion to get an item.",
                        Needs: [AdultTradeItems.ODD_POTION]
                    },
                    "Soft Soil by Bridge": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 84, y: 222 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest Entrance, go left, then left again to find this soil patch. Used to get to the bridge."
                    },
                    "Scrub by Bridge": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 91, y: 273 },
                        ScrubSanityNotRequired: true, // Deku stick upgrade
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left and follow the path to its end. You'll find the scrub at the end."
                    },
                    "Gossip Stone by Bridge Scrub": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 80, y: 281 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the business scrub by the bridge.",
                    }
                }
            },
            nearGoronCity: {
                DisplayGroup: { groupName: "Near Goron City", imageName: "Goron Mask" },
                Exits: {
                    skullKidAndBridge: {},
                    secondHalf: {
                        AdultNeedsAny: [Tricks.midoSkip.canDo, Songs.SARIAS_SONG]
                    },
                    kokiriForestWarp: {},
                    "Goron City": {
                        OwExit: OwExits["Lost Woods"]["Goron City"]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Lost Woods"]["Zora's River"]
                    },

                    // Interiors & Grottos
                    "Grotto by Goron City": {
                        OwExit: OwExits["Lost Woods"]["Grotto by Goron City"]
                    }
                },
                ItemLocations: {
                    "Target Shooting Prize": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 219, y: 172 },
                        Order: 1,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Shoot the target in the center three times in a row with your Slingshot to get this prize.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "3 Wonderitems in Grass by Ocarina Game": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Green Rupee Wonderitems",
                        MapInfo: { x: 251, y: 195 },
                        Order: 2,
                        Age: Age.CHILD,
                        LongDescription: "Walk around the grass by the stumps where you play the ocarina memory game to get these three wonderitems."
                    },
                    "Ocarina Memory Game": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 240, y: 186 },
                        Order: 3,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Go down the cliff and stand on the lower stump. Take out your Ocarina and win the Simon game to get this prize.",
                        Needs: [GameStateSets.CAN_PLAY_SONGS_INCLUDING_DIFFICULT_OI,
                            // TODO: Make this a setting
                            () => ItemData.getNumberOfOcarinaButtons() >= 3
                        ]
                    },
                    "7 Green Rupees in Water": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "7 Green Rupees",
                        MapImageName: "7 Green Rupees",
                        MapInfo: { x: 273, y: 127 },
                        Order: 5,
                        Age: Age.CHILD,
                        NeedsAny: [Items.BOOMERANG, Equipment.SCALE],
                        LongDescription: "In the water leading to Zora's River - dive or use the boomerang to get these items.",
                    },
                    "Close Green Rupee in Water": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 277, y: 127 },
                        Order: 6,
                        Age: Age.CHILD,
                        LongDescription: "In the water leading to Zora's River - dive or use the boomerang to get it. It is automatically received when entering from the water.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            if (Items.BOOMERANG.playerHas || Equipment.SCALE.playerHas) { return true; }
                            if (!Settings.RandomizerSettings.shuffleOverworldEntrances) { return false; }

                            // Can't get from LW side directly, but could potentially take an OW exit there
                            let toZorasRiver = OwExits["Lost Woods"]["Zora's River"];
                            if (!toZorasRiver.OwShuffleMap || !toZorasRiver.OwShuffleExitName) {
                                return false
                            }

                            let otherSideExit = OwExits[toZorasRiver.OwShuffleMap][toZorasRiver.OwShuffleExitName];
                            return Data.getItemObtainability(otherSideExit, age);
                        }
                    }
                }
            },
            secondHalf: {
                DisplayGroup: { groupName: "After Mido", imageName: "Saria's Song" },
                Exits: {
                    nearGoronCity: {
                        AdultNeedsAny: [Songs.SARIAS_SONG, Tricks.megaFlip.canDo]
                    },
                    kokiriForestWarp: {},
                    "Sacred Forest Meadow": {
                        OwExit: OwExits["Lost Woods"]["Sacred Forest Meadow"]
                    },

                    // Interiors & Grottos
                    "Forest Stage Grotto": {
                        OwExit: OwExits["Lost Woods"]["Forest Stage Grotto"]
                    },
                    "Grotto Near Meadow": {
                        OwExit: OwExits["Lost Woods"]["Grotto Near Meadow"]
                    }
                },
                ItemLocations: {
                    "Skulltula by Forest Stage": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 188, y: 56 },
                        Order: 3,
                        Age: Age.ADULT,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. Plant a magic bean here as a child. Come back as an adult at night and ride the plant up.",
                        TricksToShow: [Tricks.lwSkullWithoutBean],
                        NeedsAny: [
                            BeanSets.LOST_WOODS_FOREST_STAGE, 
                            Tricks.lwSkullWithoutBean.canDo
                        ]
                    },
                    "Right Scrub by Forest Stage": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 194, y: 72 },
                        Order: 4,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the right scrub in this room."
                    },
                    "Left Scrub by Forest Stage": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 184, y: 101 },
                        Order: 5,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the left scrub in this room."
                    },
                    "Soft Soil by Forest Stage": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 187, y: 66 },
                        Order: 5.1,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again to find this soil patch. Used to get to the skulltula above at night."
                    },
                    "Blue Rupee Under Rock": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 265, y: 28 },
                        Order: 7,
                        Age: Age.EITHER,
                        LongDescription: "This item is under the rock one room from the Sacred Forest Meadow.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Tricks.boomerangThroughWalls.canDo]
                    },
                    "Front Scrub Near Grotto Near Meadow": {
                        ItemGroup: ItemGroups.SCRUB,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleGrottoEntrances && !Settings.RandomizerSettings.scrubSanity; },
                        MapInfo: { x: 202, y: 27 },
                        Order: 9,
                        ScrubSanityNotRequired: true, // Deku nut upgrade
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room. This is the front scrub.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
                    }
                }
            },
            kokiriForestWarp: {
                DisplayGroup: { groupName: "To Kokiri Forest", imageName: "Compass" },
                Exits: {
                    nearGoronCity: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }

                            // Check if you can go reverse from the exit that leads to Kokiri Forest
                            // to get to the first half of the Lost Woods
                            // TODO: put a function in Data that can do this
                            let linkedOwExit;
                            Object.keys(OwExits).forEach(function(mapName) {
                                if (linkedOwExit) { return; }
                                Object.values(OwExits[mapName]).forEach(function(exit) {
                                    if (exit.OwShuffleMap === "Lost Woods" &&
                                        exit.OwShuffleExitName === "To Kokiri Forest" &&
                                        !exit.ReadOnly) {
                                            linkedOwExit = exit;
                                            return;
                                        }
                                });
                            });

                            if (!linkedOwExit) { return false; }
                            return Data.calculateObtainability(linkedOwExit, age);
                        }
                    },
                    "To Kokiri Forest": {
                        OwExit: OwExits["Lost Woods"]["To Kokiri Forest"]
                    }
                },
                ItemLocations: {}
            }
        },
    },
    
    "Lost Woods Bridge": {
        Abbreviation: "LWBG",
		MapGroup: MapGroups.FOREST,
		Regions: {
			main: {
                DisplayGroup: { groupName: "Bridge", imageName: "Ocarina" },
                Exits: {
                    "Hyrule Field Bridge": {
                        OwExit: OwExits["Lost Woods Bridge"]["Hyrule Field Bridge"]
                    },
                    "Bridge to Lost Woods": {
                        OwExit: OwExits["Lost Woods Bridge"]["Bridge to Lost Woods"]
                    },
                    "Kokiri Forest Bridge": {
                        OwExit: OwExits["Lost Woods Bridge"]["Kokiri Forest Bridge"]
                    },
                },
                ItemLocations: {
                    "Saria's Gift": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 198, y: 149 },
                        Age: Age.EITHER,
                        LongDescription: "You get this by taking the Lost Woods bridge exit from Kokiri Forest. It's normally the Fairy Ocarina.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                let toKokiriExit = OwExits["Lost Woods Bridge"]["Kokiri Forest Bridge"];
                                if (!toKokiriExit.OwShuffleMap || !toKokiriExit.OwShuffleExitName) {
                                    return false
                                }

                                let otherSideExit = OwExits[toKokiriExit.OwShuffleMap][toKokiriExit.OwShuffleExitName];
                                return Data.getItemObtainability(otherSideExit, age);
                            }

                            let bridgeExit = OwExits["Kokiri Forest"]["Lost Woods Bottom"];
                            return Data.calculateObtainability(bridgeExit, age);
                        }
                    }
                }
            }
		}
    },

    "Sacred Forest Meadow": {
        Abbreviation: "SFM",
        MapGroup: MapGroups.FOREST,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Before Maze", imageName: "Wolfos Grotto" },
                Exits: {
                    afterGate: {
                        ChildNeeds: [ItemSets.DAMAGING_ITEMS]
                    },
                    "Lost Woods": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Lost Woods"]
                    },

                    // Interiors & Grottos
                    "Grotto near Lost Woods": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Grotto near Lost Woods"]
                    }
                },
                ItemLocations: {
                    "Wonderitem in Grass by Entrance": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Blue Rupee Wonderitem",
                        MapInfo: { x: 170, y: 287 },
                        Age: Age.EITHER,
                        LongDescription: "This wonderitem is in the grass to your left as you enter."
                    }
                }
            },

            afterGate: {
                DisplayGroup: { groupName: "Maze", imageName: "Green Rupee Wonderitem" },
                Exits: {
                    main: {},
                    // Maze
                    "Grotto in Maze Center": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Grotto in Maze Center"]
                    },

                    // After Maze
                    "Minuet Teleport Pad": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Minuet Teleport Pad"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Song of Storms Grotto"]
                    },
                    "Forest Temple": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Forest Temple"]
                    }
                },
                ItemLocations: {
                    // Maze
                    "Wonderitem in First Maze Alcove": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 198, y: 231 },
                        Age: Age.EITHER,
                        LongDescription: "Enter the maze and turn right - enter the first alcove to the left to get this wonderitem."
                    },
                    "Wonderitem in Second Maze Alcove": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Blue Rupee Wonderitem",
                        MapInfo: { x: 198, y: 207 },
                        Age: Age.EITHER,
                        LongDescription: "Enter the maze and turn right and follow the loop around. The alcove to the right after the turn has this wonderitem."
                    },
                    "Wonderitem in Third Maze Alcove": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 176, y: 221 },
                        Age: Age.EITHER,
                        LongDescription: "On the left side alcove after the first maze loop around, you will find this wonderitem."
                    },
                    "Right Wonderitem in Northern Maze": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 209, y: 147 },
                        Age: Age.EITHER,
                        LongDescription: "After the area that you're forced to go through tall grass, go to your right; the alcove with this wonderitem is on the left wall."
                    },
                    "Left Wonderitem in Northern Maze": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Blue Rupee Wonderitem",
                        MapInfo: { x: 177, y: 147 },
                        Age: Age.EITHER,
                        LongDescription: "After the area that you're forced to go through tall grass, go to your left; the alcove with this wonderitem is on the right wall."
                    },
                    "Skulltula on Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 219, y: 144 },
                        Age: Age.ADULT,
                        LongDescription: "At night, climb the ladder from the Forest Temple side. The skulltula will be on the left wall.",
                        Needs: [Items.HOOKSHOT]
                    },

                    // After Maze
                    "Saria's Song": {
                        DisplayGroup: { groupName: "After Maze", imageName: "Forest Medallion" },
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 200, y: 27 },
                        Age: Age.CHILD,
                        LongDescription: "After visiting Zelda at the castle, make your way to the end of the maze to get this item.",
                        Needs: [() => MapLocations["Castle"].talkedToImpa]
                    },
                    "Minuet of Forest": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 190, y: 42 },
                        Age: Age.ADULT,
                        LongDescription: "Make your way to the end of the maze to get this item."
                    },
                    "Gossip Stone by Forest Temple": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 176, y: 53 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the southwest corner of the area the forest temple is in."
                    },
                    "East Gossip Stone on Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 207, y: 228 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on top of the maze. It's the one that's more to the east."
                    },
                    "West Gossip Stone on Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 149, y: 176 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on top of the maze. It's the one that's more to the west."
                    }
                }
            }
        }
    },

    "Hyrule Field": {
        Abbreviation: "HFLD",
        MapGroup: MapGroups.FIELD_MARKET,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Northeast", imageName: "Zelda's Letter" },
                Exits: {
                    // Northeast
                    "Lost Woods Bridge": {
                        OwExit: OwExits["Hyrule Field"]["Lost Woods Bridge"]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Hyrule Field"]["Zora's River"]
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Hyrule Field"]["Kakariko Village"]
                    },
                    "Market": {
                        OwExit: OwExits["Hyrule Field"]["Market"]
                    },
                    "Lon Lon Ranch": {
                        OwExit: OwExits["Hyrule Field"]["Lon Lon Ranch"]
                    },
                    "Hidden Grotto by Kakariko": {
                        OwExit: OwExits["Hyrule Field"]["Hidden Grotto by Kakariko"]
                    },
                    "Grotto in Drawbridge Rock": {
                        OwExit: OwExits["Hyrule Field"]["Grotto in Drawbridge Rock"]
                    },

                    // West
                    "Gerudo Valley": {
                        OwExit: OwExits["Hyrule Field"]["Gerudo Valley"]
                    },
                    "Grotto in Rock North of River": {
                        OwExit: OwExits["Hyrule Field"]["Grotto in Rock North of River"]
                    },
                    "Hidden Grotto by North River Tree": {
                        OwExit: OwExits["Hyrule Field"]["Hidden Grotto by North River Tree"]
                    },
                    "Grotto by Gerudo": {
                        OwExit: OwExits["Hyrule Field"]["Grotto by Gerudo"]
                    },

                    // South
                    "Lake Hylia": {
                        OwExit: OwExits["Hyrule Field"]["Lake Hylia"]
                    },
                    "Grotto in Southeast Forest Rock": {
                        OwExit: OwExits["Hyrule Field"]["Grotto in Southeast Forest Rock"]
                    },
                    "Open Grotto East of Lake Hylia Fences": {
                        OwExit: OwExits["Hyrule Field"]["Open Grotto East of Lake Hylia Fences"]
                    },
                    "Grotto by Lake Hylia Fences": {
                        OwExit: OwExits["Hyrule Field"]["Grotto by Lake Hylia Fences"]
                    }
                },

                ItemLocations: {
                    // Northeast
                    "3 Wonderitems by Drawbridge": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        Time: function() { return Time.DAY; },
                        DefaultEntranceGroupName: "3 Red Rupee Wonderitems",
                        MapInfo: { x: 197, y: 26 },
                        Age: Age.CHILD,
                        LongDescription: "These are the wonderitems you get as Child by climbing up the drawbridge and jumping off."
                    },
                    "Ocarina of Time in Moat": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapImageName: "Song of Time",
                        MapInfo: { x: 207, y: 36 },
                        Age: Age.CHILD,
                        LongDescription: "After obtaining all the spiritual stones, stand by the drawbridge to the Market. After the cutscene, grab the Ocarina from the moat.",
                        Needs: [Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE]
                    },

                    // West
                    "Sell Bunny Hood": {
                        DisplayGroup: { groupName: "West", imageName: "Gerudo Membership Card" },
                        ItemGroup: ItemGroups.NON_ITEM,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 184, y: 145 },
                        Age: Age.CHILD,
                        MapImageName: "Bunny Hood",
                        Needs: [ChildTradeItems.BUNNY_HOOD,
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE],
                        LongDescription: "Once you have all spiritual stones, a guy will appear in Hyrule Field that runs around Lon Lon Ranch. Talk to him while wearing the Bunny Hood to sell it to him - this unlocks the Mask of Truth.",
                    }
                }
            }
        }
    },

    "Lon Lon Ranch": {
		Abbreviation: "LON",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Entrance", imageName: "Super Cucco Minigame" },
                Exits: {
                    // Entrance
                    "Hyrule Field": {
                        OwExit: OwExits["Lon Lon Ranch"]["Hyrule Field"]
                    },
                    "Talon's House": {
                        OwExit: OwExits["Lon Lon Ranch"]["Talon's House"]
                    },
                    "Stable": {
                        OwExit: OwExits["Lon Lon Ranch"]["Stable"]
                    },

                    // Back
                    "Open Grotto in Southwest Corner": {
                        OwExit: OwExits["Lon Lon Ranch"]["Open Grotto in Southwest Corner"]
                    },
                    "Cow Shed": {
                        OwExit: OwExits["Lon Lon Ranch"]["Cow Shed"]
                    }
                },

                ItemLocations: {
                    // Entrance
                    "4 Pots by Entrance": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 193, y: 44 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are on the wall near the stable door."
                    },
                    "Skulltula on Talon's House": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 240, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "At night, there's a skulltula high up on Talon's House.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Crate by Talon's House": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 250, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, this crate is next to Talon's House, by the skulltula tree.",
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 280, y: 100 },
                        Age: Age.CHILD,
                        LongDescription: "The tree is just passed the houses to the left. Roll into it to reveal the skulltula. Use a pot from the beginning to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true
                    },

                    // Racetrack
                    "3 Pots in Rain Shed": {
                        DisplayGroup: { groupName: "Racetrack", imageName: "Epona's Song" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 234, y: 213 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are in the rain shed inside the horse enclosure."
                    },
                    "Epona's Song": {
                        ItemGroup: ItemGroups.SONG,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 174, y: 170 },
                        Age: Age.CHILD,
                        LongDescription: "You can get this after getting Malon's gift and waking up Talon with the Chicken at Hyrule Castle. Take out your Ocarina to get the item.",
                        Needs: [GameStateSets.CAN_PLAY_SONGS, ItemLocationSets.GIFT_FROM_MALON, ItemLocationSets.WAKE_UP_TALON]
                    },
                    "Wonderitem via Short Gate": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Epona Wonderitem",
                        MapInfo: { x: 206, y: 153 },
                        Age: Age.ADULT,
                        LongDescription: "As Adult, talk to Ingo if you haven't already rescused Epona to go inside. Play Epona's song and ride epona. Jump over the center of the smaller gate to get this wonderitem.",
                        Needs: [Songs.EPONAS_SONG, Items.OCARINA]
                    },
                    "Wonderitem via Tall Gate": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Epona Wonderitem",
                        MapInfo: { x: 144, y: 190 },
                        Age: Age.ADULT,
                        LongDescription: "As Adult, talk to Ingo if you haven't already rescused Epona to go inside. Play Epona's song and ride epona. Jump over the center of the larger gate to get this wonderitem.",
                        Needs: [Songs.EPONAS_SONG, Items.OCARINA]
                    },
                    "Unlock Cow in House": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Epona's Song",
                        RequiredToAppear: function() { return Settings.RandomizerSettings.cowSanity; },
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 176, y: 115 },
                        Age: Age.ADULT,
                        LongDescription: "After Epona is freed, talk to Malon and complete the obstacle course in less than 50 seconds. This will unlock the cow in Link's house.",
                        Needs: [GameStateSets.CAN_RIDE_EPONA]
                    },

                    // Back
                    "Skulltula on Rain Shed": {
                        DisplayGroup: { groupName: "Back", imageName: "Cow Shed" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 233, y: 231  },
                        Age: Age.CHILD,
                        LongDescription: "At night, run around to the back of the corral to find this skulltula. Use a pot from the beginning to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula on Southwest Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 44, y: 214 },
                        Age: Age.CHILD,
                        LongDescription: "At night, there's a skulltula on the southeast wall of the ranch. Facing the cow shed, it's a little bit to the right.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            }
		}
    },
    
    "Market Entrance": {
		Abbreviation: "MENT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Market Entrance", imageName: "3 Pots" },
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Market Entrance"]["Hyrule Field"]
                    },
                    "Market": {
                        OwExit: OwExits["Market Entrance"]["Market"]
                    },

                    // Interiors & Grottos
                    "Guard House": {
                        OwExit: OwExits["Market Entrance"]["Guard House"]
                    }
                },
                ItemLocations: {}
            }
		}
    },
    
	"Market": {
		Abbreviation: "MRKT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Marketplace", imageName: "Green Rupee" },
                Exits: {
                    alley: {
                        Age: Age.CHILD
                    },
                    "Market Entrance": {
                        OwExit: OwExits["Market"]["Market Entrance"]
                    },
                    "Hyrule Castle": {
                        OwExit: OwExits["Market"]["Hyrule Castle"]
                    },
                    "Temple of Time": {
                        OwExit: OwExits["Market"]["Temple of Time"]
                    },

                    // Interiors & Grottos
                    "Archery Minigame": {
                        OwExit: OwExits["Market"]["Archery Minigame"]
                    },
                    "Happy Mask Shop": {
                        OwExit: OwExits["Market"]["Happy Mask Shop"]
                    },
                    "Potion Shop": {
                        OwExit: OwExits["Market"]["Potion Shop"]
                    },
                    "Bazaar": {
                        OwExit: OwExits["Market"]["Bazaar"]
                    },
                    "Treasure Chest Minigame": {
                        OwExit: OwExits["Market"]["Treasure Chest Minigame"]
                    },
                    "Bombchu Bowling": {
                        OwExit: OwExits["Market"]["Bombchu Bowling"]
                    }
                },
                ItemLocations: {
                    "Crates by Bazaar": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Night and 2 Empty Day Crates",
                        MapInfo: { x: 303, y: 200 },
                        Order: 1,
                        Time: function() { 
                            return !Settings.RandomizerSettings.shuffleEmptyCrates ? Time.NIGHT : Time.EITHER; 
                        },
                        Age: Age.CHILD,
                        LongDescription: "These crates are on either side of the bazaar door."
                    },
                    "Crates by Archery": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Night and 2 Empty Day Crates",
                        Time: function() { 
                            return !Settings.RandomizerSettings.shuffleEmptyCrates ? Time.NIGHT : Time.EITHER; 
                        },
                        MapInfo: { x: 250, y: 123 },
                        Order: 2,
                        Age: Age.CHILD,
                        LongDescription: "These crates are on the right side of the archery minigame door."
                    },
                    "Wonderitems on Balcony": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "Balcony Wonderitems",
                        MapInfo: { x: 213, y: 151 },
                        Order: 3,
                        Age: Age.CHILD,
                        LongDescription: "Climb the stairs by bombchu bowling and go across the catwalk to get these items. Note that there are different sets of them depending on if it's night or day!"
                    }
                }
            },
            alley: {
                DisplayGroup: { groupName: "Alleys", imageName: "Bombchu" },
                Exits: {
                    main: {},

                    // Interiors & Grottos
                    "Bombchu Shop": {
                        OwExit: OwExits["Market"]["Bombchu Shop"]
                    },
                    "Door in Right Market Alley": {
                        OwExit: OwExits["Market"]["Door in Right Market Alley"]
                    }
                },

                ItemLocations: {
                    "Reward from Returning Dog": {
                        // Not marked as interior because it's not included in the entrance shuffle currently
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 104, y: 230 },
                        Age: Age.CHILD,
                        LongDescription: "If you start near the entrance, the dog you want is just to the left behind the market stall. From there, beeline to the right to get to the left market alley. Go to the more rightmost of the two doors and turn in the dog."
                    },
                    "Crate in Dog Lady House": {
                        // Not marked as interior because it's not included in the entrance shuffle currently
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 96, y: 223 },
                        Age: Age.EITHER, // TODO: have a setting for UseChildOnly if not using no logic?
                        LongDescription: "Go in the more rightmost of the two doors in the left market alley to find this crate."
                    }
                }
            }
		}
    },
    
    "Temple of Time": {
		Abbreviation: "ToT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Courtyard", imageName: "Ocarina of Time" },
                Exits: {
                    "Market": {
                        OwExit: OwExits["Temple of Time"]["Market"]
                    },

                    // Interiors & Grottos
                    "Temple of Time": {
                        OwExit: OwExits["Temple of Time"]["Temple of Time"]
                    }
                },
                ItemLocations: {
                    "Right Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 242 },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's all the way to the right."
                    },
                    "Center Right Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 219 },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's one to the left of the rightmost one."
                    },
                    "Center Left Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 197 },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's one to the right of the leftmost one."
                    },
                    "Left Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 172 },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's all the way to the left."
                    }
                }
            }
		}
	},
    
    "Castle": {
		Abbreviation: "CSTL",
		MapGroup: MapGroups.FIELD_MARKET,
		Floors: ["HYR", "GAN"],
		StartingFloorIndex: 0,
		Regions: {
            main: {
                DisplayGroup: { groupName: "To Market", imageName: "Compass" },
                Exits: {
                    hyruleCastle: {
                        Age: Age.CHILD
                    },
                    ganonsCastle: {
                        Age: Age.ADULT
                    },
                    "Market": {
                        OwExit: OwExits["Castle"]["Market"]
                    }
                },
                ItemLocations: {}
            },
            hyruleCastle: {
                DisplayGroup: { groupName: "Hyrule Castle", imageName: "Kokiri Sword" },
                Exits: {
                    main: {},

                    // Interiors & Grottos
                    "Hyrule Great Fairy Fountain": {
                        OwExit: OwExits["Castle"]["Hyrule Great Fairy Fountain"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Castle"]["Song of Storms Grotto"]
                    }
                },
                ItemLocations: {
                    "Gift from Malon": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 123, y: 248, floor: "HYR" },
                        Order: 1,
                        Age: Age.CHILD,
                        LongDescription: "Malon is waiting by the vines to the right. If she isn't there, leave the map and come back. Talk to her to receive an item."
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 97, y: 245, floor: "HYR" },
                        Order: 2,
                        Age: Age.CHILD,
                        LongDescription: "Roll into the first tree to set this skulltula free."
                    },
                    "Gossip Stone by Vines": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 137, y: 269, floor: "HYR" },
                        Order: 2.1,
                        Age: Age.CHILD,
                        LongDescription: "This stone near the top of the vines."
                    },
                    "Gossip Stone by Climbable Stones": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 72, y: 99, floor: "HYR" },
                        Order: 2.2,
                        Age: Age.CHILD,
                        LongDescription: "This stone near the climbable stones near the castle moat."
                    },
                    "Shoot 2 Torches by Drawbridge": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Slingshot Wonderitems",
                        Order: 4,
                        MapInfo: { x: 122, y: 41, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Shoot the two torches on either side of the drawbridge with your slingshot on the castle wall to get the two wonderitems.",
                        Needs: [Items.FAIRY_SLINGSHOT]
                    },
                    "7 Rupees in Moat by Drawbridge": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "7 Green Rupee Wonderitems",
                        Order: 5,
                        MapInfo: { x: 122, y: 78, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Swim downstream in the moat by the drawbridge to get these 7 items. Start on the leftmost side, and stay in the middle all the way down.",
                    },
                    "3 Rupees in Moat by Crates": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Green Rupee Wonderitems",
                        Order: 7,
                        MapInfo: { x: 182, y: 52, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Swim in the water by the milk crates to get these three items.",
                    },
                    "Wake up Talon": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Chicken",
                        Age: Age.CHILD,
                        Order: 8,
                        MapInfo: { x: 193, y: 38, floor: "HYR" },
                        LongDescription: "Wait for the Weird Egg to hatch, then wake up Talon. This unlocks a few things in Lon Lon Ranch.",
                        Needs: [ChildTradeItems.WEIRD_EGG]
                    },
                    "Castle Courtyard Items": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.GIFT,
                        DefaultEntranceGroupName: "Castle Courtyard Items",
                        MapInfo: { x: 167, y: 33, floor: "HYR" },
                        Age: Age.CHILD,
                        Order: 9,
                        LongDescription: "After waking up Talon with the Chicken, push the crates down so that you can jump to the crawlspace. Sneak past the guards to meet Zelda to get her letter. After that, try to leave the area to receive this item from Impa.<br/><br/>To megaflip, climb up the right side of the left box, ess right 1 (you should be able to walk to the other box now). Chu flip as normal, or place a bomb a little after the box transition and manually back up to get the distance for the roll. Let go of everything when the flip happens so you don't walk off!",
                        NeedsAny: [ChildTradeItems.WEIRD_EGG, Tricks.megaFlip.canDo]
                    }
                }
            },
            ganonsCastle: {
                DisplayGroup: { groupName: "Ganon's Castle", imageName: "Adult Icon" },
                Exits: {
                    main: {},
                    "Ganon's Castle": {
                        OwExit: OwExits["Castle"]["Ganon's Castle"]
                    },

                    // Interiors & Grottos
                    "Ganon Great Fairy Fountain": {
                        OwExit: OwExits["Castle"]["Ganon Great Fairy Fountain"]
                    }
                },
                ItemLocations: {
                    "Skulltula on Broken Arch": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Order: 1,
                        MapInfo: { x: 258, y: 171, floor: "GAN" },
                        Age: Age.ADULT,
                        LongDescription: "A little bit down the path is a broken archway. The skulltula is found on the opposite side of it.<br/><br/>If you don't have hookshot, walk as far as you can up the slope. Hold Z-target and press B to vertical slash the skulltula. Now still as far up as you can be, target the skulltula and press A to jumpslash and retrieve the item.",
                    }
                }
            }
		}
	},
    
    "Kakariko Village": {
		Abbreviation: "KAK",
		MapGroup: MapGroups.KAKARIKO,
        _canChildKillWatchtowerSkull: () => 
            ItemData.canUseAny(Age.CHILD, [
                Items.FAIRY_SLINGSHOT, 
                Items.BOMBCHU, 
                Tricks.isg.canDo, 
                Tricks.watchtowerSkullJumpslash.canDo]),
		Regions: {
            main: {
                DisplayGroup: { groupName: "Lower Area", imageName: "Super Cucco Minigame" },
                Exits: {
                    impasRoof: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    },
                    beyondGate: {
                        ChildNeedsAny: [
                            SettingSets.OPEN_KAKARIKO_GATE,
                            [SettingSets.KAKARIKO_GATE_OPENS_WITH_LETTER, ChildTradeItems.ZELDAS_LETTER],
                            [SettingSets.VANILLA_KAKARIKO_GATE, ItemLocationSets.SHOW_GUARD_LETTER],
                            Tricks.lungeStorage.canDo
                        ]
                    },

                    // Lower Area
                    "Hyrule Field": {
                        OwExit: OwExits["Kakariko Village"]["Hyrule Field"]
                    },
                    "Graveyard": {
                        OwExit: OwExits["Kakariko Village"]["Graveyard"]
                    },
                    "Bottom of the Well": {
                        OwExit: OwExits["Kakariko Village"]["Bottom of the Well"]
                    },
                    "Hidden Grotto near Tree": {
                        OwExit: OwExits["Kakariko Village"]["Hidden Grotto near Tree"]
                    },
                    "Talon's House": {
                        OwExit: OwExits["Kakariko Village"]["Talon's House"]
                    },
                    "House of Skulltula": {
                        OwExit: OwExits["Kakariko Village"]["House of Skulltula"]
                    },
                    "Impa's House": {
                        OwExit: OwExits["Kakariko Village"]["Impa's House"]
                    },
                    "Back of Impa's House": {
                        OwExit: OwExits["Kakariko Village"]["Back of Impa's House"]
                    },
                    "Archery Minigame": {
                        OwExit: OwExits["Kakariko Village"]["Archery Minigame"]
                    },
                    "Windmill": {
                        OwExit: OwExits["Kakariko Village"]["Windmill"]
                    },
                    "Windmill to Interior": {
                        OwExit: OwExits["Kakariko Village"]["Windmill to Interior"]
                    },

                    // Upper Area
                    "Bazaar": {
                        OwExit: OwExits["Kakariko Village"]["Bazaar"]
                    },
                    "Potion Shop Front": {
                        OwExit: OwExits["Kakariko Village"]["Potion Shop Front"]
                    },

                    // Enclosed Area
                    "Open Grotto Behind Potion Shop": {
                        OwExit: OwExits["Kakariko Village"]["Open Grotto Behind Potion Shop"]
                    },
                    "Potion Shop Back": {
                        OwExit: OwExits["Kakariko Village"]["Potion Shop Back"]
                    },
                    "Potion Shop to Interior": {
                        OwExit: OwExits["Kakariko Village"]["Potion Shop to Interior"]
                    },
                    "Granny's Potion Shop": {
                        OwExit: OwExits["Kakariko Village"]["Granny's Potion Shop"]
                    }
                },
                ItemLocations: {
                    // Lower Area
                    "Show Poacher's Saw to Carpenter": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 87, y: 179 },
                        MapImageName: "Poacher's Saw",
                        Age: Age.CHILD,
                        Order: 1,
                        RequiredToAppear: function() { return Tricks.equipSwap.enabled; },
                        LongDescription: "Show the carpenter boss (in front of the tent) the Poacher's Saw to receive an item.",
                        Needs: [AdultTradeItems.POACHERS_SAW],
                        PostObtain: function(playerHas, skipSocketUpdate) {
                            let otherItemLocation = MapLocations["Gerudo Valley"].Regions.acrossBridge.ItemLocations["Show Poacher's Saw to Carpenter"];
                            Data.setItemObtained(otherItemLocation, playerHas, true);

                            if (skipSocketUpdate) {
                                SocketClient.itemLocationUpdated(otherItemLocation);
                            }
                        }
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 97, y: 179 },
                        Age: Age.CHILD,
                        Order: 2,
                        LongDescription: "At night, roll into the tree in the center of the village to reveal this skulltula. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true
                    },
                    "Cucco Crate by Talon's House": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 156, y: 155 },
                        Age: Age.CHILD,
                        Order: 3,
                        LongDescription: "This is the crate with the cucco in it next to Talon's House."
                    },
                    "Skulltula on House of Skulltulas": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 121, y: 218 },
                        Age: Age.CHILD,
                        Order: 4,
                        LongDescription: "At night, you can find this skulltula on the side of the House of Skulltulas. If you have no weapon, use a pot near Impa's house to kill it (up the nearby stairs).",
                        OverrideItemGroupCondition: true
                    },
                    "3 Pots Near Impa's House": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 136, y: 249 },
                        Age: Age.CHILD,
                        Order: 5,
                        LongDescription: "These pots are next to the door to Impa's house."
                    },
                    "Wonderitem in Impa's House": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Red Rupee Wonderitem",
                        RequiredToAppear: function() {
                            return !Settings.RandomizerSettings.shuffleInteriorEntrances;
                        },
                        MapInfo: { x: 175, y: 248 },
                        Age: Age.CHILD,
                        Order: 6,
                        LongDescription: "Enter Impa's house from the front. Climb the stairs and walk around the cow pen area to get this wonderitem."
                    },
                    "Skulltula at Construction Site": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 191, y: 201 },
                        Age: Age.CHILD,
                        Order: 7,
                        LongDescription: "At night, you can find this skulltula on the pile of bricks at the construction site. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true
                    },
                    "Wonderitem on Construction Site": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Red Rupee Wonderitem",
                        MapInfo: { x: 189, y: 210 },
                        Age: Age.CHILD,
                        Order: 8,
                        LongDescription: "Climb up the struture under construction and make your way to the end to get this item. If it's daytime, you can get around the worker by backwalking off the edge and grabbing hold, then climbing back up when he passes by."
                    },
                    "Bottle from Cucco Collection": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 210, y: 244 },
                        Age: Age.CHILD,
                        Order: 9,
                        LongDescription: "This is the prize that Anju gives you after collecting all 7 cuccos in the pen. Note that leaving the map will keep your progress."
                    },
                    "Crate Outside Enclosed Area": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 248, y: 143 },
                        Age: Age.CHILD,
                        Order: 10,
                        LongDescription: "This crate is by the gate leading to the enclosed area, on the outside near the windmill platform."
                    },
                    "Crate by Windmill": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 264, y: 155 },
                        Age: Age.CHILD,
                        Order: 11,
                        LongDescription: "This crate is by the door to the windmill."
                    },
                    "Crate by Graveyard": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 333, y: 212 },
                        Age: Age.CHILD,
                        Order: 12,
                        LongDescription: "This crate is by the loading zone to the graveyard, in the corner."
                    },
                    "2 Crates by Talon's House": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 166, y: 175 },
                        Age: Age.ADULT,
                        Order: 13,
                        LongDescription: "These crates are next to Talon's House."
                    },
                    "Crate Behind House of Skulltulas": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 108, y: 203 },
                        Age: Age.ADULT,
                        Order: 14,
                        LongDescription: "This crate is behind the house of skulltulas, by the ledge."
                    },
                    "2 Crates by Impa's House": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 136, y: 245 },
                        Age: Age.ADULT,
                        Order: 15,
                        LongDescription: "These crates are next to Impa's House."
                    },
                    "Crate by Archery": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 185, y: 192 },
                        Age: Age.ADULT,
                        Order: 17,
                        LongDescription: "This crate is by the entrance to the archery minigame."
                    },
                    "Gift From Anju": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 205, y: 240 },
                        Age: Age.ADULT,
                        Order: 18,
                        LongDescription: "Simply talk to Anju (the cucco lady) as adult to get this."
                    },
                    "Anju After Waking Talon": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 215, y: 240 },
                        MapImageName: "Pocket Cucco",
                        Age: Age.ADULT,
                        Order: 19,
                        LongDescription: "Show Anju the Pocket Cucco to after waking up Talon with it. If entrance shuffle is off, he's in the house near the bottom stairs.",
                        CustomRequirement: function(age) {
                            return this.wokeUpTalon;
                        }
                    },
                    "Nocturne of Shadow": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 35, y: 209 },
                        Age: Age.ADULT,
                        Order: 20,
                        LongDescription: "You can get this item if you have the forest, fire, and water medallions. Just enter Kakariko Village as an adult.",
                        Needs: [Medallions.FOREST_MEDALLION, Medallions.FIRE_MEDALLION, Medallions.WATER_MEDALLION]
                    },

                    // Upper Area
                    "Crate Below Bazaar": {
                        DisplayGroup: { groupName: "Upper Area", imageName: "Keaton Mask" },
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 99, y: 121 },
                        Age: Age.CHILD,
                        LongDescription: "This is the crate just up the stairs, where the beggar is as Adult."
                    },
                    "3 Pots Near Watchtower": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 180, y: 111 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are near the ladder to the watchtower."
                    },
                    "Skulltula on Watchtower": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 169, y: 111 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the watchtower ladder. You can kill it with either the slingshot or a bombchu.",
                        Needs: [() => MapLocations["Kakariko Village"]._canChildKillWatchtowerSkull()],
                        TricksToShow: [Tricks.watchtowerSkullJumpslash]
                    },
                    "3 Pots Near Bazaar": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 110, y: 74 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are near the Bazaar entrance close to Death Mountain Trail."
                    },
                    "Skulltula on Bazaar": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 96, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Bazaar (the building by the entrance to Death Mountain). It's near some pots. Use them to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true
                    },
                    "Show Guard Letter": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Zelda's Letter",
                        RequiredToAppear: function() {
                            return Settings.RandomizerSettings.openKakariko === OpenKakarikoSettings.VANILLA;
                        },
                        MapInfo: { x: 107, y: 41 },
                        Age: Age.CHILD,
                        Needs: [ChildTradeItems.ZELDAS_LETTER],
                        LongDescription: "Show the guard Zelda's Letter. This unlocks the mask trading sequence.",
                    },
                    "Sell Keaton Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 123, y: 41 },
                        MapImageName: "Keaton Mask",
                        Age: Age.CHILD,
                        LongDescription: "Talk to the guard while wearing the Keaton mask to sell it to him - this unlocks the Skull Mask.",
                        Needs: [ChildTradeItems.KEATON_MASK],
                        NeedsAny: [ChildTradeItems.ZELDAS_LETTER, SettingSets.OPEN_KAKARIKO_GATE]
                    },
                    "Crate by Archery or Beggar": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 185, y: 192 },
                        Age: Age.ADULT,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        LongDescription: "This crate is next to the entrance to the archery minigame or close to the beggar near the watchtower. The drop is shared between the two."
                    },
                    "2 Crates by Beggar": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 118, y: 122 },
                        Age: Age.ADULT,
                        LongDescription: "These crates are next to the beggar up the stairs."
                    },
                    "Crate by Potion Shop Entrance": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 154, y: 83 },
                        Age: Age.ADULT,
                        LongDescription: "This crate is by the entrance to the potion shop."
                    },
                    "Gift from the Guy on the Roof": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 212, y: 124 },
                        Time: function() {
                            return MapLocations["Kakariko Village"]._canChildKillWatchtowerSkull()
                                ? Time.EITHER
                                : Time.DAY_CHILD;
                        },
                        Age: Age.EITHER,
                        LongDescription: "The guy on the roof of the house gives you an item. To get this as a child, climb the giant watchtower, position yourself at the upper left corner, then sidehop left without holding any direction. As an adult, you can either hookshot to the roof from the fence by the windmill, or do a jump to the potion shop roof from the ledge leading to Death Mountain."
                    },

                    // Enclosed Area
                    "4 Crates Behind Potion Shop": {
                        DisplayGroup: { groupName: "Enclosed Area", imageName: "Odd Mushroom" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 249, y: 134 },
                        Age: Age.ADULT,
                        LongDescription: "The four crates in the enclosed area behind the potion shop."
                    },
                    "Crate Behind Potion Shop": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 249, y: 134 },
                        Age: Age.ADULT,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
                        LongDescription: "One of the four crates in the enclosed area will drop an item - it's random which it is."
                    },
                    "2 Pots Near Granny's Potion Shop": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 242, y: 138 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are next to the door to Granny's Potion Shop in the enclosed area."
                    }
                }
            },
            impasRoof: {
                DisplayGroup: { groupName: "Lower Area", imageName: "Super Cucco Minigame" },
                Exits: {
                    main: {}
                },
                ItemLocations: {
                    "Skulltula on Impa's Roof": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 172, y: 260 },
                        Age: Age.ADULT,
                        Order: 16,
                        LongDescription: "At night, from the ledge near the entrance to Impa's House, hookshot to the House of Skulltula. From there, hookshot to Impa's house. You'll find the skulltula on the back wall."
                    }
                }
            },
            beyondGate: {
                DisplayGroup: { groupName: "Upper Area", imageName: "Keaton Mask" },
                Exits: {
                    main: {},
                    "Death Mountain Trail": {
                        OwExit: OwExits["Kakariko Village"]["Death Mountain Trail"]
                    }
                },
                ItemLocations: {}
            }
        }
	},
    
    "Graveyard": {
        Abbreviation: "GVYD",
        MapGroup: MapGroups.KAKARIKO,
        Regions: {
            main: {
                DisplayGroup: { groupName: "Main Area", imageName: "Dampe's Grave" },
                Exits: {
                    crateLedge: {
                        Age: Age.ADULT,
                        NeedsAny: [UpgradedItems.LONGSHOT, BeanSets.GRAVEYARD, Tricks.weirdShot.canDo]
                    },
                    freestandingItemInCrate: {
                        Needs: [Tricks.boomerangGraveyardHP.canDo]
                    },
                    looseItemInCrate: {
                        Needs: [Tricks.boomerangGraveyardHP.canDo, Items.BOMBCHU]
                    },
                    seamAboveShadowTemple: {
                        Age: Age.ADULT,
                        Needs: [Tricks.hookshotJump.canDo]
                    },
                    royalFamilyTomb: {
                        Needs: [Songs.ZELDAS_LULLABY]
                    },
                    dampesGrave: {
                        Age: Age.ADULT
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Graveyard"]["Kakariko Village"]
                    },

                    // Interiors & Grottos
                    "Dampe's Shed": {
                        OwExit: OwExits["Graveyard"]["Dampe's Shed"]
                    },
                    "Grave with Flowers": {
                        OwExit: OwExits["Graveyard"]["Grave with Flowers"]
                    },
                    "Unmarked Grave": {
                        OwExit: OwExits["Graveyard"]["Unmarked Grave"]
                    }
                },
                ItemLocations: {
                    "Sell Spooky Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 184, y: 145 },
                        MapImageName: "Spooky Mask",
                        Age: Age.CHILD,
                        Needs: [ChildTradeItems.SPOOKY_MASK],
                        LongDescription: "Talk to the graveyard kid during the day while wearing the Spooky Mask to sell it to him - this unlocks the Bunny Hood.",
                    },
                    "Dampe's Heart-Pounding Graveyard Tour": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 184, y: 176 },
                        Age: Age.CHILD,
                        LongDescription: "Get to the graveyard when it's barely night time. If you play the Sun's Song, make sure you do it where time passes, then quickly take the exit to Kakariko before it becomes too late. Simply talk to Dampe and pay him 10 rupees to get this item."
                    },
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 159, y: 91 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch near the Dampe's grave. Used to get to the crate above."
                    },
                    "Skulltula on Back Right Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 242, y: 264 },
                        Age: Age.CHILD,
                        LongDescription: "At night, this skulltula is high up on the back right wall of the graveyard.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                },
            },
            crateLedge: {
                DisplayGroup: { groupName: "Crate Ledge", imageName: "Crate" },
                ExcludeFromSpawnList: true,
                Exits: {
                    freestandingItemInCrate: {},
                    looseItemInCrate: {},
                    seamAboveShadowTemple: {
                        Age: Age.ADULT,
                        Needs: [Tricks.oldShadowEarly.canDo]
                    }
                },
                ItemLocations: {}
            },
            freestandingItemInCrate: {
                DisplayGroup: { groupName: "Crate Ledge", imageName: "Crate" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Heart Piece in Crate": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 147, y: 78 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.boomerangGraveyardHP.enabled; },
                        LongDescription: "Plant a magic bean in the soft soil as a child. Come back as adult to get the item from the crate. Alternatively, the Longshot can reach the crate if you stand on one of the graves.",
                        TricksToShow: [Tricks.boomerangGraveyardHP]
                    }
                }
            },
            looseItemInCrate: {
                DisplayGroup: { groupName: "Crate Ledge", imageName: "Crate" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Crate Above Soft Soil": {
                        ItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        MapInfo: { x: 147, y: 84 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.boomerangGraveyardHP.enabled; },
                        LongDescription: "Plant a magic bean in the soft soil as a child. Come back as adult to get the item from the crate. Alternatively, the Longshot can reach the crate if you stand on one of the graves.<br/><br/>You can break the crate from the bottom with a chu dropped on the 5th red flash. The boomerang trick can be used to grab the item.",
                        TricksToShow: [Tricks.boomerangGraveyardHP]
                    }
                }
            },
            seamAboveShadowTemple: {
                ExcludeFromSpawnList: true,
                Exits: {
                    shadowTemple: {},
                    top: {}
                },
                ItemLocations: {}
            },
            top: {
                DisplayGroup: { groupName: "Main Area", imageName: "Dampe's Grave" },
                DuplicateWarpSongPriority: 1,
                Exits: {
                    main: {},
                    royalFamilyTomb: {
                        Needs: [Tricks.unloadGrave.canDo]
                    },
                    dampesGrave: {
                        Needs: [Tricks.unloadGrave.canDo]
                    },
                    shadowTemple: {
                        NeedsAny: [
                            Items.DINS_FIRE, 
                            Tricks.childShadowWithBombPush.canDo, 
                            [Age.CHILD, QPAItemSets.LEDGE_QPA], // Lighting the torches with a stick as child is easy
                            Tricks.adultShadowLedgeClip.canDo
                        ]
                    },
                    "Nocturne Teleport Pad": {
                        OwExit: OwExits["Graveyard"]["Nocturne Teleport Pad"]
                    }
                },
                ItemLocations: {
                    "Gossip Stone at Top Area": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 341, y: 125 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is near the Nocturne of Shadow warp pad."
                    }
                }
            },
            royalFamilyTomb: {
                DisplayGroup: { groupName: "Main Area", imageName: "Dampe's Grave" },
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {},
                    "Royal Family's Tomb": {
                        OwExit: OwExits["Graveyard"]["Royal Family's Tomb"]
                    }
                },
                ItemLocations: {}
            },
            dampesGrave: {
                DisplayGroup: { groupName: "Main Area", imageName: "Dampe's Grave" },
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {},
                    "Dampe's Grave": {
                        OwExit: OwExits["Graveyard"]["Dampe's Grave"]
                    },
                    "Dampe's Grave to Dampe Race": {
                        OwExit: OwExits["Graveyard"]["Dampe's Grave to Dampe Race"]
                    }
                },
                ItemLocations: {}
            },
            shadowTemple: {
                DisplayGroup: { groupName: "Main Area", imageName: "Dampe's Grave" },
                ExcludeFromSpawnList: true,
                Exits: {
                    top: {},
                    "Shadow Temple": {
                        OwExit: OwExits["Graveyard"]["Shadow Temple"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

    "Windmill-Kak Potion": {
        Abbreviation: "WMKP",
		MapGroup: MapGroups.KAKARIKO,
        Floors: ["DMP", "WND", "POT"],
        StartingFloorIndex: 0,
        Regions: {
            // Dampe's Grave
            dampesGrave: {
                DisplayGroup: { groupName: "Dampe's Grave", imageName: "Dampe's Grave" },
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleGrottoEntrances; },
                Exits: {
                    windmillTop: {
                        ChildNeeds: [Tricks.groundJump.canDoWithBomb],
                        AdultNeedsAny: [Songs.SONG_OF_TIME, Tricks.dampeSoTBlockClip.canDo]
                    },
                    "Grave Exit": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Grave Exit"]
                    }
                },
                ItemLocations: {
                    "3 Pots Left of Grave Entrance": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 79, y: 256, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are to the left of the spawn pad."
                    },
                    "3 Pots Right of Grave Entrance": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 116, y: 256, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are to the right of the spawn pad."
                    },
                    "Race Rupee 1": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 117, y: 182, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "From the start, follow the right wall to the rupee."
                    },
                    "4 Wonderitems by Race Rupee 1": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Green Rupee Wonderitems",
                        MapInfo: { x: 125, y: 190, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "From the start, follow the right wall past the visible item to get these wonderitems."
                    },
                    "Race Rupee 2": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 125, y: 152, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "The rupee is on the right after the second turn of the normal route."
                    },
                    "Wonderitem by Race Rupee 2": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 129, y: 152, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "The item is on the right after the second turn of the normal route. Continue past the visible item to get this wonderitem."
                    },
                    "Race Rupee 3": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 135, y: 58, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "Take the right path at the fork after the second turn - keep following the right wall for the rupee."
                    },
                    "Race Rupee 4": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 126, y: 19, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the first door, the rupee will be on the left."
                    },
                    "2 Wonderitems by Race Rupee 4": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Green Rupee Wonderitems",
                        MapInfo: { x: 117, y: 10, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the first door, the wonderitems will be down the corridor to the left."
                    },
                    "Race Rupee 5": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 173, y: 19, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocks, go down the left path for the rupee."
                    },
                    "Wonderitem by Race Rupee 5": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 183, y: 19, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocks, go down the left path for the rupee. Take a right after the visible item to get to the wonderitem."
                    },
                    "Race Rupee 6": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 220, y: 85, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocks, go straight, take a right, then follow the left wall to the rupee."
                    },
                    "2 Wonderitems by Race Rupee 6": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Green Rupee Wonderitems",
                        MapInfo: { x: 229, y: 85, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocks, go straight, take a right, then follow the left wall to the rupee. The two wonderitems are down both directions of the dead end area."
                    },
                    "Race Rupee 7": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 229, y: 122, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, follow the left wall to the rupee."
                    },
                    "4 Wonderitems by Race Rupee 7": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Green Rupee Wonderitems",
                        MapInfo: { x: 239, y: 132, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, follow the left wall to the loop containing the 4 wonderitems."
                    },
                    "Race Rupee 8": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 173, y: 160, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, at the ledges, climb up the left ledge for the rupee (watch out for the redead).",
                    },
                    "Wonderitem by Race Rupee 8": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Green Rupee Wonderitem",
                        MapInfo: { x: 165, y: 160, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, at the ledges, climb up the left ledge and go next to the redead for the wonderitem.",
                    },
                    "Hookshot Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 260, y: 247, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "This is the prize for completing the Dampe Race for the first time."
                    },
                    "Race Reward": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 267, y: 245, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "This is the prize for completing the Dampe Race in less than one minute."
                    }
                }
            },

            // Windmill
            windmillTop: {
                ExcludeFromSpawnList: true,
                Exits: {
                    windmill: {},
                    windmillItem: {}
                },
                ItemLocations: {}
            },
            windmillItem: {
                DisplayGroup: { groupName: "Windmill", imageName: "Windmill" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Heart Piece on Top": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 99, y: 144, floor: "WND" },
                        Age: Age.EITHER,
                        LongDescription: "As a child, you can get this with a well-aimed Boomerang. Use a well-aimed hookshot and jumpslash, or do a trick to jump to the platform."
                    }
                }
            },
            windmill: {
                DisplayGroup: { groupName: "Windmill", imageName: "Windmill" },
                
                Exits: {
                    windmillItem: {
                        ChildNeeds: [Items.BOOMERANG],
                        AdultNeeds: [Tricks.windmillHPWithNothing.canDo]
                    },
                    "Windmill Exit": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Windmill Exit"]
                    },
                    "Windmill Exit to Kakariko Village": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Windmill Exit to Kakariko Village"]
                    }
                },
                ItemLocations: {
                    "Song of Storms": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 266, y: 246, floor: "WND" },
                        Age: Age.ADULT,
                        LongDescription: "Take out your ocarina by the windmill guy to get this.",
                        Needs: [GameStateSets.CAN_PLAY_SONGS]
                    },
                    "Drain Well Water": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 244, y: 243, floor: "WND" },
                        MapImageName: "Song of Storms",
                        Age: Age.CHILD,
                        LongDescription: "Play the song of storms by the windmill guy to drain the well water.",
                        Needs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            // Potion shop
            kakPotionShop: {
                DisplayGroup: { groupName: "Potion Shop", imageName: "Potion Shop" },
                Exits: {
                    "Potion Shop Front": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Potion Shop Front"]
                    },
                    "Potion Shop Back": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Potion Shop Back"]
                    }
                },
                ItemLocations: {
                    "Shop": {
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 194, y: 146, floor: "POT" },
                        Age: Age.ADULT,
                        LongDescription: "This is the shop - only Adult can access it!"
                    }			
                }
            }
        }  
    },

    "Death Mountain Trail": {
		Abbreviation: "DMT",
		MapGroup: MapGroups.MOUNTAIN,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Lower Area", imageName: "Goron's Ruby" },
                Exits: {
                    upper: {
                        NeedsAny: [
                            ItemSets.BLAST_OR_SMASH_ITEMS,
                            BeanSets.DEATH_MOUNTAIN_TRAIL,
                            Tricks.dmtClimbWithHoverBoots.canDo,
                            Tricks.dmtTopWithHookshotJump.canDo,
                            ItemLocationSets.DMT_ROCKS_BLOCKING_TOP_PATH
                        ]
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Death Mountain Trail"]["Kakariko Village"]
                    },
                    "Goron City": {
                        OwExit: OwExits["Death Mountain Trail"]["Goron City"]
                    },
                    "Dodongo's Cavern": {
                        OwExit: OwExits["Death Mountain Trail"]["Dodongo's Cavern"]
                    },

                    // Interiors & Grottos
                    "Song of Storms Grotto near Goron City": {
                        OwExit: OwExits["Death Mountain Trail"]["Song of Storms Grotto near Goron City"]
                    }
                },
                ItemLocations: {
                    // Lower Area
                    "In Wall by Kakariko": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 151, y: 235 },
                        Age: Age.EITHER,
                        LongDescription: "From the Kakariko entrance, follow the right wall until you get to the discolored wall. Bomb or hammer it to reveal the skulltula. Child can Deku Stick jumpslash, Bomb, Bombchu, Slingshot, or Boomerang it. Adult can jumpslash it. You can climb the wall to collect the token.<br/><br/>" +
                            "<a href = 'https://youtu.be/gzQCfY-RK6E?si=CtJhJjOD5O61rlYv' target='_blank' title='Target the left side of the slanted wall closer to the center; ess left x6; run to corner (the center of your hat should be to the left of the corner of the wall); backflip x3; retarget; neutral roll x6; jumpslash (if using sword, quick draw first); hold up'>LUNGE STORAGE CHILD<br/>" +
                            "<a href = 'https://youtu.be/JB1TbNckk7k?si=y_yrQjvcAtS38BBJ' target='_blank' title='Target the left side of the slanted wall in the corner; sidehop right; retarget; dry roll; sidehop left; quick draw; jumpslash; hold up'>LUNGE STORAGE ADULT",
                            ChildNeedsAny: [
                                ItemSets.BLAST_OR_SMASH_ITEMS, 
                                [Tricks.lungeStorage.canDoWithQuickDraw, ItemSets.DISTANCE_DAMAGING_ITEMS]
                            ],
                            AdultNeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Tricks.lungeStorage.canDoWithQuickDraw]
                    },
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil Skulltula Always Killable",
                        MapInfo: { x: 179, y: 168 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil inside the entrance to Dodongo's Cavern (under the giant rock). Used to get to the top of the mountain. Use a bomb flower from above to kill the skulltula, if necessary.",
                        Needs: [ItemSets.EXPLOSIVES_OR_STRENGTH]
                    },
                    "Chest in Wall Near Goron City": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 212, y: 207 },
                        Age: Age.EITHER,
                        LongDescription: "If you take the left path out of Goron City, the wall to bomb or hammer will be to your right.",
                        NeedsAny: [
                            ItemSets.BLAST_OR_SMASH_ITEMS, 
                            Tricks.dmtClipToChestByGoron.canDo, 
                            Tricks.dmtBombFlowerChestByGoron.canDo
                        ],
                        TricksToShow: [Tricks.dmtClipToChestByGoron, Tricks.dmtBombFlowerChestByGoron]
                    },
                    "Red Rock by Goron City": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 215, y: 167 },
                        Age: Age.ADULT,
                        LongDescription: "At night, leave Goron City. Follow the right wall until you reach a red rock. Break it with your hammer to reveal the skulltula.",
                        TricksToShow: [Tricks.dmtSkullsWithoutHammer],
                        NeedsAny: [Items.MEGATON_HAMMER, Tricks.dmtSkullsWithoutHammer.canDo]
                    },
                    "Heart Piece Above Dodongo's Cavern": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 180, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "You can do a slight angled backflip near the Bomb Flower above the cavern to get to this. Alternatively, you can plant a bean and ride it up."
                    },

                    // Rocky Path
                    "Break Rocks Blocking Top Path":  {
                        DisplayGroup: { 
                            groupName: "Rocky Path", 
                            imageName: "Cow Grotto",
                            description: "Either climb the normal way passed the rocks, or use the hover boots or hookshot jump glitches.",
                            tricksToShow: [Tricks.dmtClimbWithHoverBoots, Tricks.dmtTopWithHookshotJump]
                        },
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 202, y: 201 },
                        MapImageName: "Bomb",
                        Age: Age.EITHER,
                        LongDescription: "Used for co-op. These are the rocks blocking the path to Death Mountain Crater.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS],
                        CoOpOnly: true
                    },
                    "Red Rupee in Rock by Cow Grotto": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Red Rupee",
                        MapInfo: { x: 206, y: 203 },
                        Age: Age.CHILD,
                        LongDescription: "As a child, this item is under the highest rock that's blocking access to the top of Death Mountain. You can snag it with the boomerang from the bottom with a good angle.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Tricks.boomerangThroughWalls.canDo]
                    },
                    "Blue Rupee in Rock Below Cow Grotto": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 190, y: 203 },
                        Age: Age.CHILD,
                        LongDescription: "As a child, this item is under the leftmost rock by the rocks blocking access to the top of Death Mountain. You can snag it with the boomerang if you stand far back enough on the platform.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, Tricks.boomerangThroughWalls.canDo]
                    }
                }
            },
            upper: {
                DisplayGroup: { 
                    groupName: "Upper Area", 
                    imageName: "Claim Check" ,
                    description: "Either climb the normal way passed the rocks, or use the hover boots or hookshot jump glitches.",
                    tricksToShow: [Tricks.dmtClimbWithHoverBoots, Tricks.dmtTopWithHookshotJump]
                },
                DuplicateWarpSongPriority: 1,
                Exits: {
                    main: {},
                    "Death Mountain Crater": {
                        OwExit: OwExits["Death Mountain Trail"]["Death Mountain Crater"]
                    },
                    "Owl": {
                        OwExit: OwExits["Death Mountain Trail"]["Owl"]
                    },

                    // Interiors & Grottos
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Death Mountain Trail"]["Great Fairy Fountain"]
                    },
                    "Cow Grotto": {
                        OwExit: OwExits["Death Mountain Trail"]["Cow Grotto"]
                    }
                },
                ItemLocations: {
                    // Upper Area
                    "Trade Biggoron": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.GIFT,
                        DefaultEntranceGroupName: "Trade Biggoron",
                        MapInfo: { x: 243, y: 28 },
                        Age: Age.ADULT,
                        LongDescription: "Show Biggoron (at the summit) the trade sequence item to get the check."
                    },

                    // Rocky Path
                    "Red Rock on Upper Path": {
                        DisplayGroup: { groupName: "Rocky Path", imageName: "Cow Grotto" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 217, y: 96 },
                        Age: Age.ADULT,
                        LongDescription: "At night, take the upper path of the mountain - the one that causes the volcano to erupt. The red rock has a skulltula in it - break it with your hammer.",
                        TricksToShow: [Tricks.dmtSkullsWithoutHammer],
                        NeedsAny: [Items.MEGATON_HAMMER, Tricks.dmtSkullsWithoutHammer.canDo]
                    },
                    "Gossip Stone on Climbable Wall Ledge": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 225, y: 52 },
                        Age: Age.EITHER,
                        LongDescription: "On your way up the mountain, this gossip stone is on one of the ledges you pass by when you climb up the wall."
                    }
                }
            }
		}
    },
    	
	"Death Mountain Crater": {
		Abbreviation: "DMC",
		MapGroup: MapGroups.MOUNTAIN,
		Regions: {
            top: {
                DisplayGroup: { groupName: "Upper Area", imageName: "Bomb" },
                Exits: {
                    middle: {
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    bottom: {
                        Needs: [Tricks.megaFlip.canDo]
                    },
                    scarecrowPlatform: {},
                    "Mountain Top": {
                        OwExit: OwExits["Death Mountain Crater"]["Mountain Top"]
                    },

                    // Interiors & Grottos
                    "Grotto in Center of Top Rocks": {
                        OwExit: OwExits["Death Mountain Crater"]["Grotto in Center of Top Rocks"]
                    }
                },
                ItemLocations: {
                    "Skulltula in Crate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 87, y: 250 },
                        Age: Age.CHILD,
                        LongDescription: "Enter from the top of Death Mountain Trail. Roll into the nearby crate to spawn this skulltula."
                    },
                    "Scrub by Ladder as Child": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 85, y: 195 },
                        Age: Age.CHILD,
                        LongDescription: "When you enter the crater, follow the left wall. The scrub is on the bottom of the ladder you'll run into."
                    },
                    "Heart Piece in Wall": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 186, y: 191 },
                        Age: Age.EITHER,
                        LongDescription: "At the top of the crater, you can climb down the wall that's facing the Fire Temple to receive this item - you'll start climbing if you backwalk off it."
                    },
                    "Gossip Stone Behind Bombable Wall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 284, y: 248 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is behind a bombable wall across a wooden bridge in the top area of the crater.",
                        Needs: [ItemSets.EXPLOSIVES]
                    }
                }
            },
            middle: {
                DisplayGroup: { groupName: "Middle Area", imageName: "Magic" },
                Exits: {
                    top: {},
                    bottom: {
                        NeedsAny: [Tricks.megaFlip.canDo, Items.HOOKSHOT, Equipment.HOVER_BOOTS]
                    },
                    volcano: {
                        NeedsAny: [Tricks.megaFlip.canDo, Tricks.hoverBootsToVolcanoHP.canDo]
                    },
                    "Goron City": {
                        OwExit: OwExits["Death Mountain Crater"]["Goron City"]
                    },

                    // Interiors & Grottos
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Death Mountain Crater"]["Great Fairy Fountain"]
                    },
                    "Grotto in Rock by Goron": {
                        OwExit: OwExits["Death Mountain Crater"]["Grotto in Rock by Goron"]
                    }
                },
                ItemLocations: {
                    "4 Pots Near Goron City": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 56, y: 85 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
                        LongDescription: "These pots are near the entrance to Goron City. If not shuffling empty pots, they only have items in them as Adult."
                    }
                }
            },
            bottom: {
                DisplayGroup: { groupName: "Lower Area", imageName: "Fire Medallion" },
                Exits: {
                    middle: {
                        Age: Age.ADULT,
                        NeedsAny: [BeanSets.DEATH_MOUNTAIN_CRATER, Items.HOOKSHOT, Equipment.HOVER_BOOTS]
                    },
                    volcano: {
                        Age: Age.ADULT,
                        Needs: [BeanSets.DEATH_MOUNTAIN_CRATER]
                    },
                    scarecrowPlatform: {
                        Age: Age.ADULT,
                        Needs: [GameStateSets.CAN_LONGSHOT_SCARECROW]
                    },
                    "Fire Temple": {
                        OwExit: OwExits["Death Mountain Crater"]["Fire Temple"]
                    },
                    "Bolero Teleport Pad": {
                        OwExit: OwExits["Death Mountain Crater"]["Bolero Teleport Pad"]
                    }
                },
                ItemLocations: {
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 177, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch by the Bolero of Fire warp point. Used to get to the heart piece on the volcano."
                    },
                    "Red Rupee on First Island": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Red Rupee",
                        MapInfo: { x: 235, y: 57 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, from the Bolero warp, make your way to the first tiny island across the wooden bridge for this item.",
                    },
                    "Rupee Circle on Second Island": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "Expensive Rupee Circle",
                        MapInfo: { x: 280, y: 80 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, from the bolero warp, make your way to the second tiny island across the wooden bridges for these items."
                    },
                    "Bolero of Fire": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 161, y: 84 },
                        Age: Age.ADULT,
                        LongDescription: "You will get this item as adult when you reach the part of the broken bridge that touches the land.",
                    }
                }
            },
            volcano: {
                DisplayGroup: { groupName: "Middle Area", imageName: "Magic" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Heart Piece on Volcano": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 134, y: 78 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        LongDescription: "Plant a bean in the soft soil by the Bolero warp point then ride it up to the volcano. You can also use hover boots near the entrance to Goron City to get it.",
                        TricksToShow: [Tricks.hoverBootsToVolcanoHP]
                    }
                }
            },
            scarecrowPlatform: {
                DisplayGroup: { groupName: "Upper Area", imageName: "Bomb" },
                ExcludeFromSpawnList: true,
                Exits: {
                    bottom: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT] // Longshot the wooden plank by the next platform
                    }
                },
                ItemLocations: {
                    "Rupee Circle on Scarecrow Platform": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "Rupee Circle",
                        MapInfo: { x: 283, y: 132 },
                        Age: Age.ADULT,
                        LongDescription: "From the top of the crater, cross the wooden bridge at the southeast. You can jump to the platform from there.<br/><br/>You can also get there from the bottom using a longshot and Scarecrow's Song from the second of the tiny islands you reach from the Bolero warp."
                    }
                }
            }
		}
    },
    
    "Goron City": {
		Abbreviation: "GORO",
		MapGroup: MapGroups.MOUNTAIN,
        _canStopAdultGoron: function(age) {
            return ItemData.canUseAny(age, [
                ItemSets.EXPLOSIVES_OR_STRENGTH, 
                Items.FAIRY_BOW,
                QPAItemSets.LEDGE_QPA,
                Tricks.stopAdultGoronWithFire.canDo
            ]);
        },
		Regions: {
            main: {
                DisplayGroup: { groupName: "Top Floor & Maze", imageName: "Megaton Hammer" },
                Exits: {
                    darunia: {
                        // Megasidehop glitch: https://youtu.be/tMSiqzY3E2o
                        // With chu: https://youtu.be/-WZITINbip0
                        ChildNeedsAny: [
                            Songs.ZELDAS_LULLABY, 
                            [Items.BOMB, Tricks.megaFlip.canDo] // Not sure how to do with Chu... it never works
                        ], 
                        AdultNeeds: [(age) => MapLocations["Goron City"]._canStopAdultGoron(age)]
                    },
                    lostWoodsRocks: {
                        NeedsAny: [
                            ItemLocationSets.ROCKS_BLOCKING_LOST_WOODS,
                            Items.FAIRY_BOW, 
                            Items.DINS_FIRE, 
                            Items.BLUE_FIRE, 
                            ItemSets.BLAST_OR_SMASH_ITEMS, 
                            Equipment.STRENGTH,
                            QPAItemSets.LEDGE_QPA
                        ]
                    },
                    spinningUrn: {
                        Age: Age.CHILD,
                        NeedsAny: [Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]
                    },
                    shop: {
                        ChildNeedsAny: [
                            ItemSets.MUD_WALL_ITEMS, 
                            ItemSets.FIRE_ITEMS, 
                            Equipment.STRENGTH, 
                            QPAItemSets.LEDGE_QPA
                        ],
                        AdultNeeds: [(age) => MapLocations["Goron City"]._canStopAdultGoron(age)]
                    },

                    // Top Floor
                    "Death Mountain Trail": {
                        OwExit: OwExits["Goron City"]["Death Mountain Trail"]
                    },

                    // Middle Floors
                    "Lava Room Grotto": {
                        OwExit: OwExits["Goron City"]["Lava Room Grotto"]
                    }
                },
                ItemLocations: {
                    // Top Floor
                    "Leftmost Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 71, y: 24 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
                        LongDescription: "Make your way to the topmost northwest corner of the city and bomb, pick up, or smash the rocks to get here. You can also go to the upper right corner, stand on the box, and backwalk & backflip with hover boots at the last moment to get to this chest (you will be stuck there).",
                        NeedsAny: [
                            Items.MEGATON_HAMMER, 
                            UpgradedItems.SILVER_GAUNTLETS, 
                            [Equipment.HOVER_BOOTS, ItemSets.EXPLOSIVES],
                            Tricks.weirdShot.canDo]
                    },
                    "Left Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 78, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS]
                    },
                    "Right Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 86, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS]
                    },
                    "Maze Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 95, y: 21 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this crate.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS]
                    },
                    "Skulltula in Maze Crate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 91, y: 25 },
                        Age: Age.CHILD,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb or hammer the rocks to get to the back right corner of the maze. Roll into the crate the get this skulltula.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS]
                    },
                    "Gossip Stone in Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 82, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this stone.",
                        NeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS]
                    },
                    "Skulltula on Center Platform": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 180, y: 137 },
                        Age: Age.ADULT,
                        LongDescription: "There's a skulltula on the back side of the center platform. You may have to jump for it from the ropes if you don't have a hookshot."
                    },

                    // Middle Floors
                    "3 Pots by Upper Staircase": {
                        DisplayGroup: { groupName: "Middle Floors", imageName: "Goron Tunic" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 79, y: 120 },
                        Age: Age.EITHER,
                        LongDescription: "From the upper exit, follow the left wall until you reach these pots."
                    },
                    "Stop Rolling Goron as Child": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 165, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "Blow up the rolling goron while he's in the tunnel and talk to him to get the item.",
                        Needs: [ItemSets.EXPLOSIVES]
                    },
                    "Stop Rolling Goron as Adult": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 139, y: 97 },
                        Age: Age.ADULT,
                        LongDescription: "Stop the rolling goron with a bomb, bombchu or bomb flower and talk to him to get the item. You can also shoot the bomb flowers with an arrow with the right timing to stop him.",
                        TricksToShow: [Tricks.stopAdultGoronWithFire],
                        Needs: [(age) => MapLocations["Goron City"]._canStopAdultGoron(age)]
                    },
                    "Pot by Medigoron": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 130, y: 243 },
                        Age: Age.EITHER,
                        LongDescription: "In the southern area of the middle floor, blow up the walls that has bombflowers near it. Eventually, you'll make it to Medigoron, where the pot is.",
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH, QPAItemSets.LEDGE_QPA]
                    },
                    "Item From Medigoron": {
                        ItemGroup: ItemGroups.GIFT,
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleExpensiveMerchants; },
                        MapInfo: { x: 117, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "Blow up/hammer the weak walls on the western side of the middle floor. Pay Medigoron 200 rupees for this item.",
                        Needs: [UpgradedItems.ADULTS_WALLET],
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH, QPAItemSets.LEDGE_QPA]
                    },
                    "Gossip Stone By Medigoron": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 115, y: 275 },
                        Age: Age.EITHER,
                        LongDescription: "In the southern area of the middle floor, blow up the walls that has bombflowers near it. Eventually, you'll make it to Medigoron, where the stone is.",
                        NeedsAny: [ItemSets.MUD_WALL_ITEMS, Equipment.STRENGTH, QPAItemSets.LEDGE_QPA]
                    },

                    // Bottom Floor
                    "2 Pots by Lower Staircase": {
                        DisplayGroup: { groupName: "Bottom Floor & Darunia", imageName: "Happy Goron" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 189, y: 199 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are just after the first set of stairs at the bottom of the city."
                    }
                }
            },
            darunia: {
                DisplayGroup: { 
                    groupName: "Bottom Floor & Darunia", 
                    imageName: "Happy Goron",
                    description: "MEGA SIDEHOP FROM MAIN:\x0A- BOMB: Target the right wall before the tunnel; sidehop right + sideroll; turn 180; line up so the middle of your head is just to the left of the darker texture; backflip x1; backflip again, shield drop bomb in the air; megasidehop left\x0A- CHU: Line up between the two leftmost fenceposts; turn left; sidehop right; sideroll; turn 180; megasidehop"
                },
                Exits: {
                    main: {},
                    spinningUrn: {
                        Needs: [Items.DEKU_STICK]
                    },
                    lostWoodsRocks: {
                        Age: Age.CHILD, // The stick won't last all the way, no torches as adult
                        Needs: [Items.DEKU_STICK]
                    },
                    shop: {
                        Age: Age.CHILD,
                        Needs: [Items.DEKU_STICK]
                    },
                    "Death Mountain Crater": {
                        OwExit: OwExits["Goron City"]["Death Mountain Crater"]
                    }
                },
                ItemLocations: {
                    "Darunia's Joy": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 187, y: 30 },
                        Age: Age.CHILD,
                        LongDescription: "At the bottom of Goron City on the fancy carpet, play Zelda's Lullaby. If you can manage to get to the Goron City entrance from the crater, that works too. Inside, play Saria's Song by Darunia get an item.",
                        Needs: [Songs.SARIAS_SONG]
                    },
                    "3 Pots by Darunia": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 204, y: 39 },
                        Age: Age.EITHER,
                        LongDescription: "Child: at the bottom of Goron City on the fancy carpet, play Zelda's Lullaby. Adult: stop the rolling goron to open the way here. Either: if you can manage to get to the Goron City entrance from the crater, that works too. The pots are on the tables against the wall."
                    }
                }
            },
            lostWoods: {
                DisplayGroup: { groupName: "Middle Floors", imageName: "Goron Tunic" },
                Exits: {
                    lostWoodsRocks: {
                        NeedsAny: [
                            ItemLocationSets.ROCKS_BLOCKING_LOST_WOODS,
                            ItemSets.BLAST_OR_SMASH_ITEMS, 
                            Items.DINS_FIRE
                        ]
                    },
                    "Lost Woods": {
                        OwExit: OwExits["Goron City"]["Lost Woods"]
                    }
                },
                ItemLocations: {}
            },
            lostWoodsRocks: {
                DisplayGroup: { groupName: "Middle Floors", imageName: "Goron Tunic" },
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {},
                    lostWoods: {}
                },

                ItemLocations: {
                    "Rocks Blocking Lost Woods": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 212, y: 178 },
                        MapImageName: "Bomb",
                        Age: Age.EITHER,
                        LongDescription: "These are the rocks blocking the Lost Woods entrance. Either blow them up (you can shoot the right one with a bow), or use a deku stick lit on fire to activate the nearby bomb flowers."
                    }
                }
            },
            spinningUrn: {
                DisplayGroup: { groupName: "Bottom Floor & Darunia", imageName: "Happy Goron" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Spinning Urn Heart Piece": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 189, y: 126 },
                        Age: Age.CHILD,
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.rupeeAndHeartSetting == ShuffleLocationSettings.OFF ||
                                Settings.RandomizerSettings.rupeeAndHeartSetting == ShuffleLocationSettings.DUNGEON_ONLY;
                        },
                        LongDescription: "First, light the torches at the bottom of the city. You can either use the lit torch in Darunia's room, or Din's Fire. After that, throw a Bomb or Bomb Flower so that the urn stops on the happiest face to get the item.",
                        TricksToShow: [Tricks.goronUrnWithChus],
                        NeedsAny: [Items.BOMB, Equipment.STRENGTH, Tricks.goronUrnWithChus.canDo]
                    },
                    "9 Items From Spinning Urn": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "Spinning Pot",
                        MapInfo: { x: 189, y: 135 },
                        Age: Age.CHILD,
                        LongDescription: "First, light the torches at the bottom of the city. You can either use the lit torch in Darunia's room, or Din's Fire. After that, throw a Bomb or Bomb Flower so that the urn stops on the face you want.",
                        TricksToShow: [Tricks.goronUrnWithChus],
                        NeedsAny: [Items.BOMB, Equipment.STRENGTH, Tricks.goronUrnWithChus.canDo]
                    }
                }
            },
            shop: {
                DisplayGroup: { groupName: "Bottom Floor & Darunia", imageName: "Happy Goron" },
                Exits: {
                    main: {},

                    // Interiors & Grottos
                    "Shop": {
                        OwExit: OwExits["Goron City"]["Shop"]
                    }
                },
                ItemLocations: {}
            }
		}
    },
    
	"Zora's River": {
		Abbreviation: "RIVR",
		MapGroup: MapGroups.WATER,
		Regions: {
            downstream: {
                DisplayGroup: { groupName: "Before Rocks", imageName: "Bomb" },
                Exits: {
                    upstream: {
                        ChildNeedsAny: [ItemSets.BLAST_OR_SMASH_ITEMS, ItemLocationSets.ROCKS_BLOCKING_ZORAS_RIVER]
                    },
                    "Hyrule Field": {
                        OwExit: OwExits["Zora's River"]["Hyrule Field"]
                    }
                },
                ItemLocations: {
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 9, y: 177 },
                        Age: Age.CHILD,
                        LongDescription: "Enter the river from Hyrule Field. The skulltula will appear if you roll into the tree that's straight ahead."
                    },
                    "Break Rocks Blocking Path": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 23, y: 169 },
                        MapImageName: "Bomb",
                        Age: Age.CHILD,
                        LongDescription: "Used for co-op. These are the rocks blocking the entrance to Zora's River.",
                        Needs: [ItemSets.BLAST_OR_SMASH_ITEMS],
                        CoOpOnly: true
                    },
                    "4 Wonderitems in River by Hyrule Field": {
                        DisplayGroup: { groupName: "River Rupees", imageName: "Green Rupee Wonderitem" },
                        Order: 5,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Green Rupee Wonderitems",
                        MapInfo: { x: 36, y: 193 },
                        Age: Age.CHILD,
                        LongDescription: "Jump in the water by the mini waterfall and proceed down the center of the river to get these wonderitems."
                    }
                }
            },
            upstream: {
                DisplayGroup: { groupName: "Main Area", imageName: "Magic Bean" },
                DuplicateWarpSongPriority: 1,
                Exits: {
                    downstream: {},
                    inWaterfall: {
                        NeedsAny: [
                            Songs.ZELDAS_LULLABY,
                            Tricks.cuccoToZorasDomain.canDo,
                            Tricks.hoverBootsToZorasDomain.canDo,
                            Tricks.megasidehopToZorasDomain.canDo
                        ]
                    },

                    // Main Area
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Zora's River"]["Song of Storms Grotto"]
                    },

                    // On Cliff
                    "Open Grotto on Upper Cliff": {
                        OwExit: OwExits["Zora's River"]["Open Grotto on Upper Cliff"]
                    },
                    "Grotto Under Rock on Upper Cliff": {
                        OwExit: OwExits["Zora's River"]["Grotto Under Rock on Upper Cliff"]
                    },

                    // By Waterfall
                    "Lost Woods": {
                        OwExit: OwExits["Zora's River"]["Lost Woods"]
                    }
                },
                ItemLocations: {
                    // Main Area
                    "Bean Guy": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 72, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "This is the guy who sells beans near the Hyrule Field entrance."
                    },
                    "Plant Bean by Bean Guy": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 72, y: 142 },
                        Age: Age.CHILD,
                        RequiredToAppear: () => !SettingSets.AUTO_PLANT_BEANS(),
                        LongDescription: "This is the bean spot by the guy who sells beans. It's only used for convenience sake.",
                        Needs: [Items.MAGIC_BEAN]
                    },
                    "Heart Piece on River Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 125, y: 94 },
                        Age: Age.EITHER,
                        LongDescription: "In the middle of the map, there's a heart piece on a high up platform. You can get this as a child using cuccos to fly to the platform.<br/><br/>As adult, you can use hover boots from the cliff that you take a ladder to get up.<br/><br/>To megaflip there: from the top with the gossip stone, go to the edge of the cliff and C-Up to face the item. Backflip and turn around. Megaflip from this spot and let go of all buttons.",
                        AdultNeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    "Frog Songs": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.GIFT,
                        DefaultEntranceGroupName: "Frogs",
                        MapInfo: { x: 155, y: 102 },
                        Age: Age.CHILD,
                        LongDescription: "All the items you get from the frogs near the middle of the map."
                    },

                    // On Cliff
                    "Skulltula on Cliff": {
                        DisplayGroup: { groupName: "On Cliff", imageName: "Super Cucco Minigame" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 132, y: 153 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go up the ladder closest to Hyrule Field. Jump to the cliff behind you to find the skulltula.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Gossip Stone on Cliff": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 155, y: 176 },
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. The stone is across the tiny bridge."
                    },

                    // By Waterfall
                    "Skulltula on Ladder": {
                        DisplayGroup: { groupName: "By Waterfall", imageName: "Zelda's Lullaby" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 281, y: 142 },
                        Age: Age.CHILD,
                        LongDescription: "At night, make your way to the end of the river. You'll find the skulltula on the ladder leading up out of the water."
                    },
                    "Skulltula by Bridge": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 249, y: 62 },
                        Age: Age.ADULT,
                        LongDescription: "At night, a little after the wooden bridge leading to Zora's Domain, you'll find a skulltula high up on the wall. You can get it with the hookshot if you stand on the fence.",
                        Needs: [Items.HOOKSHOT]
                    },
                    "Heart Piece by Zora's Domain": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 266, y: 56 },
                        Age: Age.EITHER,
                        LongDescription: "At the end of the river, there's a heart piece on a platform. As child, you can jump there with a cucco or nab it with a Boomerang. As adult, you must use the Hover Boots.",
                        TricksToShow: [Tricks.adultWaterfallHPJump],
                        AdultNeedsAny: [
                            Equipment.HOVER_BOOTS, 
                            Tricks.adultWaterfallHPJump.canDo, 
                            Tricks.megaFlip.canDoWithChu
                        ]
                    },
                    "4 Red Rupees by Waterfall": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "4 Red Rupees",
                        MapInfo: { x: 308, y: 158 },
                        Age: Age.ADULT,
                        LongDescription: "These rupees are under the water next to the waterfall. You can jump from the Zelda's Lullaby spot to get them (adjust your position to get each one), though it's easiest with the iron boots."
                    },
                    "Gossip Stone by Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 300, y: 145 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on one of the platforms in the water by the Zora's Domain entrance."
                    },

                    // River Rupees
                    "4 Wonderitems in River by Zora's Domain": {
                        DisplayGroup: { groupName: "River Rupees", imageName: "Green Rupee Wonderitem" },
                        Order: 1,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Green Rupee Wonderitems",
                        MapInfo: { x: 233, y: 92 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are in the river near Zora's Domain. You will get them all before you reach the wooden bridge."
                    },
                    "6 Wonderitems After Underwater Rocks": {
                        Order: 2,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "6 Green Rupee Wonderitems",
                        MapInfo: { x: 159, y: 148 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are after the underwater rocks just after you fall down the first mini waterfall. You will get them all before falling down the next mini waterfall."
                    },
                    "3 Wonderitems After Platform Ladder": {
                        Order: 3,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Green Rupee Wonderitems",
                        MapInfo: { x: 117, y: 151 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are in the mini coordidor after you fall down the waterfall near the ladder leading to the upper cliffs. You will get all of them before you fall down the next mini waterfall."
                    },
                    "3 Wonderitems Near Bean Salesman": {
                        Order: 4,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Green Rupee Wonderitems",
                        MapInfo: { x: 55, y: 155 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are in the river near the bean salesman. You will get them all before falling down to the first area. Note that you will be forced to fall, so make sure not to get trapped!"
                    },
                    "7 Wonderitems Near Frogs": {
                        Order: 6,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "7 Green Rupee Wonderitems",
                        MapInfo: { x: 132, y: 115 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are in the river near the frogs. The first three are down the stream near where the river splits from the platform ladder. One is between a couple of the bigger platforms. Two are on either side of the square platform. The final one is just before you fall down the mini waterfall."
                    },
                    "4 Wonderitems in Fast Stream After Frogs": {
                        Order: 7,
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "4 Green Rupee Wonderitems",
                        MapInfo: { x: 100, y: 133 },
                        Age: Age.CHILD,
                        LongDescription: "These wonderitems are the three you get after falling down the mini waterfall near the frog area. You'll get them all before meeting up with the main river."
                    }
                }
            },

            inWaterfall: {
                DuplicateWarpSongPriority: 2,
                Exits: {
                    upstream: {},

                    "Zora's Domain": {
                        OwExit: OwExits["Zora's River"]["Zora's Domain"]
                    }
                },
                ItemLocations: {}
            }
		}
	},

	"Zora's Domain": {
		Abbreviation: "DOMN",
		MapGroup: MapGroups.WATER,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Bottom Area", imageName: "3 Pots" },
                DuplicateWarpSongPriority: 1,
                Exits: {
                    behindKing: {
                        ChildNeedsAny: [
                            ItemLocationSets.MOVE_KING_ZORA,
                            Items.RUTOS_LETTER,
                            SettingSets.OPEN_ZORAS_FOUNTAIN,
                            Tricks.childKingZoraSkip.canDo
                        ],
                        AdultNeedsAny: [
                            ItemLocationSets.MOVE_KING_ZORA,
                            SettingSets.OPEN_ADULT_ZORAS_FOUNTAIN,
                            Tricks.adultKingZoraSkip.canDo
                        ]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Zora's Domain"]["Zora's River"]
                    },
                    "Lake Hylia": {
                        OwExit: OwExits["Zora's Domain"]["Lake Hylia"]
                    },

                    // Grottos & Interiors
                    "Shop": {
                        OwExit: OwExits["Zora's Domain"]["Shop"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Zora's Domain"]["Song of Storms Grotto"]
                    }
                },
                ItemLocations: {
                    // Bottom Area
                    "2 Pots in Front of Shop": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 244, y: 260 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are right in front of the shop entrance."
                    },
                    "3 Pots Right of Shop": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 201, y: 260 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are just to the right of the shop entrance."
                    },

                    // Top Area
                    "Move King Zora": {
                        DisplayGroup: { groupName: "By King Zora", imageName: "Ruto's Letter" },
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 232, y: 38 },
                        MapImageName: "Ruto's Letter",
                        Needs: [Items.RUTOS_LETTER],
                        Age: Age.CHILD,
                        LongDescription: "Show Ruto's letter to the king."
                    },
                    "Gossip Stone by King": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 239, y: 63 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the water in front of the king."
                    },
                    "Left Beehive by King": {
                        ItemGroup: ItemGroups.BEEHIVE,
                        IsUpperHive: true,
                        MapInfo: { x: 215, y: 85 },
                        Age: Age.CHILD,
                        LongDescription: "Look on the left side of the room on the ceiling for this beehive. If using a chu, go to the wall by the diving minigame tunnel and drop it on the black after the 4th red flash."
                    },
                    "Right Beehive by King": {
                        ItemGroup: ItemGroups.BEEHIVE,
                        IsUpperHive: true,
                        MapInfo: { x: 262, y: 74 },
                        Age: Age.CHILD,
                        LongDescription: "Look on the right side of the room on the ceiling for this beehive. If using a chu, go to the wall slightly up the ramp that's lined up with the hive - then go a little bit more left (not too precise). Drop it on the black after the 4th red flash."
                    },
                    "Thaw King Zora": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 245, y: 48 },
                        Age: Age.ADULT,
                        LongDescription: "Dump Blue Fire on the frozen King Zora to thaw him. Talk to him from the platform in front of him and he will give you an item.<br/><br/>You can also use any item that link takes out above his head (or Nayru's Love/bugs/fish) to thaw him. Backwalk up the stairs, then take out the item after the black loading zone. Turn around and he should be thawed.",
                        TricksToShow: [Tricks.thawKingZoraWithoutBlueFire],
                        NeedsAny: [ItemSets.BLUE_FIRE_ITEMS, Tricks.thawKingZoraWithoutBlueFire.canDo]
                    },
                    "Show Prescription to King Zora": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 229, y: 48 },
                        MapImageName: "Prescription",
                        Age: Age.ADULT,
                        LongDescription: "After thawing King Zora, show him the prescription to get an item.",
                        Needs: [AdultTradeItems.PRESCRIPTION],
                        NeedsAny: [ItemSets.BLUE_FIRE_ITEMS, Tricks.thawKingZoraWithoutBlueFire.canDo]
                    },
                    "Skulltula on Top of Waterfall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 168, y: 68 },
                        Age: Age.ADULT,
                        LongDescription: "At night, make your way up to where the Diving Game start was. On the side of the wall by the waterfall, you'll find a skulltula. If you have no hookshot, you can kill it with a bow or Din's fire and get it with an angled jump. If you fall without getting it, it will respawn.",
                        TricksToShow: [Tricks.domainSkullWithJumpslash],
                        NeedsAny: [
                            ItemSets.GRAB_SHORT_DISTANCE_ITEMS, 
                            Items.FAIRY_BOW, 
                            Items.DINS_FIRE,
                            Tricks.domainSkullWithJumpslash.canDo
                        ]
                    },

                    // Top to Bottom Errands
                    "Torch Run": {
                        DisplayGroup: { groupName: "Top to Bottom Errands", imageName: "Silver Scale" },
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 154, y: 132 },
                        Age: Age.CHILD,
                        LongDescription: "Start at King Zora. Light a Deku Stick on one of the torches and make your way down the stairs. Light the next torch. Follow the left wall, lighting the torches as you go. Once you light the ones in the waterfall, a chest will spawn.",
                        Needs: [Items.DEKU_STICK]
                    },
                    "Diving Minigame": {
                        ItemGroup: ItemGroups.GIFT,
                        MapImageName: "Silver Scale",
                        MapInfo: { x: 158, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At the top of the Domain, pay 20 rupees to play the diving minigame. Talk to the Zora after you win to get your prize."
                    }
                }
            },

            behindKing: {
                DisplayGroup: { groupName: "By King Zora", imageName: "Ruto's Letter" },
                Exits: {
                    main: {
                        Needs: [ItemLocationSets.MOVE_KING_ZORA]
                    },
                    "Zora's Fountain": {
                        OwExit: OwExits["Zora's Domain"]["Zora's Fountain"]
                    }
                },
                ItemLocations: {
                    "Beehive Behind King": {
                        ItemGroup: ItemGroups.BEEHIVE,
                        IsUpperHive: true,
                        MapInfo: { x: 236, y: 28 },
                        Age: Age.CHILD,
                        LongDescription: "This beehive is behind the king on the ceiling. If using a chu, go to the closer wall and drop the chu on the 5th red flash."
                    }
                }
            }
		}
	},

	"Zora's Fountain": {
		Abbreviation: "FNTN",
		MapGroup: MapGroups.WATER,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Land Area", imageName: "Zora's Sapphire" },
                Exits: {
                    hiddenTunnel: {
                        Age: Age.ADULT,
                        NeedsAny: [
                            [ItemSets.BLAST_OR_SMASH_ITEMS, UpgradedItems.SILVER_GAUNTLETS],
                            Tricks.weirdShot.canDoWithLongshot]
                    },

                    // Land Area
                    "Zora's Domain": {
                        OwExit: OwExits["Zora's Fountain"]["Zora's Domain"]
                    },
                    "Jabu Jabu's Belly": {
                        OwExit: OwExits["Zora's Fountain"]["Jabu Jabu's Belly"]
                    },
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Zora's Fountain"]["Great Fairy Fountain"]
                    },

                    // Deep Water
                    "Ice Cavern": {
                        OwExit: OwExits["Zora's Fountain"]["Ice Cavern"]
                    }
                },

                ItemLocations: {
                    // Land Area
                    "Gossip Stone Left of Jabu Platform": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 122, y: 51 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is to the left of the Jabu Jabu platform."
                    },
                    "4 Pots by Jabu": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 125, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are on the corners of the platform by the entrance to Jabu Jabu's Belly."
                    },
                    "Skulltula on Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 81, y: 177 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you'll find this skulltula on the wall by the giant log.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 257, y: 234 },
                        Age: Age.CHILD,
                        LongDescription: "Go to the southeast corner of the map. Roll into the tree to find this skulltula. Use a pot near Jabu to kill it if you don't have a weapon.",
                        OverrideItemGroupCondition: true,
                    },
                    "Gossip Stone by Fairy Fountain": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 283, y: 232 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the land near the fairy fountain entrance."
                    },

                    // Deep Water
                    "Heart Piece on Iceberg": {
                        DisplayGroup: { groupName: "Deep Water", imageName: "Iron Boots" },
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 257, y: 111 },
                        Age: Age.ADULT,
                        LongDescription: "This heart piece is on an ice berg in the middle of the lake. You can get it without jumping to it if you climb one of the sides, then spam B to jumpslash onto it. Just make sure you're on a side where you aren't being attacked!"
                    },
                    "Heart Piece in Lake": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 209, y: 137 },
                        Age: Age.ADULT,
                        LongDescription: "Use your iron boots to sink to the middle of the lake. Note that walking down is faster than sinking down! Same applies for going back up.",
                        Needs: [Equipment.IRON_BOOTS]
                    },
                    "18 Underwater Green Rupees": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "18 Green Rupees",
                        MapInfo: { x: 235, y: 137 },
                        Age: Age.ADULT,
                        Needs: [Equipment.IRON_BOOTS],
                        LongDescription: "Use your Iron Boots to search the bottom of the fountain for these 18 items.",
                    }
                }
            },
            hiddenTunnel: {
                DisplayGroup: { groupName: "Hidden Tunnel", imageName: "Silver Gauntlets" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "3 Pots in Hidden Tunnel": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 266, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "Go to the southeast corner of the map. Pick up the silver rock and drop down. You should now be next to the pots.",
                    },
                    "Skulltula in Hidden Tunnel": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 312, y: 154 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go to the southeast corner of the map. Pick up the silver rock and go down the path. Beware of invisible giant skulltulas! You'll find the skulltula you want after you climb the wall.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            }
		}
	},
	
	"Lake Hylia": {
		Abbreviation: "LAKE",
		MapGroup: MapGroups.WATER,
		Regions: {
			main: {
                DisplayGroup: { groupName: "Main Area & Pond", imageName: "Fishing Pond" },
                Exits: {
                    // Main Area & Pond
                    "Hyrule Field": {
                        OwExit: OwExits["Lake Hylia"]["Hyrule Field"]
                    },
                    "Lakeside Lab": {
                        OwExit: OwExits["Lake Hylia"]["Lakeside Lab"]
                    },
                    "Fishing Pond": {
                        OwExit: OwExits["Lake Hylia"]["Fishing Pond"]
                    },

                    // Shallow Water
                    "Zora's Domain": {
                        OwExit: OwExits["Lake Hylia"]["Zora's Domain"]
                    },

                    // Islands
                    "Owl": {
                        OwExit: OwExits["Lake Hylia"]["Owl"]
                    },
                    "Water Temple": {
                        OwExit: OwExits["Lake Hylia"]["Water Temple"]
                    },
                    "Serenade Teleport Pad": {
                        OwExit: OwExits["Lake Hylia"]["Serenade Teleport Pad"]
                    },
                    "Grotto Under Grave": {
                        OwExit: OwExits["Lake Hylia"]["Grotto Under Grave"]
                    }
                },
                ItemLocations: {
                    // Main Area & Pond
                    "Play Song for Bonooru": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 199, y: 63 },
                        MapImageName: "Scarecrow's Song",
                        Age: Age.CHILD,
                        LongDescription: "Take out the ocarina (OI works) by the lower scarecrow and play it a song that has at least two different pitches.",
                        RequiredToAppear: function() { return !Songs.SCARECROWS_SONG.playerHas; },
                        Needs: [GameStateSets.CAN_PLAY_SONGS, () => ItemData.getNumberOfOcarinaButtons() >= 2]
                    },
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 106, y: 71 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch near the Lakeside Lab. Used to get to the top of the lab and to the fishing pond."
                    },
                    "Skulltula on Lab": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 104, y: 89 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Lakeside Lab that's nearest the bridge. You can actually jumpslash to the token from the bridge if you don't have the boomerang.",
                        NeedsAny: [Items.BOOMERANG, ItemSets.SWORDS]
                    },
                    "Claim Scarecrow's Song": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 199, y: 63 },
                        MapImageName: "Scarecrow's Song",
                        Age: Age.ADULT,
                        LongDescription: "Take out the ocarina (OI works) by the lower scarecrow and play it the last song you taught it as Child.",
                        RequiredToAppear: function() { return !Songs.SCARECROWS_SONG.playerHas; },
                        Needs: [ItemLocationSets.PLAY_SONG_FOR_BONOORU]
                    },
                    "Heart Piece on Lab": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 111, y: 67 },
                        Age: Age.ADULT,
                        LongDescription: "The goal here is to get to the top of the Lakeside Lab. Either ride the bean plant up, or play Scarecrow's Song and hookshot it. Afterward, climb the ladder to get to the item. Watch out for the Guays!",
                        NeedsAny: [GameStateSets.CAN_HOOK_SCARECROW, BeanSets.LAKE_HYLIA]
                    },
                    "Gossip Stone by Lab and Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 74, y: 74 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is across the little bridge near the lab."
                    },

                    // Shallow Water
                    "Green Rupee Near Shore": {
                        DisplayGroup: { groupName: "Shallow Water", imageName: "Ruto's Letter" },
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 171, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "This item is by the entrance to Zora's Domain - you can dive to get it without a scale.",
                    },
                    "2 Green Rupees in Deeper Water": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 169, y: 105 },
                        Age: Age.CHILD,
                        Needs: [UpgradedItems.SILVER_SCALE],
                        LongDescription: "These items are by the entrance to Zora's Domain - you need a scale to be able to reach them."
                    },
                    "Ruto's Letter": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 171, y: 116 },
                        Age: Age.CHILD,
                        LongDescription: "You'll find this item in the water near the entrance to Zora's Domain. Navi will fly to it when you're close.",
                        Needs: [Equipment.SCALE]
                    },

                    // Islands
                    "Skulltula on Island": {
                        DisplayGroup: { groupName: "Islands", imageName: "Water Medallion" },
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 252, y: 232 },
                        Age: Age.CHILD,
                        LongDescription: "At night, proceed to the far island in the lake. This is the one even passed the one with the tree. You should see the skulltula on one of the pillars."
                    },
                    "Skulltula on Middle Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 198, y: 213 },
                        Age: Age.ADULT,
                        LongDescription: "At night, longshot all the way up the tree on the middle island. You'll find the skulltula on top.",
                        TricksToShow: [Tricks.skullInTreeWithHookshot],
                        NeedsAny: [UpgradedItems.LONGSHOT, Tricks.skullInTreeWithHookshot.canDo]
                    },
                    "Fire Arrows": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 247, y: 236 },
                        Age: Age.ADULT,
                        LongDescription: "First, get to the platform in the center of the lake - the one with the tree. When the sun is just coming up, stand on the sign and shoot an arrow at it. The item should then spawn. You can get over there either by beating Morpha and swimming there, or by playing Scarecrow's Song and longshotting it.",
                        Needs: [Items.FAIRY_BOW],
                        NeedsAny: [GameStateSets.CAN_LONGSHOT_SCARECROW, ItemLocationSets.DEFEATED_MORPHA]
                    },
                    "Southwest Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 100, y: 237 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the wall in the southwest corner of the lake."
                    },
                    "Southeast Gossip Stone": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 289, y: 231 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the wall in the southeast corner of the lake."
                    }
                }
            }
		}
    },
    
	"Gerudo Valley": {
		Abbreviation: "GVAL",
		MapGroup: MapGroups.DESERT,
		Regions: {
            main: {
                DisplayGroup: { groupName: "Hyrule Field Side", imageName: "Kokiri Sword" },
                Exits: {
                    acrossBridge: {
                        ChildNeedsAny: [
                            Tricks.staircaseHover.canDo, 
                            Tricks.megaFlip.canDoWithChu,
                            Tricks.cuccoJump.canDo],
                        AdultNeedsAny: [
                            SettingSets.OPEN_GERUDO_FORTRESS,
                            UpgradedItems.LONGSHOT,
                            ItemLocationSets.ITEM_FROM_GERUDO,
                            GameStateSets.CAN_RIDE_EPONA,
                            Tricks.gvCrossBridgeWithHookshot.canDo,
                            Tricks.bombSuperslide.canDoWithHoverBoots,
                            Tricks.hammerHoverBootsSuperslide.canDo]
                    },
                    chasmSilverRockLedge: {},
                    chasmCrateLedge: {
                        AdultNeedsAny: [
                            UpgradedItems.LONGSHOT,
                            Tricks.bombSuperslide.canDoWithHoverBoots,
                            Tricks.hammerHoverBootsSuperslide.canDo] 
                    },
                    chasm: {},
                    "Hyrule Field": {
                        OwExit: OwExits["Gerudo Valley"]["Hyrule Field"]
                    }
                },
                ItemLocations: {
                    "Skulltula by Tiny Waterfall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        Order: 1,
                        MapInfo: { x: 264, y: 56 },
                        Age: Age.CHILD,
                        LongDescription: "At night, look to the right of the first tiny bridge by the tiny waterfall. The skulltula is by the water source.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            acrossBridge: {
                DisplayGroup: { 
                    groupName: "Gerudo Fortress Side", 
                    imageName: "Gerudo Mask",
                    description: "CHU MEGAFLIP (CHILD): Backflip once from the right side of the gate; turn around and megaflip"
                },
                Exits: {
                    main: {
                        AdultNeedsAny: [
                            SettingSets.OPEN_GERUDO_FORTRESS,
                            UpgradedItems.LONGSHOT,
                            ItemLocationSets.ITEM_FROM_GERUDO,
                            GameStateSets.CAN_RIDE_EPONA,
                            Tricks.gvCrossBridgeWithHookshot.canDo,
                            Tricks.bombSuperslide.canDoWithHoverBoots,
                            Tricks.hammerHoverBootsSuperslide.canDo
                        ]
                    },
                    chasmSilverRockLedge: {
                        Needs: [Tricks.megaFlip.canDo]
                    },
                    chasmCrateLedge: {
                        NeedsAny: [UpgradedItems.LONGSHOT, Tricks.megaFlip.canDo]
                    },
                    chasm: {},
                    "Gerudo Fortress": {
                        OwExit: OwExits["Gerudo Valley"]["Gerudo Fortress"]
                    },

                    // Grottos & Interiors
                    "Song of Storms Grotto Behind Tent": {
                        OwExit: OwExits["Gerudo Valley"]["Song of Storms Grotto Behind Tent"]
                    },
                    "Tent": {
                        OwExit: OwExits["Gerudo Valley"]["Tent"]
                    }
                },
                ItemLocations: {
                    "Chest Behind Rocks": {
                        ItemGroup: ItemGroups.CHEST,
                        Order: 6,
                        MapInfo: { x: 131, y: 120 },
                        Age: Age.ADULT,
                        LongDescription: "Across the bridge, there are some rocks to the right. Use your hammer on them to reveal the chest.",
                        NeedsAny: [Items.MEGATON_HAMMER, Tricks.weirdShot.canDo]
                    },
                    "Show Poacher's Saw to Carpenter": {
                        ItemGroup: ItemGroups.GIFT,
                        Order: 1,
                        MapInfo: { x: 135, y: 91 },
                        MapImageName: "Poacher's Saw",
                        Age: Age.ADULT,
                        LongDescription: "Show the carpenter boss (in front of the tent) the Poacher's Saw to receive an item.",
                        Needs: [AdultTradeItems.POACHERS_SAW],
                        PostObtain: function(playerHas, skipSocketUpdate) {
                            let otherItemLocation = MapLocations["Kakariko Village"].Regions.main.ItemLocations["Show Poacher's Saw to Carpenter"];
                            Data.setItemObtained(otherItemLocation, playerHas, true);

                            if (skipSocketUpdate) {
                                SocketClient.itemLocationUpdated(otherItemLocation);
                            }
                        }
                    },
                    "Skulltula on Pillar": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        Order: 5,
                        MapInfo: { x: 144, y: 103 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula high up on the pillar near the rocks to the left side of the area across the bridge.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },
                    "Skulltula Behind Tent": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        Order: 4,
                        MapInfo: { x: 144, y: 46 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula on the wall behind the tent.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            chasmSilverRockLedge: {
                DisplayGroup: { groupName: "Hyrule Field Side", imageName: "Kokiri Sword" },
                ExcludeFromSpawnList: true,
                Exits: {
                    chasm: {},

                    // Grottos & Interiors
                    "Grotto Under Silver Rock": {
                        OwExit: OwExits["Gerudo Valley"]["Grotto Under Silver Rock"]
                    },
                },
                ItemLocations: {}
            },
            chasmCrateLedge: {
                DisplayGroup: { groupName: "Chasm Crate Platform", imageName: "Crate" },
                ExcludeFromSpawnList: true,
                Exits: {
                    chasm: {}
                },
                ItemLocations: {
                    "Heart Piece in Crate": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 172, y: 173 },
                        Age: Age.EITHER,
                        LongDescription: "The crate is on a ledge on the left side of the ravine. Grab a cucco and jump across to the crate. If you're fast, you can grab the cucco after you get the item and use it to get the waterfall item as well.<br /><br />As an adult, you can longshot to the crate from the ledge on the other side."
                    },
                    "Item in Heart Piece Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 175, y: 173 },
                        Age: Age.EITHER,
                        LongDescription: "The crate is on a ledge on the left side of the ravine. Grab a cucco and jump across to the crate. If you're fast, you can grab the cucco after you get the item and use it to get the waterfall item as well.<br /><br />As an adult, you can longshot to the crate from the ledge on the other side."
                    }
                }
            },
            chasm: {
                DisplayGroup: { groupName: "In Chasm", imageName: "Magic Bean" },
                ExcludeFromSpawnList: true,
                Exits: {
                    chasmDownstream: {}
                },
                ItemLocations: {
                    "Soft Soil": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 183, y: 191 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch at the bottom of the ravine near the cow. It's not used to get any items."
                    },
                    "Crate by Cow on Bottom": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 189, y: 199 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the plateform on the bottom of the ravine to find this crate.",
                    },
                    "Cow on Bottom by Waterfall": {
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 183, y: 185 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the platform on the bottom of the ravine to find this cow."
                    },
                    "Gossip Stone by Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 185, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the chasm near the waterfall. It's on the same platform as the cow and soft soil patch."
                    },
                    "Heart Piece in Waterfall": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 200, y: 111 },
                        Age: Age.EITHER,
                        LongDescription: "The Heart Piece is in a room in the waterfall to the left in the ravine. There's a ladder leading up to it."
                    },
                    "Red Rupee by Upper Waterfall": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Red Rupee Wonderitem",
                        MapInfo: { x: 201, y: 123 },
                        Age: Age.ADULT,
                        LongDescription: "To get this wonderitem, climb the ladder by the waterfall in the chasm. Bonk the wall at the top, and then backflip. Alternatively, you can ride the bean platform (stand in the middle of it)."
                    },
                    "Red Rupee by Lower Waterfall": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Red Rupee Wonderitem",
                        MapInfo: { x: 202, y: 209 },
                        Age: Age.ADULT,
                        LongDescription: "To get this wonderitem, jump into the chasm so that you land up the river near the ladder. Now, fall (holding neutral) slightly to the right of the center of the watefall to get the item. Alternatively, you can ride the bean platform (stand in the middle of it)."
                    }
                }
            },
            chasmDownstream: {
                DisplayGroup: { groupName: "In Chasm", imageName: "Magic Bean" },
                Exits: {
                    "Lake Hylia": {
                        OwExit: OwExits["Gerudo Valley"]["Lake Hylia"]
                    }
                },
                ItemLocations: {}
            }
        }
    },

	"Gerudo Fortress": {
		Abbreviation: "FORT",
		MapGroup: MapGroups.DESERT,
		StartingFloorIndex: 0,
        UseAdultAge: function() { 
            if (Data.randomizedSpawnLocations.useRandomizedSpawns) { return false; }
            return !Settings.RandomizerSettings.shuffleOverworldEntrances && 
                !Settings.RandomizerSettings.shuffleInteriorEntrances;
        },
		Regions: {
            main: {
                DisplayGroup: { groupName: "Ground Level", imageName: "Gerudo Membership Card" },
                Exits: {
                    middleFloor: {
                        NeedsAny: [
                            UpgradedItems.LONGSHOT,
                            Equipment.HOVER_BOOTS,
                            Tricks.gfJumpToMiddleFloor.canDo,
                            Tricks.megaFlip.canDo
                        ]
                    },
                    topOfKitchen: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    aboveJail1: {
                        // Can talk to gate guard to get jailed if you have membership card
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    },
                    aboveLinksJail: {
                        Age: Age.ADULT,
                        Needs: [Tricks.gfHookshotToAboveLinksJail.canDo]
                    },
                    backArea: {
                        AdultNeedsAny: [
                            GameStateSets.ARE_GERUDO_GUARDS_TAME,
                            Tricks.gfAdultBackAreaWithoutCard.canDo
                        ]
                    },
                    wastelandEntrance: {
                        NeedsAny: [GameStateSets.ARE_GERUDO_GUARDS_TAME, Tricks.gfChildGateSkip.canDo]
                    },

                    // Ground Level
                    "Gerudo Valley": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Valley"]
                    },
                    "Training Grounds": {
                        OwExit: OwExits["Gerudo Fortress"]["Training Grounds"]
                    },
                    "Bottom Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Bottom Left Door"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Gerudo Fortress"]["Song of Storms Grotto"]
                    },
                    "Enclave Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Enclave Left Door"]
                    },
                    "Enclave Right Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Enclave Right Door"]
                    },
                    "Bottom Right Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Bottom Right Door"]
                    },
                    "Right Door Above GTG": {
                        OwExit: OwExits["Gerudo Fortress"]["Right Door Above GTG"]
                    },
                    "Left Door Above GTG": {
                        OwExit: OwExits["Gerudo Fortress"]["Left Door Above GTG"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "Gerudo Fortress to Jail 1": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Jail 1"]
                    },
                    "Gerudo Fortress to Jail 2": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Jail 2"]
                    },
                    "Gerudo Fortress to Jail 3": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Jail 3"]
                    },
                    "Gerudo Fortress to Kitchen Hallway": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Kitchen Hallway"]
                    }
                },
                ItemLocations: {
                    "Rupee in Overhanging Sign by Entrance": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 97, y: 228 },
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT],
                        LongDescription: "Shoot the overhanging sign by the entrance to Gerudo Valley with your hookshot to get this wonderitem. Note that it only works if you shoot it from the south."
                    },
                    "Opened Gate": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapImageName: "Gerudo Membership Card",
                        MapInfo: { x: 81, y: 98 },
                        Age: Age.ADULT,
                        Region: "main",
                        LongDescription: "Talk to the gerudo guard at the top of the ladder to open the gate.",
                        Needs: [GameStateSets.ARE_GERUDO_GUARDS_TAME]
                    },
                    "2 Crates Right of Bottom Left Door": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 124, y: 154 },
                        Age: Age.EITHER,
                        LongDescription: "These are the two crates on the bottom to the right of the bottom left hideout entrance."
                    },
                    "4 Crates in Bottom Enclave": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "4 Crates",
                        MapInfo: { x: 132, y: 176 },
                        Age: Age.EITHER,
                        LongDescription: "These are the four crates on the bottom in the safe area with the two hideout entrances."
                    }
                }
            },
            middleFloor: {
                DisplayGroup: { groupName: "Middle and Upper Level", imageName: "Chest" },
                Exits: {
                    main: {},
                    topOfKitchen: {
                        // The jump as adult by the vines - no trick since it's really easy
                        Age: Age.ADULT
                    },
                    jail4Door: {
                        Needs: [Tricks.megaFlip.canDo]
                    },
                    "Middle Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Middle Left Door"]
                    },
                    "Vines Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Vines Left Door"]
                    },
                    "Vines Forward Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Vines Forward Door"]
                    }
                },
                ItemLocations: {
                    "Placeholder": {
                        Age: Age.EITHER,
                        RequiredToAppear: function() { return false; },
                        LongDescription: "Just a placeholder so this group is sorted correctly..."
                    }
                }
            },
            topOfKitchen: {
                DisplayGroup: { groupName: "Middle and Upper Level", imageName: "Chest" },
                Exits: {
                    jail4Door: {},
                    middleFloor: {},
                    topOfFortress: {
                        ChildNeeds: [Tricks.megaFlip.canDo],
                        ChildNeedsAny: [Tricks.gfChildJumpByTopKitchen.canDo, Tricks.groundJump.canDoWithBomb],
                        AdultNeedsAny: [
                            UpgradedItems.LONGSHOT,
                            Equipment.HOVER_BOOTS,
                            GameStateSets.CAN_HOOK_SCARECROW,
                            Tricks.megaFlip.canDo]
                    },
                    aboveJail1: {
                        // There is apparently a trick (logic_gf_break_room_jump) to do this with a precise jump as Adult
                        // from near the skulltula platform, but no idea how to do it
                        Age: Age.EITHER,
                        NeedsAny: [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]
                    },
                    "Upper Kitchen Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Upper Kitchen Door"]
                    }
                },
                ItemLocations: {
                    // Obtainable as long as Link can get to the middle area, so this should be an okay place for it
                    "Skulltula on Back Fortress Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 203, y: 129 },
                        Age: Age.ADULT,
                        LongDescription: "The skulltula is located on the wall near the entrance to jail 4 - see those instructions for how to get there.<br/><br/>If you don't have a long range way to kill it, you'll need to jumpslash it from the top and then circle back around and jump to claim the item."
                    }
                }
            },
            jail4Door: {
                DisplayGroup: { groupName: "Middle and Upper Level", imageName: "Chest" },
                Exits: {
                    middleFloor: {},

                    // Interiors
                    "Upper Jail Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Upper Jail Door"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "Gerudo Fortress to Jail 4": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Jail 4"]
                    }
                },
                ItemLocations: {}
            },
            topOfFortress: {
                DisplayGroup: { groupName: "Middle and Upper Level", imageName: "Chest" },
                UseAdultAge: function() {
                    return (!Tricks.groundJump.enabled && !Tricks.gfChildJumpByTopKitchen.enabled) || 
                        !Tricks.megaFlip.enabled;
                },
                ExcludeFromSpawnList: true,
                Exits: {
                    jail4Door: {},
                    middleFloor: {},
                    topOfKitchen: {},
                    aboveJail1: {}
                },
                ItemLocations: {
                    "Chest on the Top": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 101 },
                        Age: Age.EITHER,
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Enter the other door to your right. Now either hookshot the wooden horizontal beam, use your hover boots to get across, or take out the guards with your bow to get across to the path directly in front of you. Face the camera to your back and turn left. Climb up the wall and walk to the end. Jump across to the next platform. Climb up the vines to your left.<br/><br/>You should be able to either longshot to the chest, or roll across with your hover boots.",
                        TricksToShow: [Tricks.gfChildJumpByTopKitchen]
                    }
                }
            },
            aboveJail1: {
                DisplayGroup: { groupName: "Middle and Upper Level", imageName: "Chest" },
                Exits: {
                    main: {},
                    "Door Above Jail 1": {
                        OwExit: OwExits["Gerudo Fortress"]["Door Above Jail 1"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "Gerudo Fortress to Room Above Jail 1": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Fortress to Room Above Jail 1"]
                    }
                },
                ItemLocations: {}
            },
            aboveLinksJail: {
                DisplayGroup: { groupName: "Above Link's Jail", imageName: "Purple Rupee" },
                Exits: {
                    main: {},
                    aboveJail1: {},
                    topOfFortress: {
                        Age: Age.ADULT,
                        Needs: [UpgradedItems.LONGSHOT]
                    },
                    wastelandEntrance: {
                        Age: Age.ADULT,
                        Needs: [Tricks.gfAdultGateSkip.canDo]
                    },
                    "Door Above Link's Jail": {
                        OwExit: OwExits["Gerudo Fortress"]["Door Above Link's Jail"]
                    }
                },
                ItemLocations: {
                    "Child Heart Piece Above Link's Jail": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 141, y: 73 },
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
                        Age: Age.CHILD,
                        LongDescription: "This is the freestanding heart piece above the jail as Child Link."
                    },
                    "Adult Crate Above Link's Jail": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 136, y: 68 },
                        Age: Age.ADULT,
                        LongDescription: "Note that this is ONLY the crate here as Adult! The Child version is the freestanding heart piece.<br/><br/>If hideout is not shuffled: navigate to the upper room by either getting caught then jumping to there, or by dropping down from the top where the chest is. Stun the guards (can use your hookshot) and navigate down the long hallway. Hookshot the wooden pillar to pass the barrier. The crate is just ahead of you after the loading zone.",
                        TricksToShow: [Tricks.gfHookshotToAboveLinksJail]
                    }
                }
            },
            backArea: {
                DisplayGroup: { 
                    groupName: "Archery Area", 
                    imageName: "Fairy Bow",
                    description: "The back area of the fortress, which normally requires the Membership Card as Adult.",
                    tricksToShow: [Tricks.gfAdultBackAreaWithoutCard]
                },
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {}
                },
                ItemLocations: {
                    "Rupee in Overhanging Sign by HBA": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Hookshot Wonderitem",
                        MapInfo: { x: 164, y: 222 },
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT],
                        LongDescription: "Shoot the overhanging sign by the entrance to horseback archery with your hookshot to get this wonderitem. Note that it only works if you shoot it from the fortress side."
                    },
                    "2 Crates by HBA Right Target": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 241, y: 252 },
                        Age: Age.EITHER,
                        LongDescription: "These are the crates by the horseback archery's giant right target."
                    },
                    "2 Crates by HBA Start": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 250, y: 233 },
                        Age: Age.EITHER,
                        LongDescription: "These are the crates by the start of the horseback archery minigame."
                    },
                    "6 Crates by HBA Center Targets": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "6 Crates",
                        MapInfo: { x: 266, y: 144 },
                        Age: Age.EITHER,
                        LongDescription: "These are the crates by horseback archery's center targets."
                    },
                    "2 Crates by HBA Left Target": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsEmpty: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 243, y: 52 },
                        Age: Age.EITHER,
                        LongDescription: "These are the crates by the horseback archery's giant left target."
                    },
                    "Archery Minigame 1000 Points": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 246, y: 220 },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1000 points to claim your prize.",
                        Needs: [
                            Items.FAIRY_BOW, 
                            GameStateSets.CAN_RIDE_EPONA,
                            GameStateSets.ARE_GERUDO_GUARDS_TAME
                        ]
                    },
                    "Archery Minigame 1500 Points": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 246, y: 225 },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1500 points to claim your prize.",
                        Needs: [
                            Items.FAIRY_BOW, 
                            GameStateSets.CAN_RIDE_EPONA,
                            GameStateSets.ARE_GERUDO_GUARDS_TAME
                        ]
                    },
                    "Skulltula on Target": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 244, y: 40 },
                        Age: Age.ADULT,
                        LongDescription: "At night, navigate to the back part of the map. Head to the target on the left side to find this skulltula.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    }
                }
            },
            wastelandEntrance: {
                Exits: {
                    main: {
                        DisplayGroup: { groupName: "Ground Level", imageName: "Gerudo Membership Card" },
                        ChildNeeds: [ItemLocationSets.GF_OPENED_GATE]
                    },
                    "Haunted Wasteland": {
                        OwExit: OwExits["Gerudo Fortress"]["Haunted Wasteland"]
                    }
                },

                ItemLocations: {}
            }
		}
    },
    
    "Thieves' Hideout": {
        Abbreviation: "TH",
        MapGroup: MapGroups.DESERT,
        Floors: ["J1", "J2", "J3", "J4", "KIT", "TOP"],
        StartingFloorIndex: 0,
        Regions: {
            main: {
                Exits: {},
                ItemLocations: {
                    "Item From Gerudo": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 346, y: 285, floor: "ANY" },
                        Age: Age.EITHER,
                        IsPostWalkCheck: true,
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.openGerudosFortress !== OpenGerudosFortressSettings.OPEN;
                        },
                        LongDescription: "You'll get this from the Gerudo after using all 4 keys on all the jail doors and talking to the prisoners.",
                        Needs: [KeySets.HIDEOUT_HAS_ALL_KEYS],
                        CustomRequirement: function(age) {
                            switch(Settings.RandomizerSettings.openGerudosFortress) {
                                case OpenGerudosFortressSettings.VANILLA:
                                    return MapAccessSets.HIDEOUT_ALL_JAILS(age);
                                case OpenGerudosFortressSettings.ONE_CARPENTER:
                                    return MapAccessSets.HIDEOUT_JAIL_1(age);
                                default:
                                    return false; // Should not get here...
                            }
                        }
                    }
                }
            },
            jail1: {
                DisplayGroup: { groupName: "Jail 1", imageName: "Thieves' Hideout J1" },
                MapSuffix: "1",
                Exits: {
                    main: {},
                    "Jail 1 Left": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 1 Left"]
                    },
                    "Jail 1 Right": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 1 Right"]
                    }
                },
                ItemLocations: {
                    "3 Pots by Jail 1": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 113, y: 107, floor: "J1" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the opposite wall of the jail. You can savewarp here from anywhere in the Thieves' Hideout."
                    },
                    "Crate by Jail 1": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 113, y: 194, floor: "J1" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in the opposite corner of the cell door. You can savewarp here from anywhere in the Thieves' Hideout."
                    },
                    "Left Skull Jail 1 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 157, y: 96, floor: "J1" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the left of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Right Skull Jail 1 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 157, y: 196, floor: "J1" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the right of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Jail 1 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 213, y: 129, floor: "J1" },
                        Age: Age.EITHER,
                        Needs: [ItemSets.SWORDS],
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.openGerudosFortress !== OpenGerudosFortressSettings.OPEN;
                        },
                        LongDescription: "Enter the leftmost bottom exit to get to the first jail. Take out the guard to get the item. You can savewarp here from anywhere in the Thieves' Hideout."
                    }
                }
            },
            jail2: {
                DisplayGroup: { groupName: "Jail 2", imageName: "Thieves' Hideout J2" },
                MapSuffix: "2",
                Exits: {
                    jail1: {}, // Savewarp
                    "Jail 2 Left": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 2 Left"]
                    },
                    "Jail 2 Right": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 2 Right"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "TH Bottom Jails to GF Middle Floor": {
                        OwExit: OwExits["Thieves' Hideout"]["TH Bottom Jails to GF Middle Floor"]
                    }
                },
                ItemLocations: {
                    "2 Pots in Jail 2 Hallway": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 167, y: 11, floor: "J2" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the hallway to the left of the jail."
                    },
                    "Left Skull Jail 2 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 173, y: 111, floor: "J2" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the left of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Right Skull Jail 2 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 173, y: 184, floor: "J2" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the right of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Jail 2 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 207, y: 132, floor: "J2" },
                        Age: Age.EITHER,
                        Needs: [ItemSets.SWORDS],
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.openGerudosFortress === OpenGerudosFortressSettings.VANILLA;
                        },
                        LongDescription: "Start from jail 1. Face the jail - now turn right and take that exit. Go straight to the other side. The next jail is in the next hole if you hug this wall around the right corner - be careful of guards. Take out the guard to get the item."
                    }
                }
            },
            jail3: {
                DisplayGroup: { groupName: "Jail 3", imageName: "Thieves' Hideout J3" },
                MapSuffix: "3",
                Exits: {
                    jail1: {}, // Savewarp
                    "Jail 3 Left": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 3 Left"]
                    },
                    "Jail 3 Right": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 3 Right"]
                    }
                },
                ItemLocations: {
                    "3 Pots by Jail 3": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 260, y: 115, floor: "J3" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the opposite wall of the closed jail."
                    },
                    "2 Crates by Jail 3": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 127, y: 115, floor: "J3" },
                        Age: Age.EITHER,
                        LongDescription: "The crates are in the opposite corner of the locked cell door."
                    },
                    "4 Pots in Open Cell by Jail 3": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 157, y: 217, floor: "J3" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the open cell next to jail 3."
                    },
                    "Left Skull Jail 3 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 267, y: 147, floor: "J3" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the left of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Right Skull Jail 3 Wonderitem": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 115, y: 147, floor: "J3" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "To the right of the jail, shoot the skull on the wall to get this wonderitem."
                    },
                    "Jail 3 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 207, y: 188, floor: "J3" },
                        Age: Age.EITHER,
                        Needs: [ItemSets.SWORDS],
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.openGerudosFortress === OpenGerudosFortressSettings.VANILLA;
                        },
                        LongDescription: "Start from jail 2. Face the jail - now turn left and take that exit. Climb the vines straight ahead and take the exit straight in front of you for the next jail. Take out the guard to get the item."
                    }
                }
            },
            jail4: {
                DisplayGroup: { groupName: "Jail 4", imageName: "Thieves' Hideout J4" },
                MapSuffix: "4",
                Exits: {
                    jail1: {}, // Savewarp
                    "Jail 4 Entrance": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 4 Entrance"]
                    }
                },
                ItemLocations: {
                    "Crate by Jail 4": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 80, y: 202, floor: "J4" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in front of you when you enter the map - grab it quickly then retreat before the guard sees you."
                    },
                    "Skull in First Jail 4 Hallway": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 202, y: 178, floor: "J4" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Shoot the skull on the wall after the first right turn in the jail 4 area. to get this wonderitem."
                    },
                    "Skull Before Jail 4": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 142, y: 68, floor: "J4" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Shoot the skull on the wall on the turn just before jail 4 to get this wonderitem."
                    },
                    "Jail 4 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 303, y: 38, floor: "J4" },
                        Age: Age.EITHER,
                        Needs: [ItemSets.SWORDS],
                        RequiredToAppear: function() { 
                            return Settings.RandomizerSettings.openGerudosFortress === OpenGerudosFortressSettings.VANILLA;
                        },
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Face the entrance you just left. As Child, you must enter the door to your left and navigate across to the other side of the room. As Adult, you can jump up to the ledge to your right with a slight angled jump. Climb up the vines and navigate to the door near where the skulltula on the wall would be at night.<br/><br/>Once inside, wait for a bit first for the guard and knock her out or sprint past her before following the path to your right. Eventually you'll reach the jail. Take out the guard to get the item."
                    }
                }
            },
            kitchenHallway: {
                DisplayGroup: { groupName: "Kitchen", imageName: "Thieves' Hideout Kitchen" },
                MapSuffix: "K",
                Exits: {
                    jail1: {}, // Savewarp
                    kitchenTopLeft: {
                        NeedsAny: [GameStateSets.CAN_STUN_GUARDS, Tricks.gfPassKitchenGuards.canDo]
                    },
                    "Kitchen Far Bottom": {
                        OwExit: OwExits["Thieves' Hideout"]["Kitchen Far Bottom"]
                    },
                    "Kitchen Middle Bottom": {
                        OwExit: OwExits["Thieves' Hideout"]["Kitchen Middle Bottom"]
                    }
                },
                ItemLocations: {
                    "2 Far Crates in Kitchen Hallway": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 108, y: 130, floor: "KIT" },
                        Age: Age.EITHER,
                        LongDescription: "These are the far away crates in the hallway attached to the kitchen."
                    },
                    "2 Mid Crates in Kitchen Hallway": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 131, y: 212, floor: "KIT" },
                        Age: Age.EITHER,
                        LongDescription: "These are the closer crates in the hallway attached to the kitchen."
                    },
                    "Skull in Kitchen Hallway": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 120, y: 251, floor: "KIT" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Shoot the skull at the end of the hallway leading to the kitchen to get this wonderitem."
                    },
                    "Crate Close to Kitchen": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 203, y: 250, floor: "KIT" },
                        Age: Age.EITHER,
                        LongDescription: "This is the crate right next to the kitchen - you'll need to deal with one of the guards to get it. To sneak past, you can hide in the corner by the crate and wait for her to pass. You have a limited time after to bonk the crate.",
                        NeedsAny: [GameStateSets.CAN_STUN_GUARDS, Tricks.gfPassKitchenGuards.canDo]
                    },
                    "Rupee in Soup Pot": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Red Rupee Wonderitem",
                        MapInfo: { x: 269, y: 258, floor: "KIT" },
                        Age: Age.EITHER,
                        LongDescription: "Shoot the skull at the end of the hallway leading to the kitchen to get this wonderitem.",
                        Needs: [GameStateSets.CAN_STUN_GUARDS]
                    }
                }
            },
            kitchenTopLeft: {
                DisplayGroup: { groupName: "Kitchen", imageName: "Thieves' Hideout Kitchen" },
                MapSuffix: "K",
                Exits: {
                    jail1: {}, // Savewarp
                    kitchenPots: {
                        NeedsAny: [Items.BOOMERANG, GameStateSets.CAN_STUN_GUARDS]
                    },
                    kitchenHallway: {
                        // Their logic says that you can get here without anything with the pass guards trick on
                        // But it's way too hard!
                        NeedsAny: [GameStateSets.CAN_STUN_GUARDS]
                    },
                    kitchenTopRight: {
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            GameStateSets.CAN_STUN_GUARDS,
                            Tricks.gfPassKitchenGuards.canDo,
                            Tricks.megaFlip.canDo]
                    },
                    "Kitchen Top Left": {
                        OwExit: OwExits["Thieves' Hideout"]["Kitchen Top Left"]
                    }
                },
                ItemLocations: {}
            },
            kitchenTopRight: {
                DisplayGroup: { groupName: "Kitchen", imageName: "Thieves' Hideout Kitchen" },
                MapSuffix: "K",
                Exits: {
                    jail1: {}, // Savewarp
                    kitchenPots: {
                        NeedsAny: [Items.BOOMERANG, GameStateSets.CAN_STUN_GUARDS]
                    },
                    kitchenTopLeft: {
                        NeedsAny: [
                            Equipment.HOVER_BOOTS,
                            GameStateSets.CAN_STUN_GUARDS,
                            Tricks.gfPassKitchenGuards.canDo,
                            Tricks.megaFlip.canDo]
                    },
                    "Kitchen Top Right": {
                        OwExit: OwExits["Thieves' Hideout"]["Kitchen Top Right"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "TH Kitchen to GF Kitchen Top": {
                        OwExit: OwExits["Thieves' Hideout"]["TH Kitchen to GF Kitchen Top"]
                    }
                },
                ItemLocations: {}
            },
            kitchenPots: {
                DisplayGroup: { groupName: "Kitchen", imageName: "Thieves' Hideout Kitchen" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "2 Pots on Kitchen Table": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 267, y: 210, floor: "KIT" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the table in the kitchen. If you enter from one of the upper entrances, you can snag them with the boomerang."
                    }
                }
            },
            topLower: {
                DisplayGroup: { groupName: "Top", imageName: "Thieves' Hideout Top" },
                MapSuffix: "T",
                Exits: {
                    jail1: {}, //Savewarp
                    topUpper: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    },
                    "Top Room Lower": {
                        OwExit: OwExits["Thieves' Hideout"]["Top Room Lower"]
                    }
                },
                ItemLocations: {
                    "Upper Room Crate 1": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 277, y: 197, floor: "TOP" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in front of you when you enter the map."
                    },
                    "Upper Room Crate 2": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 297, y: 163, floor: "TOP" },
                        Age: Age.EITHER,
                        LongDescription: "This is the second crate you run into in this map."
                    },
                    "Upper Room Close Corner Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 345, y: 127, floor: "TOP" },
                        Age: Age.EITHER,
                        LongDescription: "Deal with the guard that's moving. The crate is to the right when you enter the main room - the one close to the corner.<br/><br/>Child can get this without dealing with the stationary guard if you stay close to the wall.<br/><br/>Adult can get this one without dealing with the stationary guard if you bonk into it while staying more to the right.",
                        NeedsAny: [GameStateSets.CAN_STUN_GUARDS]
                    },
                    "Upper Room Far Corner Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 345, y: 117, floor: "TOP" },
                        Age: Age.EITHER,
                        LongDescription: "Deal with the guard that's moving. The crate is to the right when you enter the main room - the one farther from the corner.<br/>Child can get this one if you hug the wall the whole time.<br/>Adult can stab the stationary guard if you crouchstab her, but be careful not to get too close!",
                        // Child is small enough to not need to stun the stationary guard
                        ChildNeedsAny: [GameStateSets.CAN_STUN_GUARDS], 
                        AdultNeedsAny: [
                            GameStateSets.CAN_STUN_OR_PASS_GUARDS_AT_DISTANCE,
                            // Adult needs to stun the stationary guard
                            Tricks.gfGuardsWithSword.canDoForTopRoomGuards 
                        ]
                    },
                    "2 Pots on Upper Room Table": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 309, y: 96, floor: "TOP" },
                        Age: Age.EITHER,
                        LongDescription: "These pots can be retrieved with the boomerang if you're quick. If you can't get them that way...<br/><br/>Deal with the guard that's moving. If you have a shield, and either the Master Sword or a Deku Stick, you can crouchstab the stationary guard, but be careful not to get too close!",
                        NeedsAny: [
                            GameStateSets.CAN_STUN_OR_PASS_GUARDS_AT_DISTANCE,
                            Items.BOOMERANG,
                            Tricks.gfGuardsWithSword.canDoForTopRoomGuards
                        ]
                    },
                    "Upper Room Lower Skull": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 186, y: 125, floor: "TOP" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Navigate to the barrier leading to the upper area, then turn around. Shoot the skull up high to get this wonderitem."
                    }
                }
            },
            topUpper: {
                DisplayGroup: { groupName: "Top", imageName: "Thieves' Hideout Top" },
                MapSuffix: "T",
                Exits: {
                    jail1: {}, //Savewarp
                    topLower: {
                        Age: Age.ADULT,
                        Needs: [Items.HOOKSHOT]
                    },
                    "Top Room Upper": {
                        OwExit: OwExits["Thieves' Hideout"]["Top Room Upper"]
                    },

                    // Hidden exits to travel if Thieves' Hideout shuffle is off
                    "TH Top Room to GF Above Link's Jail": {
                        OwExit: OwExits["Thieves' Hideout"]["TH Top Room to GF Above Link's Jail"]
                    }
                },
                ItemLocations: {
                    "Upper Room Upper Skull": {
                        ItemGroup: ItemGroups.WONDERITEM,
                        MapImageName: "Bow Wonderitem",
                        MapInfo: { x: 75, y: 125, floor: "TOP" },
                        Age: Age.ADULT,
                        Needs: [Items.FAIRY_BOW],
                        LongDescription: "Navigate to the barrier leading to the lower area, then turn around. Shoot the skull up high to get this wonderitem."
                    }
                }
            }
        }
    },

	"Haunted Wasteland": {
		Abbreviation: "HW",
		MapGroup: MapGroups.DESERT,
		Regions: {
            entrance: {
                DisplayGroup: { groupName: "Fortress Side", imageName: "Gerudo Membership Card" },
                Exits: {
                    outpost: {
                        NeedsAny: [
                            UpgradedItems.LONGSHOT,
                            Equipment.HOVER_BOOTS,
                            Tricks.itemlessSandPit.canDo]
                    },
                    "Gerudo Fortress": {
                        OwExit: OwExits["Haunted Wasteland"]["Gerudo Fortress"]
                    }
                },
                ItemLocations: {
                    "Crate by Quicksand": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 311, y: 266 },
                        Age: Age.EITHER,
                        LongDescription: "The crate is by the quicksand pit by the exit to Gerudo Fortress."
                    }
                }
            },
            outpost: {
                DisplayGroup: { groupName: "Outpost", imageName: "Lens of Truth" },
                UseAdultAge: function() { 
                    return !Tricks.backwardsWasteland.enabled && !Tricks.itemlessSandPit.enabled;
                },
                ExcludeFromSpawnList: true,
                Exits: {
                    entrance: {
                        Needs: [Tricks.backwardsWasteland.canDo]
                    },
                    exit: {
                        NeedsAny: [Items.LENS_OF_TRUTH, Tricks.wastelandNoLens.canDo]
                    }
                },

                ItemLocations: {
                    "3 Crates Across Quicksand": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.CRATE,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 294, y: 253 },
                        Age: Age.EITHER,
                        LongDescription: "These crates are by the flags just across the quicksand pit."
                    },
                    "Carpet Shop": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 239, y: 292 },
                        Age: Age.EITHER,
                        LongDescription: "After you cross the sand pit, the shop is along the path to your left. There is a sign by one of the flags that points to it. If you don't have hover boots, you can rolljump, then jumpslash to the corner of the carpet.<br/><br/>If this and medigoron aren't shuffled, this shop will ALWAYS sell bombchus.",
                        Needs: [UpgradedItems.ADULTS_WALLET],
                        NeedsAny: [ItemSets.SWORDS, Equipment.HOVER_BOOTS]
                    },
                    "Skulltula at Outpost": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 208, y: 85 },
                        Age: Age.EITHER,
                        LongDescription: "The skulltula is in the outpost in the center of the desert.",
                        NeedsAny: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS, Tricks.staircaseHover.canDo]
                    },
                    "Chest at Outpost": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 208, y: 93 },
                        Age: Age.EITHER,
                        LongDescription: "In the outpost in the center of the desert, light the two torches to spawn a chest.",
                        NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]
                    },
                    "4 Pots at Outpost": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.POT,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 214, y: 89 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the outpost in the center of the desert."
                    }
                }
            },
            exit: {
                DisplayGroup: { groupName: "Colossus Side", imageName: "Spirit Medallion" },
                Exits: {
                    outpost: {
                        Needs: [Tricks.backwardsWasteland.canDo]
                    },
                    "Desert Colossus": {
                        OwExit: OwExits["Haunted Wasteland"]["Desert Colossus"]
                    }
                },
                ItemLocations: {
                    "Crate near Colossus": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 129, y: 129 },
                        Age: Age.EITHER,
                        LongDescription: "The crate is by the leevers just east of the Desert Colossus entrance. If coming from Desert Colossus, just walk straight until you run into the crate.",
                        TricksToShow: [Tricks.wastelandNoLens]
                    }
                }
            }
		}
	},
    	
	"Desert Colossus": {
		Abbreviation: "DCOL",
		MapGroup: MapGroups.DESERT,
		Regions: {
            main: {
                DisplayGroup: { groupName: "North Area", imageName: "Nayru's Love" },
                Exits: {
                    archway: {
                        Age: Age.ADULT,
                        Needs: [BeanSets.DESERT_COLOSSUS]
                    },

                    // North Area
                    "Haunted Wasteland": {
                        OwExit: OwExits["Desert Colossus"]["Haunted Wasteland"]
                    },
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Desert Colossus"]["Great Fairy Fountain"]
                    },
                    "Silver Rock Grotto": {
                        OwExit: OwExits["Desert Colossus"]["Silver Rock Grotto"]
                    },
                    "Requiem Teleport Pad": {
                        OwExit: OwExits["Desert Colossus"]["Requiem Teleport Pad"]
                    },

                    // Spirit Temple Area
                    "Spirit Temple": {
                        OwExit: OwExits["Desert Colossus"]["Spirit Temple"]
                    }
                },

                ItemLocations: {
                    // North Area
                    "2 Items in Tree by Great Fairy": {
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "2 Projectile Wonderitems",
                        MapInfo: { x: 231, y: 33 },
                        Age: Age.EITHER,
                        LongDescription: "Shoot the deku nuts in the two trees by the wall with the great fairy fountain to spawn these wonderitems."
                    },
                    "Skulltula on Cliff": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 213, y: 91 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there is a skulltula on a small cliff near the north middle edge of the map. You can hookshot it if the Leevers leave you alone long enough. An easier solution is to ride the bean platform and jump off of it so that you're on top.",
                        NeedsAny: [
                            BeanSets.DESERT_COLOSSUS,
                            Items.HOOKSHOT,
                            Tricks.boomerangTrickThrows.canDo]
                    },

                    // Oasis
                    "3 Items in Tree at Oasis": {
                        DisplayGroup: { groupName: "Oasis", imageName: "Song of Storms" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.WONDERITEM,
                        DefaultEntranceGroupName: "3 Desert Projectile Wonderitems",
                        MapInfo: { x: 195, y: 246 },
                        Age: Age.EITHER,
                        LongDescription: "At the oasis, shoot the deku nuts in the three trees with a slingshot or bow to spawn these wonderitems. Note that only Child can spawn the one that normally has the skulltula in it."
                    },
                    "Skulltula on Tree by Oasis": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 180, y: 245 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula in one of the trees by an oasis at the south middle part of the map.",
                        Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
                    },

                    // Spirit Temple Area
                    "Soft Soil": {
                        DisplayGroup: { groupName: "Spirit Temple Area", imageName: "Spirit Medallion" },
                        ItemGroup: ItemGroups.GROUP,
                        OverrideItemGroup: ItemGroups.NON_ITEM,
                        DefaultEntranceGroupName: "Soft Soil",
                        MapInfo: { x: 63, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "The soft soil patch near the Spirit Temple. Used to get the skulltula on the ledge and the heart piece on the arch."
                    },
                    "Requiem of Spirit": {
                        //TODO: with decoupling, we'll have to check that we can enter whatever leads here
                        // this will be the same as the check for the lost woods bridge!
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 63, y: 149 },
                        Age: Age.EITHER,
                        LongDescription: "Enter and exit the Spirit Temple to receive this item."
                    },
                    "Gossip Stone by Spirit Temple": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 54, y: 194 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the left side of the Spirit Temple."
                    }
                }
            },
            archway: {
                DisplayGroup: { groupName: "Spirit Temple Area", imageName: "Spirit Medallion" },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Heart Piece on Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 87, y: 135 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
                        LongDescription: "Plant a magic bean in the soil by the Spirit Temple. Come back as an adult and ride it to the heart piece on the giant arch."
                    }
                }
            }
		}
	}
};
