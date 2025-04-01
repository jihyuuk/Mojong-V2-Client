import React, { createContext, useState, useContext, useEffect } from "react";

//1. Context 생성
const ShoppingCartContext = createContext();

//2. Provider 컴포넌트 생성
export function ShoppingCartProvider({ children, menu }) {

    //장바구니에 담긴 아이템들
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    //로컬스토리지에서 불러오기
    const getLocal = () => {
        //불러오기
        let savedCart = localStorage.getItem("cartItems");
        //없으면 return
        if (!savedCart) return;

        //있으면 검증
        //menu 돌면서 품절이거나 없는 상품인지 확인
        savedCart = JSON.parse(savedCart);
        const updatedCart = savedCart.filter((item) => {
            // 품절된 항목을 제외하고, 메뉴에 존재하는 항목만 필터링
            const menuItem = menu.flatMap(category => category.items).find(menuItem => menuItem.id === item.id);
            return menuItem && menuItem.stock > 0;  // 품절이 아니면
        });

        //적용하기
        setCartItems(updatedCart);
    }

    useEffect(() => {
        getLocal();
    }, [menu]);


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