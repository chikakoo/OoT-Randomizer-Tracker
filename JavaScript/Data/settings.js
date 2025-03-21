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