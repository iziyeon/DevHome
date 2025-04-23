import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Code2, FileText, Users } from "lucide-react";

import communityImg from "../../../assets/layout/community.png";
import mypageImg from "../../../assets/layout/mypage.png";
import resumeImg from "../../../assets/layout/resume.png";

export default function FeatureSection() {
  const topFeatures = [
    {
      title: "나만의 홈페이지",
      icon: <Code2 className="w-5 h-5 text-indigo-300" />,
      description: "개발자의 개성을 담은 공간. 내가 만든 것들이 모입니다.",
      image: mypageImg,
    },
    {
      title: "이력서 페이지",
      icon: <FileText className="w-5 h-5 text-indigo-300" />,
      description: "기술과 경험을 정리해 나를 보여주는 하나의 페이지.",
      image: resumeImg,
    },
    {
      title: "커뮤니티 공간",
      icon: <Users className="w-5 h-5 text-indigo-300" />,
      description: "질문과 나눔이 흐르는 개발자들의 이야기 공간입니다.",
      image: communityImg,
    },
  ];

  return (
    <section className="py-24 px-4 text-white bg-transparent">
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={600}
          centeredSlides
          loop
          spaceBetween={0}
          slidesPerView={1}
          className="w-full"
        >
          {topFeatures.map(({ title, icon, description, image }) => (
            <SwiperSlide key={title} className="flex justify-center">
              <div className="relative w-full max-w-6xl aspect-[16/9] bg-black/20 border border-white/10 rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
                <img
                  src={image}
                  alt={`${title} 스크린샷`}
                  className="max-w-full max-h-full object-contain rounded-md transition duration-500"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 py-5">
                  <div className="flex items-center gap-2 font-semibold text-sm sm:text-base text-white mb-1">
                    {icon}
                    <span>{title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80">
                    {description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
