import json
import urllib.request
import urllib.error
import sys

def userinput():
    location = input("Please enter your city ")
    return location

def gettingdatafromAPI():
    location = userinput()
    base_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    API_key = 'GAS9QC5GRFD327LDJ96BKXTUX'
    unit_group = 'metric'
    start_date = '2023-01-01'
    end_date = '2023-01-02'
    content_type = "json"
    include = "days"

    # basic query including location
    api_query = f"{base_url}{location}/{start_date}/{end_date}?unitGroup={unit_group}&contentType={content_type}&include={include}&key={API_key}"

    print('Collecting your data from...', api_query)
    print()

    try:
        with urllib.request.urlopen(api_query) as response:
            weatherData = json.load(response)

    except urllib.error.HTTPError as e:
        ErrorInfo = e.read().decode()
        print('Error code:', e.code, ErrorInfo)
        sys.exit()

    except urllib.error.URLError as e:
        ErrorInfo = e.read().decode()
        print('Error code:', e.code, ErrorInfo)
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

    return json.dumps(weatherData, indent = 4)


if __name__ == "__main__":
    print(datacleaning(gettingdatafromAPI()))




