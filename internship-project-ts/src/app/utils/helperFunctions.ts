function getDate(value: Date) {
  var date = new Date(value);

  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  var dateString =
    y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  return dateString;
}

const handleValidation = (
  data: any,
  errorMessages: any,
  startDate: Date,
  endDate?: Date
): any => {
  const error: any = {};
  Object.keys(errorMessages)?.forEach((key: string) => {
    if (!data[key]) {
      error[key] = errorMessages[key];
    }
  });
  if (endDate) {
    if (startDate > endDate) {
      error["endDate"] = `Invalid End Date`;
    }
  }
  return error;
};
export { handleValidation, getDate };
