import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

// Write your JS code here

class CryptocurrenciesList extends Component {
  state = {isDataFetched: false, cryptoCurrenciesList: []}

  componentDidMount() {
    this.getCryptocurrenciesList()
  }

  getCryptocurrenciesList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    console.log(data)
    const formatedData = data.map(each => ({
      currencyName: each.currency_name,
      usdValue: each.usd_value,
      euroValue: each.euro_value,
      id: each.id,
      currencyLogo: each.currency_logo,
    }))
    this.setState({isDataFetched: true, cryptoCurrenciesList: formatedData})
  }

  render() {
    const {isDataFetched, cryptoCurrenciesList} = this.state
    return (
      <div>
        <h1>Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
        />
        {isDataFetched ? (
          <ul>
            {cryptoCurrenciesList.map(each => (
              <CryptocurrencyItem key={each.id} eachItem={each} />
            ))}
          </ul>
        ) : (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
