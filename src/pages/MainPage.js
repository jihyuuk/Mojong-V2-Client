import { Button, Form, ListGroup, Placeholder, Spinner, Stack } from 'react-bootstrap';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import menu from "./dummyData.json";
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';
import ItemList from '../components/ItemList';
import SearchList from '../components/SearchList';

function MainPage({ totalPrice }) {

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
        const offset = containerTop + 30;

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


    //검색기능================================
    const [searchValue, setSearchValue] = useState(''); //검색어
    const [searchResults, setSearchResults] = useState([]);//검색결과
    const [showSearchField, setShowSearchField] = useState(false);//검색결과 피드
    const [showClearBtn, setShowClearBtn] = useState(false); //클리어버튼
    const inputRef = useRef(null);

    //검색창 변화시
    useEffect(() => {
        //1.검색어가 있을때만 클리어 버튼 보여주기
        //2.아이템 찾기

        if (searchValue.trim() === '') {
            setSearchResults([]);
            setShowClearBtn(false);
            return;
        }

        setShowClearBtn(true);
        setSearchResults(
            menu.categories.flatMap(category =>
                category.items.filter(item => item.name.includes(searchValue.trim()))
            ));

        searchResults.map(item => console.log(item.name))

    }, [searchValue])

    //검색 취소버튼
    const cancleSearch = () => {
        setSearchValue('');
        setShowSearchField(false);
    }

    //x 버튼 클릭시
    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    }

    return (
        // 메인페이지
        <div className="MainPage d-flex flex-column h-100">

            {/* 헤더 */}
            <header>

                {/* 검색창 */}
                <div className='px-2 pt-3 pb-1'>
                    <div className='position-relative'>
                        <Form.Control size="lg" id='searchBar' type="text"
                            ref={inputRef}
                            className='ps-4 pe-5 rounded-5 border-2 border-success-subtle'
                            placeholder="🔍 검색하기"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onClick={() => setShowSearchField(true)}
                        />

                        {/* 클리어버튼 */}
                        {showClearBtn &&
                            <div className='position-absolute top-50 end-0 translate-middle-y me-3' onClick={handleClear}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x my-auto h-100" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>
                        }
                    </div>
                </div>

                {/* 검색결과 */}
                {showSearchField &&
                    <div className='position-absolute w-100 h-100 z-1'>

                        {/* 검색 수량 // 취소버튼 */}
                        <div className='text-secondary py-1 fw-mefium d-flex justify-content-between bg-white'>
                            <div className='p-2 ps-3'>
                                검색 결과 : {searchResults.length}개</div>
                            <div className='p-2 pe-3' onClick={cancleSearch}>닫기</div>
                        </div>

                        <div className='position-absolute d-flex flex-column h-100 w-100 overflow-y-auto' onScroll={() => inputRef.current?.blur()}>
                            {/* 검색결과 리스트*/}
                            <div className='bg-white shadow-sm'>
                                {/* {searchResults.map(item => <ItemList item={item}/>)} */}
                                {searchResults.map((item) => <SearchList item={item} />)}
                            </div>

                            {/* 남는 부분 배경채우기 */}
                            <div className='bg-secondary bg-opacity-50 flex-grow-1' style={{ minHeight: '300px' }} onClick={cancleSearch}></div>

                        </div>
                    </div>
                }


                {/* 카테고리 탭 */}
                <Stack direction="horizontal" gap={3} className='overflow-x-auto text-nowrap px-2 pt-0 pb-1 border-bottom'>
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

            </header>

            {/* 콘텐츠 */}
            <main id='content' ref={contentRef} className='flex-grow-1 overflow-y-auto bg-secondary-subtle'>

                {menu.categories.map((category, index) => {
                    return (
                        <div id={`section${index}`} key={category.categoryName} className='mb-4 bg-white shadow-sm' ref={(el) => (sectionRefs.current[index] = el)}>

                            {/* 카테고리 명 */}
                            <div className='fs-2 fw-bold p-3 pb-0'>{category.categoryName}</div>

                            {/* 해당 아이템들 */}
                            {category.items.map((item) => <ItemList item={item} />)}

                        </div>
                    );
                })}

                <div style={{ height: "300px" }}>
                </div>
            </main>

            {/* 푸터 */}
            {totalPrice > 0 &&
                <footer className="p-2 pb-3 border-top">
                    <Link to="/shoppingCart">
                        <Button variant="success" className="w-100 fs-5 fw-semibold p-2 rounded-4">
                            {totalPrice.toLocaleString('ko-KR')}원 <span className='fw-medium'>· 장바구니</span>
                        </Button>
                    </Link>
                </footer>
            }
        </div>
    );
}

export default MainPage;
