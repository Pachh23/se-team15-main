import { useState, useEffect } from "react";
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
} from "antd";
import {
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  WarehousesInterface,
  WarehouseStatusesInterface,
  WarehouseTypesInterface,
  ProvinceInterface,
} from "../../interfaces/InterfaceFull";
import { Link, useNavigate } from "react-router-dom";
import {
  GetWarehouseTypes,
  GetWarehouseStatuses,
  GetProvince,
  CreateWarehouse,
} from "../../services/https";
import { Activity, Building2, Database, MapPin, TagIcon, Warehouse, Map, Mail, } from "lucide-react";


function PageWarehouseCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusesInterface[]>([]);
  const [warehouseType, setWarehouseType] = useState<WarehouseTypesInterface[]>([]);
  const [province, setGetProvince] = useState<ProvinceInterface[]>([]);

  // Fetch Initial Data
  const fetchInitialData = async () => {
    try {
      const [statusRes, typeRes, provinceRes] = await Promise.all([
        GetWarehouseStatuses(),
        GetWarehouseTypes(),
        GetProvince(),
      ]);

      if (statusRes.status === 200) setWarehouseStatus(statusRes.data);
      if (typeRes.status === 200) setWarehouseType(typeRes.data);
      if (provinceRes.status === 200) setGetProvince(provinceRes.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error fetching initial data",
      });
      setTimeout(() => navigate("/warehouse"), 2000);
    }
  };

  const onFinish = async (values: WarehousesInterface) => {
    let res = await CreateWarehouse(values);

    if (res.status == 201) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(function () {
        navigate("/warehouse");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  // Initial Data Fetching
  useEffect(() => {
    fetchInitialData();
    return () => {};
  }, []);

  return (
    <div>
      {contextHolder}
      <Card
        hoverable
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          marginTop: "10px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          background: "linear-gradient(to right, #f5f7fa 0%, #f5f7fa 100%)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <Warehouse className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Warehouse</h2>
            <p className="text-gray-500 mt-1">Enter warehouse details below</p>
          </div>

        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
          autoComplete="off"
        >
          {/* Warehouse Name */}
          <Form.Item
            name="warehouse_name"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Building2 className="w-4 h-4 text-blue-500" />
                Warehouse Name
              </div>
            }
            rules={[{ required: true, message: "Please input the warehouse name!" }]}
          >
            <Input
              placeholder="Enter warehouse name"
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            />
          </Form.Item>

          {/* Type and Status Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="warehouse_type_id"
                label={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <TagIcon className="w-4 h-4 text-blue-500" />
                    Warehouse Type
                  </div>
                }
                rules={[{ required: true, message: "Please select warehouse type!" }]}
              >
                <Select
                  placeholder="Select Type"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  {warehouseType.map((item) => (
                    <Select.Option value={item?.ID} key={item?.ID}>
                      {item?.warehouse_type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="warehouse_status_id"
                label={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Activity className="w-4 h-4 text-blue-500" />
                    Warehouse Status
                  </div>
                }
                rules={[{ required: true, message: "Please select warehouse status!" }]}
              >
                <Select
                  placeholder="Select Status"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  {warehouseStatus.map((item) => (
                    <Select.Option value={item?.ID} key={item?.ID}>
                      {item?.warehouse_status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Capacity */}
          <Form.Item
            name="capacity"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Database className="w-4 h-4 text-blue-500" />
                Warehouse Capacity
              </div>
            }
            rules={[{ required: true, message: "Please input the warehouse capacity!" }]}
          >
            <InputNumber
              min={0}
              defaultValue={0}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            name="address"
            label={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin className="w-4 h-4 text-blue-500" />
                Address
              </div>
            }
            rules={[{ required: true, message: "Please input the warehouse address!" }]}
          >
            <Input
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
              placeholder="Enter full address"
            />
          </Form.Item>

          {/* Province and Zipcode */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="province_id"
                label={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                     <Map className="w-4 h-4 text-blue-500" />
                    Province
                  </div>
                }
                rules={[{ required: true, message: "Please select the province!" }]}
              >
                <Select
                  placeholder="Select Province"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  {province.map((item) => (
                    <Select.Option value={item?.ID} key={item?.ID}>
                      {item?.province}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="zipcode"
                label={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Mail className="w-4 h-4 text-blue-500" />
                    Zipcode
                  </div>
                }
                rules={[
                  { required: true, message: "Please input the zipcode!" },
                  {
                    pattern: /^\d{5}$/,
                    message: "Zipcode must be 5 digits!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter 5-digit zipcode"
                  type="text"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Button Row */}
          <Row gutter={16} style={{ marginTop: "17px" }}>
            <Col span={12}>
              <Link to="/warehouse">
                <Button
                  block
                  icon={<CloseOutlined />}
                  style={{
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Close
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

export default PageWarehouseCreate;
