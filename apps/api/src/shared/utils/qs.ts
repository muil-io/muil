const keywords = {
  true: true,
  false: false,
  null: null,
  undefined,
};

export const decodeProps = (props) => {
  let decodedValue = props;

  if (Array.isArray(props)) {
    decodedValue = props.map((v) => decodeProps(v));
  } else if (typeof props === 'object' && props !== null) {
    decodedValue = Object.entries(props).reduce((p, [k, v]) => ({ ...p, [k]: decodeProps(v) }), {});
  } else if (/^(\d+|\d*\.\d+)$/.test(props as string)) {
    decodedValue = parseFloat(props as string);
  } else if ((props as string) in keywords) {
    decodedValue = keywords[props as string];
  }

  return decodedValue;
};
