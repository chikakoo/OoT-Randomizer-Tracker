let Age = {
	EITHER: "Either",
	CHILD: "Child",
	ADULT: "Adult"
};

let Time = {
	EITHER: 0,
	DAY: 1,
	NIGHT: 2,
	DAY_CHILD: 3,
	DAY_ADULT: 4,
	NIGHT_CHILD: 5
};

let OpenKakarikoSettings  = {
	VANILLA: 0,
	OPEN_WITH_ZELDAS_LETTER: 1,
	OPEN: 2
};

let OpenZorasFountainSettings = {
	VANILLA: 0,
	ADULT: 1,
	ALL: 2
};

let OpenGerudosFortressSettings = {
	VANILLA: 0,
	ONE_CARPENTER: 1,
	OPEN: 2
};

let ShuffleLocationSettings = {
	OFF: 0,
	ALL: 1,
	DUNGEON_ONLY: 2,
	OW_ONLY: 3
};

let MedallionSettings = {
	VANILLA: 0,
	OPEN: 1,
	ALL_MEDALLIONS: 2,
	ALL_DUNGEONS: 3,
	ALL_STONES: 4,
	SKULLTULAS: 5
};

let DungeonSettings = {
	STANDARD: 0,
	MASTER_QUEST: 1,
	MIXED: 2
};

let SmallKeySettings = {
	VANILLA: 0,
	SMALL_KEY_SANITY: 1,
	KEYSY: 2
};

let GossipStoneSettings = {
	HIDE: 0,
	ALWAYS: 1,
	STONE_OF_AGONY: 2,
	MASK_OF_TRUTH: 3
};

let Settings = {
	ItemLocationsToExclude: {
		// Maps: {
		// 	"Gerudo Fortress": ["Archery Minigame 1000 Points", "Archery Minigame 1500 Points"],
		// 	"Fire Temple": ["Chest in Scarecrow Song Area"]
		// },

		// Interiors: {
		// 	"Fishing Pond": ["Child Fishing", "Adult Fishing"],
		// 	"Child Archery": ["Child Archery"],
		// 	"Adult Archery": ["Adult Archery"],
		// 	"Link's House": ["Cow in Link's House"]
		// },

		// Grottos: {
		// 	"Dampe's Grave": ["Hookshot Chest", "Race Reward"]
		// }
	},

	TrackerSettings: {
		saveFileName: "",
		deprioritizeDampeToWindmill: true,
		deprioritizeHyruleField: true,
		deprioritizeHauntedWasteland: true,
		routeBasedOnTime: false //TODO: Not completed yet, do not use!
	},
	
	RandomizerSettings: {
		// Open world
		openForest: true,
		closedDeku: false,
		openDoorOfTime: true,
		autoPlantBeans: false,
		openKakariko: OpenKakarikoSettings.OPEN_WITH_ZELDAS_LETTER,
		openZorasFountain: OpenZorasFountainSettings.VANILLA,
		openGerudosFortress: OpenGerudosFortressSettings.VANILLA,
		
		// Sanity and logic changes
		startingAge: Age.CHILD,
		skipToTTravel: false,
		maxRequiredTokens: 50,
		skulltulaSetting: ShuffleLocationSettings.ALL,
		medallionSetting: MedallionSettings.OPEN,
		gossipStoneSetting: GossipStoneSettings.HIDE,
		medallionSkulltulaSetting: 50,
		dungeonSetting: DungeonSettings.MIXED,
		smallKeySetting: SmallKeySettings.SMALL_KEY_SANITY,
		chestMinigameSmallKeySetting: SmallKeySettings.SMALL_KEY_SANITY,
		scrubSanity: true,
		shopSanity: true,
		cowSanity: true,
		shuffleOcarinaButtons: true,
		shuffleHyruleLoach: true,
		shuffleExpensiveMerchants: true,
		shuffleAllFrogSongs: true,
		shuffleBeehives: true,
		shuffleSilverRupees: true,
		shuffleWonderitems: true,
		bombchusInLogic: true,
		iceArrowsActAsBlueFire: true,
		rupeeAndHeartSetting: ShuffleLocationSettings.ALL,
		potSetting: ShuffleLocationSettings.ALL,
		shuffleEmptyPots: true,
		crateSetting: ShuffleLocationSettings.ALL,
		shuffleEmptyCrates: true,
		
		// Entrance shuffle settings
		shuffleInteriorEntrances: true,
		shuffleGrottoEntrances: true,
		shuffleThievesHideout: true,
		shuffleDungeonEntrances: true,
		shuffleBossEntrances: true,
		shuffleOverworldEntrances: true,
		randomizeOwlDrops: true,
		decoupleEntrances: false //TODO: this will probably be a setting to decouple in the different pools instead
	},
	
	/**
	 * For the spoiler log notes parser - this is so it knows what player you are
	 */
	PlayerNumber: 1
};

