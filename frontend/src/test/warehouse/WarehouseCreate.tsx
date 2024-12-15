import { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  DatePicker,
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
import form from "antd/es/form";
import { Link, useNavigate } from "react-router-dom";
import { 
  GetWarehouseTypes, GetWarehouseStatuses, GetProvince, 
  CreateWarehouse, GetWarehouses, DeleteWarehousesById, 
  UpdateWarehousesById,
  GetWarehousesById
} from '../../services/https';

const { Title } = Typography;

function PageWarehouseCreate() {
  const navigate = useNavigate();
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
          color: '#1890ff', 
          marginBottom: '16px' 
        }} 
      />
      <Title 
        level={3} 
        style={{ 
          color: '#1890ff', 
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
      form={form} 
      layout="vertical" 
      onFinish={onFinish}
      requiredMark="optional"
    >
      {/* Warehouse Name */}
      <Form.Item
        name="WarehouseName"
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
            Warehouse Name
          </div>
        }
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
            name="WarehouseTypeID"
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TagsOutlined style={{ color: '#1890ff' }} />
                Warehouse Type
              </div>
            }
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
                  {item?.WarehouseType}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="WarehouseStatusID"
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TagsOutlined style={{ color: '#1890ff' }} />
                Warehouse Status
              </div>
            }
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
                  key={item?.ID}
                >
                  {item?.WarehouseStatus}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DatabaseOutlined style={{ color: '#1890ff' }} />
            Warehouse Capacity
          </div>
        }
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
        name="address"
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PushpinOutlined style={{ color: '#1890ff' }} />
            Address
          </div>
        }
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
            name="ProvinceID"
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PushpinOutlined style={{ color: '#1890ff' }} />
                Province
              </div>
            }
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
                  {item?.Province}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="zipcode"
            label={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PushpinOutlined style={{ color: '#1890ff' }} />
                Zipcode
              </div>
            }
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
        <Row gutter={16} style={{ marginTop: '24px' }}>
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
                borderRadius: '8px',
                height: '40px',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff'
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
