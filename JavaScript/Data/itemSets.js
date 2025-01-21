/**
 * How to compare items in a set - logic will look at the first element to determine the type
 * - if it is NOT present, defaults to AND
 * 
 * EXAMPLES:
 * [SetType.OR, Items.HOOKSHOT, Items.BOMB]: True if player has EITHER hookshot or bomb
 * [SetType.AND, Items.HOOKSHOT, Items.BOMB]: True if player has BOTH hookshot and bomb
 * [Items.HOOKSHOT, Items.BOMB]: True if player has BOTH hookshot and bomb
 */
let SetType = {
    AND: "and",
    OR: "or"
}

/**
 * Item sets for doing the quick putaway glitch
 * Uses its own function in ItemData based om the given properties
 * Below is each setting and what is needed to perform it/what it's used for
 * - LEDGE_QPA: Shallow ledge and jumpslash
 * - HOVER_BOOTS_QPA: Any ledge and hover boots
 * - TALL_TORCH_QPA: Ledge QPA + any sword weapon that isn't Kokiri Sword
 * - MUD_WALLS_QPA: Ledge QPA + blue fire arrows setting
 * - HIGH_SWITCH_QPA: Ledge QPA + sticks or Biggoron's sword (as they are two-handed)
 * - CUTSCENE_ITEM_QPA: Sticks + usable cutscene item (trade item with the "can't use this now" cutscene, or magic beans)
 */
let QPAItemSets = {
	LEDGE_QPA: (age) => Settings.GlitchesToAllow.qpa &&
        ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
	HOVER_BOOTS_QPA: (age) => Settings.GlitchesToAllow.qpa &&
        ItemData.canUse(age, [Equipment.HOVER_BOOTS, ItemSets.SWORDS, ItemSets.SHIELDS]),
	TALL_TORCH_QPA: (age) => Settings.GlitchesToAllow.qpa && (
            age === Age.CHILD
                ? ItemData.canUse(age, [Items.DEKU_STICK, ItemSets.SHIELDS])
                : ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS])
        ),
	MUD_WALLS_QPA: (age) => Settings.GlitchesToAllow.qpa &&
        Settings.RandomizerSettings.iceArrowsActAsBlueFire &&
        ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
	HIGH_SWITCH_QPA: (age) => Settings.GlitchesToAllow.qpa &&
        ItemData.canUseAny(age, [Items.DEKU_STICK, Equipment.BIGGORONS_SWORD]) &&
        ItemData.canUse(age, ItemSets.SHIELDS),
	CUTSCENE_ITEM_QPA: (age) => {
        if (!Settings.GlitchesToAllow.qpa || !ItemData.canUse(age, Items.DEKU_STICK)) {
            return false;
        }

        // We're not checking whether you can USE it, we just need it in the pause menu
        let hasMagicItem = Items.DINS_FIRE.playerHas || 
            Items.FARORES_WIND.playerHas || 
            Items.NAYRUS_LOVE.playerHas;

        if (age === Age.CHILD) {
            return Items.MAGIC_BEAN.playerHas ||
                ItemData.hasChildTradeItem() || 

                // You can't equip swap from the left, since you NEED stick equipped, so the
                // only items you can do it with are the magic spells
                (ItemData.hasAdultTradeItem() && hasMagicItem);
        } 

        // Since stick NEEDS to be equipped, you can't equip swap a child trade item/magic beans for this
        // We need to check whether you can equip the adult trade item AND a stick at the same time, therefore
        // you MUST equip swap using a magic item
        return ItemData.hasAdultTradeItem() && hasMagicItem;
    }
};

/**
 * Item sets for settings
 */
