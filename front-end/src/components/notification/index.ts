import { notification } from 'antd';

export enum NOTIFICATION_TYPE {
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

const getNotificationStyle = (type: NOTIFICATION_TYPE) => {
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESS:
      return {
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #b7eb8f',
        backgroundColor: '#f6ffed'
      };

    case NOTIFICATION_TYPE.WARNING:
      return {
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #ffe58f',
        backgroundColor: '#fffbe6'
      };

    case NOTIFICATION_TYPE.ERROR:
      return {
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #ffa39e',
        backgroundColor: '#fff1f0'
      };

    case NOTIFICATION_TYPE.INFO:
      return {
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #91d5ff',
        backgroundColor: '#e6f7ff'
      };
  };
};

export const openCustomNotificationWithIcon = (type: NOTIFICATION_TYPE, message: string, description: string) => {
  const typeStr = type === NOTIFICATION_TYPE.ERROR ? 'error'
    : NOTIFICATION_TYPE.INFO ? 'info'
      : NOTIFICATION_TYPE.SUCCESS ? 'success'
        : NOTIFICATION_TYPE.WARNING ? 'warning'
          : '';

  //@ts-ignore
  notification[typeStr]({
    message,
    description,
    style: getNotificationStyle(type),
    // duration: 0
  });
};

export const openNotificationWithIcon = (type: NOTIFICATION_TYPE, message: string, description: string) => {
  const typeStr = type === NOTIFICATION_TYPE.ERROR ? 'error'
    : NOTIFICATION_TYPE.INFO ? 'info'
      : NOTIFICATION_TYPE.SUCCESS ? 'success'
        : NOTIFICATION_TYPE.WARNING ? 'warning'
          : '';

  //@ts-ignore
  notification[typeStr]({
    message,
    description,
  });
};