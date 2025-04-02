import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import SearchList from "../components/SearchList";
import ItemList from "../components/ItemList";

function SearchPage({ menu }) {

    const navigate = useNavigate();

    //검색기능================================
    const [searchValue, setSearchValue] = useState(''); //검색어
    const [searchResults, setSearchResults] = useState([]);//검색결과
    const [showClearBtn, setShowClearBtn] = useState(false); //클리어버튼
    const inputRef = useRef(null);

    //초기화
    useEffect(() => {
        //자동포커스
        inputRef.current.focus();

        //터치 감지해서 input focus 해제
        const handleTouchStart = () => {
            inputRef.current?.blur();
        };

        document.addEventListener("touchstart", handleTouchStart);
        return () => document.removeEventListener("touchstart", handleTouchStart);
    }, []);

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
            menu.flatMap(category =>
                category.items.filter(item => item.name.includes(searchValue.trim()))
            ));

    }, [searchValue])


    //x 버튼 클릭시
    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    }


    return (
        <div className="z-1 position-absolute top-0 start-0 w-100 h-100 bg-white">
            <div className="d-flex flex-column h-100 w-100">

                {/* 헤더 */}
                <header className='border-bottom'>

                    <div className='d-flex align-items-center pt-3 pb-1 '>

                        {/* 뒤로가기 왼쪽 < 아이콘 */}
                        <div className='p-2' onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg>
                        </div>

                        {/* 검색창 */}
                        <div className='pe-2 flex-grow-1'>
                            <div className='position-relative'>
                                <Form.Control size="lg" id='searchBar' type="text"
                                    ref={inputRef}
                                    className='ps-4 pe-5 rounded-5 border-2 border-success-subtle'
                                    placeholder="🔍 검색하기"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            inputRef.current.blur();
                                        }
                                    }
                                    }
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

                    </div>

                    {/* 검색 수량 // 취소버튼 */}
                    <div className='text-secondary fw-mefium d-flex justify-content-between bg-white border-bottom'>
                        <div className='p-2 ps-3'>
                            검색 결과 : {searchResults.length}개
                        </div>
                        <div className='p-2 pe-3' onClick={() => navigate(-1)}>닫기</div>
                    </div>
                </header>

                {/* 검색결과 */}
                <div className='flex-grow-1 overflow-y-auto bg-body-secondary'>

                    {/* 검색결과 리스트*/}
                    <div className='bg-white shadow-sm'>
                        {searchResults.map(item => <ItemList item={item} replace={true} />)}
                        {/* {searchResults.map((item) => <SearchList item={item} replace={true} />)} */}
                    </div>

                    {/* 여백 */}
                    <div style={{ height: '150px' }} />
                </div>

            </div>
        </div>
    );
}

export default SearchPage;