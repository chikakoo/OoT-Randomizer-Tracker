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
	
	EMPTY_BOTTLES: { 
		name: "Empty Bottles", 
		playerHas: true, 
		count: 0,
		tooltip: "Increment for every bottle in the inventory, no matter what's in it."
	},

	// There are okay to select if you can only receive them
	BUGS: { name: "Bugs", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },
	FISH: { name: "Fish", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },
	BLUE_FIRE: { name: "Blue Fire", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },

	// Only select these if you have them in your inventory currently
	// DESELECT IF YOU DO NOT HAVE THEM!
	BIG_POE: { name: "Big Poe", cssClass: "filled-bottle", tooltip: "Enable ONLY if you currently have one - disable when it's turned in!" },
	RUTOS_LETTER: { name: "Ruto's Letter", cssClass: "filled-bottle", tooltip: "Enable ONLY if you currently have this - disable when it's used!"}
};

/**
 * A list of the child trade items
 */
let ChildTradeItems = {
	WEIRD_EGG: { 
		name: "Weird Egg", 
		upgrades: [ "Nothing", "Weird Egg", "Chicken" ],
		useUpgradeAsDisplay: true
	},
	ZELDAS_LETTER: { name: "Zelda's Letter" },
	KEATON_MASK: { name: "Keaton Mask" },
	SKULL_MASK: { name: "Skull Mask" },
	SPOOKY_MASK: { name: "Spooky Mask" },
	BUNNY_HOOD: { name: "Bunny Hood" },
	MASK_OF_TRUTH: { name: "Mask of Truth" },
	COSMETIC_MASKS: { name: "Cosmetic Masks", cssClass: "cosmetic-masks" }
};

/**
 * A list of the adult trade items
 */
let AdultTradeItems = {
	POCKET_EGG: { 
		name: "Pocket Egg", 
		upgrades: [ "Nothing", "Pocket Egg", "Pocket Cucco" ],
		useUpgradeAsDisplay: true
	},
	COJIRO: { name: "Cojiro"},
	ODD_MUSHROOM: { name: "Odd Mushroom"},
	ODD_POTION: { name: "Odd Potion"},
	POACHERS_SAW: { name: "Poacher's Saw" }, 
	BROKEN_GORONS_SWORD: { name: "Broken Goron's Sword"},
	PRESCRIPTION: { name: "Prescription"},
	EYEBALL_FROG: { name: "Eyeball Frog"},
	EYEDROPS: { name: "Eyedrops"},
	CLAIM_CHECK: { name: "Claim Check"},
};

/**
 * All songs
 * Note that the "songNotes" value gets added when these are modified
 */
let Songs = {
	ZELDAS_LULLABY: { name: "Zelda's Lullaby", defaultNotes: "<^><^>", divGroup: 1 },
	EPONAS_SONG: { name: "Epona's Song", defaultNotes: "^<>^<>", divGroup: 1 },
	SARIAS_SONG: { name: "Saria's Song", defaultNotes: "v><v><", divGroup: 1 },
	SUNS_SONG: { name: "Sun's Song", defaultNotes: ">v^>v^", divGroup: 1 },
	SONG_OF_STORMS: { name: "Song of Storms", defaultNotes: "Av^Av^", divGroup: 1 },
	SONG_OF_TIME: { name: "Song of Time", defaultNotes: ">Av>Av", divGroup: 1 },
	SCARECROWS_SONG: {name: "Scarecrow's Song", defaultNotes: "", divGroup: 3 },
	
	MINUET_OF_FOREST: { name: "Minuet of Forest", defaultNotes: "A^<><>", divGroup: 2 },
	BOLERO_OF_FIRE: { name: "Bolero of Fire", defaultNotes: "vAvA>v>v", divGroup: 2 },
	SERENADE_OF_WATER: { name: "Serenade of Water", defaultNotes: "Av>><", divGroup: 2 },
	REQUIEM_OF_SPIRIT: { name: "Requiem of Spirit", defaultNotes: "AvA<>v", divGroup: 2 },
	NOCTURNE_OF_SHADOW: { name: "Nocturne of Shadow", defaultNotes: "<>>A<>v", divGroup: 2 },
	PRELUDE_OF_LIGHT: { name: "Prelude of Light", defaultNotes: "^>^><^", divGroup: 2 }
};

/**
 * A list of the ocarina buttons, used when the setting is on that shuffles them
 */
let OcarinaButtons = {
	C_UP_BUTTON: { name: "C Up Button" },
	C_LEFT_BUTTON: { name: "C Left Button" },
	C_RIGHT_BUTTON: { name: "C Right Button" },
	C_DOWN_BUTTON: { name: "C Down Button" },
	A_BUTTON: { name: "A Button" }
};

/**
 * A list of all the player's equipment (swords, tunics, boots, wallet, scale)
 */
let Equipment = {
	MASTER_SWORD: { name: "Master Sword", playerHas: true, hide: true },
	KOKIRI_SWORD: { name: "Kokiri Sword" },
	BIGGORONS_SWORD: { name: "Biggoron's Sword" },
	DEKU_SHIELD: { name: "Deku Shield" },
	STRENGTH: { 
		name: "Strength", 
		upgrades: [ "No Upgrade", "Goron's Bracelet", "Silver Gauntlets", "Golden Gauntlets" ],
		useUpgradeAsDisplay: true
	},
	
	GORON_TUNIC: { name: "Goron Tunic" },
	ZORA_TUNIC: { name: "Zora Tunic" },
	HYLIAN_SHIELD: { name: "Hylian Shield" },
	SCALE: {
		name: "Scale",
		upgrades: ["No Scale", "Silver Scale", "Golden Scale"],
		useUpgradeAsDisplay: true
	},
	
	IRON_BOOTS: { name: "Iron Boots" },
	HOVER_BOOTS: { name: "Hover Boots" },
	MIRROR_SHIELD: { name: "Mirror Shield" },
	WALLET: { 
		name: "Wallet",
		upgrades: ["Normal Wallet", "Adult's Wallet", "Giant's Wallet or Better" ],
		useUpgradeAsDisplay: true
	},
	
	GERUDO_MEMBERSHIP_CARD: { name: "Gerudo Membership Card" },
	MAGIC: { name: "Magic" },
	TRIFORCE_SHARDS: { name: "Triforce Shards", playerHas: true, count: 0 },
	SKULLTULA_TOKENS: { name: "Skulltula Tokens", playerHas: true, count: 0 },

	STONE_OF_AGONY: { name: "Stone of Agony" },
};

/**
 * A list of upgraded items for ease of use
 * These can be used in any of the canUse functions
 */
let UpgradedItems = {
	LONGSHOT: {
		item: Items.HOOKSHOT,
		upgrade: 2
	},
	SILVER_SCALE: {
		item: Equipment.SCALE,
		upgrade: 1
	},
	GOLDEN_SCALE: {
		item: Equipment.SCALE,
		upgrade: 2
	},
	SILVER_GAUNTLETS: {
		item: Equipment.STRENGTH,
		upgrade: 2
	},
	GOLDEN_GAUNTLETS: {
		item: Equipment.STRENGTH,
		upgrade: 3
	},
	ADULTS_WALLET: {
		item: Equipment.WALLET,
		upgrade: 1
	}
};

/**
 * A list of item sets that can be used to concisely check whether a player can do something
 */
