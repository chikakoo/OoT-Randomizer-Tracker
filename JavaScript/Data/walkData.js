let WalkData = {
    defaultValue: 20,
    getWalkValue: function(map, fromExit, toExit) {
        if (!Settings.TrackerSettings.routeBasedOnTime) {
            return this._getWalkValueBasedOnExitCount(map, fromExit);
        }

        let mapData = this.Data[map];
        if (!mapData) { 
            return this.defaultValue; 
        }

        let fromExitFunction = mapData[fromExit];
        if (!fromExitFunction) { 
            return this.defaultValue; 
        }

        let result = fromExitFunction(toExit);
        if (result === undefined) { 
            return this.defaultValue; 
        }

        return result;
    },

    _getWalkValueBasedOnExitCount: function(map, fromExit) {
        let walkValue = 1;
        if (Settings.TrackerSettings.deprioritizeDampeToWindmill && fromExit === "Grave Exit") {
            walkValue += 100;
        }
        else if (map === "Hyrule Field" && Settings.TrackerSettings.deprioritizeHyruleField && WalkData.currentLocation !== "Hyrule Field") {
            walkValue += 3;
        } else if (map === "Haunted Wasteland" && Settings.TrackerSettings.deprioritizeHauntedWasteland && WalkData.currentLocation !== "Haunted Wasteland") {
            walkValue += 100;
        }
        return walkValue;
    },

    //Map - FROM this exit, TO any of these exits
    Data: {
        "Kokiri Forest": {
            "Lost Woods Bottom": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 0;
                    case "Lost Woods Top": return 22;
                    case "Deku Tree Entrance": return 40;
                    case "Link's House": return 19;
                    case "Saria's House": return 15;
                    case "Mido's House": return 8;
                    case "Know-It-All House": return 9;
                    case "House of Twins": return 18;
                    case "Shop": return 16;
                    case "Song of Storms Grotto by Lost Woods": return 33;
                }
            },
            "Lost Woods Top": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 10;
                    case "Lost Woods Top": return 0;
                    case "Deku Tree Entrance": return 35;
                    case "Link's House": return 23;
                    case "Saria's House": return 17;
                    case "Mido's House": return 9;
                    case "Know-It-All House": return 15;
                    case "House of Twins": return 16;
                    case "Shop": return 12;
                    case "Song of Storms Grotto by Lost Woods": return 11;
                }
            },
            "Deku Tree Entrance": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 40;
                    case "Lost Woods Top": return 51;
                    case "Deku Tree Entrance": return 0;
                    case "Link's House": return 36;
                    case "Saria's House": return 28;
                    case "Mido's House": return 32;
                    case "Know-It-All House": return 37;
                    case "House of Twins": return 23;
                    case "Shop": return 26;
                    case "Song of Storms Grotto by Lost Woods": return 58;
                }
            },
            "Link's House": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 18;
                    case "Lost Woods Top": return 30;
                    case "Deku Tree Entrance": return 34;
                    case "Link's House": return 0;
                    case "Saria's House": return 9;
                    case "Mido's House": return 12;
                    case "Know-It-All House": return 16;
                    case "House of Twins": return 12;
                    case "Shop": return 13;
                    case "Song of Storms Grotto by Lost Woods": return 41;
                }
            },
            "Saria's House": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 15;
                    case "Lost Woods Top": return 28;
                    case "Deku Tree Entrance": return 28;
                    case "Link's House": return 11;
                    case "Saria's House": return 0;
                    case "Mido's House": return 10;
                    case "Know-It-All House": return 14;
                    case "House of Twins": return 5;
                    case "Shop": return 7;
                    case "Song of Storms Grotto by Lost Woods": return 39;
                }
            },
            "Mido's House": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 8;
                    case "Lost Woods Top": return 20;
                    case "Deku Tree Entrance": return 32;
                    case "Link's House": return 15;
                    case "Saria's House": return 10;
                    case "Mido's House": return 0;
                    case "Know-It-All House": return 8;
                    case "House of Twins": return 12;
                    case "Shop": return 11;
                    case "Song of Storms Grotto by Lost Woods": return 31;
                }
            },
            "Know-It-All House": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 7;
                    case "Lost Woods Top": return 24;
                    case "Deku Tree Entrance": return 36;
                    case "Link's House": return 14;
                    case "Saria's House": return 11;
                    case "Mido's House": return 8;
                    case "Know-It-All House": return 0;
                    case "House of Twins": return 14;
                    case "Shop": return 22;
                    case "Song of Storms Grotto by Lost Woods": return 35;
                }
            },
            "House of Twins": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 18;
                    case "Lost Woods Top": return 30;
                    case "Deku Tree Entrance": return 23;
                    case "Link's House": return 14;
                    case "Saria's House": return 5;
                    case "Mido's House": return 12
                    case "Know-It-All House": return 16;
                    case "House of Twins": return 0;
                    case "Shop": return 7;
                    case "Song of Storms Grotto by Lost Woods": return 41;
                }
            },
            "Shop": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 16;
                    case "Lost Woods Top": return 27;
                    case "Deku Tree Entrance": return 26;
                    case "Link's House": return 16;
                    case "Saria's House": return 7;
                    case "Mido's House": return 11;
                    case "Know-It-All House": return 15;
                    case "House of Twins": return 7;
                    case "Shop": return 0;
                    case "Song of Storms Grotto by Lost Woods": return 38;
                }
            },
            "Song of Storms Grotto by Lost Woods": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 8;
                    case "Lost Woods Top": return 4;
                    case "Deku Tree Entrance": return 35;
                    case "Link's House": return 23;
                    case "Saria's House": return 17;
                    case "Mido's House": return 9;
                    case "Know-It-All House": return 15;
                    case "House of Twins": return 16;
                    case "Shop": return 12;
                    case "Song of Storms Grotto by Lost Woods": return 8;
                }
            }
        },

        "Hyrule Field": {
            "Lost Woods Bridge": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 0;
                    case "Zora's River": return 5;
                    case "Kakariko Village": return 7;
                    case "Market": return 10;
                    case "Lon Lon Ranch": return 8;
                    case "Gerudo Valley": return 20;
                    case "Lake Hylia": return 18;
                }
            },
            "Zora's River": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 5;
                    case "Zora's River": return 0;
                    case "Kakariko Village": return 2;
                    case "Market": return 3;
                    case "Lon Lon Ranch": return 5;
                    case "Gerudo Valley": return 20;
                    case "Lake Hylia": return 30;
                }
            },
            "Kakariko Village": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 7;
                    case "Zora's River": return 2;
                    case "Kakariko Village": return 0;
                    case "Market": return 5;
                    case "Lon Lon Ranch": return 8;
                    case "Gerudo Valley": return 20;
                    case "Lake Hylia": return 30;
                }
            },
            "Market": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 15;
                    case "Zora's River": return 10;
                    case "Kakariko Village": return 7;
                    case "Market": return 0;
                    case "Lon Lon Ranch": return 12;
                    case "Gerudo Valley": return 25;
                    case "Lake Hylia": return 35;
                }
            },
            "Lon Lon Ranch": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 15;
                    case "Zora's River": return 10;
                    case "Kakariko Village": return 10;
                    case "Market": return 7;
                    case "Lon Lon Ranch": return 0;
                    case "Gerudo Valley": return 20;
                    case "Lake Hylia": return 24;
                }
            },
            "Gerudo Valley": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 25;
                    case "Zora's River": return 30;
                    case "Kakariko Village": return 30;
                    case "Market": return 20;
                    case "Lon Lon Ranch": return 15;
                    case "Gerudo Valley": return 0;
                    case "Lake Hylia": return 12;
                }
            },
            "Lake Hylia": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bridge": return 20;
                    case "Zora's River": return 25;
                    case "Kakariko Village": return 30;
                    case "Market": return 35;
                    case "Lon Lon Ranch": return 21;
                    case "Gerudo Valley": return 15;
                    case "Lake Hylia": return 0;
                }
            }

            //interiors
        },

        "Windmill-Kak Potion": {
            "Grave Exit": function(toExit) {
                switch(toExit) {
                    case "Windmill Exit":
                    case "Windmill Exit to Kakariko Village":
                        return Settings.TrackerSettings.deprioritizeDampeToWindmill
                            ? 130
                            : 30;
                }
            }
        },

        "Haunted Wasteland": {
            "Gerudo Fortress": function(toExit) {
                switch(toExit) {
                    case "Gerudo Fortress": return 0;
                    case "Desert Colossus": 
                        return Settings.TrackerSettings.deprioritizeHauntedWasteland && WalkData.currentLocation !== "Haunted Wasteland"
                            ? 130
                            : 30;
                }
            },
            "Desert Colossus": function(toExit) {
                switch(toExit) {
                    case "Gerudo Fortress":
                        return Settings.TrackerSettings.deprioritizeHauntedWasteland && WalkData.currentLocation !== "Haunted Wasteland"
                        ? 130
                        : 30;
                    case "Desert Colossus": 
                        return 0;
                }
            }
        }
    }
};