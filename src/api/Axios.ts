import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const Axios = axios.create();

export const get = async (url: string, config?: AxiosRequestConfig) =>
  Axios.get(url, config).then((response: AxiosResponse) => response.data);

export const post = async <T>(url: string, data: T, config?: AxiosRequestConfig) =>
  Axios.post(url, data, config).then((response: AxiosResponse) => response.data);

export const patch = async <T>(url: string, data: T, config?: AxiosRequestConfig) =>
  Axios.patch(url, data, config).then((response: AxiosResponse) => response.data);

export const put = async <T>(url: string, data: T, config?: AxiosRequestConfig) =>
  Axios.put(url, data, config).then((response: AxiosResponse) => response.data);

export const del = async (url: string, config?: AxiosRequestConfig) =>
  Axios.delete(url, config).then((response: AxiosResponse) => response.data);
