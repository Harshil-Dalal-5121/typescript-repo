import rest from "../../services/rest";
import { LIMIT, TICKET_TABLE_FIELDS } from "../../utils/constants";
export const model = "com.axelor.apps.project.db.ProjectTask";
interface SearchCriteria {
  fieldName: string;
  operator: string;
  value: string;
}
interface SearchData {
  criteria: SearchCriteria[];
  operator: string;
  _domain: string;
  _domainContext: { _typeSelect: string };
}
interface FetchData {
  id: number;
}
interface RemoveData {
  id: number;
  version: number;
  name: string;
}
export const api = {
  find: async ({
    search = "",
    offset,
  }: {
    search?: string;
    offset: number;
  }) => {
    const response = await rest.post(`${model}/search`, {
      data: {
        criteria: [
          {
            fieldName: "name",
            operator: "like",
            value: search,
          },
        ],
        operator: "or",
        _domain:
          "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
        _domainContext: { _typeSelect: "ticket" },
      },
      fields: TICKET_TABLE_FIELDS,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    });
    if (response) {
      return response?.data;
    }
  },
  fetch: async ({ id }: FetchData) => {
    try {
      const response = await rest.post(`${model}/${id}/fetch`, {
        fields: TICKET_TABLE_FIELDS,
      });
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: async ({ id, version, name }: RemoveData) => {
    try {
      const response = await rest.post(`${model}/removeAll`, {
        records: [{ id: id, version: version, name: name }],
      });
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  save: async (data: SearchData) => {
    try {
      const response = await rest.post(
        `${model}`,
        { data },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response?.data?.status === 0) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default api;
