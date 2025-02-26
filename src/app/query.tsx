"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { folderQueryKey, QueryGcTime, QueryStaleTime } from "./static";
import axios, { AxiosProgressEvent } from "axios";

const BASE_URL = "http://localhost:3030";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${BASE_URL}/Folders/create`, payload);
      return data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [folderQueryKey.GetFolders],
      });
    },
  });
  return response;
};

export const useUploadFile = (setProgress: (progress: number) => void) => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${BASE_URL}/Files/upload`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setProgress(percent);
        },
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [folderQueryKey.GetFolders],
      });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });

  return response;
};

export const useFetchFolder = (
  name?: string,
  description?: string,
  createdAt?: string
) => {
  return useQuery({
    queryKey: [folderQueryKey.GetFolders, name, description, createdAt],
    queryFn: async () => {
      const params: any = { page: 1, limit: 10 };

      if (name) {
        params.name = name;
      }
      if (description) {
        params.description = description;
      }
      if (createdAt) {
        params.createdAt = createdAt;
      }

      const responseData = await axios.get(`${BASE_URL}/Folders`, { params });

      if (responseData?.status) {
        return responseData.data;
      }
    },
    staleTime: QueryStaleTime,
    gcTime: QueryGcTime,
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: async (folderId: number) => {
      await axios.delete(`${BASE_URL}/folders/${folderId}`);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [folderQueryKey.GetFolders] });
    },
    onError: (error) => {
      console.error("Failed to delete folder:", error);
    },
  });

  return response;
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await axios.put(`${BASE_URL}/folders/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [folderQueryKey.GetFolders] });
    },
    onError: (error) => {
      console.error("Failed to update folder:", error);
    },
  });

  return mutation;
};