let ItemSets = {
	EXPLOSIVES: {
		isItemSet: true,
		items: [Items.BOMB, Items.BOMBCHU]
	},
	EXPLOSIVES_OR_STRENGTH: {
		isItemSet: true,
		items: [Items.BOMB, Items.BOMBCHU, Equipment.STRENGTH]
	},
	BLAST_OR_SMASH_ITEMS: {
		isItemSet: true,
		items: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER]
	},
	FIRE_ITEMS: {
		isItemSet: true,
		items: [Items.DINS_FIRE, Items.FIRE_ARROW]
	},
	PROJECTILES: {
		isItemSet: true,
		items: [Items.FAIRY_SLINGSHOT, Items.FAIRY_BOW]
	},
	DISTANT_SWITCH_ITEMS: {
		isItemSet: true,
		items: [
			Items.BOMB, Items.BOMBCHU, 
			Items.FAIRY_BOW, Items.FAIRY_SLINGSHOT, 
			Items.BOOMERANG, Items.HOOKSHOT
		]
	},
	GRAB_SHORT_DISTANCE_ITEMS: {
		isItemSet: true,
		items: [Items.BOOMERANG, Items.HOOKSHOT]
	},
	FIRST_PERSON_ITEMS: {
		isItemSet: true,
		items: [Items.HOOKSHOT, Items.FAIRY_BOW, Items.FAIRY_SLINGSHOT, Items.BOOMERANG]
	},
	// Any item you can swing and jumpslash with - includes stick and hammer
	SWORDS: {
		isItemSet: true,
		items: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK, Items.MEGATON_HAMMER]
	},
	ACUTE_ANGLE_SWORDS: {
		isItemSet: true,
		items: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Items.DEKU_STICK]
	},
	SHIELDS: {
		isItemSet: true,
		items: [Equipment.DEKU_SHIELD, Equipment.HYLIAN_SHIELD, Equipment.MIRROR_SHIELD]
	},
	DAMAGING_ITEMS: {
		isItemSet: true,
		items: [		
			Equipment.MASTER_SWORD, Equipment.KOKIRI_SWORD, Items.DEKU_STICK,
			Items.DINS_FIRE, Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER,
			Items.BOOMERANG, Items.FAIRY_SLINGSHOT
		]
	},
	STUNNABLE_ENEMY_KILL_ITEMS: {
		isItemSet: true,
		items: [
			Equipment.MASTER_SWORD, Equipment.KOKIRI_SWORD, Items.DEKU_STICK, Items.FAIRY_SLINGSHOT,
			Items.DINS_FIRE, Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER
		]
	},
	FREEZARD_KILL_ITEMS: {
		isItemSet: true,
		items: [
			Equipment.MASTER_SWORD, Items.DEKU_STICK, Items.MEGATON_HAMMER,
			Items.BOMB, Items.BOMBCHU, Items.DINS_FIRE
		]
	},
	BLUE_FIRE_ITEMS: {
		isItemSet: true,
		items: [Items.BLUE_FIRE, Items.ICE_ARROW]
	},
	MUD_WALL_ITEMS: {
		isItemSet: true,
		items: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER, Items.BLUE_FIRE, Items.ICE_ARROW]
	}
};

/**
 * For efficiency, QPA chcks will be their own item sets
 * - No hover boots QPA yet, until a spot is found that is required for it
 */
