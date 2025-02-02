import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, message } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import axios from 'axios';
import { Badge } from 'antd';
import Cookies from 'universal-cookie';
import { Select } from 'antd';
const { Search } = Input;
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';// rup içinde bir url
const ContainerHeight = 400;
const DashPeople = ({ onSelection }) => {
  const cookies = new Cookies();
  const [friendsData, setFriendsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [userId, setUserId] = useState([]);


  const [data, setData] = useState([]);
  const [value, setValue] = useState();



  useEffect(() => {
    let request = {
      Id: cookies.get("Id")
    }
    axios.post('http://localhost:5016/api/baytech/ReturnFriends', request)
      .then(function (response) {
        console.log(response.data)
        setFriendsData(response.data)
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });

    axios.post('http://localhost:5016/api/baytech/ReturnGroups', request)
      .then(function (response) {

        setGroupsData(response.data)
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });


  }, []);

 

 



  const handleChange = (newValue) => {
    setValue(newValue);

  };
  const handleSearch = (newValue) => {
    let request = {
      Search: newValue
    }
    axios.post('http://localhost:5016/api/baytech/returnabc', request)
      .then(function (response) {
        console.log(response);

        const SearchedUsers = response.data.map((item) => ({
          value: item.id,
          label: item.userName,
          isOnline:item.isOnline
        }));

        setData(SearchedUsers)
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };

  const handleOnSelected = (value, value2) => {
    console.log("value2",value2)
    onSelection(value, value2);
  }




  return (
    <div style={{ width: "30vw", height: "96vh", display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "2vh", marginBottom: "2vh" }} >

      {/* Select marginBottom: "auto" */}
      <div style={{}}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Select
            showSearch
            value={value}
            placeholder="{props.placeholder}"
            style={{ width: "30vw", borderRadius: "6vw !important", height: "6vh" }}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
              label: d.label,
              value: d.value,
              isOnline:d.isOnline
            }))}
            onSelect={handleOnSelected}
          />
        </div>
      </div>

      {/* Üstteki liste marginBottom: "1vw"*/}
      <div>
        <div style={{}}>
          <List style={{ padding: "1.2vw", background: "white", borderRadius: "2vw" }} >
            <h3>Chats</h3>
            <VirtualList
              data={friendsData}
              height="13vw"
              itemHeight={47}
              itemKey="Id"
            >
              {(item) => (
                <Button type="text" style={{ height: "4vw" }}>
                  <List.Item key={item.Id} >
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture} />}
                      title={<a href="https://ant.design">{item.userName}</a>}
                      description={item.email}
                    />
                    {(() => {
                      switch (item.isOnline) {
                        case true: return <div><Badge status="success" text="Online" /></div>;
                        case false: return <div><Badge status="error" text="Ofline" /></div>;
                   
                      }
                    })()}

                    
                  </List.Item>
                </Button>
              )}
            </VirtualList>
          </List>
        </div>
      </div>

      {/* Altta liste */}
      <div>
        <div style={{}}>
          <List style={{ padding: "1.2vw", background: "white", borderRadius: "2vw" }} >
            <h3>Groups</h3>
            <VirtualList
              data={groupsData}
              height="13vw"
              itemHeight={47}
              itemKey="email"
            >
              {(item) => (
                <Button type="text" style={{ height: "4vw" }}>
                  <List.Item key={item.email} >
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture} />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.email}
                    />
                  </List.Item>
                </Button>
              )}
            </VirtualList>
          </List>
        </div>
      </div>

    </div>
  );


};
export default DashPeople;