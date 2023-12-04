//import { useState, useRef, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
//import Providers from './components/providers/index.tsx';

import Main from "./components/pages/Main/index.tsx";

function App() {
  
  return (  
    <RecoilRoot>   
      <Main />
    </RecoilRoot> 
  )
}


export default App
