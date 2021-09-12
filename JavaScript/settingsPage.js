let SettingsPage = {
    display: function() {
        LocationSidebar.displayContainer("settingsContainer");
        _currentLocationName = "Settings";
        
        this._initializeCheckBoxes();
        this._initializeRadioButtons();
        this._initializeInputFields();
    },

    /**
     * Initializes all the check boxes on the page
     */
    _initializeCheckBoxes: function() {
        let _this = this;
        Object.keys(Settings.RandomizerSettings).forEach(function(settingName) {
            _this.setCheckboxStateForRandomizer(settingName);
        });

        Object.keys(Settings.GlitchesToAllow).forEach(function(settingName) {
            _this.setCheckboxStateForGlitches(settingName);
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
        this._initializeRadioButton("skulltulaSetting", Settings.RandomizerSettings.skulltulaSetting);
        this._initializeRadioButton("openZorasFountain", Settings.RandomizerSettings.openZorasFountain);
        this._initializeRadioButton("medallionSetting", Settings.RandomizerSettings.medallionSetting);
        this._initializeRadioButton("entranceShuffleSetting", Settings.RandomizerSettings.entranceShuffleSetting);
        this._initializeRadioButton("gossipStoneSetting", Settings.RandomizerSettings.gossipStoneSetting);
        this._initializeRadioButton("maxRequiredTokens", Settings.RandomizerSettings.maxRequiredTokens);
        this._initializeRadioButton("dungeonItemDisplay", Settings.TrackerSettings.dungeonItemDisplay);
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
     * Initializes the input fields - currently is only the medallion skulltula setting
     */
    _initializeInputFields: function() {
    	let value = Settings.RandomizerSettings.medallionSkulltulaSetting || 50;
        let input = document.getElementById("medallionSkulltulaInput");
    	input.value = value;
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
	setCheckboxStateForGlitches: function(settingName) {
		let settingValue = Settings.GlitchesToAllow[settingName];
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
		setUpItemTracker();
		refreshAll();
	},

	/**
	 * Sets the value of the given setting name to whether the event's
	 * target is checked or not
	 * @param settingName: The name of the setting - this is the key of the Setting object
	 * @param event: Used to stop propagation to prevent double execution
	 */
	setBooleanValueForGlitches: function(settingName, event) {
        event.stopPropagation();
		if (Settings.GlitchesToAllow[settingName] === undefined) {
			Settings.GlitchesToAllow[settingName] = false;
		}

		let inputElement = document.getElementsByName(settingName)[0];
		Settings.GlitchesToAllow[settingName] = inputElement.checked;
		setUpItemTracker();
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
		setUpItemTracker();
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
        setUpItemTracker();
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
    }
}