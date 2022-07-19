EntranceData = {
	/**
	 * Handles the logic for when a "tunneling" interior is selected
	 * This sets the data for this side, as well as the other side, if necessary
	 * @param itemLocation - the item location
	 * @param isSelected - whether the entrance is being selected or cleared
	 * @param otherSideData - TODO: document!
	 */
	handleInteriorPostClick(itemLocation, isSelected, otherSideData) {
		//TODO: deal with multiple exits entered and cleared... might need to keep interiorTravelData in some form
		let interiorExit = MapLocations[otherSideData.map].Regions[otherSideData.region].Exits[otherSideData.exit].OwExit;
		if (isSelected) {
			// 	Data.addToInteriorTravelData(thisEntranceName, itemLocation);
			itemLocation.OwShuffleMap = otherSideData.map;
			itemLocation.OwShuffleRegion = otherSideData.region;
			itemLocation.OwShuffleExitName = otherSideData.exit;

			interiorExit.OwShuffleMap = itemLocation.ExitMap;
			interiorExit.OwShuffleRegion = itemLocation.ExitRegion;
			interiorExit.OwShuffleExitName = itemLocation.Name;
		} else {
			//Data.removeFromInteriorTravelData(thisEntranceName, itemLocation);
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
		 if (!itemLocation || !itemLocation.EntranceGroup) {
			 return;
		}
		
		if (!itemLocation.IsInterior && !itemLocation.IsGrotto && !itemLocation.IsBoss) {
			return;
		}

		let entranceGroup = itemLocation.EntranceGroup;
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
			let exitData = {
				map: "Interiors",
				region: "kakPotionShop",
				exit: "Potion Shop Front",
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData);
		}
	},
	"Potion Shop Back": {
		tooltip: "The Kakariko potion shop - this is the back entrance (farthest from the camera). Mark the front entrance for the shop itself.",
		neverHide: true,
		buttons: { },
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Interiors",
				region: "kakPotionShop",
				exit: "Potion Shop Back",
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData);
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
					return (Settings.RandomizerSettings.openKakariko && Items.MASK_SLOT.currentUpgrade >= 3) || Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
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
					let canGetToPoe = Data.canAccessMap(age, "Hyrule Field");
					return (canGetToPoe && Items.FAIRY_BOW.playerHas && Data.hasBottle()) || Items.BIG_POE.playerHas;
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
		time: function() { return Time.DAY; },
		buttons: {
			"Super Cucco Minigame": {
				itemLocation: "Talon's Super Cucco Minigame",
				description: "This is the prize for completing the minigame.",
				canGet: function(age) {
					return Items.MASK_SLOT.currentUpgrade >= 2 && Data.itemLocationObtained("Castle", "main", "Wake up Talon");
				},
				isChildOnly: function() { return true; }
			},
		},
		postClick: function(itemLocation, isSelected) {
			let itemLocationTimeIconDiv = document.getElementById(`${itemLocation.Name}-time-icon`);
			if (itemLocationTimeIconDiv) {
				itemLocationTimeIconDiv.style.backgroundImage = Data.getTimeImagePath(itemLocation, !isSelected);
			}
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
					if (age === Age.CHILD) {
						let canChildAccessDampe = Data.interiorTravelData && 
							Data.interiorTravelData.dampesGrave &&
							Data.interiorTravelData.dampesGrave.WalkInfo &&
							Data.interiorTravelData.dampesGrave.WalkInfo.canObtainItem &&
							Data.interiorTravelData.dampesGrave.WalkInfo.canObtainItem.Child;

						return Data.canUseBoomerang(age) ||
							(canChildAccessDampe && Data.canGetToWindmillFromDampe(age));
					}
					
					return Settings.GlitchesToAllow.windmillHPWithNothing ||
						(Settings.GlitchesToAllow.windmillHPWithHookshot && Items.HOOKSHOT.playerHas)
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
					let windmillData = Data.interiorTravelData.windmill;
					if (windmillData && windmillData.EntranceGroup) {
						isCompleted = windmillData.EntranceGroup.completed["Drain Well Water"]; 
					} else {
						isCompleted = false;
					}
					Data.interiorShuffleIsWindmillDrained = isCompleted;
				}
			}
		},
		postClick: function(itemLocation, isSelected) {
			let exitData = {
				map: "Interiors",
				region: "windmill",
				exit: "Windmill Exit"
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData);
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
					if (Data.canWeirdShot(age) && Items.HOOKSHOT.currentUpgrade === 2) {
						return true;
					}
					
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
					let canGetSkulltula = Data.canGrabShortDistances(age);
					return canGetSkulltula && (age === Age.ADULT || Data.canBreakMudWalls(age));
				}
			},
			"Gossip Stone": {
				description: "The gossip stone is behind one of the bombable walls.",
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
			let exitData = {
				map: "Interiors",
				region: "dampesGrave",
				exit: "Grave Exit"
			}
			EntranceData.handleInteriorPostClick(itemLocation, isSelected, exitData);
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

/**
 * Data for the boss buttons to display in dungeons with bosses
 */
 BossGroups = {
	"Gohma": {
		tooltip: "Gohma in the Deku Tree",
		buttons: {
			"Heart Container": {
				description: "To defeat Gohma, you must first stun her when her eye is red. You can use the slingshot or deku nuts to do this - nuts don't stun her for nearly as long, though. Once she's down, attack her. The quickest kill is with three deku stick jumpslashes (or one then two crouch stabs).",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
				}
			},
			"Blue Warp": {
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
				description: "To defeat King Dodongo, you must throw a bomb or bomb flower into his mouth, and then attack him afterward. Note that you should follow him as he rolls so that he gets up faster. If using bomb flowers, try to get them a little bit early, as you need time to run back to him before he shoots his fireball. The quickest kill is with 2 deku stick/master sword jumpslashes, or 1 biggoron's sword jumpslash.",
				canGet: function(age) {
					return Data.canBlastOrSmash(age) && (Items.BOMB.playerHas || Equipment.STRENGTH.playerHas);
				}
			},
			"Blue Warp": {
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
			"Heart Container": {
				description: "To defeat Barinade, you need the boomerang and also either a sword or at least 3 Deku Sticks. First, dislodge it from the ceiling using the boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
				canGet: function(age) {
					return Data.hasSwordWeapon(age) && Data.canUseBoomerang(age);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
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
				description: "For phase 1 of Phantom Ganon, you must shoot the real version of him that comes out of the paintings. You can use your bow or hookshot for that. The real one is lighter and is the only one that makes sound. Phase 2 is the familiar tenis match. Stun him with his own attacks and damage him when he's stunned. You can also just spam him with the boomerang!",
				canGet: function(age) {
					let canStunBoss = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas));
					let canDamageBoss = Data.hasSwordWeapon(age) || Data.canUseBoomerang(age);
					return canStunBoss && canDamageBoss;
				}
			},
			"Blue Warp": {
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
				description: "To defeat Volvagia, hit her with your hammer when she pops out of the holes. After that, attack it again. Jumpslashes will do more damage, like usual. You can hit it with arrows while it's flying to do additional damage. If it ever drops rocks on you, you can hang off the side of the cliff to avoid damage.",
				canGet: function(age) {
					let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
					return tunicCheck && Data.canUseHammer(age);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
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
				description: "To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead.",
				canGet: function(age) {
					return age === Age.ADULT && Items.HOOKSHOT.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
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
				description: "When fighting Bongo Bongo, it helps to NOT have the Hover Boots equipped. When the fight starts, if you hold down, he won't circle you right away. Hit his hands with your bow or hookshot, or slingshot to stun them. Now hit him before he hits you and damage him as much as you can. If you have magic, quickspins can actually stunlock him for a 1-cycle if you do them perfectly.",
				canGet: function(age) {
					let canStunHands = (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas) ||
						(age === Age.ADULT && (Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas));
					return Data.hasSwordWeapon(age) && canStunHands;
				}
			},
			"Blue Warp": {
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
				description: "To defeat Twinrova, reflect one of the sister's shots at the other one. Do this four times to get to the second phase. Now, you must charge your shield with 3 of the same kind of attack. When you do, your shield will shoot it at Twinrova, stunning her. Go hit her! As usual, a jumpslash (Z + A) then crouch stabs (R + spam B) do the most damage.",
				canGet: function(age) {
					return age === Age.ADULT && Equipment.MIRROR_SHIELD.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return age === Age.ADULT && Equipment.MIRROR_SHIELD.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	}
 }

