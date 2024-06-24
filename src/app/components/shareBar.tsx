import {
  BsFacebook,
  BsLink45Deg,
  BsTelegram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

const ShareBar: React.FC = () => {
  const text = `Buycut hadir untuk membantu kamu membuat pilihan yang tepat sebagai konsumen.\n\nYuk, cek produk-produk yang dihindari banyak orang dan jadi bagian dari gerakan ini!\n`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`${text}\n${process.env.NEXT_PUBLIC_URL}`);
    toast.success("URL berhasil disalin");
  };

  return (
    <div className="bg-tertiary">
      <div className="text-gray-200 text-sm p-5">
        <p className="font-semibold">
          Suara Anda memiliki kekuatan yang luar biasa!
        </p>
        <p>
          Dengan berbagi pengalaman dan informasi, Anda dapat membantu lebih
          banyak orang untuk membuat pilihan yang etis dan bijaksana
        </p>
      </div>

      <div className="flex justify-center flex-row gap-8 items-center p-4">
        <Tooltip id="twitter" />
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_URL}`}
          title={text}
          data-tooltip-id="twitter"
          data-tooltip-content="Share on Twitter"
          data-tooltip-place="bottom"
        >
          <BsTwitterX className="h-[18px] w-[18px] text-gray-300 hover:text-gray-100 duration-300 cursor-pointer" />
        </TwitterShareButton>

        <Tooltip id="facebook" />
        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_URL}`}
          title={text}
          data-tooltip-id="facebook"
          data-tooltip-content="Share on Facebook"
          data-tooltip-place="bottom"
        >
          <BsFacebook className="h-[18px] w-[18px] text-gray-300 hover:text-gray-100 duration-300 cursor-pointer" />
        </FacebookShareButton>

        <Tooltip id="whatsapp" />
        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_URL}`}
          title={text}
          data-tooltip-id="whatsapp"
          data-tooltip-content="Share on Whatsapp"
          data-tooltip-place="bottom"
        >
          <BsWhatsapp className="h-[18px] w-[18px] text-gray-300 hover:text-gray-100 duration-300 cursor-pointer" />
        </WhatsappShareButton>

        <Tooltip id="telegram" />
        <TelegramShareButton
          url={`${process.env.NEXT_PUBLIC_URL}`}
          title={text}
          data-tooltip-id="telegram"
          data-tooltip-content="Share on telegram"
          data-tooltip-place="bottom"
        >
          <BsTelegram className="h-[18px] w-[18px] text-gray-300 hover:text-gray-100 duration-300 cursor-pointer" />
        </TelegramShareButton>

        <button onClick={handleCopyUrl}>
          <Tooltip id="copy-url" />
          <BsLink45Deg
            className="h-[18px] w-[18px] text-gray-300 hover:text-gray-100 duration-300 cursor-pointer"
            data-tooltip-id="copy-url"
            data-tooltip-content="Copy URL"
            data-tooltip-place="bottom"
          />
        </button>
      </div>
    </div>
  );
};

export default ShareBar;
