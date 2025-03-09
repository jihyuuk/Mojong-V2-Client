import React from "react";
import { Button, ListGroup } from "react-bootstrap";

function ShoppingCartPage() {

    const item = [1];

    return (
        <div className="d-flex flex-column h-100">
            {/* 헤더 */}
            <header className='p-2 border-bottom border-success-subtle position-relative'>
                {/* 뒤로가기 버튼 */}
                <div className='p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </div>

                <div className='fw-semibold fs-3 position-absolute top-50 start-50 translate-middle'>
                    장바구니
                </div>
            </header>

            {/* 메인 */}
            <main className='my-content overflow-y-auto flex-grow-1 bg-secondary-subtle'>
                {item.map(() => {
                    return (
                        <ListGroup variant='flush' className='bg-white border'>

                            {/* 카테고리의 아이템들 출력 부분*/}

                            <ListGroup.Item className='fs-6 fw-medium py-2 px-3'>

                                <div className='py-1'>
                                    {/* 헤더 */}
                                    <div className='d-flex align-items-center justify-content-between'>
                                        {/* 상품명 */}
                                        <span className='fs-5 fw-semibold text-success me-2'>1. 칼탄파워</span>
                                        {/* 닫기버튼 */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" >
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>
                                    </div>

                                    {/* 계산 */}
                                    <div className='d-flex justify-content-between align-items-end'>

                                        {/* 수량버튼 */}
                                        <span className='border border-success-subtle rounded-3 p-2 ms-3'>
                                            {/* 빼기 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16" >
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                            </svg>
                                            {/* 수량 */}
                                            <span className='mx-3'>30</span>
                                            {/* 더하기 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus m-auto" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                        </span>

                                        <div className='pt-2'>
                                            {/* 단가 */}
                                            <div className='text-secondary text-end'>단가 300원</div>
                                            {/* 합계 */}
                                            <div className='' style={{ fontSize: '1.15rem' }}>합계 <span className='fw-semibold'>17,000</span>원</div>
                                        </div>
                                    </div>

                                </div>
                            </ListGroup.Item>

                        </ListGroup>

                    )
                })}


                <div className='py-2 fs-5 text-secondary text-center bg-white shadow-sm'>
                    + 추가하기
                </div>

                {/* 여백 */}
                <div className="h-50"></div>
            </main>


            {/* 푸터 */}
            <footer className='pb-3'>
                    <div className='w-100 p-2 pt-0' >
                        <div className='p-2 d-flex justify-content-between text-secondary'>
                            <div>품목 <span className='fw-semibold'>1</span> · 수량 <span className='fw-semibold'>30</span></div>
                            <div className='text-success'>총 합계 <span className='fw-semibold'>17,000</span>원</div>
                        </div>
                        <Button variant="success" className="fs-5 p-2 px-3 rounded-3 w-100 fw-semibold">
                            <div className=''>주문하기</div>
                        </Button>
                    </div>
            </footer>

        </div>
    )
}

export default ShoppingCartPage;