let SettingSets = {
    OPEN_DEKU: () => !Settings.RandomizerSettings.closedDeku,
    OPEN_FOREST: () => Settings.RandomizerSettings.openForest,
    VANILLA_KAKARIKO_GATE: () => Settings.RandomizerSettings.openKakariko === OpenKakarikoSettings.VANILLA,
    OPEN_KAKARIKO_GATE: () => Settings.RandomizerSettings.openKakariko === OpenKakarikoSettings.OPEN,
    KAKARIKO_GATE_OPENS_WITH_LETTER: () => Settings.RandomizerSettings.openKakariko === OpenKakarikoSettings.OPEN_WITH_ZELDAS_LETTER,
    OPEN_ZORAS_FOUNTAIN: () => Settings.RandomizerSettings.openZorasFountain === OpenZorasFountainSettings.ALL,
    OPEN_ADULT_ZORAS_FOUNTAIN: () => Settings.RandomizerSettings.openZorasFountain !== OpenZorasFountainSettings.VANILLA,
    OPEN_GERUDO_FORTRESS: () => Settings.RandomizerSettings.openGerudosFortress === OpenGerudosFortressSettings.OPEN,
    SHUFFLE_DUNGEON_ENTRANCES: () => Settings.RandomizerSettings.shuffleDungeonEntrances,
    SHUFFLE_INTERIOR_ENTRANCES: () => Settings.RandomizerSettings.shuffleInteriorEntrances,
    VANILLA_INTERIOR_ENTRANCES: () => !Settings.RandomizerSettings.shuffleInteriorEntrances,
    SHUFFLE_OVERWORLD_ENTRANCES: () => Settings.RandomizerSettings.shuffleOverworldEntrances,
    VANILLA_OVERWORLD_ENTRANCES: () => !Settings.RandomizerSettings.shuffleOverworldEntrances,
    SHUFFLE_GROTTO_ENTRANCES: () => Settings.RandomizerSettings.shuffleGrottoEntrances,
    VANILLA_GROTTO_ENTRANCES: () => !Settings.RandomizerSettings.shuffleGrottoEntrances,
    SHUFFLE_THIEVES_HIDEOUT: () => Settings.RandomizerSettings.shuffleThievesHideout,
    VANILLA_THIEVES_HIDEOUT: () => !Settings.RandomizerSettings.shuffleThievesHideout
};

/**
 * Sets for planted magic beans
 */
let BeanSets = {
    KOKIRI_FOREST: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Kokiri Forest", "main", "Soft Soil"),
    LOST_WOODS_BRIDGE: (age) =>
        age === Age.ADULT && Data.isBeanPlanted("Lost Woods", "skullKidAndBridge", "Soft Soil by Bridge"),
    LOST_WOODS_FOREST_STAGE: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Lost Woods", "secondHalf", "Soft Soil by Forest Stage"),
    GRAVEYARD: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Graveyard", "main", "Soft Soil"),
    DEATH_MOUNTAIN_TRAIL: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Death Mountain Trail", "main", "Soft Soil"),
    DEATH_MOUNTAIN_CRATER: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Death Mountain Crater", "bottom", "Soft Soil"),
    LAKE_HYLIA: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Lake Hylia", "main", "Soft Soil"),
    DESERT_COLOSSUS: (age) => 
        age === Age.ADULT && Data.isBeanPlanted("Desert Colossus", "main", "Soft Soil")
};

/**
 * Item sets for performing glitches
 */
