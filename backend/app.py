from flask import Flask, request, jsonify
from calculations import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:5173')

@app.route('/')
def index():
    return open('input_form.html').read()

@app.route('/submit', methods=['GET'])
def submit():
    energy_consumption_per_year = request.args.get('energy_consumption_per_year')
    energy_cost_per_kWh = request.args.get('energy_cost_per_kWh')
    investment_cost = request.args.get('investment_cost')
    m2_solar_panels = request.args.get('m2_solar_panels')
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    response = main(
        float(energy_consumption_per_year),
        float(energy_cost_per_kWh),
        float(investment_cost),
        float(m2_solar_panels),
        float(lat),
        float(lon)
    )

    return response

if __name__ == '__main__':
    app.run(debug=True)
