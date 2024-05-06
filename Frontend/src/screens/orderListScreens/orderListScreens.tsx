import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { Table, Button } from "antd";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useGetOrdersQuery } from "../../slices/orderApiSlices";
import { Link } from "react-router-dom";

const { Column } = Table;

const OrderListScreens = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const handleDetailsClick = (orderId: any) => {
    console.log("Detaylar düyməsinə klik edildi, Sifariş ID:", orderId);
  };

  return (
    <>
      <h1>Sifarişlər</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message message={"Xəta"} type="error" />
      ) : (
        <Table dataSource={orders}>
          <Column title="ID" dataIndex="_id" key="_id" />
          <Column title="İstifadəçi" dataIndex={["user", "name"]} key="user" />
          <Column
            title="Tarix"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt) => createdAt.substring(0, 10)}
          />
          <Column title="Toplam" dataIndex="totalPrice" key="totalPrice" />
          <Column
            title="Ödənilib?"
            dataIndex="isPaid"
            key="isPaid"
            render={(isPaid, record) =>
              isPaid ? record.paidAt.substring(0, 10) : <FaTimes style={{ color: "red" }} />
            }
          />
          <Column
            title="Çatdırıldı?"
            dataIndex="isDelivered"
            key="isDelivered"
            render={(isDelivered, record) =>
              isDelivered ? record.deliveredAt.substring(0, 10) : <FaTimes style={{ color: "red" }} />
            }
          />
          <Column
            title="Əməliyyatlar"
            key="actions"
            render={(text, record) => (
              <Link to={`/sifaris/${record._id}`}>
                <Button type="primary" onClick={() => handleDetailsClick(record._id)}>
                  <FaInfoCircle /> Ətraflı
                </Button>
              </Link>
            )}
          />
        </Table>
      )}
    </>
  );
};

export default OrderListScreens;
