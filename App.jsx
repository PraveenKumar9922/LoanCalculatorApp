import React, { useState } from 'react'; // Import the ErrorPage component
import './App.css'; // You can create this CSS file for styling
//import { Link } from 'react-router-dom';


function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiDetails, setEmiDetails] = useState([]);
  const [emiAmount, setEmiAmount] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 1200; // Monthly interest rate
    const tenureInMonths = parseInt(loanTenure) * 12;

    if (isNaN(principal) || isNaN(rateOfInterest) || isNaN(tenureInMonths) || principal <= 0 || rateOfInterest < 0 || tenureInMonths <= 0) {
      alert('Please enter valid loan details.');
      return;
    }

    const emi =
      (principal * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) /
      (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
      
    setEmiAmount(emi.toFixed(2));
    let remainingBalance = principal;
    const monthlyDetails = [];

    for (let i = 1; i <= tenureInMonths; i++) {
      const interest = remainingBalance * rateOfInterest;
      const principalPaid = emi - interest;
      remainingBalance -= principalPaid;

      monthlyDetails.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        remainingBalance: Math.max(0, remainingBalance).toFixed(2), // Ensure it doesn't go negative
      });
    }

    setEmiDetails(monthlyDetails);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    
  };

  const Reset = () =>{
    setEmiDetails(" ")
  }

  return (
    <div>
      <div className={`loan-calculat or-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <div className="logo">Loan Calculator</div>
          <ul className="nav-links">
            <li><a href="Home">HOME</a></li>
            <li><a href="Exchange-rates">EXCHANGE RATES (LIVE)</a></li>
            <li><a href="About">ABOUT</a></li>
            <li><a href="ErrorPage" > ErrorPage</a> </li>
            <li onClick={toggleTheme} className="theme-toggle">ChangeTheame</li> 
          
          </ul>
        </nav>

        <div className="loan-calculator-dashboard">
          <h2>Loan Calculator Dashboard</h2>

        <div className="input-container">
          <div className="input-group">
            <label htmlFor="loanAmount">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="loanTenure">Term (Years)</label>
            <input
              type="number"
              id="loanTenure"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}/>
        </div>
          </div>
          <button onClick={calculateEMI} className="calculate-button">
            CALCULATE
          </button>

          

          {emiDetails.length > 0 && (
            <div className="emi-table-container">
                {emiAmount && <h3>Monthly EMI: ₹{emiAmount}</h3>}
              <div className='section'>
              <div className='amor'>
               <span>Armortization-schedule</span>
                </div>
              <div><button onClick={Reset}>RESET TABLE</button></div>
              
              </div>
             
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {emiDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.month}</td>
                      <td>{detail.principal}</td>
                      <td>{detail.interest}</td>
                      <td>{detail.remainingBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
