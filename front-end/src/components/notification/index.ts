import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const openNotification = (message: string, description?: string) => {
  notification.open({
    message: 'sdfsdfsd',
    description: 'sdsddf',
    // onClick: () => {
    //   console.log('Notification Clicked!');
    // },
    // icon: <SmileOutlined />,
  });
};
