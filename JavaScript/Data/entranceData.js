EntranceData = {
	/**
	 * Handles the logic for when a "tunneling" interior is selected
	 * This sets the data for this side, as well as the other side, if necessary
	 * @param itemLocation - the item location of where the exit is from (the overworld, usually)
	 * @param isSelected - whether the entrance is being selected or cleared
	 * @param otherSideData - the map, region, and exit of where the exit leads to (the interior)
	 * @param travelDataInfoKey - the key to use for the interior travel data info object
	 */
	handleInteriorPostClick(itemLocation, isSelected, otherSideData, travelDataInfoKey) {
		let interiorExit = MapLocations[otherSideData.map].Regions[otherSideData.region].Exits[otherSideData.exit].OwExit;
		if (isSelected) {
			Data.addToInteriorTravelData(travelDataInfoKey, itemLocation); // windmill post click mostly

			itemLocation.OwShuffleMap = otherSideData.map;
			itemLocation.OwShuffleRegion = otherSideData.region;
			itemLocation.OwShuffleExitName = otherSideData.exit;

			interiorExit.OwShuffleMap = itemLocation.ExitMap;
			interiorExit.OwShuffleRegion = itemLocation.ExitRegion;
			interiorExit.OwShuffleExitName = itemLocation.Name;
		} else {
			Data.removeFromInteriorTravelData(travelDataInfoKey, itemLocation); // windmill post click mostly

			delete itemLocation.OwShuffleMap;
			delete itemLocation.OwShuffleRegion;
			delete itemLocation.OwShuffleExitName;

			delete interiorExit.OwShuffleMap;
			delete interiorExit.OwShuffleRegion;
			delete interiorExit.OwShuffleExitName;
		}
	},

	/**
	 * Runs the post click functions on all items of a given item location
	 * @param itemLocation The item location to check
	 */
	 runPostClicks: function(itemLocation) {
		let entranceGroup = Data.getEntranceGroup(itemLocation);
		if (!itemLocation || !entranceGroup) {
			return;
		}
		
		if (!itemLocation.IsInterior && !itemLocation.IsGrotto && !itemLocation.IsBoss) {
			return;
		}

		let name = entranceGroup.name;
		entranceGroup.buttonNames.forEach(function(buttonName) {
			let buttonItem;

			if (itemLocation.IsInterior) {
				buttonItem = InteriorGroups[name].buttons[buttonName];
			}

			else if (itemLocation.IsGrotto) {
				buttonItem = GrottoGroups[name].buttons[buttonName];
			}

			else if (itemLocation.IsBoss) {
				buttonItem = BossGroups[name].buttons[buttonName];
			}

			if (buttonItem && buttonItem.postClick) {
				let isCompleted = Object.keys(entranceGroup.completed).includes(buttonName);
				buttonItem.postClick(isCompleted);
			}
		});
	}
}

/**
 * Data for the interior buttons to display under entrances
 */
