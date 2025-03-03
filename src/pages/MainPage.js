import { Button, ListGroup, Nav } from 'react-bootstrap';
import React from 'react';

function MainPage() {

    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); // 1~10까지 생성

    return (
        // 메인페이지
        <div className="MainPage d-flex flex-column h-100 text-center">

            {/* 헤더 */}
            <div>

                {/* 로고 */}
                <div className='pt-1'>
                    <img src="/로고2.png" alt="그린아그로 로고" style={{ maxWidth: "100px" }} />
                </div>

                {/* 카테고리 */}
                <div className='overflow-auto p-2'>
                    <Nav variant="underline" className="d-flex flex-nowrap text-nowrap" defaultActiveKey="link-1">
                        {numbers.map((num) => (
                            <Nav.Item key={num}>
                                <Nav.Link className='custom-nav-link' eventKey={`link-${num}`}>Option {num}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
            </div>

            {/* 콘텐츠 */}
            <div className='flex-grow-1 overflow-y-auto text-start bg-secondary-subtle'>
                {numbers.map((num) => (

                    <ListGroup className='mb-4 bg-white rounded-0'>
                        <div className='fs-3 fw-bold p-2 ps-3'>카테고리 {num}</div>


                        {numbers.map((num2) => (

                            <ListGroup.Item className='d-flex gap-3'>
                                <div className='p-4 border rounded-4'>
                                    사진
                                </div>
                                <div>
                                    <div className="fw-semibold fs-5">리스트 아이템 {num2}</div>
                                    <div className='mt-1'>5,000원</div>
                                </div>
                            </ListGroup.Item>

                        ))}
                    </ListGroup>

                ))}
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
