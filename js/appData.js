function appData() {
    return {
        models: [
            {
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
                invulnSave: '-'
            },
            {
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
                invulnSave: '-'
            },
            {
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
                invulnSave: '5+'
            },
            {
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
                invulnSave: '-'
            },
            {
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
                invulnSave: '-'
            }
        ],
        selectedModel: null,
        showPointConfig: true,
        currentStat: 'weights',
        
        // Scenario Simulation Data
        scenarioConfig: {
            meleeAttack: { targetIndex: -1 }
            // Add other scenarios like 'rangedAttack', 'meleeDefense', 'rangedDefense' here later
        },
        // currentScenarioType: 'meleeAttack', // Add this later when switching scenarios is needed

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
            movement: 1.0,
            weaponSkill: 1.0,
            ballisticSkill: 1.0,
            strength: 1.0,
            toughness: 1.0,
            wounds: 1.0,
            initiative: 1.0,
            attacks: 1.0,
            leadership: 1.0,
            save: 1.0,
            invulnSave: 1.0
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
            }
            
            // Load saved weight matrix if it exists
            const savedWeightMatrix = localStorage.getItem('statWeightMatrix');
            if (savedWeightMatrix) {
                this.statWeightMatrix = JSON.parse(savedWeightMatrix);
            }

            // Load saved stat multipliers if they exist
            const savedStatMultipliers = localStorage.getItem('statMultipliers');
            if (savedStatMultipliers) {
                this.statMultipliers = JSON.parse(savedStatMultipliers);
            } else {
                // Ensure default multipliers are set if not found in storage
                this.statMultipliers = {
                    movement: 1.0, weaponSkill: 1.0, ballisticSkill: 1.25, strength: 1.0,
                    toughness: 1.0, wounds: 1.0, initiative: 1.0, attacks: 1.0,
                    leadership: 1.0, save: 1.5, invulnSave: 1.0
                };
            }

            // Initialize the first model as selected by default
            if (this.models.length > 0) {
                this.selectedModel = this.models[0];
            }
        },
        
        addModel() {
            const lastModel = this.models[this.models.length - 1];
            const newModel = {
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
                invulnSave: lastModel.invulnSave
            };
            this.models.push(newModel);
            this.selectedModel = newModel; // Select the newly added model
        },
        
        duplicateModel(index) {
            const modelToDuplicate = this.models[index];
            const newModel = {
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
                invulnSave: modelToDuplicate.invulnSave
            };
            this.models.splice(index + 1, 0, newModel);
            this.selectedModel = newModel; // Select the newly duplicated model
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
                }
            }
        },
        
        calculatePoints(model) {
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
            
            // Return raw total points
            return 10 + Object.values(adjustedValues).reduce((a, b) => a + b, 0);
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
            
            // Return calculation details
            return {
                baseValues: {...baseValues},
                adjustedValues: {...adjustedValues},
                total: 10 + Object.values(adjustedValues).reduce((a, b) => a + b, 0)
            };
        },

        getRelativePoints(model, index) {
            if (index === 0) {
                return (5).toFixed(2); // First model is always 5, ensure consistent formatting
            }
            if (this.models.length < 1) {
                return '-'; // Should not happen, but safeguard
            }

            const firstModelPoints = this.calculatePoints(this.models[0]);
            const currentModelPoints = this.calculatePoints(model);

            if (firstModelPoints <= 0) { // Check for <= 0 to handle negative points safely
                return '-'; // Avoid division by zero or negative base
            }

            return ((currentModelPoints / firstModelPoints) * 5).toFixed(2); // Calculate relative points, rounded
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
            const maxValue = prop === 'movement' ? 12 : 10;  // Movement caps at 12, others at 10
            if (model[prop] < maxValue) {
                model[prop]++;
            }
        },
        // Function to decrement numeric skill value
        decrementNumeric(model, prop) {
            if (model[prop] > 1) {  // Floor at 1
                model[prop]--;
            }
        },
        // Function to increment skill value with plus sign
        incrementSkill(model, prop) {
            if (model[prop] === '6+') {
                model[prop] = '-';  // When reaching beyond 6+, use dash
                return;
            }
            
            if (model[prop] === '-') {
                return;  // Dash is the maximum, can't increment further
            }
            
            const value = parseInt(model[prop]);
            if (!isNaN(value) && value < 6) {  // Cap at 6+
                model[prop] = (value + 1) + '+';
            }
        },
        // Function to decrement skill value with plus sign
        decrementSkill(model, prop) {
            if (model[prop] === '-') {
                model[prop] = '6+';  // Go back to 6+ when decrementing from dash
                return;
            }
            
            const value = parseInt(model[prop]);
            if (!isNaN(value) && value > 2) {  // Floor at 2+
                model[prop] = (value - 1) + '+';
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
                            name: values[0] === 'Unnamed' ? '' : values[0],
                            movement: parseInt(values[1]),
                            weaponSkill: parseInt(values[2]),
                            ballisticSkill: values[3],
                            strength: parseInt(values[4]),
                            toughness: parseInt(values[5]),
                            wounds: parseInt(values[6]),
                            initiative: parseInt(values[7]),
                            attacks: parseInt(values[8]),
                            leadership: parseInt(values[9]),
                            save: values[10],
                            invulnSave: values[11]
                        };
                    });
                    
                    // Replace current models with imported ones
                    this.models = importedModels;
                    
                    // Select the first imported model
                    if (this.models.length > 0) {
                        this.selectedModel = this.models[0];
                    }
                } catch (error) {
                    alert('Error importing the file. Make sure it is a valid CSV.');
                    console.error('Import error:', error);
                }
                
                // Clear file input
                event.target.value = '';
            };
            reader.readAsText(file);
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
        },

        // Import point values from JSON
        importPointValues(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    
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
                                this.statMultipliers = {
                                    movement: 1.0, weaponSkill: 1.0, ballisticSkill: 1.0, strength: 1.0,
                                    toughness: 1.0, wounds: 1.0, initiative: 1.0, attacks: 1.0,
                                    leadership: 1.0, save: 1.0, invulnSave: 1.0
                                };
                                localStorage.removeItem('statMultipliers'); // Remove potentially old value
                            }

                            // Import weight matrix if available
                            if (imported.statWeightMatrix) {
                                if (confirm('The imported file contains a weight matrix. Do you want to import it as well?')) {
                                    this.statWeightMatrix = imported.statWeightMatrix;
                                    localStorage.setItem('statWeightMatrix', JSON.stringify(imported.statWeightMatrix));
                                }
                            }
                            
                            alert('Point values imported successfully!');
                        } else {
                            alert('Invalid point values file. Missing required stats.');
                        }
                    } else {
                        alert('Invalid point values file. Missing pointValueLookups object.');
                    }
                } catch (error) {
                    alert('Error importing point values. Make sure it is a valid JSON file.');
                    console.error('Import error:', error);
                }
                event.target.value = '';
            };
            reader.readAsText(file);
        },

        formatStatName(stat) {
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
            alert('Weight matrix saved successfully!');
        },

        // Reset the weight matrix to default values
        resetWeightMatrix() {
            // Implement logic to reset matrix to default values
            console.log('Resetting matrix...');
            this.statWeightMatrix = this.getInitialWeightMatrix(); // Assuming getInitialWeightMatrix exists
            this.statMultipliers = this.getInitialMultipliers(); // Assuming getInitialMultipliers exists
            this.saveWeightMatrix(); // Optionally save immediately
            this.$forceUpdate(); // Force Alpine to re-render
        },

        includeWeightMatrixInExport: false,

        // Get capabilities for the selected model
        getCapabilities(model) {
            // First get the point breakdown with all adjusted values
            const breakdown = this.getPointBreakdown(model);
            const adjustedValues = breakdown.adjustedValues;
            
            // Calculate each capability
            const shooting = Math.max(0, adjustedValues.ballisticSkill);
            
            const combat = Math.max(0, 
                adjustedValues.weaponSkill + 
                adjustedValues.strength + 
                adjustedValues.attacks +
                adjustedValues.initiative
            );
            
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

        // --- Scenario Simulation Logic ---

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
            if (attackerWS >= targetWS * 2) {
                rollNeeded = 2;
            } else if (attackerWS > targetWS) {
                rollNeeded = 3;
            } else if (attackerWS == targetWS) {
                rollNeeded = 4;
            } else if (attackerWS * 2 <= targetWS) {
                rollNeeded = 6;
            } else { // attackerWS < targetWS but not half or less
                rollNeeded = 5;
            }
            return this.getD6Probability(rollNeeded);
        },

        // Calculate wound probability based on S vs T comparison
        getWoundProbability(attackerS, targetT) {
            let rollNeeded;
            if (attackerS >= targetT * 2) {
                rollNeeded = 2;
            } else if (attackerS > targetT) {
                rollNeeded = 3;
            } else if (attackerS == targetT) {
                rollNeeded = 4;
            } else if (attackerS * 2 <= targetT) {
                rollNeeded = 6;
            } else { // attackerS < targetT but not half or less
                rollNeeded = 5;
            }
            // Add check for T0/Invalid toughness? Assume T >= 1 for now
            if (targetT <= 0) return 1.0; // Auto-wound if T is 0 or less? Or handle error?
            return this.getD6Probability(rollNeeded);
        },

        // Calculate probability of failing a save (ignoring AP for now)
        getFailSaveProbability(targetSave, targetInvuln) {
            const saveVal = this.parseSaveValue(targetSave);
            const invulnVal = this.parseSaveValue(targetInvuln);
            const bestSave = Math.min(saveVal, invulnVal); // Takes the better of the two saves

            if (bestSave >= 7) return 1.0; // No save or 7+ save always fails

            // Probability of *failing* is (rollNeeded - 1) / 6
            return 1.0 - this.getD6Probability(bestSave);
        },

        // Main function to calculate scenario outcomes (currently only Melee Attack)
        calculateScenarioOutcome() {
            if (!this.selectedModel || this.scenarioConfig.meleeAttack.targetIndex < 0) {
                return "Select an attacker and target model.";
            }

            const attacker = this.selectedModel;
            const target = this.models[this.scenarioConfig.meleeAttack.targetIndex];

            if (!attacker || !target) {
                return "Error: Attacker or Target model not found.";
            }
            
            // Check for necessary stats
            if (typeof attacker.attacks === 'undefined' || attacker.attacks === null ||
                typeof attacker.weaponSkill === 'undefined' || attacker.weaponSkill === null ||
                typeof attacker.strength === 'undefined' || attacker.strength === null ||
                typeof target.weaponSkill === 'undefined' || target.weaponSkill === null || // Needed for WS comparison
                typeof target.toughness === 'undefined' || target.toughness === null ||
                typeof target.save === 'undefined' || typeof target.invulnSave === 'undefined') {
                return "Error: Missing required stats on attacker or target.";
            }


            // Calculate probabilities
            const pHit = this.getHitProbability(attacker.weaponSkill, target.weaponSkill);
            const pWound = this.getWoundProbability(attacker.strength, target.toughness);
            const pFailSave = this.getFailSaveProbability(target.save, target.invulnSave);

            // --- TEMP LOGGING ---
            console.log(`Scenario Calc: Attacker=${attacker.name}, Target=${target.name}`);
            console.log(`  Raw Stats: Att(WS${attacker.weaponSkill}, S${attacker.strength}, A${attacker.attacks}), Tgt(WS${target.weaponSkill}, T${target.toughness}, Sv${target.save}, Inv${target.invulnSave})`);
            console.log(`  Probabilities: pHit=${pHit.toFixed(3)}, pWound=${pWound.toFixed(3)}, pFailSave=${pFailSave.toFixed(3)}`);
            // --- END TEMP LOGGING ---

            // Calculate expected wounds (assuming 1 damage per unsaved wound for now)
            const expectedWounds = attacker.attacks * pHit * pWound * pFailSave;
            
            // Calculate expected wounds per point
            const attackerPoints = this.getRelativePoints(attacker); // Use existing function
            const efficiency = attackerPoints > 0 ? expectedWounds / attackerPoints : 0;


            return `Combat against ${target.name || 'Unnamed Target'}: \n` +
                   `  Hits: ${(attacker.attacks * pHit).toFixed(2)} (${(pHit * 100).toFixed(0)}%)\n` +
                   `  Wounds: ${(attacker.attacks * pHit * pWound).toFixed(2)} (${(pWound * 100).toFixed(0)}%)\n` +
                   `  Unsaved Wounds: ${expectedWounds.toFixed(2)} (Save: ${((1-pFailSave) * 100).toFixed(0)}%)\n` +
                   `  Expected Wounds per Point: ${(efficiency).toFixed(4)}`;
        },

        // --- End Scenario Simulation Logic ---
    };
} 