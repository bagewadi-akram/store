import { useNavigate } from "react-router-dom";
import "./Utils.css";

export const StaticsCard = ({ name, value, upDown, rupee, icons }) => {
  const { up, down, percentage } = icons;
  return (
    <div className="dashboard-card">
      <p> {name}</p>
      <span>
        <strong>
          {rupee}
          {value}
        </strong>
        <p>
          <strong>
            {upDown > 20 ? up : down}
            {upDown}
            {percentage}
          </strong>
          For This Week
        </p>
      </span>
    </div>
  );
};

export const RecentOrders = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="recent-orders">
      <div>
        {/* heading */}
        <h2>Recent Orders</h2>
      </div>
      {/* Content */}
      <table>
        <tr>
          <th>Order No</th>
          <th>Status</th>
          <th>Items</th>
          <th>Price</th>
          <th>Payment Status</th>
        </tr>
        {data.map((item) => (
          <tr
            key={item._id}
            onClick={() => navigate(`/admin/order/${item._id}`)}
          >
            <td>{item._id}</td>
            <td
              className={
                item.orderStatus === "Delivered"
                  ? "greenColor"
                  : item.orderStatus === "Shipped"
                  ? "orangeColor"
                  : "redColor"
              }
            >
              {item.orderStatus}
            </td>
            <td>{item.orderItems.length}</td>
            <td>{item.totalPrice}</td>
            <td
              className={
                item.paymentInfo.status === "paid" ? "greenColor" : "redColor"
              }
            >
              {item.paymentInfo.status}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const ListedProducts = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <div className="listed-products">
      <h2>Your Listed Products</h2>
      <div className="dashboard-products-container">
        {data.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/admin/product/${item._id}`)}
            className="dashboard-products-card"
          >
            <img src={item.image[0].url} />
            <div>
              <h4>{item.title} </h4>
              <p>
                Listing Date :<strong>{item.createdAt}</strong>
              </p>
              <span>
                <p>
                  Category:<strong>{item.category}</strong>
                </p>
                <p>
                  Stock: <strong>{item.stock}</strong>
                </p>
              </span>
              <span>
                <p>
                  Discount: <strong>{item.discount}</strong>
                </p>
                <p>
                  Price:<strong>{item.price}</strong>
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
