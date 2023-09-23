import { Scrollbar } from 'react-scrollbars-custom';
import styled, { useTheme } from 'styled-components';

interface CustomScrollLayoutProps {
  children: React.ReactNode;
}

const CustomScrollLayout: React.FC<CustomScrollLayoutProps> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <CustomScrollbar
      className="custom-scrollbar"
      trackYProps={{
        renderer: (props: any) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{
                ...restProps.style,
                width: '6px',
                backgroundColor: 'white',
                right: '0',
                top: '0',
                borderRadius: '3px',
                display: 'block',
                height: '100%',
              }}
              className="track-vertical"
            />
          );
        },
      }}
      thumbYProps={{
        renderer: (props: any) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{
                ...restProps.style,
                width: '6px',
                backgroundColor: theme.colors.gray[200],
                borderRadius: '3px',
              }}
              className="thumb-vertical"
            />
          );
        },
      }}
      renderer={(props: any) => {
        const { elementRef, ...restProps } = props;
        return <div {...restProps} ref={elementRef} className="view" />;
      }}
    >
      {children}
    </CustomScrollbar>
  );
};

export default CustomScrollLayout;

const CustomScrollbar = styled(Scrollbar)``;
