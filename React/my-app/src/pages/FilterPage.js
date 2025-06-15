import React, { useEffect, useMemo, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ModuleRegistry, PaginationModule, RowSelectionModule } from 'ag-grid-community';
import Select from 'react-select'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/FilterPage.css'; 
import banner from '../assets/rankings.png'; 
import { provideGlobalGridOptions } from 'ag-grid-community';

provideGlobalGridOptions({ theme: "legacy" });

ModuleRegistry.registerModules([
  PaginationModule,
  RowSelectionModule,
  ClientSideRowModelModule,
]);

const FilterPage = () => {
  const gridRef = useRef(null);

  const columnDefs = useMemo(
    () => [
      { field: 'rank', flex: 1 },
      { field: 'country', flex: 2 },
      { field: 'score', flex: 1 },
      { field: 'year', flex: 1 },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const headers = {
          'X-API-KEY': 'EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV',
          Accept: 'application/json',
        };

        const rankingsRes = await fetch(
          'https://d2h6rsg43otiqk.cloudfront.net/prod/rankings',
          { headers }
        );
        const rankingsData = await rankingsRes.json();

        const countriesRes = await fetch(
          'https://d2h6rsg43otiqk.cloudfront.net/prod/countries',
          { headers }
        );
        const countriesData = await countriesRes.json();

        setData(rankingsData);

        const uniqueYears = [...new Set(rankingsData.map((item) => item.year))].sort((a, b) => b - a);
        setYears(uniqueYears);
        setSelectedYears([uniqueYears[0]]);

        setCountries(countriesData.sort());
        setSelectedCountries([]);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sorted = [...data].filter((item) =>
      (selectedYears.length === 0 || selectedYears.includes(item.year)) &&
      (selectedCountries.length === 0 || selectedCountries.includes(item.country))
    ).sort((a, b) => a.rank - b.rank);

    setFilteredData(sorted);
  }, [data, selectedYears, selectedCountries]);

  return (
    <div className="bg-light text-dark min-vh-100"> 
    <div className="position-relative">
      <img
        src={banner}
        alt="hero banner showing a map of the world"
        className="img-fluid w-100 banner-image"
      />
      <div className="banner-text">
        <h1 className="fw-bold fs-2 fs-md-1">Explore World Happiness Rankings</h1>
        <p className="lead mb-0">Filter by year and country to explore global happiness data.</p>
      </div>
    </div>
        <div className="filter-year">
          <div className="filters">
            <div className="filter-item">
              <label htmlFor="year-select">Year:</label>
              <Select
                inputId="year-select"
                isMulti
                styles={selectStyles}
                options={years.map((year) => ({ value: year, label: year.toString() }))}
                value={selectedYears.map((year) => ({ value: year, label: year.toString() }))}
                onChange={(selected) => setSelectedYears(selected.map((option) => option.value))}
              />
            </div>
    
            <div className="filter-country">
              <label htmlFor="country-select">Country:</label>
              <Select
                inputId="country-select"
                isMulti
                styles={selectStyles}
                options={countries.map((country) => ({ value: country, label: country }))}
                value={selectedCountries.map((country) => ({ value: country, label: country }))}
                onChange={(selected) => setSelectedCountries(selected.map((option) => option.value))}
              />
            </div>
          </div>
    
          <div className="grid-wrapper">
            <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
              <AgGridReact
                ref={gridRef}
                rowData={filteredData}
                loading={loading}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={20}
                domLayout="autoHeight"
              />
            </div>
          </div>
        </div>
    
        <div className="cta-banner">
          <p>Want to acess more insights on these happiness rankings, register or if you're an existing user login here:</p>
          <div className="cta-buttons">
            <a href="/register">
              <button>Register</button>
            </a>
            <a href="/login">
              <button>Login</button>
            </a>
          </div>
        </div>
      </div>
    );
};

export default FilterPage;
