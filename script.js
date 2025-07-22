// Maritime CO2 Calculator - Main JavaScript File
$(document).ready(function() {
    
    // Enhanced route data with comprehensive voyage leg information
    const baselineData = {
        narvik: {
            name: "Narvik Route",
            description: "Rotterdam - Narvik - Hamburg - Elbe 1",
            baseline: {
                "Ballast": { speed: 13.0, cons: 43.0 },
                "Laden": { speed: 12.0, cons: 43.0 },
                "Loading/Discharging": { speed: 0, cons: 4.0 }
            },
            legs: [
                { 
                    name: "Pre-Ballast ECA", 
                    distance: 629, 
                    speed: 13, 
                    baseDays: 2.264, 
                    adjMarginDays: 2.604, 
                    lfoBase: 0, 
                    mgoBase: 111.97, 
                    hfoBase: 0, 
                    co2Exposure: 434.03, 
                    co2WTW: 434.03, 
                    totalCO2: 434.03,
                    type: 'ballast-eca',
                    description: 'Ballast voyage in ECA zone before loading'
                },
                { 
                    name: "Pre-Ballast Non-ECA", 
                    distance: 385, 
                    speed: 13, 
                    baseDays: 1.387, 
                    adjMarginDays: 1.595, 
                    lfoBase: 68.59, 
                    mgoBase: 0, 
                    hfoBase: 0, 
                    co2Exposure: 257.00, 
                    co2WTW: 257.00, 
                    totalCO2: 257.00,
                    type: 'ballast-non-eca',
                    description: 'Ballast voyage outside ECA zones'
                },
                { 
                    name: "Loading", 
                    distance: 0, 
                    speed: 0, 
                    baseDays: 2.8000, 
                    adjMarginDays: 2.8000, 
                    lfoBase: 0, 
                    mgoBase: 11.2, 
                    hfoBase: 0, 
                    co2Exposure: 43.47, 
                    co2WTW: 43.78, 
                    totalCO2: 43.47,
                    type: 'port-loading',
                    description: 'Loading operations at Narvik'
                },
                { 
                    name: "Laden ECA", 
                    distance: 586, 
                    speed: 12, 
                    baseDays: 2.035, 
                    adjMarginDays: 2.340, 
                    lfoBase: 0, 
                    mgoBase: 100.64, 
                    hfoBase: 0, 
                    co2Exposure: 390.08, 
                    co2WTW: 390.08, 
                    totalCO2: 390.08,
                    type: 'laden-eca',
                    description: 'Laden voyage in ECA zone'
                },
                { 
                    name: "Laden Non-ECA", 
                    distance: 497, 
                    speed: 12, 
                    baseDays: 1.725, 
                    adjMarginDays: 1.984, 
                    lfoBase: 85.31, 
                    mgoBase: 0, 
                    hfoBase: 0, 
                    co2Exposure: 319.65, 
                    co2WTW: 319.65, 
                    totalCO2: 319.65,
                    type: 'laden-non-eca',
                    description: 'Laden voyage outside ECA zones'
                },
                { 
                    name: "Discharging", 
                    distance: 0, 
                    speed: 0, 
                    baseDays: 3.8000, 
                    adjMarginDays: 3.8000, 
                    lfoBase: 0, 
                    mgoBase: 15.2, 
                    hfoBase: 0, 
                    co2Exposure: 58.98, 
                    co2WTW: 59.39, 
                    totalCO2: 58.98,
                    type: 'port-discharging',
                    description: 'Discharging operations at Hamburg'
                },
                { 
                    name: "Post-Ballast ECA", 
                    distance: 84, 
                    speed: 13, 
                    baseDays: 0.302, 
                    adjMarginDays: 0.348, 
                    lfoBase: 0, 
                    mgoBase: 14.94, 
                    hfoBase: 0, 
                    co2Exposure: 57.92, 
                    co2WTW: 57.92, 
                    totalCO2: 57.92,
                    type: 'ballast-eca',
                    description: 'Ballast voyage in ECA zone after discharge'
                }
            ]
        },
        "seven-island": {
            name: "Seven Island Baseline",
            description: "Alternative baseline route",
            baseline: {
                "Ballast": { speed: 14.0, cons: 41.0 },
                "Laden": { speed: 13.0, cons: 41.0 },
                "Loading/Discharging": { speed: 0, cons: 3.5 }
            },
            legs: [
                { 
                    name: "Pre-Ballast ECA", 
                    distance: 1528, 
                    speed: 13, 
                    baseDays: 5.505, 
                    adjMarginDays: 6.331, 
                    lfoBase: 0, 
                    mgoBase: 272.23, 
                    hfoBase: 0, 
                    co2Exposure: 1055.08, 
                    co2WTW: 1055.08, 
                    totalCO2: 1055.08,
                    type: 'ballast-eca',
                    description: 'Ballast voyage in ECA zone before loading'
                },
                { 
                    name: "Pre-Ballast Non-ECA", 
                    distance: 1567, 
                    speed: 13, 
                    baseDays: 5.645, 
                    adjMarginDays: 6.492, 
                    lfoBase: 279.14, 
                    mgoBase: 0, 
                    hfoBase: 0, 
                    co2Exposure: 1046.21, 
                    co2WTW: 1046.21, 
                    totalCO2: 1046.21,
                    type: 'ballast-non-eca',
                    description: 'Ballast voyage outside ECA zones'
                },
                { 
                    name: "Loading", 
                    distance: 0, 
                    speed: 0, 
                    baseDays: 2.3000, 
                    adjMarginDays: 2.3000, 
                    lfoBase: 0, 
                    mgoBase: 9.2, 
                    hfoBase: 0, 
                    co2Exposure: 35.71, 
                    co2WTW: 35.96, 
                    totalCO2: 35.71,
                    type: 'port-loading',
                    description: 'Loading operations at Seven Island'
                },
                { 
                    name: "Laden ECA", 
                    distance: 1609, 
                    speed: 12, 
                    baseDays: 5.586, 
                    adjMarginDays: 6.424, 
                    lfoBase: 0, 
                    mgoBase: 276.23, 
                    hfoBase: 0, 
                    co2Exposure: 1070.86, 
                    co2WTW: 1070.86, 
                    totalCO2: 1070.86,
                    type: 'laden-eca',
                    description: 'Laden voyage in ECA zone'
                },
                { 
                    name: "Laden Non-ECA", 
                    distance: 1571, 
                    speed: 12, 
                    baseDays: 5.454, 
                    adjMarginDays: 6.272, 
                    lfoBase: 269.69, 
                    mgoBase: 0, 
                    hfoBase: 0, 
                    co2Exposure: 1010.23, 
                    co2WTW: 1010.23, 
                    totalCO2: 1010.23,
                    type: 'laden-non-eca',
                    description: 'Laden voyage outside ECA zones'
                },
                { 
                    name: "Discharging", 
                    distance: 0, 
                    speed: 0, 
                    baseDays: 3.8000, 
                    adjMarginDays: 3.8000, 
                    lfoBase: 0, 
                    mgoBase: 15.2, 
                    hfoBase: 0, 
                    co2Exposure: 58.98, 
                    co2WTW: 59.39, 
                    totalCO2: 58.98,
                    type: 'port-discharging',
                    description: 'Discharging operations at Hamburg'
                },
                { 
                    name: "Post-Ballast ECA", 
                    distance: 84, 
                    speed: 13, 
                    baseDays: 0.302, 
                    adjMarginDays: 0.348, 
                    lfoBase: 0, 
                    mgoBase: 14.94, 
                    hfoBase: 0, 
                    co2Exposure: 57.92, 
                    co2WTW: 57.92, 
                    totalCO2: 57.92,
                    type: 'ballast-eca',
                    description: 'Ballast voyage in ECA zone after discharge'
                }
            ]
        }
    };

    // Fuel emission factors (tonnes CO2 per tonne fuel)
    const emissionFactors = {
        lfo: 3.747, // LFO emission factor
        mgo: 3.876, // MGO emission factor  
        hfo: 3.716  // HFO emission factor
    };

    // Route baselines (gCO2 per 1000MT cargo) - using LFO for Non-ECA areas
    const routeBaselines = {
        'narvik': 11.12,        // Narvik Route baseline
        'seven-island': 30.80   // Seven Island baseline
    };

    // Theme management
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            $('html').addClass('dark');
        }
    }

    function toggleTheme() {
        $('html').toggleClass('dark');
        const isDark = $('html').hasClass('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Initialize theme
    initializeTheme();

    // Theme toggle event
    $('#themeToggle').on('click', toggleTheme);

    // Route selection handling
    $('input[name="route"]').on('change', function() {
        $('.route-option').removeClass('border-maritime-500 bg-maritime-50');
        $(this).closest('.route-option').addClass('border-maritime-500 bg-maritime-50');
        
        // Get the selected route and update baseline cards immediately
        const selectedRoute = $(this).val();
        const baselineCO2 = routeBaselines[selectedRoute] || routeBaselines['narvik'];
        
        console.log('DEBUG Route Change:');
        console.log('- Selected route:', selectedRoute);
        console.log('- routeBaselines object:', routeBaselines);
        console.log('- Calculated baselineCO2:', baselineCO2);
        console.log('- Card will show:', baselineCO2.toFixed(2));
        
        // Update the baseline cards immediately
        $('#originalBaselineCard').text(baselineCO2.toFixed(2));
        $('#adjBaselineCard').text(baselineCO2.toFixed(2));
        
        console.log('Route changed to:', selectedRoute, 'Baseline:', baselineCO2.toFixed(2));
        
        // Update detailed table with new route data
        updateDetailedTable();
        
        // Recalculate if form is already filled
        if (validateInputs()) {
            calculateDirectFuelEmissions();
        }
    });

    // Function to dynamically populate detailed table based on route selection
    function updateDetailedTable() {
        const selectedRoute = $('input[name="route"]:checked').val();
        if (!selectedRoute) return;
        
        const routeData = baselineData[selectedRoute];
        const tbody = $('#detailedTableBody');
        tbody.empty();
        
        routeData.legs.forEach((leg, index) => {
            // Determine voyage type class and icon
            let voyageTypeClass = '';
            let voyageIcon = '';
            if (leg.type && leg.type.includes('ballast')) {
                voyageTypeClass = 'voyage-leg-ballast';
                voyageIcon = '⚓';
            } else if (leg.type && leg.type.includes('laden')) {
                voyageTypeClass = 'voyage-leg-laden';
                voyageIcon = '📦';
            } else if (leg.type && leg.type.includes('port')) {
                voyageTypeClass = 'voyage-leg-port';
                voyageIcon = '🏭';
            }

            // Add fuel type styling for consumption columns
            const lfoClass = leg.lfoBase > 0 ? 'fuel-type-lfo' : '';
            const mgoClass = leg.mgoBase > 0 ? 'fuel-type-mgo' : '';
            const hfoClass = leg.hfoBase > 0 ? 'fuel-type-hfo' : '';

            const row = $(`
                <tr class="table-cell-animate" style="animation-delay: ${index * 0.05}s">
                    <td class="table-leg-name">${leg.name}</td>
                    <td class="table-numeric">${leg.distance}</td>
                    <td class="table-numeric">${leg.speed}</td>
                    <td class="table-numeric">${leg.baseDays}</td>
                    <td class="table-numeric">${leg.adjMarginDays}</td>
                    <td class="table-numeric ${lfoClass}">${leg.lfoBase}</td>
                    <td class="table-numeric ${mgoClass}">${leg.mgoBase}</td>
                    <td class="table-numeric ${hfoClass}">${leg.hfoBase}</td>
                    <td class="table-co2-exposure table-numeric">${leg.co2Exposure.toFixed(2)}</td>
                    <td class="table-actual-co2 table-numeric" id="actualCO2_${index}">--</td>
                </tr>
            `);
            
            tbody.append(row);
        });
    }

    // Initialize table on page load  
    updateDetailedTable();

    // Input validation
    function validateInputs() {
        const cargoQuantity = parseFloat($('#cargoQuantity').val());
        const seaMarginBallast = parseFloat($('#seaMarginBallast').val());
        const seaMarginLaden = parseFloat($('#seaMarginLaden').val());
        const lfoConsumption = parseFloat($('#lfoConsumption').val());
        const hfoConsumption = parseFloat($('#hfoConsumption').val());
        const mgoConsumption = parseFloat($('#mgoConsumption').val());
        const actualLoadingDays = parseFloat($('#actualLoadingDays').val());
        const actualDischargingDays = parseFloat($('#actualDischargingDays').val());

        return !isNaN(cargoQuantity) && cargoQuantity > 0 &&
               !isNaN(seaMarginBallast) && seaMarginBallast >= 0 &&
               !isNaN(seaMarginLaden) && seaMarginLaden >= 0 &&
               !isNaN(lfoConsumption) && lfoConsumption >= 0 &&
               !isNaN(hfoConsumption) && hfoConsumption >= 0 &&
               !isNaN(mgoConsumption) && mgoConsumption >= 0 &&
               !isNaN(actualLoadingDays) && actualLoadingDays >= 0 &&
               !isNaN(actualDischargingDays) && actualDischargingDays >= 0;
    }

    // Real-time calculation on input change
    $('input').on('input', function() {
        if (validateInputs()) {
            // Add small delay to avoid excessive calculations
            clearTimeout(window.calcTimeout);
            window.calcTimeout = setTimeout(calculateEmissions, 500);
        }
    });

    // Calculate emissions
    function calculateEmissions() {
        if (!validateInputs()) {
            alert('Please fill in all required fields with valid values.');
            return;
        }

        const selectedRoute = $('input[name="route"]:checked').val();
        const routeData = baselineData[selectedRoute];
        
        const inputs = {
            cargoQuantity: parseFloat($('#cargoQuantity').val()),
            seaMarginBallast: parseFloat($('#seaMarginBallast').val()),
            seaMarginLaden: parseFloat($('#seaMarginLaden').val()),
            lfoConsumption: parseFloat($('#lfoConsumption').val()),
            hfoConsumption: parseFloat($('#hfoConsumption').val()),
            mgoConsumption: parseFloat($('#mgoConsumption').val()),
            actualLoadingDays: parseFloat($('#actualLoadingDays').val()),
            actualDischargingDays: parseFloat($('#actualDischargingDays').val())
        };

        // Show loading state with enhanced visual feedback
        $('#calculateBtn').addClass('calculating-glow').prop('disabled', true)
            .html('<i class="fas fa-spinner fa-spin mr-3"></i>Calculating...<i class="fas fa-cog fa-spin ml-3"></i>');

        // Calculate baseline CO2
        const baselineCO2 = calculateBaselineCO2(routeData, inputs);
        
        // Calculate actual CO2 based on inputs
        const actualCO2 = calculateActualCO2(routeData, inputs);
        
        // Calculate percentage reduction
        const emissionReduction = ((baselineCO2 - actualCO2) / baselineCO2 * 100);

        // Update summary view
        updateSummaryView(baselineCO2, actualCO2, emissionReduction);
        
        // Generate detailed tables
        generateBaselineTable(routeData, inputs);
        generateDetailedTable(routeData, inputs, actualCO2);
        
        // Calculate and display results summary
        updateResultsSummary(routeData, inputs, baselineCO2, actualCO2, emissionReduction);

        // Show results
        $('#summaryView').removeClass('hidden').hide().fadeIn(600);
        $('#detailsToggle').removeClass('hidden').hide().fadeIn(600);
        
        // Remove loading state and restore button
        setTimeout(() => {
            $('#calculateBtn').removeClass('calculating-glow').prop('disabled', false)
                .html('<i class="fas fa-calculator mr-3 text-xl"></i>Calculate CO2 Emissions<i class="fas fa-arrow-right ml-3 text-lg opacity-75"></i>');
        }, 1200);
    }

    // Calculate baseline CO2 per 1000MT using correct maritime methodology
    function calculateBaselineCO2(routeData, inputs) {
        let totalMGO = 0;
        let totalHFO = 0;
        let totalLFO = 0;
        
        routeData.legs.forEach(leg => {
            let baselineDays = 0;
            let consumptionPerDay = 0;
            
            // Calculate baseline days with static 15% sea margin
            if (leg.type && leg.type.includes('ballast')) {
                // Ballast legs: 43 tons/day, 13 knots speed
                consumptionPerDay = 43;
                const baseDays = leg.distance / 13 / 24;
                const seaMarginDays = baseDays * 0.15; // Static 15% sea margin
                baselineDays = baseDays + seaMarginDays;
                
            } else if (leg.type && leg.type.includes('laden')) {
                // Laden legs: 43 tons/day, 12 knots speed  
                consumptionPerDay = 43;
                const baseDays = leg.distance / 12 / 24;
                const seaMarginDays = baseDays * 0.15; // Static 15% sea margin
                baselineDays = baseDays + seaMarginDays;
                
            } else if (leg.type === 'port-loading') {
                // Loading: 4.0 tons/day, baseline days as specified
                consumptionPerDay = 4.0;
                baselineDays = leg.baseDays; // Use predefined baseline days
                
            } else if (leg.type === 'port-discharging') {
                // Discharging: 4.0 tons/day, baseline days as specified
                consumptionPerDay = 4.0;
                baselineDays = leg.baseDays; // Use predefined baseline days
            }
            
            // Calculate fuel consumption based on ECA/Non-ECA
            const totalConsumption = baselineDays * consumptionPerDay;
            
            if (leg.type && leg.type.includes('eca')) {
                // ECA areas use MGO
                totalMGO += totalConsumption;
            } else if (leg.type && leg.type.includes('non-eca')) {
                // Non-ECA areas use LFO  
                totalLFO += totalConsumption;
            } else {
                // Port operations use MGO
                totalMGO += totalConsumption;
            }
        });
        
        // Calculate total CO2 emissions
        const totalCO2 = (totalLFO * emissionFactors.lfo) + 
                        (totalMGO * emissionFactors.mgo) + 
                        (totalHFO * emissionFactors.hfo);
        
        // Convert using your formula: Total CO2 / 133000 * 1000
        return (totalCO2 / 133000) * 1000;
    }

    // Calculate actual CO2 based on maritime logic with sea margins
    function calculateActualCO2(routeData, inputs) {
        let totalMGO = 0;
        let totalHFO = 0;
        let totalLFO = 0;
        
        routeData.legs.forEach(leg => {
            let actualDays = 0;
            let consumptionPerDay = 0;
            let speed = 0;
            
            // Determine leg type and calculate actual days
            if (leg.type && leg.type.includes('ballast')) {
                // Ballast legs: 43 tons/day, 13 knots speed
                consumptionPerDay = 43;
                speed = 13;
                const baseDays = leg.distance / speed / 24;
                const seaMarginDays = baseDays * (inputs.seaMarginBallast / 100);
                actualDays = baseDays + seaMarginDays;
                
            } else if (leg.type && leg.type.includes('laden')) {
                // Laden legs: 43 tons/day, 12 knots speed  
                consumptionPerDay = 43;
                speed = 12;
                const baseDays = leg.distance / speed / 24;
                const seaMarginDays = baseDays * (inputs.seaMarginLaden / 100);
                actualDays = baseDays + seaMarginDays;
                
            } else if (leg.type === 'port-loading') {
                // Loading: 4.0 tons/day, actual days from input
                consumptionPerDay = 4.0;
                actualDays = inputs.actualLoadingDays;
                
            } else if (leg.type === 'port-discharging') {
                // Discharging: 4.0 tons/day, actual days from input
                consumptionPerDay = 4.0;
                actualDays = inputs.actualDischargingDays;
            }
            
            // Calculate fuel consumption based on ECA/Non-ECA
            const totalConsumption = actualDays * consumptionPerDay;
            
            if (leg.type && leg.type.includes('eca')) {
                // ECA areas use MGO
                totalMGO += totalConsumption;
            } else if (leg.type && leg.type.includes('non-eca')) {
                // Non-ECA areas use LFO  
                totalLFO += totalConsumption;
            } else {
                // Port operations use MGO
                totalMGO += totalConsumption;
            }
        });
        
        // Calculate CO2 emissions from total fuel consumption
        const totalCO2 = (totalLFO * emissionFactors.lfo) + 
                        (totalMGO * emissionFactors.mgo) + 
                        (totalHFO * emissionFactors.hfo);
        
        // Convert using your formula: Total CO2 / cargo quantity * 1000
        return (totalCO2 / inputs.cargoQuantity) * 1000;
    }

    // Update summary view with animated counters and visual bars
    function updateSummaryView(baselineCO2, actualCO2, emissionReduction) {
        // This function is now handled by updateResultsSummary
        // Keep for backward compatibility if needed
    }

    // Animate number counting effect
    function animateNumber(selector, start, end, suffix, duration) {
        const element = $(selector);
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.text(current.toFixed(end < 1 ? 1 : 2) + suffix);
        }, 16);
    }

    // Generate baseline comparison table
    function generateBaselineTable(routeData, inputs) {
        const tbody = $('#baselineTableBody');
        tbody.empty();

        const stages = [
            { name: 'Ballast', data: routeData.baseline.Ballast, actual: inputs.seaMarginBallast },
            { name: 'Laden', data: routeData.baseline.Laden, actual: inputs.seaMarginLaden },
            { name: 'Loading/Discharging', data: routeData.baseline['Loading/Discharging'], actual: null }
        ];

        stages.forEach((stage, index) => {
            const row = $(`
                <tr class="table-cell-animate">
                    <td class="table-leg-name">${stage.name}</td>
                    <td class="table-numeric">${stage.data.speed}</td>
                    <td class="table-numeric">${stage.data.cons}</td>
                    <td class="table-numeric">${stage.actual !== null ? stage.actual.toFixed(1) : 'N/A'}</td>
                    <td class="table-numeric">N/A</td>
                    <td class="table-numeric">--</td>
                </tr>
            `);
            
            // Add staggered animation delay
            setTimeout(() => {
                tbody.append(row);
            }, index * 50);
        });
    }

    // Calculate and populate actual CO2 values in detailed table using proper maritime logic
    function calculateActualCO2Values(routeData, inputs) {
        routeData.legs.forEach((leg, index) => {
            let actualDays = 0;
            let consumptionPerDay = 0;
            let speed = 0;
            let legMGO = 0, legHFO = 0, legLFO = 0;
            
            // Calculate actual days based on leg type and maritime logic
            if (leg.type && leg.type.includes('ballast')) {
                // Ballast legs: 43 tons/day, 13 knots speed
                consumptionPerDay = 43;
                speed = 13;
                const baseDays = leg.distance / speed / 24;
                const seaMarginDays = baseDays * (inputs.seaMarginBallast / 100);
                actualDays = baseDays + seaMarginDays;
                
            } else if (leg.type && leg.type.includes('laden')) {
                // Laden legs: 43 tons/day, 12 knots speed  
                consumptionPerDay = 43;
                speed = 12;
                const baseDays = leg.distance / speed / 24;
                const seaMarginDays = baseDays * (inputs.seaMarginLaden / 100);
                actualDays = baseDays + seaMarginDays;
                
            } else if (leg.type === 'port-loading') {
                // Loading: 4.0 tons/day, actual days from input
                consumptionPerDay = 4.0;
                actualDays = inputs.actualLoadingDays;
                
            } else if (leg.type === 'port-discharging') {
                // Discharging: 4.0 tons/day, actual days from input
                consumptionPerDay = 4.0;
                actualDays = inputs.actualDischargingDays;
            }
            
            // Calculate total fuel consumption for this leg
            const totalConsumption = actualDays * consumptionPerDay;
            
            // Assign fuel type based on ECA/Non-ECA designation
            if (leg.type && leg.type.includes('eca')) {
                // ECA areas use MGO
                legMGO = totalConsumption;
            } else if (leg.type && leg.type.includes('non-eca')) {
                // Non-ECA areas use LFO  
                legLFO = totalConsumption;
            } else {
                // Port operations use MGO
                legMGO = totalConsumption;
            }

            // Calculate CO2 emissions for this leg
            const legCO2 = (legLFO * emissionFactors.lfo) + 
                          (legMGO * emissionFactors.mgo) + 
                          (legHFO * emissionFactors.hfo);
            
            // Convert using maritime formula per voyage leg
            const actualCO2WTW = (legCO2 / inputs.cargoQuantity) * 1000;

            // Update the table cell with calculated value
            $(`#actualCO2_${index}`).text(actualCO2WTW.toFixed(2));
        });
    }

    // Generate detailed voyage legs table (legacy function - kept for compatibility)
    function generateDetailedTable(routeData, inputs, totalCO2) {
        // This function is now handled by updateDetailedTable and calculateActualCO2Values
        calculateActualCO2Values(routeData, inputs);
        
        // Store cumulative CO2 for results summary
        let cumulativeCO2 = 0;
        routeData.legs.forEach((leg, index) => {
            const cellValue = $(`#actualCO2_${index}`).text();
            if (cellValue !== '--') {
                cumulativeCO2 += parseFloat(cellValue) || 0;
            }
        });
        window.cumulativeCO2 = cumulativeCO2 / 1000; // Convert to tonnes
    }

    // Update results summary with visual bars and animations
    function updateResultsSummary(routeData, inputs, baselineCO2, actualCO2, emissionReduction) {
        // Calculate original baseline (from baseline data without adjustments)
        let originalBaseline = 0;
        routeData.legs.forEach(leg => {
            originalBaseline += (leg.lfoBase * emissionFactors.lfo + leg.mgoBase * emissionFactors.mgo + leg.hfoBase * emissionFactors.hfo);
        });
        originalBaseline = (originalBaseline * 1000) / inputs.cargoQuantity;

        // Adjusted baseline is the calculated baseline CO2
        const adjBaseline = baselineCO2;

        // Actual CO2 eq/1000 MT Cargo
        const actualCO2Cargo = actualCO2;

        // Contractual EUAs calculation (approximate)
        const contractualEUAs = (actualCO2 * inputs.cargoQuantity) / 1000000; // Convert to tonnes CO2

        // Total WTW CO2 in grams
        const totalWTWCO2 = window.cumulativeCO2 ? (window.cumulativeCO2 * 1000 * 1.05) : 0; // Adding 5% for WTW

        // Animate the metric cards
        setTimeout(() => {
            animateNumber('#originalBaselineCard', 0, originalBaseline, '', 800);
            animateNumber('#adjBaselineCard', 0, adjBaseline, '', 1000);
            animateNumber('#actualCO2Card', 0, actualCO2Cargo, '', 1200);
            animateNumber('#emissionReductionCard', 0, emissionReduction, '%', 1400);
        }, 300);

        // Update additional metrics
        setTimeout(() => {
            $('#contractualEUAsCard').text(contractualEUAs.toFixed(0));
            $('#totalWTWCO2Card').text(totalWTWCO2.toFixed(0));
        }, 800);

        // Update bar chart values
        $('#adjBaselineValue').text(adjBaseline.toFixed(2) + ' g');
        $('#actualCO2Value').text(actualCO2Cargo.toFixed(2) + ' g');
        $('#reductionPercentage').text(emissionReduction.toFixed(1) + '%');

        // Calculate bar widths (use the higher value as 100%)
        const maxValue = Math.max(adjBaseline, actualCO2Cargo);
        const adjBaselineWidth = (adjBaseline / maxValue) * 100;
        const actualCO2Width = (actualCO2Cargo / maxValue) * 100;

        // Animate the bars
        setTimeout(() => {
            $('#adjBaselineBar').css('width', adjBaselineWidth + '%');
            $('#actualCO2Bar').css('width', actualCO2Width + '%');
        }, 1000);

        // Color code and message the emission reduction
        const reductionElement = $('#reductionPercentage');
        const messageElement = $('#reductionMessage');
        reductionElement.removeClass('text-red-600 text-green-600 text-yellow-600 text-orange-600');
        
        let message = '';
        let barColor = '';
        
        if (emissionReduction > 20) {
            reductionElement.addClass('text-green-600 dark:text-green-400');
            message = 'Excellent Performance! 🌟';
            barColor = 'from-green-500 to-green-600';
        } else if (emissionReduction > 10) {
            reductionElement.addClass('text-green-600 dark:text-green-400');
            message = 'Great Reduction Achieved';
            barColor = 'from-green-500 to-green-600';
        } else if (emissionReduction > 0) {
            reductionElement.addClass('text-yellow-600 dark:text-yellow-400');
            message = 'Moderate Improvement';
            barColor = 'from-yellow-500 to-yellow-600';
        } else if (emissionReduction > -10) {
            reductionElement.addClass('text-orange-600 dark:text-orange-400');
            message = 'Slight Increase';
            barColor = 'from-orange-500 to-orange-600';
        } else {
            reductionElement.addClass('text-red-600 dark:text-red-400');
            message = 'Needs Optimization';
            barColor = 'from-red-500 to-red-600';
        }

        messageElement.text(message);
        
        // Update actual CO2 bar color based on performance
        setTimeout(() => {
            $('#actualCO2Bar').removeClass('bg-gradient-to-r from-green-500 to-green-600 from-yellow-500 to-yellow-600 from-orange-500 to-orange-600 from-red-500 to-red-600')
                              .addClass('bg-gradient-to-r ' + barColor);
        }, 1200);
    }

    // Show/hide detailed view
    $('#showDetailsBtn').on('click', function() {
        const detailedView = $('#detailedView');
        const button = $(this);
        
        if (detailedView.hasClass('hidden')) {
            detailedView.removeClass('hidden').hide().slideDown(600);
            button.html('<i class="fas fa-eye-slash mr-3"></i>Hide Detailed Analysis<i class="fas fa-chevron-up ml-3"></i>');
        } else {
            detailedView.slideUp(600, function() {
                $(this).addClass('hidden');
            });
            button.html('<i class="fas fa-microscope mr-3"></i>View Detailed Analysis<i class="fas fa-chevron-down ml-3"></i>');
        }
    });

    // Direct fuel calculation function using existing inputs
    function calculateDirectFuelEmissions() {
        // Get fuel consumption values from existing inputs
        const lfoConsumption = parseFloat($('#lfoConsumption').val()) || 0;
        const mgoConsumption = parseFloat($('#mgoConsumption').val()) || 0;
        const hfoConsumption = parseFloat($('#hfoConsumption').val()) || 0;
        const cargoQuantity = parseFloat($('#cargoQuantity').val()) || 133000;
        
        // Calculate total CO2 emissions using emission factors
        const totalCO2 = (lfoConsumption * emissionFactors.lfo) + 
                        (mgoConsumption * emissionFactors.mgo) + 
                        (hfoConsumption * emissionFactors.hfo);
        
        // Convert to gCO2 per 1000MT cargo: (Total CO2 / cargo quantity) * 1000
        const actualCO2per1000MT = (totalCO2 / cargoQuantity) * 1000;
        
        // Get selected route baseline from radio buttons
        const selectedRoute = $('input[name="route"]:checked').val() || 'narvik';
        const baselineCO2 = routeBaselines[selectedRoute] || routeBaselines['narvik'];
        
        // Calculate emission reduction percentage
        const emissionReduction = ((baselineCO2 - actualCO2per1000MT) / baselineCO2) * 100;
        
        // Show results summary
        $('#summaryView').removeClass('hidden');
        $('#detailsToggle').removeClass('hidden');
        
        // Update result cards with animation - use correct baseline values
        setTimeout(() => {
            animateNumber('#originalBaselineCard', 0, baselineCO2, '', 800);
            animateNumber('#adjBaselineCard', 0, baselineCO2, '', 1000);
            animateNumber('#actualCO2Card', 0, actualCO2per1000MT, '', 1200);
            animateNumber('#emissionReductionCard', 0, emissionReduction, '%', 1400);
        }, 300);
        
        // Update additional metrics with placeholder values
        setTimeout(() => {
            $('#contractualEUAsCard').text(Math.round((totalCO2 * 0.001)));
            $('#totalWTWCO2Card').text(Math.round(totalCO2 * 1000));
        }, 800);

        // Update bar chart values
        $('#adjBaselineValue').text(baselineCO2.toFixed(2) + ' g');
        $('#actualCO2Value').text(actualCO2per1000MT.toFixed(2) + ' g');
        $('#reductionPercentage').text(emissionReduction.toFixed(1) + '%');

        // Calculate bar widths (use the higher value as 100%)
        const maxValue = Math.max(baselineCO2, actualCO2per1000MT);
        const adjBaselineWidth = (baselineCO2 / maxValue) * 100;
        const actualCO2Width = (actualCO2per1000MT / maxValue) * 100;

        // Animate the bars
        setTimeout(() => {
            $('#adjBaselineBar').css('width', adjBaselineWidth + '%');
            $('#actualCO2Bar').css('width', actualCO2Width + '%');
        }, 1000);

        // Color code and message the emission reduction
        const reductionElement = $('#reductionPercentage');
        const messageElement = $('#reductionMessage');
        reductionElement.removeClass('text-red-600 text-green-600 text-yellow-600 text-orange-600');
        
        let message = '';
        let barColor = '';
        
        if (emissionReduction > 20) {
            reductionElement.addClass('text-green-600 dark:text-green-400');
            message = 'Excellent Performance!';
            barColor = 'from-green-500 to-green-600';
        } else if (emissionReduction > 10) {
            reductionElement.addClass('text-green-600 dark:text-green-400');
            message = 'Great Reduction Achieved';
            barColor = 'from-green-500 to-green-600';
        } else if (emissionReduction > 0) {
            reductionElement.addClass('text-yellow-600 dark:text-yellow-400');
            message = 'Moderate Improvement';
            barColor = 'from-yellow-500 to-yellow-600';
        } else if (emissionReduction > -10) {
            reductionElement.addClass('text-orange-600 dark:text-orange-400');
            message = 'Slight Increase';
            barColor = 'from-orange-500 to-orange-600';
        } else {
            reductionElement.addClass('text-red-600 dark:text-red-400');
            message = 'Needs Optimization';
            barColor = 'from-red-500 to-red-600';
        }

        messageElement.text(message);
        
        // Update actual CO2 bar color based on performance
        setTimeout(() => {
            $('#actualCO2Bar').removeClass('bg-gradient-to-r from-green-500 to-green-600 from-yellow-500 to-yellow-600 from-orange-500 to-orange-600 from-red-500 to-red-600')
                              .addClass('bg-gradient-to-r ' + barColor);
        }, 1200);
        
        // Console log for verification
        console.log('=== DIRECT FUEL CALCULATION ===');
        console.log(`Selected Route: ${selectedRoute}`);
        console.log(`Available Routes:`, Object.keys(routeBaselines));
        console.log(`LFO: ${lfoConsumption} tonnes × ${emissionFactors.lfo} = ${(lfoConsumption * emissionFactors.lfo).toFixed(2)} tonnes CO2`);
        console.log(`MGO: ${mgoConsumption} tonnes × ${emissionFactors.mgo} = ${(mgoConsumption * emissionFactors.mgo).toFixed(2)} tonnes CO2`);
        console.log(`HFO: ${hfoConsumption} tonnes × ${emissionFactors.hfo} = ${(hfoConsumption * emissionFactors.hfo).toFixed(2)} tonnes CO2`);
        console.log(`Total CO2: ${totalCO2.toFixed(2)} tonnes`);
        console.log(`Cargo: ${cargoQuantity} tonnes`);
        console.log(`Actual CO2/1000MT: ${actualCO2per1000MT.toFixed(2)} gCO2/1000MT`);
        console.log(`Baseline: ${baselineCO2.toFixed(2)} gCO2/1000MT`);
        console.log(`Reduction: ${emissionReduction.toFixed(2)}%`);
        
        return actualCO2per1000MT;
    }

    // Calculate button click handler - use direct calculation
    $('#calculateBtn').on('click', calculateDirectFuelEmissions);

    // Initialize baseline cards with default route values
    const defaultRoute = $('input[name="route"]:checked').val() || 'narvik';
    const defaultBaseline = routeBaselines[defaultRoute] || routeBaselines['narvik'];
    $('#originalBaselineCard').text(defaultBaseline.toFixed(2));
    $('#adjBaselineCard').text(defaultBaseline.toFixed(2));
    
    // Initialize with sample calculation if default values are present
    if (validateInputs()) {
        setTimeout(calculateDirectFuelEmissions, 1000);
    }

    // Smooth scrolling for better UX
    function smoothScrollTo(element) {
        $('html, body').animate({
            scrollTop: $(element).offset().top - 100
        }, 600);
    }

    // Auto-scroll to results when calculated
    $(document).on('DOMNodeInserted', '#summaryView', function() {
        if (!$(this).hasClass('hidden')) {
            setTimeout(() => smoothScrollTo('#summaryView'), 700);
        }
    });

    // Enhanced input validation with visual feedback
    $('input[type="number"]').on('blur', function() {
        const value = parseFloat($(this).val());
        const isValid = !isNaN(value) && value >= 0;
        
        $(this).toggleClass('border-red-500 dark:border-red-400', !isValid);
        $(this).toggleClass('border-green-500 dark:border-green-400', isValid && value > 0);
    });

    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + Enter to calculate
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
            e.preventDefault();
            calculateDirectFuelEmissions();
        }
        
        // Ctrl/Cmd + D to toggle detailed view
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 68) {
            e.preventDefault();
            if (!$('#detailsToggle').hasClass('hidden')) {
                $('#showDetailsBtn').click();
            }
        }
        
        // Ctrl/Cmd + T to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 84) {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Add loading states to inputs during calculation
    function setInputsLoading(loading) {
        $('input').prop('disabled', loading);
        if (loading) {
            $('input').addClass('opacity-50');
        } else {
            $('input').removeClass('opacity-50');
        }
    }

    // Export functionality (future enhancement)
    function exportResults() {
        // This could be enhanced to export results as CSV/PDF
        console.log('Export functionality - to be implemented');
    }

    // Add tooltips for better UX (using title attributes)
    $('#cargoQuantity').attr('title', 'Total cargo quantity in metric tons');
    $('#seaMarginBallast').attr('title', 'Additional days for ballast voyage');
    $('#seaMarginLaden').attr('title', 'Additional days for laden voyage');
    $('#lfoConsumption').attr('title', 'Light Fuel Oil consumption in metric tons');
    $('#hfoConsumption').attr('title', 'Heavy Fuel Oil consumption in metric tons');
    $('#mgoConsumption').attr('title', 'Marine Gas Oil consumption in metric tons');
});