let GlitchItemSets = {
	// Common
	WEIRD_SHOT: (age) => Data.canWeirdShot(age),
    LONGSHOT_WEIRD_SHOT: (age) => Data.canWeirdShot(age, UpgradedItems.LONGSHOT),
	MEGA_FLIP:  (age) => Data.canMegaFlip(age),
    CHU_MEGA_FLIP: (age) => ItemData.canUse(age, [Items.BOMBCHU, GlitchItemSets.MEGA_FLIP]),
    STAIRCASE_HOVER: (age) => Data.canStaircaseHover(age),
    BOMB_SUPERSLIDE_WITH_HOVERS: (age) => Data.canBombSuperslideWithHovers(age),
    HAMMER_SUPERSLIDE_WITH_HOVERS: (age) => Data.canHammerHoverBootsSuperslide(age),
	GROUND_JUMP: (age) => Data.canGroundJumpWithBomb(age),
    GROUND_JUMP_INCLUDING_BOMB_FLOWER: (age) => Data.canGroundJumpWithBomb(age, true),
    OCARINA_OR_DIFFICULT_OCARINA_ITEMS: () => Items.OCARINA.playerHas || (
        Settings.GlitchesToAllow.ocarinaItems &&
        Settings.GlitchesToAllow.difficultOcarinaItems && 
        Data.hasOcarinaItemsBottle()),
	BOOMERANG_THROUGH_WALLS: (age) => 
        Settings.GlitchesToAllow.boomerangThroughWalls && 
        ItemData.canUse(age, Items.BOOMERANG),
    BOOMERANG_TRICK_THROWS: (age) => 
        Settings.GlitchesToAllow.difficultBoomerangTrickThrows && 
        ItemData.canUse(age, Items.BOOMERANG),

	// Forest / Woods
    POKEY_SKIP: (age) => 
        Settings.GlitchesToAllow.pokeySkip && 
        ItemData.canUse(age, [ItemSets.SWORDS, Equipment.DEKU_SHIELD]),
	HOUSE_OF_TWINS_SKULL_WITH_HOVERS: (age) => 
			Settings.GlitchesToAllow.houseOfTwinsSkullWithHovers && 
			ItemData.canUse(age, Equipment.HOVER_BOOTS),
    LW_ADULT_BRIDGE_FROM_TOP: (age) => 
        age === Age.ADULT &&
        Settings.GlitchesToAllow.lwAdultBridgeFromTop &&
        ItemData.canUse(age, ItemSets.SHIELDS),
    LW_ADULT_BRIDGE_WITH_HOOKSHOT: (age) =>
        Settings.GlitchesToAllow.lwAdultBridgeWithHookshot &&
        ItemData.canUse(age, Items.HOOKSHOT),
    CHILD_ZR_FROM_LW_WITHOUT_SCALE: (age) => 
        age === Age.CHILD && 
        Settings.GlitchesToAllow.zorasRiverScalelessChild && 
        ItemData.canUse(age, ItemSets.ACUTE_ANGLE_SWORDS),
    ADULT_ZR_FROM_LW_WITHOUT_SCALE: (age) => Settings.GlitchesToAllow.zorasRiverScalelessAdult && age === Age.ADULT,
	MIDO_SKIP: () => Settings.GlitchesToAllow.midoSkip,
    LOST_WOODS_SKULL_WITHOUT_BEAN: (age) =>
        Settings.GlitchesToAllow.lwSkullWithoutBean &&
        ItemData.canUse(age, [
            [SetType.OR, Items.DINS_FIRE, Items.FAIRY_BOW, Items.BOMBCHU, UpgradedItems.LONGSHOT], // Kill skulltula
            [SetType.OR, Items.HOOKSHOT, GlitchItemSets.BOOMERANG_TRICK_THROWS] // Get token
        ]),
    PRESSURE_JUMP: (age) => Settings.GlitchesToAllow.lwBridgePressureJump && Items.BOMB.playerHas,

    // Castle
    DOUBLE_DEFENSE_EARLY: (age) => Settings.GlitchesToAllow.doubleDefenseEarly &&
        ItemData.canUse(age, ItemSets.EXPLOSIVES) ||
        ItemData.canUse(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]),

	// Kakariko/Graveyard
    KAK_SHOP_CLIPS: (age) => 
        Settings.GlitchesToAllow.kakShopClips && 
        ItemData.canUse(age, ItemSets.ACUTE_ANGLE_SWORDS),
    CHILD_WELL_WITH_CUCCO: (age) => age === Age.CHILD && 
        Settings.GlitchesToAllow.botwAsChildWithCucco && 
        ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
    ADULT_WELL_WITH_CUCCO: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.botwAsAdultWithCucco &&
        ItemData.canUse(age, [UpgradedItems.LONGSHOT, Equipment.HOVER_BOOTS]),
	WINDMILL_HP_WITH_NOTHING: () => Settings.GlitchesToAllow.windmillHPWithNothing,
	HOOKSHOT_JUMP: (age) => 
        Settings.GlitchesToAllow.hookshotJump && 
        ItemData.canUse(age, Items.HOOKSHOT),
	OLD_SHADOW_EARLY: (age) => 
        Settings.GlitchesToAllow.oldShadowEarly && 
        ItemData.canUse(age, [ItemSets.EXPLOSIVES, ItemSets.SHIELDS]),
	UNLOAD_GRAVE: () => Settings.GlitchesToAllow.unloadGrave,

	// Death Mountain/Goron
	DMT_CLIP_TO_CHEST: (age) => 
        Settings.GlitchesToAllow.dmtClipToChestByGoron && 
        ItemData.canUse(age, ItemSets.SWORDS),
	DMT_BOMB_FLOWER_TO_CHEST: (age) => 
        Settings.GlitchesToAllow.dmtBombFlowerChestByGoron && 
        ItemData.canUse(age, Equipment.STRENGTH),
	DMT_SKULLS_WITHOUT_HAMMER: () => Settings.GlitchesToAllow.dmtSkullsWithoutHammer,
    DMT_CLIMB_WITH_HOVER_BOOTS: (age) => 
        Settings.GlitchesToAllow.dmtClimbWithHoverBoots && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
	HOVER_TO_VOLCANO_HP: (age) => 
        Settings.GlitchesToAllow.hoverToVolcanoHP && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
	URN_WITH_CHUS: (age) => 
        Settings.GlitchesToAllow.goronSpinningUrnWithChus && 
        ItemData.canUse(age, [Items.BOMBCHU, Items.DEKU_NUT]),
    CHILD_DMC_FAIRY: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.childDoubleMagicFairy,

	// Zora/Lake
    ADULT_WATERFALL_HP_JUMP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.adultWaterfallHPJump,
	CUCCO_TO_ZORAS_DOMAIN: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.cuccoToZorasDomain,
	HOVERS_TO_ZORAS_DOMAIN: (age) => 
        Settings.GlitchesToAllow.hoversToZorasDomain && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
	MEGA_SIDEHOP_TO_ZORAS_DOMAIN: (age) => 
        Settings.GlitchesToAllow.megasidehopToZorasDomain && 
        ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.SWORDS, Items.BOMBCHU]),
    CHILD_KING_ZORA_SKIP: (age) =>
        Settings.GlitchesToAllow.chuZoraSkip && 
        ItemData.canUse(age, [ItemSets.SWORDS, Equipment.DEKU_SHIELD, Items.BOMBCHU]),
    ADULT_KING_ZORA_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.clipZoraSkip,
    ADULT_DOMAIN_TO_LAKE: (age) => age === Age.ADULT && 
        Settings.GlitchesToAllow.adultDomainToLake,
    BLUE_FIRE_SHOP_SKIP: () => Settings.GlitchesToAllow.blueFireShopSkip,
    CHILD_JABU_FISHLESS: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.jabuFishless &&
        ItemData.canUse(age, ItemSets.SWORDS),
    ADULT_JABU: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.enterJabuAsAdult &&
        ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMBCHU]),
    LAKE_TREE_SKULL_WITH_HOOKSHOT: (age) => 
        Settings.GlitchesToAllow.skullInTreeWithHookshot && 
        ItemData.canUse(age, [Items.HOOKSHOT, ItemSets.SHIELDS]),
    CHILD_LAKESIDE_LAB_CLIP: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.childLakesideLabClip && 
        Data.canShieldTurn(age) &&
        ItemData.canUse(age, ItemSets.SWORDS),
    ADULT_LAKESIDE_LAB_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.adultLakesideLabClip && 
        ItemData.canUseAny(age, [ItemSets.SHIELDS, Equipment.HOVER_BOOTS]),
    ADULT_MEGA_FLIP_CLIP_TO_DOMAIN: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.adultDomainMegaflipClip && 
        ItemData.canUse(age, GlitchItemSets.MEGA_FLIP),
    ADULT_WATER_TEMPLE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.adultWaterTempleClip,

    // Gerudo
    CUCCO_JUMP: (age) => 
        Settings.GlitchesToAllow.cuccoJump &&
        ItemData.canUse(age, [ItemSets.SWORDS]),
    CROSS_GV_BRIDGE_WITH_HOOKSHOT: (age) =>
        Settings.GlitchesToAllow.gvCrossBridgeWithHookshot && 
        ItemData.canUse(age, [ItemSets.SHIELDS, Items.HOOKSHOT]),
    GF_JUMP_TO_MIDDLE_FLOOR: () => Settings.GlitchesToAllow.gfJumpToMiddleFloor,
    GF_HOOKSHOT_TO_ABOVE_LINKS_JAIL: (age) => 
        Settings.GlitchesToAllow.gfHookshotToAboveLinksJail &&
        ItemData.canUse(age, Items.HOOKSHOT),
    GF_CHILD_GATE_SKIP: (age) => Settings.GlitchesToAllow.gerudoGateSkipAsChild && age === Age.CHILD,
    GF_CHILD_JUMP_BY_TOP_KITCHEN: (age) => Settings.GlitchesToAllow.gfChildJumpByTopKitchen && age === Age.CHILD,
    GF_ADULT_GATE_SKIP: (age) => 
        Settings.GlitchesToAllow.gerudoGateSkipAsAdult &&
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
    GF_PASS_KITCHEN_GUARDS: () => Settings.GlitchesToAllow.gfPassKitchenGuards,
    GTG_AS_CHILD: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.gtgChildAllowed,
    GTG_ADULT_LEDGE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgAdultNoCard,

    // Desert
    HW_ITEMLESS_SAND_PIT: () => Settings.GlitchesToAllow.itemlessSandPit,
    BACKWARDS_WASTELAND: () => Settings.GlitchesToAllow.backwardsWasteland,
    WASTELAND_NO_LENS: () => Settings.GlitchesToAllow.wastelandNoLens,

    // Deku Tree
    DEKU_B1_SKIP: (age) => age === Age.CHILD && Settings.GlitchesToAllow.dekuB1Skip,

    // Dodongo's Cavern
    DODONGO_EARLY_SWITCH: (age) => 
        Settings.GlitchesToAllow.dodongoSwitchEarly && 
        ItemData.canUse(age, [Items.BOMBCHU, Equipment.DEKU_SHIELD]),

    // Forest
    FOREST_BK_SKIP: (age) => 
        Settings.GlitchesToAllow.forestBKSkip &&
        ItemData.canUse(age, Items.HOOKSHOT),

    // Spirit
    MQ_SPIRIT_STATUE_ROOM_TORCHES_WITH_DINS: (age) => 
        Settings.GlitchesToAllow.mqSpiritStatueTorchesWithDins &&
        ItemData.canUse(age, Items.DINS_FIRE)
};

