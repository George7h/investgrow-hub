import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStocks } from '../redux/stocks/stockSlice';
import Navigationhome from '../components/homenav';
import Copyrightfooter from '../components/footer';
import '../styles/homepagestyle.css';

function HomePage() {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks.stocks);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const filteredStocks = stocks.filter((stock) => {
    if (selectedCountry && stock.country !== selectedCountry) {
      return false;
    }
    if (selectedSector && stock.sector !== selectedSector) {
      return false;
    }
    return true;
  });

  return (
    <div className="homepage">
      <Navigationhome />

      <div className="maincard">
        <h3>Stocks</h3>
        <h5>Listed</h5>
      </div>
      <div className="filters">
        <h5>
          Stocks by

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="US">US</option>
            <option value="CA">CA</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="">All Sectors</option>
            <option value="Technology">Technology</option>
            <option value="Consumer Cyclical">Consumer Cyclical</option>
            <option value="Energy">Energy</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Industrials">Industrials</option>
            <option value="Basic Materials">Basic Materials</option>
            <option value="Communication Services">Communication Services</option>
            <option value="Consumer Defensive">Consumer Defensive</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Utilities">Utilities</option>
            <option value="Industrial Goods">Industrial Goods</option>
            <option value="Financial">Financial</option>
            <option value="Services">Services</option>
            <option value="Conglomerates">Conglomerates</option>
          </select>
        </h5>
      </div>

      <div className="stock-card-container">
        {filteredStocks.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <img src={stock.image} alt={`${stock.companyName} Logo`} />
            <Link to={`/stock/${stock.symbol}`}>
              <span className="material-symbols-outlined">arrow_circle_right</span>
            </Link>
            <h3>{stock.symbol}</h3>
            <p>
              Price:
              {stock.price}
            </p>
          </div>
        ))}
      </div>

      <div />
      <Copyrightfooter />
    </div>
  );
}

export default HomePage;