let Tricks = {
	//#region Force Equips
	categoryForceEquips: {
		isCategory: true,
		displayText: "Force Equips"
	},
	forceAdultDekuStickEquip: {
		enabled: false,
		displayText: "Force Adult Deku Stick Equip",
		description: "Enable this if you have deku sticks equipped, but got equip-swapped blocked by a child trade item or magic beans."
	},
	forceAdultQPACutsceneItemEquip: {
		enabled: false,
		displayText: "Force Adult QPA Cutscene Item Equip",
		description: "Enable this if you can double equip swap sticks and a QPA cutscene item, to allow adult to do Cutscene Item QPA."
	},
	forceAdultSlingshotEquip: {
		enabled: false,
		displayText: "Force Adult Slingshot Equip",
		description: "Enable this if you have slingshot equipped, but got equip-swapped blocked by a child trade item or magic beans."
	},
	forceAdultBoomerangEquip: {
		enabled: false,
		displayText: "Force Adult Boomerang Equip",
		description: "Enable this if you have boomerang equipped, but got equip-swapped blocked by a child trade item or magic beans."
	},
	//#endregion Force Equips

	//#region Common/Misc
	categoryCommonMisc: {
		isCategory: true,
		displayText: "Common/Misc"
	},
	ocarinaItems: {
		enabled: true,
		canDo: () => Tricks.ocarinaItems.enabled &&
			GameStateSets.HAS_BOTTLE() &&
			(Items.BUGS.playerHas || Items.FISH.playerHas),
		displayText: "Ocarina Items",
		description: "Empty + recatch bugs or fish so you are holding the bottle; backflip, quickly press a working item then the bottle you are holding before you land; you should now be playing an ocarina\x0A\x0AWorking items include any sword, stick, hammer, explosive, slingshot, bow, hookshot, and boomerang",
		links: [{
			url: "https://www.zeldaspeedruns.com/oot/tech/ocarina-items",
			description: "ZSR Trick Page"
		}]
	},
	difficultOcarinaItems: {
		enabled: true,
		canDo: () => Tricks.difficultOcarinaItems.enabled &&
			GameStateSets.HAS_BOTTLE() &&
			(Items.BUGS.playerHas || Items.FISH.playerHas),
		displayText: "Harder Ocarina Items",
		description: "This is for harder areas to execute the ocarina items glitch - includes the Skull Kid ocarina minigame and the Skull Kid you play Saria's Song for.",
		links: [{
			url: "https://www.zeldaspeedruns.com/oot/tech/ocarina-items",
			description: "ZSR Trick Page"
		}]
	},
	megaFlip: {
		enabled: false,
		canDo: (age) => Tricks.megaFlip.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.EXPLOSIVES]),
		canDoWithChu: (age) => Tricks.megaFlip.canDo(age) && 
			Items.BOMBCHU.playerHas,
		displayText: "Megaflip and Megasidehop",
		description: "For all of these, face toward where you want to go; turn 180\x0A\x0AMEGAFLIP:\x0A- BOMB: Move forward a little bit; dryroll; insta drop + roll; backflip; roll and spam backflip + shield when the bomb is about to explode\x0A- CHU: Chu to black after the 7th red flash, or the next frame (the 8th red flash); shield drop it and roll (keep Z and shield held); backflip on the frame Link is looking upward, but his shield is not out\x0A\x0AMEGASIDEHOP:\x0A- BOMB: Same as megaflip, but roll on any of the last 5 frames of the explosion, and spam left sidehop + shield\x0A- CHU: Roll at the rhythm of when an 8th red flash WOULD happen if the frequency didn't increase; spam left sidehop + shield"
	},
	isg: {
		enabled: false,
		canDo: (age) => Tricks.isg.enabled &&
        	ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
		displayText: "Infinite Sword Glitch",
		description: "Requires a sword and a shield. Interrupt a crouch stab with an A button action or Navi text on the correct frame."
	},
	qpa: {
		// Note that we're omitting the canDo for now in favor of QPAItemSets
		enabled: false,
		displayText: "Quick Putaway",
		description: "WITH A SHORT LEDGE: At a ledge you fall down but can't grab, slowly walk off (value of 27 is high enough); press A for one frame; press B or your sword item (to jumpslash) on the next frame; it worked if you jumpslash with no item\x0A\x0AWITH A CUTSCENE ITEM: Take out a deku stick and wait for the Put Away option; press A to put it away, and press the cutscene item on the next frame. Perform this, then break a stick to get the glitched value on the stick. Doing so while breaking a stick on a mud wall will break it without needing a shield (AND will activate QPA on all weapons).\x0A\x0ABoth ages can get broken stick by facing a vertical wall; turn right; ess left x3; jumpslash with stick.\x0A\x0ANote that most torches can be lit as Child by getting ISG and backflipping into them.",
		links: [{
			url: "https://www.zeldaspeedruns.com/oot/tech/quick-putaway-glitched-damage-value",
			description: "ZSR Trick Page"
		}]
	},
	lungeStorage: {
		enabled: false,
		canDo: (age) => Tricks.lungeStorage.enabled &&
			ItemData.canUseAny(age, [
				Equipment.MASTER_SWORD, 
				Equipment.KOKIRI_SWORD, 
				Items.DEKU_STICK]),
		canDoWithQuickDraw: (age) => Tricks.lungeStorage.enabled &&
			ItemData.canUseAny(age, [
				Items.DEKU_STICK, 
				Equipment.BIGGORONS_SWORD, 
				GameStateSets.CAN_QUICKDRAW]),
		displayText: "Lunge Storage",
		description: "Get close to any ledge and face so aren't facing the dropoff with your sword weapon out; press up and the sword weapon at the same time; it worked if you fell or are now hanging off the ledge.",
		links: [{
			url: "https://www.zeldaspeedruns.com/oot/tech/lunge-storage",
			description: "ZSR Trick Page"
		}]
	},
	flameStorage: {
		enabled: false,
		canDo: (age) => Tricks.flameStorage.enabled &&
			ItemData.canUse(age, Items.DEKU_STICK),
		displayText: "Flame Storage",
		description: "Line up with a torch so that it will light when you take it out. With Navi out (press A if she isn't), press the stick and then A to put it away quickly. The next time you take it out, it will be lit as long as the torch is still loaded."
	},	
	groundJump: {
		enabled: false,
		canDoWithBomb: (age) => Tricks.groundJump.enabled &&
			ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
		canDoWithBombOrStrength: (age) => Tricks.groundJump.enabled && // Includes bombflowers or pots
			ItemData.canUse(age, ItemSets.SHIELDS) &&
			ItemData.canUseAny(age, [ItemSets.EXPLOSIVES, Equipment.STRENGTH]),
		displayText: "Ground Jump",
		description: "Place a bomb/bombflower in front of you; take out a sword and take a step back; hold Z and shield and press A; if it worked, you'll shield the explosion and your next backflip will be straight up\x0A\x0AWith chus (works with bombflowers and pots), position as far as you can from it so that the A button still says Grab; take out a chu; press R, then A + R quickly (keep R held); you'll shield the explosion and store a ground jump if you done correctly",
	},
	staircaseHover: {
		enabled: false,
		canDo: (age) => Tricks.staircaseHover.enabled &&
			ItemData.canUse(age, [Items.BOMB, ItemSets.SWORDS, ItemSets.SHIELDS]),
		displayText: "Staircase Hover",
		description: "Get ISG; shield drop a bomb; sidehop; drop another; holding Z, walk between the bombs; backflip just before the first bomb explodes, then again before the second; can drop more bombs and time more backflips if you need more height"
	},
	bombSuperslide: {
		enabled: false,
		canDo: (age) => Tricks.bombSuperslide.enabled &&
			ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
		canDoWithHoverBoots: (age) => Tricks.bombSuperslide.canDo(age) &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Bomb Superslide",
		description: "Shield drop a bomb; sidehop; shield drop a bomb; backflip; retarget; dry roll; wait until the bomb is about to explode; hold Z and R (forever) and press A to roll; spam A during the roll"
	},
	hammerHoverBootsSuperslide: {
		enabled: false,
		canDo: (age) => Tricks.hammerHoverBootsSuperslide.enabled &&
			ItemData.canUse(age, [Equipment.HOVER_BOOTS, Items.MEGATON_HAMMER]),
		displayText: "Hammer & Hover Boots Superslide",
		description: "Hit a wall with your hammer; pause on the first frame the hammer is up high; equip hover boots; hold in Link's forward direction (usually down) to travel really far",
		links: [{
			url: "https://youtu.be/Mvu23cQBX2Q?t=19",
			description: "Video - the start of it is the frame to pause on."
		}]
	},
	equipSwap: {
		// Excluding canDo for now in favor of Data.canEquipSwap
		enabled: false,
		displayText: "Equip Swap",
		description: "Mouse over the item you want to equip; advance the screen; advance back to the items; on the right frame, press up left or up right (toward the item menu) and a c-button to equip that item.\x0A\x0ATiming: When the farthest side edge (i.e. on the right screen, use the left edge) of the item name box on the bottom lines up with the corner of the pause menu.",
		links: [{
			url: "https://youtube.com/shorts/-TU2NRzkMp8",
			description: "Video"
		}]
	},
	weirdShot: {
		enabled: false,
		_hasBasicItems: (age) => Tricks.weirdShot.enabled &&
        	ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]),
		canDo: (age) => Tricks.weirdShot._hasBasicItems(age) &&
			ItemData.canUse(age, Items.HOOKSHOT),
		canDoWithLongshot: (age) => Tricks.weirdShot._hasBasicItems(age) &&
			ItemData.canUse(age, UpgradedItems.LONGSHOT),
		canDoWithProjectiles: (age) => Tricks.weirdShot._hasBasicItems(age) &&
			ItemData.canUse(age, ItemSets.PROJECTILES),
		displayText: "Weird Shot",
		description: "Works with hookshot, longshot, and any projectiles.\x0A\x0ABonk on a wall; shield drop bomb, roll, backflip; press hookshot and shield quickly so it's out (and keep Z and R held); when bomb almost explodes, roll foward holding down, Z, R, hookshot; release R and Z one after another at the right time",
		links: [{
			url: "https://youtu.be/x08fkfU2124",
			description: "Video"
		}]
	},
	hookshotExtensionSotBlocks: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.hookshotExtensionSotBlocks.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		canDoWithBow: (age) => age === Age.ADULT &&
			Tricks.hookshotExtensionSotBlocks.enabled &&
			ItemData.canUse(age, Items.FAIRY_BOW),
		displayText: "Hookshot Extention Through SoT Blocks",
		description: "Get in the very corner of the block so you clip through; take out hookshot (or bow); press A, then hookshot and up again real quick; aim down and hit what you are trying to hit.\x0A\x0ACurrently has uses in MQ Deku, MQ Jabu, and MQ Shadow."
	},
	boomerangThroughWalls: {
		enabled: false,
		canDo: (age) => Tricks.boomerangThroughWalls.enabled &&
			ItemData.canUse(age, Items.BOOMERANG),
		displayText: "Boomerang Items Through Walls",
		description: "Used in various places to throw a boomerang at an angle to snag items through walls or rocks."
	},
	boomerangTrickThrows: {
		enabled: false,
		canDo: (age) => Tricks.boomerangTrickThrows.enabled &&
			ItemData.canUse(age, Items.BOOMERANG),
		displayText: "Boomerang Trick Throws",
		description: "Used in various places to throw a boomerang to retrieve freestanding items."
	},
	breakBeehivesWithBombs: {
		enabled: true,
		canDo: () => Tricks.breakBeehivesWithBombs.enabled && Items.BOMB.playerHas,
		displayText: "Break Beehives with Bombs",
		description: "Cook a bomb long enough to blow up beehives. In each case, throw the bomb at the beehive so that it blows up on it."
	},
	breakBeehivesWithChus: {
		enabled: true,
		canDo: () => Tricks.breakBeehivesWithChus.enabled && Items.BOMBCHU.playerHas,
		displayText: "Break Beehives with Bombchus",
		description: "Cook a bombchu long enough to blow up beehives. Each check should have a rough timing in its description."
	},
	//#endregion Common/Misc

	//#region Forest Areas
	categoryForestAreas: {
		isCategory: true,
		displayText: "Forest Areas"
	},
	pokeySkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.pokeySkip.enabled &&
			ItemData.canUse(age, [ItemSets.SWORDS, Equipment.DEKU_SHIELD]),
		displayText: "Pokey Skip",
		description: "Target the right wall by the Kokiri blocking the entrance; turn right; B to slash + hold shield; crouch stab and get ISG; step back and roll past the guy",
		links: [{
			url: "https://youtu.be/DKyqJXD94BE",
			description: "Video"
		}]
	},
	houseOfTwinsSkullWithoutHookshot: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.houseOfTwinsSkullWithoutHookshot.enabled &&
			ItemData.canUseAny(age, [Equipment.HOVER_BOOTS, Tricks.isg.canDo]),
		displayText: "House of Twins Skulltula Without Hookshot",
		description: "ISG:\x0AGet isg; target the root right of the door; with this angle, get against the back right root and sidehop left to the corner; backflip; sidehop left; tap down to go down just a bit more; sidehop left and RELEASE TARGET during the hop; tap down to turn around (if you can't turn, you didn't release target in time); backflip; kill the skulltula and backflip to get the token\x0A\x0AHOVER BOOTS:\x0ASeamwalk up the back right root of the House of Twins; use hover boots to get on the house; kill the skulltuls and backflip to get the token",
		links: [{
			url: "https://youtu.be/FRJ3T6v0XmA",
			description: "Video - using ISG"
		}]
	},
	midoSkip: {
		enabled: true,
		canDo: () => Tricks.midoSkip.enabled,
		displayText: "Adult Mido Skip",
		description: "Get in the corner by mido; C-up and line up the A button so the right side is barely touching the ledge (or a pixel or so is visible; backflip (can buffer it during unpause lag if you want)",
		links: [{
			url: "https://youtu.be/ZmgEGIGPbiM",
			description: "Video"
		}]
	},
	lwSkullWithoutBean: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.lwSkullWithoutBean.enabled &&
			// No need to check whether you can kill it due to the pause trick
			ItemData.canUseAny(age, [Items.HOOKSHOT, Tricks.boomerangTrickThrows.canDo]),
		displayText: "Skulltula by Forest Stage Without Bean",
		description: "Kill the skull (chu/Din's it, or shoot it from where the grass meets the wall on the left); line up with the cliff where it was; backflip x2; hookshot just above the ledge.\x0A\x0AIf you don't have an item to kill it, stand a bit passed the corner of the grass by the skulltula, perpendicular to the wall; c-up and face the edge of the log; hold forward and triple slash, pausing at the START of the third slash; pause 42 more times (total of 43); after the last unpause, it should die (yeah, really).",
		links: [{
			url: "https://youtu.be/YFLxEw2_PBw",
			description: "Video - using distance item"
		},
		{
			url: "https://youtu.be/vvMUitRUo5c",
			description: "Video - using pause trick"
		}]
	},
	lwAdultBridgeFromTop: {
		enabled: false,
		canDo: (age) => age === Age.ADULT && 
			Tricks.lwAdultBridgeFromTop.enabled,
		displayText: "Adult Bridge Jump From Top",
		description: "From the top, get into the left corner; backflip; sidehop right; turn right; Z and up A; keep holding up until after you jump off the log; press B on one of the two frames where Link's arm is lined up with the bottom of the gossip stone",
		links: [{
			url: "https://youtu.be/UVDXKqqcQuI",
			description: "Video"
		}]
	},
	lwAdultBridgeWithHookshot: {
		enabled: true,
		canDo: (age) => age === Age.ADULT &&
			Tricks.lwAdultBridgeWithHookshot.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Adult Bridge With Hookshot",
		description: "Get into the left side; line up just to the right of where the slope changes; hookshot in the corner where the tree meets the bridge (no red dot)",
		links: [{
			url: "https://youtu.be/UVDXKqqcQuI?t=61",
			description: "Video"
		}]
	},
	lwBridgePressureJump: {
		enabled: false,
		canDo: () => Tricks.lwBridgePressureJump.enabled &&
			Items.BOMB.playerHas,
		displayText: "Pressure Jump to Lost Woods",
		description: "Drop a bomb in the tunnel by the corner close to the ladder at the Kokiri Forest exit; get in the corner; if child, move right a tiny bit; hold forward as the bomb is about to explode",
		links: [{
			url: "https://youtu.be/WLco0OJznEE",
			description: "Video"
		}]
	},
	zorasRiverScalelessChild: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.zorasRiverScalelessChild.enabled &&
			ItemData.canUse(age, ItemSets.ACUTE_ANGLE_SWORDS),
		displayText: "Child Clip to River",
		description: "Get in the left corner by the water; backflip; roll untarget; sidehop right; roll untarget; sidehop left; roll hold target\x0A\x0AWith Z held, slash; backflip; sidehop right and jumpslash on the right frame; swim to the loading zone",
		links: [{
			url: "https://youtu.be/7kDXQZZw-wk?t=128",
			description: "Video"
		}]
	},
	zorasRiverScalelessAdult: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.zorasRiverScalelessAdult.enabled,
		displayText: "Adult Clip to River",
		description: "Get in corner; sidehop right x3, left x1; climb up; keep hold of ess right; B to jumpslash; A + B to jumpslash again when ripples are almost gone",
		links: [{
			url: "https://youtu.be/MbLnc5-q-Nc",
			description: "Video"
		}]
	},
	//#endregion Forest Areas

	//#region HF/Market/Castle
	categoryHFMarketCastle: {
		isCategory: true,
		displayText: "HF/Market/Castle"
	},
	doorOfTimeSkip: {
		enabled: false,
		canDo: (age) => Tricks.doorOfTimeSkip.enabled &&
			ItemData.canUseAny(age, [
				[Age.CHILD, Equipment.DEKU_SHIELD, Equipment.KOKIRI_SWORD],
				[Age.ADULT, ItemSets.SHIELDS, Equipment.HOVER_BOOTS]
			]),
		displayText: "Door of Time Skip",
		description: "CHILD: Get lunge storage off the altar; target the door; sidehop left; sideroll untarget; sidehop right; sideroll hold target; sidehop right; sidehop left; sideroll hold target; ess right x1; quickdraw; jumpslash holding nothing\x0A\x0AADULT: Target left side of the left pillar; sidehop right; sideroll untarget; ess right x2; get into right corner; holding nothing, slash + shield x2; croushstab; equip hover boots on second frame of sparks; hold right after clipping",
		links: [{
			url: "https://youtu.be/rsQsebyHhxY",
			description: "Video - Child"
		},
		{
			url: "https://youtu.be/pzZstuQrx70",
			description: "Video - Adult"
		}]	
	},
	doubleDefenseEarly: {
		enabled: false,
		canDo: (age) => Tricks.doubleDefenseEarly.enabled &&
			ItemData.canUseAny(age, [
				ItemSets.EXPLOSIVES,
				[ItemSets.SHIELDS, Equipment.HOVER_BOOTS]
			]),
		displayText: "Double Defense Early",
		description: "WITH RECOIL: Get into the right corner; C-up and line up so the right edge of the sword icon is covered by the wall; crouch-stab; on the first recoil frame, equip hovers and hold left\x0A\x0AWITH EXPLOSIVES: Get into the left corner and target the wall; turn right (you can get out of the corner to do the next part now, just hold the angle); right ess turn x1 if using a bomb, x2 if using a chu; get back in the corner if you aren't there; pull your explosive and let it explode",
		links: [{
			url: "https://youtu.be/h10O9zU2FWE",
			description: "Video - using recoil"
		},
		{
			url: "https://www.youtube.com/watch?v=omUKghUMFsU",
			description: "Video - using explosives"
		}]
	},
	adultGrottoByGVWithoutHammer: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultGrottoByGVWithoutHammer.enabled &&
			ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
		displayText: "Adult Grotto by GV Without Hammer",
		description: "Blow up hole under rock; line up with fifth fence post and climb up/jump off; backwalk to align with fence; shield drop bomb and instant backflip; immediately left/right sidehop; hold up to climb fence; RELEASE UP when climb starts, and hold shield; backflip off fence; backflip to hole",
		links: [{
			url: "https://youtu.be/3eVAxXI-4Yc",
			description: "Video"
		}]
	},
	//#endregion HF/Market/Castle

	//#region Kakariko/Graveyard
	categoryKakarikoGraveyard: {
		isCategory: true,
		displayText: "Kakariko/Graveyard"
	},
	watchtowerSkullJumpslash: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.watchtowerSkullJumpslash.enabled &&
			ItemData.canUse(age, ItemSets.SWORDS),
		displayText: "Jumpslash Watchtower Skulltula",
		description: "Climb up to the skulltula, one step before it will hit you off the tower; A to let go, then immediately jumpslash to kill it"
	},
	windmillHPWithNothing: {
		enabled: true,
		canDo: (age) => age === Age.ADULT &&
			Tricks.windmillHPWithNothing.enabled,
		displayText: "Adult Windmill HP With Nothing",
		description: "Jump on the spinning platform; jump on the pillar to the left; roll jump to the center of the spinning thing; navigate to the heart piece"
	},
	dampeSoTBlockClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.dampeSoTBlockClip.enabled &&
			ItemData.canUse(age, ItemSets.EXPLOSIVES),
		displayText: "Adult Dampe Race SoT Block Clip",
		description: "Face block; ess 1 right for bomb, 2 for chu; get in right corner next to block; hold target & wait for explosion.",
		links: [{
			url: "https://youtu.be/M61crTXnjT0",
			description: "Video"
		}]
	},
	kakShopClips: {
		enabled: false,
		canDo: (age) => Tricks.kakShopClips.enabled && 
			ItemData.canUse(age, ItemSets.ACUTE_ANGLE_SWORDS),
		canDoForArchery: (age) => age === Age.ADULT &&
			Tricks.kakShopClips.enabled && 
			ItemData.canUse(Age.ADULT, ItemSets.SHIELDS),
		displayText: "Kakariko Shops Clips",
		description: "BAZAAR CHILD:\x0AGet from the corner closest to death mountain; C-up so the A button is to the right of the corner by ~an A button's length; jumpslash and shield, or tap forward to not clip back in\x0A\x0ABACK OF POTION SHOP (BOTH):\x0AFrom the corner up the ladder in the back area, C-up so the A button is on the corner, but slightly to the left; jumpslash and shield, or tap forward to not clip back in; if you end up on the right side, you can angle yourself and sidehop + jumpslash to get to the other side\x0A\x0AARCHERY AT NIGHT (ADULT):\x0AGet in the corner of the crate and the shop, facing the crate; sidehop left; sideroll untarget; crouchstab x2; jumpslash and hold forward"
	},
	botwAsChildWithCucco: {
		enabled: false,
		canDo: (age) => Tricks.botwAsChildWithCucco.enabled && 
			ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
		displayText: "Child Well with Cucco",
		description: "Note: DO NOT backwalk or have bunny hood equipped during this, or the cuccos will attack!\x0A\x0AGet ISG off a cucco, stand by the wall surrounding the well, facing away from it; quickly shield drop the cucco and backflip; hold the direction of the well when the cutscene ends (usually left)"
	},
	botwAsAdultWithCucco: {
		enabled: false,
		canDo: (age) => Tricks.botwAsAdultWithCucco.enabled && 
			ItemData.canUse(age, [UpgradedItems.LONGSHOT, Equipment.HOVER_BOOTS]),
		displayText: "Adult Well with Cucco",
		description: "Longshot up the windmill. Using hover boots, pick up the cucco and navigate behind you. Jumpslash at the fence to get thorough and pick up the cucco. Now backwalk off with hover boots and navigate to the well loading zone."
	},
	botwAsAdultWihChus: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.botwAsAdultWihChus.enabled &&
			Items.BOMBCHU.playerHas,
		displayText: "Adult Well with Chus",
		description: "Backwalk off the ledge by the windmill and climb up; ess right x2; neutral roll x2; take out chu and backwalk ON THE SAME FRAME; climb up; target the left wall; sidehop right; sidehop left; A to roll; Z on first frame you are grabbing the ledge; keep Z held",
		links: [{
			url: "https://youtu.be/ofu8P2v65-g",
			description: "Video"
		}]
	},
	boomerangGraveyardHP: {
		enabled: false,
		canDo: (age) => Tricks.boomerangGraveyardHP.enabled &&
			ItemData.canUse(age, Items.BOOMERANG),
		displayText: "Box Heart Piece with Boomerang",
		description: "Climb the ledge; turn right; sidle a bit left; aim the boomerang so Link's head just barely covers the far green ledge; throw it; quickly sidehop left x3, then backflip x2",
		links: [{
			url: "https://youtu.be/r-d-bw3sq8s",
			description: "Video"
		}]
	},
	unloadGrave: {
		enabled: false,
		canDo: () => Tricks.unloadGrave.enabled,
		displayText: "Unload Graves",
		description: "This is to get into the Royal Family Tomb without Zelda's Lullaby, or Dampe's grave as Child. If you load and unload the grave from the top of the graveyard enough times, it will be gone."
	},
	oldShadowEarly: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.oldShadowEarly.enabled &&
			ItemData.canUse(age, [ItemSets.EXPLOSIVES, ItemSets.SHIELDS]),
		displayText: "Old Shadow Early",
		description: "This uses an explosive to get to the seam near the heart piece box. You then seamwalk all the way to the temple.",
		links: [{
			url: "https://youtu.be/2sGY6J8O9eE",
			description: "Video"
		}]
	},
	hookshotJump: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.hookshotJump.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Hookshot Jump for Shadow Early",
		description: "Hookshot in hand, get in the corner by the shed; sidehop right; hold up, A to roll, release up, spam hookshot - you should now be in a weird animation; on or after the third cycle, press hookshot right before the red dot appears; if it works, hold down just before you start descending; ISG off the poe and go to shadow normally",
		links: [{
			url: "https://youtu.be/HTU0fKl-6uQ",
			description: "Video"
		}]
	},
	childShadowWithBombPush: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.childShadowWithBombPush.enabled &&
			ItemData.canUse(age, [
				Items.BOMB, 
				ItemSets.SWORDS, 
				ItemSets.SHIELD_DROP_SHIELDS]),
		displayText: "Child Shadow With Bomb Push",
		description: "Target the wall right of the entrance; backwalk into it; turn 180; sidehop right; backflip x2 (take out sword mid backflip, if using Kokiri Sword); jumpslash + R; sidehop left; vertical slash; turn left (DO NOT HOLD FORWARD INTO THE WALL)\x0A\x0AInstadrop 3 bombs quickly (keep Z held); hold left; starting on the first frame you can see both your feet touching to the right of the bomb (2 frames) - sidehop right x3; sidehop left",
		links: [{
			url: "https://youtu.be/s6ne3eG_DOE",
			description: "Video"
		}]
	},
	adultShadowLedgeClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultShadowLedgeClip.enabled,
		displayText: "Adult Shadow Ledge Clip",
		description: "Target the right wall; backflip; sideroll; retarget; turn 180; sidehop left; sideroll; retarget; hold target and SLOWLY walk up the seam (very finnicky); get close to the ledge; A to roll; pause on the first frame link is grabbing the ledge; pause buffer a new Z press during unpause lag; on one of the frames you see your hair, quickly A to let go + B to jumpslash + hold forward to clip in",
		links: [{
			url: "https://youtu.be/9YiWh9rqHgM",
			description: "Video"
		}]
	},
	//#endregion Kakariko/Graveyard

	//#region Mountain Areas
	categoryMountainAreas: {
		isCategory: true,
		displayText: "Mountain Areas"
	},
	dmtClipToChestByGoron: {
		enabled: false,
		canDo: (age) => Tricks.dmtClipToChestByGoron.enabled &&
			ItemData.canUse(age, ItemSets.SWORDS),
		displayText: "DMT Clip to Chest By Goron",
		description: "Take out sword/stick; backwalk to grab the ledge above it (won't always work...); sidehop and pause when he's lined up with the corner (almost immediately); jumpslash + hold up. Adult gets more frames for the jumpslash.",
		links: [{
			url: "https://youtu.be/iJ0IJqKqhhg",
			description: "Video"
		}]
	},
	dmtBombFlowerChestByGoron: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.dmtBombFlowerChestByGoron.enabled &&
			Equipment.STRENGTH.playerHas,
		displayText: "DMT Bomb Flower to Chest By Goron",
		description: "(Child only) Pick up the bomb flower above Dodongo's Cavern and backwalk to the path the chest is at - walk towards the bombable wall and throw the bomb flower to blow it up. Timing is tight, so it isn't free."
	},
	dmtClimbWithHoverBoots: {
		enabled: false,
		canDo: (age) => Tricks.dmtClimbWithHoverBoots.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "DMT Pass Rocks with Hover Boots",
		description: "Target wall next to the boulder; turn right to face it; sidehop left; sideroll and retarget; sidehop right - equip hover boots in midair; keep target held and hold up until you are at the top.",
		links: [{
			url: "https://youtu.be/5KWbTFgAvMI",
			description: "Video"
		}]
	},
	dmtSkullsWithoutHammer: {
		enabled: false,
		canDo: (age) => age === Age.ADULT && 
			Tricks.dmtSkullsWithoutHammer.enabled,
		displayText: "DMT Rock Skulltulas Without Hammer",
		description: "ROCK BY GORON:\x0AKill skull; set in the corner left of the rock, facing the wall; sidehop right; A to sideroll (release Z); swing sword holding nothing; target skulltula; jumpslash.\x0A\x0AUPPER ROCK:\x0AKill skull; backflip into the rock from the north side into the acute angle",
		links: [{
			url: "https://youtu.be/hnj5SncIHsk",
			description: "Video - rock by Goron"
		}]
	},
	goronUrnWithChus: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.goronUrnWithChus.enabled &&
			Items.BOMBCHU.playerHas,
		displayText: "Stop Goron Urn With Bombchus",
		description: "Drop a chu into the spinning urn after the 3rd or 4th flash to stop it. Deku nuts can help, but aren't necessary."
	},
	stopAdultGoronWithFire: {
		enabled: false,
		canDo: (age) => age === Age.ADULT && 
			Tricks.stopAdultGoronWithFire.enabled &&
			ItemData.canUseAny(age, [Items.DINS_FIRE, Items.BLUE_FIRE]),
		displayText: "Stop Adult Goron With Fire",
		description: "DIN'S FIRE:\x0AGet by the left bombflower; while he is going counter-clocksise, cast Din's Fire right when he gets behind the fences\x0A\x0ABLUE FIRE:\x0AFace the door by Medigoron; get in the corner by the right bomb flower; angle camera so you can see the tunnel (exit first-person mode); when the goron is barely behind the fence (and going counter-clockwise), release the fire",
		links: [{
			url: "https://youtu.be/y6i0ziTsmCk",
			description: "Video - Din's fire"
		}]
	},
	goronChildStatueSkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.goronChildStatueSkip.enabled &&
			ItemData.canUseAny(age, [
				Equipment.DEKU_SHIELD, // Pot Push
				[ // Explosive push
					ItemSets.EXPLOSIVES,
					[SetType.OR, Equipment.KOKIRI_SWORD, Items.DEKU_STICK]
				]
			]),
		displayText: "Child DMC Exit from Goron",
		description: "STICK + EXPLOSIVE\x0ATarget right corner wall; turn right; backflip into corner\x0A- BOMB: retarget; dry roll; place bomb (take out and place quickly); backwalk from bomb; backflip into corner; slash with stick\x0A- CHU: slash with stick; drop chu\x0A\x0ASWORD + EXPLOSIVE\x0ATarget left corner wall; turn left; backflip into corner; retarget; dry roll\x0A- BOMB: place bomb; holding nothing, slash torch\x0A- CHU: holding nothing, slash the torch; drop chu\x0A\x0ADEKU SHIELD + POT\x0APick up pot; target wall to the right of the statue; back up a bit; ess right x3; walk right until the torch nudges you to the left; pause on Link's breathing cycle when the pot is higher up (lots of rames); sidewalk left; on the frame Link nudges to the left sharply (one after you are centered with the wall design), press shield (keep sidewalking left)",
		links: [{
			url: "https://youtu.be/UCnoWTA4xE8",
			description: "Video - explosives (use other vid for pot push)"
		},
		{
			url: "https://youtu.be/UQ3ARylC9fs",
			description: "Video - pot push"
		}]
	},
	hoverBootsToVolcanoHP: {
		enabled: false,
		canDo: (age) => Tricks.hoverBootsToVolcanoHP.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Hover Boots to Volcano HP",
		description: "You can use hover boots to get the volcano if you use them by the bridge to the fairy fountain.",
		links: [{
			url: "https://youtu.be/rbxaO5lNUTU",
			description: "Video"
		}]
	},
	childSidehopToDoubleMagic: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.childSidehopToDoubleMagic.enabled,
		displayText: "Child Sidehop to DMC Fairy",
		description: "Target the wall to the left of the rocks; spam right sidehops until you are in; can also time frame-perfect A presses.",
		links: [{
			url: "https://youtu.be/oj0vLc3SZmc",
			description: "Video"
		}]
	},
	adultRecoilHoverBootsToDoubleMagic: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultRecoilHoverBootsToDoubleMagic.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]),
		displayText: "Adult Recoil to DMC Fairy",
		description: "Get in left corner of rocks; C-up and put the cliff between the A and C-left button; dry roll x2; crouchstab; pause on first recoil frame; equip hovers; unpause and hold down",
		links: [{
			url: "https://youtu.be/-3BJBREE2eY?t=50",
			description: "Video - note that the setup described is not included"
		}]
	},
	//#endregion Mountain Areas

	//#region Zora Areas
	categoryZoraAreas: {
		isCategory: true,
		displayText: "Zora Areas"
	},
	adultWaterfallHPJump: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultWaterfallHPJump.enabled,
		displayText: "Adult ZR Waterfall Item With Nothing",
		description: "Get in the corner, by the HP, facing the taller wall; backflip; sidehip left; roll + untarget; roll; climb up; roll; release everything and hold down",
		links: [{
			url: "https://youtu.be/FXxvf0IgmhQ",
			description: "Video"
		}]
	},
	cuccoToZorasDomain: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.cuccoToZorasDomain.enabled,
		displayText: "Cucco to Zora's Domain",
		description: "Bring a cucco to the Zora's Domain entrance; jump from the left side of the waterfall (not precise), and fly into it from the side to bypass the Zelda's Lullaby requirement",
		links: [{
			url: "https://youtu.be/1juo8sED_Go",
			description: "Video"
		}]
	},
	hoverBootsToZorasDomain: {
		enabled: true,
		canDo: (age) => age === Age.ADULT &&
			Tricks.hoverBootsToZorasDomain.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Hover Boots to Zora's Domain",
		description: "Climb the right side of the corner of the pool of water; ess right x2, or C-up to the right a bit; equip hovers and mash rolls until you grab the ledge",
		links: [{
			url: "https://youtu.be/B0kbnE3AmYc",
			description: "Video"
		}]
	},
	megasidehopToZorasDomain: {
		enabled: false,
		canDo: (age) => Tricks.megasidehopToZorasDomain.enabled &&
			ItemData.canUse(age, [ItemSets.SWORDS, Tricks.megaFlip.canDoWithChu]),
		displayText: "Mega Sidehop to Zora's Domain",
		description: "Get ISG; target the left wall; back up and ess left x3; hold z forever; scoot to the right in the corner; take out chu; A + R + Spam right sidehop",
		links: [{
			url: "https://youtu.be/_CPM8Ziorg4",
			description: "Video"
		}]
	},
	domainSkullWithJumpslash: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.domainSkullWithJumpslash.enabled,
		displayText: "Domain Skulltula With Jumpslash",
		description: "Target the right wall at the tunnel entrance; navigate to the middle of the tunnel and sidehop left into the corner; WAIT FOR LINK TO SLIDE FOR ALL OF THESE: backflip x2; sideroll hold target; sidehop right; turn right\x0A\x0AB to swing sword - wait a bit before releasing (but not so much that you spin attack); re-press target, as it would be disabled if you did it right; jumpslash; after landing (BEFORE LINK GETS UP), immediately hold up and start spamming the next jumpslash; jump to get the token",
		links: [{
			url: "https://youtu.be/jYyJNrJ3oOQ",
			description: "Video"
		}]
	},
	childKingZoraSkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.childKingZoraSkip.enabled &&
			ItemData.canUse(age, ItemSets.EXPLOSIVES),
		displayText: "Child King Zora Skip With Explosives",
		description: "BOMB POSITION:\x0ATarget King Zora's wall; turn rght; ess left x1; get into corner to your right; backflip\x0A\x0ACHU POSITION:\x0ATarget pedestal's right side; turn 180; sidehop left; sideroll release target; retarget; get into the corner to the right of the pedestal with this angle\x0A\x0AONCE IN POSITION:\x0AKeep Z held forever; pause buffer explosive and up (keep it held); hold back to stay in bounds once clipped; swim behind the king",
		links: [{
			url: "https://youtu.be/DvyxtoMnw_U",
			description: "Video"
		}]
	},
	adultKingZoraSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultKingZoraSkip.enabled,
		displayText: "Adult King Zora Skip",
		description: "Target the angled wall to the left of the king; get in the acute angle to the right; jumpslash and tap forward (or hold shield) to stay in bounds; swim behind the king",
		links: [{
			url: "https://youtu.be/WTo716QYDf0",
			description: "Video"
		}]
	},
	blueFireShopSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.blueFireShopSkip.enabled,
		displayText: "Zora Shop Blue Fire Skip",
		description: "Target the wall to the left of the pots; turn around; get in the corner to the right of the ice; QUICKLY hold Z and slash, then hold right and slash; left sidehop; jumpslash\x0A\x0AIf you have a shield, you can shield after the first slash and not have to do the other slash quickly",
		links: [{
			url: "https://youtu.be/DQbvZACdRTM",
			description: "Video - can do without shield (see tooltip)"
		}]
	},
	thawKingZoraWithoutBlueFire: {
		enabled: true,
		canDo: (age) => age === Age.ADULT &&
			Tricks.thawKingZoraWithoutBlueFire.enabled &&
			ItemData.canUseAny(age, [
				// Backwalk and use the cutscene item
				Items.BUGS,
				Items.FISH,
				ItemData.hasAdultTradeItem,
				Items.MAGIC_BEAN,
				Items.NAYRUS_LOVE,
				ChildTradeItems.WEIRD_EGG,
				ChildTradeItems.ZELDAS_LETTER,

				// Sign reading glitch - doesn't seem to work on ModLoader
				[
					() => !ItemLocationSets.MOVE_KING_ZORA(),
					() => !SocketClient.isCoOp()
				]
			]),
		displayText: "Thaw King Zora Without Blue Fire",
		description: "KING NOT MOVED:\x0ALeft-sidehop up from the bottom of the stairs. Center with the torch, then go barely to the left. Back up as much as you can and check the sign. Now go back down and up to reload the king, and he will be unthawed.\x0A\x0AKING IN ANY POSITION:\x0ABackwalk up the stairs until just passed the black part (the loading zone). Use bugs/fish/potion/trade item/Nayru's Love (equipped swapped beans work too) and go back down and up the stairs. The king will be unthawed.",
		links: [{
			url: "https://youtu.be/73O5FHcmdFE",
			description: "Video - king not moved (reading the sign)"
		},
		{
			url: "https://youtu.be/4hV2OuOnE28",
			description: "Video - king in any position (cutscene item)"
		}]	
	},
	adultDomainToLake: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultDomainToLake.enabled,
		displayText: "Adult Domain to Lake",
		description: "WITHOUT HOOKSHOT: Climb up the ladder; from the top, left sidehop; A to sideroll (untarget); ess right 1; right sidehop; hold down - you should be glitched into the wall; press A to fall and hold up to stay out of bounds\x0A\x0AWITH HOOKSHOT: From the corner of the small island, hookshot the top right part of the ladder and hold nothing; A, then B immediately\x0A\x0AONCE OUT OF BOUNDS: Walk parallel to the void as far as you can; turn left and sidehop right into the void; jumpslash when link disappears and navigate to the loading zone.",
		links: [{
			url: "https://youtu.be/nFNtKyGu-Jo",
			description: "Video - without hookshot"
		},
		{
			url: "https://youtu.be/C-KEp5ON4lQ",
			description: "Video - with hookshot"
		}]
	},
	jabuFishless: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.jabuFishless.enabled &&
			ItemData.canUse(age, ItemSets.SWORDS),
		displayText: "Jabu Fish Skip",
		description: "METHOD 1: Face the rail in the right corner; sidehop left; turn right; sidehop left and press A to jumpslash the left side of the pillar - you should recoil back into the loading zone if you hit the right frame\x0A\x0AMETHOD 2: Face the pillar in the right corner, hold nothing and slash sword; turn left and target; release Z; climb up, immediately hold left; A to jumpslash when sword is parallel to your foot",
		links: [{
			url: "https://youtu.be/fTGsrd5sqzE",
			description: "Video - method 1"
		},
		{
			url: "https://youtu.be/ZKSvxu1koOw",
			description: "Video - method 2 (excludes the slash setup)"
		}]
	},
	enterJabuAsAdult: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.enterJabuAsAdult.enabled &&
			ItemData.canUse(age, [
				ItemSets.SHIELDS, 
				[SetType.OR,
					Items.BOMBCHU,
					[Items.BOMB, Equipment.HOVER_BOOTS]]
			]),
		displayText: "Enter Jabu as Adult",
		description: "WITH CHUS:\x0AGet ISG; from corner, backflip x2, roll untarget, left, roll untarget, right, roll hold target; run to the ledge, chu until 9th red; Z + shield + right + A\x0A\x0AHold up between up/up-right (x between 29 and 41) - will see link walk in place; chu until blue after 8th red flash; shield + right (KEEP SHIELD FOREVER); buffer until link jerks right; A; pause until the right explosion frame; A + left\x0A\x0AWITH BOMBS + HOVER BOOTS:\x0AStart with kokiri boots; get in corner, facing west with the pillar to the left of you; turn 180; roll; sidehop right; roll + release target; shield turn right; roll;equip hovers\x0A\x0Atake out bomb; 4 frames to A + R to roll and mash right sidehop (big blue is last frame); let go of everything; on the first frame where your left arm is greater than 45 degrees, pause; equip kokiri boots; B during unpause lag; wait at least one frame; equip hover boots; unpause and wait",
		links: [{
			url: "https://youtu.be/NmtGis95m-A",
			description: "Video - bombchus"
		},
		{
			url: "https://youtu.be/bVo9JfEze1s",
			description: "Video - bombs and hover boots (setup in tooltip to get to the position is more precise)"
		}]	
	},
	//#endregion Zora Areas

	//#region Lake Hylia
	categoryLakeHylia: {
		isCategory: true,
		displayText: "Lake Hylia"
	},
	labHPWithoutGoldenScale: {
		enabled: false,
		canDo: (age) => Tricks.labHPWithoutGoldenScale.enabled &&
			ItemData.canUse(age, [Equipment.IRON_BOOTS, Items.HOOKSHOT]),
		displayText: "Lakeside Lab HP without Golden Scale",
		description: "Sink to the bottom with iron boots; stand away from the box; shoot hookshot at the box, and pause before the chain reaches it; equip hover boots; you should hear the jingle indicating it worked",
		links: [{
			url: "https://youtu.be/l7YcOq6IyiU",
			description: "Video"
		}]
	},
	adultDomainMegaflipClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultDomainMegaflipClip.enabled &&
			ItemData.canUse(age, Tricks.megaFlip.canDo),
		displayText: "Adult ZD from Lake With Megaflip",
		description: "Climb up next to the south pillar. Sidehop left x2, backflip x5. 2F ess turn right. Shield turn around. Dry roll once.\x0A- BOMB: shield drop + roll, backflip, megaflip (backflip on the first shield frame)\x0A- BOMBCHU: backflip, shield flick, megaflip.\x0A\x0ARelease all buttons after the flip starts. Walk to the loading zone.",
		links: [{
			url: "https://youtu.be/LOgjpPd5A_Y",
			description: "Video"
		}]
	},
	childLakesideLabClip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.childLakesideLabClip.enabled &&
			ItemData.canUse(age, ItemSets.ACUTE_ANGLE_SWORDS),
		displayText: "Child Lakeside Lab Clip",
		description: "Align with lab so you're facing east; backwalk sideroll and release; left sidehop sideroll release; get in corner; slash; left sidehop; right sidehop; slash; backflip; jumpslash; turn 180; backflip x2\x0A\x0ATO WATER TEMPLE:\x0AAlign with wall so hat is in the black crease; sidehop right holding Z; turn around when scene is not visible; swim (SPAM B!) to the left side exposed sky triangle until link's arrow is a little embedded in the island before going in.\x0A\x0ATO ZORA'S DOMAIN:\x0AFollow the water temple steps, but get back in the water earlier; navigate to the loading zone, using the minimap as reference",
		links: [{
			url: "https://youtu.be/yJJC1pq2K4s",
			description: "Video - to Water Temple"
		}]
	},
	adultLakesideLabClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultLakesideLabClip.enabled &&
			ItemData.canUseAny(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]),
		displayText: "Adult Lakeside Lab Clip",
		description: "BACKFLIPS:\x0AGet in corner by lab, hold Z; sidehop left; roll; backflip; sidehop right; roll and release Z; quick draw; shield turn 180; jumpslash and shield; backflip x3\x0A\x0AHOVER BOOTS:\x0AClimb the fence by the door of the lab; equip hovers; rotate around and grab the fence again from the left; if done right, you will be clipped in\x0A\x0AAFTER - GETTING TO TEMPLE (water drained):\x0AJump in the empty triangle to get to the water; swim to the right side of the temple, toward the out of bounds water; once there, the camera will snap back; swim into the cetner, staying out of bound, then into the temple\x0A\x0AAFTER - GETTING TO ZD (high water):\x0AAlign with back wall so hat is in the black crease; sidehop right;hold down after a couple seconds; navigate to where Zora's Domain entrance is (use the minimap for guidance)",
		links: [{
			url: "https://youtu.be/_nEkqyZeVYU",
			description: "Video - lab clip + Water Temple entry"
		},
		{
			url: "https://youtu.be/miV2w7_zqr0",
			description: "Video - hover boots clip to lab"
		},
		{
			url: "https://youtu.be/bqZahkLlCRs",
			description: "Video - lab clip to domain (see child lab clip for video that matches description, this one's not the same)"
		}]
	},
	adultWaterTempleClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.adultWaterTempleClip.enabled,
		displayText: "Adult Water Temple Clip",
		description: "With water drained, climb the ledge to the right of the ZD entrance; sidehop left into the wall; turn to face the wall; ledge clip and swim to the right side of the water in the center of the lake; avigate out of bounds through the wall to the temple",
		links: [{
			url: "https://youtu.be/xORo1AjwxyQ?t=11",
			description: "Video"
		}]
	},
	skullInTreeWithHookshot: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.skullInTreeWithHookshot.enabled &&
			ItemData.canUse(age, [Items.HOOKSHOT, ItemSets.SHIELDS]),
		displayText: "Skulltula in Tree with Hookshot",
		description: "Get ISG off the fire arrow plaque; target the tree stump left of the warp pad; sidehop right; dry roll until you stop moving; sidehop right x2; aim for the triangle vertex (see video); if you make it up, aim for the vertex above the branch; spam jumpslash",
		links: [{
			url: "https://youtu.be/I4SqvdaamYs",
			description: "Video"
		}]
	},
	//#endregion Lake Hylia

	//#region Gerudo Valley/Fortress
	categoryGerodoValleyFortress: {
		isCategory: true,
		displayText: "Gerudo Valley/Fortress"
	},
	cuccoJump: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.cuccoJump.enabled &&
			ItemData.canUse(age, Equipment.KOKIRI_SWORD),
		displayText: "Cucco Jump",
		description: "Pick up cucco; target right side of gate; turn 180; throw behind you; turn 180; Z + B to vertical slash x2; diagonal slash (Z + B + Right); backflip + pick up cucco\x0A\x0ATurn left; throw cucco; turn right; sidehop left x2 (pause buffer the second one); turn right + pick up cucco\x0A\x0AHold backwalk until you move back one frame, then release; ess left x3; with nothing else held - hold forward until link moves his feet; hold up left; jumpslash (B) when Link is hidden by the wall, close to the gate (3 frames)",
		links: [{
			url: "https://youtu.be/dHCi0YEcUbA",
			description: "Video"
		}]
	},
	gvCrossBridgeWithHookshot: {
		enabled: false,
		canDo: (age) => age === Age.ADULT && 
			Tricks.gvCrossBridgeWithHookshot.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Items.HOOKSHOT]),
		displayText: "Cross GV Bridge with Hookshot",
		description: "Get in left corner, to the left of the little pillar; sidehop right x3; dry roll; shield turn right; three shield scoots forward; hookshot extend\x0A\x0AAim vertically until you see the dot (if on tent side, aim a VERY tiny bit more left and make sure you aim as high as the dot lets you); release and hold forward",
		links: [{
			url: "https://youtu.be/RMqzj3XLqqg",
			description: "Video"
		}]
	},
	gfJumpToMiddleFloor: {
		enabled: false,
		canDo: () => Tricks.gfJumpToMiddleFloor.enabled,
		displayText: "Jump to GF Middle Floor from Bottom",
		description: "Get to the platform by the door above GTG; stand bit before the second brick line texture, and C-up to you're a little bit to the right of the ledge; take a couple steps back; roll jump over to grab the ledge"
	},
	gfHookshotToAboveLinksJail: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gfHookshotToAboveLinksJail.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Hookshot to Above Link's Jail",
		description: "Hookshot the platform you use to escape from the jail; turn right and move to the wall; turn left and backwalk off; turn left; aim hookshot straight up and hookshot the corner fo the wooden thing to clip through",
		links: [{
			url: "https://youtu.be/qnTt085EzGA",
			description: "Video - not exactly the same (probably not as consistent as the description)"
		}]
	},
	gfChildJumpByTopKitchen: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.gfChildJumpByTopKitchen.enabled,
		displayText: "Child Jump by Top Kitchen",
		description: "Target the ledge; backflip; turn left and backwalk off; climb up and turn right; angle so the right edge of c-left lines up with the fortress wall; A-up to roll pause after a few frames (but BEFORE you jump); unpause + hold left"
	},
	gtgChildWithAntigrav: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.gtgChildWithAntigrav.enabled,
		displayText: "Child GTG with Antigrav",
		description: "Walk up the right seam by the entrance to the back of Gerudo Fortress; navigate to the dark texture by the start of the cliff overpass; press Link against the wall from the left edge of this texture; C-up - you should see through the world; place the triangle texture below the left side of the left c-button; turn left; sidehop right\x0A\x0AIf it worked, you'll slide down the wall, skipping the loading zone - navigate to where GTG would be to enter it",
		links: [{
			url: "https://youtu.be/8p1W2Be_zh0",
			description: "Video - not the same, but shows where it is (this is a really old trick). ISG not needed, and the jump will be from the left side of the darker texture to the left of where the video jumps."
		}]
	},
	gtgAdultWithLedgeClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gtgAdultWithLedgeClip.enabled,
		displayText: "Adult GTG with Ledge Clip",
		description: "Get to the platform with the uppermost vines, above the two vines exits; ledge clip by the forward vines door; facing away from the wall (clipped into it), sidehop left x2; sidehop right + sideroll untarget; hold backwalk",
		links: [{
			url: "https://youtu.be/KWVirB7SWg8?t=24",
			description: "Video"
		}]
	},
	gfChildGateSkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.gfChildGateSkip.enabled,
		displayText: "GF Gate Skip as Child",
		description: "Climb the ladder by the gate; get into the right corner, and face the wall with the ladder; C-up and place the B bottom on the right half of the bar to your right; siide hop right; retarget; roll x2; sidehop left to clip out; walk along the wall toward the desert a bit; sidehop left to get back in bounds",
		links: [{
			url: "https://youtu.be/2UuPWZnuw-s",
			description: "Video - doesn't have my setup"
		}]
	},
	gfAdultGateSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gfAdultGateSkip.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "GF Gate Skip as Adult",
		description: "From above Link's jail, target the back rail, then backwalk away; sidehop right; roll + untarget; get in the right corner; sidehop right; hold forward to jump up\x0A\x0AEquip hover boots and run forward, then roll left; quickly target the wall and sidehop left + delay a jumpslash to gain more distance; navigate along the wall further down so you can sidehop left in bounds behind the gate",
		links: [{
			url: "https://youtu.be/kIZzkYggvbE?t=12",
			description: "Video"
		}]
	},
	gfPassKitchenGuards: {
		enabled: false,
		canDo: () => Tricks.gfPassKitchenGuards.enabled,
		displayText: "Pass GF Kitchen Guards with Nothing",
		description: "Sneak past the Gerudo Fortress guards in the kitchen with no items to get between the upper exits."
	},
	gfGuardsWithSword: { 
		enabled: false,
		canDo: (age) => Tricks.gfGuardsWithSword.enabled &&
			ItemData.canUse(age, ItemSets.SWORDS),
		// The stationary guard here needs to be crouch-stabbed with a long enough weapon
		canDoForTopRoomGuards: (age) => Tricks.gfGuardsWithSword.enabled &&
			ItemData.canUse(age, [
				ItemSets.SHIELDS,
				[SetType.OR,
					Equipment.MASTER_SWORD, Items.DEKU_STICK]
			]),
		displayText: "Stun GF Guards with Sword",
		description: "Stun the Gerudo guards with a sword or Deku Stick. Hit them when they aren't looking at you.\x0A\x0AFor the top room, the one that doesn't move needs to be crouch-stabbed with a long weapon (Kokiri Sword doesn't work)."
	},
	//#endregion Gerudo Valley/Fortress

	//#region Haunted Wasteland/Colossus
	categoryWastelandColossus: {
		isCategory: true,
		displayText: "Wasteland/Colossus"
	},
	itemlessSandPit: {
		enabled: true,
		canDo: () => Tricks.itemlessSandPit.enabled,
		displayText: "HW Cross Sand Pit without Items",
		description: "Get to almost the left edge of the quicksand chasm; C-up so you're facing the corner of the other side; turn around and roll forward so you're out of the sand; backwalk; sidehop left when you reach the other side before you void",
		links: [{
			url: "https://youtu.be/rNtUYnNWToY",
			description: "Video"
		}]
	},
	wastelandNoLens: {
		enabled: false,
		canDo: () => Tricks.wastelandNoLens.enabled,
		displayText: "HW without Lens of Truth",
		description: "From the right side of the outpost, walk forward until the sand changes angles - cross the angle, but only barely; turn left and follow the seam\x0A\x0AWhen you reach the next hill, angle yourself and cross the second light stripe, then follow the hill with the seam to your right to the top of the hill\x0A\x0AFollow the seam until you are at the same colored stripe that the create in the distance is on, then go straight to the crate; from there, go straight west to the exit",
		links: [{
			url: "https://youtu.be/h5_EiPTjdEk?t=62",
			description: "Video - not exactly the same, but should do the trick"
		}]
	},
	backwardsWasteland: {
		enabled: false,
		canDo: () => Tricks.backwardsWasteland.enabled,
		displayText: "Backwards Haunted Wasteland",
		description: "From Colossus side, walk forward to the crate; follow the seam in the sand away from the crate until you go downhill - then go to the top of the dune on your right; face east, then follow with the seam to your left until you reach the next to last white stripe; cross to the other side and keep following - seam now to your right; cross to the outpost when it's south of you\x0A\x0AIf going all the way, follow the flags back to the salesman/chasm\x0A\x0ATo cross the last sand pit, get the same angle as the middle crate by the flags, and backwalk across. It can be a bit finnicky - make sure you have speed. It works a bit better if positioned more to the right (facing away from the chasm).",
		links: [{
			url: "https://youtu.be/W-sEiOKyMOI",
			description: "Video - to outpost (not the same - quicker, but not as easy)"
		},
		{
			url: "https://youtu.be/mVqEgMWwj-g?t=275",
			description: "Video - chasm backwalk"
		}]
	},
	//#endregion Haunted Wasteland/Colossus

	//#region Deku Tree
	categoryDekuTree: {
		isCategory: true,
		displayText: "Deku Tree"
	},
	dekuB1Skip: {
		enabled: false,
		canDo: () => Tricks.dekuB1Skip.enabled,
		displayText: "B1 Skip",
		description: "TO START:\x0ATarget the wall to the left of the block, get to the right and dry roll into the corner; backflip x2; sidehop right; sidehop left\x0A\x0AWITHOUT C-UP:\x0ATurn right; backflip + side roll (hold target); turn 180; backflip; side roll (release target); dry roll; dry roll and hold up\x0A\x0AWITH C-UP:\x0AC-up and line up the left edge of the B button with the gray ceiling support texture (see video); dry roll; dry roll and hold up",
		links: [{
			url: "https://youtu.be/3qSQHW6X-10?t=61",
			description: "Video - without c-up"
		},
		{
			url: "https://youtu.be/fWV3XslET2Y?t=16",
			description: "Video - with c-up"
		}]
	},
	dekuAdultClipToBossRoom: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.dekuAdultClipToBossRoom.enabled,
		displayText: "Adult Clip to Boss Room",
		description: "(Does not work in MQ). From the compass room, hit the switch and target the wall; turn 180; sidehop right to the corner; sidehop left x2; backflip (keep Z held FOREVER); hold forward until you grab the ledge; wait for the platform to stop\x0A\x0AA to let go, B to jumpslash (a lot of frames, but don't do it on frame 1)",
		links: [{
			url: "https://youtu.be/l0EMy-y--n0",
			description: "Video"
		}]
	},
	mqDekuHammerCompassRocks: {
		enabled: false,
		canDo: (age) => Tricks.mqDekuHammerCompassRocks.enabled &&
			ItemData.canUse(age, Items.MEGATON_HAMMER),
		displayText: "MQ Hammer Compass Room Rocks",
		description: "Climb the vines as high as you can between the rocks. Press A to ungrab, and spam the hammer button to jumpslash the rocks."
	},
	mqDekuAdultBombCompassRocks: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqDekuAdultBombCompassRocks.enabled &&
			Items.BOMB.playerHas,
		displayText: "MQ Bomb Compass Room Rocks",
		description: "As an adult, cook a bomb for the right amount of time and throw it at the rocks to break them."
	},
	//#endregion Deku Tree

	//#region Dodongo's Cavern
	categoryDodongosCavern: {
		isCategory: true,
		displayText: "Dodongo's Cavern"
	},
	dodongoOpenHeadWithBombchus: {
		enabled: false,
		canDo: (age) => Tricks.dodongoOpenHeadWithBombchus.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMBCHU]),
		displayText: "Open Giant Head with Chus",
		description: "Get in the right corner by the ladder; crouchstab x2; shield turn left\x0A- EYE 1: Instant drop chu (shield + chu at the same time)\x0A- EYE 2: Shield drop chu on the second red flash",
		links: [{
			url: "https://youtu.be/jNiJrMrJlLU?t=258",
			description: "Video"
		}]
	},
	mqDodongoRecoilSlashToPlatform: {
		enabled: false,
		canDo: (age) => Tricks.mqDodongoRecoilSlashToPlatform.enabled && 
        	ItemData.canUse(age, ItemSets.SWORDS),
		displayText: "MQ Recoil Slash to Platform",
		description: "Target the wall on the second wall, to the left of the texture in the video; turn 180; sidehop right + sideroll (untarget); sidehop left; jumpslash from this spot",
		links: [{
			url: "https://youtu.be/SfP1NagL3fs",
			description: "Video"
		}]
	},
	dodongoScarecrowSkullEarly: {
		enabled: true,
		canDo: () => Tricks.dodongoScarecrowSkullEarly.enabled,
		displayText: "Scarecrow Skulltula Early",
		description: "Push an Armos statue from the back of the room against ledge the skulltula is above; backflip on the armos; position yourself in the middle of it; roll jump, holding forawrd, to gain enough height to grab it",
		links: [{
			url: "https://youtu.be/ZUknxm_SsBQ",
			description: "Video - can push it against the wall too, it's not that precise"
		}]
	},
	dodongoTriggerStairsWithBow: {
		enabled: false,
		canDo: (age) => Tricks.dodongoTriggerStairsWithBow.enabled &&
			ItemData.canUse(age, Items.FAIRY_BOW),
		displayText: "Trigger Stairs with Bow",
		description: "Shoot the bomb flowers by the stairs one after another; if done quickly enough, they will trigger the stairs to fall\x0A\x0AIt helps to get them more in a line when aiming at them",
		links: [{
			url: "https://youtu.be/u0EPv1GmsBk",
			description: "Video"
		}]
	},
	dodongoAdultJumpToBombChest: {
		enabled: true,
		canDo: (age) => age === Age.ADULT &&
			Tricks.dodongoAdultJumpToBombChest.enabled,
		displayText: "Adult Jump to Bomb Chest",
		description: "As Adult, get to the start of the blade room, still up the ladder; roll jump to the platform to the left to grab it and skip the puzzle rooms",
		links: [{
			url: "https://youtu.be/QuYVNrTVvQ0",
			description: "Video"
		}]
	},
	dodongoAdultBladeMudWallWithStrength: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.dodongoAdultBladeMudWallWithStrength.enabled &&
			Equipment.STRENGTH.playerHas,
		displayText: "Adult Blade Room Mud Wall with Bomb Flower",
		description: "Pull the block out until it stops; push it toward the mud wall 9 times; climb up it and jump to the mudwall by the ladder, then to the bomb flower; grab the bomb flower; jump to the block and run the mudwall",
		links: [{
			url: "https://youtu.be/jNiJrMrJlLU?t=195",
			description: "Video"
		}]
	},
	//#endregion Dodongo's Cavern

	//#region Jabu Jabu's Belly
	categoryJabuJabusBelly: {
		isCategory: true,
		displayText: "Jabu Jabu's Belly"
	},
	jabuBlueSwitchSkip: {
		enabled: false,
		canDo: (age) => Tricks.jabuBlueSwitchSkip.enabled &&
			ItemData.canUse(age, ItemSets.SWORDS) &&
			(age === Age.CHILD || ItemData.canUse(age, ItemSets.SHIELDS)),
		displayText: "Blue Switch Skip",
		description: "At the switch, line up with center of the door - turn and bonk on switch\x0A- ADULT ONLY STEP: Holding nothing, slash and shield\x0A- Jumpslash onto switch; roll and press A on the right frame (can mash it)",
		links: [{
			url: "https://youtu.be/529rrE6d0tk",
			description: "Video - adult (not exactly the same - the adjustment is mentioned in a comment)"
		}]
	},
	jabuBossSwitchWithExplosives: {
		enabled: false,
		canDo: (age) => Tricks.jabuBossSwitchWithExplosives.enabled && (
            (age === Age.CHILD && Items.BOMBCHU.playerHas) ||
            (age === Age.ADULT && ItemData.canUse(age, [Items.BOMB, Equipment.HOVER_BOOTS]))),
		displayText: "Boss Door Switch with Explosives",
		description: "CHILD:\x0AGet in the left corner, facing the exit door; backflip x3; immediately take out a chu and drop it (NOT A SHIELD DROP)\x0A\x0AADULT:\x0AWith hover boots equipped, climb up the first set of vines; climb the back vines in the middle and drop down; turn 180; pull out a bomb and wait a half second; run around off the cliff (not very far, just until you're around the blocker) and throw the bomb at the switch",
		links: [{
			url: "https://youtu.be/Y2wk8b17K0o?t=99",
			description: "Video - child"
		},
		{
			url: "https://youtu.be/Y2wk8b17K0o?t=115",
			description: "Video - adult"
		}]
	},
	//#endregion Jabu Jabu's Belly

	//#region Forest Temple
	categoryForestTemple: {
		isCategory: true,
		displayText: "Forest Temple"
	},
	forestFirstSkullWithBomb: {
		enabled: false,
		canDo: () => Tricks.forestFirstSkullWithBomb.enabled &&
			Items.BOMB.playerHas,
		displayText: "First Skulltula with Bomb",
		description: "Cook a bomb and throw it at the skulltula from the tree to kill it"
	},
	forestGreenPoeEarly: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.forestGreenPoeEarly.enabled &&
			ItemData.canUse(age, [
				Items.BOMB, 
				Equipment.HOVER_BOOTS, 
				ItemSets.SHIELDS]),
		displayText: "Green Poe Area Early",
		description: "From lobby entrance, get in the right corner, facing the rail; sidehop left x4; shield drop bomb; dry roll x2; tap up to climb; second damage frame, equip hover boots and hold up",
		links: [{
			url: "https://youtu.be/p4TgxwZcgyg",
			description: "Video"
		}]
	},
	forestSoTBlockLedgeClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.forestSoTBlockLedgeClip.enabled,
		displayText: "Song of Time Block Ledge Clip",
		description: "Works on the Song of Time block blocking the west room in standard, and the one blocking the north corridor in MQ\x0A\x0AClimb the back left corner of the block, then turn left and target the wall; sidehop right; sidehop left; Z on the first frame Link is grabbing the ledge; A to drop down",
		links: [{
			url: "https://youtu.be/4nUZtFL7jLs?&t=5809",
			description: "Video"
		}]
	},
	forestLedgeWithHoverBoots: {
		enabled: false,
		canDo: (age) => Tricks.forestLedgeWithHoverBoots.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Ledge with Hover Boots",
		description: "From the top area where the well switch normally is, you can do a precise jump with hover boots to the ledge with the chest",
		links: [{
			url: "https://youtu.be/EXh2G-05QxA",
			description: "Video"
		}]
	},
	forestBoomerangSkullOnLedge: {
		enabled: false,
		canDo: (age) => Tricks.forestBoomerangSkullOnLedge.enabled &&
        	ItemData.canUse(age, Items.BOOMERANG),
		displayText: "Ledge Skulltula with Boomerang",
		description: "Face the wall by the river nearer to the well; turn right; sidehop right x4; slowly backwalk into the water and release; when Link surfaces, hold forward until he climbs; take out boomerang and line up your shot.\x0A\x0A- Child: line the left ear's tip with the corner of the platform - go a bit more left to get the actual token\x0A- Adult: line the right ear just above the skulltula - face the skulltula directly to get the actual token",
		links: [{
			url: "https://youtu.be/gR-ndJFJuq0?t=164",
			description: "Video - child"
		}]
	},
	forestHookshotToWellSwitch: {
		enabled: false,
		canDo: (age) => Tricks.forestHookshotToWellSwitch.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Hookshot to Well Switch",
		description: "Get in the corner; sidehop right x2 + side roll (hold target); backflip; retarget; dryroll; hookshot as high as possible then hold up",
		links: [{
			url: "https://youtu.be/gR-ndJFJuq0?t=205",
			description: "Video"
		}]
	},
	mqForestHoverBootsToDoorFrame: {
		enabled: false,
		canDo: (age) => Tricks.mqForestHoverBootsToDoorFrame.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "MQ Hover Boots to Door Frame",
		description: "From the upper balcony, equip hover boots and climb up on the rail in the corner; c-up and face the door frame; spin in a tight circle, roll on the frame, then roll again, jumpslash to get the last of the distance",
		links: [{
			url: "https://youtu.be/gR-ndJFJuq0?t=279",
			description: "Video"
		}]
	},
	forestMegaJumpToLedge: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.forestMegaJumpToLedge.enabled &&
			ItemData.canUse(age, [Equipment.HOVER_BOOTS, Items.BOMB]),
		displayText: "Mega Jump to Ledge",
		description: "Up the vines by the well, get in the corner against the back wall by the ledge; turn right; take out a bomb; on the 2nd damage frame, equip hover boots and hold left",
		links: [{
			url: "https://youtu.be/PbbE8QJWsxw",
			description: "Video"
		}]
	},
	forestChildBlockSkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.forestChildBlockSkip.enabled &&
			ItemData.canUse(age, ItemSets.EXPLOSIVES) &&
			ItemData.canUseAny(age, [
				[Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD], // Sword to get to position; need to shield exploion
				[Items.DEKU_STICK,  // To get into position
					[SetType.OR, 
						Items.BOMB, // Don't need to shield drop a bomb
						ItemSets.SHIELD_DROP_SHIELDS]] // Must shield drop chu
			]),
		displayText: "Child Block Skip",
		description: "FOR ALL:\x0ATarget block; back up a bit; left sidehop; sideroll + release; make sure you are in corner\x0A\x0ASWORD:\x0ACrouchstab; jumpslash + shield; turn 180\x0A- BOMB: press it twice to place it and hold R\x0A- BOMBCHU: take it and hold shield anywhere on 9th red or later\x0A\x0ASTICK:\x0ATurn 180; swing stick + shield\x0A- BOMB: press it twice to place it and wait (DO NOT HOLD SHIELD)\x0A- BOMBCHU: take it and shield drop anywhere from 8th black or later (MAKE SURE TO RELEASE SHIELD)",
		links: [{
			url: "https://youtu.be/--lG5DBCfD0",
			description: "Video"
		}]
	},
	forestBlockSkipWithHoverBoots: {
		enabled: false,
		canDo: (age) => Tricks.forestBlockSkipWithHoverBoots.enabled && 
        	ItemData.canUse(age, [
				Equipment.HOVER_BOOTS, 
				Tricks.groundJump.canDoWithBomb]),
		displayText: "Adult Block Skip",
		description: "Ground jump over block 1; ground jump on left side of block 2; get a running start; roll diagonal, then and change roll roward the ledge and grab it",
		links: [{
			url: "https://youtu.be/dIcQMuPA4mc",
			description: "Video"
		}]
	},
	forestBKSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.forestBKSkip.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Boss Key Skip",
		description: "Up the stairs from the north room of the lobby, get in the right corner; take out hookshot and aim so the red dot is slightly left of the door; A to exit view, but hold Z; backflip, press hookshot mid flip (you should now be clipped into the rail)\x0A\x0ABackwalk to grab the ledge; A to fall; walk so you're centered with the stairs (still out of bounds); roll jump in the abyss; jumpslash at some point for more distance",
		links: [{
			url: "https://youtu.be/5DfkXaHgeG4",
			description: "Video"
		}]
	},
	//#endregion Forest Temple

	//#region Fire Temple
	categoryFireTemple: {
		isCategory: true,
		displayText: "Fire Temple"
	},
	fireNoGoronTunic: {
		enabled: false,
		canDo: () => Tricks.fireNoGoronTunic.enabled,
		displayText: "No Goron Tunic",
		description: "Takes out the Goron Tunic requirement for doing the lava rooms of the fire temple"
	},
	fireFirstRoomPillarSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.fireFirstRoomPillarSkip.enabled,
		displayText: "First Room Pillar Skip",
		description: "In both cases, get in the left corner by the pillar, facing it.\x0A- WITH SHIELD: Sidehop left; roll + release; crouchstab x2; jumpslash\x0A- WITHOUT SHIELD: Backflip; sidehop right; roll + release; turn left; sidehop left; horizonal slash (sword without Z); jumpslash; wait for Link to stand; jumpslash",
		links: [{
			url: "https://youtu.be/XF8EobqomC4?t=7",
			description: "Video - with shield"
		},
		{
			url: "https://youtu.be/6jdvmahw20g",
			description: "Video - no shield"
		}]
	},
	mqBossRoomGoronBombClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqBossRoomGoronBombClip.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]),
		displayText: "MQ Boss Room Goron Bomb Clip",
		description: "Get in the corner of the boxes and jail, back to the boxes; slowly backwalk, press A to sideroll; A to roll; take bomb out, wait until it's above your head; shield drop; sidehop left; backflip to corner; wait to clip out; jumpslash and hold forward",
		links: [{
			url: "https://youtu.be/4nUZtFL7jLs?t=9105",
			description: "Video"
		}]
	},
	fireSoTBlockJump: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.fireSoTBlockJump.enabled,
		displayText: "Song of Time Block Jump",
		description: "Exit left big lava room goron jail; face up before camera changes; sidehop left x3, backflip x2; sidehop right; sideroll and hold Z and up during roll.",
		links: [{
			url: "https://youtu.be/hBBeXaBuFik",
			description: "Video"
		}]
	},
	mqFireLavaRoomDoorWithDins: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqFireLavaRoomDoorWithDins.enabled &&
			ItemData.canUse(age, Items.DINS_FIRE),
		displayText: "MQ Lava Room Torches with Din's Fire",
		description: "Use Din's Fire on the rising platform when it's at the bottom (should light the top one); quickly run over to the other torch to light it in time"
	},
	fireBlockClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.fireBlockClip.enabled &&
			Items.BOMB.playerHas,
		displayText: "Block Clip",
		description: "Jump to the side with the block and climb up after ledge grabbing; tap up to retain the camera angle; hold Z and get into the corner by the block; release everything; take out a bomb and wait for it to explode; hold left immediately after",
		links: [{
			url: "https://youtu.be/cwKxLtyjkH4",
			description: "Video"
		}]
	},
	fireEscapeMapEnclosure: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.fireEscapeMapEnclosure.enabled &&
			Tricks.hammerHoverBootsSuperslide.canDo(age),
		displayText: "Recoil From Map Enclosure",
		description: "Do a recoil super slide off the map chest in the enclosed room to get to the ledge to the fire wall room to skip a key",
		links: [{
			url: "https://youtu.be/NzqOrs9t_wI?t=8",
			description: "Video - can line it up manually; no set up required"
		}]
	},
	fireBKSkipFromFireWallMaze: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.fireBKSkipFromFireWallMaze.enabled,
		displayText: "BK Skip from Fire Wall Maze",
		description: "Line up with the right side of the pillar; HOLD Z FOREVER; sidehop right until the wall; sideroll; sidehop right\x0A\x0ASideroll and pause on the first frame link is falling; unpause and repress Z; wait for camera to pan down (Link's hand should be clipping); with Z held, press A to fall and pause immediately; unpause and hold forward to the boss door",
		links: [{
			url: "https://youtu.be/qdH7lE7U8x0",
			description: "Video"
		}]
	},
	fireWallSkip: {
		enabled: false,
		canDo: () => Tricks.fireWallSkip.enabled,
		displayText: "Fire Wall Skip",
		description: "Standard/MQ (maze room):\x0AOn the right side, stand a bit from the right maze wall and sidehop into it to fall to the other side.\x0A\x0AMQ (lobby):\x0AChild can sidehop through the right gap by the stairs. Stand by the pillar to the right as close to the gap as possible without the fire showing up. Angle yourself and sidehop into the gap to get through.",
		links: [{
			url: "https://youtu.be/qL9F_FemT2Y",
			description: "Video - maze room"
		}]
	},
	fireJumpDownToSoTBlock: {
		enabled: false,
		canDo: () => Tricks.fireJumpDownToSoTBlock.enabled,
		displayText: "Jump to Central SoT Block Room",
		description: "From the hammer chest, jump into the crater and hold the direction of the Song of Time block to land on the ledge"
	},
	//#endregion Fire Temple

	//#region Water Temple
	categoryWaterTemple: {
		isCategory: true,
		displayText: "Water Temple"
	},
	waterNoZoraTunic: {
		enabled: false,
		canDo: () => Tricks.waterNoZoraTunic.enabled,
		displayText: "No Zora Tunic",
		description: "Removes the Zora Tunic requirement to dive deep into the water temple"
	},
	mqWaterWaterfallWithHoverBoots: {
		enabled: false,
		canDo: (age) => Tricks.mqWaterWaterfallWithHoverBoots.enabled &&
			ItemData.canUse(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]),
		displayText: "MQ Waterfall with Hover Boots and Hookshot",
		description: "Ride the platform down; equip hovers, backwalk and backflip to the first pillar; hookshot to the upper left pillar and fall to the one below; unequip hovers; hookshot the corner of the one to the right; pause 2 frames after the hookshot stops (you will see the bottom of Link's boot); equip hovers",
		links: [{
			url: "https://youtu.be/EvPZkiaced4?t=506",
			description: "Video"
		}]
	},
	waterHookshotToFloor1: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.waterHookshotToFloor1.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Hookshot to Floor 1",
		description: "Get close to the edge of where the block was on the middle floor against the wall; aim up and hookshot the corner of the hookshot target; jumpslash to gain more distance",
		links: [{
			url: "https://youtu.be/ejlkXRIeafI",
			description: "Video - setup not actually required"
		}]
	},
	waterHighWaterJump: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.waterHighWaterJump.enabled,
		displayText: "Jump to High Water Level Triforce",
		description: "Line up with the middle of the wall texture near the high water triforce, on the entrance side; turn 180; sideroll release; hold forward\x0A\x0ACan also do it manually, as it's not that precise",
		links: [{
			url: "https://youtu.be/MHji8_BAQxQ",
			description: "Video"
		}]
	},
	waterBombableWallEarly: {
		enabled: false,
		canDo: (age) => Tricks.waterBombableWallEarly.enabled &&
			ItemData.canUse(age, ItemSets.EXPLOSIVES),
		displayText: "Bombable Wall Chest Early",
		description: "Target the wall with the door; sidehop right; roll release; move against the pillar the triforce symbol is near; backflip; sidehop left; jumpslash when Link is under the ceiling\x0A\x0ACan also do with hover boots with this angle by simply sidestepping on the pit, then sidehopping left",
		links: [{
			url: "https://youtu.be/EvPZkiaced4?t=136",
			description: "Video - different than the description, but close enough"
		}]
	},
	waterEyeSwitchGateFromTop: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.waterEyeSwitchGateFromTop.enabled,
		displayText: "Eye Switch Gate From Top",
		description: "At mid water, from the area above the eye switch in the center, position yourself so that you're all the way against the wall. Do a VERY precise shot to hit the eye, then jump down before the gate closes.\x0A\x0AIf you are a child, you can do this if you navigate to the top from the route bringing you to the high water triforce.",
		links: [{
			url: "https://youtu.be/EvPZkiaced4?t=423",
			description: "Video"
		}]
	},
	waterDragonChestWithChu: {
		enabled: false,
		canDo: () => Tricks.waterDragonChestWithChu.enabled &&
			Items.BOMBCHU.playerHas,
		displayText: "Dragon Room Chest with Only Bombchu",
		description: "At the whirlpool dragon room, drop a chu straight at where the crystal switch is. Right before it hits the switch, jump into the water so you sink down during the cutscene. Now spam B and swim into the gate. This can be used to get the chest as child Link as well as to skip iron boots/scale as adult.",
		links: [{
			url: "https://youtu.be/f-0z68eGH1M?t=9",
			description: "Video - beginning setup not necessary"
		}]
	},
	waterBKJumpToWaterfall: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.waterBKJumpToWaterfall.enabled,
		displayText: "Water BK Jump to Waterfall",
		description: "From the door, sidehop left; roll untarget; sidehop right; sidehop left; roll untarget; sidehop right x2; sidewalk right a bit more so you're line up with the ledge; roll jump to the ledge (time with the boulders!)",
		links: [{
			url: "https://youtu.be/EvPZkiaced4?t=203",
			description: "Video"
		}]
	},
	waterHookshotOutOfBounds: {
		enabled: false,
		canDoWithHighWater: (age) => Tricks.waterHookshotOutOfBounds.enabled &&
			ItemData.canUse(age, [
				Items.HOOKSHOT, 
				Equipment.IRON_BOOTS, 
				GameStateSets.WATER_TEMPLE_TUNIC_CHECK]),
		canDoWithLowWater: (age) => Tricks.waterHookshotOutOfBounds.enabled &&
			ItemData.canUse(age, Items.HOOKSHOT),
		displayText: "Hookshot Out of Bounds",
		description: "(Vanilla only): Lower east torches - hold Z and hookshot the torch with it to your right (angle joystick to the right) to clip out of bounds.\x0A\x0AMid east chest (low east - high): Navigate above the hallway to load the area, then swim to behind the room and up to the room with the chest.\x0A\x0AWater block room chest (mid south - high): Navigate to ABOVE the hallway with the eye switch and strength block. Use iron boots to sink down partially while halfway down the hallway. Swim around to load the hallway and get to the chest.\x0A\x0AWater block room hallway (mid south - any): Navigate to the temple starting water; you can float up at any water level. Angle the camera toward the center of the main room, then swim to the hallway before you clip back in bounds. This gets you in the hallway, but not to the chest.\x0A\x0ADragon head room (low west - any): Navigate to the passage beyond the block.\x0A\x0AJail room (low south - mid or high): Swim to above the corridor to hit the loading zone.",
		links: [{
			url: "https://youtu.be/zddpkhXmklU",
			description: "Video - shows where the starting water is for the water block room hallway version"
		}]
	},
	//#endregion Water Temple

	//#region Shadow Temple
	categoryShadowTemple: {
		isCategory: true,
		displayText: "Shadow Temple"
	},
	shadowLensless: {
		enabled: false,
		canDo: () => Tricks.shadowLensless.enabled,
		displayText: "No Lens of Truth",
		description: "Removes the lens of truth requirement for the Shadow Temple"
	},
	shadowScytheSilverRupeeWithNothing: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.shadowScytheSilverRupeeWithNothing.enabled,
		displayText: "Scythe Silver Rupee with Nothing",
		description: "For the silver rupee in mid-air; target the wood box the rupee is near; back up a bit and ess left x1; backflip into the wooden beam; roll jump to grab the ledge",
		links: [{
			url: "https://youtu.be/GXD4s-eotxU",
			description: "Video"
		}]
	},
	shadowChildGateClip: {
		enabled: false,
		// This trick would be good if child could ever get here without needing explosives:
		// https://youtu.be/pP4JNCU8fgU
		canDo: (age) => age === Age.CHILD &&
			Tricks.shadowChildGateClip.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.EXPLOSIVES]),
		displayText: "Child Gate Clip to Boat Area",
		description: "BOMBS:\x0ATarget wall left of climbable wall; turn right; sidehop right x3; backflip to the wall; ess left x3; take out bomb; A to set it down; hold R; A to drop down\x0A\x0ABOMBCHUS:\x0ATarget back in the hole the block is in; turn right; backwalk to the edge; backflip out; turn right; shield drop chu; walk to the wall; sidehop right; sidehop left; C-up to straighen camera; shield turn 180; hold R; A to drop down",
		links: [{
			url: "https://youtu.be/3L59Qxjnlxo",
			description: "Video"
		}]
	},
	shadowAdultGateClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.shadowAdultGateClip.enabled &&
			ItemData.canUse(age, ItemSets.SHIELDS),
		displayText: "Adult Gate Clip to Boat Area",
		description: "Get in the corner; sidehop left x3; sword + shield x2; sword only x1; jumpslash to clip; spam A to jumpslash out",
		links: [{
			url: "https://youtu.be/oX-dmoggudk",
			description: "Video - the start of it shows the trick, minus the jumpslash out"
		}]
	},
	shadowJumpToBoatRoomLedge: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.shadowJumpToBoatRoomLedge.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]),
		displayText: "Boat Area Upper Ledge Without Scarecrow",
		description: "Get in the corner; sidehop left x3; sword + shield x2; sword only x1; jumpslash to clip (hold shield); shield turn left; walk forward until you can't; backflip\x0A\x0AC-up and angle so the B button trades places with the A button; roll forward holding up, hold left immediately; equip hover boots after you grab ledge; hold down to get on ledge.",
		links: [{
			url: "https://youtu.be/oX-dmoggudk",
			description: "Video"
		}]
	},
	shadowPitRoomSilverRupeeSkip: {
		enabled: false,
		canDo: (age) => Tricks.shadowPitRoomSilverRupeeSkip.enabled && 
        	ItemData.canUse(age, [
				ItemSets.ACUTE_ANGLE_SWORDS,
				[SetType.OR,
					Equipment.MASTER_SWORD, 
					Equipment.KOKIRI_SWORD,
					ItemSets.SHIELDS]
			]),
		displayText: "Pit Room Silver Rupee Skip",
		description: "CHILD WITH SHIELD AND STICK/SWORD:\x0AGet in the left corner, sidehop right, ess left x1, crouch stab, jumpslash holding neutral, hold forward after the clip to stay inbounds\x0A\x0ACHILD KOKIRI SWORD ONLY:\x0ARoll against the wall near the corner and target the corner (you'll be at a slight angle - if your left foot is higher, you're in the wrong place); sidehop right; Z + Slash x2; jumpslash and hold neutral; hold forward after the clip to stay inbounds\x0A\x0AADULT WITH SHIELD:\x0ARoll against the wall near the corner and target the corner (you'll be at a slight angle - if your left foot is higher, you're in the wrong place); Z + Slash + Shield x2; sidehop right; jumpslash and hold forward; keep forward held to stay inbounds",
		links: [{
			url: "https://youtu.be/PqIQtOlsoo0",
			description: "Video - child kokiri sword; adult with shield"
		}]
	},
	shadowBackFlipOnSpikes: {
		enabled: false,
		canDo: () => Tricks.shadowBackFlipOnSpikes.enabled,
		displayText: "Backflip on Top of Falling Spikes",
		description: "Line up with the edge of the falling spikes; time a backflip just before the spikes start falling and you'll end up on top (there are two sounds that happens - backflip between the two of them)",
		links: [{
			url: "https://youtube.com/shorts/-xM7NHZKCVY",
			description: "Video"
		}]
	},
	shadowGiantSkullsWithChus: {
		enabled: false,
		canDo: () => Tricks.shadowGiantSkullsWithChus.enabled &&
			Items.BOMBCHU.playerHas,
		displayText: "Destroy Giant Skulls with Bombchus",
		description: "This allows you to use a bombchu to blow up the giant skulls in Shadow Temple, including the three rotating ones. Line up so you are directly facing the skull, then drop the chu on the 4th red flash. It should blow up while inside."
	},
	shadowNoIronBoots: {
		enabled: false,
		canDo: () => Tricks.shadowNoIronBoots.enabled,
		displayText: "Fan Rooms without Iron Boots",
		description: "Removes the iron boot requirement for passing the fans"
	},
	shadowChuBombFlowers: {
		enabled: false,
		canDo: () => Tricks.shadowChuBombFlowers.enabled &&
			Items.BOMBCHU.playerHas,
		displayText: "Bombchus to Lower the Bridge",
		description: "Backwalk off the edge at the corner of the opposite chasm, hold Z as you get up; backflip x2; sideroll; target the wall; sidehop right; slash the wall; press B and hold to spin attack, then hold shield; shield drop chu",
		links: [{
			url: "https://youtu.be/bXYyyLaM70Y",
			description: "Video"
		}]
	},
	mqShadowChasmPlatformWithHookshot: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqShadowChasmPlatformWithHookshot.enabled &&
			ItemData.canUse(age, [Items.HOOKSHOT, ItemSets.SHIELDS]),
		displayText: "MQ Chasm Platform With Hookshot",
		description: "TO SHOOT THE EYE WITHOUT SOT:\x0ALine up with it from behind the block, do hookshot extension with bow, and aim slightly down.\x0A\x0ATO GET ON THE PLATFORM:\x0AShoot the eye; with the SoT block there, climb up the back side of it so the pillar is to your right; turn right and climb up; sidehop left; turn right; dry roll x2; slash sword + shield; turn right; slash sword + shield; do hookshot extension - it will just barely reach the lower left corner of the target.",
		links: [{
			url: "https://youtu.be/yETJj8vOIOA",
			description: "Video"
		}]
	},
	shadowBKSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.shadowBKSkip.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.EXPLOSIVES]),
		displayText: "Boss Key Skip",
		description: "WITH CHUS:\x0ATarget door; turn right; crouch stab while holding left x2; backwalk off the ledge and climb up; repress Z and hold it; chu to third black frame; backwalk off the ledge, hold up while climbing back up, then IMMEDIATELY hold left and pause buffer; advance until you are against the wall and your right leg is horizontal (next 2 frames okay too); keep holding left, press A to roll; pause until link is grabbing the ledge; buffer Z input during unpause lag (keep it held); wait\x0A\x0AWITH BOMBS:\x0AGrab the left ledge; bonk on door frame; pull out bomb and shield drop after 2 frames (keep Z the whole time); dry roll; sidehop right + left; on the SECOND FRAME of the 8th red flash, A to roll; buffer until link is grabbing the ledge; re-buffer Z and wait",
		links: [{
			url: "https://youtu.be/TEuG7LaOkUs",
			description: "Video - chus"
		},
		{
			url: "https://youtu.be/hQ8V2rzwqJE",
			description: "Video - bombs"
		}]
	},
	//#endregion Shadow Temple

	//#region Spirit Temple
	categorySpiritTemple: {
		isCategory: true,
		displayText: "Spirit Temple"
	},
	spiritBlockSkipWithHoverBoots: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.spiritBlockSkipWithHoverBoots.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Silver Block Skip with Hover Boots",
		description: "Climb the ledge by the silver block, then jump to the nose of the snake statue; roll at the silver block and equip hover boots; roll and angle toward the block to climb on top",
		links: [{
			url: "https://youtu.be/2Ba5K4fIrps",
			description: "Video"
		}]
	},
	spiritBlockSkipWithBombPush: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.spiritBlockSkipWithBombPush.enabled &&
			ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]),
		displayText: "Silver Block Skip with Bomb Push",
		description: "Get ISG; face wall to the right of the block; sidehop right + sideroll untarget; ess 2 left; back into corner; shield drop 2 bombs (bombs above head first); dry roll; backflip; hold shield; flick shield to remove ISG\x0A\x0AC-up and put the sword on the moon; take a step back or two; roll and hold forward, then hold up right",
		links: [{
			url: "https://youtu.be/9f3Qh0L_qCE",
			description: "Video"
		}]
	},
	mqSpiritChildGeyserSkip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.mqSpiritChildGeyserSkip.enabled,
		displayText: "MQ Child Geyser Skip",
		description: "Target the right side of the pillar to the left of the geyser hallway; backwalk against the wall with the geyser with this angle until you start rising, then let go of everything"
	},
	mqSpiritAdultGeyserSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqSpiritAdultGeyserSkip.enabled &&
			ItemData.canUse(age, ItemSets.SHIELDS),
		displayText: "MQ Adult Geyser Skip",
		description: "Target the left little wall opposite the geyser; walk slightly away and do a manual spin attack, hold shield during it to maintain your angle; ess left x3; get in the corner; crouch stab; backflip; (keep Z held) right sidehop; jumpslash when Link's sock is slightly offscreen (very inconsistent)",
		links: [{
			url: "https://youtu.be/TwXja9VfIcU",
			description: "Video"
		}]
	},
	spiritStatueRoomJumps: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.spiritStatueRoomJumps.enabled,
		displayText: "Statue Room Jumps",
		description: "Get on either of the statue hands. Angle yourself so you can jump from the wrist to the nearby ledge - you should be positioned so you get the most height. Do a roll jump and hold forward to grab the ledge.",
		links: [{
			url: "https://youtu.be/Y2EQTni4oZY?t=436",
			description: "Video"
		}]
	},
	mqSpiritStatueTorchesWithDins: {
		enabled: false,
		canDo: (age) => Tricks.mqSpiritStatueTorchesWithDins.enabled &&
        	ItemData.canUse(age, Items.DINS_FIRE),
		displayText: "MQ Statue Room Torches with Din's Fire",
		description: "Target the pillar of the left torch with your back to the lower door; backwalk to the corner where door is; left sidehop x2; backflip; dryroll; dryroll x13; backflip; retarget & dryroll x2; cast Din's; sidehop right x9; cast Din's",
		links: [{
			url: "https://youtu.be/Y2EQTni4oZY?t=674",
			description: "Video"
		}]
	},
	spiritSuperslideToMirrorShield: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.spiritSuperslideToMirrorShield.enabled &&
			ItemData.canUse(age, [Items.BOMB, Equipment.HOVER_BOOTS, ItemSets.SHIELDS]),
		displayText: "Superslide to Mirror Shield",
		description: "Do a bomb + hover boots super slide done at the side with the silver gauntlets to get to the side with the mirror shield; jumpslash when Link starts colliding with the camera",
		links: [{
			url: "https://youtu.be/blxx5gh-ido?t=22",
			description: "Video - easier with a 2 bomb superslide from the tunnel (use the left side)"
		}]
	},
	spiritBKWithNothing: {
		enabled: false,
		canDo: () => Tricks.spiritBKWithNothing.enabled,
		displayText: "Boss Key Chest With Nothing",
		description: "Run into a torch slug near the chest, then quickly run to open it during the invincibility frames",
		links: [{
			url: "https://youtu.be/4jiUWu7W-6U",
			description: "Video"
		}]
	},
	//#endregion Spirit Temple

	//#region Ice Cavern
	categoryIceCavern: {
		isCategory: true,
		displayText: "Ice Cavern"
	},
	iceInReverse: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.iceInReverse.enabled &&
			ItemData.canUse(age, Equipment.IRON_BOOTS),
		displayText: "Boss Room From Freezard Room",
		description: "Standard only; MQ door won't open from the reverse side.\x0A\x0AFrom the entrance to the first main room, target the longer wall to the right of the blue crystal; hold this angle, then backflip into the acute angle of the crystal; let go of Z and hold down-left after the backflip; once clipped, hold up to get to the water; once in bounds, equip iron boots to go in the door\x0A\x0ACan cross the red ice afterwards by targeting left of the door; backflip; megaflip using normal setups",
		links: [{
			url: "https://youtu.be/rNavLsMzt6g",
			description: "Video - clipping out, rise up to the door at 0:20 instead of what the video does"
		},
		{
			url: "https://youtu.be/xwSz8xT4Qr4",
			description: "Video - megaflipping past the red ice"
		}]
	},
	iceLedgeClip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.iceLedgeClip.enabled,
		displayText: "Ledge Clip to North Room",
		description: "Target the left wall by the ledge; get in the actue angle corner by the gate; ledge clip as normal (sidehop left, roll, Z at the right time)",
		links: [{
			url: "https://youtu.be/a7jXaIcQes4",
			description: "Video"
		}]
	},
	iceChildNorthRoom: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.iceChildNorthRoom.enabled &&
			ItemData.canUse(age, Tricks.groundJump.canDoWithBombOrStrength),
		displayText: "North Room As Child",
		description: "Ground jump to first ledge; get in right corner; left sidehop and climb back up; shield turn right; dry roll; turn 180; c-up and turn a very small amount left; roll and hold up; pause when Link jumps and touches the wall (should be low down); buffer a Z to target the wall",
		links: [{
			url: "https://youtu.be/04YmwtNHipI",
			description: "Video - description modified so you don't need a sword"
		}]
	},
	iceTripleSlashClips: {
		enabled: false,
		canDo: (age) => Tricks.iceTripleSlashClips.enabled &&
			ItemData.canUseAny(age, [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD]) &&
			ItemData.canUse(age, ItemSets.FIRST_PERSON_ITEMS),
		displayText: "Triple Slash Clips in Circular Room",
		description: "For all positions, get the angle first (see below), get to the left corner of the ice, then turn around so you're facing away. Quickly spam B and press Z just after you start the third slash. Pause on the second frame after you hit the wall (the one after the sound starts; also the one after the sparks are bright blue). Take out a first-person item. Cancel it; you will be clipped in.\x0A\x0AADULT LEFT: Target the wall to the left of the ice; sidehop right; retarget; ess right x1\x0A\x0AADULT RIGHT: Target the front of the ice\x0A\x0AADULT UPPER: Target the short wall by the left cliff\x0A\x0ACHILD LEFT: Target the side of the icicle closest to the room entrance (the camera will show the red ice still); sidehop left and sideroll; retarget; ess right x2\x0A\x0ACHILD RIGHT: Target the side of the lower stair by the room entrance on the side of the red ice; turn around; ess right x6",
		links: [{
			url: "https://youtu.be/TaPkaFDyfeY",
			description: "Video"
		}]
	},
	mqIceNorthSkullWithoutSoT: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqIceNorthSkullWithoutSoT.enabled &&
        	GameStateSets.HAS_BOTTLE(),
		displayText: "MQ North Skull Without Song of Time",
		description: "Get in the left corner behind the chest; ess right x1; dry roll x1; ess left x1; target; slash sword; backflip x4; ess left x6; sidehop left; dump blue fire on the frame you land",
		links: [{
			url: "https://youtu.be/gHV3T98IMZc?t=138",
			description: "Video"
		}]
	},
	iceBlockSkullWithHoverBoots: {
		enabled: false,
		canDo: (age) => Tricks.iceBlockSkullWithHoverBoots.enabled &&
			ItemData.canUse(age, Equipment.HOVER_BOOTS) &&
			ItemData.canUseAny(age, [ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE]),
		displayText: "Hover Boots to Block Room Skulltula",
		description: "With hover boots, you can grab the skulltula token on the wall in the block room by back-walk hovering from the pillar then backflipping at the right time.\x0A\x0AIf using a chu to kill it, stand on the line two squares to the right of the skulltula."
	},
	mqIceJumpToSkull: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.mqIceJumpToSkull.enabled,
		displayText: "MQ Jump to Skulltula",
		description: "Line up with against the wall, center of the fourth square from the hole; ess right 1; swing your sword; sidehop (LET GO OF Z) & hold up-left",
		links: [{
			url: "https://youtu.be/8CxFAN7mwlU",
			description: "Video - not exactly the same"
		}]
	},
	//#endregion Ice Cavern

	//#region Bottom of the Well
	categoryBottomOfTheWell: {
		isCategory: true,
		displayText: "Bottom of the Well"
	},
	botwActorGlitch: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.botwActorGlitch.enabled,
		displayText: "Actor Glitch",
		description: "Go through the crawlspace in the northeast area of the dungeon; hold down left notch, but more down (value of 35 works; spam A a tiny bit after you gain control; if it works, you'll hear the door opening, but you won't go through",
		links: [{
			url: "https://youtu.be/YriOarvhd9E",
			description: "Video"
		}]
	},
	botwVineClip: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.botwVineClip.enabled &&
			Tricks.botwActorGlitch.enabled &&
			ItemData.canUse(age, Equipment.KOKIRI_SWORD),
		displayText: "Vine Clip",
		description: "Requires actor glitch; see the link for instructions",
		links: [{
			url: "https://www.zeldaspeedruns.com/oot/dungeon-tricks/bottom-of-the-well",
			description: "Video - ZSR page; scroll down to Vine Clip"
		}]
	},
	//#endregion Bottom of the Well
	
	//#region Gerudo Training Ground
	categoryGerudoTrainingGround: {
		isCategory: true,
		displayText: "Gerudo Training Ground"
	},
	gtgChildVineClips: {
		enabled: false,
		canDo: (age) => age === Age.CHILD &&
			Tricks.gtgChildVineClips.enabled &&
			ItemData.canUse(age, [Items.BOMBCHU, Equipment.DEKU_SHIELD]),
		displayText: "Child Vine Clips",
		description: "Climb up about 10 steps up one of the grates; press down + A to let go; before you hit the ground, press chu, then immediately up and R (shield) at the same time",
		links: [{
			url: "https://youtu.be/inULJqfmkRk",
			description: "Video"
		}]
	},
	gtgSlopesRoomWallmasterToRupee: {
		enabled: false,
		canDo: () => Tricks.gtgSlopesRoomWallmasterToRupee.enabled &&
			(
				!Settings.RandomizerSettings.shuffleSilverRupees ||
				// Can't use SilverRupeeSets due to circular logic (same index in MQ)
				!ItemData.checkSilverRupeeRequirement("Training Grounds", 0) 
			),
		displayText: "Slopes Room Wall Master to Ceiling Rupee",
		description: "STANDARD:\x0ATrigger the wallmaster, then walk under the rupee and have him carry you to it.\x0A\x0AMQ:\x0AFrom the entrance, turn right and target the wall; sidehop left x6; sidehop right; roll release target; target; dryroll; wait for the wallmaster",
		links: [{
			url: "https://youtu.be/UNPL-NnIcXs?t=131",
			description: "Video"
		}]
	},
	gtgSlopesRoomFireWallSkip: {
		enabled: false,
		canDo: () => Tricks.gtgSlopesRoomFireWallSkip.enabled,
		displayText: "Slopes Room Fire Wall Skip",
		description: "CHILD:\x0AGet close to the right wall of the firewall where it doesn't show up; angle slightly to the right; sidehop left into it\x0A\x0AADULT:\x0AGet to the parallel wall to the left; turn right and walk into the wall; turn left; sidehop & sideroll (release); turn right; dry roll; backwalk",
		links: [{
			url: "https://youtu.be/EBx-bOaQW4k?t=14",
			description: "Video - adult"
		}]
	},
	gtgSilverBlockRoomExitWithHoverBoots: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gtgSilverBlockRoomExitWithHoverBoots.enabled && 
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
		displayText: "Hover Boots to Silver Block Room Exit",
		description: "After spawning the chest, backflip onto it; angle toward the ledge; equip hover boots; with enough speed, roll toward the ledge and you should grab it",
		links: [{
			url: "https://youtu.be/UNPL-NnIcXs?t=234",
			description: "Video"
		}]
	},
	gtgSilverBlockSkipWithHammerSuperslide: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gtgSilverBlockSkipWithHammerSuperslide.enabled &&
			ItemData.canUse(age, Tricks.hammerHoverBootsSuperslide.canDo),
		displayText: "Pass Silver Block Using Hammer Superslide",
		description: "Face the wall to the right of the hole; turn 180; backflip; sideroll; backflip; right sidehop; sideroll retarget; ess left 1; hold Z until camera is all the way in\x0A\x0ASwing hammer; release target on first frame you see Link; hold down; hold left on frame where Link's hat takes up the entire screen",
		links: [{
			url: "https://youtu.be/aXzxaSUUr_c",
			description: "Video"
		}]
	},
	gtgEyeStatueWonderItemJumpslash: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.gtgEyeStatueWonderItemJumpslash.enabled,
		displayText: "Wonderitem in Statue Room With Jumpslash",
		description: "Line up with the corner middle pillar from the top level (precise angle). Jump off and jumpslash at the right time to make it to the top. Proceed to the top of the statue to get the wonderitem.",
		links: [{
			url: "https://youtu.be/UNPL-NnIcXs?t=431",
			description: "Video"
		}]
	},
	mqGtgEyeStatueJumpslash: {
		enabled: false,
		canDo: (age) => Tricks.mqGtgEyeStatueJumpslash.enabled &&
        	ItemData.canUse(age, ItemSets.SWORDS),
		displayText: "MQ Jumpslash Eye Statue Crystal Switch",
		description: "Lets you hit the crystal switch in the eye statue room with just a sword. To do so, line up with the crystal from the lower level, jump off, and jumpslash a tiny bit later.",
		links: [{
			url: "https://youtu.be/UNPL-NnIcXs?t=419",
			description: "Video"
		}]
	},
	gtgNoZoraTunic: {
		enabled: false,
		canDo: () => Tricks.gtgNoZoraTunic.enabled,
		displayText: "Water Puzzle Chest no Zora Tunic",
		description: "Removes the Zora Tunic requirement for the room with the water and silver rupees",
	},
	//#endregion Gerudo Training Ground

	//#region Ganon's Castle
	categoryGanonsCastle: {
		isCategory: true,
		displayText: "Ganon's Castle"
	},
	ganonFireTrialNoTunic: {
		enabled: false,
		canDo: () => Tricks.ganonFireTrialNoTunic.enabled,
		displayText: "Fire Trial without Goron Tunic",
		description: "Allows you to complete the fire trial without a Goron Tunic. Note that you'll need a sufficient number of hearts to do so!"
	},
	ganonShadowTrialLensless: {
		enabled: false,
		canDo: () => Tricks.ganonShadowTrialLensless.enabled,
		displayText: "Shadow Trial without Lens of Truth",
		description: "Allows you to get the three hearts and complete the Shadow Trial without the lens. To get the hearts, start at the chest spawn pad and walk straight (you will jump and land, hold back a bit). Now, run straight to grab all the hearts."
	},
	ganonSpiritTrialHookshotless: {
		enabled: false,
		canDo: (age) => Tricks.ganonSpiritTrialHookshotless.enabled &&
        	ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
		displayText: "Spirit Trial without Hookshot",
		description: "Push the left armos back 9-10 times; get ISG; line yourself up with the armos and the beamos; turn around; backflip on x2 to get the rupee",
		links: [{
			url: "https://youtu.be/LRLfTPs7W6g?t=8",
			description: "Video"
		}]
	},
	ganonLightTrialSuperslideSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.ganonLightTrialSuperslideSkip.enabled &&
			ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
		displayText: "Light Trial using a Superslide",
		description: "Target the wall left of the giant pillar; sidehop right and roll (release); back up so you don't lose your angle; backwalk a bit so you have a bunch of room; superslide from this spot (sidehop left, bomb, sidehop right, bomb); release all except shield and up",
		links: [{
			url: "https://youtu.be/V9L-ePeEhH0",
			description: "Video"
		}]
	},
	ganonLightTrailEssSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.ganonLightTrailEssSkip.enabled &&
			ItemData.canUseAny(age, [
				Items.BOMBCHU,
				[Items.BOMB, ItemSets.SHIELDS]
			]),
		displayText: "Light Trial using Ess Clip",
		description: "BOMBS AND SHIELD:\x0ATarget wall; back up a bit;ess right x3; roll into corner; shield turn down; manually place bomb; target and shield turn back to face the pillar; wait\x0A\x0ACHUS:\x0ATarget wall; back up a bit; ess right 1; roll into corner; hold ess right until the camera stops; turn up; ess right 1; pull out chu and let it explode",
		links: [{
			url: "https://youtu.be/8etiSYO0Xak",
			description: "Video - bombs"
		},
		{
			url: "https://youtu.be/6KyyTAcTnbE",
			description: "Video - chus"
		}]
	},
	ganonTrialSkip: {
		enabled: false,
		canDo: (age) => age === Age.ADULT &&
			Tricks.ganonTrialSkip.enabled,
		displayText: "Trial Skip",
		description: "In spirit trial, push the first armos all the way to the wall, then twice towards the door; jumpslash into the right corner to clip outside\x0A\x0ATarget the wall to the right of the door; sidehop left x5; backwalk; still holding Z, walk forward a bit, then right a bit; backwalk into the loading zone",
		links: [{
			url: "https://youtu.be/IjJ2m4ocmcA",
			description: "Video - jumpslashes from left side of armos, but it is much easier from the right"
		}]
	}
	//#endregion Ganon's Castle
};