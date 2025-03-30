import React, { useEffect, useRef } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk"
import { useShoppingCart } from "../utils/ShoppingCartProvider";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SelfOrderPage() {

    //장바구니
    const { cartItems, totalPrice } = useShoppingCart();

    const navigate = useNavigate();
    const paymentWidgetRef = useRef(null);


    useEffect(() => {
        const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
        const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
            paymentWidget.renderPaymentMethods("#payment-widget", totalPrice);
            paymentWidgetRef.current = paymentWidget;
        })()

    }, [])

    //토스페이먼츠 결제
    const order_toss = () => {
        const paymentWidget = paymentWidgetRef.current

        let ordername = cartItems[0].name;

        if (cartItems.length > 1) {
            ordername += ` 외 ${cartItems.length - 1}개`;
        }

        paymentWidget?.requestPayment({
            orderId: "pPmFQfEF4kQUxayO2d1DP",
            orderName: ordername,
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
        })
        .then(() => {
            // 성공적인 결제 처리
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="z-1 position-absolute top-0 start-0 w-100 h-100 bg-white">
            <div className='d-flex flex-column h-100'>

                {/* 결제 위젯 */}
                <div id="payment-widget" className="overflow-y-auto flex-grow-1 mt-5" />

                {/* 버튼 */}
                <div className="p-2 pb-3 border-top d-flex gap-2">
                    <Button variant="secondary" className="fs-5 fw-semibold p-2 px-3 rounded-3" onClick={() => navigate(-1)}>뒤로가기</Button>
                    <Button variant="success" className="fs-5 fw-semibold p-2 rounded-3 flex-grow-1" onClick={order_toss}>결제하기</Button>
                </div>
            </div>
        </div>
    );
}

export default SelfOrderPage;