import unittest
import json

from backend.calculations import (main, gettingdatafromAPI, datacleaning, convert_solarradiation2kWh,
                   total_energy_produced_per_year, calculate_overproduction,
                   savings_from_energy_bill, earned_from_powersales,
                   discounted_cash_flow_per_year, cf_per_year_dict, acc_cf_per_year,
                   breakeven_calculation, return_on_investment, total_savings,
                   create_json_output)

class TestSolarCalculations(unittest.TestCase):
    def test_total_energy_produced_per_year(self):
        m2_solar_panels = 100
        self.assertGreater(total_energy_produced_per_year(m2_solar_panels+50,10,10), total_energy_produced_per_year(m2_solar_panels, 10, 10))

    def test_calculate_overproduction(self):
        energy_consumption_per_year = 5000
        annual_energy_production = 6000
        for i in range(1, 100):
            energy_consumption_per_year += 1
            annual_energy_production += 1
            self.assertEqual(calculate_overproduction(energy_consumption_per_year, annual_energy_production), 1000)
            self.assertEqual(calculate_overproduction(annual_energy_production, energy_consumption_per_year), 0)

    def test_savings_from_energy_bill(self):
        year = 1
        annual_energy_production = 1000
        energy_consumption = 500
        energy_cost_per_kWh = 10

        self.assertGreater(savings_from_energy_bill(year, annual_energy_production, energy_consumption+100, energy_cost_per_kWh),
                           savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh))
        self.assertGreater(
            savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh+12),
            savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh))
        self.assertEqual(
            savings_from_energy_bill(year, annual_energy_production+500, energy_consumption, energy_cost_per_kWh),
            savings_from_energy_bill(year, annual_energy_production, energy_consumption, energy_cost_per_kWh))

    def test_earned_from_powersales(self):
        year = 1
        overproduction = 100
        self.assertGreater(earned_from_powersales(year, overproduction+100), earned_from_powersales(year, overproduction) )

    def test_discounted_cash_flow_per_year(self):
        year = 1
        investment_cost = 10000
        overproduction = 1000
        annual_energy_production = 100
        energy_consumption = 500
        energy_cost_per_kWh = 10
        self.assertEqual(-investment_cost, discounted_cash_flow_per_year(0, investment_cost, overproduction, annual_energy_production, energy_consumption, energy_cost_per_kWh))
        self.assertGreater(discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production, energy_consumption, energy_cost_per_kWh+12),
                       discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production, energy_consumption, energy_cost_per_kWh))

        self.assertGreater(discounted_cash_flow_per_year(year, investment_cost, overproduction+200, annual_energy_production,
                                                     energy_consumption, energy_cost_per_kWh),
                       discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production,
                                                     energy_consumption, energy_cost_per_kWh))
        self.assertEqual(
            discounted_cash_flow_per_year(year, investment_cost+1000, overproduction, annual_energy_production,
                                          energy_consumption, energy_cost_per_kWh),
            discounted_cash_flow_per_year(year, investment_cost, overproduction, annual_energy_production,
                                          energy_consumption, energy_cost_per_kWh))

    def test_breakeven_calculation(self):
        investment_cost = 10000
        overproduction = 1000
        energy_cost_per_kWh = 100
        annual_energy_production = 5000
        energy_consumption = 4000
        self.assertLess(
            breakeven_calculation(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production,
                                  energy_consumption),
            breakeven_calculation(investment_cost*2, overproduction, energy_cost_per_kWh, annual_energy_production,
                                  energy_consumption)
        )

    def test_return_on_investment(self):
        investment_cost = 10000
        overproduction = 1000
        energy_cost_per_kWh = 100
        annual_energy_production = 5000
        energy_consumption = 4000
        self.assertGreater(
            float(return_on_investment(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production,
                                 energy_consumption)[0:-1]),
            float(return_on_investment(investment_cost*2, overproduction, energy_cost_per_kWh, annual_energy_production,
                                 energy_consumption)[0:-1])
        )

    def test_total_savings(self):
        investment_cost = 10000
        overproduction = 1000
        energy_cost_per_kWh = 100
        annual_energy_production = 5000
        energy_consumption = 4000
        self.assertGreater(
            total_savings(investment_cost, overproduction, energy_cost_per_kWh*2, annual_energy_production,
                          energy_consumption),
            total_savings(investment_cost, overproduction, energy_cost_per_kWh, annual_energy_production,
                          energy_consumption)
        )


if __name__ == '_main_':
    unittest.main()