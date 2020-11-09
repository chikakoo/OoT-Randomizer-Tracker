
/**
 * A list of all the game's items
 */
let Items = {
	DEKU_STICK: { name: "Deku Stick" },
	DEKU_NUT: { name: "Deku Nut" },
	BOMB: { name: "Bomb"},
	FAIRY_BOW: { name: "Fairy Bow" },
	FIRE_ARROW: { name: "Fire Arrow" },
	DINS_FIRE: { name: "Din's Fire" },
	
	FAIRY_SLINGSHOT: { name: "Fairy Slingshot" },
	OCARINA: { name: "Ocarina" },
	BOMBCHU: { name: "Bombchu" },
	HOOKSHOT: { 
		name: "Hookshot", 
		upgrades: [ "No Hookshot", "Hookshot", "Longshot" ],
		useUpgradeAsDisplay: true
	},
	ICE_ARROW: { name: "Ice Arrow" },
	FARORES_WIND: { name: "Farore's Wind" },
	
	BOOMERANG: { name: "Boomerang" },
	LENS_OF_TRUTH: { name: "Lens of Truth" },
	MAGIC_BEAN: { name: "Magic Bean" },
	MEGATON_HAMMER: { name: "Megaton Hammer" },
	LIGHT_ARROW: { name: "Light Arrow" },
	NAYRUS_LOVE: { name: "Nayru's Love" },
	
	BOTTLE1: { name: "Empty Bottle" },
	BOTTLE2: { name: "Empty Bottle" },
	BLUE_FIRE: { 
		name: "Blue Fire",
		upgrades: [ "Nothing", "Blue Fire", "Empty Bottle" ],
		useUpgradeAsDisplay: true
	},
	RUTOS_LETTER: { 
		name: "Ruto's Letter",
		upgrades: [ "Nothing", "Ruto's Letter", "Empty Bottle" ],
		useUpgradeAsDisplay: true
	},
	CLAIM_CHECK: { name: "Claim Check"},
	MASK_SLOT: { 
		name: "Mask Slot", 
		upgrades: [ "Nothing", "Weird Egg", "Chicken", "Zelda's Letter", "Keaton Mask", "Skull Mask", "Spooky Mask", "Bunny Hood", "Mask of Truth" ],
		useUpgradeAsDisplay: true
	},
};

/**
 * All songs
 */
let Songs = {
	ZELDAS_LULLABY: { name: "Zelda's Lullaby", divGroup: 1 },
	EPONAS_SONG: { name: "Epona's Song", divGroup: 1 },
	SARIAS_SONG: { name: "Saria's Song", divGroup: 1 },
	SUNS_SONG: { name: "Sun's Song", divGroup: 1 },
	SONG_OF_STORMS: { name: "Song of Storms", divGroup: 1 },
	SONG_OF_TIME: { name: "Song of Time", divGroup: 1 },
	SCARECROWS_SONG: {name: "Scarecrow's Song", divGroup: 1 },
	
	MINUET_OF_FOREST: { name: "Minuet of Forest", divGroup: 2 },
	BOLERO_OF_FIRE: { name: "Bolero of Fire", divGroup: 2 },
	SERENADE_OF_WATER: { name: "Serenade of Water", divGroup: 2 },
	NOCTURNE_OF_SHADOW: { name: "Nocturne of Shadow", divGroup: 2 },
	REQUIEM_OF_SPIRIT: { name: "Requiem of Spirit", divGroup: 2 },
	PRELUDE_OF_LIGHT: { name: "Prelude of Light", divGroup: 2 }
};

/**
 * A list of all the player's equipment (swords, tunics, boots, wallet, scale)
 */
