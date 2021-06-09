import React from 'react';

interface BlankPropsTypes {
  vertical: any;
  horizontal: any;
}

export const Margin = (
  props: BlankPropsTypes,
): React.ComponentElement<any, any> => (
  <div style={{ marginTop: props.vertical, marginLeft: props.horizontal }} />
);

export const Padding = (
  props: BlankPropsTypes,
): React.ComponentElement<any, any> => (
  <div style={{ paddingTop: props.vertical, paddingLeft: props.horizontal }} />
);

const Format = {
  Margin,
  Padding,
};

export default Format;
