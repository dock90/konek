import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Paper, Popper } from '@material-ui/core';
import { BaseButton } from '../styles/Button';

const Content = styled(Paper)`
  padding: 4px;
  font-size: 0.9em;
`;

export const ACTION_TYPE_ICON = 'icon';
export const ACTION_TYPE_BUTTON = 'button';

const BaseAction = ({ href, as, children, icon, type }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  if (type === ACTION_TYPE_BUTTON) {
    return (
      <span>
        <Link href={href} as={as} passHref={true}>
          <BaseButton>
            {icon}
            &nbsp;{children}
          </BaseButton>
        </Link>
      </span>
    );
  }
  return (
    <span>
      <Link href={href} as={as}>
        <a
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          ref={anchorRef}
        >
          {icon}
        </a>
      </Link>
      {children && (
        <Popper open={open} anchorEl={anchorRef.current} placement="bottom">
          <Content>{children}</Content>
        </Popper>
      )}
    </span>
  );
};

export default BaseAction;

BaseAction.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.element,
  as: PropTypes.any,
  children: PropTypes.array,
  href: PropTypes.any,
};

BaseAction.defaults = {
  type: ACTION_TYPE_ICON,
};
