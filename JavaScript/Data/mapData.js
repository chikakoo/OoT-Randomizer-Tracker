let MapLocations = {
    "Kokiri Forest": {
        Abbreviation: "KOKI",
        MapGroup: MapGroups.FOREST,
        Regions: {
            main: {
                Exits: {
                    afterMido: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT || !Settings.RandomizerSettings.closedDeku) { return true; }
                            return (Equipment.KOKIRI_SWORD.playerHas && Equipment.DEKU_SHIELD.playerHas) || 
                                Data.itemLocationObtained("Kokiri Forest", "main", "Move Mido");
                        }
                    },

                    // Overworld
                    "Lost Woods Bottom": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Bottom"]
                    },
                    "Lost Woods Top": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Top"]
                    },

                    // Interiors & Grottos
                    "Link's House": {
                        OwExit: OwExits["Kokiri Forest"]["Link's House"]
                    },
                    "Saria's House": {
                        OwExit: OwExits["Kokiri Forest"]["Saria's House"]
                    },
                    "Mido's House": {
                        OwExit: OwExits["Kokiri Forest"]["Mido's House"]
                    },
                    "Know-It-All House": {
                        OwExit: OwExits["Kokiri Forest"]["Know-It-All House"]
                    },
                    "House of Twins": {
                        OwExit: OwExits["Kokiri Forest"]["House of Twins"]
                    },
                    "Shop": {
                        OwExit: OwExits["Kokiri Forest"]["Shop"]
                    },
                    "Song of Storms Grotto by Lost Woods": {
                        OwExit: OwExits["Kokiri Forest"]["Song of Storms Grotto by Lost Woods"]
                    }
                },

                ItemLocations: {
                    "Kokiri Sword": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 290 },
                        Age: Age.CHILD,
                        LongDescription: "This is the prize at the end of the boulder maze, though the Hole of Z."
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 284, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soil near the Kokiri Shop.",
                        NeedsBottle: true
                    },
                    "Skulltula on Know-it-all House": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 70, y: 180 },
                        Age: Age.CHILD,
                        LongDescription: "Look on the side of the Know-it-all Brothers' house at night. You can get the token with a backflip if you don't have a Boomerang."
                    },
                    "Skulltula on the House of Twins": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 261, y: 233 },
                        Age: Age.ADULT,
                        LongDescription: "Look in the middle of the House of Twins at night.",
                        CustomRequirement: function(age) {
                            if (Data.canGrabShortDistances(age)) { return true; }
                            return Settings.GlitchesToAllow.houseOfTwinsSkullWithHovers && Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    "*Plant Bean by Kokiri Shop": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 284, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Kokiri Shop. Used to get the rupees above it."
                    },
                    "Move Mido": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function()  { return Settings.RandomizerSettings.closedDeku; },
                        MapInfo: { x: 300, y: 175 },
                        Age: Age.CHILD,
                        LongDescription: "Move Mido by talking to him while you have a Deku Shield and the Kokiri Sword. Necessary to access the Deku Tree if closed Deku is on.",
                        RequiredItems: [Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD]
                    },
                    "Gossip Stone by Lost Woods": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 37 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the lost woods entrance at the top area of the forest.",
                    },
                    "Blue Rupee Behind Mido's": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 135, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "This item is behind Mido's House.",
                    },
                    "Close Maze Blue Rupee": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 72, y: 278 },
                        Age: Age.CHILD,
                        LongDescription: "This item is to your right when you go in the maze.",
                    },
                    "Far Maze Blue Rupee": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 78, y: 292 },
                        Age: Age.CHILD,
                        LongDescription: "Go in the maze and follow the right wall to this item.",
                    },
                    "Blue Rupee Across Bridges": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 177, y: 138 },
                        Age: Age.CHILD,
                        LongDescription: "Go up to Saria's House and cross the two small bridges to get to this item.",
                    },
                    "3 Hearts on Saria's House": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Hearts",
                        MapInfo: { x: 206, y: 213 },
                        Age: Age.CHILD,
                        LongDescription: "Climb up the spiral to Saria's House to get to these items."
                    },
                    "2 Green Rupees in Grass by Know-it-All": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 139, y: 169 },
                        Age: Age.CHILD,
                        LongDescription: "Search the grass near the Know-it-All Brothers house to find these items."
                    },
                    "2 Green Rupees in Grass by Mido's": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 163, y: 110 },
                        Age: Age.CHILD,
                        LongDescription: "Search the grass near the Mido's house to find these items."
                    },
                    "Rupee Circle Above Shop": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "Rupee Circle",
                        MapInfo: { x: 291, y: 106 },
                        Age: Age.ADULT,
                        LongDescription: "Ride the bean platform or use hover boots to reach these items.",
                        CustomRequirement: function(age) {
                            return Data.canUseBoomerang(age) ||
                                Equipment.HOVER_BOOTS.playerHas || 
                                Data.itemLocationObtained("Kokiri Forest", "main", "*Plant Bean by Kokiri Shop");
                        }
                    }
                }
            },

            afterMido: {
                Exits: {
                    main: {},
                    "Deku Tree Entrance": {
                        OwExit: OwExits["Kokiri Forest"]["Deku Tree Entrance"]
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
            firstHalf: {
                Exits: {
                    secondHalf: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Settings.GlitchesToAllow.midoSkip || Data.canPlaySong(Songs.SARIAS_SONG);
                        }
                    },
                    kokiriForestWarp: {},
                    "Goron City": {
                        OwExit: OwExits["Lost Woods"]["Goron City"]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Lost Woods"]["Zora's River"]
                    },
                    "To Lost Woods Bridge": {
                        OwExit: OwExits["Lost Woods"]["To Lost Woods Bridge"]
                    },
                    "Bridge To Lost Woods": {
                        CustomRequirement: function() {
                            return false; // This one is the one-way
                        }
                    },

                    // Interiors & Grottos
                    "Grotto by Goron City Entrance": {
                        OwExit: OwExits["Lost Woods"]["Grotto by Goron City Entrance"]
                    }
                },
    
                ItemLocations: {
                    "Target Shooting Prize": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 219, y: 172 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Shoot the target in the center three times in a row with your Slingshot to get this prize.",
                        RequiredItems: [Items.FAIRY_SLINGSHOT]
                    },
                    "Skull Kid's Gift": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 96, y: 172 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left one screen. Stand on the lower stump and play Saria's Song to get this gift",
                        RequiredSongs: [Songs.SARIAS_SONG],
                        DifficultOcarinaItems: true
                    },
                    "Ocarina Memory Game": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 240, y: 186 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Go down the cliff and stand on the lower stump. Take out your Ocarina and win the Simon game to get this prize.",
                        NeedsOcarina: true,
                        DifficultOcarinaItems: true
                    },
                    "Skulltula in Soil by Bridge": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 84, y: 222 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left, and then left. Plant bugs in the soil in this room.",
                        NeedsBottle: true
                    },
                    "Scrub by Bridge": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 91, y: 273 },
                        ScrubSanityNotRequired: true, // Deku stick upgrade
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left and follow the path to its end. You'll find the scrub at the end."
                    },
                    "Sell Skull Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 88, y: 172 },
                        Age: Age.CHILD,
                        RequiredItems: [ChildTradeItems.SKULL_MASK],
                        RequiredSongs: [Songs.SARIAS_SONG],
                        LongDescription: "First, play Saria's song to the Skull kid. Next, Talk to him while wearing the Skull Mask to sell it to him - this unlocks the Spooky Mask. Recommended to do this AFTER you get the forest stage item.",
                    },
                    "Gossip Stone by Bridge Scrub": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 80, y: 281 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the business scrub by the bridge.",
                    },
                    "*Plant Bean by Bridge": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 84, y: 222 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the bridge connecting Kokiri Forest and Hyrule Field. It can be used to get on the bridge."
                    },
                    "7 Green Rupees in Water": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "7 Green Rupees",
                        MapImageName: "7 Green Rupees",
                        MapInfo: { x: 273, y: 127 },
                        Age: Age.CHILD,
                        RequiredChoiceOfItems: [Items.BOOMERANG, Equipment.SCALE],
                        LongDescription: "In the water leading to Zora's River - dive or use the boomerang to get these items.",
                    },
                    "Close Green Rupee in Water": { //TODO: need to check if this is the only one you can get in this way
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 277, y: 127 },
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
                    },
                    "Blue Rupee Under Rock": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 265, y: 28 },
                        Age: Age.EITHER,
                        LongDescription: "This item is under the rock one room from the Sacred Forest Meadow.",
                        CustomRequirement: function(age) {
                            return Data.canBlastOrSmash(age) ||
                                (Settings.GlitchesToAllow.boomerangThroughWalls && Data.canUseBoomerang(age));
                        }
                    }
                }
            },

            secondHalf: {
                Exits: {
                    firstHalf: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || 
                                Data.canPlaySong(Songs.SARIAS_SONG) ||
                                Data.canMegaFlip(age);
                        }
                    },
                    kokiriForestWarp: {},
                    "Sacred Forest Meadow": {
                        OwExit: OwExits["Lost Woods"]["Sacred Forest Meadow"]
                    },

                    // Interiors & Grottos
                    "Forest Stage Grotto": {
                        OwExit: OwExits["Lost Woods"]["Forest Stage Grotto"]
                    },
                    "Grotto Near the Sacred Forest Meadow": {
                        OwExit: OwExits["Lost Woods"]["Grotto Near the Sacred Forest Meadow"]
                    }
                },

                ItemLocations: {
                    "Skulltula in Soil by Forest Stage": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 187, y: 66 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. Plant bugs in the soil in this room.",
                        NeedsBottle: true
                    },
                    "Skulltula by Forest Stage": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 188, y: 56 },
                        Age: Age.ADULT,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. Plant a magic bean here as a child. Come back as an adult at night and ride the plant up.",
                        CustomRequirement: function(age) {
                            let canRideUp = Data.itemLocationObtained("Lost Woods", "secondHalf", "*Plant Bean by Forest Stage");
                            let canGetWithHookshot = Settings.GlitchesToAllow.lwSkullWithoutBean && Items.BOMBCHU.playerHas && Items.HOOKSHOT.playerHas;
                            return canRideUp || canGetWithHookshot;
                        }
                    },
                    "Right Scrub by Forest Stage": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 194, y: 72 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the right scrub in this room."
                    },
                    "Left Scrub by Forest Stage": {
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 184, y: 101 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the left scrub in this room."
                    },
                    "Front Scrub in Grotto Near the Sacred Forest Meadow": {
                        ItemGroup: ItemGroups.SCRUB,
                        RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleGrottoEntrances && !Settings.RandomizerSettings.scrubSanity; },
                        MapInfo: { x: 202, y: 27 },
                        ScrubSanityNotRequired: true, // Deku nut upgrade
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room. This is the front scrub.",
                        NeedToBlastOrSmash: true
                    },
                    "*Plant Bean by Forest Stage": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 187, y: 66 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot near the entrance to the Forest Stage. It's used to get a skulltula above as an adult."
                    }
                }
            },

            kokiriForestWarp: {
                Exits: {
                    firstHalf: {
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
                Exits: {
                    afterGate: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Data.hasDamagingItem(age);
                        }
                    },
                    "Lost Woods": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Lost Woods"]
                    },

                    // Interiors & Grottos
                    "Grotto near Lost Woods": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Grotto near Lost Woods"]
                    }
                },
                ItemLocations: {}
            },

            afterGate: {
                Exits: {
                    main: {},
                    "Forest Temple Entrance": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Forest Temple Entrance"]
                    },
                    "Minuet Teleport Pad": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Minuet Teleport Pad"]
                    },

                    // Interiors & Grottos
                    "Grotto in Maze Center": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Grotto in Maze Center"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Song of Storms Grotto"]
                    }
                },
                
                ItemLocations: {
                    "Skulltula on Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 219, y: 144 },
                        Age: Age.ADULT,
                        Region: "afterGate",
                        LongDescription: "At night, climb the ladder from the Forest Temple side. The skulltula will be on the left wall.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Saria's Song": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 200, y: 27 },
                        Age: Age.CHILD,
                        Region: "afterGate",
                        LongDescription: "After obtaining Zelda's Letter, make your way to the end of the maze to get this item.",
                        RequiredItems: [ChildTradeItems.ZELDAS_LETTER]
                    },
                    "Minuet of Forest": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 190, y: 42 },
                        Age: Age.ADULT,
                        Region: "afterGate",
                        LongDescription: "Make your way to the end of the maze to get this item."
                    },
                    "Gossip Stone by Forest Temple": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 176, y: 53 },
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This stone is in the southwest corner of the area the forest temple is in."
                    },
                    "East Gossip Stone on Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 207, y: 228 },
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This stone is on top of the maze. It's the one that's more to the east."
                    },
                    "West Gossip Stone on Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 149, y: 176 },
                        Age: Age.EITHER,
                        Region: "afterGate",
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
                Exits: {
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
                    "Gerudo Valley": {
                        OwExit: OwExits["Hyrule Field"]["Gerudo Valley"]
                    },
                    "Lake Hylia": {
                        OwExit: OwExits["Hyrule Field"]["Lake Hylia"]
                    },

                    // Interiors & Grottos
                    "Hidden Grotto by Kakariko": {
                        OwExit: OwExits["Hyrule Field"]["Hidden Grotto by Kakariko"]
                    },
                    "Grotto in Drawbridge Rock": {
                        OwExit: OwExits["Hyrule Field"]["Grotto in Drawbridge Rock"]
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
                    "Grotto by Lake Hylia Fences": {
                        OwExit: OwExits["Hyrule Field"]["Grotto by Lake Hylia Fences"]
                    },
                    "Open Grotto East of Lake Hylia Fences": {
                        OwExit: OwExits["Hyrule Field"]["Open Grotto East of Lake Hylia Fences"]
                    },
                    "Grotto in Southeast Forest Rock": {
                        OwExit: OwExits["Hyrule Field"]["Grotto in Southeast Forest Rock"]
                    }
                },

                ItemLocations: {
                    "Ocarina of Time in Moat": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: {x: 207, y: 36},
                        Age: Age.CHILD,
                        LongDescription: "After obtaining all the spiritual stones, stand by the drawbridge to the Market. After the cutscene, grab the Ocarina from the moat.",
                        RequiredMedallions: [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE
                        ]
                    },
                    "Sell Bunny Hood": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 184, y: 145 },
                        Age: Age.CHILD,
                        RequiredItems: [ChildTradeItems.BUNNY_HOOD],
                        RequiredMedallions: [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE
                        ],
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
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Lon Lon Ranch"]["Hyrule Field"]
                    },

                    // Interiors & Grottos
                    "Talon's House": {
                        OwExit: OwExits["Lon Lon Ranch"]["Talon's House"]
                    },
                    "Stable": {
                        OwExit: OwExits["Lon Lon Ranch"]["Stable"]
                    },
                    "Cow Shed": {
                        OwExit: OwExits["Lon Lon Ranch"]["Cow Shed"]
                    },
                    "Open Grotto in Southwest Corner": {
                        OwExit: OwExits["Lon Lon Ranch"]["Open Grotto in Southwest Corner"]
                    }
                },

                ItemLocations: {
                    "Skulltula on Talon's House": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 240, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "At night, there's a skulltula high up on Talon's House.",
                        IsAtShortDistance: true
                    },
                    "Skulltula in Tree by Entrance": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 280, y: 100 },
                        Age: Age.CHILD,
                        LongDescription: "The tree is just passed the houses to the left. Roll into it to reveal the skulltula. Use a pot from the beginning to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula on Rain Shed": {
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
                        IsAtShortDistance: true
                    },
                    "Epona's Song": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 174, y: 170 },
                        Age: Age.CHILD,
                        LongDescription: "You can get this after getting Malon's gift and waking up Talon with the Chicken at Hyrule Castle. Take out your Ocarina to get the item.",
                        NeedsOcarina: true,
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Castle", "main", "Gift from Malon") &&
                                Data.itemLocationObtained("Castle", "main", "Wake up Talon");
                        }
                    },
                    "4 Pots by Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 193, y: 44 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are on the wall near the stable door."
                    },
                    "3 Pots in Rain Shed": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 234, y: 213 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are in the rain shed inside the horse enclosure."
                    },
                    "Crate by Talon's House": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 250, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, this crate is next to Talon's House, by the skulltula tree.",
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
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Market Entrance"]["Hyrule Field"]
                    },
                    "Market": {
                        OwExit: OwExits["Market Entrance"]["Market"]
                    },

                    // Interiors & Grottos
                    "Guard House by Entrance": {
                        OwExit: OwExits["Market Entrance"]["Guard House by Entrance"]
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
                    "2 Crates by Bazaar": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 303, y: 203 },
                        Age: Age.CHILD,
                        LongDescription: "These crates are on either side of the bazaar door. They only drop items at night."
                    },
                    "2 Crates by Archery": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 250, y: 126 },
                        Age: Age.CHILD,
                        LongDescription: "These crates are on the right side of the archery minigame door. They only drop items at night."
                    }
                }
            },

            alley: {
                Exits: {
                    main: {},

                    // Interiors & Grottos
                    "Bombchu Shop Entrance": {
                        OwExit: OwExits["Market"]["Bombchu Shop Entrance"]
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
                Exits: {
                    "Market": {
                        OwExit: OwExits["Castle"]["Market"]
                    },
                    "Ganon's Castle Entrance": {
                        OwExit: OwExits["Castle"]["Ganon's Castle Entrance"]
                    },

                    // Interiors & Grottos
                    "Hyrule Great Fairy Fountain": {
                        OwExit: OwExits["Castle"]["Hyrule Great Fairy Fountain"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Castle"]["Song of Storms Grotto"]
                    },
                    "Ganon Great Fairy Fountain": {
                        OwExit: OwExits["Castle"]["Ganon Great Fairy Fountain"]
                    }
                },
    
                ItemLocations: {
                    //-- Hyrule castle
                    "Gift from Malon": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 123, y: 248, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Malon is waiting by the vines to the right. If she isn't there, leave the map and come back. Talk to her to receive an item."
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 97, y: 245, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Roll into the first tree to set this skulltula free."
                    },
                    "Wake up Talon": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        Age: Age.CHILD,
                        MapInfo: { x: 193, y: 38, floor: "HYR" },
                        LongDescription: "Wait for the Weird Egg to hatch, then wake up Talon. This unlocks a few things in Lon Lon Ranch.",
                        RequiredItems: [ChildTradeItems.WEIRD_EGG]
                    },
                    "Zelda's Lullaby": {
                        //TOOD: after the full trade shuffle, we can add the trick to use explosives to get this early
                        // Also, there will be two checks here due to Zelda's letter being shuffled
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 167, y: 33, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "After waking up Talon with the Chicken, push the crates down so that you can jump to the crawlspace. Sneak past the guards to meet Zelda to get her letter. After that, try to leave the area to receive this item from Impa.",
                        RequiredItems: [ChildTradeItems.WEIRD_EGG]
                    },
                    "Gossip Stone by Vines": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 137, y: 269, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "This stone near the top of the vines."
                    },
                    "Gossip Stone by Climbable Stones": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 72, y: 99, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "This stone near the climbable stones near the castle moat."
                    },

                    //-- Ganon's castle
                    "Skulltula on Broken Arch": {
                        ItemGroup: ItemGroups.SKULLTULA,
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
		Regions: {
            main: {
                Exits: {
                    beyondGate: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || 
                                Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter") || 
                                Settings.RandomizerSettings.openKakariko;
                        }
                    },
                    "Hyrule Field": {
                        OwExit: OwExits["Kakariko Village"]["Hyrule Field"]
                    },
                    "Graveyard": {
                        OwExit: OwExits["Kakariko Village"]["Graveyard"]
                    },
                    "Bottom of the Well Entrance": {
                        OwExit: OwExits["Kakariko Village"]["Bottom of the Well Entrance"]
                    },

                    // Interiors & Grottos
                    "Open Grotto Behind Potion Shop": {
                        OwExit: OwExits["Kakariko Village"]["Open Grotto Behind Potion Shop"]
                    },
                    "Hidden Grotto near Tree": {
                        OwExit: OwExits["Kakariko Village"]["Hidden Grotto near Tree"]
                    },
                    "Archery Minigame": {
                        OwExit: OwExits["Kakariko Village"]["Archery Minigame"]
                    },
                    "Back of Impa's House": {
                        OwExit: OwExits["Kakariko Village"]["Back of Impa's House"]
                    },
                    "Impa's House": {
                        OwExit: OwExits["Kakariko Village"]["Impa's House"]
                    },
                    "House of Skulltula": {
                        OwExit: OwExits["Kakariko Village"]["House of Skulltula"]
                    },
                    "Windmill": {
                        OwExit: OwExits["Kakariko Village"]["Windmill"]
                    },
                    "Windmill to Interior": {
                        OwExit: OwExits["Kakariko Village"]["Windmill to Interior"]
                    },
                    "Talon's House": {
                        OwExit: OwExits["Kakariko Village"]["Talon's House"]
                    },
                    "Bazaar": {
                        OwExit: OwExits["Kakariko Village"]["Bazaar"]
                    },
                    "Potion Shop Front": {
                        OwExit: OwExits["Kakariko Village"]["Potion Shop Front"]
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
                    "Bottle from Cucco Collection": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 210, y: 244 },
                        Age: Age.CHILD,
                        LongDescription: "This is the prize that Anju gives you after collecting all 7 cuccos in the pen. Note that leaving the map will keep your progress."
                    },
                    "Gift from the Guy on the Roof": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 212, y: 124 },
                        Time: function() {
                            let canUseISG = Settings.GlitchesToAllow.isg && Data.hasSwordWeapon(Age.CHILD) && Data.hasShield(Age.CHILD);
                            if (canUseISG || Items.FAIRY_SLINGSHOT.playerHas || Items.BOMBCHU.playerHas || (Settings.GlitchesToAllow.watchtowerSkullJumpslash && Data.hasSwordWeapon(Age.CHILD))) {
                                return Time.EITHER;
                            }
                            return Time.DAY_CHILD;
                        },
                        Age: Age.EITHER,
                        LongDescription: "The guy on the roof of the house gives you an item. To get this as a child, climb the giant watchtower, position yourself at the upper left corner, then sidehop left without holding any direction. As an adult, you can either hookshot to the roof from the fence by the windmill, or do a jump to the potion shop roof from the ledge leading to Death Mountain."
                    },
                    "Gift From Anju": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 210, y: 240 },
                        Age: Age.ADULT,
                        LongDescription: "Simply talk to Anju (the cucco lady) as adult to get this."
                    },
                    "Show Guard Letter": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function() {
                            return !Settings.RandomizerSettings.openKakariko;
                        },
                        MapInfo: { x: 107, y: 41 },
                        Age: Age.CHILD,
                        RequiredItems: [ChildTradeItems.ZELDAS_LETTER],
                        LongDescription: "Show the guard Zelda's Letter. This unlocks the mask trading sequence.",
                    },
                    "Sell Keaton Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 123, y: 41 },
                        Age: Age.CHILD,
                        RequiredItems: [ChildTradeItems.KEATON_MASK],
                        LongDescription: "Talk to the guard while wearing the Keaton mask to sell it to him - this unlocks the Skull Mask.",
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 97, y: 179 },
                        Age: Age.CHILD,
                        LongDescription: "At night, roll into the tree in the center of the village to reveal this skulltula. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula on House of Skulltulas": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 121, y: 218 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the House of Skulltulas. If you have no weapon, use a pot near Impa's house to kill it (up the nearby stairs).",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula at Construction Site": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 191, y: 201 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the pile of bricks at the construction site. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula on Bazaar": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 96, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Bazaar (the building by the entrance to Death Mountain). It's near some pots. Use them to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true
                    },
                    "Skulltula on Watchtower": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 169, y: 111 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the watchtower ladder. You can kill it with either the slingshot or a bombchu. If you don't have those, you can also climb up as far as you can, and press A to let go of the ladder, then spam the jumpslash button for your sword or stick for the kill.",
                        CustomRequirement: function(age) {
                            let canUseISG = Settings.GlitchesToAllow.isg && Data.hasSwordWeapon(age) && Data.hasShield(age);
                            return canUseISG || Items.FAIRY_SLINGSHOT.playerHas || Items.BOMBCHU.playerHas || (Settings.GlitchesToAllow.watchtowerSkullJumpslash && Data.hasSwordWeapon(age));
                        }
                    },
                    "Skulltula on Impa's Roof": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 172, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "At night, from the ledge near the entrance to Impa's House, hookshot to the House of Skulltula. From there, hookshot to Impa's house. You'll find the skulltula on the back wall.",
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Nocturne of Shadow": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 35, y: 209 },
                        Age: Age.ADULT,
                        LongDescription: "You can get this item if you have the forest, fire, and water medallions. Just enter Kakariko Village as an adult.",
                        RequiredMedallions: [Medallions.FOREST_MEDALLION, Medallions.FIRE_MEDALLION, Medallions.WATER_MEDALLION]
                    },
                    "3 Pots Near Impa's House": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 136, y: 247 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are next to the door to Impa's house."
                    },
                    "3 Pots Near Watchtower": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 180, y: 111 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are near the ladder to the watchtower."
                    },
                    "3 Pots Near Bazaar": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 110, y: 74 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are near the Bazaar entrance close to Death Mountain Trail."
                    },
                    "2 Pots Near Granny's Potion Shop": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 242, y: 138 },
                        Age: Age.CHILD,
                        LongDescription: "These pots are next to the door to Granny's Potion Shop in the enclosed area."
                    },
                    "Crate by Archery or Beggar": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 185, y: 192 },
                        Age: Age.ADULT,
                        LongDescription: "This crate is next to the entrance to the archery minigame or close to the beggar near the watchtower. The drop is shared between the two."
                    },
                    "Crate Behind Potion Shop": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 249, y: 134 },
                        Age: Age.ADULT,
                        LongDescription: "One of the four crates in the enclosed area will drop an item - it's random which it is."
                    }
                }
            },

            beyondGate: {
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
                Exits: {
                    top: {
                        CustomRequirement: function(age) {
                            return Data.canGetToGraveyardTopEarly(age);
                        }
                    },
                    royalFamilyTomb: {
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },
                    shadowTemple: {
                        CustomRequirement: function(age) {
                            return Data.canGetToGraveyardTopEarly(age);
                        }
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Graveyard"]["Kakariko Village"]
                    },

                    // Interiors & Grottos
                    "Grave with Flowers": {
                        OwExit: OwExits["Graveyard"]["Grave with Flowers"]
                    },
                    "Unmarked Grave": {
                        OwExit: OwExits["Graveyard"]["Unmarked Grave"]
                    },
                    "Dampe's Shed": {
                        OwExit: OwExits["Graveyard"]["Dampe's Shed"]
                    },
                    "Dampe's Grave": {
                        OwExit: OwExits["Graveyard"]["Dampe's Grave"]
                    },
                    "Dampe's Grave to Dampe Race": {
                        OwExit: OwExits["Graveyard"]["Dampe's Grave to Dampe Race"]
                    }
                },

                ItemLocations: {
                    "Dampe's Heart-Pounding Graveyard Tour": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 184, y: 176 },
                        Age: Age.CHILD,
                        LongDescription: "Get to the graveyard when it's barely night time. If you play the Sun's Song, make sure you do it where time passes, then quickly take the exit to Kakariko before it becomes too late. Simply talk to Dampe and pay him 10 rupees to get this item."
                    },
                    "Heart Piece in Crate": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 147, y: 81 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.boomerangGraveyardHP; },
                        LongDescription: "Plant a magic bean in the soft soil as a child. Come back as adult to get the item from the crate. Alternatively, the Longshot can reach the crate if you stand on one of the graves.",
                        CustomRequirement: function(age) {
                            if (Data.canUseBoomerang(age)) { 
                                return Settings.GlitchesToAllow.boomerangGraveyardHP && Data.canUseBoomerang(age);
                            }
                            
                            if (age === Age.CHILD) { return false; }
                            
                            let beanIsPlanted = Data.itemLocationObtained("Graveyard", "main", "*Plant Bean by Dampe's Grave");
                            return Items.HOOKSHOT.currentUpgrade === 2 || beanIsPlanted || Data.canWeirdShot(age);
                        }
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 159, y: 91 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soft soil by Dampe's grave.",
                        NeedsBottle: true
                    },
                    "Skulltula on Back Right Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 242, y: 264 },
                        Age: Age.CHILD,
                        LongDescription: "At night, this skulltula is high up on the back right wall of the graveyard.",
                        IsAtShortDistance: true
                    },
                    "Sell Spooky Mask": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 184, y: 145 },
                        Age: Age.CHILD,
                        RequiredItems: [ChildTradeItems.SPOOKY_MASK],
                        LongDescription: "Talk to the graveyard kid during the day while wearing the Spooky Mask to sell it to him - this unlocks the Bunny Hood.",
                    },
                    "*Plant Bean by Dampe's Grave": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 159, y: 91 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by Dampe's Grave. It's used to get to the freestanding heart piece in the box above."
                    }
                },
            },

            top: {
                DuplicateWarpSongPriority: 1,
                Exits: {
                    main: {},
                    royalFamilyTomb: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.unloadGrave;
                        }
                    },
                    shadowTemple: {
                        RequiredItems: [Equipment.MAGIC, Items.DINS_FIRE]
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
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {},
                    "Royal Family's Tomb": {
                        OwExit: OwExits["Graveyard"]["Royal Family's Tomb"]
                    }
                },
                ItemLocations: {}
            },

            shadowTemple: {
                ExcludeFromSpawnList: true,
                Exits: {
                    top: {},
                    "Shadow Temple Entrance": {
                        OwExit: OwExits["Graveyard"]["Shadow Temple Entrance"]
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
            // Dampe's Grave and Windmill area
            dampesGrave: {
                UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleGrottoEntrances; },
                Exits: {
                    windmillTop: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD 
                                ? Data.canGroundJumpWithBomb(Age.CHILD) 
                                : Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    "Grave Exit": {
                        OwExit: OwExits["Windmill-Kak Potion"]["Grave Exit"]
                    }
                },
                ItemLocations: {
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
                    },
                    "3 Pots Left of Grave Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 79, y: 256, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are to the left of the spawn pad."
                    },
                    "3 Pots Right of Grave Entrance": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
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
                        LongDescription: "From the start, follow the right wall to the rupee.",
                    },
                    "Race Rupee 2": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 125, y: 152, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "The rupee is on the right after the second turn of the normal route.",
                    },
                    "Race Rupee 3": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 135, y: 58, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "Take the right path at the fork after the second turn - keep following the right wall for the rupee.",
                    },
                    "Race Rupee 4": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 126, y: 19, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the first door, the rupee will be on the left.",
                    },
                    "Race Rupee 5": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 173, y: 19, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocks, go down the left path for the rupee.",
                    },
                    "Race Rupee 6": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 220, y: 85, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "In the big room with the rocs, go straight, take a right, then follow the left wall to the rupee.",
                    },
                    "Race Rupee 7": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 229, y: 122, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, follow the left wall to the rupee.",
                    },
                    "Race Rupee 8": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 173, y: 160, floor: "DMP" },
                        Age: Age.EITHER,
                        LongDescription: "After the second door, at the ledges, climb up the left ledge for the rupee (watch out for the redead).",
                    }
                }
            },
            windmillTop: {
                ExcludeFromSpawnList: true,
                Exits: {
                    windmill: {},
                    windmillItem: {}
                },
                ItemLocations: {}
            },
            windmillItem: {
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
                Exits: {
                    windmillItem: {
                        RequiredChildItems: [Items.BOOMERANG],
                        CustomRequirement(age) {
                            if (age === Age.CHILD) { return true; }
                            return Settings.GlitchesToAllow.windmillHPWithNothing ||
                                (Settings.GlitchesToAllow.windmillHPWithHookshot && Items.HOOKSHOT.playerHas)
                        }
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
                        NeedsOcarina: true
                    },
                    "Drain Well Water": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 244, y: 243, floor: "WND" },
                        Age: Age.CHILD,
                        LongDescription: "Play the song of storms by the windmill guy to drain the well water.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            // Potion shop
            kakPotionShop: {
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
                Exits: {
                    upper: {
                        CustomRequirement: function(age) {
                            let canRideTrailBeanPlant = age === Age.ADULT && Data.itemLocationObtained("Death Mountain Trail", "main", "*Plant Bean by Dodongo's Cavern");
                            let areRocksGone = Data.canBlastOrSmash(age) || Data.itemLocationObtained("Death Mountain Trail", "main", "Break Rocks Blocking Top Path");
                            return canRideTrailBeanPlant || areRocksGone;
                        }
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Death Mountain Trail"]["Kakariko Village"]
                    },
                    "Goron City": {
                        OwExit: OwExits["Death Mountain Trail"]["Goron City"]
                    },
                    "Dodongo's Cavern Entrance": {
                        OwExit: OwExits["Death Mountain Trail"]["Dodongo's Cavern Entrance"]
                    },

                    // Interiors & Grottos
                    "Song of Storms Grotto near Goron City": {
                        OwExit: OwExits["Death Mountain Trail"]["Song of Storms Grotto near Goron City"]
                    }
                },

                ItemLocations: {
                    "Chest in Wall Near Goron City": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 212, y: 207 },
                        Age: Age.EITHER,
                        LongDescription: "If you take the left path out of Goron City, the wall to bomb or hammer will be to your right.",
                        CustomRequirement: function(age) {
                            let canClipIn = Settings.GlitchesToAllow.dmtClipToChestByGoron && Data.hasSwordWeapon(age);
                            return canClipIn || Data.canBlastOrSmash(age);
                        }
                    },
                    "Heart Piece Above Dodongo's Cavern": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 180, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "You can do a slight angled backflip near the Bomb Flower above the cavern to get to this. Alternatively, you can plant a bean and ride it up."
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 179, y: 168 },
                        Age: Age.CHILD,
                        LongDescription: "After removing the boilder by Dodongo's Cavern, the soft soil to plant the bug in is revealed. If you need a weapon to kill it, use the bomb flower from above.",
                        OverrideItemGroupCondition: true,
                        NeedsExplosivesOrBombFlower: true,
                        NeedsBottle: true
                    },
                    "Red Rock by Goron City": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 215, y: 167 },
                        Age: Age.ADULT,
                        LongDescription: "At night, leave Goron City. Follow the right wall until you reach a red rock. Break it with your hammer to reveal the skulltula.",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.dmtSkullsWithoutHammer || Data.canUseHammer(age);
                        }
                    },
                    "In Wall by Kakariko": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 151, y: 235 },
                        Age: Age.EITHER,
                        LongDescription: "From the Kakariko entrance, follow the right wall until you get to the discolored wall. Bomb or hammer it to reveal the skulltula. Child can Deku Stick jumpslash, Bomb, Bombchu, Slingshot, or Boomerang it. Adult can jumpslash it. You can climb the wall to collect the token.",
                        NeedToBlastOrSmash: true // Well, it has the same requirements
                    },
                    "*Plant Bean by Dodongo's Cavern":  {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 179, y: 168 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot in the entrance to Dodongo's Cavern. You must first destroy the rock to get to it. It can be used to skip blowing up the rocks to get to the top part of the mountain.",
                        NeedsExplosivesOrBombFlower: true,
                    },
                    "Break Rocks Blocking Top Path":  {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 202, y: 201 },
                        Age: Age.EITHER,
                        LongDescription: "Used for co-op. These are the rocks blocking the path to Death Mountain Crater.",
                        NeedToBlastOrSmash: true,
                        CoOpOnly: true
                    },
                    "Red Rupee in Rock by Cow Grotto": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Red Rupee",
                        MapInfo: { x: 206, y: 203 },
                        Age: Age.CHILD,
                        LongDescription: "As a child, this item is under the highest rock that's blocking access to the top of Death Mountain. You can snag it with the boomerang from the bottom with a good angle.",
                        CustomRequirement: function(age) {
                            return Data.canBlastOrSmash(age) ||
                                (Settings.GlitchesToAllow.boomerangThroughWalls && Data.canUseBoomerang(age));
                        }
                    },
                    "Blue Rupee in Rock Below Cow Grotto": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Blue Rupee",
                        MapInfo: { x: 190, y: 203 },
                        Age: Age.CHILD,
                        LongDescription: "As a child, this item is under the leftmost rock by the rocks blocking access to the top of Death Mountain. You can snag it with the boomerang if you stand far back enough on the platform.",
                        CustomRequirement: function(age) {
                            return Data.canBlastOrSmash(age) ||
                                (Settings.GlitchesToAllow.boomerangThroughWalls && Data.canUseBoomerang(age));
                        }
                    }
                }
            },

            upper: {
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
                    "Turn in Claim Check": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 238, y: 28 },
                        Age: Age.ADULT,
                        LongDescription: "When you have the Claim Check, head up to the top of Death Mountain. Give it to Biggoron for your item.",
                        RequiredItems: [AdultTradeItems.CLAIM_CHECK],
                    },
                    "Red Rock on Upper Path": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 217, y: 96 },
                        Age: Age.ADULT,
                        LongDescription: "At night, take the upper path of the mountain - the one that causes the volcano to erupt. The red rock has a skulltula in it - break it with your hammer.",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.dmtSkullsWithoutHammer || Data.canUseHammer(age);
                        }
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
                Exits: {
                    middle: {
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas);
                        }
                    },
                    bottom: {
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age);
                        }
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
                    "Heart Piece in Wall": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 186, y: 191 },
                        Age: Age.EITHER,
                        LongDescription: "At the top of the crater, you can climb down the wall that's facing the Fire Temple to receive this item - you'll start climbing if you backwalk off it."
                    },
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
                    "Gossip Stone Behind Bombable Wall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 284, y: 248 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is behind a bombable wall across a wooden bridge in the top area of the crater.",
                        NeedsExplosives: true
                    }
                }
            },

            middle: {
                Exits: {
                    top: {},
                    bottom: {
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) {
                                return true;
                            }
                            
                            return age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas);
                        }
                    },
                    volcano: {
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || (Settings.GlitchesToAllow.hoverToVolcanoHP && age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas);
                        }
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
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 56, y: 85 },
                        Age: Age.ADULT,
                        LongDescription: "These pots are near the entrance to Goron City. They only have items in them as Adult."
                    }
                }
            },

            bottom: {
                Exits: {
                    middle: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let beanPlanted = Data.itemLocationObtained("Death Mountain Crater", "bottom", "*Plant Bean by Bolero Warp Point");
                            return beanPlanted || Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas; 
                        }
                    },
                    volcano: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Death Mountain Crater", "bottom", "*Plant Bean by Bolero Warp Point");
                        }
                    },
                    scarecrowPlatform: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.canHookScarecrow(age) && Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    },
                    "Fire Temple Entrance": {
                        OwExit: OwExits["Death Mountain Crater"]["Fire Temple Entrance"]
                    },
                    "Bolero Teleport Pad": {
                        OwExit: OwExits["Death Mountain Crater"]["Bolero Teleport Pad"]
                    }
                },

                ItemLocations: {
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 177, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "Use the Bolero of fire to get here as a child. Drop bugs in the nearby soft soil to spawn the skulltula.",
                        NeedsBottle: true
                    },
                    "Bolero of Fire": {
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 161, y: 84 },
                        Age: Age.ADULT,
                        LongDescription: "You will get this item as adult when you reach the part of the broken bridge that touches the land.",
                    },
                    "*Plant Bean by Bolero Warp Point": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 177, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Bolero of Fire warp point. It helps you get to the heart piece on the volcano.",
                    },
                    "Red Rupee on First Island": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Red Rupee",
                        MapInfo: { x: 235, y: 57 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, from the Bolero warp, make your way to the first tiny island across the wooden bridge for this item.",
                    },
                    "Rupee Circle on Second Island": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "Expensive Rupee Circle",
                        MapInfo: { x: 280, y: 80 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, from the bolero warp, make your way to the second tiny island across the wooden bridges for these items."
                    }
                }
            },

            volcano: {
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Heart Piece on Volcano": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 134, y: 78 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        LongDescription: "Plant a bean in the soft soil by the Bolero warp point then ride it up to the volcano. You can also use hover boots near the entrance to Goron City to get it."
                    }
                }
            },

            scarecrowPlatform: {
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Rupee Circle on Scarecrow Platform": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
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
		Regions: {
            main: {
                Exits: {
                    darunia: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return Data.canPlaySong(Songs.ZELDAS_LULLABY); }
				            return Data.hasExplosivesOrStrength() || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    lostWoodsRocks: {
                        CustomRequirement: function(age) {
                            if (Data.itemLocationObtained("Goron City", "lostWoodsRocks", "Rocks Blocking Lost Woods")) {
                                return true;
                            }

                            let canShootBow = age === Age.ADULT && Items.FAIRY_BOW.playerHas;
                            let canLightBombFlower = Data.canUseFireItem(age) || Items.BLUE_FIRE.playerHas;
                            return canShootBow || canLightBombFlower || Equipment.STRENGTH.playerHas || Data.canBlastOrSmash(age);
                        }
                    },
                    spinningUrn: {
                        Age: Age.CHILD,
                        NeedsFire: true
                    },
                    shop: {
                        CustomRequirement: function(age) {
                            if (Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas || (age === Age.ADULT && Items.FAIRY_BOW.playerHas)) { return true; }
                            return age === Age.CHILD && Data.canUseFireItem(age);
                        }
                    },
                    "Death Mountain Trail": {
                        OwExit: OwExits["Goron City"]["Death Mountain Trail"]
                    },

                    // Interiors & Grottos
                    "Lava Room Grotto": {
                        OwExit: OwExits["Goron City"]["Lava Room Grotto"]
                    }
                },

                ItemLocations: {
                    "Stop Rolling Goron as Child": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 165, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "Blow up the rolling goron while he's in the tunnel and talk to him to get the item.",
                        NeedsExplosives: true
                    },
                    "Stop Rolling Goron as Adult": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 139, y: 97 },
                        Age: Age.ADULT,
                        LongDescription: "Stop the rolling goron with a bomb, bombchu or bomb flower and talk to him to get the item. You can also shoot the bomb flowers with an arrow with the right timing to stop him.",
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Item From Medigoron": {
                        ItemGroup: ItemGroups.GIFT,
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleCarpetAndMedigoron; },
                        MapInfo: { x: 117, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "Blow up/hammer the weak walls on the western side of the middle floor. Pay Medigoron 200 rupees for this item.",
                        RequiredItems: [{item: Equipment.WALLET, upgradeString: "1"}],
                        CustomRequirement: function(age) {
                            return Data.canBreakMudWalls(age) || Equipment.STRENGTH.playerHas || Data.canUseHammer(age);
                        }
                    },
                    "Leftmost Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 71, y: 24 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "Make your way to the topmost northwest corner of the city and bomb, pick up, or smash the rocks to get here. You can also go to the upper right corner, stand on the box, and backwalk & backflip with hover boots at the last moment to get to this chest (you will be stuck there).",
                        CustomRequirement: function(age) {
                            let canGetAsAdult = age === Age.ADULT && (
                                Equipment.STRENGTH.currentUpgrade > 1 ||
                                Equipment.HOVER_BOOTS.playerHas ||
                                Data.canWeirdShot(age)
                            );
                            return Data.canUseHammer(age) || canGetAsAdult;
                        }
                    },
                    "Left Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 78, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Right Maze Chest": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 86, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Skulltula in Maze Crate": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 91, y: 25 },
                        Age: Age.CHILD,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb or hammer the rocks to get to the back right corner of the maze. Roll into the crate the get this skulltula.",
                        NeedToBlastOrSmash: true
                    },
                    "Skulltula on Center Platform": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 180, y: 137 },
                        Age: Age.ADULT,
                        LongDescription: "There's a skulltula on the back side of the center platform. You may have to jump for it from the ropes if you don't have a hookshot."
                    },
                    "Gossip Stone in Maze": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 82, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this stone.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            return age === Age.ADULT && Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Gossip Stone By Medigoron": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 115, y: 275 },
                        Age: Age.EITHER,
                        LongDescription: "In the southern area of the middle floor, blow up the walls that has bombflowers near it. Eventually, you'll make it to Medigoron, where the stone is.",
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
                        }
                    },
                    "2 Pots by Lower Staircase": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 189, y: 199 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are just after the first set of stairs at the bottom of the city."
                    },
                    "3 Pots by Upper Staircase": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 79, y: 120 },
                        Age: Age.EITHER,
                        LongDescription: "From the upper exit, follow the left wall until you reach these pots."
                    },
                    "Pot by Medigoron": {
                        ItemGroup: ItemGroups.POT,
                        MapInfo: { x: 130, y: 243 },
                        Age: Age.EITHER,
                        LongDescription: "In the southern area of the middle floor, blow up the walls that has bombflowers near it. Eventually, you'll make it to Medigoron, where the pot is.",
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
                        }
                    },
                    "Maze Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 95, y: 21 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this crate.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            return age === Age.ADULT && Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    }
                }
            },

            darunia: {
                Exits: {
                    main: {},
                    spinningUrn: {
                        RequiredItems: [Items.DEKU_STICK]
                    },
                    lostWoodsRocks: {
                        Age: Age.CHILD, // The stick won't last all the way, no torches as adult
                        RequiredItems: [Items.DEKU_STICK]
                    },
                    shop: {
                        Age: Age.CHILD,
                        RequiredItems: [Items.DEKU_STICK]
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
                        RequiredSongs: [Songs.SARIAS_SONG]
                    },
                    "3 Pots by Darunia": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 204, y: 39 },
                        Age: Age.EITHER,
                        LongDescription: "Child: at the bottom of Goron City on the fancy carpet, play Zelda's Lullaby. Adult: stop the rolling goron to open the way here. Either: if you can manage to get to the Goron City entrance from the crater, that works too. The pots are on the tables against the wall."
                    }
                }
            },

            lostWoods: {
                Exits: {
                    lostWoodsRocks: {
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            return canUseDins ||
                                Data.canBlastOrSmash(age) ||
                                Data.itemLocationObtained("Goron City", "lostWoodsRocks", "Rocks Blocking Lost Woods");
                        }
                    },
                    "Lost Woods": {
                        OwExit: OwExits["Goron City"]["Lost Woods"]
                    }
                },
                ItemLocations: {}
            },

            lostWoodsRocks: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {},
                    lostWoods: {}
                },

                ItemLocations: {
                    "Rocks Blocking Lost Woods": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 212, y: 178 },
                        Age: Age.EITHER,
                        LongDescription: "These are the rocks blocking the Lost Woods entrance. Either blow them up (you can shoot the right one with a bow), or use a deku stick lit on fire to activate the nearby bomb flowers.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            let canUseDins = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
                            if (Data.canBlastOrSmash(age) || canUseDins) { return true; }

                            let canGetToMain = Data.canAccessMap(age, "Goron City", "main");
                            let canShootBow = age === Age.ADULT && Items.FAIRY_BOW.playerHas;
                            let canLightBombFlower = Data.canUseDekuStick(age) && Data.canAccessMap(age, "Goron City", "darunia");
                            let canExplodeBombFlower = Items.BLUE_FIRE.playerHas || Equipment.STRENGTH.playerHas;
                            return canGetToMain && (canShootBow || canLightBombFlower || canExplodeBombFlower);
                        }
                    }
                }
            },

            spinningUrn: {
                ExcludeFromSpawnList: true,

                // Only used for the one item check, so no need to mark exits
                Exits: {},
                ItemLocations: {
                    "Spinning Urn Heart Piece": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 189, y: 126 },
                        Age: Age.CHILD,
                        LongDescription: "First, light the torches at the bottom of the city. You can either use the lit torch in Darunia's room, or Din's Fire. After that, throw a Bomb or Bomb Flower so that the urn stops on the happiest face to get the item.",
                        RequiredChoiceOfItems: [Items.BOMB, Equipment.STRENGTH]
                    },
                    "8 Items From Spinning Urn": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "Spinning Pot",
                        MapInfo: { x: 189, y: 135 },
                        Age: Age.CHILD,
                        LongDescription: "First, light the torches at the bottom of the city. You can either use the lit torch in Darunia's room, or Din's Fire. After that, throw a Bomb or Bomb Flower so that the urn stops on the face you want.",
                        RequiredChoiceOfItems: [Items.BOMB, Equipment.STRENGTH]
                    }
                }
            },

            shop: {
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
                Exits: {
                    upstream: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || 
                                Data.canBlastOrSmash(age) ||
                                Data.itemLocationObtained("Zora's River", "downstream", "Break Rocks Blocking Path");
                        }
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
                        Age: Age.CHILD,
                        LongDescription: "Used for co-op. These are the rocks blocking the entrance to Zora's River.",
                        NeedToBlastOrSmash: true,
                        CoOpOnly: true
                    }
                }
            },

            upstream: {
                DuplicateWarpSongPriority: 1,
                Exits: {
                    downstream: {},
                    inWaterfall: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT && Settings.GlitchesToAllow.hoversToZorasDomain && Equipment.HOVER_BOOTS.playerHas) {
                                return true; // Hover boots in
                            } else if (age === Age.CHILD && Settings.GlitchesToAllow.cuccoToZorasDomain) {
                                return true; // Flying cucco
                            } else if (Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
                                return true; // Normal way in
                            }

                            // Megasidehop trick
                            return Settings.GlitchesToAllow.megasidehopToZorasDomain &&
                                Data.hasShield(age) &&
                                (Items.BOMB.playerHas || Items.BOMBCHU.playerHas);
                        }
                    },
                    "Lost Woods": {
                        OwExit: OwExits["Zora's River"]["Lost Woods"]
                    },

                    // Interiors & Grottos
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Zora's River"]["Song of Storms Grotto"]
                    },
                    "Open Grotto on Upper Cliff": {
                        OwExit: OwExits["Zora's River"]["Open Grotto on Upper Cliff"]
                    },
                    "Grotto Under Rock on Upper Cliff": {
                        OwExit: OwExits["Zora's River"]["Grotto Under Rock on Upper Cliff"]
                    }
                },

                ItemLocations: {
                    "Heart Piece on River Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 125, y: 94 },
                        Age: Age.EITHER,
                        LongDescription: "In the middle of the map, there's a heart piece on a high up platform. You can get this as a child using cuccos to fly to the platform. As adult, you can use hover boots from the cliff that you take a ladder to get up.",
                        RequiredAdultItems: [Equipment.HOVER_BOOTS]
                    },
                    "Heart Piece by Zora's Domain": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 266, y: 56 },
                        Age: Age.EITHER,
                        LongDescription: "At the end of the river, there's a heart piece on a platform. As child, you can jump there with a cucco or nab it with a Boomerang. As adult, you must use the Hover Boots.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            if (Equipment.HOVER_BOOTS.playerHas || Settings.GlitchesToAllow.adultWaterfallHPJump) { return true; }
                            return Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
                        }
                    },
                    "Bean Guy": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 72, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "This is the guy who sells beans near the Hyrule Field entrance."
                    },
                    "Frog Songs": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.GIFT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "Frogs",
                        MapInfo: { x: 155, y: 102 },
                        Age: Age.CHILD,
                        LongDescription: "All the items you get from the frogs near the middle of the map."
                    },
                    "Skulltula on Ladder": {
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
                        RequiredItems: [Items.HOOKSHOT]
                    },
                    "Skulltula on Cliff": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 132, y: 153 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go up the ladder closest to Hyrule Field. Jump to the cliff behind you to find the skulltula.",
                        IsAtShortDistance: true
                    },
                    "Plant Bean by Bean Guy": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 72, y: 142 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the guy who sells beans. It's only used for convenience sake."
                    },
                    "Gossip Stone on Cliff": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 155, y: 176 },
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. The stone is across the tiny bridge."
                    },
                    "Gossip Stone by Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 300, y: 145 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on one of the platforms in the water by the Zora's Domain entrance."
                    },
                    "4 Red Rupees by Waterfall": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Red Rupees",
                        MapInfo: { x: 308, y: 158 },
                        Age: Age.ADULT,
                        LongDescription: "These rupees are under the water next to the waterfall. You can jump from the Zelda's Lullaby spot to get them (adjust your position to get each one), though it's easiest with the iron boots."
                    }
                }
            },

            inWaterfall: {
                DuplicateWarpSongPriority: 2,
                Exits: {
                    upstream: {},

                    "Zora's Domain": {
                        OwExit: OwExits["Zora's River"]["Zora's Domain"]
                    },
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
                DuplicateWarpSongPriority: 1,
                Exits: {
                    behindKing: {
                        CustomRequirement: function(age) {
                            // Already moved, or can move now
                            if (Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora")) { return true; }
                            if (age === Age.CHILD && Items.RUTOS_LETTER.playerHas) { return true; }

                            // Open Zora's Fountain settings
                            switch (Settings.RandomizerSettings.openZorasFountain) {
                                case OpenZorasFountainSettings.ADULT:
                                    if (age === Age.ADULT) { return true; }
                                    break;
                                case OpenZorasFountainSettings.ALL:
                                    return true;
				            }
                
                            // Glitch past him
                            let canSkipAsChild = age === Age.CHILD && 
                                Settings.GlitchesToAllow.chuZoraSkip && 
                                Equipment.DEKU_SHIELD.playerHas &&
                                Items.BOMBCHU.playerHas &&
                                Data.hasSwordWeapon(age);

                            let canSkipAsAdult = age === Age.ADULT && Settings.GlitchesToAllow.clipZoraSkip;

                            return canSkipAsChild || canSkipAsAdult;
                        }
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
                    "Torch Run": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 154, y: 132 },
                        Age: Age.CHILD,
                        LongDescription: "Start at King Zora. Light a Deku Stick on one of the torches and make your way down the stairs. Light the next torch. Follow the left wall, lighting the torches as you go. Once you light the ones in the waterfall, a chest will spawn.",
                        RequiredItems: [Items.DEKU_STICK]
                    },
                    "Diving Minigame": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 158, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At the top of the Domain, pay 20 rupees to play the diving minigame. Talk to the Zora after you win to get your prize."
                    },
                    "Unfreeze King Zora": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 233, y: 46 },
                        Age: Age.ADULT,
                        LongDescription: "Dump Blue Fire on the frozen King Zora to thaw him. Talk to him from the platform in front of him and he will give you an item.",
                        CustomRequirement: function(age) {
                            if (Data.canUseBlueFire(age)) { return true; }
                            if (!Settings.GlitchesToAllow.thawKingZoraWithNothing) { return false; }
                            if (!Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora") && !SocketClient.isCoOp()) {
                                // The sign reading glitch doesn't seem to work on ModLoader...
                                return true;
                            }

                            return Data.hasBottle() || 
                                Object.values(AdultTradeItems).some(item => item.playerHas) ||
                                (Data.canEquipSwap(age) && Items.MAGIC_BEAN.playerHas) ||
                                (Equipment.MAGIC.playerHas && Items.NAYRUS_LOVE.playerHas);
                        }
                    },
                    "Skulltula on Top of Waterfall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 168, y: 68 },
                        Age: Age.ADULT,
                        LongDescription: "At night, make your way up to where the Diving Game start was. On the side of the wall by the waterfall, you'll find a skulltula. If you have no hookshot, you can kill it with a bow or Din's fire and get it with an angled jump. If you fall without getting it, it will respawn.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Gossip Stone by King": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 239, y: 63 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the water in front of the king."
                    },
                    "Move King Zora": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 233, y: 46 },
                        RequiredItems: [Items.RUTOS_LETTER],
                        Age: Age.CHILD,
                        LongDescription: "Show Ruto's letter to the king."
                    },
                    "2 Pots in Front of Shop": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 244, y: 260 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are right in front of the shop entrance."
                    },
                    "3 Pots Right of Shop": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 201, y: 260 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are just to the right of the shop entrance."
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
                    }
                }
            },

            behindKing: {
                Exits: {
                    main: {
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora");
                        }
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
                Exits: {
                    hiddenTunnel: {
                        Age: Age.ADULT,
                        NeedToBlastOrSmash: true,
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.currentUpgrade >= 2 || 
                                (Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2);
                        }
                    },
                    "Zora's Domain": {
                        OwExit: OwExits["Zora's Fountain"]["Zora's Domain"]
                    },
                    "Jabu Jabu's Belly Entrance": {
                        OwExit: OwExits["Zora's Fountain"]["Jabu Jabu's Belly Entrance"]
                    },
                    "Ice Cavern Entrance": {
                        OwExit: OwExits["Zora's Fountain"]["Ice Cavern Entrance"]
                    },

                    // Interiors & Grottos
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Zora's Fountain"]["Great Fairy Fountain"]
                    }
                },

                ItemLocations: {
                    "Heart Piece on Iceberg": {
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
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    "Skulltula in Tree": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 257, y: 234 },
                        Age: Age.CHILD,
                        LongDescription: "Go to the southeast corner of the map. Roll into the tree to find this skulltula. Use a pot near Jabu to kill it if you don't have a weapon.",
                        OverrideItemGroupCondition: true,
                    },
                    "Skulltula on Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 81, y: 177 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you'll find this skulltula on the wall by the giant log.",
                        IsAtShortDistance: true
                    },
                    "Gossip Stone Left of Jabu Platform": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 122, y: 51 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is to the left of the Jabu Jabu platform."
                    },
                    "Gossip Stone by Fairy Fountain": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 283, y: 232 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the land near the fairy fountain entrance."
                    },
                    "4 Pots by Jabu": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 125, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "As Child, these pots are on the corners of the platform by the entrance to Jabu Jabu's Belly."
                    },
                    "18 Underwater Green Rupees": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "18 Green Rupees",
                        MapInfo: { x: 235, y: 137 },
                        Age: Age.ADULT,
                        RequiredItems: [Equipment.IRON_BOOTS],
                        LongDescription: "Use your Iron Boots to search the bottom of the fountain for these 18 items.",
                    }
                }
            },
            hiddenTunnel: {
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Skulltula in Hidden Tunnel": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 312, y: 154 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go to the southeast corner of the map. Pick up the silver rock and go down the path. Beware of invisible giant skulltulas! You'll find the skulltula you want after you climb the wall.",
                        IsAtShortDistance: true
                    },
                    "3 Pots in Hidden Tunnel": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 266, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "Go to the southeast corner of the map. Pick up the silver rock and drop down. You should now be next to the pots.",
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
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Lake Hylia"]["Hyrule Field"]
                    },
                    "Zora's Domain": {
                        OwExit: OwExits["Lake Hylia"]["Zora's Domain"]
                    },
                    "Owl": {
                        OwExit: OwExits["Lake Hylia"]["Owl"]
                    },
                    "Water Temple Entrance": {
                        OwExit: OwExits["Lake Hylia"]["Water Temple Entrance"]
                    },
                    "Serenade Teleport Pad": {
                        OwExit: OwExits["Lake Hylia"]["Serenade Teleport Pad"]
                    },

                    // Interiors & Grottos
                    "Fishing Pond": {
                        OwExit: OwExits["Lake Hylia"]["Fishing Pond"]
                    },
                    "Grotto Under Grave": {
                        OwExit: OwExits["Lake Hylia"]["Grotto Under Grave"]
                    },
                    "Lakeside Lab": {
                        OwExit: OwExits["Lake Hylia"]["Lakeside Lab"]
                    }
                },

                ItemLocations: {
                    "Ruto's Letter": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 171, y: 116 },
                        Age: Age.CHILD,
                        LongDescription: "You'll find this item in the water near the entrance to Zora's Domain. Navi will fly to it when you're close.",
                        CustomRequirement: function(age) {
                            if (Equipment.SCALE.playerHas) { return true; }
                            if (!Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
                            
                            let defeatedMorpha = Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                            return defeatedMorpha && Data.hasDamagingItem(age);
                        }
                    },
                    "Heart Piece on Lab": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 111, y: 67 },
                        Age: Age.ADULT,
                        LongDescription: "The goal here is to get to the top of the Lakeside Lab. Either ride the bean plant up, or play Scarecrow's Song and hookshot it. Afterward, climb the ladder to get to the item. Watch out for the Guays!",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas;
                            let canRideUp = Data.itemLocationObtained("Lake Hylia", "main", "*Plant Bean by Lab");
                            return canHookshotUp || canRideUp;
                        }
                    },
                    "Fire Arrows": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 247, y: 236 },
                        Age: Age.ADULT,
                        LongDescription: "First, get to the platform in the center of the lake - the one with the tree. When the sun is just coming up, stand on the sign and shoot an arrow at it. The item should then spawn. You can get over there either by beating Morpha and swimming there, or by playing Scarecrow's Song and longshotting it.",
                        CustomRequirement: function(age) {
                            if (!Items.FAIRY_BOW.playerHas) { return false; }
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.currentUpgrade === 2;
                            return canHookshotUp || Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                        }
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 106, y: 71 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soil by the Lakeside Lab to spawn this skulltula.",
                        NeedsBottle: true
                    },
                    "Skulltula on Lab": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 104, y: 89 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Lakeside Lab that's nearest the bridge. You can actually jumpslash to the token from the bridge if you don't have the boomerang.",
                        CustomRequirement: function(age) {
                            return Items.BOOMERANG.playerHas || Data.hasSwordWeapon(age);
                        }
                    },
                    "Skulltula on Island": {
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
                        RequiredItems: [Items.HOOKSHOT],
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.currentUpgrade === 2 || (Data.hasShield(age) && Settings.GlitchesToAllow.skullInTreeWithHookshot);
                        }
                    },
                    "*Plant Bean by Lab": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 106, y: 71 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean patch by the lab. It can be used to get to the top of the house and to the fishing pond."
                    },
                    "Gossip Stone by Lab and Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 74, y: 74 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is across the little bridge near the lab."
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
                    },
                    "Green Rupee Near Shore": {
                        ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        MapImageName: "Green Rupee",
                        MapInfo: { x: 171, y: 98 },
                        Age: Age.CHILD,
                        LongDescription: "This item is by the entrance to Zora's Domain - you can dive to get it without a scale.",
                    },
                    "2 Green Rupees in Deeper Water": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Green Rupees",
                        MapInfo: { x: 169, y: 105 },
                        Age: Age.CHILD,
                        RequiredItems: [{item: Equipment.SCALE, upgradeString: "1"}],
                        LongDescription: "These items are by the entrance to Zora's Domain - you need a scale to be able to reach them."
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
                Exits: {
                    acrossBridge: {
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) {
                                let canCrossWithHookshot = Settings.GlitchesToAllow.gvCrossBridgeWithHookshot && 
                                    Data.hasShield(age) && 
                                    Items.HOOKSHOT.playerHas;

                                return canCrossWithHookshot ||
                                    Data.itemLocationObtained("Gerudo Fortress", "jail4Area", "Item From Gerudo") || 
                                    Data.canRideEpona(age) || 
                                    Items.HOOKSHOT.currentUpgrade === 2 ||
                                    Data.canBombSuperslideWithHovers(age) ||
                                    Data.canHammerHoverBootsSuperslide(age);
                            }
                            return Settings.GlitchesToAllow.cuccoJump && Data.hasSwordWeapon(age);
                        }
                    },
                    chasmSilverRockLedge: {},
                    chasmCrateLedge: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || 
                                Items.HOOKSHOT.currentUpgrade === 2 ||
                                Data.canBombSuperslideWithHovers(age) ||
                                Data.canHammerHoverBootsSuperslide(age);
                        }
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
                        MapInfo: { x: 264, y: 56 },
                        Age: Age.CHILD,
                        LongDescription: "At night, look to the right of the first tiny bridge by the tiny waterfall. The skulltula is by the water source.",
                        IsAtShortDistance: true
                    }
                }
            },

            acrossBridge: {
                Exits: {
                    main: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }

                            let canCrossWithHookshot = Settings.GlitchesToAllow.gvCrossBridgeWithHookshot && 
                                Data.hasShield(age) && 
                                Items.HOOKSHOT.playerHas;

                            return canCrossWithHookshot ||
                                Data.itemLocationObtained("Gerudo Fortress", "jail4Area", "Item From Gerudo") || 
                                Data.canRideEpona(age) || 
                                Items.HOOKSHOT.currentUpgrade === 2 ||
                                Data.canBombSuperslideWithHovers(age) ||
                                Data.canHammerHoverBootsSuperslide(age);
                        }
                    },
                    chasmSilverRockLedge: {
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age);
                        }
                    },
                    chasmCrateLedge: {
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.currentUpgrade === 2 || Data.canMegaFlip(age);
                        }
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
                        MapInfo: { x: 131, y: 120 },
                        Age: Age.ADULT,
                        LongDescription: "Across the bridge, there are some rocks to the right. Use your hammer on them to reveal the chest.",
                        CustomRequirement: function(age) {
                            return Data.canUseHammer(age) || Data.canWeirdShot(age);
                        }
                    },
                    "Skulltula on Pillar": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 144, y: 103 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula high up on the pillar near the rocks to the left side of the area across the bridge.",
                        IsAtShortDistance: true
                    },
                    "Skulltula Behind Tent": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 144, y: 46 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula on the wall behind the tent.",
                        IsAtShortDistance: true
                    }
                }
            },

            chasmSilverRockLedge: {
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
                ExcludeFromSpawnList: true,
                Exits: {
                    chasmDownstream: {}
                },
                ItemLocations: {
                    "Plant Bean by Cow on Bottom": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 183, y: 191 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean patch on the platform at the bottom of the ravine. It's not used to get any items."
                    },
                    "Heart Piece in Waterfall": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 200, y: 111 },
                        Age: Age.EITHER,
                        LongDescription: "The Heart Piece is in a room in the waterfall to the left in the ravine. There's a ladder leading up to it."
                    },
                    "Cow on Bottom by Waterfall": {
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 183, y: 185 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the platform on the bottom of the ravine to find this cow."
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 183, y: 191 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the platform on the bottom of the ravine. Plant bugs in the soft soil to spawn the skulltula.",
                        NeedsBottle: true
                    },
                    "Gossip Stone by Waterfall": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 185, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the chasm near the waterfall. It's on the same platform as the cow and soft soil patch."
                    },
                    "Crate by Cow on Bottom": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 189, y: 199 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the plateform on the bottom of the ravine to find this crate.",
                    }
                }
            },

            chasmDownstream: {
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
        Floors: ["OUT", "LOW", "UP"],
		StartingFloorIndex: 0,
        UseAdultAge: function() { 
            if (Data.randomizedSpawnLocations.useRandomizedSpawns) { return false; }
            return !Settings.RandomizerSettings.shuffleOverworldEntrances && 
                !Settings.GlitchesToAllow.cuccoJump;
        },
		Regions: {
            main: {
                Exits: {
                    backArea: {
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.areGerudoGuardsTame() 
                        }
                    },
                    topOfKitchen: {
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) {
                                return Data.areGerudoGuardsTame() ||
                                    Settings.GlitchesToAllow.gfPassKitchenGuards ||
                                    Settings.GlitchesToAllow.gfKitchenGuardsWithSword && Data.hasSwordWeapon(age);
                            }
                            return true;
                        }
                    },
                    jail4Area: {
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Data.areGerudoGuardsTame() || Data.canMegaFlip(age);
                        }
                    },
                    upperInteriors: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            //TODO thieves' hideout shuffle: This will make it repeatable to get jailed, so only HS would be needed
                            return Items.HOOKSHOT.playerHas && !Data.areGerudoGuardsTame();
                        }
                    },
                    wastelandEntrance: {
                        CustomRequirement: function(age) {
                            if ((age === Age.CHILD && Settings.GlitchesToAllow.gerudoGateSkipAsChild) || Data.areGerudoGuardsTame()) { return true; }
                            return Settings.GlitchesToAllow.gerudoGateSkipAsAdult &&
                                Items.HOOKSHOT.playerHas &&
                                Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    "Gerudo Valley": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Valley"]
                    },
                    "Training Grounds Entrance": {
                        OwExit: OwExits["Gerudo Fortress"]["Training Grounds Entrance"]
                    },

                    // Grottos & Interiors
                    "Bottom Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Bottom Left Door"]
                    },
                    "Bottom Enclave Left Door": {
                        OwExit: OwExits["Gerudo Fortress"]["Bottom Enclave Left Door"]
                    },
                    "Song of Storms Grotto": {
                        OwExit: OwExits["Gerudo Fortress"]["Song of Storms Grotto"]
                    }
                },

                ItemLocations: {
                    // "Jail 1 Guard Key": {
                    //     ItemGroup: ItemGroups.FREESTANDING,
                    //     MapInfo: { x: 52, y: 79, floor: "LOW" },
                    //     Age: Age.EITHER,
                    //     NeedsSwordWeapon: true,
                    //     LongDescription: "Enter the leftmost bottom exit to get to the first jail. Take out the guard to get the item."
                    // },
                    "Jail 2 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 142, y: 109, floor: "LOW" },
                        Age: Age.EITHER,
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 1. Face the jail - now turn right and take that exit. Go straight to the other side. The next jail is in the next hole if you hug this wall around the right corner - be careful of guards. Take out the guard to get the item."
                    },
                    "Jail 3 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 270, y: 198, floor: "LOW" },
                        Age: Age.EITHER,
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 2. Face the jail - now turn left and take that exit. Climb the vines straight ahead and take the exit straight in front of you for the next jail. Take out the guard to get the item."
                    },
                    "Skulltula on Back Fortress Wall": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 203, y: 129, floor: "OUT" },
                        Age: Age.ADULT,
                        LongDescription: "Nighttime required. The skulltula is located on the wall near the entrance to jail 4 - see those instructions for how to get there.<br/><br/>If you don't have a long range way to kill it, you'll need to jumpslash it from the top and then circle back around and jump to claim the item."
                    },
                    "Opened Gate": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 81, y: 98, floor: "OUT" },
                        Age: Age.ADULT,
                        Region: "main",
                        LongDescription: "Talk to the gerudo guard at the top of the ladder to open the gate.",
                        CustomRequirement: function() {
                            return Data.areGerudoGuardsTame();
                        }
                    },
                    // "3 Pots by Jail 1": {
                    //     ItemGroup: ItemGroups.ENTRANCE,
                    //     OverrideItemGroup: ItemGroups.POT,
                    //     IsItemLocationGroup: true,
                    //     DefaultEntranceGroupName: "3 Pots",
                    //     MapInfo: { x: 10, y: 68, floor: "LOW" },
                    //     Age: Age.EITHER,
                    //     LongDescription: "These pots are on the opposite wall of the jail."
                    // },
                    // "Crate by Jail 1": {
                    //     ItemGroup: ItemGroups.CRATE,
                    //     MapInfo: { x: 10, y: 109, floor: "LOW" },
                    //     Age: Age.EITHER,
                    //     LongDescription: "The crate is in the opposite corner of the cell door."
                    // },
                    "2 Pots in Jail 2 Hallway": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 121, y: 32, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the hallway to the left of the jail."
                    },
                    "3 Pots by Jail 3": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 299, y: 163, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the opposite wall of the closed jail."
                    },
                    "4 Pots in Open Cell by Jail 3": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "4 Pots",
                        MapInfo: { x: 241, y: 219, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the open cell next to jail 3."
                    },
                    "2 Crates by Jail 3": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 225, y: 163, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "The crates are in the opposite corner of the locked cell door."
                    },
                    "2 Far Crates in Kitchen Hallway": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 56, y: 195, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "The are the far away crates in the hallway attached to the kitchen."
                    },
                    "2 Mid Crates in Kitchen Hallway": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Crates",
                        MapInfo: { x: 68, y: 239, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "The are the closer crates in the hallway attached to the kitchen."
                    },
                    "Crate Close to Kitchen": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 105, y: 259, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "This is the crate right next to the kitchen - you'll need to deal with one of the guards to get it.",
                        CustomRequirement: function(age) {
                            if (Data.areGerudoGuardsTame()) {
                                return true;
                            }

                            if (age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas)) {
                                return true;
                            }

                            return Settings.GlitchesToAllow.gfKitchenGuardsWithSword && Data.hasSwordWeapon(age);
                        }
                    },
                    "2 Pots on Kitchen Table": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 139, y: 237, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the table in the kitchen. If you enter from one of the upper entrances, you can snag them with the boomerang.",
                        CustomRequirement: function(age) {
                            if (Data.areGerudoGuardsTame() || Data.canUseBoomerang(age)) {
                                return true;
                            }
    
                            if (age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas)) {
                                return true;
                            }
    
                            return Settings.GlitchesToAllow.gfKitchenGuardsWithSword && Data.hasSwordWeapon(age);
                        }
                    }
                }
            },

            topOfKitchen: {
                ExcludeFromSpawnList: true,
                Exits: {
                    jail4Area: {},
                    topOfFortress: {
                        CustomRequirement: function(age) {
                            let canMegaFlip = Data.canMegaFlip(age);
                            if (age === Age.CHILD) {
                                return canMegaFlip && Data.canGroundJumpWithBomb(age);
                            }

                            if (Items.HOOKSHOT.currentUpgrade === 2 || Equipment.HOVER_BOOTS.playerHas) { return true; }
                            return canMegaFlip || Data.canHookScarecrow(age);
                        }
                    }
                },
                ItemLocations: {}
            },

            jail4Area: {
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Jail 4 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 318, y: 43, floor: "LOW" },
                        Age: Age.EITHER,
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Face the entrance you just left. As Child, you must enter the door to your left and navigate across to the other side of the room. As Adult, you can jump up to the ledge to your right with a slight angled jump. Climb up the vines and navigate to the door near where the skulltula on the wall would be at night.<br/><br/>Once inside, wait for a bit first for the guard and knock her out or sprint past her before following the path to your right. Eventually you'll reach the jail. Take out the guard to get the item."
                    },
                    "Crate by Jail 4": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 213, y: 123, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in front of you when you enter the map - grab it quickly then retreat before the guard sees you."
                    },
                    "Item From Gerudo": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 334, y: 254, floor: "LOW" },
                        Age: Age.EITHER,
                        LongDescription: "You'll get this from the Gerudo after using all 4 keys on all the jail doors and talking to the prisoners.",
                        CustomRequirement: function(age) {
                            return getKeyCount("Thieves' Hideout") >= 4;
                        }
                    }
                }
            },

            topOfFortress: {
                UseAdultAge: function() {
                    return !Settings.GlitchesToAllow.groundJump || !Settings.GlitchesToAllow.megaFlip;
                },
                ExcludeFromSpawnList: true,
                Exits: {
                    jail4Area: {},
                    upperInteriors: {}
                },
                ItemLocations: {
                    "Chest on the Top": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 101, floor: "OUT" },
                        Age: Age.EITHER,
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Enter the other door to your right. Now either hookshot the wooden horizontal beam, use your hover boots to get across, or take out the guards with your bow to get across to the path directly in front of you. Face the camera to your back and turn left. Climb up the wall and walk to the end. Jump across to the next platform. Climb up the vines to your left.<br /><br />You should be able to either longshot to the chest, or roll across with your hover boots."
                    }
                }
            },

            upperInteriors: {
                UseAdultAge: function() {
                    return !Settings.GlitchesToAllow.groundJump || !Settings.GlitchesToAllow.megaFlip;
                },
                ExcludeFromSpawnList: true,
                Exits: {},
                ItemLocations: {
                    "Closest Crate in Upper Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 277, y: 197, floor: "UP" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in front of you when you enter the map."
                    },
                    "Second Crate in Upper Room": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 297, y: 163, floor: "UP" },
                        Age: Age.EITHER,
                        LongDescription: "This is the second crate you run into in this map."
                    },
                    "Guarded Crate Close to Corner": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 345, y: 127, floor: "UP" },
                        Age: Age.EITHER,
                        LongDescription: "Deal with the guard that's moving. The crate is to the right when you enter the main room - the one close to the corner.<br/><br/>Child can get this without dealing with the stationary guard if you stay close to the wall.<br/><br/>Adult can get this one without dealing with the stationary guard if you bonk into it while staying more to the right.",
                        CustomRequirement: function(age) {
                            if (Data.areGerudoGuardsTame(age)) {
                                return true;
                            }

                            if (Settings.GlitchesToAllow.gfTopGuardsWithSword && Data.hasSwordWeapon(age)) {
                                return true;
                            }

                            if (age === Age.CHILD) {
                                return false;
                            }

                            return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Guarded Crate Next to Corner Crate": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 345, y: 117, floor: "UP" },
                        Age: Age.EITHER,
                        LongDescription: "Deal with the guard that's moving. The crate is to the right when you enter the main room - the one farther from the corner.<br/>Child can get this one if you hug the wall the whole time.<br/>Adult can stab the stationary guard if you crouchstab her, but be careful not to get too close!",
                        CustomRequirement: function(age) {
                            if (Data.areGerudoGuardsTame(age)) {
                                return true;
                            }

                            let canSlashGuards = Settings.GlitchesToAllow.gfTopGuardsWithSword && Data.hasSwordWeapon(age);
                            if (age === Age.CHILD) {
                                return canSlashGuards;
                            }

                            return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas || (canSlashGuards && Data.hasShield(age));
                        }
                    },
                    "2 Pots on Top Room Table": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "2 Pots",
                        MapInfo: { x: 309, y: 96, floor: "UP" },
                        Age: Age.EITHER,
                        LongDescription: "These pots can be retrieved with the boomerang if you're quick. If you can't get them that way...<br/><br/>Deal with the guard that's moving. If you have a shield, and either the Master Sword or a Deku Stick, you can crouchstab the stationary guard, but be careful not to get too close!",
                        CustomRequirement: function(age) {
                            if (Data.areGerudoGuardsTame(age) || Data.canUseBoomerang(age)) {
                                return true;
                            }

                            let canSlashStationaryGuard = Settings.GlitchesToAllow.gfTopGuardsWithSword && Data.hasSwordWeapon(age) && Data.hasShield(age);
                            if (age === Age.CHILD) {
                                return canSlashStationaryGuard && Items.DEKU_STICK.playerHas; // Kokiri Sword isn't long enough for this!
                            }

                            return canSlashStationaryGuard || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Crate Above Link's Jail": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 136, y: 68, floor: "OUT" },
                        Age: Age.ADULT,
                        RequiredItems: [Items.HOOKSHOT],
                        LongDescription: "Navigate to the upper room by either getting caught then jumping to there, or by dropping down from the top where the chest is. Stun the guards (can use your hookshot) and navigate down the long hallway. Hooshot the wooden pillar to pass the barrier. The crate is just ahead of you after the loading zone."
                    }
                }
            },

            backArea: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {}
                },

                ItemLocations: {
                    "Archery Minigame 1000 Points": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 246, y: 220, floor: "OUT" },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1000 points to claim your prize.",
                        RequiredItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) { 
                            return Data.canRideEpona(age);
                        }
                    },
                    "Archery Minigame 1500 Points": {
                        ItemGroup: ItemGroups.GIFT,
                        Time: function() { return Time.DAY; },
                        MapInfo: { x: 246, y: 225, floor: "OUT" },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1500 points to claim your prize.",
                        RequiredItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) { 
                            return Data.canRideEpona(age); 
                        }
                    },
                    "Skulltula on Target": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 244, y: 40, floor: "OUT" },
                        Age: Age.ADULT,
                        LongDescription: "At night, navigate to the back part of the map. Head to the target on the left side to find this skulltula.",
                        IsAtShortDistance: true
                    }
                }
            },

            wastelandEntrance: {
                Exits: {
                    main: {
                        CustomRequirement(age) {
                            return age === Age.ADULT || Data.itemLocationObtained("Gerudo Fortress", "main", "Opened Gate");
                        }
                    },

                    "Haunted Wasteland": {
                        OwExit: OwExits["Gerudo Fortress"]["Haunted Wasteland"]
                    }
                },

                ItemLocations: {}
            }
		}
    },
    
    //TODO: add logic for: savewarping in ANY of these rooms will lead to jail1 (just add non-requirement exits to jail1 from ALL of these regions!)
    "Thieves' Hideout": {
        Abbreviation: "TH",
        MapGroup: MapGroups.DESERT,
        Floors: ["J1", "J2", "J3", "J4", "KIT", "TOP"],
        StartingFloorIndex: 0,
        Regions: {
            jail1: {
                Exits: {
                    //TODO: actually create these
                    "Jail 1 Left": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 1 Left"]
                    },
                    "Jail 1 Right": {
                        OwExit: OwExits["Thieves' Hideout"]["Jail 1 Right"]
                    },
                },
                ItemLocations: {
                    "Jail 1 Guard Key": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 52, y: 79, floor: "J1" },
                        Age: Age.EITHER,
                        NeedsSwordWeapon: true,
                        LongDescription: "Enter the leftmost bottom exit to get to the first jail. Take out the guard to get the item."
                    },
                    "3 Pots by Jail 1": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 10, y: 68, floor: "J1" },
                        Age: Age.EITHER,
                        LongDescription: "These pots are on the opposite wall of the jail."
                    },
                    "Crate by Jail 1": {
                        ItemGroup: ItemGroups.CRATE,
                        MapInfo: { x: 10, y: 109, floor: "J1" },
                        Age: Age.EITHER,
                        LongDescription: "The crate is in the opposite corner of the cell door."
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
                Exits: {
                    outpost: {
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.itemlessSandPit) { return true; }
                            return age === Age.ADULT && (Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2);
                        }
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
                        UseAdultAge: function() { 
                            if (Data.randomizedSpawnLocations.useRandomizedSpawns) { return false; }
                            return !Settings.GlitchesToAllow.cuccoJump || 
                                !Settings.GlitchesToAllow.gerudoGateSkipAsChild || 
                                !Settings.GlitchesToAllow.itemlessSandPit;
                        },
                        LongDescription: "The crate is by the quicksand pit by the exit to Gerudo Fortress."
                    }
                }
            },

            outpost: {
                UseAdultAge: function() { 
                    if (Data.randomizedSpawnLocations.useRandomizedSpawns || Settings.GlitchesToAllow.backwardsWasteland) { return false; }
                    if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                        return !Settings.GlitchesToAllow.itemlessSandPit;
                    }
                    return !Settings.GlitchesToAllow.cuccoJump || 
                        !Settings.GlitchesToAllow.gerudoGateSkipAsChild || 
                        !Settings.GlitchesToAllow.itemlessSandPit;
                },
                ExcludeFromSpawnList: true,
                Exits: {
                    entrance: {
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.backwardsWasteland && Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    exit: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.wastelandNoLens ||
                                (Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas);
                        }
                    }
                },

                ItemLocations: {
                    "Chest at Outpost": {
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 208, y: 93 },
                        Age: Age.EITHER,
                        LongDescription: "In the outpost in the center of the desert, light the two torches to spawn a chest.",
                        NeedsFire: true
                    },
                    "Carpet Shop": {
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 239, y: 292 },
                        Age: Age.EITHER,
                        LongDescription: "After you cross the sand pit, the shop is along the path to your left. There is a sign by one of the flags that points to it. If you don't have hover boots, you can rolljump, then jumpslash to the corner of the carpet.<br/><br/>If this and medigoron aren't shuffled, this shop will ALWAYS sell bombchus.",
                        NeedsSwordWeapon: true,
                        RequiredItems: [{item: Equipment.WALLET, upgradeString: "1"}]
                    },
                    "Skulltula at Outpost": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 208, y: 85 },
                        Age: Age.EITHER,
                        LongDescription: "The skulltula is in the outpost in the center of the desert.",
                        IsAtShortDistance: true
                    },
                    "3 Crates Across Quicksand": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.CRATE,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Crates",
                        MapInfo: { x: 294, y: 253 },
                        Age: Age.EITHER,
                        LongDescription: "These crates are by the flags just across the quicksand pit."
                    },
                    "3 Pots at Outpost": {
                        ItemGroup: ItemGroups.ENTRANCE,
                        OverrideItemGroup: ItemGroups.POT,
                        IsItemLocationGroup: true,
                        DefaultEntranceGroupName: "3 Pots",
                        MapInfo: { x: 214, y: 89 },
                        Age: Age.EITHER,
                        LongDescription: "These pots are in the outpost in the center of the desert (there are 4, but one always gives a fairy)."
                    }
                }
            },

            exit: {
                Exits: {
                    outpost: {
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.backwardsWasteland;
                        }
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
                        LongDescription: "The crate is by the leevers just east of the Desert Colossus entrance. If coming from Desert Colossus, just walk straight until you run into the crate."
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
                Exits: {
                    "Haunted Wasteland": {
                        OwExit: OwExits["Desert Colossus"]["Haunted Wasteland"]
                    },
                    "Spirit Temple Entrance": {
                        OwExit: OwExits["Desert Colossus"]["Spirit Temple Entrance"]
                    },
                    "Requiem Teleport Pad": {
                        OwExit: OwExits["Desert Colossus"]["Requiem Teleport Pad"]
                    },

                    // Grottos & Interiors
                    "Great Fairy Fountain": {
                        OwExit: OwExits["Desert Colossus"]["Great Fairy Fountain"]
                    },
                    "Silver Rock Grotto": {
                        OwExit: OwExits["Desert Colossus"]["Silver Rock Grotto"]
                    }
                },

                ItemLocations: {
                    "Heart Piece on Platform": {
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 87, y: 135 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        IsPostWalkCheck: true,
                        LongDescription: "Plant a magic bean in the soil by the Spirit Temple. Come back as an adult and ride it to the heart piece on the giant arch.",
                        CustomRequirement: function(age) {
                            //TODO: better to put this in a region, and walk to it via spirit temple/DC instead of this being a post-walk
                            return (age === Age.ADULT && Data.itemLocationObtained("Desert Colossus", "main", "*Plant Bean by Spirit Temple")) ||
                                (Data.canAccessMap(age, "Spirit Temple", "statueHands") && Data.canMegaFlip(age));
                        }
                    },
                    "Skulltula in Soil": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 63, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "Drop bugs in the soft soil by the Spirit Temple to spawn this skulltula.",
                        NeedsBottle: true
                    },
                    "Skulltula on Tree by Oasis": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 180, y: 245 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula in one of the trees by an oasis at the south middle part of the map.",
                        IsAtShortDistance: true
                    },
                    "Skulltula on Cliff": {
                        ItemGroup: ItemGroups.SKULLTULA,
                        Time: function() { return Time.NIGHT; },
                        MapInfo: { x: 213, y: 91 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there is a skulltula on a small cliff near the north middle edge of the map. You can hookshot it if the Leevers leave you alone long enough. An easier solution is to ride the bean platform and jump off of it so that you're on top.",
                        CustomRequirement: function(age) {
                            let canRideUp = Data.itemLocationObtained("Desert Colossus", "main", "*Plant Bean by Spirit Temple");
                            let canUseBoomerang = Settings.GlitchesToAllow.difficultBoomerangTrickThrows && Data.canUseBoomerang(age);
                            return canRideUp || canUseBoomerang || Items.HOOKSHOT.playerHas;
                        }
                    },
                    "Requiem of Spirit": {
                        //TODO: with decoupling, we'll have to check that we can enter whatever leads here
                        // this will be the same as the check for the lost woods bridge!
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 63, y: 149 },
                        Age: Age.EITHER,
                        LongDescription: "Enter and exit the Spirit Temple to receive this item."
                    },
                    "*Plant Bean by Spirit Temple": {
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 63, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Spirit Temple. This is used to more easily get to a skulltula, and to get the heart piece above."
                    },
                    "Gossip Stone by Spirit Temple": {
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 54, y: 194 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the left side of the Spirit Temple."
                    }
                }
            }
		}
	}
};
