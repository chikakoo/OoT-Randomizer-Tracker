EntranceData = {
	/**
	 * Handles the logic for when a "tunneling" interior is selected
	 * This sets the data for this side, as well as the other side, if necessary
	 * @param itemLocation - the item location
	 * @param isSelected - whether the entrance is being selected or cleared
	 * @param thisEntranceName - the name of the entrance that was selected or cleared
	 * @param otherSideEntranceName - the name of the entrance linked to the one defined in "thisEntranceName"
	 * @param forwardTravelFunction - the function that determines whether the player can actually travel to the other exit
	 *   This will be placed in the CustomRequirement of the OwExit object, and should take the age parameter into consideration
	 * @param backwardTravelFunction - the function that determines whether the player can actually travel to here FROM the other exit
	 *   This will be placed in the CustomRequirement of the OwExit object, and should take the age parameter into consideration
	 */
	handleInteriorPostClick(itemLocation, isSelected, thisEntranceName, otherSideEntranceName, forwardTravelFunction, backwardTravelFunction) {
		let thisExitList = MapLocations[itemLocation.Map].Regions[itemLocation.Region].Exits;
		let thisName = `Interior-${thisEntranceName}`;
		let otherName = `Interior-${otherSideEntranceName}`;

		let otherSideLocation = Data.interiorTravelData[otherSideEntranceName];
		if (!Settings.RandomizerSettings.shuffleInteriorEntrances && otherSideEntranceName === "windmill") {
			otherSideLocation = MapLocations["Kakariko Village"].Regions["main"].ItemLocations["Windmill"];
		}

		if (isSelected) {
			Data.interiorTravelData[thisEntranceName] = itemLocation;

			if (otherSideLocation) {
				itemLocation.OwShuffleMap = otherSideLocation.Map
				itemLocation.OwShuffleRegion = otherSideLocation.Region;
				thisExitList[thisName] = { OwExit: { 
					Name: itemLocation.Name + " ",
					Map: itemLocation.Map, 
					Region: itemLocation.Region,
					OwShuffleMap: otherSideLocation.Map, 
					OwShuffleRegion: otherSideLocation.Region,
					OwShuffleExitName: otherName,
					IsInteriorExit: true,
					MapInfo: itemLocation.MapInfo,
					CustomRequirement: forwardTravelFunction
				}};

				otherSideLocation.OwShuffleMap = itemLocation.Map
				otherSideLocation.OwShuffleRegion = itemLocation.Region;

				let otherExitList = MapLocations[otherSideLocation.Map].Regions[otherSideLocation.Region].Exits;
				otherExitList[otherName] = { OwExit: { 
					Name: otherSideLocation.Name + " ",
					Map: otherSideLocation.Map,
					Region: otherSideLocation.Region,
					OwShuffleMap: itemLocation.Map, 
					OwShuffleRegion: itemLocation.Region,
					OwShuffleExitName: thisName,
					IsInteriorExit: true,
					MapInfo: otherSideLocation.MapInfo,
					CustomRequirement: backwardTravelFunction
				}};

				itemLocation.hidden = true;
				otherSideLocation.hidden = true;
				OwExits[itemLocation.Map][otherName] = thisExitList[thisName].OwExit;
				OwExits[otherSideLocation.Map][thisName] = otherExitList[otherName].OwExit;
			}
		} else {
			Data.interiorTravelData[thisEntranceName] = null;
			delete itemLocation.OwShuffleMap;
			delete itemLocation.OwShuffleRegion;
			delete itemLocation.CustomRequirement;
			delete thisExitList[thisName];
			delete OwExits[itemLocation.Map][otherName];
			delete itemLocation.hidden;

			if (otherSideLocation) {
				delete otherSideLocation.OwShuffleMap;
				delete otherSideLocation.OwShuffleRegion;

				let otherExitList = MapLocations[otherSideLocation.Map].Regions[otherSideLocation.Region].Exits;
				delete otherExitList[otherName];
				delete OwExits[otherSideLocation.Map][thisName];
				delete otherSideLocation.hidden;
			}
		}
	},

	/**
	 * Common function for whether you can get to the windmill from dampe's grave
	 */
	canGetToWindmillFromDampe(age) {
		return age === Age.CHILD ? Data.canGroundJumpWithBomb(Age.CHILD) : Data.canPlaySong(Songs.SONG_OF_TIME);
	},

	/**
	 * Runs the post click functions on all completed items of a given item location
	 * @param itemLocation The item location to check
	 */
	runPostClicksOnCompletedItems: function(itemLocation) {
		if (!itemLocation || !itemLocation.EntranceGroup || !itemLocation.EntranceGroup.completed) {
			return;
		}

		if (!itemLocation.IsInterior && !itemLocation.IsGrotto) {
			return;
		}

		let entranceGroup = itemLocation.EntranceGroup;
		let name = entranceGroup.name;
		Object.keys(entranceGroup.completed).forEach(function(buttonName) {
			let buttonItem;

			if (itemLocation.IsInterior) {
				buttonItem = InteriorGroups[name].buttons[buttonName];
			}

			else if (itemLocation.IsGrotto) {
				buttonItem = GrottoGroups[name].buttons[buttonName];
			}

			if (buttonItem && buttonItem.postClick) {
				buttonItem.postClick(true);
			}
		});
	}
}