let QPAItemSets = {
	TORCH_QPA: { isQpaItemSet: true, useJumpslash: true, forTorch: true },
	MUD_WALLS_QPA: { isQpaItemSet: true, useJumpslash: true, forMudWalls: true },
	BIGGORONS_SWORD_QPA: { isQpaItemSet: true, useJumpslash: true, forBiggoronsSword: true },
	TRADE_ITEM_QPA: { isQpaItemSet: true, useCutsceneItem: true }
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
 * We're not including spaces here for easy lookup
 */
let ShopItemDictionary = {
	// Equipment
	"kokirisword": "Kokiri Sword.png",
	"koksword": "Kokiri Sword.png",
	"ksword": "Kokiri Sword.png",
	"kokiri": "Kokiri Sword.png",
	
	"biggoronssword": "Biggoron's Sword.png",
	"biggoronsword": "Biggoron's Sword.png",
	"bigsword": "Biggoron's Sword.png",
	"bsword": "Biggoron's Sword.png",
	"biggoron": "Biggoron's Sword.png",
	
	"ironboots": "Iron Boots.png",
	"ironboot": "Iron Boots.png",
	"iboots":  "Iron Boots.png",
	"iboot":  "Iron Boots.png",
	"irons":  "Iron Boots.png",
	"iron":  "Iron Boots.png",
	
	"hoverboots": "Hover Boots.png",
	"hoverboot": "Hover Boots.png",
	"hboots":  "Hover Boots.png",
	"hboot":  "Hover Boots.png",
	"hovers":  "Hover Boots.png",
	"hover":  "Hover Boots.png",
	
	"dekushield": "Deku Shield.png",
	"dekshield": "Deku Shield.png",
	"dshield": "Deku Shield.png",
	"ds": "Deku Shield.png",
	
	"hylianshield": "Hylian Shield.png",
	"hylshield": "Hylian Shield.png",
	"hshield": "Hylian Shield.png",
	
	"mirrorshield": "Mirror Shield.png",
	"mirshield": "Mirror Shield.png",
	"mshield": "Mirror Shield.png",
	"ms": "Mirror Shield.png",
	
	"gorontunic": "Goron Tunic.png",
	"gtunic": "Goron Tunic.png",
	"goronstunic": "Goron Tunic.png",
	"goron'stunic": "Goron Tunic.png",
	
	"zoratunic": "Zora Tunic.png",
	"ztunic": "Zora Tunic.png",
	"zorastunic": "Zora Tunic.png",
	"zora'stunic": "Zora Tunic.png",
	
	"wallet": "Wallet X.png",
	"wal": "Wallet X.png",
	"progressivewallet": "Wallet X.png",
	"progwallet": "Wallet X.png",
	"adultwallet": "Wallet X.png",
	"adult'swallet": "Wallet X.png",
	"adultswallet": "Wallet X.png",
	"giantwallet": "Wallet X.png",
	"giant wallet": "Wallet X.png",
	"tycoonwallet": "Wallet X.png",
	"tycoonswallet": "Wallet X.png",
	
	"gerudomembershipcard": "Gerudo Membership Card.png",
	"membershipcard": "Gerudo Membership Card.png",
	"membercard": "Gerudo Membership Card.png",
	"gerudocard": "Gerudo Membership Card.png",
	"gcard": "Gerudo Membership Card.png",
	"card": "Gerudo Membership Card.png",
	
	"magic": "Magic.png",
	"magicmeter": "Magic.png",
	"doublemagic": "Magic.png",
	"progressivemagic": "Magic.png",
	"progmagic": "Magic.png",
	
	"strength": "Strength X.png",
	"progressivestrength": "Strength X.png",
	"progressivestrengthupgrade": "Strength X.png",
	"progstrength": "Strength X.png",
	"str": "Strength X.png",
	"goronbracelet": "Strength X.png",
	"bracelet": "Strength X.png",
	"silvergauntlets": "Strength X.png",
	"goldengauntlets": "Strength X.png",
	"goldgauntlets": "Strength X.png",
	"gauntlets": "Strength X.png",
	"gaunts": "Strength X.png",
	
	"scale": "Scale X.png",
	"progressivescale": "Scale X.png",
	"progscale": "Scale X.png",
	"silverscale": "Scale X.png",
	"goldenscale": "Scale X.png",
	"goldscale": "Scale X.png",
	
	"stoneofagony": "Stone of Agony.png",
	"agony": "Stone of Agony.png",
	"stone": "Stone of Agony.png",
	
	"goldskulltulatoken": "Skulltula Tokens.png",
	"skulltulatoken": "Skulltula Tokens.png",
	"goldskulltoken": "Skulltula Tokens.png",
	"skulltoken": "Skulltula Tokens.png",
	"token": "Skulltula Tokens.png",
	"tok": "Skulltula Tokens.png",
	"tkn": "Skulltula Tokens.png",
	"skulltula": "Skulltula Tokens.png",
	"skull": "Skulltula Tokens.png",

	
	// Inventory
	"dekusticks": "Deku Stick.png",
	"dekustick": "Deku Stick.png",
	"stick": "Deku Stick.png",
	"sticks": "Deku Stick.png",
	
	"dekunuts": "Deku Nut.png",
	"dekunut": "Deku Nut.png",
	"nuts": "Deku Nut.png",
	"nut": "Deku Nut.png",
	
	"fairyslingshot": "Fairy Slingshot.png",
	"slingshot": "Fairy Slingshot.png",
	"slingshotupgrade": "Fairy Slingshot.png",
	"slingshotcapacity": "Fairy Slingshot.png",
	"slingshotcap": "Fairy Slingshot.png",
	
	"boomerang": "Boomerang.png",
	"boom": "Boomerang.png",
	
	"ocarina": "Ocarina.png",
	"fairyocarina": "Ocarina.png",
	"ocarinaoftime": "Ocarina.png",
	"oot": "Ocarina.png",
	
	"lensoftruth": "Lens of Truth.png",
	"lens": "Lens of Truth.png",
	
	"magicbeans": "Magic Bean.png",
	"magicbean": "Magic Bean.png",
	"beans": "Magic Bean.png",
	"bean": "Magic Bean.png",
	"magicbeanpack": "Magic Bean.png",
	"beanpack": "Magic Bean.png",
	"packofbeans": "Magic Bean.png",
	
	"bombbag": "Bomb Bag.png",
	"bombupgrade": "Bomb Bag.png",
	
	"bombchus": "Bombchu.png",
	"bombchu": "Bombchu.png",
	"chus": "Bombchu.png",
	"chu": "Bombchu.png",
	
	"fairybow": "Fairy Bow.png",
	"bow": "Fairy Bow.png",
	"quiver": "Fairy Bow.png",
	"quiverupgrade": "Fairy Bow.png",
	"quivercapacity": "Fairy Bow.png",
	"quivercap": "Fairy Bow.png",
	
	"firearrows": "Fire Arrow.png",
	"firearrow": "Fire Arrow.png",
	"farrows": "Fire Arrow.png",
	"farrow": "Fire Arrow.png",
	
	"icearrows": "Ice Arrow.png",
	"icearrow": "Ice Arrow.png",
	"iarrows": "Ice Arrow.png",
	"iarrow": "Ice Arrow.png",
	
	"lightarrows": "Light Arrow.png",
	"lightarrow": "Light Arrow.png",
	"larrows": "Light Arrow.png",
	"larrow": "Light Arrow.png",
	
	"hookshot": "Hookshot X.png",
	"hs": "Hookshot X.png",
	"hook": "Hookshot X.png",
	"longshot": "Hookshot X.png",
	"ls": "Hookshot X.png",
	"long": "Hookshot X.png",
	"progressivehookshot": "Hookshot X.png",
	"proghookshot": "Hookshot X.png",
	
	"megatonhammer": "Megaton Hammer.png",
	"hammer": "Megaton Hammer.png",
	
	"dinsfire": "Din's Fire.png",
	"dins": "Din's Fire.png",
	"din": "Din's Fire.png",
	"fire": "Din's Fire.png",
	
	"nayruslove": "Nayru's Love.png",
	"nayrus": "Nayru's Love.png",
	"nayru": "Nayru's Love.png",
	"love": "Nayru's Love.png",
	
	"farores wind": "Farore's Wind.png",
	"farores": "Farore's Wind.png",
	"farore": "Farore's Wind.png",
	"wind": "Farore's Wind.png",
	"fw": "Farore's Wind.png",
	
	// Child trade sequence items
	"weirdegg": "Weird Egg Weird Egg.png",
	"weird": "Weird Egg Weird Egg.png",
	"egg": "Weird Egg Weird Egg.png",

	"chicken": "Weird Egg Chicken.png",

	"zeldasletter": "Zelda's Letter.png",

	"keatonmask": "Keaton Mask.png",
	"keaton": "Keaton Mask.png",

	"keatonmask": "Keaton Mask.png",
	"keaton": "Keaton Mask.png",

	"skullmask": "Skull Mask.png",
	"skull": "Skull Mask.png",

	"spookymask": "Spooky Mask.png",
	"spooky": "Spooky Mask.png",

	"bunnyhood": "Bunny Hood.png",
	"bunny": "Bunny Hood.png",

	"maskoftruth": "Mask of Truth.png",
	"truth": "Mask of Truth.png",

	"goronmask": "Goron Mask.png",
	"goron": "Goron Mask.png",

	"zoramask": "Zora Mask.png",
	"zora": "Zora Mask.png",

	"gerudomask": "Gerudo Mask.png",
	"gerudo": "Gerudo Mask.png",

	// Adult trade sequence items
	"pocketegg": "Pocket Egg Pocket Egg.png",
	"pocket": "Pocket Egg Pocket Egg.png",

	"pocketcucco": "Pocket Egg Pocket Cucco.png",
	"cucco": "Pocket Egg Pocket Cucco.png",

	"cojiro": "Cojiro.png",

	"oddmushroom": "Odd Mushroom.png",
	"mushroom": "Odd Mushroom.png",

	"oddpotion": "Odd Potion.png",
	"potion": "Odd Potion.png",

	"poacherssaw": "Poacher's Saw.png",
	"poachersaw": "Poacher's Saw.png",
	"poacher": "Poacher's Saw.png",
	"saw": "Poacher's Saw.png",

	"brokengoronssword": "Broken Goron's Sword.png",
	"brokengoronsword": "Broken Goron's Sword.png",
	"brokensword": "Broken Goron's Sword.png",
	"sword": "Broken Goron's Sword.png",

	"prescription": "Prescription.png",
	"perscription": "Prescription.png",

	"eyeballfrog": "Eyeball Frog.png",
	"speedfrog": "Eyeball Frog.png",
	"frog": "Eyeball Frog.png",
	"eyeball": "Eyeball Frog.png",

	"eyedrops": "Eyedrops.png",
	"eyedrop": "Eyedrops.png",

	"claimcheck": "Claim Check.png",
	"claim": "Claim Check.png",
	"check": "Claim Check.png",
	
	// Bottles and bottled items
	"emptybottle": "Empty Bottles.png",
	"bottle": "Empty Bottles.png",
	
	"redpotion": "Red Potion.png",
	"redpot": "Red Potion.png",
	"pot": "Red Potion.png",
	"bottlewithredpotion": "Red Potion.png",
	"greenpotion": "Green Potion.png",
	"greenpot": "Green Potion.png",
	"bottlewithgreen potion": "Green Potion.png",
	"bluepotion": "Blue Potion.png",
	"bluepot": "Blue Potion.png",
	"bottlewithbluepotion": "Blue Potion.png",
	
	"fairy": "Fairy.png",
	"fairybottle": "Fairy.png",
	"bottledfairy": "Fairy.png",
	"bottlewithfairy": "Fairy.png",
	
	"poe": "Small Poe.png",
	"poebottle": "Small Poe.png",
	"bottledpoe": "Small Poe.png",
	"bottlewithpoe": "Small Poe.png",
	
	"bigpoe": "Big Poe.png",
	"bigpoebottle": "Big Poe.png",
	"bottledbigpoe": "Big Poe.png",
	"bottlewithbigpoe": "Big Poe.png",
	
	"milk": "Lon Lon Milk.png",
	"milkbottle": "Lon Lon Milk.png",
	"lonlonmilk": "Lon Lon Milk.png",
	"bottledmilk": "Lon Lon Milk.png",
	"bottlewithmilk": "Lon Lon Milk.png",
	
	"bugs": "Bugs.png",
	"bottledbugs": "Bugs.png",
	"bottlewithbugs": "Bugs.png",

	"fish": "Fish.png",
	"fishbottle": "Fish.png",
	"bottledfish": "Fish.png",
	"bottlewithfish": "Fish.png",
	
	"bluefire": "Blue Fire.png",
	"firebottle": "Blue Fire.png",
	"bluefirebottle": "Blue Fire.png",
	"bottledfire": "Blue Fire.png",
	"bottlewithbluefire": "Blue Fire.png",
	
	"rutosletter": "Ruto's Letter.png",
	"rutoletter": "Ruto's Letter.png",
	"letter": "Ruto's Letter.png",
	"letterbottle": "Ruto's Letter.png",
	"bottlewithletter": "Ruto's Letter.png",
	
	// Upgrades
	"dekustickupgrade": "Deku Stick Upgrade.png",
	"dekustickcapacity": "Deku Stick Upgrade.png",
	"dekustickcap": "Deku Stick Upgrade.png",
	"stickupgrade": "Deku Stick Upgrade.png",
	"stickcapacity": "Deku Stick Upgrade.png",
	"stickcap": "Deku Stick Upgrade.png",
	
	"dekunutupgrade": "Deku Nut Upgrade.png",
	"dekunutcapacity": "Deku Nut Upgrade.png",
	"dekunutcap": "Deku Nut Upgrade.png",
	"nutupgrade": "Deku Nut Upgrade.png",
	"nutcapacity": "Deku Nut Upgrade.png",
	"nutcap": "Deku Nut Upgrade.png",

	// Ammo
	"bomb": "Bomb.png",
	"bombs": "Bomb.png",
	
	"bundleofarrows": "Arrows.png",
	"arrows": "Arrows.png",
	"arrow": "Arrows.png",

	"dekuseeds": "Deku Seeds.png",
	"dekuseed": "Deku Seeds.png",
	"seeds": "Deku Seeds.png",
	"seed": "Deku Seeds.png",
	"slingshotammo": "Deku Seeds.png",
		
	// Key and Dungeon items
	"triforceshard": "Triforce Shards.png",
	"triforcepiece": "Triforce Shards.png",
	"triforce": "Triforce Shards.png",
	"tri": "Triforce Shards.png",
	"shard": "Triforce Shards.png",
	"piece": "Triforce Shards.png",
	
	"smallkey": "Small Key.png",
	"key": "Small Key.png",
	"sk": "Small Key.png",

	"bosskey": "Boss Key.png",
	"bigkey": "Boss Key.png",
	"big": "Boss Key.png",
	"boss": "Boss Key.png",
	"bk": "Boss Key.png",

	"foresttemplesmallkey": "Forest Temple Small Key.png",
	"forestsmallkey": "Forest Temple Small Key.png",
	"forestkey": "Forest Temple Small Key.png",
	"forestsk": "Forest Temple Small Key.png",
	"smallkeyforest": "Forest Temple Small Key.png",
	"keyforest": "Forest Temple Small Key.png",
	"skforest": "Forest Temple Small Key.png",

	"foresttemplebosskey": "Forest Temple Boss Key.png",
	"forestbosskey": "Forest Temple Boss Key.png",
	"forestbigkey": "Forest Temple Boss Key.png",
	"forestbk": "Forest Temple Boss Key.png",
	"bosskeyforest": "Forest Temple Boss Key.png",
	"bigkeyforest": "Forest Temple Boss Key.png",
	"bkforest": "Forest Temple Boss Key.png",

	"firetemplesmallkey": "Fire Temple Small Key.png",
	"firesmallkey": "Fire Temple Small Key.png",
	"firekey": "Fire Temple Small Key.png",
	"firesk": "Fire Temple Small Key.png",
	"smallkeyfire": "Fire Temple Small Key.png",
	"keyfire": "Fire Temple Small Key.png",
	"skfire": "Fire Temple Small Key.png",

	"firetemplebosskey": "Fire Temple Boss Key.png",
	"firebosskey": "Fire Temple Boss Key.png",
	"firebigkey": "Fire Temple Boss Key.png",
	"firebk": "Fire Temple Boss Key.png",
	"bosskeyfire": "Fire Temple Boss Key.png",
	"bigkeyfire": "Fire Temple Boss Key.png",
	"bkfire": "Fire Temple Boss Key.png",

	"watertemplesmallkey": "Water Temple Small Key.png",
	"watersmallkey": "Water Temple Small Key.png",
	"waterkey": "Water Temple Small Key.png",
	"watersk": "Water Temple Small Key.png",
	"smallkeywater": "Water Temple Small Key.png",
	"keywater": "Water Temple Small Key.png",
	"skwater": "Water Temple Small Key.png",

	"watertemplebosskey": "Water Temple Boss Key.png",
	"waterbosskey": "Water Temple Boss Key.png",
	"waterbigkey": "Water Temple Boss Key.png",
	"waterbk": "Water Temple Boss Key.png",
	"bosskeywater": "Water Temple Boss Key.png",
	"bigkeywater": "Water Temple Boss Key.png",
	"bkwater": "Water Temple Boss Key.png",

	"shadowtemplesmallkey": "Shadow Temple Small Key.png",
	"shadowsmallkey": "Shadow Temple Small Key.png",
	"shadowkey": "Shadow Temple Small Key.png",
	"shadowsk": "Shadow Temple Small Key.png",
	"smallkeyshadow": "Shadow Temple Small Key.png",
	"keyshadow": "Shadow Temple Small Key.png",
	"skshadow": "Shadow Temple Small Key.png",

	"shadowtemplebosskey": "Shadow Temple Boss Key.png",
	"shadowbosskey": "Shadow Temple Boss Key.png",
	"shadowbigkey": "Shadow Temple Boss Key.png",
	"shadowbk": "Shadow Temple Boss Key.png",
	"bosskeyshadow": "Shadow Temple Boss Key.png",
	"bigkeyshadow": "Shadow Temple Boss Key.png",
	"bkshadow": "Shadow Temple Boss Key.png",

	"spirittemplesmallkey": "Spirit Temple Small Key.png",
	"spiritsmallkey": "Spirit Temple Small Key.png",
	"spiritkey": "Spirit Temple Small Key.png",
	"spiritsk": "Spirit Temple Small Key.png",
	"smallkeyspirit": "Spirit Temple Small Key.png",
	"keyspirit": "Spirit Temple Small Key.png",
	"skspirit": "Spirit Temple Small Key.png",

	"spirittemplebosskey": "Spirit Temple Boss Key.png",
	"spiritbosskey": "Spirit Temple Boss Key.png",
	"spiritbigkey": "Spirit Temple Boss Key.png",
	"spiritbk": "Spirit Temple Boss Key.png",
	"bosskeyspirit": "Spirit Temple Boss Key.png",
	"bigkeyspirit": "Spirit Temple Boss Key.png",
	"bkspirit": "Spirit Temple Boss Key.png",

	"wellsmallkey": "Bottom of the Well Small Key.png",
	"wellkey": "Bottom of the Well Small Key.png",
	"wellsk": "Bottom of the Well Small Key.png",
	"smallkeywell": "Bottom of the Well Small Key.png",
	"keywell": "Bottom of the Well Small Key.png",
	"skwell": "Bottom of the Well Small Key.png",

	"smallkeyth": "Thieves' Hideout Small Key.png",
	"smallkeygf": "Thieves' Hideout Small Key.png",
	"gfsmallkey": "Thieves' Hideout Small Key.png",
	"thsmallkey": "Thieves' Hideout Small Key.png",
	"thkey": "Thieves' Hideout Small Key.png",
	"hideoutkey": "Thieves' Hideout Small Key.png",
	"thieveskey": "Thieves' Hideout Small Key.png",
	"thieves'hideoutkey": "Thieves' Hideout Small Key.png",
	"thieveshideoutkey": "Thieves' Hideout Small Key.png",
	"gfkey": "Thieves' Hideout Small Key.png",
	"fortresskey": "Thieves' Hideout Small Key.png",
	"gerudofortresskey": "Thieves' Hideout Small Key.png",
	"jailkey": "Thieves' Hideout Small Key.png",
	"jailsmallkey": "Thieves' Hideout Small Key.png",
	"keyjail": "Thieves' Hideout Small Key.png",
	"smallkeyjail": "Thieves' Hideout Small Key.png",

	"gtgsmallkey": "Training Grounds Small Key.png",
	"gtgkey": "Training Grounds Small Key.png",
	"gtgsk": "Training Grounds Small Key.png",
	"smallkeygtg": "Training Grounds Small Key.png",
	"keygtg": "Training Grounds Small Key.png",
	"skgtg": "Training Grounds Small Key.png",

	"ganonsmallkey": "Ganon's Castle Small Key.png",
	"ganonkey": "Ganon's Castle Small Key.png",
	"ganonsk": "Ganon's Castle Small Key.png",
	"smallkeyganon": "Ganon's Castle Small Key.png",
	"keyganon": "Ganon's Castle Small Key.png",
	"skganon": "Ganon's Castle Small Key.png",

	"chestminigamesmallkey": "Treasure Chest Minigame Small Key.png",
	"chestgamesmallkey": "Treasure Chest Minigame Small Key.png",
	"chestgamesk": "Treasure Chest Minigame Small Key.png",
	"chestsmallkey": "Treasure Chest Minigame Small Key.png",
	"chestsk": "Treasure Chest Minigame Small Key.png",
	"chestminigamekey": "Treasure Chest Minigame Small Key.png",
	"chestgamekey": "Treasure Chest Minigame Small Key.png",
	"chestkey": "Treasure Chest Minigame Small Key.png",

	"ganonbosskey": "Ganon's Castle Boss Key.png",
	"ganonbigkey": "Ganon's Castle Boss Key.png",
	"ganonbk": "Ganon's Castle Boss Key.png",
	"bosskeyganon": "Ganon's Castle Boss Key.png",
	"bigkeyganon": "Ganon's Castle Boss Key.png",
	"bkganon": "Ganon's Castle Boss Key.png",
	
	"dungeonmap": "Dungeon Map.png",
	"map": "Dungeon Map.png",

	"compass": "Compass.png",

	// Rupees
	"silverrupee": "Silver Rupee.png",
	"silver": "Silver Rupee.png",

	"greenrupee": "Green Rupee.png",
	"green": "Green Rupee.png",

	"bluerupee": "Blue Rupee.png",
	"blue": "Blue Rupee.png",

	"redrupee": "Red Rupee.png",
	"red": "Red Rupee.png",
	
	"purplerupee": "Purple Rupee.png",
	"purple": "Purple Rupee.png",

	"goldrupee": "Gold Rupee.png",
	"gold": "Gold Rupee.png",
		
	// Hearts
	"pieceofheart": "Piece of Heart.png",
	"heartpiece": "Piece of Heart.png",
	"hp": "Piece of Heart.png",
	
	"heartcontainer": "Heart Container.png",
	"container": "Heart Container.png",
	"hc": "Heart Container.png",

	"recoveryheart": "Recovery Heart.png",
	"heart": "Recovery Heart.png",
	"health": "Recovery Heart.png",

	"doubledefense": "Double Defense.png",
	"doubledefence": "Double Defense.png",
	"doubledef": "Double Defense.png",
	"defense": "Double Defense.png",
	"defence": "Double Defense.png",
	"def": "Double Defense.png",
	"dd": "Double Defense.png",
		
	// Songs
	"zeldaslullaby": "Zelda's Lullaby.png",
	"lullaby": "Zelda's Lullaby.png",
	
	"eponassong": "Epona's Song.png",
	"eponas": "Epona's Song.png",
	"epona's": "Epona's Song.png",
	"epona": "Epona's Song.png",
	
	"sariassong": "Saria's Song.png",
	"sarias": "Saria's Song.png",
	"saria's": "Saria's Song.png",
	"saria": "Saria's Song.png",
	
	"sunssong": "Sun's Song.png",
	"sunsong": "Sun's Song.png",
	"sun's": "Sun's Song.png",
	"suns": "Sun's Song.png",
	"sun": "Sun's Song.png",
	
	"songoftime": "Song of Time.png",
	"time": "Song of Time.png",
	"sot": "Song of Time.png",
	
	"songofstorms": "Song of Storms.png",
	"songofstorm": "Song of Storms.png",
	"storms": "Song of Storms.png",
	"storm": "Song of Storms.png",
	"sos": "Song of Storms.png",
	
	"minuetofforest": "Minuet of Forest.png",
	"minuet": "Minuet of Forest.png",
	
	"bolerooffire": "Bolero of Fire.png",
	"bolero": "Bolero of Fire.png",
	
	"serenadeofwater": "Serenade of Water.png",
	"serenade": "Serenade of Water.png",
	
	"nocturneofshadow": "Nocturne of Shadow.png",
	"nocturne": "Nocturne of Shadow.png",
	
	"requiemofspirit": "Requiem of Spirit.png",
	"requiem": "Requiem of Spirit.png",
	
	"preludeoflight": "Prelude of Light.png",
	"prelude": "Prelude of Light.png",

	// Ocarina Buttons
	"^": "Controller Buttons/C Up Button.png",
	"u": "Controller Buttons/C Up Button.png",
	"up": "Controller Buttons/C Up Button.png",
	"cup": "Controller Buttons/C Up Button.png",
	"cupbutton": "Controller Buttons/C Up Button.png",

	"<": "Controller Buttons/C Left Button.png",
	"l": "Controller Buttons/C Left Button.png",
	"left": "Controller Buttons/C Left Button.png",
	"cleft": "Controller Buttons/C Left Button.png",
	"cleftbutton": "Controller Buttons/C Left Button.png",

	">": "Controller Buttons/C Right Button.png",
	"r": "Controller Buttons/C Right Button.png",
	"right": "Controller Buttons/C Right Button.png",
	"cright": "Controller Buttons/C Right Button.png",
	"crightbutton": "Controller Buttons/C Right Button.png",

	"v": "Controller Buttons/C Down Button.png",
	"d": "Controller Buttons/C Down Button.png",
	"down": "Controller Buttons/C Down Button.png",
	"cdown": "Controller Buttons/C Down Button.png",
	"cdownbutton": "Controller Buttons/C Down Button.png",

	"abutton": "Controller Buttons/A Button.png",
	"a": "Controller Buttons/A Button.png",

	// Stones/medallions
	"kokiriemerald": "Kokiri's Emerald.png",
	"kokirisemerald": "Kokiri's Emerald.png",

	"goronruby": "Goron's Ruby.png",
	"goronsruby": "Goron's Ruby.png",

	"zorasapphire": "Zora's Sapphire.png",
	"zorassapphire": "Zora's Sapphire.png",

	"forestmedallion": "Forest Medallion.png",
	"firemedallion": "Fire Medallion.png",
	"watermedallion": "Water Medallion.png",
	"shadowmedallion": "Shadow Medallion.png",
	"spiritmedallion": "Spirit Medallion.png",
	"lightmedallion": "Light Medallion.png"
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

			// Skips the lobby door to the block room
			if (Settings.GlitchesToAllow.forestJumpToTop) {
				minKeys--;
			}

			// Skips the two locked doors leading to the carousel room
			// - Includes the green poe early trick, using bombs and hover boots and...
			// - The megaflip from the well switch ledge
			// If pots are shuffled, then you still need use use these keys
			if ((Settings.GlitchesToAllow.forestGreenPoeEarly || Settings.GlitchesToAllow.megaFlip) &&
					(Settings.RandomizerSettings.potSetting === ShuffleLocationSettings.OFF ||
					(Settings.RandomizerSettings.potSetting === ShuffleLocationSettings.OW_ONLY))
			) {
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
			if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) { minKeys--; }
			if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) { minKeys--; }
			if (Settings.GlitchesToAllow.fireJailClip) { minKeys--;}
			if (Settings.GlitchesToAllow.fireWallSkip) { minKeys--; }
			return minKeys;
		}, 
		totalKeys: function() {
			return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.SMALL_KEY_SANITY ? 8 : 7;
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
		
		mqMinimumKeys: function() { return 6; }, // You can always longshot across to skip the silver gaunts key door
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
	THIEVES_HIDEOUT: { 
		name: "Thieves' Hideout", 
		_getTotalKeys: function() {
			switch(Settings.RandomizerSettings.openGerudosFortress) {
				case OpenGerudosFortressSettings.VANILLA:
					return 4;
				case OpenGerudosFortressSettings.ONE_CARPENTER:
					return 1;
				default: // OpenGerudoFortressSettings.OPEN
					return 0;
			}
		},
		totalKeys: function() { return this._getTotalKeys(); }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return this._getTotalKeys(); }, 
		mqTotalKeys: function() { return this._getTotalKeys(); }, 
	},
	GERUDO_TRAINING_GROUNDS: { 
		name: "Training Grounds", 
		minimumKeys: function() { 
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances || Settings.GlitchesToAllow.gtgChildAllowed;
			let canChildSkipKeys = Settings.GlitchesToAllow.gtgChildVineClips && canChildAccess;
			let canSkipKeys = canChildSkipKeys || Settings.GlitchesToAllow.weirdShot;
			return canSkipKeys ? 0 : 7;
		}, 
		totalKeys: function() { return 9; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() {
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances || Settings.GlitchesToAllow.gtgChildAllowed;
			let canChildSkipKeys = Settings.GlitchesToAllow.gtgChildVineClips && canChildAccess;
			let canSkipKeys = canChildSkipKeys || Settings.GlitchesToAllow.weirdShot;
			return canSkipKeys ? 0 : 3;
		},
		mqTotalKeys: function() { return 3; }
	},
	TREASURE_CHEST_MINIGAME: {
		name: "Treasure Chest Minigame",
		totalKeys: function() { return 6; },
		mqMinimumKeys: function() { return 6; },
		mqTotalKeys: function() { return 6; },
		noBossKey: true
	}
};

