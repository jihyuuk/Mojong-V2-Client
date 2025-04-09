import React, { useEffect, useRef, useState } from 'react';
import { useTost } from '../utils/TostProvider';
import SubHeader from '../components/SubHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import MotionPage from '../motions/MotionPage';
import Footer from '../components/Footer';
import { useShoppingCart } from '../utils/ShoppingCartProvider';
import { Button } from 'react-bootstrap';

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
        if (quantity > item.stock) {
            setQuantity(item.stock);
            showTost("재고가 부족합니다. (재고:" + item.stock + "개)")
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

    //넘버패드===========================================
    const numberPad = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['C', '0', '⌫']
    ];

    const plusValue = [5, 10, 50, 72];

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
                    <div className='d-flex align-items-center w-100 mt-2'>
                        {/* 이름, 단가 */}
                        <div className='flex-grow-1 pe-1'>
                            <div className="fw-semibold fs-4">
                                {item.name}
                            </div>
                            <div className="text-success fw-semibold mt-1">
                                ₩ {item.price.toLocaleString('ko-KR')}
                            </div>
                        </div>

                        {/* 사진 */}
                        <div>
                            <img src={item.photo} className='rounded-3' style={{ width: '5rem' }} />
                        </div>
                    </div>

                    {/* 설명 */}
                    <div className='text-secondary mt-2'>
                        {item.description}
                    </div>

                </main>

                {/* 푸터 */}
                <footer
                    className='border-top border-success-subtle rounded-4'
                    style={{
                        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)'
                    }}
                >

                    {/* 수량 */}
                    <div className='text-center py-4'>
                        <div className='display-3 fw-semibold text-success'>{quantity.toLocaleString('ko-KR')}개</div>
                    </div>

                    {/* 넘버패드 */}
                    <div>
                        <div className='d-flex gap-2 text-center fw-semibold text-success px-2 mb-1'>
                            {plusValue.map((value, index) =>
                                <div key={index} className='w-100 bg-success-subtle rounded-3 py-1'>
                                    +{value}
                                </div>
                            )}
                        </div>

                        {numberPad.map((row, index) =>
                            <div key={"row" + index} className='d-flex text-center fw-semibold fs-4'>
                                {row.map((number, index) =>
                                    <div
                                        key={"num" + index}
                                        className='w-100 py-3 rounded-4'
                                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }} //텍스트 복사 막기 
                                        onTouchStart={(e) => e.currentTarget.classList.add('bg-secondary-subtle', 'text-secondary')}
                                        onTouchEnd={(e) => e.currentTarget.classList.remove('bg-secondary-subtle', 'text-secondary')}
                                        onTouchCancel={(e) => e.currentTarget.classList.remove('bg-secondary-subtle', 'text-secondary')}
                                    >
                                        {number}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* 장바구니 담기 버튼 */}
                    <div className="p-2 py-3">
                        <Button variant="success" disabled={total <= 0} className="w-100 fs-5 fw-semibold p-2 rounded-3" >
                            {total > 0 ? `${total.toLocaleString('ko-KR')}원 담기` : '수량을 입력해주세요'}
                        </Button>
                    </div>
                </footer>
            </div >
        </MotionPage>
    );
}

export default DetailPage;