/**
 * Item sets for checking if a certain item was obtained
 * This makes it easier to keep things in a single place in case an item location changes regions or names
 */
let ItemLocationSets = {
    // Kokiri Forest
    MOVE_MIDO: () => Data.itemLocationObtained("Kokiri Forest", "main", "Move Mido"),

    // Castle / Market / Ranch
    GIFT_FROM_MALON: () => Data.itemLocationObtained("Castle", "hyruleCastle", "Gift from Malon"),
    WAKE_UP_TALON: () => Data.itemLocationObtained("Castle", "hyruleCastle", "Wake up Talon"),
    UNLOCK_COW_IN_HOUSE: () => Data.itemLocationObtained("Lon Lon Ranch", "main", "Unlock Cow in House"),

    // Mask Sales
    SELL_KEATON_MASK: () => Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask"),
    SELL_SKULL_MASK: () => Data.itemLocationObtained("Lost Woods", "skullKidAndBridge", "Sell Skull Mask"),
    SELL_SPOOKY_MASK: () => Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask"),
    SELL_BUNNY_HOOD: () => Data.itemLocationObtained("Hyrule Field", "main", "Sell Bunny Hood"),

    // Kakariko / Graveyard
    SHOW_GUARD_LETTER: () => Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter"),
    DRAIN_WELL_WATER: () => Data.itemLocationObtained("Windmill-Kak Potion", "windmill", "Drain Well Water"),

    // Death Mountain / Goron
    DMT_ROCKS_BLOCKING_TOP_PATH: () => Data.itemLocationObtained("Death Mountain Trail", "main", "Break Rocks Blocking Top Path"),
    ROCKS_BLOCKING_LOST_WOODS: () => Data.itemLocationObtained("Goron City", "lostWoodsRocks", "Rocks Blocking Lost Woods"),

    // Zora / Lake
    ROCKS_BLOCKING_ZORAS_RIVER: () => Data.itemLocationObtained("Zora's River", "downstream", "Break Rocks Blocking Path"),
    MOVE_KING_ZORA: () => Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora"),
    THAW_KING_ZORA: () => Data.itemLocationObtained("Zora's Domain", "main", "Thaw King Zora"),
    PLAY_SONG_FOR_BONOORU: () => Data.itemLocationObtained("Lake Hylia", "main", "Play Song for Bonooru"),

    // Desert
    ITEM_FROM_GERUDO: () => Data.itemLocationObtained("Thieves' Hideout", "main", "Item From Gerudo"),
    GF_OPENED_GATE: () => Data.itemLocationObtained("Gerudo Fortress", "main", "Opened Gate"),

    // Deku Tree
    DEKU_WEB_BURNED: () => Data.itemLocationObtained("Deku Tree", "basementTop", "Burn Basement Web"),
    DEKU_OPENED_BOSS_DOOR: () => Data.itemLocationObtained("Deku Tree", "lowerBasement", "Open Boss Door"),

    // Dodongo's Cavern
    DODONGO_OPENED_FIRST_WALL: () => Data.itemLocationObtained("Dodongo's Cavern", "main", "Opened First Wall"),

    // Jabu
    MQ_JABU_ELEVATOR_ROOM_CHEST: () => Data.itemLocationObtained("Jabu Jabu's Belly", "elevatorRoom", "Spawn Chest in Upper Elevator Room"),
    MQ_JABU_RED_TENTACLES_DEFEATED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "afterRedTentaclesDefeated", "Red Tentacles Defeated"),
    MQ_JABU_GREEN_TENTACLE_DEFEATED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "afterGreenTentacleDefeated", "Green Tentacle Defeated"),
    MQ_JABU_ELEVATOR_LOWERED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "wigglerRoomAfterBigOcto", "Elevator Lowered"),

    // Water Temple
    DEFEATED_MORPHA:() => Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp")
};

