export const decodeProps = (props) =>
  Object.entries(props).reduce((prev, [key, value]) => {
    let decodedValue = value;
    if (/^(\d+|\d*\.\d+)$/.test(value as string)) {
      decodedValue = parseFloat(value as string);
    }

    const keywords = {
      true: true,
      false: false,
      null: null,
      undefined,
    };
    if ((value as string) in keywords) {
      decodedValue = keywords[value as string];
    }

    return {
      ...prev,
      [key]: decodedValue,
    };
  }, {});
