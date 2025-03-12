import React, { createContext, useState, useContext } from "react";

// 1. Context 생성
const TostContext = createContext();

// 2. Provider 컴포넌트 생성
export function TostProvider({ children }) {

    const [tostState, setTostState] = useState(false);
    const [tostMsg, setTostMsg] = useState("");

    const showTost = (msg) => {
        setTostMsg(msg); // 메시지 설정
        setTostState(true);
        setTimeout(() => {
            setTostState(false);
        }, 1500);
    };

    return (
        <TostContext.Provider value={{ showTost }}>
            {children}


            {/* 토스트 UI */}
            {tostState && (
                <div className="position-absolute top-50 start-50 translate-middle z-3 bg-secondary px-3 py-2 rounded-pill text-nowrap opacity-75">
                    <span className="fs-6 text-white fw-medium">
                        {tostMsg}
                    </span>
                </div>
            )}
        </TostContext.Provider>
    );
}

// 3. Custom Hook으로 쉽게 사용
export function useTost() {
    return useContext(TostContext);
}
