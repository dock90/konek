import React from 'react';
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

export enum ActionType {
  icon = 'icon',
  button = 'button',
}

interface Props {
  href: string;
  as?: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  type?: ActionType;
}

const BaseAction: React.FC<Props> = ({
  href,
  as,
  children,
  icon,
  type = ActionType.icon,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  if (type === ActionType.button) {
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
//
// BaseAction.propTypes = {
//   type: PropTypes.string,
//   icon: PropTypes.element,
//   as: PropTypes.any,
//   children: PropTypes.array,
//   href: PropTypes.any,
// };
//
// BaseAction.defaults = {
//   type: ACTION_TYPE_ICON,
// };
