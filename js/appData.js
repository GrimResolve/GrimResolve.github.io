function appData() {
    return {
        getStatOrder: () => ['movement', 'weaponSkill', 'ballisticSkill', 'strength', 'toughness', 'wounds', 'initiative', 'attacks', 'leadership', 'save', 'invulnSave'],
        nextModelId: 6, // Start counting from the next available ID
        models: [
            {
                id: 1, // Added ID
                name: 'Imperial Guardsman',
                movement: 6,
                weaponSkill: 3,
                ballisticSkill: '4+',
                strength: 3,
                toughness: 3,
                wounds: 1,
                initiative: 3,
                attacks: 1,
                leadership: 7,
                save: '5+',
                invulnSave: '-',
                assignedArmoryItemIds: ["Lasgun"]
            },
            {
                id: 2, // Added ID
                name: 'Space Marine',
                movement: 6,
                weaponSkill: 4,
                ballisticSkill: '3+',
                strength: 4,
                toughness: 4,
                wounds: 1,
                initiative: 4,
                attacks: 1,
                leadership: 8,
                save: '3+',
                invulnSave: '-',
                assignedArmoryItemIds:  ["Bolter"] // Use names for default assignment
            },
            {
                id: 3, // Added ID
                name: 'Terminator',
                movement: 5,
                weaponSkill: 4,
                ballisticSkill: '3+',
                strength: 4,
                toughness: 4,
                wounds: 1,
                initiative: 1,
                attacks: 2,
                leadership: 8,
                save: '2+',
                invulnSave: '5+',
                assignedArmoryItemIds: ["Storm Bolter", "Power Fist"] // Use names for default assignment
            },
            {
                id: 4, // Added ID
                name: 'Ork Warboy',
                movement: 5,
                weaponSkill: 4,
                ballisticSkill: '5+',
                strength: 3,
                toughness: 4,
                wounds: 1,
                initiative: 2,
                attacks: 2,
                leadership: 6,
                save: '6+',
                invulnSave: '-',
                assignedArmoryItemIds: ["Choppa"]
            },
            {
                id: 5, // Added ID
                name: 'Eldar Guardian',
                movement: 6,
                weaponSkill: 4,
                ballisticSkill: '3+',
                strength: 3,
                toughness: 3,
                wounds: 1,
                initiative: 5,
                attacks: 1,
                leadership: 8,
                save: '5+',
                invulnSave: '-',
                assignedArmoryItemIds: ["Shuriken Catapult"]
            }
        ],
        selectedModel: null,
        showPointConfig: true,
        currentStat: 'weights',
        useRelativePoints: true, // Default to relative points
        relativePointsBase: 5, // Default normalization value
        baseModelCost: 10, // Default base cost for all models
        
        // -- Removed Scenario Simulation Data --
        // scenarioConfig: {
        //     meleeAttack: { targetIndex: -1 }
        // },

        // ++ Added New Scenario Structure ++
        scenarios: [], // Array to hold defined scenario objects
        selectedScenarioId: null, // ID of the scenario currently being edited

        // ++ Added View Control ++
        currentView: 'models', // 'models', 'scenarios', or 'armory'

        // ++ Armory Items Data ++
        nextArmoryItemId: 1,
        armoryItems: [], // Array to hold armory item objects
        selectedArmoryItemId: null, // ID of the item being edited
        armorySearchTerm: '', // ++ Added for search filter ++

        // ++ Add Equipment Search State ++
        equipmentSearchTerm: '',

        // Point value lookup tables for each stat
        pointValueLookups: {
            movement: {
                1: -2,
                2: -1,
                3: 0,
                4: 1,
                5: 2,
                6: 3,
                7: 4,
                8: 5,
                9: 6,
                10: 7,
                11: 8,
                12: 9
            },
            weaponSkill: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10
            },
            ballisticSkill: {
                '2+': 12,
                '3+': 9,
                '4+': 6,
                '5+': 3,
                '6+': 1,
                '-': 0
            },
            strength: {
                1: -1,
                2: 0,
                3: 1,
                4: 2,
                5: 5,
                6: 8,
                7: 11,
                8: 12,
                9: 13,
                10: 14
            },
            toughness: {
                1: -5,
                2: -2,
                3: 1,
                4: 4,
                5: 7,
                6: 10,
                7: 13,
                8: 16,
                9: 19,
                10: 22
            },
            wounds: {
                1: 0,
                2: 5,
                3: 10,
                4: 15,
                5: 20,
                6: 25,
                7: 30,
                8: 35,
                9: 40,
                10: 45
            },
            initiative: {
                1: -3,
                2: -1,
                3: 0,
                4: 1,
                5: 3,
                6: 5,
                7: 7,
                8: 10,
                9: 13,
                10: 16
            },
            attacks: {
                1: 1,
                2: 4,
                3: 8,
                4: 12,
                5: 16,
                6: 20,
                7: 24,
                8: 28,
                9: 32,
                10: 36
            },
            leadership: {
                1: -5,
                2: -4,
                3: -3,
                4: -2,
                5: -1,
                6: 0,
                7: 1,
                8: 2,
                9: 3,
                10: 4
            },
            save: {
                '2+': 16,
                '3+': 8,
                '4+': 4,
                '5+': 2,
                '6+': 1,
                '-': 0
            },
            invulnSave: {
                '2+': 100,
                '3+': 50,
                '4+': 20,
                '5+': 10,
                '6+': 5,
                '-': 0
            }
        },

        // Add stat multipliers, defaulting to 1.0
        statMultipliers: {
            movement: 1.0, weaponSkill: 1.0, ballisticSkill: 1.0, strength: 1.0,
            toughness: 1.0, wounds: 1.0, initiative: 1.0, attacks: 1.0,
            leadership: 1.0, save: 1.5, invulnSave: 1.0
        },

        // Calculate background color based on multiplier value
        getMultiplierColor(value) {
            // Define our color range
            const colors = {
                0: { r: 227, g: 235, b: 190 },    // Lightest yellow at 0
                1: { r: 145, g: 225, b: 170 },     // Medium green at 1
                2: { r: 40, g: 215, b: 60 }       // Darkest green at 2
            };
            
            // Cap the value between 0 and 2
            const clampedValue = Math.max(0, Math.min(2, value));
            
            // Determine which color pair to interpolate between
            let lowerColor, upperColor, lowerValue, upperValue;
            
            if (clampedValue <= 1) {
                lowerValue = 0;
                upperValue = 1;
                lowerColor = colors[0];
                upperColor = colors[1];
            } else {
                lowerValue = 1;
                upperValue = 2;
                lowerColor = colors[1];
                upperColor = colors[2];
            }
            
            // Calculate interpolation factor
            const factor = (clampedValue - lowerValue) / (upperValue - lowerValue);
            
            // Interpolate RGB values
            const r = Math.round(lowerColor.r + factor * (upperColor.r - lowerColor.r));
            const g = Math.round(lowerColor.g + factor * (upperColor.g - lowerColor.g));
            const b = Math.round(lowerColor.b + factor * (upperColor.b - lowerColor.b));
            
            // Return RGB color string
            return `rgb(${r}, ${g}, ${b})`;
        },

        // Initialize the component
        init() {
            // Load saved point values if they exist
            const savedPointValues = localStorage.getItem('pointValueLookups');
            if (savedPointValues) {
                this.pointValueLookups = JSON.parse(savedPointValues);
            } else {
                // Initialize with default point value lookups
                this.pointValueLookups = this.getDefaultPointValueLookups();
            }
            
            // Load saved models if they exist
            const savedModels = localStorage.getItem('grimResolverModels');
            if (savedModels) {
                try {
                    this.models = JSON.parse(savedModels);
                    
                    // Find the highest model ID to ensure new models get unique IDs
                    if (this.models.length > 0) {
                        this.nextModelId = Math.max(...this.models.map(model => model.id)) + 1;
                        // Set the first model as selected
                        this.selectedModel = this.models[0];
                    }
                    
                    console.log('Models loaded successfully.');
                } catch (e) {
                    console.error('Error parsing saved models:', e);
                    // If there's an error, we'll keep the default models
                }
            }
            
            // Load saved weight matrix if it exists
            const savedWeightMatrix = localStorage.getItem('statWeightMatrix');
            if (savedWeightMatrix) {
                this.statWeightMatrix = JSON.parse(savedWeightMatrix);
            } else {
                // Initialize with default weight matrix
                this.statWeightMatrix = this.getInitialWeightMatrix();
            }

            // Load saved stat multipliers if they exist
            const savedStatMultipliers = localStorage.getItem('statMultipliers');
            if (savedStatMultipliers) {
                this.statMultipliers = JSON.parse(savedStatMultipliers);
            } else {
                // Initialize with default multipliers
                this.statMultipliers = this.getInitialMultipliers();
            }
            
            // Load relative points preference
            const savedUseRelativePoints = localStorage.getItem('useRelativePoints');
            if (savedUseRelativePoints !== null) {
                this.useRelativePoints = JSON.parse(savedUseRelativePoints);
            }
            
            // Load relative points base value
            const savedRelativePointsBase = localStorage.getItem('relativePointsBase');
            if (savedRelativePointsBase !== null) {
                this.relativePointsBase = JSON.parse(savedRelativePointsBase);
            }
            
            // Load base model cost
            const savedBaseModelCost = localStorage.getItem('baseModelCost');
            if (savedBaseModelCost !== null) {
                this.baseModelCost = JSON.parse(savedBaseModelCost);
            }
            
            // Watch for changes to useRelativePoints and save to localStorage
            this.$watch('useRelativePoints', value => {
                localStorage.setItem('useRelativePoints', JSON.stringify(value));
            });
            
            // Watch for changes to relativePointsBase and save to localStorage
            this.$watch('relativePointsBase', value => {
                localStorage.setItem('relativePointsBase', JSON.stringify(value));
            });
            
            // Watch for changes to baseModelCost and save to localStorage
            this.$watch('baseModelCost', value => {
                localStorage.setItem('baseModelCost', JSON.stringify(value));
            });

            // Set up automatic persistence for point configuration
            this.setupPointValuePersistence();

            // Initialize the first model as selected by default
            if (this.models.length > 0) {
                this.selectedModel = this.models[0];
            }

            // Show initial welcome notification about persistence
            setTimeout(() => {
                this.showNotification('Point configuration and models automatically save to your browser\'s local storage.', 5000);
            }, 1500);

            // Ensure all models have the assignedArmoryItemIds property
            this.models.forEach(model => {
                if (model.assignedArmoryItemIds === undefined || !Array.isArray(model.assignedArmoryItemIds)) {
                    model.assignedArmoryItemIds = [];
                }
            });

            // Load scenarios
            const savedScenarios = localStorage.getItem('grimResolverScenarios');
            if (savedScenarios) {
                try {
                    this.scenarios = JSON.parse(savedScenarios);
                    console.log('Scenarios loaded successfully.');
                } catch (e) {
                    console.error('Error parsing saved scenarios:', e);
                    // Optionally clear the invalid data
                    // localStorage.removeItem('grimResolverScenarios'); 
                }
            }

            // If no scenarios were loaded, create a default one
            if (this.scenarios.length === 0) {
                console.log('No saved scenarios found, creating default scenario.');
                const defaultMeleeScenario = {
                    id: 'scenario_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
                    name: 'Melee vs Guardsman',
                    type: 'meleeAttack',
                    targetModelIds: [1], // Target the Imperial Guardsman (ID 1)
                    attackingModelIds: [], // Initialize attacker list
                    range: null // Not applicable for melee
                };
                this.scenarios.push(defaultMeleeScenario);

                // Add the default Ranged scenario
                const defaultRangedScenario = {
                    id: 'scenario_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8), // Slightly different random part
                    name: 'Ranged vs Guardsman',
                    type: 'rangedAttack',
                    targetModelIds: [1], // Target the Imperial Guardsman (ID 1)
                    attackingModelIds: [], // Initialize attacker list
                    range: 12 // Default range
                };
                this.scenarios.push(defaultRangedScenario);

                this.saveScenarios(); // Save the newly created default scenario
            }

            // Load Armory Items
            const savedArmoryItems = localStorage.getItem('grimResolverArmoryItems');
            if (savedArmoryItems) {
                try {
                    this.armoryItems = JSON.parse(savedArmoryItems);
                    // Ensure all items have the new fields (add with default null if missing)
                    this.armoryItems.forEach(item => {
                        if (item.range === undefined) item.range = null;
                        if (item.strength === undefined) item.strength = null;
                        if (item.ap === undefined) item.ap = null;
                        if (item.attacks === undefined) {
                            item.attacks = item.additionalAttacks !== undefined ? item.additionalAttacks : null;
                            delete item.additionalAttacks;
                        }
                        if (item.meleeStrength === undefined) {
                            item.meleeStrength = '-';
                        }
                        if (item.meleeAttacks === undefined) {
                            item.meleeAttacks = '-';
                        }
                        if (item.weaponType === undefined) {
                            item.weaponType = item.type === 'rangedWeapon' ? 'Assault' : null;
                        }
                        if (item.statWeights === undefined || !Array.isArray(item.statWeights) || item.statWeights.length !== this.getStatOrder().length) {
                            item.statWeights = Array(this.getStatOrder().length).fill(0);
                        }
                        // Ensure baseCost exists, migrate from points if necessary
                        if (item.baseCost === undefined) {
                            item.baseCost = item.points !== undefined ? item.points : 0;
                            delete item.points; // Remove old property
                        }
                        // Validate type or set a default if invalid/missing
                        const validTypes = ['wargear', 'specialRule', 'rangedWeapon', 'meleeWeapon'];
                        if (!validTypes.includes(item.type)) {
                            item.type = 'wargear'; // Default to wargear if type is old/invalid
                        }
                    });

                    if (this.armoryItems.length > 0) {
                        this.nextArmoryItemId = Math.max(...this.armoryItems.map(item => item.id)) + 1;
                    }
                    console.log('Armory items loaded successfully.');
                } catch (e) {
                    console.error('Error parsing saved armory items:', e);
                    this.armoryItems = []; // Reset to empty if parsing fails
                    this.nextArmoryItemId = 1;
                }
            }

            // Initialize with a sample item if none are loaded/parsed
            if (this.armoryItems.length === 0) {
                 console.log('No saved armory items found, creating defaults.');
                this.armoryItems = [
                    // Ranged Weapons
                    {
                        id: this.nextArmoryItemId++, name: 'Bolter', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 24, strength: 4, ap: 5, attacks: 1, weaponType: 'Rapid Fire',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Lasgun', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 24, strength: 3, ap: 0, attacks: 1, weaponType: 'Rapid Fire',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Bolt Pistol', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 12, strength: 4, ap: 5, attacks: 1, weaponType: 'Pistol',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Lascannon', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 48, strength: 9, ap: 2, attacks: 1, weaponType: 'Heavy',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Plasma Gun', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 24, strength: 7, ap: 2, attacks: 1, weaponType: 'Rapid Fire', // Gets Hot! not modeled
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                     {
                        id: this.nextArmoryItemId++, name: 'Plasma Cannon', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 36, strength: 7, ap: 2, attacks: 1, weaponType: 'Heavy', // Blast? Gets Hot! not modeled
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Plasma Pistol', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 12, strength: 7, ap: 2, attacks: 1, weaponType: 'Pistol', // Gets Hot! not modeled
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Autocannon', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 48, strength: 7, ap: 4, attacks: 2, weaponType: 'Heavy',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Missile Launcher (Krak)', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 48, strength: 8, ap: 3, attacks: 1, weaponType: 'Heavy',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                     {
                        id: this.nextArmoryItemId++, name: 'Missile Launcher (Frag)', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 48, strength: 4, ap: 0, attacks: 1, weaponType: 'Heavy', // Blast?
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                     {
                        id: this.nextArmoryItemId++, name: 'Meltagun', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 12, strength: 8, ap: 1, attacks: 1, weaponType: 'Assault', // Melta rule not modeled
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Storm Bolter', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 24, strength: 4, ap: 5, attacks: 2, weaponType: 'Assault',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Heavy Bolter', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 36, strength: 5, ap: 4, attacks: 3, weaponType: 'Heavy',
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                     {
                        id: this.nextArmoryItemId++, name: 'Shuriken Catapult', type: 'rangedWeapon', description: '', baseCost: 0,
                        range: 12, strength: 4, ap: 5, attacks: 2, weaponType: 'Assault', // Bladestorm rule not modeled
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    // Melee Weapons
                    {
                        id: this.nextArmoryItemId++, name: 'Chainsword', type: 'meleeWeapon', description: '', baseCost: 0,
                        range: null, strength: null, ap: 0, attacks: null, weaponType: null,
                        meleeStrength: '-', meleeAttacks: '+1', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Power Weapon', type: 'meleeWeapon', description: '', baseCost: 0,
                        range: null, strength: null, ap: 1, attacks: null, weaponType: null,
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Power Fist', type: 'meleeWeapon', description: '', baseCost: 0,
                        range: null, strength: null, ap: 1, attacks: null, weaponType: null, // Initiative penalty not modeled
                        meleeStrength: 'x2', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    {
                        id: this.nextArmoryItemId++, name: 'Choppa', type: 'meleeWeapon', description: '', baseCost: 0,
                        range: null, strength: null, ap: 0, attacks: null, weaponType: null,
                        meleeStrength: '+1', meleeAttacks: '+1', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                    // Wargear
                    {
                        id: this.nextArmoryItemId++, name: 'Krak Grenades', type: 'wargear', description: 'Anti-tank grenade', baseCost: 0,
                        range: 8, strength: 6, ap: 4, attacks: 1, weaponType: 'Grenade', // Treat as single-shot ranged? Or just info?
                        meleeStrength: '-', meleeAttacks: '-', statWeights: Array(this.getStatOrder().length).fill(0)
                    },
                ];
                this.saveArmoryItems();
            }
        },
        
        addModel() {
            const lastModel = this.models[this.models.length - 1];
            const newModel = {
                id: this.nextModelId++, // Assign next ID and increment
                name: lastModel.name,
                movement: lastModel.movement,
                weaponSkill: lastModel.weaponSkill,
                ballisticSkill: lastModel.ballisticSkill,
                strength: lastModel.strength,
                toughness: lastModel.toughness,
                wounds: lastModel.wounds,
                initiative: lastModel.initiative,
                attacks: lastModel.attacks,
                leadership: lastModel.leadership,
                save: lastModel.save,
                invulnSave: lastModel.invulnSave,
                assignedArmoryItemIds: [] // Initialize for new model
            };
            this.models.push(newModel);
            this.selectedModel = newModel; // Select the newly added model
            this.saveModels(true); // Save after adding model and show notification
        },
        
        duplicateModel(index) {
            const modelToDuplicate = this.models[index];
            const newModel = {
                id: this.nextModelId++, // Assign next ID and increment
                name: modelToDuplicate.name,
                movement: modelToDuplicate.movement,
                weaponSkill: modelToDuplicate.weaponSkill,
                ballisticSkill: modelToDuplicate.ballisticSkill,
                strength: modelToDuplicate.strength,
                toughness: modelToDuplicate.toughness,
                wounds: modelToDuplicate.wounds,
                initiative: modelToDuplicate.initiative,
                attacks: modelToDuplicate.attacks,
                leadership: modelToDuplicate.leadership,
                save: modelToDuplicate.save,
                invulnSave: modelToDuplicate.invulnSave,
                assignedArmoryItemIds: [...modelToDuplicate.assignedArmoryItemIds] // Copy assigned items
            };
            this.models.splice(index + 1, 0, newModel);
            this.selectedModel = newModel; // Select the newly duplicated model
            this.saveModels(true); // Save after duplicating model and show notification
        },
        
        removeModel(index) {
            if (this.models.length > 1) {
                if (confirm('Are you sure you want to delete this model?')) {
                    // Check if the selected model is the one being removed
                    const modelToRemove = this.models[index];
                    const isSelectedModel = this.selectedModel === modelToRemove;
                    
                    // Remove the model
                    this.models.splice(index, 1);
                    
                    // If the selected model was removed, select the first model
                    if (isSelectedModel) {
                        this.selectedModel = this.models[0];
                    }
                    
                    this.saveModels(true); // Save after removing model and show notification
                }
            }
        },
        
        calculatePoints(model) {
            // Phase 1: Calculate base values (including multipliers)
            const baseValues = {
                movement: this.getBasePoints('movement', model.movement),
                weaponSkill: this.getBasePoints('weaponSkill', model.weaponSkill),
                ballisticSkill: this.getBasePoints('ballisticSkill', model.ballisticSkill),
                strength: this.getBasePoints('strength', model.strength),
                toughness: this.getBasePoints('toughness', model.toughness),
                wounds: this.getBasePoints('wounds', model.wounds),
                initiative: this.getBasePoints('initiative', model.initiative),
                attacks: this.getBasePoints('attacks', model.attacks),
                leadership: this.getBasePoints('leadership', model.leadership),
                save: this.getBasePoints('save', model.save),
                invulnSave: this.getBasePoints('invulnSave', model.invulnSave)
            };
            
            // Phase 2: Apply weight matrix adjustments to get model stat cost
            const adjustedValues = this.applyWeightMatrix(baseValues, model);
            const modelStatTotal = Object.values(adjustedValues).reduce((a, b) => a + b, 0);

            // Phase 3: Calculate equipment cost
            let equipmentCost = 0;
            const statOrder = this.getStatOrder();
            if (model.assignedArmoryItemIds && Array.isArray(model.assignedArmoryItemIds)) {
                model.assignedArmoryItemIds.forEach(itemId => {
                    const item = this.getArmoryItemById(itemId);
                    if (item && item.statWeights && Array.isArray(item.statWeights)) {
                        let currentItemCost = item.baseCost || 0;
                        statOrder.forEach((stat, index) => {
                            if (index < item.statWeights.length) {
                                const modelStatBaseCost = baseValues[stat]; // Use base value (after multiplier)
                                const itemWeight = item.statWeights[index];
                                currentItemCost += modelStatBaseCost * itemWeight;
                            }
                        });
                        equipmentCost += currentItemCost;
                    }
                });
            }
            
            // Final cost: Base cost + adjusted stat cost + equipment cost
            return this.baseModelCost + modelStatTotal + equipmentCost;
        },

        getPointBreakdown(model) {
            // Phase 1: Calculate base values
            const baseValues = {
                movement: this.getBasePoints('movement', model.movement),
                weaponSkill: this.getBasePoints('weaponSkill', model.weaponSkill),
                ballisticSkill: this.getBasePoints('ballisticSkill', model.ballisticSkill),
                strength: this.getBasePoints('strength', model.strength),
                toughness: this.getBasePoints('toughness', model.toughness),
                wounds: this.getBasePoints('wounds', model.wounds),
                initiative: this.getBasePoints('initiative', model.initiative),
                attacks: this.getBasePoints('attacks', model.attacks),
                leadership: this.getBasePoints('leadership', model.leadership),
                save: this.getBasePoints('save', model.save),
                invulnSave: this.getBasePoints('invulnSave', model.invulnSave)
            };
            
            // Phase 2: Apply weight matrix adjustments
            const adjustedValues = this.applyWeightMatrix(baseValues, model);
            
            // Phase 3: Calculate equipment cost breakdown
            let equipmentTotalCost = 0;
            const equipmentBreakdown = {};
            const statOrder = this.getStatOrder();
            if (model.assignedArmoryItemIds && Array.isArray(model.assignedArmoryItemIds)) {
                model.assignedArmoryItemIds.forEach(itemId => {
                    const item = this.getArmoryItemById(itemId);
                    if (item && item.statWeights && Array.isArray(item.statWeights)) {
                        const itemName = item.name || `Item ${item.id}`;
                        let currentItemCost = item.baseCost || 0;
                        const statContributions = {};
                        statOrder.forEach((stat, index) => {
                            if (index < item.statWeights.length) {
                                const modelStatBaseCost = baseValues[stat];
                                const itemWeight = item.statWeights[index];
                                const contribution = modelStatBaseCost * itemWeight;
                                currentItemCost += contribution;
                                statContributions[stat] = contribution;
                            }
                        });
                        equipmentBreakdown[itemName] = {
                            base: item.baseCost || 0,
                            stats: statContributions,
                            total: currentItemCost
                        };
                        equipmentTotalCost += currentItemCost;
                    }
                });
            }
            
            // Calculate total cost
            const modelStatTotal = Object.values(adjustedValues).reduce((a, b) => a + b, 0);
            const total = this.baseModelCost + modelStatTotal + equipmentTotalCost;
            
            // Return calculation details including equipment
            return {
                baseValues: {...baseValues},
                adjustedValues: {...adjustedValues},
                equipmentBreakdown: equipmentBreakdown,
                equipmentTotalCost: equipmentTotalCost,
                total: total
            };
        },

        getRelativePoints(model, index) {
            // If using absolute points, return the raw points value
            if (!this.useRelativePoints) {
                return this.calculatePoints(model).toFixed(2);
            }

            // For relative points calculation
            if (index === 0) {
                return this.relativePointsBase.toFixed(2); // First model uses the base value
            }
            if (this.models.length < 1) {
                return '-'; // Should not happen, but safeguard
            }

            const firstModelPoints = this.calculatePoints(this.models[0]);
            const currentModelPoints = this.calculatePoints(model);

            if (firstModelPoints <= 0) { // Check for <= 0 to handle negative points safely
                return '-'; // Avoid division by zero or negative base
            }

            return ((currentModelPoints / firstModelPoints) * this.relativePointsBase).toFixed(2); // Calculate relative points using the base value
        },
        
        getTotalPoints() {
            return this.models.reduce((total, model) => total + this.calculatePoints(model), 0);
        },
        
        // Point value functions that use the lookup tables
        getMovementPoints(value) {
            return this.pointValueLookups.movement[value];
        },
        
        getWeaponSkillPoints(value) {
            return this.pointValueLookups.weaponSkill[value];
        },
        
        getBallisticSkillPoints(value) {
            if (!value || value === '-') {
                return this.pointValueLookups.ballisticSkill['-'];
            }
            // Parse the value, removing the '+' if present
            const parsedValue = value.replace('+', '');
            return this.pointValueLookups.ballisticSkill[parsedValue + '+'];
        },
        
        getStrengthPoints(value) {
            return this.pointValueLookups.strength[value];
        },
        
        getToughnessPoints(value) {
            return this.pointValueLookups.toughness[value];
        },
        
        getWoundsPoints(value) {
            return this.pointValueLookups.wounds[value];
        },
        
        getInitiativePoints(value) {
            return this.pointValueLookups.initiative[value];
        },
        
        getAttacksPoints(value) {
            return this.pointValueLookups.attacks[value];
        },
        
        getLeadershipPoints(value) {
            return this.pointValueLookups.leadership[value];
        },
        
        getSavePoints(value) {
            if (!value || value === '-') {
                return this.pointValueLookups.save['-'];
            }
            // Parse the value, removing the '+' if present
            const parsedValue = value.replace('+', '');
            return this.pointValueLookups.save[parsedValue + '+'];
        },
        
        getInvulnSavePoints(value) {
            if (!value || value === '-') {
                return this.pointValueLookups.invulnSave['-'];
            }
            // Parse the value, removing the '+' if present
            const parsedValue = value.replace('+', '');
            return this.pointValueLookups.invulnSave[parsedValue + '+'];
        },

        // Simple function to ensure skill values always have a + sign
        ensurePlusSign(model, prop) {
            if (!model[prop].includes('+') && !model[prop].includes('-')) {
                model[prop] = model[prop] + '+';
            }
        },        // Function to increment numeric skill value
        incrementNumeric(model, prop) {
            if (model && prop) {
                model[prop]++;
                this.saveModels(); // Save after change
            }
        },
        // Function to decrement numeric skill value
        decrementNumeric(model, prop) {
            if (model && prop && model[prop] > 1) {
                model[prop]--;
                this.saveModels(); // Save after change
            }
        },
        // Function to increment skill value with plus sign
        incrementSkill(model, prop) {
            if (!model || !prop) return;
            
            const skillValues = {
                ballisticSkill: ['6+', '5+', '4+', '3+', '2+', '-'],
                save: ['6+', '5+', '4+', '3+', '2+', '-'],
                invulnSave: ['6+', '5+', '4+', '3+', '2+', '-']
            };
            
            if (skillValues[prop]) {
                const values = skillValues[prop];
                const currentIndex = values.indexOf(model[prop]);
                
                if (currentIndex !== -1 && currentIndex < values.length - 1) {
                    model[prop] = values[currentIndex + 1];
                    this.saveModels(); // Save after change
                }
            }
        },
        // Function to decrement skill value with plus sign
        decrementSkill(model, prop) {
            if (!model || !prop) return;
            
            const skillValues = {
                ballisticSkill: ['6+', '5+', '4+', '3+', '2+', '-'],
                save: ['6+', '5+', '4+', '3+', '2+', '-'],
                invulnSave: ['6+', '5+', '4+', '3+', '2+', '-']
            };
            
            if (skillValues[prop]) {
                const values = skillValues[prop];
                const currentIndex = values.indexOf(model[prop]);
                
                if (currentIndex > 0) {
                    model[prop] = values[currentIndex - 1];
                    this.saveModels(); // Save after change
                }
            }
        },
        
        // Export models to CSV
        exportModels() {
            // CSV header
            let csv = 'Name,Movement,Weapon Skill,Ballistic Skill,Strength,Toughness,Wounds,Initiative,Attacks,Leadership,Save,Invuln Save\n';
            
            // Add each model as a row
            this.models.forEach(model => {
                csv += [
                    model.name || 'Unnamed',
                    model.movement,
                    model.weaponSkill,
                    model.ballisticSkill,
                    model.strength,
                    model.toughness,
                    model.wounds,
                    model.initiative,
                    model.attacks,
                    model.leadership,
                    model.save,
                    model.invulnSave
                ].join(',') + '\n';
            });
            
            // Create a blob and download link
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'grim_resolver_models.csv');
            a.click();
            URL.revokeObjectURL(url);
        },
        
        // Import models from CSV
        importModels(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    // Parse CSV content
                    const lines = e.target.result.split('\n');
                    // Skip header row
                    const modelLines = lines.slice(1).filter(line => line.trim());
                    
                    if (modelLines.length === 0) return;
                    
                    // Convert CSV rows to model objects
                    const importedModels = modelLines.map(line => {
                        const values = line.split(',');
                        return {
                            id: parseInt(values[0]),
                            name: values[1] === 'Unnamed' ? '' : values[1],
                            movement: parseInt(values[2]),
                            weaponSkill: parseInt(values[3]),
                            ballisticSkill: values[4],
                            strength: parseInt(values[5]),
                            toughness: parseInt(values[6]),
                            wounds: parseInt(values[7]),
                            initiative: parseInt(values[8]),
                            attacks: parseInt(values[9]),
                            leadership: parseInt(values[10]),
                            save: values[11],
                            invulnSave: values[12],
                            assignedArmoryItemIds: [] // Initialize for imported model
                        };
                    });
                    
                    // Replace current models with imported ones
                    this.models = importedModels;
                    
                    // Select the first imported model
                    if (this.models.length > 0) {
                        this.selectedModel = this.models[0];
                    }
                    
                    // Save the imported models
                    this.saveModels(true);
                    
                    this.showNotification('Models imported and saved locally');
                } catch (error) {
                    alert('Error importing the file. Make sure it is a valid CSV.');
                    console.error('Import error:', error);
                }
                
                // Clear file input
                event.target.value = '';
            };
            reader.readAsText(file);
        },

        // Helper method for displaying notifications
        showNotification(message, duration = 3000) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.className = 'notification notification-animate';
            document.body.appendChild(notification);
            
            // Remove the notification after specified duration
            setTimeout(() => {
                document.body.removeChild(notification);
            }, duration);
        },

        // Export point values to JSON
        exportPointValues() {
            console.log(this.pointValueLookups);
            const dataToExport = {
                pointValueLookups: this.pointValueLookups,
                statMultipliers: this.statMultipliers // Include multipliers in export
            };
            
            // Include weight matrix if option is enabled
            if (this.includeWeightMatrixInExport) {
                dataToExport.statWeightMatrix = this.statWeightMatrix;
            }
            
            const data = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'point_values.json');
            a.click();
            URL.revokeObjectURL(url);
            
            // Show notification about local persistence
            this.showNotification('Point values exported and already saved locally.');
        },

        // Import point values from JSON
        importPointValues(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    let imported;
                    // Try to parse the content as JSON
                    try {
                        imported = JSON.parse(e.target.result);
                    } catch (parseError) {
                        this.showNotification('Invalid JSON format. Please check the file and try again.', 5000);
                        console.error('JSON parse error:', parseError);
                        return;
                    }
                    
                    // Validate point value lookups
                    if (imported.pointValueLookups) {
                        const requiredStats = [
                            'movement', 'weaponSkill', 'ballisticSkill', 'strength',
                            'toughness', 'wounds', 'initiative', 'attacks', 'leadership', 'save', 'invulnSave'
                        ];
                        
                        if (requiredStats.every(stat => imported.pointValueLookups[stat])) {
                            this.pointValueLookups = imported.pointValueLookups;
                            localStorage.setItem('pointValueLookups', JSON.stringify(imported.pointValueLookups));
                            
                            // Import stat multipliers if available
                            if (imported.statMultipliers) {
                                this.statMultipliers = imported.statMultipliers;
                                localStorage.setItem('statMultipliers', JSON.stringify(imported.statMultipliers));
                            } else {
                                // Reset to default if not found in imported file
                                this.statMultipliers = this.getInitialMultipliers();
                                localStorage.setItem('statMultipliers', JSON.stringify(this.statMultipliers));
                            }

                            // Import weight matrix if available
                            if (imported.statWeightMatrix) {
                                if (confirm('The imported file contains a weight matrix. Do you want to import it as well?')) {
                                    this.statWeightMatrix = imported.statWeightMatrix;
                                    localStorage.setItem('statWeightMatrix', JSON.stringify(imported.statWeightMatrix));
                                }
                            }
                            
                            this.showNotification('Point values imported successfully and saved locally!');
                        } else {
                            this.showNotification('Invalid point values file. Missing required stats.', 5000);
                        }
                    } else {
                        this.showNotification('Invalid point values file. Missing pointValueLookups object.', 5000);
                    }
                } catch (error) {
                    this.showNotification('Error importing point values. Make sure it is a valid JSON file.', 5000);
                    console.error('Import error:', error);
                }
                event.target.value = '';
            };
            reader.readAsText(file);
        },

        formatStatName(stat) {
            if (stat === 'base') {
                return 'Base Cost';
            }
            return stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1');
        },

        statWeightMatrix: {
            // Effect of row stat on column stat
            //           M    WS   BS   S    T    W    I    A    Ld   Sv   Inv
            movement:   [0,  .1,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Movement affects Initiative and Attacks
            weaponSkill:[0,   0, -.2,   0,   0,   0,  .2,  .5,   0,   0,   0],   // WS affects Strength, Initiative and Attacks
            ballisticSkill:[0,0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
            strength:   [0,   0,   0,   0,   0,   0,   0,  .5,   0,   0,   0],   // Strength is a terminal node
            toughness:  [0,   0,   0,   0,   0,  .1,   0,   0,   0,   0,   0],   // T affects Wounds and Leadership
            wounds:     [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Wounds is a terminal node
            initiative: [0,   0,   0,   0,   0,   0,   0,  .2,   0,   0,   0],   // Initiative affects Attacks
            attacks:    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Attacks affects Strength
            leadership: [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Leadership is a terminal node
            save:       [0,   0,   0,   0,   0,  .5,   0,   0,   0,   0,   0],   // Save affects Wounds
            invulnSave: [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0]    // Invuln Save affects Wounds
        },

        applyWeightMatrix(baseValues, model) {
            const statOrder = ['movement', 'weaponSkill', 'ballisticSkill', 'strength', 
                               'toughness', 'wounds', 'initiative', 'attacks', 'leadership', 'save', 'invulnSave'];
            const adjustedValues = {...baseValues};
            
            // Apply adjustments in correct order
            for (const [targetIdx, targetStat] of statOrder.entries()) {
                let adjustment = 0;
                
                // Calculate influence from each source stat
                for (const sourceStat of statOrder) {
                    // Get the weight from source stat to target stat
                    const weight = this.statWeightMatrix[sourceStat][targetIdx];
                    
                    if (weight !== 0) {
                        // Use raw stat value to determine influence
                        const rawValue = model[sourceStat];
                        const baseValue = baseValues[sourceStat];
                        adjustment += this.calculateInfluence(baseValue, weight, sourceStat);
                    }
                }
                
                // Apply adjustment by direct addition instead of as a multiplier
                adjustedValues[targetStat] = baseValues[targetStat] + adjustment;
            }
            
            return adjustedValues;
        },

        calculateInfluence(rawValue, weight, sourceStat) {
            return weight * rawValue;
        },

        getBasePoints(stat, value) {
            let baseValue;
            // Handle special cases for stats with plus signs
            if (['ballisticSkill', 'save', 'invulnSave'].includes(stat)) {
                if (!value || value === '-') {
                    baseValue = this.pointValueLookups[stat]['-'];
                } else {
                    // Parse the value, removing the '+' if present
                    const parsedValue = value.replace('+', '');
                    baseValue = this.pointValueLookups[stat][parsedValue + '+'];
                }
            } else {
                // For regular numeric stats
                baseValue = this.pointValueLookups[stat][value];
            }
            
            // Apply multiplier to all stats, including skill-based ones
            const multiplier = this.statMultipliers[stat] || 1.0; // Get multiplier, default to 1 if undefined
            return baseValue * multiplier; // Apply multiplier
        },

        getStatShortName(stat) {
            const shortNames = {
                movement: 'M',
                weaponSkill: 'WS',
                ballisticSkill: 'BS',
                strength: 'S',
                toughness: 'T',
                wounds: 'W',
                initiative: 'I',
                attacks: 'A',
                leadership: 'Ld',
                save: 'Sv',
                invulnSave: 'Inv'
            };
            return shortNames[stat] || stat;
        },

        getStatAtIndex(index) {
            const stats = ['movement', 'weaponSkill', 'ballisticSkill', 'strength', 'toughness', 'wounds', 'initiative', 'attacks', 'leadership', 'save', 'invulnSave'];
            return stats[index];
        },

        // Save the current weight matrix to localStorage
        saveWeightMatrix() {
            localStorage.setItem('statWeightMatrix', JSON.stringify(this.statWeightMatrix));
            
            // Show notification
            this.showNotification('Weight matrix saved locally. All changes are automatically persisted.');
        },

        // Get initial/default weight matrix
        getInitialWeightMatrix() {
            return {
                // Effect of row stat on column stat
                //           M    WS   BS   S    T    W    I    A    Ld   Sv   Inv
                movement:   [0,  .1,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Movement affects Initiative and Attacks
                weaponSkill:[0,   0, -.2,   0,   0,   0,  .2,  .5,   0,   0,   0],   // WS affects Strength, Initiative and Attacks
                ballisticSkill:[0,0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
                strength:   [0,   0,   0,   0,   0,   0,   0,  .5,   0,   0,   0],   // Strength is a terminal node
                toughness:  [0,   0,   0,   0,   0,  .1,   0,   0,   0,   0,   0],   // T affects Wounds and Leadership
                wounds:     [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Wounds is a terminal node
                initiative: [0,   0,   0,   0,   0,   0,   0,  .2,   0,   0,   0],   // Initiative affects Attacks
                attacks:    [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Attacks affects Strength
                leadership: [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],   // Leadership is a terminal node
                save:       [0,   0,   0,   0,   0,  .5,   0,   0,   0,   0,   0],   // Save affects Wounds
                invulnSave: [0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0]    // Invuln Save affects Wounds
            };
        },

        // Get initial/default stat multipliers
        getInitialMultipliers() {
            return {
                movement: 1.0, 
                weaponSkill: 1.0, 
                ballisticSkill: 1.25, 
                strength: 1.0,
                toughness: 1.0, 
                wounds: 1.0, 
                initiative: 1.0, 
                attacks: 1.0,
                leadership: 1.0, 
                save: 1.5, 
                invulnSave: 1.0
            };
        },

        // Reset the weight matrix to default values
        resetWeightMatrix() {
            // Implement logic to reset matrix to default values
            console.log('Resetting matrix...');
            this.statWeightMatrix = this.getInitialWeightMatrix();
            this.statMultipliers = this.getInitialMultipliers();
            this.saveWeightMatrix(); // Optionally save immediately
            this.$forceUpdate(); // Force Alpine to re-render
            this.showNotification('Weight matrix reset to default values and saved locally.');
        },

        includeWeightMatrixInExport: false,

        // Get capabilities for the selected model
        getCapabilities(model) {
            // First get the point breakdown with all adjusted values
            const breakdown = this.getPointBreakdown(model);
            const adjustedValues = breakdown.adjustedValues;
            
            // Calculate each capability
            let shooting = Math.max(0, adjustedValues.ballisticSkill);
            let combat = Math.max(0, 
                adjustedValues.weaponSkill + 
                adjustedValues.strength + 
                adjustedValues.attacks +
                adjustedValues.initiative
            );
            
            // Add equipment costs to capabilities
            if (model.assignedArmoryItemIds && Array.isArray(model.assignedArmoryItemIds)) {
                model.assignedArmoryItemIds.forEach(itemId => {
                    const item = this.getArmoryItemById(itemId);
                    if (item) {
                        // Add ranged weapons costs to shooting capability
                        if (item.type === 'rangedWeapon') {
                            const itemCost = this.getEquipmentCost(model, itemId);
                            shooting += itemCost;
                        }
                        // Add melee weapons costs to combat capability
                        else if (item.type === 'meleeWeapon') {
                            const itemCost = this.getEquipmentCost(model, itemId);
                            combat += itemCost;
                        }
                    }
                });
            }
            
            const defense = Math.max(0, 
                adjustedValues.toughness + 
                adjustedValues.save + 
                adjustedValues.invulnSave +
                adjustedValues.wounds
            );
            
            const movement = Math.max(0, adjustedValues.movement);
            
            const other = Math.max(0, adjustedValues.leadership);
            
            return {
                shooting,
                combat,
                defense,
                movement,
                other
            };
        },

        showCaptcha: false,
        showConfirmation: false,
        selectedTiles: [],
        initCaptcha() {
            if (!localStorage.getItem('hasSeenCaptcha')) {
                setTimeout(() => {
                    this.showCaptcha = true;
                }, 3000);
            }
        },
        handleSubmit() {
            this.showConfirmation = true;
            localStorage.setItem('hasSeenCaptcha', 'true');
            setTimeout(() => {
                this.showConfirmation = false;
                this.showCaptcha = false;
            }, 2000);
        },
        toggleTile(index) {
            const tileIndex = this.selectedTiles.indexOf(index);
            if (tileIndex > -1) {
                this.selectedTiles.splice(tileIndex, 1);
            } else {
                this.selectedTiles.push(index);
            }
        },
        calculateBgPosition(index) {
            const tileWidth = 100;
            const tileHeight = 101;
            const cols = 4;
            
            const col = (index - 1) % cols;
            const row = Math.floor((index - 1) / cols);
            
            const xPos = -col * tileWidth;
            const yPos = -row * tileHeight;
            
            return `${xPos}px ${yPos}px`;
        },

        // Computed property to get the currently selected scenario object
        get selectedScenario() {
            if (!this.selectedScenarioId) return null;
            return this.scenarios.find(s => s.id === this.selectedScenarioId);
        },

        // --- Scenario Management Functions ---
        addScenario() {
            // Generate a unique ID for the new scenario
            const newId = Date.now().toString();
            
            // Create a new scenario with default values based on type
            const newScenario = {
                id: newId,
                name: "New Scenario",
                type: "meleeAttack", // Default type
                targetModelIds: [], // For multi-target scenarios (melee/ranged attack)
                targetModelId: "", // For single target scenarios (opposed combat)
                attackingModelIds: [], // For defense scenarios
                range: 12 // Default range for ranged scenarios
            };
            
            // Add to scenarios array
            this.scenarios.push(newScenario);
            
            // Select the new scenario
            this.selectedScenarioId = newId;
            
            // Save to storage
            this.saveScenarios();
            
            return newId;
        },

        deleteScenario() {
            if (!this.selectedScenarioId) return; // No scenario selected

            if (confirm('Are you sure you want to delete this scenario?')) {
                const index = this.scenarios.findIndex(s => s.id === this.selectedScenarioId);
                if (index > -1) {
                    this.scenarios.splice(index, 1);
                    this.selectedScenarioId = null; // Deselect after deletion
                } else {
                    console.error("Scenario to delete not found:", this.selectedScenarioId);
                    this.selectedScenarioId = null; // Deselect even if not found, to be safe
                }
            }
            this.saveScenarios(); // Save after deleting
        },

        exportScenarios() {
            if (this.scenarios.length === 0) {
                alert("No scenarios to export.");
                return;
            }
            const data = JSON.stringify(this.scenarios, null, 2); // Pretty print JSON
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'grim_resolver_scenarios.json');
            a.click();
            URL.revokeObjectURL(url);
            console.log('Scenarios exported.');
        },

        importScenarios(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    // Basic validation: is it an array?
                    if (Array.isArray(importedData)) {
                        // Optional: More validation could be added here to check scenario structure
                        if (confirm(`Replace current scenarios (${this.scenarios.length}) with ${importedData.length} imported scenarios?`)) {
                            // Ensure imported scenarios have the new field
                            importedData.forEach(scenario => {
                                if (scenario.attackingModelIds === undefined) {
                                    scenario.attackingModelIds = [];
                                }
                                // Add range initialization
                                if (scenario.range === undefined || scenario.range === null) {
                                     scenario.range = 12; // Default imported scenarios too
                                }
                                // Add similar checks for other fields if structure evolves
                            });
                            this.scenarios = importedData;
                            this.selectedScenarioId = null; // Deselect any currently selected scenario
                            this.saveScenarios(); // Save the newly imported scenarios
                            alert('Scenarios imported successfully!');
                        }
                    } else {
                        alert('Invalid scenarios file. The file must contain a JSON array.');
                    }
                } catch (error) {
                    alert('Error importing scenarios. Make sure it is a valid JSON file.');
                    console.error('Scenario import error:', error);
                }
                // Clear file input value to allow importing the same file again if needed
                event.target.value = '';
            };
            reader.onerror = (e) => {
                alert('Error reading file.');
                console.error('File reading error:', e);
                event.target.value = ''; 
            };
            reader.readAsText(file);
        },

        // Helper function to save scenarios to localStorage
        saveScenarios() {
            localStorage.setItem('grimResolverScenarios', JSON.stringify(this.scenarios));
            console.log('Scenarios saved.');
        },

        // --- End Scenario Management ---

        // --- Scenario Calculation Logic (Re-implemented) ---

        // Helper to find a model by its ID
        getModelById(id) {
            // Convert id to number just in case it was stored/passed as string from multi-select
            const numericId = parseInt(id, 10);
            return this.models.find(m => m.id === numericId);
        },

        // Helper to parse save values like '3+' or '-' into numbers (or a high number for '-')
        parseSaveValue(saveStr) {
            if (!saveStr || saveStr === '-') return 7; // Handle '-' or null/undefined input
            const numStr = saveStr.replace('+', ''); // Remove the '+' sign
            const num = parseInt(numStr, 10);      // Convert the remaining string to an integer
            return Number.isNaN(num) ? 7 : num;    // If parsing failed (NaN), return 7, otherwise return the number
        },

        // Helper to calculate probability based on D6 roll needed (e.g., 3+ -> 4/6)
        getD6Probability(rollNeeded) {
            if (rollNeeded <= 1) return 1.0; // Always succeeds
            if (rollNeeded >= 7) return 0.0; // Always fails
            return (7 - rollNeeded) / 6.0;
        },

        // Calculate hit probability based on WS comparison
        getHitProbability(attackerWS, targetWS) {
            let rollNeeded;
            // Ensure input are numbers
            attackerWS = parseInt(attackerWS, 10);
            targetWS = parseInt(targetWS, 10);
            if (isNaN(attackerWS) || isNaN(targetWS)) return 0; // Or handle error

            if (attackerWS > targetWS) {
                rollNeeded = 3;
            } else if (targetWS > attackerWS * 2) { // Target WS is more than double attacker WS
                rollNeeded = 5;
            } else {
                // Equal WS or target's WS is higher but not double
                rollNeeded = 4;
            }
            return this.getD6Probability(rollNeeded);
        },

        // Calculate wound probability based on S vs T comparison
        getWoundProbability(attackerS, targetT) {
            let rollNeeded;
             // Ensure input are numbers
            attackerS = parseInt(attackerS, 10);
            targetT = parseInt(targetT, 10);
            if (isNaN(attackerS) || isNaN(targetT)) return 0; // Or handle error
            if (targetT <= 0) return 1.0; // Auto-wound if T is 0 or less

            if (attackerS >= targetT * 2) {
                rollNeeded = 2;
            } else if (attackerS > targetT) {
                rollNeeded = 3;
            } else if (attackerS === targetT) {
                rollNeeded = 4;
            } else if (attackerS * 2 <= targetT) {
                rollNeeded = 6;
            } else { // attackerS < targetT but not half or less
                rollNeeded = 5;
            }
            return this.getD6Probability(rollNeeded);
        },

        // Calculate probability of failing a save, considering AP
        getFailSaveProbability(targetSave, targetInvuln, ap = 0) {
            const baseSaveVal = this.parseSaveValue(targetSave);
            const invulnVal = this.parseSaveValue(targetInvuln);
            
            // Ensure AP is a number; treat null/undefined/0 as AP 0 (no modification)
            const apVal = parseInt(ap, 10) || 0; 
            
            // See if AP is lower than the armor save, if so, remove their armor save
            let modifiedSaveVal = baseSaveVal;
            if(apVal > 0) {
                if(apVal <= baseSaveVal) {
                    modifiedSaveVal = 7;
                }
            }
            
            // Determine the best save roll needed (lower is better)
            // If the modified save is worse than 7+, use the invuln (or 7+ if no invuln)
            const effectiveSave = Math.min(modifiedSaveVal, invulnVal);

            // Clamp the effective save roll needed between 2 and 7 (you can't need less than 2+, or more than impossible)
            const finalSaveNeeded = Math.max(2, Math.min(effectiveSave, 7));

            return 1.0 - this.getD6Probability(finalSaveNeeded); // Probability of *failing* the save
        },

        // --- Main Scenario Calculation Dispatcher ---
        getScenarioResults(scenario, perspectiveModel) {
            if (!scenario || !perspectiveModel) return "No data available.";
            
            // Handle based on scenario type
            switch (scenario.type) {
                case 'meleeAttack':
                    return this.calculateMeleeAttackOutcome(scenario, perspectiveModel);
                case 'rangedAttack':
                    return this.calculateRangedAttackOutcome(scenario, perspectiveModel);
                case 'rangedDefense':
                    return this.calculateRangedDefenseOutcome(scenario, perspectiveModel);
                case 'opposedCombat':
                    return this.calculateOpposedCombatOutcome(scenario, perspectiveModel);
                default:
                    return `Scenario type ${scenario.type} not yet implemented.`;
            }
        },

        // --- Specific Scenario Calculators ---
        calculateMeleeAttackOutcome(scenario, attacker) {
            if (!attacker) return "Attacker not found.";
            if (!scenario.targetModelIds || scenario.targetModelIds.length === 0) {
                return "No targets selected for this melee scenario.";
            }

            let results = [];
            // Calculate outcome for each target
            for (const targetId of scenario.targetModelIds) {
                const target = this.getModelById(targetId);
                if (!target) {
                    results.push(` - Target ID ${targetId}: Not found`);
                    continue; // Skip to next target if this one isn't found
                }

                // Basic check for essential stats
                if (typeof attacker.attacks === 'undefined' || typeof attacker.weaponSkill === 'undefined' || typeof attacker.strength === 'undefined' ||
                    typeof target.weaponSkill === 'undefined' || typeof target.toughness === 'undefined' || typeof target.save === 'undefined' || typeof target.invulnSave === 'undefined') {
                    results.push(` - Target ${target.name || '(Unnamed)'}: Missing required stats.`);
                    continue;
                }

                // Use the calculateSingleAttack helper with no penalty
                const attackResult = this.calculateSingleAttack(attacker, target, 0);
                const attackData = attackResult.data;
                
                // Get the weapon details
                const meleeWeapon = attackData.weapon;
                const weaponUsedName = meleeWeapon ? meleeWeapon.name : 'Base Stats';
                const effectiveS = attackData.effectiveStrength;
                const effectiveA = attackData.attacks;
                const weaponAPDisplay = (attackData.apValue === 0) ? '-' : attackData.apValue;

                // Calculate efficiency
                const attackerPoints = this.calculatePoints(attacker);
                const efficiency = attackerPoints > 0 ? attackData.expectedUnsavedWounds / attackerPoints : 0;
                const saveChance = (1.0 - attackData.failSaveProb);

                // Format result for this target
                results.push(
                    `  vs ${target.name || '(Unnamed)'} (T${target.toughness}, ${target.save}/${target.invulnSave}):
    Weapon: ${weaponUsedName} (S:${effectiveS} AP:${weaponAPDisplay} A:${effectiveA})
    Hits: ${attackData.expectedHits.toFixed(2)} (${(attackData.adjustedHitProb * 100).toFixed(0)}%)
    Wounds: ${attackData.expectedWounds.toFixed(2)} (${(attackData.woundProb * 100).toFixed(0)}%)
    Unsaved: ${attackData.expectedUnsavedWounds.toFixed(2)} (Save: ${(saveChance * 100).toFixed(0)}%)
    Wounds/Point: ${efficiency.toFixed(4)}
    Efficiency: ${(1000 * efficiency).toFixed(2)}`
                );
            }
            // Combine results for all targets
            return results.join('\n\n'); // Add extra newline between target results
        },
        
        calculateRangedAttackOutcome(scenario, attacker) {
            if (!attacker) return "Attacker not found.";
            if (!scenario.targetModelIds || scenario.targetModelIds.length === 0) {
                return "No targets selected for this ranged scenario.";
            }

            // Find the first equipped ranged weapon
            let weaponUsed = null;
            const assignedIds = attacker.assignedArmoryItemIds || [];
            for (const itemId of assignedIds) {
                // Use the versatile lookup function
                const item = this.getArmoryItemById(itemId);
                if (item && item.type === 'rangedWeapon') {
                    weaponUsed = item;
                    break; // Use the first one found
                }
            }

            if (!weaponUsed) {
                return `No ranged weapon equipped on ${attacker.name || '(Unnamed)'}.`;
            }

            let results = [];
            // Calculate outcome for each target
            for (const targetId of scenario.targetModelIds) {
                const target = this.getModelById(targetId);
                if (!target) {
                    results.push(` - Target ID ${targetId}: Not found`);
                    continue;
                }

                // Basic check for essential stats
                if (typeof attacker.ballisticSkill === 'undefined' || 
                    typeof weaponUsed.strength === 'undefined' || typeof weaponUsed.ap === 'undefined' || typeof weaponUsed.attacks === 'undefined' ||
                    typeof target.toughness === 'undefined' || typeof target.save === 'undefined' || typeof target.invulnSave === 'undefined') {
                    results.push(` - Target ${target.name || '(Unnamed)'}: Missing required stats (Attacker BS, Weapon S/AP/A, Target T/Sv/Inv).`);
                    continue;
                }
                
                // Get scenario range, default to 12 if invalid
                const scenarioRange = parseInt(scenario.range, 10) || 12;
                const weaponRange = parseInt(weaponUsed.range, 10);
                const isOutOfRange = isNaN(weaponRange) || weaponRange < scenarioRange;

                let expectedWounds = 0;
                let efficiency = 0;
                let resultString = '';
                
                const attackerPoints = this.calculatePoints(attacker);
                
                // Get effective stats (mostly from weapon, hit chance from model)
                const effectiveS = weaponUsed.strength;
                let effectiveA = weaponUsed.attacks;
                const effectiveAP = parseInt(weaponUsed.ap, 10) || 0;
                const attackerBS = this.parseSaveValue(attacker.ballisticSkill);
                const weaponAPDisplay = (effectiveAP === 0) ? '-' : effectiveAP;
                let rapidFireBonus = false;

                if (isOutOfRange) {
                    // Format result for OUT OF RANGE
                    resultString = 
                        `  vs ${target.name || '(Unnamed)'} (T${target.toughness}, ${target.save}/${target.invulnSave}):\n` +
                        `    Weapon: ${weaponUsed.name} (R:${weaponUsed.range || 'N/A'}") - OUT OF RANGE (${scenarioRange}")\n` +
                        `    Wounds/Point: 0.0000\n` +
                        `    Efficiency: 0.00`;
                } else {
                    // Handle Rapid Fire (only if in range)
                    if (weaponUsed.weaponType === 'Rapid Fire' && scenarioRange <= weaponRange / 2) {
                        effectiveA *= 2;
                        rapidFireBonus = true;
                    }

                    // Calculate probabilities (only if in range)
                    const pHit = this.getD6Probability(attackerBS);
                    const pWound = this.getWoundProbability(effectiveS, target.toughness);
                    const pFailSave = this.getFailSaveProbability(target.save, target.invulnSave, effectiveAP);
                    const saveChance = (1.0 - pFailSave);

                    // Calculate expected wounds (only if in range)
                    expectedWounds = effectiveA * pHit * pWound * pFailSave;
                    
                    // Calculate efficiency (only if in range)
                    efficiency = attackerPoints > 0 ? expectedWounds / attackerPoints : 0;

                    // Format result for IN RANGE
                    resultString = 
                        `  vs ${target.name || '(Unnamed)'} (T${target.toughness}, ${target.save}/${target.invulnSave}):\n` +
                        `    Weapon: ${weaponUsed.name} (R:${weaponUsed.range}" S:${effectiveS} AP:${weaponAPDisplay} A:${weaponUsed.attacks}${rapidFireBonus ? 'x2' : ''} -> ${effectiveA})\n` +
                        `    Scenario Range: ${scenarioRange}"\n` +
                        `    Attacker BS: ${attacker.ballisticSkill}\n` +
                        `    Hits: ${(effectiveA * pHit).toFixed(2)} (${(pHit * 100).toFixed(0)}%)\n` +
                        `    Wounds: ${(effectiveA * pHit * pWound).toFixed(2)} (${(pWound * 100).toFixed(0)}%)\n` +
                        `    Unsaved: ${expectedWounds.toFixed(2)} (Save: ${(saveChance * 100).toFixed(0)}%)\n` +
                        `    Wounds/Point: ${efficiency.toFixed(4)}\n` +
                        `    Efficiency: ${(1000 * efficiency).toFixed(2)}`;
                }
                results.push(resultString);
            }
            return results.join('\n\n');
        },

        calculateRangedDefenseOutcome(scenario, defender) {
            if (!defender) return "Defender not found.";
            if (!scenario.attackingModelIds || scenario.attackingModelIds.length === 0) {
                return "No attackers selected for this ranged defense scenario.";
            }

            let totalExpectedWounds = 0;
            let attackerDetails = [];
            let totalAttackerPoints = 0;
            let totalDefenderPoints = this.calculatePoints(defender);

            const scenarioRange = parseInt(scenario.range, 10) || 12; // Get scenario range once

            for (const attackerId of scenario.attackingModelIds) {
                const attacker = this.getModelById(attackerId);
                if (!attacker) {
                    attackerDetails.push(` - Attacker ID ${attackerId}: Not found`);
                    continue;
                }

                // Find the first equipped ranged weapon for this attacker
                let weaponUsed = null;
                const assignedIds = attacker.assignedArmoryItemIds || [];
                for (const itemId of assignedIds) {
                    const item = this.getArmoryItemById(itemId);
                    if (item && item.type === 'rangedWeapon') {
                        weaponUsed = item;
                        break;
                    }
                }

                if (!weaponUsed) {
                    attackerDetails.push(` - ${attacker.name || '(Unnamed)'}: No ranged weapon equipped.`);
                    continue;
                }
                
                 // Essential stats check BEFORE calculating points or range
                 if (typeof attacker.ballisticSkill === 'undefined' || 
                    typeof weaponUsed.strength === 'undefined' || typeof weaponUsed.ap === 'undefined' || typeof weaponUsed.attacks === 'undefined' ||
                    typeof defender.toughness === 'undefined' || typeof defender.save === 'undefined' || typeof defender.invulnSave === 'undefined') {
                    attackerDetails.push(` - ${attacker.name || '(Unnamed)'}: Missing required stats.`);
                    continue;
                 }

                // Add attacker's points regardless of range
                totalAttackerPoints += this.calculatePoints(attacker);

                // Check range
                const weaponRange = parseInt(weaponUsed.range, 10);
                const isOutOfRange = isNaN(weaponRange) || weaponRange < scenarioRange;

                let expectedWoundsFromAttacker = 0;
                let attackerDetailString = '';
                const weaponAPDisplay = (parseInt(weaponUsed.ap, 10) || 0) === 0 ? '-' : (parseInt(weaponUsed.ap, 10) || 0);
                let rapidFireBonus = false;
                let effectiveA = weaponUsed.attacks;

                if (isOutOfRange) {
                    // Format detail string for OUT OF RANGE
                     attackerDetailString = 
                        `  - ${attacker.name || '(Unnamed)'} (BS ${attacker.ballisticSkill})\n` +
                        `    Weapon: ${weaponUsed.name} (R:${weaponUsed.range || 'N/A'}") - OUT OF RANGE (${scenarioRange}")\n` +
                        `    Expected Wounds: 0.00`;
                    // expectedWoundsFromAttacker remains 0
                } else {
                    // IN RANGE calculation
                    const effectiveS = weaponUsed.strength;
                    const effectiveAP = parseInt(weaponUsed.ap, 10) || 0;
                    const attackerBS = this.parseSaveValue(attacker.ballisticSkill);

                    // Handle Rapid Fire (only if in range)
                    if (weaponUsed.weaponType === 'Rapid Fire' && scenarioRange <= weaponRange / 2) {
                       effectiveA *= 2;
                       rapidFireBonus = true;
                    }

                    // Calculate probabilities (only if in range)
                    const pHit = this.getD6Probability(attackerBS);
                    const pWound = this.getWoundProbability(effectiveS, defender.toughness);
                    const pFailSave = this.getFailSaveProbability(defender.save, defender.invulnSave, effectiveAP);

                    // Calculate expected wounds (only if in range)
                    expectedWoundsFromAttacker = effectiveA * pHit * pWound * pFailSave;
                   
                    // Format detail string for IN RANGE
                    attackerDetailString = 
                        `  - ${attacker.name || '(Unnamed)'} (BS ${attacker.ballisticSkill})\n` +
                        `    Weapon: ${weaponUsed.name} (R:${weaponUsed.range}" S:${effectiveS} AP:${weaponAPDisplay} A:${weaponUsed.attacks}${rapidFireBonus ? 'x2' : ''} -> ${effectiveA})\n` +
                        `    Expected Wounds: ${expectedWoundsFromAttacker.toFixed(2)}`;
                }

                // Add the calculated expected wounds (0 if out of range) to total
                totalExpectedWounds += expectedWoundsFromAttacker;
                
                // Add the formatted detail string to the list
                attackerDetails.push(attackerDetailString); 
            }

            // Format final result
            let resultString = `Defender: ${defender.name || '(Unnamed)'} (T${defender.toughness}, ${defender.save}/${defender.invulnSave})\n`;
            resultString += `Total Expected Wounds Sustained: ${totalExpectedWounds.toFixed(2)}\n\n`;
            resultString += `Scenario Range: ${scenarioRange}"\n\n`; // Display scenario range
            resultString += `Attacker Breakdown:\n`;
            resultString += attackerDetails.join('\n');

            // Calculate and add efficiency metric
            let pointsPerWound = 0;
            if (totalExpectedWounds > 0) {
                pointsPerWound = totalAttackerPoints / totalExpectedWounds / totalDefenderPoints;
            } else if (totalAttackerPoints > 0) {
                pointsPerWound = Infinity; // Attackers spent points but did no wounds
            }
            
            resultString += `\n\nDefender Efficiency (Attacker Pts / Wound / Defender Pts): ${pointsPerWound === Infinity ? 'Infinite (0 wounds)' : pointsPerWound.toFixed(2)} (Higher is better)`;

            return resultString;
        },

        // Calculate outcome for opposed combat scenario (both models attack each other)
        calculateOpposedCombatOutcome(scenario, perspectiveModel) {
            // Get the target model
            if (!scenario.targetModelId) {
                return "No target selected for opposed combat.";
            }
            
            const targetModel = this.getModelById(scenario.targetModelId);
            if (!targetModel) {
                return "Target model not found.";
            }
            
            // Determine attack order based on initiative
            const firstAttacker = perspectiveModel.initiative > targetModel.initiative ? perspectiveModel : 
                                  targetModel.initiative > perspectiveModel.initiative ? targetModel : null;
            const secondAttacker = firstAttacker === perspectiveModel ? targetModel : 
                                   firstAttacker === targetModel ? perspectiveModel : null;
            
            let result = "";
            
            // Add header showing the matchup
            result += `${perspectiveModel.name} vs ${targetModel.name} - Opposed Combat\n`;
            
            // Add model stats summaries
            result += this.getModelCombatSummary(perspectiveModel, targetModel) + "\n";
            result += this.getModelCombatSummary(targetModel, perspectiveModel) + "\n";
            
            // If initiatives are equal, note that attacks happen simultaneously
            if (!firstAttacker || !secondAttacker) {
                result += "Equal initiative: Attacks are simultaneous with no penalties.\n\n";
                
                // Calculate attacks in both directions without penalty
                const perspectiveAttack = this.calculateSingleAttack(perspectiveModel, targetModel, 0);
                const targetAttack = this.calculateSingleAttack(targetModel, perspectiveModel, 0);
                
                // Format the perspective model's attack with efficiency
                result += this.formatOpposedCombatAttack(perspectiveModel, targetModel, perspectiveAttack, false);
                
                // Format the target model's attack with efficiency
                result += this.formatOpposedCombatAttack(targetModel, perspectiveModel, targetAttack, false);
            } 
            // Otherwise, calculate in initiative order with penalty for second attacker
            else {
                result += `${firstAttacker.name} has higher initiative and attacks first.\n\n`;
                
                // Calculate first attack
                const firstAttack = this.calculateSingleAttack(firstAttacker, secondAttacker, 0);
                
                // Format the first attack with efficiency
                result += this.formatOpposedCombatAttack(firstAttacker, secondAttacker, firstAttack, false);
                
                // Calculate penalty based on unsaved wounds from first attack
                const unsavedWounds = firstAttack.data.expectedUnsavedWounds;
                const secondAttackPenalty = Math.min(1, unsavedWounds); // Cap at 1 (100% penalty)
                
                // Calculate second attack with penalty
                const secondAttack = this.calculateSingleAttack(secondAttacker, firstAttacker, secondAttackPenalty);
                
                // Format the second attack with efficiency and penalty note
                result += this.formatOpposedCombatAttack(secondAttacker, firstAttacker, secondAttack, true, secondAttackPenalty);
            }
            
            return result;
        },
        
        // Helper method to format opposed combat attack display with efficiency calculations
        formatOpposedCombatAttack(attacker, defender, attackResult, hasPenalty, penalty = 0) {
            const data = attackResult.data;
            let output = `\n${attacker.name} attacks ${defender.name}`;
            
            // Add penalty note if applicable
            if (hasPenalty && penalty > 0) {
                output += ` with -${(penalty * 100).toFixed(0)}% penalty from wounds`;
            }
            output += ":\n";
            
            // Get the weapon details for display
            const meleeWeapon = data.weapon;
            const weaponUsedName = meleeWeapon ? meleeWeapon.name : 'Base Stats';
            const effectiveS = data.effectiveStrength;
            const effectiveA = data.attacks;
            const weaponAPDisplay = (data.apValue === 0) ? '-' : data.apValue;
            
            // Calculate efficiency
            const attackerPoints = this.calculatePoints(attacker);
            const efficiency = attackerPoints > 0 ? data.expectedUnsavedWounds / attackerPoints : 0;
            const saveChance = (1.0 - data.failSaveProb);
            
            // Format the attack details in the requested style
            output += `    Weapon: ${weaponUsedName} (S:${effectiveS} AP:${weaponAPDisplay} A:${effectiveA})\n`;
            output += `    Hits: ${data.expectedHits.toFixed(2)} (${(data.adjustedHitProb * 100).toFixed(0)}%)\n`;
            output += `    Wounds: ${data.expectedWounds.toFixed(2)} (${(data.woundProb * 100).toFixed(0)}%)\n`;
            output += `    Unsaved: ${data.expectedUnsavedWounds.toFixed(2)} (Save: ${(saveChance * 100).toFixed(0)}%)\n`;
            output += `    Wounds/Point: ${efficiency.toFixed(4)}\n`;
            output += `    Efficiency: ${(1000 * efficiency).toFixed(2)}`;
            
            return output;
        },
        
        // Helper method to get model combat summary info
        getModelCombatSummary(model, targetModel) {
            // Get hit roll needed text
            const hitRollNeeded = this.getHitRollNeeded(this.getHitProbability(model.weaponSkill, targetModel.weaponSkill));
            
            // Get weapon info
            let weaponInfo = "";
            if (model.assignedArmoryItemIds && model.assignedArmoryItemIds.length > 0) {
                // Try to find a melee weapon
                const meleeWeapon = this.getEquippedMeleeWeapon(model);
                if (meleeWeapon) {
                    // Get effective strength based on weapon modifier
                    let effectiveStr = this.applyStrengthModifier(model.strength, meleeWeapon.meleeStrength);
                    
                    // Get effective attacks based on weapon modifier
                    let effectiveAttacks = this.applyAttacksModifier(model.attacks, meleeWeapon.meleeAttacks);
                    
                    // Format the AP value
                    const apValue = meleeWeapon.ap ? meleeWeapon.ap : 0;
                    const apFormatted = apValue === 0 ? "-" : apValue;
                    
                    weaponInfo = `Weapon: ${meleeWeapon.name} (S:${effectiveStr} AP:${apFormatted} A:${effectiveAttacks})`;
                } else {
                    // No melee weapon found, use default stats
                    weaponInfo = `Weapon: Basic Close Combat (S:${model.strength} AP:- A:${model.attacks})`;
                }
            } else {
                // No equipped weapons, use default stats
                weaponInfo = `Weapon: Basic Close Combat (S:${model.strength} AP:- A:${model.attacks})`;
            }
            
            // Format all the stats into a summary string
            return `${model.name}: WS ${model.weaponSkill} (${hitRollNeeded} to hit) I ${model.initiative}\n${weaponInfo}`;
        },
        
        // Helper method to get equipped melee weapon
        getEquippedMeleeWeapon(model) {
            if (!model.assignedArmoryItemIds || model.assignedArmoryItemIds.length === 0) {
                return null;
            }
            
            // Find the first melee weapon in the model's equipment
            for (const itemId of model.assignedArmoryItemIds) {
                const item = this.getArmoryItemById(itemId);
                if (item && item.type === 'meleeWeapon') {
                    return item;
                }
            }
            
            return null; // No melee weapon found
        },
        
        // Helper method to calculate hit roll needed text (e.g., "3+")
        getHitRollNeeded(probability) {
            // This is a simplified version - you could expand to include other factors
            // Example: 3+ to hit is common for average WS
            let rollNeeded = "n/a";
            
            if (probability >= .1) {
                rollNeeded = "6+";
            } if (probability >= .3) {
                rollNeeded = "5+";
            } if (probability >= .5) {
                rollNeeded = "4+";
            } if (probability >= .6) {
                rollNeeded = "3+";
            } if (probability >= .8) {
                rollNeeded = "2+";
            }
            
            return rollNeeded;
        },
        
        // Helper method to calculate a single attack for opposed combat
        calculateSingleAttack(attacker, defender, penalty) {
            // Get hit probability
            const hitProb = this.getHitProbability(attacker.weaponSkill, defender.weaponSkill);
            const adjustedHitProb = Math.max(0, hitProb * (1 - penalty));
            
            // Get wound probability
            // Get effective strength if melee weapon is equipped
            const meleeWeapon = this.getEquippedMeleeWeapon(attacker);
            let effectiveStrength = attacker.strength;
            let attacks = attacker.attacks;
            
            if (meleeWeapon) {
                effectiveStrength = this.applyStrengthModifier(attacker.strength, meleeWeapon.meleeStrength);
                attacks = this.applyAttacksModifier(attacker.attacks, meleeWeapon.meleeAttacks);
            }
            
            const woundProb = this.getWoundProbability(effectiveStrength, defender.toughness);
            
            // Get save failure probability
            // Get AP value if melee weapon is equipped
            let apValue = 0;
            if (meleeWeapon && meleeWeapon.ap !== null && meleeWeapon.ap !== undefined) {
                apValue = parseInt(meleeWeapon.ap) || 0;
            }
            
            const failSaveProb = this.getFailSaveProbability(defender.save, defender.invulnSave, apValue);
            
            // Calculate expected outcomes
            const expectedHits = attacks * adjustedHitProb;
            const expectedWounds = expectedHits * woundProb;
            const expectedUnsavedWounds = expectedWounds * failSaveProb;
            
            // Format result string
            let resultString = "";
            
            // Add basic attack stats
            resultString += `Attacks: ${attacks}\n`;
            
            if (penalty > 0) {
                resultString += `Hit roll: ${adjustedHitProb.toFixed(2)} (base ${hitProb.toFixed(2)} with ${(penalty * 100).toFixed(0)}% penalty)\n`;
            } else {
                resultString += `Hit roll: ${adjustedHitProb.toFixed(2)}\n`;
            }
            
            resultString += `Wound roll: ${woundProb.toFixed(2)}\n`;
            resultString += `Failed save: ${failSaveProb.toFixed(2)}\n`;
            resultString += `Expected hits: ${expectedHits.toFixed(2)}\n`;
            resultString += `Expected wounds: ${expectedWounds.toFixed(2)}\n`;
            resultString += `Expected unsaved wounds: ${expectedUnsavedWounds.toFixed(2)}\n`;
            
            // Return both the formatted string and a data object
            return {
                resultString,
                data: {
                    weapon: meleeWeapon,
                    baseHitProb: hitProb,
                    adjustedHitProb,
                    woundProb,
                    failSaveProb,
                    attacks,
                    effectiveStrength,
                    apValue,
                    expectedHits,
                    expectedWounds,
                    expectedUnsavedWounds,
                    penalty
                }
            };
        },

        // --- Helper Functions for Stat Modifiers ---
        applyStrengthModifier(baseStrength, modifier) {
            if (modifier === '-' || modifier === null || modifier === undefined) {
                return baseStrength;
            }
            if (typeof modifier === 'string') {
                if (modifier.toLowerCase() === 'x2') {
                    return baseStrength * 2;
                }
                if (modifier.startsWith('+')) {
                    return baseStrength + parseInt(modifier.substring(1), 10);
                }
                if (modifier.startsWith('-')) {
                    return baseStrength - parseInt(modifier.substring(1), 10);
                }
                // Potentially handle fixed values later if needed
                const fixedValue = parseInt(modifier, 10);
                if (!isNaN(fixedValue)) return fixedValue; // If it's just a number, use it directly?
            }
             // Default case if modifier is weird
            return baseStrength; 
        },

        applyAttacksModifier(baseAttacks, modifier) {
            if (modifier === '-' || modifier === null || modifier === undefined) {
                return baseAttacks;
            }
            if (typeof modifier === 'string') {
                 if (modifier.toLowerCase() === 'x2') {
                     return baseAttacks * 2;
                 }
                if (modifier.startsWith('+')) {
                    return baseAttacks + parseInt(modifier.substring(1), 10);
                }
                if (modifier.startsWith('-')) {
                    // Ensure attacks don't go below 1 (or 0? Let's say 1)
                    return Math.max(1, baseAttacks - parseInt(modifier.substring(1), 10));
                }
                // Potentially handle fixed values later
                const fixedValue = parseInt(modifier, 10);
                if (!isNaN(fixedValue)) return fixedValue; // If it's just a number, use it directly?
            }
             // Default case
            return baseAttacks;
        },
        // --- End Helper Functions ---

        // Helper to get Armory Item by ID or Name
        getArmoryItemById(identifier) {
            if (typeof identifier === 'number') {
                // Lookup by ID if the identifier is a number
                return this.armoryItems.find(item => item.id === identifier);
            } else if (typeof identifier === 'string') {
                // Lookup by name (case-insensitive) if the identifier is a string
                const lowerCaseName = identifier.toLowerCase();
                return this.armoryItems.find(item => item.name.toLowerCase() === lowerCaseName);
            }
            return null; // Return null if identifier is neither or not found
        },

        // --- Armory Item Management ---

        // --- Add Direct Equipment Assignment Functions ---
        addEquipmentToModel(itemId) {
            if (this.selectedModel && itemId) {
                // Initialize array if it doesn't exist
                if (!this.selectedModel.assignedArmoryItemIds) {
                    this.selectedModel.assignedArmoryItemIds = [];
                }
                
                // Only add if not already present
                if (!this.selectedModel.assignedArmoryItemIds.includes(itemId)) {
                    this.selectedModel.assignedArmoryItemIds.push(itemId);
                    this.saveModels(); // Save after adding equipment
                }
            }
        },

        removeEquipmentFromModel(itemId) {
            if (this.selectedModel && this.selectedModel.assignedArmoryItemIds && itemId) {
                const index = this.selectedModel.assignedArmoryItemIds.indexOf(itemId);
                if (index !== -1) {
                    this.selectedModel.assignedArmoryItemIds.splice(index, 1);
                    this.saveModels(); // Save after removing equipment
                }
            }
        },

        // Computed property/helper for available equipment
        get availableArmoryItemsForSelectedModel() {
            if (!this.selectedModel) return [];
            
            const assignedIds = this.selectedModel.assignedArmoryItemIds || [];
            const searchTerm = this.equipmentSearchTerm.toLowerCase();

            return this.armoryItems.filter(item => {
                // Check if already assigned (by ID or Name)
                const isAssigned = assignedIds.some(assignedId => {
                    if (typeof assignedId === 'number') {
                        return assignedId === item.id;
                    } else if (typeof assignedId === 'string') {
                        return assignedId.toLowerCase() === item.name.toLowerCase();
                    }
                    return false;
                });
                if (isAssigned) {
                    return false;
                }

                // Check if matches search term (if term exists)
                if (searchTerm && !item.name.toLowerCase().includes(searchTerm)) {
                    return false;
                }
                return true; // Passes both checks
            });
        },
        // --- End Direct Equipment Assignment Functions ---

        // ++ Add function to calculate cost of a single equipment item for a model ++
        getEquipmentCost(model, itemId) {
            if (!model || !itemId) return 0;
            const item = this.getArmoryItemById(itemId);
            // Return base cost if item not found, or has no valid weights
            if (!item || !item.statWeights || !Array.isArray(item.statWeights)) {
                return item?.baseCost || 0;
            }

            // Calculate the model's base stat point values (including multipliers)
            const baseValues = {
                movement: this.getBasePoints('movement', model.movement),
                weaponSkill: this.getBasePoints('weaponSkill', model.weaponSkill),
                ballisticSkill: this.getBasePoints('ballisticSkill', model.ballisticSkill),
                strength: this.getBasePoints('strength', model.strength),
                toughness: this.getBasePoints('toughness', model.toughness),
                wounds: this.getBasePoints('wounds', model.wounds),
                initiative: this.getBasePoints('initiative', model.initiative),
                attacks: this.getBasePoints('attacks', model.attacks),
                leadership: this.getBasePoints('leadership', model.leadership),
                save: this.getBasePoints('save', model.save),
                invulnSave: this.getBasePoints('invulnSave', model.invulnSave)
            };

            let currentItemCost = item.baseCost || 0;
            const statOrder = this.getStatOrder();

            statOrder.forEach((stat, index) => {
                // Ensure the index is within the bounds of the item's statWeights array
                if (index < item.statWeights.length) {
                    const modelStatBaseCost = baseValues[stat]; // Use model's base value for the stat
                    const itemWeight = item.statWeights[index];
                    currentItemCost += modelStatBaseCost * itemWeight;
                }
            });

            return currentItemCost;
        },
        // ++ End function ++

        // --- End Helper Functions ---

        // ++ Add function to map item weights (-2 to 2) to color scale (0 to 2) ++
        mapWeightToColorValue(weight) {
            // Ensure weight is treated as a number
            const numWeight = parseFloat(weight) || 0;
            // Clamp the weight between -2 and 2
            const clampedWeight = Math.max(-2, Math.min(2, numWeight));
            // Map [-2, 2] to [0, 2]
            return (clampedWeight + 2) / 2;
        },
        // ++ End function ++

        // ++ Add Armory Stat Spinner Functions ++
        incrementArmoryStat(item, statName) {
            const maxValue = 10; // Assuming a general max value for simplicity
            if (item[statName] < maxValue) {
                item[statName]++;
            }
            this.saveArmoryItems(); // Save after change
        },
        decrementArmoryStat(item, statName) {
            const minValue = 1; // Assuming a general min value
            if (item[statName] > minValue) {
                item[statName]--;
            }
            this.saveArmoryItems(); // Save after change
        },
        incrementArmoryAP(item) {
            let currentAP = parseInt(item.ap, 10);
            if (isNaN(currentAP) || currentAP === 0) { item.ap = 6; }
            else if (currentAP < 6) { item.ap = currentAP + 1; }
            this.saveArmoryItems();
        },
        decrementArmoryAP(item) {
            let currentAP = parseInt(item.ap, 10);
            if (!isNaN(currentAP)) {
                if (currentAP > 1 && currentAP <= 6) { item.ap = currentAP - 1; }
                else if (currentAP === 1) { item.ap = 1; }
                else { item.ap = 1; }
            } else { item.ap = 6; }
            this.saveArmoryItems();
        },
        incrementArmoryWeight(item, index) {
            const maxValue = 2.0; const step = 0.1;
            let currentValue = parseFloat(item.statWeights[index]) || 0;
            if (currentValue < maxValue) {
                item.statWeights[index] = parseFloat((currentValue + step).toFixed(1));
            }
            this.saveArmoryItems();
        },
        decrementArmoryWeight(item, index) {
            const minValue = -2.0; const step = 0.1;
            let currentValue = parseFloat(item.statWeights[index]) || 0;
            if (currentValue > minValue) {
                item.statWeights[index] = parseFloat((currentValue - step).toFixed(1));
            }
            this.saveArmoryItems();
        },
        // ++ End Armory Stat Spinner Functions ++

        // Add watchers for all point value lookup tables
        setupPointValuePersistence() {
            // For each stat in pointValueLookups, set up a deep watcher
            const stats = Object.keys(this.pointValueLookups);
            stats.forEach(stat => {
                this.$watch(`pointValueLookups.${stat}`, (newValue) => {
                    localStorage.setItem('pointValueLookups', JSON.stringify(this.pointValueLookups));
                }, { deep: true });
            });

            // Watch stat multipliers
            this.$watch('statMultipliers', (newValue) => {
                localStorage.setItem('statMultipliers', JSON.stringify(newValue));
            }, { deep: true });

            // Save weight matrix when changed
            this.$watch('statWeightMatrix', (newValue) => {
                localStorage.setItem('statWeightMatrix', JSON.stringify(newValue));
            }, { deep: true });

            // Watch base model cost
            this.$watch('baseModelCost', (newValue) => {
                localStorage.setItem('baseModelCost', JSON.stringify(newValue));
            });

            // Watch models for changes and save them
            this.$watch('models', (newValue) => {
                this.saveModels();
            }, { deep: true });
        },

        // Method to clear all locally saved point configuration
        clearAllSavedConfig() {
            if (confirm('This will reset all point configuration to default values. Proceed?')) {
                // Clear point-related localStorage items
                localStorage.removeItem('pointValueLookups');
                localStorage.removeItem('statMultipliers');
                localStorage.removeItem('statWeightMatrix');
                localStorage.removeItem('baseModelCost');
                localStorage.removeItem('useRelativePoints');
                localStorage.removeItem('relativePointsBase');
                localStorage.removeItem('grimResolverModels'); // Also clear saved models
                
                // Reset values to defaults
                this.pointValueLookups = this.getDefaultPointValueLookups();
                this.statMultipliers = this.getInitialMultipliers();
                this.statWeightMatrix = this.getInitialWeightMatrix();
                this.baseModelCost = 10; // Default value
                this.useRelativePoints = true; // Default value
                this.relativePointsBase = 5; // Default value
                
                // Force UI update
                this.$forceUpdate();
                
                // Show confirmation
                this.showNotification('All point configuration data has been reset to defaults', 5000);
            }
        },
        
        // Method to get default point value lookups
        getDefaultPointValueLookups() {
            return {
                movement: {
                    1: -2, 2: -1, 3: 0, 4: 1, 5: 2, 6: 3, 7: 4,
                    8: 5, 9: 6, 10: 7, 11: 8, 12: 9
                },
                weaponSkill: {
                    1: 0, 2: 1, 3: 2, 4: 3, 5: 5, 6: 6,
                    7: 7, 8: 8, 9: 9, 10: 10
                },
                ballisticSkill: {
                    '2+': 12, '3+': 9, '4+': 6, '5+': 3, '6+': 1, '-': 0
                },
                strength: {
                    1: -1, 2: 0, 3: 1, 4: 2, 5: 5, 6: 8,
                    7: 11, 8: 12, 9: 13, 10: 14
                },
                toughness: {
                    1: -5, 2: -2, 3: 1, 4: 4, 5: 7, 6: 10,
                    7: 13, 8: 16, 9: 19, 10: 22
                },
                wounds: {
                    1: 0, 2: 5, 3: 10, 4: 15, 5: 20, 6: 25,
                    7: 30, 8: 35, 9: 40, 10: 45
                },
                initiative: {
                    1: -3, 2: -1, 3: 0, 4: 1, 5: 3, 6: 5,
                    7: 7, 8: 10, 9: 13, 10: 16
                },
                attacks: {
                    1: 1, 2: 4, 3: 8, 4: 12, 5: 16, 6: 20,
                    7: 24, 8: 28, 9: 32, 10: 36
                },
                leadership: {
                    1: -5, 2: -4, 3: -3, 4: -2, 5: -1, 6: 0,
                    7: 1, 8: 2, 9: 3, 10: 4
                },
                save: {
                    '2+': 16, '3+': 8, '4+': 4, '5+': 2, '6+': 1, '-': 0
                },
                invulnSave: {
                    '2+': 100, '3+': 50, '4+': 20, '5+': 10, '6+': 5, '-': 0
                }
            };
        },
        
        saveArmoryItems() {
            try {
                const armoryJson = JSON.stringify(this.armoryItems);
                localStorage.setItem('grimResolverArmoryItems', armoryJson);
                this.showNotification('Armory items saved');
            } catch (error) {
                console.error('Error saving armory items:', error);
                this.showNotification('Error saving armory items', 5000);
            }
        },
        
        addArmoryItem() {
            // Generate a unique ID for the new item
            const newItemId = Date.now().toString();
            
            // Create default empty array for statWeights if armoryItems doesn't exist yet
            if (!this.armoryItems) {
                this.armoryItems = [];
            }
            
            // Create a new item with default values
            const newItem = {
                id: newItemId,
                name: "New Item",
                type: "wargear",
                description: "",
                baseCost: 0,
                // Default stat weights (corresponding to the 9 stats in the order they appear)
                statWeights: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            
            // Add the new item to the array
            this.armoryItems.push(newItem);
            
            // Set the new item as selected
            this.selectedArmoryItemId = newItemId;
            
            // Save the updated items
            this.saveArmoryItems();
            
            return newItemId;
        },

        // Helper method to save models to localStorage
        saveModels(showNotification = false) {
            try {
                localStorage.setItem('grimResolverModels', JSON.stringify(this.models));
                console.log('Models saved successfully.');
                if (showNotification) {
                    this.showNotification('Models saved to local storage');
                }
            } catch (e) {
                console.error('Error saving models:', e);
                this.showNotification('Error saving models to local storage', 5000);
            }
        },

    }; // END OF appData return object
} 