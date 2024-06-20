import axios from "@/app/utils/axiosInstance";

export const searchBoycottedBrand = async (keyword: string) => {
    const response = await axios.post('/brands/search', { keyword });
    return response.data;
};

export const fetchBoycottedBrands = async (page = 1, perPage = 10, keyword?: string) => {
    const response = await axios.post('/brands/boycotted', {keyword}, {
      params: { page, perPage }
    });
    return response.data;
};
  