/**
 * Data for the interior buttons to display under entrances
 */
InteriorGroups = {
	"Link's House": {
		map: "Kokiri Forest",
		tooltip: "Link's House",
		isLinksHouse: true,
		neverHide: true,
		buttons: {
			"Cow in Link's House": {
				itemLocation: "Cow in Link's House",
				description: "As an adult, beat Malon's Epona challenge to unlock the cow in Link's house.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canRideEpona(age) && Data.canMilkCows(true) && Data.canAccessMap(age, "Lon Lon Ranch", "main");
				},
				isAdultOnly: function() { return true; }
			}
		},
		postClick: function(itemLocation, isSelected) {
			if (isSelected) {
				Data.linksHouseLocation = { map: itemLocation.Map, region: itemLocation.Region };
			} else {
				Data.linksHouseLocation = {};
			}
		}
	},
	"Temple of Time": {
		map: "Temple of Time",
		tooltip: "The Temple of Time",
		isTempleOfTime: true,
		neverHide: true,
		buttons: {
			"Prelude of Light": {
				itemLocation: "Prelude of Light",
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
				itemLocation: "Light Arrows",
				description: "When you have the Shadow and Spirit Medallions, simply enter the Temple of Time as adult to receive the item.",
				canGet: function(age) {
					return Medallions.SHADOW_MEDALLION.playerHas && Medallions.SPIRIT_MEDALLION.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		},
		postClick: function(itemLocation, isSelected) {
			if (isSelected) {
				Data.templeOfTimeLocation = { map: itemLocation.Map, region: itemLocation.Region };
			} else {
				Data.templeOfTimeLocation = {};
			}
		}
	},
	"Shop": {
		tooltip: "Any shop except the Happy Mask Shop or potion shop with two exits.",
		isShop: true,
		buttons: {
			"Shop": {
				description: "Buy the items you need here - put anything you need to get later in the notes."
			}
		}
	},
	"Potion Shop Front": {
		tooltip: "The Kakariko potion shop - this is the front entrance (closest to the camera).",
		isShop: true,
		neverHide: true,
		buttons: {
			"Shop": {
				isAdultOnly: function() { return true; },
				description: "Buy the items you need here - put anything you need to get later in the notes."
			}			
		},
		postClick: function(itemLocation, isSelected) {
			let travelRequirement = function(age) {
				return age === Age.ADULT;
			};
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, "kakPotionShopFront", "kakPotionShopBack", travelRequirement);
		}
	},
	"Potion Shop Back": {
		tooltip: "The Kakariko potion shop - this is the back entrance (farthest from the camera). Mark the front entrance for the shop itself.",
		neverHide: true,
		buttons: { },
		postClick: function(itemLocation, isSelected) {
			let backwardsTravelRequirement = function(age) {
				return age === Age.ADULT;
			};
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, "kakPotionShopBack", "kakPotionShopFront", null, backwardsTravelRequirement);
		}
	},
	"Happy Mask Shop": {
		//map: "Market",
		tooltip: "The Happy Mask Shop",
		buttons: {
			"Borrow Keaton Mask": {
				itemLocaton: "Borrow Keaton Mask",
				description: "After showing the Kakariko Village guard Zelda's Letter, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
				}
			},
			"Borrow Skull Mask": {
				itemLocaton: "Borrow Skull Mask",
				description: "After selling the Keaton Mask to the Kakariko Guard, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask");
				}
			},
			"Borrow Spooky Mask": {
				itemLocaton: "Borrow Spooky Mask",
				description: "After selling the Skull Mask to the Skull Kid in Lost Woods, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Lost Woods", "firstHalf", "Sell Skull Mask");
				}
			},
			"Borrow Bunny Hood": {
				itemLocaton: "Borrow Bunny Hood",
				description: "After selling the Spooky Mask to the graveyard kid, head to the mask shop to borrow this mask.",
				canGet: function(age) {
					return Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask");
				}
			},
			"Borrow Mask of Truth": {
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
				description: "Talk to the guy on the right hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 10;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 10;
				}
			},
			"20 Reward": {
				description: "Talk to the guy on the left hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 20;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 20;
				}
			},
			"30 Reward": {
				description: "Talk to the middle guy.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 30;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 30;
				}
			},
			"40 Reward": {
				description: "Talk to the guy second from the left",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 40;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 40;
				}
			},
			"50 Reward": {
				description: "Talk to the guy second from the right",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 50;
				},
				canGet: function(age) {
					return Equipment.SKULLTULA_TOKENS.count >= 50;
				}
			},
		}
	},
	"Lakeside Lab": {
		//map: "Lake Hylia",
		tooltip: "This is the lab with the professor and the pool of water in the back.",
		buttons: {
			"Lakeside Heart Piece": {
				itemLocation: "Heart Piece in Lab",
				description: "Use the golden scale and dive to touch the bottom of the water area. The professor will give you this item.",
				canGet: function(age) {
					let hasGoldScale = Equipment.SCALE.currentUpgrade === 2;
					if (age === Age.CHILD) { return hasGoldScale; }
					
					let canGetWithoutScale = Settings.GlitchesToAllow.labHPWithoutGoldenScale && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas;
					return hasGoldScale || canGetWithoutScale;
				}
			},
			"Lakeside Skulltula": {
				itemLocation: "Skulltula in Lab Water",
				description: "This skulltula is on the bottom of the water area. Equip the iron boots and sink down. Roll into the box to reveal it.",
				canGet: function(age) {
					if (age === Age.CHILD) { return false; }
					return Equipment.IRON_BOOTS.playerHas && Items.HOOKSHOT.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Market Guard House": {
		map: "Market Entrance",
		tooltip: "This is the pot room as a child, and the big poe buyer room as an adult.",
		buttons: {
			"Child Skulltula": {
				itemLocation: "Skulltula in Pot-filled House",
				description: "This is the skulltula in the crate in the back of the room.",
				isChildOnly: function() { return true; }
			},
			"Adult Big Poe Reward": {
				itemLocation: "Big Poe Reward",
				description: "Give the poe salesman all the poes he needs to get this item.",
				canGet: function(age) {
					return Items.FAIRY_BOW.playerHas && Data.hasBottle();
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Back of Impa's House": {
		map: "Kakariko Village",
		tooltip: "Inside the cage with the cow and the freestanding item.",
		buttons: {
			"Freestanding Item": {
				itemLocation: "Heart Piece in Impa's House",
				description: "Simply grab the item in the room."
			},
			"Cow": {
				itemLocation: "Cow Impa's House",
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
	"Stable": {
		map: "Lon Lon Ranch",
		tooltip: "This is the building with the cows in the stables.",
		buttons: {
			"Cow 1": {
				itemLocation: "Left Cow in Stable",
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows(true);
				}
			},
			"Cow 2": {
				itemLocation: "Right Cow in Stable",
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
		map: "Lon Lon Ranch",
		tooltip: "This is the building with the cows and boxes you can push for the freestanding item",
		buttons: {
			"Freestanding Item": {
				itemLocation: "Cow Shed Item in Back",
				description: "Push the box out of the way and crawl through the hole to get the item.",
				isChildOnly: function() { return true; }
			},
			"Cow 1": {
				itemLocation: "Left Cow in Cow Shed",
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows() && (age === Age.ADULT || Items.OCARINA.playerHas || Equipment.KOKIRI_SWORD.playerHas);
				}
			},
			"Cow 2": {
				itemLocation: "Right Cow in Cow Shed",
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
		//map: "Market",
		tooltip: "The Bombchu Bowling building.",
		buttons: {
			"Prize 1": {
				itemLocation: "Bombchu Bowling Bomb Bag Prize",
				description: "This is the first prize you can get.",
				canGet: function(age) {
					return Data.canPlayBombchuBowling(Age.CHILD);
				}
			},
			"Prize 2": {
				itemLocation: "Bombchu Bowling Heart Piece Prize",
				description: "This is the second prize you can get",
				canGet: function(age) {
					return Data.canPlayBombchuBowling(Age.CHILD);
				}
			}
		}
	},
	"Fishing Pond": {
		map: "Lake Hylia",
		tooltip: "The fishing pond area.",
		buttons: {
			"Child Fishing": {
				itemLocation: "Fishing Child",
				description: "The prize you can get as child.",
				isChildOnly: function() { return true; }
			},
			"Adult Fishing": {
				itemLocation: "Fishing Adult",
				description: "The prize you can get as adult.",
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Child Archery": {
		map: "Market",
		tooltip: "This is the archery minigame. The shopkeeper will only be here as a child.",
		buttons: {
			"Child Archery": {
				itemLocation: "Slingshot Minigame",
				description: "This is the prize for completing the minigame as child.",
				isChildOnly: function() { return true; }
			}
		}
	},
	"Adult Archery": {
		map: "Kakariko Village",
		tooltip: "This is the archery minigame. The shopkeeper will only be here as adult.",
		buttons: {
			"Adult Archery": {
				itemLocation: "Archery Minigame",
				description: "This is the prize for completing the minigame as adult.",
				canGet: function(age) {
					return Items.FAIRY_BOW.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Treasure Chest Minigame": {
		//map: "Market",
		tooltip: "The minigame where you probably want the Lens of Truth.",
		buttons: {
			"Treasure Chest Minigame Prize": {
				itemLocation: "Treasure Chest Minigame",
				description: "This is the prize for completing the minigame.",
				canGet: function(age) {
					return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
				}
			}
		}
	},
	"Super Cucco Minigame": {
		map: "Lon Lon Ranch",
		tooltip: "Talon's House in Lon Lon Ranch",
		buttons: {
			"Super Cucco Minigame": {
				itemLocation: "Talon's Super Cucco Minigame",
				description: "This is the prize for completing the minigame.",
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 2 && Data.itemLocationObtained("Castle", "main", "Wake up Talon");
				},
				isChildOnly: function() { return true; }
			},
		}
	},
	"Windmill": {
		map: "Kakariko Village",
		neverHide: true,
		tooltip: "Kakariko Windmill - Doesn't take the Dampe Race entrance into consideration for the heart piece item", //TODO
		buttons: {
			"Windmill Heart Piece": {
				itemLocation: "Heart Piece in Windmill",
				description: "As a child, you can get this with a well-aimed Boomerang. Use a well-aimed hookshot and jumpslash, or do a trick to jump to the platform.",
				canGet: function(age) {
					if (Data.canUseBoomerang(age)) {
						return true;
					}
					
					return age === Age.ADULT &&
					(
						Settings.GlitchesToAllow.windmillHPWithNothing || // Trick to get there with nothing
						(Settings.GlitchesToAllow.windmillHPWithHookshot && Items.HOOKSHOT.playerHas)
					);
				}
			},
			"Song of Storms":
			{
				itemLocation: "Song of Storms",
				description: "Take out your ocarina by the windmill guy to get this.",
				canGet: function(age) { return Data.canPlaySongs() },
				isAdultOnly: function() { return true; }
			},
			"Drain Well Water":
			{
				itemLocation: "Drain Well Water",
				description: "Play the song of storms by the windmill guy - isn't actually an item check.",
				canGet: function(age) { return Data.canPlaySong(Songs.SONG_OF_STORMS); },
				isChildOnly: function() { return true; },
				postClick: function(isCompleted) {
					Data.interiorShuffleIsWindmillDrained = isCompleted;
				}
			}
		},
		postClick: function(itemLocation, isSelected) {
			let travelRequirement = function(age) { return false; };
			let reverseTravelRequirement = function(age) { return EntranceData.canGetToWindmillFromDampe(age); };
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, "windmill", "dampesGrave", travelRequirement, reverseTravelRequirement);
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
				canGet: function(age) { return true; }
			},
			"Gossip Stone": {
				description: "The gossip stone in the middle of the room.",
				canGet: function(age) { 
					return Data.canReadGossipStone(age); 
				},
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE;
				}
			}
		}
	},
	"1 Scrub": {
		tooltip: "This is a grotto with 1 business scrub.",
		buttons: {
			"Scrub 1": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"2 Scrubs": {
		tooltip: "This is a grotto with 2 business scrubs.",
		buttons: {
			"Scrub 1": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 2": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"3 Scrubs": {
		tooltip: "This is a grotto with 3 business scrubs.",
		buttons: {
			"Scrub 1": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 2": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Scrub 3": {
				description: "Buy the item from the scrub.",
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"Skulltula at Distance": {
		map: "Hyrule Field",
		tooltip: "This grotto has a big skulltula and a gold skulltula on the upper wall.",
		buttons: {
			"Skulltula at Distance": {
				itemLocation: "Skulltula in Grotto by Kakariko",
				description: "The gold skulltula is on the wall behind the big skulltula.",
				canGet: function(age) {
					return Data.canGrabShortDistances(age);
				}
			},
		}
	},
	"Cow and Web Grotto": {
		map: "Hyrule Field",
		tooltip: "This is the grotto with webs on the walls, a cow, and a skulltula.",
		hasGossipStone: true,
		buttons: {
			"Cow": {
				itemLocation: "Cow in Grotto by Gerudo",
				description: "Burn the web, then play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canUseFireItem(age) && Data.canMilkCows();
				}
			},
			"Skulltula at Distance": {
				itemLocation: "Skulltula in Grotto by Gerudo",
				description: "Burn the web. The skulltula is in the section the cow is in.",
				canGet: function(age) {
					return Data.canUseFireItem(age) && Data.canGrabShortDistances(age);
				}
			},
			"Gossip Stone": {
				description: "Burn the web. The stone is in one of the little rooms.",
				canGet: function(age) { 
					return Data.canUseFireItem(age) && Data.canReadGossipStone(age); 
				},
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE;;
				}
			}
		}
	},
	"Bombable Wall Grotto": {
		map: "Castle",
		tooltip: "This is the grotto with bombable walls and many skulltula sounds.",
		hasGossipStone: true,
		buttons: {
			"Skulltula in Bombable Wall Grotto": {
				itemLocation: "Skulltula in Song of Storms Grotto",
				description: "The skulltula is high up behind one of the bombable walls. As an adult, you can actually use your hookshot to get the skulltula without blowing up the wall.",
				canGet: function(age) {
					if (age === Age.CHILD && !Data.hasExplosives()) { return false; }
					return Data.canGrabShortDistances(age);
				}
			},
			"Gossip Stone": {
				description: "The gossip stone is behind one of the bombable walls.",
				canGet: function(age) { 
					return Data.canBlastOrSmash(age) && Data.canReadGossipStone(age); 
				},
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE;
				}
			}
		}
	},
	"Forest Stage": {
		map: "Lost Woods",
		tooltip: "This is the forest stage.",
		buttons: {
			"Skull Mask Item": {
				itemLocation: "Forest Stage Skull Mask",
				description: "Wear the Skull Mask and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 5;
				}
			},
			"Mask of Truth Item": {
				itemLocation: "Forest Stage Mask of Truth",
				description: "Wear the Mask of Truth and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 8;
				}
			}
		}
	},
	"Redead Sun's Song Grave": {
		//map: "Graveyard",
		tooltip: "This is the grave with the single redead.",
		buttons: {
			"Redead Sun's Song Chest": {
				itemLocation: "Chest in Grave with Redead",
				description: "Play the Sun's Song near the redead to spawn a chest.",
				canGet: function(age) {
					return Data.canPlaySong(Songs.SUNS_SONG);
				}
			}
		}
	},
	"Royal Family's Tomb": {
		//map: "Graveyard",
		tooltip: "The Royal Family's Tomb.",
		buttons: {
			"Chest by Lighting Torches": {
				itemLocation: "Royal Family's Tomb Chest",
				description: "Light the torches in the first room to spawn a chest.",
				canGet: function(age) {
					return Data.canUseFireItem(age);
				}
			},
			"Sun's Song": {
				itemLocation: "Sun's Song",
				description: "Go through the rooms to get the item at the end.",
				canGet: function(age) {
					return Data.hasDamagingItem(age);
				}
			}
		}
	},
	"Dampe's Grave": {
		map: "Graveyard",
		neverHide: true,
		tooltip: "Dampe's Grave - Be sure to mark the windmill entrance to see those items!",
		buttons: {
			"Hookshot Chest": {
				itemLocation: "Hookshot Chest from Dampe Race",
				description: "This is the prize for completing the Dampe Race for the first time.",
				canGet: function(age) {
					return true;
				}
			},
			"Race Reward": {
				itemLocation: "Heart Piece from Dampe Race",
				description: "This is the prize for completing the Dampe Race in less than one minute.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.dampeRaceHPDisabled;
				},
				canGet: function(age) {
					return true;
				}
			}
		},
		postClick: function(itemLocation, isSelected) {
			let travelRequirement = function(age) { return EntranceData.canGetToWindmillFromDampe(age); };
			let reverseTravelRequirement = function(age) { return false; };
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, "dampesGrave", "windmill", travelRequirement, reverseTravelRequirement);
		}
	},
	"Wolfos Grotto": {
		map: "Sacred Forest Meadow",
		tooltip: "This grotto has crystal walls and 2 wolfos.",
		buttons: {
			"Chest in Wolfos Grotto": {
				itemLocation: "Grotto by Entrance",
				description: "Kill the wolfos to spawn the chest.",
				canGet: function(age) {
					return Data.hasDamagingItem(age);
				}
			}
		}
	},
	"Two Redead Grotto": {
		//map: "Kakariko Village",
		tooltip: "This grotto has 2 redeads.",
		buttons: {
			"Chest in 2 Redead Grotto": {
				itemLocation: "Grotto With Redeads",
				description: "Kill the redeads to spawn the chest.",
				canGet: function(age) {
					return Data.hasSwordWeapon(age);
				}
			}
		}
	},
	"Cow Grotto": {
		map: "Death Mountain Trail",
		tooltip: "This grotto has rupees and a cow.",
		buttons: {
			"Cow": {
				itemLocation: "Cow Grotto Before Volcano Path",
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows();
				}
			}
		}
	},
	"Water Heart Piece Grotto": {
		map: "Hyrule Field",
		tooltip: "This grotto has a tektite and a heart piece in water.",
		buttons: {
			"Water Heart Piece": {
				itemLocation: "Grotto by North River Tree",
				description: "Dive down or use iron boots to get the heart piece",
				canGet: function(age) {
					return Data.canSinkGoldenScaleDepth(age);
				}
			}
		}
	}
};

