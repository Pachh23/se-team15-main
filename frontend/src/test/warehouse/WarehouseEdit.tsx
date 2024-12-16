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
  Typography,
} from "antd";
import { 
  DatabaseOutlined, 
  PushpinOutlined, 
  TagsOutlined, 
  InfoCircleOutlined, 
  CloseOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { WarehousesInterface, WarehouseStatusesInterface, WarehouseTypesInterface, ProvinceInterface } from "../../interfaces/InterfaceFull";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  GetWarehouseTypes, GetWarehouseStatuses, GetProvince, UpdateWarehousesById, GetWarehousesById
} from '../../services/https';

const { Title } = Typography;

function PageWarehouseEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const [messageApi, contextHolder] = message.useMessage();
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusesInterface[]>([]);
  const [warehouseType, setWarehouseType] = useState<WarehouseTypesInterface[]>([]);
  const [province, setGetProvince] = useState<ProvinceInterface[]>([]);
  const [form] = Form.useForm();
  // Fetch Initial Data
  const fetchInitialData = async () => {
    try {
      const [statusRes, typeRes, provinceRes] = await Promise.all([
        GetWarehouseStatuses(),
        GetWarehouseTypes(),
        GetProvince()
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
  const getWarehouseById = async (id: string) => {
    let res = await GetWarehousesById(id);
    if (res.status == 200) {
      form.setFieldsValue({
        warehouse_name: res.data.warehouse_name,
        warehouse_type_id: res.data.warehouse_type?.ID,
        warehouse_status_id: res.data.warehouse_status?.ID,
        capacity: res.data.capacity,
        address: res.data.address,
        zipcode: res.data.zipcode,
        province_id: res.data.province?.ID,
      });
      console.log("Warehouse Data:", res.data);

    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้",
      });
      setTimeout(() => {
        navigate("/warehouse");
      }, 2000);
    }
  };
  

  const onFinish = async (values: WarehousesInterface) => {
    let payload = {
      ...values,
    };
    const res = await UpdateWarehousesById(id, payload);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/warehouse");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    fetchInitialData();
    getWarehouseById(id);//=========
  }, []);

  
  return (
    <div>
    {contextHolder}
    <Card 
    hoverable 
    style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      borderRadius: '12px', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to right, #f5f7fa 0%, #f5f7fa 100%)'
    }}
  >
    <div style={{ 
      textAlign: 'center', 
      marginBottom: '24px' 
    }}>
      <DatabaseOutlined 
        style={{ 
          fontSize: '48px', 
          color: '#FF7F50',
          marginBottom: '16px' 
        }} 
      />
      <Title 
        level={3} 
        style={{ 
          color: '#FF7F50',
          marginBottom: '8px' 
        }}
      >
        Create New Warehouse
      </Title>
      <Typography.Text 
        type="secondary" 
        style={{ 
          fontSize: '14px' 
        }}
      >
        Fill in the details for your new warehouse location
      </Typography.Text>
    </div>
    <Form 
      name="basic"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      requiredMark="optional"
    >
      {/* Warehouse Name */}
      <Form.Item
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircleOutlined style={{ color: '#FF7F50' }} />
            Warehouse Name
          </div>
        }
        name="warehouse_name"
        rules={[{ 
          required: true, 
          message: 'Please input the warehouse name!' 
        }]}
      >
        <Input 
          placeholder="Enter warehouse name" 
          style={{ 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </Form.Item>

      {/* Type and Status Row */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TagsOutlined style={{ color: '#FF7F50' }} />
                Warehouse Type
              </div>
            }
            name="warehouse_type_id"
            rules={[{ 
              required: true, 
              message: 'Please select warehouse type!' 
            }]}
          >
            <Select 
              placeholder="Select Type" 
              style={{ 
                width: '100%',
                borderRadius: '8px'
              }}
            >
              {warehouseType.map((item) => (
                <Select.Option 
                  value={item?.ID} 
                >
                  {item?.warehouse_type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TagsOutlined style={{ color: '#FF7F50' }} />
                Warehouse Status
              </div>
            }
            name="warehouse_status_id"
            rules={[{ 
              required: true, 
              message: 'Please select warehouse status!' 
            }]}
          >
            <Select 
              placeholder="Select Status" 
              style={{ 
                width: '100%',
                borderRadius: '8px'
              }}
            >
              {warehouseStatus.map((item) => (
                <Select.Option 
                  value={item?.ID} 
                >
                  {item?.warehouse_status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Capacity */}
      <Form.Item
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DatabaseOutlined style={{ color: '#FF7F50' }} />
            Warehouse Capacity
          </div>
        }
        name="capacity"
        rules={[{ 
          required: true, 
          message: 'Please input the warehouse capacity!' 
        }]}
      >
        <InputNumber 
          min={0} 
          defaultValue={0} 
          style={{ 
            width: '100%',
            borderRadius: '8px'
          }} 
        />
      </Form.Item>

      {/* Address */}
      <Form.Item
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PushpinOutlined style={{ color: '#FF7F50' }} />
            Address
          </div>
        }
        name="address"
        rules={[{ 
          required: true, 
          message: 'Please input the warehouse address!' 
        }]}
      >
        <Input 
          style={{ 
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }} 
          placeholder="Enter full address"
        />
      </Form.Item>

      {/* Province and Zipcode */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PushpinOutlined style={{ color: '#FF7F50' }} />
                Province
              </div>
            }
            name="province_id"
            rules={[{ 
              required: true, 
              message: 'Please select the province!' 
            }]}
          >
            <Select 
              placeholder="Select Province" 
              style={{ 
                width: '100%',
                borderRadius: '8px'
              }}
            >
              {province.map((item) => (
                <Select.Option 
                  value={item?.ID} 
                  key={item?.ID}
                >
                  {item?.province}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PushpinOutlined style={{ color: '#FF7F50' }} />
                Zipcode
              </div>
            }
            name="zipcode"
            rules={[
              { 
                required: true, 
                message: 'Please input the zipcode!' 
              },
              { 
                pattern: /^\d{5}$/, 
                message: 'Zipcode must be 5 digits!' 
              },
            ]}
          >
            <Input 
              placeholder="Enter 5-digit zipcode" 
              type="text" 
              style={{ 
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            />
          </Form.Item>
        </Col>
        </Row>
{/* Button Row */}
        <Row gutter={16} style={{ marginTop: '17px' }}>
          <Col span={12}>
          <Link to="/warehouse">
            <Button 
              block 
              icon={<CloseOutlined />}
              style={{ 
                borderRadius: '8px',
                height: '40px'
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
                borderRadius: '8px',
                height: '40px',
                backgroundColor: '#FF7F50', 
                borderColor: '#FF7F50'
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

export default PageWarehouseEdit;
