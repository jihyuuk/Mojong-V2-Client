import { Button, Form, ListGroup, Stack } from 'react-bootstrap';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import menu from "./dummyData.json";
import { throttle } from 'lodash';

function MainPage({ setSelectedItem, setShowShoppingCart, totalPrice }) {

    //현재 활성화된 카테고리
    const [activeCat, setActiveCat] = useState(0);
    //섹션 스크롤 여부
    const scrollingRef = useRef(false);

    //DOM 요소 캐싱
    const contentRef = useRef(null);
    const categoryRefs = useRef([]);
    const sectionRefs = useRef([]);
    const categoryCount = useMemo(() => menu.categories.length, []);// 카테고리 개수 캐싱 (불필요한 연산 방지)

    //카테고리 클릭시에
    const onCatClick = (idx) => {
        setActiveCat(idx); //활성화 카테고리 변경
        moveCategory(idx); //카테고리 중앙으로 이동

        scrollingRef.current = true; // 스크롤 이벤트 비활성화
        moveSection(idx); // 해당 섹션으로 자동 스크롤

        //스크롤이벤트 1초후 활성화(정석 방법x)
        setTimeout(() => {
            scrollingRef.current = false;
        }, 1000);
    }

    //카테고리 중앙으로 이동
    const moveCategory = (idx) => {
        categoryRefs.current[idx]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }


    //선택한 섹션으로 자동스크롤
    const moveSection = (idx) => {

        //해당 섹션을 콘텐츠 최상단으로 이동
        const container = contentRef.current;
        const element = sectionRefs.current[idx];

        if (!container || !element) return;

        // 해당 요소의 위치 계산 (container 기준으로)
        const elementPosition = element.getBoundingClientRect().top + container.scrollTop;
        const offsetPosition = elementPosition - container.offsetTop;

        // 부드러운 스크롤 효과 추가
        container.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    // 스크롤 핸들러
    const scrollHandler = useCallback(() => {
        if (scrollingRef.current) return;

        const containerTop = contentRef.current?.getBoundingClientRect().top || 0;
        const offset = containerTop + 50;

        for (let i = categoryCount - 1; i >= 0; i--) {
            const sectionTop = sectionRefs.current[i]?.getBoundingClientRect().top || 0;

            if (sectionTop <= offset) {
                //불필요한 상태 업데이트 방지
                if (activeCat !== i) {
                    setActiveCat(i);
                    moveCategory(i);
                }
                break;
            }
        }
    }, [categoryCount, activeCat]); // usecallback공부 필요


    // throttle 적용한 스크롤 핸들러 (200ms)
    const throttledHandleScroll = useCallback(throttle(scrollHandler, 200), [scrollHandler]);

    // 스크롤 이벤트 등록
    useEffect(() => {
        const container = contentRef.current;
        if (container) {
            container.addEventListener("scroll", throttledHandleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", throttledHandleScroll);
            }
        };
    }, [throttledHandleScroll]);

    return (
        // 메인페이지
        <div className="MainPage d-flex flex-column h-100 text-center">

            {/* 헤더 */}
            <div>

                {/* 검색창 */}
                <div className='px-2 pt-3'>
                    <Form.Control size="lg" id='searchBar' type="text" className='ps-4 pe-5 rounded-5 border-2 border-success-subtle' placeholder="🔍 검색하기" />
                </div>

                {/* 카테고리 탭 */}
                <Stack direction="horizontal" gap={3} className='overflow-x-auto text-nowrap p-2 border-bottom'>
                    {menu.categories.map((category, index) => {
                        return (
                            <div
                                id={`category${index}`}
                                key={category.name}
                                className={`myCategory ${index === activeCat ? 'active' : ''}`}
                                onClick={() => onCatClick(index)}
                                ref={(el) => (categoryRefs.current[index] = el)}
                            >
                                {category.categoryName}
                            </div>
                        );
                    })}
                </Stack>

            </div>

            {/* 콘텐츠 */}
            <div id='content' ref={contentRef} className='flex-grow-1 overflow-y-auto text-start bg-secondary-subtle'>

                {menu.categories.map((category, index) => {
                    return (
                        // 카테고리명
                        <ListGroup id={`section${index}`} key={category.categoryName} className='mb-4 bg-white rounded-0' ref={(el) => (sectionRefs.current[index] = el)}>
                            <div className='fs-3 fw-bold p-2 ps-3'>{category.categoryName}</div>

                            {/* 카테고리 아이템 */}
                            {category.items.map((item) => {
                                return (
                                    <ListGroup.Item className='d-flex gap-3' onClick={() => setSelectedItem(item)}>
                                        <img src={item.photo} style={{ maxWidth: '100px' }} className='rounded-4 my-auto' />

                                        <div>
                                            <div className="fw-bold fs-4">{item.name}</div>
                                            <div className='mt-1 text-secondary'>{item.description}</div>
                                            <div className='mt-2 fs-5 fw-semibold'>{item.price.toLocaleString('ko-KR')}원</div>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}

                        </ListGroup>
                    );
                })}

                <div style={{ height: "300px" }}>

                </div>

            </div>

            {/* 푸터 */}
            {totalPrice > 0 &&
                <div className="p-2 pb-3 border-top">
                    <Button variant="success" className="w-100 fs-5 fw-semibold p-2 rounded-4" onClick={() => setShowShoppingCart(true)}>
                        {totalPrice.toLocaleString('ko-KR')}원 <span className='fw-medium'>· 장바구니</span>
                    </Button>
                </div>
            }
        </div>
    );
}

export default MainPage;
