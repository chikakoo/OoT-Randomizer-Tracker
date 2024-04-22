let ItemTracker = {
	/**
	 * Sets up the item tracker
	 */
	setUp: function() {
		let trackerDiv = document.getElementById("itemTracker");
		trackerDiv.childNodes.forEach(function(childNode) {
			childNode.innerHTML = "";
		});

		this._createUIFromItemObject("Items", Items, document.getElementById("itemProgress"));
		this._createUIFromItemObject("Equipment", Equipment, document.getElementById("equipmentProgress"));
		this._createUIFromItemObject("ChildTradeItems", ChildTradeItems, document.getElementById("childTradeItemProgress"));
		this._createUIFromItemObject("AdultTradeItems", AdultTradeItems, document.getElementById("adultTradeItemProgress"));
		this._createUIFromItemObject("Songs", Songs, document.getElementById("normalSongProgress"), 1);
		this._createUIFromItemObject("Songs", Songs, document.getElementById("warpSongProgress"), 2);
		this._createUIFromItemObject("Songs", Songs, document.getElementById("scarecrowsSongProgress"), 3);
		this._createUIFromItemObject("Medallions", Medallions, document.getElementById("medallionProgress"));

		this._setUpSmallKeyUI();
		this._createUIFromItemObject("Keys", Keys, document.getElementById("bossKeyProgress"));

		this._setUpSilverRupeeUI();
		this._createUIFromItemObject("OcarinaButtons", OcarinaButtons, document.getElementById("ocarinaButtonProgress"));
	},

	/**
	 * Creates the UI from the given item object (Item/Equipment/Song/Medallion)
	 * @param itemObject - the item object
	 * @param divItems - the div to contain the UI
	 */
	_createUIFromItemObject: function(itemObjString, itemObject, divItems, divGroup) {
		divItems.innerHTML = "";

		let _this = this;
		Object.keys(itemObject).forEach(function(key) {
			let item = itemObject[key];
			if (item.hide) { return; }
			if (divGroup && item.divGroup !== divGroup) { return; }

			let divItem = dce("div");
			if (!item.noBossKey) { // Skip all key items that are marked to have no boss key
				divItem.id = key;
				divItem.style.backgroundImage = _this.getItemImagePath(item, itemObjString);

				if (itemObjString === "OcarinaButtons") { // Ocarina buttons are individually positioned
					_this._setStyleForOcarinaButton(item, divItem);
				}

				if (itemObjString === "Songs" && !ItemData.hasAllSongNotes(item)) { // Set CSS for songs that can't be played
					addCssClass(divItem, "cannot-play-song");
				}
				
				if (key === "EMPTY_BOTTLES") { // Empty bottles have different behavior
					let divBottleCount = dce("div", "countable-item");
					divBottleCount.innerText = item.count;
					divItem.onclick = _this.onEmptyBottleClicked.bind(_this, item, divBottleCount);
					divItem.oncontextmenu = _this.onEmptyBottleClicked.bind(_this, item, divBottleCount);
					divItem.appendChild(divBottleCount);

					const maxEmptyBottles = 4;
					if (item.count >= maxEmptyBottles) {
						addCssClass(divBottleCount, "has-max");
					}
				}
				else if (key === "SKULLTULA_TOKENS") { // Skulltula tokens have different behavior
					let divTokenCount = dce("div", "countable-item");
					divTokenCount.innerText = item.count;
					divItem.onclick = _this.onTokenClicked.bind(_this, item, divTokenCount);
					divItem.oncontextmenu = _this.onTokenClicked.bind(_this, item, divTokenCount);
					divItem.appendChild(divTokenCount);

					let maxRequiredTokens = _this._getMaxRequiredTokens();
					if (maxRequiredTokens === 0 || item.count >= maxRequiredTokens) {
						addCssClass(divTokenCount, "has-max");
					}
				} else if (key === "TRIFORCE_SHARDS") { // Triforce shards have different behavior
					let divTriforceCount = dce("div", "countable-item");
					divTriforceCount.innerText = item.count;
					divItem.onclick = _this.onTriforceClicked.bind(_this, item, divTriforceCount);
					divItem.oncontextmenu = _this.onTriforceClicked.bind(_this, item, divTriforceCount);
					divItem.appendChild(divTriforceCount);
				} else {
					divItem.onclick = _this.onItemClicked.bind(_this, itemObjString, item, divItem);
				}

				divItem.onmouseover = _this.onItemMouseOver.bind(_this, item);
				divItem.onmouseout = _this.onItemMouseOut;
				
				addCssClass(divItem, "item");
				_this._setStylesForUnownedItem(item, divItem);

				if (item.tooltip) {
					divItem.title = item.tooltip;
				}

				if (item.cssClass) {
					addCssClass(divItem, item.cssClass);
				}
				
				divItems.appendChild(divItem);
			}
		});
	},

	/**
	 * Specifically position the ocarina button
	 * @param button - the button to use as reference
	 * @param buttonDiv - the div to position
	 */
	_setStyleForOcarinaButton: function(button, buttonDiv) {
		switch(button) {
			case OcarinaButtons.C_UP_BUTTON:
				buttonDiv.style.bottom = "10px";
				buttonDiv.style.left = "41px";
				return;
			case OcarinaButtons.C_LEFT_BUTTON:
				buttonDiv.style.top = "3px";
				buttonDiv.style.left = "6px";
				return;
			case OcarinaButtons.C_RIGHT_BUTTON:
				buttonDiv.style.top = "3px";
				buttonDiv.style.left = "15px";
				return;
			case OcarinaButtons.C_DOWN_BUTTON:
				buttonDiv.style.top = "16px";
				buttonDiv.style.right = "22px";
				return;
			case OcarinaButtons.A_BUTTON:
				buttonDiv.style.bottom = "12px";
				buttonDiv.style.left = "2px";
				return;
		}
	},

	onEmptyBottleClicked: function(item, divBottleCount, event) {
		this._updateCountableItem(item, divBottleCount, event);

		const maxEmptyBottles = 4;
		removeCssClass(divBottleCount, "has-max");
		if (item.count >= maxEmptyBottles) {
			item.count = maxEmptyBottles;
			divBottleCount.innerText = item.count;

			addCssClass(divBottleCount, "has-max");
		}

		SocketClient.inventoryUpdated("Items", "EMPTY_BOTTLES", item);
		refreshAll();
	},

	/**
	 * Increments or decrements the token counter
	 * @param item - the item
	 * @param divTokenCount - the counter for the skulltulas
	 * @param event - used to detect right clicks
	 */
	onTokenClicked: function(item, divTokenCount, event) {
		this._updateCountableItem(item, divTokenCount, event);

		let maxRequiredTokens = this._getMaxRequiredTokens();
		removeCssClass(divTokenCount, "has-max");
		if (item.count >= maxRequiredTokens) { 
			item.count = maxRequiredTokens; 
			divTokenCount.innerText = item.count;
			
			addCssClass(divTokenCount, "has-max");
		}
		
		SocketClient.inventoryUpdated("Equipment", "SKULLTULA_TOKENS", item);
		refreshAll();
	},

	/**
	 * Increments or decrements the token counter
	 * @param item - the item
	 * @param divTriforceCount - the counter for the triforce shards
	 * @param event - used to detect right clicks
	 */
	onTriforceClicked: function(item, divTriforceCount, event) {
		this._updateCountableItem(item, divTriforceCount, event);
		
		SocketClient.inventoryUpdated("Equipment", "TRIFORCE_SHARDS", item);
		refreshAll();
	},

	/**
	 * Increments or decrements the counter on a countable item
	 * @param item - the item
	 * @param divTokenCount - the counter div
	 * @param event - used to detect right clicks
	 */
	_updateCountableItem: function(item, element, event) {
		if (event.type === "click") {
			item.count++;
		} else if (event.type === "contextmenu") { 
			item.count--;
		}

		if (item.count < 0) { item.count = 0; }
		
		element.innerText = item.count;
	},

	/**
	 * Gets the max required tokens - takes the medallion setting in mind
	 */
	_getMaxRequiredTokens: function() {
		let maxRequiredTokens = Settings.RandomizerSettings.maxRequiredTokens;
		if (Settings.RandomizerSettings.medallionSetting === MedallionSettings.SKULLTULAS) {
			if (Settings.RandomizerSettings.medallionSkulltulaSetting > maxRequiredTokens)
			{
				maxRequiredTokens = Settings.RandomizerSettings.medallionSkulltulaSetting;
			}
		}
		return maxRequiredTokens;
	},

	/**
	 * Adds opacity for items that are not owned
	 * @param item - the item
	 * @param divItem - the item div
	 */
	_setStylesForUnownedItem: function(item, divItem) {
		if (!item.playerHas) {
			addCssClass(divItem, "playerDoesNotHave");
		} else {
			removeCssClass(divItem, "playerDoesNotHave");
		}
	},

	/**
	 * Updates the item when it is clicked
	 * @param item - the item to update
	 * @param divItem - the div the item is in
	 */
	onItemClicked: function(itemObjString, item, divItem) {
		this._cycleUpgrade(item);
		
		divItem.style.backgroundImage = this.getItemImagePath(item, itemObjString);
		this._setStylesForUnownedItem(item, divItem);
		this.onItemMouseOver(item);

		// Refresh the song divs so that the styles are applied for whether songs can be played
		if (itemObjString === "OcarinaButtons") {
			this._createUIFromItemObject("Songs", Songs, document.getElementById("normalSongProgress"), 1);
			this._createUIFromItemObject("Songs", Songs, document.getElementById("warpSongProgress"), 2);
			this._createUIFromItemObject("Songs", Songs, document.getElementById("scarecrowsSongProgress"), 3);
		}
		
		SocketClient.inventoryUpdated(itemObjString, divItem.id, item);
		refreshAll();
	},

	/**
	 * Refreshes the red outline on the song based on whether it can be played
	 * @param song - the song object, from Songs
	 */
	refreshSongPlayability: function(song) {
		if (!song) { return; }

		let songDivId = Object.keys(Songs).find(key => Songs[key].name === song.name);
		if (!songDivId) { return; }

		let songDiv = document.getElementById(songDivId);
		addOrRemoveCssClass(songDiv, "cannot-play-song", !ItemData.hasAllSongNotes(song));
	},

	/**
	 * Updates the item label when an item is moused over
	 * @param item - the item hovered over
	 */
	onItemMouseOver: function(item) {
		let itemName = item.name;
		let displayText = itemName;
		let divItemLabel = document.getElementById("itemLabel");
		
		if (item.playerHas && item.upgrades) {
			if (item.useUpgradeAsDisplay) {
				displayText = this.getUpgradeName(item);
			} else {
				let upgradeText =  item.currentUpgrade > 1 ?  ` (+${item.currentUpgrade - 1})` : "";
				displayText = `${itemName}${upgradeText}`;
			}
		}

		// Add the boss key label
		if (item.totalKeys) {
			displayText = `${displayText} Boss Key`;
		}

		// If it's a song, append the notes to the end
		let songNotes = ItemData.getSongNotes(item);
		if (songNotes) {
			displayText += `<br/>${this._getSongNotesForDisplay(songNotes)}`;
		}
		
		divItemLabel.innerHTML = displayText;
	},

	/**
	 * Gets a stirng of song notes to show in the mouse over display
	 * @param {String} songNotes - the song note stirng to parse
	 * @returns The formatted song notes
	 */
	_getSongNotesForDisplay: function(songNotes) {
		// Set to this value for height consistency of songs with and without the A button
		let displayString = "<span style='display:inline-block; height:24px; width:0px;'></span>"; 
		ItemData.convertSongNotesString(songNotes).forEach(note => {
			let dimensions = "";
			if (note === OcarinaButtons.A_BUTTON) {
				dimensions = "height:24px; width:24px;";
			}

			let cssClass = note.playerHas || !Settings.RandomizerSettings.shuffleOcarinaButtons
				? "ocarina-note"
				: "ocarina-note not-obtained";
			displayString += `<span class="${cssClass}" style="display:inline-block; ${dimensions} background-image:url('./Images/Controller Buttons/${note.name}.png')"></span>`;
		});

		return displayString;
	},
	
	/**
	 * Updates the item label when an item is moused over
	 */
	onItemMouseOut: function() {
		let divItemLabel = document.getElementById("itemLabel");
		divItemLabel.innerText = "";
	},

	/**
	 * Cycles the upgrade of the given item
	 * @param item: The item
	 */
	_cycleUpgrade: function(item) {
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
	},

	/**
	 * Gets the current upgrade name of the given item
	 */
	getUpgradeName: function(item) {
		let upgradeIndex = this.getUpgradeIndex(item);
		
		if (!item.playerHas && !item.playerAlwaysHas) {
			return "X";
		}
		
		if (upgradeIndex !== undefined && item.upgrades !== undefined && item.upgrades.length > upgradeIndex) {
			return item.upgrades[upgradeIndex];
		}
		
		return "";
	},

	/**
	 * Gets the current upgrade index of the given item
	 */
	getUpgradeIndex: function(item) {
		return item.currentUpgrade;
	},

	/**
	 * Gets the image path of the given item
	 */
	getItemImagePath: function(item, itemType) {
		if (itemType === "OcarinaButtons") {
			return `url("Images/Controller Buttons/${item.name}.png")`;
		}

		if (item.totalKeys) { // Set up for boss keys
			return `url("Images/Boss Key.png")`;
		}
		
		let itemName = item.name;
		if (item.upgrades) {
			let itemUpgrade = this.getUpgradeName(item);
			return `url("Images/${itemName} ${itemUpgrade}.png")`;
		} else {
			return `url("Images/${itemName}.png")`;
		}
	},

	/**
	 * Sets up the UI for small keys
	 */
	_setUpSmallKeyUI: function() {
		let smallKeyProgressDiv = document.getElementById("smallKeyProgress");
		let _this = this;
		Object.keys(Keys).forEach(function(key) {
			// TODO: potentially something better than this hacky way of positioning this!
			if (key === "TREASURE_CHEST_MINIGAME") {
				let fillerDiv = dce("div");
				fillerDiv.style = "height: 150px;";
				smallKeyProgressDiv.appendChild(fillerDiv);
			}

			let smallKeyDiv = dce("div", "small-key no-keys");
			let keyObject = Keys[key];

			keyObject.keyCount = keyObject.keyCount || 0;
			keyObject.playerHas = keyObject.playerHas || false; // For boss keys
			
			smallKeyDiv.id = key;
			smallKeyDiv.style.backgroundImage = 'url("Images/Small Key.png")';
			smallKeyDiv.onclick = _this.onSmallKeyClicked.bind(_this, keyObject, smallKeyDiv);
			smallKeyDiv.oncontextmenu = _this.onSmallKeyClicked.bind(_this, keyObject, smallKeyDiv);
			smallKeyDiv.onmouseover = _this.onSmallKeyMouseOver.bind(_this, keyObject);
			smallKeyDiv.onmouseout = _this.onItemMouseOut;
			
			_this._createCountDiv(smallKeyDiv, keyObject.keyCount ,"key-count");
			smallKeyProgressDiv.appendChild(smallKeyDiv);
			_this._updateSmallKeyCss(keyObject, smallKeyDiv);
		});
	},

	/**
	 * Creates the div for incrementable counts
	 * @param smallKeyDiv - the div to create the count for
	 */
	_createCountDiv: function(parentDiv, count, cssClass) {
		let countDiv = dce("div", cssClass);
		countDiv.innerText = count;
		parentDiv.appendChild(countDiv);
	},

	/**
	 * Updates the item when it is clicked
	 * @param keyObject - the small key data
	 * @param smallKeyDiv - the div for the small keys
	 */
	onSmallKeyClicked: function(keyObject, smallKeyDiv, event) {
		if (event.type === "click") {
			keyObject.keyCount++;
		} else if (event.type === "contextmenu") { 
			keyObject.keyCount--;
		}

		let canBeMasterQuest = Settings.RandomizerSettings.dungeonSetting !== DungeonSettings.STANDARD;
		let maxKeysToAllow = canBeMasterQuest ? 
			Math.max(keyObject.totalKeys(), keyObject.mqTotalKeys()) : keyObject.totalKeys();

		if (keyObject.name !== "Thieves' Hideout" && Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY) {
			maxKeysToAllow = 0;
		}

		if (keyObject.keyCount > maxKeysToAllow && event.type === "click") {
			keyObject.keyCount--;
		}

		if (keyObject.keyCount < 0) {
			keyObject.keyCount = 0;
		}
		this._updateSmallKeyCss(keyObject, smallKeyDiv);
		
		let keyCountDiv = smallKeyDiv.firstChild;
		keyCountDiv.innerText = keyObject.keyCount;
		
		SocketClient.inventoryUpdated("Keys", smallKeyDiv.id, keyObject);
		refreshAll();
	},

	/**
	 * Updates the CSS for the given small key div
	 * @param keyObject - the small key data
	 * @param smallKeyDiv - the div for the small keys
	 */
	_updateSmallKeyCss: function(keyObject, smallKeyDiv) {
		removeCssClass(smallKeyDiv, "no-keys");
		removeCssClass(smallKeyDiv, "some-keys");
		removeCssClass(smallKeyDiv, "minimum-keys");
		removeCssClass(smallKeyDiv, "all-keys");

		let isThievesHideout = keyObject.name === "Thieves' Hideout";
		let isTreasureChestMinigame = keyObject.name === "Treasure Chest Minigame";
		let isMasterQuest = isThievesHideout || isTreasureChestMinigame 
			? false
			: MapLocations[keyObject.name].IsMasterQuest;

		let minKeys, totalKeys;
		if (isMasterQuest) {
			minKeys = keyObject.mqMinimumKeys ? keyObject.mqMinimumKeys() : 999;
			totalKeys = keyObject.mqTotalKeys();
		} else {
			minKeys = keyObject.minimumKeys ? keyObject.minimumKeys() : 999;
			totalKeys = keyObject.totalKeys();
		}
		
		let cssClassToAdd = "no-keys";

		if (!isThievesHideout && Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY) {
			cssClassToAdd = "all-keys";
		} else {
			if (keyObject.keyCount > 0) {
				cssClassToAdd = "some-keys";
			} 
			
			if (keyObject.keyCount >= minKeys) {
				cssClassToAdd = "minimum-keys";
			} 
			
			if (keyObject.keyCount >= totalKeys) {
				cssClassToAdd = "all-keys";
			}
		}

		addCssClass(smallKeyDiv, cssClassToAdd);
	},

	/**
	 * Updates the item label when the small key is moused over
	 * @param keyObject - the small key entry hovered over
	 */
	onSmallKeyMouseOver: function(keyObject) {
		let divItemLabel = document.getElementById("itemLabel");
		divItemLabel.innerText = `${keyObject.name} Small Key`;
	},

	/**
	 * Sets up the UI for silver rupees
	 */
	_setUpSilverRupeeUI: function() {
		let silverRupeeProgressDiv = document.getElementById("silverRupeeProgress");
		let _this = this;
		Object.keys(SilverRupees).forEach(function(rupeeLocation) {
			let silverRupeeDivContainer = dce("div", "silver-rupee-container");
			silverRupeeDivContainer.id = `silverRupeeContainer-${rupeeLocation}`;
			let rupeeObject = SilverRupees[rupeeLocation];
			
			let isMasterQuest = MapLocations[rupeeObject.name].IsMasterQuest;
			let rupeeDataObject = isMasterQuest ? rupeeObject.mqRupeeData : rupeeObject.standardRupeeData;

			let rupeeDataIndices = Object.keys(rupeeDataObject);
			if (rupeeDataIndices.length < 1) {
				// Create a div to take up space - we don't want to offset all the rupees
				let silverRupeeFillerDiv = dce("div", "silver-rupee");
				silverRupeeFillerDiv.id = `silverRupee-${rupeeLocation}-filler`;
				silverRupeeDivContainer.appendChild(silverRupeeFillerDiv);
			}

			rupeeDataIndices.forEach(function(rupeeDataIndex) {
				let rupeeData = rupeeDataObject[rupeeDataIndex];
				let silverRupeeDiv = dce("div", "silver-rupee");
				silverRupeeDiv.id = `silverRupee-${rupeeLocation}-${rupeeDataIndex}`;
				silverRupeeDiv.style.color = rupeeData.color;

				silverRupeeDiv.style.backgroundImage = 'url("Images/Silver Rupee.png")';
				silverRupeeDiv.onclick = _this.onSilverRupeeClicked.bind(_this, rupeeLocation, rupeeObject, rupeeDataIndex, rupeeData, silverRupeeDiv);
				silverRupeeDiv.oncontextmenu = _this.onSilverRupeeClicked.bind(_this, rupeeLocation, rupeeObject, rupeeDataIndex, rupeeData, silverRupeeDiv);
				silverRupeeDiv.onmouseover = _this.onSilverRupeeMouseOver.bind(_this, rupeeData.name);
				silverRupeeDiv.onmouseout = _this.onItemMouseOut;
				
				let silverRupeeCount = ItemData.getSilverRupeeCount(rupeeObject, rupeeDataIndex);
				_this._createCountDiv(silverRupeeDiv, silverRupeeCount, "rupee-count");
				silverRupeeDivContainer.appendChild(silverRupeeDiv);
				_this._updateSilverRupeeCss(rupeeData.color, rupeeData.total, silverRupeeCount, silverRupeeDiv);
			});

			silverRupeeProgressDiv.appendChild(silverRupeeDivContainer);
		});
	},

	/**
	 * Updates the item when it is clicked
	 * @param silverRupeeLocation - the item key for the rupee object
	 * @param silverRupeeObject - the silver rupee data
	 * @param silverRupeeIndex - the silver rupee index to update
	 * @param silverRupeeData - the silver rupee data to reference for max values
	 * @param silverRupeeDiv - the div for the small keys
	 */
	onSilverRupeeClicked: function(rupeeLocation, silverRupeeObject, silverRupeeIndex, silverRupeeData, silverRupeeDiv, event) {
		silverRupeeObject.collectedRupees = silverRupeeObject.collectedRupees || {};
		silverRupeeObject.collectedRupees[silverRupeeIndex] = silverRupeeObject.collectedRupees[silverRupeeIndex] || 0;

		if (event.type === "click") {
			silverRupeeObject.collectedRupees[silverRupeeIndex]++;
		} else if (event.type === "contextmenu") { 
			silverRupeeObject.collectedRupees[silverRupeeIndex]--;
		}

		let canBeMasterQuest = Settings.RandomizerSettings.dungeonSetting !== DungeonSettings.STANDARD;
		let maxRupees = silverRupeeData.max || silverRupeeData.total;
		let maxRupeesToAllow = canBeMasterQuest ? maxRupees : silverRupeeData.total;

		if (silverRupeeObject.collectedRupees[silverRupeeIndex] > maxRupeesToAllow && event.type === "click") {
			silverRupeeObject.collectedRupees[silverRupeeIndex]--;
		}

		if (silverRupeeObject.collectedRupees[silverRupeeIndex] < 0) {
			silverRupeeObject.collectedRupees[silverRupeeIndex] = 0;
		}
		this._updateSilverRupeeCss(
			silverRupeeData.color, 
			silverRupeeData.total, 
			ItemData.getSilverRupeeCount(silverRupeeObject, silverRupeeIndex), 
			silverRupeeDiv);
		
		let rupeeCountDiv = silverRupeeDiv.firstChild;
		rupeeCountDiv.innerText = silverRupeeObject.collectedRupees[silverRupeeIndex];
		
		SocketClient.inventoryUpdated("SilverRupees", rupeeLocation, silverRupeeObject);
		refreshAll();
	},

	/**
	 * Updates the CSS for the given silver rupee div
	 * @param divColor - the div color to use (in the rupee data itself)
	 * @param maxRupeesNeeded - the max number of rupees for this group
	 * @param totalRupeesOwned - the total number of rupees currently owned
	 * @param silverRupeeDiv - the div to update
	 */
	_updateSilverRupeeCss: function(divColor, maxRupeesNeeded, totalRupeesOwned, silverRupeeDiv) {
		if (totalRupeesOwned >= maxRupeesNeeded) {
			silverRupeeDiv.style.color = "#ADFF2F";
		} else {
			silverRupeeDiv.style.color = divColor;
		}
	},

	/**
	 * Updates the item label when the silver rupee is moused over
	 * @param rupeeDataName - the name of the rupee data
	 */
	onSilverRupeeMouseOver: function(rupeeDataName) {
		let divItemLabel = document.getElementById("itemLabel");
		divItemLabel.innerText = rupeeDataName;
	}
};