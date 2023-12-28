/**
 * Used to create the divs for the entrance item groups that contain groups of
 * tasks that can be done at a given location
 * @param itemLocation - the item location
 * @return the div
 */
let EntranceUI = {
	/**
	 * Creates the group div for the item location
	 * @param itemLocation - the item location
	 * @param itemLocationEntranceTasksContainer - the container to place the tasks for the entrance into
	 * @return - the group div
	 */
	createEntranceGroupDiv: function(itemLocation, itemLocationEntranceTasksContainer) {
		let mainDiv = dce("div", "entrance-group-container");
		mainDiv.id = `${itemLocation.Name}-entrance-groups`;

		this.createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
		
		return mainDiv;
	},
	
	/**
	 * Gets the entrance data object based on the given item location
	 * @param itemLocation - the item location
	 * @return
	 */
	getEntranceData: function(itemLocation) {
		if (itemLocation.IsInterior) {
			return InteriorGroups;
		} else if (itemLocation.IsGrotto) {
			return GrottoGroups;
		} else if (itemLocation.IsBoss) {
			return BossGroups;
		} else if (itemLocation.IsItemLocationGroup) {
			return ItemLocationGroups;
		}
		throw `${itemLocation.Name} was meant to be an interior, grotto, or boss but doesn't have the correct properties set!`;
	},
	
	/**
	 * Gets the entrance group background string
	 * @param group - the group
	 * @param groupName - the name of the group
	 */
	getEntranceGroupIcon: function(group, groupName) {
		let iconName = group.icon ? group.icon : groupName;
		return `url("Images/${iconName}.png")`;
	},

	/**
	 * Gets the icon for the given item location - either the selected group icon, or the group
	 * as a whole if nothing is selected
	 * @param itemLocation - the item location to get the icon for
	 * @returns 
	 */
	getEntranceGroupIconOrSelectedEntrance: function(itemLocation) {
		let group = Data.getEntranceGroup(itemLocation);
		let groupId = itemLocation.ItemGroup;
		return (groupId === ItemGroups.ENTRANCE && group)
			? this.getEntranceGroupIcon(group, group.name)
			: getItemGroupImagePath(groupId, itemLocation.MapImageName);
	},

	/**
	 * Gets the group names form the given group that are not meant to be excluded
	 * @param groupObject - the group object - one of Interior/Grotto/Boss groups
	 * @param itemToInclude - an item to always include - ignores the excludeFromGroup filter
	 * @returns - the arra of filtered group names
	 */
	getFilteredGroupNames: function(groupObject, itemToInclude) {
		return Object.keys(groupObject).filter(function(key) {
			let item = groupObject[key];
			return key === itemToInclude || !item.excludeFromGroup || !item.excludeFromGroup();
		});
	},

	/**
	 * Initializes the entrance group data for the given item location and group
	 * @param {Any} itemLocation - the item location
	 * @param {string} groupName - the name of the group
	 */
	initializeEntranceGroupData: function(itemLocation, groupName) {
		let entranceData = this.getEntranceData(itemLocation);
		let group = entranceData[groupName];
		let groupProperty = Data.usesDefaultGroup(itemLocation) ? "DefaultEntranceGroup" : "EntranceGroup";

		if (!group) {
			throw Error(`ERROR in EntranceUI.initializeEntranceGroupData: Attempted to initialize non-existent group '${groupName}' for item location '${itemLocation.Name}'`);
		}

		itemLocation[groupProperty] = {
			name: groupName,
			isShop: group.isShop,
			skipItemGroupCheck: group.skipItemGroupCheck,
			icon: group.icon,
			isTempleOfTime: group.isTempleOfTime,
			hasGossipStone: group.hasGossipStone,
			buttons: {},
			totalTasks: Object.keys(group.buttons).length
		};

		Object.keys(group.buttons).forEach(buttonName => {
			let checksOnButton = group.buttons[buttonName].count;
			itemLocation[groupProperty].buttons[buttonName] = {
				hasMultipleChecks: !!checksOnButton,
				count: checksOnButton || 1,
				completedCount: 0,
				completed: false
			};
			itemLocation[groupProperty].buttons[buttonName]
		});
	},

	/**
	 * Creates the div with the possible items to get at a given item group
	 * @param itemLocation - the item location the groups are for
	 * @param itemLocationEntranceTasksContainer - the div to append the button divs to
	 * @return The div
	 */
	createButtonDivs: function(itemLocation, itemLocationEntranceTasksContainer) {
		let itemLocationGroup = Data.getEntranceGroup(itemLocation);
		let groupName = itemLocationGroup.name;
		let selectedGroup = this.getEntranceData(itemLocation)[groupName];
		let buttonKeys = Object.keys(selectedGroup.buttons);
		let _this = this;

		let canGetToAsChild = Data.getItemObtainability(itemLocation, Age.CHILD);
		let canGetToAsAdult = Data.getItemObtainability(itemLocation, Age.ADULT);
		
		let visibleButtonCount = 0;
		buttonKeys.forEach(function(buttonName) {
			let button = selectedGroup.buttons[buttonName];
			let shouldNotDisplayButton = button.shouldNotDisplay && button.shouldNotDisplay();
			let shouldExcludeEquivalentItem = false;

			if (!shouldNotDisplayButton && button.itemGroup) {
				shouldNotDisplayButton = shouldDisableItemLocationGroup(button.itemGroup, itemLocation.IsDungeon);
			}

			if (itemLocation.IsInterior || itemLocation.IsGrotto) {
				let itemsToExclude;
				if (itemLocation.IsInterior) {
					itemsToExclude = Settings.ItemLocationsToExclude.Interiors;
				} else {
					itemsToExclude = Settings.ItemLocationsToExclude.Grottos;
				}
				
				if (itemsToExclude) {
					let groupItemsToExclude = itemsToExclude[groupName];
					shouldExcludeEquivalentItem = groupItemsToExclude && groupItemsToExclude.includes(buttonName);
					button.excluded = shouldExcludeEquivalentItem;
				}
			}
			
			if (shouldNotDisplayButton || shouldExcludeEquivalentItem) { return; }
			
			let buttonDiv = dce("div", "entrance-group-button");
			let buttonIconName = button.icon ? button.icon : buttonName;
			buttonDiv.title = button.description;
			buttonDiv.style.backgroundImage = button.useGroupImage
				? _this.getEntranceGroupIcon(itemLocationGroup, groupName)
				: `url("Images/${buttonIconName}.png")`;

			if (button.time) {
				if (button.time() === Time.DAY) {
					addCssClass(buttonDiv, "entrance-group-button-time-day");
				} else if (button.time() === Time.NIGHT) {
					addCssClass(buttonDiv, "entrance-group-button-time-night");
				}
			}

			buttonDiv.onclick = function(event) {
				event.stopPropagation();

				if (event.shiftKey) {
					let buttonNames = [];
					Object.keys(selectedGroup.buttons).forEach(function(currentButtonName) {
						let currentButton = selectedGroup.buttons[currentButtonName];
						if (currentButton.itemGroup === button.itemGroup && currentButton.tag === button.tag) {
							buttonNames.push(currentButtonName);
						}
					});

					buttonNames.forEach(function(name) {
						_this._markButtonAsComplete(itemLocationGroup, itemLocation, button, name, buttonDiv, true);
					});
				} else {
					_this._advanceButton(itemLocationGroup.buttons[buttonName]);
					_this._markButtonAsComplete(itemLocationGroup, itemLocation, button, buttonName, buttonDiv);
				}
				
				SocketClient.itemLocationUpdated(itemLocation);
				refreshAll();
			};

			buttonDiv.oncontextmenu = function(event) {
				event.preventDefault();
				event.stopPropagation();

				_this._advanceButton(itemLocationGroup.buttons[buttonName], true, event.shiftKey);
				_this._markButtonAsComplete(itemLocationGroup, itemLocation, button, buttonName, buttonDiv);

				SocketClient.itemLocationUpdated(itemLocation);
				refreshAll();
			};

			let canGetAsChild = canGetToAsChild && 
				_this._canGetAsAge(button, Age.CHILD) && 
				(!button.canGet || button.canGet(Age.CHILD, itemLocation));
			let canGetAsAdult = canGetToAsAdult && 
				_this._canGetAsAge(button, Age.ADULT) && 
				(!button.canGet || button.canGet(Age.ADULT, itemLocation));
			
			if (itemLocationGroup.buttons[buttonName].completed) {
				addCssClass(buttonDiv, "entrance-group-button-completed");
			}
			else if (!canGetAsAdult && !canGetAsChild) {
				addCssClass(buttonDiv, "entrance-group-button-cannot-do");
			}
			
			_this._addAgeDiv(buttonDiv, button, canGetAsChild, canGetAsAdult);
			_this._addTextDiv(buttonDiv, button, itemLocationGroup.buttons[buttonName]);
			visibleButtonCount++;
			itemLocationEntranceTasksContainer.appendChild(buttonDiv);
		});
	},

	/**
	 * Advances the count on the button - including marking it as completed if necessary
	 * @param button - The button to advance
	 * @param onRightClick - Whether this was a right click - will reduce the cont
	 * @param onShiftHeld - Whether shift was held - will clear the entire entry if right clicked
	 */
	_advanceButton: function(button, onRightClick, onShiftHeld) {
		// Its a normal button, so this becomes a toggle
		if (!button.hasMultipleChecks) {
			button.completedCount = button.completedCount >= 1 ? 0 : 1;
			return;
		} 
		
		// On a right click, reduce the count
		if (onRightClick) {
			let countToSet = onShiftHeld ? 0 : button.completedCount - 1;
			button.completedCount = Math.max(countToSet, 0);
			return;
		} 

		// Sanitize the data if everything is completed already
		if (button.completedCount >= button.count) { 
			button.completedCount = button.count;
			return; 
		}

		// Otherwise, increment the count
		button.completedCount++;
	},

	_markButtonAsComplete: function(itemLocationGroup, itemLocation, button, buttonName, buttonDiv, forceComplete) {
		let buttonData = itemLocationGroup.buttons[buttonName];

		// Force obtain all items in the group
		if (forceComplete) {
			buttonData.completedCount = buttonData.count;
		}

		if (buttonData.completedCount >= buttonData.count) {
			buttonData.completed = true;
			addCssClass(buttonDiv, "entrance-group-button-completed");
		} else {
			itemLocation.playerHas = false;
			buttonData.completed = false;
			removeCssClass(buttonDiv, "entrance-group-button-completed");
		}
		
		if (this.isGroupComplete(itemLocation)) {
			itemLocation.playerHas = true;
		}

		if (button.postClick) {
			button.postClick(itemLocationGroup.buttons[buttonName].completed);
		}
	},
	
	/**
	 * Adds the age icon to the button div if appropriate
	 * @param buttonDiv - the button div
	 * @param button - the button containing the data
	 * @param canGetToAsChild - whether you can get to the item location as a child
	 * @param canGetToAsAdult - whether you can get to the item location as an adult
	 */
	_addAgeDiv: function(buttonDiv, button, canGetAsChild, canGetAsAdult) {
		let childOnlyItem = this._canGetAsAge(button, Age.CHILD, true);
		let adultOnlyItem = this._canGetAsAge(button, Age.ADULT, true);
		
		let canOnlyGetAsChild = (childOnlyItem && !adultOnlyItem) || (canGetAsChild && !canGetAsAdult);
		let canOnlyGetAsAdult = (!childOnlyItem && adultOnlyItem) || (!canGetAsChild && canGetAsAdult);
		if (!canOnlyGetAsChild && !canOnlyGetAsAdult) { return; }

		let ageDiv = dce("div", "entrance-group-age-div");
		if (canOnlyGetAsChild) {
			addCssClass(ageDiv, "entrance-group-age-div-child");
		} else if (canOnlyGetAsAdult) {
			addCssClass(ageDiv, "entrance-group-age-div-adult");
		}
		
		buttonDiv.appendChild(ageDiv);
	},

	/**
	 * Adds any additional text to the button, if it has any in the iconText property
	 * Prioritizes adding the item count, if there is any
	 * @param buttonDiv - the button div
	 * @param button - the button containing the data
	 * @param buttonData - the button containing the data we save - used to determine the current number of active tasks
	 */
	_addTextDiv: function(buttonDiv, button, buttonData) {
		let textDiv = dce("div", "entrance-group-text-div");
		if (buttonData.hasMultipleChecks) {
			textDiv.innerText = `${buttonData.completedCount}/${buttonData.count}`;
			buttonDiv.appendChild(textDiv);
		} else if (button.iconText) {
			textDiv.innerText = button.iconText;
			buttonDiv.appendChild(textDiv);
		}
	},
	
	/**
	 * Clears the group choice and resets the div
	 * @param itemLocation - the item location
	 */
	clearGroupChoice: function(itemLocation) {
		// Do not clear anything if the group is default - means it isn't shuffled!
		if (Data.usesDefaultGroup(itemLocation)) { return; }

		let itemLocationGroup = Data.getEntranceGroup(itemLocation);
		if (!itemLocationGroup) { return; }

		let selectedGroup = this.getEntranceData(itemLocation)[itemLocationGroup.name];
		if (selectedGroup.postClick) { selectedGroup.postClick(itemLocation, false); }

		let buttonKeys = Object.keys(selectedGroup.buttons);
		buttonKeys.forEach(function(buttonName) {
			let button = selectedGroup.buttons[buttonName];
			if (button.postClick) {
				button.postClick(false);
			}
		});
		
		let groupProperty = Data.usesDefaultGroup(itemLocation) ? "DefaultEntranceGroup" : "EntranceGroup";
		delete itemLocation[groupProperty];
		
		if (itemLocation.ExitMap === ItemLocationDisplay.currentLocationName) {
			let dropdownDiv = DropdownUI.getItemLocationDropdown(itemLocation);
			dropdownDiv.value = "<no selection>";
			
			let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
			itemLocationEntranceTasksContainer.innerHTML = "";
		}
		itemLocation.playerHas = false;
		
		ItemLocationDisplay.refreshNotes(itemLocation);
		refreshAll();
	},
	
	/**
	 * Refreshes the buttons - called when an item or item location is clicked
	 * @param itemLocation - the item location
	 */
	refreshButtons: function(itemLocation) {
		let mainDiv = document.getElementById(`${itemLocation.Name}-entrance-groups`);
		if (mainDiv) {
			addOrRemoveCssClass(mainDiv, "nodisp", Data.getEntranceGroup(itemLocation));
		}
		
		let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
		itemLocationEntranceTasksContainer.innerHTML = "";
		
		this.createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
	},
	
	/**
	 * Gets whether the group is all completed
	 * @param itemLocation - the item location
	 * @return
	 */
	isGroupComplete: function(itemLocation) {
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call isGroupComplete with an item location that doesn't have a group selected!";
		}
		
		return this.getNumberOfCompletedTasks(itemLocation) >= this.getNumberOfTasks(itemLocation);
	},
	
	/**
	 * Gets the number of tasks that are currently active (that is, not hidden)
	 * This ONLY cares about number of active buttons, NOT the tasks ON the buttons!
	 */
	getNumberOfActiveButtons: function(itemLocation) {
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call getNumberOfActiveButtons with an item location that doesn't have a group selected!";
		}

		let activeTasks = 0;
		let entranceData = this.getEntranceData(itemLocation);
		let _this = this;
		Object.keys(selectedGroup.buttons).forEach(buttonName => {
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (_this._excludeButtonFromCounts(button, itemLocation)) { return; }
			
			activeTasks++;
		});
		
		return activeTasks;
	},
	
	/**
	 * Gets the number of tasks you can complete - intended to only be called for
	 * item locations that have their group selected!
	 * @param itemLocation - the item location
	 * @param age - the age to check
	 * @return 
	 */
	getNumberOfCompletableTasks: function(itemLocation, age) {
		// If the age can't get to the location, then there's no completable tasks!
		if (!Data.getItemObtainability(itemLocation, age)) {
			return 0;
		}

		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call getNumberOfCompletableTasks with an item location that doesn't have a group selected!";
		}
		
		let numberOfTasks = 0;
		if (!age) { age === Age.EITHER; }
		
		let _this = this;
		let entranceData = this.getEntranceData(itemLocation);
		Object.keys(selectedGroup.buttons).forEach(function (buttonName) {
			let buttonData = selectedGroup.buttons[buttonName];
			if (buttonData.completed) { return; }
			
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (_this._excludeButtonFromCounts(button, itemLocation)) { return; }
			
			let canGetItem = !button.canGet || button.canGet(age, itemLocation);
			if (canGetItem && _this._canGetAsAge(button, age)) {
				numberOfTasks += buttonData.count - buttonData.completedCount;
			}
		});
		
		return numberOfTasks;
	},
	
	/**
	 * Gets the total number of tasks for a given age
	 * @param itemLocation - the item location
	 * @param age - the age to check
	 * @return
	 */
	getNumberOfTasks: function(itemLocation, age) {
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call getNumberOfTasks with an item location that doesn't have a group selected!";
		}
		
		let numberOfTasks = 0;
		let _this = this;
		let entranceData = this.getEntranceData(itemLocation);
		Object.keys(selectedGroup.buttons).forEach(function (buttonName) {
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (!_this._excludeButtonFromCounts(button, itemLocation) && (age === undefined || _this._canGetAsAge(button, age))) {
				numberOfTasks += selectedGroup.buttons[buttonName].count;
			}
		});
		
		return numberOfTasks;
	},
	
	/**
	 * Returns whether the is<Age>Only function will allow you to ever complete the task
	 * as the given age
	 * @param button - the button with the task info
	 * @param age - the age to check
	 * @return
	 */
	_canGetAsAge(button, age, ignoreCanBeAge) {
		canGetAsAge = age === Age.EITHER;

		if (!ignoreCanBeAge && age !== Age.EITHER && !Data.canBeAge(age)) {
			return false;
		}
		
		if (age === Age.ADULT) {
			canGetAsAge = !button.isChildOnly || !button.isChildOnly();

			// Adult cannot equip the mask of truth
			if (canGetAsAge && button.itemGroup === ItemGroups.GOSSIP_STONE) {
				canGetAsAge = Settings.RandomizerSettings.gossipStoneSetting !== GossipStoneSettings.MASK_OF_TRUTH;
			}
		} else if (age === Age.CHILD) {
			canGetAsAge = !button.isAdultOnly || !button.isAdultOnly();
		}
		
		return canGetAsAge;
	},
	
	/**
	 * Gets the number of completed tasks
	 * @param itemLocation - the item location
	 * @return
	 */
	getNumberOfCompletedTasks: function(itemLocation, age) {
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call getNumberOfCompletedTasks with an item location that doesn't have a group selected!";
		}

		let numberOfTasks = 0;
		let _this = this;
		let entranceData = this.getEntranceData(itemLocation);
		Object.keys(selectedGroup.buttons).forEach(function (buttonName) {
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (!_this._excludeButtonFromCounts(button, itemLocation) && (age === undefined || _this._canGetAsAge(button, age))) {
				numberOfTasks += selectedGroup.buttons[buttonName].completedCount;
			}
		});
		
		return numberOfTasks;
	},

	/**
	 * Whether we should be excluding the button from counts
	 * Includes explicit exclusions, shouldNotDisplay, and whether it's excluded based on the item group
	 * @param {Any} button - the button
	 * @param {Any} itemLocation - the itemLocation being checked
	 */
	_excludeButtonFromCounts: function(button, itemLocation) {
		return button.excluded || 
			(button.shouldNotDisplay && button.shouldNotDisplay()) || 
			(button.itemGroup && shouldDisableItemLocationGroup(button.itemGroup, itemLocation.IsDungeon));
	}
}