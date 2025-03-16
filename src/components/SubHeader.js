import React from "react";
import { useNavigate } from "react-router-dom";

function SubHeader({ title }) {

    const navigate = useNavigate();

    return (
        <header className='p-2 border-bottom border-success-subtle position-relative'>

            {/* 뒤로가기 버튼 */}
            <div className='p-1' onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </div>

            <div className='fw-semibold fs-3 position-absolute top-50 start-50 translate-middle'>
                {title}
            </div>

        </header>
    )
}

export default SubHeader;