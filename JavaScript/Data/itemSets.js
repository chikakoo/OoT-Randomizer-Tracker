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
	LEDGE_QPA: { 
        checkFunction: (age) => Settings.GlitchesToAllow.qpa &&
            ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS])
    },
	HOVER_BOOTS_QPA: {
        checkFunction: (age) => Settings.GlitchesToAllow.qpa &&
            ItemData.canUse(age, [Equipment.HOVER_BOOTS, ItemSets.SWORDS, ItemSets.SHIELDS])
    },
	TALL_TORCH_QPA: {
        checkFunction: (age) => Settings.GlitchesToAllow.qpa &&
            (age === Age.CHILD
                ? ItemData.canUse(age, [Items.DEKU_STICK, ItemSets.SHIELDS])
                : ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS]))
    },
	MUD_WALLS_QPA: {
        checkFunction: (age) => Settings.GlitchesToAllow.qpa &&
            Settings.RandomizerSettings.iceArrowsActAsBlueFire &&
            ItemData.canUse(age, [ItemSets.SWORDS, ItemSets.SHIELDS])
    },
	HIGH_SWITCH_QPA: {
        checkFunction: (age) => Settings.GlitchesToAllow.qpa &&
            ItemData.canUseAny(age, [Items.DEKU_STICK, Equipment.BIGGORONS_SWORD]) &&
            ItemData.canUse(age, ItemSets.SHIELDS)
    },
	CUTSCENE_ITEM_QPA: {
        checkFunction: (age) => {
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
    }
};

/**
 * Item sets for settings
 */
let SettingSets = {
    OPEN_DEKU: { checkFunction: () => !Settings.RandomizerSettings.closedDeku },
    OPEN_KAKARIKO: { checkFunction: () => Settings.RandomizerSettings.openKakariko === OpenKakarikoSettings.OPEN },
};

/**
 * Sets for planted magic beans
 */
let BeanSets = {
    KOKIRI_FOREST: { checkFunction: () => Data.isBeanPlanted("Kokiri Forest", "main", "Soft Soil") },
    LOST_WOODS_FOREST_STAGE: { checkFunction: () => Data.isBeanPlanted("Lost Woods", "secondHalf", "Soft Soil by Forest Stage") },
    GRAVEYARD: { checkFunction: () => Data.isBeanPlanted("Graveyard", "main", "Soft Soil") }
};

/**
 * Item sets for performing glitches
 */
let GlitchItemSets = {
	// Common
	WEIRD_SHOT: { checkFunction: (age) => Data.canWeirdShot(age) },
	MEGA_FLIP:  { checkFunction: (age) => Data.canMegaFlip(age) },
	GROUND_JUMP:  { checkFunction: (age) => Data.canGroundJumpWithBomb(age) },
	BOOMERANG_THROUGH_WALLS: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.boomerangThroughWalls && 
			ItemData.canUse(age, Items.BOOMERANG)
	},
    BOOMERANG_TRICK_THROWS: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.difficultBoomerangTrickThrows && 
			ItemData.canUse(age, Items.BOOMERANG)
	},

	// Forest
	HOUSE_OF_TWINS_SKULL_WITH_HOVERS: { 
		checkFunction: (age) => 
			Settings.GlitchesToAllow.houseOfTwinsSkullWithHovers && 
			ItemData.canUse(age, Equipment.HOVER_BOOTS)
	},
	MIDO_SKIP: { checkFunction: () => Settings.GlitchesToAllow.midoSkip },
    LOST_WOODS_SKULL_WITHOUT_BEAN: { checkFunction: (age) =>
        Settings.GlitchesToAllow.lwSkullWithoutBean &&
        ItemData.canUse(age, [
            [SetType.OR, Items.DINS_FIRE, Items.FAIRY_BOW, Items.BOMBCHU, UpgradedItems.LONGSHOT], // Kill skulltula
            [SetType.OR, Items.HOOKSHOT, GlitchItemSets.BOOMERANG_TRICK_THROWS] // Get token
        ])
    },

	// Kakariko/Graveyard
	WINDMILL_HP_WITH_NOTHING: { checkFunction: () => Settings.GlitchesToAllow.windmillHPWithNothing },
	HOOKSHOT_JUMP:  { 
		checkFunction: (age) => 
			Settings.GlitchesToAllow.hookshotJump && 
			ItemData.canUse(age, Items.HOOKSHOT)
	},
	OLD_SHADOW_EARLY:  { 
		checkFunction: (age) => 
			Settings.GlitchesToAllow.oldShadowEarly && 
			ItemData.canUse(age, [ItemSets.EXPLOSIVES, ItemSets.SHIELDS])
	},
	UNLOAD_GRAVE: { checkFunction: () => Settings.GlitchesToAllow.unloadGrave },

	// Death Mountain/Goron
	DMT_CLIP_TO_CHEST: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.dmtClipToChestByGoron && 
			ItemData.canUse(age, ItemSets.SWORDS)
	},
	DMT_BOMB_FLOWER_TO_CHEST: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.dmtBombFlowerChestByGoron && 
			ItemData.canUse(age, Equipment.STRENGTH)
	},
	DMT_SKULLS_WITHOUT_HAMMER: { checkFunction: () => Settings.GlitchesToAllow.dmtSkullsWithoutHammer },
	HOVER_TO_VOLCANO_HP: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.hoverToVolcanoHP && 
			ItemData.canUse(age, Equipment.HOVER_BOOTS)
	},
	URN_WITH_CHUS: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.goronSpinningUrnWithChus && 
			ItemData.canUse(age, [Items.BOMBCHU, Items.DEKU_NUT])
	},

	// Zora/Lake
	CUCCO_TO_ZORAS_DOMAIN: {
		checkFunction: (age) => Settings.GlitchesToAllow.cuccoToZorasDomain && age === Age.CHILD 
	},
	HOVERS_TO_ZORAS_DOMAIN: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.hoversToZorasDomain && 
			ItemData.canUse(age, Equipment.HOVER_BOOTS)
	},
	MEGA_SIDEHOP_TO_ZORAS_DOMAIN: {
		checkFunction: (age) => 
			Settings.GlitchesToAllow.megasidehopToZorasDomain && 
			ItemData.canUse(age, [ItemSets.SHIELDS, ItemSets.SWORDS, Items.BOMBCHU])
	},
};

/**
 * Item sets for checking if a certain item was obtained
 * This makes it easier to keep things in a single place in case an item location changes regions or names
 */
let ItemLocationSets = {
    // Kokiri Forest
    MOVE_MIDO: { checkFunction: () => Data.itemLocationObtained("Kokiri Forest", "main", "Move Mido") },

    // Castle
    GIFT_FROM_MALON: { checkFunction: () => Data.itemLocationObtained("Castle", "hyruleCastle", "Gift from Malon") },
    WAKE_UP_TALON: { checkFunction: () => Data.itemLocationObtained("Castle", "hyruleCastle", "Wake up Talon") }
};

/**
 * Item sets that check various game states
 */
let GameStateSets = {
    CAN_RIDE_EPONA: { checkFunction: (age) => Data.canRideEpona(age) }
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