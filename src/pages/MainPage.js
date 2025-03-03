import { Button, Nav } from 'react-bootstrap';
import React from 'react';

function MainPage() {
    return (
        // 메인페이지
        <div className="MainPage d-flex flex-column h-100 text-center">

            {/* 헤더 */}
            <div>

                {/* 로고 */}
                <div className='pt-1'>
                    <img src="/로고2.png" alt="그린아그로 로고"  style={{maxWidth:"100px"}}/>
                </div>

                {/* 카테고리 */}
                <div className='overflow-auto p-2'>
                    <Nav variant="underline" className="d-flex flex-nowrap text-nowrap" defaultActiveKey="link-1">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <Nav.Item key={num}>
                                <Nav.Link className='custom-nav-link' eventKey={`link-${num}`}>Option {num}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
            </div>

            {/* 콘텐츠 */}
            <div className='MainContent border border-black flex-grow-1 overflow-y-auto'>
                <div className='p-2'>Main content Start</div>
                <div className='border border-success p-3 mb-3'>item 1</div>
                <div className='border border-success p-3 mb-3'>item 2</div>
                <div className='border border-success p-3 mb-3'>item 3</div>
                <div className='border border-success p-3 mb-3'>item 4</div>
                <div className='border border-success p-3 mb-3'>item 5</div>
                <div className='border border-success p-3 mb-3'>item 6</div>
                <div className='border border-success p-3 mb-3'>item 7</div>
                <div className='border border-success p-3 mb-3'>item 8</div>
                <div className='border border-success p-3 mb-3'>item 9</div>
                <div className='border border-success p-3'>item 10</div>
                <div className='p-2'>Main content End</div>
            </div>

            {/* 푸터 */}
            <div className="p-2 pb-3 border-top">
                <Button variant="success" className="w-100 fs-5 fw-semibold p-2 rounded-4">
                    15,000원 <span className='fw-medium'>· 장바구니</span>
                </Button>
            </div>
        </div>
    );
}

export default MainPage;
