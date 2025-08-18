/**
 * The array of tasks - this can be any of the following:
 * - something the player must do/have before opening the chest
 * - a curse (a requirement for the player in the area they opened the chest in)
 * - a punishment (because the player messed up a curse or opened a chest illegally)
 * 
 * How to set up a task:
 * == TOP LEVEL (every task in the difficultes array is affected by this)
 * - text: the text the user will see
 * - age: the age requirement for this task in general
 * - overworldOnly: True if the current location is NOT a dungeon
 * - dungeonOnly: True if the current location is a dungeon
 * - standard: (Only for dungeons) True if the current location is a standard dungeon
 * - mq: (Only for dungeons) True if the current location is a master quest dungeon
 * - isPunishment: whether this is suitable for a punishment (as in, the player messed up a curse, etc.)
 * 
 * == INNER LEVEL (only tasks in the difficulties array are affected by this)
 * - difficulties: an array of difficulty levels. It will go down the list one-by one and choose the FIRST one that
 *		matches. If none match, it will not consider this task at all. Note that with all of these settings,
 *		excluding it will pass that particular check.
 *       - Level: The difficulty level this option would use
 *			> Difficulty.NONE matches with every difficulty
 *		- OverworldOnly: True if the current location is NOT a dungeon
 *		- DungeonOnly: True if the current location is a dungeon
 *		- Standard: (Only for dungeons) True if the current location is a standard dungeon
 *		- MQ: (Only for dungeons) True if the current location is a master quest dungeon
 *		- Uses the same checks any ItemLocation would (Needs, NeedsAny, etc - see Data.calculateObtainability)
 */
