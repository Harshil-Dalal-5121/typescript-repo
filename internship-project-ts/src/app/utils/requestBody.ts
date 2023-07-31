interface ProjectValue {
  value: string;
  id?: number;
}
interface AssignedAction {
  projectId: number;
}
interface AssignedTo {
  value: string;
}
interface TaskAssignedTo {
  domain: string;
  value: string;
}
interface ParentTaskAction {
  projectId: number;
  taskId: number;
}
interface ParentTask {
  value: string;
  projectId: number;
  domain: string;
}
interface Customer {
  value: string;
  company: string;
}
interface CustomerCurrency {
  value: string;
}
interface Currency {
  value: string;
}
interface Address {
  value: string;
  client: string;
  company: string;
}
const requestBody = {
  project: ({ value, id }: ProjectValue) => {
    const data: any = {
      code: value,
      fullName: value,
    };
    if (id) {
      data._domain = " self.id != :id";
      data._domainContext = {
        id: id,
      };
    }
    return {
      data: data,
      fields: ["id", "fullName", "code"],
    };
  },
  availableProject: (value: string) => {
    return {
      data: {
        code: value,
        fullName: value,
        _domain: "self.projectStatus.isCompleted = false",
        _domainContext: {},
      },
      fields: ["id", "fullName", "code"],
    };
  },

  priority: (value: string) => {
    return {
      data: {
        name: value,
        _domain: "self.id IN (1,2,3,4)",
        _domainContext: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",
        },
      },
      fields: ["id", "name"],
    };
  },

  fetchAssignedAction: ({ projectId }: AssignedAction) => {
    return {
      model: "com.axelor.apps.project.db.ProjectTask",
      action: "action-project-task-attrs-project-assigned-to-configurations",
      data: {
        criteria: [],
        context: {
          project: {
            id: projectId,
          },
        },
      },
    };
  },

  assignedTo: ({ value }: AssignedTo) => {
    return {
      fields: ["id", "fullName", "partner", "name", "code"],
      sortBy: null,
      data: {
        _domainContext: {},
        fullName: value,
      },
      limit: 10,
      offset: 0,
      translate: true,
    };
  },

  taskAssignedTo: ({ domain, value }: TaskAssignedTo) => {
    return {
      data: {
        code: value,
        fullName: value,
        _domain: domain,
      },
      fields: ["id", "fullName", "code", "name"],
    };
  },

  parentTaskAction: ({ projectId, taskId }: ParentTaskAction) => {
    return {
      model: "com.axelor.apps.project.db.ProjectTask",
      action: "action-project-task-attrs-project-parent-task-configurations",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",

          project: {
            id: projectId,
          },
          id: taskId,

          _source: "parentTask",
        },
      },
    };
  },

  parentTask: ({ value, projectId, domain }: ParentTask) => {
    return {
      data: {
        fullName: value,
        name: value,
        _domain: domain,
        _domainContext: {
          _typeSelect: "task",
          project: {
            id: projectId,
          },
          typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
    };
  },

  customer: ({ value, company }: Customer) => {
    return {
      data: {
        _domain:
          "self.isCustomer = true AND :company member of self.companySet",
        fullName: value,
        _domainContext: {
          company: company,
        },
      },
      limit: 10,
      offset: 0,

      fields: ["id", "fullName"],
    };
  },
  customerCurrency: (value: CustomerCurrency) => {
    return {
      model: "com.axelor.apps.project.db.Project",
      action: "action-project-method-get-partner-data",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.Project",
          clientPartner: value,
        },
      },
    };
  },
  currency: (value: Currency) => {
    return {
      data: {
        criteria: [{ fieldName: "name", operator: "like", value: value }],
        operator: "and",
        _domainContext: {
          _model: "com.axelor.apps.base.db.Currency",
        },
      },
      fields: ["code", "name", "id"],
      limit: 10,
    };
  },
  contactAction: (value: Currency) => {
    return {
      action: "action-attrs-domain-on-contact-partner",
      data: {
        context: {
          _model: "com.axelor.apps.project.db.Project",
          _source: "contactPartner",
          clientPartner: value,
        },
      },
    };
  },

  address: ({ value, client, company }: Address) => {
    return {
      fields: [
        "id",
        "fullName",
        "addressL2",
        "addressL3",
        "addressL4",
        "addressL5",
        "addressL6",
      ],

      data: {
        addressL2: value,
        addressL3: value,
        addressL4: value,
        addressL5: value,
        addressL6: value,
        fullName: value,

        _domain:
          "self IN (SELECT address FROM PartnerAddress where partner = :clientPartner)",
        _domainContext: {
          company: company,
          clientPartner: client,

          _model: "com.axelor.apps.project.db.Project",
        },
      },
      limit: 10,
      offset: 0,
      translate: true,
    };
  },
};
export default requestBody;
