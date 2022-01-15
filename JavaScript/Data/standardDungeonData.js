/**
 * Contains all the data for the standard dungeons
 */
let StandardDungeons = {
	"Deku Tree": {
		Abbreviation: "DEKU",
		MapGroup: MapGroups.DUNGEONS,
		Floors: [ "F3", "F2", "B1", "B2" ],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					slingshotRoom: {
						Name: "slingshotRoom",
                        CustomRequirement: function(age) {
							if (Data.canUseHammer(age)) { return true; }
							if (age === Age.ADULT) {
								return Equipment.HYLIAN_SHIELD.playerHas;
							}
							return Equipment.DEKU_SHIELD.playerHas; 
                        }
					},

					basementBottom: {
						Name: "basementBottom",
						CustomRequirement: function(age) {
							return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
						}
					},

					Exit: {
						OwExit: OwExits["Deku Tree"]["Exit"]
					}
				},
				
				ItemLocations: {
					"Map Chest": {
						Name: "Map Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 282, y: 82, floor: "F2" },
						Age: Age.EITHER,
						Order: 1,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This chest is located by the vines with the skullwalltulas on the second floor."
					},
					"Compass Chest": {
						Name: "Compass Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 16, y: 147, floor: "F3" },
						Age: Age.EITHER,
						Order: 4,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the opposite side of the room for this chest.",
					},
					"Compass Side Room Chest": {
						Name: "Compass Side Room Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 115, y: 199, floor: "F3" },
						Age: Age.EITHER,
						Order: 5,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this chest. You do not need to kill the giant skulltula if you jump far enough to the left.",
					},
					"Skulltula in Compass Room": {
						Name: "Skulltula in Compass Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 115, y: 207, floor: "F3" },
						Age: Age.EITHER,
						Order: 6,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Make your way to the top floor. Go around the room until you find the door. Hit the switch and jump on the platforms to the left side room for this skulltula. You do not need to kill the giant skulltula if you jump far enough to the left."
					},
				}
			},

			slingshotRoom: {
				Exits: {},
				ItemLocations: {
					"Slingshot Chest": {
						Name: "Slingshot Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 111, y: 246, floor: "F2" },
						Age: Age.EITHER,
						Order: 2,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Enter the second floor door. Use your shield to reflect the scrub's nut back at him. The chest is on the other side in the next room."
					},
					"Slingshot Room Side Chest": {
						Name: "Slingshot Room Side Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 157, y: 273, floor: "F2" },
						Age: Age.EITHER,
						Order: 3,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This chest is located up the vines on the platform the slingshot chest is on."
					}
				}
			},

			basementBottom: {
				Exits: {
					basementTop: {
						Name: "basementTop",
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
				
							let canGoAround = Items.FAIRY_SLINGSHOT && (Data.canUseFireItem(age) || Items.DEKU_STICK.playerHas);
							return canGoAround || Settings.GlitchesToAllow.dekuB1Skip;
						}
					}
				},

				ItemLocations: {
					"Chest in Basement": {
						Name: "Chest in Basement",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 343, y: 81, floor: "B1" },
						Age: Age.EITHER,
						Order: 7,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "From the top floor, either kill or stun one one of the giant skulltulas. Jump toward the center of the room and immediately let go of the joystick. You should fall to the basement. If you can use Din's Fire, you can use that instead. The chest is on the platform to the left of the vines."
					},
					"Skulltula on Basement Gate": {
						Name: "Skulltula on Basement Gate",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 297, y: 51, floor: "B1" },
						Age: Age.EITHER,
						Order: 8,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This skulltula is in the in the basement you enter when you go in the first pit. If you face the vines, it's the one on the wall to the left."
					},
					"Skulltula on Basement Vines": {
						Name: "Skulltula on Basement Vines",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 348, y: 104, floor: "B1" },
						Age: Age.EITHER,
						Order: 9,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This skulltula is the one on the vines in the first basement floor. A well-angled jumpslash from a deku stick can hit it. You can also use the slingshot, boomerang, or a well-timed bomb.",
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
							return Items.DEKU_STICK.playerHas || Items.FAIRY_SLINGSHOT.playerHas ||
								Items.BOOMERANG.playerHas || Items.BOMB.playerHas;
						}
					}
				}
			},

			basementTop: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							let canBurnWeb = Data.canUseFireItem(age) || (age === Age.CHILD && Items.DEKU_STICK.playerHas);
							let hasShield = age === Age.CHILD ? Equipment.DEKU_SHIELD.playerHas : Equipment.HYLIAN_SHIELD.playerHas;
							return canBurnWeb && hasShield;
						}
					}
				},

				ItemLocations: {
					"Skulltula in Back Room": {
						Name: "Skulltula in Back Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 17, y: 77, floor: "B1" },
						Age: Age.EITHER,
						Order: 10,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "If you make your way around the basement, you'll eventually find a circular room where gohma babies drop from the ceiling. One of the side rooms has a bombable wall. Bomb it, then enter the next room. The skulltula is high up on the wall to your left.",
						RequiredAdultItems: [Items.FAIRY_BOW],
						NeedToBlastOrSmash: true,
						IsAtShortDistance: true
					}
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 257, y: 275, floor: "B2" },
						Age: Age.EITHER,
						Order: 11,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "To defeat Gohma, you must first stun her when her eye is red. You can use the slingshot or deku nuts to do this - nuts don't stun her for nearly as long, though. Once she's down, attack her. The quickest kill is with three deku stick jumpslashes (or one then two crouch stabs).",
						CustomRequirement: function(age) {
							return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (Age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 270, y: 286, floor: "B2" },
						Age: Age.EITHER,
						Order: 12,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						CustomRequirement: function(age) {
							return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (Age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
						}
					}
				}
			}
		}
	},

	"Dodongo's Cavern": {
		Abbreviation: "DONG",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F2", "F1"],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					mainRoom: {
						Name: "mainRoom",
						CustomRequirement: function(age) {
							if (Data.itemLocationObtained("Dodongo's Cavern", "main", "Opened First Wall")) { return true; }
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},

					Exit: {
						OwExit: OwExits["Dodongo's Cavern"]["Exit"]
					}
				},

				ItemLocations: {
					"Opened First Wall": {
						Name: "Opened First Wall",
						ItemGroup: ItemGroups.NON_ITEM,
						MapInfo: { x: 134, y: 262, floor: "F1" },
						Age: Age.EITHER,
						Order: -2,
						LongDescription: "Use an explosive or the hammer to break the first wall. This is used to determine whether Child can get in without explosives or strength.",
						CustomRequirement: function(age) {
							if (Data.hasExplosivesOrStrength() || Data.canUseHammer(age)) { return true; }
						}
					}
				}
			},

			mainRoom: {
				Exits: {
					firstFloorSwitch: {
						Name: "firstFloorSwitch",
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; } // Adult can just climb to the switch
							return Data.canGroundJumpWithBomb(age, true) || 
								(Settings.GlitchesToAllow.dodongoSwitchEarly && Items.BOMBCHU.playerHas && Equipment.DEKU_SHIELD.playerHas);
						}
					},

					blueRoom: {
						Name: "blueRoom",
						CustomRequirement: function(age) {
							return Data.hasSwordWeapon(age) || Data.canBlastOrSmash();
						}
					}
				},

				ItemLocations: {
					"Map Chest": {
						Name: "Map Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 97, y: 198, floor: "F1" },
						Age: Age.EITHER,
						Order: 4,
						LongDescription: "Go to the left side of the big main room. Destroy the wall with an explosive or the hammer to find this chest.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},
					"Gossip Stone in Main Room": {
						Name: "Gossip Stone in Main Room",
						ItemGroup: ItemGroups.GOSSIP_STONE,
						MapInfo: { x: 173, y: 179, floor: "F1" },
						UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
						Age: Age.EITHER,
						Order: -1,
						LongDescription: "This stone is behind the breakable wall in the northwest corner of the main room.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},
					"Skulltula in East Room": {
						Name: "Skulltula in East Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 242, y: 274, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						LongDescription: "Go to the room to the east of the main room. If you hug the right wall, you'll find a bombable wall. You can either blow it up with your own explosive, or kill a baby Dodongo near the wall.<br/><br/>Once inside, head to the back of the room to find the skulltula.",
						MustKillStunnableEnemy: true // You can kill the baby Dodongos to blow up the wall; this check covers having explosives too
					},
					"Skulltula on East Room Ledge": {
						Name: "Skulltula on East Room Ledge",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 220, y: 215, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { return !Settings.GlitchesToAllow.dodongoScarecrowSkullEarly; },
						LongDescription: "Go to the room to the east of the main room. As adult, play scarcrow's song near the wall with the ledge on the left hand side. Hookshot up to it to get to the skulltula. Alternatively, you can push the armos status all the way over to the ledge and backflip onto it to get to the ledge.",
						CustomRequirement: function(age) {
							let scarecrowless = Settings.GlitchesToAllow.dodongoScarecrowSkullEarly;
							if (!scarecrowless && age === Age.CHILD) { return false; }
							return scarecrowless || Data.canHookScarecrow(age);
						}
					},
					"Scrub in Main Room": {
						Name: "Scrub in Main Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 97, y: 222, floor: "F1" },
						Age: Age.EITHER,
						Order: 5,
						LongDescription: "Make your way to the left side of the main room. The scrub is in the wall closest to the entrance to the dungeon."
					}
				}
			},

			blueRoom: {
				Exits: {
					firstFloorSwitch: {
						Name: "firstFloorSwitch",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || Items.DEKU_STICK.playerHas;
						}
					}
				},

				ItemLocations: {
					"Scrub by Blue Dodongo Room": {
						Name: "Scrub by Blue Dodongo Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 245, y: 85, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						LongDescription: "From the entrance, go around the right side of the dungeon until you get to the blue room with dodongos in it. You can also jump up to the switch platform as adult and enter the door to get here. Near the usual entrance to this room, there's a bombable wall with a scrub inside. You should be able to run a bomb flower to it if you don't have your own explosives.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					}
				}
			},

			firstFloorSwitch: {
				Exits: {
					blueRoom: {
						Name: "blueRoom"
					},

					staircaseTop: {
						Name: "staircaseTop",
						CustomRequirement: function(age) {
							//TODO: make the bow thing a trick, as it's not that easy
							return Data.hasExplosivesOrStrength() || (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					}
				},

				ItemLocations: {
					"Compass Chest": {
						Name: "Compass Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 41, y: 259, floor: "F1" },
						Age: Age.EITHER,
						Order: 6,
						LongDescription: "Make your way to the room with the Bomb Flowers by the staircase. Destroy the wall near the front of the stairs and enter the room. The chest is here - if you can't kill the armos, you'll have to savewarp after you get the chest."
					}
				}
			},

			staircaseTop: {
				Exits: {
					bombChestFloor: {
						Name: "bombChestFloor",
						CustomRequirement: function(age) {
							let adultBombChestEarly = age === Age.ADULT && Settings.GlitchesToAllow.dodongoAdultJumpToBombChest;
							let canGroundJumpThere = age === Age.ADULT && Data.canGroundJumpWithBomb(age);
							let canMegaflipThere = Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
							let canGetThereEarly = adultBombChestEarly || canGroundJumpThere || canMegaflipThere;
							
							// You have explosives or strength or hammer due to main's check
							let canDefeatLizalfos = Data.hasSwordWeapon(age) || Data.hasExplosives();
							let canGetThereNormally = Data.canShootEyeSwitch(age) && canDefeatLizalfos; 
							
							return canGetThereEarly || canGetThereNormally;
						}
					},

					skulltulaAlcoveAboveStairs: {
						Name: "skulltulaAlcoveAboveStairs",
						Age: Age.ADULT,
						RequiredAdultItems: [{ item: Items.HOOKSHOT, upgradeString: "2" }]
					}
				},

				ItemLocations: {
					"Chest by Bomb Flower": {
						Name: "Chest by Bomb Flower",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 201, y: 201, floor: "F2" },
						Age: Age.EITHER,
						Order: 8,
						LongDescription: "In the room with the blades, this is the chest on the ledge near the Bomb Flower and bombable wall."
					},
					"Skulltula on Vines by Stairs": {
						Name: "Skulltula on Vines by Stairs",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 29, y: 136, floor: "F2" },
						Age: Age.EITHER,
						Order: 7,
						LongDescription: "Head to the top of the room with the giant staircase and the Bomb Flowers. The skulltula is on the vines near the exit. If you have nothing to kill it, you can throw one of the pots at it.",
						OverrideItemGroupCondition: true
					},
					"Left Scrub by Blade Room": {
						Name: "Left Scrub by Blade Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 197, y: 106, floor: "F2" },
						Age: Age.EITHER,
						Order: 9,
						LongDescription: "In the room with the blades, there's a wall you can destroy that's located near the cliffs with the bomb chest. There are a couple scrubs inside.",
						NeedToBlastOrSmash: true
					},
					"Right Scrub by Blade Room": {
						Name: "Right Scrub by Blade Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 207, y: 106, floor: "F2" },
						Age: Age.EITHER,
						Order: 10,
						LongDescription: "In the room with the blades, there's a wall you can destroy that's located near the cliffs with the bomb chest. There are a couple scrubs inside.",
						NeedToBlastOrSmash: true
					}
				}
			},

			bombChestFloor: {
				Exits: {
					inDodongoHead: {
						Name: "inDodongoHead",
						NeedsExplosives: true
					},
					skulltulaAlcoveAboveStairs: {
						Name: "skulltulaAlcoveAboveStairs"
					}
				},

				ItemLocations: {
					"Bomb Bag Chest": {
						Name: "Bomb Bag Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 184, y: 145, floor: "F2" },
						Age: Age.EITHER,
						Order: 11,
						LongDescription: "This is the chest elevated on the platform in the room with the blades. You normally get here after the second Lizalfos fight. There are tricks to megaflip as a child to get here earlier. You can also simply jump to a nearby platform as adult to skip that fight."
					},
					"Chest at End of Bridge": {
						Name: "Chest at End of Bridge",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 84, y: 149, floor: "F2" },
						Age: Age.EITHER,
						Order: 12,
						LongDescription: "At the end of the bridge above the giant dodongo head, destroy the wall. The chest is just inside.",
						NeedToBlastOrSmash: true
					}
				}
			},

			skulltulaAlcoveAboveStairs: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Alcove Above Stairs": {
						Name: "Skulltula in Alcove Above Stairs",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 31, y: 94, floor: "F2" },
						Age: Age.EITHER,
						Order: 13,
						LongDescription: "This skulltula is in an alcove above the giant staircase with the Bomb Flowers.<br/><br/>As child, you must first navigate to the switch that raises the platform to the second floor. Now, leave the dungeon and come back in. Take the platform to the second floor and proceed backwards to the staircase room - the staircase is now raised. You can climb the vines on the staircase to get to the skulltula.<br/><br/>As adult, you can do the same thing. If you have the longshot, though, you can get it without needing the staircase up if you stand on a step close to the top.",
						IsAtShortDistance: true
					}
				}
			},

			inDodongoHead: {
				Exits: {
					bossRoom: {
						Name: "bossRoom"
					}
				},

				ItemLocations: {
					"Chest by King Dodongo": {
						Name: "Chest by King Dodongo",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 91, y: 107, floor: "F1" },
						Age: Age.EITHER,
						Order: 15,
						LongDescription: "This is in the room you enter after you push the block on the switch. The chest is straight ahead."
					},
					"Skulltula in Back Room": {
						Name: "Skulltula in Back Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 193, y: 11, floor: "F1" },
						Age: Age.EITHER,
						Order: 14,
						LongDescription: "This is in the series of rooms after you enter the giant dodongo head. After you climb the ledge with the pushable blocks, there's a wall you can destroy. The skulltula is inside."
					}
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 104, y: 114, floor: "F1" },
						Age: Age.EITHER,
						Order: 16,
						LongDescription: "You must bomb the suspicious floor in the room you enter after pushing the block on the switch to get to King Dodongo. To defeat him, you must throw a bomb or bomb flower into his mouth, and then attack him afterward. Note that you should follow him as he rolls so that he gets up faster. If using bomb flowers, try to get them a little bit early, as you need time to run back to him before he shoots his fireball. The quickest kill is with 2 deku stick/master sword jumpslashes, or 1 biggoron's sword jumpslash.",
						CustomRequirement: function(age) {
							return Items.BOMB.playerHas || Equipment.STRENGTH.playerHas;
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 104, y: 100, floor: "F1" },
						Age: Age.EITHER,
						Order: 17,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						CustomRequirement: function(age) {
							return Items.BOMB.playerHas || Equipment.STRENGTH.playerHas;
						}
					}
				}
			}
		}
	},

	"Jabu Jabu's Belly": {
		Abbreviation: "JABU",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F2", "F1", "B1"],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					afterFirstRoom: {
						Name: "afterFirstRoom",
						CustomRequirement: function(age) {
							if (Data.hasExplosives() || Data.canUseBoomerang(age)) { return true; }
							if (age === Age.ADULT) { return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas; }
							return Items.FAIRY_SLINGSHOT.playerHas;
						}
					},
					Exit: {
						OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
					}
				},
				ItemLocations: {}
			},

			afterFirstRoom: {
				Exits: {
					roomBeforeBoss: {
						Name: "roomBeforeBoss",
						CustomRequirement: function(age) {
							let canGetThereNormally = Data.canUseBoomerang(age) && Data.hasSwordWeapon(age);
							let canSkipToThere = Settings.GlitchesToAllow.jabuBlueSwitchSkip && 
								(Data.canMegaFlip(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas));
							return canGetThereNormally || canSkipToThere;
						}
					}
				},

				ItemLocations: {
					"Boomerang Chest": {
						Name: "Boomerang Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 237, y: 58, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Now, hug the right wall all the way to a switch - jump on it with Ruto in your hands. Enter the room. Kill all the stringers to spawn the chest. They can be hurt with explosions, boomerang, slingshot, or jump slashes from a stick or sword.",
						CustomRequirement: function(age) {
							return Data.canUseBoomerang(age) || Items.FAIRY_SLINGSHOT.playerHas || Data.hasSwordWeapon(age) || Data.hasExplosives();
						}
					},
					"Map Chest": {
						Name: "Map Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 99, y: 57, floor: "F1" },
						Age: Age.EITHER,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 4,
						LongDescription: "Bring Ruto back up to the first floor. Take her through the room with holes into the next room. Hug the left wall until you find a switch. Leave Ruto on it and enter. Kill the Parasitic Tentacle with your boomerang to spawn the chest.",
						RequiredItems: [Items.BOOMERANG]
					},
					"Compass Chest": {
						Name: "Compass Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 147, y: 17, floor: "F1" },
						Age: Age.EITHER,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 5,
						LongDescription: "After killing the Parasitic Tentacle to spawn the Map Chest (see that section), exit the room. Now hug the left wall to the next nearby door. Kill the shaboms within the time limit to spawn this chest. Note that Deku Nuts are a really fast way to take care of this room.",
						RequiredItems: [Items.BOOMERANG]
					},
					"Skulltula on Vines": {
						Name: "Skulltula on Vines",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 284, y: 153, floor: "B1" },
						Age: Age.EITHER,
						Order: 2,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the room with the water and the switch (the first one you usually take Ruto into), there's a skulltula hanging out on the vines. Take it out, then raise the water to collect its token. Note that you can reach it with a jumpslash if you jump off the cliff then jumpslash when you're a bit closer.",
					},
					"Left Skulltula on Lower Room Wall": {
						Name: "Left Skulltula on Lower Room Wall",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 156, y: 44, floor: "B1" },
						Age: Age.EITHER,
						Order: 6,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
						IsAtShortDistance: true
					},
					"Right Skulltula on Lower Room Wall": {
						Name: "Right Skulltula on Lower Room Wall",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 176, y: 35, floor: "B1" },
						Age: Age.EITHER,
						Order: 7,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the room below the one with the holes, there are two skulltulas on the wall. You can reach them from the bottom part with the boomerang - you may have to aim a bit into the cliff, though. Otherwise, you can wait until you kill all the Parasitic Tentacles and drop down the corresponding hole to get an easier angle.",
						IsAtShortDistance: true
					},
					"Scrub Behind Octorok Water": {
						Name: "Scrub Behind Octorok Water",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: {x: 117, y: 229, floor: "B1" },
						Age: Age.EITHER,
						Order: 1,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the room with the rising platform (the second room of the dungeon), fall down into the water. Dive down and swim into the adjacent room - it's straight ahead from the door. There's a scrub on the other side."
					},
				}
			},

			roomBeforeBoss: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						RequiredItems: [Items.BOOMERANG]
					}
				},

				ItemLocations: {
					"Skulltula Near Boss": {
						Name: "Skulltula Near Boss",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 255, y: 194, floor: "F1" },
						Age: Age.EITHER,
						Order: 8,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "In the room before the boss room (the one that's slightly green and has a bunch of biris), there's a skulltula on the vines leading up the wall to the door switch.<br/><br/>Note that adult can get here immediately by using the hover boots."
					}
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 242, y: 121, floor: "F1" },
						Age: Age.EITHER,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 9,
						LongDescription: "You need the Boomerang and either the Kokiri Sword, or at least 2 Deku Sticks to defeat Barinade. First, dislodge it from the ceiling using the Boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
						NeedsSwordWeapon: true
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 246, y: 125, floor: "F1" },
						Age: Age.EITHER,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 10,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						NeedsSwordWeapon: true
					}
				}
			}
		}
	},
	
	"Forest Temple": {
		Abbreviation: "FRST",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F2", "F1", "B1"],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					lobby: {
						Name: "lobby",
						CustomRequirement: function(age) {
							return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
						}
					},
					Exit: {
						OwExit: OwExits["Forest Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Chest on Starting Room Tree": {
						Name: "Chest on Starting Room Tree",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 151, y: 254, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the first room, climb up the vines to the right. Navigate over to the tree, and then jump or hookshot across to the chest on the other tree."
					},
					"Skulltula in First Room": {
						Name: "Skulltula in First Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 193, y: 271, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "The skulltula is high up on the vines in the first room. You can kill it with a ranged item, din's fire, or a bombchu from the ground.",
						CustomRequirement: function(age) {
							if (Data.canUseFireItem(age) || Data.canUseBoomerang(age) || Items.BOMBCHU.playerHas) { return true; }
							if (age === Age.CHILD) {
								return Items.FAIRY_SLINGSHOT.playerHas;
							}
							return Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
						}
					},

					// Locked Doors
					"Locked Door in Lobby": {
						Name: "Locked Door in Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 122, y: 150, floor: "F1" },
						Age: Age.EITHER,
						Order: 9,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the western door in the lobby.",
						KeyRequirement: function(age) {
							if (Data.forestCanJumpToTop(age)) {
								return { min: 1, max: Keys.FOREST_TEMPLE.totalKeys() };
							}
							return { min: 1, max: 1 };
						}
					},

					"Locked Door by Twisted Corridor": {
						Name: "Locked Door by Twisted Corridor",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["topOfBlockRoom"],
						MapInfo: { x: 42, y: 198, floor: "F2" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "This is the door that's after the block puzzle by the bubbles.",
						KeyRequirement: function(age) {
							if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
								return { min: 1, max: 2 };
							}
							return { min: 2, max: 2 };
						}
					},

					"Locked Door in Boss Key Room": {
						Name: "Locked Door in Boss Key Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["twistedCorridor1"],
						MapInfo: { x: 80, y: 57, floor: "F2" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
						KeyRequirement: function(age) {
							if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
								return { min: 2, max: 3 };
							}
							return { min: 3, max: 3 };
						}
					},

					"Locked Door in Blue Poe Room": {
						Name: "Locked Door in Blue Poe Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["firstPoeRoom"],
						MapInfo: { x: 282, y: 54, floor: "F2" },
						Age: Age.ADULT,
						Order: 20,
						LongDescription: "This is the door that's in the blue poe room.",
						KeyRequirement: function(age) {
							if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
								return { min: 3, max: 4 };
							}
							return { min: 4, max: 4 };
						}
					},

					"Locked Door in Green Bubble Hallway": {
						Name: "Locked Door in Green Bubble Hallway",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["afterPoeRooms"],
						MapInfo: { x: 319, y: 154, floor: "F2" },
						Age: Age.ADULT,
						Order: 21,
						LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
						KeyRequirement: function(age) {
							if (Data.forestCanJumpToTop(age) && !Data.itemLocationObtained("Forest Temple", "main", "Locked Door in Lobby")) {
								return { min: 4, max: 5 };
							}
							return { min: 5, max: 5 };
						}
					}
				}
			},
			lobby: {
				Exits: {
					outsideLeft: {
						Name: "outsideLeft",
						CustomRequirement: function(age) {
							if (age === Age.CHILD) { return true; } // The SoT block is gone as child!
							return Settings.GlitchesToAllow.forestLedgeClip || Data.canPlaySong(Songs.SONG_OF_TIME);
						}
					},

					outsideRight: {
						Name: "outsideRight",
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age);
						}
					},

					blockRoom: {
						Name: "blockRoom",
						LockedDoor: "Locked Door in Lobby",
						Map: "Forest Temple"
					},

					fallingCeilingRoom: {
						Name: "fallingCeilingRoom",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.BOMB, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestGreenPoeEarly && Data.hasShield(age);
						}
					},

					// Note that all item locations here (and in the boss room) will have IsPostWalkCheck set to true, we need to make sure that we can get to both the
					// fallingCeilingRoom and the firstPoeRoom in order to actually get here
					basement: {
						Name: "basement",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.FAIRY_BOW]
					},

					bossRoom: {
						Name: "bossRoom",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.HOOKSHOT],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestBKSkip;
						}
					}
				},

				ItemLocations: {
					"Chest Behind Main Room": {
						Name: "Chest Behind Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 170, y: 16, floor: "F1" },
						Age: Age.EITHER,
						Order: 4,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go straight again through the room with the blue bubble. In the next room, kill the two stalfos to spawn the chest."
					},
					"Skulltula in Main Room": {
						Name: "Skulltula in Main Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 191, y: 110, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						IsAtShortDistance: true,
						LongDescription: "From the start of the temple, go straight through the room with the giant skulltula. Now, go through the main room until you get to the door on the other side. Turn right to find this skulltula on the wall. You can get it with your hookshot or boomerang."
					}
				}
			},
			outsideLeft: {
				Exits: {
					topOfOutsideRight: {
						Name: "topOfOutsideRight",
						MustKillStunnableEnemy: true
					},

					topOfOutsideLeft: {
						Name: "topOfOutsideLeft",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Data.forestCanJumpToTop(age);
						}
					},

					outsideRight: {
						Name: "outsideRight",
						IsGoldenScaleWater: true // This is to swim through the well
					}
				},
				ItemLocations: {
					"Skulltula in Left Room on Wall": {
						Name: "Skulltula in Left Room on Wall",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 83, y: 52, floor: "F1" },
						Age: Age.ADULT,
						Order: 14,
						IsAtShortDistance: true,
						LongDescription: "There's a skulltula high up on the wall over the moat in the outside left room. You can get it from the ground with the longshot. Otherwise, you must make your way to the upper platform to grab it. This is the path that you take if you fall in the hole by the boss key chest.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							if (Data.canAccessMap(age, "Forest Temple", "topOfOutsideLeft")) { 
								return true;
							}
							return Items.HOOKSHOT.currentUpgrade === 2;
						}
					}
				}
			},
			topOfOutsideLeft: {
				Exits: {
					outsideLeft: {
						Name: "outsideLeft"
					},
					blockRoom: {
						Name: "blockRoom"
					}
				},

				ItemLocations: {
					"Floormaster Chest": {
						Name: "Floormaster Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 27, y: 101, floor: "F1" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "Navigate to the twisted corridor. Shoot the eye switch to untwist the corridor. Now go across the corridor to the room with the boss key chest. Fall down the hole in this room and kill the bubbles to get out. Follow the right wall in this next area until you reach the first door in the side room to the right (careful of the giant deku baba). Kill the floormaster to spawn the chest.",
						MustKillStunnableEnemy: true
					}
				}
			},
			outsideRight: {
				Exits: {
					topOfOutsideRight: {
						Name: "topOfOutsideRight",
						Age: Age.ADULT,
						RequiredAdultItems: [{item: Equipment.HOOKSHOT, upgradeString: "2"}]
					},
					outsideRightLedge: {
						Name: "outsideRightLedge",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.HOOKSHOT]
					},
					outsideLeft: {
						Name: "outsideLeft",
						IsGoldenScaleWater: true // This is to swim through the well
					}
				},
				ItemLocations: {}
			},
			outsideRightLedge: {
				Exits: {
					outsideRight: {
						Name: "outsideRight"
					}
				},

				ItemLocations: {
					"Chest on Outside Right Island": {
						Name: "Chest on Outside Right Island",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 269, y: 77, floor: "F1" },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "There is a chest on the landmass on the other wide of the water in the right outside room. You can hookshot to it with the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.<br/><br/>Alternatively, you can get there using hover boots from the platform with the water-draining well switch."
					},
					"Skulltula on Outside Right Island": {
						Name: "Skulltula on Outside Right Island",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 269, y: 70, floor: "F1" },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "There is a skulltula on the landmass on the other wide of the water in the right outside room. You can hookshot to the island via the chest at the right angle. To get to the right outside room, you can either shoot the eye switch in the main room, or climb up the vines in the left outside room and go through the dungeon map room.",
						IsAtShortDistance: true
					}
				}
			},
			topOfOutsideRight: {
				Exits: {
					drainedWell: {
						Name: "drainedWell" //TODO: add places for the hookshot underwater check trick - just make the other regions lead to drained well with that trick
					},
					outsideRight: {
						Name: "outsideRight" 
					},
					outsideRightLedge: {
						Name: "outsideRightLedge",
						Age: Age.ADULT,
						RequiredAdultItems: [Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestLedgeWithHovers;
						}
					},
					outsideLeft: {
						Name: "outsideLeft",
						MustKillStunnableEnemy: true
					}
				},

				ItemLocations: {
					"Dungeon Map": {
						Name: "Dungeon Map",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 184, y: 111, floor: "F2" },
						Age: Age.EITHER,
						Order: 5,
						UseAdultAge: function() { !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "You can get here from the left outside room. Proceed up the vines and into the room. Kill the blue bubble to spawn the chest. Alternatively, you can get here by longshotting up the vines in the right outside room.",
						MustKillStunnableEnemy: true
					}
				}
			},
			drainedWell: {
				Exits: {},
				ItemLocations: {
					"Chest in Well": {
						Name: "Chest in Well",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 126, y: 48, floor: "B1" },
						Age: Age.EITHER,
						Order: 8,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "In the outside rooms, there is a chest at the bottom of the well. One way to get there is from the left room. Proceed up the vines, kill the blue bubble, and go into the next room. Now, hookshot or jump to the vines to your left and navigate to the switch on the other platform. This will drain the water. Alternatively, you can start in the right room and longshot up these vines to get to the switch.",
						MustKillStunnableEnemy: true
					}
				}
			},
			blockRoom: {
				Exits: {
					topOfOutsideLeft: {
						Name: "topOfOutsideLeft",
						Age: Age.ADULT,
						RequiredAdultItems: [Equipment.HOVER_BOOTS]
					},
					topOfBlockRoom: {
						Name: "topOfBlockRoom",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							if (Equipment.STRENGTH.playerHas) {
								return true;
							}
							
							// If you can't push blocks, you MUST do the block skip, which is adult only
							if (!Settings.GlitchesToAllow.forestBlockSkip || age === Age.CHILD) { return false; } 
							return Data.canGroundJumpWithBomb(age) && Equipment.HOVER_BOOTS.playerHas;
						}
					}
				},

				ItemLocations: {
					"Eye Switch in Block Puzzle Room": {
						Name: "Eye Switch in Block Puzzle Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 56, y: 226, floor: "F1" },
						Age: Age.EITHER,
						Order: 10,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Navigate to the room with the block puzzle. After pushing the first block, climb up the ladder that it was blocking. Now go straight to the wall in front of you. Follow that wall to the right. Turn right, and you should see an eye switch a bit up the wall in front of you. Shoot it with your bow to spawn the chest.",
						CustomRequirement: function(age) {
							let canBlockSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBlockSkip && Data.canGroundJumpWithBomb(age);
							let canHoverToMiddleFloor = age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas;
							let canGetToEyeSwitch = canBlockSkip || canHoverToMiddleFloor || Equipment.STRENGTH.playerHas;
							return Data.canShootEyeSwitch(age) && canGetToEyeSwitch;
						}
					}
				}
			},
			topOfBlockRoom: {
				Exits: {
					twistedCorridor1: {
						Name: "twistedCorridor1",
						Map: "Forest Temple",
						LockedDoor: "Locked Door by Twisted Corridor",
						Age: Age.ADULT
					},
					untwistedCorridor1: {
						Name: "untwistedCorridor1",
						Map: "Forest Temple",
						LockedDoor: "Locked Door by Twisted Corridor",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age);
						}
					}
				},
				ItemLocations: {}
			},
			untwistedCorridor1: {
				Exits: {
					topOfOutsideLeft: {
						Name: "topOfOutsideLeft",
						MustKillStunnableEnemy: true
					}
				},

				ItemLocations: {
					"Boss Key Chest": {
						Name: "Boss Key Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 66, y: 45, floor: "F2" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "Navigate to the end of the block puzzle room. The door at the end leads to the twisted corridor. Shoot the eye above the door to untwist it. Go down the hallway and into the next room to find the boss key chest."
					},
				}
			},
			twistedCorridor1: {
				Exits: {
					firstPoeRoom: {
						Name: "firstPoeRoom",
						Map: "Forest Temple",
						LockedDoor: "Locked Door in Boss Key Room"
					}
				},
				ItemLocations: {}
			},
			firstPoeRoom: {
				Exits: {
					afterPoeRooms: {
						Name: "afterPoeRooms",
						Map: "Forest Temple",
						LockedDoor: "Locked Door in Blue Poe Room",
						NeedsSwordWeapon: true
					}
				},

				ItemLocations: {
					"Red Poe Chest": {
						Name: "Red Poe Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 151, y: 54, floor: "F2" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "Navigate to the twisted corridor. Make sure it's still twisted when you go down it. If you jump to the platform at the end, then turn right, you'll see a door. Go through it. Spawn the red poe by shooting the paintings on the wall. Kill it to spawn the chest. Note that Deku Nuts can be used to immediately make the poe visible again.",
						RequiredAdultItems: [Items.FAIRY_BOW]
					},
					"Fairy Bow Chest": {
						Name: "Fairy Bow Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 190, y: 61, floor: "F2" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "Go to the room after the red poe room. Kill the stalfos that spawns. After that, kill the two others to spawn the chest.",
					},
					"Blue Poe Chest": {
						Name: "Blue Poe Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 224, y: 54, floor: "F2" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "This chest is in the room after the fairy bow chest. Shoot the paintings on the wall to spawn the poe. Kill it to spawn the chest. As was the case with the red poe, you can use Deku Nuts to make it immediately visible when it vanishes.",
						RequiredAdultItems: [Items.FAIRY_BOW]
					}
				}
			},
			afterPoeRooms :{
				Exits: {
					fallingCeilingRoom: {
						Name: "fallingCeilingRoom",
						Map: "Forest Temple",
						LockedDoor: "Locked Door in Green Bubble Hallway",
						NeedsSwordWeapon: true,
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					}
				},
				ItemLocations: {}
			},
			fallingCeilingRoom: {
				Exits: {
					outsideRightLedge: {
						Name: "outsideRightLedge"
					}
				},

				ItemLocations: {
					"Chest in Falling Ceiling Room": {
						Name: "Chest in Falling Ceiling Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 318, y: 116, floor: "F1" },
						Age: Age.ADULT,
						Order: 22,
						LongDescription: "After the blue poe room, go through the door. Now go down the hallway that the ladder leads to and enter the locked room. Either shoot the frozen eye switch so that the arrow goes through the torch, or cast Din's Fire while standing just below the switch. Now, head back to the room with the ladder and fall down the hole. The chest is in the middle of this room. Alternatively, you can spawn a scarecrow in the right outside room that you can longshot to."
					}
				}
			},
			basement: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							return hasBossKey("Forest Temple");
						}
					}
				},

				ItemLocations: {
					"Chest in Basement": {
						Name: "Chest in Basement",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 138, y: 237, floor: "B1" },
						Age: Age.ADULT,
						Order: 23,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the chest.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							return Data.forestTempleCanAccessAllPoeRooms(age);
						}
					},
					"Skulltula in Basement": {
						Name: "Skulltula in Basement",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 132, y: 228, floor: "B1" },
						Age: Age.ADULT,
						Order: 24,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						IsAtShortDistance: true,
						LongDescription: "After defeating all the poes, head down the basement elevator. Push the wall so that they move clockwise once. You should now be able to access the room with the skulltula",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							return Data.forestTempleCanAccessAllPoeRooms(age);
						}
					}
				}
			},
			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 186, y: 77, floor: "B1" },
						Age: Age.ADULT,
						Order: 25,
						LongDescription: "For phase 1 of Phantom Ganon, you must shoot the real version of him that comes out of the paintings. You can use your bow or hookshot for that. The real one is lighter and is the only one that makes sound. Phase 2 is the familiar tenis match. Stun him with his own attacks and damage him when he's stunned.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							let canBKSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBKSkip && Items.HOOKSHOT.playerHas;
							return canBKSkip || Data.forestTempleCanAccessAllPoeRooms(age);
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 181, y: 81, floor: "B1" },
						Age: Age.ADULT,
						Order: 26,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							let canBKSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBKSkip && Items.HOOKSHOT.playerHas;
							return canBKSkip || Data.forestTempleCanAccessAllPoeRooms(age);
						}
					}
				}
			}
		}
	},

	"Fire Temple": {
		Abbreviation: "FIRE",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F5", "F4", "F3", "F2", "F1"],
		StartingFloorIndex: 4,
		Regions: {
			main: {
				Exits: {
					bossKeyRoom: {
						Name: "bossKeyRoom",
						Map: "Fire Temple",
						LockedDoor: "Bottom Locked Door in Lobby",
						CustomRequirement: function(age) {
							return Data.fireCanAccessBossKeyPath(age);
						}
					},

					bigLavaRoom: {
						Name: "bigLavaRoom",
						Map: "Fire Temple",
						LockedDoor: "Top Locked Door in Lobby",
						CustomRequirement: function(age) {
							let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
							if ((age === Age.CHILD && !Settings.GlitchesToAllow.fireNoGoronTunic) || !tunicCheck) { return false; }
							
							return true;
						}
					},

					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || (age === Age.ADULT && Equipment.GORON_TUNIC.playerHas);
							return tunicCheck && Data.canUseHammer(age) && hasBossKey("Fire Temple");
						}
					},

					Exit: {
						OwExit: OwExits["Fire Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Goron Near Boss Door": {
						Name: "Goron Near Boss Door",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 34, y: 263, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic
						},
						LongDescription: "Go up the stairs at the entrance to the temple. Take the left door into the small room with lava - equip your Goron Tunic if you're afraid of burning. Navigate to the upper left corner of the room and step on the switch. The chest is inside the Goron cage.",
						CustomRequirement: function(age) {
							if (age === Age.CHILD) {
								return Settings.GlitchesToAllow.fireNoGoronTunic;
							}
							return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
						}
					},

					// Locked Doors
					"Bottom Locked Door in Lobby": {
						Name: "Bottom Locked Door in Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 126, y: 214, floor: "F1" },
						Age: Age.EITHER,
						Order: 4,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door behind the pillar on the bottom of the lobby.",
						RequiredToAppear: function() { return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.SMALL_KEY_SANITY; },
						KeyRequirement: function(age) {
							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: 0, max: 0 };
							}
							return { min: 1, max: Keys.FIRE_TEMPLE.totalKeys()};
						},
						CustomRequirement: function(age) {
							return Data.fireCanAccessBossKeyPath(age);
						}
					},
					"Top Locked Door in Lobby": {
						Name: "Top Locked Door in Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 136, y: 203, floor: "F1" },
						Age: Age.EITHER,
						Order: 8,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the top right door in the lobby.",
						KeyRequirement: function(age) {
							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: 1, max: 1 };
							}

							let minValue = 1;
							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 2 };
						}
					},
					"Locked Door in Big Lava Room": {
						Name: "Locked Door in Big Lava Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["bigLavaRoom"],
						MapInfo: { x: 257, y: 202, floor: "F1" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "This is the door on the east side of the big lava room.",
						KeyRequirement: function(age) {
							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: 2, max: 2 };
							}

							let minValue = 2;
							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 3 };
						}
					},
					"Locked Door After Rising Block": {
						Name: "Locked Door After Rising Block",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["bigLavaRoom"],
						MapInfo: { x: 247, y: 92, floor: "F2" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "This is the door you reach after riding the block up the fire pillar.",
						KeyRequirement: function(age) {
							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: 3, max: 3 };
							}

							let minValue = 3;
							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 4 };
						}
					},
					"Locked Door in Boulder Maze": {
						Name: "Locked Door in Boulder Maze",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["boulderMazeLower"],
						MapInfo: { x: 289, y: 135, floor: "F3" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "This is the locked door in the boulder maze.",
						KeyRequirement: function(age) {
							let minValue = 4;
							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: minValue, max: 4 };
							}

							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 5 };
						}
					},
					"Locked Door in Crater Room": {
						Name: "Locked Door in Crater Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["narrowBridgeRoom", "fireWallRoom"],
						MapInfo: { x: 283, y: 170, floor: "F3" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "This is the locked door in the crater room with narrow ledges.",
						KeyRequirement: function(age) {
							let minValue = 5;
							if (Settings.GlitchesToAllow.fireJailClip) {
								minValue = 4;
							}

							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: minValue, max: 5 };
							}

							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 6 };
						}
					},

					"Locked Door in Fire Wall Room": {
						Name: "Locked Door in Fire Wall Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["fireWallRoom"],
						MapInfo: { x: 207, y: 170, floor: "F3" },
						Age: Age.ADULT,
						Order: 24,
						LongDescription: "This is the locked door you reach after going through the room with the big fire wall.",
						KeyRequirement: function(age) {
							let minValue = 6;
							if (Settings.GlitchesToAllow.fireJailClip) {
								// Skip both doors in the crater room
								minValue-= 2;
							}

							else if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) {
								minValue--;
							}

							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: minValue, max: 6 };
							}

							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 7 };
						}
					},

					"Locked Door in Fire Maze Room": {
						Name: "Locked Door in Fire Maze Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["fireMazeRoomStart"],
						MapInfo: { x: 119, y: 192, floor: "F3" },
						Age: Age.ADULT,
						Order: 26,
						LongDescription: "This is the locked door you reach after going through the fire wall maze.",
						KeyRequirement: function(age) {
							let minValue = 7;
							if (Settings.GlitchesToAllow.fireJailClip) {
								// Skip both doors in the crater room
								minValue-= 2;
							}

							else if (Settings.GlitchesToAllow.fireCraterRoomKeySkip) {
								minValue--;
							}

							if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) {
								return { min: minValue, max: 7 };
							}

							if (Data.itemLocationObtained("Fire Temple", "main", "Bottom Locked Door in Lobby")) {
								minValue++;
							}
							return { min: minValue, max: 8 };
						}
					}
				}
			},
			bossKeyRoom: {
				Exits: {},

				ItemLocations: {
					"Skulltula in Like-Like Room by Start": {
						Name: "Skulltula in Like-Like Room by Start",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 122, y: 13, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 5,
						LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and enter the next room. The skulltula is on the back wall by the like-like."
					},
					"Flare Dancer Near Entrance": {
						Name: "Flare Dancer Near Entrance",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 57, y: 60, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 6,
						LongDescription: "To the right of the stairs at the entrance of the temple, use your hammer on the side of the column a few times to destroy it. Enter the door. Kill all the enemies and continue until you get to the Flare Dancer room. To kill it - either use your hammer or hookshot to stun it. It will take three Master Sword jumpslashes to kill it. For some reason, the Biggoron's Sword will do less damage. Also, there's no need to try to jumpslash it more than once per cycle, as it won't do damage.",
						RequiredChoiceOfAdultItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER, Items.HOOKSHOT],
						RequiredChoiceOfChildItems: [Items.BOMB, Items.BOMBCHU, Items.MEGATON_HAMMER],
					},
					"Boss Key Chest": {
						Name: "Boss Key Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 63, y: 111, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 7,
						LongDescription: "After the flare dancer room (see the other task), continue to the next room. Hammer the rusted switch to gain access to the boss key chest.",
						RequiredItems: [Items.MEGATON_HAMMER]
					}
				}
			},
			bigLavaRoom: {
				Exits: {
					bigLavaRoomGoronRight: {
						Name: "bigLavaRoomGoronRight",
						CustomRequirement: function(age) {
							if (age === Age.CHILD) {
								return Data.canGroundJumpWithBomb(age);
							}
							
							return Data.hasExplosives();
						}
					},
					bigLavaRoomSoTLedge: {
						Name: "bigLavaRoomSoTLedge",
						CustomRequirement: function(age) {
							if (age === Age.CHILD && !Data.canGroundJumpWithBomb(age)) { return false; }

							return Data.canPlaySong(Songs.SONG_OF_TIME) ||
								(age === Age.ADULT && Settings.GlitchesToAllow.fireSoTBlockJump);
						}
					},
					risingBlockRoom: {
						Name: "risingBlockRoom",
						Map: "Fire Temple",
						LockedDoor: "Locked Door in Big Lava Room",
					}
				},

				ItemLocations: {
					"Big Lava Room Left Goron": {
						Name: "Big Lava Room Left Goron",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 277, y: 141, floor: "F1" },
						Age: Age.EITHER,
						Order: 9,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.fireNoGoronTunic;
						},
						LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the left door to find a Goron and a chest."
					}
				}
			},
			bigLavaRoomGoronRight: {
				Exits: {},
				ItemLocations: {
					"Big Lava Room Right Goron": {
						Name: "Big Lava Room Right Goron",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 198, y: 280, floor: "F1" },
						Age: Age.EITHER,
						Order: 11,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances ||
								!Settings.GlitchesToAllow.fireNoGoronTunic ||
								!Settings.GlitchesToAllow.groundJump;
						},
						LongDescription: "Go up the stairs at the entrance to the temple. Take the right door into the big lava room. Navigate to the right side of the room. Bomb the suspicious wall and follow the path to a Goron and a chest."
					}
				}
			},
			bigLavaRoomSoTLedge: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Upper Left Big Lava Room": {
						Name: "Skulltula in Upper Left Big Lava Room",
						MapInfo: {x: 164, y: 90, floor: "F1" },
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.EITHER,
						Order: 10,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances ||
								!Settings.GlitchesToAllow.fireNoGoronTunic ||
								!Settings.GlitchesToAllow.groundJump;
						},
						LongDescription: "Head to the left of the big lava room (the one in the right door from the entrance of the temple). Play the Song of Time to get a platform to the above room. The skulltula is on the back wall by the like-like."
					}
				}
			},
			risingBlockRoom: {
				Exits: {
					firstTorchSlugRoom: {
						Name: "firstTorchSlugRoom",
						Map: "Fire Temple",
						LockedDoor: "Locked Door After Rising Block"
					}
				},
				ItemLocations: {}
			},
			firstTorchSlugRoom: {
				Exits: {
					boulderMazeLower: {
						Name: "boulderMazeLower",
						Age: Age.ADULT,
						Map: "Fire Temple",
						CustomRequirement: function(age) {
							let canGetByBlock = (Settings.GlitchesToAllow.groundJump && Data.canGroundJumpWithBomb(age)) || Equipment.STRENGTH.playerHas;
							let canHitSwitchFromAbove = Data.hasExplosives() || Items.HOOKSHOT.playerHas || Data.canShootEyeSwitch(age);
							return canGetByBlock || canHitSwitchFromAbove;
						}
					},
					goronInPit: {
						Name: "goronInPit",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.BOMB],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireJailClip;
						}
					}
				},
				ItemLocations: {}
			},
			boulderMazeLower: {
				Exits: {
					narrowBridgeRoom: {
						Name: "narrowBridgeRoom",
						Map: "Fire Temple",
						LockedDoor: "Locked Door in Boulder Maze"
					}
				},

				ItemLocations: {
					"Lower Boulder Maze Goron": {
						Name: "Lower Boulder Maze Goron",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 320, y: 201, floor: "F3" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "When you first enter the boulder maze, turn to the right. Walk in that general direction and you'll eventually find a Goron and a chest in a cage. Step on the switch to get in."
					},
					"Skulltula in Weak Wall in Boulder Maze": {
						Name: "Skulltula in Weak Wall in Boulder Maze",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 322, y: 103, floor: "F3" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "From the lower entrance of the boulder maze, turn left. Walk in that general direction until you reach the end. You should hear the skulltula through the wall - bomb it to gain access.",
						NeedsExplosives: true
					},
					"Lower Boulder Maze Side Room Goron": {
						Name: "Lower Boulder Maze Side Room Goron",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 283, y: 51, floor: "F3" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "From the lower boulder maze Goron, make your way to the complete opposite side of the maze. This is equivalent to turning left from the entrance of the maze, and going in that direction. You'll run into a door - if you don't see it, try heading to the left. It should be the unlocked door. Inside, there's a hallway with another Goron and chest."
					}
				}
			},
			narrowBridgeRoom: {
				Exits: {
					mapEnclosure: {
						Name: "mapEnclosure",
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age);
						}
					},

					fireWallRoom: {
						Name: "fireWallRoom",
						Map: "Fire Temple",
						LockedDoor: "Locked Door in Crater Room"
					}
				},
				ItemLocations: {}
			},
			fireWallRoom: {
				Exits: {
					mapEnclosure: {
						Name: "mapEnclosure"
					},

					boulderMazeUpper: {
						Name: "boulderMazeUpper"
					},

					fireMazeRoomStart: {
						Name: "fireMazeRoomStart",
						Map: "Fire Temple",
						LockedDoor: "Locked Door in Fire Wall Room"
					}
				},
				ItemLocations: {}
			},
			mapEnclosure: {
				Exits: {
					fireWallRoom: {
						Name: "fireWallRoom",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.MEGATON_HAMMER, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireCraterRoomKeySkip;
						}
					}
				},

				ItemLocations: {
					"Map Chest in Fire Wall Room": {
						Name: "Map Chest in Fire Wall Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 258, y: 150, floor: "F3" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "First, make your way to the scary room with the giant pit that you get to from the boulder maze. There are two paths to get this chest. First, you can shoot the eye switch in this room with a bow and enter the room that opens up to get to the chest. If you don't have a bow, you must enter the other door instead. Make your way to the other side of the room. You can climb onto the cage and drop down onto the chest from this side."
					}
				}
			},
			boulderMazeUpper: {
				Exits: {
					// These first two are used for the jail clip trick
					boulderMazeLower: {
						Name: "boulderMazeLower"
					},

					fireWallRoom: {
						Name: "fireWallRoom"
					},

					goronInPit: {
						Name: "goronInPit",
						NeedsExplosives: true
					},

					scarecrowRoom: {
						Name: "scarecrowRoom",
						CustomRequirement: function(age) {
							return Data.canHookScarecrow(age);
						}
					}
				},

				ItemLocations: {
					"Upper Boulder Maze Goron": {
						Name: "Upper Boulder Maze Goron",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 302, y: 222, floor: "F3" },
						Age: Age.ADULT,
						Order: 20.9,
						LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Jump on the platforms across the room to get to the Goron and chest in the cage on the other side. Be sure to step on the switch on the way there to open the cage."
					}
				}
			},
			goronInPit: {
				Exits: {
					boulderMazeUpper: {
						Name: "boulderMazeUpper"
					}
				},

				ItemLocations: {
					"Goron in Bombable Pit": {
						Name: "Goron in Bombable Pit",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 164, y: 90, floor: "F2" },
						Age: Age.ADULT,
						Order: 20,
						LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. On one of the platforms, there's a very obvious crack in the floor. Bomb it to break it open. Follow the path it unlocks to another Goron and chest in a cage."
					}
				}
			},
			scarecrowRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula on Climbable Wall After Scarecrow": {
						Name: "Skulltula on Climbable Wall After Scarecrow",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 335, y: 84, floor: "F4" },
						Age: Age.ADULT,
						Order: 21,
						LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. As you go through the next room, you should run into the skulltula."
					},
					"Skulltula on Top After Scarecrow": {
						Name: "Skulltula on Top After Scarecrow",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 241, y: 156, floor: "F5" },
						Age: Age.ADULT,
						Order: 22,
						LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. Navigate through the next room's switch puzzle into the outside room. The skulltula should be on the wall to your left."
					},
					"Chest in Scarecrow Song Area": {
						Name: "Chest in Scarecrow Song Area",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 220, y: 148, floor: "F5" },
						Age: Age.ADULT,
						Order: 23,
						LongDescription: "First, get to the upper part of the boulder maze. This is from the unlocked door in the room with the fire wall. Up and to the right of the entrance to this part of the maze, there's a small platform. If you play Scarecrow's Song here, you'll spawn one on that platform. It's kind of finicky to get it to spawn, though, so try a few different places. You can get up there with the hookshot. Once there, hookshot the platform on the other side and ride it up. Navigate through the next room's switch puzzle into the outside room. There's a switch you can press in this room - after you press it, you must quicky make your way around the room to get the chest before the fire is ignited once more. It is possible with the hookshot, just make sure you're close enough to the pillar - it's important to hook it quickly to get enough time."
					}
				}
			},
			fireMazeRoomStart: {
				Exits: {
					fireMazeRoomEnd: {
						Name: "fireMazeRoomEnd",
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireWallSkip;
						}
					},

					centerRoomBottom: {
						Name: "centerRoomBottom",
						Map: "Fire Temple",
						LockedDoor: "Locked Door in Fire Maze Room"

					},

					centerRoomTopSwitch: {
						Name: "centerRoomTopSwitch",
						RequiredItems: [Items.MEGATON_HAMMER]
					}
				},

				ItemLocations: {
					"Compass Chest in Fire Maze": {
						Name: "Compass Chest in Fire Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 191, y: 81, floor: "F3" },
						Age: Age.ADULT,
						Order: 25,
						LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. To get to the Compass chest, you must enter the door to the right of the entrance. Make your way through the maze to that door, being careful of the spawning fires."
					}
				}
			},
			fireMazeRoomEnd: {
				Exits: {
					centerRoomBottom: {
						Name: "centerRoomBottom"
					},
					hammerChestRoom: {
						Name: "hammerChestRoom",
						NeedsExplosives: true,
						NeedsSwordWeapon: true
					}
				},
				ItemLocations: {}
			},
			hammerChestRoom: {
				Exits: {
					centerRoomTopSwitch: {
						Name: "centerRoomTopSwitch",
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireJumpDownToSoTBlock && Items.MEGATON_HAMMER.playerHas;
						}
					},
					centerRoomBottom: {
						Name: "centerRoomBottom"
					}
				},

				ItemLocations: {
					"Hammer Chest at Very Top": {
						Name: "Hammer Chest at Very Top",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 43, y: 157, floor: "F5" },
						Age: Age.ADULT,
						Order: 27,
						LongDescription: "Make your way to the maze of tiny fire walls. This is the locked door in the giant fire wall room. Make your way around the entire maze. First, you must navigate to the left side of the middle pillar. After you go through that, you must navigate to a switch that lowers the bigger fire wall. Bomb the fake door and defeat the Flare Dancer (see the other Flare Dancer task for advice on this). Ride his platform up to the next room. Make your way though the fire switch puzzle room into the next room. In this room, you must hit the switch and then quickly navigate over to the hammer chest. Alternatively, you can let a fire keese hit you near the chest, then spam A to open it before you're damaged by the chest fire."
					}
				}
			},
			centerRoomBottom: {
				Exits: {
					fireMazeRoomEnd: {
						Name: "fireMazeRoomEnd"
					},
					centerRoomTopSwitch: {
						Name: "centerRoomTopSwitch",
						RequiredItems: [Items.MEGATON_HAMMER],
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				},
				ItemLocations: {}
			},
			centerRoomTopSwitch: {
				Exits: {
					centerRoomBottom: {
						Name: "centerRoomBottom"
					}
				},

				ItemLocations: {
					"Goron in Center of Fire Maze": {
						Name: "Goron in Center of Fire Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 124, y: 162, floor: "F3" },
						Age: Age.ADULT,
						Order: 28,
						LongDescription: "There are a couple ways to get here - either one requires the Megaton Hammer. One way starts at the hammer chest. See that task for how to get there. At the hammer chest, simply jump into the giant crater - you'll end up in this room. Once there, play the Song of Time to spawn the block and climb it up (you can also land up there with a precise enough angle). Now hammer the rusted switch to free the Goron and get to the chest. The alternative way is from the start of the fire wall maze. You can use your hover boots from the start to navigate to the barred door near the entrance. Hammer the rusted switch once you're there. Enter and jump across to the other side. If you don't have the Song of Time to move the block, simply jumpslash it with the hammer to hit the switch underneath."
					}
				}
			},
			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 25, y: 197, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 2,
						LongDescription: "Note that you can get to this boss without dropping the giant column down. Navigate to the Goron cage area and drop down onto the small ledge. Now do a rolling jump straight at the boss platform and hold forward - you should grab the ledge. This might take a few tries. The Hover Boots should make this trivial. To defeat Volvagia, hit her with your hammer when she pops out of the holes. After that, attack it again. Jumpslashes will do more damage, like usual. You can hit it with arrows while it's flying to do additional damage. If it ever drops rocks on you, you can hang off the side of the cliff to avoid damage.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
							return Data.canAccessMap(Age.ADULT, "Fire Temple", "fireMazeRoomStart"); // Checks whether adult can hammer the pillar
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 25, y: 207, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 3,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
							return Data.canAccessMap(Age.ADULT, "Fire Temple", "fireMazeRoomStart"); // Checks whether adult can hammer the pillar
						}
					},
				}
			}
		}
	},

	"Water Temple": {
		Abbreviation: "WATR",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F3", "F2", "F1", "B1"],
		StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					lowWaterLevel: {
						Name: "lowWaterLevel",
						Age: Age.ADULT,
						RequiredAdultItems: [Equipment.IRON_BOOTS],
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
						}
					},
					highWaterLevel: {
						Name: "highWaterLevel",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return !Data.waterIsPlayerLockedOutOfHighWater();
						}
					},
					roomWithManyTektites: {
						Name: "roomWithManyTektites",
						Map: "Water Temple",
						Age: Age.ADULT,
						RequiredAdultItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
						},
						LockedDoor: "Locked Door in Bottom North Room"
					},
					Exit: {
						OwExit: OwExits["Water Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Compass on Mid East Wing": {
						Name: "Compass on Mid East Wing",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 302, y: 95, floor: "F2" },
						LongDescription: "The compass chest is in the east wing on the middle level. You do not need to change the water level to get to it - just toggle your Iron Boots as needed to get there. Once at the surface, either hit the switch to lower the water around the chest, or just roll into the chest and spam A to open it.",
						Age: Age.ADULT,
						Order: 1,
						CustomRequirement: function(age) {
							if (Data.waterIsPlayerLockedOutOfHighWater()) {
								return Items.HOOKSHOT.playerHas;
							}
							return Equipment.IRON_BOOTS.playerHas;
						}
					},

					// Locked Doors
					"Locked Door on Top Floor": {
						Name: "Locked Door on Top Floor",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["highWaterLevel"],
						MapInfo: { x: 185, y: 220, floor: "F3" },
						Age: Age.ADULT,
						Order: 2,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door on the top west floor of the temple. You need the water raised to open it.",
						KeyRequirement: function(age) {
							let keysReq = 4;
							let canDrainWater = Equipment.IRON_BOOTS.playerHas && Data.canPlaySong(Songs.ZELDAS_LULLABY);
							if (!canDrainWater) {
								keysReq--; // Can't open the central door
							}
							if (!Equipment.IRON_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade !== 2) {
								keysReq -= 2; // Can't open the tektite room doors
							}

							return { min: 1, max: keysReq };
						}
					},
					"Locked Door in Waterfall Room": {
						Name: "Locked Door in Waterfall Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["waterfallRoom"],
						MapInfo: { x: 86, y: 220, floor: "F3" },
						Age: Age.ADULT,
						Order: 4,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door in the waterfall room with the platforms. You get here from the locked door on the top floor.",
						RequiredItems: [Items.HOOKSHOT],
						KeyRequirement: function(age) {
							let keysReq = 5;
							let canDrainWater = Equipment.IRON_BOOTS.playerHas && Data.canPlaySong(Songs.ZELDAS_LULLABY);
							if (!canDrainWater) {
								keysReq--; // Can't open the central door
							}
							if (!Equipment.IRON_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade !== 2) {
								keysReq -= 2; // Can't open the tektite room doors
							}

							return { min: 2, max: keysReq };
						}
					},
					"Locked Door to Central Room": {
						Name: "Locked Door to Central Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["lowWaterLevel"],
						MapInfo: { x: 169, y: 220, floor: "F1" },
						Age: Age.ADULT,
						Order: 13,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door on the bottom floor leading into the central room. The water needs to be drained to open it.<br/><br/>Note that this door is entirely optional if you have a bow or fire item, as you can light a torch on the central middle platform to get here.",
						KeyRequirement: function(age) {
							let keysReq = 5;
							if (Items.HOOKSHOT.currentUpgrade !== 2) {
								keysReq -= 2; // Can't open the tektite room doors
							}

							return { min: 1, max: keysReq };
						}
					},
					"Locked Door in Bottom North Room": {
						Name: "Locked Door in Bottom North Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 191, y: 113, floor: "F1" },
						Age: Age.ADULT,
						Order: 18,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door on the bottom north path. You can use iron boots or drain the water to get here. Longshot across to get to the door.",
						RequiredItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
						},
						KeyRequirement: function(age) {
							let keysReq = 4;
							if (!Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
								keysReq--; // Can't open the central door
							}

							return { min: 1, max: keysReq };
						}
					},
					"Locked Door after Boulder Waterfall": {
						Name: "Locked Door after Boulder Waterfall",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["boulderWaterfall"],
						MapInfo: { x: 123, y: 70, floor: "F1" },
						Age: Age.ADULT,
						Order: 20,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door you reach after passing the boulder waterfall in the room behind the locked door in the bottom north room.",
						KeyRequirement: function(age) {
							let keysReq = 5;
							if (!Data.canPlaySong(Songs.ZELDAS_LULLABY)) {
								keysReq--; // Can't open the central door
							}

							return { min: 2, max: keysReq };
						}
					},
				}
			},
			lowWaterLevel: {
				Exits: {
					midWaterTriforceFloor: {
						Name: "midWaterTriforceFloor",
						CustomRequirement(age) {
							return Items.FAIRY_BOW.playerHas || Data.canUseFireItem(age);
						}
					},
					centralRoomBottom: {
						Name: "centralRoomBottom",
						Map: "Water Temple",
						LockedDoor: "Locked Door to Central Room"
					},
					dragonRoom: {
						Name: "dragonRoom",
						RequiredItems: [Equipment.STRENGTH]
					},
					crackedWallArea: {
						Name: "crackedWallArea",
						CustomRequirement(age) {
							return Settings.GlitchesToAllow.waterBombableWallEarly;
						}
					}
				},

				ItemLocations: {
					"Lower Water Level": {
						Name: "Lower Water Level",
						ItemGroup: ItemGroups.NON_ITEM,
						Age: Age.ADULT,
						Order: 10,
						MapInfo: { x: 291, y: 234, floor: "F3" },
						LongDescription: "To get here, go to the bottom east wing and float up to the top."
					},
					"Chest After Torches in Bottom East Wing": {
						Name: "Chest After Torches in Bottom East Wing",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 11,
						MapInfo: {x: 326, y: 212, floor: "F1" },
						LongDescription: "From the entrance of the temple, jump off and sink down to the bottom. Head down the hallway of the east room. Take off your iron boots and float up to the surface. Play Zelda's lullaby at the Triforce to lower the water. Now head back down. In this room, light the torches wih your bow or with Din's fire. Kill the enemies in the room that unlocks to spawn the chest.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || Items.FAIRY_BOW.playerHas;
						}
					},

					"Skulltula in Bottom Southern Wing": {
						Name: "Skulltula in Bottom Southern Wing",
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.ADULT,
						Order: 12,
						MapInfo: {x: 19, y: 261, floor: "F1" },
						LongDescription: "First, drain the water in the temple. Now head the bottom southern wing. Bomb the cracked floor. Make your way down the corridor into the next room. Cross the water using your hookshot or hover boots. In the back of this room, hit the switch in the cage with a jumpslash or charged spin attack to get to the skulltula.",
						NeedsExplosives: true,
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
					}
				}
			},
			midWaterTriforceFloor: {
				Exits: {
					midWaterLevel: {
						Name: "midWaterLevel",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},
					centralRoomBottom: {
						Name: "centralRoomBottom"
					}
				},

				ItemLocations: {
					"Skulltula by Mid Water Triforce": {
						Name: "Skulltula by Mid Water Triforce",
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.ADULT,
						Order: 14,
						MapInfo: {x: 157, y: 217, floor: "F1" },
						LongDescription: "In the room with the middle water level Triforce, there is a skulltula high up on the wall. There are three ways to get it; the bottom two enable the hookshot to be used:<br/>- Use the longshot<br/>- Cast Farore's Wind in the room, raise the water to max, then warp back in<br/>- Open the door on the bottom leading here, then raise the water to max and re-enter this door",
						IsAtShortDistance: true,
						CustomRequirement: function(age) {
							// You can just longshot it
							if (Items.HOOKSHOT.currentUpgrade === 2) { 
								return true; 
							}

							// Cast FW in the room, then raise the water and recast FW
							let canCastFaroresWind = Equipment.MAGIC.playerHas && Items.FARORES_WIND.playerHas;
							let canReRaiseWater = !Data.waterIsPlayerLockedOutOfHighWater();
							if (canCastFaroresWind && canReRaiseWater) {
								return true;
							}

							// Open the door on the bottom, then reraise the water and enter the door again
							if (canReRaiseWater && Data.itemLocationObtained("Water Temple", "main", "Locked Door to Central Room")) {
								return true;
							}

							return false;
						}
					}
				}
			},
			centralRoomBottom: {
				Exits: {
					midWaterTriforceFloor: {
						Name: "midWaterTriforceFloor",
						RequiredItems: [Items.HOOKSHOT]
					}
				},
				ItemLocations: {}
			},
			midWaterLevel: {
				Exits: {
					highWaterLevel: {
						Name: "highWaterLevel",
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						CustomRequirement: function(age) {
							return Data.hasExplosives() || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
						}
					},

					midWaterTriforceFloor: {
						Name: "midWaterTriforceFloor"
					},

					crackedWallArea: {
						Name: "crackedWallArea"
					}
				},

				ItemLocations: {
					"Key Under Rising Platform in Middle Room": {
						Name: "Key Under Rising Platform in Middle Room",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 15,
						MapInfo: {x: 293, y: 214, floor: "B1" },
						RequiredItems: [Items.HOOKSHOT],
						LongDescription: "After draining the water, head into the middle room on the bottom. This will initially be a locked door. Once inside, hookshot the target to get up to the mid water level triforce. Play Zelda's Lullaby to raise the water. Now, use your Iron boots to sink down in this room and enter the secret room under the floating block that was just raised up. Hit the crystal switch and defeat the enemies. When they're defeated, take off your boots and rise up to the top right corner of this room for the chest."
					},
					"Chest Behind Block at Mid Level": {
						Name: "Chest Behind Block at Mid Level",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 17,
						MapInfo: {x: 243, y: 243, floor: "F2" },
						LongDescription: "First, make your way to the top east wing. Push back the block and then go to the southern mid-level.<br/><br/>Shoot the eye switch then quickly longshot the target or use your hover boots to pass the gate. Go down the room and push the red block backward. Now you must make your way back around, this time pushing the block forward out of your way. Head to the right to the chest.<br/><br/>Note that alternatively, you can shoot the eye switch twice to get the block in position.",
						RequiredItems: [Equipment.STRENGTH, Items.FAIRY_BOW],
						CustomRequirement: function(age) {
							return Items.HOOKSHOT.currentUpgrade > 1 || Equipment.HOVER_BOOTS.playerHas;
						}
					}
				}
			},
			crackedWallArea: {
				Exits: {},
				ItemLocations: {
					"Bombable Wall Chest Below Water Lowering Triforce": {
						Name: "Bombable Wall Chest Below Water Lowering Triforce",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 16,
						MapInfo: {x: 333, y: 131, floor: "F2" },
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						LongDescription: "After raising the water to mid level, make your way back toward the low level room. This time, you won't float up all the way to the top. In this room, you will see a cracked wall. Bomb it to get to a chest.",
						NeedsExplosives: true
					}
				}
			},
			highWaterLevel: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							if (!hasBossKey("Water Temple")) { return false; }

							let hasLongshot = Items.HOOKSHOT.currentUpgrade === 2;
							let canSkipLongshot = Settings.GlitchesToAllow.waterLongshotlessBoss &&
								Items.MEGATON_HAMMER.playerHas &&
								Equipment.HOVER_BOOTS.playerHas;

							return hasLongshot || canSkipLongshot;
						}
					},
					waterfallRoom: {
						Name: "waterfallRoom",
						Map: "Water Temple",
						Age: Age.ADULT,
						LockedDoor: "Locked Door on Top Floor"
					},
				},

				ItemLocations: {
					"Dungeon Map by Water Lowering Triforce": {
						Name: "Dungeon Map by Water Lowering Triforce",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 332, y: 223, floor: "F3" },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "From the entrance of the temple, jump off and sink down to the bottom. Head down the hallway of the east room. Take off your iron boots and float up to the surface. Enter the door and kill the enemies to spawn the chest.",
						RequiredItems: [Equipment.IRON_BOOTS]
					}
				}
			},
			waterfallRoom: {
				Exits: {
					darkLinkRoom: {
						Name: "darkLinkRoom",
						Map: "Water Temple",
						RequiredItems: [Items.HOOKSHOT],
						LockedDoor: "Locked Door in Waterfall Room"
					}
				},

				ItemLocations: {
					"Skulltula in Waterfall Room": {
						Name: "Skulltula in Waterfall Room",
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.ADULT,
						Order: 3,
						MapInfo: {x: 130, y: 208, floor: "F3" },
						LongDescription: "With the water raised to the highest level, enter the door at the left side on the upper floor. On the right wall, there is a skulltula. You can easily get it with the longshot. You can also get it with the hookshot if you stand on the very very top right corner of the highest red block. Note that it really does just barely reach - so much so that you won't even see the red indicator dot.",
						IsAtShortDistance: true
					}
				}
			},
			darkLinkRoom: {
				Exits: {
					whirlpoolRoom: {
						Name: "whirlpoolRoom",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				},

				ItemLocations: {
					"Longshot Chest": {
						Name: "Longshot Chest",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 5,
						MapInfo: {x: 55, y: 44, floor: "F3" },
						LongDescription: "With the water level to the top, enter the door at the left on the upper floor. Proceed through the next two rooms and into the Dark Link fight. After defeating him, enter the next room for the chest."
					},
				}
			},
			whirlpoolRoom: {
				Exits: {
					dragonRoom: {
						Name: "dragonRoom",
						RequiredItems: [Items.FAIRY_BOW]
					}
				},

				ItemLocations: {
					"Skulltula in Whirlpool Room": {
						Name: "Skulltula in Whirlpool Room",
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.ADULT,
						Order: 6,
						MapInfo: {x: 51, y: 121, floor: "F1" },
						LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the blocks from the floor. Drop down. Now, make your way through the whirlpool room, avoiding them as much as possible. The skulltula is somewhere on the left wall when going down this path - equip the iron boots then hookshot it.",
						RequiredItems: [Equipment.IRON_BOOTS],
						IsAtShortDistance: true,
					},
					"Chest at End of Whirlpool Room": {
						Name: "Chest at End of Whirlpool Room",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 7,
						MapInfo: {x: 73, y: 150, floor: "F1" },
						LongDescription: "Start from the longshot chest room. Play the Song of Time to clear the block from the floor. Drop down. Now, make your way through the whirlpool room, avoiding them as much as possible. When you get to the end, shoot the eye switch to open the cage. Now quickly hookshot the chest at the other side to get to it.",
						RequiredItems: [Items.FAIRY_BOW]
					}
				}
			},
			dragonRoom: {
				Exits: {},
				ItemLocations: {
					"Key in Dragon Room at Bottom West Wing": {
						Name: "Key in Dragon Room at Bottom West Wing",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 8,
						MapInfo: {x: 33, y: 61, floor: "F1" },
						LongDescription: "There are two ways to get to this room. One way: after draining the water, make your way to the bottom west wing. Push the red block out of the way then follow the path. Get to the other side of the switch and water puzzle to get the dragon and whirlpool room.<br/><br/>The alternate path to this room is to drop down after the vortex room chest (post-Dark Link).<br/><br/>When here, use your Iron Boots to sink down in the upper right corner of the vortex room, on the lower dragon. From there, hookshot the crystal switch in the dragon's mouth. Now hookshot the target in the room that opens up. Unequip your Iron Boots then float up to the chest.",
						RequiredItems: [Equipment.IRON_BOOTS, Items.HOOKSHOT]
					}
				}
			},
			roomWithManyTektites: {
				Exits: {
					boulderWaterfall: {
						Name: "boulderWaterfall",
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterBKShortcut || (Equipment.STRENGTH.playerHas && Data.hasExplosives(age));
						}
					}
				},
				ItemLocations: {}
			},
			boulderWaterfall: {
				Exits: {
					bossKeyRoom: {
						Name: "bossKeyRoom",
						Map: "Water Temple",
						LockedDoor: "Locked Door after Boulder Waterfall"
					}
				},

				ItemLocations: {
					"Skulltula Near Boss Key Room": {
						Name: "Skulltula Near Boss Key Room",
						ItemGroup: ItemGroups.SKULLTULA,
						Age: Age.ADULT,
						Order: 19,
						MapInfo: { x: 122, y: 91, floor: "F1" },
						LongDescription: "Head to the bottom of the main room - no need to lower the water if you don't want to. Enter the north wing. After you reach the dead end, equip your boots and surface. Longshot to the other side and enter the locked door. Navigate across the room to the other side - might help to kill the tektites. Complete the puzzle in this room which requires you to explode a destroyable wall and push a block onto a switch. After the next room (water switch jumping puzzle), you should see the skulltula on the waterfall to the right.",
						IsAtShortDistance: true,
						CustomRequirement: function(age) {
							let canDoNormally = Equipment.STRENGTH.playerHas && Data.hasExplosives(age);
							return Settings.GlitchesToAllow.waterBKShortcut || canDoNormally;
						}
					}
				}
			},
			bossKeyRoom: {
				Exits: {},
				ItemLocations: {
					"Boss Key Chest": {
						Name: "Boss Key Chest",
						ItemGroup: ItemGroups.CHEST,
						Age: Age.ADULT,
						Order: 21,
						MapInfo: {x: 123, y: 57, floor: "F1" },
					}
				}
			},
			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						Age: Age.ADULT,
						Order: 22,
						MapInfo: {x: 227, y: 135, floor: "F3" },
						LongDescription: "The boss room is on the opposite side of the entrance to the temple. You can actually immediately get there with no glitches required if you already have the longshot and boss key. To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						Age: Age.ADULT,
						Order: 23,
						MapInfo: {x: 227, y: 145, floor: "F3" },
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Shadow Temple": {
		Abbreviation: "SHDW",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F1", "B1", "B2"],
		StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					truthSpinnerRoom: {
						Name: "truthSpinnerRoom",
						CustomRequirement: function(age) {
							let lensCheck = Settings.GlitchesToAllow.shadowLensless || (Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas);
							if (!lensCheck) { return false; }
							
							let canCrossFirstGap = Data.canMegaFlip(age) ||
								(age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas));
								
							return canCrossFirstGap;
						}
					},
					Exit: {
						OwExit: OwExits["Shadow Temple"]["Exit"]
					}
				},
				ItemLocations: {}
			},
			truthSpinnerRoom: {
				Exits: {
					afterTruthSpinner: {
						Name: "afterTruthSpinner",
						CustomRequirement: function(age) {
							return (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas) || Data.canMegaFlip(age);
						}
					}
				},

				ItemLocations: {
					"Dungeon Map Chest": {
						Name: "Dungeon Map Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 100, y: 107, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. The dungeon map chest room is somewhere on the wall to your right. You must kill all the enemies inside to get it.",
						NeedsDamagingItem: true
					},
					"Hover Boots Chest": {
						Name: "Hover Boots Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 15, y: 142, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "From the start of the temple, cross the first gap then go through the wall. Now, turn left and walk all the way to the wall. There is a fake wall to your left - go through it. Go through the next couple walls. Navigate all the way through the fake wall maze and defeat Deadhand for the chest.",
						NeedsSwordWeapon: true
					}
				}
			},
			afterTruthSpinner: {
				Exits: {
					afterBombableWall: {
						Name: "afterBombableWall",
						Map: "Shadow Temple",
						NeedsExplosives: true,
						CustomRequirement: function(age) {
							return getKeyCount("Shadow Temple") >= 1;
						}
					},
					boatRoomStart: {
						Name: "boatRoomStart",
						Map: "Shadow Temple",
						Age: Age.ADULT,
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.shadowGateClip;
						}
					}
				},

				ItemLocations: {
					"Compass Chest": {
						Name: "Compass Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 300, y: 220, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the right path (it's a fake wall) and enter the room. Defeat the gibdos for a chest.",
						NeedsSwordWeapon: true
					},
					"Scythe Room Silver Rupee Chest": {
						Name: "Scythe Room Silver Rupee Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 121, floor: "F1" },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "After crossing the gap onto the tongue, proceed down the hallway. At the beamos, take the left path (it's a fake wall) and enter the room. Collect all the silver rupees to open the path to a chest.<br/><br/>If you have no hookshot, you can use hover boots to get to the wooden box from one of the wooden platforms.",
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
					}
				}
			},
			afterBombableWall: {
				Exits: {
					invisibleSpikeRoom: {
						Name: "invisibleSpikeRoom",
						CustomRequirement: function(age) {
							return getKeyCount("Shadow Temple") >= 2;
						}
					}
				},

				ItemLocations: {
					"Visible Chest in Invisible Scythe Room": {
						Name: "Visible Chest in Invisible Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 138, floor: "B2" },
						Age: Age.EITHER,
						Order: 5,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is behind the gate that opened.",
						NeedsSwordWeapon: true
					},
					"Invisible Chest in Invisible Scythe Room": {
						Name: "Invisible Chest in Invisible Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 143, floor: "B2" },
						Age: Age.EITHER,
						Order: 6,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The chest is next to the visible chest.",
						NeedsSwordWeapon: true
					},
					"Skulltula in Invisible Scythe Room": {
						Name: "Skulltula in Invisible Scythe Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 348, y: 140, floor: "B2" },
						Age: Age.EITHER,
						Order: 7,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn left and follow the outer wall to a door (there are invisible platforms to jump to). Take out the enemies in this room to open up the gate - there's a like-like and a few keese in the corners. If you don't have a range weapon, jumpslash at the keese to alert them to you. The skulltula is behind the open gate. If you have no hookshot, you can kill the skulltula with a jumpslash. Like yourself up so that you, the chest, and the token are in a line. Face the other way and do two backflips (Down + Z + spam A). If you were the right distance away, you should grab the token after backflipping off the chest."
					},
					"Skulltula in Ceiling Spike Room": {
						Name: "Skulltula in Ceiling Spike Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 52, y: 238, floor: "B2" },
						Age: Age.EITHER,
						Order: 8,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						IsAtShortDistance: true,
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The skulltula is in the first cage to the left near the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade."
					},
					"Bottom Chest in Ceiling Spike Room": {
						Name: "Bottom Chest in Ceiling Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 37, y: 212, floor: "B2" },
						Age: Age.EITHER,
						Order: 9,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrancesE || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. The chest is on the second cage to the right passed the ceiling spikes. To pass them, you can either use good timing, or pull the block out of the wall to the right (use the lens to find it) to act as an umbrella - assuming you have a strength upgrade."
					},
					"Top Switchless Chest in Ceiling Spike Room": {
						Name: "Top Switchless Chest in Ceiling Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 16, y: 239, floor: "B2" },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. The chest is in a cage in the corner of the room.",
						CustomRequirement: function(age) {
							return Equipment.STRENGTH.playerHas || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
						}
					},
					"Top Switch Chest in Ceiling Spike Room": {
						Name: "Top Switch Chest in Ceiling Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 79, y: 209, floor: "B2" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "To get to this room, first make it to the platform with the stalfos in the room with all the guillitines. Turn right, and time your jump to the rising and falling platform. Hover Boots help here if you have them. After making it to the next area, collect all the silver rupees. Now enter the area that opened up. Pull the block out of the wall to the right (use the lens to find it) to act as an umbrella to pass the ceiling spikes. Once it's as far as it can go, jump onto it. Hit the switch on top and then get the chest that spawns.",
						CustomRequirement: function(age) {
							return Equipment.STRENGTH.playerHas || Settings.GlitchesToAllow.shadowBackFlipOnSpikes;
						}
					},
				}
			},
			invisibleSpikeRoom: {
				Exits: {
					giantSkullRoom: {
						Name: "giantSkullRoom",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.HOOKSHOT]
					},

					windHallway: {
						Name: "windHallway",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.HOOKSHOT],
						CustomRequirement: function(age) {
							let canPassFans = Settings.GlitchesToAllow.shadowNoIronBoots || Equipment.IRON_BOOTS.playerHas;
							return canPassFans && getKeyCount("Shadow Temple") >= 3;
						}
					}
				},

				ItemLocations: {
					"Chest in Invisible Spike Room": {
						Name: "Chest in Invisible Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 156, y: 64, floor: "B2" },
						Age: Age.EITHER,
						Order: 12,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "To get here, first head to the area with the beamos and spike traps. Face the door leading to the ceiling spike room. Now turn right. Follow the edge of the pit in front of you all the way to the guillotine. Use your Lens of Truth to navigate the platforms and make it to the door. Once inside, kill all the redeads to spawn the chest. Be careful of the invisible spikes in here - you can equip the Goron Tunic to avoid some damage since they act like lava.",
						NeedsSwordWeapon: true
					}
				}
			},
			giantSkullRoom: {
				Exits: {},
				ItemLocations: {
					"Key in Giant Skull": {
						Name: "Key in Giant Skull",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 92, y: 70, floor: "B2" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "To get here, start at the invisible spike room. Collect all the silver rupees using your hookshot. Note that there are a few invisible targets. Enter the room on the bottom that unlocks. Throw a Bomb or Bomb Flower into the giant skull to spawn the key.",
						RequiredChoiceOfAdultItems: [Equipment.STRENGTH, Items.BOMB]
					},

					"Skulltula in Giant Skull Room": {
						Name: "Skulltula in Giant Skull Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 77, y: 68, floor: "B2" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "To get here, start at the invisible spike room. Collect all the silver rupees using your hookshot. Note that there are a few invisible targets. Enter the room on the bottom that unlocks. The skulltula is behind the giant skull."
					}
				}
			},
			windHallway: {
				Exits: {
					boatRoomStart: {
						Name: "boatRoomStart",
						CustomRequirement: function(age) {
							return getKeyCount("Shadow Temple") >= 4;
						}
					}
				},

				ItemLocations: {
					"Invisible Chest at Wind Hallway": {
						Name: "Invisible Chest at Wind Hallway",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 198, floor: "B1"  },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "Start at the invisible spikes room. Navigate to the door on the upper platform. If you don't have the longshot, you'll need to first backflip on the chest to get enough height to hit the invisible target. Navigate through the fans using your Iron Boots. Use your hookshot on the horizontal wooden pillar to pass the gap. Make your way to the end of the hallway and enter the door. There is an invisible chest in the back right corner of this room."
					},
					"Chest in Gibdo Room": {
						Name: "Chest in Gibdo Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 302, y: 146, floor: "B1" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. Kill the gibdos to spawn the chest."
					},
					"Chest in Rubble in Gibdo Room": {
						Name: "Chest in Rubble in Gibdo Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 309, y: 156, floor: "B1" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "Start at the invisible chest at the end of the wind hallway. Exit this room - there is a fake wall directly across from the first fan to your left. Use its wind power to get enough speed to jump the gap. You don't actually need the Hover Boots to make the jump, but they do help. Bomb the rubble to your right to uncover an invisible chest.",
						NeedsExplosives: true
					},
				}
			},
			boatRoomStart: {
				Exits: {
					boatRoomEnd: {
						Name: "boatRoomEnd",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					}
				},

				ItemLocations: {
					"Skulltula in Boat Room": {
						Name: "Skulltula in Boat Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 274, y: 116, floor: "B1" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. If you face the front of the boat, you can see the skulltula slightly to your left. You can get it with your longshot - Scarecrow's Song can help, but isn't needed.",
						RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
					}
				}
			},
			boatRoomEnd: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							if (!hasBossKey("Shadow Temple")) { return false; }

							let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
							let canCrossGap = Items.FAIRY_BOW.playerHas || canHitWithChu;
							let hasEnoughKeys = getKeyCount("Shadow Temple") >= 5; 
							let canGetToDoor = Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
							let canDefeatBoss = Items.FAIRY_BOW.playerHas || Items.HOOKSHOT.playerHas;
							
							return hasEnoughKeys && canCrossGap && canGetToDoor && canDefeatBoss;
						}
					}
				},

				ItemLocations: {
					"Chest in Spike Wall Room": {
						Name: "Chest in Spike Wall Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 70, y: 52, floor: "B1" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the chest.",
						RequiredItems: [Items.DINS_FIRE, Equipment.MAGIC]
					},
					"Boss Key Chest in Spike Wall Room": {
						Name: "Boss Key Chest in Spike Wall Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 108, y: 52, floor: "B1" },
						Age: Age.ADULT,
						Order: 20,
						LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your right. Cast Din's Fire to take out the spike walls to clear the path to the boss key chest.<br/><br/>If you don't have it, run up against the right side of the wall in the back of the room and have the redead freeze you. You should phase through the wall."
					},
					"Skulltula in Triple Skull Room": {
						Name: "Skulltula in Triple Skull Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 28, y: 98, floor: "B1" },
						Age: Age.ADULT,
						Order: 21,
						LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room straight across from you to get to the skulltula."
					},
					"Chest in Invisible Floormaster Room": {
						Name: "Chest in Invisible Floormaster Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 89, y: 148, floor: "B1" },
						Age: Age.ADULT,
						Order: 22,
						LongDescription: "Get to the room with the boat. To get up, either hookshot the ladder (be on the opposite side you hook - for example, stand on the left, and hookshot the upper right part of the ladder), or push the block to the hole. Play Zelda's Lullaby on the Triforce picture and ride the boat across. Enter the door on the end of the room. Navigate to the room to your left. Kill the invisible floor master to spawn the chest."
					}
				}
			},
			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 131, y: 219, floor: "B1" },
						Age: Age.ADULT,
						Order: 23,
						LongDescription: "When fighting Bongo Bongo, it helps to NOT have the Hover Boots equipped. When the fight starts, if you hold down, he won't circle you right away. Hit his hands with your bow or hookshot to stun them. Now hit him before he hits you and damage him as much as you can. If you have magic, quickspins can actually stunlock him for a 1-cycle if you do them perfectly."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 131, y: 230, floor: "B1" },
						Age: Age.ADULT,
						Order: 24,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Spirit Temple": {
		Abbreviation: "SPRT",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F4", "F3", "F2", "F1"],
		StartingFloorIndex: 3,
		UseAltOrder: function() {
			return Equipment.STRENGTH.currentUpgrade > 1 && Keys.SPIRIT_TEMPLE.keyCount > 0;
		},
		Regions: {
			main: {
				Exits: {
					childOnlyArea: {
						Name: "childOnlyArea",
						Age: Age.CHILD
					},
					beyondSilverBlock: {
						Name: "beyondSilverBlock",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Data.spiritCanAccessAdultSide();
						}
					},
					Exit: {
						OwExit: OwExits["Spirit Temple"]["Exit"]
					}
				},

				ItemLocations: {
					// Locked Doors
					"Locked Door After Second Crawl Space": {
						Name: "Locked Door After Second Crawl Space",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["childOnlyArea"],
						MapInfo: { x: 87, y: 100, floor: "F1" },
						Age: Age.CHILD,
						Order: 4,
						AltOrder: 31,
						LongDescription: "This is the door after the second crawlspace on the child side.",
						KeyRequirement: function(age) {
							return { min: 1, max: Keys.SPIRIT_TEMPLE.totalKeys()};
						}
					},
					"Locked Door to Silver Gaunts Knuckle": {
						Name: "Locked Door to Silver Gaunts Knuckle",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["statueRoom"],
						MapInfo: { x: 32, y: 198, floor: "F3" },
						Age: Age.EITHER,
						Order: 11,
						AltOrder: 16,
						LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
						KeyRequirement: function(age) {
							// There's only one path for child, and it uses only 2 keys
							if (!Data.spiritCanAccessAdultSide()) {
								return { min: 2, max: 2 };
							}

							let minValue = 1;
							if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
								minValue++;
							}
							return { min: minValue, max: 5 };
						}
					},
					"Locked Door After Silver Block": {
						Name: "Locked Door After Silver Block",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["beyondSilverBlock"],
						MapInfo: { x: 272, y: 167, floor: "F1" },
						Age: Age.ADULT,
						Order: 16,
						AltOrder: 4,
						LongDescription: "This is the locked door after the silver block on the adult side.",
						KeyRequirement: function(age) {
							let minValue = 1;
							if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
								minValue++;
							}
							return { min: minValue, max: 3 };
						}
					},
					"Locked Door in Statue Room": {
						Name: "Locked Door in Statue Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["statueRoom"],
						MapInfo: { x: 256, y: 217, floor: "F2" },
						Age: Age.ADULT,
						Order: 21,
						AltOrder: 18,
						LongDescription: "This is the locked door on the upper east part of the statue room.",
						KeyRequirement: function(age) {
							let minValue = 2;
							if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
								minValue++;
							}
							return { min: minValue, max: 4 };
						}
					},
					"Locked Door in Anubis Room": {
						Name: "Locked Door in Anubis Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["adultAnubisRoom"],
						MapInfo: { x: 223, y: 105, floor: "F3" },
						Age: Age.ADULT,
						Order: 26,
						AltOrder: 23,
						LongDescription: "This is the locked door in the southwest corner of the room with Anubises and pits.",
						KeyRequirement: function(age) {
							let minValue = 3;
							if (Data.itemLocationObtained("Spirit Temple", "main", "Locked Door After Second Crawl Space")) {
								minValue++;
							}

							return { min: minValue, max: 5 };
						}
					}
				}
			},
			childOnlyArea: {
				Exits: {
					childAfterStalfos: {
						Name: "childAfterStalfos",
						CustomRequirement: function(age) {
							let canClearFirstRoom = Data.hasExplosives() || Data.hasSwordWeapon();
							let canHitSwitch = Items.FAIRY_SLINGSHOT.playerHas || Items.BOOMERANG.playerHas;
							return canClearFirstRoom && canHitSwitch;
						}
					},
					childSkulltulaInGrateRoom: {
						Name: "childSkulltulaInGrateRoom",
						RequiredItems: [Items.BOOMERANG]
					},
					roomWithSunOnFloor: {
						Name: "childSkulltulaInGrateRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door After Second Crawl Space"
					}
				},
				ItemLocations: {}
			},
			childAfterStalfos: {
				Exits: {
					childGrateRoom: {
						Name: "childGrateRoom"
					}
				},

				ItemLocations: {
					"Chest After Stalfos": {
						Name: "Chest After Stalfos",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 31, y: 81, floor: "F1" },
						Age: Age.CHILD,
						Order: 1,
						AltOrder: 28,
						LongDescription: "Enter the child-only crawlspace. Kill all the enemies in the first room to unlock the doors - BEWARE OF FIRE KEESE! Enter the left room. The goal in this room is to hit the switch to lower the bridge to get the chest on the other side. There are a few ways to do this. The easiest way is to simply use the boomerang to go around the bridge blocking the switch. If you have the slingshot, you can inch up to the ledge closest to the door and make a precise shot - be sure to go quick if you don't have the means to kill the stalfos."
					}
				}
			},
			childGrateRoom: {
				Exits: {
					childSkulltulaInGrateRoom: {
						Name: "childSkulltulaInGrateRoom",
						CustomRequirement: function(age) {
							return Items.FAIRY_SLINGSHOT.playerHas || 
								Items.DEKU_STICK.playerHas ||
								Data.canUseFireItem(age) ||
								Data.hasExplosives();
						}
					}
				},

				ItemLocations: {
					"Chest After Anubis Room": {
						Name: "Chest After Anubis Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 151, y: 75, floor: "F1" },
						Age: Age.CHILD,
						Order: 2,
						AltOrder: 29,
						LongDescription: "Make your way around counter-clockwise around the child-only areas of the temple. In the room with the Anubis, either Din's fire him, or hit the switch then quickly navigate to the side directly opposite the fire so that it dies on it. In the room after that - collect the silver rupees to lower the bridge. Now you can use a Deku Stick (or Din's fire) to light the torches on the other side to spawn the chest. Note that you also could have used Din's fire on them earlier to avoid collecting the silver rupees.",
						CustomRequirement: function(age) {
							return Items.DEKU_STICK.playerHas || Data.canUseFireItem(age);
						}
					}
				}
			},
			childSkulltulaInGrateRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Grate Room": {
						Name: "Skulltula in Grate Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 151, y: 90, floor: "F1" },
						Age: Age.CHILD,
						Order: 3,
						AltOrder: 30,
						LongDescription: "After killing all the enemies in the first child-only room, enter the right room. There's a skulltula on the grate - kill it and collect it with your Boomerang. If you don't have one, navigate around the rooms counter-clockwise. Collect the silver rupees to lower the bridge. Kill it with bombs, a bombchu (it can slide along the pit at the bottom), Din's Fire, a stick jumpslash from the other side, or a slingshot. You can actually climb the side of the grate that the token is on with a well-angled jump to collect it without a Boomerang."
					}
				}
			},
			roomWithSunOnFloor: {
				Exits: {
					statueRoom: {
						Name: "statueRoom",
						NeedsExplosives: true
					}
				},

				ItemLocations: {
					"Skulltula in Sun on Floor Room": {
						Name: "Skulltula in Sun on Floor Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 35, y: 133, floor: "F2" },
						Age: Age.EITHER,
						Order: 5,
						AltOrder: 13,
						LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door. As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door). The skulltula is on the wall leading down the climbable wall. You can hit it with a jumpslash, an explosive, Din's Fire, or a ranged weapon."
					},
					"Left Chest in Sun on Floor Room": {
						Name: "Left Chest in Sun on Floor Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 63, y: 141, floor: "F2" },
						Age: Age.EITHER,
						Order: 6,
						AltOrder: 11,
						LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
						RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
						RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
					},
					"Right Chest in Sun on Floor Room": {
						Name: "Right Chest in Sun on Floor Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 51, y: 131, floor: "F2" },
						Age: Age.EITHER,
						Order: 7,
						AltOrder: 12,
						LongDescription: "This is the room you get to as a child after entering the crawlspace and going through the door.<br/><br/>As adult, you can enter from the opposite side of the statue room that you normally enter from (bottom door).<br/><br/>If you face the door on the top part of the floor, there's a switch up and to your right. Hit it with an explosive or ranged weapon to spawn the chest.",
						RequiredChoiceOfChildItems: [Items.FAIRY_SLINGSHOT, Items.BOOMERANG, Items.BOMBCHU, Items.BOMB],
						RequiredChoiceOfAdultItems: [Items.FAIRY_BOW, Items.HOOKSHOT, Items.BOMBCHU, Items.BOMB]
					}
				}
			},
			beyondSilverBlock: {
				Exits: {
					openDoorsBySilverBlock: {
						Name: "openDoorsBySilverBlock",
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Items.FAIRY_BOW, Items.BOMBCHU]
					},
					statueRoom: {
						Name: "statueRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door After Silver Block"
					}
				},
				ItemLocations: {}
			},
			openDoorsBySilverBlock: {
				Exits: {},
				ItemLocations: {
					"Compass Chest in Left Silver Block Room": {
						Name: "Compass Chest in Left Silver Block Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 226, y: 99, floor: "F1" },
						Age: Age.ADULT,
						Order: 13,
						AltOrder: 1,
						LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the left. Kill the wolfos inside, then play Zelda's Lullaby. You can longshot from the platform, or hookshot from the sandy floor.",
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						RequiredItems: [Items.HOOKSHOT]
					},
					"Skulltula in Right Silver Block Room": {
						Name: "Skulltula in Right Silver Block Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 296, y: 122, floor: "F1" },
						Age: Age.ADULT,
						Order: 14,
						AltOrder: 2,
						LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right. On the left wall, there's a Song of Time block blocking this skulltula. Play the song to move it out of the way.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},
					"Chest After Right Silver Block Room": {
						Name: "Chest After Right Silver Block Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 319, y: 65, floor: "F1" },
						Age: Age.ADULT,
						Order: 15,
						AltOrder: 3,
						LongDescription: "Head to the room blocked by the silver block. Hit the switch above the beamos to open the doors. Enter the door to the right. Collect all the silver rupees in the boulder room. The floating one by the start is a bit tricky without hover boots. You can reach it if you roll off the edge, then do a delayed jumpslash to gain enough distance. Once you get all the rupees, enter the next room for the chest. Watch out for the like-like!"
					}
				}
			},
			statueRoom: {
				Exits: {
					roomWithSunOnFloor: {
						Name: "roomWithSunOnFloor"
					},
					silverGauntsIronKnuckle: {
						Name: "silverGauntsIronKnuckle",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door to Silver Gaunts Knuckle"
					},
					adultAnubisRoom: {
						Name: "adultAnubisRoom",
						Age: Age.ADULT,
						Map: "Spirit Temple",
						LockedDoor: "Locked Door in Statue Room"
					}
				},

				ItemLocations: {
					"Map Chest in Statue Room": {
						Name: "Map Chest in Statue Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 176, y: 147, floor: "F2" },
						Age: Age.EITHER,
						Order: 8,
						AltOrder: 8,
						LongDescription: "Head to the statue room. On the floor in front of the statue, light the torches with Din's Fire or Fire Arrows to spawn the chest. You can also run a lit deku stick down via the torch in the southwest corner of the room.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age === Age.CHILD && Items.DEKU_STICK.playerHas);
						}
					},
					"Chest in Sun Block Room": {
						Name: "Chest in Sun Block Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 60, y: 117, floor: "F3" },
						Age: Age.EITHER,
						Order: 9,
						AltOrder: 14,
						LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. As child, you can collect the silver rupees to light the golden torch. After that, use a Deku Stick to light the other torches. You can also just use Din's Fire to light them - make sure to light two at once, then get close to the third one before casting it a second time. As adult, your only options are Din's Fire or Fire Arrows.",
						CustomRequirement: function(age) {
							let canUseFireItem = Data.canUseFireItem(age);
							if (age === Age.CHILD) {
								let canLightTorches = Items.DEKU_STICK.playerHas || canUseFireItem;
								return canLightTorches && Data.hasExplosives();
							}
							return canUseFireItem;
						}
					},
					"Skulltula in Hall Before Silver Knuckle": {
						Name: "Skulltula in Hall Before Silver Knuckle",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 32, y: 131, floor: "F3" },
						Age: Age.EITHER,
						Order: 10,
						AltOrder: 15,
						LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Once inside the next room, turn around; the skulltula is above the door.",
						IsAtShortDistance: true
					},
					"Left Chest in Mirror Room": {
						Name: "Left Chest in Mirror Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 330, y: 168, floor: "F2" },
						Age: Age.ADULT,
						Order: 14,
						AltOrder: 5,
						LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the first sun."
					},
					"Right Chest in Mirror Room": {
						Name: "Right Chest in Mirror Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 330, y: 184, floor: "F2" },
						Age: Age.ADULT,
						Order: 17,
						AltOrder: 6,
						LongDescription: "Enter the middle door after the silver block room. This is the chest that appears after facing the snake mirror at the second sun."
					},
					"Chest in Statue Room on Northeast Platform": {
						Name: "Chest in Statue Room on Northeast Platform",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 254, y: 107, floor: "F2" },
						Age: Age.ADULT,
						Order: 18,
						AltOrder: 7,
						LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. Now, head back up to the southeast corner. The platform to the right of the hand now has a chest on it. Use your hookshot or hover boots to get to it.",
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
					},
					"Chest on Statue's Hand": {
						Name: "Chest on Statue's Hand",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 133, y: 130, floor: "F2" },
						Age: Age.ADULT,
						Order: 19,
						AltOrder: 9,
						LongDescription: "Head to the statue room. Head up to the upper southeast corner of the room. If you face the statue, that's behind and to the right if you. You may have to hookshot up to the platform to get there. Jump to the statue's hand from the platform. You can use hover boots if you want, but they aren't necessary. Play Zelda's Lullaby on the Triforce picture. If you have the longshot, you can hook the chest that spawns from the other hand from here. If not, head to the upper southwest corner of the room - that's the one closer to the other hand. You can jump to it from there.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},
					"Skulltula in Statue Room on Northwest Platform": {
						Name: "Skulltula in Statue Room on Northwest Platform",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 93, y: 101, floor: "F2" },
						Age: Age.ADULT,
						Order: 20,
						AltOrder: 10,
						LongDescription: "Head to the statue room. Get to the upper southwest corner of the room. Facing the statue, that would be behind you and to the left. The skulltula is on a platform to the left of the statue. You can Scarecrow's Song or hover boots to get to it.",
						CustomRequirement: function(age) {
							return Data.canHookScarecrow(age) || Equipment.HOVER_BOOTS.playerHas;
						}
					}
				}
			},
			silverGauntsIronKnuckle: {
				Exits: {
					silverGauntsStatueHand: {
						Name: "silverGauntsStatueHand"
					}
				},
				ItemLocations: {}
			},
			silverGauntsStatueHand: {
				Exits: {
					mirrorShieldKnuckle: {
						Name: "mirrorShieldKnuckle",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.spiritSuperslideToMirrorShield &&
								Data.hasShield(age) &&
								Items.BOMB.playerHas &&
								Equipment.HOVER_BOOTS.playerHas;
						}
					},
					statueHands: {
						Name: "statueHands"
					}
				},

				ItemLocations: {
					"Silver Gauntlets Chest": {
						Name: "Silver Gauntlets Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 103, y: 228, floor: "F3" },
						Age: Age.EITHER,
						Order: 12,
						AltOrder: 17,
						LongDescription: "Navigate to the statue room. Get to the room containing the sun block. If you face the statue, it's in the corner of the room behind you and to your left, on the topmost floor. In this room, there's a ray of light with some blocks nearby. Pull the block with the sun on it straight back and it will become happy when it hits the light, opening the door. Continue on and you'll run into an Iron Knuckle. After defeating him, continue passed the door and onto the status outside the Spirit Temple. The chest is in front of you.<br/><br/>You can also get here as adult if you longshot from the mirror shield side."
					}
				}
			},
			statueHands: {
				Exits: {
					"Desert Colossus": {
                        OwExit: OwExits["Spirit Temple"]["Desert Colossus"]
                    }
				},
				ItemLocations: {}
			},
			adultAnubisRoom: {
				Exits: {
					fourArmosRoom: {
						Name: "fourArmosRoom",
						NeedsExplosives: true
					},
					movingWallRoom: {
						Name: "movingWallRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door in Anubis Room"
					}
				},
				ItemLocations: {}
			},
			fourArmosRoom: {
				Exits: {
					adultAnubisRoom: {
						Name: "adultAnubisRoom"
					},
					mirrorShieldKnuckle: {
						Name: "mirrorShieldKnuckle"
					}
				},
				ItemLocations: {
					"Sun Room Chest After 4 Armos": {
						Name: "Sun Room Chest After 4 Armos",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 320, y: 41, floor: "F3" },
						Age: Age.ADULT,
						Order: 22,
						AltOrder: 19,
						LongDescription: "Head to the door at the very top of the southeast corner of the statue room. That's the room behind you and to the right if you face the statue. When you get to the relevant room, kill the Anubises and the beamos to proceed. If you don't have fire items, play the Song of Time by the barred door. Now, hit the switch and run around the room to lead the Anubises into the fire. Enter the now unbarred door into the room with the 4 armos statues. Enter the room to your left by reflecting the light into the sun with your Mirror Shield. The chest is inside.",
						RequiredItems: [Equipment.MIRROR_SHIELD]
					}
				}
			},
			mirrorShieldKnuckle: {
				Exits: {
					fourArmosRoom: {
						Name: "fourArmosRoom"
					},
					silverGauntsStatueHand: {
						Name: "silverGauntsStatueHand",
						RequiredAdultItems: [{item: Items.HOOKSHOT, upgrardeString: "2"}]
					},
					statueHands: {
						Name: "statueHands"
					}
				},

				ItemLocations: {
					"Left Chest Before Mirror Knuckle": {
						Name: "Left Chest Before Mirror Knuckle",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 329, y: 165, floor: "F3" },
						Age: Age.ADULT,
						Order: 23,
						AltOrder: 20,
						LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
					},
					"Right Chest Before Mirror Knuckle": {
						Name: "Right Chest Before Mirror Knuckle",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 317, y: 165, floor: "F3" },
						Age: Age.ADULT,
						Order: 24,
						AltOrder: 21,
						LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. A little bit up the corridor are two invisible chests on either side of the hallway. Make sure you're facing the wall when attempting to open them."
					},
					"Mirror Shield Chest": {
						Name: "Mirror Shield Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 247, y: 226, floor: "F3" },
						Age: Age.ADULT,
						Order: 25,
						AltOrder: 22,
						LongDescription: "Get to the 4 armos room - see the other task for how to get there. Get into the room on the right by having an armos step on the switch long enough for you to get in. Bombs, arrows, and the hookshot are useful for this. After this next room, kill the Iron Knuckle. Proceeding further, you'll reach the outside of the Spirit Temple. Walk a bit onto the hand to spawn the Mirror Shield chest."
					}
				}
			},
			movingWallRoom: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						RequiredItems: [Items.HOOKSHOT, Equipment.MIRROR_SHIELD],
						NeedsExplosives: true,
						CustomRequirement: function(age) {
							return hasBossKey("Spirit Temple");
						}
					}
				},

				ItemLocations: {
					"Boss Key Chest After Moving Wall Room": {
						Name: "Boss Key Chest After Moving Wall Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 294, y: 40, floor: "F4" },
						Age: Age.ADULT,
						Order: 27,
						AltOrder: 24,
						LongDescription: "Head to the moving wall room. This is the room to your right if you enter the topmost southeast area of the statue room. It's also the room straight ahead if leaving the 4 armos room. Head up the wall - longshot up there if you have it. In the next room, play Zelda's Lullaby to open the door in front of you. Bomb or hammer the fake door just to the left of the boss key chest. Shoot the eye switch to spawn some platforms. Now, hookshot up there and hit the switch to put the fire out.",
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						CustomRequirement: function(age) {
							if (Settings.GlitchesToAllow.spiritBKTrick) { return true; }
							
							let canDestroyDoors = Data.hasExplosives() || Data.canUseHammer(age);
							let hasRequiredItems = Items.FAIRY_BOW.playerHas && Items.HOOKSHOT.playerHas;
							return canDestroyDoors && hasRequiredItems;
						}
					},
					"Chest in Snake Mirror Maze": {
						Name: "Chest in Snake Mirror Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 51, y: 150, floor: "F4" },
						Age: Age.ADULT,
						Order: 28,
						AltOrder: 25,
						LongDescription: "At the start of the snake mirror maze, shine a light on the sun up on the archway into the next room.",
						RequiredItems: [Equipment.MIRROR_SHIELD]
					}
				}
			},
			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 173, y: 63, floor: "F2" },
						Age: Age.ADULT,
						Order: 29,
						AltOrder: 26,
						LongDescription: "The boss room can be reached if you enter the left door after the moving wall room. First, hit the silver switch behind the cage to be able to continue. Position all the snake mirrors so that they point the light at the giant mirror in the original room. You'll have to bomb a wall at some point. Make your way to where the light is now and shine it at the sun on the wall. When the platform lowers, shine the light on the statue's face. After it breaks, hookshot the grate and enter the boss room, then kill the iron knuckle.<br/><br/>To defeat Twinrova, reflect one of the sister's shots at the other one. Do this four times to get to the second phase. Now, you must charge your shield with 3 of the same kind of attack. When you do, your shield will shoot it at Twinrova, stunning her. Go hit her! As usual, a jumpslash (Z + A) then crouch stabs (R + spam B) do the most damage."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 187, y: 63, floor: "F2" },
						Age: Age.ADULT,
						Order: 30,
						AltOrder: 27,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Ice Cavern": {
		Abbreviation: "ICE",
		MapGroup: MapGroups.DUNGEONS,
		Regions: {
			main: {
				Exits: {
					afterFreezards: {
						Name: "afterFreezards",
						NeedsSwordWeapon: true
					},
					Exit: {
						OwExit: OwExits["Ice Cavern"]["Exit"]
					}
				},
				ItemLocations: {}
			},
			afterFreezards: {
				Exits: {
					blueFireRequired: {
						CustomRequirement: function(age) {
							return (age === Age.ADULT && Data.hasBottle()) || Items.BLUE_FIRE.playerHas;
						}
					}
				},

				ItemLocations: {
					"Skulltula in Scythe Room": {
						Name: "Skulltula in Scythe Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 161, y: 127 },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "In the room with the spinning scythe, there's a skulltula up on one of the walls. It's the one to your left when you first enter.",
						IsAtShortDistance: true
					}
				}
			},
			blueFireRequired: {
				Exits: {},
				ItemLocations: {
					"Map Chest in Platforming Room": {
						Name: "Map Chest in Platforming Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 192, y: 18 },
						Age: Age.ADULT,
						Order: 2,
						LongDescription: "This is the room you gain access to after you collect all the silver rupees in the spinning scythe room. Navigate to the top and use blue fire on the chest to gain access to it."
					},
					"Compass Chest in Right Red Ice Room": {
						Name: "Compass Chest in Right Red Ice Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 246, y: 147 },
						Age: Age.EITHER,
						Order: 3,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. Melt the ice containing the chest."
					},
					"Iron Boots Chest": {
						Name: "Iron Boots Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 127, y: 182 },
						Age: Age.EITHER,
						Order: 7,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "This is in the room after the block pushing puzzle - the one with the wolfos. Defeat it to spawn the chest. Note that after you get the chest, you will also get the Serenade of Water item."
					},
					"Heart Piece in Right Red Ice Room": {
						Name: "Heart Piece in Right Red Ice Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 244, y: 115 },
						Age: Age.EITHER,
						Order: 4,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. Melt the ice containing the heart piece."
					},
					"Serenade of Water": {
						Name: "Serenade of Water",
						ItemGroup: ItemGroups.SONG,
						MapInfo: { x: 122, y: 177 },
						Age: Age.EITHER,
						Order: 8,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "You'll get this automatically after you open the Iron Boots chest."
					},
					"Skulltula in Right Red Ice Room": {
						Name: "Skulltula in Right Red Ice Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 253, y: 117 },
						Age: Age.EITHER,
						Order: 5,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "When you first enter the spinning scythe room, look to your right. Burn the red ice with your blue fire and enter the room. There's a skulltula up on one of the walls to your left.",
						IsAtShortDistance: true
					},
					"Skulltula in Block Push Room": {
						Name: "Skulltula in Block Push Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 143, y: 111 },
						Age: Age.EITHER,
						Order: 6,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances; },
						LongDescription: "When you first enter the spinning scythe room, look to your left. Burn the red ice with your blue fire and enter the room. When you get to the big room, the skulltula will be on the wall to your left.",
						IsAtShortDistance: true
					}
				}
			}
		}
	},

	"Bottom of the Well": {
		Abbreviation: "WELL",
		MapGroup: MapGroups.DUNGEONS,
		Floors: ["F1", "B1"],
		StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					mainArea: {
						Name: "mainArea",
						Age: Age.CHILD,
						CustomRequirement: function(age) {
							return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
						}
					},
					Exit: {
						OwExit: OwExits["Bottom of the Well"]["Exit"]
					}
				},

				ItemLocations: {
					// Locked Doors
					"Locked Door After Crawlspace": {
						Name: "Locked Door After Crawlspace",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 300, y: 71, floor: "F1" },
						Age: Age.CHILD,
						Order: 16,
						LongDescription: "This is the door after the crawlspace in the northeast corner of the main room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 3 };
						}
					},
					"Left Locked Door in Center": {
						Name: "Left Locked Door in Center",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 160, y: 121, floor: "F1" },
						Age: Age.CHILD,
						Order: 12,
						LongDescription: "This is left locked door in the center of the main room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 3 };
						}
					},
					"Right Locked Door in Center": {
						Name: "Right Locked Door in Center",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 225, y: 121, floor: "F1" },
						Age: Age.CHILD,
						Order: 14,
						LongDescription: "This is right locked door in the center of the main room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 3 };
						}
					},
				}
			},
			mainArea: {
				Exits: {
					pitRoom: {
						Name: "pitRoom",
						Map: "Bottom of the Well",
						LockedDoor: "Locked Door After Crawlspace"
					},
					leftLockedRoom: {
						Name: "leftLockedRoom",
						Map: "Bottom of the Well",
						LockedDoor: "Left Locked Door in Center"
					},
					rightLockedRoom: {
						Name: "rightLockedRoom",
						Map: "Bottom of the Well",
						LockedDoor: "Right Locked Door in Center"
					},
					deadhandRoom: {
						Name: "deadhandRoom",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},
					bombableHoleRoom: {
						Name: "bombableHoleRoom",
						NeedsExplosives: true
					}
				},

				ItemLocations: {
					"Chest in Front Right Wall": {
						Name: "Chest in Front Right Wall",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 231, y: 195, floor: "F1" },
						Age: Age.CHILD,
						Order: 1,
						LongDescription: "Get to the main room. Follow the wall in front of you around to the right. There's a fake wall to your left when you first turn the left corner.",
					},
					"Chest in Front Left Wall": {
						Name: "Chest in Front Left Wall",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 158, y: 194, floor: "F1" },
						Age: Age.CHILD,
						Order: 3,
						LongDescription: "This chest is in a fake wall to the left when you first enter the main room."
					},
					"Compass Chest in Center": {
						Name: "Compass Chest in Center",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 167, y: 172, floor: "F1" },
						Age: Age.CHILD,
						Order: 4,
						LongDescription: "From the main room's entrance, follow the path to the left. When you enter the tunnel, hug the right wall until you pass through the fake wall. The chest is in there, but don't go too far in front of it because there's a pit."
					},
					"Chest by Giant Skulltula in Center": {
						Name: "Chest by Giant Skulltula in Center",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 221, y: 172, floor: "F1" },
						Age: Age.CHILD,
						Order: 5,
						LongDescription: "Get to the center room, past the fake wall straight ahead from the entrance. This is the chest that's guarded by the giant skulltula in the righthand side cage. DO NOT accidently go to the map chest, as you might accidently fall into the pit."
					},
					"Northwest Chest Under Rubble": {
						Name: "Northwest Chest Under Rubble",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 93, y: 49, floor: "F1" },
						Age: Age.CHILD,
						Order: 6,
						LongDescription: "From the main room's entrance, follow the path to the left. Continue straight until you run into either the wall, or the giant skulltula. To the left you can see that there's some rubble in the back. DO NOT simply walk to it - there are pits. Hug the left side of the little alcove to get there safely. Bomb the rubble to get the chest.",
						NeedsExplosives: true
					},
					"Underwater Chest by Coffin Room": {
						Name: "Underwater Chest by Coffin Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 93, y: 137, floor: "F1" },
						Age: Age.CHILD,
						Order: 7,
						LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. This chest is near the entrance to the coffin room, which is in a room on the left side of the main room.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},
					"Key in Coffin Room": {
						Name: "Key in Coffin Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 29, y: 142, floor: "F1" },
						Age: Age.CHILD,
						Order: 8,
						LongDescription: "Head to the room to the left of the main room. Either dive under the gate, or climb up the vines to get to the door (depends on whether you drained the water). Inside, light the upper leftmost torch to gain access to the key. Remember that you can use Din's Fire if you don't have sticks.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || Items.DEKU_STICK.playerHas;
						}
					},
					"Underwater Chest in Front": {
						Name: "Underwater Chest in Front",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 185, y: 238, floor: "F1" },
						Age: Age.CHILD,
						Order: 9,
						LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. This chest is in the pit by the entrance, near the crawlspace to Dead Hand.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},
					"Map Chest in Basement": {
						Name: "Map Chest in Basement",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 302, y: 238, floor: "B1" },
						Age: Age.CHILD,
						Order: 20,
						LongDescription: "Fall down one of the many pits to get to the basement. This chest is located behind the rocks that are farthest from the ladder. That is, if you face away from the ladder, it's the rightmost set of rocks.",
						NeedsExplosives: true
					}
				}
			},
			pitRoom: {
				Exits: {
					deadhandRoom: {
						Name: "deadhandRoom",
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.botwActorGlitch;
						}
					}
				},

				ItemLocations: {
					"Chest in Room With Pits": {
						Name: "Chest in Room With Pits",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 302, y: 114, floor: "F1" },
						Age: Age.CHILD,
						Order: 17,
						LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. To get to this chest safely, hug the left wall REALLY close."
					},
					"Chest in Like-Like Room": {
						Name: "Chest in Like-Like Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 299, y: 137, floor: "F1" },
						Age: Age.CHILD,
						Order: 18,
						LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. If you don't have the lens - here's one way to get around (it's still difficult). Get to the corner of the room with the chest. Face the left wall (the one the door is NOT on). Do two left sidehops and move a tiny bit more left. Go straight to where the beamos is (or was). Now angle yourself diagonal left toward the door and pray you make it. The chest is guarded by a like-like that you don't have to kill."
					},
					"Skulltula in Like-Like Room": {
						Name: "Skulltula in Like-Like Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 307, y: 137, floor: "F1" },
						Age: Age.CHILD,
						Order: 19,
						LongDescription: "This is the room after the crawlspace at the upper right part of the main room. Be careful of the invisible pits in this room. If you don't have the lens - here's one way to get around (it's still difficult). Get to the corner of the room with the chest. Face the left wall (the one the door is NOT on). Do two left sidehops and move a tiny bit more left. Go straight to where the beamos is (or was). Now angle yourself diagonal left toward the door and pray you make it. The skulltula is guarded by a like-like that you don't have to kill.",
						IsAtShortDistance: true
					}
				}
			},
			leftLockedRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Left Locked Room": {
						Name: "Skulltula in Left Locked Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 156, y: 86, floor: "F1" },
						Age: Age.CHILD,
						Order: 13,
						LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the left side to get to the skulltula.",
						IsAtShortDistance: true
					}
				}
			},
			rightLockedRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Right Locked Room": {
						Name: "Skulltula in Right Locked Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 213, y: 80, floor: "F1" },
						Age: Age.CHILD,
						Order: 15,
						LongDescription: "From the entrance to the main room, go through the fake wall into the center room. Enter the door on the right side. Hug the right wall, moving counter-clockwise, over the invisible floor to get to the skulltula.",
						IsAtShortDistance: true
					}
				}
			},
			deadhandRoom: {
				Exits: {
					bombableHoleRoom: {
						Name: "bombableHoleRoom",
						RequiredItems: [Equipment.KOKIRI_SWORD],
						CustomRequirement: function(age) {
							// TODO potentially: add an item location for draining the water, as you can't vine clip after that
							return Settings.GlitchesToAllow.botwVineClip;
						}
					}
				},

				ItemLocations: {
					"Hidden Chest in Dead Hand Room": {
						Name: "Hidden Chest in Dead Hand Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 332, y: 243, floor: "F1" },
						Age: Age.CHILD,
						Order: 10,
						LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. Go back to the pit by the entrance of the main room. Climb through the crawlspace, then through the door to Dead Hand's room. The hidden chest is straight ahead of you."
					},
					"Dead Hand Chest": {
						Name: "Dead Hand Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 318, y: 243, floor: "F1" },
						Age: Age.CHILD,
						Order: 11,
						LongDescription: "First, drain the water by playing Zelda's Lullaby on the Triforce picture on the north side of the main room. Go back to the pit by the entrance of the main room. Climb through the crawlspace, then through the door to Dead Hand's room. Defeat Dead Hand to spawn the chest. To do so, let the hands grab you, then mash A and B to escape. Hit Dead Hand as he approaches you to damage him. If using sticks, it's recommended to jumpslash him to halve the number of sticks you need, just make sure his head is hittable first.",
						CustomRequirement: function(age) {
							let swordRequired = Settings.RandomizerSettings.deadHandNeedsSword;
							if (swordRequired) { return Equipment.KOKIRI_SWORD.playerHas; }
							return Data.hasSwordWeapon(age);
						}
					},
				}
			},
			bombableHoleRoom: {
				Exits: {},
				ItemLocations: {
					"Chest in Front Bombable Hole": {
						Name: "Chest in Front Bombable Hole",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 182, y: 192, floor: "F1" },
						Age: Age.CHILD,
						Order: 2,
						LongDescription: "Get to the main room. Bomb the rubble that's in front of you and slightly to the left to gain access to this chest."
					}
				}
			}
		}
	},

	"Training Grounds": {
		Abbreviation: "GTG",
		MapGroup: MapGroups.DUNGEONS,
		Regions: {
			main: {
				Exits: {
					hookshotNeeded: {
						Name: "hookshotNeeded",
						Age: Age.ADULT,
						RequiredAdultItems: [Items.HOOKSHOT]
					},

					lavaRoom: {
						Name: "lavaRoom",
						NeedsExplosives: true
					},
					
					mazeAfterOptionalDoor1: {
						Name: "mazeAfterOptionalDoor1",
						Map: "Training Grounds",
						LockedDoor: "Optional Locked Door 1"
					},

					mazeAfterDoor1: {
						Name: "mazeAfterDoor1",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 1 On Main Path"
					},

					//TODO: the trick here can actually be used EVERYWHERE there's a gate here to skip to every single key usage
					// AND to skip to the hookshot only area!
					mazeAfterDoor7: {
						Name: "mazeAfterDoor7",
						RequiredItems: [Items.BOMBCHU],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.gtgIceArrowsEarly && Data.hasShield(age);
						}
					},

					Exit: {
						OwExit: OwExits["Training Grounds"]["Exit"]
					}
				},

				ItemLocations: {
					"Entrance Room Left Chest": {
						Name: "Entrance Room Left Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 153, y: 233 },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
						CustomRequirement: function(age) { return Data.canShootEyeSwitch(age); }
					},
					"Entrance Room Right Chest": {
						Name: "Entrance Room Right Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 176, y: 233 },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "From the entrance, turn around. Shoot the eye that's near the ceiling to spawn this chest.",
						CustomRequirement: function(age) { return Data.canShootEyeSwitch(age); }
					},
					"Stalfos Chest in Sandy Room": {
						Name: "Stalfos Chest in Sandy Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 64, y: 225 },
						Age: Age.EITHER,
						Order: 3,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This is the room to the left of the entrance. I recommend going this way, first, as it only requires the hookshot to make it most of the way around the dungeon. Anyway, kill the stalfos in here within the time limit to get this chest.",
						NeedsSwordWeapon: true
					 },
					 "Chest in Dinalfos/Beamos Room": {
						Name: "Chest in Dinalfos/Beamos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 257, y: 244 },
						Age: Age.EITHER,
						Order: 17,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This is either the room to the right of the entrance, or the southern path from the big lava room. Bomb the beamos and kill the lizalfos to spawn this chest.",
						NeedsExplosives: true
					},
					 
					 // Locked Doors
					 "Locked Door 1 On Main Path": {
						Name: "Locked Door 1 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 154, y: 174 },
						Age: Age.EITHER,
						Order: 18,
						LongDescription: "This is door 1 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							return { min: 1, max: 3 };
						}
					},
					"Locked Door 2 On Main Path": {
						Name: "Locked Door 2 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor1"],
						MapInfo: { x: 135, y: 184 },
						Age: Age.EITHER,
						Order: 20,
						LongDescription: "This is door 2 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 2 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 4 };
						}
					},
					"Locked Door 3 On Main Path": {
						Name: "Locked Door 3 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor2"],
						MapInfo: { x: 150, y: 160 },
						Age: Age.EITHER,
						Order: 22,
						LongDescription: "This is door 3 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 3 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 5 };
						}
					},
					"Locked Door 4 On Main Path": {
						Name: "Locked Door 4 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor3"],
						MapInfo: { x: 130, y: 139 },
						Age: Age.EITHER,
						Order: 23,
						LongDescription: "This is door 4 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 4 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 6 };
						}
					},
					"Locked Door 5 On Main Path": {
						Name: "Locked Door 5 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor4"],
						MapInfo: { x: 163, y: 145 },
						Age: Age.EITHER,
						Order: 25,
						LongDescription: "This is door 5 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 5 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 7 };
						}
					},
					"Locked Door 6 On Main Path": {
						Name: "Locked Door 6 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor5"],
						MapInfo: { x: 178, y: 140 },
						Age: Age.EITHER,
						Order: 27,
						LongDescription: "This is door 6 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 6 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 8 };
						}
					},
					"Locked Door 7 On Main Path": {
						Name: "Locked Door 7 On Main Path",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterDoor6"],
						MapInfo: { x: 173, y: 156 },
						Age: Age.EITHER,
						Order: 28,
						LongDescription: "This is door 7 on the left path of the maze from the main entrance.",
						KeyRequirement: function(age) {
							let minValue = 7 + Data.gtgGetNumberOfOptionalKeysUsed();
							return { min: minValue, max: 9 };
						}
					},
					"Optional Locked Door 1": {
						Name: "Optional Locked Door 1",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 173, y: 174 },
						Age: Age.EITHER,
						Order: 30,
						LongDescription: "This is the first door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
						KeyRequirement: function(age) {
							return { min: 1, max: 9 };
						}
					},
					"Optional Locked Door 2": {
						Name: "Optional Locked Door 2",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["mazeAfterOptionalDoor1", "mazeDeadEnd"],
						MapInfo: { x: 197, y: 180 },
						Age: Age.EITHER,
						Order: 31,
						LongDescription: "This is the second door on the right path of the maze from the main entrance. It's recommended to avoid going this way if possible.",
						KeyRequirement: function(age) {
							return { min: 1, max: 9 };
						}
					},
				}
			},
			mazeAfterOptionalDoor1: {
				Exits: {
					mazeDeadEnd: {
						Name: "mazeAfterOptionalDoor2",
						Map: "Training Grounds",
						LockedDoor: "Optional Locked Door 2"
					}
				},
				ItemLocations: {}
			},
			hookshotNeeded: {
				Exits: {
					silverBlockRoom: {
						Name: "silverBlockRoom",
						RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
					},
					lavaRoom: {
						Name: "lavaRoom"
					}
				},

				ItemLocations: {
					"Wolfos Chest in Room by Silver Block": {
						Name: "Wolfos Chest in Room by Silver Block",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 90, y: 83 },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "This is the room either after the stalfos sandy room, or after the silver rupee room with the fire walls. Kill all the wolfos to spawn a chest."
					},
					"Eye Statue Room Bottom Chest": {
						Name: "Eye Statue Room Bottom Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 170, y: 91 },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "This is the room either after the wolfos room, or after the room with the hammerable pillars. If coming from the former, you need to use your hookshot to hook a target beyond a fake wall above the fake door. If coming from the latter, bash the pillars with your hammer, then shoot the eye switch. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to spawn the chest.",
						RequiredItems: [Items.FAIRY_BOW]
					},
					"Eye Statue Room Top Room Chest": {
						Name: "Eye Statue Room Top Room Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 165, y: 133 },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "This is the room either after the wolfos room, or after the room with the hammerable pillars. If coming from the former, you need to use your hookshot to hook a target beyond a fake wall above the fake door. If coming from the latter, bash the pillars with your hammer, then shoot the eye switch. In the eye statue room, get to the central platform - it will start spinning. Shoot each eye with an arrow to unlock a door on top. If you came from the wolfos room, jump in the lava to respawn on top to get to it. Otherwise, you must use scarecrow's song (the scarecrow is near the door) to get up.",
						RequiredItems: [Items.FAIRY_BOW]
					},
					"Chest in Room with Pillars": {
						Name: "Chest in Room with Pillars",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 256, y: 75 },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "This is either after the eye statue room, or after the big lava room. This is the chest that spawns after you kill all the enemies."
					},
					"Flaming Chest in Room with Pillars": {
						Name: "Flaming Chest in Room with Pillars",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 254, y: 90 },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "This is either after the eye statue room, or after the big lava room. Use your hammer on the pillars until you find a floor switch. Step on it to remove the flames from the chest. Be sure to get it before they come back!",
						RequiredItems: [Items.MEGATON_HAMMER]
					}
				}
			},
			lavaRoom: {
				Exits: {
					mazeDeadEnd: {
						Name: "mazeDeadEnd",
						CustomRequirement: function(age) {
							if (age === Age.CHILD) { return true; }
							return Data.canPlaySong(Songs.SONG_OF_TIME);
						}
					}
				},

				ItemLocations: {
					"Chest in Water Room": {
						Name: "Chest in Water Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 297, y: 160 },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "Navigate to the water room. See the Lava Room Key on Platform for an explanation on how to get there. First, collect all the silver rupees in the room. Most are straightfoward - you'll need your hover boots to get across some of the platforms. To get the one engulfed in flames, you must first hit the switch next to the raised platform. You can play the Song of Time there to spawn some helpful blocks as well. After you collect all the rupees, enter the door that opens up.<br/><br/>Once inside, play the Song of Time to remove the blocks. Use your iron boots to sink down and collect all the rupees. The hookshot helps a lot here, but technically isn't required. Once you're done, rise back up and collect the chest.",
						RequiredItems: [Equipment.IRON_BOOTS],
						RequiredSongs: [Songs.SONG_OF_TIME],
						CustomRequirement: function(age) {
							let canGetToWaterRoom = Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2;
							let canCompleteTask = Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
							return canGetToWaterRoom && canCompleteTask;
						}
					}
				}
			},
			silverBlockRoom: {
				Exits: {},
				ItemLocations: {
					"Silver Block Room Left Spawned Chest": {
						Name: "Silver Block Room Left Spawned Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 68, y: 28 },
						Age: Age.ADULT,
						Order: 5,
						LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest spawns after you kill the like-likes."
					},
					"Silver Block Room Right Spawned Chest": {
						Name: "Silver Block Room Right Spawned Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 78, y: 37 },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest spawns after you kill the like-likes."
					},
					"Silver Block Room Back Chest": {
						Name: "Silver Block Room Back Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 68, y: 17 },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest is in the back of the room."
					},
					"Silver Block Room Hidden Chest": {
						Name: "Silver Block Room Hidden Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 81, y: 22 },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "This is the room you get to after pushing the silver block in the room with the wolfos. If you haven't already, from the wolfos room, use your hookshot to hook a target beyond a fake wall above the fake door. Step on the switch to remove the iron bars on the door beyond the silver block. The chest is in the only hole without a visible chest in it."
					}
				}
			},
			mazeDeadEnd: {
				Exits: {
					mazeAfterOptionalDoor1: {
						Name: "mazeAfterOptionalDoor1",
						Map: "Training Grounds",
						LockedDoor: "Optional Locked Door 2"
					},

					lavaRoom: {
						Name: "lavaRoom"
					}
				},

				ItemLocations: {
					"Lava Room Key on Platform": {
						Name: "Lava Room Key on Platform",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 230, y: 164 },
						Age: Age.EITHER,
						Order: 13,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right, then take a right to get to the platform with the key. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform with the freestanding key.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the hookshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up."
					},
					"Maze Chest Close to Lava Room": {
						Name: "Maze Chest Close to Lava Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 179, y: 165 },
						Age: Age.EITHER,
						Order: 14,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the first chest you see. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you go straight from here, you'll reach the chest.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. The chest is straight ahead."
					},
					"Maze Chest at Dead End by Lava Room": {
						Name: "Maze Chest at Dead End by Lava Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 187, y: 154 },
						Age: Age.EITHER,
						Order: 15,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "There are a few ways to get here. From the entrance, enter the door in front of you. You can use two of your keys on the doors to the right. This is the second chest you see, at the maze's dead end. I don't really recommend doing this if you have the hookshot unless you also have all 9 keys.<br/><br/>If you go right from the entrance, clear out the room then proceed forward. Now, you're in the lava room. Navigate over to the left by the switch. Play the Song of Time then jump to the blocks to get to the platform. If you take the righthand path through the maze, you'll hit the chest at the dead end.<br/><br/>Finally, you can also make your way all the around the dungeon from the left to get to the lava room. You either need hover boots or the longshot to cross the room all the way, though. Again, get to the switch then play the Song of Time to get up. If you take the righthand path through the maze, you'll hit the chest at the dead end."
					}
				}
			},
			mazeAfterDoor1: {
				Exits: {
					mazeAfterDoor2: {
						Name: "mazeAfterDoor2",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 2 On Main Path"
					}
				},

				ItemLocations: {
					"Left Maze Path After Door 1": {
						Name: "Left Maze Path After Door 1",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 152, y: 192 },
						Age: Age.EITHER,
						Order: 19,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go through the first door to the left. Climb the wall to the right of the door you came in to get to the chest after the fake ceiling."
					}
				}
			},
			mazeAfterDoor2: {
				Exits: {
					mazeAfterDoor3: {
						Name: "mazeAfterDoor3",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 3 On Main Path"
					}
				},

				ItemLocations: {
					"Left Maze Path After Door 2": {
						Name: "Left Maze Path After Door 2",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 130, y: 163 },
						Age: Age.EITHER,
						Order: 21,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 2 doors. The chest is in this room."
					}
				}
			},
			mazeAfterDoor3: {
				Exits: {
					mazeAfterDoor4: {
						Name: "mazeAfterDoor4",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 4 On Main Path"
					}
				},
				ItemLocations: {}
			},
			mazeAfterDoor4: {
				Exits: {
					mazeAfterDoor5: {
						Name: "mazeAfterDoor5",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 5 On Main Path"
					}
				},

				ItemLocations: {
					"Left Maze Path After Door 4": {
						Name: "Left Maze Path After Door 4",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 142, y: 136 },
						Age: Age.EITHER,
						Order: 24,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 4 doors. The chest is in this room."
					}
				}
			},
			mazeAfterDoor5: {
				Exits: {
					mazeAfterDoor6: {
						Name: "mazeAfterDoor6",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 6 On Main Path"
					}
				},

				ItemLocations: {
					"Left Maze Path After Door 5": {
						Name: "Left Maze Path After Door 5",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 148, y: 137 },
						Age: Age.EITHER,
						Order: 26,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 5 doors. The chest is in this room."
					}
				}
			},
			mazeAfterDoor6: {
				Exits: {
					mazeAfterDoor7: {
						Name: "mazeAfterDoor7",
						Map: "Training Grounds",
						LockedDoor: "Locked Door 7 On Main Path"
					}
				},
				ItemLocations: {}
			},
			mazeAfterDoor7: {
				Exits: {},
				ItemLocations: {
					"Center Maze Chest": {
						Name: "Center Maze Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 164, y: 159 },
						Age: Age.EITHER,
						Order: 29,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "First, get to the maze from the entrance (NOT from the giant lava room). This is the door if you go straight. Go left and enter 7 doors. The chest is in this room."
					}
				}
			}
		}
	},

	"Ganon's Castle": {
		Abbreviation: "GANC",
		MapGroup: MapGroups.DUNGEONS,
		ExcludeFromShuffle: true,
		Floors: ["MN", "FST", "FIR", "WTR", "SHW", "SPT", "LIT"],
		StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					shadowTrialMiddle: {
						Name: "shadowTrialMiddle",
						CustomRequirement: function(age) {
							let canGetThereNormally = Items.FIRE_ARROW.playerHas && Items.FAIRY_BOW.playerHas && Equipment.MAGIC.playerHas;
							let canAvoidFireArrows = Items.HOOKSHOT.currentUpgrade === 2 && Equipment.HOVER_BOOTS.playerHas;
							return canGetThereNormally || canAvoidFireArrows;
						}
					},
					spiritTrialRoom2: {
						Name: "spiritTrialRoom2",
						CustomRequirement: function(age) {
							let canAvoidHookshot = Settings.GlitchesToAllow.ganonSpiritHookshotless && Data.hasShield(age);
							return Items.HOOKSHOT.playerHas || canAvoidHookshot;
						}
					},
					lightTrialRoom1: {
						Name: "lightTrialRoom1",
						CustomRequirement: function(age) {
							let canSuperslideIn = Settings.GlitchesToAllow.ganonLightTrialSuperslideSkip && 
								Items.BOMB.playerHas && 
								Data.hasShield(age);
							let canEssClipIn = Settings.GlitchesToAllow.ganonLightTrailEssSkip && Data.hasExplosives();
							return canSuperslideIn || canEssClipIn || Equipment.STRENGTH.currentUpgrade === 3;
						}
					}
				},

				ItemLocations: {
					"Left Scrub in Secret Room": {
						Name: "Left Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 234, y: 233, floor: "MN" },
						Age: Age.ADULT,
						Order: 1,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Middle Left Scrub in Secret Room": {
						Name: "Middle Left Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 242, y: 241, floor: "MN" },
						Age: Age.ADULT,
						Order: 2,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Middle Right Scrub in Secret Room": {
						Name: "Middle Right Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 254, y: 241, floor: "MN" },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Right Scrub in Secret Room": {
						Name: "Right Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 262, y: 233, floor: "MN" },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Forest Trial Chest": {
						Name: "Forest Trial Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 176, y: 233, floor: "FST" },
						Age: Age.ADULT,
						Order: 5,
						LongDescription: "Enter the forest trial. Kill the wolfos to spawn the chest."
					},
					"Water Trial Left Chest": {
						Name: "Water Trial Left Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 175, y: 215, floor: "WTR" },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "Enter the water trial. Look for the chest in the back left section of the room."
					},
					"Water Trial Right Chest": {
						Name: "Water Trial Right Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 213, y: 215, floor: "WTR" },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "Enter the water trial. Look for the chest in the back right section of the room."
					},
					"Shadow Trial Close Chest": {
						Name: "Shadow Trial Close Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 146, y: 226, floor: "SHW" },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "Enter the shadow trial. The chest is in front of you and a bit to the left on a little island. You can hookshot to it, hover boots to it (you'll need to roll mid-air to get the distance), shoot a fire arrow at a torch to spawn platforms, or play the Song of Time to get a platform you can jump to.",
						CustomRequirement: function(age) {
							let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
							return canUseFireArrows || Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.playerHas || Data.canPlaySong(Songs.SONG_OF_TIME);
						}
					},
					"Boss Key Chest in Center": {
						Name: "Boss Key Chest in Center",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 165, y: 95, floor: "MN" },
						Age: Age.ADULT,
						Order: 20,
						IsPostWalkCheck: true,
						LongDescription: "Complete all the trials. Now go up the center of the castle - the boss key will spawn after you clear the stalfos room.",
						CustomRequirement: function(age) {
							if (Settings.GlitchesToAllow.ganonTrialSkip) { return true; }
							let canUseLightArrows = Items.FAIRY_BOW.playerHas && Items.LIGHT_ARROW.playerHas && Equipment.MAGIC.playerHas;
							if (!canUseLightArrows) { return false; }
							
							let canDoForest = Data.canUseFireItem(age) && Equipment.HOVER_BOOTS.playerHas;
							let tunicCheck = Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
							let canDoFire = tunicCheck && Items.HOOKSHOT.playerHas && Equipment.STRENGTH.currentUpgrade === 3;
							let canDoWater = (Data.hasBottle() || Items.BLUE_FIRE.playerHas) && Items.MEGATON_HAMMER.playerHas;
							let canDoShadow = Data.canAccessMap(age, "Ganon's Castle", "shadowTrialMiddle") && Items.MEGATON_HAMMER.playerHas;
							let canDoSpirit = Data.canAccessMap(age, "Ganon's Castle", "spiritTrialRoom2") && Equipment.MIRROR_SHIELD.playerHas;
							let canDoLight = Data.canAccessMap(age, "Ganon's Castle", "lightTrialRoom3") && Items.HOOKSHOT.playerHas;
							
							return canDoForest && canDoFire && canDoWater && canDoShadow && canDoSpirit && canDoLight;
						}
					},
				}
			},
			shadowTrialMiddle: {
				Exits: {},
				ItemLocations: {
					"Shadow Trial Far Chest": {
						Name: "Shadow Trial Far Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 187, y: 103, floor: "SHW" },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "Enter the shadow trial. First, get to the platform passed the like-like platform. One way to do this is to shoot a fire arrow at the torch to the right. If you can't, then use your longshot to hook the torch. Now get on the very edge of the platform closest to the like-like. Longshot the like-like to get over there. Either use the torch, or use Hover Boots to get to the next platform. Down and to the right is a switch. Navigate to it. Once you press it, either hookshot to it or void out and come back for it.",
					}
				}
			},
			spiritTrialRoom2: {
				Exits: {},
				ItemLocations: {
					"Spirit Trial Chest After Hitting Switch": {
						Name: "Spirit Trial Chest After Hitting Switch",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 242, y: 184, floor: "SPT" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. Hit the switch closest to the barred door with a jumpslash or charged spin attack to spawn the chest."
					},
					"Hidden Spirit Trial Chest": {
						Name: "Hidden Spirit Trial Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 239, y: 120, floor: "SPT" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "Enter the spirit trial. Collect the rupees to advance to the next room. To your left, there is a switch. Line up with the switch and drop a Bombchu. It should navigate itself over to the switch and activate it. This will open the door - enter it. The hidden chest is now in front of you and a little bit to the right. Face the right wall when trying to open it.",
						RequiredItems: [Items.BOMBCHU]
					}
				}
			},
			lightTrialRoom1: {
				Exits: {
					lightTrialRoom2: {
						Name: "lightTrialRoom2",
						CustomRequirement: function(age) {
							return getKeyCount("Ganon's Castle") >= 1;
						}
					}
				},

				ItemLocations: {
					"Light Trial Left Lower Chest": {
						Name: "Light Trial Left Lower Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 167, y: 265, floor: "LIT" },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial."
					},
					"Light Trial Left Middle Chest": {
						Name: "Light Trial Left Middle Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 162, y: 251, floor: "LIT" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial."
					},
					"Light Trial Left Top Chest": {
						Name: "Light Trial Left Top Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 165, y: 235, floor: "LIT" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial."
					},
					"Light Trial Right Lower Chest": {
						Name: "Light Trial Right Lower Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 194, y: 265, floor: "LIT" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial."
					},
					"Light Trial Right Middle Chest": {
						Name: "Light Trial Right Middle Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 199, y: 251, floor: "LIT" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial."
					},
					"Light Trial Right Upper Chest": {
						Name: "Light Trial Right Upper Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 194, y: 235, floor: "LIT" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "This is one of the 6 chests that are visible when you first enter the light trial.",
					},
					"Light Trial Hidden Enemy Chest": {
						Name: "Light Trial Hidden Enemy Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 180, y: 251, floor: "LIT" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "Enter the light trial. Kill the invisible enemies (giant skulltula in the middle, several keese on the chests). This chest will spawn in the middle."
					}
				}
			},
			lightTrialRoom2: {
				Exits: {
					lightTrialRoom3: {
						Name: "lightTrialRoom3",
						CustomRequirement: function(age) {
							return getKeyCount("Ganon's Castle") >= 2;
						}
					}
				},

				ItemLocations: {
					"Light Trial Zelda's Lullaby Chest": {
						Name: "Light Trial Zelda's Lullaby Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 195, y: 196, floor: "LIT" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "Enter the light trial and advance to the next room. Play Zelda's Lullaby on the Triforce picture to spawn this chest.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					}
				}
			},
			lightTrialRoom3: {
				Exits: {},
				ItemLocations: {}
			}
		}
	}
};