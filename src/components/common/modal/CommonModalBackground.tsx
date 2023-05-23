import ReactModal from 'react-modal';
import styled from 'styled-components';

const modalStyle = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 10,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: 0,
    padding: 0,
    overflow: 'hidden',
  },
};

interface CommonModalBackgroundProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const CommonModalBackground: React.FC<CommonModalBackgroundProps> = ({
  children,
  isOpen,
}) => {
  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      {children}
    </ReactModal>
  );
};

export default CommonModalBackground;
