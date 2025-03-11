import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {

  //아이템 상세 페이지 출력 여부
  const [selectedItem, setSelectedItem] = useState(null);

  //장바구니 페이지 출력 여부
  const [showShoppingCart, setShowShoppingCart] = useState(false);

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
    //장바구니 담긴거 없을때 닫기
    if (calPrice === 0) setShowShoppingCart(false);
  }, [cartItems]);

  return (
    <div className="App">

      {/* 메인 페이지 */}
      <MainPage setSelectedItem={setSelectedItem} setShowShoppingCart={setShowShoppingCart} totalPrice={totalPrice} />

      {/* 아이템 상세 페이지 */}
      {selectedItem && (
        <motion.div
          initial={{ x: "100%" }}  // 처음에 화면 오른쪽에 위치
          animate={{ x: 0 }}       // 왼쪽으로 이동하여 화면에 표시
          transition={{ duration: 0.2 }}
          className='z-1 position-absolute top-0 start-0 w-100 h-100 bg-white'
        >
          <DetailPage item={selectedItem} close={() => setSelectedItem(null)} setCartItems={setCartItems} />
        </motion.div>
      )}

      {/* 장바구니 페이지 */}
      {showShoppingCart && (
        <motion.div
          initial={{ x: "100%" }}  // 처음에 화면 오른쪽에 위치
          animate={{ x: 0 }}       // 왼쪽으로 이동하여 화면에 표시
          transition={{ duration: 0.2 }}
          className='z-1 position-absolute top-0 start-0 w-100 h-100 bg-white'
        >
          <ShoppingCartPage
            close={() => setShowShoppingCart(false)}
            cartItems={cartItems}
            setCartItems={setCartItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            totalQuantity={totalQuantity}
            setTotalQuantity={setTotalQuantity}
          />

        </motion.div>
      )}

    </div>
  );
}

export default App;
