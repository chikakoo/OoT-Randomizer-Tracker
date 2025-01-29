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
        if (!mapLocation) {
            return "";
        }

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
	 */
	getTimeImagePath: function(itemLocation) {
        let time = itemLocation.Time && itemLocation.Time();
		switch(time) {
			case Time.DAY: return 'url("Images/Day.png")';
			case Time.NIGHT: return 'url("Images/Night.png")';
            case Time.DAY_CHILD: return 'url("Images/Day Child.png")';
            case Time.DAY_ADULT: return 'url("Images/Day Adult.png")';
            case Time.NIGHT_CHILD: return 'url("Images/Night Child.png")';
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

        // Interiors
        itemLocations = itemLocations.concat(this.getAllOwExits(mapName, regionName, true));

        // OW exits
        if (Settings.RandomizerSettings.shuffleOverworldEntrances || 
            Settings.RandomizerSettings.shuffleInteriorEntrances || 
            Settings.RandomizerSettings.shuffleDungeonEntrances ||
            Settings.RandomizerSettings.randomizeOwlDrops) {
            itemLocations = itemLocations.concat(this.getAllOwExits(mapName, regionName, false));
        }

        return itemLocations;
    },

    /**
     * Gets all the OW exits for the given map and region
     * @param mapName - the map - omit to get all
     * @param regionName - the region - omit to get all under the given map
     * @param getInteriors - whether to get interiors instead - false means get OwExits
     */
    getAllOwExits: function(mapName, regionName, getInteriors) {
        let itemLocations = [];
        Object.keys(OwExits).forEach(function(currentMap) {
            if (!mapName || mapName === currentMap) {
                Object.keys(OwExits[currentMap]).forEach(function(entranceName) {
                    let currentEntrance = OwExits[currentMap][entranceName];

                    if (getInteriors && currentEntrance.ItemGroup !== ItemGroups.ENTRANCE) {
                        return;
                    }

                    if (!getInteriors && currentEntrance.ItemGroup === ItemGroups.ENTRANCE) {
                        return;
                    }

                    if (!regionName || currentEntrance.ExitRegion === regionName) {
                        itemLocations = itemLocations.concat(currentEntrance);
                    }
                });
            }
        });

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
     * Gets all the entrances under the current map/region
     * @param mapName - the map name
     * @param regionName - the region name
     */
    getEntrancesFromMapAndRegion: function(mapName, regionName) {
        let itemLocations = [];
        Object.keys(OwExits[mapName]).forEach(function(entranceName) {
            let currentEntrance = OwExits[mapName][entranceName];
            if (currentEntrance.ItemGroup === ItemGroups.ENTRANCE && regionName === currentEntrance.ExitRegion) {
                itemLocations = itemLocations.concat(currentEntrance);
            }
        });
        return itemLocations;
    },

    /**
     * Returns whether we should display the item location
     * Checks for owls, dungeons, and OW entrances and adjusts based on their settings
     * If it's not any of those, will return true
     */
    shouldDisplayItemLocation: function(itemLocation) {
        if (itemLocation.IsOwl) {
            return Settings.RandomizerSettings.randomizeOwlDrops;
        }

        if (itemLocation.IsDungeonEntrance || itemLocation.IsDungeonExit) {
            return Settings.RandomizerSettings.shuffleDungeonEntrances;
        }

        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            return itemLocation.IsInteriorExit
                ? Settings.RandomizerSettings.shuffleInteriorEntrances
                : Settings.RandomizerSettings.shuffleOverworldEntrances;
        }

        return true;
    },

    /**
     * Sets up the default entrance group for the item, if applicable
     * @param itemLocation - the item location to check
     * @return - true if it is not applicable, or if it was set up correctly; false if we should disable the location
     */
    setUpDefaultEntranceGroup: function(itemLocation) {
        if (itemLocation.ItemGroup !== ItemGroups.ENTRANCE) 
        { 
            return true;
        }

        if (this.usesDefaultGroup(itemLocation)) {
            if (itemLocation.DefaultEntranceGroupName) {
                // Don't fill it more than once
                if (!itemLocation.DefaultEntranceGroup) {
                    EntranceUI.initializeEntranceGroupData(itemLocation, itemLocation.DefaultEntranceGroupName);
                }
                
                // If this is a grotto or interior that is NOT shuffled, don't show it if there's no tasks to complete
                if (itemLocation.IsGrotto || itemLocation.IsInterior) {
                    return EntranceUI.getNumberOfActiveButtons(itemLocation) > 0;
                }
                return true;
            }
            return false; // We use a default group but have no default group name, means it's not location we need to ever visit
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
        return MapAccessSets.TEMPLE_OF_TIME(otherAge);
    },

    /**
     * Checks whether it's possible to enter the door of time from the temple of time
     */
    canEnterDoorOfTime: function(age) {
		let canSkipAsChild = age === Age.CHILD && Settings.GlitchesToAllow.doorOfTimeSkip && Equipment.KOKIRI_SWORD.playerHas;
		let canSkipAsAdult = age === Age.ADULT && Settings.GlitchesToAllow.doorOfTimeSkip && 
            ItemData.canUse(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]);
		
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
     * This handles Ow -> Ow and Ow -> Interior/Grotto and the reverse
     * @param fromMapName - the map you're setting the info for
     * @param from - the item location of the exit you took
     * @param toMapName - the map you selected
     * @param toRegion - the region you selected
     * @param itemLocationName - the item location you're setting the info on
     * @param clear - whether we're only clearing the data
     * @returns - an object containing the toOwExit, fromOwExit, and oldOwexit
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
        let oldOwExit = null;
        if (!decoupledEntrances && fromOwExit.OwShuffleMap && fromOwExit.OwShuffleExitName) {
            if (!fromOwExit.OneWayEntrance && OwExits[fromOwExit.OwShuffleMap]) {
                oldOwExit = OwExits[fromOwExit.OwShuffleMap][fromOwExit.OwShuffleExitName];
                if (oldOwExit && oldOwExit.LinkedExit === fromReferenceKey) {
                    delete oldOwExit.OwShuffleMap;
                    delete oldOwExit.OwShuffleRegion;
                    delete oldOwExit.OwShuffleExitName;
                    delete oldOwExit.LinkedExit;

                    if (oldOwExit.EntranceGroup) {
                        delete oldOwExit.EntranceGroup;
                    }

                    SocketClient.itemLocationUpdated(oldOwExit);
                }
            }
        }

        delete fromOwExit.OwShuffleMap;
        delete fromOwExit.OwShuffleRegion;
        delete fromOwExit.OwShuffleExitName;
        delete fromOwExit.LinkedExit;

        // If we're only clearing data, stop here - no toOwExit data means we've entered <no selection>
        if (toOwExit && !clear) {
            // Set the from information
            fromOwExit.OwShuffleMap = toMapName;
            fromOwExit.OwShuffleRegion = toOwExit.ExitRegion;
            fromOwExit.OwShuffleExitName = toLocationName;

            // Set the to information, but only if this info doesn't already exist and we're not a one-way entrance
            // No need to set the other side info if we're decoupled
            if (!decoupledEntrances &&
                (!toOwExit.EntranceGroup || toOwExit.EntranceGroup.overworldLink) && // For entrance groups, ONLY set data if it's set to a group with an OW link
                (!toOwExit.LinkedExit || toOwExit.LinkedExit === fromReferenceKey)) {
                if (!fromOwExit.OneWayEntrance) {
                    fromOwExit.LinkedExit = toReferenceKey; // Only set this if we're linking the two
        
                    toOwExit.OwShuffleMap = fromMapName;
                    toOwExit.OwShuffleRegion = from.ExitRegion;
                    toOwExit.OwShuffleExitName = fromLocationName;
                    toOwExit.LinkedExit = fromReferenceKey;

                    // If set from an OW location TO an interior, we need to set the entrance group data
                    // so that it points to the from exit
                    if (fromOwExit.InteriorGroupName) {
                        // Here we set the TO exit to the group that just selected it
                        EntranceUI.initializeEntranceGroupData(toOwExit, fromOwExit.InteriorGroupName);
                    }

                    SocketClient.itemLocationUpdated(toOwExit);
                } 
            }
        }

        SocketClient.itemLocationUpdated(fromOwExit);

        return {
            toOwExit: toOwExit,
            fromOwExit: fromOwExit,
            oldOwExit: oldOwExit
        };
	},

    /**
     * TO BE CALLED BY THE CONSOLE FOR TESTING!
     * Sets the properties which allows the item location to skip all other checks
     */
    setItemLocationObtainable: function(itemLocation, shouldBeObtainableChild, shouldBeObtainableAdult) {
        itemLocation.OverrideObtainableChild = shouldBeObtainableChild;
        itemLocation.OverrideObtainableAdult = shouldBeObtainableAdult;

        SocketClient.itemLocationUpdated(itemLocation);
        refreshAll();
    },

    /**
     * Returns whether the Gerudo guards will capture you
     */
    areGerudoGuardsTame: function() {
		return Equipment.GERUDO_MEMBERSHIP_CARD.playerHas;
	},

    /**
     * Whether you can pass the Geurdo guards without using a sword
     */
    canStunOrPassGuardsAtDistance: function(age) {
        return Data.areGerudoGuardsTame() || 
            ItemData.canUse(age, Items.HOOKSHOT) || 
            ItemData.canUse(age, Items.FAIRY_BOW);
    },

    /**
     * Whether you can stun (or pass, if they are tamed) the Gerudo guards in the kitchen
     */
    canStunKitchenGuards: function(age) {
        return this.canStunOrPassGuardsAtDistance(age) ||
            (Settings.GlitchesToAllow.gfKitchenGuardsWithSword && ItemData.canUse(age, ItemSets.SWORDS));
    },
    
    /**
	 * Sets whether the item is obtained
     * Runs the PostObtain function if there is one
	 * @param itemLocation - The item
	 * @param isObtained - A boolean indicating whether it should be obtained
     * @param skipPostObtain - Whether to NOT call PostObtain (usually to handle these PostObtains that call this function)
     * @param fromSocketClient - Whether this call is from the socket client, so we don't loop forever
	 */
	setItemObtained: function(itemLocation, isObtained, skipPostObtain, fromSocketClient) {
		itemLocation.playerHas = !!isObtained;
        if (itemLocation.PostObtain && !skipPostObtain) {
            itemLocation.PostObtain(itemLocation.playerHas, fromSocketClient);
        }
    },
    
    /**
	 * Toggle whether an item was obtained
	 * @return The new state of the item
	 */
	toggleItemObtained: function(itemLocation) {
		let playerHas = !itemLocation.playerHas;
		return Data.setItemObtained(itemLocation, playerHas);
	},
    
    /**
     * Returns whether the given item location at the given map and region was obtained 
     */
    itemLocationObtained: function(mapName, regionName, itemLocationName) {
        let itemLocation = this.getItemLocation(mapName, regionName, itemLocationName);
        if (!itemLocation) {
            return false;
        }

		return itemLocation.playerHas;
	},

    /**
     * Gets the item location from the given map/region/name
     * @param {string} mapName - the map the item location is part of
     * @param {string} regionName - the region the item location is in
     * @param {string} itemLocationName - the name of the item location
     * @returne The associated item location - or null if not found
     */
    getItemLocation: function(mapName, regionName, itemLocationName) {
        let map = MapLocations[mapName];
        return map?.Regions?.[regionName]?.ItemLocations?.[itemLocationName];
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
     * Should be used to access the entrance group of the given item location
     * DO NOT access it directly, or there may be issues if interior shuffle is off...
     * @param itemLocation - the item location
     */
    getEntranceGroup: function(itemLocation) {
        if (!itemLocation || itemLocation.ItemGroup !== ItemGroups.ENTRANCE) { return null; }

        if (this.usesDefaultGroup(itemLocation)) {
            return itemLocation.DefaultEntranceGroup;
        }
        return itemLocation.EntranceGroup;
    },

    /**
     * Returns whether the given itemLocation will use the default entrance group
     * @param itemLocation - the item location
     * @returns - true if so; false otherwise
     */
    usesDefaultGroup: function(itemLocation) {
        let isInteriorAndUseDefault = !Settings.RandomizerSettings.shuffleInteriorEntrances && itemLocation.IsInterior;
        let isGrottoAndUseDefault = !Settings.RandomizerSettings.shuffleGrottoEntrances && itemLocation.IsGrotto;
        let isBossAndUseDefault = !Settings.RandomizerSettings.shuffleBossEntrances && itemLocation.IsBoss;
        let isItemLocationGroup = itemLocation.IsItemLocationGroup;
        return isInteriorAndUseDefault || isGrottoAndUseDefault || isBossAndUseDefault || isItemLocationGroup;
    },

    /**
     * Returns whether the item location is located in the OwExits object or not
     * This should be used anywhere possible for this in case this changes anymore!
     * @param itemLocation - The item location
     * @param requireActualOWExit - Whether we're checking for an actual OW exit (like Windmill, Dampe, or Thieve's Hideout)
     */
    usesOwExits: function(itemLocation, requireActualOWExit) {
        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            return true;
        }
        return (itemLocation.ItemGroup === ItemGroups.ENTRANCE && !itemLocation.IsItemLocationGroup) &&
            (!requireActualOWExit || itemLocation.LinkedExit);
    },

    /**
     * Returns whether the itemLocation is forcing a specific age to be used
     * Checks the map, region, and location itself
     * @param itemLocation - the item location to check
     * @param age - the age to check for
     * @returns The result, as a boolean
     */
    useSpecificAge: function(itemLocation, age) {
        // ItemLocations won't check for a specific age if it's not an EITHER location
        // We can't really check if an itemLocation is forcing EITHER! That doesn't make sense.
        if (itemLocation.Age !== Age.EITHER || age === Age.EITHER) { return false; }

        // If the other age can actually get the item, then we never want to mark it as this age only
        let otherAge = age === Age.CHILD ? Age.ADULT : Age.CHILD;
        if (this.getItemObtainability(itemLocation, otherAge) === ItemObtainability.YES) {
            return false;
        }

        // Gossip stones cannot be checked by adult if you must equip the mask of truth!
        if (age === Age.CHILD &&
            itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE && 
            Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH) {
            return true;
        }

        let propertyName = `Use${age}Age`;
        let isOwExit = this.usesOwExits(itemLocation);
        let mapName = isOwExit ? itemLocation.ExitMap : itemLocation.Map;
        let map = MapLocations[mapName];

        if (map[propertyName] && map[propertyName]()) {
            return true;
        }

        let regionName = isOwExit ? itemLocation.ExitRegion : itemLocation.Region;
        let region = map.Regions[regionName];
        if (region[propertyName] && region[propertyName]()) {
            return true;
        }

        return itemLocation[propertyName] && itemLocation[propertyName]();
    },

    /**
     * Calculates whether you can get the given item/go to the given region at the given age
     * This assumes that you can already gain access to the region it is in
     * @param itemLocation - the item location data - this may be an item or a region
     * @param age - the age
     * @param mainItemLocation - used with entrance data to compute shop item obtainability
     */
    calculateObtainability: function(itemLocation, age, mainItemLocation) {
        // If this is a spawn location, and you can get the item, no need to check anything else
        if (this._isSpawnItemAndCanGet(age, itemLocation)) {
            return ItemObtainability.YES;
        }

        if ((age === Age.CHILD && itemLocation.OverrideObtainableChild) ||
            (age === Age.ADULT && itemLocation.OverrideObtainableAdult)) {
                return ItemObtainability.YES;
        }
		
        if (!this._isCorrectAge(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._passesNeededRequirements(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._passesCustomRequirement(age, itemLocation)) { return ItemObtainability.NO; }
		if (!this._canDoItemGroup(age, itemLocation, mainItemLocation)) { return ItemObtainability.NO; }
		if (!this.canPlantBean(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._checkKeyRequirement(age, itemLocation)) { return ItemObtainability.NO; }
        if (!this._checkSilverRupeeRequirement(itemLocation)) { return ItemObtainability.NO; }

        return ItemObtainability.YES;
    },

    /**
     * Checks the needs properties on the given item location
     * The format consist of arrays of checks, which can contain arrays (see ItemData.canUse)
     * - Needs: All requirements are fullfilled
     * - NeedsAny: Any one of the given requirements are fulfilled
     * - [Child|Adult]Needs: Needs, but only applies to the given age
     * - [Child|Adult]NeedsAny: NeedsANy, but only applies to the given age
     * @param age - The age to check
     * @param itemLocation - The item location to check
     * @returns True of all properties pass
     */
    _passesNeededRequirements: function(age, itemLocation) {
        let passesCheck = true;
        ["Needs", "NeedsAny", "ChildNeeds", "ChildNeedsAny", "AdultNeeds", "AdultNeedsAny"].forEach((needsProperty) => {
            if (!passesCheck || 
                age === Age.CHILD && needsProperty.startsWith("Adult") ||
                age === Age.ADULT && needsProperty.startsWith("Child")) 
            { 
                return; 
            }

            let needsValue = itemLocation[needsProperty];
            if (!needsValue) { return; }
            if (!Array.isArray(needsValue)) {
                console.log(`ERROR: Unexpected Needs format when parsing item location: ${itemLocation.Name}`);
                return;
            }

            passesCheck = needsProperty.endsWith("Any")
                ? ItemData.canUseAny(age, needsValue)
                : ItemData.canUse(age, needsValue);
        });

        return passesCheck;
    },

    /**
     * Checks whether this is at a location that you can spawn or warp to and that you can get the item there
     */
    _isSpawnItemAndCanGet: function(age, itemLocation) {
        if (RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, age)) {
            if (!itemLocation.PostSpawnRequirements || itemLocation.PostSpawnRequirements(age)) {
                if (this.isItemLocationAShop(itemLocation)) {
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
     * @param itemLocation - the item location data - this may be an item or a region
     * @param age - the age
     * @param mainItemLocation - used with entrance data to compute shop item obtainability
     */
    _canDoItemGroup: function(age, itemLocation, mainItemLocation) {
		if (itemLocation && itemLocation.OverrideItemGroupCondition) { return true; }
		
        let itemGroup = itemLocation.OverrideItemGroup
            ? itemLocation.OverrideItemGroup
            : itemLocation.ItemGroup;
		switch (itemGroup) {
			case ItemGroups.COW:
				return this.canMilkCows();
			case ItemGroups.SKULLTULA:
				return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS);
			case ItemGroups.SCRUB:
				return this.canBuyFromScrub(age);
            case ItemGroups.BEEHIVE:
                return this.canBreakBeehive(age, itemLocation.IsUpperHive);
            case ItemGroups.SHOP:
                let shopItemLocation = itemLocation.notes
                    ? itemLocation
                    : mainItemLocation;
                return this.canBuyFromShop(age, shopItemLocation);
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
        let group = this.getEntranceGroup(itemLocation);
		return !!(itemLocation.ItemGroup === ItemGroups.SHOP || (group && group.isShop));
    },
    
    /**
     * Returns whether the item location is a gossip stone - this includes main item locations and entrance groups
     * This forces a boolean return value
     */
    isItemLocationAGossipStone: function(itemLocation) {
        let group = this.getEntranceGroup(itemLocation);
		return !!(itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE || 
			(
				Settings.RandomizerSettings.gossipStoneSetting !== GossipStoneSettings.HIDE &&
				group && 
				group.hasGossipStone
			));
	},

    /**
     * Returns whether you can open the locked door
     * Checks whether you can get to the region and whether you have the max required keys to open it
     */
    canOpenLockedDoor: function(age, itemLocation) {
        if (!itemLocation.Regions) { return false; }

        let map = itemLocation.Map;
        if (this.getRemainingKeys(map) < 1) {
            return false;
        }

        if (ItemData.getKeyCount(map) < itemLocation.KeyRequirement(age).min) {
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
     * Gets the number of remaining keys in the given map, based on the locked doors the
     * player has opened
     */
    getRemainingKeys: function(mapName) {
        let usedKeys = 0;
        let mainItemLocations = MapLocations[mapName].Regions.main.ItemLocations;
        Object.values(mainItemLocations).forEach(function (itemLocation) {
            if (itemLocation.ItemGroup === ItemGroups.LOCKED_DOOR && itemLocation.playerHas) {
                usedKeys++;
            }
        });
        return ItemData.getKeyCount(mapName) - usedKeys;
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
     * Checks the item location to see if a bean was planted there
     * @param {string} mapName - the map the item location is part of
     * @param {string} regionName - the region the item location is in
     * @param {string} itemLocationName - the name of the item location
     */
    isBeanPlanted: function(mapName, regionName, itemLocationName) {
        let itemLocation = this.getItemLocation(mapName, regionName, itemLocationName);

        let magicBeanLocation = itemLocation?.DefaultEntranceGroup?.buttons?.["Magic Bean"];
        if (!magicBeanLocation) {
            console.log(`WARNING: Magic bean item structure incorrect at ${mapName} - ${regionName} - ${itemLocation?.Name}`);
            return false;
        }

        return Settings.RandomizerSettings.autoPlantBeans || magicBeanLocation.completed;
    },

    /**
     * Returns whether the player can buy from the given shop
     * Takes the item prices from the notes into account
     */
    canBuyFromShop: function(age, itemLocation) {
		if (itemLocation?.notes) {
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
                    let itemKey = item.split("//")[0].trim().replaceAll(" ", "").replaceAll("*", "").replaceAll("'", "");
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
		return ItemData.canUseAny(age, 
            [ItemSets.DAMAGING_ITEMS, Items.DEKU_NUT, ItemSets.SHIELDS, ItemSets.EXPLOSIVES, ItemSets.FIRE_ITEMS]);
    },

    /**
     * Returns whether the player can break a beehive that's high up
     * @param {Age} age - The age to check
     * @param {Boolean} isUpperHive - Whether bombs can reach it and whether you need the bombchu trick for it
     */
    canBreakBeehive: function(age, isUpperHive) {
        let canBreakWithBombs = Settings.GlitchesToAllow.breakBeehivesWithBombs && Items.BOMB.playerHas;
        if (!isUpperHive && canBreakWithBombs) {
            return true;
        }

        let canBreakWithChus = Settings.GlitchesToAllow.breakBeehivesWithChus && Items.BOMBCHU.playerHas;
        return canBreakWithChus || ItemData.canUseAny(age, [Items.BOOMERANG, Items.HOOKSHOT]);
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
				return ItemData.canUse(age, ChildTradeItems.MASK_OF_TRUTH);
			default:
				return true;
		}
	},
    
    /**
     * Returns whether the player can milk cows
     */
	canMilkCows: function() {
		return this.canPlaySong(Songs.EPONAS_SONG);
    },
    
    /**
     * Returns whether the player can play the given song
     * @param song - the song to check
     */
    canPlaySong: function(song) {
		return this.canPlaySongs() && song.playerHas && ItemData.hasAllSongNotes(song);
    },
    
    /**
     * Returns whether the player has the ability to play songs, includes OI and actually having the ocarina
     */
    canPlaySongs: function() { //TODO: need to add age to check for OI item to actually play...
		return Items.OCARINA.playerHas || 
            (Settings.GlitchesToAllow.ocarinaItems && this.hasOcarinaItemsBottle());
    },
    
    /**
     * Returns whether the player has an empty bottle
     * Handles checks on whether bottles that cannot be emptied are present
     */
	hasBottle: function() {
        return ItemData.getEmptyBottleCount(true) > 0;
    },

    /**
     * Whether the player has the bottled items required to do the OI glitch
     */
    hasOcarinaItemsBottle: function() {
        return this.hasBottle() && (Items.BUGS.playerHas || Items.FISH.playerHas);
    },

    /**
     * Returns whether the player has the actual blue fire item or an empty bottle
     */
    hasBottleOrBlueFire: function(age) {
        return this.hasBottle() || ItemData.canUse(age, ItemSets.BLUE_FIRE_ITEMS);
    },

    /**
     * MQ ice cavern requires either two bottles or the ability to use ice arrows in order to get some checks
     * This check assumes that you already have access to blue fire!
     */
     canOIAndBlueFireWithoutRefilling: function(age) {
        let bottleCount = ItemData.getEmptyBottleCount(true);
        let canUseIceArrows = ItemData.canUse(age, Items.ICE_ARROW);
        let canDoOI = Settings.GlitchesToAllow.ocarinaItems;
        return canDoOI && ((bottleCount >= 1 && canUseIceArrows) || bottleCount > 1);
    },

    /**
     * Returns whether the player can do a shield turn
     */
    canShieldTurn: function(age) {
        // Child CAN use Hylian Shield for this use case
        return ItemData.canUse(age, ItemSets.SHIELDS) || Equipment.HYLIAN_SHIELD.playerHas;
    },
    
    /**
     * Returns whether the player can equip swap items - this will ONLY care about 
     * child equpping hammer/adult trade item, and adult equipping sticks/boomerang, 
     * since that's all that's useful at the moment
     * https://www.zeldaspeedruns.com/mm/tech/equip-swap#:~:text=Equip%20Swap%20can%20equip%20items,and%20the%20Light%20Arrow%20slot
     * 
     * Logic:
     * - From whatever side you are equip swapping, the FIRST item in the FIRST column that has items
     *   needs to be equippable
     * - Thus, a child trade item forces Adult to require a magic spell to equip swap from the right
     * - Also, any left-side child items will completely block him from equip swapping from the left
     */
    canEquipSwap: function(age) {
		if (!Settings.GlitchesToAllow.equipSwap) { return false; }

        // The legacy logic, in case things change or it's needed
        let useLegacyLogic = false;
        if (useLegacyLogic) {
            return Boolean(Items.DINS_FIRE.playerHas || (age === Age.CHILD && Items.DEKU_STICK.playerHas));
        }

        let bottleCount = ItemData.getEmptyBottleCount();
        let hasChildTradeItem = ItemData.hasChildTradeItem();

        // Hammer/adult trade items are the only things that are useful for Child to equip swap
        if (age === Age.CHILD) {
            //- From the left:
            if (bottleCount > 0 || 
                Items.DEKU_STICK.playerHas || Items.DEKU_NUT.playerHas || Items.BOMB.playerHas ||
                Items.FAIRY_SLINGSHOT.playerHas || Items.OCARINA.playerHas || Items.BOMBCHU.playerHas ||
                Items.BOOMERANG.playerHas || Items.LENS_OF_TRUTH.playerHas || Items.MAGIC_BEAN.playerHas)
            {
                return true;
            }

            //- From the right:
            return hasChildTradeItem ||
                Items.DINS_FIRE.playerHas || 
                Items.FARORES_WIND.playerHas || 
                Items.NAYRUS_LOVE.playerHas;
        }

        // Adult can only make use of sticks/boomerang/slingshot/child trade item, so no need to check the left side

        //- The magics are always good to equip swap with
        if (Items.DINS_FIRE.playerHas || 
            Items.FARORES_WIND.playerHas || 
            Items.NAYRUS_LOVE.playerHas) {
            return true;
        }

        //- The child trade item will block adult from equip swapping at this point
        if (hasChildTradeItem) {
            return false;
        }

        //- Otherwise, check all the items until the magic beans, which is another blocker
        if (bottleCount > 3 || 
            ItemData.hasAdultTradeItem() ||
            Items.FIRE_ARROW.playerHas || Items.ICE_ARROW.playerHas || Items.LIGHT_ARROW.playerHas ||
            Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas || Items.MEGATON_HAMMER.playerHas ||
            Items.BOMB.playerHas || Items.BOMBCHU.playerHas)
        {
            return true;
        }

        //- If there's beans, then that's it
        if (Items.MAGIC_BEAN.playerHas) {
            return false;
        }

        //- Otherwise, keep going until the first column
        return bottleCount > 1 || // Any bottle outside of column 1 works
            Items.DEKU_NUT.playerHas || Items.OCARINA.playerHas || Items.LENS_OF_TRUTH.playerHas;
    },

    /**
     * Returns whether the player summon and can hook a scarecrow
     */
    canHookScarecrow: function(age, useLongshot) {
        let item = useLongshot ? UpgradedItems.LONGSHOT : Items.HOOKSHOT;
		return ItemData.canUse(age, [item, Songs.SCARECROWS_SONG]);
	},
    
    /**
     * Returns whether you can ride epona
     */
    canRideEpona: function(age) {
		if (age === Age.CHILD) { return false; }
		
		let canPlaySong = Data.canPlaySong(Songs.EPONAS_SONG) && Items.OCARINA.playerHas; // Actual ocarina required, even in race skip
		let canStealEpona = !Settings.RandomizerSettings.shuffleOverworldEntrances &&
			Settings.GlitchesToAllow.eponaHover && 
            ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]);
		
		return canPlaySong || canStealEpona;
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

        let map = itemLocation.Map;
        if (this.getRemainingKeys(map) < 1) {
            return ItemObtainability.NO; // No keys left to open any doors!
        }
        
        let keyReq = lockedDoor.KeyRequirement(age);
        let currentKeyCount = ItemData.getKeyCount(map);
		if (currentKeyCount < keyReq.max) { return ItemObtainability.NO; }
		return ItemObtainability.YES; 
	},

    /**
     * Checks whether the item location passes the silver rupee requirement
     * @param itemLocation - the item location to check
     * @returns - the appropriate ItemObtainability
     */
    _checkSilverRupeeRequirement: function(itemLocation) {
        if (itemLocation && (!itemLocation.SilverRupeeIndex && itemLocation.SilverRupeeIndex !== 0)) {
            return ItemObtainability.YES;
        }

        if (!Settings.RandomizerSettings.shuffleSilverRupees) {
            return ItemObtainability.YES;
        }

        return ItemData.checkSilverRupeeRequirement(itemLocation.Map, itemLocation.SilverRupeeIndex);
    },

	/**
	 * Gets whether entrance shuffle applies to the given location name
	 * @param locationName - the location name
	 * @param checkForOverworld - true if we want to check for overworld entrances; only does dungeon by default
	 * @return - true if so, false otherwise
	 */
	getDoesEntranceShuffleApply: function(locationName, checkForOverworld) {
		let mapInfo = MapLocations[locationName];
		if (!mapInfo) { return false; }
		
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
                let doesAgeFailUseAgeReq = (age === Age.CHILD && Data.useSpecificAge(itemLocation, Age.ADULT)) ||
                    (age === Age.ADULT && Data.useSpecificAge(itemLocation, Age.CHILD));
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
                        let group = _this.getEntranceGroup(itemLocation);
						if (group) {
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
        let entranceGroup = this.getEntranceGroup(itemLocation);
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
    }
};