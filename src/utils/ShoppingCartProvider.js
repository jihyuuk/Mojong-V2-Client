import React, { createContext, useState, useContext, useEffect } from "react";

//1. Context 생성
const ShoppingCartContext = createContext();

//2. Provider 컴포넌트 생성
export function ShoppingCartProvider({ children }) {

    //장바구니에 담긴 아이템들
    const [cartItems, setCartItems] = useState(() => {
        //로컬스토리지에서 불러오기
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
      }); 

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    //총 수량, 품목수, 금액 계산 
    useEffect(() => {
        let calPrice = 0;
        let calQuantity = 0;

        cartItems.forEach((item) => {
            calPrice += item.quantity * item.price;
            calQuantity += item.quantity;
        });

        //값 업데이트
        setTotalPrice(calPrice);
        setTotalQuantity(calQuantity);

        //로컬 스토리지 저장
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <ShoppingCartContext.Provider value={{ cartItems, totalPrice, totalQuantity, setCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

//3. Custom Hook으로 사용
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}