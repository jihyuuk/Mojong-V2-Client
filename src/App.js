import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { TostProvider } from './utils/TostProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShoppingCartProvider } from './utils/ShoppingCartProvider';
import { useEffect, useState } from 'react';
import LoadingMain from './components/LoadingMain';
import axios from 'axios';
import axiosWithToken from './utils/axiosWithToken';
import SuccessPage from './pages/SuccessPage';
import SelfOrderPage from './pages/SelfOrderPage';
import CashierOrderPage from './pages/CashierOrderPage';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [token, setToken] = useState(null);

  //1. 토큰 초기화
  useEffect(() => {

    //토큰 로컬스토리지에서 꺼내오기
    const localToken = localStorage.getItem('token');

    //토큰 존재시 넘어가기
    if (localToken) {
      console.log("토큰 존재 : " + localToken);
      setToken(localToken);
      return;
    }

    console.log("토큰 없음");

    //토큰 서버로 받아오기
    axios.get('http://192.168.0.3:8080/guest-token')
      .then(response => {
        const newToken = response.headers['authorization'];

        console.log("새로운 토큰 : " + newToken);

        localStorage.setItem('token', newToken);
        setToken(newToken); // 상태 업데이트
      })
      .catch(error => {
        console.error('토큰 요청 실패:', error);
        alert("일시적인 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      });

  }, []);

  //메뉴 가져오기 
  useEffect(() => {
    //토큰이 있을 때만 실행
    if (!token) return;

    console.log("메뉴 가져오기 ");

    axiosWithToken.get('/menu')
      .then((response) => {
        console.log(response.data);

        //메뉴 세팅
        setMenu(response.data);
        //로딩 끝
        setIsLoading(false);

      })
      .catch((error) => {
        console.error('API 요청 실패:', error);

        alert("상품을 불러오지 못 했습니다. 관리자에게 문의해주세요.");
      });
  }, [token]);



  //로딩시
  if (isLoading) {
    return (<LoadingMain />);
  }

  //로딩 끝
  return (
    <div className="App">
      <BrowserRouter>{/* react-rotuer-dom */}
        <TostProvider>{/* 토스트 기능 context */}
          <ShoppingCartProvider>

            {/* 메인 페이지 */}
            <MainPage menu={menu} />

            <Routes>
              {/* 아이템 상세 페이지 */}
              <Route path="/detail" element={<DetailPage />} menu={menu} />
              {/* 장바구니 페이지 */}
              <Route path="/shoppingCart" element={<ShoppingCartPage />} />

              {/* 직원결제 페이지 */}
              <Route path="/cashier-order" element={<CashierOrderPage />} />
              {/* 토스결제 페이지 */}
              <Route path="/self-order" element={<SelfOrderPage />} />

              {/* 토스 결제 성공 페이지 */}
              <Route path="/success" element={<SuccessPage/>}/>
            </Routes>

          </ShoppingCartProvider>
        </TostProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
