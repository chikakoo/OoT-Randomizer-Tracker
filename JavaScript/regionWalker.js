RegionWalker = {
    /**
     * The seeds to use - these are the starting locations to start walks from
     * The object is structured as such:
     *  {
     *      [Age.CHILD]: {
     *          <map>: [region1, region2, ...]
     *      },
     *      [Age.ADULT]: {
     *          <map>: [region1, region2, ...]
     *      },
     *   }
     */
    _seeds: {},

    /**
     * An object of visited areas so that we can terminate without looping forever
     * The object is structured as such (for very quick checks):
     *  {
     *      "map | region": true,
     *      ...
     *  }
     */
    _visitedAreas: {},

    /**
     * An object containing item locations to check at the end of the walk
     * These are checks that require the entire map to have been visited (ones that use canAccesMap somewhere)
     * {
     *  Age.CHILD: [],
     *  Age.ADULT: []
     * }
     */
    _postWalkChecks: {},

    /**
     * Perform the walk to track where you can go and what you can get
     */
    walk: function() {
        this._clearData();
        this._setSpawnAndWarpWalkData();

        if (Data.randomizedSpawnLocations[Age.CHILD]) {
            this._doEntireWalk(Age.CHILD);
            this._doEntireWalk(Age.ADULT);
        } else {
            this._doEntireWalk(Age.ADULT);
            this._doEntireWalk(Age.CHILD);
        }

        this._runPostWalkChecks(Age.CHILD);
        this._runPostWalkChecks(Age.ADULT);
    },

    /**
     * Sets the spawn/warp walk data based on the values in Data
     */
    _setSpawnAndWarpWalkData: function() {
        this._setSpawnAndWarpWalkDataForAge(Age.CHILD);
        this._setSpawnAndWarpWalkDataForAge(Age.ADULT);
    },

    /**
     * Sets the spawn and warp walk data for a specific age
     */
    _setSpawnAndWarpWalkDataForAge: function(age) {
        if (Data.randomizedSpawnLocations.useRandomizedSpawns) {
            if (Data.randomizedSpawnLocations[age] && Data.randomizedSpawnLocations[age].entranceName) {
                let spawnData = Data.randomizedSpawnLocations[age];
                this._markItemInfoForSpawnOrWarpData(spawnData.map, spawnData.region, spawnData.entranceName);
            }

            let warpSongs = [Songs.MINUET_OF_FOREST, Songs.BOLERO_OF_FIRE, Songs.SERENADE_OF_WATER, 
                Songs.NOCTURNE_OF_SHADOW, Songs.REQUIEM_OF_SPIRIT, Songs.PRELUDE_OF_LIGHT];
            let _this = this;
            warpSongs.forEach(function(song) {
                _this._markItemInfoForSpawnOrWarpData(song.warpMap, song.warpRegion, song.entranceName);
            });
        }
    },

    /**
     * Marks the can obtain item information for the given spawn or warp data
     * Includes the handling of temple of time entrances
     * @param {String} map - the map
     * @param {String} region - the region
     * @param {String} entranceName - the entrance name
     */
    _markItemInfoForSpawnOrWarpData: function(map, region, entranceName) {
        if (map && region && entranceName && entranceName !== "none") {
            let itemLocation = MapLocations[map].Regions[region].ItemLocations[entranceName];
            this._markCanObtainItemInfo(itemLocation, age, ItemObtainability.YES, true);

            // If you can enter the DoT, then the other age can get here to - it's basically a spawn
            if (itemLocation.EntranceGroup && itemLocation.EntranceGroup.isTempleOfTime && Data.canEnterDoorOfTime(age))
            {
                let otherAge = age === Age.CHILD ? Age.ADULT : Age.CHILD;
                this._markCanObtainItemInfo(itemLocation, otherAge, ItemObtainability.YES, true);
            }
        }
    },

    /**
     * Does the entire walk for a given age, including setting seeds
     * Excludes the post walk check
     */
    _doEntireWalk: function(age) {
        if (Data.canBeAge(age)) {
            this._setUpSeeds(age);
            this._doWalk(age);
        }
    },

    /**
     * Clears the data from the previous walk so we can start anew
     * Includes the maps, their regions, and all their item locations
     */
    _clearData: function() {
        this._seeds = {};
        
        this._postWalkChecks = {};
        this._postWalkChecks[Age.CHILD] = [];
        this._postWalkChecks[Age.ADULT] = [];

        Object.keys(MapLocations).forEach(function(mapName) {
            delete MapLocations[mapName].WalkInfo;

            Object.keys(MapLocations[mapName].Regions).forEach(function(regionName) {
                delete MapLocations[mapName].Regions[regionName].WalkInfo;
            });
        });

        Data.getAllItemLocations().forEach(function(itemLocation) {
            delete itemLocation.WalkInfo;

            // For the OW Shuffle stuff
            delete itemLocation.childWalkValue;
            delete itemLocation.adultWalkValue;
            delete itemLocation.IsInteriorTravelData;
        });

        Object.keys(OwExits).forEach(function(mapName) {
            Object.keys(OwExits[mapName]).forEach(function(exitName) {
                let exit = OwExits[mapName][exitName];

                delete exit.WalkInfo;
                delete exit.childWalkValue;
                delete exit.adultWalkValue;
            });
        });
    },

    /**
     * Sets up the seeds so we know where to start our walk from
     * Modifies this._seeds
     */
    _setUpSeeds: function(age) {
        this._setUpInitialSeedObject(age);
        this._setUpSeedsForSpawnLocations(age);
        this._setUpSeedsSeedsForWarpSongs(age);
    },

    /**
     * Sets up the seed object so that every map is included by default
     * This makes it cleaner to add seeds
     */
    _setUpInitialSeedObject: function(age) {
        let _this = this;
        this._seeds[age] = {};
        Object.keys(MapLocations).forEach(function(mapName) {
            _this._seeds[age][mapName] = [];
        });
    },

    /**
     * Sets up the seeds for where Link can spawn
     */
    _setUpSeedsForSpawnLocations: function(age) {
        if (Data.randomizedSpawnLocations.useRandomizedSpawns) {
            if (Data.randomizedSpawnLocations[age] && Data.randomizedSpawnLocations[age].map && Data.randomizedSpawnLocations[age].region) {
                let map = Data.randomizedSpawnLocations[age].map;
                let region = Data.randomizedSpawnLocations[age].region;
                this._addToSeedObject(age, map, region);
            }

            // If you can enter ToT as the OTHER age, and get past the door of time, then you can be both ages
            let otherAge = age === Age.CHILD ? Age.ADULT : Age.CHILD;
            if (Data.randomizedSpawnLocations[otherAge]) {
                let templeOfTimeInfo;
                let foundTempleOfTime = false;

                // If we're shuffling interior entrances, then we must grab the ToT info from the stored info from the EntranceGroup
                // Otherwise, we would have done the walk already with the other age to check if we can get there
                if (Settings.RandomizerSettings.shuffleInteriorEntrances) {
                    foundTempleOfTime = Data.templeOfTimeLocation && Data.templeOfTimeLocation.map;
                    templeOfTimeInfo = { map: Data.templeOfTimeLocation.map, region: Data.templeOfTimeLocation.region };
                } else {
                    foundTempleOfTime = Data.canAccessMap(otherAge, "Temple of Time", "main");
                    templeOfTimeInfo = { map: "Temple of Time", region: "main" };
                }

                let canEnterDoorOfTime = Data.canEnterDoorOfTime(otherAge);
                if (foundTempleOfTime && canEnterDoorOfTime) {
                    this._addToSeedObject(age, templeOfTimeInfo.map, templeOfTimeInfo.region);
                }
            }
        } else if (!Settings.RandomizerSettings.shuffleInteriorEntrances) {
            if (age === Age.CHILD) {
                this._addToSeedObject(age, "Kokiri Forest", "main");
            } else {
                this._addToSeedObject(age, "Temple of Time", "main");
            }
        } else {
            let foundLinksHouse = Data.linksHouseLocation && Data.linksHouseLocation.map;
            let foundTempleOfTime = Data.templeOfTimeLocation && Data.templeOfTimeLocation.map;

            if (age === Age.CHILD) {
                if (foundLinksHouse) {
                    this._addToSeedObject(age, Data.linksHouseLocation.map, Data.linksHouseLocation.region);
                }
                
                if (foundTempleOfTime && Data.canEnterDoorOfTime(age)) {
                    this._addToSeedObject(age, Data.templeOfTimeLocation.map, Data.templeOfTimeLocation.region);
                }
            } else if (age === Age.ADULT && foundTempleOfTime) {
                this._addToSeedObject(age, Data.templeOfTimeLocation.map, Data.templeOfTimeLocation.region);
            }
        }
    },

    /**
     * Seeds up the seeds for where Link can warp to
     */
    _setUpSeedsSeedsForWarpSongs: function(age) {
        if (!Data.canPlaySongs()) { return; }

        if (Songs.MINUET_OF_FOREST.playerHas) {
            this._addWarpLocationForSong(age, Songs.MINUET_OF_FOREST);
        } 
        
        if (Songs.BOLERO_OF_FIRE.playerHas) {
            this._addWarpLocationForSong(age, Songs.BOLERO_OF_FIRE);
        } 
        
        if (Songs.SERENADE_OF_WATER.playerHas) {
            this._addWarpLocationForSong(age, Songs.SERENADE_OF_WATER);
        } 
        
        if (Songs.NOCTURNE_OF_SHADOW.playerHas) {
            this._addWarpLocationForSong(age, Songs.NOCTURNE_OF_SHADOW);
        } 
        
        if (Songs.REQUIEM_OF_SPIRIT.playerHas) {
            this._addWarpLocationForSong(age, Songs.REQUIEM_OF_SPIRIT);
        } 
        
        if (Songs.PRELUDE_OF_LIGHT.playerHas) {
            this._addWarpLocationForSong(age, Songs.PRELUDE_OF_LIGHT);
        }
    },

    /**
     * Adds the warp location to the seeds object for the given song and age
     */
    _addWarpLocationForSong: function(age, song) {
        if (song.noWarp) { return; }

        if (song.warpMap && song.warpRegion) {
            this._addToSeedObject(age, song.warpMap, song.warpRegion);
            return;
        }

        let defaultData = this._getDefaultDataForSong(song);
        if (defaultData) {
            this._addToSeedObject(age, defaultData.map, defaultData.region);
            return;
        }
    },

    /**
     * Gets the default warp data for the song
     */
    _getDefaultDataForSong: function(song) {
        switch (song) {
            case Songs.MINUET_OF_FOREST:
                return { map: "Sacred Forest Meadow", region: "afterGate" };
            case Songs.BOLERO_OF_FIRE:
                return { map: "Death Mountain Crater", region: "bottom" };
            case Songs.SERENADE_OF_WATER:
                return { map: "Lake Hylia", region: "main" };
            case Songs.NOCTURNE_OF_SHADOW:
                return { map: "Graveyard", region: "top" };
            case Songs.REQUIEM_OF_SPIRIT:
                return { map: "Desert Colossus", region: "main" };
            case Songs.PRELUDE_OF_LIGHT:
                if (!Settings.RandomizerSettings.shuffleInteriorEntrances) {
                    return { map: "Temple of Time", region: "main" };
                } else if (this.templeOfTimeLocation && this.templeOfTimeLocation.map) {
                    return { map: templeOfTimeLocation.map, region: templeOfTimeLocation.region };
                }
        }

        return null;
    },

    /** 
     * Add the given age/map/region to the seed object
     * Ensures duplciates are skipped
    */
    _addToSeedObject: function(age, map, region) {
        if (!this._seeds[age][map].includes(region)) {
            this._seeds[age][map].push(region);
        }
    },

    /**
     * Does the actual walk to mark maps and item locations
     */
    _doWalk: function(age) {
        this._visitedAreas[age] = {};
        if (!this._seeds[age]) { return; }

        let _this = this;
        let startingSeeds = Object.keys(this._seeds[age]);
        startingSeeds.forEach(function(seedMap) {
            let seedRegions = _this._seeds[age][seedMap];
            seedRegions.forEach(function(seedRegion) {
                _this._walkInRegion(age, seedMap, seedRegion);
            });
        });
    },

    /**
     * Perform the post walk checks on the given age
     */
    _runPostWalkChecks: function(age) {
        let _this = this;
        this._postWalkChecks[age].forEach(function(itemLocation) {
            let itemObtainability = Data.calculateObtainability(itemLocation, age);
            _this._markCanObtainItemInfo(itemLocation, age, itemObtainability);
        });
    },

    /**
     * Performs a walk in a given region and age
     * @param age - the age
     * @param mapName - the map
     * @param regionName - the region
     */
    _walkInRegion: function(age, mapName, regionName) {
        let visitedAreaKey = `${mapName} | ${regionName}`;

        if (this._visitedAreas[age][visitedAreaKey]) {
            return; // We've already walked here! This is our terminating condition.
        }

        this._visitedAreas[age][visitedAreaKey] = true;

        //TODO: remove this when done
        if (!MapLocations[mapName]) {
            //console.log(mapName + " " + regionName + " does not exist...");
            return;
        }

        this._markCanAccessWalkInfo(MapLocations[mapName], age, true);
        this._markCanAccessWalkInfo(MapLocations[mapName].Regions[regionName], age, true);
        
        // Check all items in the region
        let _this = this;
        let itemLocations = Data.getAllItemLocations(mapName, regionName);
        itemLocations.forEach(function(itemLocation) {
            if (itemLocation.IsPostWalkCheck || itemLocation.ItemGroup === ItemGroups.LOCKED_DOOR) {
                _this._postWalkChecks[age].push(itemLocation);
            } else {
                let itemObtainability = Data.calculateObtainability(itemLocation, age);
                _this._markCanObtainItemInfo(itemLocation, age, itemObtainability);
            }
        });

        // Walk to all other regions
        if (MapLocations[mapName].Regions[regionName]) { // skips regions that don't exist - TODO: address this (dungoen entrances cause this)
            let exitList = MapLocations[mapName].Regions[regionName].Exits;
            Object.keys(exitList).forEach(function (exitName) {
                let exit = exitList[exitName];
                if (exit.OwExit) {
                    let itemObtainability = Data.calculateObtainability(exit.OwExit, age, mapName);
                    if (itemObtainability) {
                        if (exit.OwExit.IsDungeonEntrance) {

                            let map = exit.OwExit.Map;
                            let mapInfo = MapLocations[map];

                            if (Data.getDoesEntranceShuffleApply(map)) {    
                                delete exit.OwExit.OwShuffleExitName;
                                delete exit.OwExit.OwShuffleMap;
                                delete exit.OwExit.OwShuffleRegion;
                                delete exit.OwExit.SecondCustomRequirement;

                                if (!mapInfo.ShuffledDungeon) {
                                    _this._markUnvisitedDungeonAccessWalkInfo(MapLocations[map], age, true);
                                    return;
                                }
                                map = mapInfo.ShuffledDungeon;
                                if (map === "Spirit Temple") {
                                    exit.OwExit.disabled = false;
                                    exit.OwExit.OwShuffleExitName = "Spirit Temple Hands",
                                    exit.OwExit.OwShuffleMap = "Desert Colossus",
                                    exit.OwExit.OwShuffleRegion = "main"
                                }
                            }

                            _this._walkInRegion(age, map, "main");
                            return;
                        }

                        let isRandomizedOwl = exit.OwExit.IsOwl && Settings.RandomizerSettings.randomizeOwlDrops;
                        if (isRandomizedOwl || (!exit.OwExit.IsOwl && Settings.RandomizerSettings.shuffleOverworldEntrances)) {
                            if (exit.OwExit.OwShuffleMap && exit.OwExit.OwShuffleExitName) {
                                if (exit.OwExit.IsInteriorExit) {
                                    _this._markCanObtainItemInfo(exit.OwExit, age, itemObtainability);
                                }

                                _this._walkInRegion(age, exit.OwExit.OwShuffleMap, exit.OwExit.OwShuffleRegion);
                            }
                        } else {
                            if (exit.OwExit.IsOwl) {
                                _this._markCanObtainItemInfo(exit.OwExit, age, itemObtainability);
                            }
                            _this._walkInRegion(age, exit.OwExit.Map, exit.OwExit.Region);
                        }
                    }
                } else if (Data.calculateObtainability(exit, age)) {
                     _this._walkInRegion(age, mapName, exitName);
                }
            });
        }
    },

    /**
     * Sets can access info for a given object
     */
    _markCanAccessWalkInfo: function(object, age, value) {
        object.WalkInfo = object.WalkInfo || {};
        object.WalkInfo.canAccess = object.WalkInfo.canAccess || {};
        object.WalkInfo.canAccess[age] = value;
    },

    /**
     * Sets can access info for unvisited dungeons
     */
    _markUnvisitedDungeonAccessWalkInfo: function(itemLocation, age, value) {
        itemLocation.WalkInfo = itemLocation.WalkInfo || {};
        itemLocation.WalkInfo.canVisitDungeon = itemLocation.WalkInfo.canVisitDungeon || {};
        itemLocation.WalkInfo.canVisitDungeon[age] = value;
    },

    /**
     * Sets can obtain item for a given item location
     * Contains a parameter for setting spawn or warp data - this will set the flag to true, which will prevent
     * future modifications of this data if it's an entrance so that it's not set to false later on on accident
     * Non entrances are okay to set the data for, since we still have logic for them to compute
     */
    _markCanObtainItemInfo: function(itemLocation, age, value, spawnOrWarpData) {
        let isEntrance = itemLocation.ItemGroup === ItemGroups.ENTRANCE;
        if (isEntrance && this.doesItemLocationHaveSpawnOrWalkData(itemLocation, age)) {
            return;
        }
        itemLocation.WalkInfo = itemLocation.WalkInfo || {};
        itemLocation.WalkInfo.canObtainItem = itemLocation.WalkInfo.canObtainItem || {};

        // If it's spawn or warp, we ONLY mark entrances as can obtain, since the
        // non-interior shuffle will still need to check if the item can be obtained
        if (!spawnOrWarpData || (spawnOrWarpData && isEntrance)) {
            itemLocation.WalkInfo.canObtainItem[age] = value;
        }

        if (spawnOrWarpData) {
            itemLocation.WalkInfo[age] = itemLocation.WalkInfo[age] || {};
            itemLocation.WalkInfo[age].spawnOrWarpData = true;
        }
    },

    /**
     * Returns whether the item locaiton has spawn or walk data
     */
    doesItemLocationHaveSpawnOrWalkData: function(itemLocation, age) {
        return itemLocation.WalkInfo && itemLocation.WalkInfo[age] && itemLocation.WalkInfo[age].spawnOrWarpData
    }
}