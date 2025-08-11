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
		
		if (!Data.isNonItemGroupEntrance(itemLocation)) {
			return;
		}

		let name = entranceGroup.name;
		Object.keys(entranceGroup.buttons).forEach(function(buttonName) {
			let buttonItem;

			if (itemLocation.ItemGroup === ItemGroups.INTERIOR) {
				buttonItem = InteriorGroups[name].buttons[buttonName];
			}

			else if (itemLocation.ItemGroup === ItemGroups.GROTTO) {
				buttonItem = GrottoGroups[name].buttons[buttonName];
			}

			else if (itemLocation.ItemGroup === ItemGroups.BOSS_ENTRANCE) {
				buttonItem = BossGroups[name].buttons[buttonName];
			}

			if (buttonItem && buttonItem.postClick) {
				let isCompleted = entranceGroup.buttons[buttonName].completed;
				buttonItem.postClick(isCompleted);
			}
		});
	},

	/**
	 * Returns whether the player can exit the boss entrance to the room of the dungeon
	 * @param {string} dungeon - the dungeon to check
	 * @returns True if the player can exit; false otherwise
	 */
	canExitFromBossEntrance: function(dungeon) {
		let entranceGroupName = Data.getEntranceGroup(OwExits[dungeon].Boss)?.name;
		return BossGroups[entranceGroupName]?.canExitFromEntrance
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
				SpoilerLogName: "KF Links House Pot",
				ItemGroup: ItemGroups.POT,
				LongDescription: "Throw the pot to get an item."
			},
			"Cow in Link's House": {
				SpoilerLogName: "KF Links House Cow",
				icon: "Cow",
				ItemGroup: ItemGroups.COW,
				LongDescription: "As an adult, beat Malon's Epona challenge to unlock the cow in Link's house.",
				Age: Age.ADULT,
				Needs: [ItemLocationSets.UNLOCK_COW_IN_HOUSE, Items.OCARINA]
			}
		},
		postClick: function(itemLocation, isSelected) {
			Data.linksHouseLocation = isSelected
				? { map: itemLocation.ExitMap, region: itemLocation.ExitRegion }
				: {};
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
			// TODO: DOT skip then Adult doesn't work properly, but does it matter that much...?
			"Free Raru Item": {
				SpoilerLogName: "ToT Reward from Rauru",
				icon: "Light Medallion",
				LongDescription: "This is the light medallion replacement if dungeon rewards are shuffled. Enter the Master Sword pedestal room to get it.",
				Needs: [(age) => Data.canEnterDoorOfTime(age)]
			},
			"Prelude of Light": {
				SpoilerLogName: "Sheik at Temple",
				Age: Age.ADULT,
				LongDescription: "When you have the Forest Medallion, enter the room with the Master Sword pedestal to receive the item.",
				Needs: [Medallions.FOREST_MEDALLION, (age) => Data.canEnterDoorOfTime(age)]
			},
			"Light Arrows": {
				SpoilerLogName: "ToT Light Arrows Cutscene",
				icon: "Light Arrow",
				Age: Age.ADULT,
				LongDescription: "When you have the Shadow and Spirit Medallions, simply enter the Temple of Time as adult to receive the item.",
				Needs: [Medallions.SHADOW_MEDALLION, Medallions.SPIRIT_MEDALLION, (age) => Data.canEnterDoorOfTime(age)]
			}
		},
		postClick: function(itemLocation, isSelected) {
			Data.templeOfTimeLocation = isSelected
				? { map: itemLocation.ExitMap, region: itemLocation.ExitRegion }
				: {};
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
				ItemGroup: ItemGroups.SHOP,
				LongDescription: "Buy the items you need here - put anything you need to get later in the notes."
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
				ItemGroup: ItemGroups.SHOP,
				LongDescription: "Buy the items you need here - put anything you need to get later in the notes."
			},
			"Blue Rupee": {
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Go in the space to the right of the shop to get this item."
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
				SpoilerLogName: "Kak Granny Trade Odd Mushroom",
				icon: "Odd Mushroom",
				LongDescription: "Show Granny the Odd Mushroom to recieve an item.",
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
				Needs: [AdultTradeItems.ODD_MUSHROOM]
			},
			"Buy Blue Potion Item": {
				SpoilerLogName: "Kak Granny Buy Blue Potion",
				icon: "Blue Potion",
				LongDescription: "After showing the Odd Mushroom to Granny, you can buy this item for 100 rupees. After that, she will sell blue potions.",
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
				Needs: [AdultTradeItems.ODD_MUSHROOM, UpgradedItems.ADULTS_WALLET],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleExpensiveMerchants;
				}
			}
		}
	},
	"Happy Mask Shop": {
		_isMaskShopOpen: function(age) {
			// If kakariko gate is NOT vanilla, we only need Zelda's Letter, otherwise we must show the guard the letter as normal
			return ItemData.canUseAny(age, [
				ItemLocationSets.SHOW_GUARD_LETTER,
				// If not vanilla, you just need to HAVE the letter; it doesn't matter if you can use it
				[() => !SettingSets.VANILLA_KAKARIKO_GATE(), () => ChildTradeItems.ZELDAS_LETTER.playerHas]
			]);
		},
		_canBuyMaskOfTruth: function(age) {
			return ItemData.canUse(age, [
				(age) => this._isMaskShopOpen(age),
				ItemLocationSets.SELL_KEATON_MASK,
				ItemLocationSets.SELL_SKULL_MASK,
				ItemLocationSets.SELL_SPOOKY_MASK,
				ItemLocationSets.SELL_BUNNY_HOOD
			]);
		},
		tooltip: "The Happy Mask Shop",
		buttons: {
			"Borrow Keaton Mask": {
				SpoilerLogName: "Market Mask Shop Item 6",
				icon: "Keaton Mask",
				LongDescription: "After showing the Kakariko Village guard Zelda's Letter (or having the letter when the gate is opened), you can borrow this mask.",
				Needs: [(age) => InteriorGroups["Happy Mask Shop"]._isMaskShopOpen(age)]
			},
			"Borrow Skull Mask": {
				SpoilerLogName: "Market Mask Shop Item 5",
				icon: "Skull Mask",
				LongDescription: "After selling the Keaton Mask to the Kakariko Guard, you can borrow this mask.",
				Needs: [
					(age) => InteriorGroups["Happy Mask Shop"]._isMaskShopOpen(age), 
					ItemLocationSets.SELL_KEATON_MASK
				]
			},
			"Borrow Spooky Mask": {
				SpoilerLogName: "Market Mask Shop Item 8",
				icon: "Spooky Mask",
				LongDescription: "After selling the Skull Mask to the Skull Kid in Lost Woods, you can borrow this mask.",
				Needs: [
					(age) => InteriorGroups["Happy Mask Shop"]._isMaskShopOpen(age), 
					ItemLocationSets.SELL_SKULL_MASK
				]
			},
			"Borrow Bunny Hood": {
				SpoilerLogName: "Market Mask Shop Item 7",
				icon: "Bunny Hood",
				LongDescription: "After selling the Spooky Mask to the graveyard kid, you can borrow this mask.",
				Needs: [
					(age) => InteriorGroups["Happy Mask Shop"]._isMaskShopOpen(age), 
					ItemLocationSets.SELL_SPOOKY_MASK
				]
			},
			"Borrow Mask of Truth": {
				SpoilerLogName: "Market Mask Shop Item 3",
				icon: "Mask of Truth",
				LongDescription: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				Needs: [(age) => InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth(age)]
			},
			"Borrow Goron Mask": {
				SpoilerLogName: "Market Mask Shop Item 4",
				icon: "Goron Mask",
				LongDescription: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				Needs: [(age) => InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth(age)]
			},
			"Borrow Zora Mask": {
				SpoilerLogName: "Market Mask Shop Item 2",
				icon: "Zora Mask",
				LongDescription: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				Needs: [(age) => InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth(age)]
			},
			"Borrow Gerudo Mask": {
				SpoilerLogName: "Market Mask Shop Item 1",
				icon: "Gerudo Mask",
				LongDescription: "After you sell the Keaton Mask, Skull Mask, Spooky Mask, and the Bunny Hood, you can borrow this mask.",
				Needs: [(age) => InteriorGroups["Happy Mask Shop"]._canBuyMaskOfTruth(age)]
			}
		}
	},
	"Fairy Fountain": {
		tooltip: "Any of the Great Fairy Fountains.",
		buttons: {
			"Fairy Fountain": {
				LongDescription: "Play Zelda's Lullaby at the triforce symbol to get this item.",
				Needs: [Songs.ZELDAS_LULLABY]
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
				SpoilerLogName: "Kak 10 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "10",
				LongDescription: "Talk to the guy on the right hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 10;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 10]
			},
			"20 Reward": {
				SpoilerLogName: "Kak 20 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "20",
				LongDescription: "Talk to the guy on the left hand side.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 20;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 20]
			},
			"30 Reward": {
				SpoilerLogName: "Kak 30 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "30",
				LongDescription: "Talk to the middle guy.",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 30;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 30]
			},
			"40 Reward": {
				SpoilerLogName: "Kak 40 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "40",
				LongDescription: "Talk to the guy second from the left",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 40;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 40]
			},
			"50 Reward": {
				SpoilerLogName: "Kak 50 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "50",
				LongDescription: "Talk to the guy second from the right",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 50;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 50]
			},
			"100 Reward": {
				// TODO: check this name when updating the rando
				//SpoilerLogName: "Kak 100 Gold Skulltula Reward",
				icon: "Skulltula",
				iconText: "100",
				LongDescription: "Talk to center guy",
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.maxRequiredTokens < 100;
				},
				Needs: [() => Equipment.SKULLTULA_TOKENS.count >= 100]
			}
		}
	},
	"Lakeside Lab": {
		tooltip: "This is the lab with the professor and the pool of water in the back.",
		buttons: {
			"Lakeside Heart Piece": {
				SpoilerLogName: "LH Lab Dive",
				icon: "Piece of Heart",
				LongDescription: "Use the golden scale and dive to touch the bottom of the water area. The professor will give you this item.",
				NeedsAny: [UpgradedItems.GOLDEN_SCALE, Tricks.labHPWithoutGoldenScale.canDo]
			},
			"Lakeside Skulltula": {
				SpoilerLogName: "LH GS Lab Crate",
				icon: "Skulltula",
				Age: Age.ADULT,
				ItemGroup: ItemGroups.SKULLTULA,
				LongDescription: "This skulltula is on the bottom of the water area. Equip the iron boots and sink down. Roll into the box to reveal it.",
				Needs: [Items.HOOKSHOT, Equipment.IRON_BOOTS]
			},
			"3 Red Rupees": {
				SpoilerLogName: [{ name: "LH Lab Dive Red Rupee {#}", count: 3 }],
				icon: "3 Red Rupees",
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "This rupee is in the water - dive or use iron boots to get it.",
				NeedsAny: [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]
			},
			"Show Eyeball Frog to Scientist": {
				SpoilerLogName: "LH Trade Eyeball Frog",
				icon: "Eyeball Frog",
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Show the Eyeball Frog to the scientist to receive an item.",
				Needs: [AdultTradeItems.EYEBALL_FROG]
			}
		}
	},
	"Market Guard House": {
		tooltip: "This is the pot room as a child, and the big poe buyer room as an adult.",
		buttons: {
			"Child Skulltula": {
				SpoilerLogName: "Market GS Guard House",
				icon: "Skulltula",
				ItemGroup: ItemGroups.SKULLTULA,
				OverrideItemGroupCondition: true,
				Age: Age.CHILD,
				LongDescription: "This is the skulltula in the crate in the back of the room."
			},
			"Adult Big Poe Reward": {
				SpoilerLogName: "Market 10 Big Poes",
				Age: Age.ADULT,
				LongDescription: "Give the poe salesman all the poes he needs to get this item.",
				NeedsAny: [
					Items.BIG_POE, 
					[MapAccessSets.HYRULE_FIELD, Items.FAIRY_BOW, GameStateSets.HAS_BOTTLE]
				]
			},
			"Child Non-Empty Crates": {
				SpoilerLogName: "Market Guard House Child Crate 4",
				icon: "Crate",
				ItemGroup: ItemGroups.CRATE,
				Age: Age.CHILD,
				LongDescription: "The third crate on your left.",
				shouldNotDisplay: function() { return Settings.RandomizerSettings.shuffleEmptyCrates; },
			},
			"Child Crates": {
				SpoilerLogName: [{ name: "Market Guard House Child Crate {#}", count: 4 }],
				icon: "Crate",
				count: 4,
				ItemGroup: ItemGroups.CRATE,
				Age: Age.CHILD,
				LongDescription: "The crates in the room.",
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
			},
			"Child Pots": {
				SpoilerLogName: [{ name: "Market Guard House Child Pot {#}", count: 44 }],
				icon: "Pot",
				count: 44,
				ItemGroup: ItemGroups.POT,
				Age: Age.CHILD,
				LongDescription: "The many pots in the room. You can reach the top ones by jumping from the box with the skulltula in it."
			},
			"Adult Non-Empty Pots": {
				SpoilerLogName: [{ 
					name: "Market Guard House Adult Pot {#}", 
					tokens: ["1", "3", "4", "6", "7", "9", "11"]
				}],
				icon: "Pot",
				count: 7,
				ItemGroup: ItemGroups.POT,
				Age: Age.ADULT,
				LongDescription: "The many pots in the room.",
				shouldNotDisplay: function() { return Settings.RandomizerSettings.shuffleEmptyPots; }
			},
			"Adult Pots": {
				SpoilerLogName: [{ name: "Market Guard House Adult Pot {#}", count: 11 }],
				icon: "Pot",
				count: 11,
				ItemGroup: ItemGroups.POT,
				Age: Age.ADULT,
				LongDescription: "The many pots in the room.",
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyPots; }
			}
		}
	},
	"Back of Impa's House": {
		tooltip: "Inside the cage with the cow and the freestanding item.",
		buttons: {
			"Freestanding Item": {
				SpoilerLogName: "Kak Impas House Freestanding PoH",
				icon: "Piece of Heart",
				LongDescription: "Simply grab the item in the room."
			},
			"Cow": {
				SpoilerLogName: "Kak Impas House Cow",
				ItemGroup: ItemGroups.COW,
				LongDescription: "Play Epona's Song next to the cow.",
				Needs: [Items.OCARINA]
			}
		}
	},
	"Front of Impa's House": {
		tooltip: "Inside the house (outside the cage) with the cow and the freestanding item.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.shuffleWonderitems; },
		buttons: {
			"Red Rupee on Top": {
				SpoilerLogName: "Kak Impas House Wonderitem",
				ItemGroup: ItemGroups.WONDERITEM,
				icon: "Red Rupee Wonderitem",
				LongDescription: "Climb up the stairs and walk around on the top of the cow pen to get this wonderitem."
			},
			"Cow": {
				SpoilerLogName: "Kak Impas House Cow",
				ItemGroup: ItemGroups.COW,
				LongDescription: "Play Epona's Song next to the cow. This is shared with the Back of Impa's House check.",
				Needs: [Items.OCARINA]
			}
		}
	},
	"Stable": {
		icon: "2 Cows",
		tooltip: "This is the building with the cows in the stables.",
		excludeFromGroup: function() { return !Settings.RandomizerSettings.cowSanity; },
		buttons: {
			"Cows": {
				SpoilerLogName: [
					"LLR Stables Left Cow",
					"LLR Stables Right Cow"
				],
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.COW,
				LongDescription: "Play Epona's Song next to the cows.",
				Needs: [Items.OCARINA]
			}
		}
	},
	"Cow Shed": {
		tooltip: "This is the building with the cows and boxes you can push for the freestanding item",
		buttons: {
			"Freestanding Item": {
				SpoilerLogName: "LLR Freestanding PoH",
				icon: "Piece of Heart",
				Age: Age.CHILD,
				LongDescription: "Push the box out of the way and crawl through the hole to get the item."
			},
			"Cows": {
				SpoilerLogName: [
					"LLR Tower Left Cow",
					"LLR Tower Right Cow"
				],
				icon: "2 Cows",
				count: 2,
				ItemGroup: ItemGroups.COW,
				LongDescription: "Play Epona's Song next to the cow.",
				NeedsAny: [Items.OCARINA, Equipment.MASTER_SWORD, Equipment.KOKIRI_SWORD],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.cowSanity;
				}
			}
		}
	},
	"Bombchu Bowling": {
		tooltip: "The Bombchu Bowling building.",
		icon: "Bombchu",
		buttons: {
			"Prizes": {
				SpoilerLogName: [
					"Market Bombchu Bowling First Prize",
					"Market Bombchu Bowling Second Prize"
				],
				icon: "Bombchu",
				count: 2,
				LongDescription: "The prizes from the minigame.",
				Needs: [GameStateSets.CAN_PLAY_BOMBCHU_BOWLING]
			}
		}
	},
	"Fishing Pond": {
		tooltip: "The fishing pond area.",
		buttons: {
			"Child Fishing": {
				SpoilerLogName: "LH Child Fishing",
				useGroupImage: true,
				Age: Age.CHILD,
				LongDescription: "The prize you can get as child.",
			},
			"Adult Fishing": {
				SpoilerLogName: "LH Adult Fishing",
				useGroupImage: true,
				Age: Age.ADULT,
				LongDescription: "The prize you can get as adult.",
			},
			"Hyrule Loach": {
				SpoilerLogName: "LH Loach Fishing",
				LongDescription: "The Hyrule Loach. First, find the sinking lure in the fishing pond. Recommended to choose the easier option in the randomizer so it always spawns. Otherwise, it is here 1/4 attempts. It's usually by the lilypads.",
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
				SpoilerLogName: "Market Shooting Gallery Reward",
				Age: Age.CHILD,
				LongDescription: "This is the prize for completing the minigame as child."
			}
		}
	},
	"Adult Archery": {
		tooltip: "This is the archery minigame. The shopkeeper will only be here as adult.",
		buttons: {
			"Adult Archery": {
				SpoilerLogName: "Kak Shooting Gallery Reward",
				Age: Age.ADULT,
				LongDescription: "This is the prize for completing the minigame as adult.",
				Needs: [Items.FAIRY_BOW]
			}
		}
	},
	"Treasure Chest Minigame": {
		tooltip: "The minigame where you probably want the Lens of Truth.",
		buttons: {
			"Salesman": {
				SpoilerLogName: "Market Treasure Chest Game Salesman",
				icon: "Treasure Chest Minigame Small Key",
				LongDescription: "Talk to the salesman and buy the item for 10 rupees.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS
			},
			"Room 1 Chests": {
				SpoilerLogName: [
					"Market Treasure Chest Game Room 1 Bottom",
					"Market Treasure Chest Game Room 1 Top"
				],
				icon: "Chest",
				count: 2,
				LongDescription: "The chests in room 1.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS,
				Needs: [() => ItemData.getKeyCount("Treasure Chest Minigame") >= 1]
			},
			"Room 2 Chests": {
				SpoilerLogName: [
					"Market Treasure Chest Game Room 2 Bottom",
					"Market Treasure Chest Game Room 2 Top"
				],
				icon: "Chest",
				count: 2,
				LongDescription: "The chests in room 2.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS,
				Needs: [() => ItemData.getKeyCount("Treasure Chest Minigame") >= 2]
			},
			"Room 3 Chests": {
				SpoilerLogName: [
					"Market Treasure Chest Game Room 3 Bottom",
					"Market Treasure Chest Game Room 3 Top"
				],
				icon: "Chest",
				count: 2,
				LongDescription: "The chests in room 3.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS,
				Needs: [() => ItemData.getKeyCount("Treasure Chest Minigame") >= 3]
			},
			"Room 4 Chests": {
				SpoilerLogName: [
					"Market Treasure Chest Game Room 4 Bottom",
					"Market Treasure Chest Game Room 4 Top"
				],
				icon: "Chest",
				count: 2,
				LongDescription: "The chests in room 4.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS,
				Needs: [() => ItemData.getKeyCount("Treasure Chest Minigame") >= 4]
			},
			"Room 5 Chests": {
				SpoilerLogName: [
					"Market Treasure Chest Game Room 5 Bottom",
					"Market Treasure Chest Game Room 5 Top"
				],
				icon: "Chest",
				count: 2,
				LongDescription: "The chests in room 5.",
				shouldNotDisplay: SettingSets.VANILLA_CHEST_MINIGAME_KEYS,
				Needs: [() => ItemData.getKeyCount("Treasure Chest Minigame") >= 5]
			},
			"Prize": {
				SpoilerLogName: "Market Treasure Chest Game Reward",
				icon: "Chest",
				iconText: "♥",
				LongDescription: "This is the prize for completing the minigame.",
				NeedsAny: [
					[SettingSets.VANILLA_CHEST_MINIGAME_KEYS, Items.LENS_OF_TRUTH],
					() => ItemData.getKeyCount("Treasure Chest Minigame") >= 6
				]
			}
		}
	},
	"Super Cucco Minigame": {
		tooltip: "Talon's House in Lon Lon Ranch",
		buttons: {
			"Super Cucco Minigame": {
				SpoilerLogName: "LLR Talons Chickens",
				time: function() { return Time.DAY; },
				Age: Age.CHILD,
				LongDescription: "Only available during the day. This is the prize for completing the minigame.",
				Needs: [ItemLocationSets.WAKE_UP_TALON]
			},
			"3 Pots": {
				SpoilerLogName: [{ name: "LLR Talons House Pot {#}", count: 3 }],
				count: 3,
				ItemGroup: ItemGroups.POT,
				LongDescription: "This pot is through the door upstairs and to the left."
			}
		}
	},
	"Talon's House Kakariko": {
		tooltip: "Talon's House in Kakariko - as Child, the room has one woman in it by a stove, with 2 beds next to her.",
		buttons: {
			"Wake Up Talon": {
				icon: "Pocket Cucco",
				Age: Age.ADULT,
				LongDescription: "Use the Pocket Cucco next to Talon to wake him. You must then show the cucco to Anju to get your reward.",
				Needs: [AdultTradeItems.POCKET_EGG],
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
				LongDescription: "The chests."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The hearts"
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
				ItemGroup: ItemGroups.POT,
				LongDescription: "One of the pots."
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
				ItemGroup: ItemGroups.POT,
				LongDescription: "One of the pots."
			}
		}
	},
	"Jail 1 Left": {
		icon: "Thieves' Hideout J1",
		tooltip: "The door to the left of jail 1 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 1 Left"]
	},
	"Jail 1 Right": {
		icon: "Thieves' Hideout J1",
		tooltip: "The door to the right of jail 1 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 1 Right"]
	},
	"Jail 2 Left": {
		icon: "Thieves' Hideout J2",
		tooltip: "The door to the left of jail 2 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 2 Left"]
	},
	"Jail 2 Right": {
		icon: "Thieves' Hideout J2",
		tooltip: "The door to the right of jail 2 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 2 Right"]
	},
	"Jail 3 Left": {
		icon: "Thieves' Hideout J3",
		tooltip: "The door to the left of jail 3 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 3 Left"]
	},
	"Jail 3 Right": {
		icon: "Thieves' Hideout J3",
		tooltip: "The door to the right of jail 3 in the Thieves' Hideout.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 3 Right"]
	},
	"Jail 4 Entrance": {
		icon: "Thieves' Hideout J4",
		tooltip: "The only exit in the jail 4 area.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Jail 4 Entrance"]
	},
	"Kitchen Far Bottom": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "This is the entrance at the very end of cooridor on the bottom part of the kitchen.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Far Bottom"]
	},
	"Kitchen Middle Bottom": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "This is the entrance at the middle of the cooridor on the bottom part of the kitchen.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Middle Bottom"]
	},
	"Kitchen Top Left": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "From the perspective of the guards, this is the exit to the left on top of the ramps in the main area of the kitchen.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Top Left"]
	},
	"Kitchen Top Right": {
		icon: "Thieves' Hideout Kitchen",
		tooltip: "From the perspective of the guards, this is the exit to the right on top of the ramps in the main area of the kitchen.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Kitchen Top Right"]
	},
	"Top Room Lower": {
		icon: "Thieves' Hideout Top",
		tooltip: "This is the entrance on the bottom part of the room above jail 1.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
		buttons: {},
		overworldLink: OwExits["Thieves' Hideout"]["Top Room Lower"]
	},
	"Top Room Upper": {
		icon: "Thieves' Hideout Top",
		tooltip: "This is the entrance on the upper part of the room above jail 1.",
		excludeFromGroup: SettingSets.VANILLA_THIEVES_HIDEOUT,
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
				LongDescription: "The chest in the back of the room.",
			},
			"Right Beehive": {
				icon: "Beehive",
				ItemGroup: ItemGroups.BEEHIVE,
				LongDescription: "The beehive on the right side of the grotto. Can use bombs. If using chus, get on the right side of the hive (the darker wall) and drop it on the 7th red flash."
			},
			"Left Beehive": {
				icon: "Beehive",
				ItemGroup: ItemGroups.BEEHIVE,
				LongDescription: "The beehive on the left side of the grotto. Can use bombs. If using chus, line up with the wall to the right of it, in the corner; backflip; drop it on the 6th red flash (closer to the black one after that, if shield-dropping)"
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				ItemGroup: ItemGroups.GOSSIP_STONE,
				LongDescription: "The gossip stone in the middle of the room."
			}
		}
	},
	"1 Scrub": {
		tooltip: "This is a grotto with 1 business scrub.",
		buttons: {
			"Scrub 1": {
				icon: "Scrub",
				// ItemGroup: ItemGroups.SCRUB, // Disabled so it shows up with scrubsanity off
				LongDescription: "Buy the item from the scrub - this is still a check with scrubsanity off because it sells a heart piece.",
				Needs: [(age) => Data.canBuyFromScrub(age)]
			},
			"Beehive": {
				ItemGroup: ItemGroups.BEEHIVE,
				LongDescription: "Look on the ceiling for this beehive. Can use bombs. If using chus, get in the corner by the hive, facing the lighter wall. Sidehop right, left, then press A and let go of everything. Drop the chu on the 7th red flash."
			}
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
				ItemGroup: ItemGroups.SCRUB,
				LongDescription: "Buy the item from the scrub.",
			},
			"Beehive": {
				ItemGroup: ItemGroups.BEEHIVE,
				IsUpperHive: true,
				LongDescription: "Look on the ceiling for this beehive. If using chus, face the closest wall and backflip. Drop the chu on the 5th red flash."
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
				// ItemGroup: ItemGroups.SCRUB, // Disabled so it shows up with scrubsanity off
				LongDescription: "The front scrub - it's the only one that sells an upgrade.",
				Needs: [(age) => Data.canBuyFromScrub(age)]
			},
			"Beehive": {
				ItemGroup: ItemGroups.BEEHIVE,
				IsUpperHive: true,
				LongDescription: "Look on the ceiling for this beehive. If using chus, face the closest wall and backflip. Drop the chu on the 5th red flash."
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
				ItemGroup: ItemGroups.SCRUB,
				LongDescription: "Buy the item from the scrub.",
			},
			"Beehive": {
				ItemGroup: ItemGroups.BEEHIVE,
				IsUpperHive: true,
				LongDescription: "Look on the right at the ceiling for this beehive. If using chus, face the closest wall and backflip. Drop the chu on the 5th red flash."
			}
		}
	},
	"Skulltula at Distance": {
		tooltip: "This grotto has a big skulltula and a gold skulltula on the upper wall.",
		buttons: {
			"Skulltula at Distance": {
				ItemGroup: ItemGroups.SKULLTULA,
				LongDescription: "The gold skulltula is on the wall behind the big skulltula.",
				Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS]
			}
		}
	},
	"Cow and Web Grotto": {
		tooltip: "This is the grotto with webs on the walls, a cow, and a skulltula.",
		hasGossipStone: true,
		buttons: {
			"Cow": {
				ItemGroup: ItemGroups.COW,
				LongDescription: "Burn the web, then play Epona's Song next to the cow.",
				NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]
			},
			"Skulltula at Distance": {
				ItemGroup: ItemGroups.SKULLTULA,
				LongDescription: "Burn the web. The skulltula is in the section the cow is in.",
				Needs: [ItemSets.GRAB_SHORT_DISTANCE_ITEMS],
				NeedsAny: [ItemSets.FIRE_ITEMS, Tricks.weirdShot.canDoWithLongshot, QPAItemSets.CUTSCENE_ITEM_QPA]
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				ItemGroup: ItemGroups.GOSSIP_STONE,
				LongDescription: "Burn the web. The stone is in one of the little rooms.",
				NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]
			},
			"2 Pots": {
				count: 2,
				ItemGroup: ItemGroups.POT,
				LongDescription: "Burn the web. The pots are by the cow.",
				NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA]
			}
		}
	},
	"Bombable Wall Grotto": {
		tooltip: "This is the grotto with bombable walls and many skulltula sounds.",
		hasGossipStone: true,
		buttons: {
			"Skulltula in Bombable Wall Grotto": {
				ItemGroup: ItemGroups.SKULLTULA,
				LongDescription: "The skulltula is high up behind the mud wall to your left when you enter.",
				NeedsAny: [
					[ItemSets.GRAB_SHORT_DISTANCE_ITEMS, ItemSets.MUD_WALL_ITEMS],
					Tricks.staircaseHover.canDo
				]
			},
			"4 Pots": {
				count: 4,
				ItemGroup: ItemGroups.POT,
				LongDescription: "Blow up the mud wall in front of you when you enter to get to this pot.",
				Needs: [ItemSets.MUD_WALL_ITEMS]
			},
			"Gossip Stone": {
				icon: "Mask of Truth",
				ItemGroup: ItemGroups.GOSSIP_STONE,
				LongDescription: "The gossip stone is behind the mud wall in front of you when you enter.",
				Needs: [ItemSets.MUD_WALL_ITEMS],
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
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Wear the Skull Mask and stand front and center near the entrance.",
				Needs: [ChildTradeItems.SKULL_MASK]
			},
			"Mask of Truth Item": {
				icon: "Mask of Truth",
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Wear the Mask of Truth and stand front and center near the entrance.",
				Needs: [ChildTradeItems.MASK_OF_TRUTH]
			}
		}
	},
	"Redead Sun's Song Grave": {
		tooltip: "This is the grave with the single redead.",
		buttons: {
			"Redead Sun's Song Chest": {
				useGroupImage: true,
				LongDescription: "Play the Sun's Song near the redead to spawn a chest.",
				Needs: [Songs.SUNS_SONG]
			}
		}
	},
	"Royal Family's Tomb": {
		tooltip: "The Royal Family's Tomb.",
		buttons: {
			"Chest by Lighting Torches": {
				icon: "Din's Fire",
				LongDescription: "Light the torches in the first room to spawn a chest.\x0A\x0AUsing flame storage and sticks: get flame storage; line up with the side of the platform by the stairs and the torch; sidehop right x8; sideroll; take out stick (it should be lit now); sidehop to the door - quickly enter at the very left side; the first torch should be lit as you go in - now finish the job.",
				NeedsAny: [ItemSets.FIRE_ITEMS, QPAItemSets.TALL_TORCH_QPA, Tricks.flameStorage.canDo]
			},
			"Sun's Song": {
				LongDescription: "Go through the rooms to get the item at the end.",
				Needs: [ItemSets.DAMAGING_ITEMS]
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
				LongDescription: "Kill the wolfos to spawn the chest.",
				Needs: [ItemSets.DAMAGING_ITEMS]
			}
		}
	},
	"Two Redead Grotto": {
		tooltip: "This grotto has 2 redeads.",
		buttons: {
			"Chest in 2 Redead Grotto": {
				useGroupImage: true,
				LongDescription: "Kill the redeads to spawn the chest.",
				Needs: [ItemSets.SWORDS]
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
				ItemGroup: ItemGroups.COW,
				LongDescription: "Play Epona's Song next to the cow."
			},
			"Red Rupee": {
				icon: "Rupee Circle",
				count: 7,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The rupee circle by the entrance."
			},
			"4 Hearts": {
				icon: "Recovery Heart",
				count: 4,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The hearts near the cow."
			},
			"Beehive": {
				ItemGroup: ItemGroups.BEEHIVE,
				LongDescription: "The beehive on the back/right side of the grotto. Can use bombs. If using chus, line up with one of the walls under it and drop it on the 6th red flash."
			}
		}
	},
	"Water Heart Piece Grotto": {
		tooltip: "This grotto has a tektite and a heart piece in water.",
		buttons: {
			"Water Heart Piece": {
				useGroupImage: true,
				LongDescription: "Dive down or use iron boots to get the heart piece",
				NeedsAny: [UpgradedItems.GOLDEN_SCALE, Equipment.IRON_BOOTS]
			}
		}
	},

	// Non-shuffle only locations
	"1 Chest": {
		icon: "Chest",
		tooltip: "The grave that only has one chest",
		excludeFromGroup: function() { return true; },
		buttons: {
			"Chest": {
				LongDescription: "The chest."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The rupees in the water"
			}
		}
	}
};

