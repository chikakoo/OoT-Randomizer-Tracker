RpgPage = {
    numberOfTasks: 20,
    numberOfDMTasks: 1,
    numberOfDMCurses: 1,
    currentLocation: "",

    display: function() {
        LocationSidebar.updateSidebarLocation();
        LocationSidebar.displayContainer("rpgContainer");
        ItemLocationDisplay.currentLocationName = "RPG";
        this._updateHeader();
    },

    updateLocation: function(locationName) {
        this.currentLocation = locationName;
        this._updateHeader();
    },

    _updateHeader: function() {
        let header = document.getElementById("rpgHeader");
        header.innerText = this.currentLocation
            ? `RPG: ${this.currentLocation}`
            : "RPG: No Location Selected";
    },

    /**
     * Generates a list of 20 tasks and selects one at random
     * @param {RpgTaskDifficulty} difficulty 
     */
    generateTasks: function(difficulty) {
        let allChildTasks = this._getTasksByLevel(difficulty, Age.CHILD);
        let allAdultTasks = this._getTasksByLevel(difficulty, Age.ADULT);

        let childTaskList = this._generateTaskListFromPossibilities(allChildTasks);
        let adultTaskList = this._generateTaskListFromPossibilities(allAdultTasks);

        this._populateTaskUI(childTaskList, document.getElementById("rpgChildTasksContainer"));
        this._populateTaskUI(adultTaskList, document.getElementById("rpgAdultTasksContainer"));
    },

    _populateTaskUI: function(taskList, container) {
        let diceRoll = Math.floor(Math.random() * taskList.length) + 1;

        container.innerHTML = "";
        taskList.forEach((task, index) => {
            let taskDiv = dce("div", "task");
            let taskNumber = index + 1;

            if (taskNumber == diceRoll) {
                addCssClass(taskDiv, "task-rolled");
            }

            taskDiv.innerText = `${taskNumber}: ${task}`;
            container.appendChild(taskDiv);
        });
    },

    /**
     * Generates the tasks to display from the list of all tasks
     * Will duplicate as needed
     * @param {Array<string>} allTasks 
     * @returns The array of tasks
     */
    _generateTaskListFromPossibilities(allTasks) {
        let dmTaskList = [];

        for (let i = 0; i < this.numberOfDMTasks; i++) {
            dmTaskList.push("DM: Make up a task");
        }

        for (let i = 0; i < this.numberOfDMCurses; i++) {
            dmTaskList.push("DM: Make up a curse");
        }

        if (allTasks.length === 0) {
            console.log("WARNING: No tasks found, using DM tasks.");
            return dmTaskList;
        }

        let remainingTasks = this.numberOfTasks - dmTaskList.length;
        let taskPool = [...allTasks].shuffle();
        while(taskPool.length < remainingTasks) {
            taskPool = taskPool.concat([...allTasks].shuffle());
        }

        return taskPool.slice(0, remainingTasks)
            .concat(dmTaskList)
            .shuffle();
    },

    /**
     * Gets the list of tasks based on the given level
     * @param difficulty - the difficulty to give it
     */
    _getTasksByLevel: function(difficulty, age) {
        let punishmentsOnly = document.getElementById("rpgPunishmentsOnlyCheckbox").checked;
        return RpgTasks.filter(task => {
            return (!punishmentsOnly || task.isPunishment) &&
                this._checkTask(task, difficulty, age);
        }).map(task => task.text);
    },

    /**
     * Gets a single level given a list of difficulties - using the current game state
     * @param difficulties - the list of difficulties
     * @returns The difficulty to use; null if no difficulties work
     */
    _checkTask: function(task, difficulty, age) {
        let difficulties = task.difficulties;
        for (let i = 0; i < difficulties.length; i++)
        {
            let difficultyRequirement = difficulties[i];
            if (difficultyRequirement.Location && difficultyRequirement.Location !== this.currentLocation || // wrong location
                (
                    difficultyRequirement.Difficulty !== RpgTaskDifficulty.NONE && // None is okay
                    difficultyRequirement.Difficulty !== difficulty // But it has to be the right difficulty
                )
            ) {
                continue;
            }

            if (Data.calculateObtainability(difficultyRequirement, age) === ItemObtainability.YES) {
                return true
            }
        }

        return false;
    }
};