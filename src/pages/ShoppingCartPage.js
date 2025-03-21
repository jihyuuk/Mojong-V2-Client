import React from "react";
import { ListGroup } from "react-bootstrap";
import { useTost } from "../utils/TostProvider";
import SubHeader from "../components/SubHeader";
import MotionPage from "../motions/MotionPage";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function ShoppingCartPage({ cartItems, setCartItems, totalPrice, totalQuantity }) {

    //리액트 라우터
    const navigate = useNavigate();

    //토스트
    const { showTost } = useTost();

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
        <MotionPage> {/* 에니메이션 적용 */}
            <div className="d-flex flex-column h-100">
                {/* 헤더 */}
                <SubHeader title={"장바구니"} />

                {/* 메인 */}
                <main className='my-content overflow-y-auto flex-grow-1 bg-secondary-subtle'>
                    {cartItems.map((item, index) => {
                        return (
                            <ListGroup variant='flush' className='bg-white border'>

                                {/* 카테고리의 아이템들 출력 부분*/}

                                <ListGroup.Item className='fs-6 fw-medium py-2 px-3'>

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
                                </ListGroup.Item>

                            </ListGroup>

                        )
                    })}


                    <div className='py-2 fs-5 text-secondary text-center bg-white shadow-sm' onClick={() => navigate(-1)}>
                        + 추가하기
                    </div>

                    {/* 여백 */}
                    <div className="h-50"></div>
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