import { useState } from 'react'
import { calculateInvestmentResults } from './util/investment';
import Input from './components/Input'
import Result from './components/Result'
import investmentCalculatorLogo from './assets/investment-calculator-logo.png';

function App() {
  const [investment, setInvestment] = useState({
    initial : 10000,
    annual : 300,
    expected : 5.5,
    duration : 12
  })

  function handleValChange(whichKey, val){
    setInvestment(investment => {
      let newInvestment = {...investment, [whichKey] : val}
      return newInvestment
    })
  }

  console.log(investment)

  return (
    <div className="App">
      <div id='header'>
        <img src={investmentCalculatorLogo} alt='Img here'></img>
        <h1>Investment Calculator</h1>
      </div>

      <div id='user-input'>
        <Input keyName='initial' valChange={handleValChange}>Initial Investment</Input>
        <Input keyName='annual' valChange={handleValChange}>Annual Investment</Input>
        <Input keyName='expected' valChange={handleValChange}>Expected Return</Input>
        <Input keyName='duration' valChange={handleValChange}>Duration</Input>
      </div>

      <table id='result'>
        <Result investObj={investment} />
      </table>
    </div>
  );
}

export default App;
