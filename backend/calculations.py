import json
import urllib.request
import urllib.error
import sys
import ssl


ssl._create_default_https_context = ssl._create_unverified_context


# Assumptions
electrical_price_raise = 0.02  # 2% annual price increase
discount_rate = 0.02  # 2% discount rate
selling_price_electricity = 120  # öre/kWh
expected_life_time = 30  # years
efficency_rate = 0.22  # in %

# --------------------------------------MAIN-----------------------------------------------
def main(energy_consumption_per_year, energy_cost_per_kWh, investment_cost, m2_solar_panels, lat, lon):
    annual_energy_production = total_energy_produced_per_year(m2_solar_panels, lat, lon)
    overproduction = calculate_overproduction(energy_consumption_per_year, annual_energy_production)

    savings = total_savings(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption_per_year)
    ROI = return_on_investment(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption_per_year)
    breakeven = breakeven_calculation(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption_per_year)
    cf_dict = cf_per_year_dict(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption_per_year)
    acc_cf_dict = acc_cf_per_year(cf_dict)

    return create_json_output(savings, ROI, breakeven, cf_dict, acc_cf_dict)

# --------------------------------------API Connection & Data cleaning-----------------------------------------------
def userinput():
    return "Gothenburg"

def gettingdatafromAPI(lat, lon):
    print(lat)

    location = f'{lat},{lon}'
    base_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    API_key = '2VP9BAW97HWT74H998C8C8HL7'
    unit_group = 'metric'
    start_date = '2023-01-01'
    end_date = '2023-01-03'
    content_type = "json"
    include = "days"

    api_query = f"{base_url}{location}/{start_date}/{end_date}?unitGroup={unit_group}&contentType={content_type}&include={include}&key={API_key}"

    print('Collecting your data from...', api_query)
    print()

    try:
        with urllib.request.urlopen(api_query) as response:
            weatherData = json.load(response)
    except urllib.error.HTTPError as e:
        ErrorInfo = e.read().decode()
        print('HTTPError:', e.code, ErrorInfo)
        sys.exit()
    except urllib.error.URLError as e:
        print('URLError:', e.reason)
        sys.exit()

    return weatherData


def datacleaning(weatherData):
    main_keys_to_remove = [key for key in weatherData if key not in ["latitude", "longitude", "address", "days"]]
    for key in main_keys_to_remove:
        del weatherData[key]

    for day in weatherData["days"]:
        sub_keys_to_remove = [key for key in day.keys() if key not in ["datetime", "solarradiation", "solarenergy"]]
        for key in sub_keys_to_remove:
            del day[key]

    total_radiation = sum([day["solarradiation"] for day in weatherData["days"]])
    weatherData['total radiation'] = total_radiation

    return weatherData

# --------------------------------------ENERGY PRODUCTION-----------------------------------------------
def convert_solarradiation2kWh(lat, lon):
	weather_data = gettingdatafromAPI(lat, lon)
	cleaned_data = datacleaning(weather_data)
	solar_radiation = cleaned_data['total radiation']
	kWh_per_m2_per_year = solar_radiation * 24 / 1000
	return kWh_per_m2_per_year

def total_energy_produced_per_year(m2_solar_panels, lat, lon):
    return convert_solarradiation2kWh(lat, lon) * efficency_rate * m2_solar_panels  # kWh/year

def calculate_overproduction(energy_consumption_per_year, annual_energy_production):
    if energy_consumption_per_year > annual_energy_production:
        return 0
    else:
        return annual_energy_production - energy_consumption_per_year  # kWh/year

# --------------------------------------INCOME CALCULATION-----------------------------------------------
def savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh):
    energy_savings = min(annual_energy_production, energy_consumption)
    total_savings = energy_savings * energy_cost_per_kWh / 100 * (1 + electrical_price_raise) ** year
    return total_savings

def earned_from_powersales(year, overproduction):
    if overproduction != 0:
        sold_energy_income = overproduction * selling_price_electricity / 100 * (
                1 + electrical_price_raise) ** year
    else:
        sold_energy_income = 0
    return sold_energy_income

# --------------------------------------CASH FLOW per Year-----------------------------------------------
def discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production, energy_consumption, energy_cost_per_kWh):
    if year == 0:
        cash_flow = -investment_cost
    else:
        cash_flow = savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh) + earned_from_powersales(year, overproduction)
    discounted_cash_flow = cash_flow / (1 + discount_rate) ** year
    return round(discounted_cash_flow)

def cf_per_year_dict(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption):
    cf_dict = {}
    for year in range(0, expected_life_time + 1):
        cf_dict[year] = discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production, energy_consumption, energy_cost_per_kWh)
    return cf_dict

def acc_cf_per_year(cf_dict):
    acc_cf_dict = {}
    for year in range(0, expected_life_time + 1):
        if year == 0:
            acc_cf_dict[year] = cf_dict[year]
        else:
            acc_cf_dict[year] = acc_cf_dict[year - 1] + cf_dict[year]
    return acc_cf_dict

# --------------------------------------INVESTMENT CALCULATION-----------------------------------------------
def breakeven_calculation(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption):
    cf_dict = cf_per_year_dict(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption)
    cumulative_cf = 0
    for year, cf in cf_dict.items():
        cumulative_cf += cf
        if cumulative_cf > 0:
            return year

def return_on_investment(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption):
    total_savings = 0
    cf_dict = cf_per_year_dict(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption)
    for year in cf_dict:
        if year == 0:
            pass
        else:
            total_savings += cf_dict[year]
    return_on_investment = f'{(total_savings / investment_cost) * 100}' + '%'
    return return_on_investment

def total_savings(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption):
    total_savings = 0
    cf_dict = cf_per_year_dict(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production, energy_consumption)
    for year in cf_dict:
        if year == 0:
            pass
        else:
            total_savings += cf_dict[year]
    return total_savings

def create_json_output(savings, ROI, breakeven, cf_dict, acc_cf_dict):
    json_value = {"Total savings": savings, "ROI": ROI, "PBT": breakeven,
                  "Cash flow": cf_dict, "ACCF": acc_cf_dict}
    return json.dumps(json_value, indent=2)
