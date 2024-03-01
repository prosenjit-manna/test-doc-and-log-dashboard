import { useLazyQuery } from "@apollo/client";
import { appModuleListQuery } from "./graphql/appModuleList.query";
import { useState } from "react";
import { AppModulesQuery } from "gql/graphql";
import useQueryParams from "Lib/Hooks/useQueryParams";
import { AppModuleListRoute, appModuleRoutes } from "Lib/Routes/AppModuleRoutes";
import { useNavigate } from "react-router-dom";
import useDeepCompareEffect from "use-deep-compare-effect";
import appConfig from "Lib/appConfig";

export default function useAppModule() {
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


  return {
    modules,
    setModules,
    query,
    pageChange
  }
}
