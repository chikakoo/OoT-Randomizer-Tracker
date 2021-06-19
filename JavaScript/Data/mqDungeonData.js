/**
 * All the master quest dungeons
 * Set IsInUse to true to use this on a load
 */
let MQDungeons = {
	"Deku Tree": {
		Abbreviation: "DEKU",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
		Floors: [ "F3", "F2", "B1", "B2" ],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					compassRoom: {
						Name: "compassRoom",
						CustomRequirement: function(age) {
							if (!Data.canShootEyeSwitch(age)) { return false; }
							return Data.canUseFireItem(age) || 
								(age === Age.CHILD && Items.DEKU_STICK.playerHas) ||
								(age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					},

					waterRoom: {
						Name: "waterRoom",
						CustomRequirement: function(age) {
							if (!Data.canShootEyeSwitch(age)) { return false; }
							return Data.canUseFireItem(age) || (age === Age.CHILD && Items.DEKU_STICK.playerHas);
						}
					},

					upperBasement: {
						Name: "upperBasement",
						CustomRequirement: function(age) {
							return age === Age.ADULT || Settings.GlitchesToAllow.dekuB1Skip;
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
						LongDescription: "Climb to the second floor of the dungeon. The chest is by the vines leading to the third floor."
					},
					"Skulltula by Map Chest": {
						Name: "Skulltula by Map Chest",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 277, y: 87, floor: "F2" },
						Age: Age.EITHER,
						Order: 2,
						LongDescription: "This skulltula is in the crate by the map chest on the second floor. Roll into it to set it free.",
					},
					"Slingshot Chest on Third Floor": {
						Name: "Slingshot Chest on Third Floor",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 115, y: 199, floor: "F3" },
						Age: Age.EITHER,
						Order: 5,
						LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Defeat all the enemies in this room to spawn the chest.",
						NeedsDamagingWeapon: true
					},
					"Small Chest on Third Floor": {
						Name: "Small Chest on Third Floor",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 16, y: 147, floor: "F3" },
						Age: Age.EITHER,
						Order: 6,
						LongDescription: "Head to the third floor. Hit the switch to gain access to the side room.<br/><br/>Light the unlit torch in this room to spawn the chest. If using a bow, it's easier if you shoot it from the left side of the torch.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || 
								(age === Age.CHILD && Items.DEKU_STICK.playerHas) ||
								(age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					},
					"Basement Web Switch Chest": {
						Name: "Basement Web Switch Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 81, floor: "B1" },
						Age: Age.EITHER,
						Order: 7,
						LongDescription: "Head to the basement. The goal is to hit the switch to the right of the vines to spawn the chest. If you have Din's Fire, use it on the webs. Otherwise, hit the switch to the left of the vines to light the torch, then use your sticks to gain access to the switch.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || 
								(age === Age.CHILD && Items.DEKU_STICK.playerHas) ||
								(age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					}
				}
			},

			compassRoom: {
				Exits: {},
				ItemLocations: {
					"Compass Chest in Old Slingshot Room": {
						Name: "Compass Chest in Old Slingshot Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 111, y: 246, floor: "F2" },
						Age: Age.EITHER,
						Order: 3,
						LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Once in this next room, shoot the eye in the back to gain access to the next room. The chest is on the other side.",
					},
					"Skulltula in Old Slingshot Room": {
						Name: "Skulltula in Old Slingshot Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 161, y: 277, floor: "F2" },
						Age: Age.EITHER,
						Order: 4,
						LongDescription: "Burn the spider web on the second floor. If you have Din's Fire, you can use that. Otherwise, hit the switch on the third floor to light the torches, then use a Deku Stick to do so.<br/><br/>Head to the other side of the room. The room up the vines to the left is blocked by rocks. Use a bombchu to gain access. The skulltula is up on the wall.",
						RequiredItems: [Items.BOMBCHU],
						IsAtShortDistance: true
					}
				}
			},

			waterRoom: {
				Exits: {
					upperBasement: {
						Name: "upperBasement"
					}
				},

				ItemLocations: {
					"Chest by Water Room Door": {
						Name: "Chest by Water Room Door",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 266, y: 225, floor: "B1" },
						Age: Age.EITHER,
						Order: 8,
						LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room. The chest will be to your left."
					},
					"Chest via Song of Time Block": {
						Name: "Chest via Song of Time Block",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 181, y: 225, floor: "B1" },
						Age: Age.EITHER,
						Order: 9,
						LongDescription: "From the basement, head to the door to the right of the vines. You'll need to either use Din's Fire or run a lit Deku Stick into this room. Light the torches by the other door to gain access to the water room.<br/><br/>Make your way to the other side of the water room. You'll need to roll or crouch with your shield under the spikey pole. Play the Song of Time by the block to reveal the chest.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				}
			},

			upperBasement: {
				Exits: {
					bossRoom: {
						CustomRequirement: function(age) {
							let canUseStick = age === Age.CHILD && Items.DEKU_STICK.playerHas;
							let canStunScrubs = (age === Age.CHILD && Equipment.DEKU_SHIELD.playerHas) || (age === Age.ADULT && Equipment.HYLIAN_SHIELD.playerHas)
							return (Data.canUseFireItem(age) || canUseStick) && canStunScrubs;
						}
					}
				},

				ItemLocations: {
					"Skulltula in Grave Room": {
						Name: "Skulltula in Grave Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 93, y: 113, floor: "B1" },
						Age: Age.EITHER,
						Order: 10,
						LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Note that you can also use Din's Fire. Defeat all the enemies in this room to continue on.<br/><br/>In this next room, play the Song of Time near the torches to spawn a staircase of blocks. Climb these and use your boomerang or hookshot to get the skulltula on the ceiling.",
						RequiredSongs: [Songs.SONG_OF_TIME],
						IsAtShortDistance: true
					},
					"Skulltula by Grave Room": {
						Name: "Skulltula by Grave Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 17, y: 48, floor: "B1" },
						Age: Age.EITHER,
						Order: 11,
						LongDescription: "Head to the water room. Step on the blue switch, then quickly light a stick on fire. Ride the platform across - hold R to use your shield or roll so you don't get hit by the spikes. Light the torches to open the next room. Defeat all the enemies in this room to continue on.<br/><br/>Step on the blue switch in the middle of the torches. Quickly light a stick, then burn the web blocking the left door. You can also use Din's Fire. The skulltula is in this room.",
						IsAtShortDistance: true,
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age === Age.CHILD && Items.DEKU_STICK.playerHas);
						}
					},
					"Scrub in Basement": {
						Name: "Scrub in Basement",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 274, y: 143, floor: "B1" },
						Age: Age.EITHER,
						Order: 12,
						LongDescription: "In the grave room, Step on the blue switch in the middle of the torches. Quickly light a stick, then burn the web blocking the right path. You can also use Din's Fire. Enter the crawlspace to find your way back to the upper level of the first basement room.<br/><br/>Once here, look near the spider web blocking the way to the lowest level for the business scrub.",
					},
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 257, y: 275, floor: "B2" },
						Age: Age.CHILD,
						Order: 13,
						LongDescription: "Note that in Master Quest, the scrub sequence is 1, 3, 2.<br/><br/>To defeat Gohma, you must first stun her when her eye is red. You can use the slingshot or deku nuts to do this - nuts don't stun her for nearly as long, though. Once she's down, attack her. The quickest kill is with three deku stick jumpslashes (or one then two crouch stabs).",
						CustomRequirement: function(age) {
							return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 270, y: 286, floor: "B2" },
						Age: Age.CHILD,
						Order: 14,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						CustomRequirement: function(age) {
							return Data.hasSwordWeapon(age) && (Items.DEKU_NUT.playerHas || (age === Age.CHILD && Items.FAIRY_SLINGSHOT.playerHas));
						}
					}
				}
			}
		}
    },

	"Dodongo's Cavern": {
		Abbreviation: "DONG",
		MapGroup: MapGroups.DUNGEONS,
		IsMasterQuest: true,
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
						LongDescription: "Use an explosive or the hammer to break the first wall. This is used to determine whether Adult opened the door for Child.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},
				}
			},

			mainRoom: {
				Exits: {
					staircaseTop: {
						Name: "staircaseTop",
						CustomRequirement: function(age) {
							if (Data.hasExplosives()) { return true; } // Going around the top
            	
							let canLowerWithBow = age === Age.ADULT && Items.FAIRY_BOW.playerHas;
							return canLowerWithBow || Data.hasExplosivesOrStrength();
						}
					},

					torchPuzzleRoom: {
						Name: "torchPuzzleRoom",
						NeedsExplosives: true // Going around the top
					},

					topOfTorchPuzzleRoom: {
						Name: "topOfTorchPuzzleRoom",
						NeedsExplosives: true // Going around the top
					},

					eastRoom: { 
						Name: "eastRoom",
						CustomRequirement: function(age) { // Bring a bomb flower is handled by the upperLizalfosRoom
                			return Data.canUseHammer(age) || Data.hasExplosives();
						}
					},

					mainRoomLedge: {
						Name: "mainRoomLedge",
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
            	
							let canRecoil = Settings.GlitchesToAllow.dodongoSwitchEarly && Data.hasExplosivesOrStrength() && Data.hasSwordWeapon(age);
							return Data.canGroundJumpWithBomb(age) || canRecoil;
						}
					},

					inDodongoHead: {
						Name: "inDodongoHead",
						NeedsExplosives: true
					}
				},

				ItemLocations: {
					"Gossip Stone in Main Room": {
						Name: "Gossip Stone in Main Room",
						ItemGroup: ItemGroups.GOSSIP_STONE,
						MapInfo: { x: 94, y: 198, floor: "F1" },
						UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
						Age: Age.EITHER,
						Order: -1,
						LongDescription: "This stone is behind the breakable wall in the western area of the main room.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},
					"Left Business Scrub in Main Room": {
						Name: "Left Business Scrub in Main Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 101, y: 225, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						LongDescription: "This scrub is on the ledge to the left when you first enter the main room."
					},
					"Right Business Scrub in Main Room": {
						Name: "Right Business Scrub in Main Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 98, y: 219, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						LongDescription: "This scrub is on the ledge to the left when you first enter the main room."
					},
					"Chest in Main Room": {
						Name: "Chest in Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 168, y: 180, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						LongDescription: "This chest is in the back right corner of the main room. Bomb or hammer the wall blocking it.",
						CustomRequirement: function(age) {
							return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
						}
					},
					"Skullula by Stair Room": {
						Name: "Skullula by Stair Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 46, y: 259, floor: "F1" }, //TODO: confirm that it's really on this part of the room
						Age: Age.EITHER,
						Order: 7,
						LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Blow up the fake wall by the stairs. Play the song of time in the next room several times to navigate the maze to the skulltula.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				}
			},

			mainRoomLedge: {
				Exits: {
					poeRoom: {
						Name: "poeRoom"
					}
				},

				ItemLocations: {
					"Chest on Ledge in Main Room": {
						Name: "Chest on Ledge in Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 182, y: 200, floor: "F1" },
						Age: Age.EITHER,
						Order: 6,
						LongDescription: "Nagivate through the Poe room to get to this chest on the ledge on the right side of the main room. This may require you to go through most of the dungeon first."
					}
				}
			},

			staircaseTop: {
				Exits: {
					torchPuzzleRoom: {
						Name: "torchPuzzleRoom"
					}
				},

				ItemLocations: {
					"Scrub in Stair Room": {
						Name: "Scrub in Stair Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 32, y: 94, floor: "F2" },
						Age: Age.EITHER,
						Order: 8,
						LongDescription: "From the main room, blow up the back right rock. Ride up the elevator to the upper floor. Cross the bridge to hit the switch. Enter the door that is unlocked.<br/><br/>Lower the stairs like normal. Climb the gray block to reach the scrub at the top."
					},
					"Chest in Small Dodongo Room": {
						Name: "Chest in Small Dodongo Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 29, y: 200, floor: "F2" },
						Age: Age.EITHER,
						Order: 9,
						LongDescription: "Collect all the silver rupees in the stair room to get here. Defeat all the enemies to spawn the chest."
					}
				}
			},

			torchPuzzleRoom: {
				Exits: {
					topOfTorchPuzzleRoom: {
						Name: "topOfTorchPuzzleRoom",
						CustomRequirement: function(age) {
							let adultBombChestEarly = age === Age.ADULT && Settings.GlitchesToAllow.dodongoAdultJumpToBombChest;
							let canMegaflipThere = Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
							return adultBombChestEarly || canMegaflipThere;
						}
					},

					upperLizalfosRoom: {
						Name: "upperLizalfosRoom",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age == Age.CHILD && Items.DEKU_STICK.playerHas);
						}
					}
				},

				ItemLocations: {
					"Chest in Room by Torch Puzzle": {
						Name: "Chest in Room by Torch Puzzle",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 202, y: 109, floor: "F2" },
						Age: Age.EITHER,
						Order: 10,
						LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. Kill all the enemies to spawn the chest.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age == Age.CHILD && Items.DEKU_STICK.playerHas)
						}
					},
					"Skulltula in Room by Torch Puzzle": {
						Name: "Skulltula in Room by Torch Puzzle",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 210, y: 108, floor: "F2" },
						Age: Age.EITHER,
						Order: 11,
						LongDescription: "Light all the torches in the torch puzzle room. Either use a fire item, or push the boxes and use a deku stick. Navigate to the now open door at the north of room. The skulltula is in one of the right boxes.",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age == Age.CHILD && Items.DEKU_STICK.playerHas)
						}
					}
				}
			},

			topOfTorchPuzzleRoom: {
				Exits: {
					upperLizalfosRoom: {
						Name: "upperLizalfosRoom"
					}
				},

				ItemLocations: {
					"Chest on Top of Torch Puzzle Room": {
						Name: "Chest on Top of Torch Puzzle Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 187, y: 176, floor: "F2" },
						Age: Age.EITHER,
						Order: 13,
						LongDescription: "Either bomb the rocks at the top of the main room, or proceed through the upper lizalfos room to get to the top of the torch puzzle room. The chest is on one of the ledges you can get to by jumping there."
					}
				}
			},

			upperLizalfosRoom: {
				Exits: {
					topOfTorchPuzzleRoom: {
						Name: "topOfTorchPuzzleRoom"
					},

					eastRoom: {
						Name: "eastRoom",
						RequiredItems: [Equipment.STRENGTH]
					}
				},

				ItemLocations: {
					"Skulltula in Top Lizalfos Room": {
						Name: "Skulltula in Top Lizalfos Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 295, y: 122, floor: "F2" },
						Age: Age.EITHER,
						Order: 12,
						LongDescription: "After completing the torch puzzle, burn the web in the next room. Do the box pushing puzzle in the next room to get to the lizalfos room. Alternatively, you can blow up the rocks at the top of the main room and navigate around backwards to get here.<br/><br/>Bomb the rocks in the back of this room to get to the skulltula.",
						NeedToBlastOrSmash: true
					}
				}
			},

			eastRoom: {
				Exits: {
					poeRoom: {
						Name: "poeRoom",
						RequiredChildItems: [Items.FAIRY_SLINGSHOT],
						RequiredAdultItems: [Items.FAIRY_BOW]
					}
				},

				ItemLocations: {
					"Scrub in East Room": {
						Name: "Scrub in East Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 242, y: 264, floor: "F1" },
						Age: Age.EITHER,
						Order: 4,
						LongDescription: "Blow up the east room door somehow. You may need to run a bomb flower from the very top floor if you have no other way.<br/><br/>Once in the east room, blow up the fake wall on the right. The scrub is inside."
					}
				}
			},

			poeRoom: {
				Exits: {
					mainRoomLedge: {
						Name: "mainRoomLedge",
						NeedsExplosivesOrBombFlower: true
					}
				},

				ItemLocations: {
					"Skulltula Near Poe Room": {
						Name: "Skulltula Near Poe Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 230, y: 79, floor: "F1" },
						Age: Age.EITHER,
						Order: 5,
						LongDescription: "In the Poe room, use an explosive on one of the lines of bomb flowers to unbar the door to this room. The skulltula is high up in the back left corner.",
						IsAtShortDistance: true,
						NeedsExplosivesOrBombFlower: true
					}
				}
			},

			inDodongoHead: {
				Exits: {
					roomBeforeBoss: {
						Name: "roomBeforeBoss",
						CustomRequirement: function(age) {
							// Adult can just jump up; Child needs to blow up a bombflower wall
							return age === Age.ADULT || Data.hasExplosives();
						}
					}
				},

				ItemLocations: {
					"Chest in Back Room": {
						Name: "Chest in Back Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 196, y: 19, floor: "F1" },
						Age: Age.EITHER,
						Order: 14,
						LongDescription: "Once in the Dodongo head, navigate clockwise around the rooms. Enter the door near all the Armos statues. In this room, the chest is under the gravestone."
					},
					"Skulltula in Back Room": {
						Name: "Skulltula in Back Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 196, y: 59, floor: "F1" },
						Age: Age.EITHER,
						Order: 15,
						LongDescription: "After dealing with all the Armos statues in the Dodongo head, climb up the stairs. Jump to the ledge to get to the skulltula on top."
					}
				}
			},

			roomBeforeBoss: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						NeedsExplosivesOrBombFlower: true
					}
				},

				ItemLocations: {
					"Chest by King Dodongo": {
						Name: "Chest by King Dodongo",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 91, y: 107, floor: "F1" },
						Age: Age.EITHER,
						Order: 16,
						LongDescription: "After navigating around the area inside the Dodongo head, pull back the grave to reveal a switch. Enter the door that unbars. The chest is in the back of this room."
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
						Order: 17,
						LongDescription: "You must bomb the suspicious floor in the room you enter after pushing the block on the switch to get to King Dodongo. To defeat him, you must throw a bomb or bomb flower into his mouth, and then attack him afterward. Note that you should follow him as he rolls so that he gets up faster. If using bomb flowers, try to get them a little bit early, as you need time to run back to him before he shoots his fireball. The quickest kill is with 2 deku stick/master sword jumpslashes, or 1 biggoron's sword jumpslash.",
						NeedsExplosivesOrBombFlower: true
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 104, y: 100, floor: "F1" },
						Age: Age.EITHER,
						Order: 18,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						NeedsExplosivesOrBombFlower: true
					}
				}
			}
		}
	},

	"Jabu Jabu's Belly": {
		Abbreviation: "JABU",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
		Floors: ["F2", "F1", "B1"],
		StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					//TODO: add adult here - need a non-item location for opening the door
					afterFirstRoom: {
						Name: "afterFirstRoom",
						Age: Age.CHILD,
						RequiredItems: [Items.FAIRY_SLINGSHOT]
					},
					Exit: {
						OwExit: OwExits["Jabu Jabu's Belly"]["Exit"]
					}
				},

				ItemLocations: {
					"Map Chest": {
						Name: "Map Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 173, y: 269, floor: "F1" },
						Age: Age.EITHER,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						Order: 1,
						LongDescription: "In the first room, destroy the yellow rock and hit the switch underneath to spawn the chest.",
						NeedToBlastOrSmash: true
					},
					"Chest in Main Room": {
						Name: "Chest in Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 181, y: 279, floor: "F1" },
						Age: Age.CHILD,
						Order: 2,
						LongDescription: "In the first room, shoot the right cow with your slingshot to spawn the chest.",
						RequiredItems: [Items.FAIRY_SLINGSHOT]
					}
				}
			},

			afterFirstRoom: {
				Exits: {
					northernRooms: {
						Name: "northernRooms",
						RequiredItems: [Items.BOOMERANG],
						NeedsExplosives: true
					}
				},

				ItemLocations: {
					"Chest in Elevator Room": {
						Name: "Chest in Elevator Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 209, y: 221, floor: "B1" },
						Age: Age.CHILD,
						Order: 3,
						LongDescription: "After going through the first door, drop down to the bottom. The chest is by the door."
					},
					"Chest in Hidden Water Room": {
						Name: "Chest in Hidden Water Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 116, y: 229, floor: "B1" },
						Age: Age.CHILD,
						Order: 4,
						LongDescription: "Drop down in the main elevator room. Dive underwater opposite the door to get to the hidden room. Shoot the cow in the water behind you after you climb up to spawn the chest."
					},
					"East Chest in Big Room": {
						Name: "East Chest in Big Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 205, y: 54, floor: "B1" },
						Age: Age.CHILD,
						Order: 5,
						LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the right cow on the wall to spawn this chest."
					},
					"West Chest in Big Room": {
						Name: "West Chest in Big Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 175, y: 108, floor: "B1" },
						Age: Age.CHILD,
						Order: 6,
						LongDescription: "After pressing the switch in the hidden underwater room, take the elevator back up and fall down the hole that Ruto normally falls down. Shoot the left cow on the wall to spawn this chest."
					},
					"Free Chest in Path to Elevator Room": {
						Name: "Free Chest in Path to Elevator Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 318, y: 134, floor: "B1" },
						Age: Age.CHILD,
						Order: 7,
						LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. There is an easily accessible chest in here."
					},
					"Enemy Chest in Path to Elevator Room": {
						Name: "Enemy Chest in Path to Elevator Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 258, y: 152, floor: "B1" },
						Age: Age.CHILD,
						Order: 8,
						LongDescription: "Solve the puzzle in the room below the holes to enter the path leading to the elevator room. Defeat all the enemies in the water to spawn the chest."
					},
					"Skulltula Under Song of Time Block": {
						Name: "Skulltula Under Song of Time Block",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 297, y: 147, floor: "B1" },
						Age: Age.CHILD,
						Order: 9,
						LongDescription: "In the path leading to the elevator room, there's a skulltula under the Song of Time block. Play the song to move the block.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				}
			},

			northernRooms: {
				Exits: {
					afterWebBurned: {
						Name: "afterWebBurned",
						CustomRequirement: function(age) {
							return Items.DEKU_STICK.playerHas || Data.canUseFireItem(age);
						}
					}
				},

				ItemLocations: {
					"Chest in Like Like Room": {
						Name: "Chest in Like Like Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 195, y: 12, floor: "F1" },
						Age: Age.CHILD,
						Order: 10,
						LongDescription: "In the room beyond the room with holes, enter the next room and go to the far right door. Shoot the cows, then kill the Like Likes that fall to spawn the chest.",
						Region: "northernRooms",
						RequiredItems: [Items.BOOMERANG]
					}
				}
			},

			afterWebBurned: {
				Exits: {
					afterBigOcto: {
						Name: "afterBigOcto",
						NeedsSwordWeapon: true,
						NeedToBlastOrSmash: true
					}
				},

				ItemLocations: {
					"Skulltula on Ceiling": {
						Name: "Skulltula on Ceiling",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 157, y: 14, floor: "F1" },
						Age: Age.CHILD,
						Order: 11,
						LongDescription: "Using a deku stick to bring a fire from the Like Like room, or a fire item, burn the web to get access to the far west room. After killing the tentacle, head to the far east room and kill that tentacle. Now leave and enter the room to your left. Use the switch and a bomb, or a bombchu to blow up the rock on the ceiling to reveal the skulltula."
					},
					"Skulltula Behind Web": {
						Name: "Skulltula Behind Web",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 29, y: 191, floor: "B1" },
						Age: Age.CHILD,
						Order: 12,
						LongDescription: "After destroying all the tentacles, drop down into the big room and enter the door by the vines. The skulltula is in the back of the room. Use Din's Fire to burn the web.",
						RequiredItems: [Items.DINS_FIRE, Equipment.MAGIC]
					},
				}
			},

			afterBigOcto: {
				Exits: {
					bossRoom: {
						Name: "bossRoom"
					}
				},

				ItemLocations: {
					"Cow After Big Octo": {
						Name: "Cow After Big Octo",
						ItemGroup: ItemGroups.COW,
						MapInfo: { x: 108, y: 251, floor: "F2" },
						Age: Age.CHILD,
						Order: 13,
						LongDescription: "After killing Big Octo, ride the elevator up, shoot the cow on the wall, and proceed through the door. The cow is on the ground in the room with the two electric sponges."
					},
					"Chest After Big Octo": {
						Name: "Chest After Big Octo",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 192, y: 188, floor: "F1" },
						Age: Age.CHILD,
						Order: 14,
						LongDescription: "After killing the Big Octo and riding the platform down, you gain access to this chest. Shoot the cow near where the platform landed if you don't see it."
					},
					"Chest in Room Before Boss": {
						Name: "Chest in Room Before Boss",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 234, y: 175, floor: "F1" },
						Age: Age.CHILD,
						Order: 15,
						LongDescription: "Shoot the left cow in this room to spawn the chest."
					},
					"Skulltula in Room Before Boss": {
						Name: "Skulltula in Room Before Boss",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 244, y: 189, floor: "F1" },
						Age: Age.CHILD,
						Order: 16,
						LongDescription: "Climb up the vines and use your boomerang to get this skulltula."
					},
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 242, y: 121, floor: "F1" },
						Age: Age.CHILD,
						Order: 17,
						LongDescription: "You need the Boomerang and either the Kokiri Sword, or at least 3 Deku Sticks to defeat Barinade. First, dislodge it from the ceiling using the Boomerang on it a few times (Z-targetting is your friend). Once it's down, throw your boomerang at it directly. When it's stunned, kill the biris. Deku Nuts are one fast way to do this if you have some. There's two rounds of this. Once all the biris are dead, throw your boomerang at it again to stun it. Now you can attack it. Repeat until it's dead. This will take 2 Deku Stick jumpslashes and 1 normal Deku Stick hit (or 5 Kokiri Sword jumpslashes).",
						NeedsSwordWeapon: true
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 246, y: 125, floor: "F1" },
						Age: Age.CHILD,
						Order: 18,
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
        IsMasterQuest: true,
        Floors: ["F2", "F1", "B1"],
        StartingFloorIndex: 1,
		Regions: {
			main: {
				Exits: {
					afterFirstHallway: {
						Name: "afterFirstHallway",
						NeedsDamagingItem: true,
						LockedDoor: "Locked Door to Lobby",
						Map: "Forest Temple"
					},
					Exit: {
						OwExit: OwExits["Forest Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Chest in Main Room": {
						Name: "Chest in Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 188, y: 251, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Climb the vines (it's easier to climb from the left side of the tree) and navigate across the trees to hit the switch to spawn the chest.",
						CustomRequirement: function(age) {
							return Data.hasDamagingItem(age) || Items.DEKU_NUT.playerHas;
						}
					},
					"Skulltula in First Hallway": {
						Name: "Skulltula in First Hallway",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 163, y: 193, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						IsAtShortDistance: true,
						LongDescription: "The skulltula is above the door at the end of the first hallway."
					},

					// Locked doors
					"Locked Door to Lobby": {
						Name: "Locked Door to Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 169, y: 189, floor: "F1" },
						Age: Age.EITHER,
						Order: 2.1,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This is the door at the end of the first hallway.",
						KeyRequirement: function(age) {
							return { min: 1, max: 1 };
						}
					},

					"Locked Door by Twisted Corridor": {
						Name: "Locked Door by Twisted Corridor",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["afterFirstHallway"],
						MapInfo: { x: 42, y: 198, floor: "F2" },
						Age: Age.ADULT,
						Order: 9.1,
						LongDescription: "This is the door that's after the block puzzle by the bubbles.",
						KeyRequirement: function(age) {
							return { min: 2, max: 2 };
						}
					},

					"Locked Door After Twisted Hallway": {
						Name: "Locked Door After Twisted Hallway",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["twistedHallway"],
						MapInfo: { x: 80, y: 57, floor: "F2" },
						Age: Age.ADULT,
						Order: 11.1,
						LongDescription: "This is the door that's in the boss key room when the boss key chest is sideways.",
						KeyRequirement: function(age) {
							return { min: 3, max: 3 };
						}
					},

					"Locked Door in Blue Poe Room": {
						Name: "Locked Door in Blue Poe Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["poeRooms"],
						MapInfo: { x: 282, y: 54, floor: "F2" },
						Age: Age.ADULT,
						Order: 14.1,
						LongDescription: "This is the door that's in the blue poe room.",
						KeyRequirement: function(age) {
							return { min: 4, max: 4 };
						}
					},

					"Locked Door in Green Bubble Hallway": {
						Name: "Locked Door in Green Bubble Hallway",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["twistedCooridor2"],
						MapInfo: { x: 319, y: 154, floor: "F2" },
						Age: Age.ADULT,
						Order: 14.2,
						LongDescription: "This is the door that's after the green bubbles, leading to the frozen eye switch.",
						KeyRequirement: function(age) {
							return { min: 5, max: 5 };
						}
					},

					"Locked Door in Falling Ceiling Room": {
						Name: "Locked Door in Falling Ceiling Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["fallingCeilingRoom"],
						MapInfo: { x: 318, y: 132, floor: "F1" },
						Age: Age.ADULT,
						Order: 16.1,
						LongDescription: "This is the door that's at the end of the falling ceiling room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 6 };
						}
					}
				}
			},

			afterFirstHallway: {
				Exits: {
					roomNorthOfLobby: {
						Name: "roomNorthOfLobby",
						CustomRequirement: function(age) {
							return age === Age.CHILD || Data.canPlaySong(Songs.SONG_OF_TIME);
						}
					}, 

					twistedHallway: {
						Name: "twistedHallway",
						Age: Age.ADULT,
						LockedDoor: "Locked Door by Twisted Corridor",
						Map: "Forest Temple",
						CustomRequirement: function(age) {
							//TODO - is block skip possible still?
							// If you can't push blocks, you MUST do the block skip
							let hasStrength = Equipment.STRENGTH.playerHas;
							if (!hasStrength && !Settings.GlitchesToAllow.forestBlockSkip) { return false; } 
							
							// Need to either push or skip the blocks
							let canBlockSkip = Data.hasShield(age) && Items.BOMB.playerHas && Equipment.HOVER_BOOTS.playerHas;
							return hasStrength || canBlockSkip;
						}
					},

					upperOutside: {
						Name: "upperOutside",
						Age: Age.ADULT,
						RequiredItems: [Items.BOMB, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestJumpToTop;
						}
					},

					outsideEast: {
						Name: "outsideEast",
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age);
						}
					},

					//TOOD: verify this one
					outsideWest: {
						Name: "outsideWest",
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age);
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
					"Skulltula in Block Room": {
						Name: "Skulltula in Block Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 66, y: 171, floor: "F1" },
						Age: Age.EITHER,
						Order: 9,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Proceed through the main room's western hallway. The skulltula is to the left on the ground level."
					}
				}
			},

			roomNorthOfLobby: {
				Exits: {},
				ItemLocations: {
					"Chest North of Main Room": {
						Name: "Chest North of Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 170, y: 19, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Proceed straight ahead in the main room. After the hallway, kill the two wolfos to spawn the chest.<br/><br/>If you don't have the song of time, it's possible to get here from the above room. This is the room after the red poe room - drop down before killing the first Stalfos.",
						NeedsSwordWeapon: true
					}
				}
			},

			twistedHallway: {
				Exits: {
					upperOutside: {
						Name: "upperOutside"
					},

					poeRooms: {
						Name: "poeRooms",
						LockedDoor: "Locked Door After Twisted Hallway",
						Map: "Forest Temple"
					}
				},

				ItemLocations: {
					"Boss Key": {
						Name: "Boss Key",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 66, y: 45, floor: "F2" },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "After the block puzzle room and the untwisted hallway, jump down to get the boss key chest. Be wary of the Wallmaster!"
					}
				}
			},

			upperOutside: {
				Exits: {
					outsideWest: {
						Name: "outsideWest"
					}
				},

				ItemLocations: {
					"Chest in Redead Room": {
						Name: "Chest in Redead Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 29, y: 100, floor: "F1" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "Fall down the hole in the boss key room. Kill the Floormaster and proceed through the door. Take the first door in one of the small hallways to your right. Kill the redead to spawn the chest."
					}
				}
			},

			outsideWest: {
				Exits: {
					outsideEast: { // Via the well - eye switch doesn't matter because the other way in covers that
						Name: "outsideEast",
						Age: Age.ADULT,
						RequiredItems: [Equipment.IRON_BOOTS]
					},

					outsideEastPlatform: { // Burn the web, to go through to the top platform
						Name: "outsideEastPlatform",
						Age: Age.ADULT,
						RequiredItems: [Equipment.MAGIC, Equipment.HOVER_BOOTS, Items.FAIRY_BOW, Items.FIRE_ARROW],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestLedgeWithHovers;
						}
					},

					well: {
						Name: "well"
					}
				},

				ItemLocations: {
					"Skulltula in Outside West Room": {
						Name: "Skulltula in Outside West Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 81, y: 124, floor: "F1" },
						Age: Age.EITHER,
						Order: 8,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "Located on top of the platform near the well."
					}
				}
			}, 

			outsideEast: {
				Exits: {
					// Excluding east to west because it would require you to have gone through west anyway
					// OR to already have the means to get there from the lobby

					outsideEastPlatform: {
						Name: "outsideEastPlatform",
						Age: Age.ADULT,
						RequiredItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
						RequiredSongs: [Songs.SONG_OF_TIME],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.forestLedgeWithHovers;
						}
					},

					well: {
						Name: "well"
					}
				},

				ItemLocations: {
					"Skulltula Above Outside East Door": {
						Name: "Skulltula Above Outside East Door",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 226, y: 98, floor: "F1" },
						Age: Age.EITHER,
						Order: 4,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						IsAtShortDistance: true,
						LongDescription: "The skulltula is above the doorframe leading to this room. Get it with your boomerang or hookshot."
					},
					"Chest in Outside East Room": {
						Name: "Chest in Outside East Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 224, y: 53, floor: "F1" },
						Age: Age.ADULT,
						Order: 5,
						RequiredItems: [Items.HOOKSHOT],
						RequiredSongs: [Songs.SONG_OF_TIME],
						LongDescription: "Hookshot up the doorframe leading to this room. Repeatedly play the Song of Time and jump to the end of the blocks it spawns until you can get to the balcony with the chest."
					}
				}
			},

			outsideEastPlatform: {
				Exits: {
					fallingCeilingRoom: {
						Name: "fallingCeilingRoom",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				},

				ItemLocations: {
					"Chest on Outside Platform": {
						Name: "Chest on Outside Platform",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 268, y: 73, floor: "F1" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "Hit the left switch deep in the checkerbaord room. Now backtrack and take the door to the right of where you entered the room (NOT the locked door). Drop down to get the chest. If you don't have the Song of Time, you'll have to navigate all the way around to get back. Otherwise, play it to make a platform back up."
					}
				}
			},

			well: { // Just used as its own location, but not to travel between east and west apparently
				Exits: {},
				ItemLocations: {
					"Chest in Well": {
						Name: "Chest in Well",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 242, y: 46, floor: "B1" },
						Age: Age.EITHER,
						Order: 6,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This chest is in the well. If you can't drain the water with the eye switch, you can hookshot the chest and spam the button to open it.",
						CustomRequirement: function(age) {
							if (Data.canShootEyeSwitch(age)) { return true; }
							return age === Age.ADULT && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas
						}
					},
					"Skulltula in Well": {
						Name: "Skulltula in Well",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 114, y: 34, floor: "B1" },
						Age: Age.EITHER,
						Order: 7,
						UseChildAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances },
						LongDescription: "This skulltula is on one of the grates in the water of the well. If you can't shoot the eye switch to drain the water, you can still get the skulltula with iron boots and the hookshot.",
						CustomRequirement: function(age) {
							if (Data.canShootEyeSwitch(age)) { return true; }
							return age === Age.ADULT && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas
						}
					}
				}
			},

			poeRooms: {
				Exits: {
					roomNorthOfLobby: {
						Name: "roomNorthOfLobby",
						CustomRequirement: function(age) {
							// You can jump down the hole in this room to get this chest
							// This cannot be done if you've already cleared the room, though
							return !Data.itemLocationObtained("Forest Temple", "poeRooms", "Chest in Stalfos Room");
						}
					}, 

					twistedCooridor2: {
						Name: "twistedCooridor2",
						LockedDoor: "Locked Door in Blue Poe Room",
						Map: "Forest Temple"
					}
				},

				ItemLocations: {
					"Red Poe Chest": {
						Name: "Red Poe Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 151, y: 52, floor: "F2" },
						Age: Age.ADULT,
						Order: 12,
						RequiredItems: [Items.FAIRY_BOW],
						LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Shoot the portraits as normal and kill the poe to spawn the chest."
					},
					"Chest in Stalfos Room": {
						Name: "Chest in Stalfos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 191, y: 65, floor: "F2" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "Untwist the cooridor by hitting the switch just outside the door to the right of the redead room. Navigate back up to the twisted cooridor and continue through the door to your right. Navigate through the Red Poe room and kill the three Stalfos to spawn the chest.<br/><br/>NOTE: If you can't play the song of time, consider dropping down before killing the first stalfos to get a chest that you'll lock yourself out of."
					},
					"Blue Poe Chest": {
						Name: "Blue Poe Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 244, y: 52, floor: "F2" },
						Age: Age.ADULT,
						Order: 14,
						RequiredItems: [Items.FAIRY_BOW],
						LongDescription: "Head to the blue poe room, which is after the Stalfos room. Shoot the portraits as normal and kill the poe to spawn the chest."
					},
				}
			},

			twistedCooridor2: {
				Exits: {
					fallingCeilingRoom: {
						Name: "fallingCeilingRoom",
						LockedDoor: "Locked Door in Green Bubble Hallway",
						Map: "Forest Temple",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age === Age.ADULT && Items.FAIRY_BOW.playerHas);
						}
					}
				},

				ItemLocations: {

				}
			},

			fallingCeilingRoom: {
				Exits: {
					outsideEastPlatform: {
						Name: "outsideEastPlatform",
					}
				},

				ItemLocations: {
					"Chest in Checkerboard Room": {
						Name: "Chest in Checkerboard Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 323, y: 104, floor: "F1" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "This room is found after twisting the cooridor with the Green Bubbles. Fall down the hole that's now accessible. Once in the room, hit one of the switches in this room to spawn the chest."
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
						MapInfo: { x: 143, y: 156, floor: "B1" },
						Age: Age.ADULT,
						Order: 17,
						IsPostWalkCheck: true,
						LongDescription: "After defeating all the Poes, take the elevator to the basement. Push the wall in any direction twice to get to the chest."
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
						Order: 18,
						LongDescription: "For phase 1 of Phantom Ganon, you must shoot the real version of him that comes out of the paintings. You can use your bow or hookshot for that. The real one is lighter and is the only one that makes sound. Phase 2 is the familiar tenis match. Stun him with his own attacks and damage him when he's stunned.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							let canBKSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBKSkip && Items.HOOKSHOT.playerHas;
							return canBKSkip || Data.mqForestTempleCanAccessAllPoeRooms(age);
						}
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 181, y: 81, floor: "B1" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion.",
						IsPostWalkCheck: true,
						CustomRequirement: function(age) {
							let canBKSkip = age === Age.ADULT && Settings.GlitchesToAllow.forestBKSkip && Items.HOOKSHOT.playerHas;
							return canBKSkip || Data.mqForestTempleCanAccessAllPoeRooms(age);
						}
					}
				}
			}
		}
	},

	"Fire Temple": {
		Abbreviation: "FIRE",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F5", "F4", "F3", "F2", "F1"],
        StartingFloorIndex: 4,
		Regions: {
			main: {
				Exits: {
					roomBeforeBoss: {
						Name: "roomBeforeBoss",
						Age: Age.ADULT,
						NeedsFire: true,
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
						}
					},

					lockedAreaByEntrance: {
						Name: "lockedAreaByEntrance",
						LockedDoor: "Bottom Locked Door in Lobby",
						Map: "Fire Temple"
					},

					bigLavaRoom: {
						Name: "bigLavaRoom",
						Age: Age.ADULT,
						RequiredItems: [Items.MEGATON_HAMMER],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
						}
					},

					Exit: {
						OwExit: OwExits["Fire Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Like-Like Chest By Entrance": {
						Name: "Like-Like Chest By Entrance",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 61, y: 123, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances;
						},
						NeedsDamagingItem: true,
						LongDescription: "Enter the left door by the entrance. Kill the Like-Like to spawn the chest."
					},

					// Locked Doors
					"Bottom Locked Door in Lobby": {
						Name: "Bottom Locked Door in Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 126, y: 214, floor: "F1" },
						Age: Age.ADULT,
						Order: 4.1,
						LongDescription: "This is the locked door on the right side of the lobby.",
						KeyRequirement: function(age) {
							return { min: 1, max: Keys.FIRE_TEMPLE.mqTotalKeys() };
						},
					},

					"Locked Door in Big Lava Room": {
						Name: "Locked Door in Big Lava Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["bigLavaRoom"],
						MapInfo: { x: 256, y: 202, floor: "F1" },
						Age: Age.ADULT,
						Order: 6.1,
						LongDescription: "This is the locked door on the far side of the big lava room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 2 };
						},
					},

					"Locked Door Above Boulder Maze": {
						Name: "Locked Door Above Boulder Maze",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["boulderMazeTop"],
						MapInfo: { x: 277, y: 121, floor: "F3" },
						Age: Age.ADULT,
						Order: 10.1,
						LongDescription: "This is the locked door on the top of the boulder maze.",
						KeyRequirement: function(age) {
							return { min: 2, max: 3 };
						},
					},

					"Locked Door After Flare Dancer": {
						Name: "Locked Door After Flare Dancer",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["fireWallMaze"],
						MapInfo: { x: 39, y: 179, floor: "F3" },
						Age: Age.ADULT,
						Order: 18.1,
						LongDescription: "This is the locked door after riding the elevator up from the Flare Dancer fight.",
						KeyRequirement: function(age) {
							return { min: 3, max: 4 };
						},
					},

					"Locked Door Under Hammer Floor": {
						Name: "Locked Door Under Hammer Floor",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["roomAfterTopOfTemple"],
						MapInfo: { x: 71, y: 136, floor: "F4" },
						Age: Age.ADULT,
						Order: 19.1,
						LongDescription: "This is the locked door after pounding the floor down at the top of the temple.",
						KeyRequirement: function(age) {
							return { min: 4, max: 5 };
						}
					}
				}
			},

			roomBeforeBoss: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						Age: Age.ADULT,
						RequiredItems: [Items.MEGATON_HAMMER],
						CustomRequirement: function(age) {
							return hasBossKey("Fire Temple");
						}
					}
				},

				ItemLocations: {
					"Chest in Room Before Boss": {
						Name: "Chest in Room Before Boss",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 36, y: 263, floor: "F1" },
						Region: "roomBeforeBoss",
						Age: Age.ADULT,
						Order: 2,
						LongDescription: "Use a fire item to light the four torches in the room to unlock the door. In the next room,  navigate to the upper left corner. Roll into a box to break it to reveal a torch. Light all 3 torches in the room to open the gate to the chest.",
						RequiredChoiceOfItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
					}
				}
			},

			lockedAreaByEntrance: {
				Exits: {},
				ItemLocations: {
					"Chest After First Flare Dancer": {
						Name: "Chest After First Flare Dancer",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 57, y: 60, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances;
						},
						Order: 5,
						RequiredChoiceOfAdultItems: [Items.HOOKSHOT, Items.MEGATON_HAMMER, Items.BOMB, Items.BOMBCHU],
						RequiredChoiceOfChildItems: [Items.MEGATON_HAMMER, Items.BOMB, Items.BOMBCHU],
						LongDescription: "Enter the locked door to the right when you first enter the temple. Navigate around the rooms, defeating the enemies to progress (including an Iron Knuckle). Defeat the Flare Dancer to spawn the chest.",
						CustomRequirement: function(age) {
							if (age === Age.ADULT) { return true; }
							return Data.canGroundJumpWithBomb(age);
						}
					},
					"Chest by Goron After Flare Dancer": {
						Name: "Chest by Goron After Flare Dancer",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 61, y: 110, floor: "F1" },
						Age: Age.EITHER,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.equipSwap; },
						Order: 6,
						RequiredItems: [Items.MEGATON_HAMMER],
						LongDescription: "After the Flare Dancer, enter the next room. Hit the rusted switch with the hammer to gain access to this chest."
					}
				}
			},

			bigLavaRoom: {
				Exits: {
					boulderMaze: {
						Name: "boulderMaze",
						LockedDoor: "Locked Door in Big Lava Room",
						Map: "Fire Temple",
						NeedsFire: true // //TODO: test if fire arrows actually work here
					},
				},

				ItemLocations: {
					"Skulltula by Left Goron in Lava Room": {
						Name: "Skulltula by Left Goron in Lava Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 280, y: 139, floor: "F1" },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "Go to the left side of the big lava room. Hammer the switch to gain access to the skulltula."
					},
					"Boss Key Chest": {
						Name: "Boss Key Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 174, y: 85, floor: "F1" },
						Age: Age.ADULT,
						Order: 9,
						RequiredItems: [Items.HOOKSHOT],
						NeedsFire: true, //TODO: ensure that Din's Fire is enough
						LongDescription: "Light the two torches - one is on a platform you need to ride up to, and the other is by the door on the left side of the room. Now you can enter the door above the left goron room to get to the room with the chest. Hookshot the torch or chest to get to it."
					},
					"Chest by Right Goron in Lava Room": {
						Name: "Chest by Right Goron in Lava Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: {x: 202, y: 287, floor: "F1" },
						Age: Age.ADULT,
						Order: 10,
						RequiredItems: [Items.HOOKSHOT],
						NeedsExplosives: true,
						NeedsFire: true, //TODO: ensure that fire arrows work
						LongDescription: "Hookshot to the torch on the right side of the lava room. Bomb the blocked doorway to enter. Use a fire item to light the torches outside the jail. The chest is by the goron."
					},
				}
			},

			boulderMaze: {
				Exits: {
					boulderMazeTop: {
						Name: "boulderMazeTop",
						NeedsExplosives: true,
						RequiredItems: [Items.HOOKSHOT]
					}
				},

				ItemLocations: {
					"Chest Behind Bars on Bottom": {
						Name: "Chest Behind Bars on Bottom",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 321, y: 212, floor: "F3" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "In the maze, there's a switch behind some metal bars. Use a spin attack/explosion/Din's Fire to hit it. The chest is in one of the crates."
					}
				}
			},

			boulderMazeTop: {
				Exits: {
					aboveBoulderMaze: {
						Name: "aboveBoulderMaze",
						RequiredSongs: [Songs.SONG_OF_TIME] //TODO: is longshot good enough?
					},

					fireWallMaze: {
						Name: "fireWallMaze",
						LockedDoor: "Locked Door Above Boulder Maze",
						Map: "Fire Temple",
						RequiredItems: [Items.FAIRY_BOW]
					},
				},

				ItemLocations: {
					"Chest on Boulder Maze Top": {
						Name: "Chest on Boulder Maze Top",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 300, y: 221, floor: "F3" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "In the northeast area of the maze, find the fake wall and bomb it. Hammer the switch inside. Hookshot up one of the targets that appear and make your way toward the crystal switch. Trigger it (jumpslash, spin attack, Din's, explosive, etc.). The chest is hidden in one of the crates."
					},
					"Chest in Hole Under Maze": {
						Name: "Chest in Hole Under Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 164, y: 97, floor: "F2" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "Bomb the crack in the floor on top of the boulder maze. Break some crates to reveal a rusted switch. Hammer it to gain access to the chest."
					},
					"Goron by Boulder Maze": {
						Name: "Goron by Boulder Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 283, y: 52, floor: "F3" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "In the north section of the maze, there's a wall you can bomb. Grab one of the crates from the room at the top of the maze and put it on the switch. The chest is through the door, by the goron as usual."
					}
				}
			},

			aboveBoulderMaze: {
				Exits: {},
				ItemLocations: {
					"Skulltula on Very Top": {
						Name: "Skulltula on Very Top",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 219, y: 147, floor: "F5" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "On top of the boulder maze, play the Song of Time by the bombable pit. Navigate upwards via climbing and the hookshot). After the green room, make your way around the room and hammer the rusted switch by the fire circle. Now jump down and hit the switch. Use the new hookshot target to quickly get up and pull the block away. The skulltula is underneath."
					}
				}
			},

			fireWallMaze: {
				Exits: {
					topOfTemple: {
						Name: "topOfTemple",
						LockedDoor: "Locked Door After Flare Dancer",
						Map: "Fire Temple"
					}
				},

				ItemLocations: {
					"Skulltula in Fire Wall Maze": {
						Name: "Skulltula in Fire Wall Maze",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 194, y: 79, floor: "F3" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "Navigate around the lava room and grab a small box. Enter the encaged area and place the box on the blue switch to light some torches. Hookshot the box to get back up. Use your bow to shoot though one of the torches to light a high up torch on the wall. Go through the door to continue.<br/><br/>Navigate to the door in front of you. Play the Song of Time to the right of the door to spawn a block. Use the block to jump down over the fire wall and into the door in the northwest section of the room. The skulltula is inside."
					},
					"Skulltula in Center of Maze": {
						Name: "Skulltula in Center of Maze",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 124, y: 162, floor: "F3" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "From the entrance of the fire wall room - make your way to the door in front of you and enter it. In this room, get to the next door by jumping on the Song of Time Block. Hookshot across the room and hit the switch with your hammer to unbar the doors.<br/><br/>Now navigate through the maze to the southernmost door. Once inside, bomb the fake wall by the scratching sounds to get to the skulltula."
					},
					"Freestanding Key in Flare Dancer Room": {
						Name: "Freestanding Key in Flare Dancer Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 37, y: 178, floor: "F3" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "Proceed from the center of the maze. Hit the switch to lower the fire wall. Enter the next room and kill the Flare Dancer. Jump on the center platform to make it rise, but immediately get off. The item should be where the platform used to be."
					}
				}
			},

			topOfTemple: {
				Exits: {
					roomAfterTopOfTemple: {
						Name: "roomAfterTopOfTemple",
						LockedDoor: "Locked Door Under Hammer Floor",
						Map: "Fire Temple"
					}
				},

				ItemLocations: {
					"Chest at Top of Temple": {
						Name: "Chest at Top of Temple",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 43, y: 157, floor: "F5" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "From the Flare Dancer room - make your way through the next room. Hit the switch on the ground somewhat near the chest with the fire wall to lower the wall. The Scarecrow's Song can help you get to it quicker, but it's not required."
					},
				}
			},

			roomAfterTopOfTemple: {
				Exits: {},
				ItemLocations: {
					"Skulltula after Top of Temple": {
						Name: "Skulltula after Top of Temple",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: {x: 208, y: 227, floor: "F4" },
						Age: Age.ADULT,
						Order: 20,
						LongDescription: "From the top of the temple, hammer the face block to continue on. Kill the Stalfos and continue to the next room (you need to hookshot one of the faces to unbar the door). The skulltula is in this room."
					},
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 25, y: 197, floor: "F1" },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "Note that you can get to this boss without dropping the giant column down. Navigate to the Goron cage area and drop down onto the small ledge. Now do a rolling jump straight at the boss platform and hold forward - you should grab the ledge. This might take a few tries. The Hover Boots should make this trivial. To defeat Volvagia, hit her with your hammer when she pops out of the holes. After that, attack it again. Jumpslashes will do more damage, like usual. You can hit it with arrows while it's flying to do additional damage. If it ever drops rocks on you, you can hang off the side of the cliff to avoid damage."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: {x: 25, y: 207, floor: "F1" },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	//TODO: can you screw yourself if you have no hookshot to reset the water levels?
	// maybe not since the whirlpoolRoom requires it...
	//TODO also: my logic says only one key is required; theirs says 2 - why is that?
	"Water Temple": {
		Abbreviation: "WATR",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F3", "F2", "F1", "B1"],
        StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					lowWaterLevel: {
						Name: "lowWaterLevel",
						RequiredItems: [Equipment.IRON_BOOTS],
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
						}
					},

					highWaterLevel: {
						Name: "highWaterLevel",
						RequiredItems: [Items.HOOKSHOT],
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					},

					bottomFloor: {
						Name: "bottomFloor",
						RequiredItems: [Equipment.IRON_BOOTS],
						CustomRequirement: function(age) {
							let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
							let canUseDinsFire = Items.DINS_FIRE.playerHas && Equipment.MAGIC.playerHas;
							let canLightTorches = canUseFireArrows || (Data.canPlaySong(Songs.SONG_OF_TIME) && canUseDinsFire);
							return canLightTorches;
						}
					},

					whirlpoolRoom: {
						Name: "whirlpoolRoom",
						RequiredItems: [Items.HOOKSHOT],
						CustomRequirement: function(age) {
							return getKeyCount("Water Temple") >= 1;
						}
					},

					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							if (!hasBossKey("Water Temple")) { return false; } //TODO: Water BK skip in MQ is really easy
				
							let hasLongshot = Items.HOOKSHOT.currentUpgrade === 2;
							let canSkipLongshot = Settings.GlitchesToAllow.waterLongshotlessBoss &&
								Items.MEGATON_HAMMER.playerHas &&
								Equipment.HOVER_BOOTS.playerHas;
							
							let canGetToBossArea = hasLongshot || canSkipLongshot;
							if (!canGetToBossArea) { return false; }
							
							return Items.HOOKSHOT.playerHas;
						}
					},

					Exit: {
						OwExit: OwExits["Water Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Chest in Mid East Room": {
						Name: "Chest in Mid East Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 330, y: 131, floor: "F2" },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "Use your iron boots and navigate through the lower right room. Put them back on when you reach the very next floor. Navigate through the hold in the wall. Now, hookshot the back wall to spawn the chest. To open it, hookshot the front then spam A.",
						RequiredItems: [Items.HOOKSHOT]
					},
					"Chest by Low Water Triforce": {
						Name: "Chest by Low Water Triforce",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 334, y: 222, floor: "F3" },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "Use your iron boots and navigate through the lower right room. Take them off to rise to the top to get to the triforce room. Use a fire item to light the torches in the four corners of the room to unbar the door.<br/><br/>Enter the next room and optionally defeat all the Stalfos to unbar the door. The chest is spawned by hitting the back wall with the hookshot.",
						NeedsFire: true,
						RequiredItems: [Items.HOOKSHOT]
					}
				}
			},

			lowWaterLevel: {
				Exits: {
					midWaterLevel: {
						Name: "midWaterLevel",
						RequiredItems: [Items.HOOKSHOT]
					}
				},

				ItemLocations: {
					"Chest in Lower East Room": {
						Name: "Chest in Lower East Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 338, y: 212, floor: "F1" },
						Age: Age.ADULT,
						Order: 5,
						LongDescription: "Lower the water level. Navigate to the room below the water triforce. Light the torches using a fire item or your bow.<br/><br/>Defeat the enemies in the next room to spawn the chest",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || Items.FAIRY_BOW.playerHas;
						}
					},

					"Skulltula in Mid South Room": {
						Name: "Skulltula in Mid South Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 267, y: 203, floor: "F2" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "With the water level lowered (mid is easier), navigate to the bottom middle area. Hit the switch to open the gated door. Use Din's Fire to light the torch and get the skulltula behind the cell.",
						RequiredItems: [Items.DINS_FIRE, Equipment.MAGIC] //TODO: can you get with just iron boots and hookshot?
					},
				}
			},

			midWaterLevel: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Mid Left Rooms": {
						Name: "Skulltula in Mid Left Rooms",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 160, y: 247, floor: "F3" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "With the water at mid, head to the eastern room on the middle floor. Use your hookshot to navigate to the top of the room. Grab a box and run it all the way back to the central platform. Put it on the blue switch on the other side. In this room, break the box to your left and hit the switch. Now, hookshot up to the next floor. The skullula is in one of the boxes."
					}
				}
			},

			highWaterLevel: { //TODO: is this even needed?
				Exits: {},
				ItemLocations: {}
			},

			bottomFloor: {
				Exits: {},
				ItemLocations: {
					"Chest at Bottom Floor": {
						Name: "Chest at Bottom Floor",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 291, y: 214, floor: "B1" },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "With the water at its highest, use your iron boots to enter the door at mid level in the main room. Rise to the top and play the Song of Time to spawn a block you can use Din's fire from to light the torches. Alternatively, well-aimed fire arrows will work. Sink down to the room at the very bottom.<br/><br/>Once here, navigate around the maze. Jump on some platforms at the very end to reveal a switch. Hit it, and then navigate to the grate that opens up and hookshot your way up there. Hookshot the wall to spawn the chest.",
						RequiredItems: [Items.HOOKSHOT]
					},
				}
			},

			whirlpoolRoom: {
				Exits: {
					singleWaterPillarRoom: {
						Name: "singleWaterPillarRoom",
						RequiredItems: [Items.DINS_FIRE, Equipment.MAGIC, Equipment.IRON_BOOTS]
					}
				},

				ItemLocations: {
					"Skulltula in Whirlpool Room": {
						Name: "Skulltula in Whirlpool Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 37, y: 146, floor: "F1" },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "With the water at its highest, nagivate to the top floor and open the locked door to the west. Use your hookshot to hit the crystal switch above the opening after you get to the main room. Navigate to the left wall and shoot it with your hookshot to raise the hookshot target. Now, enter the door. Use your hookshot to get through the next room, and then defeat Dark Link. Hookshot the wall in the next room to reach the whirlpool room.<br/><br/>Use your iron boots or longshot across the river until you hear the skulltula. Get it with your hookshot or longshot.",
						Region: "whirlpoolRoom",
						RequiredChoiceOfItems: [Equipment.IRON_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}]
					}
				}
			},

			singleWaterPillarRoom: {
				Exits: {
					bottomGateSwitch: {
						Name: "bottomGateSwitch"
					}
				},

				ItemLocations: {
					"Chest in Single Water Pillar Room": {
						Name: "Chest in Single Water Pillar Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 95, y: 126, floor: "F1" },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "Nagivate around the whirlpool room. In the room with the dragon, use your iron boots to navigate to the back. Light the torches on the walls to unbar the door. In the next room, stand on the water pillar and hit the crystal switch to raise the pillar. Use Din's fire to lower the gate so you can get to the chest."
					}
				}
			},

			bottomGateSwitch: {
				Exits: {
					roomAfterSpikes: {
						Name: "roomAfterSpikes",
						RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, {item: Items.HOOKSHOT, upgradeString: "2"}],
					}
				},

				ItemLocations: {
					"Skulltula in Room With Three Torches": { //TODO: I think this is the right region, confirm
						Name: "Skulltula in Room With Three Torches",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 25, y: 260, floor: "F1" },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "After hitting the switch after getting the chest in the room with a single water pillar, navigate to the bottom level and use your iron boots to sink down. Use the Scarecrow's Song or hover boots to navigate across the room. Now, turn around and use Fire Arrows to light the three torches to get to the skulltula.",
						IsAtShortDistance: true,
						RequiredItems: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.IRON_BOOTS, Equipment.MAGIC],
						CustomRequirement: function(age) {
							return Data.canHookScarecrow(age) || Equipment.HOVER_BOOTS.playerHas;
						}
					}
				}
			},

			roomAfterSpikes: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Room With Waterfall": {
						Name: "Skulltula in Room With Waterfall",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 185, y: 50, floor: "F1" },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes.<br/><br/>Once in this room, navigate to the farthest box in the back of the room and use your iron boots to sink down onto it. Hookshot the center of the ceiling, around the second brick texture to hookshot an unintended hookshot target to get over the gate. The skulltula would be to your left.<br/><br/>The intended path involves going around the rooms to your left, through the waterfall entrance. You'd either spawn the scarecrow, or do the glich to get across."
					},
					"Freestanding Item by Waterfall": {
						Name: "Freestanding Item by Waterfall",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 115, y: 64, floor: "F1" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "After navigating around and hitting the switch after getting the chest in the single water pillar room, head to the bottom floor and enter the north area. Use your longshot or hover boots to cross the spikes. Play the Scarecrow's song and hookshot it to get to the opening to the left.<br/><br/>Jump into the water by the waterfall and follow the path around to a door. The item is in the box to your left.",
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.waterBKShortcut || Data.canHookScarecrow(age);
						}
					},
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						Age: Age.ADULT,
						Order: 1,
						MapInfo: { x: 227, y: 135, floor: "F3" },
						LongDescription: "The boss room is on the opposite side of the entrance to the temple. You can actually immediately get there with no glitches required if you already have the longshot and boss key.<br/><br/>To defeat morpha, hookshot her nucleus out of the water and hit her to damage her. A good way to kill is to continuously hookshot her to bring her into a corner. Now, get to the other side of her and slash once so it runs into the corner. Now quickly jumpslash it (Z + A) and continue to crouch stab (Hold R, spam B) until it's dead."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						Age: Age.ADULT,
						Order: 2,
						MapInfo: { x: 227, y: 145, floor: "F3" },
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Shadow Temple": {
        Abbreviation: "SHDW",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
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
							
							let canCrossFirstGap = 
								(age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas)) ||
								(Data.canMegaFlip(age) && Items.BOMBCHU.playerHas);
							return canCrossFirstGap;
						}
					},
					Exit: {
						OwExit: OwExits["Shadow Temple"]["Exit"]
					}
				},

				ItemLocations: {
					// Locked Doors - note that we're assuming that you won't use keys on doors that will break sequence if the gate clip is on
					"Locked Door by Truth Spinner": {
						Name: "Locked Door by Truth Spinner",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["truthSpinnerRoom"],
						MapInfo: { x: 122, y: 91, floor: "F1" },
						Age: Age.EITHER,
						Order: 0.1,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip },
						LongDescription: "This is the door behind the explodable wall in the truth spinner room.",
						KeyRequirement: function(age) {
							return { min: 1, max: Keys.SHADOW_TEMPLE.mqTotalKeys() };
						}
					},

					"Locked Door by Beamos": {
						Name: "Locked Door by Beamos",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["afterTruthSpinner"],
						MapInfo: { x: 329, y: 109, floor: "F1" },
						Age: Age.EITHER,
						Order: 5.1,
						UseAdultAge: function() { return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip},
						LongDescription: "This is the door near the beamos after the truth spinner room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 2 };
						}
					},

					"Locked Door in Giant Room": {
						Name: "Locked Door in Giant Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["rightSideOfGiantRoom"],
						MapInfo: { x: 157, y: 93, floor: "B2" },
						Age: Age.ADULT,
						Order: 12.1,
						LongDescription: "This is the locked door on the right side of the giant room.",
						KeyRequirement: function(age) {
							return { min: 2, max: 3 };
						}
					},

					"Locked Door in Invisible Spike Room": {
						Name: "Locked Door in Invisible Spike Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["invisibleSpikeRoom"],
						MapInfo: { x: 156, y: 46, floor: "B2" },
						Age: Age.ADULT,
						Order: 14.1,
						LongDescription: "This is the locked door in the room with the invisible spikes.",
						KeyRequirement: function(age) {
							return { min: 3, max: 4 };
						}
					},

					"Locked Door After Fans": {
						Name: "Locked Door After Fans",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["windHallway"],
						MapInfo: { x: 303, y: 131, floor: "B1" },
						Age: Age.ADULT,
						Order: 19.1,
						LongDescription: "This is the locked door in the Gibdos room after all the fans.",
						KeyRequirement: function(age) {
							return { min: 4, max: 5 };
						}
					},

					"Locked Door in Invisible Wall Room": {
						Name: "Locked Door in Invisible Wall Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["invisibleWallRoom"],
						MapInfo: { x: 90, y: 79, floor: "B1" },
						Age: Age.ADULT,
						Order: 20.1,
						LongDescription: "This is the locked door in the invisible wall room.",
						KeyRequirement: function(age) {
							return { min: 5, max: 6 };
						}
					}
				}
			},

			truthSpinnerRoom: {
				Exits: {
					mazeByEntrance: {
						Name: "mazeByEntrance",
						LockedDoor: "Locked Door by Truth Spinner",
						Map: "Shadow Temple",
						NeedsExplosives: true
					},

					afterTruthSpinner: {
						Name: "afterTruthSpinner",
						CustomRequirement: function(age) {
							if (Data.canMegaFlip(age)) { return true; }
				
							//TODO: Test Din's fire!
							let canUseFireArrows = Items.FAIRY_BOW.playerHas && Items.FIRE_ARROW.playerHas && Equipment.MAGIC.playerHas;
							return canUseFireArrows || Equipment.HOVER_BOOTS.playerHas;
						}
					}
				},
				ItemLocations: {}
			},

			mazeByEntrance: {
				Exits: {},
				ItemLocations: {
					"Redead Chest in Maze": {
						Name: "Redead Chest in Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 101, y: 108, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "After entering the truth spinner room, navigate to the Eye of Truth symbol on the lower left wall. Bomb it to open up the path. Use a key to enter the maze. Head right through the invisible wall. Kill the enemies to spawn the chest."
					},
					"Dead Hand Chest": {
						Name: "Dead Hand Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 14, y: 143, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "In the maze by the entrance, navigate around to the other side of the first room. Play the Song of Time to remove the block in the way (invisible without the lens). In the next room, shoot the middle eye. Now you can enter the northwest door. Kill Dead Hand to spawn the chest.",
						RequiredChildItems: [Items.FAIRY_SLINGSHOT],
						RequiredAdultItems: [Items.FAIRY_BOW],
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				}
			},

			afterTruthSpinner: {
				Exits: {
					afterBeamos: {
						Name: "afterBeamos",
						LockedDoor: "Locked Door by Beamos",
						Map: "Shadow Temple",
						NeedsExplosives: true
					},

					boatRoom: {
						Name: "boatRoom",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.shadowGateClip;
						}
					}
				},

				ItemLocations: {
					"Chest in Scythe Room": {
						Name: "Chest in Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 345, y: 122, floor: "F1" },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Gather all the rupees to open the cell to the chest.",
						RequiredChoiceOfItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS]
					},
					"Invisible Chest Under Scythe Room": {
						Name: "Invisible Chest Under Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 278, y: 122, floor: "B1" },
						Age: Age.EITHER,
						Order: 4,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Facing away from the door into the scythe room, go to the upper right room and fall down the invisible hole. There is an invisible chest to the right of the climbable wall."
					},
					"Chest in Gibdos Room": {
						Name: "Chest in Gibdos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 301, y: 220, floor: "F1" },
						Age: Age.ADULT,
						Order: 5,
						LongDescription: "First, turn the truth spinner in the main room to the correct skull to open the gate. Now, shoot the torches to the left and right of the gate to create a platform. Alternatively, you can megaflip or hover boots across. Take the left door from the beamos. Kill the enemies to spawn the chest."
					}
				}
			},

			afterBeamos: {
				Exits: {
					rightSideOfGiantRoom: {
						Name: "rightSideOfGiantRoom",
						CustomRequirement: function(age) {
							return Data.canUseFireItem(age) || (age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas)
						}
					}
				},

				ItemLocations: {
					"Visible Chest in Invisible Scythe Room": {
						Name: "Visible Chest in Invisible Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 343, y: 138, floor: "B2" },
						Age: Age.EITHER,
						Order: 6,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},
					"Invisible Chest in Invisible Scythe Room": {
						Name: "Invisible Chest in Invisible Scythe Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 343, y: 142, floor: "B2" },
						Age: Age.EITHER,
						Order: 7,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Bomb the wall after the beamos and open the locked door. Navigate through the hallways until you get to a dead end. Make a left at the fork and follow the wall, jumping across the invisible platforms. Enter the door.<br/><br/>Gather all the silver rupees - you'll need the Song of Time for one of them. This will open the door to the chest - it's next to the visible one.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					}
				}
			},

			rightSideOfGiantRoom: {
				Exits: {
					invisibleSpikeRoom: {
						Name: "invisibleSpikeRoom",
						LockedDoor: "Locked Door in Giant Room",
						Map: "Shadow Temple",
						RequiredItems: [Equipment.HOVER_BOOTS]
					}
				},

				ItemLocations: {
					"Chest in Giant Room": {
						Name: "Chest in Giant Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 138, y: 241, floor: "B2" },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "In the giant room, use a fire item to hit the frozen eye switch. This will spawn some platforms in the direction the eye is facing. Use them to get to the right side of the room. Once there, gather all the silver rupees to spawn the chest. Two of them are up high and requires the longshot.",
						RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}],
					},
					"Skulltula in Falling Ceiling Room": { 
						Name: "Skulltula in Falling Ceiling Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 53, y: 237, floor: "B2" },
						Age: Age.EITHER,
						Order: 9,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Get to the right side of the giant room. Hit the switch behind the gate to open it to get to the falling spike room. In the first cell to the left is the skulltula."
					},
					"Bottom Chest in Falling Ceiling Room": {
						Name: "Bottom Chest in Falling Ceiling Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 36, y: 213, floor: "B2" },
						Age: Age.EITHER,
						Order: 10,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "This chest is in the first cell to the right in the falling spike room."
					},
					"Top Switchless Chest in Falling Ceiling Room": {
						Name: "Top Switchless Chest in Falling Ceiling Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 17, y: 239, floor: "B2" },
						Age: Age.EITHER,
						Order: 11,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. The chest is in the southeast corner.",
						CustomRequirement: function(age) {
							if (Settings.GlitchesToAllow.shadowBackFlipOnSpikes) { return true; }
							if (age === Age.CHILD && !Data.canGroundJumpWithBomb(age)) { return false; }
							return Equipment.STRENGTH.playerHas;
						}
					},
					"Top Switch Chest in Falling Ceiling Room": {
						Name: "Top Switch Chest in Falling Ceiling Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 79, y: 209, floor: "B2" },
						Age: Age.EITHER,
						Order: 12,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "Make your way to the top part of the falling spike room. You may have to use the hidden block in the wall. Press the switch to spawn the chest.",
						CustomRequirement: function(age) {
							if (Settings.GlitchesToAllow.shadowBackFlipOnSpikes) { return true; }
							if (age === Age.CHILD && !Data.canGroundJumpWithBomb(age)) { return false; }
							return Equipment.STRENGTH.playerHas;
						}
					}
				}
			},

			invisibleSpikeRoom: {
				Exits: {
					leftOfInvisibleSpikeRoom: {
						Name: "leftOfInvisibleSpikeRoom",
						Age: Age.ADULT,
						RequiredItems: [Items.HOOKSHOT]
					},

					windHallway: {
						Name: "windHallway",
						Map: "Shadow Temple",
						LockedDoor: "Locked Door in Invisible Spike Room",
						RequiredItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.shadowNoIronBoots || Equipment.IRON_BOOTS.playerHas;
						}
					}
				},

				ItemLocations: {
					"Chest in Invisible Spike Room": {
						Name: "Chest in Invisible Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 155, y: 63, floor: "B2" },
						Age: Age.EITHER,
						Order: 13,
						UseAdultAge: function() { 
							return !Settings.RandomizerSettings.shuffleDungeonEntrances || !Settings.GlitchesToAllow.megaFlip;
						},
						LongDescription: "From the right side of the giant room, make your way across the invisible platforms to the northwest door. Use a key to open the door. Kill all the enemies to spawn the chest."
					}
				}
			},

			leftOfInvisibleSpikeRoom: {
				Exits: {},
				ItemLocations: {
					"Chest in Stalfos Room": {
						Name: "Chest in Stalfos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 68, y: 68, floor: "B2" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "Gather all the rupees in the invisible spike room. You'll need your hookshot. There are several invislbe targets on the walls you need to use as well. Once done, enter the room that opens and kill all the Stalfos to spawn the chest."
					}
				}
			},

			windHallway: {
				Exits: {
					boatRoom: {
						Name: "boatRoom",
						LockedDoor: "Locked Door After Fans",
						Map: "Shadow Temple"
					}
				},

				ItemLocations: {
					"Skulltula at End of Wind Hallway": {
						Name: "Skulltula at End of Wind Hallway",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 350, y: 193, floor: "B1" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "Go through the door at the top of the invisible spike room. You may need hover boots if the clear platforms are there. Navigate through the wind hallway all the way to the door. The skulltula is in plain sight in this room."
					},
					"Invisible Chest at End of Wind Hallway": {
						Name: "Invisible Chest at End of Wind Hallway",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 344, y: 199, floor: "B1" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "In the room at the end of the wind hallway, there's an invisible chest in the upper right corner."
					},
					"Chest in Gibdo Room by Wind Hallway": {
						Name: "Chest in Gibdo Room by Wind Hallway",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 301, y: 148, floor: "B1" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "In the big part of the wind hallway, go through the invisible wall on the left side. You may need to use the wind to your advantage. Kill the Gibdos to spawn the chest."
					},
					"Hidden Chest in Gibdo Room by Wind Hallway": {
						Name: "Hidden Chest in Gibdo Room by Wind Hallway",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 309, y: 158, floor: "B1" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "In the Gibdo room, bomb the rubble to your right to get to this chest."
					},
					"Skulltula in Gibdo Room by Wind Hallway": {
						Name: "Skulltula in Gibdo Room by Wind Hallway",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 294, y: 139, floor: "B1" },
						Age: Age.ADULT,
						Order: 19,
						LongDescription: "In the Gibdo room, bomb the rubble at the back to get to this skulltula."
					}
				}
			},

			boatRoom: {
				Exits: {
					endOfBoatRide: {
						Name: "endOfBoatRide",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					}
				},
				
				ItemLocations: {
					
				}
			},

			endOfBoatRide: {
				Exits: {
					acrossChasm: {
						Name: "acrossChasm",
						CustomRequirement: function(age) {
							let canHitWithChu = Settings.GlitchesToAllow.shadowChuBombFlowers && Items.BOMBCHU.playerHas;
							return Items.FAIRY_BOW.playerHas || canHitWithChu;
						}
					}
				},

				ItemLocations: {
					"Skulltula in Chasm": {
						Name: "Skulltula in Chasm",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 140, y: 104, floor: "B1" },
						Age: Age.ADULT,
						Order: 20,
						LongDescription: "Navigate to the boat room - this is the room after the Gibdo room by the wind hallway. Get to the boat by pushing the block, or hookshotting up the ladder. Play Zelda's Lullaby to move the boat to the other area. The skulltula is on the wall to the left of where you create the bridge.",
						IsAtShortDistance: true 
					}
				}
			},

			acrossChasm: {
				Exits: {
					invisibleWallRoom: {
						Name: "invisibleWallRoom",
						RequiredSongs: [Songs.SONG_OF_TIME],
						RequiredItems: [Items.FAIRY_BOW, {item: Items.HOOKSHOT, upgradeString: "2"}]
					},

					bossRoom: {
						Name: "bossRoom",
						CustomRequirement: function(age) {
							if (!hasBossKey("Shadow Temple")) { return false; }
							return Equipment.HOVER_BOOTS.playerHas || Data.canMegaFlip(age);
						}
					}
				},

				ItemLocations: {
					"Skullula Before Boss": {
						Name: "Skullula Before Boss",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 106, y: 193, floor: "B1" },
						Age: Age.ADULT,
						Order: 25,
						LongDescription: "Navigate across the chasm you arrive at after taking the boat. Enter the door on the other side. The skulltula is on the back wall. You'll need to navigate around the room's invisible floors to get to it."
					}
				}
			},

			invisibleWallRoom: {
				Exits: {
					woodSpikeRoom: {
						Name: "woodSpikeRoom",
						LockedDoor: "Locked Door in Invisible Wall Room",
						Map: "Shadow Temple",
						RequiredItems: [Equipment.MAGIC, Items.DINS_FIRE]
					}
				},

				ItemLocations: {
					"Freestanding Item in Triple Skull Room": {
						Name: "Freestanding Item in Triple Skull Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 31, y: 99, floor: "B1" },
						Age: Age.ADULT,
						Order: 23,
						LongDescription: "In the invisible maze, navigate to the west room. The item is behind the triple skulls."
					},
					"Bomb Flower Room Chest": {
						Name: "Bomb Flower Room Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 89, y: 144, floor: "B1" },
						Age: Age.ADULT,
						Order: 24,
						LongDescription: "In the invisible maze, navigate to the south room. Use explosives to make Dead Hand spawn. Kill him to spawn the chest.",
						NeedsExplosivesOrBombFlower: true
					}
				}
			},

			woodSpikeRoom: {
				Exits: {},
				ItemLocations: {
					"Left Chest in Wooden Spike Room": {
						Name: "Left Chest in Wooden Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 70, y: 52, floor: "B1" },
						Age: Age.ADULT,
						Order: 21,
						LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the left."
					},
					"Right Chest in Wooden Spike Room": {
						Name: "Right Chest in Wooden Spike Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 108, y: 52, floor: "B1" },
						Age: Age.ADULT,
						Order: 22,
						LongDescription: "Ride the boat to the other side. Now, shoot the bomb flowers to create a bridge. Play the Song of Time at the block and shoot the eye switch. Next, play the song again to respawn the block. Now you can shoot the hookshot target on the upper wall and hit the switch to open the door to the invisible maze.<br/><br/>Navigate to the north room and open the locked door. Use Din's Fire to get rid of the spikes. The chest is on the right."
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
						Order: 26,
						LongDescription: "When fighting Bongo Bongo, it helps to NOT have the Hover Boots equipped. When the fight starts, if you hold down, he won't circle you right away. Hit his hands with your bow or hookshot to stun them. Now hit him before he hits you and damage him as much as you can. Quickspins can actually stunlock him for a 1-cycle if you do them perfectly."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 131, y: 230, floor: "B1" },
						Age: Age.ADULT,
						Order: 27,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Spirit Temple": {
		Abbreviation: "SPRT",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F4", "F3", "F2", "F1"],
        StartingFloorIndex: 3,
		Regions: {
			main: {
				Exits: {
					childSide: {
						Name: "childSide",
						Age: Age.CHILD,
					},

					silverBlockMaze: {
						Age: Age.ADULT,
						//TODO: do you need longshot?
						RequiredItems: [Items.BOMBCHU, Items.HOOKSHOT, { item: Equipment.STRENGTH, upgradeString: "2" }]
					},

					Exit: {
						OwExit: OwExits["Spirit Temple"]["Exit"]
					}
				},

				ItemLocations: {
					"Bottom Left Chest in Lobby": {
						Name: "Bottom Left Chest in Lobby",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 187, y: 215, floor: "F1" },
						Age: Age.EITHER,
						Order: 1,
						AltOrder: 1,
						LongDescription: "This chest is there when you first enter the temple."
					},
					"Top Left Chest in Lobby": {
						Name: "Top Left Chest in Lobby",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 187, y: 203, floor: "F1" },
						Age: Age.EITHER,
						Order: 2,
						AltOrder: 2,
						LongDescription: "After you first enter the temple, go up the stairs. Destroy the yellow rock to your right and shoot the eye switch to spawn the chest.",
						NeedToBlastOrSmash: true,
						RequiredChildItems: [Items.FAIRY_SLINGSHOT],
						RequiredAdultItems: [Items.FAIRY_BOW]
					},
					"Top Right Chest in Lobby": {
						Name: "Top Right Chest in Lobby",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 203, y: 203, floor: "F1" },
						Age: Age.EITHER,
						Order: 3,
						AltOrder: 3,
						LongDescription: "After you first enter the temple, go up the stairs and turn around. There's a crystal switch at the top of one of the pillars that you need to activate to spawn the chest.",
						CustomRequirement: function(age) {
							return Data.canShootEyeSwitch(age) || Data.canUseBoomerang(age) || Items.BOMBCHU.playerHas;
						}
					},
					"Chest in Child Main Room": {
						Name: "Chest in Child Main Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 89, y: 199, floor: "F1" },
						Age: Age.CHILD,
						Order: 30,
						AltOrder: 26,
						IsPostWalkCheck: true,
						LongDescription: "As an adult, navigate through the sun on the floor room until you're in the room with the rusted switch (this is the room after the second crawl space). Hit the switch to spawn the chest. You must go back in time to claim it.<br/>You can also equip swap hammer as Child to get this.",
						RequiredItems: [Items.BOMBCHU],
						CustomRequirement: function(age) {
							if (!Items.MEGATON_HAMMER.playerHas) { return false; }
							return Data.canUseHammer(age) || Data.canAccessMap(Age.ADULT, "Spirit Temple", "afterSecondCrawlSpace");
						}
					},
					"Big Chest in Bridge Room": {
						Name: "Big Chest in Bridge Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 34, y: 139, floor: "F1" },
						Age: Age.CHILD,
						Order: 5,
						AltOrder: 28,
						LongDescription: "In the child area, go through the left door to get to this chest. You can also do the loop from the right side.",
						NeedsSwordWeapon: true
					},

					// Locked Doors
					"Locked Door After Second Crawl Space": {
						Name: "Locked Door After Second Crawl Space",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["childSide", "afterSecondCrawlSpace"],
						MapInfo: { x: 87, y: 100, floor: "F1" },
						Age: Age.EITHER,
						Order: 5.1,
						AltOrder: 26.1,
						LongDescription: "This is the door after the second crawlspace on the child side.",
						KeyRequirement: function(age) {
							let min = 1;
							if (age === Age.ADULT) {
								min = 2; // Adult needs to go through the sun on floor room
							}

							return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
						}
					},
					"Locked Door in Sun on Floor Room": {
						Name: "Locked Door in Sun on Floor Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["statueRoom", "roomWithSunOnFloor"],
						MapInfo: { x: 67, y: 174, floor: "F2" },
						Age: Age.EITHER,
						Order: 7.1,
						AltOrder: 4.1,
						LongDescription: "This is the door leading to/from the room with the sun on the floor room.",
						KeyRequirement: function(age) {
							// There's only one path for child, and it uses only 2 keys
							if (!Data.mqSpiritCanAccessAdultSide()) {
								return { min: 2, max: 2 };
							}

							let min = 2;
							if (age === Age.ADULT) {
								min = 1; // Adult doesn't need to go through any doors for this
							}
							return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
						}
					},
					"Locked Door to Silver Gaunts Knuckle": {
						Name: "Locked Door to Silver Gaunts Knuckle",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["fireBubbleRoom"],
						MapInfo: { x: 32, y: 198, floor: "F3" },
						Age: Age.EITHER,
						Order: 10.1,
						AltOrder: 8.1,
						LongDescription: "This is the door after the puzzle where you push the sun block into the light.",
						KeyRequirement: function(age) {
							// There's only one path for child, and it uses only 3 keys
							if (!Data.mqSpiritCanAccessAdultSide()) {
								return { min: 3, max: 3 };
							}

							let min = 3;
							if (age === Age.ADULT) {
								min = 1; // Adult doesn't need to go through any doors for this
							}
							return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
						}
					},
					"Locked Door in Statue Room": {
						Name: "Locked Door in Statue Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["statueRoom"],
						MapInfo: { x: 256, y: 217, floor: "F2" },
						Age: Age.ADULT,
						Order: 15.1,
						AltOrder: 11.1,
						LongDescription: "This is the locked door on the upper east part of the statue room.",
						KeyRequirement: function(age) {
							let max = 5;
							if (Settings.spiritSuperslideToMirrorShield) {
								max = Keys.SPIRIT_TEMPLE.mqTotalKeys();
							}
							return { min: 1, max: max };
						}
					},
					"Locked Door in Beamos Room": {
						Name: "Locked Door in Beamos Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["beamosRoom"],
						MapInfo: { x: 223, y: 105, floor: "F3" },
						Age: Age.ADULT,
						Order: 24.1,
						AltOrder: 20.1,
						LongDescription: "This is the locked door in the southwest corner of the room with all the Beamos.",
						KeyRequirement: function(age) {
							let min = 2;
							if (Settings.spiritSuperslideToMirrorShield) {
								min--;
							}
							return { min: min, max: 6 };
						}
					},
					"Locked Door Right of Lobby": {
						Name: "Locked Door Right of Lobby",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["roomRightOfLobby"],
						MapInfo: { x: 295, y: 169, floor: "F1" },
						Age: Age.ADULT,
						Order: 20.1,
						AltOrder: 15.1,
						LongDescription: "This is the locked door to the right of the lobby that you get to via the statue room.",
						KeyRequirement: function(age) {
							return { min: 1, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
						}
					},
					"Locked Door After Moving Wall": {
						Name: "Locked Door After Moving Wall",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["movingWallRoom"],
						MapInfo: { x: 294, y: 144, floor: "F4" },
						Age: Age.ADULT,
						Order: 24.2,
						AltOrder: 20.2,
						LongDescription: "This is the locked door by the triforce symbol located after the moving wall.",
						KeyRequirement: function(age) {
							let min = 3;
							if (Settings.spiritSuperslideToMirrorShield) {
								min--;
							}
							return { min: min, max: Keys.SPIRIT_TEMPLE.mqTotalKeys() };
						}
					}
				}
			},

			childSide: {
				Exits: {
					backOfChildBridgeRoom: {
						Name: "backOfChildBridgeRoom",
						Age: Age.CHILD,
						RequiredItems: [Items.BOMBCHU, Items.FAIRY_SLINGSHOT],
						NeedsSwordWeapon: true
					},

					afterSecondCrawlSpace: {
						Name: "afterSecondCrawlSpace",
						Age: Age.CHILD,
						RequiredItems: [Items.BOMBCHU]
					}
				},

				ItemLocations: {

				}
			},

			backOfChildBridgeRoom: {
				Exits: {},
				ItemLocations: {
					"Small Chest in Bridge Room": {
						Name: "Small Chest in Bridge Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 34, y: 94, floor: "F1" },
						Age: Age.CHILD,
						Order: 4,
						AltOrder: 27,
						LongDescription: "Kill all the enemies in the room after going through the crawlspace. Go through the door that unlocks. In this room, push back the right grave and hit the switch under it. Now, drop a bombchu through the gap that just opened up to reveal an eye switch. Shoot the switch and make your way across. In the next room, kill the Stalfos and continue on. In this room, pull back the gravestone and hit the switch to lower the bridge. Now kill all the enemies to spawn the chest - you'll need Din's Fire to deal with the Anubis.",
						NeedsFire: true
					}
				}
			},

			afterSecondCrawlSpace: {
				Exits: {
					roomWithSunOnFloor: {
						Name: "roomWithSunOnFloor",
						Age: Age.CHILD,
						Map: "Spirit Temple",
						LockedDoor: "Locked Door After Second Crawl Space"
					}
				},
				ItemLocations: {}
			},

			roomWithSunOnFloor: {
				Exits: {
					afterSecondCrawlSpace: {
						Name: "roomWithSunOnFloor",
						Age: Age.ADULT,
						Map: "Spirit Temple",
						LockedDoor: "Locked Door After Second Crawl Space"
					},

					statueRoom: {
						Name: "statueRoom",
						Age: Age.CHILD,
						Map: "Spirit Temple",
						LockedDoor: "Locked Door in Sun on Floor Room"
					}
				},

				ItemLocations: {
					"Bottom Chest in Room With Sun On Floor": {
						Name: "Bottom Chest in Room With Sun On Floor",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 61, y: 142, floor: "F2" },
						Age: Age.EITHER,
						Order: 7,
						AltOrder: 5,
						LongDescription: "In the room with the sun on the floor, kill all the enemies to spawn the chest. As child, this is the room after you go through the second crawlspace. As an adult, it's in the bottom southwest corner of the big statue room.",
						NeedsExplosives: true
					},
					"Top Chest in Room With Sun On Floor": {
						Name: "Top Chest in Room With Sun On Floor",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 53, y: 194, floor: "F2" },
						Age: Age.ADULT,
						Order: 12,
						AltOrder: 6,
						LongDescription: "In the room with the sun on the floor, use an explosive to blow up the wall to light up the sun. This will spawn a chest that you will need to hookshot up to.",
						RequiredItems: [Items.HOOKSHOT],
						NeedsExplosives: true
					}
				}
			},

			statueRoom: {
				Exits: {
					roomWithSunOnFloor: {
						Name: "roomWithSunOnFloor",
						Age: Age.ADULT,
						Map: "Spirit Temple",
						LockedDoor: "Locked Door in Sun on Floor Room"
					},

					silverBlockMaze: {
						Name: "silverBlockMaze",
						Age: Age.CHILD,
						NeedsFire: true
					},

					fireBubbleRoom: {
						Name: "fireBubbleRoom",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},

					beamosRoom: {
						Name: "beamosRoom",
						LockedDoor: "Locked Door in Statue Room",
						Map: "Spirit Temple",
						Age: Age.ADULT,
						RequiredItems: [Items.HOOKSHOT]
					},

					roomRightOfLobby: {
						Name: "roomRightOfLobby",
						Age: Age.ADULT,
						RequiredItems: [Items.FAIRY_BOW, Items.FIRE_ARROW, Equipment.MAGIC, Equipment.MIRROR_SHIELD]
					}
				},

				ItemLocations: {
					"Chest in Center of Statue Room": {
						Name: "Chest in Center of Statue Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 176, y: 148, floor: "F2" },
						Age: Age.EITHER,
						Order: 8,
						AltOrder: 4,
						LongDescription: "Shoot the eye switch on the left side of the statue to spawn this chest.",
						RequiredChildItems: [Items.FAIRY_SLINGSHOT],
						RequiredAdultItems: [Items.FAIRY_BOW]
					},
					"Invisible Chest in Statue Room": {
						Name: "Invisible Chest in Statue Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 251, y: 100, floor: "F2" },
						Age: Age.ADULT,
						Order: 14,
						AltOrder: 10,
						LongDescription: "In the statue room, make your way to the southeast corner using the hookshot. In the northeast part of the room, there's an invisible chest. Hookshot or hover boots to it."
					},
					"Chest in Boxes in Statue Room": {
						Name: "Chest in Boxes in Statue Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 225, y: 115, floor: "F2" },
						Age: Age.ADULT,
						Order: 15,
						AltOrder: 11,
						LongDescription: "In the statue room, make your way to the southeast corner using the hookshot. Now get to the hand with the triforce and play Zelda's Lullaby. This will spawn the chest to the right of the statue, under a box.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					}
				}
			},

			silverBlockMaze: {
				Exits: {
					statueRoom: {
						Name: "statueRoom"
					}
				},

				ItemLocations: {
					//TODO: verify that adult can't get this (probabaly not because of where the eye switch is - the silver block blocks it)
					"Chest in Silver Block Maze": {
						Name: "Chest in Silver Block Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 174, y: 227, floor: "F2" },
						Age: Age.CHILD,
						Order: 9,
						AltOrder: 29,
						LongDescription: "From the statue room, use a fire item on the southern eye switch to get to the maze room. Navigate to the first hole and shoot the eye switch on the lower left wall to spawn the chest.",
						RequiredItems: [Items.FAIRY_SLINGSHOT]
					}
				}
			},

			fireBubbleRoom: {
				Exits: {
					silverGauntsIronKnuckle: {
						Name: "silverGauntsIronKnuckle",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door to Silver Gaunts Knuckle"
					}
				},

				ItemLocations: {
					"Chest in Fire Bubble Room": {
						Name: "Chest in Fire Bubble Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 80, y: 63, floor: "F3" },
						Age: Age.EITHER,
						Order: 10,
						AltOrder: 7,
						LongDescription: "From the statue room, you must play the song of time on the ledge near the small box, then reload the room so that the box spawns on the song of time block. With a series of song of time plays, you can move the box up to the switch on the statue's west-side hand. Go through the room and the hallway that unlocks.<br/><br/>Navigate around the room and push the two sun blocks that are next to each other into the light. This will spawn the chest."
					},
					"Skulltula in Fire Bubble Room": {
						Name: "Skulltula in Fire Bubble Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 68, y: 113, floor: "F3" },
						Age: Age.ADULT,
						Order: 13,
						AltOrder: 8,
						LongDescription: "In the fire bubble room, you must push the first sun block you see onto the light. You'll need to hit the crystal switches to make the fire disappear. This spawns a white platform that you can hookshot up to so that you can reach the skulltula.",
						IsAtShortDistance: true
					}
				}
			},

			silverGauntsIronKnuckle: {
				Exits: {
					silverGauntsStatueHand: {
						Name: "silverGauntsStatueHand"
					}
				},

				ItemLocations: {
					"Silver Gauntlets Chest": {
						Name: "Silver Gauntlets Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 103, y: 228, floor: "F3" },
						Age: Age.EITHER,
						Order: 11,
						AltOrder: 9,
						LongDescription: "Simply navigate to the door from the fire bubble room. Kill the Iron Knuckle in the room after the hallway, and proceed outside to get the chest."
					}
				}
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

				}
			},

			mirrorShieldKnuckle: {
				Exits: {
					lizalfosAndSunRoom: {
						Name: "lizalfosAndSunRoom"
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
					"Mirror Shield Chest": {
						Name: "Mirror Shield Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 247, y: 226, floor: "F3" },
						Age: Age.ADULT,
						Order: 19,
						AltOrder: 15,
						LongDescription: "From the room with the lizalfos and the sun, slash the chest that Navi is going crazy over to open the door. Kill the Floormaster in the next room, and the Iron Knuckle in the room after. The chest will spawn on the hand as you walk in."
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

			lizalfosAndSunRoom: {
				Exits: {
					mirrorShieldKnuckle: {
						Name: "mirrorShieldKnuckle"
					},

					beamosRoom: {
						Name: "beamosRoom"
					}
				},

				ItemLocations: {
					"Chest in Room With Lizalfos and Sun": {
						Name: "Chest in Room With Lizalfos and Sun",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 328, y: 105, floor: "F3" },
						Age: Age.ADULT,
						Order: 17,
						AltOrder: 13,
						LongDescription: "In the beamos room, the puzzle is to play the Song of Time to move the blocks so that the little box falls down onto one of the blocks. You then use that box to hold the switch down.<br/><br/>The chest is in plain sight in the room."
					},
					"Boss Key Chest": {
						Name: "Boss Key Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 321, y: 40, floor: "F3" },
						Age: Age.ADULT,
						Order: 18,
						AltOrder: 14,
						LongDescription: "In the room with the lizalfos and sun, play the Song of Time to move the block away from the light. Now, shine the light on the sun. Play the song again so you can go through the door. The chest is in that room.",
						RequiredSongs: [Songs.SONG_OF_TIME],
						RequiredItems: [Equipment.MIRROR_SHIELD]
					}
				}
			},

			beamosRoom: {
				Exits: {
					lizalfosAndSunRoom: {
						Name: "lizalfosAndSunRoom",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},

					movingWallRoom: {
						Name: "movingWallRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door in Beamos Room"
					}
				},

				ItemLocations: {
					"Chest in Beamos Room": {
						Name: "Chest in Beamos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 284, y: 77, floor: "F3" },
						Age: Age.ADULT,
						Order: 16,
						AltOrder: 12,
						LongDescription: "From the statue room, hookshot to the torch to get to the southeast side. Use a key to go in the top door. Kill the beamos to spawn the chest.",
						NeedsExplosives: true
					}
				}
			},

			roomRightOfLobby: {
				Exits: {
					boulderRoom: {
						Name: "boulderRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door Right of Lobby"
					}
				},

				ItemLocations: {
					"Skulltula in Sandy Room": {
						Name: "Skulltula in Sandy Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 235, y: 127, floor: "F1" },
						Age: Age.ADULT,
						Order: 22,
						AltOrder: 18,
						LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. The skulltula is on the ceiling."
					},
					"Chest in Sandy Room": {
						Name: "Chest in Sandy Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 226, y: 99, floor: "F1" },
						Age: Age.ADULT,
						Order: 23,
						AltOrder: 19,
						LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), go through the west door - be careful, though, as you can't get out if you don't have Zelda's Lullaby. Jump down and kill all the levers to spawn the chest. Hookshot to it from the top to get it."
					},
					"Bottom Right Chest in Lobby": {
						Name: "Bottom Right Chest in Lobby",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 203, y: 215, floor: "F1" },
						Age: Age.ADULT,
						Order: 24,
						AltOrder: 20,
						LongDescription: "At the statue room, light all 3 torches with fire arrows. Use your hookshot to get to the door that unlocks. In the next room, use your mirror shield on all 3 suns and kill the enemies. Navigate through the hallway. Collect all the silver rupees to spawn the chest - a couple of them are in the lobby under some rocks. Use your hammer to hit the rusted switch to make the water go away. Be careful, though, as you can't come back!",
						RequiredItems: [Items.MEGATON_HAMMER]
					}
				}
			},

			boulderRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula After Boulder Room": {
						Name: "Skulltula After Boulder Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 328, y: 77, floor: "F1" },
						Age: Age.ADULT,
						Order: 20,
						AltOrder: 16,
						LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the skulltula is inside on a wall.",
						Region: "boulderRoom",
						RequiredItems: [Items.MEGATON_HAMMER],
						RequiredSongs: [Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
					},
					"Chest After Boulder Room": {
						Name: "Chest After Boulder Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 319, y: 61, floor: "F1" },
						Age: Age.ADULT,
						Order: 21,
						AltOrder: 17,
						LongDescription: "From the room to the right of the lobby (see the Bottom Right Chest in Lobby item), use a key to go through the locked door. Hit the rusted switch with your hammer. Now, play the following songs in each of the opened cells in this order: Song of Time, Epona's Song, Sun's Song, Song of Storms, then Zelda's Lullaby. Enter the room that opens up to you - the chest is in this room.",
						Region: "boulderRoom",
						RequiredItems: [Items.MEGATON_HAMMER],
						RequiredSongs: [Songs.SONG_OF_TIME, Songs.EPONAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.ZELDAS_LULLABY]
					}
				}
			},

			movingWallRoom: {
				Exits: {
					skulltulaAndKnuckleRoom: {
						Name: "skulltulaAndKnuckleRoom",
						Map: "Spirit Temple",
						LockedDoor: "Locked Door After Moving Wall"
					},

					mirrorMaze: {
						Name: "mirrorMaze",
						RequiredSongs: [Songs.ZELDAS_LULLABY],
						RequiredItems: [Items.MEGATON_HAMMER]
					}
				},

				ItemLocations: {

				}
			},

			skulltulaAndKnuckleRoom: {
				Exits: {},
				ItemLocations: {
					"West Skulltula in Iron Knuckle Room": {
						Name: "West Skulltula in Iron Knuckle Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 265, y: 80, floor: "F4" },
						Age: Age.ADULT,
						Order: 25,
						AltOrder: 21,
						LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
					},
					"North Skulltula in Iron Knuckle Room": {
						Name: "North Skulltula in Iron Knuckle Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 293, y: 26, floor: "F4" },
						Age: Age.ADULT,
						Order: 26,
						AltOrder: 22,
						LongDescription: "After navigating up the moving wall room - unlock the door you run into at the top. Lure the Iron Knuckle so that he breaks the pillars blocking the skulltula."
					}
				}
			},

			mirrorMaze: {
				Exits: {
					bossRoom: {
						Name: "bossRoom",
						RequiredItems: [Equipment.MIRROR_SHIELD],
						CustomRequirement: function(age) {
							return hasBossKey("Spirit Temple");
						}
					}
				},

				ItemLocations: {
					"Invisible Chest in Mirror Maze": {
						Name: "Invisible Chest in Mirror Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 170, y: 216, floor: "F4" },
						Age: Age.ADULT,
						Order: 27,
						AltOrder: 23,
						LongDescription: "From the beamos room, take the southeast door to get to the wall room. Grab all the silver rupees to unlock the door at the top. Play Zelda's Lullaby at the trifoce to unlock the next room. Hammer the rusted switch in the northwest corner of the next room to get to the mirror maze.<br/><br/>Navigate to the very end of the maze. There's an invisible chest by the bars."
					}
				}
			},

			bossRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Container": {
						Name: "Heart Container",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 173, y: 63, floor: "F2" },
						Age: Age.ADULT,
						Order: 28,
						AltOrder: 24,
						LongDescription: "To reach the boss room, start at the mirror maze. Shine the light from the first mirror onto the sun above the first archway - this will spawn a second mirror. Now, push the mirrors so that the light travels to the end. Go to the giant mirror that the light is now traveling to, and reflect the light unto the sun on the wall. After the cutscene, shine the light into the statue's face. Hookshot the grate to get to the boss room.<br/><br/>To defeat Twinrova, reflect one of the sister's shots at the other one. Do this four times to get to the second phase. Now, you must charge your shield with 3 of the same kind of attack. When you do, your shield will shoot it at Twinrova, stunning her. Go hit her! As usual, a jumpslash (Z + A) then crouch stabs (R + spam B) do the most damage."
					},
					"Blue Warp": {
						Name: "Blue Warp",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 187, y: 63, floor: "F2" },
						Age: Age.ADULT,
						Order: 29,
						AltOrder: 25,
						LongDescription: "Step in the blue warp after defeating the boss to receive a medallion."
					}
				}
			}
		}
	},

	"Ice Cavern": {
		Abbreviation: "ICE",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
		Regions: {
			main: {
				Exits: {
					afterFirstRoom: {
						Name: "afterFirstRoom",
						CustomRequirement: function(age) {
							let canKillFreezards = Data.hasSwordWeapon(age) || Data.canUseFireItem(age);
							return canKillFreezards && Data.canHitSwitchAtShortDistance(age) && Data.hasBottleOrBlueFire();
						}
					},
					Exit: {
						OwExit: OwExits["Ice Cavern"]["Exit"]
					}
				},
				ItemLocations: {}
			},

			afterFirstRoom: {
				Exits: {
					northRoom: {
						Name: "northRoom",
						Age: Age.ADULT
					}
				},

				ItemLocations: {
					"Chest in Red Ice": {
						Name: "Chest in Red Ice",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 248, y: 147 },
						Age: Age.EITHER,
						Order: 1,
						LongDescription: "Navigate through the cavern until you get to the first room with blue fire. Hit the switch to spawn the chest under the red ice. Melt it with blue fire to gain access to it."
					},
					"Skulltula Under Stairs in Big Room": {
						Name: "Skulltula Under Stairs in Big Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 115, y: 122 },
						Age: Age.EITHER,
						Order: 5,
						LongDescription: "Across the room from the first room with blue fire, melt the ice wall. Navigate through the hallway to gain access to this room. Turn around once inside, and hit the switch posing as a stalagtite. This will make some stairs vanish near the exit of the room so you can grab the token. Be sure to hit the switch again so you can leave."
					},
					"Skulltula on Ledge in Big Room": {
						Name: "Skulltula on Ledge in Big Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 127, y: 66 },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "This skulltula is on the ledge to your right in the big room. Either play the scarecrow's song and hook it, or make use of a ground jump to get up there.",
						CustomRequirement: function(age) {
							return Data.canHookScarecrow(age) ||  Data.canGroundJumpWithBomb(age);
						}
					},
					"Chest at End": {
						Name: "Chest at End",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 127, y: 182 },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "Defeat the stalfos in this room to spawn the chest."
					},
					"Serenade of Water": {
						Name: "Serenade of Water",
						ItemGroup: ItemGroups.SONG,
						MapInfo: { x: 122, y: 177 },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "Obtained after opening the chest in this room."
					}
				}
			},

			northRoom: {
				Exits: {},
				ItemLocations: {
					"Heart Piece in North Room": {
						Name: "Heart Piece in North Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 228, y: 22 },
						Age: Age.ADULT,
						Order: 2,
						LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>On the floor, there's a switch embedded in the ice. Use an explosive to hit it. This will make the block around the heart piece item disappear.",
						NeedsExplosives: true //TODO: does din's fire work?
					},
					"Skulltula in North Room": {
						Name: "Skulltula in North Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 192, y: 45 },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. Proceed through the hallway.<br/><br/>Play the song of time on the top near the pillar with the skulltula to spawn a block. Climb it, and play the song again. Use blue fire to melt the ice to gain access to the skulltula.",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},
					"Chest in North Room": {
						Name: "Chest in North Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 188, y: 20 },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "To the right of entrance of the first room with blue fire, climb up the ledge and melt the red ice wall. In the room at the end of the hallway, you'll find the chest on one of the ledges after some parkour."
					}
				}
			}
		}
	},

	"Bottom of the Well": {
		Abbreviation: "WELL",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
        Floors: ["F1", "B1"],
        StartingFloorIndex: 0,
		Regions: {
			main: {
				Exits: {
					centerRoom: {
						Name: "centerRoom",
						CustomRequirement: function(age) {
							let canGetToFromSideRoom = Data.hasExplosives() && Data.hasSwordWeapon(age); // Jumpslash in
							return canGetToFromSideRoom || Data.canPlaySong(Songs.ZELDAS_LULLABY);
						}
					},

					drainedWater: {
						Name: "drainedWater",
						CustomRequirement: function(age) {
							return Data.canHitSwitchAtShortDistance(age);
						}
					},

					coffinRoom: {
						Name: "coffinRoom",
						Map: "Bottom of the Well",
						LockedDoor: "Locked Door in West Main Room",
						NeedsExplosives: true
					},

					Exit: {
						OwExit: OwExits["Bottom of the Well"]["Exit"]
					}
				},

				ItemLocations: {
					// Locked Doors
					"Locked Door in West Main Room": {
						Name: "Locked Door in West Main Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 73, y: 137, floor: "F1" },
						Age: Age.EITHER,
						Order: 0.1,
						LongDescription: "This is the door on the west side of the main room.",
						KeyRequirement: function(age) {
							return { min: 1, max: 2 };
						}
					},

					"Locked Door in Floor Master Room": {
						Name: "Locked Door in Floor Master Room",
						ItemGroup: ItemGroups.LOCKED_DOOR,
						Regions: ["main"],
						MapInfo: { x: 288, y: 123, floor: "F1" },
						Age: Age.EITHER,
						Order: 1.1,
						LongDescription: "This is the locked door you find after the room with the floormasters.",
						CustomRequirement: function(age) {
							return Data.canHitSwitchAtShortDistance(age);
						},
						KeyRequirement: function(age) {
							return { min: 1, max: 2 };
						}
					},
				}
			},

			centerRoom: {
				Exits: {
					// Technically this door isn't here, but it's useless to open it if you can't get here so we require it
					basementCenter: {
						Name: "basementCenter",
						Map: "Bottom of the Well",
						LockedDoor: "Locked Door in Floor Master Room",
						NeedsExplosives: true
					}
				},

				ItemLocations: {
					"Center Chest": {
						Name: "Center Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 194, y: 127, floor: "F1" },
						Age: Age.CHILD,
						Order: 2,
						LongDescription: "Navigate to the back of the main room and play Zelda's Lullaby at the triforce. This will open a bunch of gates. Proceed behind you to the center room with the chest.<br/><br/>Alternatively, you can bomb the rocks near the sourtheast corner of the main room. Sidehop then jumpslash over the hole in the ground to get to the center area."
					},
					"Skulltula in Grave Room": {
						Name: "Skulltula in Grave Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 159, y: 99, floor: "F1" },
						Age: Age.CHILD,
						Order: 3,
						LongDescription: "Bomb some rocks near the southeast corner of the main room and press the switch to unbar a door. Alternatively, you can make your way to the center room and sidehop and jumpslash to get into this area.<br/><br/>Enter the door that was just unbarred. The skulltula is under the gravestone. Be careful of invisible enemies."
					},
					"Freestanding Item Near Center Room": {
						Name: "Freestanding Item Near Center Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 216, y: 80, floor: "F1" },
						Age: Age.CHILD,
						Order: 4,
						LongDescription: "From the center room, activate the switch in the northeast section to unbar a door. Enter it, and navigate clockwise around the room to get to the item.",
						CustomRequirement: function(age) {
							return Data.canHitSwitchAtShortDistance(age);
						}
					},
					"Skulltula in Basement": {
						Name: "Skulltula in Basement",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 51, y: 43, floor: "B1" },
						Age: Age.CHILD,
						Order: 8,
						LongDescription: "To get to the basement, you can fall down a hole in the center room. Navigate to the northeastern part of the basement to get to the skulltula. Watch out for invisible giant skulltulas on the way."
					}
				}
			},

			drainedWater: {
				Exits: {},
				ItemLocations: {
					"Dead Hand Chest": {
						Name: "Dead Hand Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 317, y: 238, floor: "F1" },
						Age: Age.CHILD,
						Order: 5,
						LongDescription: "Drain the water by hitting the switch in the back of the main room. Navigate back to the entrance and enter the crawl space leading to the Dead Hand room like normal. Kill him to spawn the chest.",
						CustomRequirement: function(age) {
							let swordRequired = Settings.RandomizerSettings.deadHandNeedsSword;
							if (swordRequired) { return Equipment.KOKIRI_SWORD.playerHas; }
							return Data.hasSwordWeapon(age);
						}
					},
					"Freestanding Item in Dead Hand Room": {
						Name: "Freestanding Item in Dead Hand Room",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 333, y: 229, floor: "F1" },
						Age: Age.CHILD,
						Order: 6,
						LongDescription: "In the Dead Hand room, bomb the back left rubble to reveal the item."
					}
				}
			},

			basementCenter: {
				Exits: {},
				ItemLocations: {
					"Chest in Basement": {
						Name: "Chest in Basement",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 295, y: 235, floor: "B1" },
						Age: Age.CHILD,
						Order: 7,
						LongDescription: "Crawl through the crawlspace in the back right corner of the main room. Hit the switch in the eye of the picture on the wall to open the door. Ignore the enemies and open the locked door. Bomb the ruble in the next room to reveal a switch. Navigate to the center and fall in the grate that opened.<br/><br/>Press the switch to spawn the chest. Navigate to the southeast part of the basement to get to the chest."
					}
				}
			},

			coffinRoom: {
				Exits: {},
				ItemLocations: {
					"Skulltula in Coffin Room": {
						Name: "Skulltula in Coffin Room",
						ItemGroup: ItemGroups.SKULLTULA,
						MapInfo: { x: 18, y: 128, floor: "F1" },
						Age: Age.CHILD,
						Order: 1,
						LongDescription: "Navigate to the left room in the main area. Unlock the door, then navigate to the back right section of the room. The skulltula is hiding in the corner behind a pillar."
					}
				}
			}
		}
	},

	"Training Grounds": {
		Abbreviation: "GTG",
        MapGroup: MapGroups.DUNGEONS,
        IsMasterQuest: true,
		Regions: {
			main: {
				Exits: {
					armosRoom: {
						Name: "armosRoom",
						RequiredChildItems: [Items.FAIRY_SLINGSHOT],
						RequiredAdultItems: [Items.FAIRY_BOW]
					},

					leftArea: {
						Name: "leftArea",
						NeedsFire: true
					},

					Exit: {
						OwExit: OwExits["Training Grounds"]["Exit"]
					}

					//TODO: verify you can't get to bigLavaRoom via the side path of the maze (barred doors?)
				},

				ItemLocations: {
					"Left Chest by Entrance": {
						Name: "Left Chest by Entrance",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 152, y: 233 },
						Age: Age.EITHER,
						Order: 1,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This chest is to the left when you first enter."
					},
					"Right Chest by Entrance": {
						Name: "Right Chest by Entrance",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 175, y: 233 },
						Age: Age.EITHER,
						Order: 2,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This chest is to the right when you first enter."
					},
					"Left Maze Path After Door 1": {
						Name: "Left Maze Path After Door 1",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 152, y: 192 }, //TODO; is this right?
						Age: Age.EITHER,
						Order: 3,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "From the main maze entrance, take the first left door. Climb the grate to your left up to the chest."
					},
					"Left Maze Path After Door 2": {
						Name: "Left Maze Path After Door 2",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 130, y: 163 },
						Age: Age.EITHER,
						Order: 4,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This chest is after the second door in the left maze path."
					},
					"Left Maze Path After Door 4": {
						Name: "Left Maze Path After Door 4",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 142, y: 136 },
						Age: Age.EITHER,
						Order: 5,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This chest is after the fourth door in the left maze path."
					},
					"Left Maze Path After Door 5": {
						Name: "Left Maze Path After Door 5",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 148, y: 137 },
						Age: Age.EITHER,
						Order: 6,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "This chest is after the fifth door in the left maze path.",
						CustomRequirement: function(age) {
							return getKeyCount("Training Grounds") >= 1;
						}
					}
				}
			},

			armosRoom: {
				Exits: {
					bigLavaRoom: {
						Name: "bigLavaRoom",
						RequiredChoiceOfChildItems: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
					}
				},

				ItemLocations: {
					"Chest in Armos Room": {
						Name: "Chest in Armos Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 257, y: 244 },
						Age: Age.EITHER,
						Order: 17,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "Either get here after shooting the eye in the starting room, or going around form the big lava room. Kill all the enemies to spawn the chest.",
						RequiredChoiceOfChildItems: [Items.DEKU_STICK, Items.BOMB, Items.BOMBCHU]
					}
				}
			},

			leftArea: {
				Exits: {
					afterRupeeRoom: {
						Name: "afterRupeeRoom",
						Age: Age.ADULT,
						RequiredItems: [Items.HOOKSHOT]
					}
				},

				ItemLocations: {
					"Sandy Iron Knuckle Chest": {
						Name: "Sandy Iron Knuckle Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 65, y: 225 },
						Age: Age.EITHER,
						Order: 7,
						UseAdultAge: function() { 
							if (Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
							return !(Settings.GlitchesToAllow.cuccoJump && Settings.GlitchesToAllow.gtgChildAllowed); 
						},
						LongDescription: "From the main entrance, light the torches and go through the door that unlocks. Kill the Iron Knuckle to spawn the chest."
					}
				}
			},

			afterRupeeRoom: {
				Exits: {
					roomBehindSilverBlock: {
						Name: "roomBehindSilverBlock",
						Age: Age.ADULT,
						RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
					},

					spinningRoom: {
						Name: "spinningRoom",
						RequiredSongs: [Songs.SONG_OF_TIME],
						CustomRequirement: function(age) {
							return Data.hasBottleOrBlueFire();
						}
					}
				},

				ItemLocations: {
					"Chest in Room With Silver Block": {
						Name: "Chest in Room With Silver Block",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 89, y: 84 },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "Enter the room after the iron knuckle room. Collect the rupees within the time limit and move on to the next room. Defeat the enemies within the time limit to spawn the chest."
					}
				}
			},

			roomBehindSilverBlock: {
				Exits: {},
				ItemLocations: {
					"Chest in Room Behind Silver Block": {
						Name: "Chest in Room Behind Silver Block",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 68, y: 17 },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "Get to the room with the silver block. Push it into the hole, then enter the next room. Kill the enemies to spawn the chest."
					}
				}
			},

			spinningRoom: {
				Exits: {
					armosRoom: {
						Name: "armosRoom",
						Age: Age.ADULT,
						RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}]
					},

					bigLavaRoom: {
						Name: "bigLavaRoom",
						Age: Age.ADULT,
						CustomRequirement: function(age) {
							return Items.HOOKSHOT.currentUpgrade >= 2 || 
								(Data.canUseFireArrows(age) && Equipment.HOVER_BOOTS.playerHas);
						}
					},

					backOfMaze: {
						Name: "backOfMaze",
						Age: Age.ADULT,
						RequiredItems: [Items.MEGATON_HAMMER, {item: Items.HOOKSHOT, upgradeString: "2"}]
					},

					iceArrowsRoom: {
						Name: "iceArrowsRoom",
						Age: Age.ADULT,
						RequiredItems: [Items.MEGATON_HAMMER, Items.HOOKSHOT],
						CustomRequirement: function(age) {
							return getKeyCount("Training Grounds") >= 3; //TODO: gate clip will mean you don't need any keys!
						}
					}
				},

				ItemLocations: {
					"Chest in Spinning Room": {
						Name: "Chest in Spinning Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 169, y: 91 }, //TODO: is this where it actually spawns?
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Jump to the spinning ring and shoot the eyes of the statues to spawn the chest.",
						Region: "spinningRoom",
						RequiredItems: [Items.FAIRY_BOW]
					},
					"Side Fire Iron Knuckle Chest": {
						Name: "Side Fire Iron Knuckle Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 256, y: 76 },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Kill the enemies within the time limit to spawn the chest."
					},
					"Center Fire Iron Knuckle Chest": {
						Name: "Center Fire Iron Knuckle Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 225, y: 90 },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "Get to the room with the silver block. Get the blue fire, then play the Song of Time by where the opening usually is to get up. Melt the ice wall and continue down. Continue past the circle fire room into the next room. Activate the switch above the door to spawn the chest. Step on the swith on one of the walls to remove the fire.",
						CustomRequirement: function(age) {
							return Data.canHitSwitchAtShortDistance(age);
						}
					}
				}
			},

			bigLavaRoom: {
				Exits: {
					waterRoom: {
						Name: "waterRoom",
						Age: Age.ADULT,
						RequiredItems: [Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Items.FAIRY_BOW.playerHas || Data.canUseFireItem(age);
						}
					}
				},
				ItemLocations: {}
			},

			backOfMaze: {
				Exits: {},
				ItemLocations: {
					"Close Chest in Back of Maze": {
						Name: "Close Chest in Back of Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 177, y: 165 },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "After defeating the enemies in the room with the fire circle and Iron Knuckle, proceed through the door. Hammer the rusted switch, then longshot to the pillar that appears. Go through the hall - the chest is straight ahead."
					},
					"Far Chest in Back of Maze": {
						Name: "Far Chest in Back of Maze",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 0, y: 0 },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "After getting the close chest from the back of the maze, continue along counter-clockwise to get the next chest (there are no doors to go through)."
					}
				}
			},

			waterRoom: {
				Exits: {},
				ItemLocations: {
					"Chest in Water Room": { 
						Name: "Chest in Water Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 297, y: 160 },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "From the big lava room, longshot to the torch by the side door. Light it with a fire item or with your bow from the lit torch, then use your hover boots to collect the rupees. You may need to collect half of them then come back and light the torch again.<br/><br/>Once inside the water room, use your iron boots and longshot to collect all the rupees in the water. The chest will spawn at the top.",
						RequiredItems: [Equipment.IRON_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.gtgNoZoraTunic || Equipment.ZORA_TUNIC.playerHas;
						}
					}
				}
			},

			iceArrowsRoom: {
				Exits: {},
				ItemLocations: {
					"Chest Spawned from Maze Center": {
						Name: "Chest Spawned from Maze Center",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 166, y: 132 },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "First, spawn the chest by making your way to the center of the maze. Break the box, then hammer the rusted switch to spawn the chest.<br/><br/>In the spinning room, hookshot to the target in the center of the eye statues. From there, hookshot the crystal switch to unbar the door. Go in and claim the chest."
					}
				}
			}
		}
	},

	"Ganon's Castle": {
        Abbreviation: "GANC",
        MapGroup: MapGroups.DUNGEONS,
        ExcludeFromShuffle: true,
        IsMasterQuest: true,
        Floors: ["MN", "FST", "FIR", "WTR", "SHW", "SPT", "LIT"],
        StartingFloorIndex: 0,
        Regions: {
			main: {
				Exits: {
					spiritRoom2: {
						Name: "spiritRoom2",
						RequiredItems: [Items.MEGATON_HAMMER]
					},

					forestRoom3: {
						Name: "forestRoom3",
						RequiredSongs: [Songs.SONG_OF_TIME]
					},

					waterRoom: {
						Name: "waterRoom",
						CustomRequirement: function(age) {
							return Data.hasBottleOrBlueFire();
						}
					},

					shadowBackSection: {
						Name: "shadowBackSection",
						RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, Items.HOOKSHOT],
						RequiredItems: [Equipment.MAGIC, Items.LENS_OF_TRUTH] // Without lens is really hard, so not including that trick for now
					},

					fireRoom: {
						Name: "fireRoom",
						RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}], // TODO: are these item sets accurate?
						RequiredChoiceOfItems: [Items.HOOKSHOT, Equipment.HOVER_BOOTS],
						CustomRequirement: function(age) {
							return Settings.GlitchesToAllow.fireNoGoronTunic || Equipment.GORON_TUNIC.playerHas;
						}
					},

					lightRoom1: {
						Name: "lightRoom1",
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
					"Middle Scrub in Secret Room": {
						Name: "Middle Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 248, y: 248, floor: "MN" },
						Age: Age.ADULT,
						Order: 3,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Middle Right Scrub in Secret Room": {
						Name: "Middle Right Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 254, y: 241, floor: "MN" },
						Age: Age.ADULT,
						Order: 4,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Right Scrub in Secret Room": {
						Name: "Right Scrub in Secret Room",
						ItemGroup: ItemGroups.SCRUB,
						MapInfo: { x: 262, y: 233, floor: "MN" },
						Age: Age.ADULT,
						Order: 5,
						LongDescription: "Enter the main room. Walk forward and jump off the ledge and turn around. The wall you're facing is fake - go through it to find the scrubs."
					},
					"Forest Freestanding Item": {
						Name: "Forest Freestanding Item",
						ItemGroup: ItemGroups.FREESTANDING,
						MapInfo: { x: 165, y: 204, floor: "FST" },
						Age: Age.ADULT,
						Order: 12,
						LongDescription: "After dealing with the enemies, wait for the fan to stop spinning, then hookshot up to the ledge. The item is up there.",
						RequiredItems: [Items.HOOKSHOT]
					},
					"Forest Close Chest": {
						Name: "Forest Close Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 168, y: 170, floor: "FST" },
						Age: Age.ADULT,
						Order: 13,
						LongDescription: "In the second room, stand on the upper left side of the first platform. Shoot the eye switch on the back right corner of the room to spawn the chest.",
						RequiredItems: [Items.FAIRY_BOW]
					},
					"Forest Far Chest": {
						Name: "Forest Far Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 153, y: 147, floor: "FST" },
						Age: Age.ADULT,
						Order: 14,
						LongDescription: "In the second room, shoot the eye switch at the back left side of the room with a fire arrow to spawn the chest. Alternatively, you can also use Din's fire to hit it once at the back of the room. To get across, you can jump and use the wind from the fan if you have no hover boots.",
						NeedsFire: true
					},
					"Water Chest in First Room": {
						Name: "Water Chest in First Room",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 163, y: 233, floor: "WTR" },
						Age: Age.ADULT,
						Order: 15,
						LongDescription: "The chest is in the red ice on the left side of the room. You can roll into it and spam A to open the chest through the ice.<br/><br/>If you want to melt it, attack the weird hand thing on the right side of the room to lower the water around the blue fire."
					},
					"Shadow Chest on Small Platform": {
						Name: "Shadow Chest on Small Platform",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 147, y: 227, floor: "SHW" },
						Age: Age.ADULT,
						Order: 16,
						LongDescription: "First, shoot the bomb flower on the left side of the room. Now, use hover boots or your hookshot to reach the chest.",
						RequiredItems: [Items.FAIRY_BOW],
						RequiredChoiceOfItems: [Equipment.HOVER_BOOTS, Items.HOOKSHOT]
					},
					"Boss Key Chest in Center": {
						Name: "Boss Key Chest in Center",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 165, y: 95, floor: "MN" },
						Age: Age.ADULT,
						Order: 19,
						IsPostWalkCheck: true,
						LongDescription: "Complete all the trials. Now go up the center of the castle - the boss key will spawn after you clear the stalfos room.",
						CustomRequirement: function(age) {
							let canUseLightArrows = Items.FAIRY_BOW.playerHas && Items.LIGHT_ARROW.playerHas && Equipment.MAGIC.playerHas;
							if (!canUseLightArrows || getKeyCount("Ganon's Castle") < 3) { return false; }
							
							let canDoForest = Data.canAccessMap(age, "Ganon's Castle", "forestRoom3");
							let canDoFire = Data.canAccessMap(age, "Ganon's Castle", "fireRoom");
							let canDoWater = Data.canAccessMap(age, "Ganon's Castle", "waterRoom");
							let canDoShadow = Data.canAccessMap(age, "Ganon's Castle", "shadowBackSection");
							let canDoSpirit = Data.canAccessMap(age, "Ganon's Castle", "spiritRoom4");
							
							let lightReqs = Data.hasExplosives() && Items.HOOKSHOT.playerHas;
							let canDoLight = lightReqs && Data.canAccessMap(age, "Ganon's Castle", "lightRoom1");
							
							return canDoForest && canDoFire && canDoWater && canDoShadow && canDoSpirit && canDoLight;
						}
					}
				}
			},

			spiritRoom2: {
				Exits: {
					spiritRoom3: {
						Name: "spiritRoom3",
						RequiredItems: [Items.BOMBCHU]
					}
				},

				ItemLocations: {
					"Spirit Chest After Armos": {
						Name: "Spirit Chest After Armos",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 241, y: 184, floor: "SPT" },
						Age: Age.ADULT,
						Order: 6,
						LongDescription: "Hammer jumpslash one of the corners of the central platform to simply hit the switch in the middle. Enter the next room - the chest is straight ahead."
					}
				}
			},

			spiritRoom3: {
				Exits: {
					spiritRoom4: {
						Name: "spiritRoom4",
						RequiredItems: [Equipment.MIRROR_SHIELD],
						CustomRequirement: function(age) {
							return Data.canUseFireArrows(age);
						}
					}
				},

				ItemLocations: {
					"Spirit Invisible Chest": {
						Name: "Spirit Invisible Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 239, y: 120, floor: "SPT" },
						Age: Age.ADULT,
						Order: 7,
						LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. This chest is invisible in the corner of the room in front of the door."
					}
				}
			},

			spiritRoom4: {
				Exits: {},
				ItemLocations: {
					"Spirit Sun Chest 1": {
						Name: "Spirit Sun Chest 1",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 169, y: 105, floor: "SPT" },
						Age: Age.ADULT,
						Order: 8,
						LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
					},
					"Spirit Sun Chest 2": {
						Name: "Spirit Sun Chest 2",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 169, y: 132, floor: "SPT" },
						Age: Age.ADULT,
						Order: 9,
						LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
					},
					"Spirit Sun Chest 3": {
						Name: "Spirit Sun Chest 3",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 143, y: 132, floor: "SPT" },
						Age: Age.ADULT,
						Order: 10,
						LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
					},
					"Spirit Sun Chest 4": {
						Name: "Spirit Sun Chest 4",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 143, y: 105, floor: "SPT" },
						Age: Age.ADULT,
						Order: 11,
						LongDescription: "After getting the first chest, drop a bombchu so that it travels over the cell and hits the switch on the other side. Proceed until you've killed all the redeads. Shoot the ceiling with a fire arrow to reveal the light. Shine it on the corresponding sun to get the chest."
					}
				}
			},

			forestRoom3: {
				Exits: {},
				ItemLocations: {}
			},

			waterRoom: {
				Exits: {},
				ItemLocations: {}
			},

			shadowBackSection: {
				Exits: {},
				ItemLocations: {
					"Shadow Chest in Back": {
						Name: "Shadow Chest in Back",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 186, y: 103, floor: "SHW" },
						Age: Age.ADULT,
						Order: 17,
						LongDescription: "Use your lens of truth to navigate across the room. There's an invisible moving invisible platform you'll need to use. After the beamos platform, turn around and shoot the eye switch to spawn the chest.",
						RequiredItems: [Items.FAIRY_BOW]
					}
				}
			},

			fireRoom: {
				Exits: {},
				ItemLocations: {}
			},

			lightRoom1: {
				Exits: {},
				ItemLocations: {
					"Light Zelda's Lullaby Chest": {
						Name: "Light Zelda's Lullaby Chest",
						ItemGroup: ItemGroups.CHEST,
						MapInfo: { x: 194, y: 197, floor: "LIT" },
						Age: Age.ADULT,
						Order: 18,
						LongDescription: "Use your gauntlets to gain access to this area. In the first room, kill all the enemies. In the next room, play Zelda's Lullaby to spawn the chest.",
						RequiredSongs: [Songs.ZELDAS_LULLABY]
					}
				}
			}
		}
	}
};
