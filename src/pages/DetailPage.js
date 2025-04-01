import React, { useEffect, useRef, useState } from 'react';
import { useTost } from '../utils/TostProvider';
import SubHeader from '../components/SubHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import MotionPage from '../motions/MotionPage';
import Footer from '../components/Footer';
import { useShoppingCart } from '../utils/ShoppingCartProvider';

function DetailPage() {

    //리액트 라우터
    const navigate = useNavigate();
    const location = useLocation();
    //state로 넘어온 item 꺼내오기
    const item = location.state;


    //토스트
    const { showTost } = useTost();
    //장바구니
    const { setCartItems } = useShoppingCart();

    //수량
    const [quantity, setQuantity] = useState(0);
    //최대수량
    const maxQuantity = 999;

    //가격
    const [total, setTotal] = useState(0);

    //수량
    const inputRef = useRef(null);

    //수량 변화시 금액 변경
    useEffect(() => {
        if (!item) return;

        //수량 초과 검증하기
        if(quantity > item.stock){
            setQuantity(item.stock);
            showTost("재고가 부족합니다. (재고:"+item.stock+"개)")
            return;
        }        
        
        setTotal(item.price * quantity);
    }, [quantity])


    //마이너스 버튼 클릭
    const clickMinus = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    //플러스 버튼 클릭
    const clickPlus = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    }

    //수량 직접 입력
    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            setQuantity(parseInt(quantity / 10));
        } else {
            const cal = quantity * 10 + parseInt(e.key);
            if (cal <= maxQuantity) {
                setQuantity(cal)
            }
        }
    };

    const addCart = () => {
        setCartItems(prevItems => {
            // 이미 장바구니에 같은 상품이 있는지 확인
            const existingItemIndex = prevItems.findIndex(preItem => preItem.id === item.id);

            // 이미 있는 상품이면 수량만 증가
            if (existingItemIndex !== -1) {
                return prevItems.map((item, idx) =>
                    idx === existingItemIndex
                        ? { ...item, quantity: Math.min(item.quantity + quantity, maxQuantity) } //최대 3자리 초과 막기
                        : item
                );
            }

            // 없는 상품이면 새로 추가
            return [...prevItems, { ...item, quantity: quantity }];
        });
        showTost("장바구니 추가 완료");
        navigate(-1); // 상세페이지 닫기
    };


    //상품 클릭 없이 직접 /detail로 접근시 리다이렉트
    useEffect(() => {
        if (!item) {
            navigate("/", { replace: true });
        }
    }, [item, navigate]);
    if (!item) return null;

    return (
        //애니메이션 적용
        <MotionPage>
            <div className='d-flex flex-column h-100 bg-white'>

                {/* 헤더 */}
                <SubHeader title={"상품 상세"} />

                {/* 메인 */}
                <main className='flex-grow-1 overflow-y-auto p-3 pt-0'>
                    {/* 사진 */}
                    <div className='text-center'>
                        <img src={item.photo} style={{ maxHeight: '200px' }} />
                    </div>

                    <div className='fw-bold fs-1'>{item.name}</div>
                    <div className='py-3 text-secondary'>{item.description}</div>

                    <div className='mt-3 fw-semibold fs-5 d-flex justify-content-between'>
                        <div>
                            가격
                        </div>
                        <div>
                            {item.price.toLocaleString('ko-KR')}원
                        </div>
                    </div>

                    <div className='mt-3 fw-semibold fs-5 d-flex justify-content-between align-items-center flex-wrap'>
                        <div>
                            수량
                        </div>
                        {/* 수량 입력칸 */}
                        <div className="border rounded-3 d-flex align-items-center">
                            <span className={`px-3 py-2 ${quantity < 1 ? 'text-secondary' : ''}`} onClick={clickMinus}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                </svg>
                            </span>

                            <input type="text" size={3} pattern="[0-9]*" inputMode="numeric"
                                ref={inputRef}
                                className="text-center border-0"
                                value={quantity === 0 ? '' : quantity}
                                placeholder='0'
                                onKeyDown={handleKeyDown}
                                style={{ caretColor: 'transparent' }}
                            />

                            <span className={`px-3 py-2 ${quantity >= maxQuantity ? 'text-secondary' : ''}`} onClick={clickPlus}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </main>

                {/* 푸터 */}
                <Footer
                    value={total <= 0 ? '수량을 입력해주세요.' : total.toLocaleString('ko-KR') + '원 담기'}
                    onClick={addCart}
                    disabled={total <= 0 ? true : false}
                    show={true}
                />
            </div >
        </MotionPage>
    );
}

export default DetailPage;