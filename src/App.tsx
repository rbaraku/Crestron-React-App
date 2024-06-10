import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Slider from '@mui/material/Slider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  bridgeReceiveIntegerFromNative,
  bridgeReceiveBooleanFromNative,
  bridgeReceiveStringFromNative,
  bridgeReceiveObjectFromNative,
} from "@crestron/ch5-crcomlib";

import { publishEvent } from "@crestron/ch5-crcomlib";
import { useCrestronSubscribeAnalog, useCrestronSubscribeSerial } from "@norgate-av/react-crestron-ch5-hooks";

(window as any)["bridgeReceiveIntegerFromNative"] =
  bridgeReceiveIntegerFromNative;
(window as any)["bridgeReceiveBooleanFromNative"] =
  bridgeReceiveBooleanFromNative;
(window as any)["bridgeReceiveStringFromNative"] =
  bridgeReceiveStringFromNative;
(window as any)["bridgeReceiveObjectFromNative"] =
  bridgeReceiveObjectFromNative;

function App() {

  const setRedBackground = () => {
    setColor("253, 67, 67");
    setBackground(`rgba(253, 67, 67, ${opacity})`);
    publishEvent('b', "1", true); 
    publishEvent('b', "1", false);
  }

  const setGreenBackground = () => {
    setColor("132, 202, 19");
    setBackground(`rgba(132, 202, 19, ${opacity})`);
    publishEvent('b', "2", true); 
    publishEvent('b', "2", false);
  }

  const setBlueBackground = () => {
    setColor("4, 59, 92");
    setBackground(`rgba(4, 59, 92, ${opacity})`);
    publishEvent('b', "3", true); 
    publishEvent('b', "3", false);
  }

  const setSliderValue = (value: number) => {
    setBackground(`rgba(${color}, ${value/100})`);
    setOpacity(value / 100);
    publishEvent('n', "1", value);
    return `${value}`;
  }

  const [ color, setColor ] = useState("253, 67, 67");
  const [ opacity, setOpacity ] = useState(1);
  const [ background, setBackground ] = useState("rgba(253, 67, 67, 1");

  const [opacityValue]= useCrestronSubscribeAnalog("1");
  const [textResponse] = useCrestronSubscribeSerial("1");

  return (
    <div className="App">
      <h1>
      React Playground
      </h1>
      <div className='Button-list' style={{backgroundColor: background}}>
        <p>
          {textResponse.value === "" ? "Red Background Color": textResponse.value}
        </p>
        <Button className='Button' size='lg'onClick={setRedBackground}>Red</Button>
        <Button className='Button' size='lg'onClick={setGreenBackground}>Green</Button>
        <Button className='Button' size='lg'onClick={setBlueBackground}>Blue</Button>
      </div>
      <div className='Slider'>
        <p>
          Opacity: {textResponse.value === "" ? "100": opacityValue.value}%
        </p>
        <Slider sx={{width: 800}} defaultValue={100} getAriaValueText={setSliderValue}>
        </Slider>
      </div>
    </div>
  );
}

export default App;
