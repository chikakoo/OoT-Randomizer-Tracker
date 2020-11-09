/**
 * Sets up the item tracker
 */
let setUpItemTracker = function() {
	let trackerDiv = document.getElementById("itemTracker");
	trackerDiv.childNodes.forEach(function(childNode) {
		childNode.innerHTML = "";
	});

	_createUIFromItemObject("Items", Items, document.getElementById("itemProgress"));
	_createUIFromItemObject("Equipment", Equipment, document.getElementById("equipmentProgress"));
	_createUIFromItemObject("Songs", Songs, document.getElementById("warpSongProgress"), 2);
	_createUIFromItemObject("Songs", Songs, document.getElementById("normalSongProgress"), 1);
	_createUIFromItemObject("Medallions", Medallions, document.getElementById("medallionProgress"));
	
	_setUpSmallKeyUI();
	_createUIFromItemObject("Keys", Keys, document.getElementById("bossKeyProgress"));
};

/**
 * Creates the UI from the given item object (Item/Equipment/Song/Medallion)
 * @param itemObject - the item object
 * @param divItems - the div to contain the UI
 */
let _createUIFromItemObject = function(itemObjString, itemObject, divItems, divGroup) {
	divItems.innerHTML = "";
	Object.keys(itemObject).forEach(function(key, index) {
		let item = itemObject[key];
		if (divGroup && item.divGroup !== divGroup) { return; }

		let divItem = dce("div");
		if (!item.noBossKey) { // Skip all key items that are marked to have no boss key
			divItem.id = key;
			divItem.style.backgroundImage = getItemImagePath(item);

			if (key === "SKULLTULA_TOKENS") { // Skulltula tokens have different behavior
				let divTokenCount = dce("div", "countable-item");
				divTokenCount.innerText = item.count;
				divItem.onclick = onTokenClicked.bind(this, item, divTokenCount);
				divItem.oncontextmenu = onTokenClicked.bind(this, item, divTokenCount);
				divItem.appendChild(divTokenCount);

				let maxRequiredTokens = _getMaxRequiredTokens();
				if (maxRequiredTokens === 0 || item.count >= maxRequiredTokens) {
					addCssClass(divTokenCount, "has-max-tokens");
				}
			} else if (key === "TRIFORCE_SHARDS") { // Triforce shards have different behavior
				let divTriforceCount = dce("div", "countable-item");
				divTriforceCount.innerText = item.count;
				divItem.onclick = onTriforceClicked.bind(this, item, divTriforceCount);
				divItem.oncontextmenu = onTriforceClicked.bind(this, item, divTriforceCount);
				divItem.appendChild(divTriforceCount);
			} else {
				divItem.onclick = onItemClicked.bind(this, itemObjString, item, divItem);
			}

			divItem.onmouseover = onItemMouseOver.bind(this, item);
			divItem.onmouseout = onItemMouseOut;
			
			addCssClass(divItem, "item");
			_setStylesForUnownedItem(item, divItem);
			
			divItems.appendChild(divItem);
		}
	});
};

/**
 * Increments or decrements the token counter
 * @param item - the item
 * @param divTokenCount - the counter for the skulltulas
 * @param event - used to detect right clicks
 */
let onTokenClicked = function(item, divTokenCount, event) {
	_updateCountableItem(item, divTokenCount, event);

	let maxRequiredTokens = _getMaxRequiredTokens();
	removeCssClass(divTokenCount, "has-max-tokens");
	if (item.count >= maxRequiredTokens) { 
		item.count = maxRequiredTokens; 
		divTokenCount.innerText = item.count;
		
		addCssClass(divTokenCount, "has-max-tokens");
	}
	
	SocketClient.inventoryUpdated("Equipment", "SKULLTULA_TOKENS", item);
	refreshAll();
};

/**
 * Increments or decrements the token counter
 * @param item - the item
 * @param divTriforceCount - the counter for the triforce shards
 * @param event - used to detect right clicks
 */
let onTriforceClicked = function(item, divTriforceCount, event) {
	_updateCountableItem(item, divTriforceCount, event);
	
	SocketClient.inventoryUpdated("Equipment", "TRIFORCE_SHARDS", item);
	refreshAll();
};

/**
 * Increments or decrements the counter on a countable item
 * @param item - the item
 * @param divTokenCount - the counter div
 * @param event - used to detect right clicks
 */
