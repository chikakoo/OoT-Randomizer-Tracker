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
	BIG_POE: { 
		name: "Big Poe",
		upgrades: [ "Nothing", "Big Poe", "Empty Bottle" ],
		useUpgradeAsDisplay: true
	},
	BLUE_FIRE: { 
		name: "Blue Fire",
		upgrades: [ "Nothing", "Blue Fire", "Empty Bottle" ],
		useUpgradeAsDisplay: true
	},
	RUTOS_LETTER: { 
		name: "Ruto's Letter",
		upgrades: [ "Nothing", "Ruto's Letter", "Empty Bottle" ],
		useUpgradeAsDisplay: true
	}
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
	MASK_OF_TRUTH: { name: "Mask of Truth" }
};

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
	NOCTURNE_OF_SHADOW: { name: "Nocturne of Shadow", defaultNotes: "<>>A<>v", divGroup: 2 },
	REQUIEM_OF_SPIRIT: { name: "Requiem of Spirit", defaultNotes: "AvA<>v", divGroup: 2 },
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
 * We're not including spaces here for easy lookup
 */
let ShopItemDictionary = {
	// Equipment
	"kokirisword": "Kokiri Sword.png",
	"koksword": "Kokiri Sword.png",
	"ksword": "Kokiri Sword.png",
	"kokiri": "Kokiri Sword.png",
	
	"biggoron'ssword": "Biggoron's Sword.png",
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
	"giant'swallet": "Wallet X.png",
	"giant wallet": "Wallet X.png",
	"tycoonwallet": "Wallet X.png",
	"tycoon'swallet": "Wallet X.png",
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
	
	"din'sfire": "Din's Fire.png",
	"dinsfire": "Din's Fire.png",
	"din's": "Din's Fire.png",
	"dins": "Din's Fire.png",
	"din": "Din's Fire.png",
	"fire": "Din's Fire.png",
	
	"nayru'slove": "Nayru's Love.png",
	"nayruslove": "Nayru's Love.png",
	"nayru's": "Nayru's Love.png",
	"nayrus": "Nayru's Love.png",
	"nayru": "Nayru's Love.png",
	"love": "Nayru's Love.png",
	
	"farore's wind": "Farore's Wind.png",
	"farores wind": "Farore's Wind.png",
	"farore's": "Farore's Wind.png",
	"farores": "Farore's Wind.png",
	"farore": "Farore's Wind.png",
	"wind": "Farore's Wind.png",
	"fw": "Farore's Wind.png",
	
	// Child trade sequence items
	"weirdegg": "Weird Egg Weird Egg.png",
	"weird": "Weird Egg Weird Egg.png",
	"egg": "Weird Egg Weird Egg.png",

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

	"goronmask": "Entrance Groups/Button - Goron Mask.png",
	"goron": "Entrance Groups/Button - Goron Mask.png",

	"zoramask": "Entrance Groups/Button - Zora Mask.png",
	"zora": "Entrance Groups/Button - Zora Mask.png",

	"gerudomask": "Entrance Groups/Button - Gerudo Mask.png",
	"gerudo": "Entrance Groups/Button - Gerudo Mask.png",

	// Adult trade sequence items
	"pocketegg": "Pocket Egg Pocket Egg.png",
	"pocket": "Pocket Egg Pocket Egg.png",

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
	"emptybottle": "Empty Bottle.png",
	"bottle": "Empty Bottle.png",
	
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
	
	"bluefire": "Blue Fire X.png",
	"firebottle": "Blue Fire X.png",
	"bluefirebottle": "Blue Fire X.png",
	"bottledfire": "Blue Fire X.png",
	"bottlewithbluefire": "Blue Fire X.png",
	
	"ruto'sletter": "Ruto's Letter X.png",
	"rutosletter": "Ruto's Letter X.png",
	"rutoletter": "Ruto's Letter X.png",
	"letter": "Ruto's Letter X.png",
	"letterbottle": "Ruto's Letter X.png",
	"bottlewithletter": "Ruto's Letter X.png",
	
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

	"smallkeyth": "Thieves' Hideout Key.png",
	"smallkeygf": "Thieves' Hideout Key.png",
	"gfsmallkey": "Thieves' Hideout Key.png",
	"thsmallkey": "Thieves' Hideout Key.png",
	"thkey": "Thieves' Hideout Key.png",
	"hideoutkey": "Thieves' Hideout Key.png",
	"thieveskey": "Thieves' Hideout Key.png",
	"thieves'hideoutkey": "Thieves' Hideout Key.png",
	"thieveshideoutkey": "Thieves' Hideout Key.png",
	"gfkey": "Thieves' Hideout Key.png",
	"fortresskey": "Thieves' Hideout Key.png",
	"gerudofortresskey": "Thieves' Hideout Key.png",
	"jailkey": "Thieves' Hideout Key.png",
	"jailsmallkey": "Thieves' Hideout Key.png",
	"keyjail": "Thieves' Hideout Key.png",
	"smallkeyjail": "Thieves' Hideout Key.png",

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

	"ganonbosskey": "Ganon's Castle Boss Key.png",
	"ganonbigkey": "Ganon's Castle Boss Key.png",
	"ganonbk": "Ganon's Castle Boss Key.png",
	"bosskeyganon": "Ganon's Castle Boss Key.png",
	"bigkeyganon": "Ganon's Castle Boss Key.png",
	"bkganon": "Ganon's Castle Boss Key.png",
	
	"dungeonmap": "Dungeon Map.png",
	"map": "Dungeon Map.png",

	"compass": "Compass.png",
		
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
	"zelda'slullaby": "Zelda's Lullaby.png",
	"zeldaslullaby": "Zelda's Lullaby.png",
	"lullaby": "Zelda's Lullaby.png",
	
	"epona'ssong": "Epona's Song.png",
	"eponassong": "Epona's Song.png",
	"eponas": "Epona's Song.png",
	"epona's": "Epona's Song.png",
	"epona": "Epona's Song.png",
	
	"saria'ssong": "Saria's Song.png",
	"sariassong": "Saria's Song.png",
	"sarias": "Saria's Song.png",
	"saria's": "Saria's Song.png",
	"saria": "Saria's Song.png",
	
	"sun'ssong": "Sun's Song.png",
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
		totalKeys: function() { return 4; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return 4; },
		mqTotalKeys: function() { return 4; }
	},
	GERUDO_TRAINING_GROUNDS: { 
		name: "Training Grounds", 
		minimumKeys: function() { 
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances ||
				(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed);
			let canChildSkipKeys = Settings.GlitchesToAllow.gtgChildVineClips && canChildAccess;
			let canSkipKeys = canChildSkipKeys || Settings.GlitchesToAllow.weirdShot;
			return canSkipKeys ? 0 : 7;
		}, 
		totalKeys: function() { return 9; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() {
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances ||
				(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed);
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
 * Gets the key count from the current map name
 */
let getKeyCount = function(mapName) {
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
 * Gets the silver rupee data for the given map name
 * @param mapName - the map name
 * @returns The silver rupee data
 */
let getSilverRupeeData = function(mapName) {
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
};

/**
 * Returns the silver rupee count at the given location and index
 * @param rupeeObject - the SilverRupee location object
 * @param index - the index to look at
 * @returns The count, or 0 if not found
 */
let getSilverRupeeCount = function(rupeeObject, index) {
	let collectedRupeeObject = rupeeObject.collectedRupees;
	if (!collectedRupeeObject) {
		return 0;
	}

	return collectedRupeeObject[index] || 0;
};

/**
 * Checks that the player has enough silver rupees of the given index
 * @param mapName - the name of the map to check
 * @param index - the silver rupee index
 * @returns the appropriate ItemObtainability value
 */
let checkSilverRupeeRequirement = function(mapName, index) {
	let rupeeObject = getSilverRupeeData(mapName);
	if (!rupeeObject) { return ItemObtainability.YES; }

	let currentRupeeCount = getSilverRupeeCount(rupeeObject, index);

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
};

/**
 * Used to group the item functions so that we don't flood the global space
 * TODO: Put all the loose functions from this file in here!
 */
let ItemData = {
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

		return ocarinaNotes.every(ocarinaNote => ocarinaNote.playerHas);
	}
}