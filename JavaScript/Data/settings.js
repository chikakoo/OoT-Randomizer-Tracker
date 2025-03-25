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
		
	GlitchesToAllow: {
		// Common
		ocarinaItems: true,
		difficultOcarinaItems: true,
		megaFlip: false,
		isg: false,
		qpa: false,
		lungeStorage: false,
		flameStorage: false,
		groundJump: false,
		staircaseHover: false,
		bombSuperslide: false,
		hammerHoverBootsSuperslide: false,
		equipSwap: false,
		forceAdultDekuStickEquip: false,
		forceAdultQPACutsceneItemEquip: false,
		forceAdultSlingshotEquip: false,
		forceAdultBoomerangEquip: false,
		weirdShot: false,
		hookshotExtensionSotBlocks: false,
		boomerangThroughWalls: false,
		difficultBoomerangTrickThrows: false,
		breakBeehivesWithBombs: true,
		breakBeehivesWithChus: true,

		// HF/Market/Castle
		doorOfTimeSkip: false,
		doubleDefenseEarly: false,
		adultGrottoByGVWithoutHammer: false,
		
		// Kakariko/Graveyard
		watchtowerSkullJumpslash: false,
		windmillHPWithNothing: true,
		dampeSoTBlockClip: false,
		kakShopClips: true,
		botwAsChildWithCucco: false,
		botwAsAdultWithCucco: false,
		botwAsAdultWihChus: false,
		boomerangGraveyardHP: false,
		unloadGrave: false,
		oldShadowEarly: false,
		hookshotJump: false,
		childShadowWithBombPush: false,
		adultShadowLedgeClip: false,
		
		// Forest
		pokeySkip: false,
		midoSkip: true,
		houseOfTwinsSkullWithoutHookshot: false,
		lwSkullWithoutBean: false,
		lwAdultBridgeFromTop: false,
		lwAdultBridgeWithHookshot: true,
		lwBridgePressureJump: false,
		zorasRiverScalelessChild: false,
		zorasRiverScalelessAdult: false,
		
		// Goron area
		dmtClipToChestByGoron: false,
		dmtBombFlowerChestByGoron: false,
		dmtClimbWithHoverBoots: false,
		dmtSkullsWithoutHammer: false,
		goronSpinningUrnWithChus: false,
		goronChildStatueSkip: false,
		stopAdultGoronWithFire: false,
		hoverToVolcanoHP: false,
		childSidehopToDoubleMagic: false,
		adultRecoilHoverBootsToDoubleMagic: false,

		// Zora/Lake
		adultWaterfallHPJump: false,
		cuccoToZorasDomain: false,
		hoversToZorasDomain: true,
		megasidehopToZorasDomain: false,
		domainSkullWithJumpslash: false,
		explosiveZoraSkip: false,
		clipZoraSkip: true,
		blueFireShopSkip: false,
		thawKingZoraWithNothing: true,
		adultDomainToLake: false,
		labHPWithoutGoldenScale: false,
		adultDomainMegaflipClip: false,
		adultLakesideLabClip: false,
		childLakesideLabClip: false,
		adultWaterTempleClip: false,
		skullInTreeWithHookshot: false,
		jabuFishless: false,
		enterJabuAsAdult: false,
		
		// Desert
		eponaHover: false,
		cuccoJump: false,
		gvCrossBridgeWithHookshot: false,
		gfJumpToMiddleFloor: false,
		gfChildJumpByTopKitchen: false,
		gfHookshotToAboveLinksJail: false,
		gfPassKitchenGuards: false,
		gfKitchenGuardsWithSword: false,
		gfTopGuardsWithSword: false,
		gerudoGateSkipAsChild: true,
		gerudoGateSkipAsAdult: false,
		itemlessSandPit: true,
		wastelandNoLens: false,
		backwardsWasteland: false,
		
		// Dungeons
		dekuB1Skip: true,
		dekuAdultClipToBossRoom: false,
		mqDekuSideRoomRocksHammerOnly: false,
		mqDekuSideRoomRocksBombsOnly: false,
		
		dodongoScarecrowSkullEarly: true,
		dodongoTriggerStairsWithBow: false,
		dodongoAdultJumpToBombChest: true,
		dodongoAdultBladeMudWallWithStrength: false,
		dodongoOpenHeadWithBombchus: false,
		mqDodongoRecoilSlashToPlatform: false,
		
		jabuBlueSwitchSkip: false,
		jabuBossSwitchWithExplosives: false,
		
		forestFirstSkullWithBomb: false,
		forestLedgeClip: false,
		forestLedgeWithHovers: false,
		forestBoomerangSkullOnLedge: false,
		forestHookshotToWellSwitch: false,
		mqForestHoverBootsToDoorFrame: false,
		forestJumpToTop: false,
		forestChildBlockSkip: false,
		forestBlockSkipWithHoverBoots: false,
		forestGreenPoeEarly: false,
		forestBKSkip: false,
		
		fireNoGoronTunic: false,
		fireFirstRoomPillarSkip: false,
		fireSoTBlockJump: false,
		fireJailClip: false,
		fireCraterRoomKeySkip: false,
		fireWallSkip: false,
		fireJumpDownToSoTBlock: false,
		fireBKSkipFromFireWallMaze: false,
		mqBossRoomGoronBombClip: false,
		mqFireLavaRoomDoorWithDins: false,
		
		waterNoZoraTunic: false,
		waterHighWaterJump: false,
		waterHookshotToFloor1: false,
		waterBombableWallEarly: false,
		waterEyeSwitchGateFromTop: false,
		waterDragonChestWithChu: false,
		waterBKShortcut: false,
		waterHookshotOutOfBounds: false,
		mqWaterWaterfallWithHovers: false,
		
		shadowLensless: false,
		shadowSilverRupeeWithNothing: false,
		shadowBackFlipOnSpikes: false,
		shadowGiantSkullsWithChus: false,
		shadowNoIronBoots: false,
		shadowChildGateClip: false,
		shadowAdultGateClip: false,
		shadowUpperBoatRoomJump: false,
		shadowPitRoomSilverRupeeSkip: false,
		shadowChuBombFlowers: false,
		mqShadowChasmPlatformWithHookshot: false,
		shadowBKSkip: false,
		
		spiritBlockSkipWithHovers: false,
		spiritBlockSkipWithBombPush: false,
		spiritStatueRoomJumps: false,
		spiritSuperslideToMirrorShield: false,
		spiritBKTrick: false,
		mqSpiritStatueTorchesWithDins: false,
		mqSpiritChildGeyserSkip: false,
		mqSpiritAdultGeyserSkip: false,

		botwActorGlitch: false,
		botwVineClip: false, // Useless if no actor glitch

		iceInReverse: false,
		iceLedgeClip: false,
		iceChildUpperRoom: false,
		iceTripleSlashClips: false,
		iceBlockSkullWithHovers: false,
		mqIceNorthSkullWithoutSoT: false,
		mqIceJumpToSkull: false,
		
		gtgChildAllowed: false,
		gtgAdultNoCard: false,
		gtgNoZoraTunic: false,
		gtgChildVineClips: false,
		gtgSlopesRoomWallmasterToRupee: false,
		gtgSlopesRoomFireWallSkip: false,
		gtgSilverBlockSkipWithHammerSuperslide: false,
		gtgSilverBlockRoomExitWithHovers: false,
		gtgEyeStatueWonderItemJumpslash: false,
		mqGtgEyeStatueJumpslash: false,
		
		ganonFireNoTunic: false,
		ganonShadowTrialLensless: false,
		ganonSpiritHookshotless: false,
		ganonLightTrialSuperslideSkip: false,
		ganonLightTrailEssSkip: false,
		ganonTrialSkip: false
	},
	
	/**
	 * For the spoiler log notes parser - this is so it knows what player you are
	 */
	PlayerNumber: 1
};

let Tricks = {
	// Force Equips
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

	// Common/Misc
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
				GlitchItemSets.QUICKDRAW]),
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

	// HF/Market/Castle
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
		links: [
			{
				url: "https://youtu.be/rsQsebyHhxY",
				description: "Video - Child"
			},
			{
				url: "https://youtu.be/pzZstuQrx70",
				description: "Video - Adult"
			}
		]	
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
		links: [
			{
				url: "https://youtu.be/h10O9zU2FWE",
				description: "Video - using recoil"
			},
			{
				url: "https://www.youtube.com/watch?v=omUKghUMFsU",
				description: "Video - using explosives"
			}
		]
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

	// Kakariko/Graveyard
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



	TEST: {
		enabled: false,
		canDo: (age) => true,
		displayText: "TEST",
		description: "TEST",
		links: [{
			url: "",
			description: "Video"
		}]
	},
};