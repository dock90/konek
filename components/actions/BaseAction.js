import Link from "next/link";
import styled from "styled-components";
import { useRef, useState } from "react";
import { Paper, Popper } from "@material-ui/core";

const Content = styled(Paper)`
  padding: 4px;
  font-size: 0.9em;
`;

const BaseAction = ({ href, as, children, Icon }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <span>
      <Link href={href} as={as}>
        <a
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          ref={anchorRef}
        >
          <Icon />
        </a>
      </Link>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom">
        <Content>{children}</Content>
      </Popper>
    </span>
  );
};

export default BaseAction;
