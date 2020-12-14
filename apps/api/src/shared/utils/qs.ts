const keywords = {
  true: true,
  false: false,
  null: null,
  undefined,
};

export const decodeProps = (props) =>
  Object.entries(props).reduce((prev, [key, value]) => {
    let decodedValue = value;

    try {
      decodedValue = JSON.parse((value as unknown) as string);
    } catch {
      if (Array.isArray(value)) {
        decodedValue = value.map((v) => decodeProps(v));
      } else if (typeof value === 'object' && value !== null) {
        decodedValue = decodeProps(value);
      } else if (/^(\d+|\d*\.\d+)$/.test(value as string)) {
        decodedValue = parseFloat(value as string);
      } else if ((value as string) in keywords) {
        decodedValue = keywords[value as string];
      }
    }

    return {
      ...prev,
      [key]: decodedValue,
    };
  }, {});
