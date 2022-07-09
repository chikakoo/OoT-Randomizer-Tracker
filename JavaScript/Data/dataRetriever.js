/**
 * Represents whether the item is obtainable or not (or maybe)
 */
let ItemObtainability = {
	NO: 0,
	YES: 1,
	MAYBE: 2
};

Data = {
    /**
     * These are used for interior shuffle and overworld shuffle to determine various things
     * { map: "mapName", region: "regionName" }
     */
    randomizedSpawnLocations: {
        useRandomizedSpawns: false,
        "Child": null,
        "Adult": null
    },
	linksHouseLocation: {},
    templeOfTimeLocation: {},
    interiorShuffleIsWindmillDrained: false,

    /**
     * Consists of objects of the following form telling you where the interior "tunnel" is located
     * This contains the item location that corresponds to this
     */
    interiorTravelData: {
        kakPotionShopFront: null,
        kakPotionShopBack: null,
        dampesGrave: null,
        windmill: null
    },

    /**
     * Contains arrays of all the data entered for the interior travel data
     * This is to handle issues related to adding and removing entries by mistake
     */
    _interiorTravelDataInfo: {
        kakPotionShopFront: [],
        kakPotionShopBack: [],
        dampesGrave: [],
        windmill: []
    },

    /**
     * Should be what is called when adding to the interior travel data
     * @param {string} key - one of the interior travel data keys
     * @param {any} data - the data to store in the key
     */
    addToInteriorTravelData: function(key, data) {
        let dataArray = this._interiorTravelDataInfo[key];
        if (dataArray.some(x => x.Name === data.Name && x.Map === data.Map)) {
            return;
        }

        this._interiorTravelDataInfo[key].push(data);
        this._updateInteriorTravelData(key);
    },

    /**
     * Should be what is called when removing from the interior travel data
     * @param {string} key - one of the interior travel data keys
     * @param {any} data - the data to remove from the key
     */
    removeFromInteriorTravelData: function(key, data) {
        for (let i = 0; i < this._interiorTravelDataInfo[key].length; i++) {
            let item = this._interiorTravelDataInfo[key][i];
            if (item.Name === data.Name && item.Map === data.Map && item.Region === data.Region) {
                this._interiorTravelDataInfo[key].splice(i, 1)[0];
                this._updateInteriorTravelData(key);
                return;
            }
        }
    },

    /**
     * Updates the travel data with the most recent value
     * @param {string} key - the key to update
     */
    _updateInteriorTravelData: function(key) {
        let index = this._interiorTravelDataInfo[key].length - 1;
        if (index < 0) {
            this.interiorTravelData[key] = null;
            return;
        }
        this.interiorTravelData[key] = this._interiorTravelDataInfo[key][index];
    },

    /**
	 * Gets the background color for the given location - this is based
	 * on its group
	 * @param mapGroup - the map group
	 * @param isMasterQuest - this will change the color of dungeons if true
	 */
	getColorForMapGroup(mapGroup, isMasterQuest) {
		switch (mapGroup) {
			case MapGroups.FOREST: return "#4A7023";
			case MapGroups.FIELD_MARKET: return "#78AB46";
			case MapGroups.KAKARIKO: return "#BC8F8F";
			case MapGroups.MOUNTAIN: return "#A0522D";
			case MapGroups.WATER: return "#5CACEE";
			case MapGroups.DESERT: return "#D2B48C";
			case MapGroups.DUNGEONS: 
				if (isMasterQuest) { return "red"; }
				return "#9f6ff2";
			default: return "";
		}
	},
    
    /**
     * Gets the color of the map to use in the sidebar
     */
	getColorFromLocationName(locationName) {
		let mapLocation = MapLocations[locationName];
		return this.getColorForMapGroup(mapLocation.MapGroup, mapLocation.IsMasterQuest);
	},
		
	/**
	 * Gets the image path of the icon to display for the given location, based on the age
     * Includes fixing the age based on spawn data
	 * @param itemLocation - the item location
	 */
	getAgeImagePath: function(itemLocation) {
        let age = itemLocation.Age;
        
        if (age === Age.CHILD && RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, Age.ADULT) ||
            age === Age.ADULT && RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, Age.CHILD)) {
            return "";
        }

		switch(age) {
			case Age.CHILD: return 'url("Images/Child Icon.png")';
			case Age.ADULT: return 'url("Images/Adult Icon.png")';
			default: return "";
		}
	},

    /**
	 * Gets the time path to display for the gien item
	 * @param itemLocation - the item location
     * @param ignoreEntrances - whether to ignore entrances - used when clearing the group
	 */
	getTimeImagePath: function(itemLocation, ignoreEntrances) {
        let time = itemLocation.Time && itemLocation.Time();
        if (!ignoreEntrances && itemLocation.ItemGroup === ItemGroups.ENTRANCE && itemLocation.EntranceGroup) {
            let groupType;
            if (itemLocation.IsInterior) {
                groupType = InteriorGroups;
            } else if (itemLocation.IsGrotto) {
                groupType = GrottoGroups;
            }

            if (groupType) {
                let groupTimeFunction = groupType[itemLocation.EntranceGroup.name].time;
                let groupTime = groupTimeFunction && groupTimeFunction();
                if (time === Time.NIGHT && groupTime === Time.DAY) {
                    time = Time.OUTSIDE_NIGHT_INSIDE_DAY;
                } else if (!time) {
                    time = groupTime;
                }
            }
        }
		switch(time) {
			case Time.DAY: return 'url("Images/Day.png")';
			case Time.NIGHT: return 'url("Images/Night.png")';
            case Time.DAY_CHILD: return 'url("Images/Day Child.png")';
            case Time.DAY_ADULT: return 'url("Images/Day Adult.png")';
            case Time.NIGHT_CHILD: return 'url("Images/Night Child.png")';
            case Time.OUTSIDE_DAY_INSIDE_NIGHT: return 'url("Images/Outside Day Inside Night.png")';
            case Time.OUTSIDE_NIGHT_INSIDE_DAY: return 'url("Images/Outside Night Inside Day.png")';
			default: return "";
		}
	},

    /**
     * Appends the given message to all notes, delimited by a semicolon and space if
     * there is already notes there
     * @param {String} message - the message to append
     * @param {Array<*>} excludedItemGroups - the item groups to exclude
     */
    appendToAllNotes: function(message, excludedItemGroups) {
        excludedItemGroups = excludedItemGroups || [];

        this.getAllItemLocations(null, null, false).forEach(function(itemLocation) {
            if (excludedItemGroups.includes(itemLocation.ItemGroup)) {
                return;
            }

            let notes = itemLocation.notes;
            let hasNotes = notes !== undefined && notes.length > 0;
            itemLocation.notes = hasNotes ? `${notes}; message` : message;
        });

        SocketClient._syncAllItemLocations();
        refreshAll();
    },

    /**
     * Used for the co-op challenge where one player uses the base game items, and the
     * other uses the randomizer
     * @param {String} message - the message to append
     */
    appendToAllNotesForCoOpChallenge: function(message) {
        this.appendToAllNotes(message, [
            ItemGroups.SHOP, 
            ItemGroups.NON_ITEM, 
            ItemGroups.ENTRANCE, 
            ItemGroups.OW_ENTRANCE, 
            ItemGroups.COW,
            ItemGroups.SKULLTULA
        ]);
    },

    /**
     * Gets all item locations under the given map name/region
     * If no region name is given, gets them for the entire map
     * If no map name is given, gets all of them
     * @param mapName - the map name - omit to get all
     * @param regionName - the region name - omit to get all under the given map
     * @param includeDisabled - whether to include disabled locations
     */
    getAllItemLocations: function(mapName, regionName, includeDisabled) {
        let itemLocations = [];
        let _this = this;

        Object.keys(MapLocations).forEach(function(currentMap) {
            if (!mapName || mapName === currentMap) {
                itemLocations = itemLocations.concat(_this.getItemLocationsFromMapAndRegion(currentMap, regionName, includeDisabled));
            }
        });

        // This block is for the OW exits //TODO: break this off and use it in walk.js when updating the travel div instead
        if (Settings.RandomizerSettings.shuffleOverworldEntrances || 
            Settings.RandomizerSettings.shuffleDungeonEntrances ||
            Settings.RandomizerSettings.randomizeOwlDrops) {
            Object.keys(OwExits).forEach(function(currentMap) {
                if (!mapName || mapName === currentMap) {
                    Object.keys(OwExits[currentMap]).forEach(function(entranceName) {
                        let currentEntrance = OwExits[currentMap][entranceName];
                        if (!regionName || currentEntrance.ExitRegion === regionName) {
                            itemLocations = itemLocations.concat(currentEntrance);
                        }
                    });
                }
            });
        }

        return itemLocations;
    },

    /**
     * Gets all item locations under the current map/region
     * If no region is given, gets all of them
     * @param mapName - the map name (required)
     * @param regionName - the region name - omit to get all under the given map
     * @param includeDisabled - whether to include disabled locations
     */
    getItemLocationsFromMapAndRegion: function(mapName, regionName, includeDisabled) {
        let regionsToUse = [];
        let mapInfo = MapLocations[mapName];
        Object.keys(mapInfo.Regions).forEach(function(currentRegion) {
            if (!regionName || regionName === currentRegion) {
                regionsToUse.push(mapInfo.Regions[currentRegion]);
            }
        });

        let itemLocations = [];
        regionsToUse.forEach(function(region) {
            if (region.ItemLocations) {
                Object.keys(region.ItemLocations).forEach(function(itemLocationName) {
                    let itemLocation = region.ItemLocations[itemLocationName];
                    if (!itemLocation.disabled || includeDisabled) {
                        itemLocations.push(region.ItemLocations[itemLocationName]);
                    }
                });
            }
        });

        return itemLocations;
    },

    /**
     * Returns whether we should display the item location
     * Checks for grotto, interior, OW entrances, and owl entrances and their appropriate setting
     * If it's not any of those, will return true
     */
    shouldDisplayItemLocation: function(itemLocation) {
        // Entrances should ONLY be displayed if the setting is on
        if (itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
            if (itemLocation.IsGrotto) {
                return Settings.RandomizerSettings.shuffleGrottoEntrances;
            } else if (itemLocation.IsInterior) {
                return Settings.RandomizerSettings.shuffleInteriorEntrances;
            } else if (itemLocation.IsBoss) {
                return Settings.RandomizerSettings.shuffleBossEntrances;
            }
        }

        // If marked as a grotto or interior, DO NOT display if it's being shuffled, since this is covered by the entrance type
        if (itemLocation.IsGrotto) {
            return !Settings.RandomizerSettings.shuffleGrottoEntrances;
        } else if (itemLocation.IsInterior) {
            return !Settings.RandomizerSettings.shuffleInteriorEntrances;
        } else if (itemLocation.IsBoss) {
            return !Settings.RandomizerSettings.shuffleBossEntrances;
        }

        // Important to check the owls and dungneons before the OW entrances, because they are also OW entrances
        if (itemLocation.IsOwl) {
            return Settings.RandomizerSettings.randomizeOwlDrops;
        }

        if (itemLocation.IsDungeonEntrance || itemLocation.IsDungeonExit) {
            return Settings.RandomizerSettings.shuffleDungeonEntrances;
        }

        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            return Settings.RandomizerSettings.shuffleOverworldEntrances;
        }

        return true;
    },

    /**
     * Returns whether it's possible to be the given age
     */
    canBeAge: function(age) {
        let usingRandomizedSpawns = Data.randomizedSpawnLocations.useRandomizedSpawns;

        // Check whether your starting age is the current age
        // With randomized spawns, if the spawn is set, it's assumed you can be that age since you set it yourself
        // If it's the starting age but we skip DoT travel, we're assuming you cannot travel back, so only
        // the non-starting age is available!
        let isStartingAge = age === Settings.RandomizerSettings.startingAge;
        if (age === Settings.RandomizerSettings.startingAge && !usingRandomizedSpawns) { return true; }
        if (usingRandomizedSpawns && Data.randomizedSpawnLocations[age]) {
            return Settings.RandomizerSettings.skipToTTravel ? !isStartingAge : true;
        }

        // Check if the other age can even get through the door if they did find the temple
        let otherAge = age === Age.CHILD ? Age.ADULT : Age.CHILD;
        if (!this.canEnterDoorOfTime(otherAge)) { return false; }

        // Now the only thing that matters is that you found the temple
        // In this case, we check that you've found the temple in interior shuffle
        if (Settings.RandomizerSettings.shuffleInteriorEntrances) {
            return Data.templeOfTimeLocation && Data.templeOfTimeLocation.map;
        }

        // In this case, we need to check if the other age can get to the temple
        return this.canAccessMap(otherAge, "Temple of Time", "main");
    },

    /**
     * Checks whether it's possible to enter the door of time from the temple of time
     */
    canEnterDoorOfTime: function(age) {
		let canSkipAsChild = age === Age.CHILD && Settings.GlitchesToAllow.doorOfTimeSkip && Equipment.KOKIRI_SWORD.playerHas;
		let canSkipAsAdult = age === Age.ADULT && Settings.GlitchesToAllow.doorOfTimeSkip && this.hasShield(age) && Equipment.HOVER_BOOTS.playerHas;
		
		let canEnterDoorOfTime = Settings.RandomizerSettings.openDoorOfTime || // Already open
			canSkipAsChild || canSkipAsAdult || // Door of time skip
			this.canPlaySong(Songs.SONG_OF_TIME); // Can open with Song of Time
		
		return canEnterDoorOfTime;
	},

    /**
     * Returns whether you can access the given map and region at the given age
     */
	canAccessMap: function(age, mapName, regionName) {
        let mapInfo = MapLocations[mapName];
        if (!mapInfo.WalkInfo) { return ItemObtainability.NO; }
        
        if (regionName) {
            let regionData = mapInfo.Regions[regionName];
            if (regionData && regionData.WalkInfo && regionData.WalkInfo.canAccess) {
                let accessData =  regionData.WalkInfo.canAccess[age];
                if (accessData === undefined) {
                    return ItemObtainability.NO;
                }
                return accessData;
            }

            return ItemObtainability.NO;
        }

        if (!mapInfo.WalkInfo.canAccess) { return ItemObtainability.NO; }
        let accessData = mapInfo.WalkInfo.canAccess[age];
        if (accessData === undefined) {
            return ItemObtainability.NO;
        }
        return accessData;
    },

    /**
     * Gets an array of all the non-dungeon map names
     * @param isForDungeonDropdown - whether it's for the dungeon dropdown
     */
	getOWMaps: function(isForDungeonDropdown) {
		let owMaps = [];
		
		let mapNames = Object.keys(MapLocations);
		mapNames.forEach(function (mapName) {
			let map = MapLocations[mapName]
            let isDungeon = map.MapGroup === MapGroups.DUNGEONS;
            let dungeonCheck = isForDungeonDropdown
                ? isDungeon && isForDungeonDropdown && !map.ExcludeFromShuffle
                : !isDungeon && !isForDungeonDropdown;
			if (dungeonCheck) {
				owMaps.push(mapName);
			}
		});
		
		return owMaps;
    },
    
    /**
     * Gets an array of all the overworld entrance names for use in the dropdown
     */
    getOWEntrances: function(mapName, isOwl) {
        let entrances = [];
        let exits = OwExits[mapName];

		Object.keys(exits).forEach(function(entranceName) {
            let entrance = exits[entranceName];
			if (entrance.ItemGroup === ItemGroups.OW_ENTRANCE && 
                (!entrance.Hide || (isOwl && entrance.ShowForOwl)) && 
                !entrance.IsDungeonEntrance && 
                !entrance.IsOwl)
			{
				entrances.push(entranceName);
			}
		});
		
		return entrances;
    },

    /**
     * Gets the dungeon entrance map
     * @param dungeonName: The name of the dungeon to get the map for
     * @returns The found map, or undefined if not found
     */
    getDungeonEntranceMap: function(dungeonName) {
        let dungeonEntranceMap;
        Object.keys(OwExits).forEach(function(mapName) {
            if (dungeonEntranceMap) { return; }
            Object.keys(OwExits[mapName]).forEach(function(exitName) {
                let exit = OwExits[mapName][exitName];
                if (exit.IsDungeonEntrance && exit.OwShuffleMap === dungeonName) {
                    dungeonEntranceMap = exit.Map;
                    return;
                }
            });
        });
        return dungeonEntranceMap;
    },
    
    /**
     * Sets an OW location as found or clears the data
     * @param fromMapName - the map you're setting the info for
     * @param from - the item location of the exit you took
     * @param toMapName - the map you selected
     * @param toRegion - the region you selected
     * @param itemLocationName - the item location you're setting the info on
     * @param clear - whether we're only clearing the data
     */
	setOWLocationFound: function(fromMapName, from, toMapName, toLocationName, clear) {
        let fromLocationName = from.Name;
        let fromOwExit = OwExits[fromMapName][fromLocationName];
        let toOwExit = OwExits[toMapName];
        if (toOwExit) {
            toOwExit = toOwExit[toLocationName];
        }

        let fromReferenceKey = `${fromMapName}|${fromLocationName}`;
        let toReferenceKey = `${toMapName}|${toLocationName}`;

        let decoupledEntrances = Settings.RandomizerSettings.decoupleEntrances;

        // Clear the old data
        // Don't clear this part if we're decoupled, since this side isn't necessarily linked!
        if (!decoupledEntrances && fromOwExit.OwShuffleMap && fromOwExit.OwShuffleExitName) {
            if (!fromOwExit.OneWayEntrance && OwExits[fromOwExit.OwShuffleMap]) {
                let oldOwExit = OwExits[fromOwExit.OwShuffleMap][fromOwExit.OwShuffleExitName];
                if (oldOwExit && oldOwExit.LinkedExit === fromReferenceKey) {
                    delete oldOwExit.OwShuffleMap;
                    delete oldOwExit.OwShuffleRegion;
                    delete oldOwExit.OwShuffleExitName;
                    delete oldOwExit.LinkedExit;
                }
            }
        }

        delete fromOwExit.OwShuffleMap;
        delete fromOwExit.OwShuffleRegion;
        delete fromOwExit.OwShuffleExitName;

        // If we're only clearing data, stop here - no toOwExit data means we've entered <no selection>
        if (!toOwExit || clear) { return; }

        // Set the from information
        fromOwExit.OwShuffleMap = toMapName;
        fromOwExit.OwShuffleRegion = toOwExit.ExitRegion;
        fromOwExit.OwShuffleExitName = toLocationName;

        // Set the to information, but only if this info doesn't already exist and we're not a one-way entrance
        // No need to set the other side info if we're decoupled
        if (!decoupledEntrances && (!toOwExit.LinkedExit || toOwExit.LinkedExit === fromReferenceKey)) {
            if (!fromOwExit.OneWayEntrance) {
                fromOwExit.LinkedExit = toReferenceKey; // Only set this if we're linking the two
    
                toOwExit.OwShuffleMap = fromMapName;
                toOwExit.OwShuffleRegion = from.ExitRegion;
                toOwExit.OwShuffleExitName = fromLocationName;
                toOwExit.LinkedExit = fromReferenceKey;
            }
        }
	},

    /**
     * Returns whether the Gerudo guards will capture you
     */
    areGerudoGuardsTame: function() {
		return Equipment.GERUDO_MEMBERSHIP_CARD.playerHas;
	},
    
    /**
     * Returns whether you can play bombchu bowling
     */
	canPlayBombchuBowling: function(age) {
		if (age === Age.ADULT) { return false; }
		
		let chusAreInLogic = Settings.RandomizerSettings.bombchusInLogic;
		return (chusAreInLogic && Items.BOMBCHU.playerHas) || (!chusAreInLogic && Items.BOMB.playerHas);
	},
    
    /**
     * Returns whether you can megaflip
     */
	canMegaFlip: function(age) {
		return Settings.GlitchesToAllow.megaFlip && 
			this.hasShield(age) &&
			(Items.BOMB.playerHas || Items.BOMBCHU.playerHas);
    },

    /**
     * Returns whether you can weird shot
     * @param age - the age to check (currently only adult works, must change if we want to include boomerang or slingshot)
     * @param item - the item to weirdshot with - defaults to hookshot
     */
    canWeirdShot: function(age, item) {
        item = item || Items.HOOKSHOT;
        return Settings.GlitchesToAllow.weirdShot &&
            age === Age.ADULT && 
            this.hasShield(age) && 
            Items.HOOKSHOT.playerHas && 
            Items.BOMB.playerHas;
    },

    /**
     * Returns whether you can get to the graveyard top without warping
     */
    canGetToGraveyardTopEarly: function(age) {
		return this._canHookshotJump(age) || this._canDoOldShadowEarly(age);
	},
    
    /**
     * Returns whether you can do the chu slide teleport
     */
     _canHookshotJump: function(age) {
		return age === Age.ADULT &&
			Settings.GlitchesToAllow.hookshotJump && 
			Items.HOOKSHOT.playerHas;
	},
    
    /**
     * Returns whether you can do the old shadow temple early method
     */
	_canDoOldShadowEarly: function(age) {
		return age === Age.ADULT &&
			Settings.GlitchesToAllow.oldShadowEarly && 
            (this.canWeirdShot(age) || Items.HOOKSHOT.currentUpgrade === 2 || this.itemLocationObtained("Graveyard", "main", "*Plant Bean by Dampe's Grave")) &&
			this.hasExplosives() &&
			this.hasShield(age);
    },

    /**
     * Returns whether you can do a staircase hover
     */
    canStaircaseHover: function(age) {
        return Settings.GlitchesToAllow.staircaseHover &&
            Settings.GlitchesToAllow.isg &&
            Items.BOMB.playerHas &&
            Data.hasSwordWeapon(age) &&
            Data.hasShield(age);
    },

    /**
     * Returns whether you can do a superslide using bombs
     */
    canBombSuperslide: function(age) {
        return Settings.GlitchesToAllow.bombSuperslide &&
            Items.BOMB.playerHas &&
            Data.hasShield(age)
    },

    /**
     * Returns whether you can do a superslide using bombs and hover boots
     */
    canBombSuperslideWithHovers: function(age) {
        return age === Age.ADULT &&
            this.canBombSuperslide(age) &&
            Equipment.HOVER_BOOTS.playerHas;
    },

    /**
     * Returns whether you can do a superslide the hammer and hover boots
     */
    canHammerHoverBootsSuperslide: function(age) {
        return age === Age.ADULT &&
            Settings.GlitchesToAllow.hammerHoverBootsSuperslide &&
            Items.MEGATON_HAMMER.playerHas &&
            Equipment.HOVER_BOOTS.playerHas;
    },
    
    /**
	 * Sets whether the item is obtained
	 * @itemLocation The item
	 * @isObtained A boolean indicating whether it should be obtained
	 */
	setItemObtained: function(itemLocation, isObtained) {
		itemLocation.playerHas = !!isObtained;
    },
    
    /**
	 * Toggle whether an item was obtained
	 * @return The new state of the item
	 */
	toggleItemObtained: function(itemLocation) {
		itemLocation.playerHas = !itemLocation.playerHas;
		return itemLocation.playerHas;
	},
    
    /**
     * Returns whether the given item location at the given map and region was obtained 
     */
    itemLocationObtained: function(mapName, regionName, itemLocationName) {
        let map = MapLocations[mapName];
        if (!map) { 
            return false;
        }

        let itemLocation = map.Regions[regionName].ItemLocations[itemLocationName];
        if (Settings.RandomizerSettings.autoPlantBeans && itemLocation.IsBean) {
            return true;
        }

		return itemLocation.playerHas;
	},

    /**
     * Returns whether you can get the given item at the given age - uses the current calculation
     * @param itemLocation - the item location data
     * @param age - the age - if null, will check both and return true if at least one of the two is true
     */
    getItemObtainability: function(itemLocation, age) {
        if (!itemLocation.WalkInfo) { return ItemObtainability.NO; }
        if (!itemLocation.WalkInfo.canObtainItem) { return ItemObtainability.NO; }

        if (age) {
            return itemLocation.WalkInfo.canObtainItem[age];
        }
        return itemLocation.WalkInfo.canObtainItem[Age.CHILD] || itemLocation.WalkInfo.canObtainItem[Age.ADULT];
    },

    /**
     * Returns whether you can access to the given place
     * @param location - the object of the place
     * @param age - the age - if null, will check both and return true if at least one of the two is true
     */
    getLocationAccessibility: function(location, age) {
        if (!location.WalkInfo) { return ItemObtainability.NO; }
        if (!location.WalkInfo.canAccess) { return ItemObtainability.NO; }

        if (age) {
            return location.WalkInfo.canAccess[age];
        }
        return location.WalkInfo.canAccess[Age.CHILD] || location.WalkInfo.canAccess[Age.ADULT];
    },

    /**
     * Calculates whether you can get the given item/go to the given region at the given age
     * This assumes that you can already gain access to the region it is in
     * @param itemLocation - the item location data - this may be an item or a region
     * @param age - the age
     */
    calculateObtainability: function(itemLocation, age) {
        // If this is a spawn location, and you can get the item, no need to check anything else
        if (this._isSpawnItemAndCanGet(age, itemLocation)) {
            return ItemObtainability.YES;
        }
		
        if (!this._isCorrectAge(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._passesCustomRequirement(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._canDoItemGroup(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.canPlantBean(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._hasRequiredItems(age, itemLocation, "RequiredItems")) { return ItemObtainability.NO; }
		if (!this._hasRequiredChildItems(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._hasRequiredAdultItems(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._hasAnyOfTheseItems(itemLocation, "RequiredChoiceOfItems")) { return ItemObtainability.NO; }
		if (!this._adultHasAnyOfTheseItems(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._childHasAnyOfTheseItems(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._hasRequiredSongs(itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasRequiredMedallions(itemLocation)) { return ItemObtainability.NO; }
		if (!this.canPlaySongs(itemLocation)) { return ItemObtainability.NO; }
		if (!this.canPlayDifficultOcarinaItems(itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasBottle(itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasExplosives(itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasExplosivesOrStrength(itemLocation)) { return ItemObtainability.NO; }
        if (!this.canBlastOrSmash(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this.canBreakMudWalls(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this.canSinkSilverScaleDepth(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.canSinkGoldenScaleDepth(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.canUseFireItem(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.canGrabShortDistances(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasSwordWeapon(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.hasDamagingItem(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this.canKillStunnableEnemy(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._checkKeyRequirement(age, itemLocation)) { return ItemObtainability.NO; }

        return ItemObtainability.YES;
    },

    /**
     * Checks whether this is at a location that you can spawn or warp to and that you can get the item there
     */
    _isSpawnItemAndCanGet: function(age, itemLocation) {
        if (RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, age)) {
            if (!itemLocation.PostSpawnRequirements || itemLocation.PostSpawnRequirements(age)) {
                if (itemLocation.ItemGroup === ItemGroups.SHOP) {
                    return this.canBuyFromShop(age, itemLocation);
                }

                return true;
            }
        }

        return false;
    },

    /**
     * Returns whether the item can be obtained given the age alone
     */
    _isCorrectAge: function(age, itemLocation) {
		return age === undefined || itemLocation.Age === undefined || itemLocation.Age === Age.EITHER || itemLocation.Age === age;
	},

    /**
     * Passes the defined function in the item location
     */
    _passesCustomRequirement: function(age, itemLocation) {
		if (!itemLocation) { return false; }
		if (!itemLocation.CustomRequirement) { return true; }
		
		return itemLocation.CustomRequirement(age);
    },
    
    /**
     * Checks whether you can do the tasks in the item group
     */
    _canDoItemGroup: function(age, itemLocation) {
		if (itemLocation && itemLocation.OverrideItemGroupCondition) { return true; }

        if (this.isItemLocationAShop(itemLocation)) {
			return this.canBuyFromShop(age, itemLocation);
		}
		
		switch (itemLocation.ItemGroup) {
			case ItemGroups.COW:
				return this.canMilkCows();
			case ItemGroups.SKULLTULA:
				return this.hasDamagingItem(age);
			case ItemGroups.SCRUB:
				return this.canBuyFromScrub(age);
			case ItemGroups.GOSSIP_STONE:
                return this.canReadGossipStone(age);
            case ItemGroups.LOCKED_DOOR:
                return this.canOpenLockedDoor(age, itemLocation);
				
			default: return true;
		}
    },

    /**
	 * Returns whether there is a shop at the given item location - this includes main item locations and entrance groups
     * This forces a boolean return value
	 */
	isItemLocationAShop: function(itemLocation) {
		return !!(itemLocation.ItemGroup === ItemGroups.SHOP || 
			(
				itemLocation.ItemGroup === ItemGroups.ENTRANCE && 
				itemLocation.EntranceGroup && 
				itemLocation.EntranceGroup.isShop
			));
    },
    
    /**
     * Returns whether the item location is a gossip stone - this includes main item locations and entrance groups
     * This forces a boolean return value
     */
    isItemLocationAGossipStone: function(itemLocation) {
		return !!(itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE || 
			(
				Settings.RandomizerSettings.gossipStoneSetting !== GossipStoneSettings.HIDE &&
				itemLocation.ItemGroup === ItemGroups.ENTRANCE && 
				itemLocation.EntranceGroup && 
				itemLocation.EntranceGroup.hasGossipStone
			));
	},

    /**
     * Returns whether you can open the locked door
     * Checks whether you can get to the region and whether you have the max required keys to open it
     */
    canOpenLockedDoor: function(age, itemLocation) {
        if (!itemLocation.Regions) { return false; }

        let map = itemLocation.Map;
        let currentKeys = getKeyCount(map);
        let usedKeys = this.getUsedKeys(itemLocation.Map);
        if (currentKeys - usedKeys <= 0) {
            return false;
        }

        if (getKeyCount(map) < itemLocation.KeyRequirement(age).min) {
            return false;
        }
        
        let canOpenDoor = false;
        let _this = this;
        itemLocation.Regions.forEach(function(region) {
            if (_this.canAccessMap(age, map, region)) {
                canOpenDoor = true;
            }
        });
        return canOpenDoor;
    },

    /**
     * Gets the number of keys the player used, based off of the number of doors opened
     */
    getUsedKeys: function(mapName) {
        let usedKeys = 0;
        let mainItemLocations = MapLocations[mapName].Regions.main.ItemLocations;
        Object.keys(mainItemLocations).forEach(function (itemLocationName) {
            let itemLocation = mainItemLocations[itemLocationName];
            if (itemLocation.ItemGroup === ItemGroups.LOCKED_DOOR && itemLocation.playerHas) {
                usedKeys++;
            }
        });
        return usedKeys;
    },

    /**
     * Returns whether the player is able to plant a bean
     */
    canPlantBean: function(age, itemLocation) {
		if (itemLocation && itemLocation.IsBean) {
			return age === Age.CHILD && Items.MAGIC_BEAN.playerHas;
		}
		return true;
    },
    
    /**
     * Checks whether the player has the required items
     * This does handle equip swaps
     * @param age - the age
     * @param itemLocation - the item location - used to determine whether this check is valid
     * @param propertyName - the property name, either null, or "RequiredChildItems", or "RequiredAdultItems"
     */
    _hasRequiredItems: function(age, itemLocation, propertyName) {
		if (!itemLocation[propertyName]) { return true; }
		let hasAllItems = true;
		
		let _this = this;
		itemLocation[propertyName].forEach(function(item) {
			let currentItem = item.item || item;
			
			let canUseItem = currentItem.playerHas &&
				(
					(item !== Items.BOOMERANG && item !== Items.MEGATON_HAMMER && item !== Items.DEKU_STICK) ||
					(item === Items.BOOMERANG && _this.canUseBoomerang(age)) ||
					(item === Items.MEGATON_HAMMER && _this.canUseHammer(age)) ||
                    (item === Items.DEKU_STICK && _this.canUseDekuStick(age))
				);
			
			if (!canUseItem) {
				hasAllItems = false;
				return;
			}
			
			if (item.upgradeString && (currentItem.currentUpgrade < item.upgradeString)) {
				hasAllItems = false;
				return;
			}
		});
		
		return hasAllItems;
    },
    
    /**
     * Checks whether the player has the required items as a particular age
     * This does handle equip swaps
     * @param age - the age - returns true if adult, since this check doesn't matter for them
     * @param itemLocation - the item location - used to determine whether this check is valid
     */
	_hasRequiredChildItems: function(age, itemLocation) {
		// Note that if age is adult, it's okay because these are items that only child would need
		if (!itemLocation.RequiredChildItems || age === Age.ADULT) { return true; }
		return this._hasRequiredItems(age, itemLocation, "RequiredChildItems");
	},
    
    /**
     * Checks whether the player has the required items as a particular age
     * This does handle equip swaps
     * @param age - the age - returns true if child, since this check doesn't matter for them
     * @param itemLocation - the item location - used to determine whether this check is valid
     */
	_hasRequiredAdultItems: function(age, itemLocation) {
		// Note that if age is child, it's okay because these are items that only adult would need
		if (!itemLocation.RequiredAdultItems || age === Age.CHILD) { return true; }
		return this._hasRequiredItems(age, itemLocation, "RequiredAdultItems");
    },
    
    /**
     * Returns whether the player has any one of the given items
     * @param itemLocation - the item location - used to determine whether this check is valid
     * @param propertyName - the property name, either null, or "RequiredChildItems", or "RequiredAdultItems"
     */
    _hasAnyOfTheseItems: function(itemLocation, propertyName) {
		if (!itemLocation[propertyName]) { return true; }
		let hasItem = false;
		
		itemLocation[propertyName].forEach(function(item) {
			let currentItem = item.item || item;
			
			if (item.upgradeString && (currentItem.currentUpgrade >= item.upgradeString)) {
				hasItem = true;
				return;
			} else if (!item.upgradeString && currentItem.playerHas) {
				hasItem = true;
				return;
			}
		});
		
		return hasItem;
    },
    
    /**
     * Checks whether child has any of the given items
     * This does handle equip swaps
     * @param age - the age - returns true if adult, since this check doesn't matter for them
     * @param itemLocation - the item location - used to determine whether this check is valid
     */
    _childHasAnyOfTheseItems: function(age, itemLocation) {
		if (!itemLocation.RequiredChoiceOfChildItems || age === Age.ADULT) { return true; }
		return this._hasAnyOfTheseItems(itemLocation, "RequiredChoiceOfChildItems");
	},
    
    /**
     * Checks whether adult has any of the given items
     * This does handle equip swaps
     * @param age - the age - returns true if child, since this check doesn't matter for them
     * @param itemLocation - the item location - used to determine whether this check is valid
     */
	_adultHasAnyOfTheseItems: function(age, itemLocation) {
		if (!itemLocation.RequiredChoiceOfAdultItems || age === Age.CHILD) { return true; }
		return this._hasAnyOfTheseItems(itemLocation, "RequiredChoiceOfAdultItems");
    },
    
    /**
     * Returns whether player has all required songs of the given item location
     */
    _hasRequiredSongs: function(itemLocation) {
		if (!itemLocation.RequiredSongs) { return true; }
		if (!this.canPlaySongs()) { return false; }
		let hasAllSongs = true;
		
		itemLocation.RequiredSongs.forEach(function(song) {
			if (!song.playerHas) {
				hasAllSongs = false;
				return;
			}
		});
		
		return hasAllSongs;
	},
    
    /**
     * Returns whether player has all required medallions of the given item location
     */
	hasRequiredMedallions: function(itemLocation) {
		if (!itemLocation.RequiredMedallions) { return true; }
		let hasAllMedallions = true;
		
		itemLocation.RequiredMedallions.forEach(function(medallion) {
			if (!medallion.playerHas) {
				hasAllMedallions = false;
				return;
			}
		});
		
		return hasAllMedallions;
	},

    /**
     * Returns whether the player can buy from the given shop
     * Takes the item prices from the notes into account
     */
    canBuyFromShop: function(age, itemLocation) {
		if (itemLocation.notes) {
			let priceSplit = itemLocation.notes.split(";");
			let minAmount = 1000;
			
			priceSplit.forEach(function(price) {
				if (!price) { return; }
				
				let strPrice = price.trim().split(" ")[0];
				if (isNaN(strPrice)) { return; }
                let numPrice = Number(strPrice);

                // This block handles tunics that child cannot buy
                let item = price.trim().split(" ").slice(1).join(" ").trim();
                if (age === Age.CHILD && item !== "" && !item.includes("*")) {
                    let itemKey = item.split("//")[0].trim().replaceAll(" ", "").replaceAll("*", "");
                    let itemImage = ShopItemDictionary[itemKey];
                    if (itemImage === "Goron Tunic.png" && numPrice === 200) {
                        return;
                    }
                    if (itemImage === "Zora Tunic.png" && numPrice === 300) {
                        return;
                    }
                }
                
				if (numPrice > -1 && numPrice < minAmount) { minAmount = numPrice; }
			});
			
			switch(Equipment.WALLET.currentUpgrade) {
				case 1:
					return minAmount <= 200;
				case 2:
					return minAmount <= 500;
				default: 
					return minAmount <= 99;
			}
		}
		return true;
    },
    
    /**
     * Returns whether the player can buy from a scrub
     */
    canBuyFromScrub: function(age) {
		if (age === Age.ADULT) { return true; } // Adult can jumpslash them, no checks needed
		return this.hasDamagingItem(age) || 
			this.hasShield(age) || 
			Items.DEKU_NUT.playerHas || 
			this.hasExplosives() ||
			this.canUseFireItem(age);
    },
    
    /**
     * Returns whether the play can get gossip stone hints
     */
    canReadGossipStone: function(age) {
		switch (Settings.RandomizerSettings.gossipStoneSetting) {
			case GossipStoneSettings.HIDE:
				return false;
			case GossipStoneSettings.STONE_OF_AGONY:
				return Equipment.STONE_OF_AGONY.playerHas;
			case GossipStoneSettings.MASK_OF_TRUTH:
				return age === Age.CHILD && Items.MASK_SLOT.currentUpgrade >= 8;
			default:
				return true;
		}
	},
    
    /**
     * Returns whether the player can milk cows
     * @param ocarinaForced - whether we're forcing the ocarina, as opposed to using OI to skip it
     */
	canMilkCows: function(ocarinaForced) {
		if (ocarinaForced && !Items.OCARINA.playerHas) { return false; }
		return this.canPlaySong(Songs.EPONAS_SONG);
    },
    
    /**
     * Returns whether the player can play the given song
     * @param song - the song to check
     */
    canPlaySong: function(song) {
		return this.canPlaySongs() && song.playerHas;
    },
    
    /**
     * Returns whether the player has the ability to play songs, includes OI and actually having the ocarina
     */
    canPlaySongs: function(itemLocation) { //TODO: need to add age to check for OI item to actually play...
		if (itemLocation && !itemLocation.NeedsOcarina) { return true; }
		return Items.OCARINA.playerHas || (Settings.GlitchesToAllow.ocarinaItems && this.hasBottle());
    },

    /**
     * Returns whether the player can play songs at a spot that's difficult to perform OI in
     * Always true if the player has a real ocarina
     */
    canPlayDifficultOcarinaItems(itemLocation) {
		if (itemLocation && !itemLocation.DifficultOcarinaItems) { return true; }
		return Items.OCARINA.playerHas || (Settings.GlitchesToAllow.ocarinaItems && Settings.GlitchesToAllow.difficultOcarinaItems && this.hasBottle());
	},
    
    /**
     * Returns whether the player has an empty bottle
     * Handles checks on whether fille bottles are empty
     */
	hasBottle: function(itemLocation) {
		if (itemLocation && !itemLocation.NeedsBottle) { return true; }
		return Items.BOTTLE1.playerHas || 
			(Items.BIG_POE.currentUpgrade > 1) || 
			(Items.BLUE_FIRE.currentUpgrade > 1) ||
			(Items.RUTOS_LETTER.currentUpgrade > 1);
    },

    /**
     * Returns whether the player has the actual blue fire item or an empty bottle
     */
    hasBottleOrBlueFire: function(age) {
        return this.hasBottle() || this.canUseBlueFire(age);
    },

    /**
     * Returns whether the play can use blue fire - includes ice arrows
     */
    canUseBlueFire: function(age) {
        let canUseIceArrows = Settings.RandomizerSettings.iceArrowsActAsBlueFire && this.canUseIceArrows(age);
        return canUseIceArrows || Items.BLUE_FIRE.playerHas;
    },

    /**
     * MQ ice cavern requires either two bottles or the ability to use ice arrows in order to get some checks
     * This check assumes that you already have access to blue fire!
     */
     canOIAndBlueFireWithoutRefilling: function(age) {
        let bottleArr = [
            Items.BOTTLE1.playerHas,
            Items.BIG_POE.currentUpgrade > 1,
            Items.BLUE_FIRE.playerHas,
            Items.RUTOS_LETTER.currentUpgrade > 1
        ];
        let bottleCount = bottleArr.reduce((acc, value) => {
            if (value) { return acc + 1; }
            return acc;
        }, 0);

        let canUseIceArrows = Settings.RandomizerSettings.iceArrowsActAsBlueFire && this.canUseIceArrows(age);
        let canDoOI = Settings.GlitchesToAllow.ocarinaItems;
        return canDoOI && (bottleCount >= 1 && canUseIceArrows || bottleCount > 1);
    },
    
    /**
     * Returns whether the player has an item that can damage an enemy
     */
    hasDamagingItem: function(age, itemLocation) {
		if (itemLocation && !itemLocation.NeedsDamagingItem) { return true; }
		if (age === Age.ADULT) { return true; } // Adult always has a sword
		
		return Equipment.KOKIRI_SWORD.playerHas || 
			Items.DEKU_STICK.playerHas ||
			Items.BOOMERANG.playerHas ||
			Items.FAIRY_SLINGSHOT.playerHas ||
			this.canUseFireItem(age) ||
			this.hasExplosives() ||
			this.canUseHammer(age);
    },
    
    /**
     * Returns whether the player has a shield they can use (excludes hylian as child)
     */
    hasShield: function(age) {
		if (age === Age.CHILD) { return Equipment.DEKU_SHIELD.playerHas; }
		return Equipment.HYLIAN_SHIELD.playerHas || Equipment.MIRROR_SHIELD.playerHas;
	},

    /**
     * Returns whether the player can use an item that generates fire
     * Deku stick excluded since you still need a fire source
     */
	canUseFireItem: function(age, itemLocation) {
        if (itemLocation && !itemLocation.NeedsFire) { return true; }

        let canUseDinsFire = Equipment.MAGIC.playerHas && Items.DINS_FIRE.playerHas;
		return canUseDinsFire || this.canUseFireArrows(age);
    },

    /**
     * Returns whether the player can use fire arrows
     */
    canUseFireArrows: function(age) {
        return age === Age.ADULT && Equipment.MAGIC.playerHas && Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas;
    },

    /**
     * Returns whether the player can use ice arrows
     */
    canUseIceArrows: function(age) {
        return age === Age.ADULT && Equipment.MAGIC.playerHas && Items.FAIRY_BOW.playerHas && Items.ICE_ARROW.playerHas;
    },

    /**
     * Returns whether the player can activate an eye switch
     */
    canShootEyeSwitch: function(age) {
		return (
			(age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
			(age === Age.ADULT && Items.FAIRY_BOW.playerHas)
		);
	},

    /**
     * Whether the current age can hit a crystal switch that's out of melee distance
     * @param {Age} age - the age
     */
    canHitSwitchAtShortDistance: function(age) {
        return this.hasExplosives() || //TODO: will chus work in all cases? maybe add a boolean for them
            this.canUseBoomerang(age) ||
            this.canShootEyeSwitch(age) ||
            (age === Age.ADULT && Items.HOOKSHOT.playerHas) ||
            (Items.DINS_FIRE.playerHas && Equipment.MAGIC.playerHas); //TODO: does din's actually work?
    },
    
    /**
     * Returns whether the player has explosives
     */
	hasExplosives: function(itemLocation) {
		if (itemLocation && !itemLocation.NeedsExplosives) { return true;}
		return Items.BOMB.playerHas || Items.BOMBCHU.playerHas;
    },

    /**
     * Returns whether the player can use explosives of any kind, including bomb flowers
     */
    hasExplosivesOrStrength: function(itemLocation) {
		if (itemLocation && !itemLocation.NeedsExplosivesOrBombFlower) { return true;}
		return Items.BOMB.playerHas || Items.BOMBCHU.playerHas || Equipment.STRENGTH.playerHas;
	},
    
    /**
     * Returns whether the player can use explosives or the hammer
     */
	canBlastOrSmash: function(age, itemLocation) {
		if (itemLocation && !itemLocation.NeedToBlastOrSmash && !itemLocation.IsHiddenGrotto) { return true; }
		return this.hasExplosives() || this.canUseHammer(age);
    },

    /**
     * Whether the player can break mud walls (explosives, hammer, or blue fire)
     */
    canBreakMudWalls: function(age, itemLocation) {
        if (itemLocation && !itemLocation.BlockedByMudWall) { return true; }
        return this.canBlastOrSmash(age) || this.canUseBlueFire(age);
    },
    
    /**
     * Returns whether the player can ground jump using a bomb
     * @param includeBombFlower - Whether bomb flowers are feasible here (adds a strength check)
     */
    canGroundJumpWithBomb: function(age, includeBombFlower) {
        let hasBombSource = Items.BOMB.playerHas || (includeBombFlower && Equipment.STRENGTH.playerHas);
		return Settings.GlitchesToAllow.groundJump && this.hasShield(age) && hasBombSource;
	},
    
    /**
     * Returns whether the player can equip swap items
     */
    canEquipSwap: function(age) {
		if (!Settings.GlitchesToAllow.equipSwap) { return false; }
		return Items.DINS_FIRE.playerHas || (age === Age.CHILD && Items.DEKU_STICK.playerHas);
    },

    /**
     * Returns whether the player can use the Megaton Hammer
     * This includes equip swap
     */
    canUseHammer: function(age) {
		return Items.MEGATON_HAMMER.playerHas && (age === Age.ADULT || this.canEquipSwap(age));
    },

    /**
     * Returns whether the player can use the Boomerang
     * This includes equip swap
     */
    canUseBoomerang: function(age) {
		return Items.BOOMERANG.playerHas && (age === Age.CHILD || this.canEquipSwap(age));
	},

    /**
     * Returns whether the player can use Deku Sticks
     * This includes equip swap
     */
    canUseDekuStick: function(age) {
        return Items.DEKU_STICK.playerHas && (age === Age.CHILD || this.canEquipSwap(age));
    },

    /**
     * Whether the player can dive to silver scale depth
     * Includes iron boot usage
     */
    canSinkSilverScaleDepth: function(age, itemLocation) {
		if (itemLocation && !itemLocation.IsSilverScaleWater) { return true; }
		return Equipment.SCALE.playerHas || (age === Age.ADULT && Equipment.IRON_BOOTS.playerHas);
	},
    
    /**
     * Whether the player can dive to golden scale depth
     * Includes iron boot usage
     */
    canSinkGoldenScaleDepth: function(age, itemLocation) {
		if (itemLocation && !itemLocation.IsGoldenScaleWater) { return true; }
		return Equipment.SCALE.currentUpgrade > 1 || (age === Age.ADULT && Equipment.IRON_BOOTS.playerHas);
	},
    
    /**
     * Returns whether the player can grab items at a short distance
     * Includes equip swapping boomerang
     */
    canGrabShortDistances: function(age, itemLocation) {
		if (itemLocation && !itemLocation.IsAtShortDistance) { return true; }
		let canGetWithBoomerang = this.canUseBoomerang(age);
		let canGetWithHookshot = (age === Age.ADULT && Items.HOOKSHOT.playerHas);
		return canGetWithBoomerang || canGetWithHookshot;
    },

    /**
     * Returns whether the player summon and can hook a scarecrow
     */
    canHookScarecrow: function(age) {
		if (age === Age.CHILD) { return false; }
		return this.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas
	},
    
    /**
     * Returns whether you can ride epona2
     */
    canRideEpona: function(age) {
		if (age === Age.CHILD) { return false; }
		
		let canPlaySong = Data.canPlaySong(Songs.EPONAS_SONG) && Items.OCARINA.playerHas; // Actual ocarina required, even in race skip
		let canStealEpona = !Settings.RandomizerSettings.shuffleOverworldEntrances &&
			Settings.GlitchesToAllow.eponaHover && 
			Items.BOMB.playerHas && 
			this.hasShield(age);
		
		return canPlaySong || canStealEpona;
	},
    
    /**
     * Returns whether the player has a sword weapon
     * Includes equip swapping the hammer
     */
	hasSwordWeapon: function(age, itemLocation) {
		if (itemLocation && !itemLocation.NeedsSwordWeapon) { return true; }
		if (age === Age.ADULT) { return true; } // Adult always has a sword
		
		return Equipment.KOKIRI_SWORD.playerHas || Items.DEKU_STICK.playerHas || this.canUseHammer(age);
	},
    
    /**
     * Returns whether the player can kill a stunnable enemy
     */
	canKillStunnableEnemy: function(age, itemLocation) {
		if (itemLocation && !itemLocation.MustKillStunnableEnemy) { return true; }
		if (age === Age.ADULT) { return true; } // Adult always has a sword
		
		return Equipment.KOKIRI_SWORD.playerHas || 
			Items.DEKU_STICK.playerHas ||
			Items.FAIRY_SLINGSHOT.playerHas ||
			this.canUseFireItem(age) ||
			this.hasExplosives() ||
            this.canUseHammer(age);
	},

    /**
     * Returns whether the item location passes the key requirement
     * Can return any ItemObtainability
     */
    _checkKeyRequirement: function(age, itemLocation) {
		if (itemLocation && !itemLocation.LockedDoor) { 
            return ItemObtainability.YES; // There's no requirement for this
        } 

        if (itemLocation && itemLocation.SkipLockedDoor && itemLocation.SkipLockedDoor(age)) {
            return ItemObtainability.YES;
        }

        let lockedDoor = MapLocations[itemLocation.Map].Regions.main.ItemLocations[itemLocation.LockedDoor];
        if (lockedDoor.playerHas)
        {
            return ItemObtainability.YES;
        }
        
        let keyReq = lockedDoor.KeyRequirement(age);
        let currentKeyCount = getKeyCount(itemLocation.Map);
		if (currentKeyCount < keyReq.max) { return ItemObtainability.NO; }
		return ItemObtainability.YES; 
	},

	/**
	 * Gets whether entrance shuffle applies to the given location name
	 * @param locationName - the location name
	 * @param checkForOverworld - true if we want to check for overworld entrances; only does dungeon by default
	 * @return - true if so, false otherwise
	 */
	getDoesEntranceShuffleApply: function(locationName, checkForOverworld) {
		let mapInfo = MapLocations[locationName];
		if (!mapInfo || mapInfo.ExcludeFromShuffle) { return false; }
		
		let isDungeon = mapInfo.MapGroup === MapGroups.DUNGEONS;
		let isShuffledDungeon = isDungeon && Settings.RandomizerSettings.shuffleDungeonEntrances;
		let isShuffledOverworld = checkForOverworld && !isDungeon && Settings.RandomizerSettings.shuffleOverworldEntrances;
		
		return isShuffledDungeon || isShuffledOverworld;
    },

    /**
	 * Gets an object representing all the locations to display on the left:
	 *  name: The name of the location
	 *  abbreviation: The shorter name of the location (< 5 chars)
	 *  mapGroupId: The id of the map group
	 * 	canDoInfo: How many things child and adult can do
	 *  childBackgroundColor: The color to use for the child background
	 *  adultBackgroundColor: The color to use for the adult background
	 */
	getLocationDataForDisplay: function() {
		let mapNames = Object.keys(MapLocations);
		let allMapData = [];
		let _this = this;
		mapNames.forEach(function (mapName) {
            let thisMapData = {};
            let canDoInfo = _this._getCanDoInfo(mapName);
			thisMapData.childData = canDoInfo[Age.CHILD];
			thisMapData.adultData = canDoInfo[Age.ADULT];
			thisMapData.name = mapName;
			thisMapData.isMasterQuest = MapLocations[mapName].IsMasterQuest;
			thisMapData.abbreviation = MapLocations[mapName].Abbreviation;
			thisMapData.mapGroupId = MapLocations[mapName].MapGroup;
			thisMapData.childBackgroundColor = _this._getBackgroundColorFromCanDoData(thisMapData.childData);
			thisMapData.adultBackgroundColor = _this._getBackgroundColorFromCanDoData(thisMapData.adultData);
			allMapData.push(thisMapData);
		})
		return allMapData;
    },
    /**
     * Gets the numbers to be used for the location side bar given the map name
     */
    _getCanDoInfo: function(mapName) {
        let canDoInfo = {};
        canDoInfo[Age.CHILD] = {
            canDo: 0,
            cannotDo: 0,
            completed: 0,
            totalTasks: 0
        };

        canDoInfo[Age.ADULT] = {
            canDo: 0,
            cannotDo: 0,
            completed: 0,
            totalTasks: 0
        };

        let itemLocations = this.getAllItemLocations(mapName);
        let _this = this;
        [Age.CHILD, Age.ADULT].forEach(function(age) {
            _this._fillCanDoObject(itemLocations, age, canDoInfo[age]);
        });

        return canDoInfo;
    },

    /**
     * Fills in the information for the canDo object
     */
    _fillCanDoObject(itemLocations, age, canDoObj) {
        let _this = this;
        itemLocations.forEach(function(itemLocation) {
            if (itemLocation.ReadOnly || itemLocation.disabled) { // ReadOnly locations aren't real checks, just travel points
                return;
            }

            if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
                let isValidOwl = itemLocation.IsOwl && Settings.RandomizerSettings.randomizeOwlDrops;
                let isValidDungeon = itemLocation.IsDungeonEntrance && Settings.RandomizerSettings.shuffleDungeonEntrances;
                if (!isValidOwl && !isValidDungeon && !Settings.RandomizerSettings.shuffleOverworldEntrances) {
                    return;
                }
            }

            if (!RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, age)) { // In this case, ignore all the age requirements, becuase you can spawn or warp here
                let doesAgeFailNormalReq = itemLocation.Age !== Age.EITHER && age !== itemLocation.Age;
                let doesAgeFailUseAgeReq = (age === Age.CHILD && itemLocation.UseAdultAge && itemLocation.UseAdultAge()) ||
                    (age === Age.ADULT && itemLocation.UseChildAge && itemLocation.UseChildAge());
                if (doesAgeFailNormalReq || doesAgeFailUseAgeReq) {
                    return;
                }
            }

            canDoObj.totalTasks++;
            if (itemLocation.playerHas) { 
                canDoObj.completed++;
            } else {
                switch(_this.getItemObtainability(itemLocation, age)) {
                    case ItemObtainability.YES:
						if (itemLocation.EntranceGroup && itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
							_this._handleCanDoObjectForEntranceGroup(itemLocation, age, canDoObj);
						} else if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
							if (itemLocation.OwShuffleMap && itemLocation.OwShuffleRegion) {
								canDoObj.completed++;
							} else {
								canDoObj.canDo++;
							}
                        } else {
                            canDoObj.canDo++;
                        }
                        break;
                    default:
                        let isCompletedOwEntrance = itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE && 
                            itemLocation.OwShuffleMap && 
                            itemLocation.OwShuffleRegion;

                        // If the OW entrance is filled out, it shouldn't count against you!
                        if (!isCompletedOwEntrance) {
                            canDoObj.cannotDo++; 
                        }
                }
            }
        });
    },

    /**
     * Handles the can do object for the given item location - it is assumed to have an entrance group!
     * @param itemLocation - the item location
     * @param age - the current age
     * @param canDoObj - the canDo object - this is modified
     */
    _handleCanDoObjectForEntranceGroup: function(itemLocation, age, canDoObj) {
        let entranceGroup = itemLocation.EntranceGroup;
        let entranceData = EntranceUI.getEntranceData(itemLocation);
        if (entranceData[entranceGroup.name].shouldNotDisplay && entranceData[entranceGroup.name].shouldNotDisplay()) {
            canDoObj.canDo++;
            canDoObj.totalTasks++;
        } else {
            let canComplete = EntranceUI.getNumberOfCompletableTasks(itemLocation, age);
            let numberOfTasks = EntranceUI.getNumberOfTasks(itemLocation, age);

            canDoObj.canDo += canComplete;
            canDoObj.cannotDo += numberOfTasks - EntranceUI.getNumberOfCompletedTasks(itemLocation, age) - canComplete;
            canDoObj.totalTasks += numberOfTasks;
        } 
    },

    /**
	 * Gets the background color from the given data set. 
	 *  Background colors are as follows:
	 *  - Can't do anything: Gray
	 *  - Did everything: Light gold
	 *  - Can do someting: Green
	 */
	_getBackgroundColorFromCanDoData(data) {
		let didEverythingColor = "#F0E68C";
		
		// Did everything
		if (data.completed === data.totalTasks) {
			return didEverythingColor;
        }
        
		// Can't do anything
		if (data.canDo === 0 && data.cannotDo > 0) {
			return "LightGray"; 
		}
		
		// Can do everything
		if (data.cannotDo === 0 && data.canDo > 0) {
			return "#06CC06";
		}
		
		// Can do something
		if (data.canDo > 0) {
			return "LightGreen";
        }

        // Failsafe - if we get here, it usually means that somehow, completed < total, but can and cannotDo are both 0
        // TODO: Probably should try to fix this in the future so the numbers are correct
        return didEverythingColor;
    },

    /**
     * Returns whether all the poe rooms can be accessed
     * This will require an IsPostWalkCheck flag on each item that uses this!
     */
    forestTempleCanAccessAllPoeRooms: function(age) {
        let canAccessFirstPoes = Data.canAccessMap(age, "Forest Temple", "firstPoeRoom");
        let canAccessGreenPoeRoom = Data.canAccessMap(age, "Forest Temple", "fallingCeilingRoom");
        return canAccessFirstPoes && canAccessGreenPoeRoom;
    },

    /**
     * Returns whether all the poe rooms can be accessed
     * This will require an IsPostWalkCheck flag on each item that uses this!
     */
     mqForestTempleCanAccessAllPoeRooms: function(age) {
        let canAccessFirstPoes = Data.canAccessMap(age, "Forest Temple", "poeRooms");
        let canAccessGreenPoeRoom = Data.canAccessMap(age, "Forest Temple", "greenPoeRoom");
        return canAccessFirstPoes && canAccessGreenPoeRoom;
    },

    /**
     * A helper function for whether you can do the mega jump to the top of the
     * forest temple in the outside left area
     */
    forestCanJumpToTop: function(age) {
        let canDoTrick = Settings.GlitchesToAllow.forestJumpToTop && 
            age === Age.ADULT && 
            Items.BOMB.playerHas && 
            Equipment.HOVER_BOOTS.playerHas;

        // This part ensures that we're not allowing you to do the trick if you can get to the
        // room using the hover boots from the block room, which defeats the whole point because
        // you wouldn't be skipping that key
        let canGetToFromRightRoom = Items.FAIRY_BOW.playerHas && (this.canSinkGoldenScaleDepth(age) || Items.HOOKSHOT.currentUpgrade === 2);
        let canGetToOutsideLeftBeforeBlockRoom = Settings.GlitchesToAllow.forestLedgeClip || this.canPlaySong(Songs.SONG_OF_TIME) || canGetToFromRightRoom;
        return canDoTrick && canGetToOutsideLeftBeforeBlockRoom;
    },

    /**
     * A helper function for whether you can access the boss key path of the fire temple
     * This is used for small key checks
     */
    fireCanAccessBossKeyPath: function(age) {
        let canSkipPillar = Settings.GlitchesToAllow.fireFirstRoomPillarSkip &&
        (age === Age.ADULT || (age === Age.CHILD && Equipment.KOKIRI_SWORD.playerHas));

        return Data.canUseHammer(age) || canSkipPillar;
    },

    /**
     * Returns whether the player lowered the water, but is now unable to raise it to the
     * highest level again
     */
    waterIsPlayerLockedOutOfHighWater: function() {
        // If the player didn't lower the water, then they aren't locked out of it!
        if (!this.itemLocationObtained("Water Temple", "lowWaterLevel", "Lower Water Level")) {
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
        let canLightMiddleTorch = Items.FAIRY_BOW.playerHas || Data.canUseFireItem();
        let canGetToCentralMidFromBottom = this.itemLocationObtained("Water Temple", "main", "Locked Door to Central Room") && Items.HOOKSHOT.playerHas;
        let canRaiseWaterToMid = canLightMiddleTorch || canGetToCentralMidFromBottom;
        let canHitCrystalSwitch = this.hasExplosives() || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
        let canLowerWater = canRaiseWaterToMid && canHitCrystalSwitch;

        return !canLowerWater;
    },

    /**
     * Returns whether the player can access the adult side of the spirit temple
     * This is used for locked door logic
     */
    spiritCanAccessAdultSide: function() {
        if (Equipment.STRENGTH.currentUpgrade >= 2) { return true; }
        return Settings.GlitchesToAllow.spiritBlockSkip && Equipment.HOVER_BOOTS.playerHas;
    },

    mqSpiritCanAccessAdultSide: function() {
        let canGetUp = Items.BOMBCHU.playerHas && Items.HOOKSHOT.currentUpgrade === 2;
        let canPushBlock = Equipment.STRENGTH.currentUpgrade >= 2;
        let canWeirdShot = this.canWeirdShot(Age.ADULT) && Items.FAIRY_BOW.playerHas;
        return canGetUp && (canPushBlock || canWeirdShot);
    },

    /**
     * Gets the number of optional keys used in GTG (these are the ones on the right maze path)
     */
    gtgGetNumberOfOptionalKeysUsed: function() {
        let numberOfKeysUsed = 0;

        if (this.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 1")) {
            numberOfKeysUsed++;
        }

        if (this.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 2")) {
            numberOfKeysUsed++;
        }

        return numberOfKeysUsed;
    }
};