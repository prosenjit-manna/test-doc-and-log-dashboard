import { useLazyQuery, useMutation } from "@apollo/client";
import { appModuleListQuery } from "./graphql/appModuleList.query";
import { useState } from "react";
import { AppModulesQuery } from "gql/graphql";
import useQueryParams from "Lib/Hooks/useQueryParams";
import { AppModuleListRoute, appModuleRoutes } from "Lib/Routes/AppModuleRoutes";
import { useNavigate } from "react-router-dom";
import useDeepCompareEffect from "use-deep-compare-effect";
import appConfig from "Lib/appConfig";
import { deleteAppModuleMutation } from "./graphql/deleteAppModule.mutation";
import { notifications } from "@mantine/notifications";
import { cloneDeep } from "lodash";
import { useDisclosure } from "@mantine/hooks";

export default function useAppModule() {
  const [deleteConfirmationOpended, { open: openDeleteConfirmation, close: closeDeleteConfirmation }] = useDisclosure(false);
  const navigate = useNavigate();
  const [getModules] = useLazyQuery(appModuleListQuery, {
    onCompleted: (d) => {
      setModules(d)
    }
  });
  const [modules, setModules] = useState<AppModulesQuery>();
  const query = useQueryParams() as unknown as AppModuleListRoute;


  useDeepCompareEffect(() => {
    // On Page Load Fetch Data 
    if (query.renderCompleted && !query.hasQuery) {
      getModules();
    } else if (query.renderCompleted && query.hasQuery){
      getModules({
        variables: {
          pagination: {
            page: Number(query.page),
            pageSize: appConfig.pagination.pageSize
          }
        }
      });
    }
  }, [query])

  const pageChange = (v: number) => {
    navigate(appModuleRoutes.list.build({ page: String(v)}))
  }

  const [deleteCallBack ] = useMutation(deleteAppModuleMutation);

  const deleteModule = (id: string) => {
    deleteCallBack({
      variables: {
        id
      },
      onCompleted: () => {
       notifications.show({ message: 'Deleted' });
       const d = cloneDeep(modules);
       if (d?.appModules) {
        d.appModules.data = d?.appModules?.data.filter(e => e.id !== id);
        setModules(d);
        closeDeleteConfirmation();
       }
      }
    })
  }


  return {
    modules,
    query,
    pageChange,
    deleteModule,
    deleteConfirmationOpended,
    openDeleteConfirmation,
    closeDeleteConfirmation
  }
}
