import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';


export default function useQueryParams() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<any>();
  const [hasQuery, setHasQuery] = useState<boolean>();
  const [renderCompleted, setRenderCompleted] = useState<boolean>();
  
  useEffect(() => {
    const query = queryString.parse(location.search);
    setQueryParams(query);
    setHasQuery(Boolean(Object.keys(query).length));
    setRenderCompleted(true);
  }, [location.search]);

  return {
    ...queryParams,
    hasQuery,
    renderCompleted
  }
}
