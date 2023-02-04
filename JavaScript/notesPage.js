NotesPage = {
	/**
	 * Displays the notes page, which collects all the notes into one place for easy viewing
	 */
	display: function() {
		LocationSidebar.displayContainer("notesContainer");
		_currentLocationName = "Notes";
		
		this._adjustImportantLocationsText();
		this._createNotesForSection("shop", Data.isItemLocationAShop.bind(Data));
		this._createNotesForSection("gossip", Data.isItemLocationAGossipStone.bind(Data));
		this._createNotesForSection("other", function(itemLocation) {
			return !Data.isItemLocationAShop(itemLocation) && !Data.isItemLocationAGossipStone(itemLocation);
		}.bind(Data));
	},

	/**
	 * Adjusts the notes for the important locations
	 * Currently only for the temple of time
	 * 
	 * TODO: Track the locations to display here so it's easy to dynamially add more?
	 */
	_adjustImportantLocationsText: function() {
		let importantLocationsContainer = document.getElementById("importantLocationsContainer");
		addCssClass(importantLocationsContainer, "nodisp");

		if (Settings.RandomizerSettings.shuffleInteriorEntrances && Data.templeOfTimeLocation.map) {
			removeCssClass(importantLocationsContainer, "nodisp");

			let templeOfTimeLocationDiv = document.getElementById("templeOfTimeContent");
			templeOfTimeLocationDiv.innerText = `${Data.templeOfTimeLocation.map} | ${Data.templeOfTimeLocation.region}`;
			templeOfTimeLocationDiv.onclick = function() {
				displayLocation(Data.templeOfTimeLocation.map);
			}
		}
	},
	
	/**
	 * Creates the notes for the given section name
	 * @param sectionType: this is "shop", "gossip", or "other"
	 * @param conditionToCheck: this is a function that accepts an itemLocation, returning a boolean value indicating whether we should include it
	 */
	_createNotesForSection: function(sectionType, conditionToCheck) {
		let notesContainer = document.getElementById(`${sectionType}NotesContainer`);
		addCssClass(notesContainer, "nodisp");
		
		let notesDiv = document.getElementById(`${sectionType}NotesContent`);
		notesDiv.innerHTML = "";
		
		_this = this;
		Object.keys(MapLocations).forEach(function(mapName) {
			let doesMapHaveNotes = false;
			let mapDiv = dce("div");
			Data.getAllItemLocations(mapName).forEach(function(itemLocation) {
				if (itemLocation.disabled || !itemLocation.notes) { return; }
				if (conditionToCheck(itemLocation)) {
					if (!doesMapHaveNotes) {
						doesMapHaveNotes = true;
						removeCssClass(notesContainer, "nodisp");
						
						let mapLabel = dce("label");
						mapLabel.innerText = mapName;
						if (Data.getDoesEntranceShuffleApply(mapName)) {
                            let shuffledDungeon = Data.getDungeonEntranceMap(mapName);
                            mapLabel.innerText += shuffledDungeon ? ` (${shuffledDungeon} Entrance)` : " (Unknown Location)";
                        }
						mapDiv.appendChild(mapLabel);
					}
					let noteDiv = _this._createNoteDivWithLabel(itemLocation);
					if (noteDiv) {
						mapDiv.appendChild(noteDiv);
					}
				}
			});
			
			if (mapDiv.childNodes.length > 1) { // The one always added would be the label
				notesDiv.appendChild(mapDiv);
			}
		});
	},
	
	
	/**
	 * Create the note div for the given item location
	 * Returns null if we're hiding the note
	 */
	_createNoteDivWithLabel: function(itemLocation) {	
		if (this._noteShouldBeSkipped(itemLocation)) {
			return null;
		}
		
		let noteDivLabel = dce("div");
		addCssClass(noteDivLabel, "note-div-label")
		noteDivLabel.innerText = `${itemLocation.Name}: `;
		
		this._setClassForLocation(itemLocation, noteDivLabel);
		
		let noteDivNotes = this.createNoteDiv(itemLocation);
		
		let noteDivContainer = dce("div");
		addCssClass(noteDivContainer, "note-div-container")
		noteDivContainer.appendChild(this._createNoteDivAge(itemLocation));
		noteDivContainer.appendChild(noteDivLabel);
		noteDivContainer.appendChild(noteDivNotes);
		
		return noteDivContainer;
	},
	
	/**
	 * Returns whether we should skip the note - checks the following:
	 * - whether we're hiding the tasks you can't do
	 * - whether we're hiding child only tasks
	 * - whether we're hiding adult only tasks
	 * @param itemLocation: the item location we're checking
	 * @return: true if we're skipping the note; false otherwise
	 */
	_noteShouldBeSkipped: function(itemLocation) {
		let canChildDo = Data.getItemObtainability(itemLocation, Age.CHILD);
		let canAdultDo = Data.getItemObtainability(itemLocation, Age.ADULT);

		if (this._getHideIncompleteTasks() && !itemLocation.playerHas) {
			return true;
		}

		let canGetItem = itemLocation.playerHas || canChildDo || canAdultDo;
		if (!canGetItem && this._getHideCannotDo()) {
			return true;
		}
		
		if (canChildDo && !canAdultDo && this._getHideChildOnly()) {
			return true;
		}
		
		if (!canChildDo && canAdultDo && this._getHideAdultOnly()) {
			return true;
		}
		
		return false;
	},
	
	/**
	 * Creates the notes div age icon
	 */
	_createNoteDivAge: function(itemLocation) {
		let canChildDo = Data.getItemObtainability(itemLocation, Age.CHILD);
		let canAdultDo = Data.getItemObtainability(itemLocation, Age.ADULT);

		let noteDivAge = dce("div");
		addCssClass(noteDivAge, "note-div-age");
		
		 if (canChildDo && !canAdultDo) {
			addCssClass(noteDivAge, "note-div-age-child");
		} else if (!canChildDo && canAdultDo) {
			addCssClass(noteDivAge, "note-div-age-adult");
		} else if (canChildDo && canAdultDo) {
			addCssClass(noteDivAge, "note-div-age-both");
		}
		
		return noteDivAge;
	},
	
	/**
	 * Create the notes div for the given item location
	 */
	createNoteDiv: function(itemLocation) {
		let notes = itemLocation.notes || "";
		notes = notes.trim();
		notes = notes.replace(/;+\s*$/, ""); //Trailing semicolons
		
		let notesDiv = dce("div");
		addCssClass(notesDiv, "note-div-notes");
		addCssClass(notesDiv, "note-div-shop");
		
		if (notes === "") {
			return notesDiv;
		}
		
		let _this = this;
		let noteParts = notes.split(";");
		noteParts.forEach(function(notePart) {
			notePart = notePart.trim();
			let entryPieces = notePart.split(" ");
			
			let price = isNaN(entryPieces[0]) ? null : Number(entryPieces[0]);
			let string = price ? entryPieces.slice(1).join(" ").trim() : notePart;
			
			let stringAndComments = string.split("//");
			let itemName = stringAndComments[0].trim();
			let comment = stringAndComments.length > 1 ? stringAndComments.slice(1).join("//").trim() : "";
			
			let noteDivPart = dce("div");
			addCssClass(noteDivPart, "note-div-part");
			
			let imagePath = _this._getImageFromShopString(itemName);
			if (imagePath) {
				let imageDiv = dce("div");
				addCssClass(imageDiv, "note-div-image");
				imageDiv.style.backgroundImage = `url("${imagePath}")`;
				noteDivPart.appendChild(imageDiv);
				
				let tooltip = imagePath.replace("Images/", "").replace(".png", "").replace(" X", "").replace("Tokens", "Token").replace("Mask Slot ", "");
				if (price) {
					tooltip += ` for ${price} rupees`; 
					imageDiv.appendChild(_this._getNotePriceDiv(price));	
				}
				
				if (comment !== "") {
					let commentDiv = dce("div");
					addCssClass(commentDiv, "note-div-comment");
					addCssClass(noteDivPart, "note-div-has-comment");
					
					commentDiv.innerText = comment;
					noteDivPart.appendChild(commentDiv);
				}
				
				noteDivPart.title = tooltip;
			} else {
				addCssClass(noteDivPart, "note-div-text-only");
				noteDivPart.innerText = `${notePart};`;
			}
			
			noteDivPart.onclick = function(event) {
				event.stopPropagation();
				
				// Support for quickly switching the price so it doesn't affect the items you can get count
				let price = notePart.split(" ")[0].trim();
				if (isNaN(price)) {
					return;
				}
				
				price = Number(price) * -1;
				
				let newNotePart = `${price} ${notePart.split(" ").slice(1).join(" ").trim()}`;
				let newNotes = itemLocation.notes.replace(notePart, newNotePart);			
				itemLocation.notes = newNotes;
				
				SocketClient.itemLocationUpdated(itemLocation);
				_refreshNotes(itemLocation);
				refreshAll();
				if (_currentLocationName === "Notes") { _this.display(); }
			}
			
			noteDivPart.oncontextmenu = function(event) {
				event.preventDefault();
				event.stopPropagation();

				let tempNotes = itemLocation.notes.replace(notePart, "").trim();
				let newNotes = tempNotes.split(";").filter(x => x.trim() !== "").join(";").trim();
				itemLocation.notes = newNotes;
				
				SocketClient.itemLocationUpdated(itemLocation);
				_refreshNotes(itemLocation);
				refreshAll();
				if (_currentLocationName === "Notes") { _this.display(); }
			}
			
			notesDiv.appendChild(noteDivPart);
		});
		
		return notesDiv;
	},
	
	/**
	 * Gets the div for the price of an image item
	 */
	_getNotePriceDiv: function(price) {
		if (price < -999) { price = -999; }
		if (price > 999) { price = 999; }
		
		let priceDiv = dce("div");
		priceDiv.innerText = Math.round(price);
		addCssClass(priceDiv, "note-div-price");
		
		return priceDiv;
	},
	
	/**
	 * Gets the image path from the shop string, or null if it doesn't exist
	 */
	_getImageFromShopString: function(shopString) {
		let fileName = ShopItemDictionary[shopString.toLowerCase().replaceAll(" ", "").replaceAll("*", "")];
		if (!fileName) { return null; }
		
		return `Images/${fileName}`;
	},
	
	/**
	 * Sets the CSS class for the given location
	 */
	_setClassForLocation: function(itemLocation, locationDiv) {
		if (itemLocation.playerHas) {
			addCssClass(locationDiv, "note-location-done");
		} else if (Data.getItemObtainability(itemLocation)) {
			addCssClass(locationDiv, "note-location-can-do");
		}
	},
	
	/**
	 * Gets whether we're hiding the tasks you cannot currently do
	 * @returns
	 */
	_getHideCannotDo: function() {
		return document.getElementsByName("notesHideCannotDo")[0].checked;
	},
	
	/**
	 * Gets whether we're hiding the child only tasks
	 * @returns
	 */
	_getHideChildOnly: function() {
		return document.getElementsByName("notesHideChildOnly")[0].checked;
	},
	
	/**
	 * Gets whether we're hiding the adult only tasks
	 * @returns
	 */
	_getHideAdultOnly: function() {
		return document.getElementsByName("notesHideAdultOnly")[0].checked;
	},

	/**
	 * Gets whether we're hiding the adult only tasks
	 * @returns
	 */
	_getHideIncompleteTasks: function() {
		return document.getElementsByName("notesHideIncompleteTasks")[0].checked;
	}
};