/**
 * Item sets that check various game states
 */
let GameStateSets = {
    // Note: this checks the Deku Tree boss (not where the tree was shuffled to), unsure if that's correct
    DEFEATED_DEKU_TREE_BOSS: () => {
        let bossEntranceGroup = Data.getEntranceGroup(OwExits["Deku Tree"].Boss);
        return bossEntranceGroup?.buttons && bossEntranceGroup.buttons["Blue Warp"].completed;
    },
    CAN_PLAY_SONGS: () => Data.canPlaySongs(),
    CAN_RIDE_EPONA: (age) => Data.canRideEpona(age),
    CAN_HOOK_SCARECROW: (age) => Data.canHookScarecrow(age),
    CAN_LONGSHOT_SCARECROW: (age) => Data.canHookScarecrow(age, true),
    ARE_GERUDO_GUARDS_TAME: () => Data.areGerudoGuardsTame(),
    CAN_STUN_KITCHEN_GUARDS: (age) => Data.canStunKitchenGuards(age),
    CAN_STUN_OR_PASS_GUARDS_AT_DISTANCE: (age) => Data.canStunOrPassGuardsAtDistance(age),
    HAS_BOTTLE: () => Data.hasBottle()
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
		items: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Items.DEKU_STICK, Items.MEGATON_HAMMER]
	},
	ACUTE_ANGLE_SWORDS: {
		isItemSet: true,
		items: [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Items.DEKU_STICK]
	},
	SHIELDS: {
		isItemSet: true,
		items: [Equipment.DEKU_SHIELD, Equipment.HYLIAN_SHIELD, Equipment.MIRROR_SHIELD]
	},
	DAMAGING_ITEMS: {
		isItemSet: true,
		items: [		
			Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Equipment.KOKIRI_SWORD, Items.DEKU_STICK,
			Items.DINS_FIRE, Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER,
			Items.BOOMERANG, Items.FAIRY_SLINGSHOT
		]
	},
	STUNNABLE_ENEMY_KILL_ITEMS: {
		isItemSet: true,
		items: [
			Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Equipment.KOKIRI_SWORD, Items.DEKU_STICK, Items.FAIRY_SLINGSHOT,
			Items.DINS_FIRE, Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER
		]
	},
	FREEZARD_KILL_ITEMS: {
		isItemSet: true,
		items: [
			Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Items.DEKU_STICK, Items.MEGATON_HAMMER,
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
	},
	MUD_WALL_OR_QPA_ITEMS: {
		isItemSet: true,
		items: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER, Items.BLUE_FIRE, Items.ICE_ARROW, QPAItemSets.MUD_WALLS_QPA]
	}
};