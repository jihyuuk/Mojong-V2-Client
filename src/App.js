import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { useEffect, useState } from 'react';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { TostProvider } from './utils/TostProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  //장바구니에 담긴 아이템들
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  //총 수량, 품목수, 금액 계산 
  useEffect(() => {
    let calPrice = 0;
    let calQuantity = 0;

    cartItems.forEach((item) => {
      calPrice += item.quantity * item.price;
      calQuantity += item.quantity;
    });

    //값 업데이트
    setTotalPrice(calPrice);
    setTotalQuantity(calQuantity);
  }, [cartItems]);

  return (
    <div className="App">
      <BrowserRouter>{/* react-rotuer-dom */}
        <TostProvider>{/* 토스트 기능 context */}

          {/* 메인 페이지 */}
          <MainPage totalPrice={totalPrice} />

          <Routes>
            {/* 아이템 상세 페이지 */}
            <Route path="/detail/:id" element={<DetailPage setCartItems={setCartItems} />} />
            {/* 장바구니 페이지 */}
            <Route path="/shoppingCart" element={
              <ShoppingCartPage
                cartItems={cartItems}
                setCartItems={setCartItems}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                totalQuantity={totalQuantity}
                setTotalQuantity={setTotalQuantity}
              />
            } />
          </Routes>

        </TostProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
