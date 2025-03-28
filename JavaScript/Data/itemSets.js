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
 * - MUD_WALLS_LEDGE_QPA: Ledge QPA + blue fire arrows setting
 * - HIGH_SWITCH_QPA: Ledge QPA + sticks or Biggoron's sword (as they are two-handed)
 * - CUTSCENE_ITEM_QPA: Sticks + usable cutscene item (trade item with the "can't use this now" cutscene, or magic beans)
 *   - This one assumes that you can accomplish what you need with only a jumpslash
 */
let QPAItemSets = {
	LEDGE_QPA: (age) => Tricks.qpa.enabled &&
        ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]),
	HOVER_BOOTS_QPA: (age) => Tricks.qpa.enabled &&
        ItemData.canUse(age, [Equipment.HOVER_BOOTS, ItemSets.SWORDS, ItemSets.SHIELDS]),
	TALL_TORCH_QPA: (age) => Tricks.qpa.enabled && (
            age === Age.CHILD
                ? ItemData.canUse(age, [Items.DEKU_STICK, ItemSets.SHIELDS])
                : ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS])
        ),
	MUD_WALLS_LEDGE_QPA: (age) => Settings.RandomizerSettings.iceArrowsActAsBlueFire &&
        ItemData.canUse(age, QPAItemSets.LEDGE_QPA),
	HIGH_SWITCH_QPA: (age) => Tricks.qpa.enabled &&
        ItemData.canUseAny(age, [Items.DEKU_STICK, Equipment.BIGGORONS_SWORD]) &&
        ItemData.canUse(age, ItemSets.SHIELDS),
	CUTSCENE_ITEM_QPA: (age) => {
        if (!Tricks.qpa.enabled || !ItemData.canUse(age, Items.DEKU_STICK)) {
            return false;
        }

        // We're not checking whether you can USE it, we just need it in the pause menu
        let hasMagicItem = Items.DINS_FIRE.playerHas || 
            Items.FARORES_WIND.playerHas || 
            Items.NAYRUS_LOVE.playerHas;

        if (age === Age.CHILD) {
            return Items.MAGIC_BEAN.playerHas ||
                ItemData.hasChildCutsceneTradeItem() || 

                // You can't equip swap from the left, since you NEED stick equipped, so the
                // only items you can do it with are the magic spells
                (ItemData.hasAdultTradeItem() && hasMagicItem);
        } 

        // Either adult can double equip swap sticks AND a QPA cutscene item,
        // OR they can equip sticks AND an adult trade item
        return Tricks.forceAdultQPACutsceneItemEquip.enabled ||
            (ItemData.hasAdultTradeItem() && hasMagicItem);
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
    VANILLA_SILVER_RUPEES: () => !Settings.RandomizerSettings.shuffleSilverRupees,
    VANILLA_CHEST_MINIGAME_KEYS: () => Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.VANILLA,
    AUTO_PLANT_BEANS: () => Settings.RandomizerSettings.autoPlantBeans,

    // This is used when we're just checking the setting; not whether you have the items to actually do it
    SHADOW_GATE_CLIP: () => Settings.GlitchesToAllow.shadowChildGateClip || 
        Settings.GlitchesToAllow.shadowAdultGateClip
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
    // KEEPING THESE AFTER REWORK (ones with no specific setting)
    QUICKDRAW: (age) => 
        age === Age.CHILD
            ? ItemData.canUse(age, [Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD])
            : ItemData.canUse(age, [Equipment.MASTER_SWORD, ItemSets.SHIELDS]),

    // Water Temple
    WATER_BOMBABLE_WALL_EARLY: (age) => 
        Settings.GlitchesToAllow.waterBombableWallEarly &&
        ItemData.canUse(age, [ItemSets.EXPLOSIVES]),
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
    WATER_HOOKSHOT_OUT_OF_BOUNDS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterHookshotOutOfBounds &&
        ItemData.canUse(age, [Items.HOOKSHOT, Equipment.IRON_BOOTS, GameStateSets.WATER_TEMPLE_TUNIC_CHECK]),
    WATER_HOOKSHOT_OUT_OF_BOUNDS_LOW_WATER: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.waterHookshotOutOfBounds &&
        ItemData.canUse(age, [Items.HOOKSHOT]),
    MQ_WATER_WATERFALL_ROOM_WITH_HOVER_BOOTS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqWaterWaterfallWithHovers &&
        ItemData.canUse(age, [Items.HOOKSHOT, Equipment.HOVER_BOOTS]),

    // Shadow Temple
    SHADOW_SCYTHE_SILVER_RUPEE_WITH_NOTHING: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowSilverRupeeWithNothing,

    // If Child can ever get here without explosives, then this trick would be good:
    // https://youtu.be/pP4JNCU8fgU
    SHADOW_CHILD_GATE_CLIP: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.shadowChildGateClip &&
        ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.EXPLOSIVES]),
    SHADOW_ADULT_GATE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowAdultGateClip &&
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
    MQ_SHADOW_CHASM_PLATFORM_WITH_HOOKSHOT: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqShadowChasmPlatformWithHookshot &&
        ItemData.canUse(age, [Items.HOOKSHOT, ItemSets.SHIELDS]),
    SHADOW_BK_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.shadowBKSkip &&
        ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.EXPLOSIVES]),

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
    MQ_SPIRIT_CHILD_GEYSER_SKIP: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.mqSpiritChildGeyserSkip,
    MQ_SPIRIT_ADULT_GEYSER_SKIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqSpiritAdultGeyserSkip &&
        ItemData.canUse(age, ItemSets.SHIELDS),

    // Ice Cavern
    ICE_IN_REVERSE: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.iceInReverse &&
        ItemData.canUse(age, Equipment.IRON_BOOTS),
    ICE_LEDGE_CLIP: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.iceLedgeClip,
    ICE_CHILD_UPPER_ROOM: (age) => age === Age.CHILD &&
        Settings.GlitchesToAllow.iceChildUpperRoom &&
        ItemData.canUse(age, Tricks.groundJump.canDoWithBombOrStrength), // Pots can be used in the same way
    ICE_TRIPLE_SLASH_CLIP: (age) =>
        Settings.GlitchesToAllow.iceTripleSlashClips &&
        ItemData.canUseAny(age, [Equipment.KOKIRI_SWORD, Equipment.MASTER_SWORD]) &&
        ItemData.canUse(age, ItemSets.FIRST_PERSON_ITEMS),
    ICE_BLOCK_ROOM_SKULL_WITH_HOVER_BOOTS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.iceBlockSkullWithHovers &&
        ItemData.canUse(age, Equipment.HOVER_BOOTS) &&
        ItemData.canUseAny(age, [ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE]),
    MQ_ICE_NORTH_ROOM_SKULL_WITH_BOTTLED_BLUE_FIRE: () =>
        Settings.GlitchesToAllow.mqIceNorthSkullWithoutSoT &&
        GameStateSets.HAS_BOTTLE(),
    MQ_ICE_JUMP_TO_SKULL: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.mqIceJumpToSkull,

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
        ItemData.canUse(age, Tricks.hammerHoverBootsSuperslide.canDo),
    GTG_SILVER_BLOCK_ROOM_EXIT_WITH_HOVERS: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgSilverBlockRoomExitWithHovers && 
        ItemData.canUse(age, Equipment.HOVER_BOOTS),
    GTG_EYE_STATUE_WONDERITEM_JUMPSLASH: (age) => age === Age.ADULT &&
        Settings.GlitchesToAllow.gtgEyeStatueWonderItemJumpslash,
    MQ_GTG_EYE_STATUE_SWITCH_JUMPSLASH: (age) => 
        Settings.GlitchesToAllow.mqGtgEyeStatueJumpslash &&
        ItemData.canUse(age, ItemSets.SWORDS),

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
    MQ_SPIRIT_OPENED_GRATE_TO_RIGHT_OF_LOBBY: () => Data.itemLocationObtained("Spirit Temple", "adultStatueRoomSide", "Open Grate to Room Right of Lobby"),

    // Ice Cavern
    ICE_MELTED_EAST_WALL: () => Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt East Ice Wall"),
    ICE_MELTED_WEST_WALL: () => Data.itemLocationObtained("Ice Cavern", "blueFire", "Melt West Ice Wall"),

    // Gerudo Training Ground
    GTG_OPENED_OPTIONAL_DOOR_1: () => Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 1"),
    GTG_OPENED_OPTIONAL_DOOR_2: () => Data.itemLocationObtained("Training Grounds", "main", "Optional Locked Door 2"),
    MQ_GTG_SPAWNED_ICE_ARROW_CHEST: () => Data.itemLocationObtained("Training Grounds", "mazeCenter", "Spawn Ice Arrow Chest"),

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
    TEMPLE_OF_TIME: (age) => Data.canAccessMap(age, "Temple of Time", "main"),
    HIDEOUT_JAIL_1: (age) => Data.canAccessMap(age, "Thieves' Hideout", "jail1"),
    HIDEOUT_ALL_JAILS: (age) =>
        Data.canAccessMap(age, "Thieves' Hideout", "jail1") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail2") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail3") &&
        Data.canAccessMap(age, "Thieves' Hideout", "jail4"),
    FOREST_FIRST_POE_ROOM: (age) => Data.canAccessMap(age, "Forest Temple", "firstPoeRoom"),
    FOREST_FALLING_CEILING_ROOM: (age) => Data.canAccessMap(age, "Forest Temple", "fallingCeilingRoom"),
    MQ_FOREST_POE_ROOMS: (age) => Data.canAccessMap(age, "Forest Temple", "poeRooms"),
    MQ_FOREST_GREEN_POE_ROOM: (age) => Data.canAccessMap(age, "Forest Temple", "greenPoeRoom"),
    MQ_SPIRIT_AFTER_SECOND_CRAWLSPACE: (age) => Data.canAccessMap(age, "Spirit Temple", "afterSecondCrawlSpace")
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
    CAN_PLAY_SONGS: () => 
        Items.OCARINA.playerHas || Tricks.ocarinaItems.canDo(),
    CAN_PLAY_SONGS_INCLUDING_DIFFICULT_OI: () => 
        Items.OCARINA.playerHas || Tricks.difficultOcarinaItems.canDo(),
    CAN_RIDE_EPONA: (age) => age === Age.ADULT &&
        ItemData.canUseAny(age, [
            [Songs.EPONAS_SONG, Items.OCARINA], // Get Epona legit (or race skip - either requires real ocarina)
            [SettingSets.VANILLA_OVERWORLD_ENTRANCES, Tricks.staircaseHover.canDo] // Steal Epona
        ]),
    CAN_HOOK_SCARECROW: (age) => 
        ItemData.canUse(age, [Items.HOOKSHOT, Songs.SCARECROWS_SONG]),
    CAN_LONGSHOT_SCARECROW: (age) => 
        ItemData.canUse(age, [UpgradedItems.LONGSHOT, Songs.SCARECROWS_SONG]),
    ARE_GERUDO_GUARDS_TAME: () => Equipment.GERUDO_MEMBERSHIP_CARD.playerHas,
    CAN_STUN_GUARDS: (age) => 
        ItemData.canUseAny(age, [
            GameStateSets.CAN_STUN_OR_PASS_GUARDS_AT_DISTANCE,
            Tricks.gfGuardsWithSword.canDo
        ]),
    CAN_STUN_OR_PASS_GUARDS_AT_DISTANCE: (age) => 
        ItemData.canUseAny(age, 
            [GameStateSets.ARE_GERUDO_GUARDS_TAME, Items.HOOKSHOT, Items.FAIRY_BOW]),
    CAN_PLAY_BOMBCHU_BOWLING: () =>
        Settings.RandomizerSettings.bombchusInLogic
        ? Items.BOMBCHU.playerHas
        : Items.BOMB.playerHas,
    HAS_BOTTLE: () => ItemData.getEmptyBottleCount(true) > 0,
    FIRE_TEMPLE_TUNIC_CHECK: (age) => Tricks.fireNoGoronTunic.enabled || ItemData.canUse(age, Equipment.GORON_TUNIC),
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
    MQ_DODONGOS_CAVERN_SILVER_RUPEES_STAIRCASE_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Dodongo's Cavern", 0)
        : true,

    SHADOW_SILVER_RUPEES_SCYTHE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
         ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 0)
         : ItemData.canUseAny(age, 
            [Items.HOOKSHOT, Equipment.HOVER_BOOTS, GlitchItemSets.SHADOW_SCYTHE_SILVER_RUPEE_WITH_NOTHING]),
    SHADOW_SILVER_RUPEES_PIT_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 1)
        : true,
    SHADOW_SILVER_RUPEES_INVISIBLE_SPIKES_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 2)
        : age === Age.ADULT && ItemData.canUse(age, Items.HOOKSHOT),
    MQ_SHADOW_SILVER_RUPEES_SCYTHE_ROOM: (age) => 
        SilverRupeeSets.SHADOW_SILVER_RUPEES_SCYTHE_ROOM(age),    
    MQ_SHADOW_SILVER_RUPEES_INVISIBLE_SCYTHE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 1)
        : age === Age.ADULT && ItemData.canUse(age, Songs.SONG_OF_TIME),
    MQ_SHADOW_SILVER_RUPEES_PIT_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 2)
        : ItemData.canUse(age, UpgradedItems.LONGSHOT),
    MQ_SHADOW_SILVER_INVISIBLE_SPIKE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Shadow Temple", 3)
        : ItemData.canUse(age, Items.HOOKSHOT),

    // SPIRIT_SILVER_RUPEES_GRATE_ROOM (index 0):
    // Not needed, as there's an easy way to get the skull without them!
    SPIRIT_SILVER_RUPEES_SUN_BLOCK_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Spirit Temple", 1)
        : true,
    SPIRIT_SILVER_RUPEES_BOULDER_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Spirit Temple", 2)
        : true,
    MQ_SPIRIT_SILVER_RUPEES_LOBBY: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Spirit Temple", 0)
        : false, // This is a special case - the item this unlocks will be checked in a different way (since it needs a different region)
    MQ_SPIRIT_SILVER_RUPEES_MOVING_WALL_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Spirit Temple", 1)
        : true,

    ICE_SILVER_RUPEES_SCYTHE_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ice Cavern", 0)
        : age === Age.ADULT,
    ICE_SILVER_RUPEES_BLOCK_PUSH_ROOM: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ice Cavern", 1)
        : true,

    GTG_SILVER_RUPEES_SLOPES_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 0)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, GlitchItemSets.GTG_WALL_MASTER_TO_SILVER_RUPEE]),
    GTG_SILVER_RUPEES_LAVA_ROOM: (age) => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 1)
        : ItemData.canUse(age, Items.HOOKSHOT) && // Rupee on the top
            ItemData.canUseAny(age, 
                [Songs.SONG_OF_TIME, Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]), // Fire rupee
    GTG_SILVER_RUPEES_WATER_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 2)
        : ItemData.canUse(age, 
            [Equipment.IRON_BOOTS, Songs.SONG_OF_TIME, GameStateSets.GTG_TUNIC_CHECK]),
    MQ_GTG_SILVER_RUPEES_SLOPES_ROOM: (age) => SilverRupeeSets.GTG_SILVER_RUPEES_SLOPES_ROOM(age),
    MQ_GTG_SILVER_RUPEES_LAVA_ROOM: (age) => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 1)
        : ItemData.canUseAny(age, [Items.FAIRY_BOW, Items.DINS_FIRE, QPAItemSets.LEDGE_QPA]) && // Light the torch
            ItemData.canUseAny(age, [Equipment.HOVER_BOOTS, Tricks.megaFlip.canDo]), // Grab the rupees
    MQ_GTG_SILVER_RUPEES_WATER_ROOM: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Training Grounds", 2)
        : ItemData.canUse(age, [Equipment.IRON_BOOTS, GameStateSets.GTG_TUNIC_CHECK]) && // Dive down
            ItemData.canUseAny(age, [ItemSets.FIRE_ITEMS, QPAItemSets.LEDGE_QPA]), // Break web

    GANON_SPIRIT_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 0)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, GlitchItemSets.GANON_SPIRIT_HOOKSHOTLESS]),
    GANON_LIGHT_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 1)
        : ItemData.canUseAny(age, [Items.HOOKSHOT, Tricks.groundJump.canDoWithBomb]),
    GANON_FIRE_SILVER_RUPEES: (age) => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 2)
        : ItemData.canUse(age, UpgradedItems.GOLDEN_GAUNTLETS),
    GANON_FOREST_SILVER_RUPEES: () => 
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 3)
        : true,
    MQ_GANON_FIRE_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 0)
        : ItemData.canUse(age, UpgradedItems.GOLDEN_GAUNTLETS),
    MQ_GANON_SHADOW_SILVER_RUPEES: () =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 1)
        : true,
    MQ_GANON_WATER_SILVER_RUPEES: (age) =>
        Settings.RandomizerSettings.shuffleSilverRupees
        ? ItemData.checkSilverRupeeRequirement("Ganon's Castle", 2)
        : age === Age.ADULT
};

