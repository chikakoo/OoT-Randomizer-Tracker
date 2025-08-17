RpgTaskDifficulty = {
    NONE: 0,
    EASY: 1,
    MILDLY_IRRITATING: 2,
    IRRITATING: 3,
    ANNOYING: 4,
    VERY_ANNOYING: 5,
    EXTREME_BITCH: 6
};

/**
 * The array of tasks - this can be any of the following:
 * - something the player must do/have before opening the chest
 * - a curse (a requirement for the player in the area they opened the chest in)
 * - a punishment (because the player messed up a curse or opened a chest illegally)
 * 
 * How to set up an event:
* - text: the text the user will see
* - isPunishment: whether this is suitable for a punishment (as in, the player messed up a curse, etc.)
* - difficulties: an array of difficulty levels. It will go down the list one-by one and choose the first one that
*		matches. If none match, it will not consider this event at all. Note that with all of these settings,
*		excluding it would pass that particular check.
*       - Level: The difficulty level this option would use
*			> if a Difficulty.NONE is picked, it will immediately stop trying to pick a level
*		- otherwise, does the same checks any ItemLocation would
*/
RpgTasks = [
    {
		text: "Have less than 40 rupees",
		difficulties: [{ Difficulty: RpgTaskDifficulty.EASY }]
	},
    {
		text: "TESTING",
		difficulties: [{ 
            Difficulty: RpgTaskDifficulty.EASY,
            Needs: [Items.BOMB]
        }]
	}
];