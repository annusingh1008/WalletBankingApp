import axios from "axios";
import { rechargeConstants } from "./constants";

export const recharge = (rechargeDetails) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8085/recharge", {
      ...rechargeDetails,
    });

    if (res.status === 200) {
      if (res.data === "Amount Credited Successfully...!!") {
        alert("Recharged Successful");

        dispatch({
          type: rechargeConstants.RECHARGE_SUCCESS,
          payload: {
            email: rechargeDetails.email,
            amount:
              parseInt(rechargeDetails.amount) +
              parseInt(rechargeDetails.currentAmount),
          },
        });
      }
    }
  };
};
