let Age = {
	EITHER: "Either",
	CHILD: "Child",
	ADULT: "Adult"
};

let OpenZorasFountainSettings = {
	VANILLA: 0,
	ADULT: 1,
	ALL: 2
};

let DungeonItemDisplaySettings = {
	BY_CATEGORY: 0,
	BY_SUGGESTED_ORDER: 1
};

let SkulltulaSettings = {
	NONE_REQUIRED: 0,
	OW_AND_DUNGEON: 1,
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

let GossipStoneSettings = {
	HIDE: 0,
	ALWAYS: 1,
	STONE_OF_AGONY: 2,
	MASK_OF_TRUTH: 3
};

let Settings = {
	ItemLocationsToExclude: {
		"Lake Hylia": ["Fishing Child", "Fishing Adult"],
		"Gerudo Fortress": ["Archery Minigame 1000 Points", "Archery Minigame 1500 Points"],
		"Market": ["Slingshot Minigame"],
		"Kakariko Village": ["Archery Minigame"],
		"Graveyard": ["Heart Piece from Dampe Race", "Hookshot Chest from Dampe Race"],
		"Kokiri Forest": ["Cow in Link's House"],
		"Fire Temple": ["Chest in Scarecrow Song Area"]
	},

	TrackerSettings: {
		dungeonItemDisplay: DungeonItemDisplaySettings.BY_SUGGESTED_ORDER
	},
	
	RandomizerSettings: {
		// Open world
		openForest: true,
		closedDeku: false,
		openDoorOfTime: true,
		openKakariko: true,
		openZorasFountain: OpenZorasFountainSettings.VANILLA,
		
		// Sanity and logic changes
		startingAge: Age.CHILD,
		maxRequiredTokens: 50,
		skulltulaSetting: SkulltulaSettings.OW_AND_DUNGEON,
		medallionSetting: MedallionSettings.OPEN,
		gossipStoneSetting: GossipStoneSettings.HIDE,
		medallionSkulltulaSetting: 50,
		dungeonSetting: DungeonSettings.STANDARD,
		smallKeySanity: true,
		scrubSanity: true,
		shopSanity: true,
		cowSanity: true,
		bombchusInLogic: true,
		shuffleCarpetAndMedigoron: true,
		deadHandNeedsSword: false,
		
		// Entrance shuffle settings
		shuffleInteriorEntrances: false,
		shuffleGrottoEntrances: false,
		shuffleDungeonEntrances: true,
		shuffleOverworldEntrances: false,
		randomizeOwlDrops: false,
		decoupleEntrances: false //TODO: this will probabaly be a setting to decouple in the different pools instead
	},
		
	GlitchesToAllow: {
		// Common
		ocarinaItems: true,
		difficultOcarinaItems: false,
		megaFlip: false,
		isg: false,
		groundJump: false,
		equipSwap: false,
		
		// Kakariko/Graveyard
		watchtowerSkullJumpslash: false,
		windmillHPWithNothing: true,
		windmillHPWithHookshot: false,
		childShopClips: false,
		boomerangGraveyardHP: false,
		unloadGrave: false,
		oldShadowEarly: false,
		chuSlide: false,
		
		// Forest
		pokeySkip: false,
		midoSkip: false,
		lwSkullWithoutBean: false,
		houseOfTwinsSkullWithHovers: false,
		
		// Goron area
		hoverToVolcanoHP: false,
		childDoubleMagicFairy: false,
		dmtSkullsWithoutHammer: false,
		
		// Zora/Lake
		zorasRiverScaleless: false,
		adultWaterfallHPJump: false,
		cuccoToZorasDomain: false,
		hoversToZorasDomain: false,
		chuZoraSkip: false,
		clipZoraSkip: false,
		blueFireShopSkip: false,
		labHPWithoutGoldenScale: false,
		
		// Desert
		eponaHover: false,
		cuccoJump: false,
		backwardsWasteland: false,
		wastelandNoLens: false,
		childHauntedWasteland: false,
		gerudoGateSkipAsAdult: false,
		itemlessSandPit: false,
		
		// Dungeons
		dekuB1Skip: false,
		
		dodongoSwitchEarly: false,
		dodongoAdultJumpToBombChest: false,
		dodongoScarecrowSkullEarly: false,
		
		jabuFishless: false,
		jabuBlueSwitchSkip: false,
		
		forestLedgeClip: false,
		forestLedgeWithHovers: false,
		forestJumpToTop: false,
		forestBlockSkip: false,
		forestGreenPoeEarly: false,
		forestBKSkip: false,
		
		fireNoGoronTunic: false,
		fireFirstRoomPillarSkip: false,
		fireSoTBlockJump: false,
		fireJailClip: false,
		fireCraterRoomKeySkip: false,
		fireWallSkip: false,
		fireJumpDownToSoTBlock: false,
		
		waterNoZoraTunic: false,
		waterHighWaterJump: false,
		waterHookshotToFloor1: false,
		waterBKShortcut: false,
		waterLongshotlessBoss: false,
		waterBombableWallEarly: false,
		
		shadowLensless: false,
		shadowBackFlipOnSpikes: false,
		shadowNoIronBoots: false,
		shadowGateClip: false,
		shadowChuBombFlowers: false,
		
		spiritBlockSkip: false,
		spiritSuperslideToMirrorShield: false,
		spiritBKTrick: false,
		
		botwCuccoDive: false,
		botwActorGlitch: false,
		botwVineClip: false, // Useless if no actor glitch
		
		gtgChildAllowed: false, // Pointless if cuccoJump is false
		gtgAdultNoCard: false,
		gtgNoZoraTunic: false,
		gtgIceArrowsEarly: false,
		
		ganonSpiritHookshotless: false,
		ganonLightTrialSuperslideSkip: false,
		ganonLightTrailEssSkip: false,
		ganonTrialSkip: false,
		
		// Other
		doorOfTimeSkip: false,
		doubleDefenseEarly: false
	},
	
	/**
	 * For the spoiler log notes parser - this is so it knows what player you are
	 */
	PlayerNumber: 1
};