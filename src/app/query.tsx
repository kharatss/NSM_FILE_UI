"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { folderQueryKey, QueryGcTime, QueryStaleTime } from "./static"
import axios, { AxiosProgressEvent } from "axios"

const BASE_URL='http://localhost:3030'

// export const useFetchFolder = () => {
//     return useQuery({
//         queryKey: [folderQueryKey.GetFolders],
//         queryFn: async () => {
//             const responseData = await axios.get(`${BASE_URL}/Folders`, { params: { page: 1, limit: 10 } })
//             if (responseData?.status) {
//                 return responseData.data
//             }
//         },
//         staleTime: QueryStaleTime,
//         gcTime: QueryGcTime

//     })
// }


export const useCreateFolder = () => {
    const queryClient = useQueryClient()
    const response = useMutation({
        mutationFn: async (payload: any) => {
            const { data } = await axios.post(`${BASE_URL}/Folders/create`, payload);
            return data;

        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: [folderQueryKey.GetFolders] });
        }
    });
    return response;
};

export const useUploadFile = (setProgress: (progress: number) => void) => {
    const queryClient = useQueryClient();
    
    const response = useMutation({
        mutationFn: async (payload: any) => {
            const { data } = await axios.post(`${BASE_URL}/Files/upload`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    setProgress(percent);
                }
            });
            return data;
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: [folderQueryKey.GetFolders] });
        },
        onError: (error) => {
            console.error('Error uploading file:', error);
        }
    });

    return response;
};


export const useFetchFolder = (name?:string, description?:string, createdAt?:string) => {
    return useQuery({
        queryKey: [folderQueryKey.GetFolders, name, description, createdAt],
        queryFn: async () => {
            // Create the params object and conditionally add properties if they are provided
            const params:any = { page: 1, limit: 10 };

            if (name) {
                params.name = name;  // Only include name if provided
            }
            if (description) {
                params.description = description;  // Only include description if provided
            }
            if (createdAt) {
                params.createdAt = createdAt;  // Only include createdAt if provided
            }

            const responseData = await axios.get(`${BASE_URL}/Folders`, { params });

            if (responseData?.status) {
                return responseData.data;
            }
        },
        staleTime: QueryStaleTime,
        gcTime: QueryGcTime
    });
};
