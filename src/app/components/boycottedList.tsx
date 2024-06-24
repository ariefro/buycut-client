import { useEffect, useState } from "react";
import { fetchBoycottedBrands } from "../services/brandService";
import Image from "next/image";
import Modal from "./modal";
import Loading from "./loading";
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  company: Company;
  proof: string[];
  type: string;
  created_at: string;
}

interface BoycottedListProps {
  keyword: string;
}

const BoycottedList: React.FC<BoycottedListProps> = ({ keyword }) => {
  const [loading, setLoading] = useState(true);
  const [boycottedList, setBoycottedList] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

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
    <div className="text-gray-500 w-full p-7">
      {loading ? (
        <Loading />
      ) : boycottedList && boycottedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boycottedList.map((brand, index) => (
            <div
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300"
              key={brand.id}
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal(brand);
              }}
            >
              <div className="w-full h-44 flex items-center justify-center">
                <Image
                  src={brand.image_url}
                  alt={brand.name}
                  width={192}
                  height={192}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="pt-4 pb-2">
                <h2 className="text-sm font-semibold mb-2 text-center">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
          {selectedBrand && (
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              data={selectedBrand}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-24">
          <p className="text-center text-gray-700">
            Tidak ada kecocokan yang ditemukan
          </p>
          <Link
            href={"https://forms.gle/aH7uU9uVqW3v6sRv8"}
            className="underline text-[#6B8A7A] hover:text-[#254336]"
          >
            Sarankan merek untuk ditambahkan
          </Link>
        </div>
      )}
    </div>
  );
};

export default BoycottedList;
