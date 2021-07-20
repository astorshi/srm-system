import {
  ORDER_ONE,
  ORDER_DELETE,
  ORDER_COMMENT,
  COMMENT_DELETE,
} from "../types";

export const oneOrder = (res) => ({
  type: ORDER_ONE,
  payload: res,
});

export const getOneOrder = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/orders/${id}`);
    const result = await response.json();
    console.log("RES=>", result);
    dispatch(oneOrder(result));
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = () => ({
  type: ORDER_DELETE,
  payload: null,
});

export const deleteCurrentOrder = (id, history) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch(deleteOrder());
      history.push("/orders");
    }
  } catch (error) {
    console.log(error);
  }
};

export const commentOrder = (data) => ({
  type: ORDER_COMMENT,
  payload: data,
});

// export const addComment = () => {
//   type: ORDER_DELETE,
//   payload: null,
// }

// export const addCommentToOrder = (id, comment) => async (dispatch) => {
//   try {
//     const response = await fetch(`http://localhost:3001/orders/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ comment }),
//     });

//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteComment = (data) => ({
  type: COMMENT_DELETE,
  payload: data,
});

export const deleteCurrentComment = (commentId, id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:3001/orders/${id}/comments`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      }
    );
    const data = await response.json();
    dispatch(deleteComment(data));
  } catch (error) {
    console.log(error);
  }
};