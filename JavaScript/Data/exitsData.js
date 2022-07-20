let OwExits = {
    "Kokiri Forest": {
        "Lost Woods Bottom": {
            Name: "Lost Woods Bottom",
            ExitRegion: "main",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 46, y: 130 },
            Age: Age.EITHER,
            LongDescription: "This is the bottom entrance to the Lost Woods.",
            CustomRequirement: function(age) {
                if (age === Age.ADULT || Settings.RandomizerSettings.openForest) { return true; }
				
				let beatDekuTree = Data.itemLocationObtained("Deku Tree", "bossRoom", "Blue Warp");
				let canPokeySkip = Settings.GlitchesToAllow.pokeySkip && 
					Data.hasSwordWeapon(age) &&
                    Equipment.DEKU_SHIELD.playerHas;

                return beatDekuTree || canPokeySkip;
            }
        },
        "Lost Woods Top": {
            Name: "Lost Woods Top",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 133, y: 13 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Lost Woods that is up the vines."
        },
        "Deku Tree Entrance": {
            Name: "Deku Tree Entrance",
            ExitRegion: "afterMido",
            Map: "Deku Tree",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 263, y: 65 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Deku Tree.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                let isEntranceShuffle = Data.getDoesEntranceShuffleApply("Deku Tree");
                return isEntranceShuffle ? true : age === Age.CHILD;
            }
        },

        // Interiors
        "Link's House": {
            Name: "Link's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            IsComplexEntrance: true,
            MapInfo: { x: 170, y: 236 },
            Age: Age.EITHER,
            LongDescription: "This is the house with the ladder."
        },
        "Saria's House": {
            Name: "Saria's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 204, y: 228 },
            Age: Age.EITHER,
            LongDescription: "This is the house to your right if you face away from Link's house."
        },
        "Mido's House": {
            Name: "Mido's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 125, y: 100 },
            Age: Age.EITHER,
            LongDescription: "This is the house closet to the entrance to the Lost Woods."
        },
        "Know-It-All House": {
            Name: "Know-It-All House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 84, y: 179 },
            Age: Age.EITHER,
            LongDescription: "This is the house by the fenced off training area."
        },
        "House of Twins": {
            Name: "House of Twins",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 252, y: 248 },
            Age: Age.EITHER,
            LongDescription: "This is the house across from the shop."
        },
        "Shop": {
            Name: "Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 245, y: 128 },
            Age: Age.EITHER,
            LongDescription: "Found in the middle of the village."
        },
        "Song of Storms Grotto by Lost Woods": {
            Name: "Song of Storms Grotto by Lost Woods",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 109, y: 36 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms by the Gossip Stone near the Lost Woods entrance to reveal this grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        }
    },

    "Lost Woods": {
        "To Kokiri Forest": {
            Name: "To Kokiri Forest",
            ExitRegion: "kokiriForestWarp",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 165, y: 187 },
            Age: Age.EITHER,
            LongDescription: "This is ANY of the entrances leading back to Kokiri."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "firstHalf",
            Map: "Goron City",
            Region: "lostWoods",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 209, y: 111 },
            Age: Age.EITHER,
            LongDescription: "This is the exit to Goron City."
        },
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "firstHalf",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 284, y: 126 },
            Age: Age.EITHER,
            CustomRequirement: function(age) {
                let canGetToRiver = Equipment.SCALE.playerHas || 
                    (age === Age.CHILD && Settings.GlitchesToAllow.zorasRiverScalelessChild && Data.hasSwordWeapon(age)) ||
                    (age === Age.ADULT && Settings.GlitchesToAllow.zorasRiverScalelessAdult);
                return canGetToRiver;
            },
            LongDescription: "This is the exit to Zora's River that you get to by diving."
        },
        "To Lost Woods Bridge": {
            Name: "To Lost Woods Bridge",
            ExitRegion: "firstHalf",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 251},
            Age: Age.ADULT,
            OneWayEntrance: true,
            CustomRequirement: function(age) {
                return Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2 || Data.itemLocationObtained("Lost Woods", "firstHalf", "*Plant Bean by Bridge");
            },
            OwShuffleMap: "Lost Woods Bridge",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Kokiri Forest Bridge",
            ReadOnly: true,
            LongDescription: "This is taken via the magic bean, hover boots, or by longshotting to the bridge."
        },
        "Sacred Forest Meadow": {
            Name: "Sacred Forest Meadow",
            ExitRegion: "secondHalf",
            Map: "Sacred Forest Meadow",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 211, y: 21 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Sacred Forest Meadow."
        },

        // Interiors
        "Grotto by Goron City Entrance": {
            Name: "Grotto by Goron City Entrance",
            ExitRegion: "firstHalf",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 218, y: 118 },
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, go right and then left. Remove the rock on this screen to reveal this grotto.",
            NeedToBlastOrSmash: true
        },
        "Forest Stage Grotto": {
            Name: "Forest Stage Grotto",
            ExitRegion: "secondHalf",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 160, y: 86 },
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. In the back of this room, walk around until you fall into this grotto."
        },
        "Grotto Near the Sacred Forest Meadow": {
            Name: "Grotto Near the Sacred Forest Meadow",
            ExitRegion: "secondHalf",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 202, y: 31 },
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room to reveal the grotto.",
            NeedToBlastOrSmash: true
        }
    },

    "Lost Woods Bridge": {
        "Kokiri Forest Bridge": {
            Name: "Kokiri Forest Bridge",
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 221, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Kokiri Forest exit from the bridge."
        },
        "Hyrule Field Bridge": {
            Name: "Hyrule Field Bridge",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 132, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Hyrule Field exit from the bridge."
        },
        "Bridge to Lost Woods": {
            Name: "Bridge to Lost Woods",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 148, y: 74 },
            ReadOnly: true,
            OwShuffleMap: "Lost Woods",
            OwShuffleRegion: "firstHalf",
            OwShuffleExitName: "To Kokiri Forest",
            Age: Age.ADULT,
            LongDescription: "Longshot from the bridge to the ladder to get to the lost woods.",
            CustomRequirement: function(age) {
                return Items.HOOKSHOT.currentUpgrade === 2;
            }
        }
    },

    "Sacred Forest Meadow": {
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "secondHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 178, y: 288 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back into the Lost Woods."
        },
        "Minuet Teleport Pad": {
            Name: "Minuet Teleport Pad",
            ExitRegion: "afterGate",
            Map: "Sacred Forest Meadow",
            Region: "afterGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Minuet of Forest teleport pad at the end of the Sacred Forest Meadow.",
        },
        "Forest Temple Entrance": {
            Name: "Forest Temple Entrance",
            ExitRegion: "afterGate",
            Map: "Forest Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Forest Temple.",
            IsDungeonEntrance: true,
            RequiredItems: [Items.HOOKSHOT]
        },

        // Interiors
        "Grotto near Lost Woods": {
            Name: "Grotto near Lost Woods",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 177, y: 274 },
            Age: Age.EITHER,
            LongDescription: "This hidden grotto is roughly halfway between the Lost Woods entrance and the maze entrance. It can be revealed with an explosive or a hammer.",
            IsHiddenGrotto: true
        },
        "Grotto in Maze Center": {
            Name: "Grotto in Maze Center",
            ExitRegion: "afterGate",
            IsGrotto: true,
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 194, y: 147 },
            Age: Age.EITHER,
            LongDescription: "This is the grotto in the center of the maze. You normally need to climb the ladder to get here."
        },
        "Song of Storms Grotto": {
            Name: "Song of Storms Grotto",
            ExitRegion: "afterGate",
            IsGrotto: true,
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 207 , y: 53 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the corner of the room with the Forest Temple entrance to reveal the grotto. Facing the forest temple, this is the lower-right corner.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        }
    },

    "Hyrule Field": {
        "Lost Woods Bridge": {
            Name: "Lost Woods Bridge",
            ExitRegion: "main",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 326, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Kokiri Forest."
        },
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "downstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 320, y: 68 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River. The water and land exits will go to the same place."
        },
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 276, y: 17 },
            Region: "main",
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Kakariko."
        },
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 197, y: 24 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Market."
        },
        "Lon Lon Ranch": {
            Name: "Lon Lon Ranch",
            ExitRegion: "main",
            Map: "Lon Lon Ranch",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 164, y: 72 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lon Lon Ranch in the center of the map."
        },
        "Gerudo Valley": {
            Name: "Gerudo Valley",
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 29, y: 137 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Gerudo Valley."
        },
        "Lake Hylia": {
            Name: "Lake Hylia",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 64, y: 290 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lake Hylia."
        },

        // Interiors
        "Grotto in Drawbridge Rock": {
            Name: "Grotto in Drawbridge Rock",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 170, y: 39 },
            Age: Age.EITHER,
            LongDescription: "Remove the rock to the left of the Market drawbridge to reveal this grotto.",
            NeedToBlastOrSmash: true
        },
        "Grotto in Southeast Forest Rock": {
            Name: "Grotto in Southeast Forest Rock",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 201, y: 227 },
            Age: Age.EITHER,
            LongDescription: "In the southeast (a bit south of the Kokiri Forest entrance), there's a small forest that has a rock you can break to reveal this grotto.",
            NeedToBlastOrSmash: true
        },
        "Hidden Grotto by North River Tree": {
            Name: "Hidden Grotto by North River Tree",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 91, y: 57 },
            Age: Age.EITHER,
            LongDescription: "To the west of the Market entrance, there's a lone tree to the south of a river. Bomb or hammer near the tree to reveal this grotto.",
            IsHiddenGrotto: true
        },
        "Grotto in Rock North of River": {
            Name: "Grotto in Rock North of River",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 102, y: 20 },
            Age: Age.EITHER,
            LongDescription: "On the north side of the river to the west of the Market entrance, there's a grotto under a yellow rock.",
            NeedToBlastOrSmash: true
        },
        "Open Grotto East of Lake Hylia Fences": {
            Name: "Open Grotto East of Lake Hylia Fences",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 112, y: 272 },
            Age: Age.EITHER,
            LongDescription: "This is an open grotto just to the east of the square of fences by the Lake Hylia entrance."
        },
        "Hidden Grotto by Kakariko": {
            Name: "Hidden Grotto by Kakariko",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 237, y: 23 },
            Age: Age.EITHER,
            LongDescription: "North of the entrance to Kakariko, there's a tree with a hidden grotto - bomb or hammer to open it.",
            IsHiddenGrotto: true
        },
        "Grotto by Gerudo": {
            Name: "Grotto by Gerudo",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 50, y: 103 },
            Age: Age.EITHER,
            LongDescription: "Near the entrnace to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock.",
            CustomRequirement: function(age) {
                return Data.canUseHammer(age) || (age === Age.CHILD && Data.hasExplosives());
            }
        },
        "Grotto by Lake Hylia Fences": {
            Name: "Grotto by Lake Hylia Fences",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 91, y: 267 },
            Age: Age.EITHER,
            LongDescription: "There's a hidden grotto in the center of the fences by Lake Hylia. Bomb or hammer there to get in. The scrub is inside.",
            IsHiddenGrotto: true
        }
    },

    "Lon Lon Ranch": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 218, y: 32 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule Field."
        },

        // Interiors
        "Talon's House": {
            Name: "Talon's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 230, y: 54 },
            IsInterior: true,
            Age: Age.EITHER,
            LongDescription: "This is the first door on your left when you first enter the ranch."
        },
        "Stable": {
            Name: "Stable",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 198, y: 54 },
            IsInterior: true,
            Age: Age.EITHER,
            LongDescription: "This is the first door on your right when you first enter the ranch."
        },
        "Cow Shed": {
            Name: "Cow Shed",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 106, y: 265 },
            IsInterior: true,
            Age: Age.EITHER,
            LongDescription: "Head to the back of Lon Lon Ranch to find this building."
        },
        "Open Grotto in Southwest Corner": {
            Name: "Open Grotto in Southwest Corner",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 290, y: 240 },
            IsGrotto: true,
            Age: Age.CHILD,
            LongDescription: "There's an open grotto as a child at the far southwest corner of the ranch."
        }
    },

    "Market Entrance": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 166, y: 31 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Time: function() { return Time.DAY_CHILD; },
            MapInfo: { x: 166, y: 261 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule field."
        },

        // Interiors
        "Guard House by Entrance": {
            Name: "Guard House by Entrance",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 203, y: 233 },
            Age: Age.EITHER,
            LongDescription: "This is the door near the Hyrule Field entrance."
        }
    },

    "Market": {
        "Market Entrance": {
            Name: "Market Entrance",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 246},
            Age: Age.EITHER,
            LongDescription: "This is the path to the market entrance."
        },
        "Hyrule Castle": {
            Name: "Hyrule Castle",
            ExitRegion: "main",
            Map: "Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 47},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Castle."
        },
        "Temple of Time": {
            Name: "Temple of Time",
            ExitRegion: "main",
            Map: "Temple of Time",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 350, y: 136},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Temple of Time area."
        },

        // Interiors
        "Archery Minigame": {
            Name: "Archery Minigame",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            Time: function() { return Time.DAY; },
            MapInfo: { x: 234, y: 120 },
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building just to the left of the Hyrule Castle entrance."
        },
        "Happy Mask Shop": {
            Name: "Happy Mask Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.DAY; },
            MapInfo: { x: 286, y: 120 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building just to the right of the Hyrule Castle entrance."
        },
        "Potion Shop": {
            Name: "Potion Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.DAY; },
            MapInfo: { x: 308, y: 159 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "Starting at the market entrance, this is the second building you can enter going counter-clockwise."
        },
        "Bazaar": {
            Name: "Bazaar",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.DAY; },
            MapInfo: { x: 308, y: 191 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "Starting at the market entrance, this is the first building you can enter going counter-clockwise."
        },
        "Treasure Chest Minigame": {
            Name: "Treasure Chest Minigame",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 215, y: 230 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building to the right of the market entrance exit - it's only open at night.",
        },
        "Bombchu Bowling": {
            Name: "Bombchu Bowling",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 205, y: 174 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This building is the one between the two market alley entrances."
        },
        "Bombchu Shop Entrance": {
            Name: "Bombchu Shop Entrance",
            ExitRegion: "alley",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 130, y: 232 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This door only opens at night. Starting at the market entrance, go straight right into the alley. Take the first door on the left wall to get to the door."
        },
        "Door in Right Market Alley": {
            Name: "Door in Right Market Alley",
            ExitRegion: "alley",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 112, y: 112 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This door only opens at night. This is the door on the screen if you enter the alley from the entrance by the archery building."
        }
    },

    "Temple of Time": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 23, y: 239 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },

        // Interiors
        "Temple of Time": {
            Name: "Temple of Time",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            IsComplexEntrance: true,
            MapInfo: { x: 198, y: 37 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance into the temple."
        }
    },

    "Castle": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 100, y: 290, floor: "ANY" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },
        "Ganon's Castle Entrance": {
            Name: "Ganon's Castle Entrance",
            ExitRegion: "main",
            Map: "Ganon's Castle",
            Region: "main",
            OwShuffleMap: "Ganon's Castle",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Exit",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 }, // We'll never care about this
            Age: Age.ADULT,
            LongDescription: "This is the entrance to Ganon's Castle.",
            ReadOnly: true,
            Hide: true,
            CustomRequirement: function(age) {
				switch (Settings.RandomizerSettings.medallionSetting) {
					case MedallionSettings.VANILLA:
						return Items.LIGHT_ARROW.playerHas &&
							Data.hasRequiredMedallions({ 
								RequiredMedallions: [Medallions.SHADOW_MEDALLION, Medallions.SPIRIT_MEDALLION] 
							});
					case MedallionSettings.OPEN:
						return true;
					case MedallionSettings.ALL_MEDALLIONS:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.FOREST_MEDALLION,
								Medallions.FIRE_MEDALLION,
								Medallions.WATER_MEDALLION,
								Medallions.SHADOW_MEDALLION,
								Medallions.SPIRIT_MEDALLION,
								Medallions.LIGHT_MEDALLION
							]
						});
					case MedallionSettings.ALL_DUNGEONS:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.KOKIRIS_EMERALD,
								Medallions.GORONS_RUBY,
								Medallions.ZORAS_SAPPHIRE,
								Medallions.FOREST_MEDALLION,
								Medallions.FIRE_MEDALLION,
								Medallions.WATER_MEDALLION,
								Medallions.SHADOW_MEDALLION,
								Medallions.SPIRIT_MEDALLION,
								Medallions.LIGHT_MEDALLION
							]
						});
					case MedallionSettings.ALL_STONES:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.KOKIRIS_EMERALD,
								Medallions.GORONS_RUBY,
								Medallions.ZORAS_SAPPHIRE
							]
						});
					case MedallionSettings.SKULLTULAS:
						return Equipment.SKULLTULA_TOKENS.count >= Settings.RandomizerSettings.medallionSkulltulaSetting;
                    default: return true;
                }
            }
        },

        // Interiors
        "Hyrule Great Fairy Fountain": {
            Name: "Hyrule Great Fairy Fountain",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 285, y: 231, floor: "HYR" },
            Age: Age.CHILD,
            LongDescription: "After climbing the vines and jumping off the building, follow the right wall until you reach a rock. Bomb it and enter the crawlspace.",
            NeedToBlastOrSmash: true,
        },
        "Song of Storms Grotto": {
            Name: "Song of Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            Age: Age.CHILD,
            MapInfo: { x: 200, y: 92, floor: "HYR" },
            LongDescription: "There's a tree in the corner near the milk boxes at the castle. Play the Song of Storms there to open this grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        },
        "Ganon Great Fairy Fountain": {
            Name: "Ganon Great Fairy Fountain",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 308, y: 161, floor: "GAN" },
            Age: Age.ADULT,
            LongDescription: "At the end of the main rock is a giant block you can pull up with Golden Gauntlets. Alternatively, you can use hover boots and a shield to clip past the block.",
            CustomRequirement: function(age) {
                return Equipment.STRENGTH.currentUpgrade === 3 ||
                    (
                        Settings.GlitchesToAllow.doubleDefenseEarly &&
                        Equipment.HOVER_BOOTS.playerHas && 
                        (Equipment.HYLIAN_SHIELD.playerHas || Equipment.MIRROR_SHIELD.playerHas)
                    );
            }
        }
    },

    "Kakariko Village": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 14, y: 213},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule Field."
        },
        "Graveyard": {
            Name: "Graveyard",
            ExitRegion: "main",
            Map: "Graveyard",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 302, y: 234},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the graveyard."
        },
        "Death Mountain Trail": {
            Name: "Death Mountain Trail",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 33},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Death Mountain."
        },
        "Bottom of the Well Entrance": {
            Name: "Bottom of the Well Entrance",
            ExitRegion: "main",
            Map: "Bottom of the Well",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Time: function() {
                let childEarly = Settings.GlitchesToAllow.botwAsChildWithCucco && Data.hasSwordWeapon(Age.CHILD) && Data.hasShield(Age.CHILD);
                let adultEarly = Settings.GlitchesToAllow.botwAsAdultWithCucco && Items.HOOKSHOT.currentUpgrade === 2 && Equipment.HOVER_BOOTS.playerHas;

                // Water already drained means there's no time requirement
                if (Data.interiorShuffleIsWindmillDrained) {
                    return Time.EITHER;
                }

                // If either need to use the glitch, then it should always be strict day requirement
                if (childEarly || adultEarly) {
                    return Time.DAY;
                }

                // Neither can get there
                return Time.EITHER;
            },
            MapInfo: { x: 227, y: 170 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Bottom of the Well.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                // Trick using cucco
                if (age === Age.ADULT && 
                    Settings.GlitchesToAllow.botwAsAdultWithCucco &&
                    Items.HOOKSHOT.currentUpgrade === 2 &&
                    Equipment.HOVER_BOOTS.playerHas) {
                    return true;
                }

                if (!Data.canBeAge(Age.CHILD)) { return false; }
                if (age === Age.ADULT && !Settings.RandomizerSettings.shuffleDungeonEntrances) {
                    return false;
                }
                
                // Cucco dive
                let canGetThereEarly = age === Age.CHILD && 
                    Settings.GlitchesToAllow.botwAsChildWithCucco && 
                    Data.hasSwordWeapon(age) && 
                    Data.hasShield(age);
				if (canGetThereEarly) { return true; }
                
                // Get in normally - non-interior shuffle
                if (!Settings.RandomizerSettings.shuffleInteriorEntrances) {
                    return Data.canPlaySong(Songs.SONG_OF_STORMS);
                }
                
                return Data.interiorShuffleIsWindmillDrained;
            }
        },

        // Interiors
        "Open Grotto Behind Potion Shop": {
            Name: "Open Grotto Behind Potion Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 245, y: 123 },
            Age: Age.EITHER,
            LongDescription: "This grotto is located behind the fenced off area located behind the Potion Shop. Child can get there with a cucco or from sidehopping off the watchtower. Adult can simply walk through the Potion Shop."
        },
        "Hidden Grotto near Tree": {
            Name: "Hidden Grotto near Tree",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 142, y: 169 },
            Age: Age.EITHER,
            LongDescription: "This hidden grotto is between the tree and Talon's house. There's a slightly darker texture that you need to either hammer or bomb.",
            IsHiddenGrotto: true
        },
        "Archery Minigame": {
            Name: "Archery Minigame",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            Time: function() { return (Settings.GlitchesToAllow.kakShopClips && Data.hasShield(Age.ADULT)) ? Time.EITHER : Time.DAY; },
            MapInfo: { x: 190, y: 190 },
            Age: Age.ADULT,
            LongDescription: "This is the building that was being constructed as a child. It's near the well."
        },
        "Back of Impa's House": {
            Name: "Back of Impa's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.DAY_CHILD; },
            MapInfo: { x: 182, y: 252 },
            Age: Age.EITHER,
            LongDescription: "This is the opening above the cucco pen. You can get there as a child via the owl on the top of Death Mountain, or by using a cucco. To do this, throw it up the building under construction (2 throws), then jump to the border (when the construction worker isn't there), then jump at the platform - don't drop the cucco.<br/><br/>As adult, you must hookshot there. Hookshot first to the House of Skulltulas from the ledge by the entrance to Impa's house. Then, hookshot to Impa's house. Make your way to the ledge.<br/><br/>Alternatively, as adult, you can make your way directly under the opening, and simply hold forward to jump onto the ledge.",
        },
        "Impa's House": {
            Name: "Impa's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 141, y: 254 },
            Age: Age.EITHER,
            LongDescription: "This is the building that Anju stands by. The entrance is on the opposite site of the cucco pen.",
        },
        "House of Skulltula": {
            Name: "House of Skulltula",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 141, y: 214 },
            Age: Age.EITHER,
            LongDescription: "This is the building near Impa's house, with the fence near the door."
        },
        "Windmill": {
            Name: "Windmill",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 266, y: 152 },
            IsComplexEntrance: true,
            Age: Age.EITHER,
            LongDescription: "This is the windmill entrance - it's up the stairs near the well."
        },
        "Talon's House": {
            Name: "Talon's House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 162, y: 165 },
            Age: Age.EITHER,
            LongDescription: "This is the building straight ahead of the tree, that has crate with the cucco next to it as a child."
        },
        "Bazaar": {
            Name: "Bazaar",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            Time: function() { return Settings.GlitchesToAllow.kakShopClips ? Time.DAY_ADULT : Time.DAY; },
            MapInfo: { x: 117, y: 89 },
            UseAdultAge: function() { return !Settings.GlitchesToAllow.kakShopClips; },
            Age: Age.EITHER,
            LongDescription: "This is the building to the left if you are facing the Death Mountain entrance.",
            CustomRequirement: function(age) {
                if (age === Age.ADULT) { return true; }
                return Settings.GlitchesToAllow.kakShopClips && Data.hasSwordWeapon(age);
            }
        },
        "Potion Shop Front": {
            Name: "Potion Shop Front",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.DAY_ADULT; },
            MapInfo: { x: 163, y: 92 },
            Age: Age.EITHER,
            LongDescription: "This is the building to the right if you are facing the Death Mountain entrance.",
        },
        "Potion Shop Back": {
            Name: "Potion Shop Back",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            Time: function() { return Settings.GlitchesToAllow.kakShopClips ? Time.EITHER : Time.DAY; },
            MapInfo: { x: 192, y: 96 },
            UseAdultAge: function() { return !Settings.GlitchesToAllow.kakShopClips; },
            Age: Age.EITHER,
            LongDescription: "This entrance to this is where the open grotto is behind the fence. You can use your hookshot to get back here via the roofs. You can also jump onto the potion shop roof from the Death Mountain entrance with a good angle.",
            CustomRequirement: function(age) {
                if (age === Age.ADULT) { return true; }
                return Settings.GlitchesToAllow.kakShopClips && Data.hasSwordWeapon(age);
            }
        },
        "Granny's Potion Shop": {
            Name: "Granny's Potion Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 240, y: 133 },
            Age: Age.ADULT,
            LongDescription: "This is the building behind the potion shop, near the fence that you do the \"ladder jump\" off of.",
        }
    },

    "Graveyard": {
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 17, y: 180},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Nocturne Teleport Pad": {
            Name: "Nocturne Teleport Pad",
            ExitRegion: "top",
            Map: "Graveyard",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            ShowForOwl: true,
            LongDescription: "The Nocturne of Shadow teleport pad on the top part of the graveyard.",
        },
        "Shadow Temple Entrance": {
            Name: "Shadow Temple Entrance",
            ExitRegion: "shadowTemple",
            Map: "Shadow Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 275, y: 140 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Shadow Temple.",
            IsDungeonEntrance: true
        },

        // Interiors
        "Grave with Flowers": {
            Name: "Grave with Flowers",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 206, y: 144 },
            Age: Age.EITHER,
            LongDescription: "There's a gravestone when you first enter that has flowers in front of it. Pull it back and enter to get to the grotto."
        },
        "Unmarked Grave": {
            Name: "Unmarked Grave",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 237, y: 184 },
            Age: Age.EITHER,
            LongDescription: "Go to the Royal Tomb gravestone at the front of the graveyard - position your camera the other way, toward the entrance. The grave will be the second one to your left."
        },
        "Dampe's Shed": {
            Name: "Dampe's Shed",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 94, y: 246 },
            Age: Age.EITHER,
            LongDescription: "Located in the southeast corner of the graveyard.",
        },
        "Dampe's Grave": {
            Name: "Dampe's Grave",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            IsComplexEntrance: true,
            MapInfo: { x: 166, y: 86 },
            Age: Age.ADULT,
            LongDescription: "Under the grave in the in the northwest corner of the graveyard.",
        },
        "Royal Family's Tomb": {
            Name: "Royal Family's Tomb",
            ExitRegion: "royalFamilyTomb",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 303, y: 143 },
            IsGrotto: true,
            Age: Age.EITHER,
            LongDescription: "Play Zelda's Lullaby in front of the big grave in the back of the graveyard to reveal this entrance."
        }
    },

    "Death Mountain Trail": {
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "beyondGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 290},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "main",
            Map: "Goron City",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 237, y: 150},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Death Mountain Crater": {
            Name: "Death Mountain Crater",
            ExitRegion: "upper",
            Map: "Death Mountain Crater",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 233, y: 10},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the crater at the top of the mountain"
        },
        "Owl": {
            Name: "Owl",
            ExitRegion: "upper",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsOwl: true,
            OneWayEntrance: true,
            MapInfo: {x: 226, y: 25},
            Age: Age.CHILD,
            LongDescription: "This is the owl at the top of the mountain by the crater entrance."
        },
        "Dodongo's Cavern Entrance": {
            Name: "Dodongo's Cavern Entrance",
            ExitRegion: "main",
            Map: "Dodongo's Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 175, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Dodongo's Cavern.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
				return age === Age.ADULT || Data.hasExplosivesOrStrength();
            }
        },

        // Interiors
        "Song of Storms Grotto near Goron City": {
            Name: "Song of Storms Grotto near Goron City",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 228, y: 172 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the center of the circle of rocks by Goron City to reveal this grotto",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        },
        "Great Fairy Fountain": {
            Name: "Great Fairy Fountain",
            ExitRegion: "upper",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 220, y: 19 },
            Age: Age.EITHER,
            LongDescription: "This is behind a wall you can destroy on the top of the mountain.",
            NeedToBlastOrSmash: true
        },
        "Cow Grotto": {
            Name: "Cow Grotto",
            ExitRegion: "upper",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 200, y: 186 },
            Age: Age.EITHER,
            LongDescription: "This is under the yellow rock on the ledge right after you bomb the rocks to reach the upper part of the mountain.",
            NeedToBlastOrSmash: true
        }
    },

    "Death Mountain Crater": {
        "Mountain Top": {
            Name: "Mountain Top",
            ExitRegion: "top",
            Map: "Death Mountain Trail",
            Region: "upper",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 263},
            Age: Age.EITHER,
            LongDescription: "This is the entrance at the top of the crater."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "middle",
            Map: "Goron City",
            Region: "darunia",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 47, y: 89},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Bolero Teleport Pad": {
            Name: "Bolero Teleport Pad",
            ExitRegion: "bottom",
            Map: "Death Mountain Crater",
            Region: "bottom",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            ShowForOwl: true,
            LongDescription: "The Bolero of Fire teleport pad at the bottom of Death Mountain Crater.",
        },
        "Fire Temple Entrance": {
            Name: "Fire Temple Entrance",
            ExitRegion: "bottom",
            Map: "Fire Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Fire Temple.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                return age === Age.ADULT || Settings.RandomizerSettings.shuffleDungeonEntrances;
            }
        },

        // Interiors
        "Grotto in Center of Top Rocks": {
            Name: "Grotto in Center of Top Rocks",
            ExitRegion: "top",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 172, y: 260 },
            Age: Age.EITHER,
            LongDescription: "At the top of the crater, bomb or hammer the middle of the circle of rocks to reveal the grotto.",
            NeedToBlastOrSmash: true
        },
        "Great Fairy Fountain": {
            Name: "Great Fairy Fountain",
            ExitRegion: "middle",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 65, y: 170 },
            Age: Age.EITHER,
            UseAdultAge: function() { return !Settings.GlitchesToAllow.childDoubleMagicFairy && !Settings.GlitchesToAllow.equipSwap; },
            LongDescription: "Hammer the silver rocks that are to the left of the Goron City entrance (if you face the entrance) to uncover the entrance.",
            RequiredAdultItems: [Items.MEGATON_HAMMER],
            CustomRequirement: function(age) {
                if (age === Age.ADULT) { return true; }
                return Data.canUseHammer(age) || Settings.GlitchesToAllow.childDoubleMagicFairy;
            }
        },
        "Grotto in Rock by Goron": {
            Name: "Grotto in Rock by Goron",
            ExitRegion: "middle",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 64, y: 60 },
            Age: Age.EITHER,
            UseAdultAge: function() { return !Settings.GlitchesToAllow.childDoubleMagicFairy && !Settings.GlitchesToAllow.equipSwap; },
            LongDescription: "Hammer the rock near the entrance to Goron City to access this grotto.",
            RequiredItems: [Items.MEGATON_HAMMER]
        }
    },

    "Goron City": {
        "Death Mountain Trail": {
            Name: "Death Mountain Trail",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 181, y: 264 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the trail at the top of the city."
        },
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "lostWoods",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 211, y: 179 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance blocked by rocks on the second floor."
        },
        "Death Mountain Crater": {
            Name: "Death Mountain Crater",
            ExitRegion: "darunia",
            Map: "Death Mountain Crater",
            Region: "middle",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 185, y: 10 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance behind darunia's room - push back the statue."
        },

        // Interiors
        "Lava Room Grotto": {
            Name: "Lava Room Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 278, y: 21 },
            Age: Age.ADULT,
            LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
            CustomRequirement: function(age) {
                let canHookshotUp = Equipment.GORON_TUNIC.playerHas && Items.HOOKSHOT.playerHas;
                return canHookshotUp || Data.canPlaySong(Songs.SONG_OF_TIME);
            }
        },
        "Shop": {
            Name: "Shop",
            ExitRegion: "shop",
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 159, y: 132 },
            Age: Age.EITHER,
            LongDescription: "The shop is at the bottom of the city - the entrance is in the middle of two Bomb Flowers on the wall. As child, either light one on fire with a Deku Stick, or simply blow up the wall with an explosive. As an adult, you must stop the rolling goron and he will open it for you."
        }
    },

    "Zora's River": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "downstream",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 13, y: 246},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field at the start of the river - either exit will take you to the same place."
        },
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "upstream",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 330, y: 119},
            Age: Age.EITHER,
            RequiredItems: [Equipment.SCALE],
            LongDescription: "This is the entrance you get to by diving into the water near the waterfall."
        },
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "inWaterfall",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 332, y: 61 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the domain - play Zelda's Lullaby on the symbol by the waterfall."
        },

        // Interiors
        "Song of Storms Grotto": {
            Name: "Song of Storms Grotto",
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 15, y: 145 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the center of the rocks near the cucco spawn to reveal the grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        },
        "Open Grotto on Upper Cliff": {
            Name: "Open Grotto on Upper Cliff",
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 132, y: 217 },
            Age: Age.EITHER,
            LongDescription: "Go up the ladder closest to Hyrule Field. Jump to the cliff behind you and enter the grotto."
        },
        "Grotto Under Rock on Upper Cliff": {
            Name: "Grotto Under Rock on Upper Cliff",
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 159, y: 206 },
            Age: Age.EITHER,
            LongDescription: "Go up the ladder closest to Hyrule Field. This grotto is under the yellow rock at the top.",
            NeedToBlastOrSmash: true
        }
    },

    "Zora's Domain": {
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 77, y: 190},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River."
        },
        "Lake Hylia": {
            Name: "Lake Hylia",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 173, y: 241},
            Age: Age.CHILD,
            LongDescription: "This is the entrance to Zora's River you can get to by diving into the water.",
            RequiredItems: [Equipment.SCALE]
        },
        "Zora's Fountain": {
            Name: "Zora's Fountain",
            ExitRegion: "behindKing",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 219, y: 44},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Fountain behind King Zora."
        },

        // Interiors
        "Shop": {
            Name: "Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 236, y: 254 },
            Age: Age.EITHER,
            LongDescription: "This is the shop. As an adult, you can either use Blue Fire, or perform the shop skip to get inside.",
            CustomRequirement: function(age) {
                if (age === Age.CHILD) { return true; }
                return Data.canUseBlueFire(age) || Settings.GlitchesToAllow.blueFireShopSkip;
            }
        },
        "Song of Storms Grotto": {
            Name: "Song of Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 118, y: 162 },
            Age: Age.EITHER,
            LongDescription: "When you first enter, jump off the cliff to your left. Stand on the little island and play the Song of Storms to reveal this grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        }
    },

    "Zora's Fountain": {
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "behindKing",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 69, y: 139},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Domain."
        },
        "Jabu Jabu's Belly Entrance": {
            Name: "Jabu Jabu's Belly Entrance",
            ExitRegion: "main",
            Map: "Jabu Jabu's Belly",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 142, y: 97 },
            Age: Age.CHILD,
            LongDescription: "This is the entrance to Jabu Jabu.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                if (Settings.GlitchesToAllow.jabuFishless && Data.hasSwordWeapon(age)) {
                    return true;
                }

                return Data.hasBottle(); // Note that this doesn't actually check whether you can get a fish!
            }
        },
        "Ice Cavern Entrance": {
            Name: "Ice Cavern Entrance",
            ExitRegion: "main",
            Map: "Ice Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 185, y: 19 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Ice Cavern.",
            IsDungeonEntrance: true
        },

        // Interiors
        "Great Fairy Fountain": {
            Name: "Great Fairy Fountain",
            ExitRegion: "main",
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 266, y: 269 },
            Age: Age.EITHER,
            LongDescription: "Go to the southeast corner of the map. Bomb the wall by the rocks to reveal this entrance.",
            NeedsExplosives: true
        }
    },

    "Lake Hylia": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 133, y: 12},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field."
        },
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 169, y: 89},
            Age: Age.EITHER,
            UseChildAge: function() { return !Settings.GlitchesToAllow.adultDomainMegaflipClip && !Settings.GlitchesToAllow.adultLakesideLabClip; },
            LongDescription: "This is the entrance to Zora's Domain.",
            CustomRequirement: function(age) {
                if (age === Age.CHILD && Equipment.SCALE.playerHas) { return true; }
                if (!Data.canShieldTurn(age)) { return false; }

                if (age === Age.CHILD) {
                    return Settings.GlitchesToAllow.childLakesideLabClip;
                }

                let defeatedMorpha = Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                return (Settings.GlitchesToAllow.adultLakesideLabClip && defeatedMorpha) ||
                    (Settings.GlitchesToAllow.adultDomainMegaflipClip && Data.hasExplosives());
            }
        },
        "Owl": {
            Name: "Owl",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsOwl: true,
            OneWayEntrance: true,
            MapInfo: {x: 85, y: 177},
            Age: Age.CHILD,
            LongDescription: "This is the owl by the gravestone across the bridge."
        },
        "Serenade Teleport Pad": {
            Name: "Serenade Teleport Pad",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Serenade of Water teleport pad on the island in Lake Hylia.",
        },
        "Water Temple Entrance": {
            Name: "Water Temple Entrance",
            ExitRegion: "main",
            Map: "Water Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 204, y: 215 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Water Temple.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                let canDoClip = (Settings.GlitchesToAllow.childLakesideLabClip && age === Age.CHILD) ||
                    (Settings.GlitchesToAllow.adultLakesideLabClip && age === Age.ADULT);
                if (canDoClip && Data.canShieldTurn(age)) {
                    return true;
                }

                let canEnterNormally = Equipment.IRON_BOOTS.playerHas && Items.HOOKSHOT.playerHas;
				let canDiveDown = Items.HOOKSHOT.currentUpgrade === 2 && Equipment.SCALE.currentUpgrade === 2;
				if (age === Age.ADULT && (canEnterNormally || canDiveDown)) {
					return true;
				};
                if (!Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
                
				let defeatedMorpha = Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
				let canHitSwitch = Data.hasDamagingItem(age) && Equipment.SCALE.currentUpgrade === 2;
				return defeatedMorpha && canHitSwitch;
            }
        },

        // Interiors
        "Fishing Pond": {
            Name: "Fishing Pond",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 247, y: 81 },
            Age: Age.EITHER,
            CustomRequirement: function(age) {
                if (age === Age.CHILD) { return true; }
                
                let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas;
                let canRideUp = Data.itemLocationObtained("Lake Hylia", "main", "*Plant Bean by Lab");
                return canHookshotUp || canRideUp || Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
            },
            LongDescription: "This building is in the building across the water to the northeast."
        },
        "Grotto Under Grave": {
            Name: "Grotto Under Grave",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 93, y: 181 },
            Age: Age.EITHER,
            LongDescription: "Pull the gravestone in the middle of the bridge to reveal this grotto."
        },
        "Lakeside Lab": {
            Name: "Lakeside Lab",
            ExitRegion: "main",
            IsInterior: true,
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 118, y: 86 },
            Age: Age.EITHER,
            LongDescription: "This is the building near the bridge by the lake."
        }
    },

    "Gerudo Valley": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 304, y: 114},
            Age: Age.EITHER,
            LongDescription: "This is the eastern exit."
        },
        "Gerudo Fortress": {
            Name: "Gerudo Fortress",
            ExitRegion: "acrossBridge",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 62, y: 51},
            Age: Age.EITHER,
            LongDescription: "This is the western exit."
        },
        "To Lake Hylia": {
            Name: "To Lake Hylia",
            ExitRegion: "chasm",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 275, y: 275},
            Age: Age.EITHER,
            Region: "main",
            OneWayEntrance: true,
            OwShuffleMap: "Lake Hylia",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Hyrule Field",
            ReadOnly: true,
            LongDescription: "This is the river exit to the lake. It will ALWAYS lead to the lake."
        },

        // Interiors
        "Grotto Under Silver Rock": {
            Name: "Grotto Under Silver Rock",
            ExitRegion: "chasmSilverRockLedge",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 220, y: 182 },
            Age: Age.ADULT,
            LongDescription: "From the side closest to Hyrule Field, look to your left. The grotto is under the silver rock. Lift it up with your silver gauntlets to reveal it.",
            RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
        },
        "Tent": {
            Name: "Tent",
            ExitRegion: "acrossBridge",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            MapInfo: { x: 141, y: 78 },
            Age: Age.EITHER,
            UseAdultAge: function() { 
                if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                    return false;
                }
                return !Settings.GlitchesToAllow.cuccoJump;
            },
            LongDescription: "This is the tent on the west side of the bridge as adult. Also, the loading zone is actually there as child."
        },
        "Song of Storms Grotto Behind Tent": {
            Name: "Song of Storms Grotto Behind Tent",
            ExitRegion: "acrossBridge",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 140, y: 56 },
            Age: Age.ADULT,
            LongDescription: "Play the Song of Storms behind the tent to spawn this grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS],
        }
    },

    "Gerudo Fortress": {
        "Gerudo Valley": {
            Name: "Gerudo Valley",
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "acrossBridge",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 158, y: 284},
            Age: Age.EITHER,
            LongDescription: "This is the exit back to the valley."
        },
        "Haunted Wasteland": {
            Name: "Haunted Wasteland",
            ExitRegion: "wastelandEntrance",
            Map: "Haunted Wasteland",
            Region: "entrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 77, y: 112},
            Age: Age.EITHER,
            LongDescription: "This is the exit to the wasteland. As Child, here's how to skip the gate: climb the ladder; go a bit to the right if you are facing the ladder; angle yourself so that when you sidehop left, you end up on the cliff; walk forward until you are passed the gate; sidehop left and keep holding left."
        },
        "Training Grounds Entrance": {
            Name: "Training Grounds Entrance",
            ExitRegion: "main",
            Map: "Training Grounds",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 124, y: 197 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Gerudo Training Grounds.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
				if (age === Age.CHILD) {
					return Settings.GlitchesToAllow.gtgChildAllowed;
                }
                
				return Settings.GlitchesToAllow.gtgAdultNoCard || Data.areGerudoGuardsTame();
            }
        },

        // Interiors
        "Song of Storms Grotto": {
            Name: "Song of Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsGrotto: true,
            MapInfo: { x: 137, y: 172 },
            Age: Age.ADULT,
            LongDescription: "Play the song of storms in the center of the crates near the fortress to reveal this grotto.",
            RequiredSongs: [Songs.SONG_OF_STORMS]
        }
    },

    "Haunted Wasteland": {
        "Gerudo Fortress": {
            Name: "Gerudo Fortress",
            ExitRegion: "entrance",
            Map: "Gerudo Fortress",
            Region: "wastelandEntrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 310, y: 281},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the fortress."
        },
        "Desert Colossus": {
            Name: "Desert Colossus",
            ExitRegion: "exit",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 45, y: 133},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the colossus."
        }
    },

    "Desert Colossus": {
        "Haunted Wasteland": {
            Name: "Haunted Wasteland",
            ExitRegion: "main",
            Map: "Haunted Wasteland",
            Region: "exit",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 318, y: 111 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the wasteland."
        },
        "Requiem Teleport Pad": {
            Name: "Requiem Teleport Pad",
            ExitRegion: "main",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Requiem of Spirit teleport pad at Desert Colossus.",
        },
        "Spirit Temple Entrance": {
            Name: "Spirit Temple Entrance",
            ExitRegion: "main",
            Map: "Spirit Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 63, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Spirit Temple.",
            IsDungeonEntrance: true
        },

        // Interiors
        "Great Fairy Fountain": {
            Name: "Great Fairy Fountain",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            IsInterior: true,
            OneWayInteriorSpawnEntrance: true,
            MapInfo: { x: 231, y: 51 },
            Age: Age.EITHER,
            LongDescription: "There's a crack in the wall in the north middle of the map. Bomb it to get inside.",
            NeedsExplosives: true
        },
        "Silver Rock Grotto": {
            Name: "Silver Rock Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.ENTRANCE,
            MapInfo: { x: 117, y: 81 },
            IsGrotto: true,
            Age: Age.ADULT,
            LongDescription: "Lift the silver rock by the warp song location to reveal this grotto.",
            RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
        }
    },

    "Interiors" : {
        "Grave Exit": {
            Name: "Grave Exit",
            ExitRegion: "dampesGrave",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER
        },
        "Windmill Exit": {
            Name: "Windmill Exit",
            ExitRegion: "windmill",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER
        },
        "Potion Shop Front": {
            Name: "Potion Shop Front",
            ExitRegion: "kakPotionShop",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER
        },
        "Potion Shop Back": {
            Name: "Potion Shop Back",
            ExitRegion: "kakPotionShop",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.ADULT
        }
    },

    "Deku Tree": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "afterMido",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F2" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Deku Tree."
        }
    },

    "Dodongo's Cavern": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from Dodongo's Cavern."
        }
    },

    "Jabu Jabu's Belly": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from Jabu Jabu's Belly."
        }
    },

    "Forest Temple": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Sacred Forest Meadow",
            Region: "afterGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Forest Temple."
        }
    },

    "Fire Temple": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Death Mountain Crater",
            Region: "bottom",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Fire Temple."
        }
    },

    "Water Temple": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F3" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Water Temple."
        }
    },

    "Shadow Temple": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Graveyard",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Order: 0,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Shadow Temple."
        }
    },

    "Spirit Temple": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Graveyard",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Shadow Temple."
        },
        "Desert Colossus": {
            Name: "Desert Colossus",
            ExitRegion: "statueHands",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 174, y: 241, floor: "F3" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to either of the statue hands from the spirit temple.",
            ReadOnly: true,
            Hide: true,
            OneWayEntrance: true,
            OwShuffleMap: "Desert Colossus",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Haunted Wasteland"
        }
    },

    "Bottom of the Well": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Order: 0,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Bottom of the Well."
        }
    },

    "Ice Cavern": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Ice Cavern."
        }
    },

    "Training Grounds": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from the Gerudo Training Grounds."
        }
    },

    "Ganon's Castle": {
        "Exit": {
            Name: "Exit",
            ExitRegion: "main",
            Map: "Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            Hide: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            LongDescription: "This is the exit from Ganon's Castle."
        }
    }
}