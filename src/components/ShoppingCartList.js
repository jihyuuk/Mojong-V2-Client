import React from "react";
import { useShoppingCart } from "../utils/ShoppingCartProvider";
import { useNavigate } from "react-router-dom";
import { useTost } from "../utils/TostProvider";

function ShoppingCartList() {

    //리액트 라우터
    const navigate = useNavigate();
    //토스트
    const { showTost } = useTost();
    //장바구니
    const { cartItems, setCartItems } = useShoppingCart();


    //삭제버튼
    const clickDelete = (deleteId) => {
        if (cartItems.length <= 1) navigate(-1);
        setCartItems(prevItems => prevItems.filter(item => item.id !== deleteId));
        showTost("상품 제거 완료")
    }

    //수량 플러스
    const clickPlus = (plusId) => {
        setCartItems(prevItems => prevItems.map(
            item => {
                if (item.id !== plusId || item.quantity >= 999) {
                    return item;
                } else {
                    return { ...item, quantity: item.quantity + 1 };
                }
            }
        ))
    }

    //수량 마이너스
    const clickMinus = (minusId) => {
        setCartItems(prevItems => prevItems.map(
            item => {
                if (item.id !== minusId || item.quantity <= 1) {
                    return item;
                } else {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
        ))
    }


    return (
        //상품리스트 
        <div className='border border-success-subtle rounded-3'>

            {cartItems.map((item, index) => {
                return (
                    <div className='fs-6 fw-medium border-bottom'>
                        <div className='py-1'>
                            {/* 헤더 */}
                            <div className='d-flex align-items-center justify-content-between'>
                                {/* 상품명 */}
                                <span className='fs-5 fw-semibold text-success me-2 ps-3 pt-2'>{index + 1}. {item.name}</span>
                                {/* 닫기버튼 */}
                                <div className="px-3 pt-2" onClick={() => clickDelete(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </div>
                            </div>

                            {/* 계산 */}
                            <div className='d-flex justify-content-between align-items-end px-3 pb-2'>

                                {/* 수량버튼 */}
                                <div className="border border-success-subtle rounded-3 d-flex align-items-center ">
                                    {/* 빼기 */}
                                    <div className={`p-2 ${item.quantity <= 1 ? 'text-secondary' : ''}`} onClick={() => clickMinus(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                        </svg>
                                    </div>
                                    {/* 수량 */}
                                    <div className="px-2">
                                        <div className="text-center" style={{ width: "2ch" }}>
                                            {item.quantity}
                                        </div>
                                    </div>
                                    {/* 더하기 */}
                                    <div className={`p-2 ${item.quantity >= 999 ? 'text-secondary' : ''}`} onClick={() => clickPlus(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                        </svg>
                                    </div>
                                </div>


                                <div className='pt-2'>
                                    {/* 단가 */}
                                    <div className='text-secondary text-end'>단가 {item.price.toLocaleString('ko-KR')}원</div>
                                    {/* 합계 */}
                                    <div className='' style={{ fontSize: '1.15rem' }}>합계 <span className='fw-semibold'>{(item.price * item.quantity).toLocaleString('ko-KR')}</span>원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* 추가하기 버튼 */}
            <div className='p-2 text-center'>
                <span className="px-3 py-2 fs-5 text-secondary" onClick={() => navigate(-1)}>
                    + 추가하기
                </span>
            </div>

        </div>
    );
}

export default ShoppingCartList;