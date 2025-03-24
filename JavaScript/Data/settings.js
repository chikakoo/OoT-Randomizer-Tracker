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
		enabled: true,
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


	//TODO next: finish this and write out better instructions
	bombSuperslide: {
		enabled: false,
		canDo: (age) => true,
		displayText: "Bomb Superslide",
		description: "Requires bombs and a shield to do a superslide to move backwards very quickly."
	},
	hammerHoverBootsSuperslide: {
		enabled: false,
		canDo: (age) => true,
		displayText: "Hammer & Hover Boots Superslide",
		description: "Hit a wall and equip hover boots on the right frame to slide backwards really quickly to cross gaps.",
		links: [{}]
	},
	TEST: {
		enabled: false,
		canDo: (age) => true,
		displayText: "TEST",
		description: "TEST",
		links: [{}]
	},
};