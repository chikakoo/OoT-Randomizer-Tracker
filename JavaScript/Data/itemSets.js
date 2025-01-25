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
    VANILLA_DUNGEON_ENTRANCES: () => !Settings.RandomizerSettings.shuffleDungeonEntrances,
    SHUFFLE_INTERIOR_ENTRANCES: () => Settings.RandomizerSettings.shuffleInteriorEntrances,
    VANILLA_INTERIOR_ENTRANCES: () => !Settings.RandomizerSettings.shuffleInteriorEntrances,
    SHUFFLE_OVERWORLD_ENTRANCES: () => Settings.RandomizerSettings.shuffleOverworldEntrances,
    VANILLA_OVERWORLD_ENTRANCES: () => !Settings.RandomizerSettings.shuffleOverworldEntrances,
    SHUFFLE_GROTTO_ENTRANCES: () => Settings.RandomizerSettings.shuffleGrottoEntrances,
    VANILLA_GROTTO_ENTRANCES: () => !Settings.RandomizerSettings.shuffleGrottoEntrances,
    SHUFFLE_THIEVES_HIDEOUT: () => Settings.RandomizerSettings.shuffleThievesHideout,
    VANILLA_THIEVES_HIDEOUT: () => !Settings.RandomizerSettings.shuffleThievesHideout,
    SHUFFLE_SILVER_RUPEES: () => Settings.RandomizerSettings.shuffleSilverRupees,
    VANILLA_SILVER_RUPEES: () => !Settings.RandomizerSettings.shuffleSilverRupees
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
    PROJECTILE_WEIRD_SHOT: (age) => Data.canWeirdShot(age, ItemSets.PROJECTILES),
	MEGA_FLIP: (age) => Data.canMegaFlip(age),
    CHU_MEGA_FLIP: (age) => ItemData.canUse(age, [Items.BOMBCHU, GlitchItemSets.MEGA_FLIP]),
    STAIRCASE_HOVER: (age) => Data.canStaircaseHover(age),
    BOMB_SUPERSLIDE: (age) => Data.canBombSuperslide(age),
    BOMB_SUPERSLIDE_WITH_HOVERS: (age) => Data.canBombSuperslideWithHovers(age),
    HAMMER_SUPERSLIDE_WITH_HOVERS: (age) => Data.canHammerHoverBootsSuperslide(age),
	GROUND_JUMP: (age) => 
        Settings.GlitchesToAllow.groundJump && 
        ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
    GROUND_JUMP_INCLUDING_BOMB_FLOWER: (age) => 
        Settings.GlitchesToAllow.groundJump &&
        ItemData.canUse(age, ItemSets.SHIELDS) &&
        ItemData.canUseAny(age, [ItemSets.EXPLOSIVES, Equipment.STRENGTH]), // Includes the chu in front of bomb flower trick
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
    FLAME_STORAGE: (age) =>
        Settings.GlitchesToAllow.flameStorage &&
        ItemData.canUse(age, Items.DEKU_STICK),

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
    MQ_DEKU_SIDE_ROOM_ROCKS_WITH_HAMMER: (age) =>
        Settings.GlitchesToAllow.mqDekuSideRoomRocksHammerOnly &&
        ItemData.canUse(age, Items.MEGATON_HAMMER),
    MQ_DEKU_SIDE_ROOM_ROCKS_WITH_BOMB: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqDekuSideRoomRocksBombsOnly &&
        ItemData.canUse(age, Items.BOMB),

    // Dodongo's Cavern
    DODONGO_HEAD_WITH_CHUS: (age) =>
        Settings.GlitchesToAllow.dodongoOpenHeadWithBombchus &&
        ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMBCHU]),
    DODONGO_SCARECROW_SKULL_EARLY: () => Settings.GlitchesToAllow.dodongoScarecrowSkullEarly,
    DODONGO_TRIGGER_STAIRS_WITH_BOW: (age) =>
        Settings.GlitchesToAllow.dodongoTriggerStairsWithBow && 
        ItemData.canUse(age, Items.FAIRY_BOW),
    DODONGO_ADULT_JUMP_TO_BOMB_CHEST: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.dodongoAdultJumpToBombChest,
    DODONGO_ADULT_BLADE_ROOM_MUD_WALL_WITH_STRENGTH: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.dodongoAdultBladeMudWallWithStrength && 
        ItemData.canUse(age, Equipment.STRENGTH),
    MQ_DODONGO_EARLY_SWITCH: (age) => 
        Settings.GlitchesToAllow.mqDodongoRecoilSlashToPlatform && 
        ItemData.canUse(age, ItemSets.SWORDS),

    // Jabu
    JABU_BLUE_SWITCH_SKIP: (age) => 
        Settings.GlitchesToAllow.jabuBlueSwitchSkip &&
        ItemData.canUse(age, ItemSets.SWORDS) &&
        (age === Age.CHILD || ItemData.canUse(age, ItemSets.SHIELDS)),
    JABU_BOSS_SWITCH_WITH_EXPLOSIVES: (age) => 
        Settings.GlitchesToAllow.jabuBossSwitchWithExplosives && (
            (age === Age.CHILD && Items.BOMBCHU.playerHas) ||
            (age == Age.ADULT && ItemData.canUse(age, [Items.BOMB, Equipment.HOVER_BOOTS]))),

    // Forest Temple
    FOREST_FIRST_SKULL_WITH_BOMB: (age) => 
        Settings.GlitchesToAllow.forestFirstSkullWithBomb && 
        ItemData.canUse(age, Items.BOMB),
    FOREST_LEDGE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.forestLedgeClip,
    FOREST_GREEN_POE_EARLY: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.forestGreenPoeEarly &&
        ItemData.canUse(age, [Items.BOMB, Equipment.HOVER_BOOTS, ItemSets.SHIELDS]),
    FOREST_JUMP_TO_TOP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.forestJumpToTop &&
        ItemData.canUse(age, [Equipment.HOVER_BOOTS, Items.BOMB]),
    FOREST_HOOKSHOT_TO_WELL_SWITCH: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.forestHookshotToWellSwitch &&
        ItemData.canUse(age, Items.HOOKSHOT),
    FOREST_BOOMERANG_SKULL_ON_LEDGE: (age) =>
        Settings.GlitchesToAllow.forestBoomerangSkullOnLedge &&
        ItemData.canUse(age, Items.BOOMERANG),
    FOREST_LEDGE_WITH_HOVER_BOOTS: (age) =>
        Settings.GlitchesToAllow.forestLedgeWithHovers &&
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
    FOREST_BLOCK_SKIP: (age) => age === Age.ADULT && 
        Settings.GlitchesToAllow.forestBlockSkip && 
        ItemData.canUse(age, GlitchItemSets.GROUND_JUMP),
    FOREST_BK_SKIP: (age) => 
        Settings.GlitchesToAllow.forestBKSkip &&
        ItemData.canUse(age, Items.HOOKSHOT),
    MQ_FOREST_HOVER_BOOTS_TO_DOOR_FRAME: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqForestHoverBootsToDoorFrame &&
        ItemData.canUse(age, Equipment.HOVER_BOOTS),

    // Fire Temple
    FIRE_FIRST_ROOM_PILLAR_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.fireFirstRoomPillarSkip,
    FIRE_SOT_BLOCK_JUMP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.fireSoTBlockJump,
    FIRE_JAIL_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.fireJailClip &&
        ItemData.canUse(age, Items.BOMB),
    FIRE_ESCAPE_MAP_ENCLOSURE: (age) => age === Age.ADULT && 
        Settings.GlitchesToAllow.fireCraterRoomKeySkip &&
        ItemData.canUse(age, [Items.MEGATON_HAMMER, Equipment.HOVER_BOOTS]),
    FIRE_BK_SKIP_FROM_FIREWALL_MAZE: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.fireBKSkipFromFireWallMaze,
    FIRE_FIREWALL_SKIP: () => Settings.GlitchesToAllow.fireWallSkip,
    FIRE_SOT_BLOCK_FROM_HAMMER_CHEST: () => Settings.GlitchesToAllow.fireJumpDownToSoTBlock,
    MQ_FIRE_BOSS_ROOM_JAIL_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqBossRoomGoronBombClip && 
        ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]),

    // Water Temple
    WATER_BOMBABLE_WALL_EARLY: () => Settings.GlitchesToAllow.waterBombableWallEarly,
    WATER_HOOKSHOT_TO_FLOOR_1: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterHookshotToFloor1 &&
        ItemData.canUse(age, Items.HOOKSHOT),
    WATER_JUMP_TO_HIGH_WATER: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterHighWaterJump,
    WATER_EYE_SWITCH_GATE_FROM_TOP: (age) => age === Age.ADULT && 
        Settings.GlitchesToAllow.waterEyeSwitchGateFromTop,
    WATER_DRAGON_ROOM_CHEST_WITH_CHU: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterDragonChestWithChu &&
        Items.BOMBCHU.playerHas,
    WATER_JUMP_TO_WATERFALL_LEDGE: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterBKShortcut,
    MQ_WATER_WATERFALL_ROOM_WITH_HOVER_BOOTS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqWaterWaterfallWithHovers &&
        ItemData.canUse(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]),

    // Shadow Temple
    SHADOW_SCYTHE_SILVER_RUPEE_WITH_NOTHING: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowSilverRupeeWithNothing,
    SHADOW_GATE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowGateClip &&
        ItemData.canUse(age, ItemSets.SHIELDS),
    SHADOW_JUMP_TO_BOAT_ROOM_LEDGE: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowUpperBoatRoomJump &&
        ItemData.canUse(age, [Equipment.HOVER_BOOTS, ItemSets.SHIELDS]),
    SHADOW_PIT_ROOM_SILVER_RUPEES_SKIP: (age) =>
        Settings.GlitchesToAllow.shadowPitRoomSilverRupeeSkip && 
        ItemData.canUse(age, ItemSets.SWORDS),
    SHADOW_BACKFLIP_ON_SPIKES: () => Settings.GlitchesToAllow.shadowBackFlipOnSpikes,
    SHADOW_GIANT_SKULLS_WITH_CHU: (age) => 
        Settings.GlitchesToAllow.shadowGiantSkullsWithChus &&
        ItemData.canUse(age, Items.BOMBCHU),
    SHADOW_LOWER_BRIDGE_WITH_CHUS: (age) => 
        Settings.GlitchesToAllow.shadowChuBombFlowers &&
        ItemData.canUse(age, Items.BOMBCHU),

    // Spirit Temple
    SPIRIT_BLOCK_SKIP_WITH_HOVER_BOOTS: (age) => 
        Settings.GlitchesToAllow.spiritBlockSkipWithHovers && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
    SPIRIT_BLOCK_SKIP_WITH_BOMB_PUSH: (age) =>
        Settings.GlitchesToAllow.spiritBlockSkipWithBombPush &&
        ItemData.canUse(age, [ItemSets.SHIELDS, Items.BOMB]),
    SPIRIT_STATUE_ROOM_JUMPS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.spiritStatueRoomJumps,
    SPIRIT_SUPERSLIDE_TO_MIRROR_SHIELD: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.spiritSuperslideToMirrorShield &&
        ItemData.canUse(age, [Items.BOMB, Equipment.HOVER_BOOTS, ItemSets.SHIELDS]),
    SPIRIT_BK_CHEST_WITH_NOTHING: () => Settings.GlitchesToAllow.spiritBKTrick,
    MQ_SPIRIT_STATUE_ROOM_TORCHES_WITH_DINS: (age) => 
        Settings.GlitchesToAllow.mqSpiritStatueTorchesWithDins &&
        ItemData.canUse(age, Items.DINS_FIRE),

    // Ice Cavern
    ICE_LEDGE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.iceLedgeClip,
    ICE_TRIPLE_SLASH_CLIP: (age) =>
        Settings.GlitchesToAllow.iceTripleSlashClips &&
        ItemData.canUseAny(age, [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD]) &&
        ItemData.canUse(age, ItemSets.FIRST_PERSON_ITEMS),
    ICE_BLOCK_ROOM_SKULL_WITH_HOVER_BOOTS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.iceBlockSkullWithHovers &&
        ItemData.canUse(age, Equipment.HOVER_BOOTS) &&
        ItemData.canUseAny(age, [ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE]),

    // Bottom of the Well
    WELL_ACTOR_GLITCH: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.botwActorGlitch,
    WELL_VINE_CLIP: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.botwVineClip &&
        ItemData.canUse(age, Equipment.KOKIRI_SWORD),

    // Gerudo Training Ground
    GTG_CHILD_VINE_CLIP: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.gtgChildVineClips &&
        ItemData.canUse(age, [Items.BOMBCHU, Equipment.DEKU_SHIELD]),
    GTG_FIRE_WALL_SKIP: () => Settings.GlitchesToAllow.gtgSlopesRoomFireWallSkip,
    GTG_WALL_MASTER_TO_SILVER_RUPEE: () => 
        Settings.GlitchesToAllow.gtgSlopesRoomWallmasterToRupee &&
        (
            !Settings.RandomizerSettings.shuffleSilverRupees ||
            !ItemData.checkSilverRupeeRequirement("Training Grounds", 0) // Can't use SilverRupeeSets due to circular logic (same index in MQ)
        ),
    GTG_HAMMER_HOVER_BOOTS_SILVER_BLOCK_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgSilverBlockSkipWithHammerSuperslide &&
        ItemData.canUse(age, GlitchItemSets.HAMMER_SUPERSLIDE_WITH_HOVERS),
    GTG_SILVER_BLOCK_ROOM_EXIT_WITH_HOVERS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgSilverBlockRoomExitWithHovers && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
    GTG_EYE_STATUE_WONDERITEM_JUMPSLASH: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgEyeStatueWonderItemJumpslash,

    // Ganon's Castle
    GANON_TRIAL_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.ganonTrialSkip,
    GANON_SHADOW_NO_LENS: () => Settings.GlitchesToAllow.ganonShadowTrialLensless,
    GANON_SPIRIT_HOOKSHOTLESS: (age) => 
        Settings.GlitchesToAllow.ganonSpiritHookshotless &&
        ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
    GANON_LIGHT_SUPERSLIDE_SKIP: (age) => age === Age.ADULT && 
        Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip &&
        ItemData.canUse(age, [Items.BOMB, ItemSets.SHIELDS]),
    GANON_LIGHT_ESS_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.ganonLightTrailEssSkip &&
        ItemData.canUse(age, ItemSets.EXPLOSIVES)
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
    MQ_DEKU_WEB_BURNED: () => Data.itemLocationObtained("Deku Tree", "upperBasement", "Burn Basement Web"),

    // Dodongo's Cavern
    DODONGO_OPENED_FIRST_WALL: () => Data.itemLocationObtained("Dodongo's Cavern", "main", "Opened First Wall"),

    // Jabu
    MQ_JABU_OPENED_FIRST_ROOR: () => Data.itemLocationObtained("Jabu Jabu's Belly", "main", "Opened First Door"),
    MQ_JABU_ELEVATOR_ROOM_CHEST: () => Data.itemLocationObtained("Jabu Jabu's Belly", "elevatorRoom", "Spawn Chest in Upper Elevator Room"),
    MQ_JABU_RED_TENTACLES_DEFEATED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "afterRedTentaclesDefeated", "Red Tentacles Defeated"),
    MQ_JABU_GREEN_TENTACLE_DEFEATED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "afterGreenTentacleDefeated", "Green Tentacle Defeated"),
    MQ_JABU_ELEVATOR_LOWERED: () => Data.itemLocationObtained("Jabu Jabu's Belly", "wigglerRoomAfterBigOcto", "Elevator Lowered"),

    // Forest Temple
    FOREST_OPENED_LOBBY_DOOR: () => Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby"),
    MQ_FOREST_DID_NOT_CLEAR_UPPER_STALFOS_ROOM: () => !Data.itemLocationObtained("Forest Temple", "poeRooms", "Chest in Stalfos Room"),

    // Fire Temple
    FIRE_OPENED_BOTTOM_LOBBY_DOOR: () => Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby"),

    // Water Temple
    WATER_LOWERED_WATER_LEVEL: () => Data.itemLocationObtained("Water Temple", "lowWaterLevel", "Lower Water Level"),
    WATER_OPENED_CENTRAL_ROOM: () => Data.itemLocationObtained("Water Temple", "main", "Locked Door to Central Room"),
    DEFEATED_MORPHA: () => Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp"),

    // Spirit Temple
    SPIRIT_OPENED_DOOR_AFTER_SECOND_CRAWL_SPACE: () => Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space"),

    // Ice Cavern
    ICE_MELTED_EAST_WALL: () => Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt East Ice Wall"),
    ICE_MELTED_WEST_WALL: () => Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt West Ice Wall"),

    // Gerudo Training Ground
    GTG_OPENED_OPTIONAL_DOOR_1: () => Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 1"),
    GTG_OPENED_OPTIONAL_DOOR_2: () => Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 2"),

    // Ganon's Castle
    ALL_TRIALS_COMPLETED:() => Data.itemLocationObtained("Ganon's Castle", "forestTrialEnd", "Forest Trial Complete") &&
        Data.itemLocationObtained("Ganon's Castle", "waterTrialEnd", "Water Trial Complete") &&
        Data.itemLocationObtained("Ganon's Castle", "shadowTrialEnd", "Shadow Trial Complete") &&
        Data.itemLocationObtained("Ganon's Castle", "fireTrialEnd", "Fire Trial Complete") &&
        Data.itemLocationObtained("Ganon's Castle", "lightTrialEnd", "Light Trial Complete") &&
        Data.itemLocationObtained("Ganon's Castle", "spiritTrialEnd", "Spirit Trial Complete")
};