let Equipment = {
	KOKIRI_SWORD: { name: "Kokiri Sword" },
	MAGIC: { name: "Magic" },
	DEKU_SHIELD: { name: "Deku Shield" },
	STRENGTH: { 
		name: "Strength", 
		upgrades: [ "No Upgrade", "Goron's Bracelet", "Silver Gauntlets", "Golden Gauntlets" ],
		useUpgradeAsDisplay: true
	},
	
	GORON_TUNIC: { name: "Goron Tunic" },
	IRON_BOOTS: { name: "Iron Boots" },
	HYLIAN_SHIELD: { name: "Hylian Shield" },
	SCALE: {
		name: "Scale",
		upgrades: ["No Scale", "Silver Scale", "Golden Scale"],
		useUpgradeAsDisplay: true
	},
	
	ZORA_TUNIC: { name: "Zora Tunic" },
	HOVER_BOOTS: { name: "Hover Boots" },
	MIRROR_SHIELD: { name: "Mirror Shield" },
	WALLET: { 
		name: "Wallet",
		upgrades: ["Normal Wallet", "Adult's Wallet", "Giant's Wallet or Better" ],
		useUpgradeAsDisplay: true
	},
	
	GERUDO_MEMBERSHIP_CARD: { name: "Gerudo Membership Card" },
	STONE_OF_AGONY: { name: "Stone of Agony" },
	TRIFORCE_SHARDS: { name: "Triforce Shards", playerHas: true, count: 0 },
	SKULLTULA_TOKENS: { name: "Skulltula Tokens", playerHas: true, count: 0 },
};

/**
 * All medallions and spiritual stones
 */
let Medallions = {
	FOREST_MEDALLION: { name: "Forest Medallion" },
	FIRE_MEDALLION: { name: "Fire Medallion" },
	WATER_MEDALLION: { name: "Water Medallion" },
	SHADOW_MEDALLION: { name: "Shadow Medallion" },
	SPIRIT_MEDALLION: { name: "Spirit Medallion" },
	LIGHT_MEDALLION: { name: "Light Medallion" },
	
	KOKIRIS_EMERALD: { name: "Kokiri's Emerald" },
	GORONS_RUBY: { name: "Goron's Ruby" },
	ZORAS_SAPPHIRE: { name: "Zora's Sapphire" }
};

/**
 * A list of shop item terms and what image they map to
 */
