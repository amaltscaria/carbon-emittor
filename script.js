document.getElementById('vehicle-button').addEventListener('click', showVehicleForm);
document.getElementById('household-button').addEventListener('click', showHouseholdForm);
document.getElementById('flight-button').addEventListener('click', showFlightForm);

const emissionFactors = {
    vehicle: {
        petrol: 2.39,
        diesel: 2.75,
        cng: 2.60
    },
    flight: {
        domestic: { economy: 0.12, business: 0.15, first: 0.20 },
        international: { economy: 0.19, business: 0.24, first: 0.37 }
    },
    household: {
        ELECTRICITY_EMISSION_FACTOR: 0.000489,
        FURNITURE_EMISSION_FACTOR: 0.8,
        WATER_EMISSION_FACTOR: 0.000264,
        GROCERY_EMISSION_FACTOR: 0.00025,
        CLOTHING_EMISSION_FACTOR: 0.00035,
        PHARMACEUTICALS_EMISSION_FACTOR: 0.00018,
        MEDIA_EMISSION_FACTOR: 0.00012,
        GADGETS_EMISSION_FACTOR: 0.00045,
        VEGAN_EMISSION_FACTOR: 0.07,
        VEGETARIAN_EMISSION_FACTOR: 0.107,
        NON_VEGETARIAN_EMISSION_FACTOR: 0.241,
        PESCATARIAN_EMISSION_FACTOR: 0.132,
        PROPANE_EMISSION_FACTOR: 0.0063,
        LPG_EMISSION_FACTOR: 0.0063,
        CNG_EMISSION_FACTOR: 0.0020,
        FIREWOOD_EMISSION_FACTOR: 0.0015,
        COAL_EMISSION_FACTOR: 0.0094,
        KEROSENE_EMISSION_FACTOR: 0.0027,
        BIOGAS_EMISSION_FACTOR: 0.0000,
        WASTE_EMISSION_FACTOR: 0.0004,
        HEATING_COOLING_EMISSION_FACTOR: 0.00012,
        GARDENING_EMISSION_FACTOR: 0.00008,
        HOME_MAINTENANCE_EMISSION_FACTOR: 0.00015,
        CLEANING_PRODUCTS_EMISSION_FACTOR: 0.00010,
        PERSONAL_CARE_EMISSION_FACTOR: 0.00012,
        ONLINE_SHOPPING_EMISSION_FACTOR: 0.00025,
        PET_CARE_EMISSION_FACTOR: 0.00018
    }
};

function showVehicleForm() {
    document.getElementById('form-area').innerHTML = `
        <form id="vehicle-form">
            <h2>Vehicle Emissions</h2>
            <label for="vehicle-type">Vehicle Type (car/bike/bus/scooter/truck/cycle):</label>
            <input type="text" id="vehicle-type" required><br>
            <label for="cc">Engine Displacement (cc):</label>
            <input type="number" id="cc" required><br>
            <label for="fuel-type">Fuel Type (petrol/diesel/cng):</label>
            <input type="text" id="fuel-type" required><br>
            <label for="distance">Distance Covered (km):</label>
            <input type="number" id="distance" required><br>
            <label for="age">Vehicle Age (years):</label>
            <input type="number" id="age" required><br>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('vehicle-form').addEventListener('submit', calculateVehicleEmissions);
}

function calculateVehicleEmissions(event) {
    event.preventDefault();

    const vehicleType = document.getElementById('vehicle-type').value.toLowerCase();
    const cc = parseInt(document.getElementById('cc').value);
    const fuelType = document.getElementById('fuel-type').value.toLowerCase();
    const distance = parseFloat(document.getElementById('distance').value);
    const age = parseFloat(document.getElementById('age').value);

    const vehicleData = {
        car: {
            ccRange: [[0, 1000], [1001, 1500], [1501, 2000], [2001, Infinity]],
            mileage: [20, 18, 15, 12],
            ageFactor: [1.0, 1.1, 1.2, 1.3]
        },
        bike: {
            ccRange: [[0, 150], [151, 350], [351, Infinity]],
            mileage: [50, 40, 30],
            ageFactor: [1.0, 1.1, 1.2]
        },
        scooter: {
            ccRange: [[0, 150], [151, Infinity]],
            mileage: [60, 45],
            ageFactor: [1.0, 1.1]
        },
        bus: {
            ccRange: [[0, 5000], [5001, Infinity]],
            mileage: [5, 4],
            ageFactor: [1.0, 1.2]
        },
        truck: {
            ccRange: [[0, 5000], [5001, Infinity]],
            mileage: [8, 6],
            ageFactor: [1.0, 1.2]
        },
        cycle: {
            ccRange: [[0, 0]],
            mileage: [0],
            ageFactor: [1.0]
        }
    };

    const vehicle = vehicleData[vehicleType];
    if (!vehicle) {
        alert('Invalid vehicle type');
        return;
    }

    let mileage, ageFactor;
    for (let i = 0; i < vehicle.ccRange.length; i++) {
        if (cc >= vehicle.ccRange[i][0] && cc <= vehicle.ccRange[i][1]) {
            mileage = vehicle.mileage[i];
            ageFactor = vehicle.ageFactor[i];
            break;
        }
    }

    if (!mileage || !ageFactor) {
        alert('Invalid engine displacement for the selected vehicle type');
        return;
    }

    const fuelConsumption = distance / mileage;
    const emission = fuelConsumption * emissionFactors.vehicle[fuelType] * ageFactor;

    document.getElementById('results').innerHTML = `Carbon footprint for the ${vehicleType} is: ${emission.toFixed(2)} kg of CO2`;
}

function showHouseholdForm() {
    document.getElementById('form-area').innerHTML = `
        <form id="household-form">
            <h2>Household Emissions</h2>
            <label for="electricity">Electricity Consumption (kWh):</label>
            <input type="number" id="electricity" required><br>
            <label for="water">Water Consumption (gallons):</label>
            <input type="number" id="water" required><br>
            <label for="food">Food Type (vegan/vegetarian/non_vegetarian/pescatarian):</label>
            <input type="text" id="food" required><br>
            <label for="furniture">Furniture Spending ($):</label>
            <input type="number" id="furniture" required><br>
            <label for="clothing">Clothing Spending ($):</label>
            <input type="number" id="clothing" required><br>
            <label for="other">Other Expenditures ($):</label>
            <input type="number" id="other" required><br>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('household-form').addEventListener('submit', calculateHouseholdEmissions);
}

