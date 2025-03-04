import { Button, ListGroup, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import menu from "./dummyData.json";

function MainPage() {

    //현재 활성화된 카테고리
    const [activeCat, setActiveCat] = useState(0);

    //카테고리 클릭시에
    const onCatClick = (idx) => {
        //활성화 카테고리 변경
        setActiveCat(idx);

        //카테고리 중앙으로 이동
        document.getElementById('category' + idx).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });

        //해당 섹션을 콘텐츠 최상단으로 이동
        const container = document.getElementById('content'); // 스크롤을 제어할 컨테이너
        const element = document.getElementById('section' + idx); // 이동할 목표 요소
        const offset = container.offsetTop; // 원하는 offset 값
        
        // 해당 요소의 위치 계산 (container 기준으로)
        const elementPosition = element.getBoundingClientRect().top + container.scrollTop;
        const offsetPosition = elementPosition - offset;
        
        // 부드러운 스크롤 효과 추가
        container.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
    }



    return (
        // 메인페이지
        <div className="MainPage d-flex flex-column h-100 text-center">

            {/* 헤더 */}
            <div>

                {/* 로고 */}
                <div className='pt-1'>
                    <img src="/로고2.png" alt="그린아그로 로고" style={{ maxWidth: "100px" }} />
                </div>

                {/* 카테고리 탭 */}
                <Stack direction="horizontal" gap={3} className='overflow-x-auto text-nowrap p-2'>
                    {menu.categories.map((category, index) => {
                        return (
                            <div id={`category${index}`} key={category.name} className={`myCategory ${index === activeCat ? 'active' : ''}`} onClick={() => onCatClick(index)}>{category.categoryName}</div>
                        );
                    })}
                </Stack>

            </div>

            {/* 콘텐츠 */}
            <div id='content' className='flex-grow-1 overflow-y-auto text-start bg-secondary-subtle'>

                {menu.categories.map((category, index) => {
                    return (
                        // 카테고리명
                        <ListGroup id={`section${index}`} key={category.categoryName} className='mb-4 bg-white rounded-0'>
                            <div className='fs-3 fw-bold p-2 ps-3'>{category.categoryName}</div>

                            {/* 카테고리 아이템 */}
                            {category.items.map((item) => {
                                return (
                                    <ListGroup.Item className='d-flex gap-3'>
                                        <div className='p-4 border rounded-4 text-nowrap'>
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
