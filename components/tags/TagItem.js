import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Tag = styled.span`
  border-radius: 4px;
  padding: 2px 4px;
  margin: 2px 4px;
  border: solid 1px lightgray;
`;

const Hidden = styled.span`
  font-style: italic;
`;

function textColor(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return "#ffffff";
  }
  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 255000;

  if (brightness >= 0.5) {
    return "#000000";
  }
  return "#ffffff";
}

const TagItem = ({ tag }) => {
  const color = textColor(tag.color);

  return (
    <Tag style={{ backgroundColor: `#${tag.color}`, color }}>
      {tag.name}
      {tag.hidden && <Hidden> (hidden)</Hidden>}
    </Tag>
  );
};

TagItem.propTypes = {
  tag: PropTypes.object.isRequired
};

export default TagItem;
