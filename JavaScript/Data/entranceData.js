EntranceData = {
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
		Object.keys(entranceGroup.buttons).forEach(function(buttonName) {
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
				let isCompleted = entranceGroup.buttons[buttonName].completed;
				buttonItem.postClick(isCompleted);
			}
		});
	}
},

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
					return Data.itemLocationObtained("Lon Lon Ranch", "main", "Unlock Cow in House") && Data.canMilkCows(true);
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
		shouldNotTrigger: function(isSelected) {
			let shouldNotTrigger = isSelected && !!Data.linksHouseLocation.map;
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
			"Free Raru Item": {
				icon: "Light Medallion",
				description: "This is the light medallion replacement if dungeon rewards are shuffled. Enter the Master Sword pedestal room to get it.",
			},
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
		shouldNotTrigger: function(isSelected) {
			let shouldNotTrigger = isSelected && !!Data.templeOfTimeLocation.map;
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
				description: "Buy the items you need here - put anything you need to get later in the notes.",
				canGet: function(age,  itemLocation) {
					return Data.canBuyFromShop(age, itemLocation);
				}
			}
		}
	},
	"Kokiri Shop": {
		tooltip: "The Kokiri Forest shop with the rupee in the back.",
		excludeFromGroup: function() { 
			return !Settings.RandomizerSettings.shuffleWonderitems;
		},
		isShop: true,
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
		overworldLink: OwExits["Windmill-Kak Potion"]["Potion Shop Front"]
	},
	"Potion Shop Back": {
		tooltip: "The Kakariko potion shop - this is the back entrance (farthest from the camera).",
		neverHide: true,
		buttons: {},
		overworldLink: OwExits["Windmill-Kak Potion"]["Potion Shop Back"]
	},
	"Granny's Potion Shop": {
		tooltip: "The potion shop with the red carpet and the granny holding a cat.",
		buttons: {
			"Show Odd Mushroom to Granny": {
				icon: "Odd Mushroom",
				description: "Show Granny the Odd Mushroom to recieve an item.",
				canGet: function(age) {
					return ItemData.canUse(age, AdultTradeItems.ODD_MUSHROOM);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Buy Blue Potion Item": {
				icon: "Blue Potion",
				description: "After showing the Odd Mushroom to Granny, you can buy this item for 100 rupees. After that, she will sell blue potions.",
				canGet: function(age) {
					return ItemData.canUse(age, [AdultTradeItems.ODD_MUSHROOM, UpgradedItems.ADULTS_WALLET]);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; },
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleExpensiveMerchants;
				}
			}
		}
	},
	"Happy Mask Shop": {
		_isMaskShopOpen: function() {
			// If kakariko gate is NOT vanilla, we only need Zelda's Letter, otherwise we must show the guard the letter as normal
			return (Settings.RandomizerSettings.openKakariko !== OpenKakarikoSettings.VANILLA && ChildTradeItems.ZELDAS_LETTER.playerHas) || 
				Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
		},
		_canBuyMaskOfTruth: function() {
			return this._isMaskShopOpen() && 
				Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask") &&
				Data.itemLocationObtained("Lost Woods", "skullKidAndBridge", "Sell Skull Mask") &&
				Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask") &&
				Data.itemLocationObtained("Hyrule Field", "main", "Sell Bunny Hood");
		},
		tooltip: "The Happy Mask Shop",
		buttons: {
			"Borrow Keaton Mask": {
				itemLocation: "Borrow Keaton Mask",
				tag: "keaton",
				description: "After showing the Kakariko Village guard Zelda's Letter (or having the letter when the gate is opened), you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._isMaskShopOpen();
				}
			},
			"Borrow Skull Mask": {
				icon: "Skull Mask",
				itemLocation: "Borrow Skull Mask",
				tag: "skull",
				description: "After selling the Keaton Mask to the Kakariko Guard, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._isMaskShopOpen() &&
						Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask");
				}
			},
			"Borrow Spooky Mask": {
				itemLocation: "Borrow Spooky Mask",
				tag: "spooky",
				description: "After selling the Skull Mask to the Skull Kid in Lost Woods, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._isMaskShopOpen() &&
						Data.itemLocationObtained("Lost Woods", "skullKidAndBridge", "Sell Skull Mask");
				}
			},
			"Borrow Bunny Hood": {
				itemLocation: "Borrow Bunny Hood",
				tag: "bunny",
				description: "After selling the Spooky Mask to the graveyard kid, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._isMaskShopOpen() &&
						Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask");
				}
			},
			"Borrow Mask of Truth": {
				icon: "Mask of Truth",
				tag: "truth",
				itemLocation: "Borrow Mask of Truth",
				description: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth();
				}
			},
			"Borrow Goron Mask": {
				icon: "Goron Mask",
				tag: "truth",
				itemLocation: "Borrow Goron Mask",
				description: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth();
				}
			},
			"Borrow Zora Mask": {
				icon: "Zora Mask",
				tag: "truth",
				itemLocation: "Borrow Zora Mask",
				description: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth();
				}
			},
			"Borrow Gerudo Mask": {
				icon: "Gerudo Mask",
				tag: "truth",
				itemLocation: "Borrow Gerudo Mask",
				description: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				canGet: function(age) {
					return InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth();
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
					let hasGoldScale = ItemData.canUse(age, UpgradedItems.GOLDEN_SCALE);
					let canGetWithoutScale = Settings.GlitchesToAllow.labHPWithoutGoldenScale &&
						ItemData.canUse(age, [Items.HOOKSHOT, Equipment.IRON_BOOTS]);
					return hasGoldScale || canGetWithoutScale;
				}
			},
			"Lakeside Skulltula": {
				icon: "Skulltula",
				itemGroup: ItemGroups.SKULLTULA,
				description: "This skulltula is on the bottom of the water area. Equip the iron boots and sink down. Roll into the box to reveal it.",
				canGet: function(age) {
					return ItemData.canUse(age, [Items.HOOKSHOT, Equipment.IRON_BOOTS]);
				},
				isAdultOnly: function() { return true; }
			},
			"3 Red Rupees": {
				icon: "3 Red Rupees",
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "This rupee is in the water - dive or use iron boots to get it.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [Equipment.IRON_BOOTS, UpgradedItems.GOLDEN_SCALE]);
				}
			},
			"Show Eyeball Frog to Scientist": {
				icon: "Eyeball Frog",
				description: "Show the Eyeball Frog to the scientist to receive an item.",
				canGet: function(age) {
					return ItemData.canUse(age, AdultTradeItems.EYEBALL_FROG);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
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
			"Child Non-Empty Crates": {
				icon: "Crate",
				itemGroup: ItemGroups.CRATE,
				description: "The third crate on your left.",
				shouldNotDisplay: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
				isChildOnly: function() { return true; }
			},
			"Child Crates": {
				icon: "Crate",
				count: 4,
				itemGroup: ItemGroups.CRATE,
				description: "The crates in the room.",
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
				isChildOnly: function() { return true; }
			},
			"Child Pots": {
				icon: "Pot",
				count: 44,
				itemGroup: ItemGroups.POT,
				tag: "child",
				description: "The many pots in the room. You can reach the top ones by jumping from the box with the skulltula in it.",
				isChildOnly: function() { return true; }
			},
			"Adult Non-Empty Pots": {
				icon: "Pot",
				count: 7,
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "The many pots in the room.",
				shouldNotDisplay: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
				isAdultOnly: function() { return true; }
			},
			"Adult Pots": {
				icon: "Pot",
				count: 11,
				itemGroup: ItemGroups.POT,
				tag: "adult",
				description: "The many pots in the room.",
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; },
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
	"Front of Impa's House": {
		tooltip: "Inside the house (outside the cage) with the cow and the freestanding item.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleWonderitems; },
		buttons: {
			"Red Rupee on Top": {
				itemGroup: ItemGroups.WONDERITEM,
				icon: "Red Rupee Wonderitem",
				description: "Climb up the stairs and walk around on the top of the cow pen to get this wonderitem."
			},
			"Cow": {
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow. This is shared with the Back of Impa's House check.",
				canGet: function(age) {
					return Data.canMilkCows(true);
				}
			}
		}
	},
	"Stable": {
		icon: "2 Cows",
		tooltip: "This is the building with the cows in the stables.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.cowSanity; },
		buttons: {
			"Cows": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cows.",
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
			"Cows": {
				icon: "2 Cows",
				count: 2,
				itemGroup: ItemGroups.COW,
				description: "Play Epona's Song next to the cow.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				},
				canGet: function(age) {
					return Data.canMilkCows() && ItemData.canUseAny(age, [Equipment.MASTER_SWORD, Items.OCARINA, Equipment.KOKIRI_SWORD]);
				}
			}
		}
	},
	"Bombchu Bowling": {
		tooltip: "The Bombchu Bowling building.",
		icon: "Bombchu",
		buttons: {
			"Prizes": {
				icon: "Bombchu",
				count: 2,
				description: "This is the first prize you can get.",
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
				useGroupImage: true,
				description: "The prize you can get as child.",
				tag: "child",
				isChildOnly: function() { return true; }
			},
			"Adult Fishing": {
				useGroupImage: true,
				description: "The prize you can get as adult.",
				tag: "adult",
				isAdultOnly: function() { return true; }
			},
			"Hyrule Loach": {
				description: "The Hyrule Loach. First, find the sinking lure in the fishing pond. Recommended to choose the easier option in the randomizer so it always spawns. Otherwise, it is here 1/4 attempts. It's usually by the lilypads.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleHyruleLoach;
				}
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
			"Salesman": {
				icon: "Shop",
				description: "Talk to the salesman and buy the item for 10 rupees.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				}
			},
			"Room 1 Back Chest": {
				icon: "Chest",
				iconText: "1",
				description: "The back chest in room 1.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 1;
				}
			},
			"Room 1 Front Chest": {
				icon: "Chest",
				iconText: "1",
				description: "The front chest in room 1.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 1;
				}
			},
			"Room 2 Back Chest": {
				icon: "Chest",
				iconText: "2",
				description: "The back chest in room 2.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 2;
				}
			},
			"Room 2 Front Chest": {
				icon: "Chest",
				iconText: "2",
				description: "The front chest in room 2.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 2;
				}
			},
			"Room 3 Back Chest": {
				icon: "Chest",
				iconText: "3",
				description: "The back chest in room 3.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 3;
				}
			},
			"Room 3 Front Chest": {
				icon: "Chest",
				iconText: "3",
				description: "The front chest in room 3.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 3;
				}
			},
			"Room 4 Back Chest": {
				icon: "Chest",
				iconText: "4",
				description: "The back chest in room 4.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 4;
				}
			},
			"Room 4 Front Chest": {
				icon: "Chest",
				iconText: "4",
				description: "The front chest in room 4.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 4;
				}
			},
			"Room 5 Back Chest": {
				icon: "Chest",
				iconText: "5",
				description: "The back chest in room 5.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 5;
				}
			},
			"Room 5 Front Chest": {
				icon: "Chest",
				iconText: "5",
				description: "The front chest in room 5.",
				shouldNotDisplay: function() { 
					return Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA; 
				},
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 5;
				}
			},
			"Prize": {
				icon: "Chest",
				iconText: "♥",
				description: "This is the prize for completing the minigame.",
				canGet: function(age) {
					if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA) {
						return Items.LENS_OF_TRUTH.playerHas && Equipment.MAGIC.playerHas;
					}
					return ItemData.getKeyCount("Treasure Chest Minigame") >= 6;
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
					return Data.itemLocationObtained("Castle", "hyruleCastle", "Wake up Talon");
				},
				isChildOnly: function() { return true; }
			},
			"3 Pots": {
				count: 3,
				itemGroup: ItemGroups.POT,
				description: "This pot is through the door upstairs and to the left."
			}
		}
	},
	"Talon's House Kakariko": {
		tooltip: "Talon's House in Kakariko - as Child, the room has one woman in it by a stove, with 2 beds next to her.",
		buttons: {
			"Wake Up Talon": {
				icon: "Pocket Cucco",
				description: "Use the Pocket Cucco next to Talon to wake him. You must then show the cucco to Anju to get your reward.",
				canGet: function(age) {
					return AdultTradeItems.POCKET_EGG.playerHas;
				},
				isAdultOnly: function() { return true; },
				postClick: function(isCompleted) {
					// Set an item location-specific variable here so that the player knows they need to talk to Anju next
					MapLocations["Kakariko Village"].Regions.main.ItemLocations["Anju After Waking Talon"].wokeUpTalon = isCompleted;
				}
			}
		}
	},
	"Windmill": {
		neverHide: true,
		tooltip: "Kakariko Windmill",
		buttons: {},
		overworldLink: OwExits["Windmill-Kak Potion"]["Windmill Exit"]
	},

	// Non-shuffle only locations
	"Mido's House": {
		tooltip: "Mido's House in Kokiri Forest",
		icon: "4 Chests",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chests": {
				useGroupImage: true,
				count: 4,
				description: "The chests."
			}
		}
	},
	"Saria's House": {
		icon: "4 Hearts",
		tooltip: "Saria's House in Kokiri Forest",
		excludeFromGroup: function() { return true; },
		buttons: {
			"4 Hearts": {
				count: 4,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The hearts"
			}
		}
	},
	"2 Pot Interior": {
		icon: "2 Pots",
		tooltip: "An interior with two pots.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.POT,
				description: "One of the pots."
			}
		}
	},
	"3 Pot Interior": {
		icon: "3 Pots",
		tooltip: "An interior with three pots.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.POT,
				description: "One of the pots."
			}
		}
	},
	"TH - Jail 1 Left": {
		icon: "Thieves' Hideout J1",
		tooltip: "The door to the left of jail 1 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 1 Left"]
	},
	"TH - Jail 1 Right": {
		icon: "Thieves' Hideout J1",
		tooltip: "The door to the right of jail 1 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 1 Right"]
	},
	"TH - Jail 2 Left": {
		icon: "Thieves' Hideout J2",
		tooltip: "The door to the left of jail 2 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 2 Left"]
	},
	"TH - Jail 2 Right": {
		icon: "Thieves' Hideout J2",
		tooltip: "The door to the right of jail 2 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 2 Right"]
	},
	"TH - Jail 3 Left": {
		icon: "Thieves' Hideout J3",
		tooltip: "The door to the left of jail 3 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 3 Left"]
	},
	"TH - Jail 3 Right": {
		icon: "Thieves' Hideout J3",
		tooltip: "The door to the right of jail 3 in the Thieves' Hideout.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 3 Right"]
	},
	"TH - Jail 4 Entrance": {
		icon: "Thieves' Hideout J4",
		tooltip: "The only exit in the jail 4 area.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 4 Entrance"]
	},
	"TH - Kitchen Far Bottom": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "This is the entrance at the very end of cooridor on the bottom part of the kitchen.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Far Bottom"]
	},
	"TH - Kitchen Middle Bottom": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "This is the entrance at the middle of the cooridor on the bottom part of the kitchen.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Middle Bottom"]
	},
	"TH - Kitchen Top Left": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "From the perspective of the guards, this is the exit to the left on top of the ramps in the main area of the kitchen.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Top Left"]
	},
	"TH - Kitchen Top Right": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "From the perspective of the guards, this is the exit to the right on top of the ramps in the main area of the kitchen.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Top Right"]
	},
	"TH - Top Room Lower": {
		icon: "Thieves' Hideout Top",
		tooltip: "This is the entrance on the bottom part of the room above jail 1.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Top Room Lower"]
	},
	"TH - Top Room Upper": {
		icon: "Thieves' Hideout Top",
		tooltip: "This is the entrance on the upper part of the room above jail 1.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleThievesHideout; },
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Top Room Upper"]
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
			"Right Beehive": {
				icon: "Beehive",
				itemGroup: ItemGroups.BEEHIVE,
				description: "The beehive on the right side of the grotto. Can use bombs. If using chus, get on the right side of the hive (the darker wall) and drop it on the 7th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
			"Left Beehive": {
				icon: "Beehive",
				itemGroup: ItemGroups.BEEHIVE,
				description: "The beehive on the left side of the grotto. Can use bombs. If using chus, line up with the wall to the right of it, in the corner; backflip; drop it on the 6th red flash (closer to the black one after that, if shield-dropping)",
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
				description: "Buy the item from the scrub - this is still a check with scrubsanity off because it sells a heart piece.",
				// itemGroup: ItemGroups.SCRUB, // Disabled so it shows up with scrubsanity off
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				description: "Look on the ceiling for this beehive. Can use bombs. If using chus, get in the corner by the hive, facing the lighter wall. Sidehop right, left, then press A and let go of everything. Drop the chu on the 7th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			},
		}
	},
	"2 Scrubs": {
		tooltip: "This is a grotto with 2 business scrubs.",
		excludeFromGroup: function() {
			return !Settings.RandomizerSettings.scrubSanity && !Settings.RandomizerSettings.shuffleBeehives;
		},
		buttons: {
			"Scrubs": {
				icon: "Scrub",
				count: 2,
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
			}
		}
	},
	"2 Scrubs (Front on Left)": {
		icon: "2 Scrubs",
		tooltip: "This is a grotto with 2 business scrubs, and the front one is on the left. This one is imporant if scrubsanity is off, as it sells the deku nut upgrade.",
		excludeFromGroup: function() { 
			// We only want this if theres no scrubsanity, as it is the scrub that sells the nut upgrade
			return Settings.RandomizerSettings.scrubSanity;
		},
		buttons: {
			"Scrub": {
				// Note that the item group is excluded - this is because this scrub is still required if there's no scrubsanity
				description: "The front scrub - it's the only one that sells an upgrade.",
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
			}
		}
	},
	"3 Scrubs": {
		tooltip: "This is a grotto with 3 business scrubs.",
		excludeFromGroup: function() {
			return !Settings.RandomizerSettings.scrubSanity && !Settings.RandomizerSettings.shuffleBeehives;
		},
		buttons: {
			"Scrubs": {
				icon: "Scrub",
				count: 3,
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
					return ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS);
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
					return ItemData.canUseAny(age, [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]) &&
						Data.canMilkCows();
				}
			},
			"Skulltula at Distance": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "Burn the web. The skulltula is in the section the cow is in.",
				canGet: function(age) {
					if (Data.canWeirdShot(age) && ItemData.canUse(age, UpgradedItems.LONGSHOT)) {
						return true;
					}
					
					return ItemData.canUseAny(age, [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]) && 
						ItemData.canUse(age, ItemSets.GRAB_SHORT_DISTANCE_ITEMS);
				}
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				itemGroup: ItemGroups.GOSSIP_STONE,
				description: "Burn the web. The stone is in one of the little rooms.",
				canGet: function(age) { 
					return ItemData.canUseAny(age, [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]) && 
						Data.canReadGossipStone(age); 
				}
			},
			"2 Pots": {
				count: 2,
				itemGroup: ItemGroups.POT,
				description: "Burn the web. The pots are by the cow.",
				canGet: function(age) { 
					return ItemData.canUseAny(age, [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]);
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
					// The staircase hover requires two additional bomb drops to gain enough height
                    // Start the hover against the wall
					return ItemData.canUse(age, [ItemSets.GRAB_SHORT_DISTANCE_ITEMS, ItemSets.MUD_WALL_ITEMS]) ||
						Data.canStaircaseHover(age);
				}
			},
			"4 Pots": {
				count: 4,
				itemGroup: ItemGroups.POT,
				description: "Blow up the mud wall in front of you when you enter to get to this pot.",
				canGet: function(age) { 
					return ItemData.canUse(age, ItemSets.MUD_WALL_ITEMS);
				}
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				itemGroup: ItemGroups.GOSSIP_STONE,
				description: "The gossip stone is behind the mud wall in front of you when you enter.",
				canGet: function(age) { 
					return ItemData.canUse(age, ItemSets.MUD_WALL_ITEMS) && Data.canReadGossipStone(age); 
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
				icon: "Skull Mask",
				description: "Wear the Skull Mask and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return ChildTradeItems.SKULL_MASK.playerHas;
				}
			},
			"Mask of Truth Item": {
				icon: "Mask of Truth",
				description: "Wear the Mask of Truth and stand front and center near the entrance.",
				isChildOnly: function() { return true; },
				canGet: function(age) {
					return ChildTradeItems.MASK_OF_TRUTH.playerHas;
				}
			}
		}
	},
	"Redead Sun's Song Grave": {
		tooltip: "This is the grave with the single redead.",
		buttons: {
			"Redead Sun's Song Chest": {
				useGroupImage: true,
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
				description: "Light the torches in the first room to spawn a chest.<br/><br/>Using flame storage and sticks: get flame storage; line up with the side of the platform by the stairs and the torch; sidehop right x8; sideroll; take out stick (it should be lit now); sidehop to the door - quickly enter at the very left side; the first torch should be lit as you go in - now finish the job.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.FIRE_ITEMS) ||
						ItemData.canUse(age, QPAItemSets.TALL_TORCH_QPA) ||
						(Settings.GlitchesToAllow.flameStorage && ItemData.canUse(age, Items.DEKU_STICK));
				}
			},
			"Sun's Song": {
				description: "Go through the rooms to get the item at the end.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS);
				}
			}
		}
	},
	"Dampe's Grave": {
		neverHide: true,
		tooltip: "Dampe's Grave - Be sure to mark the windmill entrance to see those items!",
		buttons: {},
		overworldLink: OwExits["Windmill-Kak Potion"]["Grave Exit"]
	},
	"Wolfos Grotto": {
		tooltip: "This grotto has crystal walls and 2 wolfos.",
		buttons: {
			"Chest in Wolfos Grotto": {
				description: "Kill the wolfos to spawn the chest.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS);
				}
			}
		}
	},
	"Two Redead Grotto": {
		tooltip: "This grotto has 2 redeads.",
		buttons: {
			"Chest in 2 Redead Grotto": {
				useGroupImage: true,
				description: "Kill the redeads to spawn the chest.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.SWORDS);
				}
			}
		}
	},
	"Cow Grotto": {
		tooltip: "This grotto has rupees and a cow.",
		excludeFromGroup: function() {
			let rupeeAndHeartSetting = Settings.RandomizerSettings.rupeeAndHeartSetting;
			return !Settings.RandomizerSettings.cowSanity && 
				!Settings.RandomizerSettings.shuffleBeehives &&
				rupeeAndHeartSetting !== ShuffleLocationSettings.ALL &&
				rupeeAndHeartSetting !== ShuffleLocationSettings.OW_ONLY;
		},
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
				icon: "Rupee Circle",
				count: 7,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The rupee circle by the entrance."
			},
			"4 Hearts": {
				icon: "Recovery Heart",
				count: 4,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				tag: "heart",
				description: "The hearts near the cow."
			},
			"Beehive": {
				itemGroup: ItemGroups.BEEHIVE,
				tag: "beehive",
				description: "The beehive on the back/right side of the grotto. Can use bombs. If using chus, line up with one of the walls under it and drop it on the 6th red flash.",
				canGet: function(age) {
					return Data.canBreakBeehive(age);
				}
			}
		}
	},
	"Water Heart Piece Grotto": {
		tooltip: "This grotto has a tektite and a heart piece in water.",
		buttons: {
			"Water Heart Piece": {
				useGroupImage: true,
				description: "Dive down or use iron boots to get the heart piece",
				canGet: function(age) {
					return ItemData.canUseAny(age, [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]);
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
			"Rupees in Water": {
				useGroupImage: true,
				count: 8,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The rupees in the water"
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
					return ItemData.canUse(age, ItemSets.SWORDS) && 
						ItemData.canUseAny(age, [Items.DEKU_NUT, Items.FAIRY_SLINGSHOT]);
				}
			},
			"Blue Warp": {
				icon: "Gohma",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.SWORDS) && 
						ItemData.canUseAny(age, [Items.DEKU_NUT, Items.FAIRY_SLINGSHOT]);
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
					return ItemData.canUse(age, ItemSets.BLAST_OR_SMASH_ITEMS) &&
						ItemData.canUseAny(age, [Items.BOMB, Equipment.STRENGTH]);
				}
			},
			"Blue Warp": {
				icon: "King Dodongo",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.BLAST_OR_SMASH_ITEMS) &&
						ItemData.canUseAny(age, [Items.BOMB, Equipment.STRENGTH]);
				}
			}
		}
	},
	"Barinade": {
		tooltip: "Barinade in Jabu Jabu's Belly",
		buttons: {
			"6 Pots": {
				icon: "Pot",
				count: 6,
				itemGroup: ItemGroups.POT,
				description: "The pots on the edge of the room."
			},
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat Barinade, you need the boomerang and also either a sword or at least 3 Deku Sticks. First, dislodge it from the ceiling using the boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
				canGet: function(age) {
					return ItemData.canUse(age, [ItemSets.SWORDS, Items.BOOMERANG]);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
				icon: "Barinade",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return ItemData.canUse(age, [ItemSets.SWORDS, Items.BOOMERANG]);
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
					let canStunBoss = ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, Items.HOOKSHOT, Items.FAIRY_BOW]);
					let canDamageBoss = ItemData.canUseAny(age, [ItemSets.SWORDS, Items.BOOMERANG]);
					return canStunBoss && canDamageBoss;
				}
			},
			"Blue Warp": {
				icon: "Phantom Ganon",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let canStunBoss = ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, Items.HOOKSHOT, Items.FAIRY_BOW]);
					let canDamageBoss = ItemData.canUseAny(age, [ItemSets.SWORDS, Items.BOOMERANG]);
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
					let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC);
					return tunicCheck && ItemData.canUse(age, Items.MEGATON_HAMMER);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			},
			"Blue Warp": {
				icon: "Volvagia",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC);
					return tunicCheck && ItemData.canUse(age, Items.MEGATON_HAMMER);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"Morpha": {
		tooltip: "Morpha in the Water Temple",
		buttons: {
			"Heart Container": {
				icon: "Heart Piece",
				description: "To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
				icon: "Morpha",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
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
					let canStunHands = ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, Items.HOOKSHOT, Items.FAIRY_BOW]);
					return ItemData.canUse(age, ItemSets.SWORDS) && canStunHands;
				}
			},
			"Blue Warp": {
				icon: "Bongo Bongo",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					let canStunHands = ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, Items.HOOKSHOT, Items.FAIRY_BOW]);
					return ItemData.canUse(age, ItemSets.SWORDS) && canStunHands;
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
					return ItemData.canUse(age, Equipment.MIRROR_SHIELD);
				},
				isAdultOnly: function() { return true; }
			},
			"Blue Warp": {
				icon: "Twinrova",
				description: "Step in the blue warp after defeating the boss to receive a medallion.",
				canGet: function(age) {
					return ItemData.canUse(age, Equipment.MIRROR_SHIELD);
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"Ganon's Tower": {
		tooltip: "The tower in the Center of Ganon's Castle",
		buttons: {
			"Boss Key": {
				description: "This boss key chest is in the room with the two stalfos. Defeat them to gain access to it.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS);
				}
			},
			"14 Pots": {
				description: "These pots are after the fight with the two Iron Knuckles, before the final staircase.",
				count: 14,
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS) &&
							(Settings.RandomizerSettings.potSetting !== ShuffleLocationSettings.OFF || 
							ItemData.hasBossKey("Ganon's Castle"));
				},
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.shuffleEmptyPots;
				}
			},
			"18 Pots": {
				description: "These pots are after the fight with the two Iron Knuckles, before the final staircase.",
				count: 18,
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.DAMAGING_ITEMS) &&
							(Settings.RandomizerSettings.potSetting !== ShuffleLocationSettings.OFF || 
							ItemData.hasBossKey("Ganon's Castle"));
				},
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleEmptyPots;
				}
			}
		}
	}
 };

 /**
  * Data for item locations that we wish to group under one section
  * Mostly for pot/crate shuffle for areas with a ton of checks
  */
 ItemLocationGroups = {
	"Soft Soil": {
		icon: "Bugs",
		tooltip: "Any of the soft soil patches with a gold skulltula inside.",
		buttons: {
			"Skulltula": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "Drop bugs on the soil patch to spawn the skulltula.",
				canGet: function(age) {
					// Note that we don't check for bugs specifically, just an empty bottle
					// - This might be something we want to revisit
					return Data.hasBottle() && ItemData.canUse(age, ItemSets.DAMAGING_ITEMS);
				},
				isChildOnly: function() { return true; }
			},
			"Magic Bean": {
				description: "Plant a magic bean here as a child to grow a plant to travel with as an adult.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.MAGIC_BEAN);
				},
				isChildOnly: function() { return true; },
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.autoPlantBeans;
				}
			}
		}
	},
	"Soft Soil Skulltula Always Killable": {
		icon: "Bugs",
		tooltip: "Any of the soft soil patches with a gold skulltula inside.",
		buttons: {
			"Skulltula": {
				itemGroup: ItemGroups.SKULLTULA,
				description: "Drop bugs on the soil patch to spawn the skulltula.",
				canGet: function(age) {
					// Note that we don't check for bugs specifically, just an empty bottle
					// - This might be something we want to revisit
					return Data.hasBottle();
				},
				isChildOnly: function() { return true; }
			},
			"Magic Bean": {
				description: "Plant a magic bean here as a child to grow a plant to travel with as an adult.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.MAGIC_BEAN);
				},
				isChildOnly: function() { return true; },
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.autoPlantBeans;
				}
			}
		}
	},
	"Spinning Pot": {
		tooltip: "The spinning pot in Goron City",
		buttons: {
			"Neutral": {
				icon: "Neutral Goron",
				tag: "neutral",
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Neutral Goron Prizes."
			},
			"Angry": {
				icon: "Angry Goron",
				tag: "angry",
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Angry Goron Prizes."
			},
			"Happy": {
				icon: "Happy Goron",
				tag: "happy",
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Happy Goron Prizes."
			}
		}
	},
	"2 Hearts": {
		tooltip: "A group of two recovery hearts",
		buttons: {
			"Hearts": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The hearts."
			}
		}
	},
	"3 Hearts": {
		tooltip: "A group of three recovery hearts",
		buttons: {
			"Hearts": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "The hearts."
			}
		}
	},
	"2 Green Rupees": {
		tooltip: "A group of 2 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"3 Green Rupees": {
		tooltip: "A group of 3 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"4 Green Rupees": {
		tooltip: "A group of 4 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"7 Green Rupees": {
		tooltip: "A group of 7 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 7,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"8 Green Rupees": {
		tooltip: "A group of 8 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 8,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"18 Green Rupees": {
		tooltip: "A group of 18 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 18,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupees."
			}
		}
	},
	"2 Green Rupee Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "A group of 2 green rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupee wonderitems."
			}
		}
	},
	"3 Green Rupee Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "A group of 3 green rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupee wonderitems."
			}
		}
	},
	"4 Green Rupee Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "A group of 4 green rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupee wonderitems."
			}
		}
	},
	"6 Green Rupee Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "A group of 6 green rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 6,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupee wonderitems."
			}
		}
	},
	"7 Green Rupee Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "A group of 7 green rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 7,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Green rupee wonderitems."
			}
		}
	},
	"3 Red Rupee Wonderitems": {
		icon: "Red Rupee Wonderitem",
		tooltip: "A group of 3 red rupee wonderitems.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Red rupee wonderitems."
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
				description: "Requires iron boots, boomerang, or silver scale+.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [UpgradedItems.SILVER_SCALE, Items.BOOMERANG, Equipment.IRON_BOOTS]);
				}
			},
			"Green Rupee 3": {
				icon: "Green Rupee Gold Scale",
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Requires iron boots, boomerang, or gold scale.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [UpgradedItems.GOLDEN_SCALE, Items.BOOMERANG, Equipment.IRON_BOOTS])
				}
			}
		}
	},
	"5 Blue Rupees": {
		tooltip: "A group of 5 blue rupees.",
		buttons: {
			"Blue Rupees": {
				useGroupImage: true,
				count: 5,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Blue rupees."
			}
		}
	},
	"3 Red Rupees": {
		tooltip: "A group of 3 red rupees.",
		buttons: {
			"Red Rupees": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Red rupees."
			}
		}
	},
	"4 Red Rupees": {
		tooltip: "A group of 4 red rupees.",
		buttons: {
			"Red Rupees": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "Red rupees."
			}
		}
	},
	"2 Silver Rupees": {
		tooltip: "A group of 2 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.SILVER_RUPEE,
				description: "Silver rupees."
			}
		}
	},
	"3 Silver Rupees": {
		tooltip: "A group of 3 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.SILVER_RUPEE,
				description: "Silver rupees."
			}
		}
	},
	"4 Silver Rupees": {
		tooltip: "A group of 4 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.SILVER_RUPEE,
				description: "Silver rupees."
			}
		}
	},
	"5 Silver Rupees": {
		tooltip: "A group of 5 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 5,
				itemGroup: ItemGroups.SILVER_RUPEE,
				description: "Silver rupees."
			}
		}
	},
	"9 Silver Rupees": {
		tooltip: "A group of 9 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 9,
				itemGroup: ItemGroups.SILVER_RUPEE,
				description: "Silver rupees."
			}
		}
	},
	"Rupee Circle": {
		tooltip: "A circle of six green rupees surrounding a red rupee.",
		buttons: {
			"Rupees": {
				useGroupImage: true,
				count: 7,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the rupees from the circle."
			}
		}
	},
	"Expensive Rupee Circle": {
		tooltip: "A circle of six blue rupees surrounding a red rupee.",
		buttons: {
			"Rupees": {
				useGroupImage: true,
				count: 7,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the rupees from the circle."
			}
		}
	},
	"9 Skull Rupees": {
		tooltip: "The ring of rupees that's created when the three skulls in Shadow Temple are broken.",
		buttons: {
			"Rupees": {
				count: 9,
				useGroupImage: true,
				itemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				description: "One of the rupees in the ring."
			}
		}
	},
	"2 Pots": {
		tooltip: "A set of 2 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"3 Pots": {
		tooltip: "A set of 3 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"4 Pots": {
		tooltip: "A set of 4 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"5 Pots": {
		tooltip: "A set of 5 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 5,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"8 Pots": {
		tooltip: "A set of 8 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 8,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"10 Pots": {
		tooltip: "A set of 10 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 10,
				itemGroup: ItemGroups.POT,
				description: "The pots."
			}
		}
	},
	"2 Crates": {
		tooltip: "A set of 2 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 2,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"3 Crates": {
		tooltip: "A set of 3 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 3,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"4 Crates": {
		tooltip: "A set of 4 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 4,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"5 Crates": {
		tooltip: "A set of 5 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 5,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"6 Crates": {
		tooltip: "A set of 6 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 6,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"7 Crates": {
		tooltip: "A set of 7 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 7,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"11 Crates": {
		tooltip: "A set of 11 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 11,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"14 Crates": {
		tooltip: "A set of 14 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 14,
				itemGroup: ItemGroups.CRATE,
				description: "The crates."
			}
		}
	},
	"4 Chests": {
		tooltip: "A group of 4 chests.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chests": {
				useGroupImage: true,
				count: 4,
				description: "The chests."
			}
		}
	},
	"7 Chests": {
		tooltip: "A group of 7 chests.",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chests": {
				useGroupImage: true,
				count: 7,
				description: "The chests."
			}
		}
	},
	"2 Scrubs": {
		tooltip: "A group of 2 business scrubs.",
		icon: "2 Scrubs No Beehive",
		buttons: {
			"Scrubs": {
				useGroupImage: true,
				count: 2,
				description: "Buy the items from the scrubs.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"4 Scrubs": {
		tooltip: "A group of 4 business scrubs.",
		icon: "4 Scrubs",
		buttons: {
			"Scrubs": {
				useGroupImage: true,
				count: 4,
				description: "Buy the items from the scrubs.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"5 Scrubs": {
		tooltip: "A group of 5 business scrubs.",
		icon: "5 Scrubs",
		buttons: {
			"Scrubs": {
				useGroupImage: true,
				count: 5,
				description: "Buy the items from the scrubs.",
				itemGroup: ItemGroups.SCRUB,
				canGet: function(age) {
					return Data.canBuyFromScrub(age);
				}
			}
		}
	},
	"Frogs": {
		tooltip: "The frogs in Zora's River",
		description: "All items that come from the Zora's River frogs.",
		buttons: {
			"Zelda's Lullaby": {
				icon: "Zelda's Lullaby",
				description: "Play Zelda's Lullaby for the frogs.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				},
				canGet: function(age) {
					return Data.canPlaySong(Songs.ZELDAS_LULLABY);
				},
				isChildOnly: function() { return true; }
			},
			"Epona's Song": {
				icon: "Epona's Song",
				description: "Play Epona's Song for the frogs.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				},
				canGet: function(age) {
					return Data.canPlaySong(Songs.EPONAS_SONG);
				},
				isChildOnly: function() { return true; }
			},
			"Saria's Song": {
				icon: "Scrub",
				description: "Play Saria's Song for the frogs.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				},
				canGet: function(age) {
					return Data.canPlaySong(Songs.SARIAS_SONG);
				},
				isChildOnly: function() { return true; }
			},
			"Sun's Song": {
				icon: "Sun's Song",
				description: "Play the Sun's Song for the frogs.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				},
				canGet: function(age) {
					return Data.canPlaySong(Songs.SUNS_SONG);
				},
				isChildOnly: function() { return true; }
			},
			"Song of Storms": {
				icon: "Song of Storms",
				description: "Play the Song of Storms for the frogs.",
				canGet: function(age) {
					return Data.canPlaySong(Songs.SONG_OF_STORMS);
				},
				isChildOnly: function() { return true; }
			},
			"Song of Time": {
				icon: "Ocarina of Time",
				description: "Play the Song of Time for the frogs.",
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				},
				canGet: function(age) {
					return Data.canPlaySong(Songs.SONG_OF_TIME);
				},
				isChildOnly: function() { return true; }
			},
			"Bug Minigame": {
				description: "Play this after playing all the non-warp songs to the frogs. Answer: A < > v < > v A v A v > < A",
				canGet: function(age) {
					return Data.canPlaySongs() &&
						Songs.ZELDAS_LULLABY.playerHas &&
						Songs.EPONAS_SONG.playerHas &&
						Songs.SARIAS_SONG.playerHas &&
						Songs.SUNS_SONG.playerHas &&
						Songs.SONG_OF_STORMS.playerHas &&
						Songs.SONG_OF_TIME.playerHas;
				},
				isChildOnly: function() { return true; }
			}
		}
	},
	"Trade Biggoron": {
		tooltip: "The frogs in Zora's River",
		description: "All items that come from the Zora's River frogs.",
		buttons: {
			"Broken Goron's Sword": {
				icon: "Broken Goron's Sword",
				description: "Show Biggoron the Broken Sword.",
				canGet: function(age) {
					return AdultTradeItems.BROKEN_GORONS_SWORD.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Eyedrops": {
				icon: "Eyedrops",
				description: "Show Biggoron the Eyedrops.",
				canGet: function(age) {
					return AdultTradeItems.EYEDROPS.playerHas;
				},
				isAdultOnly: function() { return true; }
			},
			"Claim Check": {
				icon: "Claim Check",
				description: "Show Biggoron the Claim Check.",
				canGet: function(age) {
					return AdultTradeItems.CLAIM_CHECK.playerHas;
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"2 Wonderitems": {
		tooltip: "A group of two wonderitems",
		icon: "Wonderitem",
		buttons: {
			"Wonderitems": {
				useGroupImage: true,
				count: 2,
				description: "Get close to this area to get the wonderitems."
			}
		}
	},
	"2 Projectile Wonderitems": {
		tooltip: "A group of two wonderitems requiring projectiles.",
		icon: "Projectile Wonderitem",
		buttons: {
			"Projectile Wonderitems": {
				useGroupImage: true,
				count: 2,
				description: "Shoot the deku nut on the tree with a slingshot or bow to get the item.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.PROJECTILES);
				}
			}
		}
	},
	"3 Desert Projectile Wonderitems": {
		tooltip: "Three three projectile wonderitems in the desert.",
		icon: "Projectile Wonderitem",
		buttons: {
			"Projectile Wonderitems Both Ages": {
				useGroupImage: true,
				count: 2,
				tag: "both",
				description: "Shoot the deku nut on the trees with a slingshot or bow to get the items.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.PROJECTILES);
				}
			},
			"Projectile Wonderitems Child": {
				icon: "Slingshot Wonderitem",
				tag: "child",
				description: "Shoot the deku nut in the tree that has a skulltula in it as adult with a slingshot to get the item",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_SLINGSHOT);
				},
				isChildOnly: function() { return true; }
			}
		}
	},
	"Hookshot and Bow Wonderitems": {
		tooltip: "A group of two wonderitems - one requiring hookshot, and one requiring the bow.",
		icon: "Projectile Wonderitem",
		buttons: {
			"Hookshot Wonderitem": {
				description: "Shoot this with the hookshot to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
				},
				isAdultOnly: function() { return true; }
			},
			"Bow Wonderitem": {
				description: "Shoot this with the bow to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_BOW);
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"QPAable Hookshot and Bow Wonderitems": {
		tooltip: "A group of two wonderitems - one requiring hookshot, and one requiring the bow, in an area that QPA can be used.",
		icon: "Projectile Wonderitem",
		buttons: {
			"Hookshot Wonderitem": {
				description: "Shoot this with the hookshot to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
				},
				isAdultOnly: function() { return true; }
			},
			"Bow Wonderitem": {
				description: "Shoot this with the bow to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [Items.FAIRY_BOW, QPAItemSets.LEDGE_QPA]);
				},
				isAdultOnly: function() { return !Settings.GlitchesToAllow.qpa; }
			}
		}
	},
	"2 Hookshot Wonderitems": {
		tooltip: "A group of 2 wonderitems requiring the hookshot.",
		icon: "Hookshot Wonderitem",
		buttons: {
			"Hookshot Wonderitems": {
				useGroupImage: true,
				description: "Shoot this with the hookshot to spawn the wonderitem.",
				count: 2,
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"3 Hookshot Wonderitems": {
		tooltip: "A group of 3 wonderitems requiring the hookshot.",
		icon: "Hookshot Wonderitem",
		buttons: {
			"Hookshot Wonderitems": {
				useGroupImage: true,
				description: "Shoot this with the hookshot to spawn the wonderitem.",
				count: 3,
				canGet: function(age) {
					return ItemData.canUse(age, Items.HOOKSHOT);
				},
				isAdultOnly: function() { return true; }
			}
		}
	},
	"2 Night and 2 Empty Day Crates": {
		icon: "2 Crates",
		tooltip: "Two sets of two crates - one for night and one for day. The day ones are empty.",
		buttons: {
			"Day Crates": {
				useGroupImage: true,
				count: 2,
				tag: "day",
				description: "These crates are here during the day.",
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
				time: function() { return Time.DAY; },
				isChildOnly: function() { return true; }
			},
			"Night Crates": {
				useGroupImage: true,
				count: 2,
				tag: "night",
				description: "These crates are here at night.",
				time: function() { 
					return Settings.RandomizerSettings.shuffleEmptyCrates ? Time.NIGHT : Time.EITHER; 
				},
				isChildOnly: function() { return true; }
			}
		}
	},
	"2 Slingshot Wonderitems": {
		tooltip: "A group of 2 wonderitems you need the slingshot to get.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 2,
				description: "Shoot something to get these items.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_SLINGSHOT);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"3 Slingshot Wonderitems": {
		tooltip: "A group of 3 wonderitems you need the slingshot or QPA to get.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 3,
				description: "Shoot something to get these items.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_SLINGSHOT);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"3 QPAable Slingshot Wonderitems": {
		tooltip: "A group of 3 wonderitems you need the slingshot to get.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 3,
				description: "Shoot something to get these items.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, QPAItemSets.LEDGE_QPA]);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap && !Settings.GlitchesToAllow.qpa; }
			}
		}
	},
	"4 Slingshot Wonderitems": {
		tooltip: "A group of 4 wonderitems you need the slingshot to get.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 4,
				description: "Shoot something to get these items.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_SLINGSHOT);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap; }
			}
		}
	},
	"4 High QPAable Slingshot Wonderitems": {
		tooltip: "A group of 4 wonderitems you need the slingshot to get, but can reach with QPA and backflips.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 4,
				description: "Shoot something to get these items.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [Items.FAIRY_SLINGSHOT, QPAItemSets.TALL_TORCH_QPA]);
				},
				isChildOnly: function() { return !Settings.GlitchesToAllow.equipSwap && !Settings.GlitchesToAllow.qpa; }
			}
		}
	},
	"3 Hammer Wonderitems": {
		tooltip: "A group of 3 wonderitems you need the hammer to get.",
		icon: "Hammer Wonderitem",
		buttons: {
			"Hammer Wonderitems": {
				useGroupImage: true,
				count: 3,
				description: "Hammer something to get these items.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.MEGATON_HAMMER);
				},
				isAdultOnly: function() {
					return !Settings.GlitchesToAllow.equipSwap;
				}
			}
		}
	},
	"3 Explosive Wonderitems": {
		tooltip: "A group of 3 wonderitems you need explosives to get.",
		icon: "Explosive Wonderitem",
		buttons: {
			"Explosive Wonderitems": {
				useGroupImage: true,
				count: 3,
				description: "Set off an explosive to get these items.",
				canGet: function(age) {
					return ItemData.canUse(age, ItemSets.EXPLOSIVES);
				}
			}
		}
	},
	"Sword and Hammer Wonderitem": {
		tooltip: "A group of wonderitems - one requiring a sword, and one requiring tne hammer.",
		buttons: {
			"Sword Wonderitem": {
				description: "Swing your sword by this place to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUseAny(age, [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]);
				}
			},
			"Hammer Wonderitem": {
				description: "Swing your hammer by this place to spawn the wonderitem.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.MEGATON_HAMMER);
				},
				isAdultOnly: function() {
					return !Settings.GlitchesToAllow.equipSwap;
				}
			}
		}
	},
	"Balcony Wonderitems": {
		icon: "Green Rupee Wonderitem",
		tooltip: "These are the items you get by climbing up the balcony by the Bombchu Bowling Alley.",
		buttons: {
			"Day Balcony Items": {
				icon: "Green Rupee Wonderitem",
				count: 5,
				tag: "day",
				description: "Climb up the stairs and walk along the catwalk by Bombchu Bowling during the day to get these items.",
				time: function() { return Time.DAY; },
				isChildOnly: function() { return true; }
			},
			"Night Balcony Items": {
				icon: "Blue Rupee Wonderitem",
				count: 2,
				tag: "night",
				description: "Climb up the stairs and walk along the catwalk by Bombchu Bowling at night to get these items.",
				time: function() { return Time.NIGHT; },
				isChildOnly: function() { return true; }
			}
		}
	},
	"Castle Courtyard Items": {
		tooltip: "All the items in the castle courtyard.",
		icon: "Zelda's Lullaby",
		buttons: {
			"Zelda's Letter": {
				useGroupImage: true,
				description: "Talk to Zelda to get this check."
			},
			"Mario Wonderitem": {
				icon: "Child Archery",
				description: "Facing zelda, shoot the right side window (the one with the mario paintings) with your slingshot to get this item.",
				canGet: function(age) {
					return ItemData.canUse(age, Items.FAIRY_SLINGSHOT);
				}
			},
			"Zelda's Lullaby": {
				icon: "Ocarina of Time",
				description: "After talking to Zelda, go talk to Impa to get teleported out. You will get this time afterwards.",
				postClick: function(isCompleted) {
					MapLocations["Castle"].talkedToImpa = isCompleted;
				}
			}
		}
	}
 };