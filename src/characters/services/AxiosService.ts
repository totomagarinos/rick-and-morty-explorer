import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log("Request made to", {
          url: config.url,
          params: config.params,
          method: config.method?.toUpperCase(),
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log("Response from:", {
          url: response.config.url,
          params: response.config.params,
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        if (error.response) {
          console.error(`Error response from: ${error.response.config.url}`, {
            data: error.response.data,
            status: error.response.status,
          });
        } else {
          console.error(`Error: ${error.message}`);
        }

        return Promise.reject(error);
      }
    );
  }
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const axiosService = new AxiosService("https://rickandmortyapi.com/api");
