import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2f2f2f] text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <p className="text-white text-sm mb-2">
            Savolingiz bormi? Qo‘ng‘iroq qiling
          </p>
          <p className="text-2xl font-semibold text-white mb-6">
            +998 71 209 99 44
          </p>

          <div className="flex gap-3">
            {[
              FaFacebookF,
              FaTelegramPlane,
              FaInstagram,
              FaYoutube,
              FaEnvelope,
            ].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-[#4a4a4a] rounded flex items-center justify-center hover:bg-amber-400 hover:text-black transition"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Kompaniya</h4>
          <ul className="space-y-2 text-sm">
            <li>Yuridik shaxslar uchun</li>
            <li>Biz haqimizda</li>
            <li>Yangiliklar va bloglar</li>
            <li>IMEI ni tekshirish</li>
            <li>Texnomartda ishlash</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Ma'lumot</h4>
          <ul className="space-y-2 text-sm">
            <li>Bepul yetkazib berish</li>
            <li>Xizmat ko‘rsatish markazlari</li>
            <li>Shaxsiy kabinet</li>
            <li>Aloqa raqamlari</li>
            <li>Ommaviy taklif shartnomasi</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Haridorga yordam</h4>
          <ul className="space-y-2 text-sm">
            <li>Maxsulotni qaytarish</li>
            <li>Mahsulotlar uchun kafolat</li>
            <li>Do‘konlar manzillari</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Ilovani yuklab olish
          </h4>

          <p className="text-sm mb-3">Yuklab olish uchun QR-kodni skanerlang</p>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>2016–2026 © texnomart.uz. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
