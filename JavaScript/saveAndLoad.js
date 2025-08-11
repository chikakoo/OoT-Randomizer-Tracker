let SaveAndLoad = {
    currentlyLoading: false,

    /**
     * Saves the state of the current game by downloading a JSON file
     */
    saveJSON: function() {
        let saveFileName = Settings.TrackerSettings.saveFileName.trim() === ""
            ? "OoT Tracker Save"
            : Settings.TrackerSettings.saveFileName;

        let exportObj = this._getSaveObject();
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
        let downloadAnchorNode = document.createElement('a');

        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${saveFileName}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    },

    /** 
     * Creates the save object
     */
    _getSaveObject: function() {
        let objectToSave = {
            MapLocationData: this._getMapLocationDataToSave(MapLocations, true),
            StandardDungeonData: this._getMapLocationDataToSave(StandardDungeons),
            MQDungeonData: this._getMapLocationDataToSave(MQDungeons),
            EntranceShuffleData: this._getEntranceShuffleDataToSave(),
            RandomizedSpawnLocations: Data.randomizedSpawnLocations,
            Settings: Settings,
            Tricks: this._getTrickSaveObject(),
            Items: Items,
            ChildTradeItems: ChildTradeItems,
            AdultTradeItems: AdultTradeItems,
            Equipment: Equipment,
            Medallions: Medallions,
            Songs: Songs,
            Keys: this._getKeyDataToSave(),
            SilverRupees: this._getSilverRupeeDataToSave(),
            OcarinaButtons: OcarinaButtons
        }

        return objectToSave;
    },

    _getMapLocationDataToSave: function(mapObject, skipDungeons) {
        let dataToSave = {
            // MapName: {
            //  IsInUse: bool (used by MQ dungeons)
            //  RegionName: {
            //      ItemLocations: {
            //          ItemLocationName: {
            //              playerHas: bool
            //              notes: string,
            //              owShuffleMap: string,
            //              owShuffleRegion: string,
            //              EntranceGroup: {},
            //              DefaultEntranceGroup: {},
            //              overrideObtainableChild: boolean,
            //              overrideObtainableAdult: boolean
            //  }}}
        };
        Object.keys(mapObject).forEach(function(mapName) {
            let mapInfo = mapObject[mapName];
            if (skipDungeons && mapInfo.MapGroup === MapGroups.DUNGEONS) { return; }

            let currentMapData;
            if (mapInfo.IsInUse) {
                currentMapData = currentMapData || {};
                currentMapData.IsInUse = true;
            }

            Object.keys(mapInfo.Regions).forEach(function(regionName) {
                Object.keys(mapInfo.Regions[regionName].ItemLocations).forEach(function(itemLocationName){
                    let itemLocation = mapInfo.Regions[regionName].ItemLocations[itemLocationName];
                    let playerHas = itemLocation.playerHas;
                    let notes = itemLocation.notes;
                    let owShuffleMap = itemLocation.OwShuffleMap;
                    let owShuffleRegion = itemLocation.OwShuffleRegion;
                    let entranceGroup = itemLocation.EntranceGroup;
                    let defaultEntranceGroup = itemLocation.DefaultEntranceGroup;
                    let overrideObtainableChild = itemLocation.OverrideObtainableChild;
                    let overrideObtainableAdult = itemLocation.OverrideObtainableAdult;

                    let relevantDefaultEntranceGroup = defaultEntranceGroup && 
                        Object.values(defaultEntranceGroup.buttons).some(button => button.completedCount > 0);
                    if (playerHas || notes || owShuffleMap || owShuffleRegion || entranceGroup || relevantDefaultEntranceGroup || overrideObtainableChild || overrideObtainableAdult) {
                        currentMapData = currentMapData || {};
                        currentMapData.Regions = currentMapData.Regions || {};
                        currentMapData.Regions[regionName] = currentMapData.Regions[regionName] || {};
                        currentMapData.Regions[regionName].ItemLocations = currentMapData.Regions[regionName].ItemLocations || {};
                        currentMapData.Regions[regionName].ItemLocations[itemLocationName] = currentMapData.Regions[regionName].ItemLocations[itemLocationName] || {};
                        
                        let currentObj = currentMapData.Regions[regionName].ItemLocations[itemLocationName];
                        if (playerHas) { currentObj.playerHas = playerHas; }
                        if (notes) { currentObj.notes = notes; }
                        if (owShuffleMap) { currentObj.OwShuffleMap = owShuffleMap; }
                        if (owShuffleRegion) { currentObj.OwShuffleRegion = owShuffleRegion; }
                        if (entranceGroup) { currentObj.EntranceGroup = entranceGroup; }
                        if (relevantDefaultEntranceGroup) { currentObj.DefaultEntranceGroup = defaultEntranceGroup; }
                        if (overrideObtainableChild) { currentObj.OverrideObtainableChild = overrideObtainableChild; }
                        if (overrideObtainableAdult) { currentObj.OverrideObtainableAdult = overrideObtainableAdult; }
                    }
                });
            });

            if (currentMapData) {
                dataToSave[mapName] = currentMapData;
            }
        });

        return dataToSave;
    },

    /**
     * Gets the OwExit data to save
     * This is solely for OW entrance shuffle data - this saves data as such:
        let example = {
            OwExitData: {
                MapName: {
                    ExitName: {
                        LinkedExit: string,
                        OwShuffleExitName: string,
                        OwShuffleMap: string,
                        OwShuffleRegion: string
                        notes: string,
                        entranceGroup: {},
                        defaultEntranceGroup: {},
                        playerHas: boolean,
                        OverrideableObtainableChild: boolean,
                        OverrideableObtainableAdult: boolean
                    }
                }
            }
        }
     * 
     */
    _getEntranceShuffleDataToSave: function() {
        let owExitData = {};
        Object.keys(OwExits).forEach(function(mapName) {
            Object.keys(OwExits[mapName]).forEach(function(exitName) {
                let exit = OwExits[mapName][exitName];
                let shouldSave = (exit.OwShuffleMap && exit.OwShuffleRegion) || 
                    exit.notes || 
                    exit.EntranceGroup || 
                    exit.DefaultEntranceGroup || 
                    exit.playerHas ||
                    exit.OverrideObtainableChild ||
                    exit.OverrideObtainableAdult;

                if (shouldSave) {
                    owExitData[mapName] = owExitData[mapName] || {};
                    owExitData[mapName][exitName] = {
                        LinkedExit: exit.LinkedExit,
                        OwShuffleExitName: exit.OwShuffleExitName,
                        OwShuffleMap: exit.OwShuffleMap,
                        OwShuffleRegion: exit.OwShuffleRegion,
                        notes: exit.notes,
                        EntranceGroup: exit.EntranceGroup,
                        DefaultEntranceGroup: exit.DefaultEntranceGroup,
                        playerHas: exit.playerHas,
                        OverrideObtainableChild: exit.OverrideObtainableChild,
                        OverrideObtainableAdult: exit.OverrideObtainableAdult
                    }
                }
            });
        });

        return {
            OwExitData: owExitData
        }
    },

    /**
     * Gets all enabled tricks - we save the keys in an array, and turn only them on
     * when a save is loaded
     */
    _getTrickSaveObject: function() {
        let trickSaveObject = {};
        Object.keys(Tricks).forEach(trickKey => {
            trickSaveObject[trickKey] = Tricks[trickKey].enabled
        })
        return trickSaveObject;
    },
    
    /**
     * Gets the data to save for the keys the player has
     */
    _getKeyDataToSave: function() {
    	let keyData = {};
    	Object.keys(Keys).forEach(function(key) {
    		currentDataObject = Keys[key];
    		if (currentDataObject.keyCount) {
    			keyData[key] = keyData[key] || {};
    			keyData[key].keyCount = currentDataObject.keyCount;
    		}
    		if (currentDataObject.playerHas) {
    			keyData[key] = keyData[key] || {};
    			keyData[key].playerHas = currentDataObject.playerHas;
    		}
    	});
    	return keyData;
    },

    /**
     * Gets the data to save for the silver rupees the player has
     */
    _getSilverRupeeDataToSave: function() {
        let silverRupeeData = {};
        Object.keys(SilverRupees).forEach(function(key) {
            currentDataObject = SilverRupees[key];
            if (currentDataObject.collectedRupees) {
                silverRupeeData[key] = {
                    collectedRupees: currentDataObject.collectedRupees
                };
            }
        });
        return silverRupeeData;
    },

    /**
     * Loads a JSON file from your filesystem
     */
    loadJSON: function() {
        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }

        let input = document.getElementById('fileInput');
        if (input) { input.remove(); }

        input = dce("input", "nodisp");
        input.id = "fileInput";
        input.type = "file";
        input.onchange = this.onFileUploaded.bind(this);
        document.body.appendChild(input);

        input.click(); // Select a file
    },

    onFileUploaded: function() {
       let  input = document.getElementById('fileInput');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            let fr = new FileReader();
            fr.onload = this._onFileLoaded.bind(this);
            fr.readAsText(file);
        }
    },

    /**
     * Called when the file is loaded
     */
    _onFileLoaded: function(event) {
        let lines = event.target.result;
        let loadedObject = JSON.parse(lines); 
    
        this.currentlyLoading = true;

        if (loadedObject[":version"]) {
            this._loadSpoilerLog(loadedObject);
        } else {
            this._loadSaveFile(loadedObject);
        }
    },
    
    /**
     * Loads the save file
     * @param loadedObject - the loaded file data
     */
    _loadSaveFile: function(loadedObject) {
        if (loadedObject.Settings) { Settings = loadedObject.Settings; }
        if (loadedObject.Tricks) { this._loadTricks(loadedObject.Tricks); }
        if (loadedObject.Items) { this._loadItemObject(Items, loadedObject.Items); }
        if (loadedObject.ChildTradeItems) { this._loadItemObject(ChildTradeItems, loadedObject.ChildTradeItems); }
        if (loadedObject.AdultTradeItems) { this._loadItemObject(AdultTradeItems, loadedObject.AdultTradeItems); }
        if (loadedObject.Equipment) { this._loadItemObject(Equipment, loadedObject.Equipment); }
        if (loadedObject.Medallions) { this._loadItemObject(Medallions, loadedObject.Medallions); }
        if (loadedObject.Songs) { this._loadItemObject(Songs, loadedObject.Songs); }
        if (loadedObject.Keys) { this._loadItemObject(Keys, loadedObject.Keys); }
        if (loadedObject.SilverRupees) { this._loadItemObject(SilverRupees, loadedObject.SilverRupees); }
        if (loadedObject.OcarinaButtons) { this._loadItemObject(OcarinaButtons, loadedObject.OcarinaButtons); }

        Data.randomizedSpawnLocations = loadedObject.RandomizedSpawnLocations;

        // For legacy reasons, set the third parameter to whether there are standard dungeons saved
        this._loadMapDataObject(MapLocations, loadedObject.MapLocationData, loadedObject.StandardDungeonData);
        this._loadMapDataObject(StandardDungeons, loadedObject.StandardDungeonData);
        this._loadMapDataObject(MQDungeons, loadedObject.MQDungeonData);
        
        // Now, toggle all and load the appropriate master quest maps
        addAllStandardDungeons();

        let mqSetting = Settings.RandomizerSettings.dungeonSetting;
        if (MQDungeons && mqSetting !== DungeonSettings.STANDARD) {
            Object.keys(MQDungeons).forEach(function(mapName) {
                if ((loadedObject.MQDungeonData[mapName] && loadedObject.MQDungeonData[mapName].IsInUse) || 
                    mqSetting === DungeonSettings.MASTER_QUEST) {
                    toggleDungeonMapType(mapName);
                    MQDungeons[mapName].IsInUse = true;
                }
            });
        }

        // Load the entrance shuffle data
        this._loadEntranceShuffleData(loadedObject.EntranceShuffleData);

        ItemTracker.setUp();
        purgeLocations();
        
        LockedDoorWalker.computeAll();
        refreshAll();
        ItemLocationDisplay.displayLocation("Kokiri Forest");

        this.currentlyLoading = false;
        SocketClient.syncAll(); // Sync to all clients if in co-op mode
        alert("File loaded successfully!");
    },

    _loadTricks: function(loadedTrickObject) {
        Object.keys(Tricks).forEach(trickKey => {
            Tricks[trickKey].enabled = loadedTrickObject[trickKey] || false;
        });
    },

    _loadMapDataObject: function(currentObject, loadedObject, skipDungeons) {
        if (loadedObject) {
            let _this = this;
            Object.keys(loadedObject).forEach(function(mapName) {
                let loadedMapInfo = loadedObject[mapName];
                if (!loadedMapInfo) { return; } // Didn't load any info for this map
                if (skipDungeons && loadedMapInfo.MapGroup === MapGroups.DUNGEONS) { return; }
                if (!loadedMapInfo.Regions) { return; } // In this case, we have a dungeon that doesn't have any items changed
                
                Object.keys(loadedMapInfo.Regions).forEach(function(regionName) {
                    Object.keys(loadedMapInfo.Regions[regionName].ItemLocations).forEach(function(itemLocationName) {
                        let loadedItemLocationInfo = loadedMapInfo.Regions[regionName].ItemLocations[itemLocationName];
                        let itemLocation = currentObject[mapName].Regions[regionName].ItemLocations[itemLocationName];

                        if (loadedItemLocationInfo.playerHas) {
                            if (!itemLocation) {
                                console.log(`ERROR: item location at map/region/name does not exist: ${mapName}/${regionName}/${itemLocationName}`);
                            }
                            itemLocation.playerHas = loadedItemLocationInfo.playerHas;
                        }
    
                        if (loadedItemLocationInfo.notes) {
                            itemLocation.notes = loadedItemLocationInfo.notes;
                        }
                        
                        if (loadedItemLocationInfo.EntranceGroup) {
                            _this._loadEntranceGroupData(itemLocation, loadedItemLocationInfo, false);
                        }

                        if (loadedItemLocationInfo.DefaultEntranceGroup) {
                            _this._loadEntranceGroupData(itemLocation, loadedItemLocationInfo, true);
                        }

                        if (loadedItemLocationInfo.OwShuffleMap) {
                            itemLocation.OwShuffleMap = loadedItemLocationInfo.OwShuffleMap;
                        }

                        if (loadedItemLocationInfo.OwShuffleRegion) {
                            itemLocation.OwShuffleRegion = loadedItemLocationInfo.OwShuffleRegion;
                        }

                        if (loadedItemLocationInfo.OverrideObtainableChild) {
                            itemLocation.OverrideObtainableChild = loadedItemLocationInfo.OverrideObtainableChild;
                        }

                        if (loadedItemLocationInfo.OverrideObtainableAdult) {
                            itemLocation.OverrideObtainableAdult = loadedItemLocationInfo.OverrideObtainableAdult;
                        }

                        EntranceData.runPostClicks(itemLocation);
                    });
                });
            });
        }
    },

    _loadEntranceGroupData(itemLocation, loadedItemLocationInfo, isDefaultGroup) {
        let property = isDefaultGroup ? "DefaultEntranceGroup" : "EntranceGroup";
        itemLocation[property] = loadedItemLocationInfo[property];

        let interiorObj = Data.isNonItemGroupEntrance(itemLocation)
            ? EntranceUI.getEntranceData(itemLocation)
            : null;
        
        if (interiorObj && interiorObj[itemLocation[property].name].postClick) {
            interiorObj[itemLocation[property].name].postClick(itemLocation, true);
        }
    },

    _loadItemObject: function(currentObject, loadedObject) {
        Object.keys(currentObject).forEach(function(currentObjectKey) {
            let loadedObjectValue = loadedObject[currentObjectKey];
            let currentObjectValue = currentObject[currentObjectKey];
            if (loadedObjectValue) {
                if (loadedObjectValue.playerHas) { currentObjectValue.playerHas = true; }
                if (loadedObjectValue.keyCount) { currentObjectValue.keyCount = loadedObjectValue.keyCount; }
                if (loadedObjectValue.collectedRupees) { currentObjectValue.collectedRupees = loadedObjectValue.collectedRupees; }
                if (loadedObjectValue.warpMap) { currentObjectValue.warpMap = loadedObjectValue.warpMap; }
                if (loadedObjectValue.warpRegion) { currentObjectValue.warpRegion = loadedObjectValue.warpRegion; }
                if (loadedObjectValue.noWarp) { currentObjectValue.noWarp = loadedObjectValue.noWarp; }
                if (loadedObjectValue.songNotes !== undefined) { currentObjectValue.songNotes = loadedObjectValue.songNotes; }
                if (loadedObjectValue.entranceName) { currentObjectValue.entranceName = loadedObjectValue.entranceName; }
                if (loadedObjectValue.count > 0) { currentObjectValue.count = loadedObjectValue.count; }

                let currentUpgrade = loadedObjectValue.currentUpgrade;
                if (currentUpgrade >= 0) { currentObjectValue.currentUpgrade = currentUpgrade; }
            }
        });
    },

    _loadEntranceShuffleData: function(entranceShuffleData) {
        Object.keys(entranceShuffleData.OwExitData).forEach(function(mapName) {
            Object.keys(entranceShuffleData.OwExitData[mapName]).forEach(function(exitName) {
                let loadedOwExitData = entranceShuffleData.OwExitData[mapName][exitName];
                let exitingExitData = OwExits[mapName][exitName] || {};

                if (loadedOwExitData.OwShuffleMap) {
                    exitingExitData.LinkedExit = loadedOwExitData.LinkedExit;
                    exitingExitData.OwShuffleExitName = loadedOwExitData.OwShuffleExitName;
                    exitingExitData.OwShuffleMap = loadedOwExitData.OwShuffleMap;
                    exitingExitData.OwShuffleRegion = loadedOwExitData.OwShuffleRegion;
                }

                if (loadedOwExitData.notes) {
                    exitingExitData.notes = loadedOwExitData.notes;
                }

                if (loadedOwExitData.EntranceGroup) {
                    exitingExitData.EntranceGroup = loadedOwExitData.EntranceGroup;

                    let interiorObj = Data.isNonItemGroupEntrance(exitingExitData)
                        ? EntranceUI.getEntranceData(exitingExitData)
                        : null;

                    if (interiorObj && interiorObj[loadedOwExitData.EntranceGroup.name].postClick) {
                        interiorObj[loadedOwExitData.EntranceGroup.name].postClick(exitingExitData, true);
                    }
                }

                if (loadedOwExitData.DefaultEntranceGroup) {
                    exitingExitData.DefaultEntranceGroup = loadedOwExitData.DefaultEntranceGroup;
                }

                if (loadedOwExitData.playerHas) {
                    exitingExitData.playerHas = loadedOwExitData.playerHas;
                }

                if (loadedOwExitData.OverrideObtainableChild) {
                    exitingExitData.OverrideObtainableChild = loadedOwExitData.OverrideObtainableChild;
                }

                if (loadedOwExitData.OverrideObtainableAdult) {
                    exitingExitData.OverrideObtainableAdult = loadedOwExitData.OverrideObtainableAdult;
                }

                EntranceData.runPostClicks(exitingExitData);
            });
        });
    },

    /**
     * Fills each location with what item is contained at which location in the notes
     * Includes filling out shuffled entrances/interiors/overworld exits
     * @param {any} spoilerLogData: The loaded spoiler log data
     */
    _loadSpoilerLog: function(spoilerLogData) {
        SpoilerLogItemMap = {};

        this._setDungeonTypes(spoilerLogData);
        this._populateSpoilerLogExitMap();

        // Fill all entrance data first first
        // TODO: interior/grotto/ow + make more generic
        _this = this;
        Object.keys(spoilerLogData.entrances).forEach(entrance => {
            if (SpoilerLogInteriorMap[entrance]) {
                let exitToModify = SpoilerLogInteriorMap[entrance];
                let spoilerExitLeadsTo = spoilerLogData.entrances[entrance];
                let exitLeadsTo = SpoilerLogInteriorEntranceMap[_this._getSpoilerLogLocationKey(spoilerExitLeadsTo)]; 

                if (!exitLeadsTo) { 
                    // TODO: log an error here saying there's an 
                    // unmapped exit in the interior entrance map
                    return; 
                }

                if (exitLeadsTo.entranceGroup) {
                    EntranceUI.initializeEntranceGroupData(exitToModify, exitLeadsTo.entranceGroup);
                    DropdownUI.onInteriorOrGrottoDropdownChange(exitToModify, exitLeadsTo.entranceGroup);
                }

                this._addItemLocationToSpoilerLogItemMap(exitLeadsTo.items || [], exitToModify);

                return;
            }

            if (SpoilerLogBossMap[entrance]) {
                let exitToModify = SpoilerLogBossMap[entrance];
                let spoilerExitLeadsTo = spoilerLogData.entrances[entrance];
                let exitLeadsTo = SpoilerLogBossEntranceMap[_this._getSpoilerLogLocationKey(spoilerExitLeadsTo)];
                EntranceUI.initializeEntranceGroupData(exitToModify, exitLeadsTo);
                DropdownUI.onInteriorOrGrottoDropdownChange(exitToModify, exitLeadsTo);
                return;
            }

            // TODO when done: if this DOES NOT have an entry, log an error
        });

        this._populateSpoilerLogItemMap();

        // Place each item to update in a map array containing objects with the following format
        // - itemLocation: the item location to modify
        // - order: the order the spoiler log item should be added to the location
        // - itemName: the string to add to the notes
        let updateData = {};
        Object.keys(spoilerLogData.locations).forEach(logLocation => {
            if (!SpoilerLogItemMap[logLocation]) {
                // TODO when done: if this DOES NOT have an entry, log an error
                return;
            }

            let logItem = spoilerLogData.locations[logLocation];
            let itemName = logItem.item
                ? logItem.item
                : logItem;

            SpoilerLogItemMap[logLocation].itemLocations.forEach(itemLocation => {
                let key = `${itemLocation.Name}|${itemLocation.ExitMap || itemLocation.Map}|${itemLocation.ExitRegion || itemLocation.Region}`;
                updateData[key] ??= [];
                updateData[key].push({
                    itemLocation: itemLocation,
                    order: SpoilerLogItemMap[logLocation].order,
                    itemName: itemName,
                });
            });
        });

        // Sort the update data by the order so it matches with the tracker
        Object.values(updateData).sort((a, b) =>
            a.order < b.order ? -1 : 1
        );

        // Use the sorted update values to update the notes
        Object.values(updateData).forEach(updateInfoArray => {
            updateInfoArray.sort((a, b) => {
                if (a.order < b.order) {
                    return -1
                }
                return a.order > b.order ? 1 : 0;
            }).forEach(updateInfo => {
                let itemLocation = updateInfo.itemLocation;
                let itemName = updateInfo.itemName;
                if (itemLocation.notes) {
                    itemLocation.notes += `; ${itemName}`;
                } else {
                    itemLocation.notes = `${itemName}`;
                }
            });
        });
            
        refreshAll();
        ItemLocationDisplay.displayLocation("Kokiri Forest");
        alert("Spoiler log loaded successfully!");
    },

    _setDungeonTypes: function(spoilerLogData) {
        Object.keys(spoilerLogData.dungeons).forEach(spoilerDungeonName => {
            let dungeonName = SpoilerLogDungeonNameMap[spoilerDungeonName]
            let spoilerIsMQ = spoilerLogData.dungeons[spoilerDungeonName] === "mq";

            let dungeon = MapLocations[dungeonName];
            if (!!dungeon.IsMasterQuest !== spoilerIsMQ) {
                toggleDungeonMapType(dungeonName);
            }
        });
    },

    _populateSpoilerLogExitMap: function() {
        SpoilerLogInteriorMap = {};
        SpoilerLogBossMap = {};

        let _this = this;
        Object.keys(OwExits).forEach(function(mapName) {
            Object.keys(OwExits[mapName]).forEach(function(exitName) {
                let exit = OwExits[mapName][exitName];

                if (exit.ItemGroup === ItemGroups.INTERIOR) {
                    _this._addToSpoilerLogExitMap(exit, SpoilerLogInteriorMap);
                } else if (exit.ItemGroup === ItemGroups.BOSS_ENTRANCE) {
                    _this._addToSpoilerLogExitMap(exit, SpoilerLogBossMap);
                }
            });
	    });
    },

    _populateSpoilerLogItemMap: function() {
        let _this = this;
        Object.values(MapLocations).forEach(function(map) {
            Object.values(map.Regions).forEach(function(region) {
                let order = 1;
                Object.values(region.ItemLocations).forEach(function(itemLocation) {
                    order = _this._addToSpoilerLogItemMap(itemLocation);
                    order++;
                });
            });
        });

        Object.keys(OwExits).forEach(function(mapName) {
            Object.keys(OwExits[mapName]).forEach(function(exitName) {
                let exit = OwExits[mapName][exitName];
                let entranceGroup = Data.getEntranceGroup(exit);
                if (entranceGroup) {
                    let entranceData = EntranceUI.getEntranceData(exit);
                    let entranceDataButtons = entranceData[entranceGroup.name].buttons;
                    let order = 1;
                    Object.values(entranceDataButtons).forEach(button => {
                        if (!button.shouldNotDisplay || !button.shouldNotDisplay()) {
                            order = _this._addToSpoilerLogItemMap(exit, button.SpoilerLogName, order);
                            order++;
                        }
                    });
                }
            });
	    });
    },

    /**
     * Adds the item location to the spoiler log item map
     * Assumes it has been populated with its map and region
     * @returns The last order value used (for sorting)
     */
    _addToSpoilerLogItemMap: function(itemLocation, spoilerLogName, order) {
        let spoilerLogNameObject = spoilerLogName || itemLocation.SpoilerLogName;
        if (!spoilerLogNameObject) {
            return;
        }

        return this._addItemLocationToSpoilerLogItemMap(spoilerLogNameObject, itemLocation, order);
    },

    /**
     * Adds the item location to the spoiler log entry map
     * Includes parsing every spoiler log entry passed in
     * @param {string | object} spoilerLogEntryObject - The spoiler log key or object containing it
     * @param {object} itemLocation - The item location associated with the spoiler log entry
     * @param {number} order - For sorting
     * @returns The last order value used (for sorting)
     */
    _addItemLocationToSpoilerLogItemMap: function(spoilerLogEntryObject, itemLocation, order) {
        order = order || 1;

        let spoilerLogEntries = this._getSpoilerLogEntries(spoilerLogEntryObject);
        spoilerLogEntries.forEach(spoilerLogEntryName => {
            SpoilerLogItemMap[spoilerLogEntryName] ??= { itemLocations: [] };
            SpoilerLogItemMap[spoilerLogEntryName].itemLocations.push(itemLocation);
            SpoilerLogItemMap[spoilerLogEntryName].order = order;

            order++;
        });

        return order;
    },

    /**
     * Spoiler log entry objects can either be:
     * - A string
     * - An array of objects with either a string for the name, or...
     *   - name: The name of the entry, using {#} for tokens
     *   - count: Either a number or an object representing the range of numbers to
     *      create multiple spoiler log objects for
     *     - If it's an object, it will contain min and max for the range
     *   - tokens: An array of strings to use as the tokens
     * 
     * For example, "Test {#}", with a count of 3, creates three entries:
     * - Test 1; Test 2; Test3
     * @param {string | Array<object>} spoilerLogEntryObject 
     * @returns An array of strings containing keys to the spoiler log entries
     */
    _getSpoilerLogEntries: function(spoilerLogEntryObject) {
        // Object passed as a string - return it in an array
        if (typeof spoilerLogEntryObject === "string") {
            return [spoilerLogEntryObject];
        } 

        let output = [];
        spoilerLogEntryObject.forEach(data => {
            let name = typeof data === "string"
                ? data
                : data.name;
            if (data.count) {
                let min = 1;
                let max = data.count;

                // Count has a min/max, so we need to parse it
                if (typeof data.count === 'object') {
                    min = data.count.min;
                    max = data.count.max;

                    if (!min || !max) {
                        console.log(`ERROR: min or max not found on: ${name}`);
                        return;
                    }

                    if (min > max) {
                        let temp = min;
                        min = max;
                        max = temp;
                    }
                }

                for (let i = min; i <= max; i++) {
                    let spoilerLogEntry = name.replace("{#}", i);
                    output.push(spoilerLogEntry);
                }

            // If no count, check for tokens
            } else if (data.tokens) {
                data.tokens.forEach(token => {
                    let spoilerLogEntry = name.replace("{#}", token);
                    output.push(spoilerLogEntry);
                })

            // No  or tokens, just push the name
            } else {
                output.push(name);
            }
        });

        return output;
    },

    _addToSpoilerLogExitMap: function(exit, mapToFill) {
        if (exit.SpoilerLogExitName) {
            mapToFill[exit.SpoilerLogExitName] = exit;
        }
    },

    /**
     * Gets the spoiler log location key given the location
     * - If it is a string, just returns it
     * - If it's an object, it will be formatted as "<spoilerLogLocation.region>|<spoilerLogLocation.from>"
     * @param {*} spoilerLogLocation 
     */
    _getSpoilerLogLocationKey: function(spoilerLogLocation) {
        return typeof spoilerLogLocation === "string"
            ? spoilerLogLocation
            : `${spoilerLogLocation.region}|${spoilerLogLocation.from}`;
    }
};