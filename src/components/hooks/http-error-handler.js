import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptors = httpClient.interceptors.response.use((req) => {
    setError(null);
  });
  useEffect(() => {
    httpClient.interceptors.request.eject(reqInterceptor);
    httpClient.interceptors.response.eject(resInterceptors);
  }, [reqInterceptor, reqInterceptor]);

  const errorConifrmeHandler = () => {
    setError(null);
  };

  return [error, errorConifrmeHandler];
};