let _updateCountableItem = function(item, element, event) {
	if (event.type === "click") {
		item.count++;
	} else if (event.type === "contextmenu") { 
		item.count--;
	}

	if (item.count < 0) { item.count = 0; }
	
	element.innerText = item.count;
}

/**
 * Gets the max requried tokens - takes the medallion setting in mind
 */
let _getMaxRequiredTokens = function() {
	let maxRequiredTokens = Settings.RandomizerSettings.maxRequiredTokens;
	if (Settings.RandomizerSettings.medallionSetting === MedallionSettings.SKULLTULAS) {
		if (Settings.RandomizerSettings.medallionSkulltulaSetting > maxRequiredTokens)
		{
			maxRequiredTokens = Settings.RandomizerSettings.medallionSkulltulaSetting;
		}
	}
	return maxRequiredTokens;
}

/**
 * Adds opacity for items that are not owned
 * @param item - the item
 * @param divItem - the item div
 */
let _setStylesForUnownedItem = function(item, divItem) {
	if (!item.playerHas) {
		addCssClass(divItem, "playerDoesNotHave");
	} else {
		removeCssClass(divItem, "playerDoesNotHave");
	}
};

/**
 * Updates the item when it is clicked
 * @param item - the item to update
 * @param divItem - the div the item is in
 */
let onItemClicked = function(itemObjString, item, divItem) {
	cycleUpgrade(item);
	
	divItem.style.backgroundImage = getItemImagePath(item);
	_setStylesForUnownedItem(item, divItem);
	onItemMouseOver(item);
	
	SocketClient.inventoryUpdated(itemObjString, divItem.id, item);
	refreshAll();
};

/**
 * Updates the item label when an item is moused over
 * @param item - the item hovered over
 */
let onItemMouseOver = function(item) {
	let itemName = item.name;
	let displayText = itemName;
	let divItemLabel = document.getElementById("itemLabel");
	
	if (item.playerHas && item.upgrades) {
		if (item.useUpgradeAsDisplay) {
			displayText = getUpgradeName(item);
		} else {
			let upgradeText =  item.currentUpgrade > 1 ?  ` (+${item.currentUpgrade - 1})` : "";
			displayText = `${itemName}${upgradeText}`;
		}
	}
	
	divItemLabel.innerText = displayText;
};

/**
 * Updates the item label when an item is moused over
 */
let onItemMouseOut = function() {
	let divItemLabel = document.getElementById("itemLabel");
	divItemLabel.innerText = "";
};


/**
 * Cycles the upgrade of the given item
 * @param item: The item
 */
let cycleUpgrade = function(item) {
	if (item.playerHas === undefined) { item.playerHas = false; }

	// Upgradeable items
	if (item.upgrades) {
		if (item.currentUpgrade === undefined) { 
			item.currentUpgrade = 0; 
		}
		
		item.currentUpgrade++;
		if (item.currentUpgrade > item.upgrades.length - 1) {
			item.currentUpgrade = 0;
		}
		
		item.playerHas = item.currentUpgrade !== 0;

	// Non Upgradeable items
	} else {
		item.playerHas = !item.playerHas;
	}
};

/**
 * Gets the current upgrade name of the given item
 */
let getUpgradeName = function(item) {
	let upgradeIndex = getUpgradeIndex(item);
	
	if (!item.playerHas && !item.playerAlwaysHas) {
		return "X";
	}
	
	if (upgradeIndex !== undefined && item.upgrades !== undefined && item.upgrades.length > upgradeIndex) {
		return item.upgrades[upgradeIndex];
	}
	
	return "";
}

/**
 * Gets the current upgrade index of the given item
 */
let getUpgradeIndex = function(item) {
	return item.currentUpgrade;
};

/**
 * Gets the image path of the given item
 */
let getItemImagePath = function(item) {
	if (item.totalKeys) { // Set up for boss keys
		let namePrefix = item.playerHas ? "" : " X";
		return `url("Images/Boss Key.png")`;
	}
	
	let itemName = item.name;
	if (item.upgrades) {
		let itemUpgrade = getUpgradeName(item);
		return `url("Images/${itemName} ${itemUpgrade}.png")`;
	} else {
		let namePrefix = item.playerHas ? "" : " X";
		return `url("Images/${itemName}.png")`;
	}
};

/**
 * Sets up the UI for small keys
 */
