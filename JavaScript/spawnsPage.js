let SpawnsPage = {
    /**
     * The IDs of the song drop downs
     * This is equivalent to the ID of all of the warp songs, with "-spawn" added to them
     */
    _songDropDownIds: [
        "MINUET_OF_FOREST-spawn", "BOLERO_OF_FIRE-spawn", "SERENADE_OF_WATER-spawn",
        "NOCTURNE_OF_SHADOW-spawn", "REQUIEM_OF_SPIRIT-spawn", "PRELUDE_OF_LIGHT-spawn"
    ],

    /**
     * The IDs of the spawn drop down
     */
    _spawnDropDownIds: ["Child-spawn", "Adult-spawn"],

    /**
     * Creates the spawns page
     */
    display: function() {
        LocationSidebar.displayContainer("spawnsContainer");
        _currentLocationName = "Spawns";

        this._fillSpawnDropdowns();
        this._fillAllSongDropdowns();
    },

    /**
     * Fills the dropdowns of the spawn locations
     */
    _fillSpawnDropdowns() {
        let spawnLocations = this._getAllSpawnLocations();

        let _this = this;
        this._spawnDropDownIds.forEach(function(id) {
            let dropdown = document.getElementById(id);
            dropdown.innerHTML = "";

            let age = id.split("-")[0];
            let defaultValue = "default";
            let map, region;
            if (Data.randomizedSpawnLocations.useRandomizedSpawns) {
                if (Data.randomizedSpawnLocations[age]) {
                    map = Data.randomizedSpawnLocations[age].map;
                    region = Data.randomizedSpawnLocations[age].region;
                    defaultValue = `${map} | ${region}`;
                } else {
                    defaultValue = "none";
                }
            }

            _this._addOptionsToDropdown(["default", "none"], dropdown, defaultValue);
            _this._addOptionsToDropdown(spawnLocations, dropdown, defaultValue);
            _this._updateSpawnLocationsDropdown(`${id}-locations`, age, map, region);

            dropdown.onchange = function() {
                Data.randomizedSpawnLocations.useRandomizedSpawns = false;

                let childDropdown = document.getElementById("Child-spawn");
                let adultDropdown = document.getElementById("Adult-spawn");
                let childValue = childDropdown.value;
                let adultValue = adultDropdown.value;

                if (childValue !== "default" || adultValue !== "default") {
                    Data.randomizedSpawnLocations.useRandomizedSpawns = true;

                    if (dropdown.value !== "none" && dropdown.value !== "default") {
                        let spawnParts = dropdown.value.split("|");
                        let spawnMap = spawnParts[0].trim();
                        let spawnRegion = spawnParts[1].trim();
                        Data.randomizedSpawnLocations[age] = {
                            map: spawnMap,
                            region: spawnRegion
                        };

                        _this._updateSpawnLocationsDropdown(`${id}-locations`, age, spawnMap, spawnRegion);
                    }
                }

                if (dropdown.value === "default" || dropdown.value === "none") {
                    Data.randomizedSpawnLocations[age] = null;
                    _this._updateSpawnLocationsDropdown(`${id}-locations`);
                }

                SocketClient.spawnLocationUpdated(Data.randomizedSpawnLocations);
                refreshAll();
            }
        });
    },

    /**
     * Fills the dropdowns of all of the song warp locations
     */
    _fillAllSongDropdowns: function() {
        let spawnLocations = this._getAllSpawnLocations();

        let _this = this;
        this._songDropDownIds.forEach(function(id) {
            let dropdown = document.getElementById(id);
            dropdown.innerHTML = "";
            let songId = id.split("-")[0].trim();
            let song = Songs[songId];

            let defaultValue = "default";
            if (song.warpMap && song.warpRegion) {
                defaultValue = `${song.warpMap} | ${song.warpRegion}`;
            } else if (song.noWarp) {
                defaultValue = "none";
            }

            _this._addOptionsToDropdown(["default", "none"], dropdown, defaultValue);
            _this._addOptionsToDropdown(spawnLocations, dropdown, defaultValue);
            _this._updateSpawnLocationsDropdown(`${id}-locations`, songId, song.warpMap, song.warpRegion);

            dropdown.onchange = function() {
                delete song.warpMap;
                delete song.warpRegion;
                delete song.noWarp;

                if (dropdown.value === "default") {
                    _this._updateSpawnLocationsDropdown(`${id}-locations`, songId);
                } else if (dropdown.value === "none") {
                    song.noWarp = true;
                    _this._updateSpawnLocationsDropdown(`${id}-locations`, songId);
                } else if (dropdown.value !== "default") {
                    let warpParts = dropdown.value.split("|");
                    let warpMap = warpParts[0].trim();
                    let warpRegion = warpParts[1].trim();

                    song.warpMap = warpMap;
                    song.warpRegion = warpRegion;

                    _this._updateSpawnLocationsDropdown(`${id}-locations`, songId, warpMap, warpRegion);
                }

                SocketClient.inventoryUpdated("Songs", songId, song);
                refreshAll();
            };
        });
    },

    /**
     * Gets all the spawn locations to include in the dropdowns
     */
    _getAllSpawnLocations: function() {
        let spawnLocations = [];
        Object.keys(MapLocations).forEach(function(mapName) {
            if (MapLocations[mapName].MapGroup === MapGroups.DUNGEONS) { return; }

            Object.keys(MapLocations[mapName].Regions).forEach(function(regionName) {
                if (MapLocations[mapName].Regions[regionName].ExcludeFromSpawnList) {
                    return;
                }

                spawnLocations.push(`${mapName} | ${regionName}`);
            });
        });

        return spawnLocations;
    },

    /**
     * Updates the dropdown for the specific spawn locations
     * These are item location names that are at the given map/region
     */
    _updateSpawnLocationsDropdown: function(dropdownId, ageOrSongId, map, region) {
        let dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = "";
        addCssClass(dropdown, "nodisp");

        if (!map || !region) { return; }

        let defaultValue = "Overworld";
        let isAge = Age[ageOrSongId.toUpperCase()];
        let isSong = Songs[ageOrSongId];
        if (isAge && Data.randomizedSpawnLocations[ageOrSongId]) {
            defaultValue = Data.randomizedSpawnLocations[ageOrSongId].entranceName || "Overworld";
        } else if (isSong) {
            defaultValue = Songs[ageOrSongId].entranceName || "Overworld";
        }

        let _this = this;
        this._addOptionsToDropdown(["Overworld"], dropdown, defaultValue)
        Data.getItemLocationsFromMapAndRegion(map, region).forEach(function(itemLocation) {
            let isInteriorShuffle = Settings.RandomizerSettings.shuffleInteriorEntrances;
            if (isInteriorShuffle && 
                itemLocation.ItemGroup === ItemGroups.ENTRANCE &&
                itemLocation.OneWayInteriorSpawnEntrance
            ) {
                removeCssClass(dropdown, "nodisp");
                _this._addOptionsToDropdown([itemLocation.Name], dropdown, defaultValue)
            } else if (!isInteriorShuffle &&
                itemLocation.ItemGroup !== ItemGroups.ENTRANCE &&
                itemLocation.OneWayInteriorSpawnEntrance) {
                    removeCssClass(dropdown, "nodisp");
                    _this._addOptionsToDropdown([itemLocation.Name], dropdown, defaultValue)
            }
        });

        dropdown.onchange = function() {
            if (isAge) {
                Data.randomizedSpawnLocations[ageOrSongId].entranceName = dropdown.value;
                SocketClient.spawnLocationUpdated(Data.randomizedSpawnLocations);
            } else {
                Songs[ageOrSongId].entranceName = dropdown.value;
                SocketClient.inventoryUpdated("Songs", ageOrSongId, Songs[ageOrSongId]);
            }
            refreshAll();
        };
    },

    /**
     * Adds the given options to the given dropdown
     * Includes selecting a default value
     */
    _addOptionsToDropdown: function(options, dropdown, defaultValue) {
        options.forEach(function(option) {
            let optionElement = dce("option");
            optionElement.value = option;
            optionElement.innerText = option;

            if (option === defaultValue) {
                optionElement.selected = "selected";
            }

            dropdown.appendChild(optionElement);
        });
    },

    /**
     * Mark all the songs as "none"
     */
    markAllSongsNone: function() {
        this._songDropDownIds.forEach(function(id) {
            let dropdown = document.getElementById(id);
            dropdown.value = "none";
            dropdown.onchange();
        });
    },

    /**
     * Mark all the songs with a default value
     */
    markAllSongsDefault: function() {
        this._songDropDownIds.forEach(function(id) {
            let dropdown = document.getElementById(id);
            dropdown.value = "default";
            dropdown.onchange();
        });
    },

    /**
     * Updates the tooltips of all of the warp songs to list the spawn location
     */
    updateSongItemTooltips: function() {
        this._songDropDownIds.forEach(function(dropdownId) {
            let songId = dropdownId.split("-")[0];
            let song = Songs[songId];
            let songDiv = document.getElementById(songId);

            let map = song.warpMap;
            let region = song.warpRegion;
            let entranceName = song.entranceName;

            if (!song.playerHas) {
                songDiv.title = "";
            } else if (song.noWarp) {
                songDiv.title = "No warp set!";
            } else if (map && region && entranceName) {
                songDiv.title = `${map} | ${region} | ${entranceName}`;
            } else if (map && region) {
                songDiv.title = `${map} | ${region}`;
            } else {
                songDiv.title = "Default warp location";
            }
        });
    },
};