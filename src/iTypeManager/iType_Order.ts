type iOrder = {
  order_tokenid?: string;
  user_tokenid: string;
  /*   Product_TokenID: string;
  Product_Qantity: string;
  Product_Price: string; */
  order_status: string;
  order_datetime?: string;
  order_datetimemillisec?: string;
};

export default iOrder;
