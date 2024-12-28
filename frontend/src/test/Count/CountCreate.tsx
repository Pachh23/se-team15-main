import { useState, useEffect } from "react";
import { PackageSearch, Warehouse, ClipboardList, MessageSquare, X, Save } from "lucide-react";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Card,
  message,
  InputNumber,
  Select,
  Typography,
} from "antd";
import {
  DatabaseOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  GetProduct,
  GetWarehouses,
  CreateInventoryCounts,
} from "../../services/https";
import { InventoryCountsInterface,ProductInterface,WarehousesInterface} from "../../interfaces/InterfaceFull";

const { Title } = Typography;
const { TextArea } = Input;

function InventoryCountCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [warehouses, setWarehouses] = useState<WarehousesInterface[]>([]);

  // Fetch Initial Data
  const getProducts = async () => {
    let res = await GetProduct();
    if (res.status === 200) {
      setProducts(res.data);
    } else {
      messageApi.error("Products not found");
    }
  };

  const getWarehouses = async () => {
    let res = await GetWarehouses();
    if (res.status === 200) {
      setWarehouses(res.data);
    } else {
      messageApi.error("Warehouses not found");
    }
  };

  const onFinish = async (values: InventoryCountsInterface) => {
    let res = await CreateInventoryCounts(values);
    if (res.status === 201) {
      messageApi.success(res.data.message);
      setTimeout(() => {
        navigate("/count");
      }, 2000);
    } else {
      messageApi.error(res.data.error);
    }
  };

  useEffect(() => {
    getProducts();
    getWarehouses();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card className="max-w-2xl mx-auto mt-2">
        <div className="text-center mb-5">
          <ClipboardList className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <Typography.Title level={3} className="text-blue-500 mb-2">
            Create Inventory Count
          </Typography.Title>
          <Typography.Text className="text-gray-500">
            Record new inventory count details
          </Typography.Text>
        </div>

        <Form
          name="inventoryCount"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
          autoComplete="off"
        >
          {/* Product Selection */}
          <Form.Item
            name="ProductID"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <PackageSearch className="w-4 h-4 text-blue-500" />
                Product
              </div>
            }
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select
              placeholder="Select product"
              style={{ width: "100%" }}
              >
                  {products.map((item) => (
                    <Select.Option value={item?.ID} key={item?.ID}>
                      {item?.ProductName}
                    </Select.Option>
                  ))}
                </Select>
          </Form.Item>

          {/* Warehouse Selection */}
          <Form.Item
            name="WarehouseID"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Warehouse className="w-4 h-4 text-blue-500" />
                Warehouse
              </div>
            }
            rules={[{ required: true, message: "Please select a warehouse!" }]}
          >
            <Select
              placeholder="Select warehouse"
              style={{ width: "100%" }}
              >
              {warehouses.map((item) => (
                <Select.Option value={item?.ID} key={item?.ID}>
                  {item?.warehouse_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Counted Quantity */}
          <Form.Item
            name="counted_quantity"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ClipboardList className="w-4 h-4 text-blue-500" />
                Counted Quantity
              </div>
            }
            rules={[{ required: true, message: "Please enter the counted quantity!" }]}
          >
            <InputNumber
              min={0}
              placeholder="Enter quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Remarks */}
          <Form.Item
            name="remark"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare className="w-4 h-4 text-blue-500" /> 
                Remarks
              </div>
            }
          >
            <TextArea
              rows={4}
              placeholder="Enter remarks (if any)"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          {/* Buttons */}
          <Row gutter={16} style={{ marginTop: "24px" }}>
            <Col span={12}>
              <Link to="/count">
                <Button
                  block
                  icon={<CloseOutlined />}
                  style={{
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                style={{
                  borderRadius: "8px",
                  height: "40px",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                Save 
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default InventoryCountCreate;