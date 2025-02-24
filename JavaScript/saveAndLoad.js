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
        this._loadSaveFile(loadedObject);
    },
    
    /**
     * Loads the save file
     * @param loadedObject - the loaded file data
     */
    _loadSaveFile(loadedObject) {
        if (loadedObject.Settings) { Settings = loadedObject.Settings; }
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
        
        refreshAll();
        ItemLocationDisplay.displayLocation("Kokiri Forest");

        this.currentlyLoading = false;
        SocketClient.syncAll(); // Sync to all clients if in co-op mode
        alert("File loaded successfully!");
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
    }
};