let ShopItemDictionary = {
	// Equipment
	"kokiri sword": "Kokiri Sword.png",
	"kok sword": "Kokiri Sword.png",
	"k sword": "Kokiri Sword.png",
	"ksword": "Kokiri Sword.png",
	
	"biggoron's sword": "Biggoron's Sword.png",
	"biggorons sword": "Biggoron's Sword.png",
	"biggoron sword": "Biggoron's Sword.png",
	"big sword": "Biggoron's Sword.png",
	"b sword": "Biggoron's Sword.png",
	
	"iron boots": "Iron Boots.png",
	"iron boot": "Iron Boots.png",
	"i boots":  "Iron Boots.png",
	"i boot":  "Iron Boots.png",
	"iboots":  "Iron Boots.png",
	"iboot":  "Iron Boots.png",
	"irons":  "Iron Boots.png",
	"iron":  "Iron Boots.png",
	
	"hover boots": "Hover Boots.png",
	"hover boot": "Hover Boots.png",
	"h boots":  "Hover Boots.png",
	"h boot":  "Hover Boots.png",
	"hboots":  "Hover Boots.png",
	"hboot":  "Hover Boots.png",
	"hovers":  "Hover Boots.png",
	"hover":  "Hover Boots.png",
	
	"deku shield": "Deku Shield.png",
	"dek shield": "Deku Shield.png",
	"d shield": "Deku Shield.png",
	"dshield": "Deku Shield.png",
	
	"hylian shield": "Hylian Shield.png",
	"hyl shield": "Hylian Shield.png",
	"h shield": "Hylian Shield.png",
	"hshield": "Hylian Shield.png",
	
	"mirror shield": "Mirror Shield.png",
	"mir shield": "Mirror Shield.png",
	"m shield": "Mirror Shield.png",
	"mshield": "Mirror Shield.png",
	
	"goron tunic": "Goron Tunic.png",
	"gtunic": "Goron Tunic.png",
	"g tunic": "Goron Tunic.png",
	"gorons tunic": "Goron Tunic.png",
	"goron's tunic": "Goron Tunic.png",
	
	"zora tunic": "Zora Tunic.png",
	"ztunic": "Zora Tunic.png",
	"z tunic": "Zora Tunic.png",
	"zoras tunic": "Zora Tunic.png",
	"zora's tunic": "Zora Tunic.png",
	
	"wallet": "Wallet X.png",
	"progressive wallet": "Wallet X.png",
	"prog wallet": "Wallet X.png",
	"adult wallet": "Wallet X.png",
	"adult's wallet": "Wallet X.png",
	"adults wallet": "Wallet X.png",
	"giant wallet": "Wallet X.png",
	"giant's wallet": "Wallet X.png",
	"giants wallet": "Wallet X.png",
	"tycoon wallet": "Wallet X.png",
	"tycoon's wallet": "Wallet X.png",
	"tycoons wallet": "Wallet X.png",
	
	"gerudo membership card": "Gerudo Membership Card.png",
	"membership card": "Gerudo Membership Card.png",
	"member card": "Gerudo Membership Card.png",
	"card": "Gerudo Membership Card.png",
	
	"magic": "Magic.png",
	"magic meter": "Magic.png",
	"double magic": "Magic.png",
	"progressive magic": "Magic.png",
	"prog magic": "Magic.png",
	
	"strength": "Strength X.png",
	"progressive strength": "Strength X.png",
	"progressive strength upgrade": "Strength X.png",
	"prog strength": "Strength X.png",
	"str": "Strength X.png",
	"goron bracelet": "Strength X.png",
	"bracelet": "Strength X.png",
	"silver gauntlets": "Strength X.png",
	"golden gauntlets": "Strength X.png",
	"gold gauntlets": "Strength X.png",
	"gauntlets": "Strength X.png",
	"gaunts": "Strength X.png",
	
	"scale": "Scale X.png",
	"progressive scale": "Scale X.png",
	"prog scale": "Scale X.png",
	"silver scale": "Scale X.png",
	"golden scale": "Scale X.png",
	"gold scale": "Scale X.png",
	
	"stone of agony": "Stone of Agony.png",
	"agony": "Stone of Agony.png",
	"stone": "Stone of Agony.png",
	
	"gold skulltula token": "Skulltula Tokens.png",
	"skulltula token": "Skulltula Tokens.png",
	"gold skull token": "Skulltula Tokens.png",
	"skull token": "Skulltula Tokens.png",
	"token": "Skulltula Tokens.png",
	"skulltula": "Skulltula Tokens.png",
	"skull": "Skulltula Tokens.png",

	
	// Inventory
	"deku sticks": "Deku Stick.png",
	"deku stick": "Deku Stick.png",
	"stick": "Deku Stick.png",
	"sticks": "Deku Stick.png",
	
	"deku nuts": "Deku Nut.png",
	"deku nut": "Deku Nut.png",
	"nuts": "Deku Nut.png",
	"nut": "Deku Nut.png",
	
	"fairy slingshot": "Fairy Slingshot.png",
	"slingshot": "Fairy Slingshot.png",
	"slingshot upgrade": "Fairy Slingshot.png",
	"slingshot capacity": "Fairy Slingshot.png",
	"slingshot cap": "Fairy Slingshot.png",
	
	"boomerang": "Boomerang.png",
	
	"ocarina": "Ocarina.png",
	"fairy ocarina": "Ocarina.png",
	"ocarina of time": "Ocarina.png",
	"oot": "Ocarina.png",
	
	"lens of truth": "Lens of Truth.png",
	"lens": "Lens of Truth.png",
	
	"magic beans": "Magic Bean.png",
	"magic bean": "Magic Bean.png",
	"beans": "Magic Bean.png",
	"bean": "Magic Bean.png",
	"magic bean pack": "Magic Bean.png",
	"bean pack": "Magic Bean.png",
	"pack of beans": "Magic Bean.png",
	
	"bomb bag": "Bomb Bag.png",
	"bomb upgrade": "Bomb Bag.png",
	
	"bombchus": "Bombchu.png",
	"bombchu": "Bombchu.png",
	"chus": "Bombchu.png",
	"chu": "Bombchu.png",
	
	"fairy bow": "Fairy Bow.png",
	"bow": "Fairy Bow.png",
	"quiver": "Fairy Bow.png",
	"quiver upgrade": "Fairy Bow.png",
	"quiver capacity": "Fairy Bow.png",
	"quiver cap": "Fairy Bow.png",
	
	"fire arrows": "Fire Arrow.png",
	"fire arrow": "Fire Arrow.png",
	
	"ice arrows": "Ice Arrow.png",
	"ice arrow": "Ice Arrow.png",
	
	"light arrows": "Light Arrow.png",
	"light arrow": "Light Arrow.png",
	
	"hookshot": "Hookshot X.png",
	"hs": "Hookshot X.png",
	"hook": "Hookshot X.png",
	"longshot": "Hookshot X.png",
	"ls": "Hookshot X.png",
	"long": "Hookshot X.png",
	"progressive hookshot": "Hookshot X.png",
	"prog hookshot": "Hookshot X.png",
	
	"megaton hammer": "Megaton Hammer.png",
	"hammer": "Megaton Hammer.png",
	
	"weird egg": "Mask Slot Weird Egg.png",
	"pocket egg": "Mask Slot Weird Egg.png",
	"egg": "Mask Slot Weird Egg.png",
	
	"din's fire": "Din's Fire.png",
	"dins fire": "Din's Fire.png",
	"din's": "Din's Fire.png",
	"dins": "Din's Fire.png",
	"din": "Din's Fire.png",
	
	"nayru's love": "Nayru's Love.png",
	"nayrus love": "Nayru's Love.png",
	"nayru's": "Nayru's Love.png",
	"nayrus": "Nayru's Love.png",
	"nayru": "Nayru's Love.png",
	
	"farore's wind": "Farore's Wind.png",
	"farores wind": "Farore's Wind.png",
	"farore's": "Farore's Wind.png",
	"farores": "Farore's Wind.png",
	"farore": "Farore's Wind.png",
	
	// Trade sequence items - TODO potentially - fill in the rest of these
	"claim check": "Claim Check.png",
	"claim": "Claim Check.png",
	"check": "Claim Check.png",
	
	// Bottles and bottled items
	"empty bottle": "Empty Bottle.png",
	"bottle": "Empty Bottle.png",
	
	"red potion": "Red Potion.png",
	"red pot": "Red Potion.png",
	"bottle with red potion": "Red Potion.png",
	"green potion": "Green Potion.png",
	"green pot": "Green Potion.png",
	"bottle with green potion": "Green Potion.png",
	"blue potion": "Blue Potion.png",
	"blue pot": "Blue Potion.png",
	"bottle with blue potion": "Blue Potion.png",
	
	"fairy": "Fairy.png",
	"bottled fairy": "Fairy.png",
	"bottle with fairy": "Fairy.png",
	
	"poe": "Small Poe.png",
	"bottled poe": "Small Poe.png",
	"bottle with poe": "Small Poe.png",
	
	"big poe": "Big Poe.png",
	"bottled big poe": "Big Poe.png",
	"bottle with big poe": "Big Poe.png",
	
	"milk": "Lon Lon Milk.png",
	"lon lon milk": "Lon Lon Milk.png",
	"bottled milk": "Lon Lon Milk.png",
	"bottle with milk": "Lon Lon Milk.png",
	
	"bugs": "Bugs.png",
	"bottled bugs": "Bugs.png",
	"bottle with bugs": "Bugs.png",

	"fish": "Fish.png",
	"bottled fish": "Fish.png",
	"bottle with fish": "Fish.png",
	
	"blue fire": "Blue Fire X.png",
	"bottled fire": "Blue Fire X.png",
	"bottle with blue fire": "Blue Fire X.png",
	
	"ruto's letter": "Ruto's Letter X.png",
	"rutos letter": "Ruto's Letter X.png",
	"letter": "Ruto's Letter X.png",
	"bottle with letter": "Ruto's Letter X.png",
	
	// Upgrades
	"deku stick upgrade": "Deku Stick Upgrade.png",
	"deku stick capacity": "Deku Stick Upgrade.png",
	"deku stick cap": "Deku Stick Upgrade.png",
	"stick upgrade": "Deku Stick Upgrade.png",
	"stick capacity": "Deku Stick Upgrade.png",
	"stick cap": "Deku Stick Upgrade.png",
	
	"deku nut upgrade": "Deku Nut Upgrade.png",
	"deku nut capacity": "Deku Nut Upgrade.png",
	"deku nut cap": "Deku Nut Upgrade.png",
	"nut upgrade": "Deku Nut Upgrade.png",
	"nut capacity": "Deku Nut Upgrade.png",
	"nut cap": "Deku Nut Upgrade.png",

	// Ammo
	"bomb": "Bomb.png",
	"bombs": "Bomb.png",
	
	"bundle of arrows": "Arrows.png",
	"arrows": "Arrows.png",
	"arrow": "Arrows.png",

	"deku seeds": "Deku Seeds.png",
	"deku seed": "Deku Seeds.png",
	"seeds": "Deku Seeds.png",
	"seed": "Deku Seeds.png",
	"slingshot ammo": "Deku Seeds.png",
		
	// Key and Dungeon items
	"triforce shard": "Triforce Shards.png",
	"triforce piece": "Triforce Shards.png",
	"triforce": "Triforce Shards.png",
	"tri": "Triforce Shards.png",
	
	"small key": "Small Key.png",
	"smallkey": "Small Key.png",
	"key": "Small Key.png",
	"sk": "Small Key.png",
	
	"boss key": "Boss Key.png",
	"boss": "Boss Key.png",
	"bk": "Boss Key.png",
	
	"dungeon map": "Dungeon Map.png",
	"map": "Dungeon Map.png",

	"compass": "Compass.png",
		
	// Hearts
	"piece of heart": "Piece of Heart.png",
	"heart piece": "Piece of Heart.png",
	"hp": "Piece of Heart.png",
	
	"heart container": "Heart Container.png",
	"hc": "Heart Container.png",

	"recovery heart": "Recovery Heart.png",
	"heart": "Recovery Heart.png",
	"health": "Recovery Heart.png",

	"double defense": "Double Defense.png",
	"double defence": "Double Defense.png",
	"defense": "Double Defense.png",
	"defence": "Double Defense.png",
	"dd": "Double Defense.png",
		
	// Songs
	"zelda's lullaby": "Zelda's Lullaby.png",
	"zeldas lullaby": "Zelda's Lullaby.png",
	"lullaby": "Zelda's Lullaby.png",
	
	"epona's song": "Epona's Song.png",
	"eponas song": "Epona's Song.png",
	"epona": "Epona's Song.png",
	
	"saria's song": "Saria's Song.png",
	"sarias song": "Saria's Song.png",
	"saria": "Saria's Song.png",
	
	"sun's song": "Sun's Song.png",
	"suns song": "Sun's Song.png",
	"sun song": "Sun's Song.png",
	"sun's": "Sun's Song.png",
	"suns": "Sun's Song.png",
	"sun": "Sun's Song.png",
	
	"song of time": "Song of Time.png",
	"time": "Song of Time.png",
	"sot": "Song of Time.png",
	
	"song of storms": "Song of Storms.png",
	"song of storm": "Song of Storms.png",
	"storms": "Song of Storms.png",
	"storm": "Song of Storms.png",
	"sos": "Song of Storms.png",
	
	"minuet of forest": "Minuet of Forest.png",
	"minuet": "Minuet of Forest.png",
	
	"bolero of fire": "Bolero of Fire.png",
	"bolero": "Bolero of Fire.png",
	
	"serenade of water": "Serenade of Water.png",
	"serenade": "Serenade of Water.png",
	
	"nocturne of shadow": "Nocturne of Shadow.png",
	"nocturne": "Nocturne of Shadow.png",
	
	"requiem of spirit": "Requiem of Spirit.png",
	"requiem": "Requiem of Spirit.png",
	
	"prelude of light": "Prelude of Light.png",
	"prelude": "Prelude of Light.png",
};

