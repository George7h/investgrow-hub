import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStockHistoricalData, fetchStockProfileData } from '../redux/stocks/stockDetailSlice';
import Navigation from '../components/Navbar';
import '../styles/detailpagestyle.css';

function DetailsPage() {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const selectedStock = useSelector((state) => state.stockDetail.selectedStock);
  const historicalData = useSelector((state) => state.stockDetail.historicalData);
  const profileData = useSelector((state) => state.stockDetail.profileData);

  useEffect(() => {
    dispatch(fetchStockHistoricalData(symbol));
    dispatch(fetchStockProfileData(symbol));
  }, [dispatch, symbol]);

  return (
    <div>
      <Navigation />
      <h1>
        {selectedStock ? selectedStock.symbol : ''}
      </h1>
      {profileData && (
        <div className="profilecont">
          <p>
            <img src={profileData.image} alt={`${profileData.companyName} Logo`} />
          </p>
          <div className="profinfo">
            <p>
              {profileData.companyName}
            </p>
            <p>
              {profileData.website}
            </p>
            <p>
              {profileData.currency}
            </p>
            <p>
              Current Price:
              {' '}
              {profileData.price}
            </p>
          </div>
        </div>
      )}
      <h3>HISTORY OF STOCK</h3>
      <div className="tablecontain">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Closing Price</th>
              <th>%Change</th>
              <th>Volume</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((data) => (
              <tr key={data.date}>
                <td>{data.date}</td>
                <td>{data.close}</td>
                <td>{data.changePercent}</td>
                <td>{data.volume}</td>
                <td><span className="material-symbols-outlined">arrow_circle_right</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

  );
}

export default DetailsPage;