InteriorGroups = {
	"Link's House": {
		tooltip: "Link's House",
		excludeFromGroup: function() { return Data.linksHouseLocation && Data.linksHouseLocation.map; },
		neverHide: true,
		buttons: {
			"Pot": {
				itemGroup: ItemGroups.POT,
				description: "Throw the pot to get an item.",
				canGet: function(age) { return true; }
			},
			"Cow in Link's House": {
				icon: "Cow",
				itemGroup: ItemGroups.COW,
				description: "As an adult, beat Malon's Epona challenge to unlock the cow in Link's house.",
				canGet: function(age) {
					return Data.canRideEpona(age) && Data.canMilkCows(true) && Data.canAccessMap(age, "Lon Lon Ranch", "main");
				},
				isAdultOnly: function() { return true; }
			}
		},
		postClick: function(itemLocation, isSelected) {
			if (isSelected) {
				Data.linksHouseLocation = { map: itemLocation.ExitMap, region: itemLocation.ExitRegion };
			} else {
				Data.linksHouseLocation = {};
			}
		},
		shouldNotTrigger: function() {
			let shouldNotTrigger = !!Data.linksHouseLocation.map;
			if (shouldNotTrigger) {
				console.log("WARNING: Prevented selecting multiple Link's house locations!");
			}
			return shouldNotTrigger;
		}
	},
	"Temple of Time": {
		tooltip: "The Temple of Time",
		isTempleOfTime: true,
		excludeFromGroup: function() { return Data.templeOfTimeLocation && Data.templeOfTimeLocation.map; },
		neverHide: true,
		buttons: {
			"Prelude of Light": {
				description: "When you have the Forest Medallion, enter the room with the Master Sword pedestal to receive the item.",
				canGet: function(age) {
					if (!Medallions.FOREST_MEDALLION.playerHas) {
						return false;
					}
					
					if (!Settings.RandomizerSettings.openDoorOfTime) {
						return Data.canPlaySong(Songs.SONG_OF_TIME);
					}
					return true;
				},
				isAdultOnly: function() { return true; }
			},
			"Light Arrows": {
				description: "When you have the Shadow and Spirit Medallions, simply enter the Temple of Time as adult to receive the item.",
				canGet: function(age) {
					return Medallions.SHADOW_MEDALLION.playerHas && Medallions.SPIRIT_MEDALLION.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		},
		postClick: function(itemLocation, isSelected) {
			if (isSelected) {
				Data.templeOfTimeLocation = { map: itemLocation.ExitMap, region: itemLocation.ExitRegion };
			} else {
				Data.templeOfTimeLocation = {};
			}
		},
		shouldNotTrigger: function() {
			let shouldNotTrigger = !!Data.templeOfTimeLocation.map;
			if (shouldNotTrigger) {
				console.log("WARNING: Prevented selecting multiple Temple of Time locations!");
			}
			return shouldNotTrigger;
		}
	},
	"Shop": {
		tooltip: "Any shop except the Happy Mask Shop or potion shop with two exits.",
		isShop: true,
		buttons: {
			"Shop": {
				itemGroup: ItemGroups.SHOP,
				description: "Buy the items you need here - put anything you need to get later in the notes."
			}
		}
	},
	"Kokiri Shop": {
		tooltip: "The Kokiri Forest shop with the rupee in the back.",
		excludeFromGroup: function() { 
			return Settings.RandomizerSettings.rupeeAndHeartSetting === ShuffleLocationSettings.OFF ||
				Settings.RandomizerSettings.rupeeAndHeartSetting === ShuffleLocationSettings.DUNGEON_ONLY; 
		},
		isShop: true,
		skipItemGroupCheck: true,
		buttons: {
			"Shop": {
				itemGroup: ItemGroups.SHOP,
				description: "Buy the items you need here - put anything you need to get later in the notes.",
				canGet: function(age,  itemLocation) {
					return Data.canBuyFromShop(age, itemLocation);
				}
			},
			"Blue Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Go in the space to the right of the shop to get this item."
			}
		}
	},
	"Potion Shop Front": {
		tooltip: "The Kakariko potion shop - this is the front entrance (closest to the camera).",
		neverHide: true,
		buttons: {},
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Windmill-Kak Potion",
				region: "kakPotionShop",
				exit: "Potion Shop Front",
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData,"kakPotionShopFront");
		}
	},
	"Potion Shop Back": {
		tooltip: "The Kakariko potion shop - this is the back entrance (farthest from the camera). Mark the front entrance for the shop itself.",
		neverHide: true,
		buttons: {},
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Windmill-Kak Potion",
				region: "kakPotionShop",
				exit: "Potion Shop Back",
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData, "kakPotionShopBack");
		}
	},
	"Happy Mask Shop": {
		tooltip: "The Happy Mask Shop",
		buttons: {
			"Borrow Keaton Mask": {
				itemLocaton: "Borrow Keaton Mask",
				tag: "keaton",
				description: "After showing the Kakariko Village guard Zelda's Letter, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return (Settings.RandomizerSettings.openKakariko && Items.MASK_SLOT.currentUpgrade >= 3) || Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
				}
			},
			"Borrow Skull Mask": {
				itemLocaton: "Borrow Skull Mask",
				tag: "skull",
				description: "After selling the Keaton Mask to the Kakariko Guard, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask");
				}
			},
			"Borrow Spooky Mask": {
				itemLocaton: "Borrow Spooky Mask",
				tag: "spooky",
				description: "After selling the Skull Mask to the Skull Kid in Lost Woods, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Lost Woods", "firstHalf", "Sell Skull Mask");
				}
			},
			"Borrow Bunny Hood": {
				itemLocaton: "Borrow Bunny Hood",
				tag: "bunny",
				description: "After selling the Spooky Mask to the graveyard kid, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask");
				}
			},
			"Borrow Mask of Truth": {
				icon: "Mask of Truth",
				tag: "truth",
				itemLocaton: "Borrow Mask of Truth",
				description: "After selling the Bunny Hood to the running guy in Hyrule Field, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Hyrule Field", "main", "Sell Bunny Hood");
				}
			}
		}
	},
	"Fairy Fountain": {
		tooltip: "Any of the Great Fairy Fountains.",
		buttons: {
			"Fairy Fountain": {
				description: "Play Zelda's Lullaby at the triforce symbol to get this item.",
				canGet: function(age) {
					return Data.canPlaySong(Songs.ZELDAS_LULLABY);
				}
			}
		}
	},
	"House of Skulltula": {
		tooltip: "The building you turn in skulltula rewards.",
		shouldNotDisplay: function() {
			return Settings.RandomizerSettings.maxRequiredTokens === 0;
		},
		buttons: {
			"10 Reward": {
				icon: "Skulltula",
				iconText: "10",
				tag: "10",
				description: "Talk to the guy on the right hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 10;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 10;
				}
			},
			"20 Reward": {
				icon: "Skulltula",
				iconText: "20",
				tag: "20",
				description: "Talk to the guy on the left hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 20;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 20;
				}
			},
			"30 Reward": {
				icon: "Skulltula",
				iconText: "30",
				tag: "30",
				description: "Talk to the middle guy.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 30;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 30;
				}
			},
			"40 Reward": {
				icon: "Skulltula",
				iconText: "40",
				tag: "40",
				description: "Talk to the guy second from the left",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 40;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 40;
				}
			},
			"50 Reward": {
				icon: "Skulltula",
				iconText: "50",
				tag: "50",
				description: "Talk to the guy second from the right",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 50;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 50;
				}
			}
		}
	},
	"Lakeside Lab": {
		tooltip: "This is the lab with the professor and the pool of water in the back.",
		buttons: {
			"Lakeside Heart Piece": {
				icon: "Heart Piece",
				description: "Use the golden scale and dive to touch the bottom of the water area. The professor will give you this item.",
				canGet: function(age) {
					let hasGoldScale = Equipment.SCALE.currentUpgrade === 2;
					if (age === Age.CHILD) { return hasGoldScale; }
					
					let canGetWithoutScale = Settings.GlitchesToAllow.labHPWithoutGoldenScale && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas;
					return hasGoldScale || canGetWithoutScale;
				}
			},
			"Lakeside Skulltula": {
				icon: "Skulltula",
				itemGroup: ItemGroups.SKULLTULA,
				description: "This skulltula is on the bottom of the water area. Equip the iron boots and sink down. Roll into the box to reveal it.",
				canGet: function(age) {
					if (age === Age.CHILD) { return false; }
					return Equipment.IRON_BOOTS.playerHas && Items.HOOKSHOT.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Red Rupee 1": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "This rupee is in the water - dive or use iron boots to get it.",
				canGet: function(age) {
					if (age === Age.CHILD) { return false; }
					return Equipment.IRON_BOOTS.playerHas || Equipment.SCALE.currentUpgrade === 2;
				},
				isAdultOnly: function() { return true; }
			},
			"Red Rupee 2": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "This rupee is in the water - dive or use iron boots to get it.",
				canGet: function(age) {
					if (age === Age.CHILD) { return false; }
					return Equipment.IRON_BOOTS.playerHas || Equipment.SCALE.currentUpgrade === 2;
				},
				isAdultOnly: function() { return true; }
			},
			"Red Rupee 3": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "This rupee is in the water - dive or use iron boots to get it.",
				canGet: function(age) {
					if (age === Age.CHILD) { return false; }
					return Equipment.IRON_BOOTS.playerHas || Equipment.SCALE.currentUpgrade === 2;
				},
				isAdultOnly: function() { return true; }
			},
		}
	},
	"Market Guard House": {
		tooltip: "This is the pot room as a child, and the big poe buyer room as an adult.",
		buttons: {
			"Child Skulltula": {
				icon: "Skulltula",
				itemGroup: ItemGroups.SKULLTULA,
				description: "This is the skulltula in the crate in the back of the room.",
				isChildOnly: function() { return true; }
			},
			"Adult Big Poe Reward": {
				description: "Give the poe salesman all the poes he needs to get this item.",
				canGet: function(age) {
					let canGetToPoe = Data.canAccessMap(age, "Hyrule Field");
					return (canGetToPoe && Items.FAIRY_BOW.playerHas && Data.hasBottle()) || Items.BIG_POE.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Crate as Child": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "The third crate on your left as you enter is the only one that contains an item.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the two pots on the top. Use the box with the skulltula on it to jump to it.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the two pots on the top. Use the box with the skulltula on it to jump to it.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 5": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 6": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 7": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 8": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 9": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 10": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 11": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 12": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 13": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 14": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 15": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 16": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 17": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 18": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 19": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 20": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 21": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Child Pot 22": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room.",
				isChildOnly: function() { return true; }
			},
			"Adult Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 5": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 6": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			},
			"Adult Pot 7": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "One of the many pots in the room.",
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Back of Impa's House": {
		tooltip: "Inside the cage with the cow and the freestanding item.",
		buttons: {
			"Freestanding Item": {
				icon: "Heart Piece",
				description: "Simply grab the item in the room."
			},
			"Cow": {
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				canGet: function(age) {
					return Data.canMilkCows(true);
				}
			}
		}
	},
	"Stable": {
		tooltip: "This is the building with the cows in the stables.",
		buttons: {
			"Cow 1": {
				icon: "Cow",
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows(true);
				}
			},
			"Cow 2": {
				icon: "Cow",
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows(true);
				}
			}
		}
	},
	"Cow Shed": {
		tooltip: "This is the building with the cows and boxes you can push for the freestanding item",
		buttons: {
			"Freestanding Item": {
				icon: "Heart Piece",
				description: "Push the box out of the way and crawl through the hole to get the item.",
				isChildOnly: function() { return true; }
			},
			"Cow 1": {
				icon: "Cow",
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows() && (age === Age.ADULT || Items.OCARINA.playerHas || Equipment.KOKIRI_SWORD.playerHas);
				}
			},
			"Cow 2": {
				icon: "Cow",
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows() && (age === Age.ADULT || Items.OCARINA.playerHas || Equipment.KOKIRI_SWORD.playerHas);
				}
			}
		}
	},
	"Bombchu Bowling": {
		tooltip: "The Bombchu Bowling building.",
		buttons: {
			"Prize 1": {
				icon: "Bombchu",
				description: "This is the first prize you can get.",
				canGet: function(age) {
					return Data.canPlayBombchuBowling(Age.CHILD);
				}
			},
			"Prize 2": {
				icon: "Bombchu",
				description: "This is the second prize you can get",
				canGet: function(age) {
					return Data.canPlayBombchuBowling(Age.CHILD);
				}
			}
		}
	},
	"Fishing Pond": {
		tooltip: "The fishing pond area.",
		buttons: {
			"Child Fishing": {
				description: "The prize you can get as child.",
				tag: "child",
				isChildOnly: function() { return true; }
			},
			"Adult Fishing": {
				description: "The prize you can get as adult.",
				tag: "adult",
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Child Archery": {
		tooltip: "This is the archery minigame. The shopkeeper will only be here as a child.",
		buttons: {
			"Child Archery": {
				description: "This is the prize for completing the minigame as child.",
				isChildOnly: function() { return true; }
			}
		}
	},
	"Adult Archery": {
		tooltip: "This is the archery minigame. The shopkeeper will only be here as adult.",
		buttons: {
			"Adult Archery": {
				description: "This is the prize for completing the minigame as adult.",
				canGet: function(age) {
					return Items.FAIRY_BOW.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Treasure Chest Minigame": {
		tooltip: "The minigame where you probably want the Lens of Truth.",
		buttons: {
			"Treasure Chest Minigame Prize": {
				description: "This is the prize for completing the minigame.",
				canGet: function(age) {
					return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
				}
			}
		}
	},
	"Super Cucco Minigame": {
		tooltip: "Talon's House in Lon Lon Ranch",
		buttons: {
			"Super Cucco Minigame": {
				description: "Only available during the day. This is the prize for completing the minigame.",
				time: function() { return Time.DAY; },
				canGet: function(age) {
					return Data.itemLocationObtained("Castle", "main", "Wake up Talon");
				},
				isChildOnly: function() { return true; }
			},
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "This pot is through the door upstairs and to the left."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "This pot is through the door upstairs and to the left."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "This pot is through the door upstairs and to the left."
			}
		}
	},
	"Windmill": {
		neverHide: true,
		tooltip: "Kakariko Windmill - Doesn't take the Dampe Race entrance into consideration for the heart piece item", //TODO
		buttons: {},
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Windmill-Kak Potion",
				region: "windmill",
				exit: "Windmill Exit"
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData, "windmill");
		}
	},

	// Non-shuffle only locations
	"Mido's House": {
		tooltip: "Mido's House in Kokiri Forest",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chest 1": {
				icon: "Chest",
				description: "The upper left chest."
			},
			"Chest 2": {
				icon: "Chest",
				description: "The lower left chest."
			},
			"Chest 3": {
				icon: "Chest",
				description: "The upper right chest."
			},
			"Chest 4": {
				icon: "Chest",
				description: "The lower right chest."
			},
		}
	},
	"Saria's House": {
		tooltip: "Saria's House in Kokiri Forest",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Heart 1": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The upper left heart."
			},
			"Heart 2": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The lower left heart."
			},
			"Heart 3": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The upper right heart."
			},
			"Heart 4": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The lower right heart."
			}
		}
	},
	"2 Pot Interior": {
		icon: "2 Pots",
		tooltip: "An interior with two pots.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 1."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 2."
			}
		}
	},
	"3 Pot Interior": {
		icon: "3 Pots",
		tooltip: "An interior with three pots.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 1."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 2."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 3."
			}
		}
	}
};

