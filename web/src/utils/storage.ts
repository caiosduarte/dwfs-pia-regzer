import { getUserIds } from "./getUserIds";

export interface IUserIDs {
    email?: string;
    document?: string;
    cellphone?: string;
}

export const getExistingUserIds = (): IUserIDs | undefined => {
    return getUserIds<IUserIDs>();
};

export interface IStorageID {
    name?: string;
    value: string;
    label?: string;
}

export const storage = {
    ids: Array<IStorageID>(),

    exists: (value: string) =>
        storage.ids.findIndex((id) => id.value === value) >= 0,

    labels: () =>
        storage.ids
            .filter((id) => !!id.label)
            .map((id) => {
                return id.label;
            }),

    joinLabels: (separator = " | ") => storage.labels().join(separator),

    push: (id: IStorageID) => {
        storage.ids = [...storage.ids, id];
    },

    loadLocalData: () => {
        const localIds = getExistingUserIds();

        if (localIds) {
            Object.entries(localIds).forEach((id) => {
                const label = storage.getLabel(id[0]);
                if (label) {
                    storage.push({
                        name: id[0],
                        value: id[1],
                        label,
                    } as IStorageID);
                }
            });
        }
    },

    getLabel: (value: string) => {
        let label;
        switch (value) {
            case "email":
                label = "Email Address";
                break;
            case "document":
                label = "Document";
                break;
            case "cellphone":
                label = "Cellphone";
                break;
        }
        return label;
    },
};
