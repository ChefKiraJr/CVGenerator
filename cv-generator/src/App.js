import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Tabel from './pages/tabel/Tabel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddData from './pages/addData/AddData';
import DataPreview from './pages/dataPreview/DataPreview';
import { lazy, Suspense } from 'react';
const Test = lazy(() => import('./pages/dataPreview/components/Test'));

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tabel />} />
          <Route path="/add-data" element={<AddData />} />
          <Route path="/data-preview/:anak" element={<DataPreview />} />
          <Route path="/edit-data/:anak" element={<AddData isEdit />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    // <>
    //   <Suspense fallback={<div>Loading....</div>}>
    //     <Test />
    //   </Suspense>
    //   <div>WAKWAW GIMAANK</div>
    // </>
  );
}

export default App;