/**
 * All keys
 * The number of keys the player has will be set to keyCount
 * If the player has the boss key, playerHas will be set to true
 */
let Keys = {
	FOREST_TEMPLE: { 
		name: "Forest Temple", 
		minimumKeys: function() {
			let minKeys = 5;
			if (Settings.GlitchesToAllow.forestJumpToTop) {
				minKeys--;
			}
			if (Settings.GlitchesToAllow.forestGreenPoeEarly) {
				minKeys -= 2;
			}
			return minKeys;
		}, 
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 6; },
		mqTotalKeys: function() { return 6; }
	}, 
	FIRE_TEMPLE: { 
		name: "Fire Temple", 
		minimumKeys: function() {
			let minKeys = 8;
			if (!Settings.RandomizerSettings.smallKeySanity) { minKeys--; }
			if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) { minKeys--; }
			if (Settings.GlitchesToAllow.fireJailClip) { minKeys--;}
			if (Settings.GlitchesToAllow.fireWallSkip) { minKeys--; }
			return minKeys;
		}, 
		totalKeys: function() {
			return Settings.RandomizerSettings.smallKeySanity ? 8 : 7;
		},
		
		mqMinimumKeys: function() { return 5; },
		mqTotalKeys: function() { return 5; }
	},
	WATER_TEMPLE: { 
		name: "Water Temple", 
		minimumKeys: function() { return 4; }, // The mid water door is optional
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 1; }, // One key is actually optional
		mqTotalKeys: function() { return 2; }
	},
	SHADOW_TEMPLE: { 
		name: "Shadow Temple",
		minimumKeys: function() { 
			return Settings.GlitchesToAllow.shadowGateClip ? 4 : 5;
		},
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return Settings.GlitchesToAllow.shadowGateClip ? 5 : 6; },
		mqTotalKeys: function() { return 6; }
	},
	SPIRIT_TEMPLE: { 
		name: "Spirit Temple", 
		minimumKeys: function() { 
			// There's a child door that's optional, so 4 is the default
			return Settings.GlitchesToAllow.spiritSuperslideToMirrorShield ? 3 : 4;
		},
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 6; }, // You can always longshot across to skip the silvers key door
		mqTotalKeys: function() { return 7; }
	},
	GANONS_CASTLE: { 
		name: "Ganon's Castle",
		totalKeys: function() { return 2; },
		
		mqMinimumKeys: function() { return 3; },
		mqTotalKeys: function() { return 3; }
	},
	
	BOTTOM_OF_THE_WELL: { 
		name: "Bottom of the Well", 
		totalKeys: function() { return 3; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return 2; },
		mqTotalKeys: function() { return 2; }
	},
	GERUDO_FORTRESS: { 
		name: "Gerudo Fortress", 
		totalKeys: function() { return 4; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return 4; },
		mqTotalKeys: function() { return 4; }
	},
	GERUDO_TRAINING_GROUNDS: { 
		name: "Training Grounds", 
		minimumKeys: function() { 
			return Settings.GlitchesToAllow.gtgIceArrowsEarly ? 5 : 7;
		}, 
		totalKeys: function() { return 9; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() {
			return Settings.GlitchesToAllow.gtgIceArrowsEarly ? 1 : 3;
		},
		mqTotalKeys: function() { return 3; }
	}
};

