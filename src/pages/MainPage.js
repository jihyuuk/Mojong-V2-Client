import { Button, ListGroup, Nav } from 'react-bootstrap';
import React from 'react';
import menu from "./dummyData.json";

function MainPage() {

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
                <Nav variant="underline" className="d-flex flex-nowrap text-nowrap" defaultActiveKey="link-0">
                    {menu.categories.map((category, index) => {
                        return(
                                <Nav.Item key={index}>
                                    <Nav.Link className='custom-nav-link' eventKey={`link-${index}`}>{category.categoryName}</Nav.Link>
                                </Nav.Item>
                        );
                    })}
                    </Nav>
                </div>
            </div>

            {/* 콘텐츠 */}
            <div className='flex-grow-1 overflow-y-auto text-start bg-secondary-subtle'>

                {menu.categories.map((category) => {
                    return (
                        // 카테고리명
                        <ListGroup className='mb-4 bg-white rounded-0'>
                            <div className='fs-3 fw-bold p-2 ps-3'>{category.categoryName}</div>

                            {/* 카테고리 아이템 */}
                            {category.items.map((item) => {
                                return (
                                    <ListGroup.Item className='d-flex gap-3'>
                                        <div className='p-4 border rounded-4'>
                                            사진
                                        </div>
                                        <div>
                                            <div className="fw-semibold fs-5">{item.name}</div>
                                            <div className='mt-1'>{item.description}</div>
                                            <div className='mt-1'>{item.price}원</div>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}

                        </ListGroup>
                    );
                })}

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