/**
 * Item sets for checking if a part of the map can be accessed
 * These require IsPostWalkCheck if used for any item location logic
 */
let MapAccessSets = {
    HYRULE_FIELD: (age) => Data.canAccessMap(age, "Hyrule Field"),
    HIDEOUT_JAIL_1: (age) => Data.canAccessMap(age, "Thieves' Hideout", "jail1"),
    HIDEOUT_ALL_JAILS: (age) =>
        Data.canAccessMap(age, "Thieves' Hideout", "jail1") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail2") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail3") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail4"),
    FOREST_FIRST_POE_ROOM: (age) => Data.canAccessMap(age, "Forest Temple", "firstPoeRoom"),
    FOREST_FALLING_CEILING_ROOM: (age) => Data.canAccessMap(age, "Forest Temple", "fallingCeilingRoom")
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
    HAS_BOTTLE: () => Data.hasBottle(),
    FIRE_TEMPLE_TUNIC_CHECK: (age) => Settings.GlitchesToAllow.fireNoGoronTunic || ItemData.canUse(age, Equipment.GORON_TUNIC),
    WATER_TEMPLE_TUNIC_CHECK: (age) => Settings.GlitchesToAllow.waterNoZoraTunic || ItemData.canUse(age, Equipment.ZORA_TUNIC),
    SHADOW_LENS_CHECK: (age) => Settings.GlitchesToAllow.shadowLensless || ItemData.canUse(age, Items.LENS_OF_TRUTH),
    SHADOW_IRON_BOOTS_CHECK: (age) => Settings.GlitchesToAllow.shadowNoIronBoots || ItemData.canUse(age, Equipment.IRON_BOOTS),
    GTG_TUNIC_CHECK: (age) => Settings.GlitchesToAllow.gtgNoZoraTunic || ItemData.canUse(age, Equipment.ZORA_TUNIC),
    GANON_FIRE_TUNIC_CHECK: (age) => Settings.GlitchesToAllow.ganonFireNoTunic || ItemData.canUse(age, Equipment.GORON_TUNIC),
};

