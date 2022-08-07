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
	NIGHT_CHILD: 5,
	OUTSIDE_DAY_INSIDE_NIGHT: 6,
	OUTSIDE_NIGHT_INSIDE_DAY: 7
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
		dungeonItemDisplay: DungeonItemDisplaySettings.BY_SUGGESTED_ORDER,
		deprioritizeDampeToWindmill: true,
		deprioritizeHyruleField: true,
		deprioritizeHauntedWasteland: true
	},
	
	RandomizerSettings: {
		// Open world
		openForest: true,
		closedDeku: false,
		openDoorOfTime: true,
		openKakariko: true,
		autoPlantBeans: false,
		openZorasFountain: OpenZorasFountainSettings.VANILLA,
		
		// Sanity and logic changes
		startingAge: Age.CHILD,
		skipToTTravel: false,
		maxRequiredTokens: 50,
		skulltulaSetting: SkulltulaSettings.OW_AND_DUNGEON,
		medallionSetting: MedallionSettings.OPEN,
		gossipStoneSetting: GossipStoneSettings.HIDE,
		medallionSkulltulaSetting: 50,
		dungeonSetting: DungeonSettings.MIXED,
		smallKeySetting: SmallKeySettings.SMALL_KEY_SANITY,
		scrubSanity: true,
		shopSanity: true,
		cowSanity: true,
		shuffleCarpetAndMedigoron: true,
		shuffleAllFrogSongs: true,
		bombchusInLogic: true,
		deadHandNeedsSword: false,
		iceArrowsActAsBlueFire: true,
		
		// Entrance shuffle settings
		shuffleInteriorEntrances: true,
		shuffleGrottoEntrances: true,
		shuffleDungeonEntrances: true,
		shuffleBossEntrances: true,
		shuffleOverworldEntrances: true,
		randomizeOwlDrops: true,
		decoupleEntrances: false //TODO: this will probabaly be a setting to decouple in the different pools instead
	},
		
	GlitchesToAllow: {
		// Common
		ocarinaItems: true,
		difficultOcarinaItems: true,
		megaFlip: false,
		isg: false,
		groundJump: true,
		staircaseHover: false,
		bombSuperslide: false,
		hammerHoverBootsSuperslide: false,
		equipSwap: false,
		weirdShot: false,
		
		// Kakariko/Graveyard
		watchtowerSkullJumpslash: false,
		windmillHPWithNothing: true,
		windmillHPWithHookshot: false,
		kakShopClips: true,
		botwAsChildWithCucco: false,
		botwAsAdultWithCucco: false,
		boomerangGraveyardHP: false,
		unloadGrave: false,
		oldShadowEarly: false,
		hookshotJump: false,
		
		// Forest
		pokeySkip: false,
		midoSkip: true,
		houseOfTwinsSkullWithHovers: false,
		lwSkullWithoutBean: false,
		lwAdultBridgePreciseEntry: false,
		lwBridgePressureJump: false,
		zorasRiverScalelessChild: false,
		zorasRiverScalelessAdult: false,
		
		// Goron area
		hoverToVolcanoHP: false,
		childDoubleMagicFairy: false,
		dmtClipToChestByGoron: false,
		dmtSkullsWithoutHammer: false,
		
		// Zora/Lake
		adultWaterfallHPJump: false,
		cuccoToZorasDomain: false,
		hoversToZorasDomain: true,
		chuZoraSkip: false,
		clipZoraSkip: false,
		blueFireShopSkip: false,
		thawKingZoraWithNothing: true,
		adultDomainToLake: false,
		labHPWithoutGoldenScale: false,
		adultDomainMegaflipClip: false,
		adultLakesideLabClip: false,
		childLakesideLabClip: false,
		skullInTreeWithHookshot: false,
		
		// Desert
		eponaHover: false,
		cuccoJump: false,
		gvCrossBridgeWithHookshot: false,
		gerudoGateSkipAsChild: true,
		gerudoGateSkipAsAdult: false,
		itemlessSandPit: true,
		wastelandNoLens: false,
		backwardsWasteland: false,
		
		// Dungeons
		dekuB1Skip: true,
		
		dodongoSwitchEarly: true,
		dodongoAdultJumpToBombChest: true,
		dodongoScarecrowSkullEarly: true,
		dodongoTriggerStairsWithBow: false,
		
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
		waterBombableWallEarly: false,
		
		shadowLensless: false,
		shadowSilverRupeeWithNothing: false,
		shadowBackFlipOnSpikes: false,
		shadowNoIronBoots: false,
		shadowGateClip: false,
		shadowChuBombFlowers: false,
		
		spiritBlockSkip: false,
		spiritSuperslideToMirrorShield: false,
		spiritBKTrick: false,

		botwActorGlitch: false,
		botwVineClip: false, // Useless if no actor glitch

		iceLedgeClip: false,
		mqIceJumpToSkull: false,
		
		gtgChildAllowed: false,
		gtgAdultNoCard: false,
		gtgNoZoraTunic: false,
		gtgChildVineClips: false,
		gtgSilverBlockSkip: false,
		
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