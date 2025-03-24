import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { TostProvider } from './utils/TostProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShoppingCartProvider } from './utils/ShoppingCartProvider';

function App() {

  return (
    <div className="App">
      <BrowserRouter>{/* react-rotuer-dom */}
        <TostProvider>{/* 토스트 기능 context */}
          <ShoppingCartProvider>

            {/* 메인 페이지 */}
            <MainPage />

            <Routes>
              {/* 아이템 상세 페이지 */}
              <Route path="/detail/:id" element={<DetailPage />} />
              {/* 장바구니 페이지 */}
              <Route path="/shoppingCart" element={<ShoppingCartPage />} />
            </Routes>

          </ShoppingCartProvider>
        </TostProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