/**
 * Item sets related to keys
 */
let KeySets = {
    HIDEOUT_HAS_ALL_KEYS: () => Keys.THIEVES_HIDEOUT.keyCount >= Keys.THIEVES_HIDEOUT.totalKeys(),
    FOREST_BK: () => ItemData.hasBossKey("Forest Temple"),
    FIRE_BK: () => ItemData.hasBossKey("Fire Temple"),
    WATER_BK: () => ItemData.hasBossKey("Water Temple"),
    SHADOW_BK: () => ItemData.hasBossKey("Shadow Temple"),
    SPIRIT_BK: () => ItemData.hasBossKey("Spirit Temple")
};

/**
 * Item sets for silver rupee doors
 * Returns whether the rupees can be collected (and what you need to do so)
 * OR, if they are shuffled, whether the player has already collected them
 */
let SilverRupeeSets = {
    SHADOW_SILVER_RUPEES_SCYTHE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
         ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 0)
         : ItemData.canUseAny(age, 
            [Items.HOOKSHOT, Equipment.HOVER_BOOTS, GlitchItemSets.SHADOW_SCYTHE_SILVER_RUPEE_WITH_NOTHING]),
    SHADOW_SILVER_RUPEES_PIT_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 1)
        : true,
    SPIRIT_SILVER_RUPEES_SUN_BLOCK_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Spirit Temple", 1)
        : true,
    ICE_SILVER_RUPEES_SCYTHE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ice Cavern", 0)
        : age === Age.ADULT,
    GTG_SILVER_RUPEES_SLOPES_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 0)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, GlitchItemSets.GTG_WALL_MASTER_TO_SILVER_RUPEE]),
    GTG_SILVER_RUPEES_LAVA_ROOM: (age) => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 1)
        : ItemData.canUse(age, Items.HOOKSHOT) && // Rupee on the top
            ItemData.canUseAny(age, 
                [Songs.SONG_OF_TIME, Equipment.HOVER_BOOTS, GlitchItemSets.MEGA_FLIP]), // Fire rupee
    GTG_SILVER_RUPEES_WATER_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 2)
        : ItemData.canUse(age, 
            [Equipment.IRON_BOOTS, Songs.SONG_OF_TIME, GameStateSets.GTG_TUNIC_CHECK]),
    MQ_GTG_SILVER_RUPEES_SLOPES_ROOM: (age) => SilverRupeeSets.GTG_SILVER_RUPEES_SLOPES_ROOM(age),
    GANON_SPIRIT_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 0)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, GlitchItemSets.GANON_SPIRIT_HOOKSHOTLESS]),
    GANON_LIGHT_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 1)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, GlitchItemSets.GROUND_JUMP]),
    GANON_FIRE_SILVER_RUPEES: (age) => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 2)
        : ItemData.canUse(age, UpgradedItems.GOLDEN_GAUNTLETS)
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