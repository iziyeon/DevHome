import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Code2, FileText, Users } from "lucide-react";

export default function FeatureSection() {
  const topFeatures = [
    {
      title: "나만의 홈페이지",
      icon: <Code2 className="w-6 h-6 text-indigo-300" />,
      description: (
        <>
          나를 소개하는 가장 단순하고 확실한 방법 <br />
          내가 만든 것들, 쓴 글, 남긴 흔적들이 모이는 공간입니다.
        </>
      ),
    },
    {
      title: "이력서 페이지",
      icon: <FileText className="w-6 h-6 text-indigo-300" />,
      description: (
        <>
          기술과 경험을 정리해 나를 설명하는 곳 <br />
          개발자로서의 여정을 하나의 페이지로 보여줍니다.
        </>
      ),
    },
    {
      title: "커뮤니티 페이지",
      icon: <Users className="w-6 h-6 text-indigo-300" />,
      description: (
        <>
          함께 나누는 이야기들이 모이는 곳 <br />
          질문, 글, 짧은 생각들까지 개발자들이 모여 흐름을 만들어갑니다.
        </>
      ),
    },
  ];

  const bottomInfo = [
    {
      title: "정리하는 공간",
      description: "기술, 경험, 관심사를 차곡차곡 모아두는 곳",
    },
    {
      title: "보여주는 공간",
      description: "만든 것들을 꺼내 놓고, 필요한 사람에게 닿도록",
    },
    {
      title: "이어지는 공간",
      description: "기록과 기록 사이, 연결이 조용히 생겨나도록",
    },
  ];

  return (
    <section className="py-14 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          className="mb-12"
        >
          {topFeatures.map(({ title, icon, description }) => (
            <SwiperSlide key={title} className="flex justify-center">
              <div
                className="w-full max-w-[540px] min-w-[300px] h-[500px] min-h-[460px] max-h-[520px]
                           bg-white/5 border border-white/10 rounded-xl p-6 shadow-md flex flex-col gap-4
                           transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:border-indigo-300"
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <div
                  className="bg-white/10 rounded-md flex-1 flex items-center justify-center text-white/40 text-lg"
                  style={{ height: "60%" }}
                >
                  📷 이미지 자리 (넓고 크게)
                </div>
                <p className="text-sm leading-relaxed text-white/90">
                  {description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {bottomInfo.map(({ title, description }) => (
            <div key={title}>
              <h4 className="text-base font-semibold mb-2">{title}</h4>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
