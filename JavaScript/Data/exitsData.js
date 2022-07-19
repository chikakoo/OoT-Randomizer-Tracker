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
        }
    },

    "Market Entrance": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 166, y: 31},
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
            MapInfo: {x: 166, y: 261},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule field."
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
        }
    },

    "Temple of Time": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 23, y: 239},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
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
        }
    },

    "Goron City": {
        "Death Mountain Trail": {
            Name: "Death Mountain Trail",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 181, y: 264},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the trail at the top of the city."
        },
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "lostWoods",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 211, y: 179},
            Age: Age.EITHER,
            LongDescription: "This is the entrance blocked by rocks on the second floor."
        },
        "Death Mountain Crater": {
            Name: "Death Mountain Crater",
            ExitRegion: "darunia",
            Map: "Death Mountain Crater",
            Region: "middle",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 185, y: 10},
            Age: Age.ADULT,
            LongDescription: "This is the entrance behind darunia's room - push back the statue."
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
        }
    },

    "Interiors" : {
        //TODO: set the values for potion shop/windmill/dampe
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