/**
 * A list of item sets that can be used to concisely check whether a player can do something
 */
let ItemSets = {
    EXPLOSIVES: (age) => ItemData.canUseAny(age, [
        Items.BOMB, Items.BOMBCHU
    ]),
	EXPLOSIVES_OR_STRENGTH: (age) => ItemData.canUseAny(age, [
        ItemSets.EXPLOSIVES, Equipment.STRENGTH
    ]),
	BLAST_OR_SMASH_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.EXPLOSIVES, Items.MEGATON_HAMMER
    ]),
	FIRE_ITEMS: (age) => ItemData.canUseAny(age, [
        Items.DINS_FIRE, Items.FIRE_ARROW
    ]),
	PROJECTILES: (age) => ItemData.canUseAny(age, [
        Items.FAIRY_SLINGSHOT, Items.FAIRY_BOW
    ]),
    GRAB_SHORT_DISTANCE_ITEMS: (age) => ItemData.canUseAny(age, [
        Items.BOOMERANG, Items.HOOKSHOT
    ]),
	DISTANT_SWITCH_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.EXPLOSIVES, ItemSets.PROJECTILES, ItemSets.GRAB_SHORT_DISTANCE_ITEMS
    ]),
	FIRST_PERSON_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.PROJECTILES, ItemSets.GRAB_SHORT_DISTANCE_ITEMS
    ]),
	// Any item you can swing and jumpslash with - includes stick and hammer
	SWORDS: (age) => ItemData.canUseAny(age, [
        ItemSets.ACUTE_ANGLE_SWORDS, Items.MEGATON_HAMMER
    ]),
	ACUTE_ANGLE_SWORDS: (age) => ItemData.canUseAny(age, [
        Equipment.KOKIRI_SWORD, Items.DEKU_STICK,
        Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD
    ]),
	SHIELDS: (age) => ItemData.canUseAny(age, [
        Equipment.DEKU_SHIELD, Equipment.HYLIAN_SHIELD, Equipment.MIRROR_SHIELD
    ]),
    SHIELD_DROP_SHIELDS: (age) => {
        return age === Age.CHILD
            ? Equipment.DEKU_SHIELD.playerHas || Equipment.HYLIAN_SHIELD.playerHas
            : ItemData.canUse(age, ItemSets.SHIELDS);
    },
	DAMAGING_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.SWORDS, ItemSets.EXPLOSIVES, ItemSets.PROJECTILES,
        Items.DINS_FIRE, Items.BOOMERANG
    ]),
    DISTANCE_DAMAGING_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.DISTANT_SWITCH_ITEMS, Items.DINS_FIRE
    ]),
	STUNNABLE_ENEMY_KILL_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.SWORDS, ItemSets.PROJECTILES, ItemSets.EXPLOSIVES, Items.DINS_FIRE, 
    ]),
	FREEZARD_KILL_ITEMS: (age) => ItemData.canUseAny(age, [
        Equipment.MASTER_SWORD, Equipment.BIGGORONS_SWORD, Items.DEKU_STICK, Items.MEGATON_HAMMER,
        ItemSets.EXPLOSIVES, Items.DINS_FIRE
    ]),
	BLUE_FIRE_ITEMS: (age) => ItemData.canUseAny(age, [
        Items.BLUE_FIRE, Items.ICE_ARROW
    ]),
	MUD_WALL_ITEMS: (age) => ItemData.canUseAny(age, [
        ItemSets.BLAST_OR_SMASH_ITEMS, ItemSets.BLUE_FIRE_ITEMS, QPAItemSets.CUTSCENE_ITEM_QPA
    ]),
	MUD_WALL_ITEMS_OR_LEDGE_QPA: (age) => ItemData.canUseAny(age, [
        ItemSets.MUD_WALL_ITEMS, QPAItemSets.MUD_WALLS_LEDGE_QPA
    ])
};