let OwExits = {
    "Kokiri Forest": {
        // Main Area
        "Lost Woods Bottom": {
            SpoilerLogExitName: "Kokiri Forest -> LW Bridge From Forest",
            ExitRegion: "main",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 46, y: 130 },
            Age: Age.EITHER,
            LongDescription: "This is the bottom entrance to the Lost Woods.",
            TricksToShow: [Tricks.pokeySkip],
            ChildNeedsAny: [
                SettingSets.OPEN_FOREST,
                GameStateSets.DEFEATED_DEKU_TREE_BOSS,
                Tricks.pokeySkip.canDo
            ]
        },
        "Mido's House": {
            SpoilerLogExitName: "Kokiri Forest -> KF Midos House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Mido's House",
            MapInfo: { x: 125, y: 100 },
            Age: Age.EITHER,
            LongDescription: "This is the house closest to the entrance to the Lost Woods."
        },
        "Link's House": {
            SpoilerLogExitName: "Kokiri Forest -> KF Links House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            IsComplexEntrance: true,
            DefaultEntranceGroupName: "Link's House",
            MapInfo: { x: 170, y: 236 },
            Age: Age.EITHER,
            LongDescription: "This is the house with the ladder."
        },
        "Saria's House": {
            SpoilerLogExitName: "Kokiri Forest -> KF Sarias House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Saria's House",
            MapInfo: { x: 204, y: 228 },
            Age: Age.EITHER,
            LongDescription: "This is the house to your right if you face away from Link's house."
        },
        "House of Twins": {
            SpoilerLogExitName: "Kokiri Forest -> KF House of Twins",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "2 Pot Interior",
            MapInfo: { x: 252, y: 248 },
            Age: Age.EITHER,
            LongDescription: "This is the house across from the shop."
        },
        "Shop": {
            SpoilerLogExitName: "Kokiri Forest -> KF Kokiri Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Kokiri Shop",
            MapInfo: { x: 245, y: 128 },
            Age: Age.EITHER,
            LongDescription: "Found in the middle of the village."
        },

        // Upper Ledges
        "Lost Woods Top": {
            SpoilerLogExitName: "Kokiri Forest -> Lost Woods",
            DisplayGroup: { groupName: "Upper Ledges", imageName: "Song of Storms" },
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "nearGoronCity",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 133, y: 13 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Lost Woods that is up the vines."
        },
        "Song of Storms Grotto by Lost Woods": {
            SpoilerLogExitName: "Kokiri Forest -> KF Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 109, y: 36 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms by the Gossip Stone near the Lost Woods entrance to reveal this grotto.",
            Needs: [Songs.SONG_OF_STORMS]
        },

        // Training Area & Maze
        "Know-It-All House": {
            SpoilerLogExitName: "Kokiri Forest -> KF Know It All House",
            DisplayGroup: { groupName: "Training Area & Maze", imageName: "Kokiri Sword" },
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "2 Pot Interior",
            MapInfo: { x: 84, y: 179 },
            Age: Age.EITHER,
            LongDescription: "This is the house by the fenced off training area."
        },

        // Deku Tree
        "Deku Tree": {
            SpoilerLogExitName: "KF Outside Deku Tree -> Deku Tree Lobby",
            ExitRegion: "afterMido",
            Map: "Deku Tree",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 263, y: 65 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Deku Tree.",
            IsDungeonEntrance: true,
            AdultNeeds: [() => Data.getDoesEntranceShuffleApply("Deku Tree")]
        }
    },

    "Lost Woods": {
        "To Kokiri Forest": {
            SpoilerLogExitName: "LW Forest Exit -> Kokiri Forest",
            ExitRegion: "kokiriForestWarp",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 165, y: 187 },
            Age: Age.EITHER,
            LongDescription: "This is ANY of the entrances leading back to Kokiri."
        },
        "Goron City": {
            SpoilerLogExitName: "Lost Woods -> GC Woods Warp",
            ExitRegion: "nearGoronCity",
            Map: "Goron City",
            Region: "lostWoods",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 209, y: 111 },
            Order: 7,
            Age: Age.EITHER,
            LongDescription: "This is the exit to Goron City."
        },
        "Zora's River": {
            SpoilerLogExitName: "Lost Woods -> Zora River",
            ExitRegion: "nearGoronCity",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 284, y: 126 },
            Order: 8,
            Age: Age.EITHER,
            NeedsAny: [
                Equipment.SCALE,
                Equipment.IRON_BOOTS,
                Tricks.zorasRiverScalelessChild.canDo,
                Tricks.zorasRiverScalelessAdult.canDo],
            LongDescription: "This is the exit to Zora's River that you get to by diving.",
            TricksToShow: [Tricks.zorasRiverScalelessChild, Tricks.zorasRiverScalelessAdult]
        },
        "To Lost Woods Bridge": {
            ExitRegion: "skullKidAndBridge",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 251},
            Age: Age.EITHER,
            UseAdultAge: function() { return !Tricks.megaFlip.enabled; },
            OneWayEntrance: true,
            ChildNeeds: [Tricks.megaFlip.canDo],
            AdultNeedsAny: [
                Equipment.HOVER_BOOTS,
                UpgradedItems.LONGSHOT,
                BeanSets.LOST_WOODS_BRIDGE,
                Tricks.megaFlip.canDo,
                Tricks.lwAdultBridgeFromTop.canDo,
                Tricks.lwAdultBridgeWithHookshot.canDo],
            OwShuffleMap: "Lost Woods Bridge",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Kokiri Forest Bridge",
            ReadOnly: true,
            ExcludeFromDropdown: true,
            LongDescription: "This is taken via the magic bean, hover boots, longshotting (hookshotting with a trick), megaflipping, or precise jumping to the bridge.",
            TricksToShow: [Tricks.lwAdultBridgeFromTop, Tricks.lwAdultBridgeWithHookshot]
        },
        "Sacred Forest Meadow": {
            SpoilerLogExitName: "LW Beyond Mido -> SFM Entryway",
            ExitRegion: "secondHalf",
            Map: "Sacred Forest Meadow",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 211, y: 21 },
            Order: 10,
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Sacred Forest Meadow."
        },

        // Interiors
        "Grotto by Goron City": {
            SpoilerLogExitName: "Lost Woods -> LW Near Shortcuts Grotto",
            ExitRegion: "nearGoronCity",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 218, y: 118 },
            Order: 4,
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, go right and then left. Remove the rock on this screen to reveal this grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Forest Stage Grotto": {
            SpoilerLogExitName: "LW Beyond Mido -> Deku Theater",
            ExitRegion: "secondHalf",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Forest Stage",
            MapInfo: { x: 160, y: 86 },
            Order: 6,
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. In the back of this room, walk around until you fall into this grotto."
        },
        "Grotto Near Meadow": {
            SpoilerLogExitName: "LW Beyond Mido -> LW Scrubs Grotto",
            ExitRegion: "secondHalf",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "2 Scrubs",
            MapInfo: { x: 202, y: 31 },
            Order: 8,
            Age: Age.EITHER,
            LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room to reveal the grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        }
    },

    "Lost Woods Bridge": {
        "Kokiri Forest Bridge": {
            SpoilerLogExitName: "LW Bridge -> Kokiri Forest",
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 221, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Kokiri Forest exit from the bridge."
        },
        "Hyrule Field Bridge": {
            SpoilerLogExitName: "LW Bridge -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 132, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Hyrule Field exit from the bridge."
        },
        "Bridge to Lost Woods": {
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "skullKidAndBridge",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 148, y: 74 },
            ReadOnly: true,
            ExcludeFromDropdown: true,
            OwShuffleMap: "Lost Woods",
            OwShuffleRegion: "skullKidAndBridge",
            OwShuffleExitName: "To Kokiri Forest",
            Age: Age.EITHER,
            UseAdultAge: function() { return !Tricks.megaFlip.enabled && !Tricks.lwBridgePressureJump.enabled; },
            LongDescription: "Longshot from the bridge to the ladder to get to the lost woods.<br/><br/>Megaflip setup: Get in the corner closest to the ladder; take a tiny step back; c-up and face the third rope support; turn 180; dry roll if using bombs; megaflip",
            TricksToShow: [Tricks.lwBridgePressureJump],
            NeedsAny: [
                UpgradedItems.LONGSHOT, 
                Tricks.megaFlip.canDo, 
                Tricks.lwBridgePressureJump.canDo
            ]
        }
    },

    "Sacred Forest Meadow": {
        // Before maze
        "Lost Woods": {
            SpoilerLogExitName: "SFM Entryway -> LW Beyond Mido",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "secondHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 178, y: 288 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back into the Lost Woods."
        },
        "Grotto near Lost Woods": {
            SpoilerLogExitName: "SFM Entryway -> SFM Wolfos Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Wolfos Grotto",
            MapInfo: { x: 177, y: 274 },
            Age: Age.EITHER,
            LongDescription: "This hidden grotto is roughly halfway between the Lost Woods entrance and the maze entrance. It can be revealed with an explosive or a hammer.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },

        // Maze
        "Grotto in Maze Center": {
            SpoilerLogExitName: "Sacred Forest Meadow -> SFM Fairy Grotto",
            ExitRegion: "afterGate",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 194, y: 147 },
            Age: Age.EITHER,
            LongDescription: "This is the grotto in the center of the maze. You normally need to climb the ladder to get here."
        },

        // After Maze
        "Minuet Teleport Pad": {
            DisplayGroup: { groupName: "After Maze", imageName: "Forest Medallion" },
            ExitRegion: "afterGate",
            Map: "Sacred Forest Meadow",
            Region: "afterGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            ShowForOneWay: true,
            LongDescription: "The Minuet of Forest teleport pad at the end of the Sacred Forest Meadow.",
        },
        "Forest Temple": {
            SpoilerLogExitName: "SFM Forest Temple Entrance Ledge -> Forest Temple Lobby",
            ExitRegion: "afterGate",
            Map: "Forest Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Forest Temple.",
            IsDungeonEntrance: true,
            Needs: [Items.HOOKSHOT]
        },
        "Song of Storms Grotto": {
            SpoilerLogExitName: "Sacred Forest Meadow -> SFM Storms Grotto",
            ExitRegion: "afterGate",
            DefaultEntranceGroupName: "2 Scrubs",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 207 , y: 53 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the corner of the room with the Forest Temple entrance to reveal the grotto. Facing the forest temple, this is the lower-right corner.",
            Needs: [Songs.SONG_OF_STORMS]
        }
    },

    "Hyrule Field": {
        // Northeast
        "Lost Woods Bridge": {
            SpoilerLogExitName: "Hyrule Field -> LW Bridge",
            ExitRegion: "main",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 326, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Kokiri Forest."
        },
        "Zora's River": {
            SpoilerLogExitName: "Hyrule Field -> ZR Front",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "downstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 320, y: 68 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River. The water and land exits will go to the same place."
        },
        "Kakariko Village": {
            SpoilerLogExitName: "Hyrule Field -> Kakariko Village",
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
            SpoilerLogExitName: "Hyrule Field -> Market Entrance",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 197, y: 21 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Market."
        },
        "Lon Lon Ranch": {
            SpoilerLogExitName: "Hyrule Field -> Lon Lon Ranch",
            ExitRegion: "main",
            Map: "Lon Lon Ranch",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 164, y: 72 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lon Lon Ranch in the center of the map."
        },
        "Hidden Grotto by Kakariko": {
            SpoilerLogExitName: "Hyrule Field -> HF Near Kak Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Skulltula at Distance",
            MapInfo: { x: 237, y: 23 },
            Age: Age.EITHER,
            LongDescription: "North of the entrance to Kakariko, there's a tree with a hidden grotto - bomb or hammer to open it.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Grotto in Drawbridge Rock": {
            SpoilerLogExitName: "Hyrule Field -> HF Near Market Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 170, y: 39 },
            Age: Age.EITHER,
            LongDescription: "Remove the rock to the left of the Market drawbridge to reveal this grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },

        // West
        "Gerudo Valley": {
            SpoilerLogExitName: "Hyrule Field -> Gerudo Valley",
            DisplayGroup: { groupName: "West", imageName: "Gerudo Membership Card" },
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 29, y: 137 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Gerudo Valley."
        },
        "Grotto in Rock North of River": {
            SpoilerLogExitName: "Hyrule Field -> HF Fairy Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 102, y: 20 },
            Age: Age.EITHER,
            LongDescription: "On the north side of the river to the west of the Market entrance, there's a grotto under a yellow rock.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Hidden Grotto by North River Tree": {
            SpoilerLogExitName: "Hyrule Field -> HF Tektite Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Water Heart Piece Grotto",
            MapInfo: { x: 91, y: 57 },
            Age: Age.EITHER,
            LongDescription: "To the west of the Market entrance, there's a lone tree to the south of a river. Bomb or hammer near the tree to reveal this grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Grotto by Gerudo": {
            SpoilerLogExitName: "Hyrule Field -> HF Cow Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Cow and Web Grotto",
            MapInfo: { x: 50, y: 103 },
            Age: Age.EITHER,
            LongDescription: "Near the entrance to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock.",
            TricksToShow: [Tricks.adultGrottoByGVWithoutHammer],
            ChildNeeds: [ItemSets.BLAST_OR_SMASH_ITEMS],
            AdultNeedsAny: [Items.MEGATON_HAMMER, Tricks.adultGrottoByGVWithoutHammer.canDo]
        },

        // South
        "Lake Hylia": {
            SpoilerLogExitName: "Hyrule Field -> Lake Hylia",
            DisplayGroup: { groupName: "South", imageName: "Fishing Pond" },
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 64, y: 290 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lake Hylia."
        },
        "Grotto in Southeast Forest Rock": {
            SpoilerLogExitName: "Hyrule Field -> HF Southeast Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 201, y: 227 },
            Age: Age.EITHER,
            LongDescription: "In the southeast (a bit south of the Kokiri Forest entrance), there's a small forest that has a rock you can break to reveal this grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Open Grotto East of Lake Hylia Fences": {
            SpoilerLogExitName: "Hyrule Field -> HF Open Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 112, y: 272 },
            Age: Age.EITHER,
            LongDescription: "This is an open grotto just to the east of the square of fences by the Lake Hylia entrance."
        },
        "Grotto by Lake Hylia Fences": {
            SpoilerLogExitName: "Hyrule Field -> HF Inside Fence Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "1 Scrub",
            MapInfo: { x: 91, y: 267 },
            Age: Age.EITHER,
            LongDescription: "There's a hidden grotto in the center of the fences by Lake Hylia. Bomb or hammer there to get in. The scrub is inside.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        }
    },

    "Lon Lon Ranch": {
        // Entrance
        "Hyrule Field": {
            SpoilerLogExitName: "Lon Lon Ranch -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 218, y: 32 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule Field."
        },
        "Talon's House": {
            SpoilerLogExitName: "Lon Lon Ranch -> LLR Talons House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Super Cucco Minigame",
            MapInfo: { x: 230, y: 54 },
            Time: function() {
                return ItemLocationSets.WAKE_UP_TALON()
                    ? Time.DAY_CHILD
                    : Time.EITHER;
            },
            Age: Age.EITHER,
            LongDescription: "This is the first door on your left when you first enter the ranch."
        },
        "Stable": {
            SpoilerLogExitName: "Lon Lon Ranch -> LLR Stables",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Stable",
            MapInfo: { x: 198, y: 54 },
            Age: Age.EITHER,
            LongDescription: "This is the first door on your right when you first enter the ranch."
        },

        // Back
        "Open Grotto in Southwest Corner": {
            SpoilerLogExitName: "Lon Lon Ranch -> LLR Grotto",
            DisplayGroup: { groupName: "Back", imageName: "Cow Shed" },
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "3 Scrubs",
            MapInfo: { x: 290, y: 240 },
            Age: Age.CHILD,
            LongDescription: "There's an open grotto as a child at the far southwest corner of the ranch."
        },
        "Cow Shed": {
            SpoilerLogExitName: "Lon Lon Ranch -> LLR Tower",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Cow Shed",
            MapInfo: { x: 106, y: 265 },
            Age: Age.EITHER,
            LongDescription: "Head to the back of Lon Lon Ranch to find this building."
        }
    },

    "Market Entrance": {
        "Hyrule Field": {
            SpoilerLogExitName: "Market Entrance -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Time: function() { return Time.DAY_CHILD; },
            MapInfo: { x: 166, y: 261 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule field."
        },
        "Market": {
            SpoilerLogExitName: "Market Entrance -> Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 166, y: 31 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },

        // Interiors
        "Guard House": {
            SpoilerLogExitName: "Market Entrance -> Market Guard House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Market Guard House",
            MapInfo: { x: 203, y: 233 },
            Age: Age.EITHER,
            LongDescription: "This is the door near the Hyrule Field entrance."
        }
    },

    "Market": {
        "Market Entrance": {
            SpoilerLogExitName: "Market -> Market Entrance",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 246},
            Order: 10,
            Age: Age.EITHER,
            LongDescription: "This is the path to the market entrance."
        },
        "Hyrule Castle": {
            SpoilerLogExitName: "Market -> Castle Grounds",
            ExitRegion: "main",
            Map: "Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 47},
            Order: 11,
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Castle."
        },
        "Temple of Time": {
            SpoilerLogExitName: "Market -> ToT Entrance",
            ExitRegion: "main",
            Map: "Temple of Time",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 350, y: 136},
            Order: 12,
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Temple of Time area."
        },

        // Interiors
        "Archery Minigame": {
            SpoilerLogExitName: "Market -> Market Shooting Gallery",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Child Archery",
            Time: function() { return Time.DAY; },
            MapInfo: { x: 234, y: 120 },
            Order: 4,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building just to the left of the Hyrule Castle entrance."
        },
        "Happy Mask Shop": {
            SpoilerLogExitName: "Market -> Market Mask Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Happy Mask Shop",
            Time: function() { return Time.DAY; },
            MapInfo: { x: 286, y: 120 },
            Order: 5,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building just to the right of the Hyrule Castle entrance."
        },
        "Potion Shop": {
            SpoilerLogExitName: "Market -> Market Potion Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Shop",
            Time: function() { return Time.DAY; },
            MapInfo: { x: 308, y: 159 },
            Order: 6,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "Starting at the market entrance, this is the second building you can enter going counter-clockwise."
        },
        "Bazaar": {
            SpoilerLogExitName: "Market -> Market Bazaar",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Shop",
            Time: function() { return Time.DAY; },
            MapInfo: { x: 308, y: 191 },
            Order: 7,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "Starting at the market entrance, this is the first building you can enter going counter-clockwise."
        },
        "Treasure Chest Minigame": {
            SpoilerLogExitName: "Market -> Market Treasure Chest Game",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Treasure Chest Minigame",
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 215, y: 230 },
            Order: 8,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This is the building to the right of the market entrance exit - it's only open at night.",
        },
        "Bombchu Bowling": {
            SpoilerLogExitName: "Market -> Market Bombchu Bowling",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Bombchu Bowling",
            MapInfo: { x: 205, y: 174 },
            Order: 9,
            OneWayInteriorSpawnEntrance: true,
            Age: Age.CHILD,
            LongDescription: "This building is the one between the two market alley entrances."
        },
        "Bombchu Shop": {
            SpoilerLogExitName: "Market Back Alley -> Market Bombchu Shop",
            ExitRegion: "alley",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Shop",
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 130, y: 232 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.EITHER,
            LongDescription: "This door only opens at night. Starting at the market entrance, go straight right into the alley. Take the first door on the left wall to get to the door."
        },
        "Door in Right Market Alley": {
            SpoilerLogExitName: "Market Back Alley -> Market Man in Green House",
            ExitRegion: "alley",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "3 Pot Interior",
            Time: function() { return Time.NIGHT; },
            MapInfo: { x: 112, y: 112 },
            OneWayInteriorSpawnEntrance: true,
            Age: Age.EITHER,
            LongDescription: "This door only opens at night. This is the door on the screen if you enter the alley from the entrance by the archery building."
        }
    },

    "Temple of Time": {
        "Market": {
            SpoilerLogExitName: "ToT Entrance -> Market",
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
            SpoilerLogExitName: "ToT Entrance -> Temple of Time",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            IsComplexEntrance: true,
            DefaultEntranceGroupName: "Temple of Time",
            MapInfo: { x: 198, y: 37 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance into the temple."
        }
    },

    "Castle": {
        "Market": {
            SpoilerLogExitName: "Castle Grounds -> Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 100, y: 290, floor: "ANY" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },
        "Ganon's Castle": {
            SpoilerLogExitName: "Ganons Castle Grounds -> Ganons Castle Lobby",
            ExitRegion: "ganonsCastle",
            Map: "Ganon's Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Order: 3,
            MapInfo: { x: 171, y: 160, floor: "GAN" },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to Ganon's Castle.",
            IsDungeonEntrance: true,
            CustomRequirement: function(age) {
                switch (Settings.RandomizerSettings.medallionSetting) {
                    case MedallionSettings.VANILLA:
                        return Items.LIGHT_ARROW.playerHas && // HAVING the light arrows is the requirement, not USING
                            ItemData.canUse(age, [Medallions.SHADOW_MEDALLION, Medallions.SPIRIT_MEDALLION])
                    case MedallionSettings.OPEN:
                        return true;
                    case MedallionSettings.ALL_MEDALLIONS:
                        return ItemData.canUse(age, [
                            Medallions.FOREST_MEDALLION,
                            Medallions.FIRE_MEDALLION,
                            Medallions.WATER_MEDALLION,
                            Medallions.SHADOW_MEDALLION,
                            Medallions.SPIRIT_MEDALLION,
                            Medallions.LIGHT_MEDALLION]);
                    case MedallionSettings.ALL_DUNGEONS:
                        return ItemData.canUse(age, [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE,
                            Medallions.FOREST_MEDALLION,
                            Medallions.FIRE_MEDALLION,
                            Medallions.WATER_MEDALLION,
                            Medallions.SHADOW_MEDALLION,
                            Medallions.SPIRIT_MEDALLION,
                            Medallions.LIGHT_MEDALLION]);
                    case MedallionSettings.ALL_STONES:
                        return ItemData.canUse(age, [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE]);
                    case MedallionSettings.SKULLTULAS:
                        return Equipment.SKULLTULA_TOKENS.count >= Settings.RandomizerSettings.medallionSkulltulaSetting;
                    default: return true;
                }
            }
        },

        // Interiors
        "Hyrule Great Fairy Fountain": {
            SpoilerLogExitName: "Hyrule Castle Grounds -> HC Great Fairy Fountain",
            ExitRegion: "hyruleCastle",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            Order: 3,
            MapInfo: { x: 285, y: 231, floor: "HYR" },
            Age: Age.CHILD,
            LongDescription: "After climbing the vines and jumping off the building, follow the right wall until you reach a rock. Bomb it and enter the crawlspace.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Song of Storms Grotto": {
            SpoilerLogExitName: "Hyrule Castle Grounds -> HC Storms Grotto",
            ExitRegion: "hyruleCastle",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Bombable Wall Grotto",
            Age: Age.CHILD,
            Order: 6,
            MapInfo: { x: 200, y: 92, floor: "HYR" },
            LongDescription: "There's a tree in the corner near the milk boxes at the castle. Play the Song of Storms there to open this grotto.",
            Needs: [Songs.SONG_OF_STORMS]
        },
        "Ganon Great Fairy Fountain": {
            SpoilerLogExitName: "Ganons Castle Grounds -> OGC Great Fairy Fountain",
            ExitRegion: "ganonsCastle",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            Order: 2,
            MapInfo: { x: 308, y: 161, floor: "GAN" },
            Age: Age.ADULT,
            LongDescription: "At the end of the main rock is a giant block you can pull up with Golden Gauntlets. Alternatively, you can use hover boots and a shield to clip past the block.",
            TricksToShow: [Tricks.doubleDefenseEarly],
            NeedsAny: [UpgradedItems.GOLDEN_GAUNTLETS, Tricks.doubleDefenseEarly.canDo]
        }
    },

    "Kakariko Village": {
        // Lower Area
        "Hyrule Field": {
            SpoilerLogExitName: "Kakariko Village -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 14, y: 213},
            Age: Age.EITHER,
            Order: 28,
            LongDescription: "This is the entrance back to Hyrule Field."
        },
        "Graveyard": {
            SpoilerLogExitName: "Kakariko Village -> Graveyard",
            ExitRegion: "main",
            Map: "Graveyard",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 302, y: 234},
            Age: Age.EITHER,
            Order: 29,
            LongDescription: "This is the entrance to the graveyard."
        },
        "Bottom of the Well": {
            SpoilerLogExitName: "Kakariko Village -> Bottom of the Well",
            ExitRegion: "main",
            Map: "Bottom of the Well",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Time: function() {
                // Water already drained means there's no time requirement
                if (ItemLocationSets.DRAIN_WELL_WATER()) {
                    return Time.EITHER;
                }

                let childNeedsDay = Tricks.botwAsChildWithCucco.canDo(Age.CHILD);
                let adultNeedsDay = Tricks.botwAsAdultWithCucco.canDo(Age.ADULT);
                let adultCanGetAtEither = Tricks.botwAsAdultWihChus.canDo(Age.ADULT);

                if (adultCanGetAtEither) {
                    return childNeedsDay 
                        ? Time.DAY_CHILD // Child needs day; adult can do it
                        : Time.EITHER; // Adult can do it, but child cannot
                }

                // If either need to use the cucco glitch, then it should always be strict day requirement
                if (childNeedsDay || adultNeedsDay) {
                    return Time.DAY
                }

                // Neither can get there
                return Time.EITHER;
            },
            MapInfo: { x: 227, y: 170 },
            Age: Age.EITHER,
            Order: 30,
            LongDescription: "This is the entrance to the Bottom of the Well.",
            TricksToShow: [Tricks.botwAsChildWithCucco, Tricks.botwAsAdultWithCucco, Tricks.botwAsAdultWihChus],
            IsDungeonEntrance: true,
            NeedsAny: [
                Tricks.botwAsChildWithCucco.canDo,
                Tricks.botwAsAdultWithCucco.canDo,
                Tricks.botwAsAdultWihChus.canDo,
                ItemLocationSets.DRAIN_WELL_WATER,
                [
                    SettingSets.VANILLA_INTERIOR_ENTRANCES,
                    SettingSets.VANILLA_OVERWORLD_ENTRANCES,
                    () => Data.canBeAge(Age.CHILD),
                    Songs.SONG_OF_STORMS
                ]
            ]
        },
        "Hidden Grotto near Tree": {
            SpoilerLogExitName: "Kakariko Village -> Kak Redead Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Two Redead Grotto",
            MapInfo: { x: 142, y: 169 },
            Age: Age.EITHER,
            Order: 21,
            LongDescription: "This hidden grotto is between the tree and Talon's house. There's a slightly darker texture that you need to either hammer or bomb.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Talon's House": {
            SpoilerLogExitName: "Kakariko Village -> Kak Carpenter Boss House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Talon's House Kakariko",
            MapInfo: { x: 162, y: 165 },
            Age: Age.EITHER,
            Order: 22,
            LongDescription: "This is the building straight ahead of the tree that has the crate with the cucco next to it as a child."
        },
        "House of Skulltula": {
            SpoilerLogExitName: "Kakariko Village -> Kak House of Skulltula",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "House of Skulltula",
            MapInfo: { x: 141, y: 214 },
            Age: Age.EITHER,
            Order: 23,
            LongDescription: "This is the building near Impa's house, with the fence near the door."
        },
        "Impa's House": {
            SpoilerLogExitName: "Kakariko Village -> Kak Impas House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            MapInfo: { x: 141, y: 254 },
            Age: Age.EITHER,
            Order: 24,
            LongDescription: "This is the building that Anju stands by. The entrance is on the opposite site of the cucco pen.",
        },
        "Back of Impa's House": {
            SpoilerLogExitName: "Kak Impas Ledge -> Kak Impas House Back",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Back of Impa's House",
            Time: function() { return Time.DAY_CHILD; },
            MapInfo: { x: 182, y: 252 },
            Age: Age.EITHER,
            Order: 25,
            LongDescription: "The opening above the cucco pen.<br/><br/>Child: Grab a cucco and throw it up the building under construction. Hold forward and jump off, then angle your joystick to the top-right until you're lined up with the platform.<br/><br/>Adult: Jump onto the wood under the opening, then hold forward while under it to clip into the ledge."
        },
        "Archery Minigame": {
            SpoilerLogExitName: "Kakariko Village -> Kak Shooting Gallery",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Adult Archery",
            Time: function() { 
                return Tricks.kakShopClips.canDoForArchery(Age.ADULT) 
                    ? Time.EITHER 
                    : Time.DAY;
            },
            MapInfo: { x: 190, y: 190 },
            Age: Age.ADULT,
            Order: 26,
            LongDescription: "This is the building that was being constructed as a child. It's near the well.",
            TricksToShow: [Tricks.kakShopClips]
        },
        "Windmill": {
            SpoilerLogExitName: "Kakariko Village -> Kak Windmill",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Windmill",
            MapInfo: { x: 266, y: 152 },
            IsComplexEntrance: true,
            Age: Age.EITHER,
            Order: 27,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleInteriorEntrances; },
            Needs: [SettingSets.SHUFFLE_INTERIOR_ENTRANCES],
            LongDescription: "This is the windmill entrance - it's up the stairs near the well."
        },
        "Windmill to Interior": {
            ExitRegion: "main",
            Map: "Windmill-Kak Potion",
            Region: "windmill",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 266, y: 152 },
            Age: Age.EITHER,
            Order: 28,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleInteriorEntrances; },
            Needs: [SettingSets.VANILLA_INTERIOR_ENTRANCES],
            OwShuffleMap: "Windmill-Kak Potion",
            OwShuffleRegion: "windmill",
            OwShuffleExitName: "Windmill Exit",
            ReadOnly: true,
            Hide: true,
            LongDescription: "This is the windmill entrance - it's up the stairs near the well."
        },

        // Upper Area
        "Death Mountain Trail": {
            SpoilerLogExitName: "Kak Behind Gate -> Death Mountain",
            ExitRegion: "beyondGate",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 33},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Death Mountain.<br/><br/><a href='https://youtu.be/0BobG5dZv14?si=rlM7WqoQHEOz0K4k' target='_blank' title='Target wall to the right of the corner; sidehop left; sideroll release Z; get in corner; sidehop right; sidehop left; roll x2; sidehop right; sidehop left; roll x3; backflip x2; turn right; sidehop left; turn left; roll; backflip; press sword to take it out (or take out stick after landing); sidehop right once; buffer another sidehop right; buffer a neutral jumpslash; hold up'>LUNGE STORAGE CLIP</a>"
        },
        "Bazaar": {
            SpoilerLogExitName: "Kakariko Village -> Kak Bazaar",
            DisplayGroup: { groupName: "Upper Area", imageName: "Keaton Mask" },
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Shop",
            Time: function() { return Tricks.kakShopClips.canDo ? Time.DAY_ADULT : Time.DAY; },
            MapInfo: { x: 117, y: 89 },
            UseAdultAge: function() { return !Tricks.kakShopClips.canDo; },
            Age: Age.EITHER,
            LongDescription: "This is the building to the left if you are facing the Death Mountain entrance.",
            TricksToShow: [Tricks.kakShopClips],
            ChildNeeds: [Tricks.kakShopClips.canDo]
        },
        "Potion Shop Front": {
            SpoilerLogExitName: "Kakariko Village -> Kak Potion Shop Front",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Potion Shop Front",
            Time: function() { 
                // Adult can clip through the back and then jump to the front
                return Tricks.kakShopClips.canDo
                    ? Time.EITHER
                    : Time.DAY_ADULT;
            },
            MapInfo: { x: 163, y: 92 },
            Age: Age.EITHER,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleInteriorEntrances; },
            Needs: [SettingSets.SHUFFLE_INTERIOR_ENTRANCES],
            LongDescription: "This is the building to the right if you are facing the Death Mountain entrance.",
            TricksToShow: [Tricks.kakShopClips]
        },

        // Enclosed Area
        "Open Grotto Behind Potion Shop": {
            SpoilerLogExitName: "Kak Backyard -> Kak Open Grotto",
            DisplayGroup: { groupName: "Enclosed Area", imageName: "Odd Mushroom" },
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            Time: function() {
                return MapLocations["Kakariko Village"]._canChildKillWatchtowerSkull()
                    ? Time.EITHER
                    : Time.DAY_CHILD;
            },
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 245, y: 123 },
            Age: Age.EITHER,
            LongDescription: "This grotto is located behind the fenced off area located behind the Potion Shop. Child can get there with a cucco or from sidehopping off the watchtower. Adult can simply walk through the Potion Shop."
        },
        "Potion Shop Back": {
            // Leaving DefaultEntranceGroupName out since it's fully covered by the front entrance
            SpoilerLogExitName: "Kak Backyard -> Kak Potion Shop Back",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            Time: function() {
                if (!Tricks.kakShopClips.canDo) { return Time.DAY; }
                return MapLocations["Kakariko Village"]._canChildKillWatchtowerSkull()
                    ? Time.EITHER
                    : Time.DAY_CHILD;
            },
            MapInfo: { x: 192, y: 96 },
            UseAdultAge: function() { return !Tricks.kakShopClips.canDo; },
            Age: Age.EITHER,
            LongDescription: "This entrance to this is where the open grotto is behind the fence. You can use your hookshot to get back here via the roofs. You can also jump onto the potion shop roof from the Death Mountain entrance with a good angle.",
            TricksToShow: [Tricks.kakShopClips],
            ChildNeeds: [Tricks.kakShopClips.canDo]
        },
        "Potion Shop to Interior": {
            ExitRegion: "main",
            Map: "Windmill-Kak Potion",
            Region: "kakPotionShop",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 166, y: 81 },
            Age: Age.EITHER,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleInteriorEntrances; },
            Needs: [SettingSets.VANILLA_INTERIOR_ENTRANCES],
            OwShuffleMap: "Windmill-Kak Potion",
            OwShuffleRegion: "kakPotionShop",
            OwShuffleExitName: "Potion Shop Front",
            ReadOnly: true,
            Hide: true,
            LongDescription: "This is the building to the right if you are facing the Death Mountain entrance.",
        },
        "Granny's Potion Shop": {
            SpoilerLogExitName: "Kak Backyard -> Kak Odd Medicine Building",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Granny's Potion Shop",
            MapInfo: { x: 240, y: 133 },
            Age: Age.ADULT,
            LongDescription: "This is the building behind the potion shop, near the fence that you do the \"ladder jump\" off of.",
        }
    },

    "Graveyard": {
        "Kakariko Village": {
            SpoilerLogExitName: "Graveyard -> Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 17, y: 180 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Nocturne Teleport Pad": {
            ExitRegion: "top",
            Map: "Graveyard",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            ShowForOneWay: true,
            LongDescription: "The Nocturne of Shadow teleport pad on the top part of the graveyard.",
        },
        "Shadow Temple": {
            SpoilerLogExitName: "Graveyard Warp Pad Region -> Shadow Temple Entryway",
            ExitRegion: "shadowTemple",
            Map: "Shadow Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 345, y: 137 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Shadow Temple.",
            TricksToShow: [
                Tricks.hookshotJump, 
                Tricks.oldShadowEarly, 
                Tricks.childShadowWithBombPush, 
                Tricks.adultShadowLedgeClip
            ],
            IsDungeonEntrance: true
        },
        "Dampe's Shed": {
            SpoilerLogExitName: "Graveyard -> Graveyard Dampes House",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 94, y: 246 },
            Age: Age.EITHER,
            LongDescription: "Located in the southeast corner of the graveyard.",
        },
        "Grave with Flowers": {
            SpoilerLogExitName: "Graveyard -> Graveyard Shield Grave",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "1 Chest",
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 206, y: 144 },
            Age: Age.EITHER,
            LongDescription: "There's a gravestone when you first enter that has flowers in front of it. Pull it back and enter to get to the grotto."
        },
        "Dampe's Grave": {
            SpoilerLogExitName: "Graveyard -> Graveyard Dampes Grave",
            ExitRegion: "dampesGrave",
            ItemGroup: ItemGroups.GROTTO,
            IsComplexEntrance: true,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleGrottoEntrances; },
            Needs: [SettingSets.SHUFFLE_GROTTO_ENTRANCES],
            DefaultEntranceGroupName: "Dampe's Grave",
            MapInfo: { x: 166, y: 86 },
            Age: Age.EITHER,
            UseAdultAge: function() { return !Tricks.unloadGrave.enabled; },
            LongDescription: "Under the grave in the in the northwest corner of the graveyard.",
            TricksToShow: [Tricks.unloadGrave]
        },
        "Dampe's Grave to Dampe Race": {
            ExitRegion: "main",
            Map: "Windmill-Kak Potion",
            Region: "dampesGrave",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 166, y: 86 },
            Age: Age.ADULT,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleGrottoEntrances; },
            Needs: [SettingSets.VANILLA_GROTTO_ENTRANCES],
            OwShuffleMap: "Windmill-Kak Potion",
            OwShuffleRegion: "dampesGrave",
            OwShuffleExitName: "Grave Exit",
            ReadOnly: true,
            Hide: true,
            LongDescription: "This is the route through Dampe's Grave to get to Kakariko via the windmill."
        },
        "Unmarked Grave": {
            SpoilerLogExitName: "Graveyard -> Graveyard Heart Piece Grave",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Redead Sun's Song Grave",
            Time: function() { return Time.NIGHT_CHILD; },
            MapInfo: { x: 237, y: 184 },
            Age: Age.EITHER,
            LongDescription: "Go to the Royal Tomb gravestone at the front of the graveyard - position your camera the other way, toward the entrance. The grave will be the second one to your left."
        },
        "Royal Family's Tomb": {
            SpoilerLogExitName: "Graveyard -> Graveyard Royal Familys Tomb",
            ExitRegion: "royalFamilyTomb",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Royal Family's Tomb",
            MapInfo: { x: 303, y: 143 },
            Age: Age.EITHER,
            LongDescription: "Play Zelda's Lullaby in front of the big grave in the back of the graveyard to reveal this entrance.",
            TricksToShow: [Tricks.unloadGrave]
        }
    },

    "Death Mountain Trail": {
        // Upper Area
        "Kakariko Village": {
            SpoilerLogExitName: "Death Mountain -> Kak Behind Gate",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "beyondGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 290},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Goron City": {
            SpoilerLogExitName: "Death Mountain -> Goron City",
            ExitRegion: "main",
            Map: "Goron City",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 237, y: 150},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Song of Storms Grotto near Goron City": {
            SpoilerLogExitName: "Death Mountain -> DMT Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 228, y: 172 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the center of the circle of rocks by Goron City to reveal this grotto",
            Needs: [Songs.SONG_OF_STORMS]
        },
        "Dodongo's Cavern": {
            SpoilerLogExitName: "Death Mountain -> Dodongos Cavern Beginning",
            ExitRegion: "main",
            Map: "Dodongo's Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 175, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Dodongo's Cavern.",
            IsDungeonEntrance: true,
            ChildNeeds: [ItemSets.EXPLOSIVES_OR_STRENGTH]
        },

        // Lower Area
        "Death Mountain Crater": {
            SpoilerLogExitName: "Death Mountain Summit -> DMC Upper Local",
            ExitRegion: "upper",
            Map: "Death Mountain Crater",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 233, y: 10},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the crater at the top of the mountain"
        },
        "Owl": {
            SpoilerLogExitName: "DMT Owl Flight -> Kak Impas Rooftop",
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
        "Great Fairy Fountain": {
            SpoilerLogExitName: "Death Mountain Summit -> DMT Great Fairy Fountain",
            ExitRegion: "upper",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            MapInfo: { x: 220, y: 19 },
            Age: Age.EITHER,
            LongDescription: "This is behind a wall you can destroy on the top of the mountain.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Cow Grotto": {
            SpoilerLogExitName: "Death Mountain Summit -> DMT Cow Grotto",
            DisplayGroup: { groupName: "Rocky Path", imageName: "Cow Grotto" },
            ExitRegion: "upper",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Cow Grotto",
            MapInfo: { x: 200, y: 186 },
            Age: Age.EITHER,
            LongDescription: "This is under the yellow rock on the ledge right after you bomb the rocks to reach the upper part of the mountain.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        }
    },

    "Death Mountain Crater": {
        "Mountain Top": {
            SpoilerLogExitName: "DMC Upper Nearby -> Death Mountain Summit",
            ExitRegion: "top",
            Map: "Death Mountain Trail",
            Region: "upper",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 263},
            Age: Age.EITHER,
            LongDescription: "This is the entrance at the top of the crater."
        },
        "Goron City": {
            SpoilerLogExitName: "DMC Lower Nearby -> GC Darunias Chamber",
            ExitRegion: "middle",
            Map: "Goron City",
            Region: "darunia",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 47, y: 89},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Bolero Teleport Pad": {
            ExitRegion: "bottom",
            Map: "Death Mountain Crater",
            Region: "bottom",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            ShowForOneWay: true,
            LongDescription: "The Bolero of Fire teleport pad at the bottom of Death Mountain Crater.",
        },
        "Fire Temple": {
            SpoilerLogExitName: "DMC Fire Temple Entrance -> Fire Temple Lower",
            ExitRegion: "bottom",
            Map: "Fire Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Fire Temple.",
            IsDungeonEntrance: true,
            ChildNeeds: [SettingSets.SHUFFLE_DUNGEON_ENTRANCES]
        },

        // Interiors
        "Grotto in Center of Top Rocks": {
            SpoilerLogExitName: "DMC Upper Nearby -> DMC Upper Grotto",
            ExitRegion: "top",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 172, y: 260 },
            Age: Age.EITHER,
            LongDescription: "At the top of the crater, bomb or hammer the middle of the circle of rocks to reveal the grotto.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },
        "Great Fairy Fountain": {
            SpoilerLogExitName: "DMC Lower Nearby -> DMC Great Fairy Fountain",
            ExitRegion: "middle",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            MapInfo: { x: 65, y: 170 },
            Age: Age.EITHER,
            UseAdultAge: function() { 
                return !Tricks.childSidehopToDoubleMagic.enabled &&
                    !Tricks.equipSwap.enabled &&
                    !Tricks.megaFlip.enabled;
            },
            LongDescription: "Hammer the silver rocks that are to the left of the Goron City entrance (if you face the entrance) to uncover the entrance.\x0A\x0AYou can megaflip here from the corner by the ladder as any age, as well.",
            TricksToShow: [Tricks.childSidehopToDoubleMagic, Tricks.adultRecoilHoverBootsToDoubleMagic],
            NeedsAny: [
                Items.MEGATON_HAMMER, 
                Tricks.megaFlip.canDo,
                Tricks.childSidehopToDoubleMagic.canDo,
                Tricks.adultRecoilHoverBootsToDoubleMagic.canDo
            ]
        },
        "Grotto in Rock by Goron": {
            SpoilerLogExitName: "DMC Lower Nearby -> DMC Hammer Grotto",
            ExitRegion: "middle",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "3 Scrubs",
            MapInfo: { x: 64, y: 60 },
            Age: Age.EITHER,
            UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
            LongDescription: "Hammer the rock near the entrance to Goron City to access this grotto.",
            Needs: [Items.MEGATON_HAMMER]
        }
    },

    "Goron City": {
        // Top Floor
        "Death Mountain Trail": {
            SpoilerLogExitName: "Goron City -> Death Mountain",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 181, y: 264 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the trail at the top of the city."
        },

        // Middle Floors
        "Lost Woods": {
            SpoilerLogExitName: "GC Woods Warp -> Lost Woods",
            ExitRegion: "lostWoods",
            Map: "Lost Woods",
            Region: "nearGoronCity",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 211, y: 179 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance blocked by rocks on the second floor."
        },
        "Lava Room Grotto": {
            SpoilerLogExitName: "GC Grotto Platform -> GC Grotto",
            DisplayGroup: { groupName: "Middle Floors", imageName: "Goron Tunic" },
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "3 Scrubs",
            MapInfo: { x: 278, y: 21 },
            Age: Age.ADULT,
            LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic or use Nayru's Love, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
            NeedsAny: [Songs.SONG_OF_TIME,
                [Items.HOOKSHOT, 
                    [SetType.OR, Equipment.GORON_TUNIC, Items.NAYRUS_LOVE]]]
        },

        // Bottom Floor
        "Death Mountain Crater": {
            SpoilerLogExitName: "GC Darunias Chamber -> DMC Lower Local",
            ExitRegion: "darunia",
            Map: "Death Mountain Crater",
            Region: "middle",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 185, y: 10 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance behind darunia's room - push back the statue.",
            TricksToShow: [Tricks.goronChildStatueSkip],
            ChildNeeds: [Tricks.goronChildStatueSkip.canDo]
        },
        "Shop": {
            SpoilerLogExitName: "Goron City -> GC Shop",
            ExitRegion: "shop",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Shop",
            MapInfo: { x: 159, y: 132 },
            Age: Age.EITHER,
            LongDescription: "The shop is at the bottom of the city - the entrance is in the middle of two Bomb Flowers on the wall. As child, either light one on fire with a Deku Stick, or simply blow up the wall with an explosive. As an adult, you must stop the rolling goron and he will open it for you."
        }
    },

    "Zora's River": {
        // Before Rocks
        "Hyrule Field": {
            SpoilerLogExitName: "ZR Front -> Hyrule Field",
            ExitRegion: "downstream",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 13, y: 246 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field at the start of the river - either exit will take you to the same place."
        },

        // Main Area
        "Song of Storms Grotto": {
            SpoilerLogExitName: "Zora River -> ZR Storms Grotto",
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "2 Scrubs",
            MapInfo: { x: 15, y: 145 },
            Age: Age.EITHER,
            LongDescription: "Play the Song of Storms in the center of the rocks near the cucco spawn to reveal the grotto.",
            Needs: [Songs.SONG_OF_STORMS]
        },

        // On Cliff
        "Open Grotto on Upper Cliff": {
            SpoilerLogExitName: "Zora River -> ZR Open Grotto",
            DisplayGroup: { groupName: "On Cliff", imageName: "Super Cucco Minigame" },
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Generic Grotto",
            MapInfo: { x: 132, y: 217 },
            Age: Age.EITHER,
            LongDescription: "Go up the ladder closest to Hyrule Field. Jump to the cliff behind you and enter the grotto."
        },
        "Grotto Under Rock on Upper Cliff": {
            SpoilerLogExitName: "Zora River -> ZR Fairy Grotto",
            ExitRegion: "upstream",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 159, y: 206 },
            Age: Age.EITHER,
            LongDescription: "Go up the ladder closest to Hyrule Field. This grotto is under the yellow rock at the top.",
            Needs: [ItemSets.BLAST_OR_SMASH_ITEMS]
        },

        // By Waterfall
        "Lost Woods": {
            SpoilerLogExitName: "Zora River -> LW Underwater Entrance",
            DisplayGroup: { groupName: "By Waterfall", imageName: "Zelda's Lullaby" },
            ExitRegion: "upstream",
            Map: "Lost Woods",
            Region: "nearGoronCity",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 330, y: 119 },
            Age: Age.EITHER,
            NeedsAny: [Equipment.SCALE, Equipment.IRON_BOOTS],
            LongDescription: "This is the entrance you get to by diving into the water near the waterfall."
        },
        "Zora's Domain": {
            SpoilerLogExitName: "ZR Behind Waterfall -> Zoras Domain",
            ExitRegion: "inWaterfall",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 332, y: 61 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the domain - play Zelda's Lullaby on the symbol by the waterfall.",
            TricksToShow: [
                Tricks.cuccoToZorasDomain,
                Tricks.hoverBootsToZorasDomain,
                Tricks.megasidehopToZorasDomain
            ]
        }
    },

    "Zora's Domain": {
        "Zora's River": {
            SpoilerLogExitName: "Zoras Domain -> ZR Behind Waterfall",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 77, y: 190},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River."
        },
        "Lake Hylia": {
            SpoilerLogExitName: "Zoras Domain -> Lake Hylia",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 173, y: 241},
            Age: Age.EITHER,
            UseChildAge: function() { return !Tricks.adultDomainToLake.canDo; },
            LongDescription: "This is the entrance to Zora's River you can get to by diving into the water.",
            TricksToShow: [Tricks.adultDomainToLake],
            ChildNeeds: [Equipment.SCALE],
            AdultNeeds: [Tricks.adultDomainToLake.canDo]
        },
        "Zora's Fountain": {
            SpoilerLogExitName: "ZD Behind King Zora -> Zoras Fountain",
            ExitRegion: "behindKing",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 219, y: 44},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Fountain behind King Zora.",
            TricksToShow: [Tricks.childKingZoraSkip, Tricks.adultKingZoraSkip]
        },

        // Interiors
        "Shop": {
            SpoilerLogExitName: "Zoras Domain -> ZD Shop",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Shop",
            MapInfo: { x: 236, y: 254 },
            Age: Age.EITHER,
            LongDescription: "This is the shop. As an adult, you can either use Blue Fire, or perform the shop skip to get inside.",
            TricksToShow: [Tricks.blueFireShopSkip],
            AdultNeedsAny: [ItemSets.BLUE_FIRE_ITEMS, Tricks.blueFireShopSkip.canDo]
        },
        "Song of Storms Grotto": {
            SpoilerLogExitName: "Zoras Domain -> ZD Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 118, y: 162 },
            Age: Age.EITHER,
            LongDescription: "On the little island near the ladder up to the Zora's River exit, play the Song of Storms to reveal this grotto.",
            Needs: [Songs.SONG_OF_STORMS]
        }
    },

    "Zora's Fountain": {
        // Land Area
        "Zora's Domain": {
            SpoilerLogExitName: "Zoras Fountain -> ZD Behind King Zora",
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "behindKing",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 69, y: 139},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Domain."
        },
        "Jabu Jabu's Belly": {
            SpoilerLogExitName: "Zoras Fountain -> Jabu Jabus Belly Beginning",
            ExitRegion: "main",
            Map: "Jabu Jabu's Belly",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 142, y: 97 },
            Age: Age.EITHER,
            UseChildAge: function() { return !Tricks.enterJabuAsAdult.enabled; },
            LongDescription: "This is the entrance to Jabu Jabu.",
            TricksToShow: [Tricks.jabuFishless, Tricks.enterJabuAsAdult],
            IsDungeonEntrance: true,
            AdultNeeds: [Tricks.enterJabuAsAdult.canDo],
            ChildNeedsAny: [Items.FISH, Tricks.jabuFishless.canDo]
        },
        "Great Fairy Fountain": {
            SpoilerLogExitName: "Zoras Fountain -> ZF Great Fairy Fountain",
            ExitRegion: "main",
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            ItemGroup: ItemGroups.INTERIOR,
            MapInfo: { x: 266, y: 269 },
            Age: Age.EITHER,
            LongDescription: "Go to the southeast corner of the map. Bomb the wall by the rocks to reveal this entrance.",
            Needs: [ItemSets.EXPLOSIVES]
        },

        // Deep Water
        "Ice Cavern": {
            SpoilerLogExitName: "ZF Ice Ledge -> Ice Cavern Beginning",
            DisplayGroup: { groupName: "Deep Water", imageName: "Iron Boots" },
            ExitRegion: "main",
            Map: "Ice Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 185, y: 19 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Ice Cavern.",
            IsDungeonEntrance: true
        }
    },

    "Lake Hylia": {
        // Main Area & Pond
        "Hyrule Field": {
            SpoilerLogExitName: "Lake Hylia -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 133, y: 12},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field."
        },
        "Lakeside Lab": {
            SpoilerLogExitName: "Lake Hylia -> LH Lab",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            DefaultEntranceGroupName: "Lakeside Lab",
            MapInfo: { x: 118, y: 86 },
            Age: Age.EITHER,
            LongDescription: "This is the building near the bridge by the lake."
        },
        "Fishing Pond": {
            SpoilerLogExitName: "LH Fishing Island -> LH Fishing Hole",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fishing Pond",
            MapInfo: { x: 247, y: 81 },
            Age: Age.EITHER,
            LongDescription: "This building is in the building across the water to the northeast.",
            AdultNeedsAny: [GameStateSets.CAN_HOOK_SCARECROW,
                BeanSets.LAKE_HYLIA,
                ItemLocationSets.DEFEATED_MORPHA]
        },

        // Shallow Water
        "Zora's Domain": {
            SpoilerLogExitName: "Lake Hylia -> Zoras Domain",
            DisplayGroup: { groupName: "Shallow Water", imageName: "Ruto's Letter" },
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 169, y: 89},
            Age: Age.EITHER,
            UseChildAge: function() { return !Tricks.adultDomainMegaflipClip.enabled && !Tricks.adultLakesideLabClip.enabled; },
            LongDescription: "This is the entrance to Zora's Domain.",
            TricksToShow: [Tricks.childLakesideLabClip, Tricks.adultLakesideLabClip, Tricks.adultDomainMegaflipClip],
            ChildNeedsAny: [Equipment.SCALE, Tricks.childLakesideLabClip.canDo],
            AdultNeedsAny: [
                Tricks.adultDomainMegaflipClip.canDo,
                [ItemLocationSets.DEFEATED_MORPHA, Tricks.adultLakesideLabClip.canDo]
            ]
        },

        // Islands
        "Owl": {
            SpoilerLogExitName: "LH Owl Flight -> Hyrule Field",
            DisplayGroup: { groupName: "Islands", imageName: "Water Medallion" },
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
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Serenade of Water teleport pad on the island in Lake Hylia.",
        },
        "Water Temple": {
            SpoilerLogExitName: "Lake Hylia -> Water Temple Lobby",
            ExitRegion: "main",
            Map: "Water Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 204, y: 215 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Water Temple.",
            TricksToShow: [Tricks.childLakesideLabClip, Tricks.adultLakesideLabClip, Tricks.adultWaterTempleClip],
            IsDungeonEntrance: true,
            ChildNeeds: [Tricks.childLakesideLabClip.canDo],
            AdultNeedsAny: [
                [Equipment.IRON_BOOTS, Items.HOOKSHOT], // Normal entrance
                [UpgradedItems.LONGSHOT, UpgradedItems.GOLDEN_SCALE], // Dive down
                Tricks.adultWaterTempleClip.canDo, 
                Tricks.adultLakesideLabClip.canDo
            ]
        },
        "Grotto Under Grave": {
            SpoilerLogExitName: "Lake Hylia -> LH Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "3 Scrubs",
            MapInfo: { x: 93, y: 181 },
            Age: Age.EITHER,
            LongDescription: "Pull the gravestone in the middle of the bridge to reveal this grotto."
        }
    },

    "Gerudo Valley": {
        "Hyrule Field": {
            SpoilerLogExitName: "Gerudo Valley -> Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Order: 3,
            MapInfo: {x: 304, y: 114},
            Age: Age.EITHER,
            LongDescription: "This is the eastern exit.",
            TricksToShow: [Tricks.gvCrossBridgeWithHookshot]
        },
        "Gerudo Fortress": {
            SpoilerLogExitName: "GV Fortress Side -> Gerudo Fortress",
            ExitRegion: "acrossBridge",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Order: 7,
            MapInfo: {x: 62, y: 51},
            Age: Age.EITHER,
            LongDescription: "This is the western exit.",
            TricksToShow: [Tricks.cuccoJump, Tricks.gvCrossBridgeWithHookshot]
        },
        "Lake Hylia": {
            SpoilerLogExitName: "GV Lower Stream -> Lake Hylia",
            ExitRegion: "chasmDownstream",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 255, y: 275},
            ExcludeFromDropdown: true,
            OneWayEntrance: true,
            Age: Age.EITHER,
            LongDescription: "This is the river exit to the lake."
        },

        // Interiors
        "Grotto Under Silver Rock": {
            SpoilerLogExitName: "GV Grotto Ledge -> GV Octorok Grotto",
            ExitRegion: "chasmSilverRockLedge",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "Octorok Grotto",
            Order: 2,
            MapInfo: { x: 220, y: 182 },
            Age: Age.ADULT,
            LongDescription: "From the side closest to Hyrule Field, look to your left. The grotto is under the silver rock. Lift it up with your silver gauntlets to reveal it.",
            Needs: [UpgradedItems.SILVER_GAUNTLETS]
        },
        "Tent": {
            SpoilerLogExitName: "GV Fortress Side -> GV Carpenter Tent",
            ExitRegion: "acrossBridge",
            ItemGroup: ItemGroups.INTERIOR,
            Order: 2,
            MapInfo: { x: 141, y: 78 },
            Age: Age.EITHER,
            LongDescription: "This is the tent on the west side of the bridge as adult. Also, the loading zone is actually there as child."
        },
        "Song of Storms Grotto Behind Tent": {
            SpoilerLogExitName: "GV Fortress Side -> GV Storms Grotto",
            ExitRegion: "acrossBridge",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "2 Scrubs",
            Order: 3,
            MapInfo: { x: 140, y: 56 },
            Age: Age.ADULT,
            LongDescription: "Play the Song of Storms behind the tent to spawn this grotto.",
            Needs: [Songs.SONG_OF_STORMS],
        }
    },

    // TODO Mapping: Check the GF exits
    "Gerudo Fortress": {
        // Ground Level
        "Gerudo Valley": {
            SpoilerLogExitName: "Gerudo Fortress -> GV Fortress Side",
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "acrossBridge",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 158, y: 284 },
            Age: Age.EITHER,
            LongDescription: "This is the exit back to the valley."
        },
        "Haunted Wasteland": {
            SpoilerLogExitName: "GF Outside Gate -> Wasteland Near Fortress",
            DisplayGroup: { groupName: "Ground Level", imageName: "Gerudo Membership Card" },
            ExitRegion: "wastelandEntrance",
            Map: "Haunted Wasteland",
            Region: "entrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 77, y: 112 },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the wasteland.",
            TricksToShow: [Tricks.gfChildGateSkip, Tricks.gfAdultGateSkip]
        },
        "Training Grounds": {
            SpoilerLogExitName: "Gerudo Fortress -> Gerudo Training Ground Lobby",
            ExitRegion: "main",
            Map: "Training Grounds",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 124, y: 197 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Gerudo Training Grounds.",
            TricksToShow: [
                Tricks.gfAdultBackAreaWithoutCard,
                Tricks.gfUnloadLowerAreaWithAntigrav,
                Tricks.gtgAdultWithLedgeClip
            ],
            IsDungeonEntrance: true,
            ChildNeeds: [Tricks.gfUnloadLowerAreaWithAntigrav.canDo],
            AdultNeedsAny: [
                GameStateSets.ARE_GERUDO_GUARDS_TAME, 
                Tricks.gfUnloadLowerAreaWithAntigrav.canDo,
                Tricks.gtgAdultWithLedgeClip.canDo
            ]
        },
        "Bottom Left Door": {
            SpoilerLogExitName: "Gerudo Fortress -> Hideout 1 Torch Jail",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail1",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 133, y: 125 },
            Age: Age.EITHER,
            LongDescription: "The door at the bottom left of the fortress."
        },
        "Song of Storms Grotto": {
            SpoilerLogExitName: "GF Entrances Behind Crates -> GF Storms Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            MapInfo: { x: 137, y: 172 },
            Age: Age.ADULT,
            LongDescription: "Play the song of storms in the center of the crates near the fortress to reveal this grotto.",
            Needs: [Songs.SONG_OF_STORMS]
        },
        "Enclave Left Door": {
            SpoilerLogExitName: "GF Entrances Behind Crates -> Hideout 1 Torch Jail",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail1",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 138, y: 165 },
            Age: Age.EITHER,
            LongDescription: "The left door at the bottom in the enclaves with the crates."
        },
        "Enclave Right Door": {
            SpoilerLogExitName: "GF Entrances Behind Crates -> Hideout Kitchen Hallway",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "kitchenHallway",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 145, y: 170 },
            Age: Age.EITHER,
            LongDescription: "The right door at the bottom in the enclaves with the crates."
        },
        "Bottom Right Door": {
            SpoilerLogExitName: "Gerudo Fortress -> Hideout 4 Torches Jail",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail2",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 133, y: 179 },
            Age: Age.EITHER,
            LongDescription: "The door just to the left of Gerudo Training Grounds."
        },
        "Right Door Above GTG": {
            SpoilerLogExitName: "Gerudo Fortress -> Hideout 2 Torches Jail",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail3",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 144, y: 189 },
            Age: Age.EITHER,
            LongDescription: "The door to the right (the first one) in the area above Gerudo Training Grounds."
        },
        "Left Door Above GTG": {
            SpoilerLogExitName: "Gerudo Fortress -> Hideout Kitchen Hallway",
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "kitchenHallway",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 145, y: 177 },
            Age: Age.EITHER,
            LongDescription: "The door to the left (the second one) in the area above Gerudo Training Grounds."
        },

        // Middle Levels
        "Middle Left Door": {
            SpoilerLogExitName: "GF Roof Entrance Cluster -> Hideout 4 Torches Jail",
            ExitRegion: "middleFloor",
            Map: "Thieves' Hideout",
            Region: "jail2",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 151, y: 142 },
            Age: Age.EITHER,
            LongDescription: "The door in the middle of the fortress where you can walk to the bottom of the vines."
        },
        "Vines Left Door": {
            SpoilerLogExitName: "GF Roof Entrance Cluster -> Hideout Kitchen Front",
            ExitRegion: "middleFloor",
            Map: "Thieves' Hideout",
            Region: "kitchenTopLeft",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 168, y: 161 },
            Age: Age.EITHER,
            LongDescription: "This is the door to the left when you climb the vines on the middle floor of the fortress."
        },
        "Vines Forward Door": {
            SpoilerLogExitName: "GF Roof Entrance Cluster -> Hideout 2 Torches Jail",
            ExitRegion: "middleFloor",
            Map: "Thieves' Hideout",
            Region: "jail3",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 165, y: 170 },
            Age: Age.EITHER,
            LongDescription: "This is the door straight ahead when you climb the vines on the middle floor of the fortress."
        },
        "Upper Kitchen Door": {
            SpoilerLogExitName: "GF Kitchen Roof Access -> Hideout Kitchen Rear",
            ExitRegion: "topOfKitchen",
            Map: "Thieves' Hideout",
            Region: "kitchenTopRight",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 184, y: 147 },
            Age: Age.EITHER,
            LongDescription: "This is the door on the top of the right side of the fortress, above the door to jail 4 and nearest to the skulltula. Adult can do a trick jump near the vines to get to this door from the middle level."
        },
        "Upper Jail Door": {
            SpoilerLogExitName: "GF 3 Torches Jail Exterior -> Hideout 3 Torches Jail",
            ExitRegion: "jail4Door",
            Map: "Thieves' Hideout",
            Region: "jail4",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 177, y: 133 },
            Age: Age.EITHER,
            LongDescription: "This door needs to be dropped down to from an upper area of the fortress. If not using entrance shuffle, you can get here from navigating around the kitchen's upper exit."
        },
        "Door Above Jail 1": {
            SpoilerLogExitName: "GF Break Room Entrance -> Hideout Break Room",
            ExitRegion: "aboveJail1",
            Map: "Thieves' Hideout",
            Region: "topLower",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 156, y: 115 },
            Age: Age.EITHER,
            LongDescription: "Can be reached from the top of Link's jail, from backflipping from the very top area, from using hover boots in the area by by upper kitchen exit, or from dropping down to it from the chest on top.",
            TricksToShow: [Tricks.gfChildJumpByTopKitchen]
        },
        "Door Above Link's Jail": {
            SpoilerLogExitName: "GF Balcony -> Hideout Hall to Balcony",
            ExitRegion: "aboveLinksJail",
            Map: "Thieves' Hideout",
            Region: "topUpper",
            ItemGroup: ItemGroups.INTERIOR,
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 151, y: 68 },
            Age: Age.EITHER,
            LongDescription: "Normally only reachable from the entrance that leads there. There's a glitch involving a specific hookshot angle from the top of Link's jail as well.",
            TricksToShow: [Tricks.gfHookshotToAboveLinksJail]
        },

        // Hidden, non-Thieves' Hideout shuffle exits for travel purposes
        "Gerudo Fortress to Jail 1": {
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail1",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "jail1",
            OwShuffleExitName: "Jail 1 Left",
            ReadOnly: true,
            Hide: true,
            LongDescription: "Either doors leading to jail 1."
        },
        "Gerudo Fortress to Jail 2": {
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail2",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "jail2",
            OwShuffleExitName: "Jail 2 Right",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door to the left of Getrudo Training Grounds."
        },
        "Gerudo Fortress to Jail 3": {
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "jail3",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "jail3",
            OwShuffleExitName: "Jail 3 Right",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door above the entrance to Gerudo Training Grounds."
        },
        "Gerudo Fortress to Kitchen Hallway": {
            ExitRegion: "main",
            Map: "Thieves' Hideout",
            Region: "kitchenHallway",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "kitchenHallway",
            OwShuffleExitName: "Kitchen Far Bottom",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The right door in the enclave on the bottom with the boxes."
        },
        "Gerudo Fortress to Jail 4": {
            ExitRegion: "jail4Door",
            Map: "Thieves' Hideout",
            Region: "kitchenHallway",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "jail4",
            OwShuffleExitName: "Jail 4 Entrance",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door leading to jail 4 below the top of the kitchen exit."
        },
        "Gerudo Fortress to Room Above Jail 1": {
            ExitRegion: "aboveJail1",
            Map: "Thieves' Hideout",
            Region: "topLower",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Thieves' Hideout",
            OwShuffleRegion: "topLower",
            OwShuffleExitName: "Top Room Lower",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door above jail 1 leading to the path to the very top."
        }
    },

    "Thieves' Hideout": {
        // Interiors
        "Jail 1 Left": {
            ExitRegion: "jail1",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 1 Left",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 117, y: 28, floor: "J1" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the left if you face the jail."
        },
        "Jail 1 Right": {
            ExitRegion: "jail1",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 1 Right",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 158, y: 277, floor: "J1" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the right if you face the jail."
        },
        "Jail 2 Left": {
            ExitRegion: "jail2",
            Map: "Gerudo Fortress",
            Region: "middleFloor",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 2 Left",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 249, y: 51, floor: "J2" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the left if you face the jail."
        },
        "Jail 2 Right": {
            ExitRegion: "jail2",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 2 Right",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 110, y: 282, floor: "J2" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the right if you face the jail."
        },
        "Jail 3 Left": {
            ExitRegion: "jail3",
            Map: "Gerudo Fortress",
            Region: "middleFloor",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 3 Left",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 341, y: 80, floor: "J3" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the left if you face the jail."
        },
        "Jail 3 Right": {
            ExitRegion: "jail3",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 3 Right",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 18, y: 121, floor: "J3" },
            Age: Age.EITHER,
            LongDescription: "This is the exit to the right if you face the jail."
        },
        "Jail 4 Entrance": {
            ExitRegion: "jail4",
            Map: "Gerudo Fortress",
            Region: "jail4Door",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Jail 4 Entrance",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 74, y: 278, floor: "J4" },
            Age: Age.EITHER,
            LongDescription: "This is the only exit in the jail 4 area."
        },
        "Kitchen Far Bottom": {
            ExitRegion: "kitchenHallway",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Kitchen Far Bottom",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 17, y: 73, floor: "KIT" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance at the very end of cooridor on the bottom part of the kitchen."
        },
        "Kitchen Middle Bottom": {
            ExitRegion: "kitchenHallway",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Kitchen Middle Bottom",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 17, y: 178, floor: "KIT" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance at the middle of the cooridor on the bottom part of the kitchen."
        },
        "Kitchen Top Left": {
            ExitRegion: "kitchenTopLeft",
            Map: "Gerudo Fortress",
            Region: "middleFloor",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Kitchen Top Left",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 139, y: 178, floor: "KIT" },
            Age: Age.EITHER,
            LongDescription: "From the perspective of the guards, this is the exit to the left on top of the ramps in the main area of the kitchen."
        },
        "Kitchen Top Right": {
            ExitRegion: "kitchenTopRight",
            Map: "Gerudo Fortress",
            Region: "topOfKitchen",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Kitchen Top Right",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 285, y: 105, floor: "KIT" },
            Age: Age.EITHER,
            LongDescription: "From the perspective of the guards, this is the exit to the right on top of the ramps in the main area of the kitchen."
        },
        "Top Room Lower": {
            ExitRegion: "topLower",
            Map: "Gerudo Fortress",
            Region: "aboveJail1",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Top Room Lower",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 218, y: 217, floor: "TOP" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance on the bottom part of the room above jail 1."
        },
        "Top Room Upper": {
            ExitRegion: "topUpper",
            Map: "Gerudo Fortress",
            Region: "aboveLinksJail",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsInteriorExit: true,
            InteriorGroupName: "Top Room Upper",
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.SHUFFLE_THIEVES_HIDEOUT],
            MapInfo: { x: 17, y: 126, floor: "TOP" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance on the upper part of the room above jail 1."
        },

        // Hidden, non-Thieves' Hideout shuffle exits for travel purposes
        "TH Bottom Jails to GF Middle Floor": {
            ExitRegion: "jail2",
            Map: "Gerudo Fortress",
            Region: "middleFloor",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Gerudo Fortress",
            OwShuffleRegion: "middleFloor",
            OwShuffleExitName: "Middle Left Door",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door to the left of the jail leading to the middle floor of Gerudo Fortress."
        },
        "TH Kitchen to GF Kitchen Top": {
            ExitRegion: "kitchenTopRight",
            Map: "Gerudo Fortress",
            Region: "topOfKitchen",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Gerudo Fortress",
            OwShuffleRegion: "topOfKitchen",
            OwShuffleExitName: "Upper Kitchen Door",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The upper door of the fortress leading to the kitchen, above the jail 4 entrance."
        },
        "TH Top Room to GF Above Link's Jail": {
            ExitRegion: "topUpper",
            Map: "Gerudo Fortress",
            Region: "aboveLinksJail",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            OneWayEntrance: true,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
            Needs: [SettingSets.VANILLA_THIEVES_HIDEOUT],
            MapInfo: { x: 1000, y: 1000 }, // Hide the icon
            Age: Age.EITHER,
            OwShuffleMap: "Gerudo Fortress",
            OwShuffleRegion: "aboveLinksJail",
            OwShuffleExitName: "Door Above Link's Jail",
            ReadOnly: true,
            Hide: true,
            LongDescription: "The door on the balcony above Link's Jail."
        }
    },

    "Haunted Wasteland": {
        "Gerudo Fortress": {
            SpoilerLogExitName: "Wasteland Near Fortress -> GF Outside Gate",
            ExitRegion: "entrance",
            Map: "Gerudo Fortress",
            Region: "wastelandEntrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 310, y: 281 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the fortress.",
            TricksToShow: [Tricks.backwardsWasteland]
        },
        "Desert Colossus": {
            SpoilerLogExitName: "Wasteland Near Colossus -> Desert Colossus",
            ExitRegion: "exit",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 45, y: 133 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the colossus.",
            TricksToShow: [Tricks.itemlessSandPit, Tricks.wastelandNoLens]
        }
    },

    "Desert Colossus": {
        // North Area
        "Haunted Wasteland": {
            SpoilerLogExitName: "Desert Colossus -> Wasteland Near Colossus",
            ExitRegion: "main",
            Map: "Haunted Wasteland",
            Region: "exit",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 318, y: 111 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the wasteland."
        },
        "Great Fairy Fountain": {
            SpoilerLogExitName: "Desert Colossus -> Colossus Great Fairy Fountain",
            ExitRegion: "main",
            ItemGroup: ItemGroups.INTERIOR,
            OneWayInteriorSpawnEntrance: true,
            DefaultEntranceGroupName: "Fairy Fountain",
            MapInfo: { x: 231, y: 51 },
            Age: Age.EITHER,
            LongDescription: "There's a crack in the wall in the north middle of the map. Bomb it to get inside.",
            Needs: [ItemSets.EXPLOSIVES]
        },
        "Silver Rock Grotto": {
            SpoilerLogExitName: "Desert Colossus -> Colossus Grotto",
            ExitRegion: "main",
            ItemGroup: ItemGroups.GROTTO,
            DefaultEntranceGroupName: "2 Scrubs",
            MapInfo: { x: 117, y: 81 },
            Age: Age.ADULT,
            LongDescription: "Lift the silver rock by the warp song location to reveal this grotto.",
            Needs: [UpgradedItems.SILVER_GAUNTLETS]
        },
        "Requiem Teleport Pad": {
            ExitRegion: "main",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Requiem of Spirit teleport pad at Desert Colossus.",
        },

        // Spirit Temple Area
        "Archway": {
            ExitRegion: "archway",
            Map: "Desert Colossus",
            Region: "archway",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The archway with the heart piece on it."
        },
        "Spirit Temple": {
            SpoilerLogExitName: "Desert Colossus -> Spirit Temple Lobby",
            DisplayGroup: { groupName: "Spirit Temple Area", imageName: "Spirit Medallion" },
            ExitRegion: "main",
            Map: "Spirit Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 63, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Spirit Temple.",
            IsDungeonEntrance: true
        }
    },

    "Windmill-Kak Potion" : {
        "Grave Exit": {
            ExitRegion: "dampesGrave",
            IsGrottoExit: true,
            InteriorGroupName: "Dampe's Grave",
            MapInfo: { x: 97, y: 262, floor: "DMP" },
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleGrottoEntrances || !Settings.RandomizerSettings.shuffleOverworldEntrances; },
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER,
            NeedsAny: [SettingSets.SHUFFLE_GROTTO_ENTRANCES, SettingSets.VANILLA_OVERWORLD_ENTRANCES]
        },
        "Windmill Exit": {
            ExitRegion: "windmill",
            IsInteriorExit: true,
            InteriorGroupName: "Windmill",
            MapInfo: { x: 77, y: 244, floor: "WND" },
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleInteriorEntrances || !Settings.RandomizerSettings.shuffleOverworldEntrances; },
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER,
            NeedsAny: [SettingSets.SHUFFLE_INTERIOR_ENTRANCES, SettingSets.VANILLA_OVERWORLD_ENTRANCES]
        },
        "Windmill Exit to Kakariko Village": {
            ExitRegion: "windmill",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            RequiredToAppear: function() { return !Settings.RandomizerSettings.shuffleInteriorEntrances && Settings.RandomizerSettings.shuffleOverworldEntrances; },
            MapInfo: { x: 77, y: 244, floor: "WND" },
            Age: Age.EITHER,
            OneWayEntrance: true,
            Needs: [SettingSets.VANILLA_INTERIOR_ENTRANCES, SettingSets.SHUFFLE_OVERWORLD_ENTRANCES],
            OwShuffleMap: "Kakariko Village",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Windmill",
            ReadOnly: true,
            Hide: true,
            LongDescription: "This is the route through Dampe's Grave to get to Kakariko via the windmill."
        },
        "Potion Shop Front": {
            ExitRegion: "kakPotionShop",
            IsInteriorExit: true,
            InteriorGroupName: "Potion Shop Front",
            MapInfo: { x: 42, y: 250, floor: "POT" },
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleInteriorEntrances; },
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.EITHER,
            Needs: [SettingSets.SHUFFLE_INTERIOR_ENTRANCES]
        },
        "Potion Shop Back": {
            ExitRegion: "kakPotionShop",
            IsInteriorExit: true,
            InteriorGroupName: "Potion Shop Back",
            MapInfo: { x: 85, y: 147, floor: "POT" },
            RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleInteriorEntrances; },
            ItemGroup: ItemGroups.OW_ENTRANCE,
            Age: Age.ADULT,
            Needs: [SettingSets.SHUFFLE_INTERIOR_ENTRANCES]
        }
    },

    "Deku Tree": {
        "Exit": {
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "afterMido",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F2" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Deku Tree."
        },
        "Boss": {
            SpoilerLogExitName: "Deku Tree Before Boss -> Queen Gohma Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Gohma",
            MapInfo: { x: 242, y: 248, floor: "B2" },
            Age: Age.EITHER,
            Order: 100,
            LongDescription: "You get here after stunning the deku scrubs in this order (left to right): 2, 3, 1 (3, 1, 2  in MQ).",
            TricksToShow: [Tricks.dekuAdultClipToBossRoom],
            IgnoreTricksToShow: () => MapLocations["Deku Tree"].IsMasterQuest
        }
    },

    "Dodongo's Cavern": {
        "Exit": {
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from Dodongo's Cavern."
        },
        "Boss": {
            SpoilerLogExitName: "Dodongos Cavern Before Boss -> King Dodongo Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "King Dodongo",
            MapInfo: { x: 116, y: 110, floor: "F1" },
            Age: Age.EITHER,
            Order: 100,
            LongDescription: "Standard: Navigate around the rooms in the giant head and push the block onto the switch to unbar the boss door.<br/><br/>MQ: After navigating around the area inside the Dodongo head, pull back the grave to reveal a switch. Enter the door that unbars."
        }
    },

    "Jabu Jabu's Belly": {
        "Exit": {
            ExitRegion: "main",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from Jabu Jabu's Belly."
        },
        "Boss": {
            SpoilerLogExitName: "Jabu Jabus Belly Before Boss -> Barinade Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Barinade",
            MapInfo: { x: 242, y: 150, floor: "F1" },
            Age: Age.EITHER,
            Order: 100,
            UseChildAge: function() { 
                isMQ = MapLocations["Jabu Jabu's Belly"].IsMasterQuest;
                return isMQ ? false : !Tricks.equipSwap.enabled;
            },
            LongDescription: "Standard: Climb up the webbing and use your boomerang to hit the switch and unblock the door. You can also snipe it with the slingshot/bow/longshot if you stand in the corner by the entrance.<br/><br/>MQ: Shoot the cow on the wall a few times to unblock the door.",
            TricksToShow: [Tricks.jabuBossSwitchWithExplosives],
            IgnoreTricksToShow: () => MapLocations["Jabu Jabu's Belly"].IsMasterQuest
        }
    },

    "Forest Temple": {
        "Exit": {
            ExitRegion: "main",
            Map: "Sacred Forest Meadow",
            Region: "afterGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Forest Temple."
        },
        "Boss": {
            SpoilerLogExitName: "Forest Temple Before Boss -> Phantom Ganon Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            MapInfo: { x: 184, y: 107, floor: "B1" },
            Age: Age.ADULT,
            DefaultEntranceGroupName: "Phantom Ganon",
            Order: 100,
            LongDescription: "After hitting all the switches in the basement, you can enter the boss room.",
            TricksToShow: [Tricks.forestBKSkip],
            IsPostWalkCheck: true,
            NeedsAny: [
                Tricks.forestBKSkip.canDo,
                (age) => MapLocations["Forest Temple"]._canAccessAllPoeRooms(age)
            ]
        }
    },

    "Fire Temple": {
        "Exit": {
            ExitRegion: "main",
            Map: "Death Mountain Crater",
            Region: "bottom",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Fire Temple."
        },
        "Boss": {
            SpoilerLogExitName: "Fire Temple Before Boss -> Volvagia Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Volvagia",
            MapInfo: { x: 25, y: 207, floor: "F1" },
            Age: Age.EITHER,
            UseAdultAge: function() { 
                let isMQ = MapLocations["Fire Temple"].IsMasterQuest;
                return isMQ
                    ? !Tricks.megaFlip.enabled ||
                        !Tricks.fireNoGoronTunic.enabled ||
                        !Tricks.bombSuperslide.enabled
                    : !Tricks.megaFlip.enabled; 
            },
            Order: 7,
            LongDescription: "As Adult, you can do a roll-jump from the corner to get to the boss door.",
            TricksToShow: [Tricks.fireBKSkipFromFireWallMaze]
        }
    },

    "Water Temple": {
        "Exit": {
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F3" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Water Temple."
        },
        "Boss": {
            SpoilerLogExitName: "Water Temple Before Boss -> Morpha Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Morpha",
            MapInfo: { x: 227, y: 135, floor: "F3" },
            Age: Age.ADULT,
            Order: 100,
            LongDescription: "The boss room is on the opposite side of the entrance to the temple. You can actually immediately get there with no glitches required if you already have the longshot and boss key.<br/><br/>MQ: In the room with the spike traps, roll up with hover boots equipped, shoot the crystal switch above the boss door, or use Nayru's Love to safely walk up the slope. If you don't have the key, climb on the hookshot targets (created via the switch - you can use the bow or chus as well to hit it if you couldn't hit it from below), sidehop, then jumpslash at the door while holding forward to clip through."
        }
    },

    "Shadow Temple": {
        "Exit": {
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
        },
        "Boss": {
            SpoilerLogExitName: "Shadow Temple Before Boss -> Bongo Bongo Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Bongo Bongo",
            MapInfo: { x: 132, y: 210, floor: "B1" },
            Age: Age.ADULT,
            Order: 100,
            LongDescription: "Enter the door across the chasm and navigate across the invisible floors to get to the boss.",
            TricksToShow: [Tricks.shadowClipToBossAntechamber, Tricks.shadowBKSkip]
        }
    },

    "Spirit Temple": {
        "Exit": {
            ExitRegion: "main",
            Map: "Desert Colosus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Spirit Temple."
        },
        "Desert Colossus": {
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
        },
        "Desert Colossus Archway": {
            ExitRegion: "statueHands",
            Map: "Desert Colossus",
            Region: "archway",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 174, y: 241, floor: "F3" },
            Age: Age.EITHER,
            Needs: [Tricks.megaFlip.canDo],
            LongDescription: "This is the exit to the archway from the statue hands from the spirit temple",
            ReadOnly: true,
            Hide: true,
            OneWayEntrance: true,
            OwShuffleMap: "Desert Colossus",
            OwShuffleRegion: "archway",
            OwShuffleExitName: "Archway"
        },
        "Boss": {
            SpoilerLogExitName: "Spirit Temple Before Boss -> Twinrova Boss Room",
            ExitRegion: "bossRoom",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Twinrova",
            MapInfo: { x: 178, y: 71, floor: "F2" },
            Age: Age.ADULT,
            Order: 100,
            LongDescription: "Standard: The boss room can be reached if you enter the left door after the moving wall room. First, hit the silver switch behind the cage to be able to continue. Position all the snake mirrors so that they point the light at the giant mirror in the original room. You'll have to bomb a wall at some point. Make your way to where the light is now and shine it at the sun on the wall. When the platform lowers, shine the light on the statue's face. After it breaks, hookshot the grate and enter the boss room.<br/><br/>MQ: To reach the boss room, start at the mirror maze. Shine the light from the first mirror onto the sun above the first archway - this will spawn a second mirror. Now, push the mirrors so that the light travels to the end. Go to the giant mirror that the light is now traveling to, and reflect the light unto the sun on the wall. After the cutscene, shine the light into the statue's face. Hookshot the grate to get to the boss room."
        }
    },

    "Bottom of the Well": {
        "Exit": {
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
            ExitRegion: "main",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Ice Cavern."
        }
    },

    "Training Grounds": {
        "Exit": {
            ExitRegion: "main",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from the Gerudo Training Grounds."
        }
    },

    "Ganon's Castle": {
        "Exit": {
            ExitRegion: "main",
            Map: "Castle",
            Region: "ganonsCastle",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100, floor: "F1" },
            ReadOnly: true,
            IsDungeonExit: true,
            Age: Age.EITHER,
            Order: 0,
            LongDescription: "This is the exit from Ganon's Castle."
        },
        "Central Tower": {
            SpoilerLogExitName: "Ganons Castle Main -> Ganons Castle Tower",
            ExitRegion: "center",
            ItemGroup: ItemGroups.BOSS_ENTRANCE,
            DefaultEntranceGroupName: "Ganon's Tower",
            MapInfo: { x: 165, y: 95, floor: "MN" },
            Age: Age.EITHER,
            Order: 100,
            LongDescription: "Clear the trials in the tower to remove the barrier blocking the central tower.",
            TricksToShow: [Tricks.ganonTrialSkip],
            IgnoreTricksToShow: () => MapLocations["Ganon's Castle"].IsMasterQuest
        }
    }
}