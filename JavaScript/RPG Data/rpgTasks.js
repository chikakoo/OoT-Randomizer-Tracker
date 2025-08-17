RpgTaskDifficulty = {
    NONE: 0,
    EASY: 1,
    MILDLY_IRRITATING: 2,
    IRRITATING: 3,
    ANNOYING: 4,
    VERY_ANNOYING: 5,
    EXTREME_BITCH: 6
};

/**
 * The array of tasks - this can be any of the following:
 * - something the player must do/have before opening the chest
 * - a curse (a requirement for the player in the area they opened the chest in)
 * - a punishment (because the player messed up a curse or opened a chest illegally)
 * 
 * How to set up an event:
* - text: the text the user will see
* - isPunishment: whether this is suitable for a punishment (as in, the player messed up a curse, etc.)
* - difficulties: an array of difficulty levels. It will go down the list one-by one and choose the first one that
*		matches. If none match, it will not consider this event at all. Note that with all of these settings,
*		excluding it would pass that particular check.
*       - Level: The difficulty level this option would use
*			> Difficulty.NONE matches with everything
*		- OverworldOnly: True if the current location is NOT a dungeon
*		- DungeonOnly: True if the current location is a dungeon
*		- Standard: (Only for dungeons) True if the current location is a standard dungeon
*		- MQ: (Only for dungeons) True if the current location is a master quest dungeon
*		- Uses the same checks any ItemLocation would (Needs, NeedsAny, etc - see Data.calculateObtainability)
*/
RpgTasks = {
	"Anywhere": [
		{
			text: "CURSED: No backwalking",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
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
			text: "CURSED: You cannot use C-Down",
			isPunishment: true,
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
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Age: Age.CHILD }]
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
			text: "CURSED: Every time you see an enemy, you must kill it",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Collect the cuccos",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Spawn a scarecrow",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.ADULT }]
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
			text: "Burn yourself with fire damage",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "Talk to the owl",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.CHILD }]
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
			text: "CURSED: Navi cannot Z-target anything",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},
		{
			text: "You must bomb the item check",
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING }]
		},

		{
			text: "Have a Like-Like steal a shield from you",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "CURSED: You can only roll with a D4",
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
			text: "CURSED: To check any item, you must be at critical health",
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},
		{
			text: "Kill a Peahat",
			difficulties: [
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Age: Age.CHILD, NeedsAny: [ItemSets.PROJECTILES, ItemSets.SWORDS] },
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Age: Age.CHILD }
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
			text: "CURSED: You cannot move by walking forward",
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
			difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
		},

		{
			text: "Exit and re-enter the map; get to the item while blindfolded",
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
			text: "Do the dampe race",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "Have defeated any 3 bosses",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }]
		},
		{
			text: "CURSED: No glitches allowed",
			isPunishment: true,
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
			text: "CURSED: You must unlock all possible doors before leaving the dungeon",
			difficulties: [{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, DungeonOnly: true }]
		},

		{
			text: "CURSED: Hold your controller upside down",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "Play blindfolded until you get the next item (DM can help)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "CURSED: No using any item that does damage",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "Use all your consumable items (as your current age)",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "CURSED: To leave the map, you must break and kill everything you can",
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
		},
		{
			text: "You must get this item as the other age",
			difficulties: [{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH }]
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
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Tricks.dekuB1Skip.canDo] }],
		},
		{
			text: "Burn a deku shield",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Age: Age.CHILD, MQ: true, Needs: [Equipment.DEKU_SHIELD]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING, MQ: true, Age: Age.CHILD },
			]
		},
	],
	"Dodongo's Cavern": [
		{
			text: "Burn a deku shield",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Age: Age.CHILD, Needs: [Equipment.DEKU_SHIELD]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Age: Age.CHILD },
			],
		},
		{
			text: "Stand in both eyes of the big dodongo",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [ItemSets.EXPLOSIVES]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING },
			],
		},
	],
	"Jabu Jabu's Belly": [
		{
			text: "Stun a wiggly thing in the top room",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.BOOMERANG]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		},
		{
			text: "Perform the blue switch skip",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.BOOMERANG]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		}
	],
	"Forest Temple": [
		{
			text: "Get crushed by the falling ceiling",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.FAIRY_BOW]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		},
		{
			text: "Twist a corridor",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Items.FAIRY_BOW]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		},
		{
			text: "Despawn the song of time block",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Songs.SONG_OF_TIME]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		},
		{
			text: "Perform the boss key skip",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Tricks.forestBKSkip.canDo]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING } 
			]
		},
		{
			text: "Travel through the well tunnel",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Age: Age.ADULT },
			]
		},
	],
	"Fire Temple": [
		{
			text: "Flip a torch slug",
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Items.MEGATON_HAMMER]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING } 
			]
		},
		{
			text: "Fall from the very top room",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Needs: [Equipment.GORON_TUNIC]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "CURSED: You cannot equip the goron tunic",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		}
	],
	"Water Temple": [
		{
			text: "Change the water level",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.ANNOYING, Needs: [Songs.ZELDAS_LULLABY]},
				{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING }
			]
		},
		{
			text: "Spawn the scarecrow",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Needs: [Songs.SCARECROWS_SONG]},
				{ Difficulty: RpgTaskDifficulty.ANNOYING }
			]
		},
		{
			text: "Jump in the toilet room and swirl around it",
			isPunishment: true,
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.ADULT }
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
			difficulties: [ 
				{ 
					Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
					Needs: [
						Songs.SCARECROWS_SONG, 
						Equipment.HOVER_BOOTS,
						UpgradedItems.LONGSHOT, 
					],
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
			difficulties: [ 
				{ Difficulty: RpgTaskDifficulty.IRRITATING, Age: Age.ADULT }
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
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
		},
		{
			text: "Perform the actor glitch", 
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING }]
		}
	],
	"Training Grounds": [
		{
			text: "Spawn the scarecrow", 
			isPunishment: true,
			difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Needs: [Songs.SCARECROWS_SONG] }]
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