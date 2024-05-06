import { Spin } from 'antd';

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
    }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
