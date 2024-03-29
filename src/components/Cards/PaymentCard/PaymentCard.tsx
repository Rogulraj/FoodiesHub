import React, { useMemo } from "react";

import defaultStyle from "./PaymentCard.module.css";
import { CartListItems } from "../../../redux/features/cart.slice";

interface PaymentCardProps {
  cartList: CartListItems[];
}

const PaymentCard = ({ cartList }: PaymentCardProps): React.ReactElement => {
  const subTotal = useMemo(() => {
    const result = cartList.reduce(
      (accum, curr) => accum + curr.price * curr.quantity,
      0
    );
    return result;
  }, [cartList]);

  console.log("subTotal", subTotal);
  return (
    <div className={defaultStyle.main_layout}>
      <h1 className={defaultStyle.title}>Payment summary</h1>
      <div className={defaultStyle.summary_card}>
        <div className={defaultStyle.justify_content}>
          <p className={defaultStyle.light_title}>Subtotal</p>
          <p className={defaultStyle.light_price}>${subTotal.toFixed(2)}</p>
        </div>
        <div className={defaultStyle.justify_content}>
          <p className={defaultStyle.light_title}>Shipping</p>
          <p className={defaultStyle.light_price}>$20</p>
        </div>
        <div className={defaultStyle.justify_content}>
          <p className={defaultStyle.highlight_title}>Total (tax incl.)</p>
          <p className={defaultStyle.highlight_price}>
            ${(subTotal + 20).toFixed(2)}
          </p>
        </div>
        <button className={defaultStyle.btn} type="button">
          Order
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
