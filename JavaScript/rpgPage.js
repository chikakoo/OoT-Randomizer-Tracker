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

        let curseHeader = document.getElementById("rpgCurseHeader");
        let curse = LocationNotes[this.currentLocation];
        curseHeader.innerText = curse === this.currentLocation
            ? ""
            : curse || "";
    },

    /**
     * Generates a list of 20 tasks and selects one at random
     * @param {RpgTaskDifficulty} difficulty - The difficulty to generate
     * @param {KeyboardEvent} event - The event
     */
    generateTasks: function(difficulty, event) {
        if (!this.currentLocation) {
            return;
        }

        let taskContainer = document.getElementById("rpgTasksContainer");
        removeCssClass(taskContainer, "nodisp");

        let allChildTasks = this._getAllTasksByDifficulty(difficulty, Age.CHILD, event.ctrlKey);
        let allAdultTasks = this._getAllTasksByDifficulty(difficulty, Age.ADULT, event.ctrlKey);

        let childTaskList = this._generateTaskListFromPossibilities(allChildTasks, event.shiftKey);
        let adultTaskList = this._generateTaskListFromPossibilities(allAdultTasks, event.shiftKey);

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
     * 
     * Always includes the appropriate number of DM tasks
     * @param {Array<string>} allTasks - The task pool to start with
     * @param {boolean} showAllTasks - Whether to instead show all the possible tasks
     * @returns The array of tasks
     */
    _generateTaskListFromPossibilities(allTasks, showAllTasks) {
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

        if (showAllTasks) {
            return dmTaskList.concat(allTasks);
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
     * Gets the list of tasks based on the given difficulty
     * @param difficulty - the difficulty to give it
     * @param onlyLocationSpecific - set to only get tasks taht are location specific
     */
    _getAllTasksByDifficulty: function(difficulty, age, onlyLocationSpecific) {
        let punishmentsOnly = document.getElementById("rpgPunishmentsOnlyCheckbox").checked;
        let taskPool = RpgTasks["Anywhere"];
        if (RpgTasks[this.currentLocation] || onlyLocationSpecific) {
            taskPool = onlyLocationSpecific 
                ? RpgTasks[this.currentLocation]
                : taskPool.concat(RpgTasks[this.currentLocation]);
        }
        return taskPool?.filter(task => {
            return (!punishmentsOnly || task.isPunishment) &&
                this._checkTask(task, difficulty, age);
        }).map(task => task.text) ?? [];
    },

    /**
     * Returns whether the task is valid for the current game state
     * Note that NONE is valid for EVERY difficulty check
     * @param difficulties - the list of difficulties in the task
     * @returns True if valid; false otherwise
     */
    _checkTask: function(task, difficulty, age) {
        if (task.age && age !== task.age) {
            return;
        }

        let map = MapLocations[this.currentLocation];
        let isDungeon = map.MapGroup === MapGroups.DUNGEONS;
        let isMq = map.IsMasterQuest;
        if (!this._passesDungeonChecks(
            isDungeon,
            isMq,
            task.overworldOnly,
            task.dungeonOnly,
            task.standard,
            task.mq
        )) {
            return;
        }

        let difficulties = task.difficulties;
        for (let i = 0; i < difficulties.length; i++)
        {
            let difficultyRequirement = difficulties[i];

            if (!this._passesDungeonChecks(
                isDungeon, 
                isMq, 
                difficultyRequirement.OverworldOnly, 
                difficultyRequirement.DungeonOnly, 
                difficultyRequirement.Standard, 
                difficultyRequirement.MQ)) {
                    continue;
                }

            if (Data.calculateObtainability(difficultyRequirement, age) === ItemObtainability.YES) {
                return difficultyRequirement.Difficulty === RpgTaskDifficulty.NONE || 
                    difficultyRequirement.Difficulty === difficulty;
            }
        }

        return false;
    },

    _passesDungeonChecks: function(isDungeon, isMq, overworldOnly, dungeonOnly, standard, mq) {
        if ((isDungeon && overworldOnly) || 
            (!isDungeon && dungeonOnly)) {
            return false;
        }

        if (isDungeon && (
            (isMq && standard) ||
            (!isMq && mq)
        )) {
            return false;
        }

        return true;
    }
};