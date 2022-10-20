// import { getUserDetailsConstants } from "./constants";
// import axios from "axios";

// export const getUserDetails = (email) => {
//   return async (dispatch) => {
//     const res = await axios.get(
//       `http://localhost:8085/getUserDetails/${email}`
//     );

//     if (res.status === 200) {
//       dispatch({
//         type: getUserDetailsConstants.GET_USER_DETAILS_SUCCESS,
//         payload: res.data,
//       });
//     }
//   };
// };