/**
 * Contains data in the following format (different data for MQ and standard):
 * - #: { { name: "Rupee Set Name", total: #, color: "colorName"}, ... }
 * 
 * On the object, will contain a property as follows (this way, we can have uneven
 * sets to rupee counts and still have this work):
 * - collectedRupees: { "Rupee Set Index": # }
 */
let SilverRupees = {
	ICE_CAVERN: {
		name: "Ice Cavern",
		standardRupeeData: {
			0: {
				name: "Ice Scythe Room",
				total: 5,
				color: "cyan"
			},
			1: {
				name: "Ice Block Push Room",
				total: 5,
				color: "blue"
			}
		},
		mqRupeeData: {}
	},
	SHADOW_TEMPLE: {
		name: "Shadow Temple",
		standardRupeeData: {
			0: {
				name: "Shadow Scythe Room",
				total: 5,
				color: "green"
			},
			1: {
				name: "Shadow Pit Room",
				total: 5,
				max: 10,
				color: "yellow"
			},
			2: {
				name: "Shadow Invisible Spikes Room",
				total: 5,
				color: "pink"
			}
		},
		mqRupeeData: {
			0: {
				name: "Shadow Scythe Room",
				total: 5,
				color: "green"
			},
			1: {
				name: "Shadow Invisible Scythe Room",
				total: 10,
				color: "cyan"
			},
			2: {
				name: "Shadow Pit Room",
				total: 5,
				color: "yellow"
			},
			3: {
				name: "Shadow Invisible Spikes Room",
				total: 10,
				color: "pink"
			}
		}
	},
	SPIRIT_TEMPLE: {
		name: "Spirit Temple",
		standardRupeeData: {
			0: {
				name: "Spirit Child Side",
				total: 5,
				color: "red"
			},
			1: {
				name: "Spirit Sun Block Room",
				total: 5,
				color: "yellow"
			},
			2: {
				name: "Spirit Adult Boulder Room",
				total: 5,
				color: "green"
			}
		},
		mqRupeeData: {
			0: {
				name: "Spirit Lobby",
				total: 5,
				color: "cyan"
			},
			1: {
				name: "Spirit Moving Wall Room",
				total: 5,
				color: "blue"
			}
		}
	},
	GANONS_CASTLE: {
		name: "Ganon's Castle",
		standardRupeeData: {
			0: {
				name: "Ganon Spirit Trial",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "Ganon Light Trial",
				total: 5,
				color: "cyan"
			},
			2: {
				name: "Ganon Fire Trial",
				total: 5,
				color: "red"
			},
			3: {
				name: "Ganon Forest Trial",
				total: 5,
				color: "green"
			}
		},
		mqRupeeData: {
			0: {
				name: "Ganon Fire Trial",
				total: 5,
				color: "red"
			},
			1: {
				name: "Ganon Shadow Trial",
				total: 5,
				color: "pink"
			},
			2: {
				name: "Ganon Water Trial",
				total: 5,
				color: "blue"
			}
		}
	},
	BOTTOM_OF_THE_WELL: {
		name: "Bottom of the Well",
		standardRupeeData: {
			0: {
				name: "Well Basement",
				total: 5,
				color: "white"
			}
		},
		mqRupeeData: {}
	},
	DODONGOS_CAVERN: {
		name: "Dodongo's Cavern",
		standardRupeeData: {},
		mqRupeeData: {
			0: {
				name: "Dondongo Staircase",
				total: 5,
				color: "white"
			}
		}
	},
	TRAINING_GROUNDS: {
		name: "Training Grounds",
		standardRupeeData: {
			0: {
				name: "GTG Slopes Room",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "GTG Lava Room",
				total: 5,
				max: 6,
				color: "red"
			},
			2: {
				name: "GTG Water Room",
				total: 5,
				color: "blue"
			}
		},
		mqRupeeData: {
			0: {
				name: "GTG Slopes Room",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "GTG Lava Room",
				total: 6,
				color: "red"
			},
			2: {
				name: "GTG Water Room",
				total: 3,
				max: 5,
				color: "blue"
			}
		}
	}
};

