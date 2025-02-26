/**
 * A custom dropdown that supports icons and custom styling
 */
let IconDropdown = {
    /**
     * Creates the dropown
     * @param {string} dropdownId - The id to use for the dropdown
     * @param {Array<Object>} options - An array of objects containing all the options to put in the dropdown
     *   Each object should contain the following:
     *   - option: <the string value>
     *   - callback: (optional) <a function to call when a new option is selected>
     *      - The function accepts a parameter containing the selected value
     *   - selected: (optional) <a boolean for whether this option should be selected by default>
     *   - tooltip: (optional) <the tooltip to display for the option>
     *   - icon: (optional) <the url for the icon to include (the entire style to set in backgroundImage)>
     *   - backgroundColor: (optional) <the background color to use for the option - maintains it when selected too>
     *   - textColor: (optional) <the text color to use for the option>
     *   - selectedTextValue: (optional) <the text to show on the button if this option is selected>
     *   - selectedIconValue: (optional) <the icon to show on teh button if this option is selected>
     * @param {boolean} disabled - Whether to not show the options button
     */
    create: function(dropdownId, options, disabled) {
        let existingElement = document.getElementById(dropdownId);
        if (existingElement) {
            existingElement.innerHTML = "";
        }

        let dropdownContainer = existingElement || dce("div", "icon-dropdown-container");
        let dropdownButton = dce("div", "icon-dropdown-button");
        
        dropdownContainer.id = dropdownId;
        dropdownContainer.appendChild(dropdownButton);

        dropdownOptions = this._addOptions(dropdownContainer, options);

        let _this = this;
        dropdownContainer.onclick = function(event) {
            event.stopPropagation();

            if (disabled) {
                return;
            }

            let dropdownOptions = document.getElementById(_this._getOptionsContainerId(dropdownId));
            dropdownOptions.style.removeProperty("bottom");
            toggleCssClass(dropdownOptions, "nodisp");

            // Show on the top if the bottom part is cut off
            let elementRect = dropdownOptions.getBoundingClientRect();
            let windowHeight = window.innerHeight;

            if (elementRect.bottom - windowHeight > 0) {
                dropdownOptions.style.bottom = `25px`;
            }
        };

        dropdownContainer.onmouseleave = function() {
            let dropdownOptions = document.getElementById(_this._getOptionsContainerId(dropdownId));
            dropdownOptions.scrollTop = 0;
            addCssClass(dropdownOptions, "nodisp");
        };

        return dropdownContainer;
    },

    /**
     * Creates the options div - dataset values to include:
     * - value: The string value of the option to set if selected
     * - selectedTooltipValue: (shows nothing if blank) The tooltip value of the option to show on the button if selected
     * - selectedTextValue: (shows nothing if blank) The string value of the option to show on the button if selected
     * - selectedIconValue: (shows nothing if blank) The icon to set on the button if selected
     * - selectedBackgroundColor: The background color to set on the button if selected
     * Each div will have their value in the "value" property of the dataset
     * @param {HTMLElement} dropdown - The dropdown to add the options to
     * @param {Array<Object>} options - The options to create - see the create function for details
     */
    _addOptions: function(dropdown, options) {
        let _this = this;
        let optionsContainer = dce("div", "icon-dropdown-options-container nodisp"); // Not shown until the button is clicked
        optionsContainer.id = this._getOptionsContainerId(dropdown.id);

        let wasOptionSelected = false;

        options.forEach(function(option) {
            let optionElement = dce("div", "icon-dropdown-option-container");

            let optionTextElement  = dce("div", "icon-dropdown-option-text");
            optionTextElement.innerText = option.option;
            optionElement.dataset.value = option.option;
            optionElement.dataset.selectedTextValue = option.selectedTextValue ?? "";

            if (option.icon) {
                let optionIcon = dce("div", "icon-dropdown-option-icon");
                optionElement.appendChild(optionIcon);

                optionIcon.style.backgroundImage = option.icon;
                optionElement.dataset.selectedIconValue = option.selectedIconValue ?? "";
            }

            if (option.tooltip) {
                optionElement.title = option.tooltip;
                optionElement.dataset.selectedTooltipValue = option.tooltip ?? "";
            }

            if (option.textColor) {
                optionElement.style.color = option.textColor;
            }

            if (option.backgroundColor) {
                optionElement.style.backgroundColor = option.backgroundColor;
                optionElement.dataset.selectedBackgroundColor = option.backgroundColor ?? "";
            }

            if (option.selected) {
                // Don't use a callback here, as we're setting existing data
                _this._setOption(dropdown, optionElement);
                wasOptionSelected = true;
            }
            
            optionElement.onclick = _this._setOption.bind(_this, dropdown, optionElement, option.callback);

            optionElement.appendChild(optionTextElement);
            optionsContainer.appendChild(optionElement);
        });

        if (!wasOptionSelected && options.length > 0) {
            _this._setOption(dropdown, optionsContainer.firstChild)
        }

        dropdown.appendChild(optionsContainer);
        return optionsContainer;
    },

    /**
     * Gets the options container id
     * @param {string} dropdownId 
     */
    _getOptionsContainerId: function(dropdownId) {
        return `${dropdownId}-options`;
    },

    /**
     * Sets the given option on the dropdown
     * @param {HTMLElement} dropdown - The dropdown to set the option for
     * @param {HTMLElement} optionElement - The selected option
     * @param {boolean} callback - The callback function for when the option was first selected
     */
    _setOption: function(dropdown, optionElement, callback) {
        dropdown.dataset.value = optionElement.dataset.value ?? null;

        let dropdownButton = dropdown.firstChild;
        dropdownButton.title = optionElement.dataset.selectedTooltipValue ?? "";
        dropdownButton.innerText = optionElement.dataset.selectedTextValue ?? "";
        dropdownButton.style.backgroundImage = optionElement.dataset.selectedIconValue ?? "";
        dropdownButton.style.backgroundColor = optionElement.dataset.selectedBackgroundColor ?? "";

        if (callback) {
            callback(dropdown.dataset.value);
        }
    }
}