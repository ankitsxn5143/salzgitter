// Maritime CO2 Calculator - Main JavaScript File
$(document).ready(function() {
    
    // Baseline data for different routes
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
                { name: "Pre-Ballast ECA", distance: 629, speed: 15, baseDays: 3024, adjMarginDays: 2.3184, lfoBase: 0, mgoBase: 99.69, hfoBase: 50, co2Exposure: 386.41, co2WTW: 389.04, totalCO2: 386.41 },
                { name: "Pre-Ballast Non-ECA", distance: 385, speed: 15, baseDays: 1851, adjMarginDays: 1.4191, lfoBase: 61.02, mgoBase: 0, hfoBase: 50, co2Exposure: 226.54, co2WTW: 226.54, totalCO2: 227.10 },
                { name: "Loading", distance: 0, speed: 0, baseDays: 2.5000, adjMarginDays: 3.6896, lfoBase: 0, mgoBase: 14.36, hfoBase: 0, co2Exposure: 55.65, co2WTW: 56.03, totalCO2: 55.65 },
                { name: "Laden ECA", distance: 586, speed: 15, baseDays: 3052, adjMarginDays: 2.4342, lfoBase: 0, mgoBase: 104.67, hfoBase: 50, co2Exposure: 405.70, co2WTW: 408.48, totalCO2: 405.70 },
                { name: "Laden Non-ECA", distance: 497, speed: 15, baseDays: 1.9845, adjMarginDays: 2.0645, lfoBase: 88.77, mgoBase: 0, hfoBase: 50, co2Exposure: 332.64, co2WTW: 332.64, totalCO2: 530.39 },
                { name: "Discharging", distance: 0, speed: 0, baseDays: 3.3000, adjMarginDays: 4.1981, lfoBase: 0, mgoBase: 16.54, hfoBase: 100, co2Exposure: 64.13, co2WTW: 64.56, totalCO2: 64.13 },
                { name: "Post-Ballast ECA", distance: 64, speed: 15, baseDays: 0.0404, adjMarginDays: 0.3096, lfoBase: 0, mgoBase: 13.31, hfoBase: 100, co2Exposure: 51.60, co2WTW: 51.95, totalCO2: 51.69 }
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
                { name: "Pre-Ballast ECA", distance: 520, speed: 14, baseDays: 2.7143, adjMarginDays: 2.1000, lfoBase: 0, mgoBase: 85.50, hfoBase: 45, co2Exposure: 330.20, co2WTW: 332.15, totalCO2: 330.20 },
                { name: "Pre-Ballast Non-ECA", distance: 410, speed: 14, baseDays: 2.1429, adjMarginDays: 1.6500, lfoBase: 58.50, mgoBase: 0, hfoBase: 45, co2Exposure: 210.40, co2WTW: 210.40, totalCO2: 211.20 },
                { name: "Loading", distance: 0, speed: 0, baseDays: 2.2000, adjMarginDays: 3.2000, lfoBase: 0, mgoBase: 12.80, hfoBase: 0, co2Exposure: 48.60, co2WTW: 49.00, totalCO2: 48.60 },
                { name: "Laden ECA", distance: 640, speed: 13, baseDays: 3.5897, adjMarginDays: 2.7500, lfoBase: 0, mgoBase: 95.20, hfoBase: 45, co2Exposure: 380.15, co2WTW: 382.90, totalCO2: 380.15 },
                { name: "Laden Non-ECA", distance: 420, speed: 13, baseDays: 2.3077, adjMarginDays: 1.8500, lfoBase: 78.20, mgoBase: 0, hfoBase: 45, co2Exposure: 295.80, co2WTW: 295.80, totalCO2: 472.50 },
                { name: "Discharging", distance: 0, speed: 0, baseDays: 2.9000, adjMarginDays: 3.8000, lfoBase: 0, mgoBase: 14.20, hfoBase: 85, co2Exposure: 56.40, co2WTW: 56.80, totalCO2: 56.40 },
                { name: "Post-Ballast ECA", distance: 85, speed: 14, baseDays: 0.4429, adjMarginDays: 0.3500, lfoBase: 0, mgoBase: 11.80, hfoBase: 85, co2Exposure: 45.20, co2WTW: 45.50, totalCO2: 45.20 }
            ]
        }
    };

    // Fuel emission factors (gCO2/g fuel)
    const emissionFactors = {
        lfo: 3.114, // LFO emission factor
        mgo: 3.206, // MGO emission factor  
        hfo: 3.114  // HFO emission factor
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
        
        // Recalculate if form is already filled
        if (validateInputs()) {
            calculateEmissions();
        }
    });

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

    // Calculate baseline CO2 per 1000MT
    function calculateBaselineCO2(routeData, inputs) {
        let totalCO2 = 0;
        
        routeData.legs.forEach(leg => {
            // Calculate CO2 for each leg based on baseline consumption
            const legCO2 = (leg.lfoBase * emissionFactors.lfo) + 
                          (leg.mgoBase * emissionFactors.mgo) + 
                          (leg.hfoBase * emissionFactors.hfo);
            totalCO2 += legCO2;
        });

        // Convert to gCO2 per 1000MT cargo
        return (totalCO2 * 1000) / inputs.cargoQuantity;
    }

    // Calculate actual CO2 per 1000MT
    function calculateActualCO2(routeData, inputs) {
        // Total fuel consumption from inputs
        const totalFuelCO2 = (inputs.lfoConsumption * emissionFactors.lfo * 1000) + 
                           (inputs.hfoConsumption * emissionFactors.hfo * 1000) + 
                           (inputs.mgoConsumption * emissionFactors.mgo * 1000);

        // Convert to gCO2 per 1000MT cargo
        return (totalFuelCO2 * 1000) / inputs.cargoQuantity;
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

        stages.forEach(stage => {
            const row = $(`
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="border border-gray-300 dark:border-gray-600 p-2 font-medium">${stage.name}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${stage.data.speed}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${stage.data.cons}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${stage.actual !== null ? stage.actual.toFixed(1) : 'N/A'}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">N/A</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">--</td>
                </tr>
            `);
            tbody.append(row);
        });
    }

    // Generate detailed voyage legs table
    function generateDetailedTable(routeData, inputs, totalCO2) {
        const tbody = $('#detailedTableBody');
        tbody.empty();

        let cumulativeCO2 = 0;

        routeData.legs.forEach((leg, index) => {
            // Calculate adjusted values based on sea margins
            let adjMarginDays = leg.adjMarginDays;
            if (leg.name.includes('Ballast')) {
                adjMarginDays *= (inputs.seaMarginBallast / 2.5); // Adjust based on input vs baseline
            } else if (leg.name.includes('Laden')) {
                adjMarginDays *= (inputs.seaMarginLaden / 3.2); // Adjust based on input vs baseline
            }

            // Calculate fuel consumption based on actual inputs proportionally
            const totalInputFuel = inputs.lfoConsumption + inputs.hfoConsumption + inputs.mgoConsumption;
            const legFuelRatio = (leg.lfoBase + leg.mgoBase + leg.hfoBase) / 100; // Normalize
            
            const legLFO = legFuelRatio * inputs.lfoConsumption * 0.3;
            const legMGO = legFuelRatio * inputs.mgoConsumption * 0.4;
            const legHFO = legFuelRatio * inputs.hfoConsumption * 0.3;

            // Calculate CO2 for this leg
            const legCO2 = (legLFO * emissionFactors.lfo + legMGO * emissionFactors.mgo + legHFO * emissionFactors.hfo) / 1000;
            cumulativeCO2 += legCO2;

            // Calculate actual CO2 WTW for this leg
            const actualCO2WTW = legCO2 * 1.05; // Adding 5% for WTW factor

            const row = $(`
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="border border-gray-300 dark:border-gray-600 p-2 font-medium">${leg.name}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${leg.distance}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${leg.speed}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${leg.baseDays.toFixed(4)}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${adjMarginDays.toFixed(4)}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${leg.co2Exposure.toFixed(2)}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center">${actualCO2WTW.toFixed(2)}</td>
                    <td class="border border-gray-300 dark:border-gray-600 p-2 text-center font-medium">${legCO2.toFixed(2)}</td>
                </tr>
            `);
            tbody.append(row);
        });

        // Store cumulative CO2 for results summary
        window.cumulativeCO2 = cumulativeCO2;
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

    // Calculate button click handler
    $('#calculateBtn').on('click', calculateEmissions);

    // Initialize with sample calculation if default values are present
    if (validateInputs()) {
        setTimeout(calculateEmissions, 1000);
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
            calculateEmissions();
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