/**
 * Gets the key count from the current map name
 */
let getKeyCount = function(mapName) {
	switch(mapName) {
		case "Forest Temple":
			return Keys.FOREST_TEMPLE.keyCount || 0;
		case "Fire Temple":
			return Keys.FIRE_TEMPLE.keyCount || 0;
		case "Water Temple":
			return Keys.WATER_TEMPLE.keyCount || 0;
		case "Shadow Temple":
			return Keys.SHADOW_TEMPLE.keyCount || 0;
		case "Spirit Temple":
			return Keys.SPIRIT_TEMPLE.keyCount || 0;
		case "Ganon's Castle":
			return Keys.GANONS_CASTLE.keyCount || 0;
			
		case "Bottom of the Well":
			return Keys.BOTTOM_OF_THE_WELL.keyCount || 0;
		case "Gerudo Fortress":
			return Keys.GERUDO_FORTRESS.keyCount || 0;
		case "Training Grounds":
			return Keys.GERUDO_TRAINING_GROUNDS.keyCount || 0;
		
		default: return 0;
	}
};

/**
 * Checks whether you have the boss key
 */
let hasBossKey = function(mapName) {
	switch(mapName) {
		case "Forest Temple":
			return Keys.FOREST_TEMPLE.playerHas;
		case "Fire Temple":
			return Keys.FIRE_TEMPLE.playerHas;
		case "Water Temple":
			return Keys.WATER_TEMPLE.playerHas;
		case "Shadow Temple":
			return Keys.SHADOW_TEMPLE.playerHas;
		case "Spirit Temple":
			return Keys.SPIRIT_TEMPLE.playerHas;
		case "Ganon's Castle":
			return Keys.GANONS_CASTLE.playerHas;
		default: return false;
	}
};
