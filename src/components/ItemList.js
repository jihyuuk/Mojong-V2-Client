import React from "react";
import { Link } from "react-router-dom";

function ItemList({ item }) {

    return (
        <Link to={`/detail/${item.id}`}>
            <div className='d-flex gap-3 align-items-center p-3 border-bottom'>

                {/* 텍스트 */}
                <div className='flex-grow-1'>
                    <div className="fs-5 fw-semibold">{item.name}</div>
                    <div className='mt-1 text-secondary'>{item.description}</div>
                    <div className='mt-2 fs-6 fw-semibold'>{item.price.toLocaleString('ko-KR')}원</div>
                </div>

                {/* 사진 */}
                {item.photo &&
                    <div style={{ height: '100px', width: '100px' }} className='border rounded-4'>
                        <img src={item.photo} className='rounded-3 my-auto' style={{ width: '100px' }} />
                    </div>
                }
            </div>
        </Link>
    );
}

export default ItemList;