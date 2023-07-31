interface Event {
  target?: { name: string | number | any; value: any; checked: boolean };
}
interface Value {
  id?: string | number;
  fullName?: string;
  version?: string | number;
  code?: string;
  name?: string;
  $version?: string | number;
}
interface Data {
  [key: string]: any;
}
const onChange = {
  change: (e: Event, data: Data, setData: Function) => {
    const { name, value } = e.target || {};
    setData({
      ...data,
      [name]: value,
    });
  },
  switch: (e: Event, data: Data, setData: Function) => {
    const { name, checked } = e.target || {};
    setData({
      ...data,
      [name]: checked,
    });
  },
  assignedTo: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      assignedTo: value
        ? {
            id: value.id || "",
            fullName: value.fullName || "",
            version: value.version || "",
            code: value.code || "",
          }
        : "",
      membersUserSet: value
        ? [
            {
              code: "admin",
              fullName: "Admin",
              id: 1,
              version: 6,
            },
            {
              id: value.id || "",
              fullName: value.fullName || "",
              version: value.version || "",
              code: value.code || "",
            },
          ]
        : "",
    });
  },
  project: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      parentProject: value
        ? {
            id: value?.id || "",
            fullName: value?.fullName || "",
            code: value?.code || "",
            $version: value?.version,
          }
        : "",
    });
  },

  company: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      company: value
        ? {
            id: value?.id || "",
            code: value?.code || "",
            name: value?.name || "",
          }
        : "",
    });
  },

  currency: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      currency: value
        ? {
            code: value?.code || "",
            id: value?.id || "",
            name: value?.name || "",
          }
        : "",
    });
  },

  customerContact: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      contactPartner: value
        ? {
            fullName: value?.fullName || "",
            id: value?.id || "",
            $version: value?.$version || "",
          }
        : "",
    });
  },

  address: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      customerAddress: value
        ? {
            fullName: value?.fullName || "",
            id: value?.id || "",
          }
        : "",
    });
  },

  priority: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      priority: value
        ? {
            id: value?.id,
            name: value?.name,
            $version: 0,
          }
        : "",
    });
  },

  parentTask: (e: Event, value: Value, data: Data, setData: Function) => {
    setData({
      ...data,
      parentTask: value
        ? {
            id: value?.id,
            name: value?.name,
            fullName: value?.fullName,
            version: value?.version,
          }
        : "",
    });
  },
};
export default onChange;
