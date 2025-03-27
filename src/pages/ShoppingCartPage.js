import React, { useEffect } from "react";
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
                                    <div className='fs-6 fw-medium py-2 px-3 border-bottom'>
                                        <div className='py-1'>
                                            {/* 헤더 */}
                                            <div className='d-flex align-items-center justify-content-between'>
                                                {/* 상품명 */}
                                                <span className='fs-5 fw-semibold text-success me-2'>{index + 1}. {item.name}</span>
                                                {/* 닫기버튼 */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => clickDelete(item.id)} >
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                </svg>
                                            </div>

                                            {/* 계산 */}
                                            <div className='d-flex justify-content-between align-items-end'>

                                                {/* 수량버튼 */}
                                                <span className='border border-success-subtle rounded-3 p-2 ms-3'>
                                                    {/* 빼기 */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-dash ${item.quantity <= 1 ? 'text-secondary' : ''}`} viewBox="0 0 16 16" onClick={() => clickMinus(item.id)} >
                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                    </svg>
                                                    {/* 수량 */}
                                                    <span className='mx-3'>{item.quantity}</span>
                                                    {/* 더하기 */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-plus ${item.quantity >= 999 ? 'text-secondary' : ''}`} viewBox="0 0 16 16" onClick={() => clickPlus(item.id)}>
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                    </svg>
                                                </span>

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
                            <div className='py-2 fs-5 text-secondary text-center' onClick={() => navigate(-1)}>
                                + 추가하기
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
                    <div className="bg-white mt-3 shadow-sm p-3">
                        <div className="pb-3 fs-4 fw-semibold">결제 방식</div>

                        <div className="pb-2 text-center gap-2 d-flex fw-semibold">
                            <div className="border border-2  border-success rounded-4 py-3 w-50" style={{ backgroundColor: "#f3fffa" }}>
                                <img src="/cashier_on.png" style={{ width: '100px', height: '100px' }} />
                                <div className="mt-3 fs-6 text-success">직원에게 결제</div>
                            </div>
                            <div className="border border-2 rounded-4 py-3  w-50">
                                <img src="/self_off.png" style={{ width: '100px', height: '100px', marginRight: '30px' }} />
                                <div className="mt-3 fs-6 text-secondary">셀프 결제</div>
                            </div>
                        </div>

                        <div className="text-danger ps-2">※ 결제 방식을 선택해주세요.</div>

                        {/* 여백 */}
                        <div style={{ height: '4rem' }}></div>
                    </div>

                </main>


                {/* 푸터 */}
                <Footer
                    value={"주문하기"}
                    show={totalPrice > 0}
                    onClick={() => { }}
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