/**
 * Data for the boss buttons to display in dungeons with bosses
 */
 BossGroups = {
	"Gohma": {
		icon: "Kokiri's Emerald",
		tooltip: "Gohma in the Deku Tree",
		canExitFromEntrance: true,
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Deku Tree Queen Gohma Heart",
				LongDescription: "To defeat Gohma, you must first stun her when her eye is red. You can use the slingshot or deku nuts to do this - nuts don't stun her for nearly as long, though. Once she's down, attack her. The quickest kill is with three deku stick jumpslashes (or one then two crouch stabs).",
				Needs: [ItemSets.SWORDS],
				NeedsAny: [Items.DEKU_NUT, Items.FAIRY_SLINGSHOT]
			},
			"Blue Warp": {
				SpoilerLogName: "Queen Gohma",
				icon: "Kokiri's Emerald",
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [ItemSets.SWORDS],
				NeedsAny: [Items.DEKU_NUT, Items.FAIRY_SLINGSHOT]
			}
		}
	},
	"King Dodongo": {
		icon: "Goron's Ruby",
		tooltip: "King Dodongo in Dodongo's Cavern",
		canExitFromEntrance: true,
		buttons: {
			"Chest": {
				LongDescription: "This chest is in the back of the room."
			},
			"Heart Container": {
				SpoilerLogName: "Dodongos Cavern King Dodongo Heart",
				LongDescription: "To defeat King Dodongo, you must throw a bomb or bomb flower into his mouth, and then attack him afterward. Note that you should follow him as he rolls so that he gets up faster. If using bomb flowers, try to get them a little bit early, as you need time to run back to him before he shoots his fireball. The quickest kill is with 2 deku stick/master sword jumpslashes, or 1 biggoron's sword jumpslash.",
				Needs: [ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.SWORDS],
				NeedsAny: [Items.BOMB, Equipment.STRENGTH]
			},
			"Blue Warp": {
				SpoilerLogName: "King Dodongo",
				icon: "Goron's Ruby",
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.SWORDS],
				NeedsAny: [Items.BOMB, Equipment.STRENGTH]
			}
		}
	},
	"Barinade": {
		icon: "Zora's Sapphire",
		tooltip: "Barinade in Jabu Jabu's Belly",
		buttons: {
			"6 Pots": {
				icon: "Pot",
				count: 6,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots on the edge of the room."
			},
			"Heart Container": {
				SpoilerLogName: "Jabu Jabus Belly Barinade Heart",
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "To defeat Barinade, you need the boomerang and also either a sword or at least 3 Deku Sticks. First, dislodge it from the ceiling using the boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
				Needs: [ItemSets.SWORDS, Items.BOOMERANG]
			},
			"Blue Warp": {
				SpoilerLogName: "King Dodongo",
				icon: "Barinade",
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [ItemSets.SWORDS, Items.BOOMERANG]
			}
		}
	},
	"Phantom Ganon": {
		icon: "Forest Medallion",
		tooltip: "Phantom Ganon in the Forest Temple",
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Forest Temple Phantom Ganon Heart",
				LongDescription: "For phase 1 of Phantom Ganon, you must shoot the real version of him that comes out of the paintings. You can use your bow or hookshot for that. The real one is lighter and is the only one that makes sound. Phase 2 is the familiar tenis match. Stun him with his own attacks and damage him when he's stunned. You can also just spam him with the boomerang!",
				Needs: [
					[SetType.OR, Items.HOOKSHOT, ItemSets.PROJECTILES], // Stun boss
					[SetType.OR, ItemSets.SWORDS, Items.BOOMERANG] // Damage boss
				]
			},
			"Blue Warp": {
				SpoilerLogName: "Phantom Ganon",
				icon: "Forest Medallion",
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [
					[SetType.OR, Items.HOOKSHOT, ItemSets.PROJECTILES], // Stun boss
					[SetType.OR, ItemSets.SWORDS, Items.BOOMERANG] // Damage boss
				]
			}
		}
	},
	"Volvagia": {
		icon: "Fire Medallion",
		tooltip: "Volvagia in the Fire Temple",
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Fire Temple Volvagia Heart",
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled || !Tricks.fireNoGoronTunic.enabled; },
				LongDescription: "To defeat Volvagia, hit her with your hammer when she pops out of the holes. After that, attack it again. Jumpslashes will do more damage, like usual. You can hit it with arrows while it's flying to do additional damage. If it ever drops rocks on you, you can hang off the side of the cliff to avoid damage.",
				Needs: [GameStateSets.FIRE_TEMPLE_TUNIC_CHECK, Items.MEGATON_HAMMER]
			},
			"Blue Warp": {
				SpoilerLogName: "Volvagia",
				icon: "Fire Medallion",
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled || !Tricks.fireNoGoronTunic.enabled; },
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [GameStateSets.FIRE_TEMPLE_TUNIC_CHECK, Items.MEGATON_HAMMER]
			}
		}
	},
	"Morpha": {
		icon: "Water Medallion",
		tooltip: "Morpha in the Water Temple",
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Water Temple Morpha Heart",
				Age: Age.ADULT,
				LongDescription: "To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead.",
				Needs: [Items.HOOKSHOT]
			},
			"Blue Warp": {
				SpoilerLogName: "Morpha",
				icon: "Water Medallion",
				Age: Age.ADULT,
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [Items.HOOKSHOT],
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
		icon: "Shadow Medallion",
		tooltip: "Bongo Bongo in the Shadow Temple",
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Bongo Bongo",
				LongDescription: "When fighting Bongo Bongo, it helps to NOT have the Hover Boots equipped. When the fight starts, if you hold down, he won't circle you right away. Hit his hands with your bow or hookshot, or slingshot to stun them. Now hit him before he hits you and damage him as much as you can. If you have magic, quickspins can actually stunlock him for a 1-cycle if you do them perfectly.",
				Needs: [ItemSets.SWORDS],
				NeedsAny: [Items.HOOKSHOT, ItemSets.PROJECTILES]
			},
			"Blue Warp": {
				SpoilerLogName: "Shadow Temple Bongo Bongo Heart",
				icon: "Shadow Medallion",
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [ItemSets.SWORDS],
				NeedsAny: [Items.HOOKSHOT, ItemSets.PROJECTILES]
			}
		}
	},
	"Twinrova": {
		icon: "Spirit Medallion",
		tooltip: "Twinrova in the Spirit Temple",
		buttons: {
			"Heart Container": {
				SpoilerLogName: "Spirit Temple Twinrova Heart",
				Age: Age.ADULT,
				LongDescription: "To defeat Twinrova, reflect one of the sister's shots at the other one. Do this four times to get to the second phase. Now, you must charge your shield with 3 of the same kind of attack. When you do, your shield will shoot it at Twinrova, stunning her. Go hit her! As usual, a jumpslash (Z + A) then crouch stabs (R + spam B) do the most damage.",
				Needs: [Equipment.MIRROR_SHIELD]
			},
			"Blue Warp": {
				SpoilerLogName: "Twinrova",
				icon: "Spirit Medallion",
				Age: Age.ADULT,
				LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
				Needs: [Equipment.MIRROR_SHIELD]
			}
		}
	},
	"Ganon's Tower": {
		icon: "Light Medallion",
		tooltip: "The tower in the Center of Ganon's Castle",
		canExitFromEntrance: true,
		buttons: {
			"Boss Key": {
				SpoilerLogName: "Ganons Tower Boss Key Chest",
				LongDescription: "This boss key chest is in the room with the two stalfos. Defeat them to gain access to it.",
				Needs: [ItemSets.DAMAGING_ITEMS]
			},
			"14 Pots": {
				SpoilerLogName: [{ name: "Ganons Tower Pot {#}", count: 14 }],
				LongDescription: "These pots are after the fight with the two Iron Knuckles, before the final staircase.",
				count: 14,
				ItemGroup: ItemGroups.POT,
				Needs: [ItemSets.DAMAGING_ITEMS],
				shouldNotDisplay: function() {
					return Settings.RandomizerSettings.shuffleEmptyPots;
				}
			},
			"18 Pots": {
				SpoilerLogName: [{ name: "Ganons Tower Pot {#}", count: 18 }],
				LongDescription: "These pots are after the fight with the two Iron Knuckles, before the final staircase.",
				count: 18,
				ItemGroup: ItemGroups.POT,
				Needs: [ItemSets.DAMAGING_ITEMS],
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
				ItemGroup: ItemGroups.SKULLTULA,
				Age: Age.CHILD,
				LongDescription: "Drop bugs on the soil patch to spawn the skulltula.",
				Needs: [GameStateSets.HAS_BOTTLE]
			},
			"Magic Bean": {
				Age: Age.CHILD,
				LongDescription: "Plant a magic bean here as a child to grow a plant to travel with as an adult.",
				Needs: [Items.MAGIC_BEAN],
				shouldNotDisplay: SettingSets.AUTO_PLANT_BEANS
			}
		}
	},
	"Soft Soil Skulltula Always Killable": {
		icon: "Bugs",
		tooltip: "Any of the soft soil patches with a gold skulltula inside.",
		buttons: {
			"Skulltula": {
				ItemGroup: ItemGroups.SKULLTULA,
				OverrideItemGroupCondition: true,
				Age: Age.CHILD,
				LongDescription: "Drop bugs on the soil patch to spawn the skulltula.",
				Needs: [GameStateSets.HAS_BOTTLE]
			},
			"Magic Bean": {
				Age: Age.CHILD,
				LongDescription: "Plant a magic bean here as a child to grow a plant to travel with as an adult.",
				Needs: [Items.MAGIC_BEAN],
				shouldNotDisplay: SettingSets.AUTO_PLANT_BEANS
			}
		}
	},
	"Spinning Pot": {
		tooltip: "The spinning pot in Goron City",
		buttons: {
			"Neutral": {
				icon: "Neutral Goron",
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Neutral Goron Prizes."
			},
			"Angry": {
				icon: "Angry Goron",
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Angry Goron Prizes."
			},
			"Happy": {
				icon: "Happy Goron",
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Happy Goron Prizes."
			}
		}
	},
	"2 Hearts": {
		tooltip: "A group of two recovery hearts",
		buttons: {
			"Hearts": {
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The hearts."
			}
		}
	},
	"3 Hearts": {
		tooltip: "A group of three recovery hearts",
		buttons: {
			"Hearts": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "The hearts."
			}
		}
	},
	"2 Green Rupees": {
		tooltip: "A group of 2 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
			}
		}
	},
	"3 Green Rupees": {
		tooltip: "A group of 3 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
			}
		}
	},
	"4 Green Rupees": {
		tooltip: "A group of 4 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 4,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
			}
		}
	},
	"7 Green Rupees": {
		tooltip: "A group of 7 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 7,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
			}
		}
	},
	"8 Green Rupees": {
		tooltip: "A group of 8 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 8,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
			}
		}
	},
	"18 Green Rupees": {
		tooltip: "A group of 18 green rupees.",
		buttons: {
			"Green Rupees": {
				useGroupImage: true,
				count: 18,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupees."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupee wonderitems."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupee wonderitems."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupee wonderitems."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupee wonderitems."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Green rupee wonderitems."
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
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Red rupee wonderitems."
			}
		}
	},
	"3 Jabu Rupees": {
		tooltip: "The 3 Jabu rupees with various diving requirements",
		buttons: {
			"Green Rupee": {
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Can be obtained by diving to it."
			},
			"Green Rupee 2": {
				icon: "Green Rupee Silver Scale",
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Requires iron boots, boomerang, or silver scale+.",
				NeedsAny: [UpgradedItems.SILVER_SCALE, Items.BOOMERANG, Equipment.IRON_BOOTS]
			},
			"Green Rupee 3": {
				icon: "Green Rupee Gold Scale",
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Requires iron boots, boomerang, or gold scale.",
				NeedsAny: [UpgradedItems.GOLDEN_SCALE, Items.BOOMERANG, Equipment.IRON_BOOTS]
			}
		}
	},
	"5 Blue Rupees": {
		tooltip: "A group of 5 blue rupees.",
		buttons: {
			"Blue Rupees": {
				useGroupImage: true,
				count: 5,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Blue rupees."
			}
		}
	},
	"3 Red Rupees": {
		tooltip: "A group of 3 red rupees.",
		buttons: {
			"Red Rupees": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Red rupees."
			}
		}
	},
	"4 Red Rupees": {
		tooltip: "A group of 4 red rupees.",
		buttons: {
			"Red Rupees": {
				useGroupImage: true,
				count: 4,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "Red rupees."
			}
		}
	},
	"2 Silver Rupees": {
		tooltip: "A group of 2 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.SILVER_RUPEE,
				LongDescription: "Silver rupees."
			}
		}
	},
	"3 Silver Rupees": {
		tooltip: "A group of 3 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.SILVER_RUPEE,
				LongDescription: "Silver rupees."
			}
		}
	},
	"4 Silver Rupees": {
		tooltip: "A group of 4 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 4,
				ItemGroup: ItemGroups.SILVER_RUPEE,
				LongDescription: "Silver rupees."
			}
		}
	},
	"5 Silver Rupees": {
		tooltip: "A group of 5 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 5,
				ItemGroup: ItemGroups.SILVER_RUPEE,
				LongDescription: "Silver rupees."
			}
		}
	},
	"9 Silver Rupees": {
		tooltip: "A group of 9 silver rupees.",
		buttons: {
			"Silver Rupees": {
				useGroupImage: true,
				count: 9,
				ItemGroup: ItemGroups.SILVER_RUPEE,
				LongDescription: "Silver rupees."
			}
		}
	},
	"Rupee Circle": {
		tooltip: "A circle of six green rupees surrounding a red rupee.",
		buttons: {
			"Rupees": {
				useGroupImage: true,
				count: 7,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "One of the rupees from the circle."
			}
		}
	},
	"Expensive Rupee Circle": {
		tooltip: "A circle of six blue rupees surrounding a red rupee.",
		buttons: {
			"Rupees": {
				useGroupImage: true,
				count: 7,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "One of the rupees from the circle."
			}
		}
	},
	"9 Skull Rupees": {
		tooltip: "The ring of rupees that's created when the three skulls in Shadow Temple are broken.",
		buttons: {
			"Rupees": {
				count: 9,
				useGroupImage: true,
				ItemGroup: ItemGroups.FREESTANDING_RUPEES_AND_HEARTS,
				LongDescription: "One of the rupees in the ring."
			}
		}
	},
	"2 Pots": {
		tooltip: "A set of 2 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"3 Pots": {
		tooltip: "A set of 3 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"4 Pots": {
		tooltip: "A set of 4 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 4,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"5 Pots": {
		tooltip: "A set of 5 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 5,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"8 Pots": {
		tooltip: "A set of 8 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 8,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"10 Pots": {
		tooltip: "A set of 10 pots.",
		buttons: {
			"Pots": {
				useGroupImage: true,
				count: 10,
				ItemGroup: ItemGroups.POT,
				LongDescription: "The pots."
			}
		}
	},
	"2 Crates": {
		tooltip: "A set of 2 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 2,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"3 Crates": {
		tooltip: "A set of 3 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 3,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"4 Crates": {
		tooltip: "A set of 4 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 4,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"5 Crates": {
		tooltip: "A set of 5 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 5,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"6 Crates": {
		tooltip: "A set of 6 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 6,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"7 Crates": {
		tooltip: "A set of 7 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 7,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"11 Crates": {
		tooltip: "A set of 11 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 11,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
			}
		}
	},
	"14 Crates": {
		tooltip: "A set of 14 crates.",
		buttons: {
			"Crates": {
				useGroupImage: true,
				count: 14,
				ItemGroup: ItemGroups.CRATE,
				LongDescription: "The crates."
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
				LongDescription: "The chests."
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
				LongDescription: "The chests."
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
				ItemGroup: ItemGroups.SCRUB,
				LongDescription: "Buy the items from the scrubs."
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
				ItemGroup: ItemGroups.SCRUB,
				LongDescription: "Buy the items from the scrubs."
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
				ItemGroup: ItemGroups.SCRUB,
				LongDescription: "Buy the items from the scrubs."
			}
		}
	},
	"Frogs": {
		tooltip: "The frogs in Zora's River",
		LongDescription: "All items that come from the Zora's River frogs.",
		buttons: {
			"Zelda's Lullaby": {
				icon: "Zelda's Lullaby",
				Age: Age.CHILD,
				LongDescription: "Play Zelda's Lullaby for the frogs.",
				Needs: [Songs.ZELDAS_LULLABY],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				}
			},
			"Epona's Song": {
				icon: "Epona's Song",
				Age: Age.CHILD,
				LongDescription: "Play Epona's Song for the frogs.",
				Needs: [Songs.EPONAS_SONG],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				}
			},
			"Saria's Song": {
				icon: "Scrub",
				Age: Age.CHILD,
				LongDescription: "Play Saria's Song for the frogs.",
				Needs: [Songs.SARIAS_SONG],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				}
			},
			"Sun's Song": {
				icon: "Sun's Song",
				Age: Age.CHILD,
				LongDescription: "Play the Sun's Song for the frogs.",
				Needs: [Songs.SUNS_SONG],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				}
			},
			"Song of Time": {
				icon: "Ocarina of Time",
				Age: Age.CHILD,
				LongDescription: "Play the Song of Time for the frogs.",
				Needs: [Songs.SONG_OF_TIME],
				shouldNotDisplay: function() {
					return !Settings.RandomizerSettings.shuffleAllFrogSongs;
				}
			},
			"Song of Storms": {
				icon: "Song of Storms",
				Age: Age.CHILD,
				LongDescription: "Play the Song of Storms for the frogs.",
				Needs: [Songs.SONG_OF_STORMS]
			},
			"Bug Minigame": {
				icon: "Bugs",
				Age: Age.CHILD,
				LongDescription: "Play this after playing all the non-warp songs to the frogs. Answer: A < > v < > v A v A v > < A",
				Needs: [
					Songs.ZELDAS_LULLABY,
					Songs.EPONAS_SONG,
					Songs.SARIAS_SONG,
					Songs.SUNS_SONG,
					Songs.SONG_OF_STORMS,
					Songs.SONG_OF_TIME
				]
			}
		}
	},
	"Trade Biggoron": {
		tooltip: "The frogs in Zora's River",
		LongDescription: "All items that come from the Zora's River frogs.",
		buttons: {
			"Broken Goron's Sword": {
				icon: "Broken Goron's Sword",
				Age: Age.ADULT,
				LongDescription: "Show Biggoron the Broken Sword.",
				Needs: [AdultTradeItems.BROKEN_GORONS_SWORD]
			},
			"Eyedrops": {
				icon: "Eyedrops",
				Age: Age.ADULT,
				LongDescription: "Show Biggoron the Eyedrops.",
				Needs: [AdultTradeItems.EYEDROPS]
			},
			"Claim Check": {
				icon: "Claim Check",
				Age: Age.ADULT,
				LongDescription: "Show Biggoron the Claim Check.",
				Needs: [AdultTradeItems.CLAIM_CHECK]
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
				LongDescription: "Get close to this area to get the wonderitems."
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
				LongDescription: "Shoot the deku nut on the tree with a slingshot or bow to get the item.",
				Needs: [ItemSets.PROJECTILES]
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
				LongDescription: "Shoot the deku nut on the trees with a slingshot or bow to get the items.",
				Needs: [ItemSets.PROJECTILES]
			},
			"Projectile Wonderitems Child": {
				icon: "Slingshot Wonderitem",
				Age: Age.CHILD,
				LongDescription: "Shoot the deku nut in the tree that has a skulltula in it as adult with a slingshot to get the item",
				Needs: [Items.FAIRY_SLINGSHOT]
			}
		}
	},
	"Hookshot and Bow Wonderitems": {
		tooltip: "A group of two wonderitems - one requiring hookshot, and one requiring the bow.",
		icon: "Projectile Wonderitem",
		buttons: {
			"Hookshot Wonderitem": {
				Age: Age.ADULT,
				LongDescription: "Shoot this with the hookshot to spawn the wonderitem.",
				Needs: [Items.HOOKSHOT]
			},
			"Bow Wonderitem": {
				Age: Age.ADULT,
				LongDescription: "Shoot this with the bow to spawn the wonderitem. Ledge or cutscene item QPA works to get this as well.",
				NeedsAny: [Items.FAIRY_BOW, QPAItemSets.LEDGE_QPA, QPAItemSets.CUTSCENE_ITEM_QPA]
			}
		}
	},
	"2 Hookshot Wonderitems": {
		tooltip: "A group of 2 wonderitems requiring the hookshot.",
		icon: "Hookshot Wonderitem",
		buttons: {
			"Hookshot Wonderitems": {
				useGroupImage: true,
				count: 2,
				Age: Age.ADULT,
				LongDescription: "Shoot this with the hookshot to spawn the wonderitem.",
				Needs: [Items.HOOKSHOT]
			}
		}
	},
	"3 Hookshot Wonderitems": {
		tooltip: "A group of 3 wonderitems requiring the hookshot.",
		icon: "Hookshot Wonderitem",
		buttons: {
			"Hookshot Wonderitems": {
				useGroupImage: true,
				count: 3,
				Age: Age.ADULT,
				LongDescription: "Shoot this with the hookshot to spawn the wonderitem.",
				Needs: [Items.HOOKSHOT]
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
				Age: Age.CHILD,
				LongDescription: "These crates are here during the day.",
				time: function() { return Time.DAY; },
				shouldNotDisplay: function() { return !Settings.RandomizerSettings.shuffleEmptyCrates; },
			},
			"Night Crates": {
				useGroupImage: true,
				count: 2,
				Age: Age.CHILD,
				LongDescription: "These crates are here at night.",
				time: function() { 
					return Settings.RandomizerSettings.shuffleEmptyCrates ? Time.NIGHT : Time.EITHER; 
				}
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
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Shoot something to get these items.",
				Needs: [Items.FAIRY_SLINGSHOT]
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
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Shoot something to get these items.",
				Needs: [Items.FAIRY_SLINGSHOT]
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
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
				LongDescription: "Shoot something to get these items.",
				NeedsAny: [Items.FAIRY_SLINGSHOT, QPAItemSets.LEDGE_QPA]
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
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Shoot something to get these items.",
				Needs: [Items.FAIRY_SLINGSHOT]
			}
		}
	},
	"4 High QPAable Slingshot Wonderitems": {
		tooltip: "A group of 4 wonderitems you need the slingshot to get, but can reach with QPA and backflips or cutscene QPA.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 4,
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled && !Tricks.qpa.enabled; },
				LongDescription: "Shoot something to get these items. Can also use ISG QPA and backflips, or cutscene QPA lined up to break the stick on it.",
				NeedsAny: [Items.FAIRY_SLINGSHOT, QPAItemSets.TALL_TORCH_QPA, QPAItemSets.CUTSCENE_ITEM_QPA]
			}
		}
	},
	"4 Child Cutscene QPAable Slingshot Wonderitems": {
		tooltip: "A group of 4 wonderitems you need the slingshot to get, but only child can reach with cutscene QPA.",
		icon: "Slingshot Wonderitem",
		buttons: {
			"Slingshot Wonderitems": {
				useGroupImage: true,
				count: 4,
				Age: Age.EITHER,
				UseChildAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Shoot something to get these items. Child can also use cutscene QPA lined up to break the stick on it.",
				NeedsAny: [
					Items.FAIRY_SLINGSHOT, 
					[Age.CHILD, QPAItemSets.CUTSCENE_ITEM_QPA]
				]
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
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Hammer something to get these items.",
				Needs: [Items.MEGATON_HAMMER]
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
				LongDescription: "Set off an explosive to get these items.",
				Needs: [ItemSets.EXPLOSIVES]
			}
		}
	},
	"Sword and Hammer Wonderitem": {
		tooltip: "A group of wonderitems - one requiring a sword, and one requiring the hammer.",
		buttons: {
			"Sword Wonderitem": {
				LongDescription: "Swing your sword by this place to spawn the wonderitem.",
				NeedsAny: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
			},
			"Hammer Wonderitem": {
				Age: Age.EITHER,
				UseAdultAge: function() { return !Tricks.equipSwap.enabled; },
				LongDescription: "Swing your hammer by this place to spawn the wonderitem.",
				Needs: [Items.MEGATON_HAMMER]
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
				time: function() { return Time.DAY; },
				Age: Age.CHILD,
				LongDescription: "Climb up the stairs and walk along the catwalk by Bombchu Bowling during the day to get these items.",
			},
			"Night Balcony Items": {
				icon: "Blue Rupee Wonderitem",
				count: 2,
				time: function() { return Time.NIGHT; },
				Age: Age.CHILD,
				LongDescription: "Climb up the stairs and walk along the catwalk by Bombchu Bowling at night to get these items.",
			}
		}
	},
	"Castle Courtyard Items": {
		tooltip: "All the items in the castle courtyard.",
		icon: "Zelda's Lullaby",
		buttons: {
			"Zelda's Letter": {
				useGroupImage: true,
				LongDescription: "Talk to Zelda to get this check."
			},
			"Mario Wonderitem": {
				icon: "Child Archery",
				LongDescription: "Facing zelda, shoot the right side window (the one with the mario paintings) with your slingshot to get this item.",
				Needs: [Items.FAIRY_SLINGSHOT]
			},
			"Zelda's Lullaby": {
				icon: "Ocarina of Time",
				LongDescription: "After talking to Zelda, go talk to Impa to get teleported out. You will get this time afterwards.",
				postClick: function(isCompleted) {
					MapLocations["Castle"].talkedToImpa = isCompleted;
				}
			}
		}
	}
 };