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
*       - Location: The location of this task (a string)
*		- otherwise, does the same checks any ItemLocation would
*/
RpgTasks = [
    // Anywhere
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
		text: "Kill a Peehat",
		difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING, Age: Age.CHILD }]
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
		difficulties: [{ Difficulty: RpgTaskDifficulty.ANNOYING }]
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
	},

	// Deku Tree specific
	{
		text: "Jump from the top floor to B1",
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Deku Tree" }],
	},
	{
		text: "Kill the Gohma Larva in B2",
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Deku Tree" }],
	},
	{
		text: "Do the B1 skip backup",
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Deku Tree" }],
	},
	
	// Dondongo's Cavern specific
	{
		text: "Burn a deku shield",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Dodongo's Cavern", Needs: [Equipment.DEKU_SHIELD]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Dodongo's Cavern" },
		],
	},
	{
		text: "Stand in both eyes of the big dodongo",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Dodongo's Cavern", Needs: [ItemSets.EXPLOSIVES]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Dodongo's Cavern" },
		],
	},
	
	// Jabu Jabu specific
	{
		text: "Stun a wiggly thing in the top room",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Jabu Jabu's Belly", Needs: [Items.BOOMERANG]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Jabu Jabu's Belly" } 
		]
	},
	{
		text: "Perform the blue switch skip",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Jabu Jabu's Belly", Needs: [Items.BOOMERANG]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Jabu Jabu's Belly" } 
		]
	},
	
	// Forest Temple specific
	{
		text: "Get crushed by the falling ceiling",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Forest Temple", Needs: [Items.FAIRY_BOW]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Forest Temple" } 
		]
	},
	{
		text: "Twist a corridor",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Forest Temple", Needs: [Items.FAIRY_BOW]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Forest Temple" } 
		]
	},
	{
		text: "Despawn the song of time block",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Forest Temple", Needs: [Songs.SONG_OF_TIME]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Forest Temple" } 
		]
	},
	{
		text: "Perform the boss key skip",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Forest Temple", Needs: [Tricks.forestBKSkip.canDo]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Forest Temple" } 
		]
	},
	{
		text: "Travel through the well tunnel",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Forest Temple", Age: Age.ADULT },
		]
	},
	
	// Fire Temple specific
	{
		text: "Flip a torch slug",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Fire Temple",  Needs: [Items.MEGATON_HAMMER]},
			{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Location: "Fire Temple" } 
		]
	},
	{
		text: "Fall from the very top room",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Fire Temple", Needs: [Equipment.GORON_TUNIC]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Fire Temple" }
		]
	},
	{
		text: "CURSED: You cannot equip the goron tunic",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Fire Temple" }
		]
	},
	
	// Water Temple specific
	{
		text: "Change the water level",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Water Temple", Needs: [Songs.ZELDAS_LULLABY]},
			{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Location: "Water Temple" }
		]
	},
	{
		text: "Spawn the scarecrow",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Water Temple", Needs: [Songs.SCARECROWS_SONG]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Water Temple" }
		]
	},
	{
		text: "Jump in the toilet room and swirl around it",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Water Temple", Age: Age.ADULT }
		]
	},
	
	// Shadow Temple specific
	{
		text: "Void out",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Shadow Temple" }
		]
	},
	{
		text: "Get caught by a Floormaster",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Shadow Temple", Needs: [Equipment.HOVER_BOOTS] },
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Shadow Temple", Needs: [Tricks.megaFlip.canDo]},
			{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Location: "Shadow Temple" },
		]
	},
	{
		text: "Hook the scarecrow on the cage",
		difficulties: [ 
			{ 
				Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, 
				Location: "Shadow Temple", 
				Needs: [
                    Songs.SCARECROWS_SONG, 
                    Equipment.HOVER_BOOTS,
                    UpgradedItems.LONGSHOT, 
                ],
			},
			{ 
				Difficulty: RpgTaskDifficulty.IRRITATING, 
				Location: "Shadow Temple", 
				Needs: [ 
                    Songs.SCARECROWS_SONG,
					Tricks.megaFlip.canDo,
					UpgradedItems.LONGSHOT
				] 
			},
			{ 
				Difficulty: RpgTaskDifficulty.ANNOYING, 
				Location: "Shadow Temple", 
				Needs: [UpgradedItems.LONGSHOT],
                NeedsAny: [Songs.SCARECROWS_SONG, Tricks.megaFlip.canDo]
			},
			{ 
				Difficulty: RpgTaskDifficulty.VERY_ANNOYING, 
				Location: "Shadow Temple", 
				NeedsAny: [Songs.SCARECROWS_SONG, UpgradedItems.LONGSHOT] 
			},
			{ Difficulty: RpgTaskDifficulty.EXTREME_BITCH, Location: "Shadow Temple" },
		]
	},
	
	// Spirit Temple specific
	{
		text: "Climb the shifting wall without hookshotting",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Spirit Temple", Age: Age.ADULT }
		]
	},
	{
		text: "Jump off the hands into Desert Colossus",
		isPunishment: true,
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Spirit Temple" }
		]
	},
	
	// Ice Cavern specific
	{
		text: "Get frozen", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Ice Cavern" }]
	},
	{
		text: "Do a lap around the dungeon",
		difficulties: [ 
			{ Difficulty: RpgTaskDifficulty.IRRITATING, Location: "Ice Cavern", Needs: [Equipment.IRON_BOOTS]},
			{ Difficulty: RpgTaskDifficulty.VERY_ANNOYING, Location: "Ice Cavern" }
		]
	},
	
	// Bottom of the Well specific
	{
		text: "Fall to the basement", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Bottom of the Well" }]
	},
	{
		text: "Perform the actor glitch", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.MILDLY_IRRITATING, Location: "Bottom of the Well" }]
	},
	
	// Training Grounds specific
	{
		text: "Spawn the scarecrow", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Training Grounds", Needs: [Songs.SCARECROWS_SONG] }]
	},
	{
		text: "Spawn the song of time block", 
		difficulties: [
			{ Difficulty: RpgTaskDifficulty.EASY, Location: "Training Grounds", Needs: [Songs.SONG_OF_TIME]},
			{ Difficulty: RpgTaskDifficulty.ANNOYING, Location: "Training Grounds" } 
		]
	},
	
	// Ganon's Castle specific
	{
		text: "Talk to a scrub in the castle", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Ganon's Castle" }]
	},
	{
		text: "Do a lap around the outer ring of the castle", 
		isPunishment: true,
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY, Location: "Ganon's Castle" }]
	}
];