/**
 * Data for the grotto buttons to display under entrances
 */
GrottoGroups = {
	"Generic Grotto": {
		tooltip: "This is the generic grotto with a chest, a gossip stone, bugs, and a fish.",
		hasGossipStone: true,
		buttons: {
			"Chest": {
				description: "The chest in the back of the room.",
			},
			"Left Beehive": {
				icon: "Beehive",
				itemGroup: ItemGroups.BEEHIVE,
				description: "The beehive on the left side of the grotto. If using chus, line up with one of the walls under it and drop it on the 7th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
			"Right Beehive": {
				icon: "Beehive",
				itemGroup: ItemGroups.BEEHIVE,
				description: "The beehive on the right side of the grotto. If using chus, get on the right side of the hive (the darker wall) and drop it on the 7th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				itemGroup: ItemGroups.GOSSIP_STONE,
				description: "The gossip stone in the middle of the room.",
				canGet: function(age) { 
					return Data.canReadGossipStone(age); 
				}
			}
		}
	},
	"1 Scrub": {
		tooltip: "This is a grotto with 1 business scrub.",
		buttons: {
			"Scrub 1": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				description: "Look on the ceiling for this beehive. If using chus, get in the corner by the hive, facing the lighter wall. Sidehop right, left, then press A and let go of everything. Drop the chu on the 7th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
		}
	},
	"2 Scrubs": {
		tooltip: "This is a grotto with 2 business scrubs.",
		buttons: {
			"Scrub 1": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 2": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				description: "Look on the ceiling for this beehive. If using chus, face the closest wall and backflip. Drop the chu on the 5th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age, true);
				}
			},
		}
	},
	"3 Scrubs": {
		tooltip: "This is a grotto with 3 business scrubs.",
		buttons: {
			"Scrub 1": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 2": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 3": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				description: "Look on the right at the ceiling for this beehive. If using chus, face the closest wall and backflip. Drop the chu on the 5th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age, true);
				}
			}
		}
	},
	"Skulltula at Distance": {
		tooltip: "This grotto has a big skulltula and a gold skulltula on the upper wall.",
		buttons: {
			"Skulltula at Distance": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "The gold skulltula is on the wall behind the big skulltula.",
				canGet: function(age) {
					return Data.canGrabShortDistances(age);
				}
			},
		}
	},
	"Cow and Web Grotto": {
		tooltip: "This is the grotto with webs on the walls, a cow, and a skulltula.",
		hasGossipStone: true,
		buttons: {
			"Cow": {
				itemGroup: ItemGroups.COW,
				description: "Burn the web, then play Epona's Song next to the cow.",
				canGet: function(age) {
					return Data.canUseFireItem(age) && Data.canMilkCows();
				}
			},
			"Skulltula at Distance": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "Burn the web. The skulltula is in the section the cow is in.",
				canGet: function(age) {
					if (Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2) {
						return true;
					}
					
					return Data.canUseFireItem(age) && Data.canGrabShortDistances(age);
				}
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				itemGroup: ItemGroups.GOSSIP_STONE,
				description: "Burn the web. The stone is in one of the little rooms.",
				canGet: function(age) { 
					return Data.canUseFireItem(age) && Data.canReadGossipStone(age); 
				}
			},
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Burn the web. The pot is in front of the cow.",
				canGet: function(age) { 
					return Data.canUseFireItem(age); 
				}
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Burn the web. The pot is in front of the cow.",
				canGet: function(age) { 
					return Data.canUseFireItem(age); 
				}
			}
		}
	},
	"Bombable Wall Grotto": {
		tooltip: "This is the grotto with bombable walls and many skulltula sounds.",
		hasGossipStone: true,
		buttons: {
			"Skulltula in Bombable Wall Grotto": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "The skulltula is high up behind the mud wall to your left when you enter.",
				canGet: function(age) {
					return Data.canGrabShortDistances(age) && Data.canBreakMudWalls(age);
				}
			},
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Blow up the mud wall in front of you when you enter to get to this pot.",
				canGet: function(age) { 
					return Data.canBreakMudWalls(age); 
				}
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Blow up the mud wall in front of you when you enter to get to this pot.",
				canGet: function(age) { 
					return Data.canBreakMudWalls(age); 
				}
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Blow up the mud wall in front of you when you enter to get to this pot.",
				canGet: function(age) { 
					return Data.canBreakMudWalls(age); 
				}
			},
			"Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Blow up the mud wall in front of you when you enter to get to this pot.",
				canGet: function(age) { 
					return Data.canBreakMudWalls(age); 
				}
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				itemGroup: ItemGroups.GOSSIP_STONE,
				description: "The gossip stone is behind the mud wall in front of you when you enter.",
				canGet: function(age) { 
					return Data.canBreakMudWalls(age) && Data.canReadGossipStone(age); 
				},
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE;
				}
			}
		}
	},
	"Forest Stage": {
		tooltip: "This is the forest stage.",
		buttons: {
			"Skull Mask Item": {
				description: "Wear the Skull Mask and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 5;
				}
			},
			"Mask of Truth Item": {
				icon: "Mask of Truth",
				description: "Wear the Mask of Truth and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 8;
				}
			}
		}
	},
	"Redead Sun's Song Grave": {
		tooltip: "This is the grave with the single redead.",
		buttons: {
			"Redead Sun's Song Chest": {
				description: "Play the Sun's Song near the redead to spawn a chest.",
				canGet: function(age) {
					return Data.canPlaySong(Songs.SUNS_SONG);
				}
			}
		}
	},
	"Royal Family's Tomb": {
		tooltip: "The Royal Family's Tomb.",
		buttons: {
			"Chest by Lighting Torches": {
				description: "Light the torches in the first room to spawn a chest.",
				canGet: function(age) {
					return Data.canUseFireItem(age);
				}
			},
			"Sun's Song": {
				description: "Go through the rooms to get the item at the end.",
				canGet: function(age) {
					return Data.hasDamagingItem(age);
				}
			}
		}
	},
	"Dampe's Grave": {
		neverHide: true,
		tooltip: "Dampe's Grave - Be sure to mark the windmill entrance to see those items!",
		buttons: {},
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Windmill-Kak Potion",
				region: "dampesGrave",
				exit: "Grave Exit"
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData, "dampesGrave");
		}
	},
	"Wolfos Grotto": {
		tooltip: "This grotto has crystal walls and 2 wolfos.",
		buttons: {
			"Chest in Wolfos Grotto": {
				description: "Kill the wolfos to spawn the chest.",
				canGet: function(age) {
					return Data.hasDamagingItem(age);
				}
			}
		}
	},
	"Two Redead Grotto": {
		tooltip: "This grotto has 2 redeads.",
		buttons: {
			"Chest in 2 Redead Grotto": {
				description: "Kill the redeads to spawn the chest.",
				canGet: function(age) {
					return Data.hasSwordWeapon(age);
				}
			}
		}
	},
	"Cow Grotto": {
		tooltip: "This grotto has rupees and a cow.",
		buttons: {
			"Cow": {
				itemGroup: ItemGroups.COW,
				tag: "cow",
				description: "Play Epona's Song next to the cow.",
				canGet: function(age) {
					return Data.canMilkCows();
				}
			},
			"Red Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "red",
				description: "The central rupee."
			},
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Green Rupee 3": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Green Rupee 4": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			},
			"Green Rupee 5": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 5."
			},
			"Green Rupee 6": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 6."
			},
			"Heart 1": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "heart",
				description: "One of the heats near the cow."
			},
			"Heart 2": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "heart",
				description: "One of the heats near the cow."
			},
			"Heart 3": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "heart",
				description: "One of the heats near the cow."
			},
			"Heart 4": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "heart",
				description: "One of the heats near the cow."
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				tag: "beehive",
				description: "The beehive on the back/right side of the grotto. If using chus, line up with one of the walls under it and drop it on the 6th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
		}
	},
	"Water Heart Piece Grotto": {
		tooltip: "This grotto has a tektite and a heart piece in water.",
		buttons: {
			"Water Heart Piece": {
				description: "Dive down or use iron boots to get the heart piece",
				canGet: function(age) {
					return Data.canSinkGoldenScaleDepth(age);
				}
			}
		}
	},

	// Non-shuffle only locations
	"1 Chest": {
		tooltip: "The grave that only has one chest",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chest": {
				description: "The chest."
			}
		}
	},
	"Octorok Grotto": {
		tooltip: "This grotto has an octorok and 8 rupees in the water.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Red Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The central item."
			},
			"Blue Rupee 1": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the three items surrounding the middle item."
			},
			"Blue Rupee 2": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the three items surrounding the middle item."
			},
			"Blue Rupee 3": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the three items surrounding the middle item."
			},
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the four outside items."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the four outside items."
			},
			"Green Rupee 3": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the four outside items."
			},
			"Green Rupee 4": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the four outside items."
			}
		}
	},
};

