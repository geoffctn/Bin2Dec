import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import Input from './components/Input'

import './App.css'

function App() {
  const [inputBin, setInputBin] = useState({
    value: '',
    binary: false,
  })
  const [decNum, setDecNum] = useState()

  useEffect(() => {
    if (inputBin.value.length > 0 && inputBin.binary) {
      setDecNum(convertToDec(inputBin.value))
    } else if (inputBin.value.length === 0) {
      setDecNum('')
    }
  }, [inputBin])

  const regExpNotBin = /[^01]/

  const handleBinaryInput = (e) => {
    const { value } = e.target
    setInputBin({ value, binary: !regExpNotBin.test(value) })
  }

  const convertToDec = (num) => {
    let convertedNum = 0
    num
      .split('')
      .reverse()
      .map((item, index) => {
        return item === '1' && (convertedNum += Math.pow(2, index))
      })
    return convertedNum
  }

  const Alert = () => {
    if (inputBin.value.length > 0) {
      if (!inputBin.binary) {
        return (
          <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
            You entered a non-binary digit (please enter only 0 or 1).
          </span>
        )
      } else if (inputBin.binary) {
        return (
          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
            Here is your decimal!
          </span>
        )
      } else {
        return ' '
      }
    }
    return null
  }

  return (
    <div className="App">
      <div>
        <span className="attenuated">000</span>
        <h1>Bin2Dec</h1>
        <span className="attenuated">000</span>
      </div>
      <p>
        Enter a{' '}
        <a
          href="https://en.wikipedia.org/wiki/Binary_number"
          target="_blank"
          rel="noopener noreferrer"
        >
          binary number
        </a>
        , get a{' '}
        <a
          href="https://en.wikipedia.org/wiki/Decimal"
          target="_blank"
          rel="noopener noreferrer"
        >
          decimal
        </a>{' '}
        conversion.
        <br />
        <Alert />
      </p>
      <Input inputBin={inputBin} handleBinaryInput={handleBinaryInput} />
      <Display inputBin={inputBin} decNum={decNum} />
      <footer>
        Made by{' '}
        <a
          href="https://www.geoffreycouten.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Geoffrey Couten
        </a>
        <br />
        Background Photo by Alexander Sinn
      </footer>
    </div>
  )
}

export default App