function calculateHouseholdEmissions(event) {
    event.preventDefault();

    const electricity = parseFloat(document.getElementById('electricity').value);
    const water = parseFloat(document.getElementById('water').value);
    const food = document.getElementById('food').value.toLowerCase();
    const furniture = parseFloat(document.getElementById('furniture').value);
    const clothing = parseFloat(document.getElementById('clothing').value);
    const other = parseFloat(document.getElementById('other').value);

    const foodFactors = {
        vegan: emissionFactors.household.VEGAN_EMISSION_FACTOR,
        vegetarian: emissionFactors.household.VEGETARIAN_EMISSION_FACTOR,
        non_vegetarian: emissionFactors.household.NON_VEGETARIAN_EMISSION_FACTOR,
        pescatarian: emissionFactors.household.PESCATARIAN_EMISSION_FACTOR
    };

    const foodEmission = foodFactors[food];
    if (!foodEmission) {
        alert('Invalid food type');
        return;
    }

    const totalEmission =
        electricity * emissionFactors.household.ELECTRICITY_EMISSION_FACTOR +
        water * emissionFactors.household.WATER_EMISSION_FACTOR +
        foodEmission +
        furniture * emissionFactors.household.FURNITURE_EMISSION_FACTOR +
        clothing * emissionFactors.household.CLOTHING_EMISSION_FACTOR +
        other * emissionFactors.household.OTHER_EMISSION_FACTOR;

    document.getElementById('results').innerHTML = `Household carbon footprint is: ${totalEmission.toFixed(2)} kg of CO2`;
}

function showFlightForm() {
    document.getElementById('form-area').innerHTML = `
        <form id="flight-form">
            <h2>Flight Emissions</h2>
            <label for="flight-type">Flight Type (domestic/international):</label>
            <input type="text" id="flight-type" required><br>
            <label for="class-type">Class (economy/business/first):</label>
            <input type="text" id="class-type" required><br>
            <label for="distance">Distance (km):</label>
            <input type="number" id="distance" required><br>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('flight-form').addEventListener('submit', calculateFlightEmissions);
}

function calculateFlightEmissions(event) {
    event.preventDefault();

    const flightType = document.getElementById('flight-type').value.toLowerCase();
    const classType = document.getElementById('class-type').value.toLowerCase();
    const distance = parseFloat(document.getElementById('distance').value);

    const flight = emissionFactors.flight[flightType];
    if (!flight) {
        alert('Invalid flight type');
        return;
    }

    const classEmission = flight[classType];
    if (!classEmission) {
        alert('Invalid class type');
        return;
    }

    const totalEmission = distance * classEmission;

    document.getElementById('results').innerHTML = `Flight carbon footprint is: ${totalEmission.toFixed(2)} kg of CO2`;
}
