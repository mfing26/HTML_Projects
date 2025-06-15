import React, { useEffect, useMemo, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ModuleRegistry, PaginationModule, RowSelectionModule } from 'ag-grid-community';
import Select from 'react-select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/FilterPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import banner from '../assets/factors_banner.png'; 
import { provideGlobalGridOptions } from 'ag-grid-community';

provideGlobalGridOptions({ theme: "legacy" });

ModuleRegistry.registerModules([
  PaginationModule,
  RowSelectionModule,
  ClientSideRowModelModule,
]);

const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;

const FactorsPage = () => {
  const gridRef = useRef(null);

  const columnDefs = useMemo(() => [
    { field: 'rank', flex: 1 },
    { field: 'country', flex: 2 },
    { field: 'score', flex: 1 },
    { field: 'economy', flex: 1 },
    { field: 'family', flex: 1 },
    { field: 'health', flex: 1 },
    { field: 'freedom', flex: 1 },
    { field: 'generosity', flex: 1 },
    { field: 'trust', flex: 1 },
  ], []);

  const [year, setYear] = useState(2020);
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      boxShadow: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      zIndex: 9999,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
    }),
  };

  useEffect(() => {
    const allYears = [];
    for (let y = 2015; y <= 2020; y++) {
      allYears.push(y);
    }
    setYears(allYears.reverse());
  }, []);

  useEffect(() => {
    const checkToken = () => setLoggedIn(!!localStorage.getItem('token'));
    const interval = setInterval(checkToken, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setData([]);
      setLoading(false);  
      return;
    }

    const fetchFactors = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/factors/${year}`;
        if (selectedCountry?.value) {
          url += `?country=${encodeURIComponent(selectedCountry.value.toLowerCase())}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-API-KEY': 'EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch factors');
        }

        const json = await response.json();
        setData(Array.isArray(json) ? json : [json]);
      } catch (err) {
        console.error(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFactors();
  }, [year, selectedCountry, loggedIn]);

  const countryOptions = useMemo(() => {
    const countries = data.map((item) => item.country);
    const uniqueCountries = [...new Set(countries)];
    return uniqueCountries.map(country => ({ label: country, value: country }));
  }, [data]);

  const yearOptions = useMemo(() => {
    return years.map((y) => ({ label: y.toString(), value: y }));
  }, [years]);

  const chartData = useMemo(() => {
    return data.map(item => ({
      name: item.country,
      economy: item.economy,
      family: item.family,
      health: item.health,
      freedom: item.freedom,
      generosity: item.generosity,
      trust: item.trust,
    }));
  }, [data]);

  return (
    <div className="bg-light text-dark min-vh-100"> 
      <div className="position-relative">
        <img
          src={banner}
          alt="hero banner showing a map of the world"
          className="img-fluid w-100 banner-image"
        />
        <div className="banner-text">
          <h1 className="fw-bold fs-2 fs-md-1">Explore Happiness Factors</h1>
          <p className="lead mb-0">Explore the key factors contributing to global happiness in {year}.</p>
        </div>
      </div>

      {loading && !data.length ? (
        <div className="text-center my-4">
          <p>Loading data...</p>
        </div>
      ) : !loggedIn ? (
        <div className="text-center my-4">
          <p>User not logged in. Please log in to view the data.</p>
        </div>
      ) : (
        <>
          <div className="filter-year px-4">
            <div className="filters">
              <div className="filter-item">
                <label htmlFor="year-select">Year:</label>
                <Select
                  id="year-select"
                  options={yearOptions}
                  styles={selectStyles}
                  value={yearOptions.find(option => option.value === year)}
                  onChange={(selectedOption) => setYear(selectedOption.value)}
                  isClearable={false}
                  placeholder="Select a year..."
                />
              </div>

              <div className="filter-country">
                <label htmlFor="country-select">Country:</label>
                <Select
                  id="country-select"
                  options={countryOptions}
                  styles={selectStyles}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  isClearable
                  placeholder="Search for a country..."
                />
              </div>
            </div>

            <div className="grid-wrapper">
              <div className="ag-theme-alpine" style={{ width: '100%', height: '600px', minWidth: '800px' }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={data}
                  loading={loading}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={20}
                  domLayout="autoHeight"
                  defaultColDef={{
                    flex: 1,
                    resizable: true,
                  }}
                />
              </div>
            </div>

            <div className="chart-wrapper pt-4 pb-4">
              <div className="chart-box p-4 shadow rounded">
                <h2>Happiness Factors Breakdown by Country</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="economy" stackId="a" fill="#8884d8" />
                    <Bar dataKey="family" stackId="a" fill="#83a6ed" />
                    <Bar dataKey="health" stackId="a" fill="#8dd1e1" />
                    <Bar dataKey="freedom" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="generosity" stackId="a" fill="#a4de6c" />
                    <Bar dataKey="trust" stackId="a" fill="#d0ed57" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FactorsPage;