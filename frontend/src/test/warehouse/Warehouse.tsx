import { useEffect, useMemo, useState } from 'react';
import { Layout, Typography, Input, Button, Card, Space, Row, Col, Tag,Table, message} from 'antd';
import { SearchOutlined, DatabaseOutlined, DeleteTwoTone, EditTwoTone, PlusOutlined} from '@ant-design/icons';
import w1 from "../../assets/w1.png";
import { WarehousesInterface } from '../../interfaces/InterfaceFull';
import type { ColumnsType } from 'antd/es/table';
import { DeleteWarehousesById, GetWarehouses } from '../../services/https';
import { Link, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
const { Title, Text } = Typography;


function PageWarehouse() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [warehouses, setWarehouses] = useState<WarehousesInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  //const myId = localStorage.getItem("id");

  const deleteWarehouseById = async (id: string) => {
    let res = await DeleteWarehousesById(id);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await getWarehouses();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };
  
  const getWarehouses = async () => {
    let res = await GetWarehouses();
   
    if (res.status == 200) {
      setWarehouses(res.data);
    } else {
      setWarehouses([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };
  useEffect(() => {
    getWarehouses();
  }, []);

  // Filtered Warehouses
  const filteredWarehouses = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
  
    if (!lowercaseQuery) return warehouses;
  
    return warehouses.filter((warehouse) => {
      const searchableFields = [
        warehouse.warehouse_name?.toLowerCase() || '',
        warehouse.address?.toLowerCase() || '',
        warehouse.ID?.toString() || '',
        warehouse.zipcode?.toString() || '',
        warehouse.capacity?.toString() || ''
      ];
      
      return searchableFields.some(field => field.includes(lowercaseQuery));
    });
  }, [warehouses, searchQuery]);


  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const columns: ColumnsType<WarehousesInterface> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
      width: 80,
      sorter: (a, b) => {
        if (a.ID === undefined) return 1;
        if (b.ID === undefined) return -1;
        return a.ID - b.ID;
      },
    },      
    {
      title: 'Warehouse Name',
      dataIndex: 'warehouse_name',  // แก้ไขจาก WarehouseName
      key: 'WarehouseName',
      // ...
      sorter: (a, b) => {
        if (!a.WarehouseName || !b.WarehouseName) {  // แก้ไขการอ้างอิง
          return 0;
        }
        return a.WarehouseName.localeCompare(b.WarehouseName);  // แก้ไขการอ้างอิง
      },
    },  
    {
      title: 'Type',
      key: 'warehouse_type',
      render: (record) => {
        const type = record?.warehouse_type?.warehouse_type;
        let color = 'black';
        if (type === 'Cold Storage') {
          color = 'blue';
        } else if (type === 'Dry Storage') {
          color = 'green';
        } else if (type === 'Hazardous Storage') {
          color = 'red';
        } else if (type === 'Bulk Storage') {
          color = 'orange';
        }
    
        return (
          <Tag bordered={false} color={color}>
            {type}
          </Tag>
        );
      },
       // เพิ่มฟิลเตอร์
       filters: [
        { text: 'Cold Storage', value: 'Cold Storage' },
        { text: 'Dry Storage', value: 'Dry Storage' },
        { text: 'Hazardous Storage', value: 'Hazardous Storage' },
        { text: 'Bulk Storage', value: 'Bulk Storage' },
      ],
      // กรองข้อมูลตามสถานะที่เลือก
      onFilter: (value, record) => record?.warehouse_type?.warehouse_type.indexOf(value) === 0,
    },    
    {
      title: 'Capacity (m³)',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a, b) => (a.Capacity || 0) - (b.Capacity || 0),
      render: (capacity) => (
        <span style={{ fontWeight: 'bold', color: 'black' }}>
          {capacity} m³
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'warehouse_status',
      width: 150,
      render: (record) => {
        const status = record?.warehouse_status?.warehouse_status;
        let color = 'black';
        if (status === 'Available') {
          color = '#52c41a';
        } else if (status === 'Full') {
          color = '#f5222d';
        } else if (status === 'Nearly Full') {
          color = 'orange';
        } else if (status === 'Empty') {
          color = '#1677ff';
        }
        return (
          <span
            style={{
              color: color,
              fontWeight: 550,
              textTransform: 'capitalize',
            }}
          >
            {status}
          </span>
        );
      },
       // เพิ่มฟิลเตอร์
       filters: [
        { text: 'Available', value: 'Available' },
        { text: 'Full', value: 'Full' },
        { text: 'Nearly Full', value: 'Nearly Full' },
        { text: 'Empty', value: 'Empty' },
      ],
      // กรองข้อมูลตามสถานะที่เลือก
      onFilter: (value, record) => record?.warehouse_status?.warehouse_status.indexOf(value) === 0,
    },
    // เพิ่มคอลัมน์อื่น ๆ ที่ต้องการ
    {
      title: 'Address',
      key: 'address',
      render: (record) => (
        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {record.address}, {record?.province?.province}, {record.zipcode}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (record) => (
        
        <Space size="middle">
          <Button onClick={() => navigate(`/warehouse/edit/${record.ID}`)}>
            <EditTwoTone twoToneColor="#10515F" /></Button>
          <Button onClick={() => deleteWarehouseById(record.ID)}>
            <DeleteTwoTone twoToneColor="#FF7236" />
          </Button>
        </Space>
          )
    },
  ];

  return (
    <div>
    <Layout style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      {contextHolder}
      <Header 
        style={{ 
          background: `url(${w1}) no-repeat center center`,
          backgroundSize: 'cover', // ให้ภาพครอบคลุมพื้นที่ทั้งหมด
          margin: 0, // ลบระยะห่างรอบขอบ
          padding: 0, // ลบระยะห่างภายใน
          width: '99vw', // ความกว้างเต็มหน้าจอ
          height: '40vh', // ความสูงเต็มหน้าจอ
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ 
          textAlign: 'center', 
          color: 'white', 
          maxWidth: '800px', 
          padding: '0 24px' 
        }}>
          <Row gutter={[16, 16]} align="middle" justify="center">
            <Col span={24}>
              <DatabaseOutlined 
                style={{ 
                  fontSize: '64px', 
                  color: 'rgba(255,255,255,0.7)', 
                  marginBottom: '16px' 
                }} 
              />
              <Title 
                level={1} 
                style={{ 
                  color: 'white', 
                  marginBottom: '16px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
                }}
              >
                WAREHOUSE MANAGEMENT
              </Title>
              
              <Text 
                style={{ 
                  color: 'rgba(255,255,255,0.85)', 
                  fontSize: '16px',
                  display: 'block',
                  marginBottom: '24px' 
                }}
              >
                Optimize your inventory, streamline operations, and drive efficiency
              </Text>
              
              <Space.Compact style={{ width: '100%', maxWidth: '600px' }}>
                <Input.Search
                  placeholder="Search warehouses, inventory, locations..."
                  enterButton={
                    <Button 
                      type="primary" 
                      icon={<SearchOutlined />}
                      style={{ 
                        backgroundColor: '#FF7236', 
                        borderColor: '#FF7236' 
                      }}
                    >
                      Search
                    </Button>
                  }
                  size="large"
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ borderRadius: '4px' }}
                />
              </Space.Compact>
            </Col>
          </Row>
        </div>
        
      </Header>
      <Content style={{ padding: '24px 50px' }}> 
        <Link to="/warehouse/create">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ 
              background: '#10515F',
              borderRadius: '4px',
              width: '240px',
              height: '50px',
              marginTop: '-50px',
              marginBottom: '20px',
            }}
            // onClick={handleAddWarehouse}
          >
            New Warehouse
          </Button>
        </div>
        </Link>
          <Card>
            <Table
              columns={columns}
              dataSource={filteredWarehouses}
              pagination={{ pageSize: 10 }}
              rowKey="ID"
              style={{background: '#FFFFFF'}}
            />
          </Card>
      </Content>
    </Layout>
    </div>
  );
}

export default PageWarehouse;