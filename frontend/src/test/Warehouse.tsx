import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Input, 
  Button, 
  Card, 
  Space, 
  Row, 
  Col, 
  Tag,
  Table
} from 'antd';
import { 
  SearchOutlined, 
  DatabaseOutlined, 
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined
} from '@ant-design/icons';
import w1 from "../assets/w1.png";
import { WarehousesInterface } from '../interfaces/InterfaceFull';
import type { ColumnsType } from 'antd/es/table';
const { Header, Content } = Layout;
const { Title, Text } = Typography;

function PageWarehouse() {


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
      dataIndex: 'WarehouseName',  // แก้ไขจาก WarehouseName
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
      key: 'WarehouseType',
      render: (record) => {
        const type = record?.WarehouseType?.WarehouseType;
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
      key: 'WarehouseStatus',
      width: 150,
      render: (record) => {
        const status = record?.WarehouseStatus?.WarehouseStatus;
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
    },    
    {
      title: 'Address',
      key: 'address',
      render: (record) => (
        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {record.address}, {record?.Province?.Province}, {record.zipcode}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => (record.ID)}>
            <EditTwoTone twoToneColor="#10515F" /></Button>
          <Button onClick={() => (record.ID)}>
            <DeleteTwoTone twoToneColor="#FF7236" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header 
        style={{ 
          background: `url(${w1}) no-repeat center center`,
          backgroundSize: 'cover', // ให้ภาพครอบคลุมพื้นที่ทั้งหมด
          margin: 0, // ลบระยะห่างรอบขอบ
          padding: 0, // ลบระยะห่างภายใน
          width: '100vw', // ความกว้างเต็มหน้าจอ
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
                  //onSearch={handleSearch}
                  style={{ borderRadius: '4px' }}
                />
              </Space.Compact>
            </Col>
          </Row>
        </div>
        
      </Header>
      <Content style={{ padding: '24px 50px' }}> 
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ 
              marginBottom: '24px',
              background: '#10515F',
              marginLeft: '90px',
              borderRadius: '0px',
              width: '250px',
              height: '50px'
            }}
            //onClick={handleAddWarehouse}
          >
            New Warehouse
          </Button>
      <Card>
          <Table
            columns={columns}
            //dataSource={filteredWarehouses}
            pagination={{ pageSize: 10 }}
            rowKey="ID"
          />
        </Card>
      </Content>
    </Layout>
  );
}

export default PageWarehouse;