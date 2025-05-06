let SettingsPage = {
    _randomizerSettingsExpanded: true,
    _glitchesSettingsExpanded: true,

    display: function() {
        LocationSidebar.updateSidebarLocation();
        LocationSidebar.displayContainer("settingsContainer");
        ItemLocationDisplay.currentLocationName = "Settings";
        
        this._initializeCheckBoxes();
        this._initializeRadioButtons();
        this._initializeInputFields();
        this._initializeTricksContainer();
    },

    /**
     * Initializes all the check boxes on the page
     */
    _initializeCheckBoxes: function() {
        let _this = this;
        Object.keys(Settings.RandomizerSettings).forEach(function(settingName) {
            _this.setCheckboxStateForRandomizer(settingName);
        });

        Object.keys(Settings.TrackerSettings).forEach(function(settingName) {
            _this.setCheckboxStateForTracker(settingName);
        });
    },

    /**
     * Initializes all the radio buttons on the page
     */
    _initializeRadioButtons: function() {
    	this._initializeRadioButton("startingAge", Settings.RandomizerSettings.startingAge, true);
        this._initializeRadioButton("dungeonSetting", Settings.RandomizerSettings.dungeonSetting);
        this._initializeRadioButton("smallKeySetting", Settings.RandomizerSettings.smallKeySetting);
        this._initializeRadioButton("chestMinigameSmallKeySetting", Settings.RandomizerSettings.chestMinigameSmallKeySetting);
        this._initializeRadioButton("skulltulaSetting", Settings.RandomizerSettings.skulltulaSetting);
        this._initializeRadioButton("rupeeAndHeartSetting", Settings.RandomizerSettings.rupeeAndHeartSetting);
        this._initializeRadioButton("potSetting", Settings.RandomizerSettings.potSetting);
        this._initializeRadioButton("crateSetting", Settings.RandomizerSettings.crateSetting);
        this._initializeRadioButton("openKakariko", Settings.RandomizerSettings.openKakariko);
        this._initializeRadioButton("openZorasFountain", Settings.RandomizerSettings.openZorasFountain);
        this._initializeRadioButton("openGerudosFortress", Settings.RandomizerSettings.openGerudosFortress);
        this._initializeRadioButton("medallionSetting", Settings.RandomizerSettings.medallionSetting);
        this._initializeRadioButton("entranceShuffleSetting", Settings.RandomizerSettings.entranceShuffleSetting);
        this._initializeRadioButton("gossipStoneSetting", Settings.RandomizerSettings.gossipStoneSetting);
        this._initializeRadioButton("maxRequiredTokens", Settings.RandomizerSettings.maxRequiredTokens);
    },
    
    /**
     * Initializes the radio button with the given setting name to the given setting value
     */
    _initializeRadioButton(settingName, settingValue, isStringEnum) {
         let settingOptions = document.getElementsByName(settingName);
         settingOptions.forEach(function(radioButton) {
        	 let value = isStringEnum ? radioButton.value : Number(radioButton.value);
             if (value === settingValue) {
                 radioButton.checked = true;
             }
         });
    },
    
    /**
     * Initializes the input fields
     */
    _initializeInputFields: function() {
        let fileNameValue = Settings.TrackerSettings.saveFileName;
        let fileNameInput = document.getElementById("settingsSaveFileNameInput");
        fileNameInput.value = fileNameValue;

    	let medallionValue = Settings.RandomizerSettings.medallionSkulltulaSetting || 50;
        let medallionInput = document.getElementById("medallionSkulltulaInput");
    	medallionInput.value = medallionValue;
    },

    /**
     * Sets the save file name to whatever is in the input box
     */
    setSaveFileName: function(event) {
        let input = event.target;
        input.value = input.value.trim();
        Settings.TrackerSettings.saveFileName = input.value;
    },

    /**
	 * Sets the checkbox state of the given setting. This is used by each input element
	 * when first loading the page.
	 */
	setCheckboxStateForRandomizer: function(settingName) {
		let settingValue = Settings.RandomizerSettings[settingName];
		if (settingValue === undefined) { return; }

        let inputElement = document.getElementsByName(settingName);
        if (inputElement[0]) {
            inputElement[0].checked = settingValue;
        }
    },

    /**
	 * Sets the checkbox state of the given setting. This is used by each input element
	 * when first loading the page.
	 */
	setCheckboxStateForTracker: function(settingName) {
		let settingValue = Settings.TrackerSettings[settingName];
		if (settingValue === undefined) { return; }

        let inputElement = document.getElementsByName(settingName);
        if (inputElement[0]) {
            inputElement[0].checked = settingValue;
        }
	},

	/**
	 * Sets the value of the given setting name to whether the event's
	 * target is checked or not
	 * @param settingName: The name of the setting - this is the key of the Setting object
	 * @param event: Used to stop propagation to prevent double execution
	 */
	setBooleanValueForRandomizer: function(settingName, event) {
		event.stopPropagation();
		if (Settings.RandomizerSettings[settingName] === undefined) {
			Settings.RandomizerSettings[settingName] = false;
		}

		let inputElement = document.getElementsByName(settingName)[0];
		Settings.RandomizerSettings[settingName] = inputElement.checked;
		ItemTracker.setUp();
		refreshAll();
	},

    /**
     * Initialized the tricks container based on the Tricks object
     * Only initializes the actual HTML once - if already done, will set the state of the checkboxes
     */
    _initializeTricksContainer() {
        let tricksContainer = document.getElementById("tricksContainer");
        if (tricksContainer.innerHTML !== "") {
            this._setTrickCheckboxes();
            return;
        }

        let tricksHeader = dce("span", "settings-header");
        tricksHeader.innerText = "Glitches/Tricks";
        tricksHeader.onclick = SettingsPage.expandOrCollapseAllGlitchesSettings.bind(this);

        tricksContainer.appendChild(tricksHeader);

        let _this = this;
        let currentCategoryTricksContainerDiv;
        Object.keys(Tricks).forEach(trickName => {
            let trick = Tricks[trickName];

            if (trick.isCategory) {
                let categoryTricksContainerId = `settings-tricks-container-${trick.displayText}`;
                
                let categoryContainerDiv = dce("div", "settings-group");
                categoryContainerDiv.id = `settings-trick-category-${trick.displayText}`;
                
                let categoryTitle = dce("span");
                categoryTitle.innerText = trick.displayText;
                categoryTitle.onclick = _this.showOrHideGroup.bind(_this, null, categoryTricksContainerId, undefined);

                currentCategoryTricksContainerDiv = dce("div", "settings-tricks-container")
                currentCategoryTricksContainerDiv.id = categoryTricksContainerId;
                addOrRemoveCssClass(currentCategoryTricksContainerDiv, "nodisp", !_this._glitchesSettingsExpanded);
                
                categoryContainerDiv.appendChild(categoryTitle);
                categoryContainerDiv.appendChild(currentCategoryTricksContainerDiv);
                tricksContainer.appendChild(categoryContainerDiv);
                return;
            }

            let trickDiv = dce("div", "settings-trick");
            trickDiv.id = `settings-trick-${trick.displayText}`;
            trickDiv.onclick = function(event) {
                event.stopPropagation();
            };

            let trickLabel = dce("label");
            trickLabel.title = trick.description;
            trickLabel.onclick = function(event) {
                event.stopPropagation();
                _this.setBooleanValueForTricks(trickName);
            };

            let trickCheckbox = dce("input");
            trickCheckbox.type = "checkbox";
            trickCheckbox.name = trickName;
            trickCheckbox.value = trickName;
            trickCheckbox.checked = trick.enabled;

            let trickDisplayText = dce("span");
            trickDisplayText.innerText = trick.displayText;

            trickLabel.appendChild(trickCheckbox);
            trickLabel.appendChild(trickDisplayText);
            trickDiv.appendChild(trickLabel);

            _this.appendLinksToTrick(trickLabel, trick.links);

            currentCategoryTricksContainerDiv.appendChild(trickDiv);
        });
    },

    /**
     * Appends links to the trick label so they can be viewed for reference
     * @param {HTMLElement} trickLabel - The label to append the links to
     * @param {Array<Object>} linkObjects - An array of objects, 
     * containing url to link to, and a description to use as a tooltip
     * @returns 
     */
    appendLinksToTrick: function(trickLabel, linkObjects) {
        if (!linkObjects) {
            return;
        }

        Object.values(linkObjects).forEach(linkObject => {
            let link = dce("span", "settings-link");
            link.innerText = "🔗";
            link.title = linkObject.description;
            link.onclick = function(event) {
                event.stopPropagation();
                event.preventDefault();
                window.open(linkObject.url, '_blank');
            }
                
            trickLabel.appendChild(link);
        });
    },

    /**
     * Sets the checkboxes of all tricks to the state of the Tricks object
     */
    _setTrickCheckboxes: function() {
        Object.keys(Tricks).forEach(trickName => {
            let checkbox = document.querySelector(`input[name="${trickName}"]`);
            if (checkbox) {
                checkbox.checked = Tricks[trickName].enabled;
            }
        });
    },

	/**
	 * Sets the enabled value of the given trick name to whether the event's
	 * target is checked or not
	 * @param trickName: The name of the trick - this is the key of the Tricks object
	 */
	setBooleanValueForTricks: function(trickName) {
		if (Tricks[trickName] === undefined) {
			console.log(`ERROR: tried to set value for non-existant glitch: `);
            return;
		}

		let inputElement = document.getElementsByName(trickName)[0];
		Tricks[trickName].enabled = inputElement.checked;
        LockedDoorWalker.computeAll();
		ItemTracker.setUp();
		refreshAll();
    },

    /**
	 * Sets the value of the given setting name to whether the event's
	 * target is checked or not
	 * @param settingName: The name of the setting - this is the key of the Setting object
	 * @param event: Used to stop propagation to prevent double execution
	 */
	setBooleanValueForTracker: function(settingName, event) {
		event.stopPropagation();
		if (Settings.TrackerSettings[settingName] === undefined) {
			Settings.TrackerSettings[settingName] = false;
		}

		let inputElement = document.getElementsByName(settingName)[0];
		Settings.TrackerSettings[settingName] = inputElement.checked;
		ItemTracker.setUp();
		refreshAll();
	},
    
    /**
     * Sets a setting value that has a choice of values
     * @param settingName - the name of the setting
     * @param event - used to stop propagation to prevent double execution
     */
    setOptionValueForRandomizer(settingName, event) {
        event.stopPropagation();
        if (Settings.RandomizerSettings[settingName] === undefined) { return; }

        let value = document.querySelector(`input[name="${settingName}"]:checked`).value;
        Settings.RandomizerSettings[settingName] = isNaN(Number(value)) ? value : Number(value);

        LockedDoorWalker.computeAll(); // Specifically, the keysanity setting
        ItemTracker.setUp();
        refreshAll();
    },
    
    /**
     * Sets a setting value that has a choice of values for the tracker itself
     * @param settingName - the name of the setting
     * @param event - used to stop propagation to prevent double execution
     */
    setOptionValueForTracker(settingName, event) {
        event.stopPropagation();
        if (Settings.TrackerSettings[settingName] === undefined) { return; }

        let value = document.querySelector(`input[name="${settingName}"]:checked`).value;
        Settings.TrackerSettings[settingName] = Number(value);
    },
    
    /**
     * Assigns the setting value when the medallion skulltula input changes
     */
    onMedallionSkulltulaSettingChanged() {
    	let input = document.getElementById("medallionSkulltulaInput");
    	let value = Number(input.value);
    	if (value < 1) { 
    		value = 1; 
    		input.value = value;
    	}
    	if (value > 100) { 
    		value = 100; 
    		input.value = value;
    	}
    	
    	Settings.RandomizerSettings.medallionSkulltulaSetting = value;
    },

    /**
     * Shows or hide the given class
     * @param {any} event - the event (unused)
     * @param {string} idToShowOrHide - the id to show or hide
     * @param {boolean} forceHide - if set to a value, will force showing or hiding (true to hide, false to show)
     */
    showOrHideGroup(event, idToShowOrHide, forceHide) {
        let element = document.getElementById(idToShowOrHide);
        if (element) {
            if (forceHide === undefined) {
                toggleCssClass(element, "nodisp");
                return;
            }
            addOrRemoveCssClass(element, "nodisp", forceHide);
        }
    },

    /**
     * Expands or collapses all randomizer settings
     */
    expandOrCollapseAllRandomizerSettings() {
        let _this = this;
        this._randomizerSettingsExpanded = !this._randomizerSettingsExpanded;

        [...document.querySelectorAll("#randomizerSettingsContainer .settings-group > div")].forEach(function(categoryDiv) {
            _this.showOrHideGroup(null, categoryDiv.id, !_this._randomizerSettingsExpanded);
        });
    },

    /**
     * Expands or collapses all glitches settings
     */
    expandOrCollapseAllGlitchesSettings() {
        let _this = this;
        this._glitchesSettingsExpanded = !this._glitchesSettingsExpanded;

        [...document.querySelectorAll(".settings-tricks-container")].forEach(function(categoryDiv) {
            _this.showOrHideGroup(null, categoryDiv.id, !_this._glitchesSettingsExpanded);
        });
    }
}