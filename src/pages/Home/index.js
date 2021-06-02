import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';
import Profile from './Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
import deviceModelsTexture from 'assets/device-models-phone.jpg';


import MyPantry from 'assets/mp.jpg';

import MyPantry1 from 'assets/MP1.jpg';
import MyPantry2 from 'assets/MP2.jpg';

import AL1 from 'assets/ALUMNI1.jpg';
import AL2 from 'assets/ALUMNI2.jpg';
import AL3 from 'assets/ALUMNI3.jpg';

import D1 from 'assets/D1.jpg';
import D2 from 'assets/D2.jpg';

import FA1 from 'assets/FA1.jpg';
import FA2 from 'assets/FA2.jpg';


import deviceModelsTextureLarge from 'assets/device-models-phone-large.jpg';
import deviceModelsTexturePlaceholder from 'assets/device-models-phone-placeholder.jpg';
import dttTexture from 'assets/dtt.jpg';
import dttTextureLarge from 'assets/dtt-large.jpg';
import dttTexturePlaceholder from 'assets/dtt-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import portrait from 'assets/portrait.glb';
import './index.css';

const disciplines = ['UI Designer', 'Coder', 'Gamer'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();

  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, about];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, projectTwo, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>T Jai Surya Prasad | Developer</title>
        <meta
          name="description"
          content="Portfolio of Jai Surya – a multidisciplinary UI designer,Android developer and Web Developer with a focus on motion and user experience."
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
        <link rel="prefetch" href={portrait} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Browser App"
        description="Design and development of an Android Browser App through Android Studio and Kotlin."
        buttonText="View"
        //buttonLink="/projects/device-models"
        model={{
          type: 'phone',
          alt: "Device Model's default image",
          textures: [
            {
              src: MyPantry2,
              srcSet: `${MyPantry2} 254w, ${MyPantry2} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: MyPantry1,
              srcSet: `${MyPantry1} 254w, ${MyPantry1} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="E-Commerce Website "
        description="Fully responsive E-Commerce wesite deployed and added some cool animations and effects"
        buttonText="View"
        //buttonLink="/projects/devtech-tools"
        model={{
          type: 'phone',
          alt: 'DevTech Tools Landing Page',
          textures: [
            {
              src: D1,
              srcSet: `${D1} 254w, ${D1} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: D2,
              srcSet: `${D2} 254w, ${D2} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: AL3,
              srcSet: `${AL3} 254w, ${AL3} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
       <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectOne.current)}
        index={3}
        title="Alumni App for REVA University"
        description="This app is an official App for REVA University where Alumins can communicate and post jobs and also have various other features"
        buttonText="View"
        //buttonLink="/projects/device-models"
        model={{
          type: 'phone',
          alt: 'DevTech Tools Landing Page',
          textures: [
            {
              src: AL1,
              srcSet: `${AL1} 254w, ${AL1} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: AL2,
              srcSet: `${AL2} 254w, ${AL2} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: AL3,
              srcSet: `${AL3} 254w, ${AL3} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
       <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectTwo.current)}
        index={4}
        title="Personal Portfolio"
        description="Basic HTML , CSS , Bootstrap , JS , And a fully responsive website. "
        buttonText="View"
        //buttonLink="/projects/device-models"
        model={{
          type: 'phone',
          alt: 'DevTech Tools Landing Page',
          textures: [
            {
              src: FA2,
              srcSet: `${FA2} 254w, ${FA2} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
            {
              src: FA1,
              srcSet: `${FA1} 254w, ${FA1} 508w`,
              placeholder: deviceModelsTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </div>
  );
};

export default Home;
