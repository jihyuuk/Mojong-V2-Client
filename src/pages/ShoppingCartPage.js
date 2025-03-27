import React, { useEffect, useRef, useState } from "react";
import { useTost } from "../utils/TostProvider";
import SubHeader from "../components/SubHeader";
import MotionPage from "../motions/MotionPage";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useShoppingCart } from "../utils/ShoppingCartProvider";

function ShoppingCartPage() {

    //리액트 라우터
    const navigate = useNavigate();

    //토스트
    const { showTost } = useTost();
    //장바구니
    const { cartItems, setCartItems, totalPrice, totalQuantity } = useShoppingCart();

    //결제 방식
    const [payment, setPayment] = useState();
    const paymentSectionRef = useRef(null);


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

    //주문버튼 클릭
    const orderClick = () => {
        //결제 방식 선택 안 했을때
        if(!payment){
            showTost("결제 방식을 선택해주세요.");

            paymentSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }
    }


    //장바구니가 비었는데 직접 /shoppingcart로 접근시에 리다이렉트
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate("/", { replace: true });
        }
    }, []);
    if (!cartItems || cartItems.length === 0) return null;

    return (
        <MotionPage> {/* 에니메이션 적용 */}
            <div className="d-flex flex-column h-100">
                {/* 헤더 */}
                <SubHeader title={"장바구니"} />

                {/* 메인 */}
                <main className='my-content overflow-y-auto flex-grow-1 bg-secondary-subtle'>

                    {/* 주문상품 */}
                    <div className="bg-white p-3 shadow-sm">

                        <div className="pb-3 fs-4 fw-semibold">주문 상품</div>

                        {/* 상품리스트 */}
                        <div className='border rounded-3'>
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
                                                    <span className={`p-2 ${item.quantity <= 1 ? 'text-secondary' : ''}`} onClick={() => clickMinus(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                                        </svg>
                                                    </span>
                                                    {/* 수량 */}
                                                    <input type="text" size={3} pattern="[0-9]*" inputMode="numeric"
                                                        className="text-center border-0"
                                                        value={item.quantity}
                                                    />
                                                    {/* 더하기 */}
                                                    <span className={`p-2 ${item.quantity >= 999 ? 'text-secondary' : ''}`} onClick={() => clickPlus(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                        </svg>
                                                    </span>
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

                    </div>


                    {/* 합계 */}
                    <div className="mt-3 bg-white shadow-sm p-3">
                        <div className="pb-3 fs-4 fw-semibold">합계</div>
                        <div className="border border-success rounded-3">
                            <div className=" d-flex justify-content-between p-3 fs-5 fw-medium">
                                <div>총 금액 :</div>
                                <div className="fw-semibold text-success">{totalPrice.toLocaleString("ko-KR")}원</div>
                            </div>
                        </div>
                    </div>


                    {/* 결제 방식 */}
                    <div className="bg-white mt-3 shadow-sm p-3" ref={paymentSectionRef}>
                        <div className="pb-3 fs-4 fw-semibold">결제 방식</div>

                        <div className="pb-2 text-center gap-2 d-flex fw-semibold">
                            <div className={payment == "cashier" ? "payment-on" : "payment-off"} onClick={()=>setPayment("cashier")}>
                                <img src={payment == "cashier" ? "/cashier_on.png" : "/cashier_off.png"} style={{ width: '100px', height: '100px' }} />
                                <div className="mt-3 fs-6">직원에게 결제</div>
                            </div>
                            <div className={payment == "self" ? "payment-on" : "payment-off"} onClick={()=>setPayment("self")}>
                                <img src={payment == "self" ? "/self_on.png" : "/self_off.png"} style={{ width: '100px', height: '100px', marginRight: '30px' }} />
                                <div className="mt-3 fs-6">셀프 결제</div>
                            </div>
                        </div>
                        
                        {!payment && <div className="text-danger ps-2">※ 결제 방식을 선택해주세요.</div>}

                        {/* 여백 */}
                        <div style={{ height: '4rem' }}></div>
                    </div>

                </main>


                {/* 푸터 */}
                <Footer
                    value={"주문하기"}
                    show={totalPrice > 0}
                    onClick={orderClick}
                >
                    <div className='pt-0 p-2 d-flex justify-content-between text-secondary'>
                        <div>품목 <span className='fw-semibold'>{cartItems.length}</span> · 수량 <span className='fw-semibold'>{totalQuantity}</span></div>
                        <div className='text-success'>총 합계 <span className='fw-semibold'>{totalPrice.toLocaleString('ko-KR')}</span>원</div>
                    </div>
                </Footer>

            </div>
        </MotionPage>
    )
}

export default ShoppingCartPage;