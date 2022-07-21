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
		
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (selectedGroup) {
			this._createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
		} else {
			this._createGroupDivs(itemLocation, mainDiv, itemLocationEntranceTasksContainer);
		}
		
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
		}
		throw `${itemLocation.Name} was meant to be an interior, grotto, or boss but doesn't have the correct properties set!`;
	},
	
	/**
	 * Gets the entrance group background string
	 * @param groupName - the name of the group
	 */
	getEntranceGroupIcon(groupName) {
		return `url("Images/Entrance Groups/Group - ${groupName}.png")`;
	},

	/**
	 * Creates the div with item groups
	 * @param itemLocation - the item location the groups are for
	 * @param mainDiv - the div to append the group divs to
	 * @param itemLocationEntranceTasksContainer - the container to place the tasks for the entrance into
	 * @return The div
	 */
	_createGroupDivs: function(itemLocation, mainDiv, itemLocationEntranceTasksContainer) {
		let entranceData = this.getEntranceData(itemLocation);
		let groupKeys = Object.keys(entranceData);
		let _this = this;
		groupKeys.forEach(function(groupName) {
			let group = entranceData[groupName];
			if (group.excludeFromGroup && group.excludeFromGroup()) { return; }

			let groupDiv = dce("div", "entrance-group");
			let shouldAlwaysDisplayGroup = Data.shouldDisplayItemLocation(itemLocation) && group.neverHide;

			if (!shouldAlwaysDisplayGroup && (itemLocation.IsInterior || itemLocation.IsGrotto)) {
				let shouldNotDisplayGroup = group.shouldNotDisplay && group.shouldNotDisplay();
				let itemsToExclude;
				if (itemLocation.IsInterior) {
					itemsToExclude = Settings.ItemLocationsToExclude.Interiors;
				} else {
					itemsToExclude = Settings.ItemLocationsToExclude.Grottos;
				}
				
				let allItemsExcluded = false;
				if (itemsToExclude) {
					let groupItemsToExclude = itemsToExclude[groupName];
					allItemsExcluded = groupItemsToExclude && groupItemsToExclude.length === Object.keys(group.buttons).length;
				}

				if (shouldNotDisplayGroup || allItemsExcluded) { return; }
			}

			groupDiv.style.backgroundImage = _this.getEntranceGroupIcon(groupName);
			groupDiv.title = group.tooltip;
			
			groupDiv.onclick = function(event) {
				event.stopPropagation();

				let group = entranceData[groupName];
				if (group.shouldNotTrigger && group.shouldNotTrigger()) {
					return;
				}
				
				_this.initializeEntranceGroupData(itemLocation, groupName);
				
				mainDiv.innerHTML = "";
				_this._createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
				
				if (Data.isItemLocationAShop(itemLocation)) {
					_toggleMoreInfo(document.getElementById(itemLocation.Name), itemLocation, true);
				}
				
				_refreshNotes(itemLocation);
				
				if (group.postClick) {
					group.postClick(itemLocation, true);
				}
		
				SocketClient.itemLocationUpdated(itemLocation);
				refreshAll();
			};
			
			mainDiv.appendChild(groupDiv);
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

		itemLocation[groupProperty] = {
			name: groupName,
			isShop: group.isShop,
			isTempleOfTime: group.isTempleOfTime,
			hasGossipStone: group.hasGossipStone,
			completed: {},
			buttonNames: Object.keys(group.buttons),
			totalTasks: Object.keys(group.buttons).length
		};
	},

	/**
	 * Creates the div with the possible items to get at a given item group
	 * @param itemLocation - the item location the groups are for
	 * @param itemLocationEntranceTasksContainer - the div to append the button divs to
	 * @return The div
	 */
	_createButtonDivs: function(itemLocation, itemLocationEntranceTasksContainer) {
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
			buttonDiv.style.backgroundImage = `url("Images/Entrance Groups/Button - ${buttonIconName}.png")`;
			buttonDiv.onclick = function(event) {
				event.stopPropagation();
				
				if (itemLocationGroup.completed[buttonName]) { 
					delete itemLocationGroup.completed[buttonName]; 
					itemLocation.playerHas = false;
				} else { 
					itemLocationGroup.completed[buttonName] = true; 
				}
				toggleCssClass(buttonDiv, "entrance-group-button-completed");
				
				if (_this.isGroupComplete(itemLocation)) {
					itemLocation.playerHas = true;
				}

				if (button.postClick) {
					button.postClick(itemLocationGroup.completed[buttonName]);
				}
				
				SocketClient.itemLocationUpdated(itemLocation);
				refreshAll();
			}

			let canGetAsChild = canGetToAsChild && _this._canGetAsAge(button, Age.CHILD) && (!button.canGet || button.canGet(Age.CHILD));
			let canGetAsAdult = canGetToAsAdult && _this._canGetAsAge(button, Age.ADULT) && (!button.canGet || button.canGet(Age.ADULT));
			
			if (itemLocationGroup.completed[buttonName]) {
				addCssClass(buttonDiv, "entrance-group-button-completed");
			}
			else if (!canGetAsAdult && !canGetAsChild) {
				addCssClass(buttonDiv, "entrance-group-button-cannot-do");
			}
			
			_this._addAgeDiv(buttonDiv, button, canGetAsChild, canGetAsAdult);
			visibleButtonCount++;
			itemLocationEntranceTasksContainer.appendChild(buttonDiv);
		});
		
		if (visibleButtonCount < 1) {
			itemLocation.playerHas = true;
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
		
		if (itemLocation.ExitMap === _currentLocationName) {
			let mainDiv = document.getElementById(`${itemLocation.Name}-entrance-groups`);
			mainDiv.innerHTML = "";
			removeCssClass(mainDiv, "nodisp");
			
			let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
			itemLocationEntranceTasksContainer.innerHTML = "";
			this._createGroupDivs(itemLocation, mainDiv, itemLocationEntranceTasksContainer);
		}
		itemLocation.playerHas = false;
		
		_refreshNotes(itemLocation);
		SocketClient.itemLocationUpdated(itemLocation);
		refreshAll();
	},
	
	/**
	 * Refreshes the buttons - called when an item or item location is clicked
	 * @param itemLocation - the item location
	 */
	refreshButtons: function(itemLocation) {
		let mainDiv = document.getElementById(`${itemLocation.Name}-entrance-groups`);
		addOrRemoveCssClass(mainDiv, "nodisp", Data.getEntranceGroup(itemLocation));
		
		let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
		itemLocationEntranceTasksContainer.innerHTML = "";
		
		this._createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
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
		
		return Object.keys(selectedGroup.completed).length === this.getNumberOfActiveTasks(itemLocation);
	},
	
	/**
	 * Gets the number of tasks that are currently active (that is, not hidden)
	 */
	getNumberOfActiveTasks: function(itemLocation) {
		let selectedGroup = Data.getEntranceGroup(itemLocation);
		if (!selectedGroup) {
			throw "Should not call getNumberOfActiveTasks with an item location that doesn't have a group selected!";
		}

		let activeTasks = 0;
		let entranceData = this.getEntranceData(itemLocation);
		selectedGroup.buttonNames.forEach(function (buttonName) {
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (button.excluded || (button.shouldNotDisplay && button.shouldNotDisplay())) { return; }
			
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
		selectedGroup.buttonNames.forEach(function (buttonName) {
			if (selectedGroup.completed[buttonName]) { return; }
			
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (button.excluded || (button.shouldNotDisplay && button.shouldNotDisplay())) { return; }
			
			let canGetItem = !button.canGet || button.canGet(age);
			if (canGetItem && _this._canGetAsAge(button, age)) {
				numberOfTasks++; 
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
		selectedGroup.buttonNames.forEach(function (buttonName) {
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (!(button.exlcuded || (button.shouldNotDisplay && button.shouldNotDisplay())) && _this._canGetAsAge(button, age)) {
				numberOfTasks++; 
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
		selectedGroup.buttonNames.forEach(function (buttonName) {
			if (!selectedGroup.completed[buttonName]) { return; }
			
			let button = entranceData[selectedGroup.name].buttons[buttonName];
			if (!(button.excluded || (button.shouldNotDisplay && button.shouldNotDisplay())) && _this._canGetAsAge(button, age)) {
				numberOfTasks++; 
			}
		});
		
		return numberOfTasks;
	}
}