let _setUpSmallKeyUI = function() {
	let smallKeyProgressDiv = document.getElementById("smallKeyProgress");
	Object.keys(Keys).forEach(function(key, index) {
		let smallKeyDiv = dce("div", "small-key no-keys");
		let keyObject = Keys[key];

		keyObject.keyCount = keyObject.keyCount || 0;
		keyObject.playerHas = keyObject.playerHas || false; // For boss keys
		
		smallKeyDiv.id = key;
		smallKeyDiv.style.backgroundImage = 'url("Images/Small Key.png")';
		smallKeyDiv.onclick = onSmallKeyClicked.bind(this, keyObject, smallKeyDiv);
		smallKeyDiv.oncontextmenu = onSmallKeyClicked.bind(this, keyObject, smallKeyDiv);
		smallKeyDiv.onmouseover = onSmallKeyMouseOver.bind(this, keyObject);
		smallKeyDiv.onmouseout = onItemMouseOut;
		
		_createKeyCountDiv(smallKeyDiv, keyObject.keyCount);
		smallKeyProgressDiv.appendChild(smallKeyDiv);
		_updateSmallKeyCss(keyObject, smallKeyDiv);
	});
};

/**
 * Creates the div for the key count
 * @param smallKeyDiv - the div to create the count for
 */
let _createKeyCountDiv = function(smallKeyDiv, keyCount) {
	let keyCountDiv = dce("div", "key-count");
	keyCountDiv.innerText = keyCount;
	smallKeyDiv.appendChild(keyCountDiv);
}

/**
 * Updates the item when it is clicked
 * @param keyObject - the small key data
 * @param smallKeyDiv - the div for the small keys
 */
let onSmallKeyClicked = function(keyObject, smallKeyDiv, event) {
	if (event.type === "click") {
		keyObject.keyCount++;
	} else if (event.type === "contextmenu") { 
		keyObject.keyCount--;
	}

	let canBeMasterQuest = Settings.RandomizerSettings.dungeonSetting !== DungeonSettings.STANDARD;
	let maxKeysToAllow = canBeMasterQuest ? 
		Math.max(keyObject.totalKeys(), keyObject.mqTotalKeys()) : keyObject.totalKeys();

	if (keyObject.keyCount > maxKeysToAllow) {
		keyObject.keyCount--;
		return;
	}

	if (keyObject.keyCount < 0) {
		keyObject.keyCount = 0;
	}
	_updateSmallKeyCss(keyObject, smallKeyDiv);
	
	let keyCountDiv = smallKeyDiv.firstChild;
	keyCountDiv.innerText = keyObject.keyCount;
	
	SocketClient.inventoryUpdated("Keys", smallKeyDiv.id, keyObject);
	refreshAll();
}

/**
 * Updates the CSS for the given small key div
 * @param keyObject - the small key data
 * @param smallKeyDiv - the div for the small keys
 */
let _updateSmallKeyCss = function(keyObject, smallKeyDiv) {
	removeCssClass(smallKeyDiv, "no-keys");
	removeCssClass(smallKeyDiv, "some-keys");
	removeCssClass(smallKeyDiv, "minimum-keys");
	removeCssClass(smallKeyDiv, "all-keys");

	let isMasterQuest = false; //TODO when master quest is supported again: MapLocations[keyObject.name].IsMasterQuest;

	let minKeys, totalKeys;
	if (isMasterQuest) {
		minKeys = keyObject.mqMinimumKeys ? keyObject.mqMinimumKeys() : 999;
		totalKeys = keyObject.mqTotalKeys();
	} else {
		minKeys = keyObject.minimumKeys ? keyObject.minimumKeys() : 999;
		totalKeys = keyObject.totalKeys();
	}
	
	let cssClassToAdd = "no-keys";
	if (keyObject.keyCount > 0) {
		cssClassToAdd = "some-keys";
	} 
	
	if (keyObject.keyCount >= minKeys) {
		cssClassToAdd = "minimum-keys";
	} 
	
	if (keyObject.keyCount >= totalKeys) {
		cssClassToAdd = "all-keys";
	}
	
	addCssClass(smallKeyDiv, cssClassToAdd);
}

/**
 * Updates the item label when the small key is moused over
 * @param keyObject - the small key entry hovered over
 */
let onSmallKeyMouseOver = function(keyObject) {
	let divItemLabel = document.getElementById("itemLabel");
	divItemLabel.innerText = keyObject.name;
};