RpgTasks = {
	"Anywhere": [
		// Curses
		{
			text: "CURSED: Disable the minimap",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "CURSED: No backwalking",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},

		{
			text: "CURSED: You cannot use C-Down",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},

		{
			text: "CURSED: Every time you see an enemy, you must kill it",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "CURSED: Navi cannot Z-target anything",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "CURSED: You can only attack by crouch-stabbing",
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [ItemSets.SWORDS, ItemSets.SHIELDS] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},

		{
			text: "CURSED: You cannot move by walking forward",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "CURSED: You have disadvantage on all rolls",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},

		{
			text: "CURSED: To check any item, you must be at critical health",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
						{
			text: "CURSED: You can only move by rolling",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "CURSED: You can only move by side-hopping",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "CURSED: You can only move by backflipping",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "CURSED: No glitches allowed",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "CURSED: You must unlock all possible doors before leaving the dungeon",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, DungeonOnly: true }]
		},
		{
			text: "CURSED: You can only roll with a D4",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},

		{
			text: "CURSED: Hold your controller upside down",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "CURSED: No using any item that does damage",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "CURSED: To leave the map, you must break and kill everything you can",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},

		// Other
		{
			text: "Have less than 40 rupees",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Take any damage",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Die",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform the ocarina items glitch",
			isPunishment: true,
			difficulties: [{ 
				Difficulty: RpgTaskDifficulty.EASY, 
				Needs: [Tricks.ocarinaItems.canDo]
			}]
		},
		{
			text: "Kill 5 enemies",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Shoot the item check with a slingshot or bow",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Age: Age.CHILD, Needs: [Items.FAIRY_SLINGSHOT]},
				{ Difficulty: RpgTaskDifficulty.EASY, Age: Age.ADULT, Needs: [Items.FAIRY_BOW]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "Drop your bugs or fish",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Needs: [GameStateSets.HAS_BOTTLE]}]
		},
		{
			text: "Kill a skulltula",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform 2 silent rolls in a row",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Have max health of 5 or more",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform any glitch",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Sing the current song for X mins (DM's choice)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform 3 quickspins in a row",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Age: Age.CHILD, Needs: [Equipment.KOKIRI_SWORD]}],
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Age: Age.ADULT }]
		},

		{
			text: "Get any other item first before opening this",
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Fill your wallet completely",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [UpgradedItems.GIANTS_WALLET]},
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [UpgradedItems.ADULTS_WALLET]},
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING },
			]
		},
		{
			text: "Wet yourself",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Play any minigame",
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Lose your bugs or fish",
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [GameStateSets.HAS_BOTTLE]}]
		},
		{
			text: "See a timer on your screen",
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Wear any mask",
			age: Age.CHILD,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [ItemSets.MASKS] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "Take fall damage",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		
		{
			text: "Kill all enemies on the map",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Spawn a scarecrow",
			age: Age.ADULT,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Songs.SCARECROWS_SONG] }]
		},
		{
			text: "Have more than 150 rupees",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Empty your wallet",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Have defeated any boss",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Get caught by any guard",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Talk to the owl",
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Talk to Mido",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Enrage the cuccos",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Get out of bounds",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "You must bomb the item check",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Exit and re-enter from any loading zone - have the DM get the item with your instructions",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},

		{
			text: "Have a Like-Like steal a shield from you",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "Play a warp song",
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "Play a non-warp song",
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "Play any song",
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [GameStateSets.CAN_PLAY_SONGS]}]
		},
		{
			text: "Kill a Peahat",
			age: Age.CHILD,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.ANNOYING, NeedsAny: [ItemSets.PROJECTILES, ItemSets.SWORDS] },
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		},
		{
			text: "Drink a Poe",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Age: Age.ADULT, Needs: [GameStateSets.HAS_BOTTLE]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Age: Age.ADULT },
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }
			]
		},
		{
			text: "Talk to Dampe",
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "Use all the consumable items of one type",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "You must burn the item check",
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [ItemSets.FIRE_ITEMS] },
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					NeedsAny: [
						Equipment.MAGIC, 
						() => Items.DINS_FIRE.playerHas, 
						(age) => age === Age.ADULT && 
							Items.FIRE_ARROW.playerHas && Items.FAIRY_BOW.playerHas
					]
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }
			]
		},
		{
			text: "Have the Lens of Truth active",
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Items.LENS_OF_TRUTH] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [() => Items.LENS_OF_TRUTH.playerHas] },
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Needs: [Equipment.MAGIC] },
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }
			]
		},

		{
			text: "Exit and re-enter the map; get to the item while blindfolded",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Do the dampe race",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Have defeated any 3 bosses",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Have at least 40 gold skulltula tokens",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Play one of the original OoT songs",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Walk on every possible polygonal surface of the loaded area (DM can judge)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Take damage in every possible way in the loaded area",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},

		{
			text: "Play blindfolded until you get the next item (DM can help)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "Use all your consumable items (as your current age)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "You must get this item as the other age",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		}
	],
	"Kokiri Forest": [
		{
			text: "Navigate from Saria's house to the end of the platform bridges without stopping",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Pick up all the rocks from the rock circle and throw them at Mido",
			isPunishment: true,
			Age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		}
	],
	"Lost Woods": [
		{
			text: "Travel from the initial Kokiri Forest entrance to the Sacred Forest Meadow while facing one direction",
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, NeedsAny: [Age.CHILD, Songs.SARIAS_SONG] },
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.ADULT, Needs: [Tricks.midoSkip.canDo] }
			]
		}
	],
	"Sacred Forest Meadow": [
		{
			text: "Navigate through the maze without killing a moblin",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		}
	],
	"Hyrule Field": [
		{
			text: "Do a lap around Lon Lon Ranch",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Kill a big poe",
			isPunishment: true,
			age: Age.ADULT,
			difficulties: [
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Needs: [GameStateSets.CAN_RIDE_EPONA, Items.FAIRY_BOW]
				},
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [Items.FAIRY_BOW] }
			]
		},
		{
			text: "Kill a giant stalchild",
			isPunishment: true,
			age: Age.CHILD,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Equipment.KOKIRI_SWORD] },
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Items.DEKU_STICK, Equipment.DEKU_SHIELD] },
			]
		}
	],
	"Lon Lon Ranch": [
		{
			text: "CURSED: Every time you see a chicken, you must pick it up",
			isPunishment: true,
			age: Age.ADULT,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Do a lap around the horse track while making horse noises",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		}
	],
	"Kakariko Village": [
		{
			text: "CURSED: Every time you see a chicken, you must pick it up",
			isPunishment: true,
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Collect the cuccos",
			isPunishment: true,
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Leave and re-enter from an overworld exit - get this item without seeing a chicken",
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		}
	],
	"Zora's River": [
		{
			text: "CURSED: Every time you see a chicken, you must pick it up",
			isPunishment: true,
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Swim from the waterfall to the bottom area",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		}
	],
	"Zora's Domain": [
		{
			text: "Dive off the rupee minigame ledge and take fall damage",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		}
	],
	"Zora's Fountain": [
		{
			text: "Perform the Jabu Jabu's Belly fishless glitch",
			age: Age.CHILD,
			difficulties: [{ 
				Difficulty: RpgTaskDifficulty.EASY,
				Needs: [Tricks.jabuFishless.canDo]
			}]
		},
		{
			text: "Navigate to the Ice Cavern entrance without getting wet",
			isPunishment: true,
			age: Age.ADULT,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Enter Jabu Jabu's Belly",
			age: Age.ADULT,
			difficulties: [{ 
				Difficulty: RpgTaskDifficulty.VERY_ANNOYING,
				Needs: [Tricks.enterJabuAsAdult.canDo]
			}]
		}
	],
	"Gerudo Valley": [
		{
			text: "CURSED: Every time you see a chicken, you must pick it up",
			isPunishment: true,
			age: Age.CHILD,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Jump in the river and take the exit before getting this item",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		}
	],
	"Gerudo Fortress": [
		{
			text: "CURSED: You must stun every guard before you can leave the map",
			isPunishment: true,
			age: Age.ADULT,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Items.FAIRY_BOW] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING },
			]
		},
		{
			text: "Perform the anti-grav glitch before getting this item",
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		},
		{
			text: "Shoot all the targets in the HBA area",
			isPunishment: true,
			difficulties: [
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Needs: [ItemSets.PROJECTILES],
					AdultNeedsAny: [Tricks.gfAdultBackAreaWithoutCard, GameStateSets.ARE_GERUDO_GUARDS_TAME]
				},
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		}
	],
	"Haunted Wasteland": [
		{
			text: "Navigate from the sand chasm to the ending flags without stopping",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Tricks.wastelandNoLens.canDo] }]
		}
	],
	"Desert Colossus": [
		{
			text: "Kill a giant leever",
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.ADULT },
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [Equipment.KOKIRI_SWORD] },
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Needs: [Items.DEKU_STICK, Equipment.DEKU_SHIELD] },
			]
		}
	],
	"Deku Tree": [
		{
			text: "Jump from the top floor to B1",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }],
		},
		{
			text: "Kill the Gohma Larva in B2",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }],
		},
		{
			text: "Do the B1 skip backup",
			age: Age.CHILD,
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Tricks.dekuB1Skip.canDo] }],
		},
		{
			text: "Burn a deku shield",
			age: Age.CHILD,
			mq: true,
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Equipment.DEKU_SHIELD]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING },
			]
		},
	],
	"Dodongo's Cavern": [
		{
			text: "Burn a deku shield",
			age: Age.CHILD,
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Equipment.DEKU_SHIELD]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING },
			],
		},
		{
			text: "Stand in both eyes of the big dodongo",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [ItemSets.EXPLOSIVES]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING },
			],
		}
	],
	"Jabu Jabu's Belly": [
		{
			text: "Stun a wiggly thing",
			difficulties: [
				{
					Difficulty: RpgTaskDifficulty.EASY, 
					Standard: true, 
					Needs: [Items.BOOMERANG]
				},
				{
					Difficulty: RpgTaskDifficulty.EASY, 
					MQ: true, 
					Needs: [Items.BOOMERANG, Items.FAIRY_SLINGSHOT]
				},
				{
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING, 
					Standard: true,
				},
				{
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING, 
					MQ: true, 
					NeedsAny: [Items.BOOMERANG, Items.FAIRY_SLINGSHOT]
				},
				{
					Difficulty: RpgTaskDifficulty.EXTREME_BITCH, 
					MQ: true
				}
			]
		},
		{
			text: "Stun a wiggly thing in the top room",
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Standard: true, 
					Needs: [Items.BOOMERANG]
				},
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					MQ: true, 
					Needs: [Items.BOOMERANG, ItemSets.EXPLOSIVES, Items.FAIRY_SLINGSHOT]
				},
				{ 
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING,
					Standard: true
				},
				{
					Difficulty: RpgTaskDifficulty.EXTREME_BITCH,
					MQ: true
				}
			]
		},
		{
			text: "Perform the blue switch skip",
			standard: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.BOOMERANG]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		}
	],
	"Forest Temple": [
		{
			text: "Kill both lobby wolfos",
			standard: true,
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [ItemSets.DAMAGING_ITEMS] },
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }
			]
		},
		{
			text: "Kill all lobby skullwalltulas",
			mq: true,
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [ItemSets.PROJECTILES] },
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.BOMBCHU] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "Get crushed by the falling ceiling",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Standard: true,
					Needs: [Items.FAIRY_BOW, () => ItemData.getKeyCount("Forest Temple") >= 5]
				},
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					MQ: true,
					Needs: [Items.FAIRY_BOW, () => ItemData.getKeyCount("Forest Temple") >= 6]
				},
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING, 
					Standard: true,
					NeedsAny: [Tricks.forestGreenPoeEarly.canDo, 
						[Tricks.forestSoTBlockLedgeClip.canDo, Tricks.megaFlip.canDo]]
				},
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING, 
					MQ: true,
					Needs: [Items.FAIRY_BOW],
					NeedsAny: [
						[
							() => ItemData.getKeyCount("Forest Temple") >= 2,
							Tricks.forestGreenPoeEarly.canDo,
						],
						[
							() => ItemData.getKeyCount("Forest Temple") >= 1,
							ItemSets.FIRE_ITEMS,
							Tricks.megaFlip.canDo
						]
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					Standard: true,
					Needs: [() => ItemData.getKeyCount("Forest Temple") >= 5]
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					MQ: true,
					Needs: [() => ItemData.getKeyCount("Forest Temple") >= 6]
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH } 
			]
		},
		{
			text: "Twist the corridor",
			age: Age.ADULT,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Standard: true,
					Needs: [Items.FAIRY_BOW, Equipment.STRENGTH],
					NeedsAny: [
						() => ItemData.getKeyCount("Forest Temple") >= 1,
						Tricks.forestMegaJumpToLedge.canDo
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					MQ: true,
					NeedsAny: [
						[
							() => ItemData.getKeyCount("Forest Temple") >= 1,
							Equipment.HOVER_BOOTS, 
							Tricks.weirdShot.canDo
						],
						[
							() => ItemData.getKeyCount("Forest Temple") >= 2,
							Equipment.STRENGTH
						]
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					Standard: true,
					NeedsAny: [
						[Items.FAIRY_BOW, Equipment.STRENGTH],
						[
							() => ItemData.getKeyCount("Forest Temple") >= 1,
							Tricks.forestMegaJumpToLedge.canDo
						]
					]
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH } 
			]
		},
		{
			text: "Despawn the song of time block",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Songs.SONG_OF_TIME]},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					Needs: [GameStateSets.CAN_PLAY_SONGS, () => Songs.SONG_OF_TIME.playerHas]
				},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING } 
			]
		},
		{
			text: "Perform the boss key skip",
			age: Age.ADULT,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Tricks.forestBKSkip.canDo] },
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [Tricks.forestBKSkip.enabled] } 
			]
		},
		{
			text: "Travel through the well tunnel",
			age: Age.ADULT,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.EASY, 
					Standard: true,
					NeedsAny: [
						Tricks.forestSoTBlockLedgeClip, 
						Songs.SONG_OF_TIME, 
						[Items.FAIRY_BOW, Equipment.IRON_BOOTS]
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.EASY, 
					MQ: true, 
					Needs: [() => ItemData.getKeyCount("Forest Temple") >= 1, Items.FAIRY_BOW]
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					Standard: true, 
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					MQ: true, 
					NeedsAny: [() => ItemData.getKeyCount("Forest Temple") >= 1, Items.FAIRY_BOW]
				},
				{ 
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING, 
					MQ: true
				}
			]
		},
	],
	"Fire Temple": [
		{
			text: "Flip a torch slug",
			age: Age.ADULT,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING,
					Needs: [
						() => ItemData.getKeyCount("Fire Temple") >= 4,
						Items.MEGATON_HAMMER
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING,
					Needs: [() => ItemData.getKeyCount("Fire Temple") >= 4]
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH } 
			]
		},
		{
			text: "Fall from the very top room",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING, 
					Needs: [() => ItemData.getKeyCount("Fire Temple") >= 5]
				},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		},
		{
			text: "CURSED: You cannot equip the goron tunic",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		}
	],
	"Water Temple": [
		{
			text: "Change the water level",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [Songs.ZELDAS_LULLABY]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		},
		{
			text: "Spawn the scarecrow",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Songs.SCARECROWS_SONG]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "Jump in the toilet room and swirl around it",
			age: Age.ADULT,
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING }
			]
		}
	],
	"Shadow Temple": [
		{
			text: "Void out",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY }
			]
		},
		{
			text: "Get caught by a Floormaster",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Equipment.HOVER_BOOTS] },
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Tricks.megaFlip.canDo]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING },
			]
		},
		{
			text: "Hook the scarecrow on the cage",
			age: Age.ADULT,
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Needs: [
						Songs.SCARECROWS_SONG, 
						Equipment.HOVER_BOOTS,
						UpgradedItems.LONGSHOT, 
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING, 
					Needs: [ 
						Songs.SCARECROWS_SONG,
						Tricks.megaFlip.canDo,
						UpgradedItems.LONGSHOT
					] 
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING, 
					Needs: [UpgradedItems.LONGSHOT],
					NeedsAny: [Songs.SCARECROWS_SONG, Tricks.megaFlip.canDo]
				},
				{ 
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING, 
					NeedsAny: [Songs.SCARECROWS_SONG, UpgradedItems.LONGSHOT] 
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH },
			]
		}
	],
	"Spirit Temple": [
		{
			text: "Climb the shifting wall without hookshotting",
			age: Age.ADULT,
			difficulties: [
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING,
					Standard: true,
					Needs: [() => ItemData.getKeyCount("Spirit Temple") >= 4, Equipment.STRENGTH]
				},
				{ 
					Difficulty: RpgTaskDifficulty.IRRITATING,
					MQ: true,
					Needs: [
						() => ItemData.getKeyCount("Spirit Temple") >= 3, 
						Equipment.STRENGTH,
						UpgradedItems.LONGSHOT,
						Items.BOMBCHU
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.ANNOYING,
					MQ: true,
					NeedsAny: [UpgradedItems.LONGSHOT, Equipment.STRENGTH],
					NeedsAny: [
						() => ItemData.getKeyCount("Spirit Temple") >= 3, 
						Items.BOMBCHU
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.VERY_ANNOYING,
					Standard: true,
					NeedsAny: [() => ItemData.getKeyCount("Spirit Temple") >= 4, Equipment.STRENGTH]
				},
				{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }
			]
		},
		{
			text: "Jump off the hands into Desert Colossus",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING }
			]
		}
	],
	"Ice Cavern": [
		{
			text: "Get frozen", 
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Do a lap around the dungeon",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Equipment.IRON_BOOTS]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		}
	],
	"Bottom of the Well": [
		{
			text: "Fall to the basement", 
			age: Age.CHILD,
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform the actor glitch", 
			age: Age.CHILD,
			isPunishment: true,
			difficulties: [
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING,
					Standard: true,
					Needs: [
						Tricks.botwActorGlitch.canDo,
						() => ItemData.getKeyCount("Bottom of the Well") >= 2
					]
				},
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING,
					MQ: true,
					Needs: [Tricks.botwActorGlitch.canDo]
				},
				{
					Difficulty: RpgTaskDifficulty.ANNOYING,
					Standard: true
				}
			]
		}
	],
	"Training Grounds": [
		{
			text: "Spawn the scarecrow", 
			age: Age.ADULT,
			standard: true,
			isPunishment: true,
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Songs.SCARECROWS_SONG, Items.HOOKSHOT] },
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		},
		{
			text: "Spawn the song of time block", 
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Songs.SONG_OF_TIME]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		}
	],
	"Ganon's Castle": [
		{
			text: "Talk to a scrub in the castle", 
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Do a lap around the outer ring of the castle", 
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		}
	]
};