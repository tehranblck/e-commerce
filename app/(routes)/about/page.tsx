import React from "react";

const About = () => {
  return (
    <section className="dark:bg-[#121212] py-6 ">
      <div className="max-w-[1280px] mx-auto flex justify-center items-center flex-col">
        <div className=" flex items-center justify-center w-full mb-4">
          <h1 className="text-[42px] dark:text-[#fff]">Haqqımızda</h1>
        </div>

        <div className="pb-20 pt-10 dark:text-[#fff] text-center max-w-[1200px] px-4">
          <p>
            MUSLIMAN SHOP olaraq güvənli, sürətli və asan ödəniş üsulları ilə
            müştərilərimizə E-pin almaq, oyun içi ödəniş kimi bir çox xidmətləri
            göstəririk. Təcrübəli dəstək komandamız sayəsində yüksək keyfiyyətdə
            xidmət göstərib, sifarişlərini maksimum tez biz zamanda
            tamamlayırıq. Məqsədimiz sərfəli qiymət, yüksək
            keyfiyyət göstərməkdir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