/**
 * Used to group the item functions so that we don't flood the global space
 */
let ItemData = {
	/**
	 * Gets whether the player can use the given item/upgrade at the given age
	 * This includees equip swap
	 * 
	 * If we need to improve performance in the future:
	 * - We can cache this logic and store it in each item one time per change
	 * - For instance, we'd have: Items.FIRE_ARROW.canUse[age] available
	 * @param age - The age to check
	 * @param item - The item to check
	 *  > Format: { item: item, upgrade: Number } OR just the item directly
	 *  > The upgrade is assuemd to be the lowest number required
	 */
	canUse: function(age, itemInput) {
		// The lowest upgrade to include (ex 2 would be silver/gold gaunts, but not goron bracelet)
		let lowestUpgrade = itemInput.upgrade;
		let item = itemInput.item || itemInput;

		// If we're given an item set, we need to check whether we can use any single one of the items in it
		if (item.isItemSet) {
			return this.canUseAny(age, item.items);
		}

		// If this is a QPA item set, check it accordingly
		if (item.isQpaItemSet) {
			return this.canUseQPAItemSet(age, item);
		}

		// If the item has default notes, it's a song
		if (item.defaultNotes !== undefined) {
			return Data.canPlaySong(item);
		}

		// You can't use an item you don't have!
		if (!this.playerHasItem(item, lowestUpgrade)) { return false; }

		switch(item) {
			// Child Only
			case ChildTradeItems.KEATON_MASK:
			case ChildTradeItems.SKULL_MASK:
			case ChildTradeItems.SPOOKY_MASK:
			case ChildTradeItems.BUNNY_HOOD:
			case ChildTradeItems.MASK_OF_TRUTH:
			case ChildTradeItems.COSMETIC_MASKS:
			case Equipment.KOKIRI_SWORD:
			case Equipment.DEKU_SHIELD:
				return age === Age.CHILD;

			// Adult Only
			case Items.FAIRY_BOW:
			case Items.HOOKSHOT:
			case Equipment.MASTER_SWORD:
			case Equipment.HYLIAN_SHIELD:
			case Equipment.MIRROR_SHIELD:
			case Equipment.IRON_BOOTS:
			case Equipment.HOVER_BOOTS:
			case AdultTradeItems.POCKET_EGG:
			case AdultTradeItems.COJIRO:
			case AdultTradeItems.ODD_POTION:
			case AdultTradeItems.BROKEN_GORONS_SWORD:
			case AdultTradeItems.PRESCRIPTION:
			case AdultTradeItems.EYEDROPS:
			case AdultTradeItems.CLAIM_CHECK:
				return age === Age.ADULT;
			case Items.FIRE_ARROW:
			case Items.LIGHT_ARROW:
				return age === Age.ADULT && 
					Items.FAIRY_BOW.playerHas && 
					Equipment.MAGIC.playerHas;
			case Items.ICE_ARROW: // Ice arrows don't do anything special unless they act as blue fire
				return age === Age.ADULT && 
					Settings.RandomizerSettings.iceArrowsActAsBlueFire &&
					Items.FAIRY_BOW.playerHas && 
					Equipment.MAGIC.playerHas;

			// Shared items that need logic
			case Items.DINS_FIRE:
			case Items.FARORES_WIND:
			case Items.NAYRUS_LOVE:
			case Items.LENS_OF_TRUTH:
				return Equipment.MAGIC.playerHas;
			case Equipment.STRENGTH:
				return lowestUpgrade > 0 ? age === Age.ADULT : true;

			// Equip swappable
			case Items.DEKU_STICK:
				return age === Age.CHILD || 
					Settings.GlitchesToAllow.forceAdultDekuStickEquip ||
					Data.canEquipSwap(age);
			case Items.FAIRY_SLINGSHOT:
				return age === Age.CHILD || 
					// Adult can shoot slingshot-type ammo with the bow, but uses arrows as ammo
					Items.FAIRY_BOW.playerHas && (
						Settings.GlitchesToAllow.forceAdultSlingshotEquip ||
						Data.canEquipSwap(age)
					);
			case Items.BOOMERANG:
				return age === Age.CHILD || 
					Settings.GlitchesToAllow.forceAdultBoomerangEquip ||
					Data.canEquipSwap(age);
			case ChildTradeItems.WEIRD_EGG:
			case ChildTradeItems.ZELDAS_LETTER:
				// For thawing King Zora
				// TODO: maybe make a setting for force child trade item equipped - may be overkill though
				return age === Age.CHILD || Data.canEquipSwap(age);
			case Items.MEGATON_HAMMER:
			case AdultTradeItems.ODD_MUSHROOM:
			case AdultTradeItems.POACHERS_SAW:
			case AdultTradeItems.EYEBALL_FROG:
				// The other trade items have no use as Child
				return age === Age.ADULT || Data.canEquipSwap(age);

		}

		// Shared items
		return true;
	},

	/**
	 * Logic to calculate whether the player can perform QPA with the given settings
	 * @param age - Link's age
	 * @param itemSet - The settings:
	 * == QPA Types ==
	 * - useJumpslash: Whether QPA will be performed using an empty jumpslash, requiring a sword item
	 *   - forMudWalls: Whether this QPA will be used to break mud walls
	 *   - forBiggoronsSword: Whether this QPA will make use of Biggoron's Sword
	 *   - forTorch: Whether this QPA will be used to light a torch, requiring a stick as child due to his height
	 * - useCutsceneItem: Whether QPA will be performed using a cutscene item, also requiring a deku stick
	 * @returns True if the player can use QPA for the purpose they wish to use it for
	 */
	canUseQPAItemSet: function(age, itemSet) {
		if (!Settings.GlitchesToAllow.qpa) {
			return false;
		}

		if (itemSet.useJumpslash) {
			// If we intend this to be used as blue fire, the rando setting needs to be on
			if (itemSet.forMudWalls && !Settings.RandomizerSettings.iceArrowsActAsBlueFire) {
				return false;
			}

			// TODO: uncomment this on when the sword is added to the item list (and force adult)
			// if (itemSet.forBiggoronsSword && !Equipment.BIGGORONS_SWORD.playerHas) {
			// 	return false; //TODO: put all the logic there instead, since it's just for adult
			// }

			// Child is too short to hit the torch with any other weapon
			return itemSet.forTorch && age === Age.CHILD
				? this.canUseAll(age, [Items.DEKU_STICK, ItemSets.SHIELDS])
				: this.canUseAll(age, [ItemSets.SWORDS, ItemSets.SHIELDS]);
		}

		if (itemSet.useCutsceneItem) {
			if (!this.canUse(age, Items.DEKU_STICK)) {
				return false;
			}

			if (age === Age.CHILD) {
				return Items.MAGIC_BEAN.playerHas ||
					this.hasChildTradeItem() || 

					// You can't equip swap from the left, since you NEED stick equipped, so the
					// only items you can do it with are the magic spells
					(this.hasAdultTradeItem() && 
						this.canUseAny(age, [Items.DINS_FIRE, Items.FARORES_WIND, Items.NAYRUS_LOVE]));
			} 

			// Since stick NEEDS to be equipped, you can't equip swap a child trade item/magic beans for this
			return this.hasAdultTradeItem();
		}

		console.log("ERROR: Got into canUseQPAItemSet with an unexpected item set!");
		return false; // Should never get here
	},

	/**
	 * Checks that the player has the given item at the given upgrade
	 * @param item - The item to check
	 * @param {Number} upgrade - The upgrade string to check (pass a false value to skip this check)
	 * @param {Boolean} exactUpgrade - True if we care about the exact upgrade number
	 */
	playerHasItem: function(item, upgrade, exactUpgrade) {
		if (!item.playerHas) { return false; }
		if (upgrade !== 0 && !upgrade) { return true; }
		return exactUpgrade
			? item.currentUpgrade === upgrade
			: item.currentUpgrade >= upgrade;
	},

	/**
	 * Gets whether the age can use all of the given items
	 * @param age - The age to check
	 * @param items - An array of items
	 */
	canUseAll(age, items) {
		return items.every(item => this.canUse(age, item));
	},

	/**
	 * Gets whether the age can anyone of the given items
	 * @param age - The age to check
	 * @param items - An array of items
	 */
	canUseAny(age, items) {
		return items.some(item => this.canUse(age, item));
	},

	/**
	 * Gets the key count from the current map name
	 */
	getKeyCount: function(mapName) {
		if (mapName !== "Thieves' Hideout" && Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY) {
			return 99;
		}

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
			case "Thieves' Hideout":
				return Keys.THIEVES_HIDEOUT.keyCount || 0;
			case "Training Grounds":
				return Keys.GERUDO_TRAINING_GROUNDS.keyCount || 0;

			case "Treasure Chest Minigame":
				if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.KEYSY) {
					return 99;
				}
				return Keys.TREASURE_CHEST_MINIGAME.keyCount || 0;
			
			default: return 0;
		}
	},

	/**
	 * Checks whether you have the boss key
	 */
	hasBossKey: function(mapName) {
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
	},

	/**
	 * Gets the song notes string out of the given song
	 * @param {any} song - the song
	 */
	getSongNotes: function(song) {
		let isNullOrUndefined = song.songNotes === null || song.songNotes === undefined;
		return isNullOrUndefined
			? song.defaultNotes
			: song.songNotes;
	},

	/**
	 * Checks that the given string of notes is valid
	 * @param {String} songNotes - the song notes to validate
	 * @return A boolean indicating whether the notes were valid
	 */
	validateSongNotes: function(songNotes) {
		return /^[\^u>l<rdva]*$/.test(songNotes.toLowerCase().trim());
	},

	/**
	 * Converts the song note string into an array of OcarinaButtons
	 * @param {String} songNotes - the song notes to convert
	 */
	convertSongNotesString: function(songNotes) {
		if (!this.validateSongNotes(songNotes)) { return null; }

		let convertedNotes = [];
		let error = false;
		[...songNotes.toLowerCase().trim()].forEach(character => {
			let convertedNote = this._convertSongNoteToOcarinaButton(character);
			if (!convertedNote) {
				console.log(`ERROR: Tried to convert a \"${character}\" to an OcarinaButton!`);
				error = true;
			}
			convertedNotes.push(convertedNote);
		});

		if (error) { return null; }
		return convertedNotes;
	},

	/**
	 * Converts the given song note into an OcarinaButton
	 * @param {String} songNote - The note to update - assumed to be lowercase
	 * @return The matching OcarinaButton, or null if not found
	 */
	_convertSongNoteToOcarinaButton: function(songNote) {
		switch(songNote) {
			case "^":
			case "u":
				return OcarinaButtons.C_UP_BUTTON;
			case "<":
			case "l":
				return OcarinaButtons.C_LEFT_BUTTON;
			case ">":
			case "r":
				return OcarinaButtons.C_RIGHT_BUTTON;
			case "v":
			case "d":
				return OcarinaButtons.C_DOWN_BUTTON;
			case "a":
				return OcarinaButtons.A_BUTTON;
			default:
				return null;
		}
	},

	/**
	 * Given an ocarina song, checks if the player has all the song notes to play it
	 * @param {any} song - the song to check 
	 */
	hasAllSongNotes: function(song) {
		if (!Settings.RandomizerSettings.shuffleOcarinaButtons) {
			// If the setting is off, we always have all the notes!
			return true;
		}

		let notes = this.getSongNotes(song);
		let ocarinaNotes = this.convertSongNotesString(notes);
		if (!ocarinaNotes) {
			return false; // The notes were invalid...
		}

		// Songs of length 0 are invalid, unless it's Scarecrow's Song
		if (ocarinaNotes.length === 0 && song !== Songs.SCARECROWS_SONG) {
			return false;
		}
		return ocarinaNotes.every(ocarinaNote => ocarinaNote.playerHas);
	},

	/**
	 * Get the number of ocarina buttons the player has
	 */
	getNumberOfOcarinaButtons: function() {
		var ocarinaButtons = Object.values(OcarinaButtons);
		return Settings.RandomizerSettings.shuffleOcarinaButtons
			? ocarinaButtons.filter(button => button.playerHas).length
			: ocarinaButtons.length;
	},

	/**
	 * Checks that the player has enough silver rupees of the given index
	 * @param mapName - the name of the map to check
	 * @param index - the silver rupee index
	 * @returns the appropriate ItemObtainability value
	 */
	checkSilverRupeeRequirement: function(mapName, index) {
		let rupeeObject = this._getSilverRupeeData(mapName);
		if (!rupeeObject) { return ItemObtainability.YES; }

		let currentRupeeCount = this.getSilverRupeeCount(rupeeObject, index);

		let isMasterQuest = MapLocations[mapName].IsMasterQuest;
		let rupeeData = isMasterQuest
			? rupeeObject.mqRupeeData
			: rupeeObject.standardRupeeData;
		if (!rupeeData[index]) { return ItemObtainability.NO; }

		let totalRupeesRequired = rupeeData[index].total;
		if (currentRupeeCount >= totalRupeesRequired) {
			return ItemObtainability.YES;
		}
		return ItemObtainability.NO;
	},

	/**
	 * Returns the silver rupee count at the given location and index
	 * @param rupeeObject - the SilverRupee location object
	 * @param index - the index to look at
	 * @returns The count, or 0 if not found
	 */
	getSilverRupeeCount: function(rupeeObject, index) {
		let collectedRupeeObject = rupeeObject.collectedRupees;
		if (!collectedRupeeObject) {
			return 0;
		}

		return collectedRupeeObject[index] || 0;
	},

	/**
	 * Gets the silver rupee data for the given map name
	 * @param mapName - the map name
	 * @returns The silver rupee data
	 */
	_getSilverRupeeData: function(mapName) {
		switch(mapName) {
			case "Ice Cavern":
				return SilverRupees.ICE_CAVERN;

			case "Shadow Temple":
				return SilverRupees.SHADOW_TEMPLE;
			case "Spirit Temple":
				return SilverRupees.SPIRIT_TEMPLE;
			case "Ganon's Castle":
				return SilverRupees.GANONS_CASTLE;
				
			case "Dodongo's Cavern":
				return SilverRupees.DODONGOS_CAVERN;
			case "Bottom of the Well":
				return SilverRupees.BOTTOM_OF_THE_WELL;
			case "Training Grounds":
				return SilverRupees.TRAINING_GROUNDS;
			
			default: 
				console.log(`ERROR: Attempted to get silver rupee data for ${mapName}!`);
				return null;
		}
	},

	/**
	 * Gets the number of empty bottles the player has
	 * @param {boolean} excludeLetterAndPoe - whether to exclude ruto's letter and the big poe from the counts
	 */
	getEmptyBottleCount: function(excludeLetterAndPoe) {
		let count = Items.EMPTY_BOTTLES.count;

		if (excludeLetterAndPoe) {
			if (Items.RUTOS_LETTER.playerHas) {
				count--;
			}
			if (Items.BIG_POE.playerHas) {
				count--;
			}
		}

		return Math.max(count, 0);
	},

	/**
	 * Whether the child trade item slot is filled - used for equip swap checks!
	 */
	hasChildTradeItem: function() {
		return ChildTradeItems.COSMETIC_MASKS.playerHas ||
			ChildTradeItems.WEIRD_EGG.playerHas ||
			ChildTradeItems.ZELDAS_LETTER.playerHas ||
			ChildTradeItems.KEATON_MASK.playerHas ||
			ChildTradeItems.SKULL_MASK.playerHas ||
			ChildTradeItems.SPOOKY_MASK.playerHas ||
			ChildTradeItems.BUNNY_HOOD.playerHas ||
			ChildTradeItems.MASK_OF_TRUTH.playerHas;
	},

	/**
	 * Whether the adult trade item slot is filled - used for equip swap checks!
	 */
	hasAdultTradeItem: function() {
		return AdultTradeItems.POCKET_EGG.playerHas ||
			AdultTradeItems.COJIRO.playerHas ||
			AdultTradeItems.ODD_MUSHROOM.playerHas ||
			AdultTradeItems.ODD_POTION.playerHas ||
			AdultTradeItems.POACHERS_SAW.playerHas ||
			AdultTradeItems.BROKEN_GORONS_SWORD.playerHas ||
			AdultTradeItems.PRESCRIPTION.playerHas ||
			AdultTradeItems.EYEBALL_FROG.playerHas ||
			AdultTradeItems.EYEDROPS.playerHas ||
			AdultTradeItems.CLAIM_CHECK.playerHas;
	}
}