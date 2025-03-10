let SpawnsPage = {
    /**
     * The IDs of the song drop downs
     * This is equivalent to the ID of all of the warp songs, with "-spawn" added to them
     */
    _songDropDownIds: [
        "MINUET_OF_FOREST-spawn", "BOLERO_OF_FIRE-spawn", "SERENADE_OF_WATER-spawn",
        "NOCTURNE_OF_SHADOW-spawn", "REQUIEM_OF_SPIRIT-spawn", "PRELUDE_OF_LIGHT-spawn"
    ],

    _songNoteIds: [
        "MINUET_OF_FOREST-notes", "BOLERO_OF_FIRE-notes", "SERENADE_OF_WATER-notes",
        "NOCTURNE_OF_SHADOW-notes", "REQUIEM_OF_SPIRIT-notes", "PRELUDE_OF_LIGHT-notes",

        "ZELDAS_LULLABY-notes", "EPONAS_SONG-notes", "SARIAS_SONG-notes",
        "SUNS_SONG-notes", "SONG_OF_STORMS-notes", "SONG_OF_TIME-notes",

        "SCARECROWS_SONG-notes"
    ],

    /**
     * The IDs of the spawn drop down
     */
    _spawnDropDownIds: ["Child-spawn", "Adult-spawn"],

    /**
     * Creates the spawns page
     */
    display: function() {
        LocationSidebar.updateSidebarLocation();
        LocationSidebar.displayContainer("spawnsContainer");
        ItemLocationDisplay.currentLocationName = "Spawns";

        this._fillSpawnDropdowns();
        this._fillAllSongDropdowns();
        this._fillAllSongNotes();
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
                delete song.entranceName;

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
     * Fills all the song note divs with the current data
     */
    _fillAllSongNotes: function() {
        let _this = this;
        this._songNoteIds.forEach(function(id) {
            let songNoteDiv = document.getElementById(id);
            if (!songNoteDiv) return; //TEMP

            let songId = id.split("-")[0].trim();
            let song = Songs[songId];

            let children = Array.from(songNoteDiv.children);
            let displayDiv = children[0];
            let inputDiv = children[1];

            inputDiv.value = ItemData.getSongNotes(song);
            _this._fillSongNoteDisplayDiv(inputDiv.value, displayDiv);
        });
    },

    /**
     * Called when the modify notes div is clicked - enables editing
     * @param event - the event used to get the div container - OR the div container itself
     */
    onModifyNotesClick: function(event) {
        let eventDiv = event.target
            ? event.target.parentElement
            : event;
        let children = Array.from(eventDiv.children);
        let displayDiv = children[0];
        let inputDiv = children[1];

        removeCssClass(inputDiv, "nodisp");
        addCssClass(displayDiv, "nodisp");

        if (inputDiv) {
            inputDiv.focus();
        }
    },

    /**
     * Called when the modify notes div loses focus - disables editing
     * @param event - the event used to get the div container
     */
    onModifyNotesBlur: function(event) {
        let eventDiv = event.target.parentElement;
        let children = Array.from(eventDiv.children);
        let displayDiv = children[0];
        let inputDiv = children[1];

        let songNoteString = inputDiv.value;
        if (this._fillSongNoteDisplayDiv(songNoteString, displayDiv)) {
            let songId = eventDiv.id.split("-")[0].trim();
            let song = Songs[songId];
            song.songNotes = songNoteString;

            SocketClient.inventoryUpdated("Songs", songId, song);
            ItemTracker.refreshSongPlayability(song);
            refreshAll();
        }

        addCssClass(inputDiv, "nodisp");
        removeCssClass(displayDiv, "nodisp");
    },

    /**
     * Fills the div to display corresponding with the song note string
     * @param {String} songNoteString - the note string to create the div for
     * @param {HTMLElement} displayDiv - the display div to modify - will clear out the old one
     * @returns True if the notes were valid, false otherwise
     */
    _fillSongNoteDisplayDiv: function(songNoteString, displayDiv) {
        displayDiv.innerHTML = "";

        let convertedNotes = ItemData.convertSongNotesString(songNoteString);
        if (convertedNotes === null) {
            displayDiv.innerHTML = "Invalid Notes";
            return false;
        }

        convertedNotes.forEach(ocarinaNote => {
            let noteSpan = dce("span", "ocarina-note");
            noteSpan.style.backgroundImage = `url("./Images/Controller Buttons/${ocarinaNote.name}.png")`;

            if (!ocarinaNote.playerHas && Settings.RandomizerSettings.shuffleOcarinaButtons) {
                addCssClass(noteSpan, "not-obtained");
            }

            // This element is two nested below the div we need to pass in, so call parentElement twice
            noteSpan.onclick = event => 
                this.onModifyNotesClick(event.target.parentElement.parentElement);

            displayDiv.appendChild(noteSpan);
        });

        if (convertedNotes.length === 0) {
            displayDiv.innerText = "<empty song>";
        }

        return true;
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
        Data.getEntrancesFromMapAndRegion(map, region).forEach(function(itemLocation) {
            let isInteriorShuffle = Settings.RandomizerSettings.shuffleInteriorEntrances;
            let isEntrance = Data.isEntrance(itemLocation);
            if (isInteriorShuffle && 
                isEntrance &&
                itemLocation.OneWayInteriorSpawnEntrance
            ) {
                removeCssClass(dropdown, "nodisp");
                _this._addOptionsToDropdown([itemLocation.Name], dropdown, defaultValue)
            } else if (!isInteriorShuffle &&
                !isEntrance &&
                itemLocation.OneWayInteriorSpawnEntrance) {
                    removeCssClass(dropdown, "nodisp");
                    _this._addOptionsToDropdown([itemLocation.Name], dropdown, defaultValue)
            }
        });

        dropdown.onchange = function() {
            if (isAge) {
                Data.randomizedSpawnLocations[ageOrSongId].entranceName = dropdown.value;
                if (dropdown.value === "Overworld") {
                    delete Data.randomizedSpawnLocations[ageOrSongId].entranceName;
                }
                SocketClient.spawnLocationUpdated(Data.randomizedSpawnLocations);
            } else {
                Songs[ageOrSongId].entranceName = dropdown.value;
                if (dropdown.value === "Overworld") {
                    delete Songs[ageOrSongId].entranceName;
                }
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
     * Clears all of the song notes
     */
    clearAllSongNotes: function() {
        Object.values(Songs).forEach(song => {
            song.songNotes = "";
        });

        SpawnsPage.display();
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
    }
};