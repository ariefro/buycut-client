import { useEffect, useState } from "react";
import { fetchBoycottedBrands } from "../services/brandService";

interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface BoycottedListProps {
  keyword: string;
}

const BoycottedList: React.FC<BoycottedListProps> = ({ keyword }) => {
  const [boycottedList, setBoycottedList] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBoycottedList = async (
    keyword: string = "",
    page: number = 1,
    perPage: number = 10
  ) => {
    try {
      setLoading(true);
      const res = await fetchBoycottedBrands(page, perPage, keyword);
      setBoycottedList(res.data);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoycottedList(keyword);
  }, [keyword]);

  return (
    <div className="p-4 text-gray-500">
      <h1 className="text-2xl font-bold mb-4 text-center">Boycotted Brands</h1>
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <p>Loading...</p>
        </div>
      ) : boycottedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boycottedList.map((brand, index) => (
            <div
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              key={brand.id}
            >
              <div className="w-24 h-24 aspect-w-1 aspect-h-1">
                <img
                  src={brand.image_url}
                  alt={brand.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-2">
                <h2 className="text-sm font-semibold mb-2 text-center">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-24">
          <p className="text-center text-gray-500">
            Tidak ada kecocokan yang ditemukan
          </p>
        </div>
      )}
    </div>
  );
};

export default BoycottedList;
