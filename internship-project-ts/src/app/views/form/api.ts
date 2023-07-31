import requestBody from "../../utils/requestBody";
import rest from "../../services/rest";
import { model } from "../projects/api";
import axios, { AxiosResponse } from "axios";
interface IValueId {
  value: string;
  id: number;
}
interface IProjectTask {
  projectId: number;
  taskId: number;
}

interface IParentTask {
  projectId: number;
  value: string;
  taskId: number;
}
interface IProjectValue {
  projectId: number;
  value: string;
}
interface IValue {
  value: string;
}
interface IValueCompany {
  value: string;
  company: string;
}
const action = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
});
const formApi = {
  projects: async ({ value, id }: IValueId): Promise<any> => {
    try {
      const response: AxiosResponse = await rest.post(
        `${model}/search`,
        requestBody.project({ value, id })
      );
      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },
  availableProject: async ({ value }: IValue) => {
    try {
      const response = await rest.post(
        `${model}/search`,
        requestBody.availableProject(value)
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchParentTaskAction: async ({ projectId, taskId }: IProjectTask) => {
    try {
      const response = await action.post(
        `/ws/action`,
        requestBody.parentTaskAction({ projectId: projectId, taskId: taskId })
      );

      if (response && response.data.status !== -1) {
        const domain = response?.data.data[0].attrs.parentTask.domain;
        return domain;
      }
    } catch (error) {
      return error;
    }
  },

  parentTask: async ({ projectId, taskId, value }: IParentTask) => {
    try {
      const domain = await formApi.fetchParentTaskAction({
        projectId: projectId,
        taskId: taskId,
      });

      const response = await rest.post(
        `${model}Task/search`,
        requestBody.parentTask({
          value: value,
          projectId: projectId,
          domain: domain,
        })
      );
      if (response && response.data.status !== -1) {
        return response?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  priority: async ({ value }: IValue) => {
    try {
      const response = await rest.post(
        `${model}Priority/search`,
        requestBody.priority(value)
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  assignedTo: async (value: IValue) => {
    try {
      const response = await rest.post(
        `com.axelor.auth.db.User/search`,
        requestBody.assignedTo(value)
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchAssignedAction: async ({ projectId }: { projectId: number }) => {
    try {
      const domain = await action.post(
        `/ws/action`,
        requestBody.fetchAssignedAction({ projectId })
      );
      if (domain && domain?.data?.status !== -1) {
        const response = domain?.data.data[0].attrs.assignedTo.domain;
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  taskAssigned: async ({ projectId, value }: IProjectValue) => {
    try {
      const domain = await formApi?.fetchAssignedAction({
        projectId: projectId,
      });
      const response = await rest.post(
        `com.axelor.auth.db.User/search`,
        requestBody.taskAssignedTo({ value: value, domain: domain })
      );

      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },

  fetchCustomer: async ({ value, company }: IValueCompany) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Partner/search`,
        requestBody.customer({ value: value, company: company })
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchCompany: async ({ value }: IValue) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Company/search`,
        {
          data: {
            _domainContext: {},
            name: value,
            code: value,
          },
          fields: ["id", "name", "code"],
        }
      );
      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchCustomerCurrency: async ({ value }: IValue) => {
    try {
      const response = await action.post(
        `/ws/action`,
        requestBody.customerCurrency({ value })
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data[0]?.values?.currency || [];
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchCurrency: async ({ value }: IValue) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Currency/search`,
        requestBody.currency({ value })
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchContactAction: async ({ value }: IValue) => {
    try {
      const domain = await action.post(
        `/ws/action`,
        requestBody.contactAction({ value })
      );
      if (domain && domain?.data?.status === 0) {
        return domain?.data?.data[0]?.attrs?.contactPartner?.domain || {};
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default formApi;
