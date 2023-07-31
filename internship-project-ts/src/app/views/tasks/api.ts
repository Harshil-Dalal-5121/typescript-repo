import rest from "../../services/rest";
import { LIMIT, TASK_TABLE_FIELDS } from "../../utils/constants";
export const model = "com.axelor.apps.project.db.ProjectTask";

interface FetchResponse {
  response: {
    data: any;
  };
  status: number;
}

interface FindParams {
  search?: string;
  offset: number;
}

interface DeleteParams {
  id: number;
  version: number;
  name: string;
}
interface FetchParams {
  id: number;
}
interface SaveParams {
  data: any;
}

const api = {
  find: async ({ search = "", offset }: FindParams) => {
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
        _domain: "self.typeSelect = :_typeSelect",
        _domainContext: {
          _typeSelect: "task",
        },
      },
      fields: TASK_TABLE_FIELDS,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    });
    if (response) {
      return response?.data;
    }
  },
  fetch: async ({ id }: FetchParams) => {
    try {
      const response = await rest.post<FetchResponse>(`${model}/${id}/fetch`, {
        fields: TASK_TABLE_FIELDS,
      });
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchTasks: async ({
    id,
    offset,
    limit,
  }: {
    id: number;
    offset: number;
    limit: number;
  }) => {
    try {
      const response = await rest.post(`${model}/search`, {
        data: {
          _domain:
            "(self.project.id = :_id AND self.parentTask = null) AND (self.project.id = :_id)",
          _domainAction: "action-view-show-project-task-tree",
          _domainContext: {
            id: id,
            _model: "com.axelor.apps.project.db.Project",
            _countOn: "parentTask",
          },
        },
        fields: ["name", "taskDate", "assignedTo", "progressSelect"],
        offset: offset,
        limit: limit,
        sortBy: ["taskDate"],
      });
      if (response && response?.data?.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: async ({ id, version, name }: DeleteParams) => {
    try {
      const response = await rest.post<FetchResponse>(`${model}/removeAll`, {
        records: [{ id: id, version: version, name: name }],
      });
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  save: async (data: SaveParams) => {
    try {
      const response = await rest.post<FetchResponse>(
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
