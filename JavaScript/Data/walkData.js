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
                    case "Lost Woods Top": return 5;
                    case "Deku Tree Entrance": return 10;
                }
            },
            "Lost Woods Top": function(toExit) {
                switch(toExit) {
                    case "Lost Woods Bottom": return 5;
                    case "Lost Woods Top": return 0;
                    case "Deku Tree Entrance": return 10;
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