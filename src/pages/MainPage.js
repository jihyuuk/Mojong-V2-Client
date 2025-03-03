import React from 'react';

function MainPage() {
  return (
    // 메인페이지
    <div className="MainPage d-flex flex-column h-100 text-center">
        {/* 헤더 */}
        <div className='MainHeader border border-danger p-4'>MainHeader</div>
        
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
        <div className='MainFooterr border border-primary p-2'>MainFooterr</div>
    </div>
  );
}

export default MainPage;
