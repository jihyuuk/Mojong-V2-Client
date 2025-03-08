import React from 'react';
import { Button } from 'react-bootstrap';

function DetailPage({item}) {

    return (
        <div className='d-flex flex-column h-100'>

            {/* 헤더 */}
            <header className='p-2 border-bottom border-success-subtle position-relative'>
                {/* 뒤로가기 버튼 */}
                <div className='p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </div>

                <div className='fw-semibold fs-3 position-absolute top-50 start-50 translate-middle'>
                    상품 상세
                </div>
            </header>


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
                        {item.price}원
                    </div>
                </div>

                <div className='mt-3 fw-semibold fs-5 d-flex justify-content-between align-items-center flex-wrap'>
                    <div>
                        수량
                    </div>
                    {/* 수량 입력칸 */}
                    <div className="border rounded-3 d-flex align-items-center">
                        <span className="px-3 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                            </svg>
                        </span>

                        <input type="text" size={3} className="text-center border-0" pattern="[0-9]*" inputmode="numeric" value={300} />

                        <span className="px-3 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                        </span>
                    </div>
                </div>
            </main>

            {/* 푸터 */}
            <footer className='pb-3'>
                <div className='p-2 border-top'>
                    <Button variant='success' className='w-100 fw-semibold fs-4 py-2'>23,000원 담기</Button>
                </div>
            </footer>
        </div >
    );
}

export default DetailPage;