/**
 * Data for the boss buttons to display in dungeons with bosses
 */
 BossGroups = {
	"Gohma": {
		tooltip: "Gohma in the Deku Tree",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat Gohma, you must first stun her when her eye is red. You can use the slingshot or deku nuts to do this - nuts don't stun her for nearly as long, though. Once she's down, attack her. The quickest kill is with three deku stick jumpslashes (or one then two crouch stabs).",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
				}
			},
			"Blue Warp": {
				icon: "Gohma",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
				}
			}
		}
	},
	"King Dodongo": {
		tooltip: "King Dodongo in Dodongo's Cavern",
		buttons: {
			"Chest": {
				description: "This chest is in the back of the room.",
				canGet: function(age) { return true; }
			},
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat King Dodongo, you must throw a bomb or bomb flower into his mouth, and then attack him afterward. Note that you should follow him as he rolls so that he gets up faster. If using bomb flowers, try to get them a little bit early, as you need time to run back to him before he shoots his fireball. The quickest kill is with 2 deku stick/master sword jumpslashes, or 1 biggoron's sword jumpslash.",
				canGet: function(age) {
					return Data.canBlastOrSmash(age) && (Items.BOMB.playerHas || Equipment.STRENGTH.playerHas);
				}
			},
			"Blue Warp": {
				icon: "King Dodongo",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return Data.canBlastOrSmash(age) && (Items.BOMB.playerHas || Equipment.STRENGTH.playerHas);
				}
			}
		}
	},
	"Barinade": {
		tooltip: "Barinade in Jabu Jabu's Belly",
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Pot 5": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Pot 6": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the pots on the edge of the room."
			},
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat Barinade, you need the boomerang and also either a sword or at least 3 Deku Sticks. First, dislodge it from the ceiling using the boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && Data.canUseBoomerang(age);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
				icon: "Barinade",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && Data.canUseBoomerang(age);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"Phantom Ganon": {
		tooltip: "Phantom Ganon in the Forest Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "For phase 1 of Phantom Ganon, you must shoot the real version of him that comes out of the paintings. You can use your bow or hookshot for that. The real one is lighter and is the only one that makes sound. Phase 2 is the familiar tenis match. Stun him with his own attacks and damage him when he's stunned. You can also just spam him with the boomerang!",
				canGet: function(age) {
					let canStunBoss = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas));
					let canDamageBoss = Data.hasSwordWeapon(age) || Data.canUseBoomerang(age);
					return canStunBoss && canDamageBoss;
				}
			},
			"Blue Warp": {
				icon: "Phantom Ganon",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let canStunBoss = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas));
					let canDamageBoss = Data.hasSwordWeapon(age) || Data.canUseBoomerang(age);
					return canStunBoss && canDamageBoss;
				}
			}
		}
	},
	"Volvagia": {
		tooltip: "Volvagia in the Fire Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat Volvagia, hit her with your hammer when she pops out of the holes. After that, attack it again. Jumpslashes will do more damage, like usual. You can hit it with arrows while it's flying to do additional damage. If it ever drops rocks on you, you can hang off the side of the cliff to avoid damage.",
				canGet: function(age) {
					let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
					return tunicCheck && Data.canUseHammer(age);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
				icon: "Volvagia",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
					return tunicCheck && Data.canUseHammer(age);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"Morpha": {
		AlwaysRunPostClicks: true,
		tooltip: "Morpha in the Water Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead.",
				canGet: function(age) {
					return age === Age.ADULT && Items.HOOKSHOT.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
				icon: "Morpha",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return age === Age.ADULT && Items.HOOKSHOT.playerHas;
				},
				isAdultOnly: function() { return true; },
				postClick: function(isCompleted) {
					// Mark all of these so that if the dungeon type is switched, we don't lose this data!
					MapLocations["Water Temple"].Regions.bossRoom.ItemLocations["Blue Warp"].playerHas = isCompleted;
					StandardDungeons["Water Temple"].Regions.bossRoom.ItemLocations["Blue Warp"].playerHas = isCompleted;
					MQDungeons["Water Temple"].Regions.bossRoom.ItemLocations["Blue Warp"].playerHas = isCompleted;
				}
			}
		}
	},
	"Bongo Bongo": {
		tooltip: "Bongo Bongo in the Shadow Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "When fighting Bongo Bongo, it helps to NOT have the Hover Boots equipped. When the fight starts, if you hold down, he won't circle you right away. Hit his hands with your bow or hookshot, or slingshot to stun them. Now hit him before he hits you and damage him as much as you can. If you have magic, quickspins can actually stunlock him for a 1-cycle if you do them perfectly.",
				canGet: function(age) {
					let canStunHands = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas));
					return Data.hasSwordWeapon(age) && canStunHands;
				}
			},
			"Blue Warp": {
				icon: "Bongo Bongo",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let canStunHands = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas));
					return Data.hasSwordWeapon(age) && canStunHands;
				}
			}
		}
	},
	"Twinrova": {
		tooltip: "Twinrova in the Spirit Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat Twinrova, reflect one of the sister's shots at the other one. Do this four times to get to the second phase. Now, you must charge your shield with 3 of the same kind of attack. When you do, your shield will shoot it at Twinrova, stunning her. Go hit her! As usual, a jumpslash (Z + A) then crouch stabs (R + spam B) do the most damage.",
				canGet: function(age) {
					return age === Age.ADULT && Equipment.MIRROR_SHIELD.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
				icon: "Twinrova",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return age === Age.ADULT && Equipment.MIRROR_SHIELD.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	}
 };

 /**
  * Data for item locations that we wish to group under one section
  * Mostly for pot/crate shuffle for areas with a ton of checks
  */
 ItemLocationGroups = {
	"Spinning Pot": {
		tooltip: "The spinning pot in Goron City - excludes the heart piece.",
		buttons: {
			"Neutral 1": {
				icon: "Neutral Goron",
				tag: "neutral",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Neutral Goron Prize 1."
			},
			"Neutral 2": {
				icon: "Neutral Goron",
				tag: "neutral",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Neutral Goron Prize 2."
			},
			"Neutral 3": {
				icon: "Neutral Goron",
				tag: "neutral",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Neutral Goron Prize 3."
			},
			"Angry 1": {
				icon: "Angry Goron",
				tag: "angry",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Angry Goron Prize 1."
			},
			"Angry 2": {
				icon: "Angry Goron",
				tag: "angry",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Angry Goron Prize 2."
			},
			"Angry 3": {
				icon: "Angry Goron",
				tag: "angry",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Angry Goron Prize 3."
			},
			"Happy 1": {
				icon: "Happy Goron",
				tag: "happy",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Happy Goron Prize 1 - the heart piece item is still in its old spot."
			},
			"Happy 2": {
				icon: "Happy Goron",
				tag: "happy",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Happy Goron Prize 2 - the heart piece item is still in its old spot."
			}
		}
	},
	"2 Hearts": {
		tooltip: "A group of two recovery hearts",
		buttons: {
			"Heart 1": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Heart 1."
			},
			"Heart 2": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Heart 2."
			}
		}
	},
	"3 Hearts": {
		tooltip: "A group of three recovery hearts",
		buttons: {
			"Heart 1": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Heart 1."
			},
			"Heart 2": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Heart 2."
			},
			"Heart 3": {
				icon: "Recovery Heart",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Heart 3."
			}
		}
	},
	"2 Green Rupees": {
		tooltip: "A group of two green rupees.",
		buttons: {
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			}
		}
	},
	"8 Green Rupees": {
		tooltip: "A group of 8 green rupees.",
		buttons: {
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Green Rupee 3": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Green Rupee 4": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			},
			"Green Rupee 5": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 5."
			},
			"Green Rupee 6": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 6."
			},
			"Green Rupee 7": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 7."
			},
			"Green Rupee 8": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 8."
			}
		}
	},
	"18 Green Rupees": {
		tooltip: "A group of 18 green rupees.",
		buttons: {
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Green Rupee 3": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Green Rupee 4": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			},
			"Green Rupee 5": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 5."
			},
			"Green Rupee 6": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 6."
			},
			"Green Rupee 7": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 7."
			},
			"Green Rupee 8": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 8."
			},
			"Green Rupee 9": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 9."
			},
			"Green Rupee 10": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 10."
			},
			"Green Rupee 11": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 11."
			},
			"Green Rupee 12": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 12."
			},
			"Green Rupee 13": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 13."
			},
			"Green Rupee 14": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 14."
			},
			"Green Rupee 15": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 15."
			},
			"Green Rupee 16": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 16."
			},
			"Green Rupee 17": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 17."
			},
			"Green Rupee 18": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 18."
			}
		}
	},
	"3 Jabu Rupees": {
		tooltip: "The 3 Jabu rupees with various diving requirements",
		buttons: {
			"Green Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Can be obtained by diving to it."
			},
			"Green Rupee 2": {
				icon: "Green Rupee Silver Scale",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Requires iron boots, or silver scale+.",
				canGet: function(age) {
					return Data.canSinkSilverScaleDepth(age);
				}
			},
			"Green Rupee 3": {
				icon: "Green Rupee Gold Scale",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Requires iron boots, or gold scale.",
				canGet: function(age) {
					return Data.canSinkGoldenScaleDepth(age);
				}
			}
		}
	},
	"4 Red Rupees": {
		tooltip: "A group of four red rupees.",
		buttons: {
			"Red Rupee 1": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Red Rupee 2": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Red Rupee 3": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Red Rupee 4": {
				icon: "Red Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			}
		}
	},
	"Rupee Circle": {
		tooltip: "A circle of six green rupees surrounding a red rupee.",
		buttons: {
			"Red Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The central rupee."
			},
			"Green Rupee 1": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Green Rupee 2": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Green Rupee 3": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Green Rupee 4": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			},
			"Green Rupee 5": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 5."
			},
			"Green Rupee 6": {
				icon: "Green Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 6."
			}
		}
	},
	"Expensive Rupee Circle": {
		tooltip: "A circle of six green rupees surrounding a red rupee.",
		buttons: {
			"Red Rupee": {
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The central rupee."
			},
			"Blue Rupee 1": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 1."
			},
			"Blue Rupee 2": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 2."
			},
			"Blue Rupee 3": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 3."
			},
			"Blue Rupee 4": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 4."
			},
			"Blue Rupee 5": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 5."
			},
			"Blue Rupee 6": {
				icon: "Blue Rupee",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Rupee 6."
			}
		}
	},
	"2 Pots": {
		tooltip: "A set of 2 pots.",
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 1."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 2."
			}
		}
	},
	"3 Pots": {
		tooltip: "A set of 3 pots.",
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 1."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 2."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 3."
			}
		}
	},
	"4 Pots": {
		tooltip: "A set of 4 pots.",
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 1."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 2."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 3."
			},
			"Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "Pot 4."
			}
		}
	},
	"14 Pots": {
		tooltip: "A set of 14 pots.",
		buttons: {
			"Pot 1": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 2": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 3": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 4": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 5": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 6": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 7": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 8": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 9": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 10": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 11": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 12": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 13": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			},
			"Pot 14": {
				icon: "Pot",
				itemGroup: ItemGroups.POT,
				description: "One of the many pots in the room."
			}
		}
	},
	"2 Crates": {
		tooltip: "A set of 2 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			}
		}
	},
	"3 Crates": {
		tooltip: "A set of 3 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			}
		}
	},
	"4 Crates": {
		tooltip: "A set of 4 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			},
			"Crate 4": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 4."
			}
		}
	},
	"5 Crates": {
		tooltip: "A set of 5 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			},
			"Crate 4": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 4."
			},
			"Crate 5": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 5."
			}
		}
	},
	"6 Crates": {
		tooltip: "A set of 6 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			},
			"Crate 4": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 4."
			},
			"Crate 5": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 5."
			},
			"Crate 6": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 6."
			}
		}
	},
	"7 Crates": {
		tooltip: "A set of 7 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			},
			"Crate 4": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 4."
			},
			"Crate 5": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 5."
			},
			"Crate 6": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 6."
			},
			"Crate 7": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 7."
			}
		}
	},
	"14 Crates": {
		tooltip: "A set of 14 crates.",
		buttons: {
			"Crate 1": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 1."
			},
			"Crate 2": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 2."
			},
			"Crate 3": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 3."
			},
			"Crate 4": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 4."
			},
			"Crate 5": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 5."
			},
			"Crate 6": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 6."
			},
			"Crate 7": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 7."
			},
			"Crate 8": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 8."
			},
			"Crate 9": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 9."
			},
			"Crate 10": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 10."
			},
			"Crate 11": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 11."
			},
			"Crate 12": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 12."
			},
			"Crate 13": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 13."
			},
			"Crate 14": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "Crate 14."
			}
		}
	},
	"2 Scrubs": {
		tooltip: "A group of 2 business scrubs.",
		icon: "2 Scrubs No Beehive",
		buttons: {
			"Scrub 1": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 2": {
				icon: "Scrub",
				description: "Buy the item from the scrub.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	}
 };

